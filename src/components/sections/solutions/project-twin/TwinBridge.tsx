'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-bridge {
    position: relative;
    background: #F2F5F8;
    padding: 110px 32px 120px;
    overflow: hidden;
  }

  .twin-bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .twin-bridge-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
  }

  .twin-bridge-content {
    text-align: center;
  }

  .twin-bridge-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 28px;
  }

  .twin-bridge-eyebrow::before,
  .twin-bridge-eyebrow::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #47B5FF;
  }

  .twin-bridge h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .twin-bridge h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .twin-bridge-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    max-width: 640px;
    margin: 0 auto 48px;
  }

  .twin-bridge-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 THREE DIMENSION CARDS \u2550\u2550\u2550 */
  .twin-bridge-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 52px;
  }

  .twin-bridge-point {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    text-align: left;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .twin-bridge-point::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .twin-bridge-point:hover::before { width: 100%; }

  .twin-bridge-point:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
  }

  .twin-bridge-point-icon {
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .twin-bridge-point-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .twin-bridge-point h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #0B3C5D;
    margin: 0 0 8px 0;
    transition: color 0.3s ease;
  }

  .twin-bridge-point:hover h3 { color: #47B5FF; }

  .twin-bridge-point p {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* \u2550\u2550\u2550 TRANSITION STATEMENT \u2550\u2550\u2550 */
  .twin-bridge-transition {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .twin-bridge-transition-text {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 21px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin-bottom: 8px;
  }

  .twin-bridge-transition-text em {
    font-style: italic;
    color: #47B5FF;
  }

  .twin-bridge-transition-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.45);
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 768px) {
    .twin-bridge { padding: 80px 20px 90px; }
    .twin-bridge-points { grid-template-columns: 1fr; }
  }
</style>

<section class="twin-bridge">
  <div class="twin-bridge-inner">

    <div class="twin-bridge-content" id="twin-bridge-content">
      <div class="twin-bridge-eyebrow">Beyond Handover</div>
      <h2>Every Project Delivers Files.<br>Not Every Project Delivers An <em>Asset</em></h2>
      <p class="twin-bridge-text">
        Most handovers are a document dump \u2014 folders of PDFs, models that don\u2019t match the building, and spreadsheets missing half their fields. But O&amp;M teams don\u2019t need files. They need structured, verified, queryable asset data that maps to their systems and survives for decades. The gap between what gets delivered and what operations actually needs is where most digital twin ambitions die. <strong>The difference between a handover and a twin-ready handover is whether the data was built for operations \u2014 or assembled for closeout.</strong>
      </p>
    </div>

    <div class="twin-bridge-points">
      <div class="twin-bridge-point" data-twin-bp>
        <div class="twin-bridge-point-icon">Dimension 01</div>
        <h3>Data Completeness</h3>
        <p>Most handover datasets are 40\u201360% populated. Asset attributes are missing, document links are broken, and classification codes don\u2019t map to the FM system. Incomplete data means manual reconstruction \u2014 costing owners 2\u20134% of project value before operations even begin.</p>
      </div>

      <div class="twin-bridge-point" data-twin-bp>
        <div class="twin-bridge-point-icon">Dimension 02</div>
        <h3>Model Accuracy</h3>
        <p>The design model was never updated to reflect what was actually built. Routing changed, products were substituted, field conditions forced adjustments \u2014 none of it captured. The digital asset and the physical asset diverged during construction and nobody closed the gap.</p>
      </div>

      <div class="twin-bridge-point" data-twin-bp>
        <div class="twin-bridge-point-icon">Dimension 03</div>
        <h3>O&amp;M Readiness</h3>
        <p>The owner\u2019s facility management team needs data in their system \u2014 Maximo, Archibus, FM:Systems. What they receive is a Revit model they can\u2019t open and a COBie sheet that doesn\u2019t map to their taxonomy. The data exists, but not in a format operations can use.</p>
      </div>
    </div>

    <div class="twin-bridge-transition">
      <div class="twin-bridge-transition-text">We Measure This With The <em>Twin Readiness Index</em></div>
      <div class="twin-bridge-transition-sub">TRI \u00b7 Handover Readiness Scoring</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var content = document.getElementById('twin-bridge-content');
  if (content) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    var obsC = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          content.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';
          obsC.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsC.observe(content);
  }

  var points = document.querySelectorAll('[data-twin-bp]');
  points.forEach(function(pt, i) {
    pt.style.opacity = '0';
    pt.style.transform = 'translateY(18px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            pt.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
            pt.style.opacity = '1';
            pt.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(pt);
  });
})();`;

export default function TwinBridge() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const s = document.createElement('script');
    s.textContent = script;
    el.appendChild(s);
    return () => { obs.disconnect(); if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
