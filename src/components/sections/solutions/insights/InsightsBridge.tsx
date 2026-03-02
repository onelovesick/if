'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-bridge {
    position: relative;
    background: #F2F5F8;
    padding: 110px 32px 120px;
    overflow: hidden;
  }

  .ins-bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .ins-bridge-inner {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
  }

  .ins-bridge-content {
    text-align: center;
  }

  .ins-bridge-eyebrow {
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

  .ins-bridge-eyebrow::before,
  .ins-bridge-eyebrow::after {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: #47B5FF;
  }

  .ins-bridge h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .ins-bridge h2 em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ins-bridge-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    max-width: 640px;
    margin: 0 auto 48px;
  }

  .ins-bridge-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 THREE DIMENSION CARDS \u2550\u2550\u2550 */
  .ins-bridge-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 52px;
  }

  .ins-bridge-point {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 28px 24px 24px;
    text-align: left;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .ins-bridge-point::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .ins-bridge-point:hover::before { width: 100%; }

  .ins-bridge-point:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(11,60,93,0.06);
  }

  .ins-bridge-point-icon {
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

  .ins-bridge-point-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ins-bridge-point h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: #0B3C5D;
    margin: 0 0 8px 0;
    transition: color 0.3s ease;
  }

  .ins-bridge-point:hover h3 { color: #47B5FF; }

  .ins-bridge-point p {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 400;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* \u2550\u2550\u2550 TRANSITION STATEMENT \u2550\u2550\u2550 */
  .ins-bridge-transition {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .ins-bridge-transition-text {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 21px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin-bottom: 8px;
  }

  .ins-bridge-transition-text em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ins-bridge-transition-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.45);
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 768px) {
    .ins-bridge { padding: 80px 20px 90px; }
    .ins-bridge-points { grid-template-columns: 1fr; }
  }
</style>

<section class="ins-bridge">
  <div class="ins-bridge-inner">

    <div class="ins-bridge-content" id="ins-bridge-content">
      <div class="ins-bridge-eyebrow">From Data to Decisions</div>
      <h2>Every Project Has Data.<br>Not Every Project Has <em>Visibility</em></h2>
      <p class="ins-bridge-text">
        Most projects have dashboards. Most dashboards show fragments \u2014 schedule in one view, cost in another, quality in a third. But nobody connects model quality, cost performance, schedule accuracy, and compliance into a single, structured view. The gap between data and decisions isn\u2019t the absence of information \u2014 it\u2019s the absence of an analytics architecture that turns raw numbers into intelligence. <strong>The difference between reporting and insight is whether the data was structured for questions \u2014 or assembled for compliance.</strong>
      </p>
    </div>

    <div class="ins-bridge-points">
      <div class="ins-bridge-point" data-ins-bp>
        <div class="ins-bridge-point-icon">Dimension 01</div>
        <h3>Signal Extraction</h3>
        <p>Construction generates 2.5 quintillion bytes of data daily. The challenge isn\u2019t volume \u2014 it\u2019s extraction. Most analytics platforms report on what already happened. Structured visibility identifies patterns in real time so decisions can be made before variances become irreversible.</p>
      </div>

      <div class="ins-bridge-point" data-ins-bp>
        <div class="ins-bridge-point-icon">Dimension 02</div>
        <h3>Cross-Domain Correlation</h3>
        <p>Schedule slip and cost overruns rarely exist in isolation. A coordination delay cascades into rework, which impacts earned value, which triggers a compliance gap. Structured analytics connect these domains so stakeholders see cause and effect \u2014 not isolated metrics.</p>
      </div>

      <div class="ins-bridge-point" data-ins-bp>
        <div class="ins-bridge-point-icon">Dimension 03</div>
        <h3>Decision Latency</h3>
        <p>The time between a variance occurring and a stakeholder acting on it defines project control quality. Monthly reporting cycles create 4\u20136 week decision latency. Structured dashboards with live data feeds reduce that to hours \u2014 the difference between correction and damage control.</p>
      </div>
    </div>

    <div class="ins-bridge-transition">
      <div class="ins-bridge-transition-text">We Measure This With The <em>Visibility Pipeline</em></div>
      <div class="ins-bridge-transition-sub">Data \u2192 Structure \u2192 Analysis \u2192 Insight \u2192 Decision</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var content = document.getElementById('ins-bridge-content');
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

  var points = document.querySelectorAll('[data-ins-bp]');
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

export default function InsightsBridge() {
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
