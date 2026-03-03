'use client';

import { useEffect, useRef } from 'react';

export default function IndHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const html = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet" />

    <style>
      .ind-hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: #1C1F23;
        overflow: hidden;
        padding: 160px 0 120px;
      }

      /* Background image — aerial infrastructure */
      .ind-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80') center center / cover no-repeat;
        opacity: 0.07;
        filter: grayscale(60%) contrast(1.1);
        z-index: 0;
      }

      /* Blueprint grid */
      .ind-hero-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(71,181,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,181,255,0.06) 1px, transparent 1px);
        background-size: 48px 48px;
        z-index: 1;
      }

      /* Radial glow */
      .ind-hero-glow {
        position: absolute;
        top: -20%;
        left: 50%;
        transform: translateX(-50%);
        width: 900px;
        height: 900px;
        background: radial-gradient(ellipse, rgba(71,181,255,0.08) 0%, transparent 70%);
        z-index: 1;
        pointer-events: none;
      }

      .ind-hero-glow-bottom {
        position: absolute;
        bottom: -30%;
        right: -10%;
        width: 600px;
        height: 600px;
        background: radial-gradient(ellipse, rgba(11,60,93,0.15) 0%, transparent 70%);
        z-index: 1;
        pointer-events: none;
      }

      /* Scan line */
      .ind-hero-scan {
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(71,181,255,0.12) 30%, rgba(71,181,255,0.2) 50%, rgba(71,181,255,0.12) 70%, transparent 100%);
        z-index: 2;
        animation: indScanDown 8s linear infinite;
      }

      @keyframes indScanDown {
        0% { top: -2%; }
        100% { top: 102%; }
      }

      .ind-hero-container {
        position: relative;
        z-index: 3;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
      }

      /* Breadcrumb */
      .ind-hero-breadcrumb {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.12em;
        color: #7a9bb5;
        margin-bottom: 48px;
      }

      .ind-hero-breadcrumb a {
        color: #7a9bb5;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .ind-hero-breadcrumb a:hover {
        color: #47B5FF;
      }

      .ind-hero-breadcrumb .ind-sep {
        margin: 0 10px;
        opacity: 0.5;
      }

      .ind-hero-breadcrumb .ind-current {
        color: #F4F6F8;
      }

      /* Eyebrow */
      .ind-hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #47B5FF;
        margin-bottom: 28px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ind-hero-eyebrow::before {
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #47B5FF;
      }

      /* Heading */
      .ind-hero-heading {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: clamp(38px, 5.2vw, 64px);
        line-height: 1.05;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #F4F6F8;
        margin: 0 0 32px;
        max-width: 820px;
        opacity: 0;
        transform: translateY(28px);
        transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
      }

      .ind-hero-heading em {
        font-style: italic;
        color: #47B5FF;
        margin-right: 0.08em;
      }

      /* Sub paragraph */
      .ind-hero-sub {
        font-family: 'Inter', sans-serif;
        font-size: 17px;
        font-weight: 300;
        line-height: 1.8;
        color: #7a9bb5;
        max-width: 620px;
        margin: 0 0 44px;
        opacity: 0;
        transform: translateY(28px);
        transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
      }

      /* CTAs */
      .ind-hero-ctas {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        opacity: 0;
        transform: translateY(28px);
        transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
      }

      .ind-hero-cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #F4F6F8;
        background: transparent;
        border: 1px solid rgba(71,181,255,0.3);
        padding: 14px 28px;
        text-decoration: none;
        transition: all 0.35s ease;
        cursor: pointer;
      }

      .ind-hero-cta-primary:hover {
        background: #0B3C5D;
        border-color: #47B5FF;
        color: #fff;
      }

      .ind-hero-cta-primary .ind-arrow {
        transition: margin-left 0.3s ease;
      }

      .ind-hero-cta-primary:hover .ind-arrow {
        margin-left: 6px;
      }

      .ind-hero-cta-accent {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #0B3C5D;
        background: #47B5FF;
        border: 1px solid #47B5FF;
        padding: 14px 28px;
        text-decoration: none;
        transition: all 0.35s ease;
        cursor: pointer;
      }

      .ind-hero-cta-accent:hover {
        background: #3a9fe0;
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(71,181,255,0.25);
      }

      /* Decorative corner brackets */
      .ind-hero-corner-tl,
      .ind-hero-corner-br {
        position: absolute;
        width: 18px;
        height: 18px;
        z-index: 3;
      }

      .ind-hero-corner-tl {
        top: 120px;
        left: 32px;
        border-top: 1px solid rgba(71,181,255,0.3);
        border-left: 1px solid rgba(71,181,255,0.3);
      }

      .ind-hero-corner-br {
        bottom: 80px;
        right: 32px;
        border-bottom: 1px solid rgba(71,181,255,0.3);
        border-right: 1px solid rgba(71,181,255,0.3);
      }

      /* Reveal state */
      .ind-hero.ind-revealed .ind-hero-eyebrow,
      .ind-hero.ind-revealed .ind-hero-heading,
      .ind-hero.ind-revealed .ind-hero-sub,
      .ind-hero.ind-revealed .ind-hero-ctas {
        opacity: 1;
        transform: translateY(0);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .ind-hero {
          padding: 140px 0 80px;
          min-height: auto;
        }

        .ind-hero-container {
          padding: 0 20px;
        }

        .ind-hero-sub {
          font-size: 15px;
        }

        .ind-hero-ctas {
          flex-direction: column;
        }

        .ind-hero-cta-primary,
        .ind-hero-cta-accent {
          text-align: center;
          justify-content: center;
        }

        .ind-hero-corner-tl,
        .ind-hero-corner-br {
          display: none;
        }
      }
    </style>

    <section class="ind-hero" id="ind-hero">
      <div class="ind-hero-grid"></div>
      <div class="ind-hero-glow"></div>
      <div class="ind-hero-glow-bottom"></div>
      <div class="ind-hero-scan"></div>
      <div class="ind-hero-corner-tl"></div>
      <div class="ind-hero-corner-br"></div>

      <div class="ind-hero-container">
        <div class="ind-hero-breadcrumb">
          <a href="/">Home</a>
          <span class="ind-sep">·</span>
          <span class="ind-current">Industries</span>
        </div>

        <div class="ind-hero-eyebrow">Industries</div>

        <h1 class="ind-hero-heading">
          Infrastructure Spans <em>Industries</em> — So Do We
        </h1>

        <p class="ind-hero-sub">
          We're civil engineers. We don't adapt generic technology to construction — we engineer digital systems for it. Every sector carries different data requirements, procurement structures, regulatory frameworks, and operational lifecycles. Our six solution layers flex to each.
        </p>

        <div class="ind-hero-ctas">
          <a href="/solutions/" class="ind-hero-cta-primary">
            Explore Solutions <span class="ind-arrow">→</span>
          </a>
          <a href="/contact/" class="ind-hero-cta-accent">
            Schedule a Call <span class="ind-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `;

  const script = `
    (function() {
      var hero = document.getElementById('ind-hero');
      if (!hero) return;
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            hero.classList.add('ind-revealed');
            obs.disconnect();
          }
        });
      }, { threshold: 0.05 });
      obs.observe(hero);
    })();
  `;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const s = document.createElement('script');
    s.textContent = script;
    el.appendChild(s);
    return () => { if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);

  return (
    <section
      ref={sectionRef}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
