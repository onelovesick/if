'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-deep {
  background: #1C1F23;
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
}
.sol-deep .sd-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.sol-deep .sd-header {
  text-align: center;
  margin-bottom: 80px;
}
.sol-deep .eyebrow {
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
.sol-deep .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-deep .sd-header h2 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(30px, 3.5vw, 46px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 16px;
}
.sol-deep .sd-header h2 em { font-style: italic; color: #47B5FF; }
.sol-deep .sd-header p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #7a9bb5;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Solution Row */
.sol-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-bottom: 2px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.sol-row.revealed {
  opacity: 1;
  transform: translateY(0);
}
.sol-row:nth-child(even) .sol-visual { order: -1; }

.sol-info {
  padding: 72px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(71,181,255,0.14);
  position: relative;
}
.sol-info::before,
.sol-info::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  pointer-events: none;
}
.sol-info::before {
  top: -1px; left: -1px;
  border-top: 1px solid rgba(71,181,255,0.3);
  border-left: 1px solid rgba(71,181,255,0.3);
}
.sol-info::after {
  bottom: -1px; right: -1px;
  border-bottom: 1px solid rgba(71,181,255,0.3);
  border-right: 1px solid rgba(71,181,255,0.3);
}

.sol-info .sol-number {
  font-family: 'Inter Tight', sans-serif;
  font-size: 80px;
  font-weight: 900;
  color: #47B5FF;
  opacity: 0.07;
  position: absolute;
  top: 20px;
  right: 32px;
  line-height: 1;
  user-select: none;
}
.sol-info .sol-eyebrow {
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
.sol-info .sol-eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}
.sol-info h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: 28px;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: #F4F6F8;
  margin-bottom: 16px;
}
.sol-info .sol-desc {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.75;
  color: #7a9bb5;
  margin-bottom: 24px;
  max-width: 440px;
}
.sol-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.sol-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border: 1px solid rgba(71,181,255,0.14);
  color: #7a9bb5;
  transition: all 0.3s ease;
}
.sol-tag:hover {
  border-color: #47B5FF;
  color: #47B5FF;
}
.sol-link {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #47B5FF;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.3s ease;
  text-decoration: none;
}
.sol-link:hover { gap: 14px; }
.sol-link span { transition: transform 0.3s ease; }

.sol-visual {
  position: relative;
  min-height: 380px;
  overflow: hidden;
  border: 1px solid rgba(71,181,255,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sol-visual .vis-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.3;
}
.sol-visual .vis-glow {
  position: absolute;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71,181,255,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}
.sol-icon-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.sol-icon-wrap svg {
  width: 80px;
  height: 80px;
  stroke: #47B5FF;
  stroke-width: 1;
  fill: none;
  opacity: 0.6;
  filter: drop-shadow(0 0 20px rgba(71,181,255,0.15));
}
.sol-vis-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.5;
}

@media (max-width: 1024px) {
  .sol-row { grid-template-columns: 1fr; }
  .sol-row:nth-child(even) .sol-visual { order: 0; }
  .sol-visual { min-height: 240px; }
}
@media (max-width: 640px) {
  .sol-info { padding: 48px 28px; }
  .sol-deep .sd-container { padding: 0 20px; }
}
</style>

