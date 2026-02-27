'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-hero {
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

  .stru-hero-glow {
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

  .stru-hero-glow-accent {
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

  .stru-hero-glow-warm {
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
  .stru-hero-orb {
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
    animation: struOrbFloat 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .stru-hero-orb-1 {
    top: 10%;
    right: 5%;
    animation-delay: 0s;
  }

  .stru-hero-orb-2 {
    bottom: 15%;
    left: 8%;
    width: 300px;
    height: 300px;
    animation-delay: -4s;
    animation-duration: 15s;
  }

  @keyframes struOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(20px, -30px) scale(1.05); opacity: 1; }
    66% { transform: translate(-15px, 15px) scale(0.95); opacity: 0.7; }
  }

  /* Scan line */
  .stru-hero-scan {
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
    animation: struScanDown 10s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes struScanDown {
    0% { top: -1px; }
    100% { top: 100%; }
  }

  /* Noise grain overlay */
  .stru-hero-noise {
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
  .stru-hero-breadcrumb {
    position: absolute;
    top: 110px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 0;
    z-index: 5;
  }

  .stru-hero-breadcrumb a,
  .stru-hero-breadcrumb span.stru-crumb-current {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .stru-hero-breadcrumb a {
    color: #7a9bb5;
    transition: color 0.25s ease;
  }

  .stru-hero-breadcrumb a:hover {
    color: #47B5FF;
  }

  .stru-hero-breadcrumb span.stru-crumb-sep {
    color: rgba(71,181,255,0.3);
    margin: 0 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
  }

  .stru-hero-breadcrumb span.stru-crumb-current {
    color: #F4F6F8;
    font-weight: 500;
  }

  /* ── Decorative frame ── */
  .stru-hero-frame {
    position: absolute;
    inset: 48px;
    pointer-events: none;
    z-index: 1;
  }

  .stru-hero-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-top: 1px solid rgba(71,181,255,0.1);
    border-left: 1px solid rgba(71,181,255,0.1);
  }

  .stru-hero-frame::after {
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
  .stru-hero-inner {
    position: relative;
    z-index: 3;
    max-width: 900px;
    text-align: center;
  }

  .stru-hero-layer-badge {
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

  .stru-hero-layer-badge .stru-badge-line {
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3));
  }

  .stru-hero-layer-badge .stru-badge-line:last-child {
    background: linear-gradient(90deg, rgba(71,181,255,0.3), transparent);
  }

  .stru-hero-eyebrow {
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

  .stru-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .stru-hero h1 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(44px, 6vw, 74px);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 32px 0;
  }

  .stru-hero h1 em {
    font-style: italic;
    color: #47B5FF;
  }

  .stru-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: #7a9bb5;
    max-width: 620px;
    margin: 0 auto 48px;
  }

  .stru-hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .stru-hero-cta-accent {
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

  .stru-hero-cta-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(71,181,255,0.25);
  }

  .stru-hero-cta-primary {
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

  .stru-hero-cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* Phase & ISO tags */
  .stru-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .stru-hero-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.5);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 6px 18px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }

  .stru-hero-tag:hover {
    border-color: rgba(71,181,255,0.25);
    color: rgba(122,155,181,0.7);
  }

  /* ── Vertical side labels ── */
  .stru-hero-side-label {
    position: absolute;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.12);
    z-index: 2;
    pointer-events: none;
  }

  .stru-hero-side-left {
    left: 40px;
    top: 50%;
    transform: rotate(-90deg) translateX(-50%);
    transform-origin: left center;
  }

  .stru-hero-side-right {
    right: 40px;
    top: 50%;
    transform: rotate(90deg) translateX(50%);
    transform-origin: right center;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .stru-hero {
      padding: 140px 20px 80px;
    }
    .stru-hero-breadcrumb {
      top: 100px;
      left: 20px;
    }
    .stru-hero-frame {
      inset: 16px;
    }
    .stru-hero-side-label {
      display: none;
    }
    .stru-hero-orb {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .stru-hero-breadcrumb {
      font-size: 10px;
    }
    .stru-hero-meta {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<section class="stru-hero">

  <!-- Atmospheric layers -->
  <div class="stru-hero-glow"></div>
  <div class="stru-hero-glow-accent"></div>
  <div class="stru-hero-glow-warm"></div>
  <div class="stru-hero-orb stru-hero-orb-1"></div>
  <div class="stru-hero-orb stru-hero-orb-2"></div>
  <div class="stru-hero-scan"></div>
  <div class="stru-hero-noise"></div>

  <!-- Frame -->
  <div class="stru-hero-frame"></div>

  <!-- Side labels -->
  <div class="stru-hero-side-label stru-hero-side-left">Solution Layer 02</div>
  <div class="stru-hero-side-label stru-hero-side-right">Infraforma · Structure</div>

  <!-- Breadcrumb -->
  <nav class="stru-hero-breadcrumb">
    <a href="/">Infraforma</a>
    <span class="stru-crumb-sep">·</span>
    <a href="/solutions/">Solutions</a>
    <span class="stru-crumb-sep">·</span>
    <span class="stru-crumb-current">Structure</span>
  </nav>

  <!-- Content -->
  <div class="stru-hero-inner">
    <div class="stru-hero-layer-badge">
      <span class="stru-badge-line"></span>
      02 / 06
      <span class="stru-badge-line"></span>
    </div>
    <div class="stru-hero-eyebrow">Solution Layer · Structure</div>
    <h1>Organise The <em>Architecture</em><br>Before The First Exchange</h1>
    <p class="stru-hero-sub">
      CDE configuration, naming conventions, classification mapping, and LOD/LOI frameworks — engineered before the first model is shared. Structure is the layer that makes every file findable, every exchange reliable, and every dataset contractually defensible.
    </p>
    <div class="stru-hero-ctas">
      <a href="/contact/" class="stru-hero-cta-accent">Schedule a Call →</a>
      <a href="/solutions/" class="stru-hero-cta-primary">All Solutions →</a>
    </div>
    <div class="stru-hero-meta">
      <span class="stru-hero-tag">ISO 19650-2</span>
      <span class="stru-hero-tag">Design &amp; Construction Phases</span>
      <span class="stru-hero-tag">Platform-Agnostic</span>
    </div>
  </div>

</section>
`;

const script = `(function(){
  var hero = document.querySelector('.stru-hero');
  if (!hero) return;
  var orbs = hero.querySelectorAll('.stru-hero-orb');
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
