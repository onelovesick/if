'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .exec-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .exec-services-glow {
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

  .exec-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .exec-services-header { text-align: center; margin-bottom: 72px; }

  .exec-services-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .exec-services-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .exec-services h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px 0;
  }
  .exec-services h2 em { font-style: italic; color: #47B5FF; }

  .exec-services-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 660px; margin: 0 auto;
  }

  .exec-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 64px; }

  .exec-svc-card {
    position: relative; background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10); padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1); backdrop-filter: blur(4px); overflow: visible;
  }
  .exec-svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .exec-svc-card::after {
    content: ''; position: absolute; bottom: 0; right: 0; width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .exec-svc-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); }
  .exec-svc-card:hover::before, .exec-svc-card:hover::after { border-color: rgba(71,181,255,0.45); }

  .exec-svc-accent {
    position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .exec-svc-card:hover .exec-svc-accent { width: 100%; }

  .exec-svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .exec-svc-card-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; }
  .exec-svc-card-count { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(122,155,181,0.4); border: 1px solid rgba(71,181,255,0.1); padding: 3px 10px; }

  .exec-svc-card h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 20px;
    letter-spacing: -0.01em; color: #F4F6F8; margin: 0 0 12px 0;
    text-transform: uppercase; transition: color 0.3s ease;
  }
  .exec-svc-card:hover h3 { color: #47B5FF; }

  .exec-svc-card-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.75; color: #7a9bb5; margin: 0 0 28px 0; }

  .exec-svc-items { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(71,181,255,0.08); }

  .exec-svc-item {
    position: relative; display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400;
    color: rgba(244,246,248,0.7); transition: color 0.2s ease, padding-left 0.2s ease; cursor: default;
  }
  .exec-svc-item:hover { color: #F4F6F8; padding-left: 6px; }
  .exec-svc-item::before { content: '\u2192'; font-size: 11px; color: #47B5FF; opacity: 0.5; flex-shrink: 0; transition: opacity 0.2s ease; }
  .exec-svc-item:hover::before { opacity: 1; }

  .exec-svc-item-info {
    position: relative; margin-left: auto; flex-shrink: 0; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    color: rgba(71,181,255,0.55); border: 1px solid rgba(71,181,255,0.3);
    border-radius: 50%; transition: all 0.2s ease; cursor: help;
  }
  .exec-svc-item-info:hover { color: #47B5FF; border-color: #47B5FF; background: rgba(71,181,255,0.08); }

  .exec-svc-tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(6px); background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2); padding: 14px 18px; width: 300px;
    z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .exec-svc-item.exec-tip-visible .exec-svc-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .exec-svc-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #0B3C5D; }
  .exec-svc-tooltip p { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.7; color: rgba(244,246,248,0.85); margin: 0; }
  .exec-svc-tooltip-title { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #47B5FF; margin-bottom: 6px; display: block; }

  .exec-svc-more {
    display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px;
    border-top: 1px dashed rgba(71,181,255,0.1); font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400; color: rgba(122,155,181,0.5); letter-spacing: 0.01em;
  }
  .exec-svc-more::before { content: '+'; color: rgba(71,181,255,0.4); font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; }

  .exec-deliverables { padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.08); }
  .exec-deliverables-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 20px; text-align: center; }
  .exec-deliverables-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .exec-del-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244,246,248,0.45); border: 1px solid rgba(71,181,255,0.1); padding: 7px 16px; transition: all 0.3s ease; white-space: nowrap; }
  .exec-del-tag:hover { border-color: rgba(71,181,255,0.35); color: #47B5FF; }

  .exec-services-cta-strip { margin-top: 56px; padding: 40px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
  .exec-services-cta-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #7a9bb5; }
  .exec-services-cta-text strong { color: #F4F6F8; font-weight: 600; }
  .exec-services-cta-btn { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF; padding: 14px 32px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
  .exec-services-cta-btn:hover { background: #3a9fe0; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.2); }

  .exec-services-iso { text-align: center; margin-top: 40px; }
  .exec-services-iso span { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  @media (max-width: 900px) {
    .exec-services-grid { grid-template-columns: 1fr; }
    .exec-services { padding: 80px 20px; }
    .exec-svc-tooltip { width: 240px; left: 20%; }
    .exec-services-cta-strip { flex-direction: column; text-align: center; gap: 20px; }
  }
  @media (hover: none) {
    .exec-svc-tooltip { display: none; }
    .exec-svc-item.exec-tip-visible .exec-svc-tooltip { display: block; opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  }
</style>

<section class="exec-services">
  <div class="exec-services-glow"></div>
  <div class="exec-services-inner">
    <div class="exec-services-header">
      <div class="exec-services-eyebrow">What We Deliver</div>
      <h2>Execution Layer <em>Services</em></h2>
      <p class="exec-services-subtitle">The execution layer implements integrated digital delivery \u2014 connecting models, schedules, work packages, field data, and verification into a single digital backbone. Five pillars covering scheduling, work packaging, field integration, progress verification, and inspections.</p>
    </div>

    <div class="exec-services-grid">

      <!-- PILLAR 01 — 4D Scheduling & Construction Simulation -->
      <div class="exec-svc-card" data-exec-svc>
        <div class="exec-svc-accent"></div>
        <div class="exec-svc-card-header">
          <span class="exec-svc-card-label">Pillar 01</span>
          <span class="exec-svc-card-count">Synchro \u00b7 Navisworks \u00b7 Powerproject</span>
        </div>
        <h3>4D Scheduling &amp; Simulation</h3>
        <p class="exec-svc-card-desc">Linking model elements to programme activities so construction sequences are spatially validated before mobilisation. Not Gantt charts with geometry \u2014 simulations that reveal sequencing conflicts, logistics clashes, and phasing risks before they cost money on site.</p>
        <div class="exec-svc-items">
          <div class="exec-svc-item" data-exec-tip>4D Model Linking &amp; Schedule Integration<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">4D Linking</span><p>Connecting every model element to its corresponding schedule activity. Changes in the programme are visible in the model and vice versa \u2014 a single source of truth for what gets built when.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Construction Sequence Simulation<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Simulation</span><p>Animated construction playback showing phasing, trade stacking, access routes, and critical path validation. Visual proof that the sequence works before a single crew mobilises.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Phasing &amp; Zone Planning<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Phasing</span><p>Defining construction zones, work faces, and phasing boundaries within the model. Ensuring trades don\u2019t overlap in space or time and that site logistics support the sequence.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Logistics, Crane &amp; Temporary Works Planning<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Logistics</span><p>Crane placement, material staging, temporary structures, and access routes modelled in 3D and validated against the construction sequence. Temporary works integrated into the BIM.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Schedule Risk &amp; Critical Path Analysis<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Risk</span><p>Using the 4D simulation to identify critical path conflicts, resource bottlenecks, and sequence dependencies invisible in a flat Gantt chart. Scenario planning for weather, procurement, and access constraints.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Baseline &amp; Re-Baseline Tracking<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Baseline</span><p>Capturing planned vs. actual at each milestone. Visual comparison of where the project should be vs. where it is \u2014 measured from the model, not estimated from a spreadsheet.</p></div></div>
        </div>
        <div class="exec-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 — Digital Work Packaging -->
      <div class="exec-svc-card" data-exec-svc>
        <div class="exec-svc-accent"></div>
        <div class="exec-svc-card-header">
          <span class="exec-svc-card-label">Pillar 02</span>
          <span class="exec-svc-card-count">BIM 360 \u00b7 Procore \u00b7 Dalux</span>
        </div>
        <h3>Digital Work Packaging</h3>
        <p class="exec-svc-card-desc">Scoped, trade-specific digital work packages that integrate shop drawings, fabrication models, and quality forms into a single deliverable per work face. Not a 500MB file dump \u2014 the right information for the right crew at the right time.</p>
        <div class="exec-svc-items">
          <div class="exec-svc-item" data-exec-tip>Trade-Specific Work Package Structuring<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Work Packages</span><p>Scoped model views filtered by trade, zone, and phase. The mechanical crew sees mechanical. The electrician sees electrical. Each package contains only what that crew needs to execute.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Shop Drawing Integration into Design BIM<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Shop Drawings</span><p>Coordinating supplier and subcontractor shop drawings back into the design BIM \u2014 so fabrication models, connection details, and assembly drawings are verified against the coordinated model before production.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Fabrication Model Coordination<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Fabrication</span><p>3D coordination of fabrication models from steel, precast, MEP, and curtain wall subcontractors against the design BIM. Clash-free fabrication data that feeds directly to CNC and shop production.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Quality Form Linkage to Packages<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Quality Forms</span><p>Connecting digital quality forms and inspection checklists to specific work packages \u2014 so every installed element has a traceable QA/QC record linked to the lot, the model element, and the CDE.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Field Modification &amp; Redlining Integration<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Redlining</span><p>Capturing field modifications, redlines, and site-driven design changes and feeding them back into the model. Closing the loop so the digital asset reflects what was actually built, not what was originally designed.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Look-Ahead &amp; Prefabrication Packages<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Look-Ahead</span><p>Weekly and bi-weekly look-ahead packages generated from the 4D model with visual context. Prefabrication packages with spool sheets, assembly instructions, and delivery sequencing.</p></div></div>
        </div>
        <div class="exec-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 — Field Integration & Data Capture -->
      <div class="exec-svc-card" data-exec-svc>
        <div class="exec-svc-accent"></div>
        <div class="exec-svc-card-header">
          <span class="exec-svc-card-label">Pillar 03</span>
          <span class="exec-svc-card-count">Faro \u00b7 OpenSpace \u00b7 Power BI</span>
        </div>
        <h3>Field Integration &amp; Data Capture</h3>
        <p class="exec-svc-card-desc">Closing the gap between the design model and the as-built reality. Shop drawings, temporary works, and as-built conditions modelled during construction \u2014 not reconstructed after. Field data flows back into the project ecosystem in real time.</p>
        <div class="exec-svc-items">
          <div class="exec-svc-item" data-exec-tip>As-Built Modelling During Construction<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">As-Built</span><p>Updating the BIM progressively during construction to reflect what was actually installed \u2014 not waiting until handover to discover the model doesn\u2019t match the building. Integrated with progressive design workflows.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Temporary Works Integration<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Temp Works</span><p>Modelling formwork, shoring, scaffolding, and temporary structures in the BIM for sequencing validation, safety planning, and logistics coordination. Temporary works are construction elements \u2014 they belong in the model.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Reality Capture for Progress Monitoring<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Reality Capture</span><p>Periodic drone, LiDAR, or 360\u00b0 captures compared against the model and 4D schedule to verify installation progress. Visual evidence that doesn\u2019t rely on self-reporting.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Quantity Change &amp; Growth Tracking<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Quantity Tracking</span><p>Tracking quantity changes, scope growth, and design modifications during construction against the original model. Field data capture that feeds cost control and change management.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Design Issue Tracking Against Live Construction<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Issue Tracking</span><p>Tracking construction progress against live design issues for progressive design projects \u2014 where design and construction run in parallel and the model evolves as the building rises.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Field BIM Deployment &amp; Mobile Access<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Field BIM</span><p>Configuring models for tablet and mobile access at the work face. Lightweight views, offline capability, and field-friendly navigation so crews reference the model instead of printed drawings.</p></div></div>
        </div>
        <div class="exec-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 — Progress Tracking & Verification -->
      <div class="exec-svc-card" data-exec-svc>
        <div class="exec-svc-accent"></div>
        <div class="exec-svc-card-header">
          <span class="exec-svc-card-label">Pillar 04</span>
          <span class="exec-svc-card-count">Synchro \u00b7 Power BI \u00b7 CDE/EDMS</span>
        </div>
        <h3>Progress Tracking &amp; Verification</h3>
        <p class="exec-svc-card-desc">Actual vs. planned at the element level \u2014 not percentage guesses. Model-based progress capture, scan-based verification, and earned value reporting integrated with the CDE and EDMS through Power BI dashboards that tell the truth about where the project stands.</p>
        <div class="exec-svc-items">
          <div class="exec-svc-item" data-exec-tip>Element-Level Progress Capture<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Progress Capture</span><p>Tracking installation status per element \u2014 not started, in progress, installed, inspected, accepted. Colour-coded model views showing exactly where the project stands spatially.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Actual vs. Planned Comparison<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Actual vs. Planned</span><p>Overlaying scheduled activities against verified installation data. Variance measured from the model and displayed in dashboards \u2014 not reported in emails.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Power BI Integration with CDE/EDMS<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Power BI</span><p>Connecting Power BI to the common data environment or EDMS for real-time work package analytics, progress tracking, issue trends, and resource utilisation dashboards.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Earned Value from Model Data<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Earned Value</span><p>Calculating earned value directly from element-level progress \u2014 linking model quantities to cost and schedule baselines for SPI/CPI metrics grounded in verified data, not estimates.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Work Package Progress Analytics<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Package Analytics</span><p>Tracking progress by work package, lot, zone, and trade through dynamic reports. Identifying bottlenecks, delayed packages, and completion trends before they impact the critical path.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Delay Analysis &amp; Claims Support<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Delay Analysis</span><p>Model-based evidence for delay claims and disputes \u2014 showing exactly when planned activities diverged from actual installation with spatial and temporal proof.</p></div></div>
        </div>
        <div class="exec-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 05 — Inspections, QA/QC & Safety -->
      <div class="exec-svc-card" data-exec-svc>
        <div class="exec-svc-accent"></div>
        <div class="exec-svc-card-header">
          <span class="exec-svc-card-label">Pillar 05</span>
          <span class="exec-svc-card-count">PlanRadar \u00b7 BIM 360 \u00b7 Procore</span>
        </div>
        <h3>Inspections, QA/QC &amp; Safety</h3>
        <p class="exec-svc-card-desc">Digital inspections, smart forms, model-linked issue tracking, defect management, and electronic permit-to-work systems. Field data that feeds back into the CDE and builds the verified handover record as construction progresses.</p>
        <div class="exec-svc-items">
          <div class="exec-svc-item" data-exec-tip>Digital Inspection Forms &amp; Smart Checklists<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Smart Forms</span><p>Configurable inspection checklists on tablets \u2014 linked to model elements, geolocated, timestamped, and stored in the CDE. Connected to work packages so every inspection traces to a specific lot and scope.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Model-Linked Issue &amp; Defect Tracking<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Defects</span><p>Site issues and defects pinned to model elements with photos, descriptions, assignees, and priority ratings. Every issue has spatial context, a status lifecycle, and a resolution record.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Electronic Permit-to-Work (ePTW)<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">ePTW</span><p>Digital permit systems for high-risk activities \u2014 hot works, confined spaces, working at height. Audit trails, automated approvals, and real-time visibility into active permits across the site.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>QA/QC Workflow &amp; Hold Point Management<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">QA/QC</span><p>Defining inspection hold points, approval workflows, and sign-off sequences tied to the construction programme. Quality gates that must clear before the next phase proceeds.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Safety Analytics &amp; AI-Enabled Monitoring<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Safety</span><p>Digital safety audits, AI-enabled CCTV for PPE compliance and hazard detection, and analytics dashboards that identify safety trends and inform training programmes. Integrated with ePTW for unified site safety management.</p></div></div>
          <div class="exec-svc-item" data-exec-tip>Handover Data Compilation<span class="exec-svc-item-info">i</span><div class="exec-svc-tooltip"><span class="exec-svc-tooltip-title">Handover</span><p>Compiling inspection records, test certificates, commissioning data, and sign-off documentation into structured digital handover packages. The QA/QC record builds progressively \u2014 not retroactively.</p></div></div>
        </div>
        <div class="exec-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="exec-deliverables">
      <div class="exec-deliverables-label">Key Deliverables</div>
      <div class="exec-deliverables-tags">
        <span class="exec-del-tag">4D Simulations</span>
        <span class="exec-del-tag">Digital Work Packages</span>
        <span class="exec-del-tag">Shop Drawing Coordination</span>
        <span class="exec-del-tag">Fabrication Model Integration</span>
        <span class="exec-del-tag">As-Built Models (Progressive)</span>
        <span class="exec-del-tag">Temporary Works Models</span>
        <span class="exec-del-tag">Progress Dashboards</span>
        <span class="exec-del-tag">Actual vs. Planned Reports</span>
        <span class="exec-del-tag">Digital Inspection Records</span>
        <span class="exec-del-tag">ePTW Systems</span>
        <span class="exec-del-tag">Defect Registers</span>
        <span class="exec-del-tag">Earned Value Reports</span>
        <span class="exec-del-tag">Power BI Dashboards</span>
        <span class="exec-del-tag">Handover Data Packages</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="exec-services-cta-strip">
      <span class="exec-services-cta-text"><strong>Don\u2019t see what you need?</strong> Our execution services extend beyond what\u2019s listed here.</span>
      <a href="/contact/" class="exec-services-cta-btn">Discuss Your Programme \u2192</a>
    </div>

    <div class="exec-services-iso">
      <span>Synchro \u00b7 Navisworks \u00b7 BIM 360 \u00b7 Procore \u00b7 PlanRadar \u00b7 Power BI</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-exec-svc]');
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

  var tags = document.querySelectorAll('.exec-del-tag');
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

  var icons = document.querySelectorAll('.exec-svc-item-info');
  icons.forEach(function(icon) {
    var row = icon.closest('.exec-svc-item');
    icon.addEventListener('mouseenter', function() {
      document.querySelectorAll('.exec-tip-visible').forEach(function(el) { el.classList.remove('exec-tip-visible'); });
      if (row) row.classList.add('exec-tip-visible');
    });
    icon.addEventListener('mouseleave', function() {
      if (row) row.classList.remove('exec-tip-visible');
    });
  });

  var tipRows = document.querySelectorAll('[data-exec-tip]');
  tipRows.forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.closest('.exec-svc-tooltip')) return;
      e.stopPropagation();
      var wasActive = row.classList.contains('exec-tip-visible');
      document.querySelectorAll('.exec-tip-visible').forEach(function(el) { el.classList.remove('exec-tip-visible'); });
      if (!wasActive) row.classList.add('exec-tip-visible');
    });
    row.style.cursor = 'pointer';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-exec-tip]')) {
      document.querySelectorAll('.exec-tip-visible').forEach(function(el) { el.classList.remove('exec-tip-visible'); });
    }
  });
})();`;

export default function ExecutionServices() {
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
