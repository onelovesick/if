'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .exec-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .exec-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ STATEMENT ═══ */
  .exec-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .exec-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .exec-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .exec-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .exec-integ h2 em { font-style: italic; color: #47B5FF; }

  .exec-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .exec-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* ═══ LIFECYCLE ═══ */
  .exec-lifecycle { margin-bottom: 96px; }

  .exec-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  /* Card grid */
  .exec-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .exec-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Left accent bar — present on all, coloured on best/ideal */
  .exec-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .exec-phase-card.exec-card-best::before { background: #47B5FF; }
  .exec-phase-card.exec-card-ideal::before { background: rgba(71,181,255,0.5); }

  .exec-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .exec-phase-card:hover::before { background: #47B5FF; }

  /* Phase number */
  .exec-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 10px;
  }

  .exec-pc-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #0B3C5D;
    line-height: 1.3;
    margin-bottom: 10px;
    min-height: 40px;
    transition: color 0.3s ease;
  }

  .exec-phase-card:hover .exec-pc-name { color: #47B5FF; }

  .exec-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    min-height: 46px;
  }

  /* Badge row — sits at bottom */
  .exec-pc-badge {
    margin-top: 18px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .exec-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .exec-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF;
  }

  .exec-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.6);
  }

  /* ═══ LOWER ═══ */
  .exec-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .exec-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .exec-lower h3 em { font-style: italic; color: #47B5FF; }

  .exec-lower-contracts h3 { margin-bottom: 12px; }

  .exec-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .exec-ps:first-child { padding-top: 0; }
  .exec-ps:hover { padding-left: 6px; }

  .exec-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.04em;
    color: rgba(11,60,93,0.08); line-height: 1;
    transition: color 0.3s ease;
  }
  .exec-ps:hover .exec-ps-num { color: rgba(71,181,255,0.25); }

  .exec-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.02em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px; transition: color 0.3s ease;
  }
  .exec-ps:hover .exec-ps-name { color: #47B5FF; }
  .exec-ps-name a { color: inherit; text-decoration: none; }

  .exec-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.65;
    color: #5a7a96; margin: 0;
  }

  .exec-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase; text-decoration: none;
    color: #47B5FF; transition: gap 0.2s ease;
  }
  .exec-lower-process-link:hover { gap: 14px; }

  .exec-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px;
    font-weight: 400; line-height: 1.75;
    color: #5a7a96; margin: 0 0 24px 0;
  }

  .exec-cc-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 16px;
    align-items: start; padding: 16px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .exec-cc-row:first-child { padding-top: 0; }
  .exec-cc-row:last-child { border-bottom: none; }
  .exec-cc-row:hover { padding-left: 6px; }

  .exec-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    transition: color 0.3s ease;
  }
  .exec-cc-row:hover .exec-cc-abbr { color: #47B5FF; }

  .exec-cc-name {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(11,60,93,0.4); margin-bottom: 3px;
  }

  .exec-cc-note {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .exec-lc-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 960px) {
    .exec-lower { grid-template-columns: 1fr; gap: 56px; }
  }

  @media (max-width: 600px) {
    .exec-integ { padding: 80px 20px 100px; }
    .exec-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="exec-integ">
  <div class="exec-integ-inner">

    <div class="exec-integ-statement" id="exec-integ-statement">
      <div class="exec-integ-eyebrow">Integration Points</div>
      <h2>Starts At Preconstruction.<br><em>Proves Itself</em> On Site.</h2>
      <p class="exec-integ-text">
        Execution intelligence is <strong>exponentially harder to retrofit</strong> than to embed from the start. The earlier 4D scheduling, work packaging, and field verification workflows are established, the less rework every downstream trade inherits \u2014 and the more defensible every progress claim becomes.
      </p>
    </div>

    <div class="exec-lifecycle">
      <div class="exec-lifecycle-label">Project Lifecycle · Execution Entry Points</div>
      <div class="exec-lc-grid">

        <div class="exec-phase-card exec-card-best" data-exec-phase>
          <div class="exec-pc-phase">Phase 03</div>
          <div class="exec-pc-name">Construction</div>
          <div class="exec-pc-desc">Maximum leverage. 4D scheduling, work packaging, progress tracking, and field QA/QC are most effective when deployed from day one of construction.</div>
          <div class="exec-pc-badge"><span class="exec-best-badge">Best Entry</span></div>
        </div>

        <div class="exec-phase-card exec-card-ideal" data-exec-phase>
          <div class="exec-pc-phase">Phase 02</div>
          <div class="exec-pc-name">Detailed Design</div>
          <div class="exec-pc-desc">Pre-construction planning. Link the 4D model, define work packages, establish inspection protocols, and simulate the construction sequence before mobilisation.</div>
          <div class="exec-pc-badge"><span class="exec-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="exec-phase-card" data-exec-phase>
          <div class="exec-pc-phase">Phase 01</div>
          <div class="exec-pc-name">Concept &amp; Design</div>
          <div class="exec-pc-desc">Early phasing studies and logistics planning using massing models. Sequence feasibility and site access validated before design is frozen.</div>
          <div class="exec-pc-badge"><span class="exec-integ-text-badge">Integration Possible</span></div>
        </div>

        <div class="exec-phase-card" data-exec-phase>
          <div class="exec-pc-phase">Phase 04</div>
          <div class="exec-pc-name">Operations</div>
          <div class="exec-pc-desc">Execution data feeds the handover. As-built verification, inspection records, and defect resolution history become the operational baseline for the Project Twin.</div>
          <div class="exec-pc-badge"><span class="exec-integ-text-badge">Handover Feed</span></div>
        </div>

      </div>
    </div>

    <div class="exec-lower">
      <div class="exec-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="exec-process-steps">
          <div class="exec-ps" data-exec-ps>
            <div class="exec-ps-num">01</div>
            <div class="exec-ps-content">
              <div class="exec-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="exec-ps-desc">Audit existing schedule-model linkage, field BIM readiness, inspection workflows, and progress tracking maturity. Map the gap between what\u2019s planned digitally and what\u2019s actually deployed on site.</p>
            </div>
          </div>
          <div class="exec-ps" data-exec-ps>
            <div class="exec-ps-num">02</div>
            <div class="exec-ps-content">
              <div class="exec-ps-name"><a href="/process/define/">Define</a></div>
              <p class="exec-ps-desc">Establish 4D linking protocols, work packaging structure, inspection form templates, progress capture methods, and QA/QC workflows. Define the execution framework before mobilisation.</p>
            </div>
          </div>
          <div class="exec-ps" data-exec-ps>
            <div class="exec-ps-num">03</div>
            <div class="exec-ps-content">
              <div class="exec-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="exec-ps-desc">Link the 4D model, deploy field BIM, configure inspection forms, activate progress dashboards, and train field teams on digital workflows.</p>
            </div>
          </div>
          <div class="exec-ps" data-exec-ps>
            <div class="exec-ps-num">04</div>
            <div class="exec-ps-content">
              <div class="exec-ps-name"><a href="/process/control/">Control</a></div>
              <p class="exec-ps-desc">Ongoing actual-vs.-planned tracking, issue resolution monitoring, inspection completion rates, and progress verification at every milestone. Execution intelligence doesn\u2019t stop at setup \u2014 it runs until handover.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="exec-lower-process-link">Our Full Process →</a>
      </div>

      <div class="exec-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="exec-lower-contracts-intro">Who owns the schedule, who deploys field BIM, and how progress is verified \u2014 all depends on procurement structure. We tailor the execution workflow to match.</p>
        <div class="exec-cc-list">
          <div class="exec-cc-row" data-exec-cc>
            <div class="exec-cc-abbr">DBB</div>
            <div class="exec-cc-info">
              <div class="exec-cc-name">Design-Bid-Build</div>
              <div class="exec-cc-note">Contractor owns execution. 4D scheduling bridges the design model to field sequencing. Progress verification protects the owner\u2019s investment.</div>
            </div>
          </div>
          <div class="exec-cc-row" data-exec-cc>
            <div class="exec-cc-abbr">DB</div>
            <div class="exec-cc-info">
              <div class="exec-cc-name">Design-Build</div>
              <div class="exec-cc-note">Single team designs and builds. Execution workflows connect design intent directly to field installation without translation loss.</div>
            </div>
          </div>
          <div class="exec-cc-row" data-exec-cc>
            <div class="exec-cc-abbr">P3</div>
            <div class="exec-cc-info">
              <div class="exec-cc-name">Public-Private Partnership</div>
              <div class="exec-cc-note">Long-lifecycle projects need verified execution data that survives concession periods. Every inspection, every progress claim, every defect \u2014 traceable.</div>
            </div>
          </div>
          <div class="exec-cc-row" data-exec-cc>
            <div class="exec-cc-abbr">CM</div>
            <div class="exec-cc-info">
              <div class="exec-cc-name">Construction Management</div>
              <div class="exec-cc-note">Multiple trade contractors need coordinated work packages, unified progress tracking, and centralised issue resolution across all scopes.</div>
            </div>
          </div>
          <div class="exec-cc-row" data-exec-cc>
            <div class="exec-cc-abbr">IPD</div>
            <div class="exec-cc-info">
              <div class="exec-cc-name">Integrated Project Delivery</div>
              <div class="exec-cc-note">Shared risk means shared execution data. Every party needs visibility into progress, issues, and verification \u2014 in real time.</div>
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
  var stmt = document.getElementById('exec-integ-statement');
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
  var phases = document.querySelectorAll('[data-exec-phase]');
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
  var ps = document.querySelectorAll('[data-exec-ps]');
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
  var cc = document.querySelectorAll('[data-exec-cc]');
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

export default function ExecutionIntegration() {
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
