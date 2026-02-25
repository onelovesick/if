import HtmlSection from '@/components/ui/HtmlSection'

const html = `<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,700;0,900;1,700&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');

.tek *, .tek *::before, .tek *::after { box-sizing: border-box; margin: 0; padding: 0; }

.tek {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --dark:   #060d14;
  --mono:   'DM Mono', monospace;

  position: relative;
  /* Gradient: white → navy → near-black */
  background: linear-gradient(
    to bottom,
    #F2F5F8    0%,
    #c8d8e8    6%,
    #4a7a9b   12%,
    #1a3a52   20%,
    #0d2d45   32%,
    #0B3C5D   55%,
    #071e30   78%,
    #060d14  100%
  );
  overflow: hidden;
  padding: 0 0 0;
}

/* ── Scan-line grid overlay ── */
.tek::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
}

/* Radial glow in center */
.tek::after {
  content: '';
  position: absolute;
  top: 55%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw; height: 40vh;
  background: radial-gradient(ellipse, rgba(71,181,255,0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Top spacer ── */
.tek-fade-top {
  height: 60px;
}

/* ── Bottom — hard match to footer ── */
.tek-fade-bottom {
  height: 2px;
  background: #060d14;
  position: relative;
  z-index: 2;
}

/* ── Header ── */
.tek-header {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 48px clamp(32px,5%,96px) 52px;
}

.tek-eyebrow {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.95);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.tek-eyebrow::before,
.tek-eyebrow::after {
  content: '';
  width: 28px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.4));
}
.tek-eyebrow::after {
  background: linear-gradient(90deg, rgba(71,181,255,0.4), transparent);
}

.tek-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(36px, 4vw, 62px);
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 0.92;
  letter-spacing: -0.02em;
  margin-bottom: 14px;
}
.tek-title em {
  color: var(--accent);
  font-style: italic;
}

.tek-sub {
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: rgba(255,255,255,0.38);
  letter-spacing: 0.02em;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Marquee wrapper ── */
.tek-marquees {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 0 72px;
}

/* Edge fade masks */
.tek-marquees::before,
.tek-marquees::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: clamp(80px, 12vw, 180px);
  z-index: 3;
  pointer-events: none;
}
.tek-marquees::before {
  left: 0;
  background: linear-gradient(90deg, #0B3C5D, transparent);
}
.tek-marquees::after {
  right: 0;
  background: linear-gradient(270deg, #071e30, transparent);
}

/* ── Single marquee track ── */
.tek-marquee {
  overflow: hidden;
  padding: 12px 0;
  border-top: 1px solid rgba(71,181,255,0.06);
  border-bottom: 1px solid rgba(71,181,255,0.06);
}
.tek-marquee + .tek-marquee { border-top: none; margin-top: 16px; }

.tek-marquee-inner {
  display: flex;
  gap: 0;
  width: max-content;
  will-change: transform;
}
.tek-marquee--fwd  .tek-marquee-inner { animation: tek-scroll-fwd  38s linear infinite; }
.tek-marquee--rev  .tek-marquee-inner { animation: tek-scroll-rev  42s linear infinite; }

@keyframes tek-scroll-fwd {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes tek-scroll-rev {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.tek-marquee:hover .tek-marquee-inner { animation-play-state: paused; }

/* ── Logo pill ── */
.tek-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  margin: 0 8px;
  border: 1px solid rgba(71,181,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 3px;
  white-space: nowrap;
  cursor: default;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
  position: relative;
  overflow: hidden;
}
.tek-logo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(71,181,255,0.06), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.tek-logo:hover {
  background: rgba(71,181,255,0.07);
  border-color: rgba(71,181,255,0.25);
  transform: translateY(-2px);
}
.tek-logo:hover::before { opacity: 1; }

/* Logo icon */
.tek-logo-icon {
  width: 22px; height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tek-logo-icon svg { width: 100%; height: 100%; }

.tek-logo-name {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  transition: color 0.3s;
}
.tek-logo:hover .tek-logo-name { color: rgba(255,255,255,0.95); }

.tek-logo-cat {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.35);
  padding-left: 10px;
  border-left: 1px solid rgba(71,181,255,0.12);
  transition: color 0.3s;
}
.tek-logo:hover .tek-logo-cat { color: rgba(71,181,255,0.7); }

/* ── ISO 19650 bar ── */
.tek-iso {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 32px clamp(32px,5%,96px) 56px;
  border-top: 1px solid rgba(71,181,255,0.08);
  flex-wrap: wrap;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* Left badge */
.tek-iso-label {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  padding-right: 40px;
}
.tek-iso-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 17px;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.03em;
  line-height: 1;
}
.tek-iso-sub {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.55);
  margin-top: 5px;
}

/* Vertical divider between badge and evo */
.tek-iso-vdivider {
  width: 1px;
  height: 64px;
  background: rgba(71,181,255,0.12);
  flex-shrink: 0;
  margin-right: 40px;
}

/* ── Evolution diagram ── */
.tek-evo {
  display: flex;
  align-items: flex-start;
  gap: 0;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 4px;
  justify-content: space-between;
}

.tek-evo-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  cursor: default;
}

.tek-evo-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(71,181,255,0.25);
  border: 1.5px solid rgba(71,181,255,0.4);
  margin-bottom: 2px;
  transition: background 0.25s, border-color 0.25s, transform 0.25s;
  flex-shrink: 0;
}
.tek-evo-node:hover .tek-evo-dot {
  background: rgba(71,181,255,0.6);
  border-color: var(--accent);
  transform: scale(1.3);
}
.tek-evo-dot--active {
  width: 12px; height: 12px;
  background: rgba(71,181,255,0.45);
  border: 2px solid var(--accent);
  box-shadow: 0 0 10px rgba(71,181,255,0.4);
}
.tek-evo-dot--end {
  width: 14px; height: 14px;
  background: var(--accent);
  border: 2px solid white;
  box-shadow: 0 0 16px rgba(71,181,255,0.6);
}

.tek-evo-code {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.04em;
  line-height: 1.15;
  transition: color 0.2s;
}
.tek-evo-node:hover .tek-evo-code { color: rgba(255,255,255,0.9); }
.tek-evo-code--active { color: var(--accent) !important; }
.tek-evo-code--end { color: #ffffff !important; }

.tek-evo-desc {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  line-height: 1.5;
  max-width: 90px;
  transition: color 0.2s;
}
.tek-evo-node:hover .tek-evo-desc { color: rgba(255,255,255,0.45); }
.tek-evo-node--start .tek-evo-desc { color: rgba(255,255,255,0.15); }
.tek-evo-node--end .tek-evo-desc { color: rgba(71,181,255,0.5); }

/* Arrow connectors */
.tek-evo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  flex-shrink: 0;
  margin-bottom: 28px; /* align with dot row */
  align-self: flex-start;
  margin-top: 22px;
}
.tek-evo-arrow svg { width: 48px; height: 12px; }
.tek-evo-arrow span {
  font-family: var(--mono);
  font-size: 6.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.45);
  white-space: nowrap;
}
.tek-evo-arrow--final span { color: rgba(71,181,255,0.75); }

/* Responsive */
@media (max-width: 1100px) {
  .tek-iso { flex-direction: column; align-items: flex-start; gap: 24px; }
  .tek-iso-vdivider { display: none; }
  .tek-evo { overflow-x: auto; width: 100%; }
}
@media (max-width: 640px) {
  .tek-evo-desc { display: none; }
  .tek-evo-node { min-width: 72px; }
}
</style>

<section class="tek" aria-label="Technology ecosystem">

  <div class="tek-fade-top"></div>

  <!-- Header -->
  <div class="tek-header">
    <div class="tek-eyebrow">Technology Ecosystem</div>
    <h2 class="tek-title">Built On The <em>Industry's</em><br/>Best Platforms</h2>
    <p class="tek-sub">Platform-agnostic by design. We deploy whichever tools serve your project — and we know how to make them work together.</p>
  </div>

  <!-- Marquees -->
  <div class="tek-marquees">

    <!-- Row 1 — forward -->
    <div class="tek-marquee tek-marquee--fwd">
      <div class="tek-marquee-inner" id="tekRow1">

        <!-- Autodesk -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M2 18L9 4h2.5L18 18h-3l-1.5-4H6.5L5 18H2ZM7.5 11h5L10 5.5 7.5 11Z" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Autodesk</span>
          <span class="tek-logo-cat">Design &amp; BIM</span>
        </div>

        <!-- Revit -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#0696D7" opacity="0.15"/><text x="4" y="17" font-family="Arial" font-weight="900" font-size="11" fill="#0696D7">Rv</text></svg></div>
          <span class="tek-logo-name">Revit</span>
          <span class="tek-logo-cat">BIM Authoring</span>
        </div>

        <!-- Navisworks -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,20 2,20" fill="none" stroke="#0696D7" stroke-width="2"/><circle cx="12" cy="14" r="3" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Navisworks</span>
          <span class="tek-logo-cat">Clash Detection</span>
        </div>

        <!-- ACC -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#0696D7"/><text x="4" y="16" font-family="Arial" font-weight="900" font-size="9" fill="white">ACC</text></svg></div>
          <span class="tek-logo-name">Autodesk ACC</span>
          <span class="tek-logo-cat">Construction Cloud</span>
        </div>

        <!-- Civil 3D -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20 Q12 4 20 20" stroke="#0696D7" stroke-width="2" fill="none"/><line x1="4" y1="20" x2="20" y2="20" stroke="#0696D7" stroke-width="1.5"/></svg></div>
          <span class="tek-logo-name">Civil 3D</span>
          <span class="tek-logo-cat">Infrastructure Design</span>
        </div>

        <!-- Bentley -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#00B5E2"/><text x="6" y="17" font-family="Arial" font-weight="900" font-size="14" fill="white">B</text></svg></div>
          <span class="tek-logo-name">Bentley</span>
          <span class="tek-logo-cat">Civil Infrastructure</span>
        </div>

        <!-- OpenRoads -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 18 Q8 6 12 10 Q16 14 21 6" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round"/></svg></div>
          <span class="tek-logo-name">OpenRoads</span>
          <span class="tek-logo-cat">Road &amp; Rail Design</span>
        </div>

        <!-- iTwin -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#00B5E2" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="#00B5E2" opacity="0.4"/><circle cx="12" cy="12" r="1.5" fill="#00B5E2"/></svg></div>
          <span class="tek-logo-name">iTwin</span>
          <span class="tek-logo-cat">Digital Twin</span>
        </div>

        <!-- ProjectWise -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#00B5E2" stroke-width="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="#00B5E2" stroke-width="1.5"/><circle cx="7" cy="7" r="1" fill="#00B5E2"/></svg></div>
          <span class="tek-logo-name">ProjectWise</span>
          <span class="tek-logo-cat">Document Control</span>
        </div>

        <!-- Procore -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F47920"/><text x="7" y="17" font-family="Arial" font-weight="900" font-size="13" fill="white">P</text></svg></div>
          <span class="tek-logo-name">Procore</span>
          <span class="tek-logo-cat">Construction OS</span>
        </div>

        <!-- Solibri -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke="#E85D26" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#E85D26"/></svg></div>
          <span class="tek-logo-name">Solibri</span>
          <span class="tek-logo-cat">Model QA</span>
        </div>

        <!-- Tandem -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L22 12L12 22L2 12Z" fill="none" stroke="#0696D7" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Tandem</span>
          <span class="tek-logo-cat">Digital Twin FM</span>
        </div>

      </div>
    </div>

    <!-- Row 2 — reverse -->
    <div class="tek-marquee tek-marquee--rev">
      <div class="tek-marquee-inner" id="tekRow2">

        <!-- ESRI -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#007AC2" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="#007AC2" stroke-width="1"/><line x1="3" y1="12" x2="21" y2="12" stroke="#007AC2" stroke-width="1"/></svg></div>
          <span class="tek-logo-name">ESRI / ArcGIS</span>
          <span class="tek-logo-cat">GIS &amp; Spatial</span>
        </div>

        <!-- Dalux -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#1C1C3A"/><text x="5" y="17" font-family="Arial" font-weight="900" font-size="13" fill="#47B5FF">D</text></svg></div>
          <span class="tek-logo-name">Dalux</span>
          <span class="tek-logo-cat">Field BIM</span>
        </div>

        <!-- Power BI -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2"  y="14" width="5" height="8"  fill="#F2C811"/><rect x="9"  y="9"  width="5" height="13" fill="#F2C811" opacity="0.75"/><rect x="16" y="4"  width="5" height="18" fill="#F2C811" opacity="0.5"/></svg></div>
          <span class="tek-logo-name">Power BI</span>
          <span class="tek-logo-cat">Analytics</span>
        </div>

        <!-- ISO 19650 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="rgba(71,181,255,0.6)" stroke-width="1.5"/><line x1="2" y1="9" x2="22" y2="9" stroke="rgba(71,181,255,0.4)" stroke-width="1"/><text x="4" y="8" font-family="Arial" font-weight="900" font-size="5" fill="#47B5FF">ISO</text><text x="3" y="18" font-family="Arial" font-weight="900" font-size="6.5" fill="rgba(255,255,255,0.7)">19650</text></svg></div>
          <span class="tek-logo-name">ISO 19650</span>
          <span class="tek-logo-cat">BIM Standard</span>
        </div>

        <!-- Revizto -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#E63946" stroke-width="1.5"/><path d="M8 9 L16 9 L12 16 Z" fill="#E63946"/></svg></div>
          <span class="tek-logo-name">Revizto</span>
          <span class="tek-logo-cat">Issue Tracking</span>
        </div>

        <!-- BIM 360 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#0696D7" opacity="0.2"/><text x="5" y="16" font-family="Arial" font-weight="900" font-size="8" fill="#0696D7">360</text></svg></div>
          <span class="tek-logo-name">BIM 360</span>
          <span class="tek-logo-cat">Collaboration</span>
        </div>

        <!-- Infraworks -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M2 20 L7 8 L12 14 L17 6 L22 20 Z" fill="none" stroke="#0696D7" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
          <span class="tek-logo-name">InfraWorks</span>
          <span class="tek-logo-cat">Concept Design</span>
        </div>

        <!-- Aconex -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#e67e22" stroke-width="1.5"/><text x="8" y="16" font-family="Arial" font-weight="900" font-size="10" fill="#e67e22">A</text></svg></div>
          <span class="tek-logo-name">Aconex</span>
          <span class="tek-logo-cat">Document Mgmt</span>
        </div>

        <!-- Rhino -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 18 C4 18 6 8 12 6 C18 4 20 10 20 10 L16 18" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>
          <span class="tek-logo-name">Rhino / Grasshopper</span>
          <span class="tek-logo-cat">Parametric</span>
        </div>

        <!-- Microsoft 365 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" fill="#f25022"/><rect x="13" y="2" width="9" height="9" fill="#7fba00"/><rect x="2" y="13" width="9" height="9" fill="#00a4ef"/><rect x="13" y="13" width="9" height="9" fill="#ffb900"/></svg></div>
          <span class="tek-logo-name">Microsoft 365</span>
          <span class="tek-logo-cat">Productivity</span>
        </div>

        <!-- Synchro -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 A9 9 0 0 1 21 12" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12 21 A9 9 0 0 1 3 12" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/><polyline points="18,8 21,12 17,13" fill="none" stroke="#00B5E2" stroke-width="1.5"/></svg></div>
          <span class="tek-logo-name">Synchro</span>
          <span class="tek-logo-cat">4D Scheduling</span>
        </div>

        <!-- COBie -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="rgba(71,181,255,0.5)" stroke-width="1.5"/><line x1="3" y1="8" x2="21" y2="8" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><line x1="3" y1="13" x2="21" y2="13" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><line x1="10" y1="3" x2="10" y2="21" stroke="rgba(71,181,255,0.3)" stroke-width="1"/></svg></div>
          <span class="tek-logo-name">COBie</span>
          <span class="tek-logo-cat">Data Handover</span>
        </div>

      </div>
    </div>

  </div>

  <!-- ISO 19650 evolution bar -->
  <div class="tek-iso">

    <!-- Left: ISO badge -->
    <div class="tek-iso-label">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="1" y="1" width="30" height="30" rx="2" fill="none" stroke="rgba(71,181,255,0.5)" stroke-width="1.5"/>
        <line x1="1" y1="11" x2="31" y2="11" stroke="rgba(71,181,255,0.2)" stroke-width="1"/>
        <text x="4" y="9" font-family="Arial" font-weight="900" font-size="7" fill="#47B5FF">ISO</text>
        <text x="3" y="25" font-family="Arial" font-weight="900" font-size="9.5" fill="rgba(255,255,255,0.75)">19650</text>
      </svg>
      <div>
        <div class="tek-iso-title">ISO 19650 Aligned</div>
        <div class="tek-iso-sub">Information Management Framework</div>
      </div>
    </div>

    <!-- Divider -->
    <div class="tek-iso-vdivider"></div>

    <!-- Right: Evolution diagram -->
    <div class="tek-evo">

      <div class="tek-evo-node tek-evo-node--start">
        <div class="tek-evo-dot"></div>
        <div class="tek-evo-code">Static<br/>Model</div>
        <div class="tek-evo-desc">Disconnected drawings &amp; files. No structured data.</div>
      </div>

      <div class="tek-evo-arrow">
        <svg viewBox="0 0 48 12" fill="none"><line x1="0" y1="6" x2="40" y2="6" stroke="rgba(71,181,255,0.3)" stroke-width="1" stroke-dasharray="3 3"/><polyline points="36,2 42,6 36,10" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" fill="none"/></svg>
        <span>EIR</span>
      </div>

      <div class="tek-evo-node">
        <div class="tek-evo-dot"></div>
        <div class="tek-evo-code">Defined<br/>Requirements</div>
        <div class="tek-evo-desc">Employer's Information Requirements set. Structured asks established.</div>
      </div>

      <div class="tek-evo-arrow">
        <svg viewBox="0 0 48 12" fill="none"><line x1="0" y1="6" x2="40" y2="6" stroke="rgba(71,181,255,0.3)" stroke-width="1" stroke-dasharray="3 3"/><polyline points="36,2 42,6 36,10" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" fill="none"/></svg>
        <span>AIR</span>
      </div>

      <div class="tek-evo-node">
        <div class="tek-evo-dot"></div>
        <div class="tek-evo-code">Asset<br/>Requirements</div>
        <div class="tek-evo-desc">Asset Information Requirements defined for operations &amp; FM.</div>
      </div>

      <div class="tek-evo-arrow">
        <svg viewBox="0 0 48 12" fill="none"><line x1="0" y1="6" x2="40" y2="6" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><polyline points="36,2 42,6 36,10" stroke="rgba(71,181,255,0.8)" stroke-width="1.5" fill="none"/></svg>
        <span>PIM</span>
      </div>

      <div class="tek-evo-node">
        <div class="tek-evo-dot tek-evo-dot--active"></div>
        <div class="tek-evo-code tek-evo-code--active">Project Info<br/>Model</div>
        <div class="tek-evo-desc">Live, federated model during design &amp; construction.</div>
      </div>

      <div class="tek-evo-arrow tek-evo-arrow--final">
        <svg viewBox="0 0 48 12" fill="none"><line x1="0" y1="6" x2="40" y2="6" stroke="rgba(71,181,255,0.6)" stroke-width="1.5"/><polyline points="36,2 42,6 36,10" stroke="#47B5FF" stroke-width="2" fill="none"/></svg>
        <span>Handover</span>
      </div>

      <div class="tek-evo-node tek-evo-node--end">
        <div class="tek-evo-dot tek-evo-dot--end"></div>
        <div class="tek-evo-code tek-evo-code--end">Asset Info<br/>Model</div>
        <div class="tek-evo-desc">Verified AIM delivered to owner. Data lives beyond construction.</div>
      </div>

    </div>
  </div>

  <!-- Bottom blend to footer -->
  <div class="tek-fade-bottom"></div>

</section>

<script>
// Duplicate each marquee row so the loop is seamless
(function(){
  ['tekRow1','tekRow2'].forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    var clone = el.innerHTML;
    el.innerHTML = clone + clone; // duplicate for seamless loop
  });
}());
</script>`

export default function TechTransition() {
  return <HtmlSection html={html} />
}
