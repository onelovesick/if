'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-hero {
    position: relative;
    min-height: 100vh;
    background: #1C1F23;
    padding: 160px 32px 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* ── Atmospheric background layers ── */

  .twin-hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 140%;
    background: radial-gradient(
      ellipse 60% 50% at 50% 45%,
      rgba(11,60,93,0.55) 0%,
      rgba(11,60,93,0.2) 35%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  .twin-hero-glow-accent {
    position: absolute;
    top: -15%;
    right: -10%;
    width: 70%;
    height: 70%;
    background: radial-gradient(
      ellipse at 70% 30%,
      rgba(71,181,255,0.08) 0%,
      rgba(71,181,255,0.03) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  .twin-hero-glow-warm {
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 60%;
    height: 60%;
    background: radial-gradient(
      ellipse at 30% 70%,
      rgba(11,60,93,0.3) 0%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* Floating orbs */
  .twin-hero-orb {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(71,181,255,0.06) 0%,
      rgba(71,181,255,0.02) 40%,
      transparent 70%
    );
    animation: twinOrbFloat 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .twin-hero-orb-1 {
    top: 10%;
    right: 5%;
    animation-delay: 0s;
  }

  .twin-hero-orb-2 {
    bottom: 15%;
    left: 8%;
    width: 300px;
    height: 300px;
    animation-delay: -4s;
    animation-duration: 15s;
  }

  @keyframes twinOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(20px, -30px) scale(1.05); opacity: 1; }
    66% { transform: translate(-15px, 15px) scale(0.95); opacity: 0.7; }
  }

  /* Scan line */
  .twin-hero-scan {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(71,181,255,0.06) 20%,
      rgba(71,181,255,0.18) 50%,
      rgba(71,181,255,0.06) 80%,
      transparent 100%
    );
    animation: twinScanDown 10s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes twinScanDown {
    0% { top: -1px; }
    100% { top: 100%; }
  }

  /* Noise grain overlay */
  .twin-hero-noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Breadcrumb ── */
  .twin-hero-breadcrumb {
    position: absolute;
    top: 110px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 0;
    z-index: 5;
  }

  .twin-hero-breadcrumb a,
  .twin-hero-breadcrumb span.twin-crumb-current {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .twin-hero-breadcrumb a {
    color: #7a9bb5;
    transition: color 0.25s ease;
  }

  .twin-hero-breadcrumb a:hover {
    color: #47B5FF;
  }

  .twin-hero-breadcrumb span.twin-crumb-sep {
    color: rgba(71,181,255,0.3);
    margin: 0 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
  }

  .twin-hero-breadcrumb span.twin-crumb-current {
    color: #F4F6F8;
    font-weight: 500;
  }

  /* ── Decorative frame ── */
  .twin-hero-frame {
    position: absolute;
    inset: 48px;
    pointer-events: none;
    z-index: 1;
  }

  .twin-hero-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-top: 1px solid rgba(71,181,255,0.1);
    border-left: 1px solid rgba(71,181,255,0.1);
  }

  .twin-hero-frame::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    border-bottom: 1px solid rgba(71,181,255,0.1);
    border-right: 1px solid rgba(71,181,255,0.1);
  }

  /* ── Content ── */
  .twin-hero-inner {
    position: relative;
    z-index: 3;
    max-width: 900px;
    text-align: center;
  }

  .twin-hero-layer-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: rgba(71,181,255,0.35);
    margin-bottom: 24px;
  }

  .twin-hero-layer-badge .twin-badge-line {
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3));
  }

  .twin-hero-layer-badge .twin-badge-line:last-child {
    background: linear-gradient(90deg, rgba(71,181,255,0.3), transparent);
  }

  .twin-hero-eyebrow {
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

  .twin-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .twin-hero h1 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(44px, 6vw, 74px);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 32px 0;
  }

  .twin-hero h1 em {
    font-style: italic;
    color: #47B5FF;
  }

  .twin-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: #7a9bb5;
    max-width: 620px;
    margin: 0 auto 48px;
  }

  .twin-hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .twin-hero-cta-accent {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1C1F23;
    background: #47B5FF;
    border: 1px solid #47B5FF;
    padding: 15px 36px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .twin-hero-cta-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(71,181,255,0.25);
  }

  .twin-hero-cta-primary {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F4F6F8;
    background: transparent;
    border: 1px solid rgba(71,181,255,0.3);
    padding: 15px 36px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .twin-hero-cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* Phase & ISO tags */
  .twin-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .twin-hero-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.5);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 6px 18px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }

  .twin-hero-tag:hover {
    border-color: rgba(71,181,255,0.25);
    color: rgba(122,155,181,0.7);
  }

  /* ── Vertical side labels ── */
  .twin-hero-side-label {
    position: absolute;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.12);
    z-index: 2;
    pointer-events: none;
  }

  .twin-hero-side-left {
    left: 40px;
    top: 50%;
    transform: rotate(-90deg) translateX(-50%);
    transform-origin: left center;
  }

  .twin-hero-side-right {
    right: 40px;
    top: 50%;
    transform: rotate(90deg) translateX(50%);
    transform-origin: right center;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .twin-hero {
      padding: 140px 20px 80px;
    }
    .twin-hero-breadcrumb {
      top: 100px;
      left: 20px;
    }
    .twin-hero-frame {
      inset: 16px;
    }
    .twin-hero-side-label {
      display: none;
    }
    .twin-hero-orb {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .twin-hero-breadcrumb {
      font-size: 10px;
    }
    .twin-hero-meta {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<section class="twin-hero">

  <!-- Atmospheric layers -->
  <div class="twin-hero-glow"></div>
  <div class="twin-hero-glow-accent"></div>
  <div class="twin-hero-glow-warm"></div>
  <div class="twin-hero-orb twin-hero-orb-1"></div>
  <div class="twin-hero-orb twin-hero-orb-2"></div>
  <div class="twin-hero-scan"></div>
  <div class="twin-hero-noise"></div>

  <!-- Frame -->
  <div class="twin-hero-frame"></div>

  <!-- Side labels -->
  <div class="twin-hero-side-label twin-hero-side-left">Solution Layer 05</div>
  <div class="twin-hero-side-label twin-hero-side-right">Infraforma \u00b7 Project Twin</div>

  <!-- Breadcrumb -->
  <nav class="twin-hero-breadcrumb">
    <a href="/">Infraforma</a>
    <span class="twin-crumb-sep">\u00b7</span>
    <a href="/solutions/">Solutions</a>
    <span class="twin-crumb-sep">\u00b7</span>
    <span class="twin-crumb-current">Project Twin</span>
  </nav>

  <!-- Content -->
  <div class="twin-hero-inner">
    <div class="twin-hero-layer-badge">
      <span class="twin-badge-line"></span>
      05 / 06
      <span class="twin-badge-line"></span>
    </div>
    <div class="twin-hero-eyebrow">Solution Layer \u00b7 Project Twin</div>
    <h1>The Project Ends.<br>The Asset <em>Doesn\u2019t</em></h1>
    <p class="twin-hero-sub">
      As-built model verification, structured asset information, COBie-compliant datasets, and FM-ready digital twin configuration \u2014 delivered through a handover framework that transforms construction data into the operational backbone your facilities team will depend on for decades. What gets handed over defines what gets maintained.
    </p>
    <div class="twin-hero-ctas">
      <a href="/contact/" class="twin-hero-cta-accent">Schedule a Call \u2192</a>
      <a href="/solutions/" class="twin-hero-cta-primary">All Solutions \u2192</a>
    </div>
    <div class="twin-hero-meta">
      <span class="twin-hero-tag">As-Built Verification</span>
      <span class="twin-hero-tag">COBie &amp; ISO 19650-3</span>
      <span class="twin-hero-tag">FM-Ready Handover</span>
    </div>
  </div>

</section>
`;

const script = `(function(){
  var hero = document.querySelector('.twin-hero');
  if (!hero) return;
  var orbs = hero.querySelectorAll('.twin-hero-orb');
  hero.addEventListener('mousemove', function(e) {
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    orbs.forEach(function(orb, i) {
      var factor = (i + 1) * 18;
      orb.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
    });
  });
})();`;

export default function TwinHero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const s = document.createElement('script');
    s.textContent = script;
    el.appendChild(s);
    return () => { obs.disconnect(); if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
