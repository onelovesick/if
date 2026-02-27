'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-hero {
    position: relative;
    min-height: 100vh;
    background: #1C1F23;
    padding: 160px 32px 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Blueprint grid texture */
  .str-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  /* Scan line */
  .str-hero::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.15), transparent);
    animation: scanDown 8s linear infinite;
    z-index: 0;
  }

  @keyframes scanDown {
    0% { top: 0; }
    100% { top: 100%; }
  }

  .str-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 900px;
    text-align: center;
  }

  .str-hero-eyebrow {
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

  .str-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-hero-number {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(71,181,255,0.4);
    letter-spacing: 0.15em;
    display: block;
    margin-bottom: 20px;
  }

  .str-hero h1 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(42px, 5.5vw, 68px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 28px 0;
  }

  .str-hero h1 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 640px;
    margin: 0 auto 44px;
  }

  .str-hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .str-hero-cta-primary {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F4F6F8;
    background: transparent;
    border: 1px solid rgba(71,181,255,0.3);
    padding: 14px 32px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .str-hero-cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  .str-hero-cta-accent {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1C1F23;
    background: #47B5FF;
    border: 1px solid #47B5FF;
    padding: 14px 32px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .str-hero-cta-accent:hover {
    background: #3a9fe0;
    transform: translateY(-1px);
  }

  /* Breadcrumb trail */
  .str-hero-breadcrumb {
    position: absolute;
    top: 140px;
    left: 32px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: rgba(122,155,181,0.5);
    z-index: 1;
  }

  .str-hero-breadcrumb a {
    color: rgba(122,155,181,0.5);
    text-decoration: none;
    transition: color 0.2s;
  }

  .str-hero-breadcrumb a:hover {
    color: #47B5FF;
  }

  .str-hero-breadcrumb span {
    margin: 0 8px;
  }

  /* Decorative corner brackets on hero */
  .str-hero-frame {
    position: absolute;
    inset: 60px;
    pointer-events: none;
    z-index: 0;
  }

  .str-hero-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-top: 1px solid rgba(71,181,255,0.15);
    border-left: 1px solid rgba(71,181,255,0.15);
  }

  .str-hero-frame::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-bottom: 1px solid rgba(71,181,255,0.15);
    border-right: 1px solid rgba(71,181,255,0.15);
  }

  /* Phase tag */
  .str-hero-phase {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #7a9bb5;
    border: 1px solid rgba(71,181,255,0.14);
    padding: 6px 16px;
    margin-top: 12px;
  }

  @media (max-width: 768px) {
    .str-hero {
      padding: 140px 20px 80px;
    }
    .str-hero-breadcrumb {
      display: none;
    }
    .str-hero-frame {
      inset: 24px;
    }
  }
</style>

<section class="str-hero">
  <div class="str-hero-frame"></div>

  <nav class="str-hero-breadcrumb">
    <a href="/">Infraforma</a>
    <span>·</span>
    <a href="/solutions/">Solutions</a>
    <span>·</span>
    Strategy
  </nav>

  <div class="str-hero-inner">
    <span class="str-hero-number">01 / 06</span>
    <div class="str-hero-eyebrow">Solution Layer · Strategy</div>
    <h1>Define The <em>Blueprint</em><br>Before The Build</h1>
    <p class="str-hero-sub">
      BIM execution plans, employer's information requirements, and digital delivery roadmaps — engineered before a single model is opened. Strategy is the layer that prevents every downstream failure.
    </p>
    <div class="str-hero-ctas">
      <a href="/contact/" class="str-hero-cta-accent">Schedule a Call →</a>
      <a href="/solutions/" class="str-hero-cta-primary">All Solutions →</a>
    </div>
    <div class="str-hero-phase">ISO 19650-1 · Inception & All Phases</div>
  </div>
</section>
`;

const script = `(function(){})();`;

export default function StrategyHero() {
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
