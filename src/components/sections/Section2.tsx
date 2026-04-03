"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.sol *, .sol *::before, .sol *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sol {
  --accent:   #47B5FF;
  --navy:     #0B3C5D;
  --bg:       #0E1418;
  --surface:  #131A20;
  --border:   rgba(71,181,255,0.10);
  --border-h: rgba(71,181,255,0.28);
  --text:     #F0F4F7;
  --muted:    #7a9bb5;
  --mono:     'DM Mono', monospace;

  position: relative;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.sol.sol-in { opacity: 1; transform: translateY(0); }

/* Dot grid */
.sol::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(71,181,255,0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none; z-index: 0;
}

/* Subtle deep bloom top-right */
.sol::after {
  content: '';
  position: absolute; top: -20%; right: -10%;
  width: 60%; height: 80%;
  background: radial-gradient(ellipse, rgba(11,60,93,0.45) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}

.sol-wrap {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(80px,9vw,140px) clamp(24px,6%,96px);
}

/* ─── HEADER ─── */
.sol-header {
  text-align: center;
  margin-bottom: clamp(56px,7vw,96px);
}

.sol-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
  opacity: 0;
  animation: sol-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.15s;
}
.sol-eyebrow::before, .sol-eyebrow::after {
  content: ''; width: 32px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.sol-headline {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(52px,7vw,108px);
  font-weight: 900; line-height: 0.9;
  letter-spacing: -0.03em; text-transform: uppercase;
  color: var(--text); margin-bottom: 28px;
  opacity: 0;
  animation: sol-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards 0.28s;
}
.sol-hl-accent {
  display: block;
  background: linear-gradient(100deg, #fff 0%, var(--accent) 55%, #1A6FAD 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.sol-intro {
  font-size: clamp(15px,1.2vw,18px); color: var(--muted);
  line-height: 1.75; max-width: 640px; margin: 0 auto;
  opacity: 0;
  animation: sol-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.42s;
}

/* ─── ACCORDION STACK ─── */
.sol-stack {
  display: flex; flex-direction: column; gap: 0;
  border-top: 1px solid var(--border);
}

.sol-panel {
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.3s;
}
.sol-panel.sol-vis { opacity: 1; transform: translateY(0); }
.sol-panel:nth-child(1) { transition-delay: 0.05s; }
.sol-panel:nth-child(2) { transition-delay: 0.13s; }
.sol-panel:nth-child(3) { transition-delay: 0.21s; }
.sol-panel.sol-open { border-color: var(--border-h); }

/* Trigger row */
.sol-trigger {
  width: 100%; background: none; border: none; cursor: pointer;
  padding: clamp(28px,3.5vw,48px) 0;
  display: grid; grid-template-columns: 56px 1fr 48px;
  align-items: center; gap: 0;
  text-align: left; position: relative;
  transition: background 0.25s;
}
.sol-trigger:hover { background: rgba(71,181,255,0.025); }
.sol-panel.sol-open .sol-trigger { background: rgba(71,181,255,0.03); }

/* Left edge accent rule */
.sol-trigger::before {
  content: ''; position: absolute;
  left: 0; top: 0; bottom: 0; width: 3px;
  transform: scaleY(0); transform-origin: bottom;
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
}
.sol-trigger:hover::before,
.sol-panel.sol-open .sol-trigger::before { transform: scaleY(1); }

/* Number */
.sol-num {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em;
  padding-left: 20px; flex-shrink: 0; line-height: 1;
  opacity: 0.55; transition: opacity 0.25s;
}
.sol-trigger:hover .sol-num,
.sol-panel.sol-open .sol-num { opacity: 1; }

/* Label column */
.sol-label-col { display: flex; flex-direction: column; gap: 8px; padding-right: 32px; }

.sol-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(26px,3.8vw,60px);
  font-weight: 900; text-transform: uppercase;
  letter-spacing: -0.025em; line-height: 1;
  color: var(--text); transition: color 0.25s;
}
.sol-trigger:hover .sol-label,
.sol-panel.sol-open .sol-label { color: #fff; }

.sol-tagline {
  font-size: clamp(13px,1vw,15px); color: var(--muted);
  line-height: 1.55; max-width: 680px; transition: color 0.25s;
}
.sol-trigger:hover .sol-tagline { color: rgba(122,155,181,0.9); }

.sol-trigger-layers { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
.sol-trigger-layer {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(71,181,255,0.5); border: 1px solid rgba(71,181,255,0.18);
  border-radius: 2px; padding: 3px 8px;
  transition: color 0.25s, border-color 0.25s;
}
.sol-trigger:hover .sol-trigger-layer,
.sol-panel.sol-open .sol-trigger-layer { color: rgba(71,181,255,0.85); border-color: rgba(71,181,255,0.38); }

/* Chevron */
.sol-chevron {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.18);
  display: flex; align-items: center; justify-content: center;
  color: var(--muted); font-size: 13px; flex-shrink: 0;
  margin-right: 20px; justify-self: end;
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, color 0.3s, background 0.3s;
}
.sol-panel.sol-open .sol-chevron {
  transform: rotate(180deg);
  border-color: var(--accent); color: var(--accent);
  background: rgba(71,181,255,0.08);
}

/* Body */
.sol-body {
  max-height: 0; overflow: hidden;
  transition: max-height 0.65s cubic-bezier(0.4,0,0.2,1);
}
.sol-panel.sol-open .sol-body { max-height: 1000px; }

.sol-body-inner {
  padding: 0 20px clamp(40px,5vw,64px) 56px;
}

/* 3-col grid */
.sol-grid {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
  gap: clamp(24px,3vw,52px);
  padding-top: 8px;
}

.sol-col-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(71,181,255,0.4);
  margin-bottom: 16px; display: block;
}

/* Col 1 — description */
.sol-desc-text {
  font-size: clamp(14px,1.05vw,16px); color: rgba(240,244,247,0.72);
  line-height: 1.85; margin-bottom: 28px;
}
.sol-powered-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 10px;
}
.sol-layers { display: flex; gap: 8px; flex-wrap: wrap; }
.sol-layer-pill {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); border: 1px solid rgba(71,181,255,0.2);
  border-radius: 2px; padding: 5px 12px; background: rgba(71,181,255,0.04);
}

