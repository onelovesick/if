"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
.tek {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.tek.tek-visible {
  opacity: 1;
  transform: translateY(0);
}

@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,900;1,700&amp;family=Inter:wght@300;400;500;600;700&amp;family=DM+Mono:wght@300;400;500&amp;display=swap');

.tek *, .tek *::before, .tek *::after { box-sizing: border-box; margin: 0; padding: 0; }

.tek {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #0E1418;
  --mono: 'DM Mono', monospace;

  position: relative;
  background: var(--bg);
  overflow: hidden;
  padding: 0;
}

/* Ambient orbs */
.tek-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(100px);
  opacity: 0.6;
  will-change: transform;
}
.tek-orb--1 {
  width: 500px; height: 500px;
  top: -10%; left: 15%;
  background: radial-gradient(circle, rgba(71,181,255,0.12) 0%, transparent 70%);
  animation: tekOrb1 20s ease-in-out infinite alternate;
}
.tek-orb--2 {
  width: 400px; height: 400px;
  bottom: -5%; right: 10%;
  background: radial-gradient(circle, rgba(11,60,93,0.2) 0%, transparent 70%);
  animation: tekOrb2 25s ease-in-out infinite alternate;
}
.tek-orb--3 {
  width: 300px; height: 300px;
  top: 40%; right: 30%;
  background: radial-gradient(circle, rgba(71,181,255,0.06) 0%, transparent 70%);
  animation: tekOrb3 18s ease-in-out infinite alternate;
}
@keyframes tekOrb1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 30px); }
}
@keyframes tekOrb2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-30px, -25px); }
}
@keyframes tekOrb3 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(25px, -20px); }
}

/* Subtle noise texture */
.tek::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(71,181,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%);
}

/* Top + bottom hidden */
.tek-fade-top { display: none; }
.tek-fade-bottom { display: none; }

/* ── Header ── */
.tek-header {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: clamp(80px,8vw,140px) clamp(32px,5%,96px) clamp(56px,5vw,80px);
}

.tek-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}
.tek-eyebrow::before,
.tek-eyebrow::after {
  content: '';
  width: 28px; height: 1px;
  background: var(--accent); opacity: 0.4;
}

.tek-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(40px,5.5vw,88px);
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}
.tek-title em {
  color: var(--accent);
  font-style: italic;
}

.tek-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(15px,1.15vw,18px);
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.01em;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ── Marquee wrapper ── */
.tek-marquees {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 0 0;
}

/* Edge fade masks */
.tek-marquees::before,
.tek-marquees::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: clamp(100px, 15vw, 220px);
  z-index: 3;
  pointer-events: none;
}
.tek-marquees::before {
  left: 0;
  background: linear-gradient(90deg, var(--bg), transparent);
}
.tek-marquees::after {
  right: 0;
  background: linear-gradient(270deg, var(--bg), transparent);
}

/* ── Single marquee track ── */
.tek-marquee {
  overflow: hidden;
  padding: 14px 0;
}
.tek-marquee + .tek-marquee { margin-top: 14px; }

/* ── Bottom content ── */
.tek-bottom {
  position: relative; z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(56px,6vw,96px) clamp(32px,5%,96px) clamp(80px,8vw,140px);
  text-align: center;
}
.tek-bottom-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(22px,2.4vw,36px);
  font-weight: 900; text-transform: uppercase;
  color: #fff; line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.tek-bottom-title span { color: var(--accent); }
.tek-bottom-desc {
  font-size: clamp(14px,1.05vw,16px);
  color: rgba(255,255,255,0.45);
  line-height: 1.8;
  max-width: 580px;
  margin: 0 auto 32px;
}

/* Feature pills */
.tek-features {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.tek-feat {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  padding: 10px 20px;
  border: 1px solid rgba(71,181,255,0.1);
  border-radius: 6px;
  background: rgba(71,181,255,0.03);
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}
.tek-feat:hover {
  border-color: rgba(71,181,255,0.25);
  color: rgba(255,255,255,0.85);
  background: rgba(71,181,255,0.06);
}
.tek-feat-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.5;
}

