'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-mapping {
  background: #F2F5F8;
  padding: 120px 0;
  position: relative;
  background-image:
    linear-gradient(rgba(11,60,93,0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11,60,93,0.09) 1px, transparent 1px);
  background-size: 48px 48px;
}
.sol-mapping .map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.sol-mapping .eyebrow {
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
.sol-mapping .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-mapping .map-header {
  margin-bottom: 64px;
}
.sol-mapping .map-header h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 3vw, 40px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #0B3C5D;
  margin-bottom: 16px;
}
.sol-mapping .map-header h2 em { font-style: italic; color: #47B5FF; }
.sol-mapping .map-header p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #5a7a96;
  max-width: 540px;
  line-height: 1.7;
}
.sol-mapping .map-table-wrap {
  overflow-x: auto;
}
.sol-mapping table {
  width: 100%;
  border-collapse: collapse;
}
.sol-mapping thead th {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0B3C5D;
  padding: 16px 20px;
  text-align: left;
  border-bottom: 2px solid #0B3C5D;
  white-space: nowrap;
}
.sol-mapping thead th:first-child {
  width: 200px;
}
.sol-mapping tbody td {
  padding: 20px 20px;
  border-bottom: 1px solid rgba(11,60,93,0.09);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #5a7a96;
  vertical-align: middle;
}
.sol-mapping tbody tr:hover td {
  background: rgba(71,181,255,0.03);
}
.sol-mapping tbody td:first-child {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 800;
  font-size: 14px;
  color: #0B3C5D;
  text-transform: uppercase;
}
.sol-mapping .map-dot {
  display: inline-block;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #47B5FF;
  opacity: 0.7;
}
.sol-mapping .map-dot.secondary {
  background: #0B3C5D;
  opacity: 0.3;
}
.sol-mapping .map-legend {
  margin-top: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
}
.sol-mapping .map-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sol-mapping .map-legend-item .dot-sm {
  width: 8px; height: 8px;
  border-radius: 50%;
}
.sol-mapping .map-legend-item .dot-sm.primary {
  background: #47B5FF;
  opacity: 0.7;
}
.sol-mapping .map-legend-item .dot-sm.secondary {
  background: #0B3C5D;
  opacity: 0.3;
}
.sol-mapping .map-legend-item span {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5a7a96;
}
@media (max-width: 640px) {
  .sol-mapping .map-container { padding: 0 20px; }
  .sol-mapping thead th, .sol-mapping tbody td { padding: 12px 10px; font-size: 11px; }
}
</style>

<section class="sol-mapping">
  <div class="map-container">
    <div class="map-header">
      <div class="eyebrow">Solution Mapping</div>
      <h2>Which Layers Serve<br/><em>Your</em> Team?</h2>
      <p>Every stakeholder benefits from different layers of our framework. Here's how our solutions map to your role.</p>
    </div>

    <div class="map-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Stakeholder</th>
            <th>Strategy</th>
            <th>Structure</th>
            <th>Intelligence</th>
            <th>Execution</th>
            <th>Project Twin</th>
            <th>Insights</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contractors</td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
          </tr>
          <tr>
            <td>Architects</td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
          </tr>
          <tr>
            <td>Engineers</td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
          </tr>
          <tr>
            <td>Owners</td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
          </tr>
          <tr>
            <td>Government</td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
          </tr>
          <tr>
            <td>Consultants</td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot secondary"></span></td>
            <td><span class="map-dot"></span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="map-legend">
      <div class="map-legend-item">
        <div class="dot-sm primary"></div>
        <span>Primary</span>
      </div>
      <div class="map-legend-item">
        <div class="dot-sm secondary"></div>
        <span>Supporting</span>
      </div>
    </div>
  </div>
</section>
`;

export default function SolutionsMapping() {
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