<section class="sol-deep" id="solutions-deep">
  <div class="sd-container">
    <div class="sd-header">
      <div class="eyebrow">Advanced BIM &amp; Digital Delivery</div>
      <h2>Our Solution <em>Layers</em></h2>
      <p>Six integrated layers — from strategic vision to operational intelligence. Each layer is designed to stand alone or compound across your programme.</p>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">01</span>
        <div class="sol-eyebrow">Layer 01</div>
        <h3>Strategy</h3>
        <p class="sol-desc">We define how digital delivery will work before a single model is opened. BIM Execution Plans, Employer's Information Requirements, and strategic roadmaps aligned to contract, programme, and risk.</p>
        <div class="sol-tags">
          <span class="sol-tag">BEP Development</span>
          <span class="sol-tag">EIR Authoring</span>
          <span class="sol-tag">Digital Roadmaps</span>
          <span class="sol-tag">Risk Assessment</span>
        </div>
        <a href="/solutions/strategy/" class="sol-link">Explore Strategy <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" stroke-dasharray="4 6"/><line x1="40" y1="10" x2="40" y2="70"/><line x1="10" y1="40" x2="70" y2="40"/><circle cx="40" cy="40" r="8"/></svg>
          <span class="sol-vis-label">Strategy · Framework</span>
        </div>
      </div>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">02</span>
        <div class="sol-eyebrow">Layer 02</div>
        <h3>Structure</h3>
        <p class="sol-desc">We build the information architecture your project runs on. Common Data Environments, naming conventions, LOD frameworks, and the governance systems that keep data clean and teams aligned.</p>
        <div class="sol-tags">
          <span class="sol-tag">CDE Setup</span>
          <span class="sol-tag">Naming Standards</span>
          <span class="sol-tag">LOD Frameworks</span>
          <span class="sol-tag">Data Architecture</span>
        </div>
        <a href="/solutions/structure/" class="sol-link">Explore Structure <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><rect x="15" y="15" width="50" height="50" stroke-dasharray="4 6"/><rect x="25" y="25" width="30" height="30"/><line x1="15" y1="15" x2="25" y2="25"/><line x1="65" y1="15" x2="55" y2="25"/><line x1="15" y1="65" x2="25" y2="55"/><line x1="65" y1="65" x2="55" y2="55"/></svg>
          <span class="sol-vis-label">Structure · Architecture</span>
        </div>
      </div>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">03</span>
        <div class="sol-eyebrow">Layer 03</div>
        <h3>Intelligence</h3>
        <p class="sol-desc">Precision BIM modelling, clash detection, scan-to-BIM, and quantity verification. We turn raw data into validated, coordinated intelligence your teams can build from with confidence.</p>
        <div class="sol-tags">
          <span class="sol-tag">BIM Modelling</span>
          <span class="sol-tag">Clash Detection</span>
          <span class="sol-tag">Scan-to-BIM</span>
          <span class="sol-tag">QTO Verification</span>
        </div>
        <a href="/solutions/intelligence/" class="sol-link">Explore Intelligence <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><polygon points="40,8 72,24 72,56 40,72 8,56 8,24" stroke-dasharray="4 6"/><line x1="40" y1="8" x2="40" y2="72"/><line x1="8" y1="24" x2="72" y2="56"/><line x1="72" y1="24" x2="8" y2="56"/></svg>
          <span class="sol-vis-label">Intelligence · Modelling</span>
        </div>
      </div>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">04</span>
        <div class="sol-eyebrow">Layer 04</div>
        <h3>Execution</h3>
        <p class="sol-desc">4D scheduling, digital work packaging, and construction BIM compliance. We connect the model to the field — ensuring what was designed is what gets built, tracked, and validated in real-time.</p>
        <div class="sol-tags">
          <span class="sol-tag">4D Scheduling</span>
          <span class="sol-tag">Work Packaging</span>
          <span class="sol-tag">Field BIM</span>
          <span class="sol-tag">Construction QA</span>
        </div>
        <a href="/solutions/execution/" class="sol-link">Explore Execution <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><rect x="12" y="20" width="56" height="40" rx="2" stroke-dasharray="4 6"/><line x1="12" y1="35" x2="68" y2="35"/><line x1="12" y1="50" x2="68" y2="50"/><line x1="30" y1="20" x2="30" y2="60"/><rect x="32" y="22" width="18" height="11" fill="rgba(71,181,255,0.15)" stroke="none"/><rect x="32" y="37" width="34" height="11" fill="rgba(71,181,255,0.1)" stroke="none"/></svg>
          <span class="sol-vis-label">Execution · Construction</span>
        </div>
      </div>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">05</span>
        <div class="sol-eyebrow">Layer 05</div>
        <h3>Project Twin</h3>
        <p class="sol-desc">The asset doesn't stop at handover. We deliver as-built models, COBie-compliant data, and operations-ready digital twins — ensuring the data your teams built survives into FM and beyond.</p>
        <div class="sol-tags">
          <span class="sol-tag">As-Built Models</span>
          <span class="sol-tag">COBie Handover</span>
          <span class="sol-tag">Digital Twin</span>
          <span class="sol-tag">FM Integration</span>
        </div>
        <a href="/solutions/project-twin/" class="sol-link">Explore Project Twin <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><circle cx="28" cy="40" r="18" stroke-dasharray="4 6"/><circle cx="52" cy="40" r="18" stroke-dasharray="4 6"/><path d="M40,28 Q44,40 40,52" fill="none"/></svg>
          <span class="sol-vis-label">Project Twin · Handover</span>
        </div>
      </div>
    </div>

    <div class="sol-row" data-reveal>
      <div class="sol-info">
        <span class="sol-number">06</span>
        <div class="sol-eyebrow">Layer 06</div>
        <h3>Insights</h3>
        <p class="sol-desc">Project dashboards, BIM auditing, 5D cost analytics, and real-time progress tracking. We turn your project data into actionable intelligence — from the field to the boardroom.</p>
        <div class="sol-tags">
          <span class="sol-tag">Dashboards</span>
          <span class="sol-tag">BIM Auditing</span>
          <span class="sol-tag">5D Analytics</span>
          <span class="sol-tag">Progress Tracking</span>
        </div>
        <a href="/solutions/insights/" class="sol-link">Explore Insights <span>→</span></a>
      </div>
      <div class="sol-visual">
        <div class="vis-grid"></div>
        <div class="vis-glow"></div>
        <div class="sol-icon-wrap">
          <svg viewBox="0 0 80 80"><rect x="12" y="55" width="10" height="15" fill="rgba(71,181,255,0.2)" stroke="#47B5FF"/><rect x="27" y="40" width="10" height="30" fill="rgba(71,181,255,0.2)" stroke="#47B5FF"/><rect x="42" y="25" width="10" height="45" fill="rgba(71,181,255,0.2)" stroke="#47B5FF"/><rect x="57" y="15" width="10" height="55" fill="rgba(71,181,255,0.2)" stroke="#47B5FF"/><line x1="8" y1="72" x2="72" y2="72"/><polyline points="14,52 32,38 47,22 62,12" stroke-dasharray="3 4"/></svg>
          <span class="sol-vis-label">Insights · Analytics</span>
        </div>
      </div>
    </div>

  </div>
</section>
`;

export default function SolutionsDeepDive() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reveal the section wrapper
    const sectionObserver = new IntersectionObserver(
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
    sectionObserver.observe(el);

    // Reveal individual rows
    const timer = setTimeout(() => {
      const rows = el.querySelectorAll('.sol-row[data-reveal]');
      const rowObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.05 }
      );
      rows.forEach((row) => rowObserver.observe(row));
    }, 300);

    return () => {
      sectionObserver.disconnect();
      clearTimeout(timer);
    };
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