.tek-marquee-inner {
  display: flex;
  gap: 0;
  width: max-content;
  will-change: transform;
}
.tek-marquee--fwd  .tek-marquee-inner { animation: tek-scroll-fwd  38s linear infinite; }
.tek-marquee--rev  .tek-marquee-inner { animation: tek-scroll-rev  42s linear infinite; }

@keyframes tek-scroll-fwd {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes tek-scroll-rev {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.tek-marquee:hover .tek-marquee-inner { animation-play-state: paused; }

/* ── Logo pill ── */
.tek-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  margin: 0 6px;
  border: 1px solid rgba(71,181,255,0.08);
  background: rgba(71,181,255,0.03);
  border-radius: 8px;
  white-space: nowrap;
  cursor: default;
  transition: background 0.35s, border-color 0.35s, transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
  position: relative;
  overflow: hidden;
}
.tek-logo::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.tek-logo:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(71,181,255,0.06);
}
.tek-logo:hover::before { opacity: 1; }

/* Logo icon */
.tek-logo-icon {
  width: 22px; height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tek-logo-icon svg { width: 100%; height: 100%; }

.tek-logo-name {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  transition: color 0.3s;
}
.tek-logo:hover .tek-logo-name { color: #fff; }

.tek-logo-cat {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.35);
  padding-left: 12px;
  border-left: 1px solid rgba(71,181,255,0.1);
  transition: color 0.3s;
}
.tek-logo:hover .tek-logo-cat { color: rgba(71,181,255,0.75); }

/* ── ISO 19650 bar ── */
.tek-iso {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 32px clamp(32px,5%,96px) 56px;
  border-top: 1px solid rgba(71,181,255,0.08);
  flex-wrap: wrap;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* Left badge */
.tek-iso-label {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  padding-right: 40px;
}
.tek-iso-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.03em;
  line-height: 1;
}
.tek-iso-sub {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.55);
  margin-top: 5px;
}

/* Vertical divider between badge and evo */
.tek-iso-vdivider {
  width: 1px;
  height: 64px;
  background: rgba(71,181,255,0.12);
  flex-shrink: 0;
  margin-right: 40px;
}

/* ── Evolution diagram ── */
.tek-evo {
  display: flex;
  align-items: flex-start;
  gap: 0;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 4px;
  justify-content: space-between;
}

.tek-evo-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  cursor: default;
}

.tek-evo-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(71,181,255,0.25);
  border: 1.5px solid rgba(71,181,255,0.4);
  margin-bottom: 2px;
  transition: background 0.25s, border-color 0.25s, transform 0.25s;
  flex-shrink: 0;
}
.tek-evo-node:hover .tek-evo-dot {
  background: rgba(71,181,255,0.6);
  border-color: var(--accent);
  transform: scale(1.3);
}
.tek-evo-dot--active {
  width: 12px; height: 12px;
  background: rgba(71,181,255,0.45);
  border: 2px solid var(--accent);
  box-shadow: 0 0 10px rgba(71,181,255,0.4);
}
.tek-evo-dot--end {
  width: 14px; height: 14px;
  background: var(--accent);
  border: 2px solid white;
  box-shadow: 0 0 16px rgba(71,181,255,0.6);
}

.tek-evo-code {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.04em;
  line-height: 1.15;
  transition: color 0.2s;
}
.tek-evo-node:hover .tek-evo-code { color: rgba(255,255,255,0.9); }
.tek-evo-code--active { color: var(--accent) !important; }
.tek-evo-code--end { color: #ffffff !important; }

.tek-evo-desc {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  line-height: 1.5;
  max-width: 90px;
  transition: color 0.2s;
}
.tek-evo-node:hover .tek-evo-desc { color: rgba(255,255,255,0.45); }
.tek-evo-node--start .tek-evo-desc { color: rgba(255,255,255,0.15); }
.tek-evo-node--end .tek-evo-desc { color: rgba(71,181,255,0.5); }

/* Arrow connectors */
.tek-evo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  flex-shrink: 0;
  margin-bottom: 28px; /* align with dot row */
  align-self: flex-start;
  margin-top: 22px;
}
.tek-evo-arrow svg { width: 48px; height: 12px; }
.tek-evo-arrow span {
  font-family: var(--mono);
  font-size: 6.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.45);
  white-space: nowrap;
}
.tek-evo-arrow--final span { color: rgba(71,181,255,0.75); }

