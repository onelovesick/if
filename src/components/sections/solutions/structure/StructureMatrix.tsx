'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  .stru-matrix::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .stru-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ═══ HEADER ═══ */
  .stru-matrix-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

  .stru-matrix-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 28px;
  }
  .stru-matrix-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .stru-matrix h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 20px 0;
  }
  .stru-matrix h2 em { font-style: italic; color: #47B5FF; }

  .stru-matrix-sub {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
  }

  /* ═══ STAKEHOLDERS ═══ */
  .stru-who-section { margin-bottom: 64px; }

  .stru-who-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .stru-who-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .stru-who-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 24px 22px 20px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
    text-decoration: none;
    display: block;
  }

  .stru-who-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .stru-who-card:hover::before { width: 100%; }

  .stru-who-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .stru-who-role {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    margin-bottom: 8px; transition: color 0.3s ease;
  }
  .stru-who-card:hover .stru-who-role { color: #47B5FF; }

  .stru-who-how {
    font-family: 'Inter', sans-serif; font-size: 13px;
    font-weight: 400; line-height: 1.6; color: #7a9bb5;
  }

  .stru-who-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .stru-who-card:hover .stru-who-arrow { color: #47B5FF; gap: 10px; }

  /* ═══ INDUSTRIES ═══ */
  .stru-ind-section { margin-bottom: 80px; }

  .stru-ind-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 24px;
  }

  .stru-ind-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .stru-ind-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 20px 16px 18px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .stru-ind-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .stru-ind-card:hover::before { width: 100%; }

  .stru-ind-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
  }

  .stru-ind-num {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; color: rgba(71,181,255,0.4);
    margin-bottom: 8px;
  }

  .stru-ind-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 700;
    font-size: 12.5px; letter-spacing: 0.01em;
    text-transform: uppercase; color: #F4F6F8;
    line-height: 1.3; margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .stru-ind-card:hover .stru-ind-name { color: #47B5FF; }

  .stru-ind-how {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.55; color: #5a7a96;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 1080px) {
    .stru-who-grid { grid-template-columns: repeat(2, 1fr); }
    .stru-ind-strip { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .stru-matrix { padding: 80px 20px 100px; }
    .stru-who-grid { grid-template-columns: 1fr; }
    .stru-ind-strip { grid-template-columns: repeat(2, 1fr); }
  }
</style>

<section class="stru-matrix">
  <div class="stru-matrix-inner">

    <div class="stru-matrix-header" id="stru-matrix-header">
      <div class="stru-matrix-eyebrow">Who This Serves</div>
      <h2>Structure Built For <em>Your</em> Role</h2>
      <p class="stru-matrix-sub">
        Every role interacts with project data differently. The Structure layer ensures naming, classification, and data architecture serve each stakeholder without requiring them to understand the full system.
      </p>
    </div>

    <!-- ═══ STAKEHOLDERS ═══ -->
    <div class="stru-who-section">
      <div class="stru-who-label">By Stakeholder</div>
      <div class="stru-who-grid">
        <a href="/who-we-support/owners/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Owners &amp; Developers</div>
          <div class="stru-who-how">You define what data your asset needs at handover. Structure ensures the CDE, naming, and classification systems deliver it — consistently, contractually, and in a format FM teams can actually use.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/contractors/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Contractors</div>
          <div class="stru-who-how">You coordinate dozens of subcontractors producing data in parallel. Structure gives every party the same naming rules, folder hierarchy, and classification language — so nothing collides at federation.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/engineers/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Engineers</div>
          <div class="stru-who-how">You produce the most parameter-dense models. Structure defines what data goes on each element, at what LOD/LOI, so your effort maps directly to downstream 4D, 5D, and QTO requirements.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/architects/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Architects &amp; Designers</div>
          <div class="stru-who-how">You set the spatial logic. Structure ensures your file naming, model splits, and classification align with every discipline that follows — so design intent survives coordination.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/government/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Government &amp; Agencies</div>
          <div class="stru-who-how">You receive and audit. Structure defines the data architecture that makes submissions auditable, naming verifiable, and classification mappable to your asset management systems.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
        <a href="/who-we-support/consultants-pms/" class="stru-who-card" data-stru-who>
          <div class="stru-who-role">Consultants &amp; PMs</div>
          <div class="stru-who-how">You oversee compliance. Structure gives you the naming conventions, status codes, and CDE workflows to validate information delivery without opening a single model.</div>
          <div class="stru-who-arrow">Learn More →</div>
        </a>
      </div>
    </div>

    <!-- ═══ INDUSTRIES ═══ -->
    <div class="stru-ind-section">
      <div class="stru-ind-label">By Industry</div>
      <div class="stru-ind-strip">
        <a href="/industries/heavy-civil/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">01</div>
          <div class="stru-ind-name">Heavy Civil &amp; Transportation</div>
          <div class="stru-ind-how">Linear assets need spatial classification and location-driven naming across corridors</div>
        </a>
        <a href="/industries/mining/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">02</div>
          <div class="stru-ind-name">Mining &amp; Resource</div>
          <div class="stru-ind-how">Phased expansions demand classification that persists across decades of asset evolution</div>
        </a>
        <a href="/industries/energy/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">03</div>
          <div class="stru-ind-name">Energy &amp; Utilities</div>
          <div class="stru-ind-how">Distributed assets require naming and tagging that maps to maintenance management systems</div>
        </a>
        <a href="/industries/institutional/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">04</div>
          <div class="stru-ind-name">Institutional &amp; Government</div>
          <div class="stru-ind-how">Compliance mandates need auditable naming, COBie-aligned classification, and FM-ready data</div>
        </a>
        <a href="/industries/industrial/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">05</div>
          <div class="stru-ind-name">Industrial &amp; Manufacturing</div>
          <div class="stru-ind-how">Equipment-heavy facilities need structured tag numbering and system-level classification</div>
        </a>
        <a href="/industries/commercial/" class="stru-ind-card" data-stru-ind>
          <div class="stru-ind-num">06</div>
          <div class="stru-ind-name">Commercial &amp; Mixed-Use</div>
          <div class="stru-ind-how">Portfolio-scale delivery needs repeatable naming and classification templates across projects</div>
        </a>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var header = document.getElementById('stru-matrix-header');
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

  var who = document.querySelectorAll('[data-stru-who]');
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

  var ind = document.querySelectorAll('[data-stru-ind]');
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

export default function StructureMatrix() {
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
