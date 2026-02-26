'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-overview {
  background: #F2F5F8;
  padding: 100px 0;
  position: relative;
  background-image:
    linear-gradient(rgba(11,60,93,0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11,60,93,0.09) 1px, transparent 1px);
  background-size: 48px 48px;
}
.sol-overview .ov-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.sol-overview .eyebrow {
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
.sol-overview .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-overview h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(30px, 3.5vw, 44px);
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #0B3C5D;
  margin-bottom: 24px;
}
.sol-overview h2 em { font-style: italic; color: #47B5FF; }
.sol-overview .ov-desc {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: #5a7a96;
  margin-bottom: 32px;
}
.sol-overview .ov-stats {
  display: flex;
  gap: 48px;
  margin-bottom: 36px;
}
.sol-overview .stat-num {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: 36px;
  color: #0B3C5D;
  line-height: 1;
}
.sol-overview .stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5a7a96;
  margin-top: 6px;
}
.sol-overview .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 1px solid rgba(11,60,93,0.09);
  color: #0B3C5D;
  background: transparent;
  cursor: pointer;
  transition: all 0.4s ease;
  text-decoration: none;
}
.sol-overview .btn-primary:hover {
  background: #0B3C5D;
  border-color: #0B3C5D;
  color: #fff;
}
.sol-overview .ov-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: rgba(11,60,93,0.09);
  border: 1px solid rgba(11,60,93,0.09);
}
.sol-overview .ov-cell {
  background: #fff;
  padding: 32px 24px;
  position: relative;
  transition: all 0.35s ease;
  text-decoration: none;
  display: block;
}
.sol-overview .ov-cell:hover {
  background: rgba(71,181,255,0.03);
}
.sol-overview .ov-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: #47B5FF;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}
.sol-overview .ov-cell h4 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: #0B3C5D;
  margin-bottom: 8px;
}
.sol-overview .ov-cell p {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.6;
  color: #5a7a96;
}
.sol-overview .ov-arrow {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 14px;
  color: #47B5FF;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.3s ease;
}
.sol-overview .ov-cell:hover .ov-arrow {
  opacity: 1;
  transform: translateX(0);
}
@media (max-width: 1024px) {
  .sol-overview .ov-container { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 640px) {
  .sol-overview .ov-container { padding: 0 20px; }
  .sol-overview .ov-stats { flex-direction: column; gap: 24px; }
  .sol-overview .ov-grid { grid-template-columns: 1fr; }
}
</style>

<section class="sol-overview">
  <div class="ov-container">
    <div class="ov-left">
      <div class="eyebrow">Our Solutions Framework</div>
      <h2>Engineered For<br/><em>Complex</em> Delivery</h2>
      <p class="ov-desc">
        Every infrastructure programme faces the same challenge: too many tools, not enough structure. Our six integrated solution layers address the full digital delivery lifecycle — aligned to ISO 19650, scaled to your programme, and built around the people who actually deliver.
      </p>
      <div class="ov-stats">
        <div class="stat-item">
          <div class="stat-num">6</div>
          <div class="stat-label">Solution Layers</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">30+</div>
          <div class="stat-label">Service Lines</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">ISO</div>
          <div class="stat-label">19650 Aligned</div>
        </div>
      </div>
      <a href="#solutions-deep" class="btn-primary">Explore All Layers →</a>
    </div>
    <div class="ov-grid">
      <a href="/solutions/strategy/" class="ov-cell">
        <div class="ov-num">01</div>
        <h4>Strategy</h4>
        <p>BIM plans, EIR, digital delivery roadmaps</p>
        <span class="ov-arrow">→</span>
      </a>
      <a href="/solutions/structure/" class="ov-cell">
        <div class="ov-num">02</div>
        <h4>Structure</h4>
        <p>CDE, naming conventions, LOD frameworks</p>
        <span class="ov-arrow">→</span>
      </a>
      <a href="/solutions/intelligence/" class="ov-cell">
        <div class="ov-num">03</div>
        <h4>Intelligence</h4>
        <p>Modelling, clash detection, scan-to-BIM</p>
        <span class="ov-arrow">→</span>
      </a>
      <a href="/solutions/execution/" class="ov-cell">
        <div class="ov-num">04</div>
        <h4>Execution</h4>
        <p>4D scheduling, digital work packaging</p>
        <span class="ov-arrow">→</span>
      </a>
      <a href="/solutions/project-twin/" class="ov-cell">
        <div class="ov-num">05</div>
        <h4>Project Twin</h4>
        <p>As-built models, COBie, digital handover</p>
        <span class="ov-arrow">→</span>
      </a>
      <a href="/solutions/insights/" class="ov-cell">
        <div class="ov-num">06</div>
        <h4>Insights</h4>
        <p>Dashboards, BIM auditing, 5D analytics</p>
        <span class="ov-arrow">→</span>
      </a>
    </div>
  </div>
</section>
`;

export default function SolutionsOverview() {
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
