'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .intel-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .intel-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ STATEMENT ═══ */
  .intel-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .intel-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .intel-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .intel-integ h2 em { font-style: italic; color: #47B5FF; }

  .intel-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .intel-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* ═══ LIFECYCLE ═══ */
  .intel-lifecycle { margin-bottom: 96px; }

  .intel-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  /* Card grid */
  .intel-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .intel-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Left accent bar — present on all, coloured on best/ideal */
  .intel-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .intel-phase-card.intel-card-best::before { background: #47B5FF; }
  .intel-phase-card.intel-card-ideal::before { background: rgba(71,181,255,0.5); }

  .intel-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .intel-phase-card:hover::before { background: #47B5FF; }

  /* Phase number */
  .intel-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 10px;
  }

  .intel-pc-name {
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

  .intel-phase-card:hover .intel-pc-name { color: #47B5FF; }

  .intel-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    min-height: 46px;
  }

  /* Badge row — sits at bottom */
  .intel-pc-badge {
    margin-top: 18px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .intel-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .intel-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF;
  }

  .intel-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.6);
  }

  /* ═══ LOWER ═══ */
  .intel-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .intel-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .intel-lower h3 em { font-style: italic; color: #47B5FF; }

  .intel-lower-contracts h3 { margin-bottom: 12px; }

  .intel-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .intel-ps:first-child { padding-top: 0; }
  .intel-ps:hover { padding-left: 6px; }

  .intel-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.04em;
    color: rgba(11,60,93,0.08); line-height: 1;
    transition: color 0.3s ease;
  }
  .intel-ps:hover .intel-ps-num { color: rgba(71,181,255,0.25); }

  .intel-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.02em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px; transition: color 0.3s ease;
  }
  .intel-ps:hover .intel-ps-name { color: #47B5FF; }
  .intel-ps-name a { color: inherit; text-decoration: none; }

  .intel-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.65;
    color: #5a7a96; margin: 0;
  }

  .intel-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase; text-decoration: none;
    color: #47B5FF; transition: gap 0.2s ease;
  }
  .intel-lower-process-link:hover { gap: 14px; }

  .intel-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px;
    font-weight: 400; line-height: 1.75;
    color: #5a7a96; margin: 0 0 24px 0;
  }

  .intel-cc-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 16px;
    align-items: start; padding: 16px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .intel-cc-row:first-child { padding-top: 0; }
  .intel-cc-row:last-child { border-bottom: none; }
  .intel-cc-row:hover { padding-left: 6px; }

  .intel-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    transition: color 0.3s ease;
  }
  .intel-cc-row:hover .intel-cc-abbr { color: #47B5FF; }

  .intel-cc-name {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(11,60,93,0.4); margin-bottom: 3px;
  }

  .intel-cc-note {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .intel-lc-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 960px) {
    .intel-lower { grid-template-columns: 1fr; gap: 56px; }
  }

  @media (max-width: 600px) {
    .intel-integ { padding: 80px 20px 100px; }
    .intel-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="intel-integ">
  <div class="intel-integ-inner">

    <div class="intel-integ-statement" id="intel-integ-statement">
      <div class="intel-integ-eyebrow">Integration Points</div>
      <h2>Best During Design.<br><em>Essential</em> During Construction.</h2>
      <p class="intel-integ-text">
        Model intelligence is <strong>exponentially harder to retrofit</strong> than to embed from the start. The earlier coordination, classification, and verification workflows are established, the less rework every downstream team inherits \u2014 and the faster every decision gets made.
      </p>
    </div>

    <div class="intel-lifecycle">
      <div class="intel-lifecycle-label">Project Lifecycle · Intelligence Entry Points</div>
      <div class="intel-lc-grid">

        <div class="intel-phase-card intel-card-best" data-intel-phase>
          <div class="intel-pc-phase">Phase 02</div>
          <div class="intel-pc-name">Detailed Design</div>
          <div class="intel-pc-desc">Maximum leverage. Define modelling standards, embed classification, and establish coordination workflows before geometry scales.</div>
          <div class="intel-pc-badge"><span class="intel-best-badge">Best Entry</span></div>
        </div>

        <div class="intel-phase-card intel-card-ideal" data-intel-phase>
          <div class="intel-pc-phase">Phase 03</div>
          <div class="intel-pc-name">Construction</div>
          <div class="intel-pc-desc">Field verification becomes critical. Scan-to-BIM validates as-built conditions, coordination catches late clashes, and QTO verification protects procurement.</div>
          <div class="intel-pc-badge"><span class="intel-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="intel-phase-card" data-intel-phase>
          <div class="intel-pc-phase">Phase 01</div>
          <div class="intel-pc-name">Concept &amp; Design</div>
          <div class="intel-pc-desc">Early massing and feasibility models can carry intelligence from day one. Classification and parameter templates prevent downstream remediation.</div>
          <div class="intel-pc-badge"><span class="intel-integ-text-badge">Integration Possible</span></div>
        </div>

        <div class="intel-phase-card" data-intel-phase>
          <div class="intel-pc-phase">Phase 04</div>
          <div class="intel-pc-name">Operations</div>
          <div class="intel-pc-desc">Retrofit model intelligence for FM handover. Re-audit parameters, verify as-built data, and rebuild the dataset the project should have delivered.</div>
          <div class="intel-pc-badge"><span class="intel-integ-text-badge">Retrofit Possible</span></div>
        </div>

      </div>
    </div>

    <div class="intel-lower">
      <div class="intel-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="intel-process-steps">
          <div class="intel-ps" data-intel-ps>
            <div class="intel-ps-num">01</div>
            <div class="intel-ps-content">
              <div class="intel-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="intel-ps-desc">Audit existing models for data quality, parameter completeness, classification accuracy, and coordination status. Map current model intelligence against EIR and BEP requirements.</p>
            </div>
          </div>
          <div class="intel-ps" data-intel-ps>
            <div class="intel-ps-num">02</div>
            <div class="intel-ps-content">
              <div class="intel-ps-name"><a href="/process/define/">Define</a></div>
              <p class="intel-ps-desc">Establish modelling standards, coordination matrices, clash detection rules, LOD/LOI targets, and verification protocols. Define the MII benchmark every model must meet.</p>
            </div>
          </div>
          <div class="intel-ps" data-intel-ps>
            <div class="intel-ps-num">03</div>
            <div class="intel-ps-content">
              <div class="intel-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="intel-ps-desc">Author and federate models to standard, run automated clash detection, integrate reality capture data, and execute QTO extraction and parameter auditing workflows.</p>
            </div>
          </div>
          <div class="intel-ps" data-intel-ps>
            <div class="intel-ps-num">04</div>
            <div class="intel-ps-content">
              <div class="intel-ps-name"><a href="/process/control/">Control</a></div>
              <p class="intel-ps-desc">Ongoing model health scoring, data completeness reporting, LOD compliance checks, and deliverable verification at every milestone. Intelligence doesn\u2019t stop at setup \u2014 it\u2019s continuous.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="intel-lower-process-link">Our Full Process →</a>
      </div>

      <div class="intel-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="intel-lower-contracts-intro">How models are coordinated, who verifies the data, and when intelligence is embedded \u2014 all depends on procurement structure. We tailor the intelligence workflow to match.</p>
        <div class="intel-cc-list">
          <div class="intel-cc-row" data-intel-cc>
            <div class="intel-cc-abbr">DBB</div>
            <div class="intel-cc-info">
              <div class="intel-cc-name">Design-Bid-Build</div>
              <div class="intel-cc-note">Models must be coordination-ready at handoff. Intelligence ensures the design model survives the bid process intact.</div>
            </div>
          </div>
          <div class="intel-cc-row" data-intel-cc>
            <div class="intel-cc-abbr">DB</div>
            <div class="intel-cc-info">
              <div class="intel-cc-name">Design-Build</div>
              <div class="intel-cc-note">Single team coordinates internally. Intelligence unifies design and construction models into one verified dataset.</div>
            </div>
          </div>
          <div class="intel-cc-row" data-intel-cc>
            <div class="intel-cc-abbr">P3</div>
            <div class="intel-cc-info">
              <div class="intel-cc-name">Public-Private Partnership</div>
              <div class="intel-cc-note">Long-lifecycle models need reality verification at every phase gate. Scan-to-BIM validates against as-built conditions.</div>
            </div>
          </div>
          <div class="intel-cc-row" data-intel-cc>
            <div class="intel-cc-abbr">CM</div>
            <div class="intel-cc-info">
              <div class="intel-cc-name">Construction Management</div>
              <div class="intel-cc-note">Multiple trade models need federated coordination. Intelligence provides the clash-free, quantity-verified assembly.</div>
            </div>
          </div>
          <div class="intel-cc-row" data-intel-cc>
            <div class="intel-cc-abbr">IPD</div>
            <div class="intel-cc-info">
              <div class="intel-cc-name">Integrated Project Delivery</div>
              <div class="intel-cc-note">Shared model authoring needs continuous verification. Intelligence ensures every contributor\u2019s work meets the collective standard.</div>
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
  var stmt = document.getElementById('intel-integ-statement');
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
  var phases = document.querySelectorAll('[data-intel-phase]');
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
  var ps = document.querySelectorAll('[data-intel-ps]');
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
  var cc = document.querySelectorAll('[data-intel-cc]');
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

export default function IntelligenceIntegration() {
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
