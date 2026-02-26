'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&amp;family=Inter+Tight:ital,wght@0,100..900;1,100..900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
<style>
.sol-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #1C1F23;
  overflow: hidden;
}

/* ── Rich gradient background instead of grid ── */
.sol-hero .bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 70% 45%, rgba(11,60,93,0.55) 0%, transparent 65%),
    radial-gradient(ellipse 50% 45% at 25% 55%, rgba(11,60,93,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 35% 35% at 65% 30%, rgba(71,181,255,0.07) 0%, transparent 50%),
    radial-gradient(ellipse 40% 50% at 50% 85%, rgba(11,60,93,0.3) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Subtle noise texture overlay */
.sol-hero .noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

.sol-hero .vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 35%, rgba(28,31,35,0.6) 100%);
  pointer-events: none;
  z-index: 1;
}

/* Scan line */
.sol-hero .scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.5), transparent);
  opacity: 0.15;
  animation: heroScan 8s linear infinite;
  pointer-events: none;
  z-index: 3;
}
@keyframes heroScan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Corner brackets */
.sol-hero .bracket-tl {
  position: absolute;
  top: 100px; left: 40px;
  width: 44px; height: 44px;
  border-top: 1px solid rgba(71,181,255,0.25);
  border-left: 1px solid rgba(71,181,255,0.25);
  z-index: 4;
}
.sol-hero .bracket-br {
  position: absolute;
  bottom: 80px; right: 40px;
  width: 44px; height: 44px;
  border-bottom: 1px solid rgba(71,181,255,0.25);
  border-right: 1px solid rgba(71,181,255,0.25);
  z-index: 4;
}
.sol-hero .side-label {
  position: absolute;
  right: 44px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.25;
  z-index: 4;
  white-space: nowrap;
}

/* ── Content layout ── */
.sol-hero-content {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  width: 100%;
}
.sol-hero-left {
  max-width: 540px;
  flex-shrink: 0;
}
.sol-hero .eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #47B5FF;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.sol-hero .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-hero h1 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 5vw, 66px);
  line-height: 1.04;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 24px;
}
.sol-hero h1 em { font-style: italic; color: #47B5FF; }
.sol-hero .hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: #7a9bb5;
  max-width: 480px;
  margin-bottom: 36px;
}
.sol-hero .hero-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #7a9bb5;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.55;
}
.sol-hero .hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.sol-hero .btn-accent {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-size: 12px;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 14px 28px; border: none; color: #fff;
  background: #47B5FF; cursor: pointer;
  transition: all 0.35s ease; text-decoration: none;
}
.sol-hero .btn-accent:hover { background: #3aa0e6; transform: translateY(-1px); }
.sol-hero .btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-size: 12px;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 14px 28px; border: 1px solid rgba(71,181,255,0.18);
  color: #F4F6F8; background: transparent; cursor: pointer;
  transition: all 0.4s ease; text-decoration: none;
}
.sol-hero .btn-primary:hover { background: #0B3C5D; border-color: #47B5FF; color: #fff; }

/* ════════════════════════════════════════
   ORBITAL RING — right side
   ════════════════════════════════════════ */
.sol-hero-right {
  flex-shrink: 0;
  width: 480px;
  height: 480px;
  position: relative;
}
.orbit-wrapper {
  position: absolute;
  inset: 0;
}

/* Central logo */
.orbit-center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  text-align: center;
}
.orbit-logo-ring {
  width: 110px; height: 110px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(28,31,35,0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: relative;
}
.orbit-logo-ring::before {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.08);
}
.orbit-logo-ring::after {
  content: '';
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.04);
}
.orbit-logo-text {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #F4F6F8;
}
.orbit-logo-sub {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.12em;
  color: #47B5FF;
  opacity: 0.7;
  margin-top: 3px;
  text-transform: uppercase;
}

