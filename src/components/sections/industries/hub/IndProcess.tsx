'use client';

import { useEffect, useRef } from 'react';

export default function IndProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  const html = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet" />

    <style>
      .ind-process {
        position: relative;
        background: #F2F5F8;
        padding: 120px 0;
        overflow: hidden;
      }

      .ind-process-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
      }

      .ind-process-header {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 72px;
      }

      .ind-process-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #47B5FF;
        margin-bottom: 24px;
        justify-content: center;
      }

      .ind-process-eyebrow::before {
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #47B5FF;
      }

      .ind-process-heading {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: clamp(28px, 3.6vw, 42px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #0B3C5D;
        margin: 0 0 18px;
      }

      .ind-process-heading em {
        font-style: italic;
        color: #47B5FF;
        margin-right: 0.08em;
      }

      .ind-process-sub {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.75;
        color: #5a7a96;
      }

      /* Steps pipeline */
      .ind-process-pipeline {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        position: relative;
      }

      /* Connecting line behind steps */
      .ind-process-pipeline::before {
        content: '';
        position: absolute;
        top: 36px;
        left: 10%;
        width: 80%;
        height: 1px;
        background: linear-gradient(90deg, rgba(11,60,93,0.08), rgba(71,181,255,0.2), rgba(71,181,255,0.3), rgba(71,181,255,0.2), rgba(11,60,93,0.08));
        z-index: 0;
      }

      .ind-process-step {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 0 16px;
        opacity: 0;
        transform: translateY(24px);
      }

      /* Step number circle */
      .ind-process-step-num {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 1px solid rgba(71,181,255,0.25);
        background: #F2F5F8;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        font-family: 'DM Mono', monospace;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.1em;
        color: #47B5FF;
        position: relative;
        transition: all 0.4s ease;
      }

      .ind-process-step:hover .ind-process-step-num {
        border-color: #47B5FF;
        background: rgba(71,181,255,0.06);
        box-shadow: 0 0 20px rgba(71,181,255,0.1);
      }

      /* Pulsing dot inside circle */
      .ind-process-step-num::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        background: #47B5FF;
        border-radius: 50%;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0.5;
      }

      .ind-process-step-label {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: 18px;
        line-height: 1.2;
        letter-spacing: -0.01em;
        text-transform: uppercase;
        color: #0B3C5D;
        margin-bottom: 12px;
      }

      .ind-process-step-desc {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.7;
        color: #5a7a96;
        max-width: 240px;
        margin: 0 auto;
      }

      /* Bottom link */
      .ind-process-footer {
        text-align: center;
        margin-top: 56px;
        padding-top: 40px;
        border-top: 1px solid rgba(11,60,93,0.09);
      }

      .ind-process-footer a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #F4F6F8;
        background: #0B3C5D;
        border: 1px solid rgba(71,181,255,0.2);
        padding: 14px 32px;
        text-decoration: none;
        transition: all 0.35s ease;
      }

      .ind-process-footer a:hover {
        background: #47B5FF;
        color: #0B3C5D;
        border-color: #47B5FF;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(71,181,255,0.2);
      }

      .ind-process-footer a:hover .ind-p-arrow {
        margin-left: 4px;
      }

      .ind-p-arrow {
        transition: margin-left 0.3s ease;
      }

      /* Reveal */
      .ind-process.ind-revealed .ind-process-step {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ind-process.ind-revealed .ind-process-step:nth-child(1) { transition-delay: 0s; }
      .ind-process.ind-revealed .ind-process-step:nth-child(2) { transition-delay: 0.12s; }
      .ind-process.ind-revealed .ind-process-step:nth-child(3) { transition-delay: 0.24s; }
      .ind-process.ind-revealed .ind-process-step:nth-child(4) { transition-delay: 0.36s; }

      /* Corner brackets */
      .ind-process-corner {
        position: absolute;
        width: 16px;
        height: 16px;
      }

      .ind-process-corner-tl {
        top: 80px;
        left: 32px;
        border-top: 1px solid rgba(11,60,93,0.12);
        border-left: 1px solid rgba(11,60,93,0.12);
      }

      .ind-process-corner-br {
        bottom: 80px;
        right: 32px;
        border-bottom: 1px solid rgba(11,60,93,0.12);
        border-right: 1px solid rgba(11,60,93,0.12);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .ind-process {
          padding: 80px 0;
        }

        .ind-process-container {
          padding: 0 20px;
        }

        .ind-process-pipeline {
          grid-template-columns: repeat(2, 1fr);
          gap: 48px 0;
        }

        .ind-process-pipeline::before {
          display: none;
        }

        .ind-process-step-num {
          width: 60px;
          height: 60px;
          font-size: 13px;
        }
      }

      @media (max-width: 480px) {
        .ind-process-pipeline {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
    </style>

    <section class="ind-process" id="ind-process">
      <div class="ind-process-corner ind-process-corner-tl"></div>
      <div class="ind-process-corner ind-process-corner-br"></div>

      <div class="ind-process-container">
        <div class="ind-process-header">
          <div class="ind-process-eyebrow">Our Methodology</div>
          <h2 class="ind-process-heading">One Process. <em>Every</em> Sector.</h2>
          <p class="ind-process-sub">
            Regardless of industry, every engagement follows the same disciplined framework — adapted to the scale, risk, and regulatory profile of each sector.
          </p>
        </div>

        <div class="ind-process-pipeline">
          <div class="ind-process-step">
            <div class="ind-process-step-num">01</div>
            <div class="ind-process-step-label">Assess</div>
            <p class="ind-process-step-desc">Review contractual requirements, stakeholder objectives, and existing information maturity. Identify gaps, risks, and constraints.</p>
          </div>

          <div class="ind-process-step">
            <div class="ind-process-step-num">02</div>
            <div class="ind-process-step-label">Define</div>
            <p class="ind-process-step-desc">Translate project goals into clear information requirements, modelling standards, data structures, and governance frameworks.</p>
          </div>

          <div class="ind-process-step">
            <div class="ind-process-step-num">03</div>
            <div class="ind-process-step-label">Implement</div>
            <p class="ind-process-step-desc">Deploy structured digital workflows — CDE, validation protocols, coordination, reporting. Only what adds measurable value.</p>
          </div>

          <div class="ind-process-step">
            <div class="ind-process-step-num">04</div>
            <div class="ind-process-step-label">Control</div>
            <p class="ind-process-step-desc">Ongoing validation ensuring model integrity, data consistency, and contractual alignment through delivery and handover.</p>
          </div>
        </div>

        <div class="ind-process-footer">
          <a href="/process/">Discover The Process <span class="ind-p-arrow">→</span></a>
        </div>
      </div>
    </section>
  `;

  const script = `
    (function() {
      var section = document.getElementById('ind-process');
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
