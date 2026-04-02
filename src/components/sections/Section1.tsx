"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ost *, .ost *::before, .ost *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ost {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F4F7FA;
  --white:  #ffffff;
  --text:   #0d1f2d;
  --muted:  #5a7a96;
  --mono:   'DM Mono', monospace;

  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 80vh;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* ══ DOT GRID BACKGROUND ══ */
.ost::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(11,60,93,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
}

/* Top edge divider */
.ost::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: rgba(11,60,93,0.06);
  z-index: 1;
}

/* ══ LEFT ══ */
.ost-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(28px,3vw,48px);
  padding: clamp(64px,6vw,120px) clamp(40px,4vw,72px) clamp(64px,6vw,120px) clamp(48px,6%,120px);
  position: relative;
  z-index: 1;
  margin-left: auto;
  max-width: 700px;
}
.ost-left::after {
  content: '';
  position: absolute;
  right: 0; top: 10%; bottom: 10%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(11,60,93,0.08) 25%, rgba(11,60,93,0.08) 75%, transparent);
}

.ost-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 14px;
}
.ost-eyebrow::before {
  content: '';
  width: 28px;
  height: 1px;
  background: var(--accent);
}

.ost-headline {
  max-width: 620px;
}
.ost-h-line {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: -0.02em;
  line-height: 1;
}
.ost-h-sm {
  font-size: clamp(24px,2.4vw,40px);
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 6px;
}
.ost-h-md {
  font-size: clamp(32px,3.2vw,56px);
  margin-bottom: 4px;
}
.ost-h-lg {
  font-size: clamp(44px,4.6vw,82px);
  font-weight: 800;
  color: var(--accent);
  line-height: 0.95;
  margin-bottom: 8px;
  position: relative;
}
.ost-h-lg::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), rgba(71,181,255,0.15));
  border-radius: 2px;
}

/* ══ SUBLINE ══ */
.ost-sub {
  font-size: clamp(15px,1.1vw,18px);
  color: var(--muted);
  line-height: 1.75;
  max-width: 480px;
}

/* ══ BUILT FOR DELIVERY ══ */
.ost-pillars {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 500px;
}
.ost-pillars-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--navy);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(11,60,93,0.08);
}
.ost-pillar {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 0 16px;
  align-items: start;
  padding: 16px 0;
  position: relative;
}
.ost-pillar + .ost-pillar {
  border-top: 1px solid rgba(11,60,93,0.05);
}
.ost-pillar-icon {
  grid-row: 1 / 3;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(71,181,255,0.06);
  color: var(--accent);
  transition: background 0.3s, transform 0.3s;
}
.ost-pillar:hover .ost-pillar-icon {
  background: rgba(71,181,255,0.12);
  transform: scale(1.05);
}
.ost-pillar-icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--navy);
  stroke-width: 1.5;
  fill: none;
}
.ost-pillar-label {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(12px, 0.85vw, 14px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--navy);
  line-height: 1.2;
  align-self: end;
}
.ost-pillar-desc {
  font-size: clamp(12px, 0.8vw, 14px);
  color: var(--muted);
  line-height: 1.6;
  margin-top: 3px;
  align-self: start;
}

.ost-cta {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--white); background: var(--navy);
  border-radius: 2px; padding: 16px 28px;
  text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
  align-self: flex-start;
}
.ost-cta:hover {
  background: #0d4d78;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(11,60,93,0.2);
}
.ost-cta-arr { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.ost-cta:hover .ost-cta-arr { transform: translateX(5px); }

/* ══ RIGHT — Tech Ecosystem ══ */
.ost-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(64px,6vw,120px) clamp(48px,6%,120px) clamp(64px,6vw,120px) clamp(40px,4vw,72px);
  gap: 36px;
  z-index: 1;
}

.ost-right-header {}
.ost-right-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(11,60,93,0.3);
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 14px;
}
.ost-right-eyebrow::after { content:''; flex:1; height:1px; background:rgba(11,60,93,0.08); }

