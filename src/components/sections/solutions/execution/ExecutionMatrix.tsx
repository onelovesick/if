'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  /* Blueprint grid */
  .exec-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .exec-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ HEADER ═══ */
  .exec-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .exec-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .exec-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .exec-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .exec-matrix h2 em { font-style: italic; color: #47B5FF; }

  .exec-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* ═══ STAKEHOLDERS ═══ */
  .exec-who-section { margin-bottom: 64px; }

  .exec-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .exec-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .exec-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .exec-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .exec-who-card:hover::before { width: 100%; }

  .exec-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .exec-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .exec-who-card:hover .exec-who-role { color: #47B5FF; }

  .exec-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .exec-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .exec-who-card:hover .exec-who-arrow { color: #47B5FF; gap: 10px; }

  /* ═══ INDUSTRIES ═══ */
  .exec-ind-section { margin-bottom: 80px; }

  .exec-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .exec-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .exec-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .exec-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .exec-ind-card:hover::before { width: 100%; }

  .exec-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .exec-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .exec-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .exec-ind-card:hover .exec-ind-name { color: #47B5FF; }

  .exec-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .exec-who-grid { grid-template-columns: repeat(2, 1fr); }
    .exec-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .exec-matrix { padding: 80px 20px 100px; }
    .exec-who-grid { grid-template-columns: 1fr; }
    .exec-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="exec-matrix">
  <div class="exec-matrix-inner">

    <div class="exec-matrix-header" id="exec-matrix-header">
      <div class="exec-matrix-eyebrow">Who This Serves</div>
      <h2>Execution Built For <em>Your</em> Role</h2>
      <p class="exec-matrix-sub">
        Every stakeholder interacts with execution data differently. Execution ensures what each role needs — verified progress, traceable inspections, or field-ready work packages — is deployed, captured, and defensible.
      </p>
    </div>

    <!-- ═══ STAKEHOLDERS ═══ -->
    <div class="exec-who-section">
      <div class="exec-who-label">By Stakeholder</div>
      <div class="exec-who-grid">
        <a href="/who-we-support/owners/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Owners &amp; Developers</div>
          <div class="exec-who-how">You fund the project but can\u2019t verify what\u2019s actually built. Execution gives you element-level progress, verified inspections, and actual-vs.-planned proof.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/contractors/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Contractors</div>
          <div class="exec-who-how">You build it. Execution gives your field teams scoped work packages, 4D-sequenced schedules, digital inspections, and progress dashboards that prove what was done.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/engineers/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Engineers</div>
          <div class="exec-who-how">Your design intent must survive construction. Execution ensures field issues trace back to model elements and deviations are caught before they become structural risk.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/architects/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Architects &amp; Designers</div>
          <div class="exec-who-how">Your specifications must reach the trades. Execution deploys design information into field-ready formats that crews actually reference during installation.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/government/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Government &amp; Agencies</div>
          <div class="exec-who-how">You require accountability. Execution delivers traceable inspection records, verified progress data, and defensible QA/QC documentation at every milestone.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="exec-who-card" data-exec-who>
          <div class="exec-who-role">Consultants &amp; PMs</div>
          <div class="exec-who-how">You manage delivery without building it. Execution gives you the dashboards \u2014 progress, issues, inspections, earned value \u2014 to hold every trade accountable.</div>
          <div class="exec-who-arrow">Learn More \u2192</div>
        </a>
      </div>
    </div>

    <!-- ═══ INDUSTRIES ═══ -->
    <div class="exec-ind-section">
      <div class="exec-ind-label">By Industry</div>
      <div class="exec-ind-strip">
        <a href="/industries/heavy-civil/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">01</div>
          <div class="exec-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="exec-ind-how">Linear corridor projects need phased 4D simulations, zone-based work packaging, and scan-verified progress along kilometres of alignment</div>
        </a>
        <a href="/industries/mining/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">02</div>
          <div class="exec-ind-name">Mining &amp; Resource</div>
          <div class="exec-ind-how">Remote site execution requires field BIM on tablets, offline inspection forms, and progress tracking across phased extraction zones</div>
        </a>
        <a href="/industries/energy/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">03</div>
          <div class="exec-ind-name">Energy &amp; Utilities</div>
          <div class="exec-ind-how">Distributed facility construction needs equipment-level QA/QC, commissioning checklists, and safety-critical inspection sign-offs</div>
        </a>
        <a href="/industries/institutional/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">04</div>
          <div class="exec-ind-name">Institutional &amp; Government</div>
          <div class="exec-ind-how">Public accountability demands traceable inspections, verified progress reporting, and defensible handover documentation</div>
        </a>
        <a href="/industries/industrial/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">05</div>
          <div class="exec-ind-name">Industrial &amp; Manufacturing</div>
          <div class="exec-ind-how">Process plant construction requires equipment installation sequencing, piping QA/QC, and safety clearance verification</div>
        </a>
        <a href="/industries/commercial/" class="exec-ind-card" data-exec-ind>
          <div class="exec-ind-num">06</div>
          <div class="exec-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="exec-ind-how">Multi-building portfolios need standardised work packaging, cross-phase progress tracking, and unified defect management</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var header = document.getElementById('exec-matrix-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(header);
  }

  /* Stakeholder cards stagger */
  var who = document.querySelectorAll('[data-exec-who]');
  who.forEach(function(c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            c.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(c);
  });

  /* Industry cards stagger */
  var ind = document.querySelectorAll('[data-exec-ind]');
  ind.forEach(function(c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(14px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            c.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.35s ease, border-color 0.35s ease';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 70);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(c);
  });

})();`;

export default function ExecutionMatrix() {
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
