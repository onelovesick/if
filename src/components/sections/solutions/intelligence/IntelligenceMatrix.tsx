'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  /* Blueprint grid */
  .intel-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .intel-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ HEADER ═══ */
  .intel-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .intel-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .intel-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .intel-matrix h2 em { font-style: italic; color: #47B5FF; }

  .intel-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* ═══ STAKEHOLDERS ═══ */
  .intel-who-section { margin-bottom: 64px; }

  .intel-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .intel-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .intel-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .intel-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .intel-who-card:hover::before { width: 100%; }

  .intel-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .intel-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .intel-who-card:hover .intel-who-role { color: #47B5FF; }

  .intel-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .intel-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .intel-who-card:hover .intel-who-arrow { color: #47B5FF; gap: 10px; }

  /* ═══ INDUSTRIES ═══ */
  .intel-ind-section { margin-bottom: 80px; }

  .intel-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .intel-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .intel-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .intel-ind-card:hover::before { width: 100%; }

  .intel-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .intel-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .intel-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .intel-ind-card:hover .intel-ind-name { color: #47B5FF; }

  .intel-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .intel-who-grid { grid-template-columns: repeat(2, 1fr); }
    .intel-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .intel-matrix { padding: 80px 20px 100px; }
    .intel-who-grid { grid-template-columns: 1fr; }
    .intel-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="intel-matrix">
  <div class="intel-matrix-inner">

    <div class="intel-matrix-header" id="intel-matrix-header">
      <div class="intel-matrix-eyebrow">Who This Serves</div>
      <h2>Intelligence Built For <em>Your</em> Role</h2>
      <p class="intel-matrix-sub">
        Every stakeholder interacts with model data differently. Intelligence ensures what each role needs \u2014 verified geometry, audited parameters, or decision-ready reports \u2014 is embedded, extractable, and trustworthy.
      </p>
    </div>

    <!-- ═══ STAKEHOLDERS ═══ -->
    <div class="intel-who-section">
      <div class="intel-who-label">By Stakeholder</div>
      <div class="intel-who-grid">
        <a href="/who-we-support/owners/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Owners &amp; Developers</div>
          <div class="intel-who-how">You receive models but can\u2019t verify what\u2019s in them. Intelligence gives you audit-grade data \u2014 not just geometry.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/contractors/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Contractors</div>
          <div class="intel-who-how">You need models that match field conditions. Intelligence ensures what\u2019s modelled is what\u2019s built \u2014 through scanning, coordination, and verified quantities.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/engineers/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Engineers</div>
          <div class="intel-who-how">You author the most complex models. Intelligence means your geometry carries parameters, classifications, and data that downstream teams can actually use.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/architects/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Architects &amp; Designers</div>
          <div class="intel-who-how">Your design intent must survive coordination. Intelligence ensures your spatial logic, material specs, and design parameters persist through federation.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/government/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Government &amp; Agencies</div>
          <div class="intel-who-how">You mandate BIM but can\u2019t check compliance. Intelligence delivers auditable, standards-compliant models with verified data \u2014 not just submitted files.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="intel-who-card" data-intel-who>
          <div class="intel-who-role">Consultants &amp; PMs</div>
          <div class="intel-who-how">You manage model deliverables without authoring them. Intelligence gives you the metrics \u2014 clash counts, LOD compliance, data completeness \u2014 to hold teams accountable.</div>
          <div class="intel-who-arrow">Learn More \u2192</div>
        </a>
      </div>
    </div>

    <!-- ═══ INDUSTRIES ═══ -->
    <div class="intel-ind-section">
      <div class="intel-ind-label">By Industry</div>
      <div class="intel-ind-strip">
        <a href="/industries/heavy-civil/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">01</div>
          <div class="intel-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="intel-ind-how">Linear corridor models need parametric alignment geometry and cross-section verification against survey data</div>
        </a>
        <a href="/industries/mining/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">02</div>
          <div class="intel-ind-name">Mining &amp; Resource</div>
          <div class="intel-ind-how">Phased site models require reality capture integration and volumetric quantity verification</div>
        </a>
        <a href="/industries/energy/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">03</div>
          <div class="intel-ind-name">Energy &amp; Utilities</div>
          <div class="intel-ind-how">Distributed facility models demand equipment-level parametric data for maintenance and safety</div>
        </a>
        <a href="/industries/institutional/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">04</div>
          <div class="intel-ind-name">Institutional &amp; Government</div>
          <div class="intel-ind-how">Complex building models need clash-free MEP coordination and FM-ready parameter sets</div>
        </a>
        <a href="/industries/industrial/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">05</div>
          <div class="intel-ind-name">Industrial &amp; Manufacturing</div>
          <div class="intel-ind-how">Process plant models require equipment tagging, pipe routing verification, and safety clearance validation</div>
        </a>
        <a href="/industries/commercial/" class="intel-ind-card" data-intel-ind>
          <div class="intel-ind-num">06</div>
          <div class="intel-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="intel-ind-how">Multi-building portfolios need federated coordination and standardised QTO extraction across phases</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var header = document.getElementById('intel-matrix-header');
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
  var who = document.querySelectorAll('[data-intel-who]');
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
  var ind = document.querySelectorAll('[data-intel-ind]');
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

export default function IntelligenceMatrix() {
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
