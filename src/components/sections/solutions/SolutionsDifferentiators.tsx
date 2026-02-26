'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-diff {
  background: #1C1F23;
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
}
.sol-diff .diff-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.sol-diff .eyebrow {
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
.sol-diff .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-diff .diff-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 64px;
}
.sol-diff .diff-header h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 3.5vw, 44px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 16px;
}
.sol-diff .diff-header h2 em { font-style: italic; color: #47B5FF; }
.sol-diff .diff-header p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #7a9bb5;
  line-height: 1.7;
}
.sol-diff .diff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
.sol-diff .diff-card {
  border: 1px solid rgba(71,181,255,0.14);
  padding: 48px 36px;
  position: relative;
  transition: all 0.4s ease;
  background: rgba(28,31,35,0.5);
  overflow: hidden;
}
.sol-diff .diff-card::before,
.sol-diff .diff-card::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  pointer-events: none;
}
.sol-diff .diff-card::before {
  top: -1px; left: -1px;
  border-top: 1px solid rgba(71,181,255,0.3);
  border-left: 1px solid rgba(71,181,255,0.3);
}
.sol-diff .diff-card::after {
  bottom: -1px; right: -1px;
  border-bottom: 1px solid rgba(71,181,255,0.3);
  border-right: 1px solid rgba(71,181,255,0.3);
}
.sol-diff .diff-card:hover {
  background: rgba(11,60,93,0.12);
  border-color: rgba(71,181,255,0.25);
}
.sol-diff .diff-icon {
  width: 48px; height: 48px;
  border: 1px solid rgba(71,181,255,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 20px;
  color: #47B5FF;
}
.sol-diff .diff-card h4 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: 17px;
  text-transform: uppercase;
  color: #F4F6F8;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.sol-diff .diff-card p {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.7;
  color: #7a9bb5;
}
.sol-diff .diff-line {
  position: absolute;
  bottom: 0; left: 0;
  width: 0;
  height: 2px;
  background: #47B5FF;
  transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
}
.sol-diff .diff-card:hover .diff-line {
  width: 100%;
}
@media (max-width: 1024px) {
  .sol-diff .diff-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .sol-diff .diff-container { padding: 0 20px; }
}
</style>

<section class="sol-diff">
  <div class="diff-container">
    <div class="diff-header">
      <div class="eyebrow">Why Infraforma</div>
      <h2>Not Just Tools.<br/><em>Structured</em> Delivery.</h2>
      <p>We don't sell software licences. We engineer the systems, governance, and workflows that make your existing technology actually work.</p>
    </div>

    <div class="diff-grid">
      <div class="diff-card">
        <div class="diff-icon">⎔</div>
        <h4>Platform Agnostic</h4>
        <p>We work with your existing stack — Autodesk, Bentley, Procore, or others. We integrate, not replace.</p>
        <div class="diff-line"></div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">◇</div>
        <h4>ISO 19650 Native</h4>
        <p>Every solution is built on international information management standards. Compliance isn't an add-on — it's foundational.</p>
        <div class="diff-line"></div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">⬡</div>
        <h4>Lifecycle Thinking</h4>
        <p>We don't stop at design. Our solutions extend through construction, commissioning, and into operations and FM.</p>
        <div class="diff-line"></div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">△</div>
        <h4>Lean Implementation</h4>
        <p>We deploy only what adds measurable value. No bloated workflows, no unnecessary tools, no scope creep.</p>
        <div class="diff-line"></div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">⊞</div>
        <h4>People-First Process</h4>
        <p>Technology serves the team, not the other way around. We design systems that people actually want to use.</p>
        <div class="diff-line"></div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">◎</div>
        <h4>Proven at Scale</h4>
        <p>55+ years combined experience. $50B+ in assets delivered. From P3 corridors to institutional campuses.</p>
        <div class="diff-line"></div>
      </div>
    </div>
  </div>
</section>
`;

export default function SolutionsDifferentiators() {
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