.ost-right-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(18px,1.4vw,24px);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin-bottom: 8px;
}
.ost-right-sub {
  font-size: clamp(13px,0.9vw,15px);
  color: var(--muted);
  line-height: 1.7;
  max-width: 520px;
}

/* ══ 3x3 TOOL GRID ══ */
.ost-tools {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.ost-tool {
  background: var(--white);
  border: 1px solid rgba(11,60,93,0.06);
  border-radius: 6px;
  padding: 24px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(20px) scale(0.97);
  transition:
    opacity   0.7s ease,
    transform 0.7s cubic-bezier(0.22,1,0.36,1),
    border-color 0.3s,
    box-shadow   0.3s;
}
.ost-tool.vis { opacity: 1; transform: translateY(0) scale(1); }
.ost-tool:nth-child(1){ transition-delay:0.05s }
.ost-tool:nth-child(2){ transition-delay:0.12s }
.ost-tool:nth-child(3){ transition-delay:0.19s }
.ost-tool:nth-child(4){ transition-delay:0.26s }
.ost-tool:nth-child(5){ transition-delay:0.33s }
.ost-tool:nth-child(6){ transition-delay:0.40s }
.ost-tool:nth-child(7){ transition-delay:0.47s }
.ost-tool:nth-child(8){ transition-delay:0.54s }
.ost-tool:nth-child(9){ transition-delay:0.61s }

/* Top accent bar on hover */
.ost-tool::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
}
.ost-tool:hover {
  border-color: rgba(71,181,255,0.2);
  box-shadow: 0 8px 32px rgba(11,60,93,0.07), 0 2px 8px rgba(71,181,255,0.06);
}
.ost-tool:hover::before { transform: scaleX(1); }

.ost-tool-cat {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.6);
  line-height: 1;
}

.ost-tool-logo {
  height: 28px;
  display: flex;
  align-items: center;
  margin: 4px 0;
}
.ost-tool-logo img {
  height: 22px;
  width: auto;
  display: block;
  object-fit: contain;
}

.ost-tool-name {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: 0.01em;
  line-height: 1;
}
.ost-tool-role {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.55;
  line-height: 1.5;
}

.ost-footnote {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(11,60,93,0.2);
  padding-top: 4px;
}

