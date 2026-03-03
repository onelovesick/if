'use client';

import { useEffect, useRef } from 'react';

export default function IndGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  const html = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet" />

    <style>
      .ind-grid-section {
        position: relative;
        background: #F2F5F8;
        padding: 120px 0 140px;
        overflow: hidden;
      }

      .ind-grid-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
      }

      /* Section header */
      .ind-grid-eyebrow {
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
      }

      .ind-grid-eyebrow::before {
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #47B5FF;
      }

      .ind-grid-heading {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: clamp(30px, 4vw, 48px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #0B3C5D;
        margin: 0 0 20px;
      }

      .ind-grid-heading em {
        font-style: italic;
        color: #47B5FF;
        margin-right: 0.08em;
      }

      .ind-grid-sub {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.75;
        color: #5a7a96;
        max-width: 620px;
        margin: 0 0 64px;
      }

      /* Grid */
      .ind-grid-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      /* Card */
      .ind-grid-card {
        position: relative;
        border-radius: 2px;
        overflow: hidden;
        min-height: 440px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
        opacity: 0;
        transform: translateY(32px);
      }

      .ind-grid-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 60px rgba(11,60,93,0.18);
      }

      /* Background image */
      .ind-grid-card-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        filter: grayscale(30%) contrast(1.05);
        transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
      }

      .ind-grid-card:hover .ind-grid-card-bg {
        transform: scale(1.05);
        filter: grayscale(10%) contrast(1.1);
      }

      /* Dark gradient overlay */
      .ind-grid-card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(28,31,35,0.97) 0%,
          rgba(28,31,35,0.85) 35%,
          rgba(28,31,35,0.5) 60%,
          rgba(28,31,35,0.25) 80%,
          rgba(28,31,35,0.15) 100%
        );
        z-index: 1;
        transition: background 0.5s ease;
      }

      .ind-grid-card:hover .ind-grid-card-overlay {
        background: linear-gradient(
          to top,
          rgba(28,31,35,0.95) 0%,
          rgba(28,31,35,0.8) 35%,
          rgba(28,31,35,0.4) 60%,
          rgba(28,31,35,0.15) 80%,
          rgba(28,31,35,0.08) 100%
        );
      }

      /* Blueprint grid on card */
      .ind-grid-card-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(71,181,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,181,255,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        z-index: 2;
        pointer-events: none;
      }

      /* Top accent line */
      .ind-grid-card-accent {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #47B5FF;
        z-index: 4;
        transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ind-grid-card:hover .ind-grid-card-accent {
        width: 100%;
      }

      /* Card content */
      .ind-grid-card-content {
        position: relative;
        z-index: 3;
        padding: 32px 28px;
      }

      .ind-grid-card-number {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #47B5FF;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ind-grid-card-number::after {
        content: '';
        flex: 1;
        height: 1px;
        background: rgba(71,181,255,0.2);
      }

      .ind-grid-card-tagline {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(71,181,255,0.7);
        margin-bottom: 10px;
      }

      .ind-grid-card-name {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 900;
        font-size: 22px;
        line-height: 1.15;
        letter-spacing: -0.01em;
        text-transform: uppercase;
        color: #F4F6F8;
        margin: 0 0 14px;
        transition: color 0.3s ease;
      }

      .ind-grid-card:hover .ind-grid-card-name {
        color: #fff;
      }

      .ind-grid-card-desc {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.7;
        color: #7a9bb5;
        margin: 0 0 20px;
      }

      .ind-grid-card-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #47B5FF;
        text-decoration: none;
        transition: gap 0.3s ease;
      }

      .ind-grid-card:hover .ind-grid-card-link {
        gap: 14px;
      }

      /* Reveal animations */
      .ind-grid-section.ind-revealed .ind-grid-card {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
      }

      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(1) { transition-delay: 0s; }
      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(2) { transition-delay: 0.1s; }
      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(3) { transition-delay: 0.2s; }
      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(4) { transition-delay: 0.3s; }
      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(5) { transition-delay: 0.4s; }
      .ind-grid-section.ind-revealed .ind-grid-card:nth-child(6) { transition-delay: 0.5s; }

      /* Corner bracket on section */
      .ind-grid-corner {
        position: absolute;
        width: 16px;
        height: 16px;
      }

      .ind-grid-corner-tl {
        top: 80px;
        left: 32px;
        border-top: 1px solid rgba(11,60,93,0.12);
        border-left: 1px solid rgba(11,60,93,0.12);
      }

      .ind-grid-corner-br {
        bottom: 80px;
        right: 32px;
        border-bottom: 1px solid rgba(11,60,93,0.12);
        border-right: 1px solid rgba(11,60,93,0.12);
      }

      /* Bottom stats bar */
      .ind-grid-bar {
        display: flex;
        justify-content: center;
        gap: 36px;
        margin-top: 56px;
        padding-top: 36px;
        border-top: 1px solid rgba(11,60,93,0.09);
      }

      .ind-grid-bar-item {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.12em;
        color: #5a7a96;
        text-transform: uppercase;
      }

      .ind-grid-bar-sep {
        color: rgba(11,60,93,0.2);
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .ind-grid-cards {
          grid-template-columns: repeat(2, 1fr);
        }

        .ind-grid-card {
          min-height: 380px;
        }
      }

      @media (max-width: 640px) {
        .ind-grid-section {
          padding: 80px 0 100px;
        }

        .ind-grid-container {
          padding: 0 20px;
        }

        .ind-grid-cards {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .ind-grid-card {
          min-height: 340px;
        }

        .ind-grid-bar {
          flex-wrap: wrap;
          gap: 12px 24px;
          justify-content: flex-start;
        }

        .ind-grid-bar-sep {
          display: none;
        }
      }
    </style>

    <section class="ind-grid-section" id="ind-grid">
      <div class="ind-grid-corner ind-grid-corner-tl"></div>
      <div class="ind-grid-corner ind-grid-corner-br"></div>

      <div class="ind-grid-container">
        <div class="ind-grid-eyebrow">Sectors We Serve</div>
        <h2 class="ind-grid-heading">Six Sectors. One <em>Framework</em>.</h2>
        <p class="ind-grid-sub">
          Each industry carries distinct procurement structures, regulatory demands, and operational lifecycles. We engineer digital delivery to match — not the other way around.
        </p>

        <div class="ind-grid-cards">

          <!-- 01 Heavy Civil -->
          <a href="/industries/heavy-civil/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">01</div>
              <div class="ind-grid-card-tagline">Corridor Programme Control</div>
              <h3 class="ind-grid-card-name">Heavy Civil &amp;<br/>Transportation</h3>
              <p class="ind-grid-card-desc">Linear assets spanning kilometres. Multi-contractor staging, phased handovers, and corridor-level coordination. Schedule complexity and geographic scale define the digital challenge.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

          <!-- 02 Mining -->
          <a href="/industries/mining/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">02</div>
              <div class="ind-grid-card-tagline">Asset Visibility at Scale</div>
              <h3 class="ind-grid-card-name">Mining &amp; Resource<br/>Extraction</h3>
              <p class="ind-grid-card-desc">Remote, distributed operations with phased development over decades. Production continuity, equipment reliability, and environmental compliance drive data requirements.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

          <!-- 03 Energy -->
          <a href="/industries/energy/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">03</div>
              <div class="ind-grid-card-tagline">Distributed Critical Assets</div>
              <h3 class="ind-grid-card-name">Energy, Renewable<br/>&amp; Utilities</h3>
              <p class="ind-grid-card-desc">Generation, transmission, and distribution networks across jurisdictions. Safety-critical documentation, regulatory reporting, and assets that must perform for 40+ years.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

          <!-- 04 Institutional -->
          <a href="/industries/institutional/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">04</div>
              <div class="ind-grid-card-tagline">Long-Lifecycle Buildings</div>
              <h3 class="ind-grid-card-name">Institutional &amp;<br/>Government</h3>
              <p class="ind-grid-card-desc">Hospitals, courthouses, universities, civic buildings. High compliance burden, public accountability, FM handover obligations, and 50+ year operational lifecycles.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

          <!-- 05 Industrial -->
          <a href="/industries/industrial/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">05</div>
              <div class="ind-grid-card-tagline">Operational Continuity</div>
              <h3 class="ind-grid-card-name">Industrial &amp; Heavy<br/>Manufacturing</h3>
              <p class="ind-grid-card-desc">Process plants, refineries, manufacturing facilities. Uptime is everything. Equipment-level traceability, commissioning data, and maintenance-ready documentation from day one.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

          <!-- 06 Commercial -->
          <a href="/industries/commercial/" class="ind-grid-card">
            <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75')"></div>
            <div class="ind-grid-card-overlay"></div>
            <div class="ind-grid-card-grid"></div>
            <div class="ind-grid-card-accent"></div>
            <div class="ind-grid-card-content">
              <div class="ind-grid-card-number">06</div>
              <div class="ind-grid-card-tagline">Portfolio-Scale Delivery</div>
              <h3 class="ind-grid-card-name">Commercial Real<br/>Estate &amp; Mixed-Use</h3>
              <p class="ind-grid-card-desc">Multi-tower developments, phased delivery, portfolio standardisation. Structured data reduces risk, accelerates approvals, and scales across buildings and stages.</p>
              <span class="ind-grid-card-link">Explore <span>→</span></span>
            </div>
          </a>

        </div>

        <div class="ind-grid-bar">
          <span class="ind-grid-bar-item">6 Industry Verticals</span>
          <span class="ind-grid-bar-sep">·</span>
          <span class="ind-grid-bar-item">Full Lifecycle Coverage</span>
          <span class="ind-grid-bar-sep">·</span>
          <span class="ind-grid-bar-item">ISO 19650 Aligned</span>
        </div>
      </div>
    </section>
  `;

  const script = `
    (function() {
      var section = document.getElementById('ind-grid');
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
