---
name: Clinical Clarity & Compassionate Voice
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4948'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7978'
  outline-variant: '#bec9c7'
  surface-tint: '#216866'
  primary: '#004341'
  on-primary: '#ffffff'
  primary-container: '#0d5c5a'
  on-primary-container: '#8fd2cf'
  inverse-primary: '#8fd2cf'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#00424e'
  on-tertiary: '#ffffff'
  tertiary-container: '#005b6b'
  on-tertiary-container: '#4cd7f6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#abefeb'
  primary-fixed-dim: '#8fd2cf'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#00504e'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves Accredited Social Health Activists (ASHA workers) operating at the intersection of grassroots clinical care, rural field dispatch, and real-time AI speech interaction. The visual personality balances institutional credibility with empathetic, low-cognitive-load design. Interfaces must feel authoritative yet radically accessible under harsh daylight, intermittent connectivity, and high-distraction field environments.

The visual direction merges **Modern Functional Minimalism** with **Tactile Utility**. Surfaces are crisp, daylight-legible, and hygienic, utilizing structured tonal stratification rather than heavy ornament. Touch targets are generous and deliberate to accommodate single-handed field operation, rapid triage, and high-frequency voice recording.

## Colors

The palette establishes an immediate clinical baseline using deep, authoritative teal paired with lively biophilic mint and responsive cyan for real-time speech and active AI states.

- **Primary (`#0D5C5A`):** The clinical anchor. Used for primary actions, critical navigation anchors, active module states, and authoritative typography.
- **Secondary (`#14B8A6`):** The functional accent. Reserved for active voice waveforms, triage progress indicators, and affirmative interaction states.
- **Tertiary (`#06B6D4`):** The intelligence layer. Applied to conversational AI assistant triggers, transcript highlights, and listening feedback loops.
- **Neutral (`#64748B`):** Structural balance. Fuels secondary copy, disabled boundaries, and inactive iconography without dirtying the clinical white canvas.

### Semantic Triage & Workflow Tokens
- **Complete / Safe:** `#16A34A` (Background tint: `#F0FDF4`, Border tint: `#BBF7D0`)
- **Upcoming / Scheduled:** `#2563EB` (Background tint: `#EFF6FF`, Border tint: `#BFDBFE`)
- **Due Soon / Attention:** `#D97706` (Background tint: `#FFFBEB`, Border tint: `#FDE68A`)
- **Critical / Overdue / High-Risk Alert:** `#DC2626` (Background tint: `#FEF2F2`, Border tint: `#FECACA`)

Canvas backgrounds rely on alternating layers of pure `#FFFFFF`, soft slate `#F8FAFC`, and high-health emerald tint `#F0FDF4`. Outlines and module dividers are restrained strictly to `#E2E8F0` to maintain surface clarity.

## Typography

Inter serves as the universal typeface across all display, body, and operational metrics. Its geometric purity and tall x-height provide exceptional legibility for medical terminology, maternal tracking dates, and quantitative demographic records rendered on budget-grade IPS displays.

- **Numerals:** Tabular figures must be enabled (`font-variant-numeric: tabular-nums`) for health record tables, blood pressure counts, gestations, and diagnostic vitals.
- **Hierarchy:** High contrast between semibold labels (`label-md`) and standard body copy (`body-md`) ensures field workers quickly scan vital categories during rapid patient intake.
- **Scale Restraint:** Display levels on mobile devices are capped at 26px to preserve critical canvas real estate for patient task feeds and action items.

## Layout & Spacing

The layout philosophy prioritizes a mobile-first, single-column vertical flow optimized for rapid thumb reach. Tablet and desktop viewports reflow content into a structured clinical dashboard using a 12-column fluid grid.

- **Breakpoints:** Mobile (`< 640px`), Tablet (`640px - 1024px`), Desktop (`> 1024px`).
- **Mobile Paradigm:** Single column, full-width edge-padded containers (`margin: 1rem`). Sticky bottom action hubs house voice recording toggles and critical record commits.
- **Tablet / Field Hub Paradigm:** 2-column asymmetric split. Left column (40% width) hosts household roster and live voice transcript feeds; right column (60% width) displays expanded diagnostic cards, vaccination histories, and automated triage suggestions.
- **Touch Ergonomics:** All actionable touchpoints must maintain an internal vertical clearance of at least `space-md` (16px) or explicit height of 48px to prevent touch target overlap in field transit.

## Elevation & Depth

