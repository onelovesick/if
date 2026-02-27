'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .str-services-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 60%;
    background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,60,93,0.35) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .str-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .str-services-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .str-services-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 24px;
  }

  .str-services-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-services h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 20px 0;
  }

  .str-services h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-services-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 640px;
    margin: 0 auto;
  }

  /* ═══════════════════════════════════
     4 PILLAR CARDS — 2x2 Grid
     ═══════════════════════════════════ */
  .str-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 64px;
  }

  .str-svc-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10);
    padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    backdrop-filter: blur(4px);
    overflow: visible;
    cursor: default;
  }

  .str-svc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25);
    border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .str-svc-card::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25);
    border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .str-svc-card:hover {
    background: rgba(71,181,255,0.03);
    border-color: rgba(71,181,255,0.18);
  }

  .str-svc-card:hover::before,
  .str-svc-card:hover::after {
    border-color: rgba(71,181,255,0.45);
  }

  .str-svc-accent {
    position: absolute;
    top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .str-svc-card:hover .str-svc-accent {
    width: 100%;
  }

  .str-svc-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .str-svc-card-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .str-svc-card-count {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(122,155,181,0.4);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 3px 10px;
  }

  .str-svc-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.01em;
    color: #F4F6F8;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .str-svc-card:hover h3 {
    color: #47B5FF;
  }

  .str-svc-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.75;
    color: #7a9bb5;
    margin: 0 0 28px 0;
  }

  /* ── Service items with tooltips ── */
  .str-svc-items {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .str-svc-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: rgba(244,246,248,0.7);
    transition: color 0.2s ease, padding-left 0.2s ease;
    cursor: default;
  }

  .str-svc-item:hover {
    color: #F4F6F8;
    padding-left: 6px;
  }

  .str-svc-item::before {
    content: '→';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.5;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
  }

  .str-svc-item:hover::before {
    opacity: 1;
  }

  /* Info icon */
  .str-svc-item-info {
    margin-left: auto;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.15);
    border-radius: 50%;
    transition: all 0.2s ease;
    cursor: help;
  }

  .str-svc-item:hover .str-svc-item-info {
    color: #47B5FF;
    border-color: rgba(71,181,255,0.4);
  }

  /* Tooltip */
  .str-svc-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2);
    padding: 14px 18px;
    width: 300px;
    z-index: 100;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .str-svc-item:hover .str-svc-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }

  /* Tooltip arrow */
  .str-svc-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #0B3C5D;
  }

  .str-svc-tooltip p {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(244,246,248,0.85);
    margin: 0;
  }

  .str-svc-tooltip-title {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 6px;
    display: block;
  }

  /* + More note per card */
  .str-svc-more {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(122,155,181,0.4);
    transition: color 0.2s ease;
  }

  .str-svc-more::before {
    content: '+';
    color: rgba(71,181,255,0.3);
    font-size: 13px;
  }

  /* ═══════════════════════════════════
     DELIVERABLES TAG STRIP
     ═══════════════════════════════════ */
  .str-deliverables {
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .str-deliverables-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    margin-bottom: 20px;
    text-align: center;
  }

  .str-deliverables-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .str-del-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(244,246,248,0.45);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 7px 16px;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .str-del-tag:hover {
    border-color: rgba(71,181,255,0.35);
    color: #47B5FF;
  }

  /* ═══════════════════════════════════
     CTA STRIP — "Don't see what you need?"
     ═══════════════════════════════════ */
  .str-services-cta-strip {
    margin-top: 56px;
    padding: 40px 0;
    border-top: 1px solid rgba(71,181,255,0.08);
    border-bottom: 1px solid rgba(71,181,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .str-services-cta-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #7a9bb5;
  }

  .str-services-cta-text strong {
    color: #F4F6F8;
    font-weight: 600;
  }

  .str-services-cta-btn {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1C1F23;
    background: #47B5FF;
    border: 1px solid #47B5FF;
    padding: 14px 32px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .str-services-cta-btn:hover {
    background: #3a9fe0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(71,181,255,0.2);
  }

  /* ISO footer */
  .str-services-iso {
    text-align: center;
    margin-top: 40px;
  }

  .str-services-iso span {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.35);
  }

  /* ═══════════════════════════════════
     Responsive
     ═══════════════════════════════════ */
  @media (max-width: 900px) {
    .str-services-grid {
      grid-template-columns: 1fr;
    }
    .str-services {
      padding: 80px 20px;
    }
    .str-svc-tooltip {
      width: 240px;
      left: 20%;
    }
    .str-services-cta-strip {
      flex-direction: column;
      text-align: center;
      gap: 20px;
    }
  }

  /* Touch devices — tooltip on tap */
  @media (hover: none) {
    .str-svc-tooltip {
      display: none;
    }
    .str-svc-item.str-tooltip-active .str-svc-tooltip {
      display: block;
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
  }
</style>

<section class="str-services">
  <div class="str-services-glow"></div>
  <div class="str-services-inner">
    <div class="str-services-header">
      <div class="str-services-eyebrow">What We Deliver</div>
      <h2>Strategy Layer <em>Services</em></h2>
      <p class="str-services-subtitle">
        The strategic layer defines the information backbone of your programme. Four pillars, dozens of deliverables — each one engineered to prevent downstream failure.
      </p>
    </div>

    <div class="str-services-grid">

      <!-- PILLAR 01 — Information Requirements -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 01</span>
          <span class="str-svc-card-count">8 Services</span>
        </div>
        <h3>Information Requirements</h3>
        <p class="str-svc-card-desc">Define what information is needed, by whom, at what stage, and to what standard — from organisational objectives down to exchange-level specifics.</p>
        <div class="str-svc-items">
          <div class="str-svc-item" data-tip>
            OIR — Organisational Information Requirements
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">OIR</span>
              <p>High-level information needs aligned to your organisation's strategic objectives, asset management policies, and operational goals.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            PIR — Project Information Requirements
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">PIR</span>
              <p>Project-specific information needs derived from OIR, defining what data is required to support key decision points throughout delivery.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            AIR — Asset Information Requirements
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">AIR</span>
              <p>Defines the information needed to operate, maintain, and manage the asset post-handover — the bridge between construction and facilities management.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            EIR — Exchange Information Requirements
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">EIR</span>
              <p>Contractually enforceable requirements specifying what information each appointed party must deliver, when, in what format, and to what standard.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Level of Information Need (LOD / LOI)
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">LOD / LOI</span>
              <p>Frameworks defining the required geometric detail (LOD) and non-geometric data (LOI) for every element at each project stage — preventing over- and under-modelling.</p>
            </div>
          </div>
          <div class="str-svc-item">Information Delivery Milestone Planning</div>
          <div class="str-svc-item" data-tip>
            PIM to AIM Transition Strategy
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">PIM → AIM</span>
              <p>Planning what data survives construction, in what format, for whose use — so the Project Information Model transitions cleanly into an Asset Information Model.</p>
            </div>
          </div>
          <div class="str-svc-item">Contractual BIM Requirement Embedding</div>
        </div>
        <div class="str-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 — Execution Planning -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 02</span>
          <span class="str-svc-card-count">8 Services</span>
        </div>
        <h3>BIM Execution Planning</h3>
        <p class="str-svc-card-desc">Author BEPs that teams actually follow — governance documents that map responsibilities, exchanges, and coordination protocols to how your project really operates.</p>
        <div class="str-svc-items">
          <div class="str-svc-item" data-tip>
            Pre-Appointment BEP Development
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Pre-Appointment BEP</span>
              <p>Developed during tender to demonstrate capability, capacity, and proposed approach to meeting the appointing party's EIR.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Post-Appointment BEP Development
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Post-Appointment BEP</span>
              <p>The confirmed execution plan developed after contract award — detailed schedules, confirmed responsibilities, and agreed protocols for the delivery team.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Responsibility Matrices (RACI)
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">RACI</span>
              <p>Clarifies who is Responsible, Accountable, Consulted, and Informed for every information deliverable across all appointed parties.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Task Information Delivery Plans (TIDP)
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">TIDP</span>
              <p>Task-level plans from each appointed party detailing what information they will produce, when, and the resources required.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Master Information Delivery Plans (MIDP)
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">MIDP</span>
              <p>Compiled from all TIDPs — a single schedule of every information deliverable, its sequence, and when it must be exchanged across the full delivery team.</p>
            </div>
          </div>
          <div class="str-svc-item">Model Production Scheduling</div>
          <div class="str-svc-item">BIM Use Case Identification & Mapping</div>
          <div class="str-svc-item">Information Protocol & Legal Frameworks</div>
        </div>
        <div class="str-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 — Digital Roadmaps & Maturity -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 03</span>
          <span class="str-svc-card-count">7 Services</span>
        </div>
        <h3>Digital Roadmaps & Maturity</h3>
        <p class="str-svc-card-desc">Phased implementation plans that match digital ambition to organisational readiness — technology stack, workflows, training, and adoption sequenced without over-engineering.</p>
        <div class="str-svc-items">
          <div class="str-svc-item" data-tip>
            Digital Maturity Assessment
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Maturity Assessment</span>
              <p>Benchmarks your organisation's current digital capability across people, process, and technology — identifying gaps and realistic next steps.</p>
            </div>
          </div>
          <div class="str-svc-item">Phased Implementation Roadmaps</div>
          <div class="str-svc-item" data-tip>
            Technology Stack Evaluation & Selection
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Tech Stack</span>
              <p>Platform-agnostic evaluation — Autodesk, Bentley, Procore, or others. We recommend what fits your programme, not what fits a vendor relationship.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            CDE Strategy & Platform Selection
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">CDE Strategy</span>
              <p>Selecting and structuring the Common Data Environment — workflows, access controls, naming conventions, and approval gates before any platform is deployed.</p>
            </div>
          </div>
          <div class="str-svc-item">Training & Capability Development Planning</div>
          <div class="str-svc-item">Change Management & Adoption Strategy</div>
          <div class="str-svc-item">Digital Delivery KPI Frameworks</div>
        </div>
        <div class="str-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 — Risk & Governance -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 04</span>
          <span class="str-svc-card-count">7 Services</span>
        </div>
        <h3>Risk Assessment & Governance</h3>
        <p class="str-svc-card-desc">Identify information risk before it becomes project risk. Gap analyses, compliance reviews, and governance frameworks that surface vulnerabilities early and maintain control.</p>
        <div class="str-svc-items">
          <div class="str-svc-item">Information Risk Registers</div>
          <div class="str-svc-item" data-tip>
            Gap Analysis & Compliance Audits
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Gap Analysis</span>
              <p>Assessing current information management practices against ISO 19650 requirements — identifying where processes, technologies, and competencies fall short.</p>
            </div>
          </div>
          <div class="str-svc-item">Contractual BIM Alignment Review</div>
          <div class="str-svc-item" data-tip>
            Stakeholder Readiness Assessment
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">Readiness</span>
              <p>Evaluates whether key stakeholders — owners, contractors, design teams — have the capability, tools, and understanding to deliver on BIM requirements.</p>
            </div>
          </div>
          <div class="str-svc-item" data-tip>
            Information Security Planning (ISO 19650-5)
            <span class="str-svc-item-info">i</span>
            <div class="str-svc-tooltip">
              <span class="str-svc-tooltip-title">ISO 19650-5</span>
              <p>Security-minded approach to information management — classifying sensitive data, defining access controls, and mitigating information security risks.</p>
            </div>
          </div>
          <div class="str-svc-item">Procurement & Tender BIM Support</div>
          <div class="str-svc-item">RFP / RFQ BIM Specification Writing</div>
        </div>
        <div class="str-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="str-deliverables">
      <div class="str-deliverables-label">Key Deliverables</div>
      <div class="str-deliverables-tags">
        <span class="str-del-tag">BEP</span>
        <span class="str-del-tag">EIR</span>
        <span class="str-del-tag">OIR</span>
        <span class="str-del-tag">AIR</span>
        <span class="str-del-tag">PIR</span>
        <span class="str-del-tag">TIDP</span>
        <span class="str-del-tag">MIDP</span>
        <span class="str-del-tag">RACI</span>
        <span class="str-del-tag">Risk Register</span>
        <span class="str-del-tag">LOD / LOI Matrix</span>
        <span class="str-del-tag">Digital Roadmap</span>
        <span class="str-del-tag">Maturity Assessment</span>
        <span class="str-del-tag">CDE Strategy</span>
        <span class="str-del-tag">Information Protocol</span>
        <span class="str-del-tag">PIM → AIM Plan</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="str-services-cta-strip">
      <span class="str-services-cta-text"><strong>Don't see what you need?</strong> Our strategy services extend beyond what's listed here.</span>
      <a href="/contact/" class="str-services-cta-btn" data-contact-modal>Discuss Your Programme →</a>
    </div>

    <div class="str-services-iso">
      <span>Aligned to ISO 19650-1 · 19650-2 · 19650-3 · 19650-5</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  /* Card stagger */
  var cards = document.querySelectorAll('[data-svc]');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(card);
  });

  /* Tag stagger */
  var tags = document.querySelectorAll('.str-del-tag');
  tags.forEach(function(tag, i) {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, color 0.3s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, i * 50);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(tag);
  });

  /* Touch device tooltip toggle */
  var tipItems = document.querySelectorAll('[data-tip]');
  tipItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      var wasActive = item.classList.contains('str-tooltip-active');
      tipItems.forEach(function(ti) { ti.classList.remove('str-tooltip-active'); });
      if (!wasActive) {
        item.classList.add('str-tooltip-active');
      }
    });
  });

  /* Close tooltips on outside click */
  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-tip]')) {
      tipItems.forEach(function(ti) { ti.classList.remove('str-tooltip-active'); });
    }
  });
})();`;

export default function StrategyServices() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const timer = setTimeout(() => { try { new Function(script)(); } catch(e) { console.error(e); } }, 300);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
