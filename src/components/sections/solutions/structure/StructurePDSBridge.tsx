'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-bridge {
    position: relative;
    background: #F2F5F8;
    padding: 110px 32px 120px;
    overflow: hidden;
  }

  .stru-bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .stru-bridge-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
  }

  /* ═══ LAYOUT ═══ */
  .stru-bridge-content {
    text-align: center;
  }

  .stru-bridge-eyebrow {
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

  .stru-bridge-eyebrow::before,
  .stru-bridge-eyebrow::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #47B5FF;
  }

  .stru-bridge h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .stru-bridge h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .stru-bridge-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    max-width: 640px;
    margin: 0 auto 48px;
  }

  .stru-bridge-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* ═══ THREE PAIN POINTS ═══ */
  .stru-bridge-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 52px;
  }

  .stru-bridge-point {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    text-align: left;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .stru-bridge-point::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .stru-bridge-point:hover::before { width: 100%; }

  .stru-bridge-point:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
  }

  .stru-bridge-point-icon {
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

  .stru-bridge-point-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .stru-bridge-point h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #0B3C5D;
    margin: 0 0 8px 0;
    transition: color 0.3s ease;
  }

  .stru-bridge-point:hover h3 { color: #47B5FF; }

  .stru-bridge-point p {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* ═══ TRANSITION STATEMENT ═══ */
  .stru-bridge-transition {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .stru-bridge-transition-text {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 21px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin-bottom: 8px;
  }

  .stru-bridge-transition-text em {
    font-style: italic;
    color: #47B5FF;
  }

  .stru-bridge-transition-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.45);
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 768px) {
    .stru-bridge { padding: 80px 20px 90px; }
    .stru-bridge-points { grid-template-columns: 1fr; }
  }
</style>

<section class="stru-bridge">
  <div class="stru-bridge-inner">

    <div class="stru-bridge-content" id="stru-bridge-content">
      <div class="stru-bridge-eyebrow">The Re-Classification Problem</div>
      <h2>Every Handoff Breaks<br>The <em>Data Chain</em></h2>
      <p class="stru-bridge-text">
        On most programmes, every discipline re-classifies information for their own system. The scheduler builds a WBS. The estimator builds a CBS. The FM team builds an asset register. <strong>Three teams. Three taxonomies. Zero interoperability.</strong>
      </p>
    </div>

    <div class="stru-bridge-points">
      <div class="stru-bridge-point" data-stru-bp>
        <div class="stru-bridge-point-icon">Problem 01</div>
        <h3>Fragmented Codes</h3>
        <p>Each discipline creates its own classification. The architect's element ID means nothing to the cost engineer. Data is manually reconciled at every exchange — or lost entirely.</p>
      </div>

      <div class="stru-bridge-point" data-stru-bp>
        <div class="stru-bridge-point-icon">Problem 02</div>
        <h3>Phase Transitions Fail</h3>
        <p>When a project moves from design to construction to operations, the data structure changes hands. Without a unified backbone, each transition requires a full re-mapping exercise.</p>
      </div>

      <div class="stru-bridge-point" data-stru-bp>
        <div class="stru-bridge-point-icon">Problem 03</div>
        <h3>Handover Inherits Chaos</h3>
        <p>The FM team receives a model full of data they can't parse. Element codes don't match the asset register. The owner gets files — not a managed digital asset.</p>
      </div>
    </div>

    <div class="stru-bridge-transition">
      <div class="stru-bridge-transition-text">We Solved This With A Unified <em>Data Architecture</em></div>
      <div class="stru-bridge-transition-sub">PDS + EDS Framework</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var content = document.getElementById('stru-bridge-content');
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

  var points = document.querySelectorAll('[data-stru-bp]');
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

export default function StructurePDSBridge() {
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