This system avoids heavy drop shadows, which reduce contrast and visually dirty screens in direct outdoor sunlight. Instead, spatial hierarchy is constructed using crisp micro-borders, surface tinting, and controlled ambient diffusion.

- **Canvas Base (Level 0):** `#F8FAFC` or `#F0FDF4`. Recessed background layer for application scrollers.
- **Module & Record Layer (Level 1):** Solid `#FFFFFF` cards bounded by a single structural border (`1px solid #E2E8F0`). Flat elevation without shadow; separation relies solely on contrasting background and border.
- **Interactive Floating Layer (Level 2):** Flyout drawers, triage quick-filters, and search headers. Elevated using a low-spread ambient shadow: `box-shadow: 0 4px 12px -2px rgba(13, 92, 90, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)`.
- **Active Voice & Emergency Modal Layer (Level 3):** AI recording bar, critical triage sheets, and voice listening halos. Styled with an elevated teal aura: `box-shadow: 0 10px 25px -5px rgba(13, 92, 90, 0.15), 0 8px 10px -6px rgba(13, 92, 90, 0.1)`.

## Shapes

The interface utilizes a soft, organic curvature to reinforce psychological calm and trust in rural healthcare delivery. 

- **Cards & Primary Modules:** Enforced with `rounded-2xl` (16px / 1rem radius) to frame medical records and diagnostic cards as safe, self-contained interaction units.
- **Buttons & Data Inputs:** Standardized with `rounded-xl` (12px / 0.75rem radius) to support clear tactile bounds.
- **Voice FABs & Status Pills:** Configured as full continuous pills (`rounded-full`) to delineate them from clinical record surfaces.

## Components

### Buttons
- **Primary / Clinical Commit:** Solid `#0D5C5A` background with `#FFFFFF` text. Minimum height of 48px, horizontal padding of 20px, `rounded-xl`. Active state deepens to `#0A4846`.
- **AI Voice Assistant Action:** Gradient-free high-chroma fill using `#06B6D4` or `#14B8A6` with `#FFFFFF` text and Lucide mic icon prefix. Includes a pulsing outer ring when listening is active.
- **Secondary / Action Ghost:** `#FFFFFF` background, `1px solid #E2E8F0`, `#0D5C5A` text, hover/active fill of `#F8FAFC`.

### Chips & Triage Badges
- Compact indicators utilizing semantic status tokens with matched 10% opacity surface fills and solid 50% opacity borders:
  - *Completed:* `#F0FDF4` surface, `#16A34A` text, `#BBF7D0` border.
  - *Upcoming:* `#EFF6FF` surface, `#2563EB` text, `#BFDBFE` border.
  - *Due Soon:* `#FFFBEB` surface, `#D97706` text, `#FDE68A` border.
  - *High Risk:* `#FEF2F2` surface, `#DC2626` text, `#FECACA` border.
- Border radius is fixed to `rounded-full` with uppercase `label-sm` tracking.

### Cards & Collapsible Modules
- **Container:** Pure `#FFFFFF` background, `1px solid #E2E8F0`, `rounded-2xl`, internal padding of `space-md` to `space-lg`.
- **Collapsible Header:** Interactive toggle zone displaying household head name, village quadrant, and triage badge. Includes Lucide `ChevronDown` transitioning 180 degrees upon module expansion.
- **Module Body:** Recessed internal segment rendered with `#F8FAFC` background and `space-sm` padding for sub-metrics (maternal vitals, immunization timeline).

### Form Controls & Voice-to-Text Fields
- **Text & Numeric Inputs:** Pure `#FFFFFF` surface, `1.5px solid #E2E8F0` border, `rounded-xl`, height of 48px. Focus shifts to `#0D5C5A` with a soft teal ring blur (`0 0 0 3px rgba(13, 92, 90, 0.15)`).
- **Voice-Assisted Field:** Integrated inline speech trigger at trailing edge; turns active `#06B6D4` with speech wave animation during voice dictation.
- **Checkboxes & Radios:** 20px dimensional squares/circles. Unchecked state has `1.5px solid #64748B`. Checked state fills `#0D5C5A` with pure white Lucide checkmark icon.

### Patient & Village Roster Lists
- Segmented list rows separated by `1px solid #F1F5F9`.
- Left-anchored status bar indicator (4px width) colored dynamically by triage urgency (Green/Blue/Amber/Red).
- Right-anchored quick-action zone containing high-contrast phone call and voice dispatch shortcuts.