/* Col 2 — deliverables */
.sol-checks { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
.sol-checks li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: clamp(13px,0.95vw,14px); color: var(--text); line-height: 1.55;
}
.sol-tick {
  width: 18px; height: 18px; border-radius: 50%; border: 1px solid currentColor;
  display: flex; align-items: center; justify-content: center;
  font-size: 8px; flex-shrink: 0; margin-top: 2px;
}

.sol-explore {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text); border: 1px solid rgba(71,181,255,0.25);
  padding: 11px 22px; border-radius: 2px; text-decoration: none;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.sol-explore:hover { background: rgba(71,181,255,0.1); border-color: var(--accent); color: var(--accent); }
.sol-explore-arr { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.sol-explore:hover .sol-explore-arr { transform: translateX(4px); }

/* Col 3 — topics */
.sol-topics { display: flex; flex-wrap: wrap; gap: 7px; }
.sol-topic {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--muted); border: 1px solid rgba(71,181,255,0.14);
  border-radius: 2px; padding: 5px 10px; background: rgba(71,181,255,0.03);
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.sol-topic:hover { color: var(--text); border-color: rgba(71,181,255,0.32); background: rgba(71,181,255,0.07); }

/* ─── FOOTER CTA ─── */
.sol-footer {
  display: flex; align-items: center; justify-content: space-between;
  gap: 32px; flex-wrap: wrap;
  margin-top: clamp(56px,7vw,96px);
  padding-top: 36px; border-top: 1px solid var(--border);
}
.sol-footer-copy {
  font-size: clamp(13px,1vw,15px); color: var(--muted);
  line-height: 1.75; max-width: 520px;
}
.sol-footer-btns { display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap; }
.sol-btn-p {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
  color: #fff; background: var(--navy); border: 1px solid var(--accent);
  border-radius: 2px; padding: 14px 28px; text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.sol-btn-p:hover { background: var(--accent); color: var(--navy); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(71,181,255,0.25); }
.sol-btn-g {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted); background: transparent; border: 1px solid rgba(71,181,255,0.18);
  border-radius: 2px; padding: 14px 28px; text-decoration: none;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}
.sol-btn-g:hover { border-color: var(--accent); color: var(--text); background: rgba(71,181,255,0.06); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1024px) {
  .sol-grid { grid-template-columns: 1fr 1fr; }
  .sol-col-desc { grid-column: 1 / 3; }
}
@media (max-width: 768px) {
  .sol-body-inner { padding-left: 20px; }
  .sol-grid { grid-template-columns: 1fr; }
  .sol-col-desc { grid-column: 1 / 2; }
  .sol-trigger { grid-template-columns: 44px 1fr 40px; }
  .sol-footer { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .sol-body-inner { padding-left: 12px; }
  .sol-footer-btns { flex-direction: column; width: 100%; }
  .sol-btn-p, .sol-btn-g { justify-content: center; }
}
@media (min-width: 1800px) {
  .sol-wrap { max-width: 1600px; }
  .sol-headline { font-size: clamp(80px,6vw,120px); }
}
@media (min-width: 2400px) {
  .sol-wrap { max-width: 1920px; }
}

@keyframes sol-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

<section class="sol" id="solRoot" aria-labelledby="solHeadline">
  <div class="sol-wrap">

    <!-- Header -->
    <header class="sol-header">
      <div class="sol-eyebrow">Advanced BIM &amp; Digital Delivery</div>
      <h2 class="sol-headline" id="solHeadline">
        Our
        <span class="sol-hl-accent">Three Core</span>
        Solutions
      </h2>
      <p class="sol-intro">Three integrated solution families covering the full project lifecycle — from information governance to operational asset intelligence.</p>
    </header>

    <!-- Accordion stack -->
    <div class="sol-stack" id="solStack">

      <!-- ── 01 ── -->
      <div class="sol-panel" data-color="#1A6FAD" id="solP1">
        <button class="sol-trigger" aria-expanded="false" aria-controls="solB1">
          <span class="sol-num" style="color:#1A6FAD;">01</span>
          <span class="sol-label-col">
            <span class="sol-label">Information Strategy &amp; Governance</span>
            <span class="sol-tagline">The information control layer — defining governance, requirements, and data architecture before delivery begins.</span>
            <span class="sol-trigger-layers">
              <span class="sol-trigger-layer">Strategy</span>
              <span class="sol-trigger-layer">Structure</span>
            </span>
          </span>
          <span class="sol-chevron" aria-hidden="true">▾</span>
        </button>
        <div class="sol-body" id="solB1" role="region" aria-labelledby="solP1">
          <div class="sol-body-inner">
            <div class="sol-grid">
              <div class="sol-col-desc">
                <span class="sol-col-label">Overview</span>
                <p class="sol-desc-text">We establish the information management foundation that brings order before chaos can start. From BIM strategy to CDE configuration, this solution defines the rules, requirements, and governance structures that every downstream team depends on. Applicable at programme inception, mid-delivery reset, or full digital maturity review.</p>
                <p class="sol-powered-label">Powered by</p>
                <div class="sol-layers">
                  <span class="sol-layer-pill">Strategy</span>
                  <span class="sol-layer-pill">Structure</span>
                </div>
              </div>
              <div>
                <span class="sol-col-label">Key Deliverables</span>
                <ul class="sol-checks">
                  <li><span class="sol-tick" style="color:#1A6FAD;">✓</span><span>BIM / Information Management strategy &amp; BEP / EIR</span></li>
                  <li><span class="sol-tick" style="color:#1A6FAD;">✓</span><span>Common Data Environment setup &amp; governance protocols</span></li>
                  <li><span class="sol-tick" style="color:#1A6FAD;">✓</span><span>Naming conventions, classification logic &amp; LOD / LOI frameworks</span></li>
                  <li><span class="sol-tick" style="color:#1A6FAD;">✓</span><span>Digital delivery roadmaps &amp; information requirements</span></li>
                </ul>
                <a href="/solutions/strategy" class="sol-explore">Explore Solution <span class="sol-explore-arr">→</span></a>
              </div>
              <div>
                <span class="sol-col-label">Scope Areas</span>
                <div class="sol-topics">
                  <span class="sol-topic">BIM Strategy</span>
                  <span class="sol-topic">EIR / BEP</span>
                  <span class="sol-topic">CDE Configuration</span>
                  <span class="sol-topic">Naming Conventions</span>
                  <span class="sol-topic">Classification Logic</span>
                  <span class="sol-topic">LOD / LOI Frameworks</span>
                  <span class="sol-topic">Governance Protocols</span>
                  <span class="sol-topic">ISO 19650</span>
                  <span class="sol-topic">Digital Delivery Roadmap</span>
                  <span class="sol-topic">Digital Maturity Assessment</span>
                  <span class="sol-topic">Enterprise BIM Standards</span>
                  <span class="sol-topic">RFP Digital Specification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 02 ── -->
      <div class="sol-panel" data-color="#2788CC" id="solP2">
        <button class="sol-trigger" aria-expanded="false" aria-controls="solB2">
          <span class="sol-num" style="color:#2788CC;">02</span>
          <span class="sol-label-col">
            <span class="sol-label">Digital Delivery &amp; Construction Control</span>
            <span class="sol-tagline">The production and field delivery layer — turning structured information into coordinated output and construction control.</span>
            <span class="sol-trigger-layers">
              <span class="sol-trigger-layer">Intelligence</span>
              <span class="sol-trigger-layer">Execution</span>
            </span>
          </span>
          <span class="sol-chevron" aria-hidden="true">▾</span>
        </button>
        <div class="sol-body" id="solB2" role="region" aria-labelledby="solP2">
          <div class="sol-body-inner">
            <div class="sol-grid">
              <div class="sol-col-desc">
                <span class="sol-col-label">Overview</span>
                <p class="sol-desc-text">This solution bridges design coordination with physical delivery. We deploy model intelligence, federated coordination, and field-ready digital tools that keep your construction programme on track and data-rich from first fix to practical completion. Precision from drawing to field, backed by model-based evidence.</p>
                <p class="sol-powered-label">Powered by</p>
                <div class="sol-layers">
                  <span class="sol-layer-pill">Intelligence</span>
                  <span class="sol-layer-pill">Execution</span>
                </div>
              </div>
              <div>
                <span class="sol-col-label">Key Deliverables</span>
                <ul class="sol-checks">
                  <li><span class="sol-tick" style="color:#2788CC;">✓</span><span>BIM modelling, federation, clash detection &amp; constructability</span></li>
                  <li><span class="sol-tick" style="color:#2788CC;">✓</span><span>Scan-to-BIM, 4D sequencing &amp; digital work packaging</span></li>
                  <li><span class="sol-tick" style="color:#2788CC;">✓</span><span>Field BIM deployment &amp; model-based QA / compliance</span></li>
                  <li><span class="sol-tick" style="color:#2788CC;">✓</span><span>Construction validation &amp; progress tracking via live model</span></li>
                </ul>
                <a href="/solutions/intelligence" class="sol-explore">Explore Solution <span class="sol-explore-arr">→</span></a>
              </div>
              <div>
                <span class="sol-col-label">Scope Areas</span>
                <div class="sol-topics">
                  <span class="sol-topic">BIM Modelling</span>
                  <span class="sol-topic">Model Federation</span>
                  <span class="sol-topic">Clash Detection</span>
                  <span class="sol-topic">Scan-to-BIM</span>
                  <span class="sol-topic">4D Sequencing</span>
                  <span class="sol-topic">Digital Work Packaging</span>
                  <span class="sol-topic">Field BIM</span>
                  <span class="sol-topic">Model QA / Compliance</span>
                  <span class="sol-topic">Quantity Verification</span>
                  <span class="sol-topic">Construction Validation</span>
                  <span class="sol-topic">Geo-Spatial Integration</span>
                  <span class="sol-topic">Production vs Plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 03 ── -->
      <div class="sol-panel" data-color="#47B5FF" id="solP3">
        <button class="sol-trigger" aria-expanded="false" aria-controls="solB3">
          <span class="sol-num" style="color:#47B5FF;">03</span>
          <span class="sol-label-col">
            <span class="sol-label">Asset Intelligence &amp; Digital Twin</span>
            <span class="sol-tagline">The handover-to-operations layer — making project data usable after construction and positioning it for long-term asset value.</span>
            <span class="sol-trigger-layers">
              <span class="sol-trigger-layer">Project Twin</span>
              <span class="sol-trigger-layer">Insights</span>
            </span>
          </span>
          <span class="sol-chevron" aria-hidden="true">▾</span>
        </button>
        <div class="sol-body" id="solB3" role="region" aria-labelledby="solP3">
          <div class="sol-body-inner">
            <div class="sol-grid">
              <div class="sol-col-desc">
                <span class="sol-col-label">Overview</span>
                <p class="sol-desc-text">This solution extends digital delivery beyond handover. We structure verified as-builts, COBie and AIM outputs, and build the dashboards and digital twin foundations that give owners and operators real visibility into their assets from day one of operations. Data built for delivery, engineered for long-term value.</p>
                <p class="sol-powered-label">Powered by</p>
                <div class="sol-layers">
                  <span class="sol-layer-pill">Project Twin</span>
                  <span class="sol-layer-pill">Insights</span>
                </div>
              </div>
              <div>
                <span class="sol-col-label">Key Deliverables</span>
                <ul class="sol-checks">
                  <li><span class="sol-tick" style="color:#47B5FF;">✓</span><span>Verified as-builts, COBie / structured handover &amp; AIM</span></li>
                  <li><span class="sol-tick" style="color:#47B5FF;">✓</span><span>Digital twin foundations, dashboards &amp; operational readiness</span></li>
                  <li><span class="sol-tick" style="color:#47B5FF;">✓</span><span>BIM auditing, 5D analytics &amp; progress intelligence</span></li>
                  <li><span class="sol-tick" style="color:#47B5FF;">✓</span><span>Executive reporting &amp; lifecycle asset intelligence</span></li>
                </ul>
                <a href="/solutions/project-twin" class="sol-explore">Explore Solution <span class="sol-explore-arr">→</span></a>
              </div>
              <div>
                <span class="sol-col-label">Scope Areas</span>
                <div class="sol-topics">
                  <span class="sol-topic">Verified As-Builts</span>
                  <span class="sol-topic">COBie / Handover</span>
                  <span class="sol-topic">Asset Information Modelling</span>
                  <span class="sol-topic">Digital Twin</span>
                  <span class="sol-topic">BIM Auditing</span>
                  <span class="sol-topic">Operational Dashboards</span>
                  <span class="sol-topic">5D Analytics</span>
                  <span class="sol-topic">Progress Intelligence</span>
                  <span class="sol-topic">KPI Modelling</span>
                  <span class="sol-topic">Executive Reporting</span>
                  <span class="sol-topic">Lifecycle Analytics</span>
                  <span class="sol-topic">Operational Readiness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer CTA -->
    <div class="sol-footer">
      <p class="sol-footer-copy">Three solution families. One delivery system. Built around ISO 19650, whole-life information management, and the structured governance that complex infrastructure demands.</p>
      <div class="sol-footer-btns">
        <a href="/contact" class="sol-btn-p">Schedule a Discovery Call</a>
        <a href="/solutions" class="sol-btn-g">View All Solutions</a>
      </div>
    </div>

  </div>
</section>`

const sectionScript = `
(function(){
'use strict';

var root = document.getElementById('solRoot');
if (!root) return;

/* ── Section scroll reveal ── */
var revealIO = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('sol-in'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.06 });
revealIO.observe(root);

/* ── Panel stagger reveal ── */
var panels = Array.from(document.querySelectorAll('.sol-panel'));
var panelIO = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('sol-vis'); panelIO.unobserve(e.target); }
  });
}, { threshold: 0.05 });
panels.forEach(function(p){ panelIO.observe(p); });

