'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .twin-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .twin-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* \u2550\u2550\u2550 STATEMENT \u2550\u2550\u2550 */
  .twin-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .twin-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .twin-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .twin-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .twin-integ h2 em { font-style: italic; color: #47B5FF; }

  .twin-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .twin-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* \u2550\u2550\u2550 LIFECYCLE \u2550\u2550\u2550 */
  .twin-lifecycle { margin-bottom: 96px; }

  .twin-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  /* Card grid */
  .twin-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .twin-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Left accent bar */
  .twin-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .twin-phase-card.twin-card-best::before { background: #47B5FF; }
  .twin-phase-card.twin-card-ideal::before { background: rgba(71,181,255,0.5); }

  .twin-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .twin-phase-card:hover::before { background: #47B5FF; }

  .twin-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 10px;
  }

  .twin-pc-name {
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

  .twin-phase-card:hover .twin-pc-name { color: #47B5FF; }

  .twin-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    min-height: 46px;
  }

  /* Badge row */
  .twin-pc-badge {
    margin-top: 18px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .twin-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .twin-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF;
  }

  .twin-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.6);
  }

  /* \u2550\u2550\u2550 LOWER \u2550\u2550\u2550 */
  .twin-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .twin-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .twin-lower h3 em { font-style: italic; color: #47B5FF; }

  .twin-lower-contracts h3 { margin-bottom: 12px; }

  .twin-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .twin-ps:first-child { padding-top: 0; }
  .twin-ps:hover { padding-left: 6px; }

  .twin-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.04em;
    color: rgba(11,60,93,0.08); line-height: 1;
    transition: color 0.3s ease;
  }
  .twin-ps:hover .twin-ps-num { color: rgba(71,181,255,0.25); }

  .twin-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.02em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px;
  }
  .twin-ps-name a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
  .twin-ps-name a:hover { color: #47B5FF; }
  .twin-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400;
    line-height: 1.65; color: #5a7a96; margin: 0;
  }

  .twin-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 12px;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF; text-decoration: none;
    margin-top: 28px; transition: gap 0.3s ease;
  }
  .twin-lower-process-link:hover { gap: 14px; }

  .twin-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400;
    line-height: 1.7; color: #5a7a96; margin: 0 0 24px;
  }

  .twin-cc-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 16px;
    align-items: start; padding: 16px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .twin-cc-row:first-child { padding-top: 0; }
  .twin-cc-row:last-child { border-bottom: none; }
  .twin-cc-row:hover { padding-left: 6px; }

  .twin-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    line-height: 1.3;
    transition: color 0.3s ease;
  }
  .twin-cc-row:hover .twin-cc-abbr { color: #47B5FF; }

  .twin-cc-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 2px;
  }

  .twin-cc-note {
    font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400;
    line-height: 1.6; color: #5a7a96;
  }

  @media (max-width: 900px) {
    .twin-integ { padding: 80px 20px 100px; }
    .twin-lc-grid { grid-template-columns: 1fr 1fr; }
    .twin-lower { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .twin-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="twin-integ">
  <div class="twin-integ-inner">

    <div class="twin-integ-statement" id="twin-integ-statement">
      <div class="twin-integ-eyebrow">How We Work</div>
      <h2>Best At Inception.<br><em>Effective</em> At Any Stage.</h2>
      <p class="twin-integ-text">Project Twin delivers the most value when handover requirements are defined from the outset. But projects rarely start clean \u2014 we meet them where they are and structure the data framework around what\u2019s already in motion. <strong>The scope adjusts. The rigour doesn\u2019t.</strong></p>
    </div>

    <div class="twin-lifecycle">
      <div class="twin-lifecycle-label">Project Lifecycle \u00b7 Where Layer 05 Activates</div>
      <div class="twin-lc-grid">

        <div class="twin-phase-card" data-twin-phase>
          <div class="twin-pc-phase">Phase 01</div>
          <div class="twin-pc-name">Concept &amp; Design</div>
          <div class="twin-pc-desc">Early specification of EIR/AIR handover obligations and twin data requirements. Defines what the project must deliver for operations from day one.</div>
          <div class="twin-pc-badge"><span class="twin-integ-text-badge">Integration Possible</span></div>
        </div>

        <div class="twin-phase-card twin-card-ideal" data-twin-phase>
          <div class="twin-pc-phase">Phase 02</div>
          <div class="twin-pc-name">Detailed Design</div>
          <div class="twin-pc-desc">Define asset information requirements, classification taxonomy, and COBie structure before construction begins. Pre-construction planning that prevents handover failures downstream.</div>
          <div class="twin-pc-badge"><span class="twin-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="twin-phase-card twin-card-best" data-twin-phase>
          <div class="twin-pc-phase">Phase 03</div>
          <div class="twin-pc-name">Construction</div>
          <div class="twin-pc-desc">As-built verification, progressive data population, field change capture, and inspection record linkage. The twin\u2019s data backbone is built here \u2014 during site execution, not after.</div>
          <div class="twin-pc-badge"><span class="twin-best-badge">Best Entry</span></div>
        </div>

        <div class="twin-phase-card twin-card-best" data-twin-phase>
          <div class="twin-pc-phase">Phase 04</div>
          <div class="twin-pc-name">Commissioning &amp; Handover</div>
          <div class="twin-pc-desc">COBie validation, FM system mapping, documentation linkage, and TRI scoring at every milestone. The critical gate where project data becomes operational data.</div>
          <div class="twin-pc-badge"><span class="twin-best-badge">Critical Gate</span></div>
        </div>

      </div>
    </div>

    <div class="twin-lower">
      <div class="twin-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="twin-process-steps">
          <div class="twin-ps" data-twin-ps>
            <div class="twin-ps-num">01</div>
            <div class="twin-ps-content">
              <div class="twin-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="twin-ps-desc">Audit existing model data, handover requirements, and information gaps against EIR/AIR obligations and FM system specifications. Run a baseline TRI to quantify the gap.</p>
            </div>
          </div>
          <div class="twin-ps" data-twin-ps>
            <div class="twin-ps-num">02</div>
            <div class="twin-ps-content">
              <div class="twin-ps-name"><a href="/process/define/">Define</a></div>
              <p class="twin-ps-desc">Establish the twin data framework \u2014 COBie structure, asset information requirements, classification taxonomy, naming conventions, and handover validation criteria.</p>
            </div>
          </div>
          <div class="twin-ps" data-twin-ps>
            <div class="twin-ps-num">03</div>
            <div class="twin-ps-content">
              <div class="twin-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="twin-ps-desc">Deploy as-built verification, progressive data population, FM system mapping, and documentation linkage through construction and commissioning phases.</p>
            </div>
          </div>
          <div class="twin-ps" data-twin-ps>
            <div class="twin-ps-num">04</div>
            <div class="twin-ps-content">
              <div class="twin-ps-name"><a href="/process/control/">Control</a></div>
              <p class="twin-ps-desc">Validate the complete handover dataset against TRI benchmarks. Verify as-built accuracy, data completeness, COBie compliance, and FM readiness before asset acceptance.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="twin-lower-process-link">Our Full Process \u2192</a>
      </div>

      <div class="twin-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="twin-lower-contracts-intro">Who owns the handover data, how it\u2019s structured, and when it\u2019s validated \u2014 all depends on procurement structure. We tailor the twin data framework to match.</p>
        <div class="twin-cc-list">
          <div class="twin-cc-row" data-twin-cc>
            <div class="twin-cc-abbr">DBB</div>
            <div class="twin-cc-info">
              <div class="twin-cc-name">Design-Bid-Build</div>
              <div class="twin-cc-note">Handover obligations specified in tender, validated at each phase gate. Data requirements cascade from owner through designer to contractor.</div>
            </div>
          </div>
          <div class="twin-cc-row" data-twin-cc>
            <div class="twin-cc-abbr">DB</div>
            <div class="twin-cc-info">
              <div class="twin-cc-name">Design-Build</div>
              <div class="twin-cc-note">Single-source twin delivery \u2014 integrated data framework from design through handover without translation loss between parties.</div>
            </div>
          </div>
          <div class="twin-cc-row" data-twin-cc>
            <div class="twin-cc-abbr">P3</div>
            <div class="twin-cc-info">
              <div class="twin-cc-name">Public-Private Partnership</div>
              <div class="twin-cc-note">Long-lifecycle projects need verified handover data that survives concession periods. Every asset attribute, every certificate \u2014 traceable for decades.</div>
            </div>
          </div>
          <div class="twin-cc-row" data-twin-cc>
            <div class="twin-cc-abbr">CM</div>
            <div class="twin-cc-info">
              <div class="twin-cc-name">Construction Management</div>
              <div class="twin-cc-note">Multiple trade contractors need coordinated handover packages, unified asset data capture, and centralised documentation across all scopes.</div>
            </div>
          </div>
          <div class="twin-cc-row" data-twin-cc>
            <div class="twin-cc-abbr">IPD</div>
            <div class="twin-cc-info">
              <div class="twin-cc-name">Integrated Project Delivery</div>
              <div class="twin-cc-note">Shared risk means shared data responsibilities. The twin framework distributes handover obligations across all parties with unified validation.</div>
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
  var stmt = document.getElementById('twin-integ-statement');
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
  var phases = document.querySelectorAll('[data-twin-phase]');
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
  var ps = document.querySelectorAll('[data-twin-ps]');
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
  var cc = document.querySelectorAll('[data-twin-cc]');
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

export default function TwinIntegration() {
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
