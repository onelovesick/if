'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-cta {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .intel-cta::before {
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
  .intel-cta::after {
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

  .intel-cta-inner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    z-index: 1;
  }

  /* Decorative frame */
  .intel-cta-frame {
    position: absolute;
    inset: 40px;
    pointer-events: none;
    z-index: 0;
  }

  .intel-cta-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-top: 1px solid rgba(71,181,255,0.12);
    border-left: 1px solid rgba(71,181,255,0.12);
  }

  .intel-cta-frame::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-bottom: 1px solid rgba(71,181,255,0.12);
    border-right: 1px solid rgba(71,181,255,0.12);
  }

  .intel-cta-eyebrow {
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

  .intel-cta-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .intel-cta h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 24px 0;
  }

  .intel-cta h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .intel-cta-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 560px;
    margin: 0 auto 44px;
  }

  .intel-cta-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .intel-cta-btn-accent {
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

  .intel-cta-btn-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(71,181,255,0.2);
  }

  .intel-cta-btn-secondary {
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

  .intel-cta-btn-secondary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* Trust bar */
  .intel-cta-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
    padding-top: 40px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .intel-cta-trust-item {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.4);
  }

  .intel-cta-trust-item span {
    color: rgba(122,155,181,0.6);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .intel-cta {
      padding: 80px 20px;
    }
    .intel-cta-frame {
      inset: 16px;
    }
    .intel-cta-trust {
      gap: 20px;
    }
  }
</style>

<section class="intel-cta">
  <div class="intel-cta-frame"></div>
  <div class="intel-cta-inner">
    <div class="intel-cta-eyebrow">Build With Intelligence</div>
    <h2>Let\u2019s Make Your<br>Models <em>Work</em></h2>
    <p class="intel-cta-text">
      Whether your programme needs model production, federated coordination, reality capture, or data verification \u2014 the intelligence layer turns geometry into decision-ready information. Let\u2019s talk about what your project needs.
    </p>
    <div class="intel-cta-buttons">
      <a href="/contact/" class="intel-cta-btn-accent">Schedule a Call →</a>
      <a href="/solutions/" class="intel-cta-btn-secondary">All Solutions →</a>
    </div>
    <div class="intel-cta-trust">
      <div class="intel-cta-trust-item"><span>55+</span> Years Experience</div>
      <div class="intel-cta-trust-item"><span>$50B+</span> Assets Delivered</div>
      <div class="intel-cta-trust-item"><span>ISO 19650</span> Aligned</div>
      <div class="intel-cta-trust-item"><span>3</span> Countries</div>
    </div>
  </div>
</section>
`;

const script = `(function(){})();`;

export default function IntelligenceCTA() {
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
