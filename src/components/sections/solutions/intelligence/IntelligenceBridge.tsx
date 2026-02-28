'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-bridge {
    position: relative;
    background: #F2F5F8;
    padding: 110px 32px 120px;
    overflow: hidden;
  }

  .intel-bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .intel-bridge-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
  }

  .intel-bridge-content {
    text-align: center;
  }

  .intel-bridge-eyebrow {
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

  .intel-bridge-eyebrow::before,
  .intel-bridge-eyebrow::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #47B5FF;
  }

  .intel-bridge h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .intel-bridge h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .intel-bridge-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    max-width: 640px;
    margin: 0 auto 48px;
  }

  .intel-bridge-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 THREE DIMENSION CARDS \u2550\u2550\u2550 */
  .intel-bridge-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 52px;
  }

  .intel-bridge-point {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    text-align: left;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-bridge-point::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .intel-bridge-point:hover::before { width: 100%; }

  .intel-bridge-point:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
  }

  .intel-bridge-point-icon {
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

  .intel-bridge-point-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .intel-bridge-point h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #0B3C5D;
    margin: 0 0 8px 0;
    transition: color 0.3s ease;
  }

  .intel-bridge-point:hover h3 { color: #47B5FF; }

  .intel-bridge-point p {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* \u2550\u2550\u2550 TRANSITION STATEMENT \u2550\u2550\u2550 */
  .intel-bridge-transition {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .intel-bridge-transition-text {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 21px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin-bottom: 8px;
  }

  .intel-bridge-transition-text em {
    font-style: italic;
    color: #47B5FF;
  }

  .intel-bridge-transition-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.45);
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 768px) {
    .intel-bridge { padding: 80px 20px 90px; }
    .intel-bridge-points { grid-template-columns: 1fr; }
  }
</style>

<section class="intel-bridge">
  <div class="intel-bridge-inner">

    <div class="intel-bridge-content" id="intel-bridge-content">
      <div class="intel-bridge-eyebrow">Beyond Geometry</div>
      <h2>Every Model Has Shape.<br>Not Every Model Has <em>Intelligence</em></h2>
      <p class="intel-bridge-text">
        Most teams measure model progress by what\u2019s visible \u2014 how much geometry is placed, how many views are produced, whether the file opens without crashing. But the intelligence that drives coordination, verification, and decision-making lives in the data you can\u2019t see on screen. <strong>The difference between a model and a digital asset is what\u2019s embedded \u2014 not what\u2019s rendered.</strong>
      </p>
    </div>

    <div class="intel-bridge-points">
      <div class="intel-bridge-point" data-intel-bp>
        <div class="intel-bridge-point-icon">Dimension 01</div>
        <h3>Visible But Empty</h3>
        <p>The model looks complete. Geometry is placed, views are set up, sheets are populated. But elements carry no parameters, no classification, no property sets. It\u2019s a 3D drawing \u2014 not a data asset.</p>
      </div>

      <div class="intel-bridge-point" data-intel-bp>
        <div class="intel-bridge-point-icon">Dimension 02</div>
        <h3>Data Without Verification</h3>
        <p>Parameters are populated but never audited. Classification codes are present but inconsistent. Quantities are extractable but don\u2019t match the spec. The data exists \u2014 but nobody has verified it against the contract.</p>
      </div>

      <div class="intel-bridge-point" data-intel-bp>
        <div class="intel-bridge-point-icon">Dimension 03</div>
        <h3>Information Without Decisions</h3>
        <p>Reports are generated, dashboards are built, clash counts are logged. But no one acts on them. The programme has data everywhere and intelligence nowhere \u2014 because information without a decision framework is just noise.</p>
      </div>
    </div>

    <div class="intel-bridge-transition">
      <div class="intel-bridge-transition-text">We Quantify This With The <em>Model Intelligence Index</em></div>
      <div class="intel-bridge-transition-sub">MII Framework</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var content = document.getElementById('intel-bridge-content');
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

  var points = document.querySelectorAll('[data-intel-bp]');
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

export default function IntelligenceBridge() {
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
