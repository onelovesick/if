'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ind-hero {
    position: relative;
    min-height: 100vh;
    background: #1C1F23;
    padding: 160px 32px 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* ── Background photo — aerial infrastructure ── */
  .ind-hero-photo {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80') center center / cover no-repeat;
    opacity: 0.06;
    filter: grayscale(50%) contrast(1.1);
    z-index: 0;
    pointer-events: none;
  }

  /* ── Atmospheric glow layers ── */
  .ind-hero-glow {
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

  .ind-hero-glow-accent {
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

  .ind-hero-glow-warm {
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

  /* ── Floating orbs ── */
  .ind-hero-orb {
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
    animation: indOrbFloat 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .ind-hero-orb-1 {
    top: 10%;
    right: 5%;
    animation-delay: 0s;
  }

  .ind-hero-orb-2 {
    bottom: 15%;
    left: 8%;
    width: 300px;
    height: 300px;
    animation-delay: -4s;
    animation-duration: 15s;
  }

  @keyframes indOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(20px, -30px) scale(1.05); opacity: 1; }
    66% { transform: translate(-15px, 15px) scale(0.95); opacity: 0.7; }
  }

  /* ── Scan line ── */
  .ind-hero-scan {
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
    animation: indScanDown 10s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes indScanDown {
    0% { top: -1px; }
    100% { top: 100%; }
  }

  /* ── Noise grain ── */
  .ind-hero-noise {
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
  .ind-hero-breadcrumb {
    position: absolute;
    top: 110px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 0;
    z-index: 5;
  }

  .ind-hero-breadcrumb a,
  .ind-hero-breadcrumb span.ind-crumb-current {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .ind-hero-breadcrumb a {
    color: #7a9bb5;
    transition: color 0.25s ease;
  }

  .ind-hero-breadcrumb a:hover {
    color: #47B5FF;
  }

  .ind-hero-breadcrumb span.ind-crumb-sep {
    color: rgba(71,181,255,0.3);
    margin: 0 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
  }

  .ind-hero-breadcrumb span.ind-crumb-current {
    color: #F4F6F8;
    font-weight: 500;
  }

  /* ── Decorative frame ── */
  .ind-hero-frame {
    position: absolute;
    inset: 48px;
    pointer-events: none;
    z-index: 1;
  }

  .ind-hero-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-top: 1px solid rgba(71,181,255,0.1);
    border-left: 1px solid rgba(71,181,255,0.1);
  }

  .ind-hero-frame::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    border-bottom: 1px solid rgba(71,181,255,0.1);
    border-right: 1px solid rgba(71,181,255,0.1);
  }

  /* ── Side labels ── */
  .ind-hero-side-label {
    position: absolute;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.12);
    z-index: 2;
    pointer-events: none;
  }

  .ind-hero-side-left {
    left: 40px;
    top: 50%;
    transform: rotate(-90deg) translateX(-50%);
    transform-origin: left center;
  }

  .ind-hero-side-right {
    right: 40px;
    top: 50%;
    transform: rotate(90deg) translateX(50%);
    transform-origin: right center;
  }

  /* ── Content ── */
  .ind-hero-inner {
    position: relative;
    z-index: 3;
    max-width: 900px;
    text-align: center;
  }

  .ind-hero-page-badge {
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

  .ind-hero-page-badge .ind-badge-line {
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3));
  }

  .ind-hero-page-badge .ind-badge-line:last-child {
    background: linear-gradient(90deg, rgba(71,181,255,0.3), transparent);
  }

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
    margin-bottom: 32px;
  }

  .ind-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .ind-hero h1 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(44px, 6vw, 74px);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 32px 0;
  }

  .ind-hero h1 em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ind-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: #7a9bb5;
    max-width: 620px;
    margin: 0 auto 48px;
  }

  .ind-hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .ind-hero-cta-accent {
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

  .ind-hero-cta-accent:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(71,181,255,0.25);
  }

  .ind-hero-cta-primary {
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

  .ind-hero-cta-primary:hover {
    background: #0B3C5D;
    border-color: #47B5FF;
  }

  /* ── Meta tags ── */
  .ind-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .ind-hero-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.5);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 6px 18px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }

  .ind-hero-tag:hover {
    border-color: rgba(71,181,255,0.25);
    color: rgba(122,155,181,0.7);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .ind-hero {
      padding: 140px 20px 80px;
    }
    .ind-hero-breadcrumb {
      top: 100px;
      left: 20px;
    }
    .ind-hero-frame {
      inset: 16px;
    }
    .ind-hero-side-label {
      display: none;
    }
    .ind-hero-orb {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .ind-hero-breadcrumb {
      font-size: 10px;
    }
    .ind-hero-meta {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<section class="ind-hero">

  <!-- Background photo -->
  <div class="ind-hero-photo"></div>

  <!-- Atmospheric layers -->
  <div class="ind-hero-glow"></div>
  <div class="ind-hero-glow-accent"></div>
  <div class="ind-hero-glow-warm"></div>
  <div class="ind-hero-orb ind-hero-orb-1"></div>
  <div class="ind-hero-orb ind-hero-orb-2"></div>
  <div class="ind-hero-scan"></div>
  <div class="ind-hero-noise"></div>

  <!-- Frame -->
  <div class="ind-hero-frame"></div>

  <!-- Side labels -->
  <div class="ind-hero-side-label ind-hero-side-left">6 Industry Verticals</div>
  <div class="ind-hero-side-label ind-hero-side-right">Infraforma · Industries</div>

  <!-- Breadcrumb -->
  <nav class="ind-hero-breadcrumb">
    <a href="/">Infraforma</a>
    <span class="ind-crumb-sep">·</span>
    <span class="ind-crumb-current">Industries</span>
  </nav>

  <!-- Content -->
  <div class="ind-hero-inner">
    <div class="ind-hero-page-badge">
      <span class="ind-badge-line"></span>
      06 SECTORS
      <span class="ind-badge-line"></span>
    </div>
    <div class="ind-hero-eyebrow">Industries We Serve</div>
    <h1>Infrastructure Spans<br><em>Industries</em> — So Do We</h1>
    <p class="ind-hero-sub">
      We’re civil engineers. We don’t adapt generic technology to construction — we engineer digital systems for it. Every sector carries different data requirements, procurement structures, regulatory frameworks, and operational lifecycles. Our six solution layers flex to each.
    </p>
    <div class="ind-hero-ctas">
      <a href="/solutions/" class="ind-hero-cta-accent">Explore Solutions →</a>
      <a href="/contact/" class="ind-hero-cta-primary">Schedule a Call →</a>
    </div>
    <div class="ind-hero-meta">
      <span class="ind-hero-tag">Heavy Civil</span>
      <span class="ind-hero-tag">Mining</span>
      <span class="ind-hero-tag">Energy &amp; Utilities</span>
      <span class="ind-hero-tag">Institutional</span>
      <span class="ind-hero-tag">Industrial</span>
      <span class="ind-hero-tag">Commercial</span>
    </div>
  </div>

</section>
`;

const script = `(function(){
  var hero = document.querySelector('.ind-hero');
  if (!hero) return;
  var orbs = hero.querySelectorAll('.ind-hero-orb');
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

export default function IndHero() {
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
