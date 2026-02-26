'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.ss{position:relative}

.ss-hdr{background:#0B3C5D;padding:48px 0;opacity:0;transform:translateY(28px);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1)}
.ss-hdr.vis{opacity:1;transform:translateY(0)}
.ss-hdr-c{max-width:1200px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;gap:32px}
.ss-hdr-left{display:flex;align-items:center;gap:20px}
.ss-hdr-ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF}
.ss-hdr-h{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(20px,2vw,26px);text-transform:uppercase;letter-spacing:-.01em;color:#F4F6F8;margin:0;line-height:1.2}
.ss-hdr-line{flex:1;height:1px;background:rgba(71,181,255,.15)}
.ss-hdr-stats{display:flex;gap:40px}
.ss-hdr-stat{text-align:center}
.ss-hdr-stat-val{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:22px;color:#47B5FF;line-height:1}
.ss-hdr-stat-label{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,246,248,.35);margin-top:6px}
@media(max-width:1024px){.ss-hdr-c{flex-direction:column;text-align:center}.ss-hdr-line{display:none}.ss-hdr-stats{gap:28px}}
@media(max-width:640px){.ss-hdr{padding:36px 0}.ss-hdr-c{padding:0 20px}.ss-hdr-stats{gap:20px}.ss-hdr-stat-val{font-size:18px}}

.sb{position:relative;padding:110px 0;overflow:hidden;opacity:0;transform:translateY(28px);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1)}
.sb.vis{opacity:1;transform:translateY(0)}
.sb.dk{background:#1C1F23}
.sb.lt{background:#F2F5F8}
.sb-c{max-width:1200px;margin:0 auto;padding:0 32px;position:relative;z-index:2}
.sb-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.sb.flip .sb-vis{order:-1}
.sb-wm{position:absolute;top:50%;transform:translateY(-50%);font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(160px,20vw,260px);line-height:.8;user-select:none;pointer-events:none;z-index:1}
.sb.dk .sb-wm{color:rgba(71,181,255,.04);right:24px}
.sb.lt .sb-wm{color:rgba(11,60,93,.04);right:24px}
.sb.flip .sb-wm{right:auto;left:24px}
.sb-txt{position:relative;z-index:2}
.sb .ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;gap:12px;margin-bottom:22px}
.sb .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.sb.dk h3{color:#F4F6F8}
.sb.lt h3{color:#0B3C5D}
.sb h3{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(30px,3.5vw,44px);text-transform:uppercase;letter-spacing:-.02em;margin-bottom:20px;line-height:1.06}
.sb h3 em{font-style:italic;color:#47B5FF}
.sb.dk .sb-p{color:#7a9bb5}
.sb.lt .sb-p{color:#5a7a96}
.sb-p{font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;margin-bottom:28px;max-width:460px}
.sb-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}
.sb.dk .sb-tg{border-color:rgba(71,181,255,.14);color:#7a9bb5}
.sb.lt .sb-tg{border-color:rgba(11,60,93,.1);color:#5a7a96}
.sb-tg{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border:1px solid;transition:all .3s ease}
.sb-tg:hover{border-color:#47B5FF;color:#47B5FF}
.sb-lk{font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#47B5FF;text-decoration:none;display:inline-flex;align-items:center;gap:10px;padding:14px 0;border-bottom:1px solid rgba(71,181,255,.2);transition:all .35s ease}
.sb-lk:hover{gap:16px;border-color:#47B5FF}

.sb-vis{position:relative;z-index:2}
.sb-card{position:relative;padding:44px 40px;border:1px solid rgba(71,181,255,.1);overflow:hidden}
.sb.dk .sb-card{background:rgba(11,60,93,.12)}
.sb.lt .sb-card{background:#fff;border-color:rgba(11,60,93,.08)}
.sb-card::before,.sb-card::after{content:'';position:absolute;width:16px;height:16px;pointer-events:none}
.sb-card::before{top:-1px;left:-1px;border-top:1px solid rgba(71,181,255,.3);border-left:1px solid rgba(71,181,255,.3)}
.sb-card::after{bottom:-1px;right:-1px;border-bottom:1px solid rgba(71,181,255,.3);border-right:1px solid rgba(71,181,255,.3)}
.sb-card-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid rgba(71,181,255,.08)}
.sb.lt .sb-card-hd{border-color:rgba(11,60,93,.08)}
.sb-card-num{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:48px;color:#47B5FF;opacity:.2;line-height:1}
.sb-card-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#47B5FF;opacity:.5;text-align:right}
.sb-stat{display:flex;align-items:baseline;gap:12px;margin-bottom:28px}
.sb-stat-val{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:44px;line-height:1}
.sb.dk .sb-stat-val{color:#F4F6F8}
.sb.lt .sb-stat-val{color:#0B3C5D}
.sb-stat-desc{font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;max-width:200px}
.sb.dk .sb-stat-desc{color:#7a9bb5}
.sb.lt .sb-stat-desc{color:#5a7a96}
.sb-del{margin-bottom:28px}
.sb-del-title{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#47B5FF;margin-bottom:14px;opacity:.7}
.sb-del-list{list-style:none;padding:0;margin:0}
.sb-del-list li{font-family:'Inter',sans-serif;font-size:13px;line-height:1;padding:10px 0;display:flex;align-items:center;gap:12px}
.sb.dk .sb-del-list li{color:#F4F6F8;border-bottom:1px solid rgba(71,181,255,.06)}
.sb.lt .sb-del-list li{color:#0B3C5D;border-bottom:1px solid rgba(11,60,93,.06)}
.sb-del-list li:last-child{border-bottom:none}
.sb-del-dot{width:6px;height:6px;border-radius:50%;background:#47B5FF;opacity:.5;flex-shrink:0}
.sb-flow{display:flex;gap:0;align-items:stretch}
.sb-flow-step{flex:1;text-align:center;padding:14px 8px;position:relative}
.sb.dk .sb-flow-step{border-right:1px solid rgba(71,181,255,.08)}
.sb.lt .sb-flow-step{border-right:1px solid rgba(11,60,93,.06)}
.sb-flow-step:last-child{border-right:none}
.sb-flow-num{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.15em;color:#47B5FF;opacity:.5;margin-bottom:6px}
.sb-flow-name{font-family:'Inter Tight',sans-serif;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.04em}
.sb.dk .sb-flow-name{color:#F4F6F8}
.sb.lt .sb-flow-name{color:#0B3C5D}
.sb-flow-step:not(:last-child)::after{content:'→';position:absolute;right:-6px;top:50%;transform:translateY(-50%);font-size:10px;color:#47B5FF;opacity:.3;z-index:2}
.sb-card-ft{margin-top:24px;padding-top:16px;border-top:1px solid rgba(71,181,255,.08);display:flex;align-items:center;justify-content:space-between}
.sb.lt .sb-card-ft{border-color:rgba(11,60,93,.08)}
.sb-card-ft-phase{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;opacity:.4}
.sb.dk .sb-card-ft-phase{color:#7a9bb5}
.sb.lt .sb-card-ft-phase{color:#5a7a96}
.sb-card-ft-std{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#47B5FF;opacity:.35}

@media(max-width:1024px){.sb-grid{grid-template-columns:1fr;gap:40px}.sb.flip .sb-vis{order:0}.sb-wm{display:none}}
@media(max-width:640px){.sb{padding:72px 0}.sb-c{padding:0 20px}.sb-card{padding:32px 24px}.sb-stat-val{font-size:36px}.sb-flow{flex-wrap:wrap}.sb-flow-step{min-width:45%;border-right:none!important;border-bottom:1px solid rgba(71,181,255,.06);padding:10px 6px}.sb-flow-step::after{display:none!important}}
</style>

<div class="ss">
<div class="ss-hdr" data-reveal>
<div class="ss-hdr-c">
<div class="ss-hdr-left">
<div class="ss-hdr-ey">— Deep Dive</div>
<h2 class="ss-hdr-h">What each layer delivers</h2>
</div>
<div class="ss-hdr-line"></div>
<div class="ss-hdr-stats">
<div class="ss-hdr-stat"><div class="ss-hdr-stat-val">6</div><div class="ss-hdr-stat-label">Layers</div></div>
<div class="ss-hdr-stat"><div class="ss-hdr-stat-val">30+</div><div class="ss-hdr-stat-label">Services</div></div>
<div class="ss-hdr-stat"><div class="ss-hdr-stat-val">5</div><div class="ss-hdr-stat-label">Phases</div></div>
<div class="ss-hdr-stat"><div class="ss-hdr-stat-val">ISO</div><div class="ss-hdr-stat-label">19650</div></div>
</div>
</div>
</div>
<div class="sb lt" data-reveal><div class="sb-wm">01</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 01 — Foundation</div><h3>Strategy &amp;<br/><em>Planning</em></h3><p class="sb-p">We define how digital delivery will work before a single model is opened. BIM Execution Plans, Employer's Information Requirements, and strategic roadmaps — aligned to your contract, programme, and risk profile.</p><div class="sb-tags"><span class="sb-tg">BEP Development</span><span class="sb-tg">EIR Authoring</span><span class="sb-tg">Digital Roadmaps</span><span class="sb-tg">Risk Assessment</span></div><a href="/solutions/strategy/" class="sb-lk">Explore Strategy →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">01</div><div class="sb-card-label">Strategy<br/>Layer</div></div><div class="sb-stat"><div class="sb-stat-val">100%</div><div class="sb-stat-desc">of projects begin with a structured BEP &amp; EIR framework</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>BIM Execution Plan (BEP)</li><li><span class="sb-del-dot"></span>Employer's Information Requirements</li><li><span class="sb-del-dot"></span>Digital Delivery Roadmap</li><li><span class="sb-del-dot"></span>Risk &amp; Maturity Assessment</li></ul></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: Inception</span><span class="sb-card-ft-std">ISO 19650-1</span></div></div></div></div></div></div>

<div class="sb dk flip" data-reveal><div class="sb-wm">02</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 02 — Architecture</div><h3>Information<br/><em>Structure</em></h3><p class="sb-p">We build the information architecture your project runs on. CDE environments, naming standards, LOD frameworks, and governance protocols that keep data clean, discoverable, and aligned across every discipline.</p><div class="sb-tags"><span class="sb-tg">CDE Setup</span><span class="sb-tg">Naming Standards</span><span class="sb-tg">LOD Frameworks</span><span class="sb-tg">Data Architecture</span></div><a href="/solutions/structure/" class="sb-lk">Explore Structure →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">02</div><div class="sb-card-label">Structure<br/>Layer</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>Common Data Environment (CDE)</li><li><span class="sb-del-dot"></span>File Naming Convention Matrix</li><li><span class="sb-del-dot"></span>LOD Specification per Discipline</li><li><span class="sb-del-dot"></span>Information Governance Protocol</li></ul></div><div class="sb-flow"><div class="sb-flow-step"><div class="sb-flow-num">A</div><div class="sb-flow-name">Define</div></div><div class="sb-flow-step"><div class="sb-flow-num">B</div><div class="sb-flow-name">Configure</div></div><div class="sb-flow-step"><div class="sb-flow-num">C</div><div class="sb-flow-name">Govern</div></div><div class="sb-flow-step"><div class="sb-flow-num">D</div><div class="sb-flow-name">Validate</div></div></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: Design</span><span class="sb-card-ft-std">ISO 19650-2</span></div></div></div></div></div></div>

<div class="sb lt" data-reveal><div class="sb-wm">03</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 03 — Production</div><h3>Digital<br/><em>Intelligence</em></h3><p class="sb-p">Precision BIM modelling, multi-discipline clash detection, scan-to-BIM processing, and quantity verification. We transform raw data into validated, coordinated intelligence your teams build from with confidence.</p><div class="sb-tags"><span class="sb-tg">BIM Modelling</span><span class="sb-tg">Clash Detection</span><span class="sb-tg">Scan-to-BIM</span><span class="sb-tg">QTO Verification</span></div><a href="/solutions/intelligence/" class="sb-lk">Explore Intelligence →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">03</div><div class="sb-card-label">Intelligence<br/>Layer</div></div><div class="sb-stat"><div class="sb-stat-val">0</div><div class="sb-stat-desc">critical clashes at construction start — that's the target</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>Federated BIM Model</li><li><span class="sb-del-dot"></span>Clash Detection Reports</li><li><span class="sb-del-dot"></span>Scan-to-BIM As-Existing Model</li><li><span class="sb-del-dot"></span>Verified Quantity Take-Offs</li></ul></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: Design + Construction</span><span class="sb-card-ft-std">ISO 19650-2</span></div></div></div></div></div></div>

<div class="sb dk flip" data-reveal><div class="sb-wm">04</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 04 — Field</div><h3>Construction<br/><em>Execution</em></h3><p class="sb-p">4D scheduling, digital work packaging, and construction BIM compliance. We connect the model to the field — ensuring what was designed is what gets built, tracked, and validated in real-time.</p><div class="sb-tags"><span class="sb-tg">4D Scheduling</span><span class="sb-tg">Work Packaging</span><span class="sb-tg">Field BIM</span><span class="sb-tg">Construction QA</span></div><a href="/solutions/execution/" class="sb-lk">Explore Execution →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">04</div><div class="sb-card-label">Execution<br/>Layer</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>4D Construction Sequence</li><li><span class="sb-del-dot"></span>Digital Work Packages</li><li><span class="sb-del-dot"></span>Field BIM Deployment</li><li><span class="sb-del-dot"></span>Progress Validation Reports</li></ul></div><div class="sb-flow"><div class="sb-flow-step"><div class="sb-flow-num">A</div><div class="sb-flow-name">Model</div></div><div class="sb-flow-step"><div class="sb-flow-num">B</div><div class="sb-flow-name">Schedule</div></div><div class="sb-flow-step"><div class="sb-flow-num">C</div><div class="sb-flow-name">Build</div></div><div class="sb-flow-step"><div class="sb-flow-num">D</div><div class="sb-flow-name">Verify</div></div></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: Construction</span><span class="sb-card-ft-std">ISO 19650-2/3</span></div></div></div></div></div></div>

<div class="sb lt" data-reveal><div class="sb-wm">05</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 05 — Handover</div><h3>Project<br/><em>Twin</em></h3><p class="sb-p">The asset doesn't stop at completion. We deliver verified as-built models, COBie-compliant data, and operations-ready digital twins — ensuring information survives handover and serves FM for decades.</p><div class="sb-tags"><span class="sb-tg">As-Built Models</span><span class="sb-tg">COBie Handover</span><span class="sb-tg">Digital Twin</span><span class="sb-tg">FM Integration</span></div><a href="/solutions/project-twin/" class="sb-lk">Explore Project Twin →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">05</div><div class="sb-card-label">Project Twin<br/>Layer</div></div><div class="sb-stat"><div class="sb-stat-val">30yr+</div><div class="sb-stat-desc">of asset value protected through structured digital handover</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>Verified As-Built Model</li><li><span class="sb-del-dot"></span>COBie Data Handover Package</li><li><span class="sb-del-dot"></span>Operations-Ready Digital Twin</li><li><span class="sb-del-dot"></span>Asset Information Model (AIM)</li></ul></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: Commissioning</span><span class="sb-card-ft-std">ISO 19650-3</span></div></div></div></div></div></div>

<div class="sb dk flip" data-reveal><div class="sb-wm">06</div><div class="sb-c"><div class="sb-grid"><div class="sb-txt"><div class="ey">Layer 06 — Oversight</div><h3>Actionable<br/><em>Insights</em></h3><p class="sb-p">Real-time dashboards, automated BIM auditing, 5D cost analytics, and granular progress tracking. We transform project data into decision-ready intelligence — from the field trailer to the boardroom.</p><div class="sb-tags"><span class="sb-tg">Dashboards</span><span class="sb-tg">BIM Auditing</span><span class="sb-tg">5D Analytics</span><span class="sb-tg">Progress Tracking</span></div><a href="/solutions/insights/" class="sb-lk">Explore Insights →</a></div><div class="sb-vis"><div class="sb-card"><div class="sb-card-hd"><div class="sb-card-num">06</div><div class="sb-card-label">Insights<br/>Layer</div></div><div class="sb-del"><div class="sb-del-title">Key Deliverables</div><ul class="sb-del-list"><li><span class="sb-del-dot"></span>Real-Time Project Dashboards</li><li><span class="sb-del-dot"></span>Automated BIM Audit Reports</li><li><span class="sb-del-dot"></span>5D Cost Analytics Engine</li><li><span class="sb-del-dot"></span>Executive Progress Reports</li></ul></div><div class="sb-flow"><div class="sb-flow-step"><div class="sb-flow-num">A</div><div class="sb-flow-name">Collect</div></div><div class="sb-flow-step"><div class="sb-flow-num">B</div><div class="sb-flow-name">Validate</div></div><div class="sb-flow-step"><div class="sb-flow-num">C</div><div class="sb-flow-name">Visualize</div></div><div class="sb-flow-step"><div class="sb-flow-num">D</div><div class="sb-flow-name">Decide</div></div></div><div class="sb-card-ft"><span class="sb-card-ft-phase">Phase: All Phases</span><span class="sb-card-ft-std">ISO 19650</span></div></div></div></div></div></div>
</div>
`;

const script = `
(function(){
  var blocks = document.querySelectorAll('.sb[data-reveal]');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('vis'); });
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
