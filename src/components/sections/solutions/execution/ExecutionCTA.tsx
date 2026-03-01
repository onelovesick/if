'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-cta {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .exec-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* Scan line */
  .exec-cta::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.12), transparent);
    animation: ctaScan 8s linear infinite;
    z-index: 0;
  }

  @keyframes ctaScan {
    0% { top: 0; }
    100% { top: 100%; }
  }

  .exec-cta-inner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    z-index: 1;
  }

  /* Decorative frame */
  .exec-cta-frame {
    position: absolute;
    inset: 40px;
    pointer-events: none;
    z-index: 0;
  }

  .exec-cta-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-top: 1px solid rgba(71,181,255,0.12);
    border-left: 1px solid rgba(71,181,255,0.12);
  }

  .exec-cta-frame::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-bottom: 1px solid rgba(71,181,255,0.12);
    border-right: 1px solid rgba(71,181,255,0.12);
  }

  .exec-cta-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 32px;
  }

  .exec-cta-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .exec-cta h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 24px 0;
  }

  .exec-cta h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .exec-cta-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 560px;
    margin: 0 auto 44px;
  }

  .exec-cta-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .exec-cta-btn-accent {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1C1F23;
    background: #47B5FF;
    border: 1px solid #47B5FF;
    padding: 16px 40px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .exec-cta-btn-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(71,181,255,0.2);
  }

  .exec-cta-btn-secondary {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F4F6F8;
    background: transparent;
    border: 1px solid rgba(71,181,255,0.3);
    padding: 16px 40px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .exec-cta-btn-secondary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* Trust bar */
  .exec-cta-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
    padding-top: 40px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .exec-cta-trust-item {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.4);
  }

  .exec-cta-trust-item span {
    color: rgba(122,155,181,0.6);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .exec-cta {
      padding: 80px 20px;
    }
    .exec-cta-frame {
      inset: 16px;
    }
    .exec-cta-trust {
      gap: 20px;
    }
  }
</style>

<section class="exec-cta">
  <div class="exec-cta-frame"></div>
  <div class="exec-cta-inner">
    <div class="exec-cta-eyebrow">Build With Execution</div>
    <h2>Let\u2019s Connect Your<br>Model To The <em>Field</em></h2>
    <p class="exec-cta-text">
      4D scheduling, work packaging, progress tracking, digital inspections, and field QA/QC \u2014 execution is what happens when your project data stops living on servers and starts driving what gets built on site. Let\u2019s talk about what your programme needs.
    </p>
    <div class="exec-cta-buttons">
      <a href="/contact/" class="exec-cta-btn-accent">Schedule a Call →</a>
      <a href="/solutions/" class="exec-cta-btn-secondary">All Solutions →</a>
    </div>
    <div class="exec-cta-trust">
      <div class="exec-cta-trust-item"><span>Synchro</span> · Navisworks</div>
      <div class="exec-cta-trust-item"><span>BIM 360</span> · Procore</div>
      <div class="exec-cta-trust-item"><span>PlanRadar</span> · Dalux</div>
      <div class="exec-cta-trust-item"><span>ISO 19650</span> Compliant</div>
      <div class="exec-cta-trust-item"><span>Platform</span> Agnostic</div>
    </div>
  </div>
</section>
`;

const script = `(function(){})();`;

export default function ExecutionCTA() {
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