/* Responsive */
@media (max-width: 1100px) {
  .tek-iso { flex-direction: column; align-items: flex-start; gap: 24px; }
  .tek-iso-vdivider { display: none; }
  .tek-evo { overflow-x: auto; width: 100%; }
}
@media (max-width: 640px) {
  .tek-evo-desc { display: none; }
  .tek-evo-node { min-width: 72px; }
}
</style>

<section class="tek" aria-label="Technology ecosystem" id="tekRoot">

  <div class="tek-orb tek-orb--1"></div>
  <div class="tek-orb tek-orb--2"></div>
  <div class="tek-orb tek-orb--3"></div>

  <!-- Header -->
  <div class="tek-header">
    <div class="tek-eyebrow">Technology Ecosystem</div>
    <h2 class="tek-title">Built On The <em>Industry's</em><br/>Best Platforms</h2>
    <p class="tek-sub">Platform-agnostic by design. We deploy whichever tools serve your project — and we know how to make them work together.</p>
  </div>

  <!-- Marquees -->
  <div class="tek-marquees">

    <!-- Row 1 — forward -->
    <div class="tek-marquee tek-marquee--fwd">
      <div class="tek-marquee-inner" id="tekRow1">

        <!-- Autodesk -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M2 18L9 4h2.5L18 18h-3l-1.5-4H6.5L5 18H2ZM7.5 11h5L10 5.5 7.5 11Z" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Autodesk</span>
          <span class="tek-logo-cat">Design &amp; BIM</span>
        </div>

        <!-- Revit -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#0696D7" opacity="0.15"/><text x="4" y="17" font-family="Arial" font-weight="900" font-size="11" fill="#0696D7">Rv</text></svg></div>
          <span class="tek-logo-name">Revit</span>
          <span class="tek-logo-cat">BIM Authoring</span>
        </div>

        <!-- Navisworks -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,20 2,20" fill="none" stroke="#0696D7" stroke-width="2"/><circle cx="12" cy="14" r="3" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Navisworks</span>
          <span class="tek-logo-cat">Clash Detection</span>
        </div>

        <!-- ACC -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#0696D7"/><text x="4" y="16" font-family="Arial" font-weight="900" font-size="9" fill="white">ACC</text></svg></div>
          <span class="tek-logo-name">Autodesk ACC</span>
          <span class="tek-logo-cat">Construction Cloud</span>
        </div>

        <!-- Civil 3D -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20 Q12 4 20 20" stroke="#0696D7" stroke-width="2" fill="none"/><line x1="4" y1="20" x2="20" y2="20" stroke="#0696D7" stroke-width="1.5"/></svg></div>
          <span class="tek-logo-name">Civil 3D</span>
          <span class="tek-logo-cat">Infrastructure Design</span>
        </div>

        <!-- Bentley -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#00B5E2"/><text x="6" y="17" font-family="Arial" font-weight="900" font-size="14" fill="white">B</text></svg></div>
          <span class="tek-logo-name">Bentley</span>
          <span class="tek-logo-cat">Civil Infrastructure</span>
        </div>

        <!-- OpenRoads -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 18 Q8 6 12 10 Q16 14 21 6" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round"/></svg></div>
          <span class="tek-logo-name">OpenRoads</span>
          <span class="tek-logo-cat">Road &amp; Rail Design</span>
        </div>

        <!-- iTwin -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#00B5E2" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="#00B5E2" opacity="0.4"/><circle cx="12" cy="12" r="1.5" fill="#00B5E2"/></svg></div>
          <span class="tek-logo-name">iTwin</span>
          <span class="tek-logo-cat">Digital Twin</span>
        </div>

        <!-- ProjectWise -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#00B5E2" stroke-width="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="#00B5E2" stroke-width="1.5"/><circle cx="7" cy="7" r="1" fill="#00B5E2"/></svg></div>
          <span class="tek-logo-name">ProjectWise</span>
          <span class="tek-logo-cat">Document Control</span>
        </div>

        <!-- Procore -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F47920"/><text x="7" y="17" font-family="Arial" font-weight="900" font-size="13" fill="white">P</text></svg></div>
          <span class="tek-logo-name">Procore</span>
          <span class="tek-logo-cat">Construction OS</span>
        </div>

        <!-- Solibri -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke="#E85D26" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#E85D26"/></svg></div>
          <span class="tek-logo-name">Solibri</span>
          <span class="tek-logo-cat">Model QA</span>
        </div>

        <!-- Tandem -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L22 12L12 22L2 12Z" fill="none" stroke="#0696D7" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#0696D7"/></svg></div>
          <span class="tek-logo-name">Tandem</span>
          <span class="tek-logo-cat">Digital Twin FM</span>
        </div>

      </div>
    </div>

    <!-- Row 2 — reverse -->
    <div class="tek-marquee tek-marquee--rev">
      <div class="tek-marquee-inner" id="tekRow2">

        <!-- ESRI -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#007AC2" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="#007AC2" stroke-width="1"/><line x1="3" y1="12" x2="21" y2="12" stroke="#007AC2" stroke-width="1"/></svg></div>
          <span class="tek-logo-name">ESRI / ArcGIS</span>
          <span class="tek-logo-cat">GIS &amp; Spatial</span>
        </div>

        <!-- Dalux -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#1C1C3A"/><text x="5" y="17" font-family="Arial" font-weight="900" font-size="13" fill="#47B5FF">D</text></svg></div>
          <span class="tek-logo-name">Dalux</span>
          <span class="tek-logo-cat">Field BIM</span>
        </div>

        <!-- Power BI -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2"  y="14" width="5" height="8"  fill="#F2C811"/><rect x="9"  y="9"  width="5" height="13" fill="#F2C811" opacity="0.75"/><rect x="16" y="4"  width="5" height="18" fill="#F2C811" opacity="0.5"/></svg></div>
          <span class="tek-logo-name">Power BI</span>
          <span class="tek-logo-cat">Analytics</span>
        </div>

        <!-- ISO 19650 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="rgba(71,181,255,0.6)" stroke-width="1.5"/><line x1="2" y1="9" x2="22" y2="9" stroke="rgba(71,181,255,0.4)" stroke-width="1"/><text x="4" y="8" font-family="Arial" font-weight="900" font-size="5" fill="#47B5FF">ISO</text><text x="3" y="18" font-family="Arial" font-weight="900" font-size="6.5" fill="rgba(255,255,255,0.7)">19650</text></svg></div>
          <span class="tek-logo-name">ISO 19650</span>
          <span class="tek-logo-cat">BIM Standard</span>
        </div>

        <!-- Revizto -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#E63946" stroke-width="1.5"/><path d="M8 9 L16 9 L12 16 Z" fill="#E63946"/></svg></div>
          <span class="tek-logo-name">Revizto</span>
          <span class="tek-logo-cat">Issue Tracking</span>
        </div>

        <!-- BIM 360 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#0696D7" opacity="0.2"/><text x="5" y="16" font-family="Arial" font-weight="900" font-size="8" fill="#0696D7">360</text></svg></div>
          <span class="tek-logo-name">BIM 360</span>
          <span class="tek-logo-cat">Collaboration</span>
        </div>

        <!-- Infraworks -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M2 20 L7 8 L12 14 L17 6 L22 20 Z" fill="none" stroke="#0696D7" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
          <span class="tek-logo-name">InfraWorks</span>
          <span class="tek-logo-cat">Concept Design</span>
        </div>

        <!-- Aconex -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="none" stroke="#e67e22" stroke-width="1.5"/><text x="8" y="16" font-family="Arial" font-weight="900" font-size="10" fill="#e67e22">A</text></svg></div>
          <span class="tek-logo-name">Aconex</span>
          <span class="tek-logo-cat">Document Mgmt</span>
        </div>

        <!-- Rhino -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 18 C4 18 6 8 12 6 C18 4 20 10 20 10 L16 18" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>
          <span class="tek-logo-name">Rhino / Grasshopper</span>
          <span class="tek-logo-cat">Parametric</span>
        </div>

        <!-- Microsoft 365 -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" fill="#f25022"/><rect x="13" y="2" width="9" height="9" fill="#7fba00"/><rect x="2" y="13" width="9" height="9" fill="#00a4ef"/><rect x="13" y="13" width="9" height="9" fill="#ffb900"/></svg></div>
          <span class="tek-logo-name">Microsoft 365</span>
          <span class="tek-logo-cat">Productivity</span>
        </div>

        <!-- Synchro -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 A9 9 0 0 1 21 12" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12 21 A9 9 0 0 1 3 12" stroke="#00B5E2" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/><polyline points="18,8 21,12 17,13" fill="none" stroke="#00B5E2" stroke-width="1.5"/></svg></div>
          <span class="tek-logo-name">Synchro</span>
          <span class="tek-logo-cat">4D Scheduling</span>
        </div>

        <!-- COBie -->
        <div class="tek-logo">
          <div class="tek-logo-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="rgba(71,181,255,0.5)" stroke-width="1.5"/><line x1="3" y1="8" x2="21" y2="8" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><line x1="3" y1="13" x2="21" y2="13" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><line x1="10" y1="3" x2="10" y2="21" stroke="rgba(71,181,255,0.3)" stroke-width="1"/></svg></div>
          <span class="tek-logo-name">COBie</span>
          <span class="tek-logo-cat">Data Handover</span>
        </div>

      </div>
    </div>

  </div>


  <!-- Bottom content -->
  <div class="tek-bottom">
    <h3 class="tek-bottom-title">Platform-Agnostic. <span>Standards-Driven.</span></h3>
    <p class="tek-bottom-desc">We do not sell software. We structure the information layer that makes your existing tools work harder, together, and in compliance with ISO 19650.</p>
    <div class="tek-features">
      <div class="tek-feat"><span class="tek-feat-dot"></span>ISO 19650 Aligned</div>
      <div class="tek-feat"><span class="tek-feat-dot"></span>OpenBIM / IFC</div>
      <div class="tek-feat"><span class="tek-feat-dot"></span>CDE Governance</div>
      <div class="tek-feat"><span class="tek-feat-dot"></span>Multi-Platform</div>
      <div class="tek-feat"><span class="tek-feat-dot"></span>Interoperability</div>
    </div>
  </div>

</section>`
const sectionScripts = ["\n// Duplicate each marquee row so the loop is seamless\n(function(){\n  ['tekRow1','tekRow2'].forEach(function(id){\n    var el = document.getElementById(id);\n    if(!el) return;\n    var clone = el.innerHTML;\n    el.innerHTML = clone + clone; // duplicate for seamless loop\n  });\n}());\n", "(function(){\n  var root = document.querySelector('.tek');\n  if (!root) return;\n  new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if (e.isIntersecting) { e.target.classList.add('tek-visible'); }\n    });\n  }, { threshold: 0.05 }).observe(root);\n}());"]

export default function Section8() {
  useEffect(() => {
    setTimeout(() => {
      sectionScripts.forEach((script) => {
        try { new Function(script)() } catch(e) { console.error('Section8 script error:', e) }
      })
    }, 300)
  }, [])
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
}