/* ══ SCROLL ANIMATIONS ══ */
.ost-anim {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ost-anim.vis { opacity: 1; transform: translateY(0); }

/* ══ RESPONSIVE ══ */

/* Large desktops */
@media (min-width: 1600px) {
  .ost { min-height: 70vh; }
  .ost::before { background-size: 36px 36px; }
  .ost-h-sm { font-size: 36px; }
  .ost-h-lg { font-size: 74px; }
  .ost-h-md { font-size: 50px; }
  .ost-headline { max-width: 680px; }
  .ost-sub { font-size: 17px; }
  .ost-cta { font-size: 12px; padding: 18px 32px; }
  .ost-tools { gap: 14px; }
  .ost-tool { padding: 28px 24px 22px; }
  .ost-tool-name { font-size: 18px; }
  .ost-tool-role { font-size: 10px; }
  .ost-tool-cat { font-size: 10px; }
  .ost-right-title { font-size: 22px; }
  .ost-right-sub { font-size: 15px; }
  .ost-pillars-title { font-size: 15px; }
  .ost-pillar-label { font-size: 14px; }
  .ost-pillar-desc { font-size: 14px; }
  .ost-pillar-icon { width: 44px; height: 44px; }
  .ost-pillar { grid-template-columns: 44px 1fr; }
}

/* Ultrawide / 32" 4K */
@media (min-width: 2200px) {
  .ost { min-height: 65vh; }
  .ost::before { background-size: 44px 44px; }
  .ost-left { padding: 100px 80px 100px 60px; max-width: 860px; }
  .ost-right { padding: 100px 140px 100px 80px; gap: 44px; }
  .ost-left { gap: 44px; }
  .ost-eyebrow { font-size: 12px; }
  .ost-h-sm { font-size: 42px; }
  .ost-h-lg { font-size: 88px; }
  .ost-h-md { font-size: 58px; }
  .ost-headline { max-width: 780px; }
  .ost-sub { font-size: 19px; max-width: 540px; }
  .ost-cta { font-size: 13px; padding: 20px 36px; }
  .ost-right-eyebrow { font-size: 12px; }
  .ost-right-title { font-size: 26px; }
  .ost-right-sub { font-size: 16px; max-width: 600px; }
  .ost-tools { gap: 16px; }
  .ost-tool { padding: 32px 28px 26px; border-radius: 8px; }
  .ost-tool-cat { font-size: 11px; }
  .ost-tool-logo { height: 28px; margin: 6px 0; }
  .ost-tool-name { font-size: 20px; }
  .ost-tool-role { font-size: 11px; }
  .ost-footnote { font-size: 11px; }
  .ost-pillars-title { font-size: 16px; }
  .ost-pillar-label { font-size: 15px; }
  .ost-pillar-desc { font-size: 15px; }
  .ost-pillar-icon { width: 46px; height: 46px; border-radius: 10px; }
  .ost-pillar { grid-template-columns: 46px 1fr; gap: 0 20px; padding: 18px 0; }
}

@media (min-width: 3200px) {
  .ost-left { padding: 120px 100px 120px 60px; max-width: 1000px; gap: 52px; }
  .ost-right { padding: 120px 180px 120px 100px; gap: 52px; }
  .ost-h-sm { font-size: 48px; }
  .ost-h-lg { font-size: 100px; }
  .ost-h-md { font-size: 66px; }
  .ost-headline { max-width: 900px; }
  .ost-right-title { font-size: 28px; }
  .ost-right-sub { font-size: 18px; }
  .ost-tool { padding: 36px 32px 30px; }
  .ost-tool-name { font-size: 22px; }
  .ost-tool-role { font-size: 12px; }
  .ost-tools { gap: 18px; }
}

/* Tablet */
@media (max-width: 1100px) {
  .ost { grid-template-columns: 1fr; min-height: auto; }
  .ost-left { max-width: 100%; margin: 0 auto; }
  .ost-left::after { display: none; }
}
@media (max-width: 480px) {
  .ost-tools { grid-template-columns: repeat(2,1fr); }
  .ost-h-sm { font-size: 18px; }
  .ost-h-lg { font-size: 36px; }
  .ost-h-md { font-size: 24px; }
}
</style>

<section class="ost" aria-label="Our approach and technology ecosystem">

  <!-- ══ LEFT ══ -->
  <div class="ost-left">
    <div class="ost-eyebrow ost-anim" data-delay="0">What We Do</div>
    <h2 class="ost-headline ost-anim" data-delay="80">
      <span class="ost-h-line ost-h-sm">We help project teams deliver</span>
      <span class="ost-h-line ost-h-lg">Real Projects</span>
      <span class="ost-h-line ost-h-md">with digital power</span>
    </h2>
    <p class="ost-sub ost-anim" data-delay="120">We build lean digital systems that match how your teams actually work. No tool overload. No process bloat. Just the structure your project needs to move.</p>

    <div class="ost-pillars ost-anim" data-delay="160">
      <div class="ost-pillars-title">Built for Delivery</div>

      <div class="ost-pillar">
        <div class="ost-pillar-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><line x1="6.5" y1="10" x2="6.5" y2="14"/><line x1="17.5" y1="10" x2="17.5" y2="17.5"/><line x1="10" y1="17.5" x2="14" y2="17.5"/></svg>
        </div>
        <div class="ost-pillar-label">Lean systems shaped around project reality.</div>
        <div class="ost-pillar-desc">Lean systems shaped around project reality.</div>
      </div>

      <div class="ost-pillar">
        <div class="ost-pillar-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><line x1="7" y1="11" x2="10" y2="7.5"/><line x1="14" y1="7.5" x2="17" y2="11"/><line x1="17" y1="13" x2="14" y2="16.5"/><line x1="10" y1="16.5" x2="7" y2="13"/></svg>
        </div>
        <div class="ost-pillar-label">Coordinated information</div>
        <div class="ost-pillar-desc">Models, reviews, documents and site data stay connected.</div>
      </div>

      <div class="ost-pillar">
        <div class="ost-pillar-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="4 14 9 9 13 13 20 6"/><line x1="16" y1="6" x2="20" y2="6"/><line x1="20" y1="6" x2="20" y2="10"/></svg>
        </div>
        <div class="ost-pillar-label">Ready for the next phase</div>
        <div class="ost-pillar-desc">From design to construction to operations, the structure stays usable.</div>
      </div>
    </div>

    <a href="/process/" class="ost-cta ost-anim" data-delay="240">Discover The Process <span class="ost-cta-arr">→</span></a>
  </div>

  <!-- ══ RIGHT ══ -->
  <div class="ost-right">

    <div class="ost-right-header">
      <div class="ost-right-eyebrow">Technology Ecosystem</div>
      <div class="ost-right-title">Your Tools, Our Structure</div>
      <p class="ost-right-sub">We integrate with the platforms your team already runs. These are some of the tools we work with every day.</p>
    </div>

    <div class="ost-tools" id="ostTools">

      <div class="ost-tool">
        <div class="ost-tool-cat">Design · BIM</div>
        <div class="ost-tool-logo">
          <img src="/logos/autodesk.svg" alt="Autodesk" />
        </div>
        <div class="ost-tool-name">Autodesk</div>
        <div class="ost-tool-role">Revit · ACC · Navisworks · Civil 3D</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Civil · Infrastructure</div>
        <div class="ost-tool-logo">
          <img src="/logos/bentley.svg" alt="Bentley Systems" />
        </div>
        <div class="ost-tool-name">Bentley</div>
        <div class="ost-tool-role">OpenRoads · iTwin · ProjectWise</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Construction OS</div>
        <div class="ost-tool-logo">
          <img src="/logos/procore.svg" alt="Procore" />
        </div>
        <div class="ost-tool-name">Procore</div>
        <div class="ost-tool-role">RFI · Submittals · Field Mgmt</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Digital Twin</div>
        <div class="ost-tool-logo">
          <img src="/logos/tandem.svg" alt="Autodesk Tandem" />
        </div>
        <div class="ost-tool-name">Tandem</div>
        <div class="ost-tool-role">Digital Twin · COBie · FM</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">GIS · Spatial</div>
        <div class="ost-tool-logo">
          <img src="/logos/esri.svg" alt="Esri ArcGIS" />
        </div>
        <div class="ost-tool-name">ESRI / GIS</div>
        <div class="ost-tool-role">ArcGIS · Spatial BIM Integration</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Field · Mobile</div>
        <div class="ost-tool-logo">
          <img src="/logos/dalux.svg" alt="Dalux" />
        </div>
        <div class="ost-tool-name">Dalux</div>
        <div class="ost-tool-role">Field BIM · Model Viewer · QA</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Analytics</div>
        <div class="ost-tool-logo">
          <img src="/logos/powerbi.svg" alt="Microsoft Power BI" />
        </div>
        <div class="ost-tool-name">Power BI</div>
        <div class="ost-tool-role">Dashboards · Progress Reporting</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Model QA</div>
        <div class="ost-tool-logo">
          <img src="/logos/solibri.svg" alt="Solibri" />
        </div>
        <div class="ost-tool-name">Solibri</div>
        <div class="ost-tool-role">Model Checking · IFC · OpenBIM</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Standard</div>
        <div class="ost-tool-logo">
          <img src="/logos/iso19650.svg" alt="ISO 19650" />
        </div>
        <div class="ost-tool-name">ISO 19650</div>
        <div class="ost-tool-role">BIM Standard · EIR · BEP Framework</div>
      </div>

    </div>

    <div class="ost-footnote">↳ Platform-agnostic · We integrate with your existing stack</div>

  </div>

</section>`
const sectionScript = "(function(){\n  var tools = document.querySelectorAll('.ost-tool');\n  var anims = document.querySelectorAll('.ost-anim');\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.08 });\n  tools.forEach(function(t){ io.observe(t); });\n  anims.forEach(function(el){\n    el.style.transitionDelay = (el.getAttribute('data-delay') || '0') + 'ms';\n    io.observe(el);\n  });\n}());"

export default function Section1() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section1 script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
