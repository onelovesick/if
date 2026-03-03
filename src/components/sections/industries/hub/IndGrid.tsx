'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ind-grid {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 130px;
    overflow: hidden;
  }

  .ind-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .ind-grid-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ══ Header ══ */
  .ind-grid-header {
    margin-bottom: 64px;
    max-width: 680px;
  }

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
    margin-bottom: 16px;
  }

  .ind-grid-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .ind-grid h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 20px 0;
  }

  .ind-grid h2 em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ind-grid-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #5a7a96;
  }

  /* ══ Cards grid ══ */
  .ind-grid-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* ══ Individual card ══ */
  .ind-grid-card {
    position: relative;
    min-height: 460px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Corner brackets — expand on hover */
  .ind-grid-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-top: 1px solid rgba(71,181,255,0.15);
    border-left: 1px solid rgba(71,181,255,0.15);
    z-index: 6;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ind-grid-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.15);
    border-right: 1px solid rgba(71,181,255,0.15);
    z-index: 6;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ind-grid-card:hover::before,
  .ind-grid-card:hover::after {
    width: 32px;
    height: 32px;
    border-color: rgba(71,181,255,0.5);
  }

  .ind-grid-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(11,60,93,0.22);
  }

  /* Background image layer */
  .ind-grid-card-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: grayscale(30%) contrast(1.05);
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease;
    z-index: 0;
  }

  .ind-grid-card:hover .ind-grid-card-bg {
    transform: scale(1.08);
    filter: grayscale(10%) contrast(1.1);
  }

  /* Dark gradient overlay */
  .ind-grid-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(28,31,35,0.97) 0%,
      rgba(28,31,35,0.88) 30%,
      rgba(28,31,35,0.55) 55%,
      rgba(28,31,35,0.25) 75%,
      rgba(28,31,35,0.12) 100%
    );
    z-index: 1;
    transition: background 0.5s ease;
  }

  .ind-grid-card:hover .ind-grid-card-overlay {
    background: linear-gradient(
      to top,
      rgba(28,31,35,0.95) 0%,
      rgba(28,31,35,0.82) 30%,
      rgba(28,31,35,0.42) 55%,
      rgba(28,31,35,0.12) 75%,
      rgba(28,31,35,0.04) 100%
    );
  }

  /* Blueprint grid — brightens on hover */
  .ind-grid-card-gridtex {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.5s ease;
    opacity: 1;
  }

  .ind-grid-card:hover .ind-grid-card-gridtex {
    background-image:
      linear-gradient(rgba(71,181,255,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.07) 1px, transparent 1px);
  }

  /* Diagonal scan line — disabled */
  .ind-grid-card-scanline {
    display: none;
  }

  /* Radial hover glow — powers up on hover */
  .ind-grid-card-glow {
    position: absolute;
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 70%;
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(71,181,255,0.0) 0%,
      transparent 70%
    );
    z-index: 2;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ind-grid-card:hover .ind-grid-card-glow {
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(71,181,255,0.1) 0%,
      rgba(71,181,255,0.03) 40%,
      transparent 70%
    );
  }

  /* Top accent line */
  .ind-grid-card-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.3));
    z-index: 7;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ind-grid-card:hover .ind-grid-card-accent {
    width: 100%;
  }

  /* ══ Card content ══ */
  .ind-grid-card-content {
    position: relative;
    z-index: 4;
    padding: 32px 28px;
  }

  .ind-grid-card-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.6);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ind-grid-card-number::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(71,181,255,0.15);
    transition: background 0.3s ease;
  }

  .ind-grid-card:hover .ind-grid-card-number::after {
    background: rgba(71,181,255,0.3);
  }

  .ind-grid-card-tagline {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.55);
    margin-bottom: 10px;
    transition: color 0.3s ease;
  }

  .ind-grid-card:hover .ind-grid-card-tagline {
    color: rgba(71,181,255,0.8);
  }

  /* Title with gradient sweep on hover */
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
    background: linear-gradient(90deg, #F4F6F8 0%, #3a8fc2 55%, #0B3C5D 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ind-grid-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 300;
    line-height: 1.7;
    color: #7a9bb5;
    margin: 0 0 20px;
  }

  .ind-grid-card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.5);
    text-decoration: none;
    transition: color 0.3s ease, gap 0.3s ease;
  }

  .ind-grid-card:hover .ind-grid-card-link {
    color: #47B5FF;
    gap: 12px;
  }

  /* ══ Bottom trust bar ══ */
  .ind-grid-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
    margin-top: 56px;
    padding-top: 36px;
    border-top: 1px solid rgba(11,60,93,0.08);
  }

  .ind-grid-bar-item {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.5);
  }

  .ind-grid-bar-item span {
    color: rgba(90,122,150,0.7);
    font-weight: 500;
  }

  /* ══ Responsive ══ */
  @media (max-width: 1080px) {
    .ind-grid-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    .ind-grid-card {
      min-height: 400px;
    }
  }

  @media (max-width: 640px) {
    .ind-grid {
      padding: 80px 20px 100px;
    }
    .ind-grid-cards {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .ind-grid-card {
      min-height: 360px;
    }
    .ind-grid-bar {
      gap: 16px;
      justify-content: flex-start;
    }
  }
</style>

<section class="ind-grid">
  <div class="ind-grid-inner">

    <div class="ind-grid-header" id="ind-grid-header">
      <div class="ind-grid-eyebrow">Sectors We Serve</div>
      <h2>Six Sectors. One <em>Framework</em>.</h2>
      <p class="ind-grid-sub">
        Each industry carries distinct procurement structures, regulatory demands, and operational lifecycles. We engineer digital delivery to match \u2014 not the other way around.
      </p>
    </div>

    <div class="ind-grid-cards">

      <a href="/industries/heavy-civil/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">01</div>
          <div class="ind-grid-card-tagline">Corridor Programme Control</div>
          <h3 class="ind-grid-card-name">Heavy Civil &amp;<br>Transportation</h3>
          <p class="ind-grid-card-desc">Linear assets spanning kilometres. Multi-contractor staging, phased handovers, and corridor-level coordination. Schedule complexity and geographic scale define the digital challenge.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

      <a href="/industries/mining/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">02</div>
          <div class="ind-grid-card-tagline">Asset Visibility at Scale</div>
          <h3 class="ind-grid-card-name">Mining &amp; Resource<br>Extraction</h3>
          <p class="ind-grid-card-desc">Remote, distributed operations with phased development over decades. Production continuity, equipment reliability, and environmental compliance drive data requirements.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

      <a href="/industries/energy/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">03</div>
          <div class="ind-grid-card-tagline">Distributed Critical Assets</div>
          <h3 class="ind-grid-card-name">Energy, Renewable<br>&amp; Utilities</h3>
          <p class="ind-grid-card-desc">Generation, transmission, and distribution networks across jurisdictions. Safety-critical documentation, regulatory reporting, and assets that must perform for 40+ years.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

      <a href="/industries/institutional/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">04</div>
          <div class="ind-grid-card-tagline">Long-Lifecycle Buildings</div>
          <h3 class="ind-grid-card-name">Institutional &amp;<br>Government</h3>
          <p class="ind-grid-card-desc">Hospitals, courthouses, universities, civic buildings. High compliance burden, public accountability, FM handover obligations, and 50+ year operational lifecycles.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

      <a href="/industries/industrial/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">05</div>
          <div class="ind-grid-card-tagline">Operational Continuity</div>
          <h3 class="ind-grid-card-name">Industrial &amp; Heavy<br>Manufacturing</h3>
          <p class="ind-grid-card-desc">Process plants, refineries, manufacturing facilities. Uptime is everything. Equipment-level traceability, commissioning data, and maintenance-ready documentation from day one.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

      <a href="/industries/commercial/" class="ind-grid-card" data-ind-card>
        <div class="ind-grid-card-bg" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75')"></div>
        <div class="ind-grid-card-overlay"></div>
        <div class="ind-grid-card-gridtex"></div>
        <div class="ind-grid-card-scanline"></div>
        <div class="ind-grid-card-glow"></div>
        <div class="ind-grid-card-accent"></div>
        <div class="ind-grid-card-content">
          <div class="ind-grid-card-number">06</div>
          <div class="ind-grid-card-tagline">Portfolio-Scale Delivery</div>
          <h3 class="ind-grid-card-name">Commercial Real<br>Estate &amp; Mixed-Use</h3>
          <p class="ind-grid-card-desc">Multi-tower developments, phased delivery, portfolio standardisation. Structured data reduces risk, accelerates approvals, and scales across buildings and stages.</p>
          <span class="ind-grid-card-link">Explore \u2192</span>
        </div>
      </a>

    </div>

    <div class="ind-grid-bar">
      <div class="ind-grid-bar-item"><span>6</span> Industry Verticals</div>
      <div class="ind-grid-bar-item"><span>ISO 19650</span> Aligned</div>
      <div class="ind-grid-bar-item"><span>Full Lifecycle</span> Coverage</div>
      <div class="ind-grid-bar-item"><span>Platform</span> Agnostic</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var header = document.getElementById('ind-grid-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(header);
  }

  var cards = document.querySelectorAll('[data-ind-card]');
  cards.forEach(function(c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            c.style.transition = 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(c);
  });
})();`;

export default function IndGrid() {
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
