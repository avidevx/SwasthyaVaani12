(() => {
  'use strict';

  const SYNTHETIC_BENEFICIARIES = [
    {id: 'ASHA-104', name: 'Sunita Devi', defaultType: 'ANC Checkup'},
    {id: 'ASHA-105', name: 'Kavita Bai', defaultType: 'PNC Checkup'},
    {id: 'ASHA-106', name: 'Baby Aarav', defaultType: 'Immunization'},
  ];

  const VISIT_RECORD_KEYS = new Set([
    'beneficiary_id',
    'beneficiary_name',
    'visit_type',
    'weight_kg',
    'vaccinations_due',
    'next_visit_date',
    'danger_signs_detected',
    'phc_referral_needed',
    'confirmed',
  ]);

  const STATUS_META = {
    idle: {
      label: 'Offline',
      pillClasses: ['bg-slate-200/80', 'text-slate-700'],
      dotClasses: ['bg-slate-500'],
    },
    connecting: {
      label: 'Connecting...',
      pillClasses: ['bg-amber-100', 'text-amber-900'],
      dotClasses: ['bg-amber-500'],
    },
    listening: {
      label: 'Listening...',
      pillClasses: ['bg-teal-100', 'text-teal-900'],
      dotClasses: ['bg-teal-600', 'animate-pulse'],
    },
    speaking: {
      label: 'Agent Speaking...',
      pillClasses: ['bg-sky-100', 'text-sky-900'],
      dotClasses: ['bg-sky-600', 'animate-pulse'],
    },
    error: {
      label: 'Error',
      pillClasses: ['bg-red-100', 'text-red-900'],
      dotClasses: ['bg-red-600'],
    },
  };

  function createEmptyVisitRecord(beneficiary) {
    return {
      beneficiary_id: beneficiary.id,
      beneficiary_name: beneficiary.name,
      visit_type: beneficiary.defaultType,
      weight_kg: '',
      vaccinations_due: [],
      next_visit_date: '',
      danger_signs_detected: [],
      phc_referral_needed: false,
      confirmed: false,
    };
  }

  function areFieldValuesEqual(a, b) {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((item, idx) => item === b[idx]);
    }
    return false;
  }

  function sanitizeVisitPatch(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return {};
    }

    const source =
      raw.patch && typeof raw.patch === 'object' && !Array.isArray(raw.patch)
        ? raw.patch
        : raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data)
          ? raw.data
          : raw;

    const patch = {};

    for (const key of Object.keys(source)) {
      if (!VISIT_RECORD_KEYS.has(key)) continue;
      const value = source[key];
      if (value === undefined || value === null) continue;

      switch (key) {
        case 'beneficiary_id':
        case 'beneficiary_name':
        case 'visit_type':
        case 'next_visit_date':
          if (typeof value === 'string') patch[key] = value;
          break;
        case 'weight_kg':
          if (typeof value === 'number' || typeof value === 'string') patch.weight_kg = value;
          break;
        case 'vaccinations_due':
        case 'danger_signs_detected':
          if (Array.isArray(value)) {
            patch[key] = value.map((item) => String(item)).filter(Boolean);
          } else if (typeof value === 'string' && value.trim()) {
            patch[key] = [value.trim()];
          }
          break;
        case 'phc_referral_needed':
        case 'confirmed':
          if (typeof value === 'boolean') patch[key] = value;
          break;
      }
    }

    return patch;
  }

  function buildSimulatedPatch(type, beneficiary) {
    const isPnc = beneficiary.id === 'ASHA-105';
    const isChild = beneficiary.id === 'ASHA-106';

    switch (type) {
      case 'normal':
        if (isChild) {
          return {
            visit_type: 'Immunization',
            weight_kg: 7.4,
            vaccinations_due: ['Pentavalent-2', 'OPV-2', 'Rotavirus-2'],
            next_visit_date: '2026-12-18',
            danger_signs_detected: [],
            phc_referral_needed: false,
            confirmed: false,
          };
        }
        if (isPnc) {
          return {
            visit_type: 'PNC Checkup',
            weight_kg: 51.2,
            vaccinations_due: ['Vitamin A (Postpartum)', 'IFA Supplement Refill'],
            next_visit_date: '2026-12-05',
            danger_signs_detected: [],
            phc_referral_needed: false,
            confirmed: false,
          };
        }
        return {
          visit_type: 'ANC Checkup',
          weight_kg: 54.5,
          vaccinations_due: ['Td-2 (Tetanus-Diphtheria)', 'IFA 180-Day Course'],
          next_visit_date: '2026-12-19',
          danger_signs_detected: [],
          phc_referral_needed: false,
          confirmed: false,
        };

      case 'correction':
        if (isChild) return {weight_kg: 7.8, next_visit_date: '2026-12-22'};
        if (isPnc) return {weight_kg: 52.6, next_visit_date: '2026-12-08'};
        return {weight_kg: 56.2, next_visit_date: '2026-12-24'};

      case 'danger':
        if (isChild) {
          return {
            danger_signs_detected: ['Fast breathing / chest indrawing', 'Unable to breastfeed'],
            phc_referral_needed: true,
          };
        }
        if (isPnc) {
          return {
            danger_signs_detected: ['Heavy vaginal bleeding', 'High fever (102°F)'],
            phc_referral_needed: true,
          };
        }
        return {
          danger_signs_detected: [
            'Severe headache with blurred vision',
            'Swelling of face and hands',
          ],
          phc_referral_needed: true,
        };

      case 'confirm':
        return {confirmed: true};

      default:
        return {};
    }
  }

  /**
   * Self-contained LiveKit + DataChannel + WakeLock voice session controller.
   * Decoupled from presentational DOM layout so UI templates can be replaced cleanly.
   */
  function createAshaVoiceSession(audioSinkEl, onStateChange) {
    const state = {
      beneficiaries: SYNTHETIC_BENEFICIARIES,
      selectedBeneficiary: SYNTHETIC_BENEFICIARIES[0],
      status: 'idle',
      errorMessage: null,
      audioPlaybackBlocked: false,
      visitRecord: createEmptyVisitRecord(SYNTHETIC_BENEFICIARIES[0]),
      lastUpdatedFields: [],
      transcriptLog: [],
    };

    let room = null;
    let wakeLock = null;
    let highlightTimer = null;
    let hasExplicitError = false;

    function notify() {
      onStateChange({
        ...state,
        isSessionActive:
          state.status === 'connecting' ||
          state.status === 'listening' ||
          state.status === 'speaking',
      });
    }

    function clearAudioElements() {
      if (audioSinkEl) {
        audioSinkEl.replaceChildren();
      }
    }

    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator && navigator.wakeLock) {
          if (wakeLock && !wakeLock.released) return;
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch {
        // WakeLock may be unsupported or blocked by power-saver mode
      }
    }

    async function releaseWakeLock() {
      try {
        if (wakeLock) {
          await wakeLock.release();
          wakeLock = null;
        }
      } catch {
        wakeLock = null;
      }
    }

    function applyRecordPatch(patch, source) {
      const patchKeys = Object.keys(patch);
      if (patchKeys.length === 0) return;

      const changedKeys = patchKeys.filter(
        (key) => !areFieldValuesEqual(state.visitRecord[key], patch[key]),
      );
      const highlightedKeys = changedKeys.length > 0 ? changedKeys : patchKeys;

      state.visitRecord = {...state.visitRecord, ...patch};
      state.lastUpdatedFields = highlightedKeys;

      if (highlightTimer !== null) {
        window.clearTimeout(highlightTimer);
      }
      highlightTimer = window.setTimeout(() => {
        state.lastUpdatedFields = [];
        highlightTimer = null;
        notify();
      }, 2000);

      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        source,
        changedFields: highlightedKeys,
        patch,
      };

      state.transcriptLog = [entry, ...state.transcriptLog].slice(0, 30);
      notify();
    }

    async function cleanupRoom(resetStatusToIdle) {
      const activeRoom = room;
      room = null;

      if (activeRoom) {
        try {
          activeRoom.removeAllListeners();
          activeRoom.localParticipant.trackPublications.forEach((publication) => {
            if (publication.track) {
              publication.track.stop();
            }
          });
          await activeRoom.disconnect(true);
        } catch {
          // Ignore teardown errors during disconnect
        }
      }

      clearAudioElements();
      state.audioPlaybackBlocked = false;
      await releaseWakeLock();

      if (resetStatusToIdle) {
        state.status = 'idle';
      }
      notify();
    }

    async function unlockAudio() {
      if (!room) return;
      try {
        await room.startAudio();
        state.audioPlaybackBlocked = !room.canPlaybackAudio;
        notify();
      } catch {
        state.audioPlaybackBlocked = true;
        notify();
      }
    }

    async function startSession() {
      if (
        state.status === 'connecting' ||
        state.status === 'listening' ||
        state.status === 'speaking'
      ) {
        return;
      }

      const lk = window.LivekitClient;
      if (!lk || !lk.Room || !lk.RoomEvent || !lk.Track) {
        state.errorMessage =
          'LiveKit WebRTC client failed to load from CDN. Check your internet connection and reload.';
        state.status = 'error';
        notify();
        return;
      }

      const {Room, RoomEvent, Track} = lk;

      hasExplicitError = false;
      state.errorMessage = null;
      state.audioPlaybackBlocked = false;
      state.status = 'connecting';
      notify();

      const beneficiary = state.selectedBeneficiary;

      try {
        await cleanupRoom(false);

        const tokenUrl = `/token?room=asha-demo&beneficiary_id=${encodeURIComponent(beneficiary.id)}`;
        let response;
        try {
          response = await fetch(tokenUrl, {
            method: 'GET',
            headers: {Accept: 'application/json'},
          });
        } catch {
          throw new Error(
            'Unable to reach the local /token endpoint. Ensure FastAPI is running, or test offline with the Demo Simulator below.',
          );
        }

        if (!response.ok) {
          let detail = `Voice token endpoint returned HTTP ${response.status}.`;
          try {
            const errBody = await response.json();
            if (errBody && typeof errBody.detail === 'string' && errBody.detail.trim()) {
              detail = errBody.detail;
            }
          } catch {
            // Keep default HTTP message
          }
          throw new Error(detail);
        }

        const tokenPayload = await response.json();
        if (
          typeof tokenPayload?.url !== 'string' ||
          !tokenPayload.url.trim() ||
          typeof tokenPayload?.token !== 'string' ||
          !tokenPayload.token.trim()
        ) {
          throw new Error('Invalid /token response: expected JSON containing { url, token }.');
        }

        const newRoom = new Room({
          audioCaptureDefaults: {
            noiseSuppression: true,
            echoCancellation: true,
            autoGainControl: true,
          },
          adaptiveStream: true,
        });

        room = newRoom;

        // Unlock browser AudioContext inside the user tap gesture before connecting
        try {
          await newRoom.startAudio();
        } catch {
          // Will re-check after connect via canPlaybackAudio / AudioPlaybackStatusChanged
        }

        newRoom.on(RoomEvent.TrackSubscribed, (track) => {
          if (track.kind !== Track.Kind.Audio) return;
          const audioEl = track.attach();
          audioEl.setAttribute('playsinline', 'true');
          if (audioSinkEl) {
            audioSinkEl.appendChild(audioEl);
          }

          try {
            const playPromise = audioEl.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {
                state.audioPlaybackBlocked = true;
                notify();
              });
            }
          } catch {
            state.audioPlaybackBlocked = true;
            notify();
          }
        });

        newRoom.on(RoomEvent.TrackUnsubscribed, (track) => {
          if (track.kind !== Track.Kind.Audio) return;
          const detached = track.detach();
          detached.forEach((el) => el.remove());
        });

        newRoom.on(RoomEvent.AudioPlaybackStatusChanged, () => {
          if (!room) return;
          state.audioPlaybackBlocked = !room.canPlaybackAudio;
          notify();
        });

        newRoom.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
          if (!room) return;
          const remoteSpeaking = speakers.some((speaker) => !speaker.isLocal);
          state.status = remoteSpeaking ? 'speaking' : 'listening';
          notify();
        });

        newRoom.on(RoomEvent.DataReceived, (payload) => {
          try {
            const decoded = new TextDecoder('utf-8').decode(payload);
            const parsed = JSON.parse(decoded);
            const sanitizedPatch = sanitizeVisitPatch(parsed);
            applyRecordPatch(sanitizedPatch, 'livekit');
          } catch {
            // Ignore malformed DataChannel packets safely
          }
        });

        newRoom.on(RoomEvent.Disconnected, () => {
          room = null;
          clearAudioElements();
          state.audioPlaybackBlocked = false;
          void releaseWakeLock();
          if (!hasExplicitError) {
            state.status = 'idle';
          }
          notify();
        });

        await newRoom.connect(tokenPayload.url, tokenPayload.token);

        // Ensure remote audio playback is started post-connect as well
        try {
          await newRoom.startAudio();
        } catch {
          // Handled via canPlaybackAudio banner below
        }
        state.audioPlaybackBlocked = !newRoom.canPlaybackAudio;

        try {
          await newRoom.localParticipant.setMicrophoneEnabled(true);
        } catch (micErr) {
          const micMsg =
            micErr instanceof Error ? micErr.message : 'Microphone permission denied.';
          throw new Error(`Connected to room, but could not enable microphone: ${micMsg}`);
        }

        state.status = 'listening';
        notify();
        await requestWakeLock();
      } catch (err) {
        hasExplicitError = true;
        await cleanupRoom(false);
        state.errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to start voice session. Please check your connection and try again.';
        state.status = 'error';
        notify();
      }
    }

    async function endSession() {
      hasExplicitError = false;
      state.errorMessage = null;
      await cleanupRoom(true);
    }

    function resetRecord() {
      if (highlightTimer !== null) {
        window.clearTimeout(highlightTimer);
        highlightTimer = null;
      }
      state.visitRecord = createEmptyVisitRecord(state.selectedBeneficiary);
      state.lastUpdatedFields = [];
      state.transcriptLog = [];
      state.errorMessage = null;
      if (state.status === 'error') {
        state.status = 'idle';
      }
      notify();
    }

    function selectBeneficiary(beneficiaryId) {
      if (
        state.status === 'connecting' ||
        state.status === 'listening' ||
        state.status === 'speaking'
      ) {
        return;
      }

      const found = SYNTHETIC_BENEFICIARIES.find((b) => b.id === beneficiaryId);
      if (!found) return;

      if (highlightTimer !== null) {
        window.clearTimeout(highlightTimer);
        highlightTimer = null;
      }

      state.selectedBeneficiary = found;
      state.visitRecord = createEmptyVisitRecord(found);
      state.lastUpdatedFields = [];
      state.transcriptLog = [];
      state.errorMessage = null;
      if (state.status === 'error') {
        state.status = 'idle';
      }
      notify();
    }

    function simulatePatch(type) {
      const patch = buildSimulatedPatch(type, state.selectedBeneficiary);
      applyRecordPatch(patch, 'simulator');
    }

    function clearError() {
      state.errorMessage = null;
      if (state.status === 'error') {
        state.status = 'idle';
      }
      notify();
    }

    document.addEventListener('visibilitychange', () => {
      if (
        document.visibilityState === 'visible' &&
        (state.status === 'listening' || state.status === 'speaking')
      ) {
        void requestWakeLock();
      }
    });

    window.addEventListener('pagehide', () => {
      void cleanupRoom(false);
    });

    return {
      startSession,
      endSession,
      unlockAudio,
      resetRecord,
      selectBeneficiary,
      simulatePatch,
      clearError,
      getSnapshot: () => ({
        ...state,
        isSessionActive:
          state.status === 'connecting' ||
          state.status === 'listening' ||
          state.status === 'speaking',
      }),
    };
  }

  // --- Presentational DOM Wiring ---
  function initApp() {
    const audioSinkEl = document.getElementById('audio-sink');
    const statusBadgeEl = document.getElementById('session-status-badge');
    const statusDotEl = document.getElementById('session-status-dot');
    const statusLabelEl = document.getElementById('session-status-label');
    const offlineBannerEl = document.getElementById('offline-banner');
    const unlockAudioBtn = document.getElementById('unlock-audio-btn');
    const errorBannerEl = document.getElementById('error-banner');
    const errorBannerTextEl = document.getElementById('error-banner-text');
    const errorDismissBtn = document.getElementById('error-dismiss-btn');
    const beneficiarySelectEl = document.getElementById('beneficiary-select');
    const beneficiaryLockedHintEl = document.getElementById('beneficiary-locked-hint');
    const phcBannerEl = document.getElementById('phc-referral-banner');
    const dangerSignsListEl = document.getElementById('danger-signs-list');
    const confirmedBadgeEl = document.getElementById('confirmed-badge');
    const draftStatusTextEl = document.getElementById('draft-status-text');

    const fieldEls = {
      beneficiary: document.getElementById('field-beneficiary'),
      visit_type: document.getElementById('field-visit_type'),
      weight_kg: document.getElementById('field-weight_kg'),
      vaccinations_due: document.getElementById('field-vaccinations_due'),
      next_visit_date: document.getElementById('field-next_visit_date'),
    };

    const valBeneficiaryNameEl = document.getElementById('val-beneficiary-name');
    const valBeneficiaryIdEl = document.getElementById('val-beneficiary-id');
    const valVisitTypeEl = document.getElementById('val-visit-type');
    const valWeightKgEl = document.getElementById('val-weight-kg');
    const valVaccinationsDueEl = document.getElementById('val-vaccinations-due');
    const valNextVisitDateEl = document.getElementById('val-next-visit-date');

    const demoStripEl = document.getElementById('demo-test-strip');
    const demoToggleBtn = document.getElementById('demo-strip-toggle');
    const demoStripBodyEl = document.getElementById('demo-strip-body');
    const demoChevronUpEl = document.getElementById('demo-chevron-up');
    const demoChevronDownEl = document.getElementById('demo-chevron-down');
    const resetRecordBtn = document.getElementById('reset-record-btn');
    const patchLogWrapperEl = document.getElementById('patch-log-wrapper');
    const patchLogToggleBtn = document.getElementById('patch-log-toggle');
    const patchLogListEl = document.getElementById('patch-log-list');

    const sessionToggleBtn = document.getElementById('session-toggle-btn');
    const ctaLabelEl = document.getElementById('cta-label');
    const ctaIcons = {
      mic: document.getElementById('cta-icon-mic'),
      spinner: document.getElementById('cta-icon-spinner'),
      micoff: document.getElementById('cta-icon-micoff'),
      volume: document.getElementById('cta-icon-volume'),
    };

    let demoOpen = true;
    let patchLogOpen = false;

    // Hide demo simulator when ?demo=false
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'false' && demoStripEl) {
      demoStripEl.classList.add('hidden');
    }

    // Populate beneficiary dropdown safely via DOM nodes
    for (const person of SYNTHETIC_BENEFICIARIES) {
      const opt = document.createElement('option');
      opt.value = person.id;
      opt.textContent = `${person.name} · ${person.id} (${person.defaultType})`;
      beneficiarySelectEl.appendChild(opt);
    }

    function setHighlightState(el, active) {
      if (!el) return;
      el.setAttribute('data-highlighted', String(active));
      el.classList.toggle('bg-teal-50', active);
      el.classList.toggle('ring-1', active);
      el.classList.toggle('ring-teal-500/40', active);
    }

    function render(snapshot) {
      const {
        status,
        isSessionActive,
        errorMessage,
        audioPlaybackBlocked,
        selectedBeneficiary,
        visitRecord,
        lastUpdatedFields,
        transcriptLog,
      } = snapshot;

      const isHighlighted = (...fields) => fields.some((f) => lastUpdatedFields.includes(f));

      // Header status pill
      const meta = STATUS_META[status] || STATUS_META.idle;
      statusBadgeEl.setAttribute('data-status', status);
      statusBadgeEl.className = `sv-status-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${meta.pillClasses.join(' ')}`;
      statusDotEl.className = `h-2 w-2 rounded-full ${meta.dotClasses.join(' ')}`;
      statusLabelEl.textContent = meta.label;

      // Audio playback unlock banner
      unlockAudioBtn.classList.toggle('hidden', !(isSessionActive && audioPlaybackBlocked));

      // Error banner
      if (errorMessage) {
        errorBannerTextEl.textContent = errorMessage;
        errorBannerEl.classList.remove('hidden');
      } else {
        errorBannerTextEl.textContent = '';
        errorBannerEl.classList.add('hidden');
      }

      // Beneficiary selector
      beneficiarySelectEl.value = selectedBeneficiary.id;
      beneficiarySelectEl.disabled = isSessionActive;
      beneficiaryLockedHintEl.classList.toggle('hidden', !isSessionActive);

      // Urgent PHC Referral Banner
      if (visitRecord.phc_referral_needed) {
        phcBannerEl.classList.remove('hidden');
        const dangerHighlight = isHighlighted('phc_referral_needed', 'danger_signs_detected');
        phcBannerEl.classList.toggle('ring-4', dangerHighlight);
        phcBannerEl.classList.toggle('ring-red-300', dangerHighlight);

        dangerSignsListEl.replaceChildren();
        if (visitRecord.danger_signs_detected.length > 0) {
          for (const sign of visitRecord.danger_signs_detected) {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-1.5';
            const dot = document.createElement('span');
            dot.setAttribute('aria-hidden', 'true');
            dot.className = 'h-1.5 w-1.5 rounded-full bg-white shrink-0';
            const text = document.createElement('span');
            text.textContent = sign;
            li.appendChild(dot);
            li.appendChild(text);
            dangerSignsListEl.appendChild(li);
          }
          dangerSignsListEl.classList.remove('hidden');
        } else {
          dangerSignsListEl.classList.add('hidden');
        }
      } else {
        phcBannerEl.classList.add('hidden');
        phcBannerEl.classList.remove('ring-4', 'ring-red-300');
      }

      // Confirmed & Saved badge
      if (visitRecord.confirmed) {
        confirmedBadgeEl.classList.remove('hidden');
        draftStatusTextEl.classList.add('hidden');
        const confirmedHighlight = isHighlighted('confirmed');
        confirmedBadgeEl.classList.toggle('ring-2', confirmedHighlight);
        confirmedBadgeEl.classList.toggle('ring-emerald-400', confirmedHighlight);
      } else {
        confirmedBadgeEl.classList.add('hidden');
        draftStatusTextEl.classList.remove('hidden');
      }

      // Structured Visit Fields
      valBeneficiaryNameEl.textContent = visitRecord.beneficiary_name;
      valBeneficiaryIdEl.textContent = visitRecord.beneficiary_id;
      setHighlightState(
        fieldEls.beneficiary,
        isHighlighted('beneficiary_name', 'beneficiary_id'),
      );

      valVisitTypeEl.textContent = visitRecord.visit_type || '—';
      setHighlightState(fieldEls.visit_type, isHighlighted('visit_type'));

      const weightText =
        visitRecord.weight_kg === '' ||
        visitRecord.weight_kg === null ||
        visitRecord.weight_kg === undefined
          ? '—'
          : `${visitRecord.weight_kg} kg`;
      valWeightKgEl.textContent = weightText;
      setHighlightState(fieldEls.weight_kg, isHighlighted('weight_kg'));

      valVaccinationsDueEl.replaceChildren();
      if (visitRecord.vaccinations_due.length > 0) {
        const span = document.createElement('span');
        span.className = 'leading-snug';
        span.textContent = visitRecord.vaccinations_due.join(' · ');
        valVaccinationsDueEl.appendChild(span);
      } else {
        const empty = document.createElement('span');
        empty.className = 'font-normal text-slate-400';
        empty.textContent = 'None recorded';
        valVaccinationsDueEl.appendChild(empty);
      }
      setHighlightState(fieldEls.vaccinations_due, isHighlighted('vaccinations_due'));

      valNextVisitDateEl.textContent = visitRecord.next_visit_date || '—';
      setHighlightState(fieldEls.next_visit_date, isHighlighted('next_visit_date'));

      // Incoming JSON patch log
      if (transcriptLog.length > 0) {
        patchLogWrapperEl.classList.remove('hidden');
        patchLogToggleBtn.textContent = patchLogOpen
          ? `Hide incoming JSON patches (${transcriptLog.length})`
          : `View incoming JSON patches (${transcriptLog.length})`;

        patchLogListEl.classList.toggle('hidden', !patchLogOpen);
        if (patchLogOpen) {
          patchLogListEl.replaceChildren();
          for (const entry of transcriptLog) {
            const row = document.createElement('div');
            row.className = 'border-b border-slate-800 pb-1.5 last:border-b-0 last:pb-0';

            const header = document.createElement('div');
            header.className = 'text-[10px] text-teal-300';
            header.textContent = `${entry.timestamp} · ${entry.source}`;

            const pre = document.createElement('pre');
            pre.className = 'whitespace-pre-wrap break-all text-slate-200';
            pre.textContent = JSON.stringify(entry.patch);

            row.appendChild(header);
            row.appendChild(pre);
            patchLogListEl.appendChild(row);
          }
        }
      } else {
        patchLogWrapperEl.classList.add('hidden');
        patchLogListEl.classList.add('hidden');
      }

      // Bottom One-Thumb Primary CTA
      sessionToggleBtn.setAttribute('aria-pressed', String(isSessionActive));
      sessionToggleBtn.className = `sv-voice-cta w-full min-h-[56px] flex items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-base font-bold shadow-sm transition-all duration-150 active:scale-[0.98] ${
        isSessionActive
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-teal-700 text-white hover:bg-teal-800'
      }`;

      ctaIcons.mic.classList.add('hidden');
      ctaIcons.spinner.classList.add('hidden');
      ctaIcons.micoff.classList.add('hidden');
      ctaIcons.volume.classList.add('hidden');

      if (status === 'connecting') {
        ctaIcons.spinner.classList.remove('hidden');
        ctaLabelEl.textContent = 'Connecting... (Tap to Cancel)';
      } else if (status === 'speaking') {
        ctaIcons.volume.classList.remove('hidden');
        ctaLabelEl.textContent = 'End Voice Session';
      } else if (status === 'listening') {
        ctaIcons.micoff.classList.remove('hidden');
        ctaLabelEl.textContent = 'End Voice Session';
      } else {
        ctaIcons.mic.classList.remove('hidden');
        ctaLabelEl.textContent = 'Start Voice Visit';
      }
    }

    const session = createAshaVoiceSession(audioSinkEl, render);
    render(session.getSnapshot());

    // Bind UI events
    beneficiarySelectEl.addEventListener('change', (e) => {
      session.selectBeneficiary(e.target.value);
    });

    sessionToggleBtn.addEventListener('click', () => {
      const snap = session.getSnapshot();
      if (snap.isSessionActive) {
        void session.endSession();
      } else {
        void session.startSession();
      }
    });

    unlockAudioBtn.addEventListener('click', () => {
      void session.unlockAudio();
    });

    errorDismissBtn.addEventListener('click', () => {
      session.clearError();
    });

    resetRecordBtn.addEventListener('click', () => {
      session.resetRecord();
    });

    demoToggleBtn.addEventListener('click', () => {
      demoOpen = !demoOpen;
      demoToggleBtn.setAttribute('aria-expanded', String(demoOpen));
      demoStripBodyEl.classList.toggle('hidden', !demoOpen);
      demoChevronUpEl.classList.toggle('hidden', !demoOpen);
      demoChevronDownEl.classList.toggle('hidden', demoOpen);
    });

    patchLogToggleBtn.addEventListener('click', () => {
      patchLogOpen = !patchLogOpen;
      render(session.getSnapshot());
    });

    document.querySelectorAll('[data-sim-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const simType = btn.getAttribute('data-sim-type');
        if (simType) {
          session.simulatePatch(simType);
        }
      });
    });

    // Online / Offline connectivity indicator
    function updateOnlineBanner() {
      offlineBannerEl.classList.toggle('hidden', navigator.onLine !== false);
    }
    updateOnlineBanner();
    window.addEventListener('online', updateOnlineBanner);
    window.addEventListener('offline', updateOnlineBanner);

    // PWA Install Prompt & iOS Add-to-Home Guide
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const pwaIosBtn = document.getElementById('pwa-ios-install-btn');
    const iosModal = document.getElementById('ios-install-modal');
    const iosCloseX = document.getElementById('ios-install-close-x');
    const iosCloseBtn = document.getElementById('ios-install-close-btn');

    let deferredInstallPrompt = null;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

    if (!isStandalone && isIOS) {
      pwaIosBtn.classList.remove('hidden');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (!isStandalone) {
        pwaInstallBtn.classList.remove('hidden');
        pwaIosBtn.classList.add('hidden');
      }
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      pwaInstallBtn.classList.add('hidden');
      pwaIosBtn.classList.add('hidden');
    });

    pwaInstallBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      await deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        deferredInstallPrompt = null;
        pwaInstallBtn.classList.add('hidden');
      }
    });

    const closeIosModal = () => iosModal.classList.add('hidden');
    pwaIosBtn.addEventListener('click', () => iosModal.classList.remove('hidden'));
    iosCloseX.addEventListener('click', closeIosModal);
    iosCloseBtn.addEventListener('click', closeIosModal);
    iosModal.addEventListener('click', (e) => {
      if (e.target === iosModal) closeIosModal();
    });

    // Register Service Worker for PWA installability & offline shell
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Ignore SW registration failures in restricted preview contexts
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
