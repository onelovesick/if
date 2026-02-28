'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-hero {
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

  .intel-hero-glow {
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

  .intel-hero-glow-accent {
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

  .intel-hero-glow-warm {
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
  .intel-hero-orb {
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
    animation: intelOrbFloat 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .intel-hero-orb-1 {
    top: 10%;
    right: 5%;
    animation-delay: 0s;
  }

  .intel-hero-orb-2 {
    bottom: 15%;
    left: 8%;
    width: 300px;
    height: 300px;
    animation-delay: -4s;
    animation-duration: 15s;
  }

  @keyframes intelOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(20px, -30px) scale(1.05); opacity: 1; }
    66% { transform: translate(-15px, 15px) scale(0.95); opacity: 0.7; }
  }

  /* Scan line */
  .intel-hero-scan {
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
    animation: intelScanDown 10s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes intelScanDown {
    0% { top: -1px; }
    100% { top: 100%; }
  }

  /* Noise grain overlay */
  .intel-hero-noise {
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
  .intel-hero-breadcrumb {
    position: absolute;
    top: 110px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 0;
    z-index: 5;
  }

  .intel-hero-breadcrumb a,
  .intel-hero-breadcrumb span.intel-crumb-current {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .intel-hero-breadcrumb a {
    color: #7a9bb5;
    transition: color 0.25s ease;
  }

  .intel-hero-breadcrumb a:hover {
    color: #47B5FF;
  }

  .intel-hero-breadcrumb span.intel-crumb-sep {
    color: rgba(71,181,255,0.3);
    margin: 0 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
  }

  .intel-hero-breadcrumb span.intel-crumb-current {
    color: #F4F6F8;
    font-weight: 500;
  }

  /* ── Decorative frame ── */
  .intel-hero-frame {
    position: absolute;
    inset: 48px;
    pointer-events: none;
    z-index: 1;
  }

  .intel-hero-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-top: 1px solid rgba(71,181,255,0.1);
    border-left: 1px solid rgba(71,181,255,0.1);
  }

  .intel-hero-frame::after {
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
  .intel-hero-inner {
    position: relative;
    z-index: 3;
    max-width: 900px;
    text-align: center;
  }

  .intel-hero-layer-badge {
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

  .intel-hero-layer-badge .intel-badge-line {
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3));
  }

  .intel-hero-layer-badge .intel-badge-line:last-child {
    background: linear-gradient(90deg, rgba(71,181,255,0.3), transparent);
  }

  .intel-hero-eyebrow {
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

  .intel-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .intel-hero h1 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(44px, 6vw, 74px);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 32px 0;
  }

  .intel-hero h1 em {
    font-style: italic;
    color: #47B5FF;
  }

  .intel-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: #7a9bb5;
    max-width: 620px;
    margin: 0 auto 48px;
  }

  .intel-hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .intel-hero-cta-accent {
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

  .intel-hero-cta-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(71,181,255,0.25);
  }

  .intel-hero-cta-primary {
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

  .intel-hero-cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* Phase & ISO tags */
  .intel-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .intel-hero-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.5);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 6px 18px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }

  .intel-hero-tag:hover {
    border-color: rgba(71,181,255,0.25);
    color: rgba(122,155,181,0.7);
  }

  /* ── Vertical side labels ── */
  .intel-hero-side-label {
    position: absolute;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.12);
    z-index: 2;
    pointer-events: none;
  }

  .intel-hero-side-left {
    left: 40px;
    top: 50%;
    transform: rotate(-90deg) translateX(-50%);
    transform-origin: left center;
  }

  .intel-hero-side-right {
    right: 40px;
    top: 50%;
    transform: rotate(90deg) translateX(50%);
    transform-origin: right center;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .intel-hero {
      padding: 140px 20px 80px;
    }
    .intel-hero-breadcrumb {
      top: 100px;
      left: 20px;
    }
    .intel-hero-frame {
      inset: 16px;
    }
    .intel-hero-side-label {
      display: none;
    }
    .intel-hero-orb {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .intel-hero-breadcrumb {
      font-size: 10px;
    }
    .intel-hero-meta {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<section class="intel-hero">

  <!-- Atmospheric layers -->
  <div class="intel-hero-glow"></div>
  <div class="intel-hero-glow-accent"></div>
  <div class="intel-hero-glow-warm"></div>
  <div class="intel-hero-orb intel-hero-orb-1"></div>
  <div class="intel-hero-orb intel-hero-orb-2"></div>
  <div class="intel-hero-scan"></div>
  <div class="intel-hero-noise"></div>

  <!-- Frame -->
  <div class="intel-hero-frame"></div>

  <!-- Side labels -->
  <div class="intel-hero-side-label intel-hero-side-left">Solution Layer 03</div>
  <div class="intel-hero-side-label intel-hero-side-right">Infraforma \u00b7 Intelligence</div>

  <!-- Breadcrumb -->
  <nav class="intel-hero-breadcrumb">
    <a href="/">Infraforma</a>
    <span class="intel-crumb-sep">\u00b7</span>
    <a href="/solutions/">Solutions</a>
    <span class="intel-crumb-sep">\u00b7</span>
    <span class="intel-crumb-current">Intelligence</span>
  </nav>

  <!-- Content -->
  <div class="intel-hero-inner">
    <div class="intel-hero-layer-badge">
      <span class="intel-badge-line"></span>
      03 / 06
      <span class="intel-badge-line"></span>
    </div>
    <div class="intel-hero-eyebrow">Solution Layer \u00b7 Intelligence</div>
    <h1>Your Model Is Only As Good<br>As Its <em>Data</em></h1>
    <p class="intel-hero-sub">
      Rule-based validation, automated compliance checking, federated coordination, and reality capture \u2014 deployed so every model element carries classified parameters, verified quantities, and audit-grade information. We turn geometry into intelligence that surfaces risk before it becomes cost.
    </p>
    <div class="intel-hero-ctas">
      <a href="/contact/" class="intel-hero-cta-accent">Schedule a Call \u2192</a>
      <a href="/solutions/" class="intel-hero-cta-primary">All Solutions \u2192</a>
    </div>
    <div class="intel-hero-meta">
      <span class="intel-hero-tag">Clash-Free Coordination</span>
      <span class="intel-hero-tag">ISO 19650-2</span>
      <span class="intel-hero-tag">Platform-Agnostic</span>
    </div>
  </div>

</section>
`;

const script = `(function(){
  var hero = document.querySelector('.intel-hero');
  if (!hero) return;
  var orbs = hero.querySelectorAll('.intel-hero-orb');
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

export default function IntelligenceHero() {
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
