'use client';

import { useEffect, useRef } from 'react';

export default function IndCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const html = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet" />

    <style>
      .ind-cta {
        position: relative;
        background: #1C1F23;
        padding: 120px 0 100px;
        overflow: hidden;
      }

      /* Blueprint grid */
      .ind-cta-grid-bg {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
      }

      /* Radial glow */
      .ind-cta-glow {
        position: absolute;
        top: -40%;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 800px;
        background: radial-gradient(ellipse, rgba(71,181,255,0.06) 0%, transparent 70%);
        pointer-events: none;
      }

      .ind-cta-container {
        position: relative;
        z-index: 2;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 32px;
        text-align: center;
      }

      .ind-cta-eyebrow {
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
        justify-content: center;
      }

      .ind-cta-eyebrow::before {
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #47B5FF;
      }

      .ind-cta-heading {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: clamp(32px, 4.2vw, 52px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #F4F6F8;
        margin: 0 0 24px;
      }

      .ind-cta-heading em {
        font-style: italic;
        color: #47B5FF;
        margin-right: 0.08em;
      }

      .ind-cta-text {
        font-family: 'Inter', sans-serif;
        font-size: 17px;
        font-weight: 300;
        line-height: 1.8;
        color: #7a9bb5;
        max-width: 580px;
        margin: 0 auto 44px;
      }

      /* CTA buttons */
      .ind-cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 64px;
      }

      .ind-cta-btn-accent {
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
        padding: 16px 32px;
        text-decoration: none;
        transition: all 0.35s ease;
        cursor: pointer;
      }

      .ind-cta-btn-accent:hover {
        background: #3a9fe0;
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(71,181,255,0.3);
      }

      .ind-cta-btn-primary {
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
        padding: 16px 32px;
        text-decoration: none;
        transition: all 0.35s ease;
        cursor: pointer;
      }

      .ind-cta-btn-primary:hover {
        background: #0B3C5D;
        border-color: #47B5FF;
        color: #fff;
      }

      .ind-cta-btn-accent .ind-cta-arrow,
      .ind-cta-btn-primary .ind-cta-arrow {
        transition: margin-left 0.3s ease;
      }

      .ind-cta-btn-accent:hover .ind-cta-arrow,
      .ind-cta-btn-primary:hover .ind-cta-arrow {
        margin-left: 6px;
      }

      /* Trust bar */
      .ind-cta-trust {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px 28px;
        padding-top: 40px;
        border-top: 1px solid rgba(71,181,255,0.1);
      }

      .ind-cta-trust-item {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #7a9bb5;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .ind-cta-trust-dot {
        width: 4px;
        height: 4px;
        background: rgba(71,181,255,0.4);
        border-radius: 50%;
      }

      /* Corner brackets */
      .ind-cta-corner {
        position: absolute;
        width: 18px;
        height: 18px;
        z-index: 3;
      }

      .ind-cta-corner-tl {
        top: 60px;
        left: 32px;
        border-top: 1px solid rgba(71,181,255,0.2);
        border-left: 1px solid rgba(71,181,255,0.2);
      }

      .ind-cta-corner-br {
        bottom: 60px;
        right: 32px;
        border-bottom: 1px solid rgba(71,181,255,0.2);
        border-right: 1px solid rgba(71,181,255,0.2);
      }

      /* Reveal */
      .ind-cta-container {
        opacity: 0;
        transform: translateY(28px);
        transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ind-cta.ind-revealed .ind-cta-container {
        opacity: 1;
        transform: translateY(0);
      }

      /* Responsive */
      @media (max-width: 640px) {
        .ind-cta {
          padding: 80px 0 72px;
        }

        .ind-cta-container {
          padding: 0 20px;
        }

        .ind-cta-buttons {
          flex-direction: column;
        }

        .ind-cta-btn-accent,
        .ind-cta-btn-primary {
          justify-content: center;
          text-align: center;
        }

        .ind-cta-trust {
          gap: 8px 20px;
          justify-content: flex-start;
        }

        .ind-cta-corner-tl,
        .ind-cta-corner-br {
          display: none;
        }
      }
    </style>

    <section class="ind-cta" id="ind-cta">
      <div class="ind-cta-grid-bg"></div>
      <div class="ind-cta-glow"></div>
      <div class="ind-cta-corner ind-cta-corner-tl"></div>
      <div class="ind-cta-corner ind-cta-corner-br"></div>

      <div class="ind-cta-container">
        <div class="ind-cta-eyebrow">Work With Us</div>

        <h2 class="ind-cta-heading">Your Sector. Our <em>Framework</em>.</h2>

        <p class="ind-cta-text">
          Tell us your industry, your programme scale, and your delivery challenges. We'll show you exactly how the six solution layers apply — and what structured digital delivery looks like for your sector.
        </p>

        <div class="ind-cta-buttons">
          <a href="/contact/" class="ind-cta-btn-accent">
            Schedule a Call <span class="ind-cta-arrow">→</span>
          </a>
          <a href="/solutions/" class="ind-cta-btn-primary">
            All Solutions <span class="ind-cta-arrow">→</span>
          </a>
        </div>

        <div class="ind-cta-trust">
          <div class="ind-cta-trust-item">
            <span class="ind-cta-trust-dot"></span>
            ISO 19650 Compliant
          </div>
          <div class="ind-cta-trust-item">
            <span class="ind-cta-trust-dot"></span>
            Platform Agnostic
          </div>
          <div class="ind-cta-trust-item">
            <span class="ind-cta-trust-dot"></span>
            55+ Years Combined
          </div>
          <div class="ind-cta-trust-item">
            <span class="ind-cta-trust-dot"></span>
            $50B+ Assets Delivered
          </div>
        </div>
      </div>
    </section>
  `;

  const script = `
    (function() {
      var section = document.getElementById('ind-cta');
      if (!section) return;
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            section.classList.add('ind-revealed');
            obs.disconnect();
          }
        });
      }, { threshold: 0.05 });
      obs.observe(section);
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
