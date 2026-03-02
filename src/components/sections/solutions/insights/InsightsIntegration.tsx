'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .ins-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .ins-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* \u2550\u2550\u2550 STATEMENT \u2550\u2550\u2550 */
  .ins-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .ins-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .ins-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .ins-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .ins-integ h2 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }

  .ins-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .ins-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* \u2550\u2550\u2550 LIFECYCLE \u2550\u2550\u2550 */
  .ins-lifecycle { margin-bottom: 96px; }

  .ins-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  .ins-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .ins-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .ins-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .ins-phase-card.ins-card-best::before { background: #47B5FF; }
  .ins-phase-card.ins-card-ideal::before { background: rgba(71,181,255,0.5); }

  .ins-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .ins-phase-card:hover::before { background: #47B5FF; }

  .ins-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 400;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #47B5FF; margin-bottom: 10px;
  }

  .ins-pc-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 15px;
    letter-spacing: 0.01em; text-transform: uppercase;
    color: #0B3C5D; line-height: 1.3;
    margin-bottom: 10px; min-height: 40px;
    transition: color 0.3s ease;
  }

  .ins-phase-card:hover .ins-pc-name { color: #47B5FF; }

  .ins-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.65; color: #5a7a96; min-height: 46px;
  }

  .ins-pc-badge {
    margin-top: 18px; height: 28px;
    display: flex; align-items: center;
  }

  .ins-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .ins-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #47B5FF;
  }

  .ins-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; color: rgba(71,181,255,0.6);
  }

  /* \u2550\u2550\u2550 LOWER \u2550\u2550\u2550 */
  .ins-lower {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px; padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .ins-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .ins-lower h3 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }

  .ins-lower-contracts h3 { margin-bottom: 12px; }

  .ins-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .ins-ps:first-child { padding-top: 0; }
  .ins-ps:hover { padding-left: 6px; }

  .ins-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; color: rgba(71,181,255,0.2);
    line-height: 1;
  }

  .ins-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px;
  }
  .ins-ps-name a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
  .ins-ps-name a:hover { color: #47B5FF; }

  .ins-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400;
    line-height: 1.65; color: #5a7a96;
  }

  .ins-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px; font-family: 'DM Mono', monospace;
    font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: #47B5FF; text-decoration: none;
    transition: gap 0.2s ease;
  }
  .ins-lower-process-link:hover { gap: 12px; }

  .ins-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400;
    line-height: 1.7; color: #5a7a96; margin-bottom: 28px;
  }

  .ins-cc-row {
    display: grid; grid-template-columns: 52px 1fr; gap: 14px;
    align-items: start; padding: 14px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .ins-cc-row:hover { padding-left: 6px; }

  .ins-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    line-height: 1.3;
    transition: color 0.3s ease;
  }
  .ins-cc-row:hover .ins-cc-abbr { color: #47B5FF; }

  .ins-cc-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 13px; text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 2px;
  }

  .ins-cc-note {
    font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400;
    line-height: 1.6; color: #5a7a96;
  }

  @media (max-width: 900px) {
    .ins-integ { padding: 80px 20px 100px; }
    .ins-lc-grid { grid-template-columns: 1fr 1fr; }
    .ins-lower { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .ins-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="ins-integ">
  <div class="ins-integ-inner">

    <div class="ins-integ-statement" id="ins-integ-statement">
      <div class="ins-integ-eyebrow">How We Work</div>
      <h2>Best From The Start.<br><em>Effective</em> At Any Stage.</h2>
      <p class="ins-integ-text">Analytics infrastructure delivers the most value when dashboards and data pipelines are defined from project inception. But most programmes don\u2019t start with a reporting strategy \u2014 we meet them where they are and build the visibility layer around what\u2019s already in motion. <strong>The scope adjusts. The analytics rigour doesn\u2019t.</strong></p>
    </div>

    <div class="ins-lifecycle">
      <div class="ins-lifecycle-label">Project Lifecycle \u00b7 Where Layer 06 Activates</div>
      <div class="ins-lc-grid">

        <div class="ins-phase-card" data-ins-phase>
          <div class="ins-pc-phase">Phase 01</div>
          <div class="ins-pc-name">Concept &amp; Design</div>
          <div class="ins-pc-desc">Define KPI frameworks, reporting requirements, and data capture obligations early. Specify what the programme must measure \u2014 before the first line is drawn.</div>
          <div class="ins-pc-badge"><span class="ins-integ-text-badge">Integration Possible</span></div>
        </div>

        <div class="ins-phase-card ins-card-best" data-ins-phase>
          <div class="ins-pc-phase">Phase 02</div>
          <div class="ins-pc-name">Detailed Design</div>
          <div class="ins-pc-desc">Establish data source mapping, ETL pipelines, dashboard architecture, and model validation rule sets before construction begins. Pre-construction analytics planning that prevents reporting gaps downstream.</div>
          <div class="ins-pc-badge"><span class="ins-best-badge">Best Entry</span></div>
        </div>

        <div class="ins-phase-card ins-card-ideal" data-ins-phase>
          <div class="ins-pc-phase">Phase 03</div>
          <div class="ins-pc-name">Construction</div>
          <div class="ins-pc-desc">Live dashboards tracking schedule performance, cost variance, model quality, and compliance metrics. Real-time visibility deployed during execution \u2014 when decisions matter most.</div>
          <div class="ins-pc-badge"><span class="ins-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="ins-phase-card ins-card-ideal" data-ins-phase>
          <div class="ins-pc-phase">Phase 04</div>
          <div class="ins-pc-name">Programme Reporting &amp; Close-Out</div>
          <div class="ins-pc-desc">Portfolio analytics, compliance scorecards, benchmark reporting, and lessons learned analysis. The data that proves performance and informs the next programme.</div>
          <div class="ins-pc-badge"><span class="ins-ideal-badge">Ongoing Value</span></div>
        </div>

      </div>
    </div>

    <div class="ins-lower">
      <div class="ins-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="ins-process-steps">
          <div class="ins-ps" data-ins-ps>
            <div class="ins-ps-num">01</div>
            <div class="ins-ps-content">
              <div class="ins-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="ins-ps-desc">Audit existing data sources, reporting workflows, and analytics gaps. Map what\u2019s connected, what\u2019s siloed, and what\u2019s missing. Establish baseline visibility maturity.</p>
            </div>
          </div>
          <div class="ins-ps" data-ins-ps>
            <div class="ins-ps-num">02</div>
            <div class="ins-ps-content">
              <div class="ins-ps-name"><a href="/process/define/">Define</a></div>
              <p class="ins-ps-desc">Specify the analytics architecture \u2014 data source integration, ETL pipelines, dashboard structure, KPI frameworks, validation rule sets, and reporting cadence.</p>
            </div>
          </div>
          <div class="ins-ps" data-ins-ps>
            <div class="ins-ps-num">03</div>
            <div class="ins-ps-content">
              <div class="ins-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="ins-ps-desc">Deploy dashboards, connect data sources, configure automated reporting, and establish BIM validation checks. Live analytics operational during construction.</p>
            </div>
          </div>
          <div class="ins-ps" data-ins-ps>
            <div class="ins-ps-num">04</div>
            <div class="ins-ps-content">
              <div class="ins-ps-name"><a href="/process/control/">Control</a></div>
              <p class="ins-ps-desc">Optimise reporting cycles, refine forecasts against actuals, calibrate benchmarks, and produce compliance scorecards. The feedback loop that tightens with every cycle.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="ins-lower-process-link">Our Full Process \u2192</a>
      </div>

      <div class="ins-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="ins-lower-contracts-intro">Who owns the reporting obligations, how data flows between parties, and when analytics are deployed \u2014 all depends on procurement structure. We tailor the visibility framework to match.</p>
        <div class="ins-cc-list">
          <div class="ins-cc-row" data-ins-cc>
            <div class="ins-cc-abbr">DBB</div>
            <div class="ins-cc-info">
              <div class="ins-cc-name">Design-Bid-Build</div>
              <div class="ins-cc-note">Reporting requirements specified in tender. Analytics dashboards validate designer outputs and track contractor performance against benchmarks.</div>
            </div>
          </div>
          <div class="ins-cc-row" data-ins-cc>
            <div class="ins-cc-abbr">DB</div>
            <div class="ins-cc-info">
              <div class="ins-cc-name">Design-Build</div>
              <div class="ins-cc-note">Integrated analytics from design through construction \u2014 single data pipeline without translation loss between design and field reporting.</div>
            </div>
          </div>
          <div class="ins-cc-row" data-ins-cc>
            <div class="ins-cc-abbr">P3</div>
            <div class="ins-cc-info">
              <div class="ins-cc-name">Public-Private Partnership</div>
              <div class="ins-cc-note">Long-lifecycle programmes require performance analytics that survive concession periods. Benchmarking and compliance tracking that spans decades.</div>
            </div>
          </div>
          <div class="ins-cc-row" data-ins-cc>
            <div class="ins-cc-abbr">CM</div>
            <div class="ins-cc-info">
              <div class="ins-cc-name">Construction Management</div>
              <div class="ins-cc-note">Multiple trade contractors generating data across platforms. Unified dashboards aggregate performance metrics from all scopes into a single view.</div>
            </div>
          </div>
          <div class="ins-cc-row" data-ins-cc>
            <div class="ins-cc-abbr">IPD</div>
            <div class="ins-cc-info">
              <div class="ins-cc-name">Integrated Project Delivery</div>
              <div class="ins-cc-note">Shared risk means shared visibility. Analytics distributed across all parties with unified KPI tracking and collaborative performance dashboards.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  /* Statement entrance */
  var stmt = document.getElementById('ins-integ-statement');
  if (stmt) {
    stmt.style.opacity = '0';
    stmt.style.transform = 'translateY(20px)';
    var obsS = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          stmt.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
          stmt.style.opacity = '1';
          stmt.style.transform = 'translateY(0)';
          obsS.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsS.observe(stmt);
  }

  /* Phase cards stagger */
  var phases = document.querySelectorAll('[data-ins-phase]');
  phases.forEach(function(p, i) {
    p.style.opacity = '0';
    p.style.transform = 'translateY(16px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            p.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(p);
  });

  /* Process steps */
  var ps = document.querySelectorAll('[data-ins-ps]');
  ps.forEach(function(s, i) {
    s.style.opacity = '0';
    s.style.transform = 'translateX(-12px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            s.style.transition = 'opacity 0.5s ease, transform 0.5s ease, padding-left 0.2s ease';
            s.style.opacity = '1';
            s.style.transform = 'translateX(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(s);
  });

  /* Contract rows */
  var cc = document.querySelectorAll('[data-ins-cc]');
  cc.forEach(function(r, i) {
    r.style.opacity = '0';
    r.style.transform = 'translateX(-12px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            r.style.transition = 'opacity 0.5s ease, transform 0.5s ease, padding-left 0.2s ease';
            r.style.opacity = '1';
            r.style.transform = 'translateX(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(r);
  });
})();`;

export default function InsightsIntegration() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const timer = setTimeout(() => { try { new Function(script)(); } catch(e) { console.error(e); } }, 300);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
