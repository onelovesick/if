'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .str-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .str-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ STATEMENT ═══ */
  .str-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .str-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .str-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .str-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .str-integ h2 em { font-style: italic; color: #47B5FF; }

  .str-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .str-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* ═══ LIFECYCLE ═══ */
  .str-lifecycle { margin-bottom: 96px; }

  .str-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  /* Card grid */
  .str-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .str-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Left accent bar — present on all, coloured on best/ideal */
  .str-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .str-phase-card.str-card-best::before { background: #47B5FF; }
  .str-phase-card.str-card-ideal::before { background: rgba(71,181,255,0.5); }

  .str-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .str-phase-card:hover::before { background: #47B5FF; }

  /* Phase number */
  .str-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 10px;
  }

  .str-pc-name {
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

  .str-phase-card:hover .str-pc-name { color: #47B5FF; }

  .str-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    min-height: 46px;
  }

  /* Badge row — sits at bottom */
  .str-pc-badge {
    margin-top: 18px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .str-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .str-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF;
  }

  .str-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.6);
  }

  /* ═══ LOWER ═══ */
  .str-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .str-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .str-lower h3 em { font-style: italic; color: #47B5FF; }

  .str-lower-contracts h3 { margin-bottom: 12px; }

  .str-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .str-ps:first-child { padding-top: 0; }
  .str-ps:hover { padding-left: 6px; }

  .str-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.04em;
    color: rgba(11,60,93,0.08); line-height: 1;
    transition: color 0.3s ease;
  }
  .str-ps:hover .str-ps-num { color: rgba(71,181,255,0.25); }

  .str-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.02em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px; transition: color 0.3s ease;
  }
  .str-ps:hover .str-ps-name { color: #47B5FF; }
  .str-ps-name a { color: inherit; text-decoration: none; }

  .str-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.65;
    color: #5a7a96; margin: 0;
  }

  .str-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase; text-decoration: none;
    color: #47B5FF; transition: gap 0.2s ease;
  }
  .str-lower-process-link:hover { gap: 14px; }

  .str-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px;
    font-weight: 400; line-height: 1.75;
    color: #5a7a96; margin: 0 0 24px 0;
  }

  .str-cc-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 16px;
    align-items: start; padding: 16px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .str-cc-row:first-child { padding-top: 0; }
  .str-cc-row:last-child { border-bottom: none; }
  .str-cc-row:hover { padding-left: 6px; }

  .str-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    transition: color 0.3s ease;
  }
  .str-cc-row:hover .str-cc-abbr { color: #47B5FF; }

  .str-cc-name {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(11,60,93,0.4); margin-bottom: 3px;
  }

  .str-cc-note {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .str-lc-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 960px) {
    .str-lower { grid-template-columns: 1fr; gap: 56px; }
  }

  @media (max-width: 600px) {
    .str-integ { padding: 80px 20px 100px; }
    .str-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="str-integ">
  <div class="str-integ-inner">

    <div class="str-integ-statement" id="str-integ-statement">
      <div class="str-integ-eyebrow">Integration Points</div>
      <h2>Best at Inception.<br><em>Effective</em> at Any Stage.</h2>
      <p class="str-integ-text">
        Strategy delivers the most value when defined before the first model is opened. But projects rarely start clean — we meet programmes where they are and build the strategic layer around what's already in motion. <strong>The scope adjusts. The rigour doesn't.</strong>
      </p>
    </div>

    <div class="str-lifecycle">
      <div class="str-lifecycle-label">Project Lifecycle · Typical Construction Phases</div>
      <div class="str-lc-grid">

        <div class="str-phase-card str-card-best" data-phase>
          <div class="str-pc-phase">Phase 01</div>
          <div class="str-pc-name">Concept &amp; Design</div>
          <div class="str-pc-desc">Maximum influence. Define requirements before commitments are locked.</div>
          <div class="str-pc-badge"><span class="str-best-badge">Best Entry</span></div>
        </div>

        <div class="str-phase-card str-card-ideal" data-phase>
          <div class="str-pc-phase">Phase 02</div>
          <div class="str-pc-name">Detailed Design</div>
          <div class="str-pc-desc">Governance still shapeable. BEP and EIR can redirect modelling efforts.</div>
          <div class="str-pc-badge"><span class="str-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="str-phase-card" data-phase>
          <div class="str-pc-phase">Phase 03</div>
          <div class="str-pc-name">Construction</div>
          <div class="str-pc-desc">Strategy becomes triage. Focus on handover requirements and data structure.</div>
          <div class="str-pc-badge"><span class="str-integ-text-badge">Integration Possible</span></div>
        </div>

        <div class="str-phase-card" data-phase>
          <div class="str-pc-phase">Phase 04</div>
          <div class="str-pc-name">Operations</div>
          <div class="str-pc-desc">Retroactive. AIR definition and FM data structuring for existing assets.</div>
          <div class="str-pc-badge"><span class="str-integ-text-badge">Integration Possible</span></div>
        </div>

      </div>
    </div>

    <div class="str-lower">
      <div class="str-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="str-process-steps">
          <div class="str-ps" data-ps>
            <div class="str-ps-num">01</div>
            <div class="str-ps-content">
              <div class="str-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="str-ps-desc">Review contractual requirements, stakeholder objectives, and existing information maturity. Identify gaps, risks, and constraints.</p>
            </div>
          </div>
          <div class="str-ps" data-ps>
            <div class="str-ps-num">02</div>
            <div class="str-ps-content">
              <div class="str-ps-name"><a href="/process/define/">Define</a></div>
              <p class="str-ps-desc">Translate goals into clear information requirements, modelling standards, and data structures. Establish scope and governance.</p>
            </div>
          </div>
          <div class="str-ps" data-ps>
            <div class="str-ps-num">03</div>
            <div class="str-ps-content">
              <div class="str-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="str-ps-desc">Deploy structured digital workflows — CDE, validation protocols, coordination. Only what adds measurable value.</p>
            </div>
          </div>
          <div class="str-ps" data-ps>
            <div class="str-ps-num">04</div>
            <div class="str-ps-content">
              <div class="str-ps-name"><a href="/process/control/">Control</a></div>
              <p class="str-ps-desc">Ongoing validation ensuring model integrity, data consistency, and contractual alignment through delivery and handover.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="str-lower-process-link">Our Full Process →</a>
      </div>

      <div class="str-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="str-lower-contracts-intro">Who defines information requirements, who owns the model, and when data is exchanged — all depends on procurement structure. We tailor strategy to match.</p>
        <div class="str-cc-list">
          <div class="str-cc-row" data-cc>
            <div class="str-cc-abbr">DBB</div>
            <div class="str-cc-info">
              <div class="str-cc-name">Design-Bid-Build</div>
              <div class="str-cc-note">Sequential handoff. EIR bridges the design–construction gap.</div>
            </div>
          </div>
          <div class="str-cc-row" data-cc>
            <div class="str-cc-abbr">DB</div>
            <div class="str-cc-info">
              <div class="str-cc-name">Design-Build</div>
              <div class="str-cc-note">Single entity. BEP must unify design and construction teams.</div>
            </div>
          </div>
          <div class="str-cc-row" data-cc>
            <div class="str-cc-abbr">P3</div>
            <div class="str-cc-info">
              <div class="str-cc-name">Public-Private Partnership</div>
              <div class="str-cc-note">Long lifecycle. AIR drives 30+ year operations planning.</div>
            </div>
          </div>
          <div class="str-cc-row" data-cc>
            <div class="str-cc-abbr">CM</div>
            <div class="str-cc-info">
              <div class="str-cc-name">Construction Management</div>
              <div class="str-cc-note">Multi-party coordination. MIDP keeps every team aligned.</div>
            </div>
          </div>
          <div class="str-cc-row" data-cc>
            <div class="str-cc-abbr">IPD</div>
            <div class="str-cc-info">
              <div class="str-cc-name">Integrated Project Delivery</div>
              <div class="str-cc-note">Shared risk. Strategy enables true collaborative BIM.</div>
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
  var stmt = document.getElementById('str-integ-statement');
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
  var phases = document.querySelectorAll('[data-phase]');
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
  var ps = document.querySelectorAll('[data-ps]');
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
  var cc = document.querySelectorAll('[data-cc]');
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

export default function StrategyIntegration() {
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
