'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
/* ═══════════════════════════════════════════════════
   SOLUTIONS SHOWCASE — Long-format editorial
   ═══════════════════════════════════════════════════ */
.ss{position:relative}

/* ── Single solution block ── */
.sb{position:relative;padding:100px 0;overflow:hidden;opacity:0;transform:translateY(28px);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1)}
.sb.vis{opacity:1;transform:translateY(0)}

/* Dark blocks */
.sb.dk{background:#1C1F23;color:#F4F6F8}
.sb.dk .sb-muted{color:#7a9bb5}
.sb.dk .sb-border{border-color:rgba(71,181,255,.14)}
.sb.dk .sb-tag{border-color:rgba(71,181,255,.14);color:#7a9bb5}
.sb.dk .sb-tag:hover{border-color:#47B5FF;color:#47B5FF}
.sb.dk .sb-big{color:rgba(71,181,255,.06)}
.sb.dk .sb-line{background:rgba(71,181,255,.06)}

/* Light blocks */
.sb.lt{background:#F2F5F8;color:#0B3C5D}
.sb.lt .sb-muted{color:#5a7a96}
.sb.lt .sb-border{border-color:rgba(11,60,93,.09)}
.sb.lt .sb-tag{border-color:rgba(11,60,93,.1);color:#5a7a96}
.sb.lt .sb-tag:hover{border-color:#47B5FF;color:#0B3C5D}
.sb.lt .sb-big{color:rgba(11,60,93,.05)}
.sb.lt .sb-line{background:rgba(11,60,93,.06)}

/* Container */
.sb-c{max-width:1200px;margin:0 auto;padding:0 32px;position:relative;z-index:2}

/* ── Layout grid ── */
.sb-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.sb.flip .sb-visual{order:-1}

/* ── Big background number ── */
.sb-big{
  font-family:'Inter Tight',sans-serif;font-weight:900;
  font-size:clamp(140px,18vw,220px);line-height:.85;
  position:absolute;right:32px;top:50%;transform:translateY(-50%);
  user-select:none;pointer-events:none;z-index:1;
}
.sb.flip .sb-big{right:auto;left:32px}

/* ── Content side ── */
.sb-content{position:relative;z-index:2}
.sb .ey{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;
  gap:12px;margin-bottom:20px;
}
.sb .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.sb h3{
  font-family:'Inter Tight',sans-serif;font-weight:900;
  font-size:clamp(32px,4vw,48px);text-transform:uppercase;
  letter-spacing:-.02em;margin-bottom:20px;line-height:1.05;
}
.sb h3 em{font-style:italic;color:#47B5FF}
.sb .sb-desc{
  font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;
  margin-bottom:28px;max-width:480px;
}
.sb .sb-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}
.sb-tag{
  font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;padding:6px 14px;border:1px solid;
  transition:all .3s ease;
}
.sb .sb-link{
  font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.1em;
  text-transform:uppercase;color:#47B5FF;text-decoration:none;
  display:inline-flex;align-items:center;gap:10px;
  padding:14px 0;border-bottom:1px solid rgba(71,181,255,.2);
  transition:all .35s ease;
}
.sb .sb-link:hover{gap:16px;border-color:#47B5FF}

/* ── Visual side ── */
.sb-visual{
  position:relative;display:flex;align-items:center;justify-content:center;
  min-height:380px;
}
.sb-vis-box{
  width:100%;max-width:400px;aspect-ratio:1;position:relative;
  display:flex;align-items:center;justify-content:center;
}
/* Visual: subtle border box with corner brackets */
.sb-vis-frame{
  position:absolute;inset:20px;
  border:1px solid rgba(71,181,255,.1);
}
.sb-vis-frame::before,.sb-vis-frame::after{
  content:'';position:absolute;width:18px;height:18px;
}
.sb-vis-frame::before{top:-1px;left:-1px;border-top:1px solid rgba(71,181,255,.3);border-left:1px solid rgba(71,181,255,.3)}
.sb-vis-frame::after{bottom:-1px;right:-1px;border-bottom:1px solid rgba(71,181,255,.3);border-right:1px solid rgba(71,181,255,.3)}

/* SVG icon */
.sb-vis-box svg{
  width:120px;height:120px;position:relative;z-index:2;
  stroke:#47B5FF;stroke-width:.8;fill:none;
  opacity:.45;filter:drop-shadow(0 0 30px rgba(71,181,255,.1));
}
/* Glow */
.sb-vis-glow{
  position:absolute;width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,rgba(71,181,255,.06) 0%,transparent 70%);
  pointer-events:none;
}

/* Layer number badge */
.sb-badge{
  position:absolute;top:12px;left:12px;
  font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;
  text-transform:uppercase;color:#47B5FF;opacity:.5;z-index:3;
}

/* ── Divider line between blocks ── */
.sb-divider{
  height:1px;max-width:1200px;margin:0 auto;
}
.sb.dk+.sb.dk .sb-divider-top,
.sb.lt+.sb.lt .sb-divider-top{display:block}

/* ── Section header ── */
.ss-hd{
  padding:120px 0 40px;text-align:center;
  background:linear-gradient(180deg,#1C1F23 0%,#1C1F23 60%,#F2F5F8 60%,#F2F5F8 100%);
  position:relative;overflow:hidden;
}
.ss-hd .ss-hd-inner{
  position:relative;z-index:2;max-width:700px;margin:0 auto;padding:0 32px;
}
.ss-hd .ey{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;
  gap:12px;margin-bottom:20px;justify-content:center;
}
.ss-hd .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.ss-hd h2{
  font-family:'Inter Tight',sans-serif;font-weight:900;
  font-size:clamp(30px,4vw,50px);text-transform:uppercase;
  letter-spacing:-.02em;color:#F4F6F8;margin-bottom:18px;line-height:1.05;
}
.ss-hd h2 em{font-style:italic;color:#47B5FF}
.ss-hd p{
  font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;
  color:#7a9bb5;max-width:540px;margin:0 auto;
}

/* ── Counter badge on dark bg accent strip ── */
.ss-count{
  display:flex;justify-content:center;gap:48px;
  padding:40px 32px;background:#0B3C5D;
}
.ss-count-item{text-align:center}
.ss-count-num{
  font-family:'Inter Tight',sans-serif;font-weight:900;font-size:32px;
  color:#F4F6F8;line-height:1;
}
.ss-count-label{
  font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.15em;
  text-transform:uppercase;color:#7a9bb5;margin-top:6px;
}

/* ── Responsive ── */
@media(max-width:1024px){
  .sb-grid{grid-template-columns:1fr;gap:40px}
  .sb.flip .sb-visual{order:0}
  .sb-big{display:none}
  .sb-visual{min-height:280px}
}
@media(max-width:640px){
  .sb{padding:72px 0}
  .sb-c{padding:0 20px}
  .ss-hd{padding:80px 0 30px}
  .ss-count{flex-wrap:wrap;gap:32px}
}
</style>

<!-- ═══ Section Header ═══ -->
<div class="ss-hd">
  <div class="ss-hd-inner">
    <div class="ey">Advanced BIM &amp; Digital Delivery</div>
    <h2>Our Solution <em>Layers</em></h2>
    <p>Six integrated layers — from strategic vision to operational intelligence. Each compounds on the last, building a complete digital delivery ecosystem for your programme.</p>
  </div>
</div>

<!-- ═══ Counter Strip ═══ -->
<div class="ss-count">
  <div class="ss-count-item"><div class="ss-count-num">6</div><div class="ss-count-label">Solution Layers</div></div>
  <div class="ss-count-item"><div class="ss-count-num">30+</div><div class="ss-count-label">Service Lines</div></div>
  <div class="ss-count-item"><div class="ss-count-num">ISO</div><div class="ss-count-label">19650 Aligned</div></div>
  <div class="ss-count-item"><div class="ss-count-num">5</div><div class="ss-count-label">Lifecycle Phases</div></div>
</div>

<div class="ss">

<!-- ═══════ 01 — STRATEGY ═══════ -->
<div class="sb lt" data-reveal>
  <div class="sb-big sb-big">01</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 01 — Foundation</div>
        <h3>Strategy &amp;<br/><em>Planning</em></h3>
        <p class="sb-desc sb-muted">We define how digital delivery will work before a single model is opened. BIM Execution Plans, Employer's Information Requirements, and strategic roadmaps — all aligned to your contract type, programme scale, and risk profile. This is where every successful project begins.</p>
        <div class="sb-tags">
          <span class="sb-tag">BEP Development</span>
          <span class="sb-tag">EIR Authoring</span>
          <span class="sb-tag">Digital Roadmaps</span>
          <span class="sb-tag">Risk Assessment</span>
          <span class="sb-tag">Maturity Analysis</span>
        </div>
        <a href="/solutions/strategy/" class="sb-link">Explore Strategy →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">01 · Strategy</div>
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="45" stroke-dasharray="4 6"/><line x1="60" y1="15" x2="60" y2="105"/><line x1="15" y1="60" x2="105" y2="60"/><circle cx="60" cy="60" r="12"/><circle cx="60" cy="60" r="3" fill="#47B5FF" opacity=".4"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ 02 — STRUCTURE ═══════ -->
<div class="sb dk flip" data-reveal>
  <div class="sb-big">02</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 02 — Architecture</div>
        <h3>Information<br/><em>Structure</em></h3>
        <p class="sb-desc sb-muted">We build the information architecture your project runs on. Common Data Environments, naming conventions, LOD frameworks, and the governance protocols that keep data clean, discoverable, and teams aligned across every discipline and delivery phase.</p>
        <div class="sb-tags">
          <span class="sb-tag">CDE Setup</span>
          <span class="sb-tag">Naming Standards</span>
          <span class="sb-tag">LOD Frameworks</span>
          <span class="sb-tag">Data Architecture</span>
          <span class="sb-tag">Governance Protocols</span>
        </div>
        <a href="/solutions/structure/" class="sb-link">Explore Structure →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">02 · Structure</div>
          <svg viewBox="0 0 120 120"><rect x="20" y="20" width="80" height="80" stroke-dasharray="4 6"/><rect x="35" y="35" width="50" height="50"/><line x1="20" y1="20" x2="35" y2="35"/><line x1="100" y1="20" x2="85" y2="35"/><line x1="20" y1="100" x2="35" y2="85"/><line x1="100" y1="100" x2="85" y2="85"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ 03 — INTELLIGENCE ═══════ -->
<div class="sb lt" data-reveal>
  <div class="sb-big">03</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 03 — Production</div>
        <h3>Digital<br/><em>Intelligence</em></h3>
        <p class="sb-desc sb-muted">Precision BIM modelling, multi-discipline clash detection, scan-to-BIM point cloud processing, and quantity take-off verification. We transform raw project data into validated, coordinated intelligence your teams can build from with full confidence.</p>
        <div class="sb-tags">
          <span class="sb-tag">BIM Modelling</span>
          <span class="sb-tag">Clash Detection</span>
          <span class="sb-tag">Scan-to-BIM</span>
          <span class="sb-tag">QTO Verification</span>
          <span class="sb-tag">Model Federation</span>
        </div>
        <a href="/solutions/intelligence/" class="sb-link">Explore Intelligence →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">03 · Intelligence</div>
          <svg viewBox="0 0 120 120"><polygon points="60,10 108,35 108,85 60,110 12,85 12,35" stroke-dasharray="4 6"/><line x1="60" y1="10" x2="60" y2="110"/><line x1="12" y1="35" x2="108" y2="85"/><line x1="108" y1="35" x2="12" y2="85"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ 04 — EXECUTION ═══════ -->
<div class="sb dk flip" data-reveal>
  <div class="sb-big">04</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 04 — Field</div>
        <h3>Construction<br/><em>Execution</em></h3>
        <p class="sb-desc sb-muted">4D scheduling, digital work packaging, and construction BIM compliance. We connect the model to the field — ensuring what was designed is what gets built, with real-time validation, production tracking, and quality assurance at every construction phase.</p>
        <div class="sb-tags">
          <span class="sb-tag">4D Scheduling</span>
          <span class="sb-tag">Work Packaging</span>
          <span class="sb-tag">Field BIM</span>
          <span class="sb-tag">Construction QA</span>
          <span class="sb-tag">Progress Validation</span>
        </div>
        <a href="/solutions/execution/" class="sb-link">Explore Execution →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">04 · Execution</div>
          <svg viewBox="0 0 120 120"><rect x="15" y="28" width="90" height="64" rx="2" stroke-dasharray="4 6"/><line x1="15" y1="48" x2="105" y2="48"/><line x1="15" y1="68" x2="105" y2="68"/><line x1="42" y1="28" x2="42" y2="92"/><rect x="44" y="30" width="28" height="16" fill="rgba(71,181,255,.12)" stroke="none"/><rect x="44" y="50" width="58" height="16" fill="rgba(71,181,255,.08)" stroke="none"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ 05 — PROJECT TWIN ═══════ -->
<div class="sb lt" data-reveal>
  <div class="sb-big">05</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 05 — Handover</div>
        <h3>Project<br/><em>Twin</em></h3>
        <p class="sb-desc sb-muted">The asset doesn't stop at substantial completion. We deliver verified as-built models, COBie-compliant structured data, and operations-ready digital twins — ensuring the information your teams built survives handover and serves facilities management for decades.</p>
        <div class="sb-tags">
          <span class="sb-tag">As-Built Models</span>
          <span class="sb-tag">COBie Handover</span>
          <span class="sb-tag">Digital Twin</span>
          <span class="sb-tag">FM Integration</span>
          <span class="sb-tag">AIM Delivery</span>
        </div>
        <a href="/solutions/project-twin/" class="sb-link">Explore Project Twin →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">05 · Project Twin</div>
          <svg viewBox="0 0 120 120"><circle cx="42" cy="60" r="28" stroke-dasharray="4 6"/><circle cx="78" cy="60" r="28" stroke-dasharray="4 6"/><path d="M60,40 Q66,60 60,80" fill="none"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ 06 — INSIGHTS ═══════ -->
<div class="sb dk flip" data-reveal>
  <div class="sb-big">06</div>
  <div class="sb-c">
    <div class="sb-grid">
      <div class="sb-content">
        <div class="ey">Layer 06 — Oversight</div>
        <h3>Actionable<br/><em>Insights</em></h3>
        <p class="sb-desc sb-muted">Real-time project dashboards, automated BIM auditing, 5D cost analytics, and granular progress tracking. We transform your project data into decision-ready intelligence that flows from the field trailer to the executive boardroom — on every programme.</p>
        <div class="sb-tags">
          <span class="sb-tag">Dashboards</span>
          <span class="sb-tag">BIM Auditing</span>
          <span class="sb-tag">5D Analytics</span>
          <span class="sb-tag">Progress Tracking</span>
          <span class="sb-tag">Executive Reporting</span>
        </div>
        <a href="/solutions/insights/" class="sb-link">Explore Insights →</a>
      </div>
      <div class="sb-visual">
        <div class="sb-vis-box">
          <div class="sb-vis-glow"></div>
          <div class="sb-vis-frame"></div>
          <div class="sb-badge">06 · Insights</div>
          <svg viewBox="0 0 120 120"><rect x="16" y="75" width="16" height="25" fill="rgba(71,181,255,.15)" stroke="#47B5FF"/><rect x="38" y="55" width="16" height="45" fill="rgba(71,181,255,.15)" stroke="#47B5FF"/><rect x="60" y="35" width="16" height="65" fill="rgba(71,181,255,.15)" stroke="#47B5FF"/><rect x="82" y="18" width="16" height="82" fill="rgba(71,181,255,.15)" stroke="#47B5FF"/><line x1="10" y1="102" x2="108" y2="102"/><polyline points="22,72 46,52 68,32 90,15" stroke-dasharray="3 4"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
`;

const script = `
(function(){
  var blocks = document.querySelectorAll('.sb[data-reveal]');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('vis');
    });
  },{threshold:0.08});
  blocks.forEach(function(b){ observer.observe(b); });
})();
`;

export default function SolutionsOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.02 }
    );
    observer.observe(el);

    const timer = setTimeout(() => {
      try { new Function(script)(); } catch (e) { console.error('Solutions showcase error:', e); }
    }, 300);

    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={sectionRef}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
