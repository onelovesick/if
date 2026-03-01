'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  /* Blueprint grid */
  .twin-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .twin-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* \u2550\u2550\u2550 HEADER \u2550\u2550\u2550 */
  .twin-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .twin-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .twin-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .twin-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .twin-matrix h2 em { font-style: italic; color: #47B5FF; }

  .twin-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* \u2550\u2550\u2550 STAKEHOLDERS \u2550\u2550\u2550 */
  .twin-who-section { margin-bottom: 64px; }

  .twin-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .twin-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .twin-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .twin-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .twin-who-card:hover::before { width: 100%; }

  .twin-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .twin-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .twin-who-card:hover .twin-who-role { color: #47B5FF; }

  .twin-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .twin-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .twin-who-card:hover .twin-who-arrow { color: #47B5FF; gap: 10px; }

  /* \u2550\u2550\u2550 INDUSTRIES \u2550\u2550\u2550 */
  .twin-ind-section { margin-bottom: 80px; }

  .twin-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .twin-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .twin-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .twin-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .twin-ind-card:hover::before { width: 100%; }

  .twin-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .twin-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .twin-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .twin-ind-card:hover .twin-ind-name { color: #47B5FF; }

  .twin-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 1080px) {
    .twin-who-grid { grid-template-columns: repeat(2, 1fr); }
    .twin-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .twin-matrix { padding: 80px 20px 100px; }
    .twin-who-grid { grid-template-columns: 1fr; }
    .twin-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="twin-matrix">
  <div class="twin-matrix-inner">

    <div class="twin-matrix-header" id="twin-matrix-header">
      <div class="twin-matrix-eyebrow">Who This Serves</div>
      <h2>A Twin Built For <em>Your</em> Role</h2>
      <p class="twin-matrix-sub">
        Every stakeholder interacts with handover data differently. Project Twin ensures what each role needs \u2014 verified as-builts, structured asset data, or FM-ready documentation \u2014 is delivered, validated, and operational.
      </p>
    </div>

    <!-- \u2550\u2550\u2550 STAKEHOLDERS \u2550\u2550\u2550 -->
    <div class="twin-who-section">
      <div class="twin-who-label">By Stakeholder</div>
      <div class="twin-who-grid">
        <a href="/who-we-support/owners/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Owners &amp; Developers</div>
          <div class="twin-who-how">You fund the asset but inherit whatever data survives handover. Project Twin ensures you receive a verified, structured, FM-ready dataset \u2014 not a box of unlinked files.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/contractors/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Contractors</div>
          <div class="twin-who-how">You build it and hand it over. Project Twin gives you clear data requirements from the start so as-built capture, documentation, and COBie population happen during construction \u2014 not as a scramble at completion.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/engineers/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Engineers</div>
          <div class="twin-who-how">Your design data must survive into operations. Project Twin ensures specifications, system data, and performance parameters transfer into the asset information model with full traceability.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/architects/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Architects &amp; Designers</div>
          <div class="twin-who-how">Your spatial data and room classifications form the backbone of the twin. Project Twin structures space types, zone definitions, and finish schedules for FM system ingestion.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/government/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Government &amp; Agencies</div>
          <div class="twin-who-how">You operate assets for decades. Project Twin delivers auditable handover data, COBie-compliant datasets, and verified documentation that serves public accountability requirements.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="twin-who-card" data-twin-who>
          <div class="twin-who-role">Consultants &amp; PMs</div>
          <div class="twin-who-how">You manage the handover process without owning the data. Project Twin gives you TRI scoring, validation dashboards, and milestone-based data quality checkpoints to hold every party accountable.</div>
          <div class="twin-who-arrow">Learn More \u2192</div>
        </a>
      </div>
    </div>

    <!-- \u2550\u2550\u2550 INDUSTRIES \u2550\u2550\u2550 -->
    <div class="twin-ind-section">
      <div class="twin-ind-label">By Industry</div>
      <div class="twin-ind-strip">
        <a href="/industries/heavy-civil/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">01</div>
          <div class="twin-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="twin-ind-how">Linear assets need zone-based handover packages, corridor asset registers, and geospatially referenced twin data across kilometres of alignment</div>
        </a>
        <a href="/industries/mining/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">02</div>
          <div class="twin-ind-name">Mining &amp; Resource</div>
          <div class="twin-ind-how">Remote operations demand verified as-built data, equipment asset registers, and maintenance-ready documentation that works offline</div>
        </a>
        <a href="/industries/energy/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">03</div>
          <div class="twin-ind-name">Energy &amp; Utilities</div>
          <div class="twin-ind-how">Distributed facility handover requires equipment-level traceability, safety-critical documentation, and regulatory compliance data for every asset</div>
        </a>
        <a href="/industries/institutional/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">04</div>
          <div class="twin-ind-name">Institutional &amp; Government</div>
          <div class="twin-ind-how">Public assets need auditable handover records, COBie-compliant datasets, and structured O&amp;M documentation for 50+ year operational lifecycles</div>
        </a>
        <a href="/industries/industrial/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">05</div>
          <div class="twin-ind-name">Industrial &amp; Manufacturing</div>
          <div class="twin-ind-how">Process facilities require equipment tag registers, piping system data, and commissioning-verified asset information for operational continuity</div>
        </a>
        <a href="/industries/commercial/" class="twin-ind-card" data-twin-ind>
          <div class="twin-ind-num">06</div>
          <div class="twin-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="twin-ind-how">Multi-building portfolios need standardised handover templates, unified FM taxonomy, and scalable twin frameworks across phases and towers</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var header = document.getElementById('twin-matrix-header');
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
  var who = document.querySelectorAll('[data-twin-who]');
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
  var ind = document.querySelectorAll('[data-twin-ind]');
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

export default function TwinMatrix() {
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