/* ── Color accent bar per panel ── */
panels.forEach(function(panel){
  var color = panel.getAttribute('data-color') || '#47B5FF';
  var trigger = panel.querySelector('.sol-trigger');
  if (trigger){
    trigger.style.setProperty('--edge-color', color);
    /* inject pseudo-element color via a style tag approach */
    var styleId = 'sol-style-' + panel.id;
    if (!document.getElementById(styleId)){
      var s = document.createElement('style');
      s.id = styleId;
      s.textContent = '#' + panel.id + ' .sol-trigger::before { background: ' + color + '; }';
      document.head.appendChild(s);
    }
  }
});

/* ── Accordion ── */
panels.forEach(function(panel){
  var trigger = panel.querySelector('.sol-trigger');
  var body    = panel.querySelector('.sol-body');
  if (!trigger || !body) return;

  trigger.addEventListener('click', function(){
    var isOpen = panel.classList.contains('sol-open');

    /* Close all panels */
    panels.forEach(function(p){
      p.classList.remove('sol-open');
      var t = p.querySelector('.sol-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });

    /* Open this one if it was closed */
    if (!isOpen){
      panel.classList.add('sol-open');
      trigger.setAttribute('aria-expanded', 'true');
      /* Keep opening panel visible */
      setTimeout(function(){
        var rect = panel.getBoundingClientRect();
        if (rect.top < 80){
          window.scrollBy({ top: rect.top - 80, behavior: 'smooth' });
        }
      }, 80);
    }
  });

  /* Keyboard */
  trigger.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      trigger.click();
    }
  });
});

}());
`

export default function Section2() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section2 script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
  )
}
