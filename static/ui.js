(() => {
  'use strict';

  const STORAGE_KEY = 'swasthyavaani_asha_workspace_v1';

  const DEFAULT_DATA = {
    visitsTarget: 8,
    visitsCompleted: 6,
    lastSyncedLabel: 'Last synced 14m ago',
    maternalAncDone: 92,
    immunizationCoverage: 88,
    notificationsUnread: true,
    maternalPatients: [
      {
        id: 'ASHA-104',
        name: 'Sunita Devi',
        age: 26,
        household: 'H-14, Shivajinagar',
        stage: 'ANC • 26 Weeks',
        visitType: 'ANC Checkup',
        highRisk: true,
        riskReason: 'Mild anemia (Hb 9.6 g/dL)',
        status: 'due',
        weightKg: '54.5',
        bp: '118/76',
        nextVisit: '2026-12-19',
        ifaGiven: 30,
        notes: 'Due for trimester weight check & Td-2 follow-up.',
      },
      {
        id: 'ASHA-105',
        name: 'Kavita Bai',
        age: 24,
        household: 'H-22, Ward 4 East',
        stage: 'PNC • Day 10',
        visitType: 'PNC Checkup',
        highRisk: true,
        riskReason: 'Postpartum BP monitoring',
        status: 'due',
        weightKg: '51.2',
        bp: '126/82',
        nextVisit: '2026-12-05',
        ifaGiven: 15,
        notes: 'Check postpartum temperature and breastfeeding latch.',
      },
      {
        id: 'ASHA-108',
        name: 'Meena Kumari',
        age: 29,
        household: 'H-09, Shivajinagar',
        stage: 'ANC • 32 Weeks',
        visitType: 'ANC Checkup',
        highRisk: true,
        riskReason: 'Previous C-section (HRP)',
        status: 'due',
        weightKg: '61.0',
        bp: '124/80',
        nextVisit: '2026-12-12',
        ifaGiven: 30,
        notes: 'Prepare institutional delivery birth plan at PHC.',
      },
      {
        id: 'ASHA-109',
        name: 'Rekha Sharma',
        age: 22,
        household: 'H-31, Anganwadi Lane',
        stage: 'ANC • 18 Weeks',
        visitType: 'ANC Checkup',
        highRisk: false,
        riskReason: '',
        status: 'completed',
        weightKg: '52.8',
        bp: '112/72',
        nextVisit: '2026-12-28',
        ifaGiven: 30,
        notes: 'ANC-2 completed. Vitals normal.',
      },
      {
        id: 'ASHA-113',
        name: 'Lakshmi Devi',
        age: 27,
        household: 'H-37, Ward 4 West',
        stage: 'ANC • 29 Weeks',
        visitType: 'ANC Checkup',
        highRisk: false,
        riskReason: '',
        status: 'due',
        weightKg: '57.4',
        bp: '116/74',
        nextVisit: '2026-12-16',
        ifaGiven: 30,
        notes: 'Calcium & IFA refill due.',
      },
    ],
    immunizationRecords: [
      {
        id: 'ASHA-106',
        childName: 'Baby Aarav',
        motherName: 'Priya Verma',
        ageLabel: '10 Weeks',
        household: 'H-18, Shivajinagar',
        vaccines: ['Pentavalent-2', 'OPV-2', 'Rotavirus-2'],
        status: 'overdue',
        dueDate: '2026-11-19',
        weightKg: '5.6',
      },
      {
        id: 'ASHA-110',
        childName: 'Baby Diya',
        motherName: 'Anita Yadav',
        ageLabel: '9 Months',
        household: 'H-05, Ward 4 North',
        vaccines: ['Measles-Rubella 1', 'Vitamin A'],
        status: 'overdue',
        dueDate: '2026-11-18',
        weightKg: '8.2',
      },
      {
        id: 'ASHA-111',
        childName: 'Baby Rohan',
        motherName: 'Geeta Patel',
        ageLabel: '14 Weeks',
        household: 'H-27, Anganwadi Lane',
        vaccines: ['Pentavalent-3', 'IPV-2', 'OPV-3'],
        status: 'due',
        dueDate: '2026-11-21',
        weightKg: '6.3',
      },
      {
        id: 'ASHA-112',
        childName: 'Baby Ananya',
        motherName: 'Savitri Devi',
        ageLabel: '6 Weeks',
        household: 'H-40, Shivajinagar',
        vaccines: ['Pentavalent-1', 'OPV-1', 'Rotavirus-1'],
        status: 'due',
        dueDate: '2026-11-21',
        weightKg: '4.5',
      },
      {
        id: 'ASHA-114',
        childName: 'Baby Kabir',
        motherName: 'Neha Singh',
        ageLabel: '16 Months',
        household: 'H-12, Ward 4 East',
        vaccines: ['DPT Booster-1', 'MR-2'],
        status: 'vaccinated',
        dueDate: '2026-11-21',
        weightKg: '10.1',
      },
    ],
    inventory: [
      {id: 'ifa', name: 'IFA Tablets (Iron-Folic)', unit: 'tablets', qty: 18, minQty: 30, step: 5},
      {id: 'ors', name: 'ORS Rehydration Packets', unit: 'packs', qty: 4, minQty: 6, step: 1},
      {id: 'zinc', name: 'Zinc Dispersible Tablets', unit: 'strips', qty: 24, minQty: 10, step: 1},
      {id: 'pcm', name: 'Paracetamol 500mg', unit: 'strips', qty: 15, minQty: 8, step: 1},
      {id: 'preg', name: 'Nischay Pregnancy Test Kits', unit: 'kits', qty: 9, minQty: 5, step: 1},
      {id: 'bp', name: 'BP Cuff & Hb Test Strips', unit: 'strips', qty: 32, minQty: 10, step: 2},
    ],
    refillRequests: [],
    visitHistory: [
      {
        id: 'VIS-101',
        beneficiaryId: 'ASHA-109',
        beneficiaryName: 'Rekha Sharma',
        visitType: 'ANC Checkup',
        weightKg: '52.8',
        vaccinationsDue: ['Td-1 Completed'],
        nextVisitDate: '2026-12-28',
        phcReferral: false,
        dangerSigns: [],
        time: '09:15 AM',
        source: 'Field Log',
      },
      {
        id: 'VIS-102',
        beneficiaryId: 'ASHA-114',
        beneficiaryName: 'Baby Kabir',
        visitType: 'Immunization',
        weightKg: '10.1',
        vaccinationsDue: ['DPT Booster-1', 'MR-2'],
        nextVisitDate: '2027-05-20',
        phcReferral: false,
        dangerSigns: [],
        time: '10:40 AM',
        source: 'Anganwadi Camp',
      },
    ],
    notifications: [
      {
        id: 'n-hrp',
        type: 'urgent',
        title: 'High-Risk ANC Follow-up Due',
        body: 'Sunita Devi (ASHA-104) is due for 26-week weight & BP checkup.',
        time: '12m ago',
        actionDept: 'maternal',
        beneficiaryId: 'ASHA-104',
        read: false,
      },
      {
        id: 'n-imm',
        type: 'warning',
        title: '2 Overdue Infant Vaccinations',
        body: 'Baby Aarav & Baby Diya missed scheduled doses at Ward 4 Anganwadi.',
        time: '35m ago',
        actionDept: 'immunization',
        beneficiaryId: 'ASHA-106',
        read: false,
      },
      {
        id: 'n-stock',
        type: 'info',
        title: 'Kit #4 Low Stock Alert',
        body: 'IFA Tablets (18 left) and ORS (4 packs) need PHC refill.',
        time: '1h ago',
        actionDept: 'supplies',
        read: false,
      },
    ],
    programmeLogs: [],
    anmMessages: [],
    settings: {
      language: 'Auto-detect (10 Core Indian Languages)',
      speechRate: 1.0,
      autoSyncMobile: true,
      largeText: false,
    },
    signedOut: false,
  };

  const CORE_STT_LANGUAGES = [
    {label: 'Hindi (हिन्दी)', name: 'Hindi', code: 'hi-IN'},
    {label: 'Bengali (বাংলা)', name: 'Bengali', code: 'bn-IN'},
    {label: 'Marathi (मराठी)', name: 'Marathi', code: 'mr-IN'},
    {label: 'Gujarati (ગુજરાતી)', name: 'Gujarati', code: 'gu-IN'},
    {label: 'Punjabi (ਪੰਜਾਬੀ)', name: 'Punjabi', code: 'pa-IN'},
    {label: 'Kannada (ಕನ್ನಡ)', name: 'Kannada', code: 'kn-IN'},
    {label: 'Telugu (తెలుగు)', name: 'Telugu', code: 'te-IN'},
    {label: 'Tamil (தமிழ்)', name: 'Tamil', code: 'ta-IN'},
    {label: 'Malayalam (മലയാളം)', name: 'Malayalam', code: 'ml-IN'},
    {label: 'Indian English', name: 'Indian English', code: 'en-IN'},
  ];

  const HEALTH_PROGRAMMES = [
    {
      id: 'nhm',
      code: 'NHM',
      title: 'National Health Mission (NHM)',
      summary: 'Primary maternal, newborn, and community health outreach across Ward 4.',
      checklist: [
        'Home-Based Newborn Care (HBNC) visits on days 1, 3, 7, 14, 21, 28, 42',
        'Monthly Village Health, Sanitation & Nutrition Day (VHSND)',
        'Timely PHC referral transport via 108 ambulance',
      ],
    },
    {
      id: 'rch',
      code: 'RCH 2.0',
      title: 'Reproductive & Child Health Portal',
      summary: 'Digital mother-child tracking IDs for ANC, institutional delivery, and vaccination.',
      checklist: [
        'Register pregnancy within first 12 weeks',
        'Log minimum 4 ANC checkups + Hb & BP readings',
        'Link newborn immunization schedule to RCH ID',
      ],
    },
    {
      id: 'jsy',
      code: 'JSY',
      title: 'Janani Suraksha Yojana',
      summary: 'Cash assistance promoting safe institutional delivery for pregnant women.',
      checklist: [
        'Verify MCP Card & bank Aadhaar seeding',
        'Confirm delivery at accredited PHC / CHC facility',
        'Submit ASHA accompaniment incentive claim',
      ],
    },
    {
      id: 'pmjay',
      code: 'PM-JAY',
      title: 'Ayushman Bharat — PM-JAY',
      summary: 'Up to ₹5 lakh/year secondary & tertiary hospitalization coverage per family.',
      checklist: [
        'Verify Ayushman Card / ABHA Health ID',
        'Check empanelled referral hospital for high-risk cases',
        'Assist family with e-KYC update at PHC desk',
      ],
    },
    {
      id: 'imi',
      code: 'IMI 5.0',
      title: 'Intensified Mission Indradhanush',
      summary: 'Catch-up vaccination drive for missed and overdue children under 5 years.',
      checklist: [
        'Mobilize overdue children (Baby Aarav, Baby Diya) to Anganwadi camp',
        'Update U-WIN digital immunization register',
        'Counsel parents on mild post-vaccine fever management',
      ],
    },
  ];

  const VOICE_PHRASE_SAMPLES = [
    {
      lang: 'en-IN',
      tag: 'Indian English',
      text: 'Sunita Devi ANC checkup completed, weight 55.2 kg, Td-2 due, next visit December 24.',
    },
    {
      lang: 'hi-IN',
      tag: 'Hindi',
      text: 'Sunita Devi ka ANC checkup poora hua, wajan 55.2 kilo, agli jaanch 24 December ko hai.',
    },
    {
      lang: 'te-IN',
      tag: 'Telugu',
      text: 'Sunita Devi ANC pariksha poorthayindi, baruvu 55.2 kg, tharuvatha visit December 24.',
    },
  ];

  function cloneDefault() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefault();
      const parsed = JSON.parse(raw);
      const merged = {...cloneDefault(), ...parsed, settings: {...DEFAULT_DATA.settings, ...(parsed.settings || {})}};
      const validLangs = new Set([
        'Auto-detect (10 Core Indian Languages)',
        ...CORE_STT_LANGUAGES.map((l) => l.label),
      ]);
      if (!validLangs.has(merged.settings.language)) {
        merged.settings.language = 'Auto-detect (10 Core Indian Languages)';
      }
      return merged;
    } catch {
      return cloneDefault();
    }
  }

  let state = loadState();
  let activeWorkspace = null;
  let activeMaternalFilter = 'all';
  let activeImmFilter = 'all';
  let activeHouseholdFilter = 'all';
  let householdSearchQuery = '';
  let anmCallTimerId = null;
  let anmCallSeconds = 0;
  let anmCallMuted = false;
  let anmCallSpeaker = true;
  let localSpeechRecognition = null;
  let isLocalDictating = false;
  let currentTranscriptNote = '';
  let manualEditOpen = false;
  let toastTimer = null;

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function icon(name, extraClass) {
    return el('span', `material-symbols-outlined ${extraClass || 'text-[18px]'}`, name);
  }

  function showToast(title, subtitle, tone) {
    const toast = document.getElementById('sync-success-toast');
    if (!toast) return;
    const titleEl = document.getElementById('toast-title');
    const subEl = document.getElementById('toast-subtitle');
    const iconEl = document.getElementById('toast-icon');

    if (titleEl) titleEl.textContent = title || 'Updated!';
    if (subEl) subEl.textContent = subtitle || 'Saved to Ward 4 local field register';
    if (iconEl) {
      iconEl.textContent = tone === 'error' ? 'warning' : tone === 'info' ? 'info' : 'verified';
    }

    toast.classList.remove('hidden');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.add('hidden');
    }, 4200);
  }

  window.dismissToast = function dismissToast() {
    const toast = document.getElementById('sync-success-toast');
    if (toast) toast.classList.add('hidden');
  };

  function getInitials(name) {
    const parts = String(name || 'AS').trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || parts[0]?.[1] || '')).toUpperCase() || 'AS';
  }

  function getSelectedBeneficiaryInfo() {
    const select = document.getElementById('beneficiary-select');
    const id = select ? select.value : 'ASHA-104';
    const maternal = state.maternalPatients.find((p) => p.id === id);
    if (maternal) {
      return {
        id: maternal.id,
        name: maternal.name,
        visitType: maternal.visitType,
        highRisk: maternal.highRisk,
        weightKg: maternal.weightKg,
        nextVisit: maternal.nextVisit,
        ifaGiven: maternal.ifaGiven,
        notes: maternal.notes,
      };
    }
    const child = state.immunizationRecords.find((c) => c.id === id);
    if (child) {
      return {
        id: child.id,
        name: child.childName,
        visitType: 'Immunization',
        highRisk: child.status === 'overdue',
        weightKg: child.weightKg,
        nextVisit: child.dueDate,
        ifaGiven: 0,
        notes: `Vaccines due: ${child.vaccines.join(', ')}.`,
      };
    }
    return {
      id: id || 'ASHA-104',
      name: document.getElementById('val-beneficiary-name')?.textContent || 'Sunita Devi',
      visitType: document.getElementById('val-visit-type')?.textContent || 'ANC Checkup',
      highRisk: false,
      weightKg: '',
      nextVisit: '',
      ifaGiven: 0,
      notes: '',
    };
  }

  // --- Sync Dashboard Metrics & Live Counters ---
  function syncDashboardUI() {
    document.documentElement.classList.toggle('text-[17px]', Boolean(state.settings.largeText));

    const visitsCountEl = document.getElementById('dashboard-visits-count');
    if (visitsCountEl) {
      visitsCountEl.textContent = `${state.visitsCompleted}/${state.visitsTarget}`;
    }

    const dueMaternal = state.maternalPatients.filter((p) => p.status === 'due').length;
    const hrpCount = state.maternalPatients.filter((p) => p.highRisk).length;
    const maternalDueEl = document.getElementById('metric-maternal-due');
    const maternalHrpEl = document.getElementById('metric-maternal-hrp');
    const maternalAncEl = document.getElementById('metric-maternal-anc');
    const maternalSyncEl = document.getElementById('metric-maternal-sync');
    if (maternalDueEl) maternalDueEl.textContent = `${14 + dueMaternal} Due Checkups`;
    if (maternalHrpEl) maternalHrpEl.textContent = `${3 + hrpCount} High Risk (HRP)`;
    if (maternalAncEl) maternalAncEl.textContent = `${state.maternalAncDone} ANC Done`;
    if (maternalSyncEl) maternalSyncEl.textContent = state.lastSyncedLabel;

    const immDue = state.immunizationRecords.filter((c) => c.status === 'due').length;
    const immOverdue = state.immunizationRecords.filter((c) => c.status === 'overdue').length;
    const immDueEl = document.getElementById('metric-imm-due');
    const immOverdueEl = document.getElementById('metric-imm-overdue');
    const immCovEl = document.getElementById('metric-imm-coverage');
    if (immDueEl) immDueEl.textContent = `${9 + immDue} Due Today`;
    if (immOverdueEl) immOverdueEl.textContent = `${immOverdue} Overdue`;
    if (immCovEl) immCovEl.textContent = `${state.immunizationCoverage}% Coverage`;

    const ifaItem = state.inventory.find((i) => i.id === 'ifa');
    const orsItem = state.inventory.find((i) => i.id === 'ors');
    const lowItems = state.inventory.filter((i) => i.qty < i.minQty);
    const kitLowBadgeEl = document.getElementById('metric-kit-low-badge');
    const ifaBadgeEl = document.getElementById('metric-kit-ifa');
    const orsBadgeEl = document.getElementById('metric-kit-ors');
    const kitFooterEl = document.getElementById('metric-kit-refill');
    if (kitLowBadgeEl) {
      kitLowBadgeEl.textContent =
        lowItems.length > 0 ? `Kit Restock • ${lowItems.length} Items Low` : 'Kit #4 • All Stocked';
    }
    if (ifaBadgeEl && ifaItem) {
      ifaBadgeEl.textContent =
        ifaItem.qty < ifaItem.minQty ? `IFA: Low (${ifaItem.qty} left)` : `IFA: ${ifaItem.qty} tabs`;
    }
    if (orsBadgeEl && orsItem) {
      orsBadgeEl.textContent = `ORS: ${orsItem.qty} ${orsItem.unit}`;
    }
    if (kitFooterEl) {
      kitFooterEl.textContent =
        state.refillRequests.length > 0
          ? `PHC Refill Requested (#${state.refillRequests[0].code})`
          : 'PHC Refill: Tomorrow';
    }

    const unreadCount = state.notifications.filter((n) => !n.read).length;
    const notifDot = document.getElementById('notif-unread-dot');
    if (notifDot) {
      notifDot.classList.toggle('hidden', unreadCount === 0);
    }

    const modalSubBadge = document.getElementById('modal-sub-badge-text');
    if (modalSubBadge) {
      modalSubBadge.textContent = `Language: ${state.settings.language}`;
    }

    const speedLabel = document.getElementById('playback-speed-label');
    if (speedLabel) {
      speedLabel.textContent = `${Number(state.settings.speechRate || 1).toFixed(1)}x`;
    }

    // Shift Signed-out lock overlay
    const lockOverlay = document.getElementById('shift-locked-overlay');
    if (lockOverlay) {
      lockOverlay.classList.toggle('hidden', !state.signedOut);
    }
  }

  // --- Reusable Stitch Bottom-Sheet Workspace Controller ---
  function openWorkspace(title, subtitle, badgeText, renderFn) {
    activeWorkspace = {title, subtitle, badgeText, renderFn};
    const modal = document.getElementById('workspace-modal');
    const sheet = document.getElementById('workspace-sheet');
    const titleEl = document.getElementById('workspace-title');
    const subtitleEl = document.getElementById('workspace-subtitle');
    const badgeEl = document.getElementById('workspace-badge');
    const bodyEl = document.getElementById('workspace-body');
    if (!modal || !sheet || !bodyEl) return;

    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle || '';
    if (badgeEl) {
      badgeEl.textContent = badgeText || 'Ward 4 Live';
      badgeEl.classList.toggle('hidden', !badgeText);
    }

    bodyEl.replaceChildren();
    bodyEl.scrollTop = 0;
    renderFn(bodyEl);

    modal.classList.remove('pointer-events-none', 'opacity-0', 'invisible');
    modal.classList.add('opacity-100');
    sheet.classList.remove('translate-y-full', 'pointer-events-none');
    sheet.classList.add('translate-y-0', 'pointer-events-auto');
    if (typeof window.syncBodyScrollLock === 'function') window.syncBodyScrollLock();
  }

  function refreshActiveWorkspace() {
    if (!activeWorkspace) return;
    const bodyEl = document.getElementById('workspace-body');
    if (!bodyEl) return;
    const prevScroll = bodyEl.scrollTop;
    bodyEl.replaceChildren();
    activeWorkspace.renderFn(bodyEl);
    bodyEl.scrollTop = prevScroll;
  }

  function closeWorkspace() {
    stopAnmCallTimer();
    activeWorkspace = null;
    const modal = document.getElementById('workspace-modal');
    const sheet = document.getElementById('workspace-sheet');
    if (!modal || !sheet) return;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none', 'invisible');
    sheet.classList.remove('translate-y-0', 'pointer-events-auto');
    sheet.classList.add('translate-y-full', 'pointer-events-none');
    if (typeof window.syncBodyScrollLock === 'function') window.syncBodyScrollLock();
  }

  window.closeWorkspace = closeWorkspace;

  function selectBeneficiaryInApp(beneficiaryId) {
    const select = document.getElementById('beneficiary-select');
    if (!select) return;
    const exists = Array.from(select.options).some((opt) => opt.value === beneficiaryId);
    if (exists && !select.disabled) {
      select.value = beneficiaryId;
      select.dispatchEvent(new Event('change', {bubbles: true}));
    }
  }

  function launchVoiceForBeneficiary(deptKey, beneficiaryId) {
    closeWorkspace();
    if (beneficiaryId) {
      selectBeneficiaryInApp(beneficiaryId);
    }
    if (typeof window.openVoiceModalForDept === 'function') {
      window.openVoiceModalForDept(deptKey || 'maternal');
    }
  }

  // --- 1. Maternal & Child Care Workspace ---
  function openMaternalWorkspace() {
    openWorkspace(
      'Maternal & Child Care',
      'Ward 4 ANC/PNC Registry • Tap any mother to log checkup or start voice visit',
      'Priority Care',
      renderMaternalWorkspace,
    );
  }

  function renderMaternalWorkspace(container) {
    // Quick Voice Action Banner
    const topBar = el('div', 'flex items-center justify-between gap-2 p-3 rounded-2xl bg-primary-container text-on-primary mb-3');
    const topLeft = el('div', 'flex items-center gap-2.5 min-w-0');
    topLeft.appendChild(icon('mic', 'text-[20px] text-secondary-fixed'));
    const topTxt = el('div', 'flex flex-col min-w-0');
    topTxt.appendChild(el('span', 'font-label-md text-[13px] font-bold truncate', 'Hands-Free ANC Voice Register'));
    topTxt.appendChild(el('span', 'text-[11px] text-primary-fixed/90 truncate', 'Connect LiveKit voice or log vitals below'));
    topLeft.appendChild(topTxt);
    const topBtn = el('button', 'px-3 py-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold shrink-0 active:scale-95 transition-transform', 'Voice Visit');
    topBtn.type = 'button';
    topBtn.addEventListener('click', () => launchVoiceForBeneficiary('maternal', 'ASHA-104'));
    topBar.appendChild(topLeft);
    topBar.appendChild(topBtn);
    container.appendChild(topBar);

    // Filter tabs
    const filters = [
      {key: 'all', label: `All (${state.maternalPatients.length})`},
      {key: 'due', label: `Due (${state.maternalPatients.filter((p) => p.status === 'due').length})`},
      {key: 'hrp', label: `High Risk (${state.maternalPatients.filter((p) => p.highRisk).length})`},
      {key: 'completed', label: `Done (${state.maternalPatients.filter((p) => p.status === 'completed').length})`},
    ];
    const filterRow = el('div', 'flex items-center gap-1.5 overflow-x-auto pb-2 mb-2');
    for (const f of filters) {
      const btn = el(
        'button',
        `px-3 py-1.5 rounded-full text-[11px] font-label-md font-semibold shrink-0 transition-colors ${
          activeMaternalFilter === f.key
            ? 'bg-primary text-on-primary'
            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
        }`,
        f.label,
      );
      btn.type = 'button';
      btn.addEventListener('click', () => {
        activeMaternalFilter = f.key;
        refreshActiveWorkspace();
      });
      filterRow.appendChild(btn);
    }
    container.appendChild(filterRow);

    const filtered = state.maternalPatients.filter((p) => {
      if (activeMaternalFilter === 'due') return p.status === 'due';
      if (activeMaternalFilter === 'hrp') return p.highRisk;
      if (activeMaternalFilter === 'completed') return p.status === 'completed';
      return true;
    });

    const list = el('div', 'flex flex-col gap-3');
    for (const patient of filtered) {
      const card = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col gap-2.5');

      const header = el('div', 'flex items-start justify-between gap-2');
      const left = el('div', 'flex items-center gap-2.5 min-w-0');
      left.appendChild(el('div', 'w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0', getInitials(patient.name)));
      const info = el('div', 'flex flex-col min-w-0');
      const nameRow = el('div', 'flex items-center gap-1.5 flex-wrap');
      nameRow.appendChild(el('span', 'font-headline-sm text-[14px] font-bold text-on-surface', patient.name));
      if (patient.highRisk) {
        nameRow.appendChild(el('span', 'px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold', 'High-Risk'));
      }
      info.appendChild(nameRow);
      info.appendChild(el('span', 'text-[11px] text-on-surface-variant', `${patient.id} • ${patient.stage} • ${patient.household}`));
      left.appendChild(info);
      header.appendChild(left);

      const statusPill = el(
        'span',
        `px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
          patient.status === 'completed'
            ? 'bg-secondary-fixed text-on-secondary-fixed'
            : 'bg-surface-container-high text-primary'
        }`,
        patient.status === 'completed' ? 'Synced' : 'Due',
      );
      header.appendChild(statusPill);
      card.appendChild(header);

      const vitalsRow = el('div', 'grid grid-cols-3 gap-1.5 text-center');
      const v1 = el('div', 'p-2 rounded-xl bg-surface-container-low');
      v1.appendChild(el('div', 'text-[10px] text-on-surface-variant', 'Weight'));
      v1.appendChild(el('div', 'text-[12px] font-bold text-on-surface', `${patient.weightKg} kg`));
      const v2 = el('div', 'p-2 rounded-xl bg-surface-container-low');
      v2.appendChild(el('div', 'text-[10px] text-on-surface-variant', 'BP'));
      v2.appendChild(el('div', 'text-[12px] font-bold text-on-surface', patient.bp));
      const v3 = el('div', 'p-2 rounded-xl bg-surface-container-low');
      v3.appendChild(el('div', 'text-[10px] text-on-surface-variant', 'Next Visit'));
      v3.appendChild(el('div', 'text-[11px] font-bold text-primary', patient.nextVisit));
      vitalsRow.append(v1, v2, v3);
      card.appendChild(vitalsRow);

      if (patient.riskReason || patient.notes) {
        card.appendChild(el('p', 'text-[11px] text-on-surface-variant leading-relaxed', patient.riskReason ? `${patient.riskReason} — ${patient.notes}` : patient.notes));
      }

      // Action buttons
      const actions = el('div', 'flex items-center gap-2 pt-1');
      const voiceBtn = el('button', 'flex-1 py-2 px-3 rounded-xl bg-primary-container text-on-primary text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all');
      voiceBtn.type = 'button';
      voiceBtn.append(icon('mic', 'text-[16px]'), el('span', '', 'Voice Visit'));
      voiceBtn.addEventListener('click', () => launchVoiceForBeneficiary('maternal', patient.id));

      const logBtn = el('button', 'flex-1 py-2 px-3 rounded-xl bg-surface-container-high text-on-surface text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all');
      logBtn.type = 'button';
      logBtn.append(icon('edit_note', 'text-[16px]'), el('span', '', 'Log Vitals'));

      actions.append(voiceBtn, logBtn);
      card.appendChild(actions);

      // Inline Vitals Logger Form (hidden until clicked)
      const formWrap = el('form', 'hidden mt-1 pt-3 border-t border-surface-container flex flex-col gap-2.5');
      const grid = el('div', 'grid grid-cols-2 gap-2');

      const wLabel = el('label', 'flex flex-col gap-1 text-[11px] font-semibold text-on-surface-variant', 'Weight (kg)');
      const wInput = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-surface-container-low px-2.5 text-xs font-semibold text-on-surface');
      wInput.type = 'number';
      wInput.step = '0.1';
      wInput.value = patient.weightKg;
      wLabel.appendChild(wInput);

      const bpLabel = el('label', 'flex flex-col gap-1 text-[11px] font-semibold text-on-surface-variant', 'Blood Pressure');
      const bpInput = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-surface-container-low px-2.5 text-xs font-semibold text-on-surface');
      bpInput.type = 'text';
      bpInput.value = patient.bp;
      bpLabel.appendChild(bpInput);

      const nextLabel = el('label', 'flex flex-col gap-1 text-[11px] font-semibold text-on-surface-variant', 'Next Checkup');
      const nextInput = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-surface-container-low px-2.5 text-xs font-semibold text-on-surface');
      nextInput.type = 'date';
      nextInput.value = patient.nextVisit;
      nextLabel.appendChild(nextInput);

      const ifaLabel = el('label', 'flex flex-col gap-1 text-[11px] font-semibold text-on-surface-variant', 'Dispense IFA Tabs');
      const ifaInput = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-surface-container-low px-2.5 text-xs font-semibold text-on-surface');
      ifaInput.type = 'number';
      ifaInput.min = '0';
      ifaInput.max = '60';
      ifaInput.value = '10';
      ifaLabel.appendChild(ifaInput);

      grid.append(wLabel, bpLabel, nextLabel, ifaLabel);
      formWrap.appendChild(grid);

      const dangerWrap = el('label', 'flex items-center gap-2 p-2 rounded-lg bg-error-container/50 text-[11px] font-semibold text-on-error-container cursor-pointer');
      const dangerCheck = el('input', 'w-4 h-4 accent-[#ba1a1a]');
      dangerCheck.type = 'checkbox';
      dangerWrap.append(dangerCheck, el('span', '', 'Danger signs present (Trigger Urgent PHC Referral)'));
      formWrap.appendChild(dangerWrap);

      const submitBtn = el('button', 'w-full py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold active:scale-95 transition-all', 'Save Checkup & Sync');
      submitBtn.type = 'submit';
      formWrap.appendChild(submitBtn);

      logBtn.addEventListener('click', () => {
        formWrap.classList.toggle('hidden');
      });

      formWrap.addEventListener('submit', (e) => {
        e.preventDefault();
        const wasDue = patient.status !== 'completed';
        patient.weightKg = wInput.value.trim() || patient.weightKg;
        patient.bp = bpInput.value.trim() || patient.bp;
        patient.nextVisit = nextInput.value || patient.nextVisit;
        patient.status = 'completed';

        const dispensed = Math.max(0, parseInt(ifaInput.value || '0', 10) || 0);
        const ifaStock = state.inventory.find((i) => i.id === 'ifa');
        if (ifaStock && dispensed > 0) {
          ifaStock.qty = Math.max(0, ifaStock.qty - dispensed);
        }

        if (wasDue) {
          state.visitsCompleted = Math.min(state.visitsTarget, state.visitsCompleted + 1);
          state.maternalAncDone += 1;
        }
        state.lastSyncedLabel = 'Last synced just now';

        const dangerTriggered = dangerCheck.checked;
        if (dangerTriggered) {
          patient.highRisk = true;
          selectBeneficiaryInApp(patient.id);
          const dangerSimBtn = document.querySelector('[data-sim-type="danger"]');
          if (dangerSimBtn) dangerSimBtn.click();
          state.notifications.unshift({
            id: `n-${Date.now()}`,
            type: 'urgent',
            title: `PHC Referral: ${patient.name}`,
            body: `Danger signs logged during checkup (${patient.id}). Immediate referral required.`,
            time: 'Just now',
            actionDept: 'maternal',
            beneficiaryId: patient.id,
            read: false,
          });
        }

        state.visitHistory.unshift({
          id: `VIS-${Date.now().toString().slice(-4)}`,
          beneficiaryId: patient.id,
          beneficiaryName: patient.name,
          visitType: patient.visitType,
          weightKg: patient.weightKg,
          vaccinationsDue: dispensed > 0 ? [`IFA Dispensed (${dispensed})`] : ['Vitals Checked'],
          nextVisitDate: patient.nextVisit,
          phcReferral: dangerTriggered,
          dangerSigns: dangerTriggered ? ['Flagged during manual ANC checkup'] : [],
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          source: 'Manual Checkup',
        });

        saveState();
        syncDashboardUI();
        refreshActiveWorkspace();
        showToast(
          dangerTriggered ? 'Urgent PHC Referral Logged!' : 'Checkup Saved & Synced!',
          `${patient.name} • Weight ${patient.weightKg} kg • BP ${patient.bp}`,
          dangerTriggered ? 'error' : 'success',
        );
      });

      card.appendChild(formWrap);
      list.appendChild(card);
    }

    container.appendChild(list);
  }

  // --- 2. Immunization Tracking Workspace ---
  function openImmunizationWorkspace() {
    openWorkspace(
      'Immunization Tracking',
      'Ward 4 Anganwadi Camp • Mark vaccines administered or register children',
      'Camp Today',
      renderImmunizationWorkspace,
    );
  }

  function renderImmunizationWorkspace(container) {
    const filters = [
      {key: 'all', label: `All (${state.immunizationRecords.length})`},
      {key: 'overdue', label: `Overdue (${state.immunizationRecords.filter((c) => c.status === 'overdue').length})`},
      {key: 'due', label: `Due Today (${state.immunizationRecords.filter((c) => c.status === 'due').length})`},
      {key: 'vaccinated', label: `Done (${state.immunizationRecords.filter((c) => c.status === 'vaccinated').length})`},
    ];
    const filterRow = el('div', 'flex items-center gap-1.5 overflow-x-auto pb-2 mb-2');
    for (const f of filters) {
      const btn = el(
        'button',
        `px-3 py-1.5 rounded-full text-[11px] font-label-md font-semibold shrink-0 transition-colors ${
          activeImmFilter === f.key
            ? 'bg-primary text-on-primary'
            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
        }`,
        f.label,
      );
      btn.type = 'button';
      btn.addEventListener('click', () => {
        activeImmFilter = f.key;
        refreshActiveWorkspace();
      });
      filterRow.appendChild(btn);
    }
    container.appendChild(filterRow);

    const filtered = state.immunizationRecords.filter((c) =>
      activeImmFilter === 'all' ? true : c.status === activeImmFilter,
    );

    const list = el('div', 'flex flex-col gap-3');
    for (const child of filtered) {
      const card = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col gap-2.5');
      const header = el('div', 'flex items-start justify-between gap-2');
      const left = el('div', 'flex flex-col');
      left.appendChild(el('span', 'font-headline-sm text-[14px] font-bold text-on-surface', `${child.childName} (${child.ageLabel})`));
      left.appendChild(el('span', 'text-[11px] text-on-surface-variant', `${child.id} • Mother: ${child.motherName} • ${child.household}`));
      header.appendChild(left);

      const pillStyle =
        child.status === 'vaccinated'
          ? 'bg-secondary-fixed text-on-secondary-fixed'
          : child.status === 'overdue'
            ? 'bg-error-container text-on-error-container'
            : 'bg-surface-container-high text-primary';
      const pillText =
        child.status === 'vaccinated' ? 'Vaccinated' : child.status === 'overdue' ? 'Overdue' : 'Due Today';
      header.appendChild(el('span', `px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${pillStyle}`, pillText));
      card.appendChild(header);

      const vaxWrap = el('div', 'flex flex-wrap gap-1.5');
      for (const vax of child.vaccines) {
        vaxWrap.appendChild(el('span', 'px-2.5 py-1 rounded-lg bg-surface-container-low text-[11px] font-semibold text-on-surface', vax));
      }
      card.appendChild(vaxWrap);

      const actions = el('div', 'flex items-center gap-2 pt-1');
      const markBtn = el(
        'button',
        `flex-1 py-2 px-3 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
          child.status === 'vaccinated'
            ? 'bg-surface-container text-on-surface-variant'
            : 'bg-primary-container text-on-primary'
        }`,
      );
      markBtn.type = 'button';
      markBtn.append(
        icon(child.status === 'vaccinated' ? 'undo' : 'vaccines', 'text-[16px]'),
        el('span', '', child.status === 'vaccinated' ? 'Undo Status' : 'Mark Vaccinated'),
      );
      markBtn.addEventListener('click', () => {
        if (child.status === 'vaccinated') {
          child.status = 'due';
          state.immunizationCoverage = Math.max(80, state.immunizationCoverage - 2);
          showToast('Immunization Reopened', `${child.childName} marked as Due Today`, 'info');
        } else {
          child.status = 'vaccinated';
          state.immunizationCoverage = Math.min(100, state.immunizationCoverage + 2);
          state.visitsCompleted = Math.min(state.visitsTarget, state.visitsCompleted + 1);
          state.visitHistory.unshift({
            id: `IMM-${Date.now().toString().slice(-4)}`,
            beneficiaryId: child.id,
            beneficiaryName: child.childName,
            visitType: 'Immunization',
            weightKg: child.weightKg,
            vaccinationsDue: child.vaccines,
            nextVisitDate: '2027-01-15',
            phcReferral: false,
            dangerSigns: [],
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            source: 'Anganwadi Camp',
          });
          showToast('Vaccination Recorded!', `${child.childName} • ${child.vaccines.join(', ')}`);
        }
        saveState();
        syncDashboardUI();
        refreshActiveWorkspace();
      });

      const voiceBtn = el('button', 'py-2 px-3 rounded-xl bg-surface-container-high text-primary text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all');
      voiceBtn.type = 'button';
      voiceBtn.append(icon('mic', 'text-[16px]'), el('span', '', 'Voice'));
      voiceBtn.addEventListener('click', () => launchVoiceForBeneficiary('immunization', 'ASHA-106'));

      actions.append(markBtn, voiceBtn);
      card.appendChild(actions);
      list.appendChild(card);
    }
    container.appendChild(list);

    // Add New Child to Camp Form
    const addBox = el('form', 'mt-4 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2.5');
    addBox.appendChild(el('h4', 'font-label-md text-[13px] font-bold text-primary', 'Register Walk-In Child at Camp'));
    const row = el('div', 'grid grid-cols-2 gap-2');
    const nameIn = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-white px-2.5 text-xs text-on-surface');
    nameIn.placeholder = 'Child name (e.g. Baby Tara)';
    nameIn.required = true;
    const motherIn = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-white px-2.5 text-xs text-on-surface');
    motherIn.placeholder = 'Mother name';
    motherIn.required = true;
    row.append(nameIn, motherIn);
    const vaxIn = el('input', 'h-9 rounded-lg border border-surface-container-highest bg-white px-2.5 text-xs text-on-surface');
    vaxIn.placeholder = 'Vaccine due (e.g. OPV-2, Pentavalent-2)';
    vaxIn.required = true;
    const addBtn = el('button', 'w-full py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold active:scale-95 transition-all', 'Add Child to Today’s Roster');
    addBtn.type = 'submit';
    addBox.append(row, vaxIn, addBtn);

    addBox.addEventListener('submit', (e) => {
      e.preventDefault();
      const childName = nameIn.value.trim();
      const motherName = motherIn.value.trim();
      const vaxList = vaxIn.value.split(',').map((v) => v.trim()).filter(Boolean);
      if (!childName || !motherName || vaxList.length === 0) return;

      state.immunizationRecords.unshift({
        id: `ASHA-${120 + state.immunizationRecords.length}`,
        childName,
        motherName,
        ageLabel: 'Infant',
        household: 'Ward 4 Walk-in',
        vaccines: vaxList,
        status: 'due',
        dueDate: new Date().toISOString().slice(0, 10),
        weightKg: '6.0',
      });
      activeImmFilter = 'all';
      saveState();
      syncDashboardUI();
      refreshActiveWorkspace();
      showToast('Child Added to Camp Roster', `${childName} • ${vaxList.join(', ')}`);
    });
    container.appendChild(addBox);
  }

  // --- 3. Medicine Kit & Inventory Workspace ---
  function openSuppliesWorkspace() {
    openWorkspace(
      'Medicine Kit & Inventory',
      'ASHA Kit #4 • Tap - / + to dispense or restock items live',
      'Kit #4 Verified',
      renderSuppliesWorkspace,
    );
  }

  function renderSuppliesWorkspace(container) {
    const lowItems = state.inventory.filter((i) => i.qty < i.minQty);

    const summary = el('div', 'p-3 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-2 mb-3');
    const sumLeft = el('div', 'flex flex-col');
    sumLeft.appendChild(
      el(
        'span',
        'font-label-md text-[13px] font-bold text-on-surface',
        lowItems.length > 0 ? `${lowItems.length} item(s) below minimum threshold` : 'All Kit #4 supplies adequately stocked',
      ),
    );
    sumLeft.appendChild(el('span', 'text-[11px] text-on-surface-variant', 'Changes sync immediately with dashboard badges'));
    summary.appendChild(sumLeft);

    const refillBtn = el('button', 'px-3 py-2 rounded-xl bg-primary-container text-on-primary text-[11px] font-bold shrink-0 active:scale-95 transition-all', 'Request PHC Refill');
    refillBtn.type = 'button';
    refillBtn.addEventListener('click', () => {
      const itemsToOrder = lowItems.length > 0 ? lowItems.map((i) => i.name) : ['Routine Kit #4 Replenishment'];
      const code = `PHC-${Math.floor(1000 + Math.random() * 9000)}`;
      state.refillRequests.unshift({
        code,
        items: itemsToOrder,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      });
      saveState();
      syncDashboardUI();
      refreshActiveWorkspace();
      showToast('PHC Refill Request Sent!', `Order #${code} • ${itemsToOrder.length} item(s) queued`);
    });
    summary.appendChild(refillBtn);
    container.appendChild(summary);

    const list = el('div', 'flex flex-col gap-2.5');
    for (const item of state.inventory) {
      const isLow = item.qty < item.minQty;
      const row = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between gap-3');
      const left = el('div', 'flex flex-col min-w-0');
      const titleRow = el('div', 'flex items-center gap-1.5 flex-wrap');
      titleRow.appendChild(el('span', 'font-label-md text-[13px] font-bold text-on-surface', item.name));
      if (isLow) {
        titleRow.appendChild(el('span', 'px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold', 'Low'));
      }
      left.appendChild(titleRow);
      left.appendChild(el('span', 'text-[11px] text-on-surface-variant mt-0.5', `Min level: ${item.minQty} ${item.unit}`));
      row.appendChild(left);

      const controls = el('div', 'flex items-center gap-1.5 shrink-0');
      const minusBtn = el('button', 'w-8 h-8 rounded-lg bg-surface-container-high text-on-surface font-bold flex items-center justify-center active:scale-90 transition-transform', `-${item.step}`);
      minusBtn.type = 'button';
      minusBtn.title = `Dispense ${item.step}`;
      minusBtn.addEventListener('click', () => {
        item.qty = Math.max(0, item.qty - item.step);
        saveState();
        syncDashboardUI();
        refreshActiveWorkspace();
      });

      const qtyBadge = el(
        'span',
        `min-w-[54px] text-center px-2 py-1 rounded-lg font-bold text-xs tabular-nums ${
          isLow ? 'bg-error-container text-on-error-container' : 'bg-secondary-fixed text-on-secondary-fixed'
        }`,
        `${item.qty}`,
      );

      const plusBtn = el('button', 'w-8 h-8 rounded-lg bg-primary-container text-on-primary font-bold flex items-center justify-center active:scale-90 transition-transform', `+${item.step}`);
      plusBtn.type = 'button';
      plusBtn.title = `Restock ${item.step}`;
      plusBtn.addEventListener('click', () => {
        item.qty += item.step;
        saveState();
        syncDashboardUI();
        refreshActiveWorkspace();
      });

      controls.append(minusBtn, qtyBadge, plusBtn);
      row.appendChild(controls);
      list.appendChild(row);
    }
    container.appendChild(list);

    if (state.refillRequests.length > 0) {
      const historyBox = el('div', 'mt-4 p-3 rounded-2xl bg-surface-container-low border border-surface-container');
      historyBox.appendChild(el('h4', 'font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider mb-2', 'Recent PHC Refill Orders'));
      for (const req of state.refillRequests.slice(0, 3)) {
        const line = el('div', 'text-[11px] text-on-surface-variant py-1 border-b border-surface-container last:border-b-0');
        line.textContent = `#${req.code} (${req.time}) — ${req.items.join(', ')}`;
        historyBox.appendChild(line);
      }
      container.appendChild(historyBox);
    }
  }

  // --- 4. Notifications & Alerts Sheet ---
  function openNotificationsSheet() {
    openWorkspace(
      'Ward 4 Alerts & Notifications',
      'Active clinical reminders, urgent referrals, and stock alerts',
      `${state.notifications.filter((n) => !n.read).length} Unread`,
      renderNotificationsSheet,
    );
  }

  function renderNotificationsSheet(container) {
    const topActions = el('div', 'flex items-center justify-between mb-3');
    topActions.appendChild(el('span', 'text-xs font-semibold text-on-surface-variant', `${state.notifications.length} total alerts`));
    const markAllBtn = el('button', 'px-3 py-1.5 rounded-lg bg-surface-container-high text-primary text-xs font-semibold active:scale-95 transition-all', 'Mark All Read');
    markAllBtn.type = 'button';
    markAllBtn.addEventListener('click', () => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      saveState();
      syncDashboardUI();
      refreshActiveWorkspace();
      showToast('Alerts Cleared', 'All Ward 4 notifications marked as read', 'info');
    });
    topActions.appendChild(markAllBtn);
    container.appendChild(topActions);

    const list = el('div', 'flex flex-col gap-2.5');
    for (const notif of state.notifications) {
      const card = el(
        'button',
        `w-full text-left p-3.5 rounded-2xl border transition-all active:scale-[0.99] flex items-start gap-3 ${
          notif.read
            ? 'bg-surface-container-lowest border-surface-container opacity-80'
            : 'bg-surface-container-low border-primary/20 shadow-sm'
        }`,
      );
      card.type = 'button';

      const icBg =
        notif.type === 'urgent'
          ? 'bg-error-container text-on-error-container'
          : notif.type === 'warning'
            ? 'bg-[#fffbeb] text-[#92400e]'
            : 'bg-secondary-fixed text-on-secondary-fixed';
      const icBox = el('div', `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${icBg}`);
      icBox.appendChild(icon(notif.type === 'urgent' ? 'warning' : notif.type === 'warning' ? 'vaccines' : 'inventory_2', 'text-[18px]'));

      const body = el('div', 'flex-1 min-w-0');
      const titleRow = el('div', 'flex items-center justify-between gap-2');
      titleRow.appendChild(el('span', 'font-label-md text-[13px] font-bold text-on-surface', notif.title));
      titleRow.appendChild(el('span', 'text-[10px] text-on-surface-variant shrink-0', notif.time));
      body.appendChild(titleRow);
      body.appendChild(el('p', 'text-[12px] text-on-surface-variant mt-0.5 leading-relaxed', notif.body));
      card.append(icBox, body);

      card.addEventListener('click', () => {
        notif.read = true;
        saveState();
        syncDashboardUI();
        if (notif.actionDept === 'maternal') openMaternalWorkspace();
        else if (notif.actionDept === 'immunization') openImmunizationWorkspace();
        else if (notif.actionDept === 'supplies') openSuppliesWorkspace();
      });

      list.appendChild(card);
    }
    container.appendChild(list);
  }

  // --- 5. Households & Beneficiaries Directory ---
  function openHouseholdsDirectory() {
    openWorkspace(
      'Ward 4 Households & Registry',
      '42 Registered Households • Search beneficiaries to start voice visit or checkup',
      'Shivajinagar',
      renderHouseholdsDirectory,
    );
  }

  function renderHouseholdsDirectory(container) {
    const search = el('input', 'w-full h-10 rounded-xl border border-surface-container-highest bg-white px-3.5 text-xs font-medium text-on-surface mb-3 focus:outline-none focus:border-primary');
    search.type = 'search';
    search.placeholder = 'Search by beneficiary name, ID, or house no...';
    search.value = householdSearchQuery;
    search.addEventListener('input', (e) => {
      householdSearchQuery = e.target.value;
      renderHouseholdRows(rowsWrap);
    });
    container.appendChild(search);

    const filters = [
      {key: 'all', label: 'All'},
      {key: 'maternal', label: 'ANC / PNC'},
      {key: 'infant', label: 'Infants'},
      {key: 'hrp', label: 'High Risk'},
    ];
    const fRow = el('div', 'flex items-center gap-1.5 mb-3');
    for (const f of filters) {
      const b = el(
        'button',
        `px-3 py-1.5 rounded-full text-[11px] font-semibold ${
          activeHouseholdFilter === f.key ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
        }`,
        f.label,
      );
      b.type = 'button';
      b.addEventListener('click', () => {
        activeHouseholdFilter = f.key;
        refreshActiveWorkspace();
      });
      fRow.appendChild(b);
    }
    container.appendChild(fRow);

    const rowsWrap = el('div', 'flex flex-col gap-2.5');
    container.appendChild(rowsWrap);
    renderHouseholdRows(rowsWrap);
  }

  function renderHouseholdRows(rowsWrap) {
    rowsWrap.replaceChildren();
    const q = householdSearchQuery.trim().toLowerCase();
    const combined = [
      ...state.maternalPatients.map((p) => ({
        id: p.id,
        name: p.name,
        sub: `${p.stage} • ${p.household}`,
        category: 'maternal',
        highRisk: p.highRisk,
        dept: 'maternal',
      })),
      ...state.immunizationRecords.map((c) => ({
        id: c.id,
        name: c.childName,
        sub: `Child (${c.ageLabel}) • Mother: ${c.motherName} • ${c.household}`,
        category: 'infant',
        highRisk: c.status === 'overdue',
        dept: 'immunization',
      })),
    ].filter((entry) => {
      if (activeHouseholdFilter === 'maternal' && entry.category !== 'maternal') return false;
      if (activeHouseholdFilter === 'infant' && entry.category !== 'infant') return false;
      if (activeHouseholdFilter === 'hrp' && !entry.highRisk) return false;
      if (q && !`${entry.name} ${entry.id} ${entry.sub}`.toLowerCase().includes(q)) return false;
      return true;
    });

    if (combined.length === 0) {
      rowsWrap.appendChild(el('p', 'text-center text-xs text-on-surface-variant py-6', 'No matching beneficiaries found in Ward 4.'));
      return;
    }

    for (const item of combined) {
      const row = el('div', 'p-3 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center justify-between gap-2');
      const left = el('div', 'flex flex-col min-w-0');
      const top = el('div', 'flex items-center gap-1.5');
      top.appendChild(el('span', 'font-label-md text-[13px] font-bold text-on-surface truncate', item.name));
      top.appendChild(el('span', 'text-[10px] font-semibold text-primary bg-surface-container-high px-1.5 py-0.5 rounded', item.id));
      left.appendChild(top);
      left.appendChild(el('span', 'text-[11px] text-on-surface-variant truncate', item.sub));
      row.appendChild(left);

      const btn = el('button', 'px-3 py-2 rounded-xl bg-primary-container text-on-primary text-[11px] font-bold shrink-0 active:scale-95 transition-all', 'Voice Visit');
      btn.type = 'button';
      btn.addEventListener('click', () => launchVoiceForBeneficiary(item.dept, item.id));
      row.appendChild(btn);
      rowsWrap.appendChild(row);
    }
  }

  // --- 6. Today's Visit Schedule & Shift Progress Sheet ---
  function openVisitsScheduleSheet() {
    openWorkspace(
      `Today's Field Visits (${state.visitsCompleted}/${state.visitsTarget})`,
      'Ward 4 Shift Progress • Completed logs and pending visits',
      'Shift Active',
      renderVisitsScheduleSheet,
    );
  }

  function renderVisitsScheduleSheet(container) {
    const pct = Math.min(100, Math.round((state.visitsCompleted / state.visitsTarget) * 100));
    const barWrap = el('div', 'p-3.5 rounded-2xl bg-surface-container-low border border-surface-container mb-3');
    const barHeader = el('div', 'flex items-center justify-between text-xs font-bold mb-1.5');
    barHeader.append(el('span', 'text-on-surface', 'Daily Visit Target'), el('span', 'text-secondary', `${pct}% (${state.visitsCompleted}/${state.visitsTarget})`));
    const track = el('div', 'w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden');
    const fill = el('div', 'h-full rounded-full bg-secondary transition-all duration-300');
    fill.style.width = `${pct}%`;
    track.appendChild(fill);
    barWrap.append(barHeader, track);
    container.appendChild(barWrap);

    container.appendChild(el('h4', 'font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider mb-2', 'Recent Completed Visits'));
    const list = el('div', 'flex flex-col gap-2 mb-4');
    for (const v of state.visitHistory.slice(0, 8)) {
      const row = el('div', 'p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between gap-2');
      const left = el('div', 'flex flex-col min-w-0');
      left.appendChild(el('span', 'font-label-md text-[13px] font-bold text-on-surface', `${v.beneficiaryName} (${v.beneficiaryId})`));
      left.appendChild(el('span', 'text-[11px] text-on-surface-variant', `${v.visitType} • Weight: ${v.weightKg || '—'} kg • ${v.source}`));
      row.appendChild(left);
      const right = el('div', 'flex flex-col items-end shrink-0');
      right.appendChild(el('span', 'text-[10px] font-bold text-secondary', v.time));
      if (v.phcReferral) {
        right.appendChild(el('span', 'text-[10px] font-bold text-error', 'PHC Referral'));
      }
      row.appendChild(right);
      list.appendChild(row);
    }
    container.appendChild(list);

    const cta = el('button', 'w-full py-3 rounded-xl bg-primary-container text-on-primary text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all');
    cta.type = 'button';
    cta.append(icon('mic', 'text-[18px]'), el('span', '', 'Start Next Voice Visit'));
    cta.addEventListener('click', () => launchVoiceForBeneficiary('maternal', 'ASHA-104'));
    container.appendChild(cta);
  }

  // --- 7. ASHA Profile Sheet ---
  function openProfileSheet() {
    openWorkspace(
      'Sunita Devi',
      'Accredited Social Health Activist (ASHA) • Ward 4, Shivajinagar',
      'ID: ASHA-W4-019',
      (container) => {
        const card = el('div', 'p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3 mb-3');
        const img = el('img', 'w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 bg-white');
        img.src = '/avatar-sunita.svg';
        img.alt = 'Sunita Devi';
        const info = el('div', 'flex flex-col');
        info.appendChild(el('span', 'font-headline-sm text-[15px] font-bold text-on-surface', 'Sunita Devi'));
        info.appendChild(el('span', 'text-xs text-secondary font-semibold', 'PHC Hub: Shivajinagar Sub-Centre'));
        info.appendChild(el('span', 'text-[11px] text-on-surface-variant mt-0.5', `Shift Progress: ${state.visitsCompleted}/${state.visitsTarget} visits • 42 Households`));
        card.append(img, info);
        container.appendChild(card);

        const actions = el('div', 'grid grid-cols-2 gap-2');
        const b1 = el('button', 'py-2.5 px-3 rounded-xl bg-primary-container text-on-primary text-xs font-semibold flex items-center justify-center gap-1.5');
        b1.type = 'button';
        b1.append(icon('mic', 'text-[16px]'), el('span', '', 'Voice Visit'));
        b1.addEventListener('click', () => launchVoiceForBeneficiary('maternal', 'ASHA-104'));

        const b2 = el('button', 'py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5');
        b2.type = 'button';
        b2.append(icon('settings', 'text-[16px]'), el('span', '', 'Settings'));
        b2.addEventListener('click', () => openSettingsWorkspace());

        const b3 = el('button', 'py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5');
        b3.type = 'button';
        b3.append(icon('bar_chart', 'text-[16px]'), el('span', '', 'Reports'));
        b3.addEventListener('click', () => openAnalyticsWorkspace());

        const b4 = el('button', 'py-2.5 px-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center justify-center gap-1.5');
        b4.type = 'button';
        b4.append(icon('logout', 'text-[16px]'), el('span', '', 'End Shift'));
        b4.addEventListener('click', () => openLogoutSheet());

        actions.append(b1, b2, b3, b4);
        container.appendChild(actions);
      },
    );
  }

  // --- 8. Community ANM On Call (Sister Lakshmi) Sheet ---
  function stopAnmCallTimer() {
    if (anmCallTimerId !== null) {
      window.clearInterval(anmCallTimerId);
      anmCallTimerId = null;
    }
    anmCallSeconds = 0;
  }

  function formatDuration(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function openAnmCallSheet() {
    openWorkspace(
      'Community ANM On Call',
      'Sister Lakshmi (ANM Supervisor) • Shivajinagar PHC Tele-Advice',
      'Available Now',
      renderAnmCallSheet,
    );
  }

  function renderAnmCallSheet(container) {
    const isCalling = anmCallTimerId !== null;
    const callBox = el('div', 'p-4 rounded-2xl bg-primary-container text-on-primary flex flex-col items-center text-center gap-2.5 mb-3');
    const avatar = el('div', 'w-14 h-14 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center');
    avatar.appendChild(icon(isCalling ? 'phone_in_talk' : 'headset_mic', 'text-[28px]'));
    callBox.appendChild(avatar);
    callBox.appendChild(el('div', 'font-headline-sm text-[16px] font-bold', 'Sister Lakshmi — ANM'));
    const timerEl = el('div', 'text-xs text-primary-fixed font-semibold tabular-nums', isCalling ? `Connected • ${formatDuration(anmCallSeconds)}` : 'Ready for clinical tele-advice & HRP escalation');
    timerEl.id = 'anm-call-timer-text';
    callBox.appendChild(timerEl);

    const btnRow = el('div', 'flex items-center gap-2 w-full mt-1');
    if (isCalling) {
      const muteBtn = el('button', `flex-1 py-2.5 rounded-xl text-xs font-bold ${anmCallMuted ? 'bg-white text-primary' : 'bg-white/15 text-white'}`, anmCallMuted ? 'Unmute' : 'Mute');
      muteBtn.type = 'button';
      muteBtn.addEventListener('click', () => {
        anmCallMuted = !anmCallMuted;
        refreshActiveWorkspace();
      });

      const spkBtn = el('button', `flex-1 py-2.5 rounded-xl text-xs font-bold ${anmCallSpeaker ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-white/15 text-white'}`, anmCallSpeaker ? 'Speaker On' : 'Speaker');
      spkBtn.type = 'button';
      spkBtn.addEventListener('click', () => {
        anmCallSpeaker = !anmCallSpeaker;
        refreshActiveWorkspace();
      });

      const endBtn = el('button', 'flex-1 py-2.5 rounded-xl bg-error text-white text-xs font-bold', 'End Call');
      endBtn.type = 'button';
      endBtn.addEventListener('click', () => {
        stopAnmCallTimer();
        refreshActiveWorkspace();
        showToast('ANM Call Ended', 'Tele-advice session logged for Ward 4', 'info');
      });
      btnRow.append(muteBtn, spkBtn, endBtn);
    } else {
      const startBtn = el('button', 'flex-1 py-2.5 px-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all');
      startBtn.type = 'button';
      startBtn.append(icon('call', 'text-[16px]'), el('span', '', 'Start Tele-Advice'));
      startBtn.addEventListener('click', () => {
        anmCallSeconds = 0;
        anmCallTimerId = window.setInterval(() => {
          anmCallSeconds += 1;
          const t = document.getElementById('anm-call-timer-text');
          if (t) t.textContent = `Connected • ${formatDuration(anmCallSeconds)}`;
        }, 1000);
        refreshActiveWorkspace();
      });

      const emergencyLink = el('a', 'py-2.5 px-3 rounded-xl bg-error text-white text-xs font-bold flex items-center justify-center gap-1.5');
      emergencyLink.href = 'tel:108';
      emergencyLink.append(icon('emergency', 'text-[16px]'), el('span', '', 'Dial 108'));
      btnRow.append(startBtn, emergencyLink);
    }
    callBox.appendChild(btnRow);
    container.appendChild(callBox);

    // Quick Escalation / Callback Form
    const form = el('form', 'p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2');
    form.appendChild(el('h4', 'font-label-md text-[13px] font-bold text-on-surface', 'Send Callback / Escalation Note'));
    const urgencySel = el('select', 'h-9 rounded-lg border border-surface-container-highest bg-white px-2.5 text-xs font-semibold text-on-surface');
    for (const optText of ['Routine Tele-Advice', 'Urgent High-Risk Pregnancy (HRP)', 'Emergency PHC Ambulance Request']) {
      const o = el('option', '', optText);
      o.value = optText;
      urgencySel.appendChild(o);
    }
    const msgInput = el('textarea', 'rounded-lg border border-surface-container-highest bg-white p-2.5 text-xs text-on-surface min-h-[68px]');
    msgInput.placeholder = 'Enter beneficiary name, symptoms, or callback request...';
    msgInput.required = true;
    const sendBtn = el('button', 'w-full py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold active:scale-95 transition-all', 'Send Note to Sister Lakshmi');
    sendBtn.type = 'submit';
    form.append(urgencySel, msgInput, sendBtn);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = msgInput.value.trim();
      if (!text) return;
      state.anmMessages.unshift({
        urgency: urgencySel.value,
        text,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      });
      saveState();
      refreshActiveWorkspace();
      showToast('Note Sent to ANM!', `${urgencySel.value} queued for Sister Lakshmi`);
    });
    container.appendChild(form);

    if (state.anmMessages.length > 0) {
      const log = el('div', 'mt-3 flex flex-col gap-1.5');
      log.appendChild(el('span', 'text-[11px] font-bold text-primary uppercase', 'Sent Notes'));
      for (const m of state.anmMessages.slice(0, 3)) {
        const item = el('div', 'p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container text-xs');
        item.appendChild(el('div', 'font-bold text-on-surface', `${m.urgency} • ${m.time}`));
        item.appendChild(el('div', 'text-on-surface-variant mt-0.5', m.text));
        log.appendChild(item);
      }
      container.appendChild(log);
    }
  }

  // --- 9. Navigation Drawer Workspaces ---
  function openAnalyticsWorkspace() {
    openWorkspace(
      'Analytics & Reports',
      'Ward 4 Shivajinagar • Live field metrics & CSV export',
      'Live Summary',
      (container) => {
        const grid = el('div', 'grid grid-cols-2 gap-2.5 mb-3');
        const stats = [
          {label: 'Today Visits', value: `${state.visitsCompleted}/${state.visitsTarget}`, accent: 'text-primary'},
          {label: 'ANC Completed', value: String(state.maternalAncDone), accent: 'text-secondary'},
          {label: 'Imm. Coverage', value: `${state.immunizationCoverage}%`, accent: 'text-secondary'},
          {label: 'PHC Referrals', value: String(state.visitHistory.filter((v) => v.phcReferral).length), accent: 'text-error'},
        ];
        for (const st of stats) {
          const box = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container');
          box.appendChild(el('div', 'text-[11px] text-on-surface-variant font-medium', st.label));
          box.appendChild(el('div', `text-xl font-bold mt-0.5 ${st.accent}`, st.value));
          grid.appendChild(box);
        }
        container.appendChild(grid);

        const exportBtn = el('button', 'w-full py-3 rounded-xl bg-primary-container text-on-primary text-xs font-bold flex items-center justify-center gap-2 mb-4 active:scale-95 transition-all');
        exportBtn.type = 'button';
        exportBtn.append(icon('download', 'text-[18px]'), el('span', '', 'Export Visit Register (CSV)'));
        exportBtn.addEventListener('click', () => {
          const headers = ['VisitID', 'BeneficiaryID', 'Name', 'VisitType', 'WeightKg', 'NextVisit', 'PHCReferral', 'Time', 'Source'];
          const rows = state.visitHistory.map((v) =>
            [v.id, v.beneficiaryId, v.beneficiaryName, v.visitType, v.weightKg, v.nextVisitDate, v.phcReferral, v.time, v.source]
              .map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`)
              .join(','),
          );
          const csv = [headers.join(','), ...rows].join('\n');
          const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `asha-ward4-report-${new Date().toISOString().slice(0, 10)}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          showToast('CSV Report Exported!', `${state.visitHistory.length} visit records downloaded`);
        });
        container.appendChild(exportBtn);

        container.appendChild(el('h4', 'font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider mb-2', 'Recorded Visit Log'));
        const list = el('div', 'flex flex-col gap-2');
        for (const v of state.visitHistory) {
          const r = el('div', 'p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs flex justify-between gap-2');
          const l = el('div', 'flex flex-col');
          l.appendChild(el('span', 'font-bold text-on-surface', `${v.beneficiaryName} (${v.visitType})`));
          l.appendChild(el('span', 'text-on-surface-variant', `Weight: ${v.weightKg || '—'} kg • Next: ${v.nextVisitDate || '—'}`));
          r.append(l, el('span', 'text-[10px] font-bold text-secondary shrink-0', v.time));
          list.appendChild(r);
        }
        container.appendChild(list);
      },
    );
  }

  function openProgrammesWorkspace() {
    openWorkspace(
      'National Health Programmes',
      'MoHFW scheme guidelines, checklists & eligibility logging',
      'NHM • RCH • PM-JAY',
      (container) => {
        const list = el('div', 'flex flex-col gap-3');
        for (const prog of HEALTH_PROGRAMMES) {
          const card = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col gap-2');
          const head = el('div', 'flex items-center justify-between gap-2');
          head.appendChild(el('span', 'font-headline-sm text-[14px] font-bold text-on-surface', prog.title));
          head.appendChild(el('span', 'px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold shrink-0', prog.code));
          card.appendChild(head);
          card.appendChild(el('p', 'text-xs text-on-surface-variant leading-relaxed', prog.summary));

          const ul = el('ul', 'space-y-1 pl-1');
          for (const item of prog.checklist) {
            const li = el('li', 'text-[11px] text-on-surface flex items-start gap-1.5');
            li.append(icon('check_circle', 'text-[14px] text-secondary mt-0.5 shrink-0'), el('span', '', item));
            ul.appendChild(li);
          }
          card.appendChild(ul);

          const logBtn = el('button', 'mt-1 py-2 px-3 rounded-xl bg-surface-container-high text-primary text-xs font-bold self-start active:scale-95 transition-all', `Log Beneficiary under ${prog.code}`);
          logBtn.type = 'button';
          logBtn.addEventListener('click', () => {
            const person = getSelectedBeneficiaryInfo();
            state.programmeLogs.unshift({
              programme: prog.code,
              beneficiary: `${person.name} (${person.id})`,
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            });
            saveState();
            showToast(`${prog.code} Eligibility Logged`, `${person.name} tagged for ${prog.title}`);
          });
          card.appendChild(logBtn);
          list.appendChild(card);
        }
        container.appendChild(list);
      },
    );
  }

  function openSettingsWorkspace() {
    openWorkspace(
      'Settings',
      'Voice dialect, read-back speed, sync, and display preferences',
      'Saved Locally',
      (container) => {
        const wrap = el('div', 'flex flex-col gap-3');

        // Language selector (10 Core STT Languages)
        const langCard = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container');
        langCard.appendChild(el('label', 'block text-xs font-bold text-on-surface mb-1', 'Preferred Voice Language (10 Core STT)'));
        langCard.appendChild(el('p', 'text-[11px] text-on-surface-variant mb-2', 'Hindi, Bengali, Marathi, Gujarati, Punjabi, Kannada, Telugu, Tamil, Malayalam, Indian English'));
        const langSel = el('select', 'w-full h-10 rounded-xl border border-surface-container-highest bg-surface-container-low px-3 text-xs font-semibold text-on-surface');
        const langOptions = [
          'Auto-detect (10 Core Indian Languages)',
          ...CORE_STT_LANGUAGES.map((l) => l.label),
        ];
        for (const opt of langOptions) {
          const o = el('option', '', opt);
          o.value = opt;
          if (state.settings.language === opt) o.selected = true;
          langSel.appendChild(o);
        }
        langSel.addEventListener('change', () => {
          state.settings.language = langSel.value;
          saveState();
          syncDashboardUI();
          showToast('Language Updated', state.settings.language, 'info');
        });
        langCard.appendChild(langSel);
        wrap.appendChild(langCard);

        // Read-back speed
        const speedCard = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container');
        speedCard.appendChild(el('div', 'text-xs font-bold text-on-surface mb-2', 'Spoken Read-Back Speed'));
        const speedRow = el('div', 'grid grid-cols-3 gap-2');
        for (const rate of [0.8, 1.0, 1.2]) {
          const btn = el(
            'button',
            `py-2 rounded-xl text-xs font-bold ${
              Number(state.settings.speechRate) === rate
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container-high text-on-surface'
            }`,
            `${rate.toFixed(1)}x`,
          );
          btn.type = 'button';
          btn.addEventListener('click', () => {
            state.settings.speechRate = rate;
            saveState();
            syncDashboardUI();
            refreshActiveWorkspace();
            showToast('Playback Speed Saved', `Read-back speed set to ${rate.toFixed(1)}x`, 'info');
          });
          speedRow.appendChild(btn);
        }
        speedCard.appendChild(speedRow);
        wrap.appendChild(speedCard);

        // Toggle helper
        function makeToggle(title, subtitle, checked, onChange) {
          const row = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center justify-between gap-3');
          const l = el('div', 'flex flex-col');
          l.appendChild(el('span', 'text-xs font-bold text-on-surface', title));
          l.appendChild(el('span', 'text-[11px] text-on-surface-variant', subtitle));
          const btn = el(
            'button',
            `w-12 h-7 rounded-full p-1 transition-colors flex items-center ${checked ? 'bg-secondary justify-end' : 'bg-outline-variant justify-start'}`,
          );
          btn.type = 'button';
          btn.setAttribute('aria-pressed', String(checked));
          btn.appendChild(el('span', 'w-5 h-5 rounded-full bg-white shadow'));
          btn.addEventListener('click', () => {
            onChange(!checked);
            saveState();
            syncDashboardUI();
            refreshActiveWorkspace();
          });
          row.append(l, btn);
          return row;
        }

        wrap.appendChild(
          makeToggle(
            'Auto-Sync on Mobile Data',
            'Sync saved visit records whenever network is available',
            state.settings.autoSyncMobile,
            (val) => {
              state.settings.autoSyncMobile = val;
            },
          ),
        );
        wrap.appendChild(
          makeToggle(
            'Large Field Readability Mode',
            'Increase text size for outdoor sunlight visibility',
            state.settings.largeText,
            (val) => {
              state.settings.largeText = val;
            },
          ),
        );

        const resetBtn = el('button', 'mt-2 w-full py-3 rounded-xl bg-error-container text-on-error-container text-xs font-bold active:scale-95 transition-all', 'Reset All Local Demo Data');
        resetBtn.type = 'button';
        resetBtn.addEventListener('click', () => {
          state = cloneDefault();
          saveState();
          syncDashboardUI();
          refreshActiveWorkspace();
          const resetRecordBtn = document.getElementById('reset-record-btn');
          if (resetRecordBtn) resetRecordBtn.click();
          showToast('Demo Data Reset', 'Restored Ward 4 initial dashboard state', 'info');
        });
        wrap.appendChild(resetBtn);
        container.appendChild(wrap);
      },
    );
  }

  function openHelpWorkspace() {
    openWorkspace(
      'Help & Backend Diagnostics',
      'Voice command guide, ANM hotline, and LiveKit server health check',
      'ASHA Guide',
      (container) => {
        // Backend status check card
        const diagCard = el('div', 'p-3.5 rounded-2xl bg-surface-container-low border border-surface-container mb-3');
        const diagTop = el('div', 'flex items-center justify-between gap-2 mb-2');
        diagTop.appendChild(el('span', 'text-xs font-bold text-on-surface', 'LiveKit Voice Backend Status'));
        const checkBtn = el('button', 'px-2.5 py-1 rounded-lg bg-primary-container text-on-primary text-[11px] font-bold', 'Run Check');
        checkBtn.type = 'button';
        diagTop.appendChild(checkBtn);
        diagCard.appendChild(diagTop);

        const diagOut = el('div', 'text-[11px] text-on-surface-variant leading-relaxed', 'Checking server endpoints...');
        diagCard.appendChild(diagOut);
        container.appendChild(diagCard);

        async function runDiag() {
          diagOut.textContent = 'Checking /health and /token...';
          try {
            const hRes = await fetch('/health');
            const hJson = await hRes.json();
            const tRes = await fetch('/token?room=asha-demo&beneficiary_id=ASHA-104');
            const svcName = hJson.service || hJson.app || 'SwasthyaVaani';
            if (tRes.ok) {
              diagOut.textContent = `Web Server: OK (${svcName}) • LiveKit /token: Ready & Configured!`;
            } else {
              const tJson = await tRes.json().catch(() => ({}));
              diagOut.textContent = `Web Server: OK (${svcName}) • LiveKit /token: HTTP ${tRes.status} (${tJson.detail || 'Awaiting backend credentials'}). Use Local Voice / Manual Entry workaround until backend is connected.`;
            }
          } catch {
            diagOut.textContent = 'Offline or unable to reach local server.';
          }
        }
        checkBtn.addEventListener('click', runDiag);
        void runDiag();

        // Supported 10 Core STT Languages list
        const langsBox = el('div', 'p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container mb-3');
        langsBox.appendChild(el('h4', 'font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider mb-2', 'Supported STT Voice Languages (10 Core)'));
        const langChips = el('div', 'flex flex-wrap gap-1.5');
        for (const lang of CORE_STT_LANGUAGES) {
          langChips.appendChild(el('span', 'px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-[11px] font-semibold', lang.name));
        }
        langsBox.appendChild(langChips);
        container.appendChild(langsBox);

        // Sample phrases with real SpeechSynthesis playback
        container.appendChild(el('h4', 'font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider mb-2', 'Sample Voice Dictation Phrases'));
        const list = el('div', 'flex flex-col gap-2 mb-3');
        for (const sample of VOICE_PHRASE_SAMPLES) {
          const box = el('div', 'p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex items-start justify-between gap-2');
          const l = el('div', 'flex flex-col');
          l.appendChild(el('span', 'text-[10px] font-bold text-secondary uppercase', sample.tag));
          l.appendChild(el('span', 'text-xs text-on-surface mt-0.5', `“${sample.text}”`));
          const play = el('button', 'w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 active:scale-90');
          play.type = 'button';
          play.title = 'Listen to sample phrase';
          play.appendChild(icon('volume_up', 'text-[18px]'));
          play.addEventListener('click', () => speakText(sample.text, sample.lang));
          box.append(l, play);
          list.appendChild(box);
        }
        container.appendChild(list);

        const anmBtn = el('button', 'w-full py-3 rounded-xl bg-secondary text-on-secondary text-xs font-bold flex items-center justify-center gap-2');
        anmBtn.type = 'button';
        anmBtn.append(icon('headset_mic', 'text-[18px]'), el('span', '', 'Contact ANM Sister Lakshmi'));
        anmBtn.addEventListener('click', () => openAnmCallSheet());
        container.appendChild(anmBtn);
      },
    );
  }

  function openLogoutSheet() {
    openWorkspace(
      'End Shift & Sign Out?',
      'Your saved Ward 4 field records remain stored safely on this device.',
      'Shift Control',
      (container) => {
        const box = el('div', 'p-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-xs text-on-surface-variant mb-4 leading-relaxed', `Signed in as Sunita Devi (Ward 4 • Shivajinagar). Completed ${state.visitsCompleted}/${state.visitsTarget} visits today.`);
        container.appendChild(box);
        const row = el('div', 'flex gap-2');
        const cancelBtn = el('button', 'flex-1 py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold', 'Stay Signed In');
        cancelBtn.type = 'button';
        cancelBtn.addEventListener('click', closeWorkspace);

        const confirmBtn = el('button', 'flex-1 py-3 rounded-xl bg-error text-white text-xs font-bold', 'Sign Out Now');
        confirmBtn.type = 'button';
        confirmBtn.addEventListener('click', () => {
          const sessionBtn = document.getElementById('session-toggle-btn');
          if (sessionBtn && sessionBtn.getAttribute('aria-pressed') === 'true') {
            sessionBtn.click();
          }
          state.signedOut = true;
          saveState();
          closeWorkspace();
          syncDashboardUI();
        });
        row.append(cancelBtn, confirmBtn);
        container.appendChild(row);
      },
    );
  }

  // --- Web Speech Synthesis Read-Back ---
  function speakText(text, lang) {
    if (!('speechSynthesis' in window)) {
      showToast('Audio Read-Back', 'Speech synthesis is not supported in this browser.', 'info');
      return false;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang || 'en-IN';
      utter.rate = Number(state.settings.speechRate || 1.0);
      window.speechSynthesis.speak(utter);
      return true;
    } catch {
      return false;
    }
  }

  // --- Voice Modal Enhancements & Offline Workaround ---
  function syncReviewCardMetadata() {
    const info = getSelectedBeneficiaryInfo();
    const avatarEl = document.getElementById('review-beneficiary-initials');
    const hrpBadge = document.getElementById('review-hrp-badge');
    const rawNoteEl = document.getElementById('review-raw-note');
    const ifaSummaryEl = document.getElementById('review-ifa-summary');

    if (avatarEl) avatarEl.textContent = getInitials(info.name);
    if (hrpBadge) hrpBadge.classList.toggle('hidden', !info.highRisk);

    const liveWeight = document.getElementById('val-weight-kg')?.textContent || '—';
    const liveVisitType = document.getElementById('val-visit-type')?.textContent || info.visitType;
    const liveNext = document.getElementById('val-next-visit-date')?.textContent || info.nextVisit || '—';
    const liveVax = document.getElementById('val-vaccinations-due')?.textContent || 'None recorded';

    if (rawNoteEl) {
      rawNoteEl.textContent =
        currentTranscriptNote ||
        `“${liveVisitType} for ${info.name} (${info.id}, Ward 4). Weight: ${liveWeight}. Vaccinations: ${liveVax}. Next visit: ${liveNext}.”`;
    }
    if (ifaSummaryEl) {
      ifaSummaryEl.textContent =
        info.ifaGiven > 0
          ? `${info.ifaGiven} IFA Tablets Dispensed`
          : 'Routine Field Visit Dispensing';
    }
  }

  function applyLocalSpeechToFields(transcript) {
    currentTranscriptNote = `“${transcript}”`;
    const lower = transcript.toLowerCase();

    // Parse simple weight (e.g. "54.5 kg" or "55 kilo")
    const weightMatch = lower.match(/(\d{1,3}(?:\.\d+)?)\s*(?:kg|kilo|kilogram)/i);
    const weightVal = weightMatch ? weightMatch[1] : '';

    // Detect danger words
    const hasDanger = /bleed|fever|headache|blur|swell|breath|danger|emergency|refer/i.test(lower);

    if (hasDanger) {
      const dangerBtn = document.querySelector('[data-sim-type="danger"]');
      if (dangerBtn) dangerBtn.click();
    } else {
      const normalBtn = document.querySelector('[data-sim-type="normal"]');
      if (normalBtn) normalBtn.click();
    }

    if (weightVal) {
      const wEl = document.getElementById('val-weight-kg');
      if (wEl) wEl.textContent = `${weightVal} kg`;
    }

    syncReviewCardMetadata();
    if (typeof window.showStep === 'function') {
      window.showStep('review');
    }
    showToast('Local Voice Captured!', 'Review or edit extracted fields below before saving.');
  }

  function toggleLocalBrowserDictation() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const btn = document.getElementById('local-voice-dictate-btn');
    const btnLabel = document.getElementById('local-voice-dictate-label');

    if (isLocalDictating && localSpeechRecognition) {
      localSpeechRecognition.stop();
      return;
    }

    if (!SpeechRec) {
      openManualReviewEditor();
      showToast('Browser Speech Unavailable', 'Opened Manual Visit Entry so you can log vitals directly.', 'info');
      return;
    }

    try {
      const recognition = new SpeechRec();
      localSpeechRecognition = recognition;
      const matchedLang = CORE_STT_LANGUAGES.find((l) => l.label === state.settings.language);
      recognition.lang = matchedLang ? matchedLang.code : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isLocalDictating = true;
        if (btn) btn.classList.add('!bg-error', '!text-white');
        if (btnLabel) btnLabel.textContent = 'Listening Locally... (Tap Stop)';
      };

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript.trim()) {
          applyLocalSpeechToFields(transcript.trim());
        }
      };

      recognition.onerror = () => {
        isLocalDictating = false;
        if (btn) btn.classList.remove('!bg-error', '!text-white');
        if (btnLabel) btnLabel.textContent = 'Browser Mic (Offline Fallback)';
        openManualReviewEditor();
        showToast('Mic Blocked / Unavailable', 'Switched to Manual Visit Entry workaround.', 'info');
      };

      recognition.onend = () => {
        isLocalDictating = false;
        if (btn) btn.classList.remove('!bg-error', '!text-white');
        if (btnLabel) btnLabel.textContent = 'Browser Mic (Offline Fallback)';
      };

      recognition.start();
    } catch {
      openManualReviewEditor();
    }
  }

  function openManualReviewEditor() {
    syncReviewCardMetadata();
    if (typeof window.showStep === 'function') {
      window.showStep('review');
    }
    manualEditOpen = true;
    syncManualEditFormVisibility();
  }

  function syncManualEditFormVisibility() {
    const form = document.getElementById('manual-review-editor');
    const toggleBtn = document.getElementById('toggle-manual-edit-btn');
    if (!form) return;
    form.classList.toggle('hidden', !manualEditOpen);
    if (toggleBtn) {
      toggleBtn.textContent = manualEditOpen ? 'Hide Manual Editor' : 'Edit Fields Manually';
    }
    if (manualEditOpen) {
      const info = getSelectedBeneficiaryInfo();
      const visitTypeIn = document.getElementById('manual-visit-type');
      const weightIn = document.getElementById('manual-weight-kg');
      const vaxIn = document.getElementById('manual-vaccinations');
      const nextIn = document.getElementById('manual-next-visit');
      const curWeight = (document.getElementById('val-weight-kg')?.textContent || '').replace(/[^\d.]/g, '');
      const curType = document.getElementById('val-visit-type')?.textContent || info.visitType;
      const curNext = document.getElementById('val-next-visit-date')?.textContent || info.nextVisit;
      const curVax = document.getElementById('val-vaccinations-due')?.textContent || '';

      if (visitTypeIn) visitTypeIn.value = curType === '—' ? info.visitType : curType;
      if (weightIn) weightIn.value = curWeight || info.weightKg || '';
      if (vaxIn) vaxIn.value = curVax === 'None recorded' ? '' : curVax;
      if (nextIn) nextIn.value = /^\d{4}-\d{2}-\d{2}$/.test(curNext) ? curNext : info.nextVisit || '2026-12-20';
    }
  }

  // Override global review helpers with real working implementations
  window.toggleAudioPlayback = function toggleAudioPlayback() {
    const playIcon = document.getElementById('play-icon');
    const label = document.getElementById('play-status-label');
    if (!('speechSynthesis' in window)) {
      showToast('Audio Read-Back Unavailable', 'Your browser does not support speech synthesis.', 'info');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (playIcon) playIcon.textContent = 'play_arrow';
      if (label) label.textContent = 'Spoken Read-back preview';
      return;
    }

    const name = document.getElementById('val-beneficiary-name')?.textContent || 'Beneficiary';
    const type = document.getElementById('val-visit-type')?.textContent || 'Visit';
    const weight = document.getElementById('val-weight-kg')?.textContent || 'not recorded';
    const next = document.getElementById('val-next-visit-date')?.textContent || 'not scheduled';
    const summaryText = `${type} summary for ${name}. Recorded weight is ${weight}. Next scheduled checkup is ${next}.`;

    const utter = new SpeechSynthesisUtterance(summaryText);
    utter.lang = 'en-IN';
    utter.rate = Number(state.settings.speechRate || 1.0);
    utter.onstart = () => {
      if (playIcon) playIcon.textContent = 'stop';
      if (label) label.textContent = 'Reading visit summary aloud...';
    };
    utter.onend = () => {
      if (playIcon) playIcon.textContent = 'play_arrow';
      if (label) label.textContent = 'Spoken Read-back preview';
    };
    utter.onerror = () => {
      if (playIcon) playIcon.textContent = 'play_arrow';
      if (label) label.textContent = 'Spoken Read-back preview';
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  window.saveAndSyncRecord = function saveAndSyncRecord() {
    const confirmSimBtn = document.querySelector('[data-sim-type="confirm"]');
    if (confirmSimBtn) confirmSimBtn.click();

    const name = document.getElementById('val-beneficiary-name')?.textContent || 'Beneficiary';
    const id = document.getElementById('val-beneficiary-id')?.textContent || 'ASHA-104';
    const visitType = document.getElementById('val-visit-type')?.textContent || 'ANC Checkup';
    const weightText = (document.getElementById('val-weight-kg')?.textContent || '').replace(/\s*kg/i, '').trim();
    const nextVisit = document.getElementById('val-next-visit-date')?.textContent || '—';
    const vaxText = document.getElementById('val-vaccinations-due')?.textContent || '';
    const phcVisible = !document.getElementById('phc-referral-banner')?.classList.contains('hidden');

    const patient = state.maternalPatients.find((p) => p.id === id);
    if (patient) {
      if (weightText && weightText !== '—') patient.weightKg = weightText;
      if (nextVisit && nextVisit !== '—') patient.nextVisit = nextVisit;
      if (patient.status !== 'completed') {
        patient.status = 'completed';
        state.maternalAncDone += 1;
      }
    }
    const child = state.immunizationRecords.find((c) => c.id === id);
    if (child && child.status !== 'vaccinated') {
      child.status = 'vaccinated';
      state.immunizationCoverage = Math.min(100, state.immunizationCoverage + 2);
    }

    state.visitsCompleted = Math.min(state.visitsTarget, state.visitsCompleted + 1);
    state.lastSyncedLabel = 'Last synced just now';
    state.visitHistory.unshift({
      id: `VIS-${Date.now().toString().slice(-4)}`,
      beneficiaryId: id,
      beneficiaryName: name,
      visitType,
      weightKg: weightText === '—' ? '' : weightText,
      vaccinationsDue: vaxText && vaxText !== 'None recorded' ? vaxText.split('·').map((s) => s.trim()) : [],
      nextVisitDate: nextVisit === '—' ? '' : nextVisit,
      phcReferral: phcVisible,
      dangerSigns: phcVisible ? ['PHC Referral Flagged'] : [],
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      source: 'Voice / Field Register',
    });

    currentTranscriptNote = '';
    manualEditOpen = false;
    saveState();
    syncDashboardUI();

    if (typeof window.closeVoiceModal === 'function') window.closeVoiceModal();
    if (typeof window.resetVoiceModal === 'function') window.resetVoiceModal();

    showToast('Record Updated & Synced!', `${name} (${id}) saved to Ward 4 register`);
  };

  window.discardVoiceRecord = function discardVoiceRecord() {
    currentTranscriptNote = '';
    manualEditOpen = false;
    const resetBtn = document.getElementById('reset-record-btn');
    if (resetBtn) resetBtn.click();
    if (typeof window.resetVoiceModal === 'function') window.resetVoiceModal();
    showToast('Draft Discarded', 'Visit record fields cleared back to default', 'info');
  };

  // --- Wire Everything on DOMContentLoaded ---
  function bindInteractiveUI() {
    syncDashboardUI();

    // Header actions
    document.getElementById('header-brand-btn')?.addEventListener('click', () => {
      closeWorkspace();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    document.getElementById('session-status-badge')?.addEventListener('click', () => {
      if (typeof window.openVoiceModalForDept === 'function') {
        window.openVoiceModalForDept('maternal');
      }
    });

    document.getElementById('notifications-btn')?.addEventListener('click', openNotificationsSheet);
    document.getElementById('profile-avatar-btn')?.addEventListener('click', openProfileSheet);

    // Greeting context chips & visits dial
    document.getElementById('ward-chip-btn')?.addEventListener('click', openVisitsScheduleSheet);
    document.getElementById('households-chip-btn')?.addEventListener('click', openHouseholdsDirectory);
    document.getElementById('visits-dial-btn')?.addEventListener('click', openVisitsScheduleSheet);

    // Department Cards & CTA Buttons -> Real Working Department Workspaces!
    const deptHandlers = {
      maternal: openMaternalWorkspace,
      immunization: openImmunizationWorkspace,
      supplies: openSuppliesWorkspace,
    };

    document.querySelectorAll('article[data-dept]').forEach((card) => {
      card.addEventListener('click', () => {
        const dept = card.getAttribute('data-dept');
        if (deptHandlers[dept]) deptHandlers[dept]();
      });
    });

    document.querySelectorAll('.dept-btn[data-dept]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dept = btn.getAttribute('data-dept');
        if (deptHandlers[dept]) deptHandlers[dept]();
      });
    });

    const deptDefaultBeneficiary = {
      maternal: 'ASHA-104',
      immunization: 'ASHA-106',
      supplies: null,
    };

    document.querySelectorAll('.dept-voice-btn[data-dept]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dept = btn.getAttribute('data-dept') || 'maternal';
        const defaultBeneficiary = deptDefaultBeneficiary[dept];
        if (typeof window.showStep === 'function') window.showStep('record');
        launchVoiceForBeneficiary(dept, defaultBeneficiary);
      });
    });

    // Community ANM On Call Banner
    document.getElementById('anm-on-call-card')?.addEventListener('click', (e) => {
      e.preventDefault();
      openAnmCallSheet();
    });

    // Navigation Drawer links
    document.getElementById('nav-analytics-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      openAnalyticsWorkspace();
    });

    document.getElementById('nav-programmes-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      openProgrammesWorkspace();
    });

    document.getElementById('nav-settings-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      openSettingsWorkspace();
    });

    document.getElementById('nav-help-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      openHelpWorkspace();
    });

    document.getElementById('nav-logout-btn')?.addEventListener('click', () => {
      if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      openLogoutSheet();
    });

    // Resume shift button on signed-out overlay
    document.getElementById('resume-shift-btn')?.addEventListener('click', () => {
      state.signedOut = false;
      saveState();
      syncDashboardUI();
      showToast('Welcome Back, Sunita!', 'Ward 4 ASHA shift resumed');
    });

    // Voice modal workaround controls
    document.getElementById('local-voice-dictate-btn')?.addEventListener('click', toggleLocalBrowserDictation);
    document.getElementById('open-manual-entry-btn')?.addEventListener('click', openManualReviewEditor);
    document.getElementById('load-sample-visit-btn')?.addEventListener('click', () => {
      const normalBtn = document.querySelector('[data-sim-type="normal"]');
      if (normalBtn) normalBtn.click();
      currentTranscriptNote = '';
      syncReviewCardMetadata();
      if (typeof window.showStep === 'function') window.showStep('review');
      showToast('Sample LiveKit Packet Loaded', 'Review extracted fields or test Danger/Confirm patches');
    });

    document.getElementById('toggle-manual-edit-btn')?.addEventListener('click', () => {
      manualEditOpen = !manualEditOpen;
      syncManualEditFormVisibility();
    });

    document.getElementById('manual-review-editor')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const visitType = document.getElementById('manual-visit-type')?.value.trim();
      const weightKg = document.getElementById('manual-weight-kg')?.value.trim();
      const vax = document.getElementById('manual-vaccinations')?.value.trim();
      const nextVisit = document.getElementById('manual-next-visit')?.value.trim();
      const dangerChecked = document.getElementById('manual-danger-check')?.checked;

      if (visitType) {
        const elType = document.getElementById('val-visit-type');
        if (elType) elType.textContent = visitType;
      }
      if (weightKg) {
        const elW = document.getElementById('val-weight-kg');
        if (elW) elW.textContent = `${weightKg} kg`;
      }
      if (vax) {
        const elVax = document.getElementById('val-vaccinations-due');
        if (elVax) {
          elVax.replaceChildren();
          elVax.appendChild(el('span', 'leading-snug', vax));
        }
      }
      if (nextVisit) {
        const elNext = document.getElementById('val-next-visit-date');
        if (elNext) elNext.textContent = nextVisit;
      }
      if (dangerChecked) {
        const dangerBtn = document.querySelector('[data-sim-type="danger"]');
        if (dangerBtn) dangerBtn.click();
      }

      currentTranscriptNote = `“Manual field update logged: ${visitType || 'Visit'}, Weight ${weightKg || '—'} kg, Next checkup ${nextVisit || '—'}.”`;
      manualEditOpen = false;
      syncManualEditFormVisibility();
      syncReviewCardMetadata();
      showToast('Fields Applied!', 'Tap "Update Patient Record" to save & sync.');
    });

    // When Demo Simulator buttons in the nav drawer are clicked, give instant feedback & sync review metadata
    document.querySelectorAll('[data-sim-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.setTimeout(() => {
          syncReviewCardMetadata();
        }, 30);
        const type = btn.getAttribute('data-sim-type');
        if (type === 'danger') {
          showToast('Urgent PHC Referral Triggered!', 'Red clinical alert banner is now visible on dashboard.', 'error');
        } else if (type === 'normal' || type === 'correction') {
          showToast('Visit Patch Applied', 'Open "View Live Visit Record" in Voice Modal to inspect.', 'info');
        }
      });
    });

    // Sync review metadata whenever beneficiary changes
    document.getElementById('beneficiary-select')?.addEventListener('change', () => {
      currentTranscriptNote = '';
      window.setTimeout(syncReviewCardMetadata, 20);
    });

    // Open review button in voice modal
    document.getElementById('view-live-record-btn')?.addEventListener('click', () => {
      syncReviewCardMetadata();
      if (typeof window.showStep === 'function') window.showStep('review');
    });

    // Keyboard Escape closes open sheets
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeWorkspace();
        if (typeof window.closeVoiceModal === 'function') window.closeVoiceModal();
        if (typeof window.toggleNavMenu === 'function') window.toggleNavMenu(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindInteractiveUI);
  } else {
    bindInteractiveUI();
  }
})();
