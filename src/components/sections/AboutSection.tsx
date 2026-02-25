import HtmlSection from '@/components/ui/HtmlSection'

const html = `<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ost *, .ost *::before, .ost *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ost {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F2F5F8;
  --white:  #ffffff;
  --text:   #0d1f2d;
  --muted:  #5a7a96;
  --mono:   'DM Mono', monospace;

  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 60vh;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
}

/* ══ LEFT ══ */
.ost-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(48px,5vw,80px) clamp(40px,4vw,64px) clamp(48px,5vw,80px) clamp(40px,5%,96px);
  position: relative;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
}
.ost-left::after {
  content: '';
  position: absolute;
  right: 0; top: 12%; bottom: 12%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(71,181,255,0.2) 35%, rgba(71,181,255,0.2) 65%, transparent);
}

.ost-eyebrow {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 28px;
}
.ost-eyebrow::before { content:''; width:20px; height:1px; background:var(--accent); }

.ost-intro {
  font-size: clamp(13px,1.1vw,15px);
  line-height: 1.78;
  color: var(--accent);
  margin-bottom: 24px;
  max-width: 460px;
}
.ost-intro strong { font-weight: 700; }

.ost-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(34px,3.6vw,58px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  line-height: 0.93;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
  max-width: 500px;
}
.ost-headline em {
  color: var(--accent);
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: rgba(71,181,255,0.3);
  text-underline-offset: 4px;
}

.ost-contrast {
  background: var(--white);
  border-left: 2px solid var(--accent);
  padding: 20px 24px;
  margin-bottom: 32px;
  max-width: 460px;
}
.ost-contrast-cross {
  font-size: 13px;
  color: rgba(90,122,150,0.45);
  text-decoration: line-through;
  text-decoration-color: rgba(71,181,255,0.35);
  line-height: 1.72;
  margin-bottom: 10px;
}
.ost-contrast-strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
}

.ost-cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--white); background: var(--navy);
  border-radius: 2px; padding: 12px 22px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  align-self: flex-start;
}
.ost-cta:hover { background: #0d4d78; transform: translateY(-2px); }
.ost-cta-arr { transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.ost-cta:hover .ost-cta-arr { transform: translateX(4px); }

/* ══ RIGHT — Tech Ecosystem ══ */
.ost-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(48px,5vw,80px) clamp(40px,5%,96px) clamp(48px,5vw,80px) clamp(40px,4vw,64px);
  gap: 32px;
}

.ost-right-header {}
.ost-right-eyebrow {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(11,60,93,0.3);
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px;
}
.ost-right-eyebrow::after { content:''; flex:1; height:1px; background:rgba(11,60,93,0.08); }
.ost-right-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(24px,2.2vw,34px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: -0.01em;
  line-height: 1;
  margin-bottom: 8px;
}
.ost-right-sub {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.7;
}

/* 3×3 grid */
.ost-tools {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.ost-tool {
  background: var(--white);
  border: 1px solid rgba(11,60,93,0.07);
  border-radius: 4px;
  padding: 16px 14px 13px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity   0.5s ease,
    transform 0.5s cubic-bezier(0.22,1,0.36,1),
    border-color 0.25s,
    box-shadow   0.25s,
    background   0.25s;
}
.ost-tool.vis { opacity: 1; transform: translateY(0); }
.ost-tool:nth-child(1){ transition-delay:0.05s }
.ost-tool:nth-child(2){ transition-delay:0.10s }
.ost-tool:nth-child(3){ transition-delay:0.15s }
.ost-tool:nth-child(4){ transition-delay:0.20s }
.ost-tool:nth-child(5){ transition-delay:0.25s }
.ost-tool:nth-child(6){ transition-delay:0.30s }
.ost-tool:nth-child(7){ transition-delay:0.35s }
.ost-tool:nth-child(8){ transition-delay:0.40s }
.ost-tool:nth-child(9){ transition-delay:0.45s }

.ost-tool::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
}
.ost-tool:hover {
  border-color: rgba(71,181,255,0.25);
  box-shadow: 0 6px 24px rgba(71,181,255,0.09);
  background: #FAFCFF;
}
.ost-tool:hover::after { transform: scaleX(1); }

.ost-tool-cat {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.55);
  line-height: 1;
}

.ost-tool-logo {
  height: 22px;
  display: flex;
  align-items: center;
  margin: 2px 0;
}

.ost-tool-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: 0.01em;
  line-height: 1;
}
.ost-tool-role {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.65;
  line-height: 1.4;
}

.ost-footnote {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(11,60,93,0.2);
  padding-top: 4px;
}

/* Responsive */
@media (max-width: 980px) {
  .ost { grid-template-columns: 1fr; min-height: auto; }
  .ost-left { max-width: 100%; margin: 0; }
  .ost-left::after { display: none; }
}
@media (max-width: 480px) {
  .ost-tools { grid-template-columns: repeat(2,1fr); }
}
</style>

<section class="ost" aria-label="Our approach and technology ecosystem">

  <!-- ══ LEFT ══ -->
  <div class="ost-left">
    <div class="ost-eyebrow">How We Work</div>
    <p class="ost-intro">
      Infrastructure projects don't fail from lack of tools, they fail from
      lack of structure. We <strong>connect</strong> engineers, contractors,
      clients, architects and project members around:<br/>
      <strong>One source of truth.</strong>
    </p>
    <h2 class="ost-headline">
      We Help Project Teams Deliver
      <em>Real Projects</em> With
      Digital Power
    </h2>
    <div class="ost-contrast">
      <div class="ost-contrast-cross">
        Many projects attempt to implement every available digital tool,
        workflow, and reporting layer at once — applying excessive
        digital processes on top of broken structure.
      </div>
      <div class="ost-contrast-strong">We implement lean, controlled systems.</div>
    </div>
    <a href="/process/" class="ost-cta">Discover The Process <span class="ost-cta-arr">→</span></a>
  </div>

  <!-- ══ RIGHT ══ -->
  <div class="ost-right">

    <div class="ost-right-header">
      <div class="ost-right-eyebrow">Technology Ecosystem</div>
      <div class="ost-right-title">The Tools Behind<br/>The Structure</div>
      <p class="ost-right-sub">Platform-agnostic. We work with the tools your team already uses — and we know how to make them talk to each other.</p>
    </div>

    <div class="ost-tools" id="ostTools">

      <div class="ost-tool">
        <div class="ost-tool-cat">Design · BIM</div>
        <div class="ost-tool-logo">
          <svg width="90" height="22" viewBox="0 0 90 22" fill="none">
            <path d="M0 17L5.5 2H8.5L14 17H11.2L10.1 13.5H3.9L2.8 17H0ZM4.7 11H9.3L7 4L4.7 11Z" fill="#0696D7"/>
            <text x="17" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.5" fill="#0696D7">AUTODESK</text>
          </svg>
        </div>
        <div class="ost-tool-name">Autodesk</div>
        <div class="ost-tool-role">Revit · ACC · Navisworks · Civil 3D</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Civil · Infrastructure</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <rect x="0" y="1" width="18" height="20" rx="2" fill="#00B5E2"/>
            <text x="2" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="14" fill="white">B</text>
            <text x="22" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.3" fill="#00B5E2">BENTLEY</text>
          </svg>
        </div>
        <div class="ost-tool-name">Bentley</div>
        <div class="ost-tool-role">OpenRoads · iTwin · ProjectWise</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Construction OS</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <circle cx="9" cy="11" r="9" fill="#F47920"/>
            <text x="5" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="13" fill="white">P</text>
            <text x="21" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.3" fill="#F47920">PROCORE</text>
          </svg>
        </div>
        <div class="ost-tool-name">Procore</div>
        <div class="ost-tool-role">RFI · Submittals · Field Mgmt</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Digital Twin</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <path d="M2 11 L9 2 L16 11 L9 20 Z" fill="none" stroke="#0696D7" stroke-width="2"/>
            <circle cx="9" cy="11" r="3" fill="#0696D7"/>
            <text x="20" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.3" fill="#0d1f2d">TANDEM</text>
          </svg>
        </div>
        <div class="ost-tool-name">Tandem</div>
        <div class="ost-tool-role">Digital Twin · COBie · FM</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">GIS · Spatial</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <circle cx="9" cy="11" r="8.5" fill="none" stroke="#007AC2" stroke-width="1.8"/>
            <ellipse cx="9" cy="11" rx="4.5" ry="8.5" fill="none" stroke="#007AC2" stroke-width="1.2"/>
            <line x1="0.5" y1="11" x2="17.5" y2="11" stroke="#007AC2" stroke-width="1.2"/>
            <text x="21" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" fill="#007AC2">ESRI GIS</text>
          </svg>
        </div>
        <div class="ost-tool-name">ESRI / GIS</div>
        <div class="ost-tool-role">ArcGIS · Spatial BIM Integration</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Field · Mobile</div>
        <div class="ost-tool-logo">
          <svg width="70" height="22" viewBox="0 0 70 22" fill="none">
            <rect x="0" y="1" width="18" height="20" rx="3" fill="#1C1C3A"/>
            <text x="2" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="13" fill="#47B5FF">D</text>
            <text x="21" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.3" fill="#1C1C3A">DALUX</text>
          </svg>
        </div>
        <div class="ost-tool-name">Dalux</div>
        <div class="ost-tool-role">Field BIM · Model Viewer · QA</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Analytics</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <rect x="0"  y="12" width="5" height="9"  fill="#F2C811"/>
            <rect x="7"  y="7"  width="5" height="14" fill="#F2C811" opacity="0.75"/>
            <rect x="14" y="1"  width="5" height="20" fill="#F2C811" opacity="0.5"/>
            <text x="22" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" fill="#c9a200">POWER BI</text>
          </svg>
        </div>
        <div class="ost-tool-name">Power BI</div>
        <div class="ost-tool-role">Dashboards · Progress Reporting</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Model QA</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <polygon points="9,1 17,6 17,16 9,21 1,16 1,6" fill="none" stroke="#E85D26" stroke-width="1.8"/>
            <circle cx="9" cy="11" r="3.5" fill="#E85D26"/>
            <text x="21" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" letter-spacing="0.2" fill="#E85D26">SOLIBRI</text>
          </svg>
        </div>
        <div class="ost-tool-name">Solibri</div>
        <div class="ost-tool-role">Model Checking · IFC · OpenBIM</div>
      </div>

      <div class="ost-tool">
        <div class="ost-tool-cat">Standard</div>
        <div class="ost-tool-logo">
          <svg width="80" height="22" viewBox="0 0 80 22" fill="none">
            <rect x="0" y="1" width="18" height="20" rx="2" fill="none" stroke="#0B3C5D" stroke-width="1.5"/>
            <line x1="0" y1="8" x2="18" y2="8" stroke="#0B3C5D" stroke-width="1"/>
            <text x="2"  y="7"  font-family="Arial Black,Arial" font-weight="900" font-size="5" fill="#47B5FF">ISO</text>
            <text x="1"  y="18" font-family="Arial Black,Arial" font-weight="900" font-size="7" fill="#0B3C5D">19650</text>
            <text x="22" y="16" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" fill="#0B3C5D">BIM STD</text>
          </svg>
        </div>
        <div class="ost-tool-name">ISO 19650</div>
        <div class="ost-tool-role">BIM Standard · EIR · BEP Framework</div>
      </div>

    </div>

    <div class="ost-footnote">↳ Platform-agnostic · We integrate with your existing stack</div>

  </div>

</section>

<script>
(function(){
  var tools = document.querySelectorAll('.ost-tool');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  tools.forEach(function(t){ io.observe(t); });
}());
</script>`

export default function AboutSection() {
  return <HtmlSection html={html} />
}
