'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-hero {
    position: relative;
    min-height: 100vh;
    background: #1C1F23;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px 32px 100px;
    overflow: hidden;
  }

  .str-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .str-hero__scan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.25), transparent);
    animation: strScanDown 8s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes strScanDown {
    0% { top: 0; }
    100% { top: 100%; }
  }

  .str-hero__glow-1 {
    position: absolute;
    top: 15%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(71,181,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .str-hero__glow-2 {
    position: absolute;
    bottom: 10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(11,60,93,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .str-hero__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: strOrbFloat 6s ease-in-out infinite;
  }

  .str-hero__orb--1 {
    width: 6px;
    height: 6px;
    top: 22%;
    right: 18%;
    background: rgba(71,181,255,0.35);
    animation-delay: 0s;
  }

  .str-hero__orb--2 {
    width: 4px;
    height: 4px;
    top: 55%;
    left: 12%;
    background: rgba(71,181,255,0.2);
    animation-delay: 2s;
  }

  .str-hero__orb--3 {
    width: 5px;
    height: 5px;
    bottom: 25%;
    right: 25%;
    background: rgba(71,181,255,0.25);
    animation-delay: 4s;
  }

  @keyframes strOrbFloat {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-18px); opacity: 1; }
  }

  .str-hero__container {
    position: relative;
    z-index: 2;
    max-width: 900px;
    text-align: center;
  }

  .str-hero__badge {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.2);
    padding: 6px 16px;
    margin-bottom: 32px;
  }

  .str-hero__nav {
    margin-bottom: 6px;
  }

  .str-hero__breadcrumb {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: #7a9bb5;
  }

  .str-hero__breadcrumb a {
    color: #7a9bb5;
    text-decoration: none;
    transition: color 0.3s;
  }

  .str-hero__breadcrumb a:hover {
    color: #47B5FF;
  }

  .str-hero__seq {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.14em;
    color: rgba(122,155,181,0.5);
    margin-bottom: 28px;
  }

  .str-hero__eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 28px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .str-hero__eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-hero__heading {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(36px, 5vw, 60px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 28px;
  }

  .str-hero__heading em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-hero__sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.75;
    color: #7a9bb5;
    max-width: 660px;
    margin: 0 auto 44px;
  }

  .str-hero__ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .str-hero__cta-accent {
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
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
  }

  .str-hero__cta-accent:hover {
    background: #3a9de0;
    border-color: #3a9de0;
    transform: translateY(-2px);
  }

  .str-hero__cta-primary {
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
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
  }

  .str-hero__cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
    color: #F4F6F8;
  }

  .str-hero__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .str-hero__meta-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: rgba(122,155,181,0.55);
  }

  .str-hero__meta-sep {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(122,155,181,0.3);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .str-hero {
      padding: 120px 20px 72px;
      min-height: auto;
    }

    .str-hero__heading {
      font-size: 30px;
    }

    .str-hero__sub {
      font-size: 15px;
    }

    .str-hero__ctas {
      flex-direction: column;
    }

    .str-hero__cta-primary,
    .str-hero__cta-accent {
      width: 100%;
      text-align: center;
    }

    .str-hero__meta {
      flex-direction: column;
      gap: 8px;
    }

    .str-hero__meta-sep {
      display: none;
    }
  }
</style>

<section class="str-hero">
  <div class="str-hero__scan"></div>
  <div class="str-hero__glow-1"></div>
  <div class="str-hero__glow-2"></div>
  <div class="str-hero__orb str-hero__orb--1"></div>
  <div class="str-hero__orb str-hero__orb--2"></div>
  <div class="str-hero__orb str-hero__orb--3"></div>

  <div class="str-hero__container">
    <div class="str-hero__badge">Solution Layer 02</div>

    <div class="str-hero__nav">
      <span class="str-hero__breadcrumb">
        <a href="/">Infraforma</a> · <a href="/solutions/">Solutions</a> · Structure
      </span>
    </div>

    <div class="str-hero__seq">02 / 06</div>

    <div class="str-hero__eyebrow">Solution Layer · Structure</div>

    <h1 class="str-hero__heading">
      Organise The <em>Architecture</em><br>Before The First Exchange
    </h1>

    <p class="str-hero__sub">
      CDE configuration, naming conventions, classification mapping, and LOD/LOI frameworks — engineered before the first model is shared. Structure is the layer that makes every file findable, every exchange reliable, and every dataset contractually defensible.
    </p>

    <div class="str-hero__ctas">
      <a href="/contact/" class="str-hero__cta-accent">Schedule a Call →</a>
      <a href="/solutions/" class="str-hero__cta-primary">All Solutions →</a>
    </div>

    <div class="str-hero__meta">
      <span class="str-hero__meta-tag">ISO 19650-2</span>
      <span class="str-hero__meta-sep"></span>
      <span class="str-hero__meta-tag">Design &amp; Construction Phases</span>
      <span class="str-hero__meta-sep"></span>
      <span class="str-hero__meta-tag">Platform-Agnostic</span>
    </div>
  </div>
</section>
`;

const script = `(function(){})();`;

export default function StructureHero() {
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
