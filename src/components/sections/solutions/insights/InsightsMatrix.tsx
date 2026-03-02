'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  .ins-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .ins-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* \u2550\u2550\u2550 HEADER \u2550\u2550\u2550 */
  .ins-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .ins-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .ins-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .ins-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .ins-matrix h2 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }

  .ins-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* \u2550\u2550\u2550 STAKEHOLDERS \u2550\u2550\u2550 */
  .ins-who-section { margin-bottom: 64px; }

  .ins-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .ins-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .ins-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .ins-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .ins-who-card:hover::before { width: 100%; }

  .ins-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .ins-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .ins-who-card:hover .ins-who-role { color: #47B5FF; }

  .ins-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .ins-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .ins-who-card:hover .ins-who-arrow { color: #47B5FF; gap: 10px; }

  /* \u2550\u2550\u2550 INDUSTRIES \u2550\u2550\u2550 */
  .ins-ind-section { margin-bottom: 80px; }

  .ins-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .ins-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .ins-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .ins-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .ins-ind-card:hover::before { width: 100%; }

  .ins-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .ins-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .ins-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .ins-ind-card:hover .ins-ind-name { color: #47B5FF; }

  .ins-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 1080px) {
    .ins-who-grid { grid-template-columns: repeat(2, 1fr); }
    .ins-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .ins-matrix { padding: 80px 20px 100px; }
    .ins-who-grid { grid-template-columns: 1fr; }
    .ins-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="ins-matrix">
  <div class="ins-matrix-inner">

    <div class="ins-matrix-header" id="ins-matrix-header">
      <div class="ins-matrix-eyebrow">Who This Serves</div>
      <h2>Analytics Built For <em>Your</em> Role</h2>
      <p class="ins-matrix-sub">
        Every stakeholder needs different data at different times. The visibility layer ensures each role \u2014 from executive leadership to site teams \u2014 sees the metrics that drive their decisions, in the format they can act on.
      </p>
    </div>

    <!-- \u2550\u2550\u2550 STAKEHOLDERS \u2550\u2550\u2550 -->
    <div class="ins-who-section">
      <div class="ins-who-label">By Stakeholder</div>
      <div class="ins-who-grid">
        <a href="/who-we-support/owners/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Owners &amp; Developers</div>
          <div class="ins-who-how">You fund the programme but rely on others for visibility. Custom dashboards give you portfolio health, cost performance, and compliance status across every active project \u2014 without waiting for monthly reports.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/contractors/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Contractors</div>
          <div class="ins-who-how">You generate the data but rarely see it structured. Earned value dashboards, progress tracking, and cost variance reporting give your teams real-time performance visibility during execution.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/engineers/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Engineers</div>
          <div class="ins-who-how">Your models contain the data but nobody validates it. BIM auditing, rule-based validation, and model health dashboards ensure design data meets the requirements defined in the EIR/BEP.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/architects/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Architects &amp; Designers</div>
          <div class="ins-who-how">Your design intent needs to survive into construction analytics. Model quality scoring, classification compliance, and LOD adherence checks protect your data through every downstream process.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/government/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Government &amp; Agencies</div>
          <div class="ins-who-how">You manage public capital programmes across multiple projects. Portfolio benchmarking, compliance scorecards, and ISO 19650 tracking ensure accountability and transparency across your entire portfolio.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="ins-who-card" data-ins-who>
          <div class="ins-who-role">Consultants &amp; PMs</div>
          <div class="ins-who-how">You oversee delivery without owning the data. KPI dashboards, automated reporting, and milestone tracking give you the visibility to hold every party accountable without manual report assembly.</div>
          <div class="ins-who-arrow">Learn More \u2192</div>
        </a>
      </div>
    </div>

    <!-- \u2550\u2550\u2550 INDUSTRIES \u2550\u2550\u2550 -->
    <div class="ins-ind-section">
      <div class="ins-ind-label">By Industry</div>
      <div class="ins-ind-strip">
        <a href="/industries/heavy-civil/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">01</div>
          <div class="ins-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="ins-ind-how">Linear asset programmes need corridor-level analytics, zone-based progress tracking, and geospatially referenced performance metrics across kilometres of alignment</div>
        </a>
        <a href="/industries/mining/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">02</div>
          <div class="ins-ind-name">Mining &amp; Resource</div>
          <div class="ins-ind-how">Remote operations demand real-time dashboards that work across distributed sites, equipment performance analytics, and cost tracking against volatile commodity cycles</div>
        </a>
        <a href="/industries/energy/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">03</div>
          <div class="ins-ind-name">Energy &amp; Utilities</div>
          <div class="ins-ind-how">Distributed generation and transmission programmes need compliance analytics, outage tracking, and regulatory reporting across hundreds of assets and jurisdictions</div>
        </a>
        <a href="/industries/institutional/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">04</div>
          <div class="ins-ind-name">Institutional &amp; Government</div>
          <div class="ins-ind-how">Public capital programmes need auditable performance reporting, ISO 19650 compliance tracking, and cross-project benchmarking for portfolio-level accountability</div>
        </a>
        <a href="/industries/industrial/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">05</div>
          <div class="ins-ind-name">Industrial &amp; Manufacturing</div>
          <div class="ins-ind-how">Process facility construction requires system-level progress tracking, commissioning analytics, and cost performance monitoring tied to equipment procurement schedules</div>
        </a>
        <a href="/industries/commercial/" class="ins-ind-card" data-ins-ind>
          <div class="ins-ind-num">06</div>
          <div class="ins-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="ins-ind-how">Multi-tower programmes need standardised KPI frameworks, phase-over-phase benchmarking, and portfolio dashboards that scale across buildings and delivery stages</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var header = document.getElementById('ins-matrix-header');
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

  var who = document.querySelectorAll('[data-ins-who]');
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

  var ind = document.querySelectorAll('[data-ins-ind]');
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

export default function InsightsMatrix() {
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
