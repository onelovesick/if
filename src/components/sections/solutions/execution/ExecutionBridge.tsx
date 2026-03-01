'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-bridge {
    position: relative;
    background: #F2F5F8;
    padding: 110px 32px 120px;
    overflow: hidden;
  }

  .exec-bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .exec-bridge-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
  }

  .exec-bridge-content {
    text-align: center;
  }

  .exec-bridge-eyebrow {
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

  .exec-bridge-eyebrow::before,
  .exec-bridge-eyebrow::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #47B5FF;
  }

  .exec-bridge h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .exec-bridge h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .exec-bridge-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    max-width: 640px;
    margin: 0 auto 48px;
  }

  .exec-bridge-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 THREE DIMENSION CARDS \u2550\u2550\u2550 */
  .exec-bridge-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 52px;
  }

  .exec-bridge-point {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    text-align: left;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .exec-bridge-point::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .exec-bridge-point:hover::before { width: 100%; }

  .exec-bridge-point:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
  }

  .exec-bridge-point-icon {
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

  .exec-bridge-point-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .exec-bridge-point h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #0B3C5D;
    margin: 0 0 8px 0;
    transition: color 0.3s ease;
  }

  .exec-bridge-point:hover h3 { color: #47B5FF; }

  .exec-bridge-point p {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* \u2550\u2550\u2550 TRANSITION STATEMENT \u2550\u2550\u2550 */
  .exec-bridge-transition {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .exec-bridge-transition-text {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 21px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin-bottom: 8px;
  }

  .exec-bridge-transition-text em {
    font-style: italic;
    color: #47B5FF;
  }

  .exec-bridge-transition-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.45);
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 768px) {
    .exec-bridge { padding: 80px 20px 90px; }
    .exec-bridge-points { grid-template-columns: 1fr; }
  }
</style>

<section class="exec-bridge">
  <div class="exec-bridge-inner">

    <div class="exec-bridge-content" id="exec-bridge-content">
      <div class="exec-bridge-eyebrow">Beyond Geometry</div>
      <h2>Every Project Has A Schedule.<br>Not Every Schedule Has <em>Proof</em></h2>
      <p class="exec-bridge-text">
        Most teams treat execution as a one-way push: model to field, field reports back in spreadsheets, nobody closes the loop. But closed-loop execution \u2014 connecting models, schedules, work packages, inspections, and progress data into a single digital backbone \u2014 creates a fundamentally different dynamic. Field data flows back into the model. The schedule updates from verified installation. Work packages evolve with the design. <strong>The difference between a schedule and an execution system is whether the data loops back \u2014 and whether you can prove what happened.</strong>
      </p>
    </div>

    <div class="exec-bridge-points">
      <div class="exec-bridge-point" data-exec-bp>
        <div class="exec-bridge-point-icon">Dimension 01</div>
        <h3>Disconnected Systems</h3>
        <p>Six tools, zero integration. Design in one platform, schedule in another, cost in a third, safety on paper. Every handoff between systems is a data loss event. The execution layer connects them \u2014 but most projects never bridge the gap.</p>
      </div>

      <div class="exec-bridge-point" data-exec-bp>
        <div class="exec-bridge-point-icon">Dimension 02</div>
        <h3>One-Way Data Flow</h3>
        <p>The model pushes to the field but the field never pushes back. As-built conditions aren\u2019t captured during construction. Field modifications don\u2019t update the model. Quantity changes go untracked. The digital asset and the physical asset diverge from day one.</p>
      </div>

      <div class="exec-bridge-point" data-exec-bp>
        <div class="exec-bridge-point-icon">Dimension 03</div>
        <h3>No Verified Handover</h3>
        <p>By the end of construction, the model doesn\u2019t match the building, the inspection records are scattered across email and WhatsApp, and the owner receives a box of paper instead of a digital twin-ready dataset. Execution data should build the handover progressively \u2014 not retroactively.</p>
      </div>
    </div>

    <div class="exec-bridge-transition">
      <div class="exec-bridge-transition-text">We Close This Gap With The <em>Execution Loop</em></div>
      <div class="exec-bridge-transition-sub">Closed-Loop Delivery</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var content = document.getElementById('exec-bridge-content');
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

  var points = document.querySelectorAll('[data-exec-bp]');
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

export default function ExecutionBridge() {
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
