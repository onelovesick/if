'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
/* ═══════════════════════════════════════════
   PYRAMID SECTION
   ═══════════════════════════════════════════ */
.sp{
  background:#F2F5F8;
  padding:120px 0;
  position:relative;
  overflow:hidden;
}
.sp .sp-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(circle at 25% 35%,rgba(11,60,93,0.04) 0%,transparent 50%),
    radial-gradient(circle at 75% 65%,rgba(71,181,255,0.03) 0%,transparent 50%);
  pointer-events:none;
}
.sp .sp-c{max-width:1200px;margin:0 auto;padding:0 32px}

/* Header */
.sp .sp-hd{margin-bottom:64px}
.sp .ey{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;
  gap:12px;margin-bottom:20px;
}
.sp .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.sp .sp-hd h2{
  font-family:'Inter Tight',sans-serif;font-weight:900;
  font-size:clamp(28px,3.5vw,44px);text-transform:uppercase;
  letter-spacing:-.02em;color:#0B3C5D;margin-bottom:14px;
}
.sp .sp-hd h2 em{font-style:italic;color:#47B5FF}
.sp .sp-hd>p{
  font-family:'Inter',sans-serif;font-size:15px;color:#5a7a96;
  max-width:560px;line-height:1.7;
}

/* ── Grid: content left, triangle right ── */
.sp-grid{
  display:grid;grid-template-columns:1fr 1fr;
  gap:56px;align-items:start;min-height:520px;
}

/* ── LEFT: Content cards ── */
.sp-panel{position:relative;min-height:480px}

.sp-card{
  position:absolute;top:0;left:0;right:0;
  opacity:0;transform:translateY(20px);
  transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1);
  pointer-events:none;
  padding:8px 0;
}
.sp-card.active{opacity:1;transform:translateY(0);pointer-events:auto}

