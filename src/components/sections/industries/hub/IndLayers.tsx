'use client';

import { useEffect, useRef } from 'react';

export default function IndLayers() {
  const sectionRef = useRef<HTMLElement>(null);

  const html = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet" />

    <style>
      .ind-layers {
        position: relative;
        background: #1C1F23;
        padding: 120px 0;
        overflow: hidden;
      }

      /* Blueprint grid */
      .ind-layers-grid-bg {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
      }

      .ind-layers-container {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
      }

      .ind-layers-header {
        text-align: center;
        max-width: 700px;
        margin: 0 auto 64px;
      }

      .ind-layers-eyebrow {
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

      .ind-layers-eyebrow::before {
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #47B5FF;
      }

      .ind-layers-heading {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: clamp(28px, 3.8vw, 44px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #F4F6F8;
        margin: 0 0 20px;
      }

      .ind-layers-heading em {
        font-style: italic;
        color: #47B5FF;
        margin-right: 0.08em;
      }

      .ind-layers-sub {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.75;
        color: #7a9bb5;
      }

      /* Layer strip — 6 items */
      .ind-layers-strip {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;
      }

      .ind-layers-item {
        position: relative;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(71,181,255,0.1);
        padding: 28px 20px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        opacity: 0;
        transform: translateY(24px);
      }

      .ind-layers-item:hover {
        background: rgba(71,181,255,0.05);
        border-color: rgba(71,181,255,0.25);
        transform: translateY(-3px);
      }

      /* Top accent line draw */
      .ind-layers-item::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: 0;
        height: 2px;
        background: #47B5FF;
        transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ind-layers-item:hover::before {
        width: calc(100% + 2px);
      }

      .ind-layers-item-number {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.22em;
        color: rgba(71,181,255,0.5);
        margin-bottom: 16px;
      }

      .ind-layers-item-name {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: 15px;
        line-height: 1.2;
        letter-spacing: -0.01em;
        text-transform: uppercase;
        color: #F4F6F8;
        margin-bottom: 10px;
        transition: color 0.3s ease;
      }

      .ind-layers-item:hover .ind-layers-item-name {
        color: #47B5FF;
      }

      .ind-layers-item-desc {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 300;
        line-height: 1.6;
        color: #7a9bb5;
        margin-bottom: 16px;
        flex: 1;
      }

      .ind-layers-item-arrow {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.1em;
        color: #47B5FF;
        opacity: 0;
        transform: translateX(-6px);
        transition: all 0.3s ease;
      }

      .ind-layers-item:hover .ind-layers-item-arrow {
        opacity: 1;
        transform: translateX(0);
      }

      /* Connecting line between items */
      .ind-layers-connector {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 32px;
      }

      .ind-layers-connector-line {
        width: 100%;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(71,181,255,0.15) 10%,
          rgba(71,181,255,0.25) 50%,
          rgba(71,181,255,0.15) 90%,
          transparent 100%
        );
        position: relative;
      }

      .ind-layers-connector-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #7a9bb5;
        background: #1C1F23;
        padding: 4px 16px;
        white-space: nowrap;
      }

      /* CTA link */
      .ind-layers-link {
        text-align: center;
        margin-top: 40px;
      }

      .ind-layers-link a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #47B5FF;
        text-decoration: none;
        transition: gap 0.3s ease;
      }

      .ind-layers-link a:hover {
        gap: 14px;
      }

      /* Reveal */
      .ind-layers.ind-revealed .ind-layers-item {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease, border-color 0.4s ease;
      }

      .ind-layers.ind-revealed .ind-layers-item:nth-child(1) { transition-delay: 0s; }
      .ind-layers.ind-revealed .ind-layers-item:nth-child(2) { transition-delay: 0.08s; }
      .ind-layers.ind-revealed .ind-layers-item:nth-child(3) { transition-delay: 0.16s; }
      .ind-layers.ind-revealed .ind-layers-item:nth-child(4) { transition-delay: 0.24s; }
      .ind-layers.ind-revealed .ind-layers-item:nth-child(5) { transition-delay: 0.32s; }
      .ind-layers.ind-revealed .ind-layers-item:nth-child(6) { transition-delay: 0.4s; }

      /* Responsive */
      @media (max-width: 1024px) {
        .ind-layers-strip {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 640px) {
        .ind-layers {
          padding: 80px 0;
        }

        .ind-layers-container {
          padding: 0 20px;
        }

        .ind-layers-strip {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .ind-layers-item {
          padding: 22px 16px;
        }

        .ind-layers-connector {
          display: none;
        }
      }
    </style>

    <section class="ind-layers" id="ind-layers">
      <div class="ind-layers-grid-bg"></div>
      <div class="ind-layers-container">

        <div class="ind-layers-header">
          <div class="ind-layers-eyebrow">Solution Framework</div>
          <h2 class="ind-layers-heading">Six Integrated <em>Layers</em> — Applied To Your Sector</h2>
          <p class="ind-layers-sub">
            Every industry we serve gets the same rigorous framework — adapted to the procurement structures, regulatory requirements, and operational realities of that sector. The layers don't change. The application does.
          </p>
        </div>

        <div class="ind-layers-strip">
          <a href="/solutions/strategy/" class="ind-layers-item">
            <div class="ind-layers-item-number">01</div>
            <div class="ind-layers-item-name">Strategy</div>
            <div class="ind-layers-item-desc">EIR, BEP, and digital delivery roadmaps that define how information flows before the first model opens.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>

          <a href="/solutions/structure/" class="ind-layers-item">
            <div class="ind-layers-item-number">02</div>
            <div class="ind-layers-item-name">Structure</div>
            <div class="ind-layers-item-desc">CDE configuration, naming conventions, LOD frameworks, and data architecture that govern every exchange.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>

          <a href="/solutions/intelligence/" class="ind-layers-item">
            <div class="ind-layers-item-number">03</div>
            <div class="ind-layers-item-name">Intelligence</div>
            <div class="ind-layers-item-desc">BIM production, clash detection, scan-to-BIM, and model quality scoring that build confidence in the data.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>

          <a href="/solutions/execution/" class="ind-layers-item">
            <div class="ind-layers-item-number">04</div>
            <div class="ind-layers-item-name">Execution</div>
            <div class="ind-layers-item-desc">4D scheduling, work packaging, and field deployment that connect the model to the construction site.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>

          <a href="/solutions/project-twin/" class="ind-layers-item">
            <div class="ind-layers-item-number">05</div>
            <div class="ind-layers-item-name">Project Twin</div>
            <div class="ind-layers-item-desc">As-built verification, COBie handover, and FM-ready digital twins that outlast the project itself.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>

          <a href="/solutions/insights/" class="ind-layers-item">
            <div class="ind-layers-item-number">06</div>
            <div class="ind-layers-item-name">Insights</div>
            <div class="ind-layers-item-desc">Dashboards, BIM auditing, 5D analytics, and compliance scorecards that turn data into decisions.</div>
            <div class="ind-layers-item-arrow">→</div>
          </a>
        </div>

        <div class="ind-layers-connector">
          <div class="ind-layers-connector-line">
            <div class="ind-layers-connector-label">Strategy → Insights · Full Lifecycle</div>
          </div>
        </div>

        <div class="ind-layers-link">
          <a href="/solutions/">Explore All Solutions <span>→</span></a>
        </div>
      </div>
    </section>
  `;

  const script = `
    (function() {
      var section = document.getElementById('ind-layers');
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
