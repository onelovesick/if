'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  /* Blueprint grid */
  .str-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .str-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ HEADER ═══ */
  .str-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .str-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .str-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .str-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .str-matrix h2 em { font-style: italic; color: #47B5FF; }

  .str-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* ═══ STAKEHOLDERS ═══ */
  .str-who-section { margin-bottom: 64px; }

  .str-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .str-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .str-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .str-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .str-who-card:hover::before { width: 100%; }

  .str-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .str-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .str-who-card:hover .str-who-role { color: #47B5FF; }

  .str-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .str-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .str-who-card:hover .str-who-arrow { color: #47B5FF; gap: 10px; }

  /* ═══ INDUSTRIES ═══ */
  .str-ind-section { margin-bottom: 80px; }

  .str-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .str-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .str-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .str-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .str-ind-card:hover::before { width: 100%; }

  .str-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .str-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .str-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .str-ind-card:hover .str-ind-name { color: #47B5FF; }

  .str-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .str-who-grid { grid-template-columns: repeat(2, 1fr); }
    .str-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .str-matrix { padding: 80px 20px 100px; }
    .str-who-grid { grid-template-columns: 1fr; }
    .str-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="str-matrix">
  <div class="str-matrix-inner">

    <div class="str-matrix-header" id="str-matrix-header">
      <div class="str-matrix-eyebrow">Who This Serves</div>
      <h2>Strategy Built For <em>Your</em> Role</h2>
      <p class="str-matrix-sub">
        Every stakeholder has a different relationship with information. Strategy defines what each role needs, when they need it, and how it flows between them.
      </p>
    </div>

    <!-- ═══ STAKEHOLDERS ═══ -->
    <div class="str-who-section">
      <div class="str-who-label">By Stakeholder</div>
      <div class="str-who-grid">
        <a href="/who-we-support/owners/" class="str-who-card" data-who>
          <div class="str-who-role">Owners &amp; Developers</div>
          <div class="str-who-how">You define what information your asset needs. Strategy ensures those requirements are clear, contractual, and survive every handover.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/contractors/" class="str-who-card" data-who>
          <div class="str-who-role">Contractors</div>
          <div class="str-who-how">You respond to owner requirements and set your own towards design teams. Strategy defines both sides — so you get buildable data, not just models.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/engineers/" class="str-who-card" data-who>
          <div class="str-who-role">Engineers</div>
          <div class="str-who-how">You produce the heaviest data. Strategy defines what level of detail matters at each stage — so effort goes where it counts.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/architects/" class="str-who-card" data-who>
          <div class="str-who-role">Architects &amp; Designers</div>
          <div class="str-who-how">You set the design intent. Strategy ensures your information feeds downstream without being remodelled by every discipline after you.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/government/" class="str-who-card" data-who>
          <div class="str-who-role">Government &amp; Agencies</div>
          <div class="str-who-how">You procure and regulate. Strategy gives you the specification language for tenders and the governance to enforce compliance.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="str-who-card" data-who>
          <div class="str-who-role">Consultants &amp; PMs</div>
          <div class="str-who-how">You oversee but don't produce. Strategy gives you audit and control mechanisms without needing to touch the models.</div>
          <div class="str-who-arrow">Learn More →</div>
        </a>
      </div>
    </div>

    <!-- ═══ INDUSTRIES ═══ -->
    <div class="str-ind-section">
      <div class="str-ind-label">By Industry</div>
      <div class="str-ind-strip">
        <a href="/industries/heavy-civil/" class="str-ind-card" data-ind>
          <div class="str-ind-num">01</div>
          <div class="str-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="str-ind-how">Multi-contractor corridors need shared information governance</div>
        </a>
        <a href="/industries/mining/" class="str-ind-card" data-ind>
          <div class="str-ind-num">02</div>
          <div class="str-ind-name">Mining &amp; Resource</div>
          <div class="str-ind-how">Phased development requires lifecycle asset data from inception</div>
        </a>
        <a href="/industries/energy/" class="str-ind-card" data-ind>
          <div class="str-ind-num">03</div>
          <div class="str-ind-name">Energy &amp; Utilities</div>
          <div class="str-ind-how">Distributed assets demand data that survives handover for decades</div>
        </a>
        <a href="/industries/institutional/" class="str-ind-card" data-ind>
          <div class="str-ind-num">04</div>
          <div class="str-ind-name">Institutional &amp; Government</div>
          <div class="str-ind-how">High compliance, FM handover, and long operational lifecycles</div>
        </a>
        <a href="/industries/industrial/" class="str-ind-card" data-ind>
          <div class="str-ind-num">05</div>
          <div class="str-ind-name">Industrial &amp; Manufacturing</div>
          <div class="str-ind-how">Uptime and safety require structured operational information</div>
        </a>
        <a href="/industries/commercial/" class="str-ind-card" data-ind>
          <div class="str-ind-num">06</div>
          <div class="str-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="str-ind-how">Portfolio-scale delivery needs repeatable data standards</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var header = document.getElementById('str-matrix-header');
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
  var who = document.querySelectorAll('[data-who]');
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
  var ind = document.querySelectorAll('[data-ind]');
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

export default function StrategyMatrix() {
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
