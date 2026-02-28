'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-integ {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .stru-integ::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .stru-integ-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ STATEMENT ═══ */
  .stru-integ-statement { margin-bottom: 72px; max-width: 800px; }

  .stru-integ-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .stru-integ-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .stru-integ h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(34px, 4.2vw, 56px); line-height: 1.06;
    letter-spacing: -0.025em; text-transform: uppercase;
    color: #0B3C5D; margin: 0 0 28px 0;
  }
  .stru-integ h2 em { font-style: italic; color: #47B5FF; }

  .stru-integ-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 300;
    line-height: 1.85; color: #5a7a96; max-width: 640px;
  }
  .stru-integ-text strong { font-weight: 600; color: #0B3C5D; }

  /* ═══ LIFECYCLE ═══ */
  .stru-lifecycle { margin-bottom: 96px; }

  .stru-lifecycle-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 40px;
  }

  /* Card grid */
  .stru-lc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .stru-phase-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Left accent bar — present on all, coloured on best/ideal */
  .stru-phase-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .stru-phase-card.stru-card-best::before { background: #47B5FF; }
  .stru-phase-card.stru-card-ideal::before { background: rgba(71,181,255,0.5); }

  .stru-phase-card:hover {
    border-color: rgba(71,181,255,0.15);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .stru-phase-card:hover::before { background: #47B5FF; }

  /* Phase number */
  .stru-pc-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 10px;
  }

  .stru-pc-name {
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

  .stru-phase-card:hover .stru-pc-name { color: #47B5FF; }

  .stru-pc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    min-height: 46px;
  }

  /* Badge row — sits at bottom */
  .stru-pc-badge {
    margin-top: 18px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .stru-best-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: #47B5FF;
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
  }

  .stru-ideal-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.1);
    border: 1px solid rgba(71,181,255,0.25);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #47B5FF;
  }

  .stru-integ-text-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(71,181,255,0.05);
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.6);
  }

  /* ═══ LOWER ═══ */
  .stru-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding-top: 56px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .stru-lower h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 22px; letter-spacing: -0.01em;
    text-transform: uppercase; color: #0B3C5D;
    margin: 0 0 24px 0;
  }
  .stru-lower h3 em { font-style: italic; color: #47B5FF; }

  .stru-lower-contracts h3 { margin-bottom: 12px; }

  .stru-ps {
    display: grid; grid-template-columns: 48px 1fr; gap: 16px;
    align-items: start; padding: 18px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .stru-ps:first-child { padding-top: 0; }
  .stru-ps:hover { padding-left: 6px; }

  .stru-ps-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.04em;
    color: rgba(11,60,93,0.08); line-height: 1;
    transition: color 0.3s ease;
  }
  .stru-ps:hover .stru-ps-num { color: rgba(71,181,255,0.25); }

  .stru-ps-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.02em;
    text-transform: uppercase; color: #0B3C5D;
    margin-bottom: 4px; transition: color 0.3s ease;
  }
  .stru-ps:hover .stru-ps-name { color: #47B5FF; }
  .stru-ps-name a { color: inherit; text-decoration: none; }

  .stru-ps-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.65;
    color: #5a7a96; margin: 0;
  }

  .stru-lower-process-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase; text-decoration: none;
    color: #47B5FF; transition: gap 0.2s ease;
  }
  .stru-lower-process-link:hover { gap: 14px; }

  .stru-lower-contracts-intro {
    font-family: 'Inter', sans-serif; font-size: 14px;
    font-weight: 400; line-height: 1.75;
    color: #5a7a96; margin: 0 0 24px 0;
  }

  .stru-cc-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 16px;
    align-items: start; padding: 16px 0;
    border-bottom: 1px solid rgba(11,60,93,0.06);
    transition: padding-left 0.2s ease;
  }
  .stru-cc-row:first-child { padding-top: 0; }
  .stru-cc-row:last-child { border-bottom: none; }
  .stru-cc-row:hover { padding-left: 6px; }

  .stru-cc-abbr {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 17px; letter-spacing: -0.02em; color: #0B3C5D;
    transition: color 0.3s ease;
  }
  .stru-cc-row:hover .stru-cc-abbr { color: #47B5FF; }

  .stru-cc-name {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(11,60,93,0.4); margin-bottom: 3px;
  }

  .stru-cc-note {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .stru-lc-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 960px) {
    .stru-lower { grid-template-columns: 1fr; gap: 56px; }
  }

  @media (max-width: 600px) {
    .stru-integ { padding: 80px 20px 100px; }
    .stru-lc-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="stru-integ">
  <div class="stru-integ-inner">

    <div class="stru-integ-statement" id="stru-integ-statement">
      <div class="stru-integ-eyebrow">Integration Points</div>
      <h2>Structure Works Best<br>When It Comes <em>First.</em></h2>
      <p class="stru-integ-text">
        CDE governance, naming conventions, classification systems, and LOD/LOI frameworks are <strong>exponentially harder to retrofit</strong> than to define upfront. The earlier the Structure layer is established, the less rework every downstream team inherits.
      </p>
    </div>

    <div class="stru-lifecycle">
      <div class="stru-lifecycle-label">Project Lifecycle · Typical Construction Phases</div>
      <div class="stru-lc-grid">

        <div class="stru-phase-card stru-card-best" data-phase>
          <div class="stru-pc-phase">Phase 01</div>
          <div class="stru-pc-name">Concept &amp; Design</div>
          <div class="stru-pc-desc">Maximum influence. Define CDE, naming, and classification before any model is opened.</div>
          <div class="stru-pc-badge"><span class="stru-best-badge">Best Entry</span></div>
        </div>

        <div class="stru-phase-card stru-card-ideal" data-phase>
          <div class="stru-pc-phase">Phase 02</div>
          <div class="stru-pc-name">Detailed Design</div>
          <div class="stru-pc-desc">Governance still shapeable. Naming conventions and LOD matrices can redirect modelling efforts.</div>
          <div class="stru-pc-badge"><span class="stru-ideal-badge">Ideal Entry</span></div>
        </div>

        <div class="stru-phase-card" data-phase>
          <div class="stru-pc-phase">Phase 03</div>
          <div class="stru-pc-name">Construction</div>
          <div class="stru-pc-desc">Structure becomes remediation. Retrofit naming, enforce classification, and salvage exchange integrity for handover.</div>
          <div class="stru-pc-badge"><span class="stru-integ-text-badge">Retrofit Possible</span></div>
        </div>

        <div class="stru-phase-card" data-phase>
          <div class="stru-pc-phase">Phase 04</div>
          <div class="stru-pc-name">Operations</div>
          <div class="stru-pc-desc">Restructure asset data for FM systems. Reclassify, re-tag, and build the register the project should have delivered.</div>
          <div class="stru-pc-badge"><span class="stru-integ-text-badge">Restructure Possible</span></div>
        </div>

      </div>
    </div>

    <div class="stru-lower">
      <div class="stru-lower-process">
        <h3>How We <em>Work</em></h3>
        <div class="stru-process-steps">
          <div class="stru-ps" data-ps>
            <div class="stru-ps-num">01</div>
            <div class="stru-ps-content">
              <div class="stru-ps-name"><a href="/process/assess/">Assess</a></div>
              <p class="stru-ps-desc">Audit existing CDE configuration, naming conventions, classification usage, and data quality. Map what exists against what ISO 19650 and the contract require.</p>
            </div>
          </div>
          <div class="stru-ps" data-ps>
            <div class="stru-ps-num">02</div>
            <div class="stru-ps-content">
              <div class="stru-ps-name"><a href="/process/define/">Define</a></div>
              <p class="stru-ps-desc">Design the PDS taxonomy, folder hierarchy, naming schema, classification mapping, and LOD/LOI matrix. Define every rule before deployment.</p>
            </div>
          </div>
          <div class="stru-ps" data-ps>
            <div class="stru-ps-num">03</div>
            <div class="stru-ps-content">
              <div class="stru-ps-name"><a href="/process/implement/">Implement</a></div>
              <p class="stru-ps-desc">Configure the CDE, roll out naming conventions, embed classification into templates, and enforce parameter standards across all authoring tools.</p>
            </div>
          </div>
          <div class="stru-ps" data-ps>
            <div class="stru-ps-num">04</div>
            <div class="stru-ps-content">
              <div class="stru-ps-name"><a href="/process/control/">Control</a></div>
              <p class="stru-ps-desc">Ongoing audits verifying naming compliance, classification accuracy, data completeness, and exchange integrity through every delivery milestone.</p>
            </div>
          </div>
        </div>
        <a href="/process/" class="stru-lower-process-link">Our Full Process →</a>
      </div>

      <div class="stru-lower-contracts">
        <h3>Adapts To Your <em>Contract</em></h3>
        <p class="stru-lower-contracts-intro">How naming is enforced, who owns the CDE, and when classification is locked — all depends on procurement structure. We tailor the data architecture to match.</p>
        <div class="stru-cc-list">
          <div class="stru-cc-row" data-cc>
            <div class="stru-cc-abbr">DBB</div>
            <div class="stru-cc-info">
              <div class="stru-cc-name">Design-Bid-Build</div>
              <div class="stru-cc-note">Sequential handoff. Naming and classification must survive the design–construction gap.</div>
            </div>
          </div>
          <div class="stru-cc-row" data-cc>
            <div class="stru-cc-abbr">DB</div>
            <div class="stru-cc-info">
              <div class="stru-cc-name">Design-Build</div>
              <div class="stru-cc-note">Single entity. CDE and naming conventions must unify design and construction teams from day one.</div>
            </div>
          </div>
          <div class="stru-cc-row" data-cc>
            <div class="stru-cc-abbr">P3</div>
            <div class="stru-cc-info">
              <div class="stru-cc-name">Public-Private Partnership</div>
              <div class="stru-cc-note">Long lifecycle. Classification and tagging must serve 30+ years of FM and operations.</div>
            </div>
          </div>
          <div class="stru-cc-row" data-cc>
            <div class="stru-cc-abbr">CM</div>
            <div class="stru-cc-info">
              <div class="stru-cc-name">Construction Management</div>
              <div class="stru-cc-note">Multi-party coordination. Shared naming conventions keep every team's data aligned.</div>
            </div>
          </div>
          <div class="stru-cc-row" data-cc>
            <div class="stru-cc-abbr">IPD</div>
            <div class="stru-cc-info">
              <div class="stru-cc-name">Integrated Project Delivery</div>
              <div class="stru-cc-note">Shared risk. A unified PDS enables true collaborative data exchange.</div>
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
  var stmt = document.getElementById('stru-integ-statement');
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

export default function StructureIntegration() {
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