/* Orbit rings (CSS only) */
.orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.08);
  top: 50%; left: 50%;
}
.orbit-ring-1 {
  width: 260px; height: 260px;
  margin-top: -130px; margin-left: -130px;
  animation: orbitSpin1 45s linear infinite;
}
.orbit-ring-2 {
  width: 380px; height: 380px;
  margin-top: -190px; margin-left: -190px;
  border-style: dashed;
  border-color: rgba(71,181,255,0.06);
  animation: orbitSpin2 60s linear infinite reverse;
}
.orbit-ring-3 {
  width: 460px; height: 460px;
  margin-top: -230px; margin-left: -230px;
  border-color: rgba(71,181,255,0.04);
  animation: orbitSpin3 80s linear infinite;
}

@keyframes orbitSpin1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes orbitSpin2 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes orbitSpin3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Tech icons on orbits */
.orbit-node {
  position: absolute;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(28,31,35,0.85);
  border: 1px solid rgba(71,181,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.4s ease;
  /* counter-rotate to stay upright */
}
.orbit-ring-1 .orbit-node { animation: counterSpin1 45s linear infinite; }
.orbit-ring-2 .orbit-node { animation: counterSpin2 60s linear infinite reverse; }
.orbit-ring-3 .orbit-node { animation: counterSpin3 80s linear infinite; }

@keyframes counterSpin1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
@keyframes counterSpin2 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
@keyframes counterSpin3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }

.orbit-node:hover {
  border-color: rgba(71,181,255,0.5);
  box-shadow: 0 0 20px rgba(71,181,255,0.15);
  transform: scale(1.1) !important;
}
.orbit-node .node-text {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800;
  font-size: 9px;
  color: #F4F6F8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
  line-height: 1.1;
}
.orbit-node .node-text.accent { color: #47B5FF; }
.orbit-node .node-text.small { font-size: 7px; font-family: 'DM Mono', monospace; font-weight: 400; letter-spacing: 0.06em; }

/* Large nodes */
.orbit-node.lg {
  width: 56px; height: 56px;
}

/* Ambient glow behind orbit */
.orbit-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 350px; height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71,181,255,0.06) 0%, rgba(11,60,93,0.08) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Positioning nodes around the rings using top/left + translate */
/* Ring 1 (r=130): 4 nodes */
.orbit-ring-1 .n1 { top: 0; left: 50%; transform: translate(-50%, -50%); }
.orbit-ring-1 .n2 { top: 50%; right: 0; transform: translate(50%, -50%); }
.orbit-ring-1 .n3 { bottom: 0; left: 50%; transform: translate(-50%, 50%); }
.orbit-ring-1 .n4 { top: 50%; left: 0; transform: translate(-50%, -50%); }

/* Ring 2 (r=190): 4 nodes */
.orbit-ring-2 .n5 { top: 10%; right: 5%; transform: translate(50%, -50%); }
.orbit-ring-2 .n6 { bottom: 10%; right: 5%; transform: translate(50%, 50%); }
.orbit-ring-2 .n7 { bottom: 10%; left: 5%; transform: translate(-50%, 50%); }
.orbit-ring-2 .n8 { top: 10%; left: 5%; transform: translate(-50%, -50%); }

/* Ring 3 (r=230): 4 nodes */
.orbit-ring-3 .n9 { top: 3%; left: 50%; transform: translate(-50%, -50%); }
.orbit-ring-3 .n10 { top: 50%; right: 0; transform: translate(50%, -50%); }
.orbit-ring-3 .n11 { bottom: 3%; left: 50%; transform: translate(-50%, 50%); }
.orbit-ring-3 .n12 { top: 50%; left: 0; transform: translate(-50%, -50%); }

