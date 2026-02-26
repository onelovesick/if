'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-cta {
  background: #1C1F23;
  padding: 140px 0;
  position: relative;
  overflow: hidden;
}
.sol-cta .cta-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
}
.sol-cta .cta-scan {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #47B5FF, transparent);
  opacity: 0.25;
  animation: ctaScan 8s linear infinite;
  pointer-events: none;
  z-index: 2;
}
@keyframes ctaScan {
  0% { top: 0; }
  100% { top: 100%; }
}
.sol-cta .cta-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 400px;
  background: radial-gradient(ellipse, rgba(71,181,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.sol-cta .cta-corner-tl {
  position: absolute;
  top: 60px; left: 60px;
  width: 60px; height: 60px;
  border-top: 1px solid rgba(71,181,255,0.3);
  border-left: 1px solid rgba(71,181,255,0.3);
  z-index: 2;
}
.sol-cta .cta-corner-br {
  position: absolute;
  bottom: 60px; right: 60px;
  width: 60px; height: 60px;
  border-bottom: 1px solid rgba(71,181,255,0.3);
  border-right: 1px solid rgba(71,181,255,0.3);
  z-index: 2;
}
.sol-cta .cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.sol-cta .cta-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}
.sol-cta .eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #47B5FF;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
}
.sol-cta .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-cta h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(32px, 4vw, 52px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 20px;
  line-height: 1.08;
}
.sol-cta h2 em { font-style: italic; color: #47B5FF; }
.sol-cta .cta-desc {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #7a9bb5;
  margin-bottom: 40px;
  line-height: 1.7;
}
.sol-cta .cta-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.sol-cta .btn-accent {
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
.sol-cta .btn-accent:hover {
  background: #3aa0e6;
  transform: translateY(-1px);
}
.sol-cta .btn-primary {
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
.sol-cta .btn-primary:hover {
  background: #0B3C5D;
  border-color: #47B5FF;
  color: #fff;
}
.sol-cta .cta-location {
  margin-top: 48px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.4;
}
@media (max-width: 640px) {
  .sol-cta .cta-corner-tl, .sol-cta .cta-corner-br { display: none; }
  .sol-cta .cta-container { padding: 0 20px; }
}
</style>

<section class="sol-cta">
  <div class="cta-grid"></div>
  <div class="cta-scan"></div>
  <div class="cta-glow"></div>
  <div class="cta-corner-tl"></div>
  <div class="cta-corner-br"></div>

  <div class="cta-container">
    <div class="cta-content">
      <div class="eyebrow">Start The Conversation</div>
      <h2>Ready To Bring<br/><em>Structure</em> To<br/>Your Programme?</h2>
      <p class="cta-desc">Whether you're scoping a new P3 corridor or restructuring digital delivery on an active programme — we start with a discovery conversation.</p>
      <div class="cta-btns">
        <a href="/contact/" class="btn-accent">Schedule a Discovery Call</a>
        <a href="/process/" class="btn-primary">Our Process →</a>
      </div>
      <div class="cta-location">Québec City · Canada · International</div>
    </div>
  </div>
</section>
`;

export default function SolutionsCTA() {
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