.sp-card .cn{
  font-family:'Inter Tight',sans-serif;font-weight:900;font-size:80px;
  color:#0B3C5D;opacity:.05;line-height:1;margin-bottom:-28px;
  user-select:none;
}
.sp-card .cl{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:#47B5FF;margin-bottom:14px;
  display:flex;align-items:center;gap:10px;
}
.sp-card .cl::before{content:'';width:14px;height:1px;background:#47B5FF}
.sp-card h3{
  font-family:'Inter Tight',sans-serif;font-weight:900;font-size:28px;
  text-transform:uppercase;letter-spacing:-.01em;color:#0B3C5D;margin-bottom:16px;
}
.sp-card .cd{
  font-family:'Inter',sans-serif;font-size:15px;line-height:1.75;
  color:#5a7a96;margin-bottom:24px;max-width:450px;
}
.sp-card .cs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.sp-card .ct{
  font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;padding:5px 12px;background:rgba(11,60,93,.06);
  color:#0B3C5D;border-radius:2px;
}
.sp-card .ck{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;
  text-transform:uppercase;color:#47B5FF;text-decoration:none;
  display:inline-flex;align-items:center;gap:8px;transition:gap .3s ease;
}
.sp-card .ck:hover{gap:14px}

/* ── RIGHT: Pyramid ── */
.sp-pyr{
  display:flex;flex-direction:column;align-items:center;
  padding-top:10px;
}
.pyr-stack{
  display:flex;flex-direction:column;align-items:center;gap:0;
  width:100%;max-width:440px;
}

/* Each layer: simple colored bar with angled sides via border trick */
.pl{
  position:relative;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  height:62px;transition:all .35s cubic-bezier(.22,1,.36,1);
  border-bottom:1px solid rgba(255,255,255,.08);
}
/* Widths from top (narrowest) to bottom (widest) */
.pl-6{width:34%;background:#47B5FF;border-radius:4px 4px 0 0}
.pl-5{width:48%;background:#35a1e8}
.pl-4{width:60%;background:#2790d4}
.pl-3{width:72%;background:#1a7abc}
.pl-2{width:85%;background:#1264a3}
.pl-1{width:100%;background:#0B3C5D;border-radius:0 0 4px 4px;border-bottom:none}

.pl .pl-in{
  display:flex;align-items:center;gap:12px;
  padding:0 20px;position:relative;z-index:2;
}
.pl .pl-num{
  font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;
  color:rgba(255,255,255,.35);
}
.pl .pl-nm{
  font-family:'Inter Tight',sans-serif;font-weight:700;font-size:13px;
  text-transform:uppercase;letter-spacing:.05em;color:rgba(255,255,255,.8);
  white-space:nowrap;
}

/* Hover */
.pl::after{
  content:'';position:absolute;inset:0;background:rgba(255,255,255,0);
  transition:background .35s ease;pointer-events:none;
}
.pl:hover::after{background:rgba(255,255,255,.08)}
.pl:hover{transform:scaleX(1.03)}
.pl:hover .pl-nm{color:#fff}

/* Active */
.pl.active::after{background:rgba(255,255,255,.12)}
.pl.active{transform:scaleX(1.06)}
.pl.active .pl-nm{color:#fff;font-weight:800}
.pl.active .pl-num{color:rgba(255,255,255,.6)}

/* Active indicator */
.pl .pl-arr{
  position:absolute;left:-18px;top:50%;transform:translateY(-50%);
  width:0;height:0;
  border-top:5px solid transparent;border-bottom:5px solid transparent;
  border-left:7px solid #47B5FF;
  opacity:0;transition:all .3s ease;
}
.pl.active .pl-arr{opacity:1;left:-14px}

/* Footer */
.sp-pyr .pf{
  margin-top:20px;font-family:'DM Mono',monospace;font-size:9px;
  letter-spacing:.18em;text-transform:uppercase;color:#5a7a96;opacity:.45;
}

/* ── Responsive ── */
@media(max-width:1024px){
  .sp-grid{grid-template-columns:1fr;gap:40px}
  .sp-pyr{order:-1}
  .sp-panel{min-height:auto;position:relative}
  .sp-card{position:relative}
  .sp-card:not(.active){display:none}
}
@media(max-width:640px){
  .sp{padding:80px 0}
  .sp .sp-c{padding:0 20px}
  .pl{height:52px}
  .sp-card h3{font-size:22px}
  .sp-card .cn{font-size:60px}
}
</style>

<section class="sp">
  <div class="sp-bg"></div>
  <div class="sp-c">
    <div class="sp-hd">
      <div class="ey">Our Solutions Framework</div>
      <h2>Six Layers of <em>Digital</em> Control</h2>
      <p>Each layer builds on the one below — creating compounding value from strategy through to operational intelligence. Select a layer to explore.</p>
    </div>

    <div class="sp-grid">

      <!-- LEFT: Content panel -->
      <div class="sp-panel" id="spPanel">
        <div class="sp-card active" data-card="1">
          <div class="cn">01</div>
          <div class="cl">Layer 01 — Foundation</div>
          <h3>Strategy</h3>
          <p class="cd">We define how digital delivery will work before a single model is opened. BIM Execution Plans, Employer's Information Requirements, and strategic roadmaps — all aligned to your contract type, programme scale, and risk profile. This is where clarity begins.</p>
          <div class="cs">
            <span class="ct">BEP Development</span>
            <span class="ct">EIR Authoring</span>
            <span class="ct">Digital Roadmaps</span>
            <span class="ct">Risk Assessment</span>
            <span class="ct">Maturity Analysis</span>
          </div>
          <a href="/solutions/strategy/" class="ck">Explore Strategy →</a>
        </div>

        <div class="sp-card" data-card="2">
          <div class="cn">02</div>
          <div class="cl">Layer 02 — Architecture</div>
          <h3>Structure</h3>
          <p class="cd">We build the information architecture your project runs on. Common Data Environments, naming conventions, LOD frameworks, and the governance protocols that keep data clean, discoverable, and teams aligned across every discipline.</p>
          <div class="cs">
            <span class="ct">CDE Setup</span>
            <span class="ct">Naming Standards</span>
            <span class="ct">LOD Frameworks</span>
            <span class="ct">Data Architecture</span>
            <span class="ct">Governance Protocols</span>
          </div>
          <a href="/solutions/structure/" class="ck">Explore Structure →</a>
        </div>

        <div class="sp-card" data-card="3">
          <div class="cn">03</div>
          <div class="cl">Layer 03 — Production</div>
          <h3>Intelligence</h3>
          <p class="cd">Precision BIM modelling, multi-discipline clash detection, scan-to-BIM point cloud processing, and quantity take-off verification. We transform raw data into validated, coordinated intelligence your teams can build from with confidence.</p>
          <div class="cs">
            <span class="ct">BIM Modelling</span>
            <span class="ct">Clash Detection</span>
            <span class="ct">Scan-to-BIM</span>
            <span class="ct">QTO Verification</span>
            <span class="ct">Model Federation</span>
          </div>
          <a href="/solutions/intelligence/" class="ck">Explore Intelligence →</a>
        </div>

        <div class="sp-card" data-card="4">
          <div class="cn">04</div>
          <div class="cl">Layer 04 — Field</div>
          <h3>Execution</h3>
          <p class="cd">4D scheduling, digital work packaging, and construction BIM compliance. We connect the model to the field — ensuring what was designed is what gets built, with real-time validation, progress tracking, and production-grade QA at every phase.</p>
          <div class="cs">
            <span class="ct">4D Scheduling</span>
            <span class="ct">Work Packaging</span>
            <span class="ct">Field BIM</span>
            <span class="ct">Construction QA</span>
            <span class="ct">Progress Validation</span>
          </div>
          <a href="/solutions/execution/" class="ck">Explore Execution →</a>
        </div>

        <div class="sp-card" data-card="5">
          <div class="cn">05</div>
          <div class="cl">Layer 05 — Handover</div>
          <h3>Project Twin</h3>
          <p class="cd">The asset doesn't stop at substantial completion. We deliver verified as-built models, COBie-compliant structured data, and operations-ready digital twins — ensuring the data your teams built survives handover and serves facilities management for decades.</p>
          <div class="cs">
            <span class="ct">As-Built Models</span>
            <span class="ct">COBie Handover</span>
            <span class="ct">Digital Twin</span>
            <span class="ct">FM Integration</span>
            <span class="ct">AIM Delivery</span>
          </div>
          <a href="/solutions/project-twin/" class="ck">Explore Project Twin →</a>
        </div>

        <div class="sp-card" data-card="6">
          <div class="cn">06</div>
          <div class="cl">Layer 06 — Oversight</div>
          <h3>Insights</h3>
          <p class="cd">Real-time project dashboards, automated BIM auditing, 5D cost analytics, and granular progress tracking. We transform your project data into decision-ready intelligence that flows from the field trailer to the executive boardroom.</p>
          <div class="cs">
            <span class="ct">Dashboards</span>
            <span class="ct">BIM Auditing</span>
            <span class="ct">5D Analytics</span>
            <span class="ct">Progress Tracking</span>
            <span class="ct">Executive Reporting</span>
          </div>
          <a href="/solutions/insights/" class="ck">Explore Insights →</a>
        </div>
      </div>

      <!-- RIGHT: Pyramid -->
      <div class="sp-pyr">
        <div class="pyr-stack">
          <div class="pl pl-6" data-layer="6">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">06</span><span class="pl-nm">Insights</span></div>
          </div>
          <div class="pl pl-5" data-layer="5">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">05</span><span class="pl-nm">Project Twin</span></div>
          </div>
          <div class="pl pl-4" data-layer="4">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">04</span><span class="pl-nm">Execution</span></div>
          </div>
          <div class="pl pl-3" data-layer="3">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">03</span><span class="pl-nm">Intelligence</span></div>
          </div>
          <div class="pl pl-2" data-layer="2">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">02</span><span class="pl-nm">Structure</span></div>
          </div>
          <div class="pl pl-1 active" data-layer="1">
            <div class="pl-arr"></div>
            <div class="pl-in"><span class="pl-num">01</span><span class="pl-nm">Strategy</span></div>
          </div>
        </div>
        <div class="pf">Foundation → Oversight · Click to explore</div>
      </div>

    </div>
  </div>
</section>
`;

const script = `
(function(){
  var layers = document.querySelectorAll('.pl[data-layer]');
  var cards = document.querySelectorAll('.sp-card[data-card]');

  function activate(num) {
    layers.forEach(function(l){ l.classList.remove('active'); });
    cards.forEach(function(c){ c.classList.remove('active'); });

    var layer = document.querySelector('.pl[data-layer="'+num+'"]');
    var card = document.querySelector('.sp-card[data-card="'+num+'"]');

    if(layer) layer.classList.add('active');
    if(card) card.classList.add('active');
  }

  layers.forEach(function(l){
    l.addEventListener('click', function(){
      activate(this.getAttribute('data-layer'));
    });
  });
})();
`;

export default function SolutionsOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const timer = setTimeout(() => {
      try { new Function(script)(); } catch (e) { console.error('Pyramid script error:', e); }
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