/* Scroll indicator */
.sol-hero .scroll-indicator {
  position: absolute;
  bottom: 36px; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  z-index: 5;
}
.sol-hero .scroll-indicator span {
  font-family: 'DM Mono', monospace; font-size: 9px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: #7a9bb5; opacity: 0.5;
}
.sol-hero .scroll-line {
  width: 1px; height: 32px;
  background: #47B5FF; opacity: 0.3;
  animation: scrollP 2s ease-in-out infinite;
}
@keyframes scrollP {
  0%, 100% { opacity: 0.15; transform: scaleY(0.6); }
  50% { opacity: 0.4; transform: scaleY(1); }
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .sol-hero .side-label { display: none; }
  .sol-hero-content {
    flex-direction: column; text-align: left;
    padding-top: 130px; padding-bottom: 100px;
  }
  .sol-hero-right { width: 400px; height: 400px; margin: 0 auto; }
}
@media (max-width: 640px) {
  .sol-hero-content { padding: 130px 20px 100px; }
  .sol-hero-right { width: 320px; height: 320px; }
  .sol-hero h1 { font-size: clamp(32px, 8vw, 48px); }
  .orbit-node { width: 38px; height: 38px; }
  .orbit-node.lg { width: 44px; height: 44px; }
  .orbit-node .node-text { font-size: 7px; }
  .orbit-node .node-text.small { font-size: 6px; }
  .orbit-logo-ring { width: 90px; height: 90px; }
}
</style>

<section class="sol-hero">
  <div class="bg-gradient"></div>
  <div class="noise-overlay"></div>
  <div class="vignette"></div>
  <div class="scan-line"></div>
  <div class="bracket-tl"></div>
  <div class="bracket-br"></div>
  <div class="side-label">Solutions · Digital Infrastructure</div>

  <div class="sol-hero-content">
    <div class="sol-hero-left">
      <div class="eyebrow">End-to-End Digital Delivery</div>
      <h1>Digital Tools.<br/><em>Structured</em><br/>Outcomes.</h1>
      <p class="hero-sub">
        Platform-agnostic by design. We connect the industry's best technology around one controlled framework — so every tool in your ecosystem works harder, together.
      </p>
      <div class="hero-meta">ISO 19650 · BIM · CDE · Digital Twin · 4D/5D</div>
      <div class="hero-ctas">
        <a href="/contact/" class="btn-accent">Schedule a Discovery Call</a>
        <a href="/process/" class="btn-primary">Our Process →</a>
      </div>
    </div>

    <div class="sol-hero-right">
      <div class="orbit-wrapper">
        <div class="orbit-glow"></div>

        <!-- Center logo -->
        <div class="orbit-center">
          <div class="orbit-logo-ring">
            <div>
              <div class="orbit-logo-text">Infraforma</div>
              <div class="orbit-logo-sub">Solutions</div>
            </div>
          </div>
        </div>

        <!-- Ring 1: Inner — Core platforms -->
        <div class="orbit-ring orbit-ring-1">
          <div class="orbit-node lg n1">
            <span class="node-text">Revit</span>
          </div>
          <div class="orbit-node n2">
            <span class="node-text small">ACC</span>
          </div>
          <div class="orbit-node lg n3">
            <span class="node-text">Procore</span>
          </div>
          <div class="orbit-node n4">
            <span class="node-text small">iTwin</span>
          </div>
        </div>

        <!-- Ring 2: Mid — Secondary tools -->
        <div class="orbit-ring orbit-ring-2">
          <div class="orbit-node n5">
            <span class="node-text">Navis</span>
          </div>
          <div class="orbit-node lg n6">
            <span class="node-text accent">Power<br/>BI</span>
          </div>
          <div class="orbit-node n7">
            <span class="node-text">Solibri</span>
          </div>
          <div class="orbit-node lg n8">
            <span class="node-text">Tandem</span>
          </div>
        </div>

        <!-- Ring 3: Outer — Specialty -->
        <div class="orbit-ring orbit-ring-3">
          <div class="orbit-node n9">
            <span class="node-text small">Civil 3D</span>
          </div>
          <div class="orbit-node n10">
            <span class="node-text small">ArcGIS</span>
          </div>
          <div class="orbit-node n11">
            <span class="node-text accent small">ISO<br/>19650</span>
          </div>
          <div class="orbit-node n12">
            <span class="node-text small">Dalux</span>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
`;

export default function SolutionsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
