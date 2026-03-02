'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-cta {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .ins-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .ins-cta::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.12), transparent);
    animation: insCtaScan 8s linear infinite;
    z-index: 0;
  }

  @keyframes insCtaScan {
    0% { top: 0; }
    100% { top: 100%; }
  }

  .ins-cta-inner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    z-index: 1;
  }

  .ins-cta-frame {
    position: absolute;
    inset: 40px;
    pointer-events: none;
    z-index: 0;
  }

  .ins-cta-frame::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 24px; height: 24px;
    border-top: 1px solid rgba(71,181,255,0.12);
    border-left: 1px solid rgba(71,181,255,0.12);
  }

  .ins-cta-frame::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 24px; height: 24px;
    border-bottom: 1px solid rgba(71,181,255,0.12);
    border-right: 1px solid rgba(71,181,255,0.12);
  }

  .ins-cta-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #47B5FF; margin-bottom: 32px;
  }

  .ins-cta-eyebrow::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: #47B5FF;
  }

  .ins-cta h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(32px, 4vw, 52px); line-height: 1.08;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #F4F6F8; margin: 0 0 24px 0;
  }

  .ins-cta h2 em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ins-cta-text {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5;
    max-width: 560px; margin: 0 auto 44px;
  }

  .ins-cta-buttons {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; flex-wrap: wrap; margin-bottom: 48px;
  }

  .ins-cta-btn-accent {
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF;
    padding: 16px 40px; text-decoration: none;
    transition: all 0.3s ease; cursor: pointer;
  }

  .ins-cta-btn-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(71,181,255,0.2);
  }

  .ins-cta-btn-secondary {
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #F4F6F8; background: transparent;
    border: 1px solid rgba(71,181,255,0.3);
    padding: 16px 40px; text-decoration: none;
    transition: all 0.3s ease; cursor: pointer;
  }

  .ins-cta-btn-secondary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  .ins-cta-trust {
    display: flex; align-items: center; justify-content: center;
    gap: 32px; flex-wrap: wrap;
    padding-top: 40px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .ins-cta-trust-item {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(122,155,181,0.4);
  }

  .ins-cta-trust-item span {
    color: rgba(122,155,181,0.6);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .ins-cta { padding: 80px 20px; }
    .ins-cta-frame { inset: 16px; }
    .ins-cta-trust { gap: 20px; }
  }
</style>

<section class="ins-cta">
  <div class="ins-cta-frame"></div>
  <div class="ins-cta-inner">
    <div class="ins-cta-eyebrow">Build With Insights</div>
    <h2>Your Data Exists.<br>Your <em>Visibility</em> Doesn\u2019t.</h2>
    <p class="ins-cta-text">
      Custom dashboards, BIM auditing, 5D cost integration, compliance scorecards, and programme analytics \u2014 structured through a single visibility pipeline that transforms scattered project data into the intelligence your stakeholders need to make better decisions, faster. Let\u2019s talk about what your programme needs.
    </p>
    <div class="ins-cta-buttons">
      <a href="/contact/" class="ins-cta-btn-accent">Schedule a Call \u2192</a>
      <a href="/solutions/" class="ins-cta-btn-secondary">All Solutions \u2192</a>
    </div>
    <div class="ins-cta-trust">
      <div class="ins-cta-trust-item"><span>Power BI</span> \u00b7 Tableau</div>
      <div class="ins-cta-trust-item"><span>Solibri</span> \u00b7 Navisworks</div>
      <div class="ins-cta-trust-item"><span>CostX</span> \u00b7 BIM Track</div>
      <div class="ins-cta-trust-item"><span>ISO 19650</span> Compliant</div>
      <div class="ins-cta-trust-item"><span>Platform</span> Agnostic</div>
    </div>
  </div>
</section>
`;

const script = `(function(){})();`;

export default function InsightsCTA() {
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
