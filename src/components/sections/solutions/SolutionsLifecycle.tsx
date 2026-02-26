'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-lifecycle {
  background: #F2F5F8;
  padding: 120px 0 100px;
  position: relative;
  overflow: hidden;
  background-image:
    linear-gradient(rgba(11,60,93,0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11,60,93,0.09) 1px, transparent 1px);
  background-size: 48px 48px;
}
.sol-lifecycle .lc-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.sol-lifecycle .lc-header {
  text-align: center;
  margin-bottom: 72px;
}
.sol-lifecycle .eyebrow {
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
.sol-lifecycle .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-lifecycle .lc-header h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 3.5vw, 44px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #0B3C5D;
  margin-bottom: 16px;
}
.sol-lifecycle .lc-header h2 em { font-style: italic; color: #47B5FF; }
.sol-lifecycle .lc-header p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #5a7a96;
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.7;
}
.sol-lifecycle .lc-track {
  position: relative;
  display: flex;
  gap: 0;
  margin-bottom: 64px;
}
.sol-lifecycle .lc-track::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 5%;
  right: 5%;
  height: 2px;
  background: linear-gradient(90deg, #47B5FF, #0B3C5D);
  opacity: 0.2;
}
.sol-lifecycle .lc-step {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 8px;
}
.sol-lifecycle .lc-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #47B5FF;
  margin: 32px auto 20px;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
}
.sol-lifecycle .lc-step:hover .lc-dot {
  background: #47B5FF;
  box-shadow: 0 0 0 6px rgba(71,181,255,0.15);
}
.sol-lifecycle .lc-phase {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #47B5FF;
  margin-bottom: 8px;
}
.sol-lifecycle .lc-step h4 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800;
  font-size: 15px;
  text-transform: uppercase;
  color: #0B3C5D;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.sol-lifecycle .lc-step p {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.6;
  color: #5a7a96;
  max-width: 180px;
  margin: 0 auto;
}
.sol-lifecycle .lc-solutions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-top: 12px;
}
.sol-lifecycle .lc-solutions span {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  background: rgba(11,60,93,0.06);
  color: #0B3C5D;
  border-radius: 2px;
}
.sol-lifecycle .lc-footer {
  text-align: center;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5a7a96;
  opacity: 0.6;
}
@media (max-width: 1024px) {
  .sol-lifecycle .lc-track { flex-wrap: wrap; }
  .sol-lifecycle .lc-step { min-width: 30%; margin-bottom: 32px; }
  .sol-lifecycle .lc-track::before { display: none; }
}
@media (max-width: 640px) {
  .sol-lifecycle .lc-container { padding: 0 20px; }
  .sol-lifecycle .lc-step { min-width: 45%; }
}
</style>

<section class="sol-lifecycle">
  <div class="lc-container">
    <div class="lc-header">
      <div class="eyebrow">Full Lifecycle Coverage</div>
      <h2>Solutions Mapped To<br/>Your <em>Project</em> Timeline</h2>
      <p>Our six layers map directly to the phases of infrastructure delivery. Every phase is covered, every handover is structured.</p>
    </div>

    <div class="lc-track">
      <div class="lc-step">
        <div class="lc-phase">Phase 01</div>
        <div class="lc-dot"></div>
        <h4>Inception</h4>
        <p>Requirements definition, digital strategy, and procurement alignment</p>
        <div class="lc-solutions"><span>Strategy</span></div>
      </div>
      <div class="lc-step">
        <div class="lc-phase">Phase 02</div>
        <div class="lc-dot"></div>
        <h4>Design</h4>
        <p>Model coordination, CDE governance, and design-phase compliance</p>
        <div class="lc-solutions"><span>Structure</span><span>Intelligence</span></div>
      </div>
      <div class="lc-step">
        <div class="lc-phase">Phase 03</div>
        <div class="lc-dot"></div>
        <h4>Construction</h4>
        <p>Field BIM, 4D sequencing, progress tracking, and production control</p>
        <div class="lc-solutions"><span>Execution</span><span>Insights</span></div>
      </div>
      <div class="lc-step">
        <div class="lc-phase">Phase 04</div>
        <div class="lc-dot"></div>
        <h4>Commissioning</h4>
        <p>As-built validation, data verification, and handover preparation</p>
        <div class="lc-solutions"><span>Project Twin</span><span>Insights</span></div>
      </div>
      <div class="lc-step">
        <div class="lc-phase">Phase 05</div>
        <div class="lc-dot"></div>
        <h4>Operations</h4>
        <p>Digital twin activation, FM integration, and asset intelligence</p>
        <div class="lc-solutions"><span>Project Twin</span></div>
      </div>
    </div>

    <div class="lc-footer">End-to-End · No Gaps · No Silos</div>
  </div>
</section>
`;

export default function SolutionsLifecycle() {
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
