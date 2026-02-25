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
.sol-hero .grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.5;
}
.sol-hero .gradient-layer {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 20% 50%, rgba(11,60,93,0.35) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 85% 30%, rgba(71,181,255,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.sol-hero .vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(28,31,35,0.7) 100%);
  pointer-events: none;
}
.sol-hero .scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #47B5FF, transparent);
  opacity: 0.25;
  animation: solScanDown 8s linear infinite;
  pointer-events: none;
  z-index: 2;
}
@keyframes solScanDown {
  0% { top: 0; }
  100% { top: 100%; }
}
.sol-hero .bracket-tl {
  position: absolute;
  top: 120px; left: 48px;
  width: 40px; height: 40px;
  border-top: 1px solid rgba(71,181,255,0.3);
  border-left: 1px solid rgba(71,181,255,0.3);
  opacity: 0.5;
  z-index: 3;
}
.sol-hero .bracket-br {
  position: absolute;
  bottom: 80px; right: 48px;
  width: 40px; height: 40px;
  border-bottom: 1px solid rgba(71,181,255,0.3);
  border-right: 1px solid rgba(71,181,255,0.3);
  opacity: 0.5;
  z-index: 3;
}
.sol-hero .side-label {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.35;
  z-index: 3;
  white-space: nowrap;
}
.sol-hero-content {
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
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
  margin-bottom: 20px;
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
  font-size: clamp(42px, 5.5vw, 72px);
  line-height: 1.02;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 24px;
}
.sol-hero h1 em {
  font-style: italic;
  color: #47B5FF;
}
.sol-hero .hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.7;
  color: #7a9bb5;
  max-width: 560px;
  margin-bottom: 40px;
}
.sol-hero .hero-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #7a9bb5;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.7;
}
.sol-hero .hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.sol-hero .btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: none;
  color: #fff;
  background: #47B5FF;
  cursor: pointer;
  transition: all 0.35s ease;
  text-decoration: none;
}
.sol-hero .btn-accent:hover {
  background: #3aa0e6;
  transform: translateY(-1px);
}
.sol-hero .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 1px solid rgba(71,181,255,0.14);
  color: #F4F6F8;
  background: transparent;
  cursor: pointer;
  transition: all 0.4s ease;
  text-decoration: none;
}
.sol-hero .btn-primary:hover {
  background: #0B3C5D;
  border-color: #47B5FF;
  color: #fff;
}
.sol-hero .scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 3;
}
.sol-hero .scroll-indicator span {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.5;
}
.sol-hero .scroll-line {
  width: 1px;
  height: 32px;
  background: #47B5FF;
  opacity: 0.3;
  animation: solScrollPulse 2s ease-in-out infinite;
}
@keyframes solScrollPulse {
  0%, 100% { opacity: 0.15; transform: scaleY(0.6); }
  50% { opacity: 0.4; transform: scaleY(1); }
}
@media (max-width: 1024px) {
  .sol-hero .side-label { display: none; }
}
@media (max-width: 640px) {
  .sol-hero-content { padding: 0 20px; }
}
</style>

<section class="sol-hero">
  <div class="grid-overlay"></div>
  <div class="gradient-layer"></div>
  <div class="vignette"></div>
  <div class="scan-line"></div>
  <div class="bracket-tl"></div>
  <div class="bracket-br"></div>
  <div class="side-label">Solutions · Full Lifecycle Digital Delivery</div>

  <div class="sol-hero-content">
    <div class="eyebrow">End-to-End Digital Delivery</div>
    <h1>Six Layers.<br/>One <em>Controlled</em><br/>Outcome.</h1>
    <p class="hero-sub">
      From BIM strategy on day one to digital twin handover — our solutions framework is structured around how infrastructure actually gets built, governed, and operated.
    </p>
    <div class="hero-meta">Strategy · Structure · Intelligence · Execution · Project Twin · Insights</div>
    <div class="hero-ctas">
      <a href="/contact/" class="btn-accent">Schedule a Discovery Call</a>
      <a href="/process/" class="btn-primary">Our Process →</a>
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
