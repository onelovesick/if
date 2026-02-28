'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .stru-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .stru-services-glow {
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

  .stru-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .stru-services-header { text-align: center; margin-bottom: 72px; }

  .stru-services-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .stru-services-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .stru-services h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px 0;
  }
  .stru-services h2 em { font-style: italic; color: #47B5FF; }

  .stru-services-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 640px; margin: 0 auto;
  }

  .stru-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 64px; }

  .stru-svc-card {
    position: relative; background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10); padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1); backdrop-filter: blur(4px); overflow: visible;
  }
  .stru-svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .stru-svc-card::after {
    content: ''; position: absolute; bottom: 0; right: 0; width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .stru-svc-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); }
  .stru-svc-card:hover::before, .stru-svc-card:hover::after { border-color: rgba(71,181,255,0.45); }

  .stru-svc-accent {
    position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .stru-svc-card:hover .stru-svc-accent { width: 100%; }

  .stru-svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .stru-svc-card-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; }
  .stru-svc-card-count { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(122,155,181,0.4); border: 1px solid rgba(71,181,255,0.1); padding: 3px 10px; }

  .stru-svc-card h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 20px;
    letter-spacing: -0.01em; color: #F4F6F8; margin: 0 0 12px 0;
    text-transform: uppercase; transition: color 0.3s ease;
  }
  .stru-svc-card:hover h3 { color: #47B5FF; }

  .stru-svc-card-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.75; color: #7a9bb5; margin: 0 0 28px 0; }

  .stru-svc-items { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(71,181,255,0.08); }

  .stru-svc-item {
    position: relative; display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400;
    color: rgba(244,246,248,0.7); transition: color 0.2s ease, padding-left 0.2s ease; cursor: default;
  }
  .stru-svc-item:hover { color: #F4F6F8; padding-left: 6px; }
  .stru-svc-item::before { content: '\2192'; font-size: 11px; color: #47B5FF; opacity: 0.5; flex-shrink: 0; transition: opacity 0.2s ease; }
  .stru-svc-item:hover::before { opacity: 1; }

  .stru-svc-item-info {
    position: relative; margin-left: auto; flex-shrink: 0; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    color: rgba(71,181,255,0.55); border: 1px solid rgba(71,181,255,0.3);
    border-radius: 50%; transition: all 0.2s ease; cursor: help;
  }
  .stru-svc-item-info:hover { color: #47B5FF; border-color: #47B5FF; background: rgba(71,181,255,0.08); }

  .stru-svc-tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(6px); background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2); padding: 14px 18px; width: 300px;
    z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .stru-svc-item.stru-tip-visible .stru-svc-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .stru-svc-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #0B3C5D; }
  .stru-svc-tooltip p { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.7; color: rgba(244,246,248,0.85); margin: 0; }
  .stru-svc-tooltip-title { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #47B5FF; margin-bottom: 6px; display: block; }

  .stru-svc-more {
    display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px;
    border-top: 1px dashed rgba(71,181,255,0.1); font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400; color: rgba(122,155,181,0.5); letter-spacing: 0.01em;
  }
  .stru-svc-more::before { content: '+'; color: rgba(71,181,255,0.4); font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; }

  .stru-deliverables { padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.08); }
  .stru-deliverables-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 20px; text-align: center; }
  .stru-deliverables-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .stru-del-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244,246,248,0.45); border: 1px solid rgba(71,181,255,0.1); padding: 7px 16px; transition: all 0.3s ease; white-space: nowrap; }
  .stru-del-tag:hover { border-color: rgba(71,181,255,0.35); color: #47B5FF; }

  .stru-services-cta-strip { margin-top: 56px; padding: 40px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
  .stru-services-cta-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #7a9bb5; }
  .stru-services-cta-text strong { color: #F4F6F8; font-weight: 600; }
  .stru-services-cta-btn { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF; padding: 14px 32px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
  .stru-services-cta-btn:hover { background: #3a9fe0; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.2); }

  .stru-services-iso { text-align: center; margin-top: 40px; }
  .stru-services-iso span { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  @media (max-width: 900px) {
    .stru-services-grid { grid-template-columns: 1fr; }
    .stru-services { padding: 80px 20px; }
    .stru-svc-tooltip { width: 240px; left: 20%; }
    .stru-services-cta-strip { flex-direction: column; text-align: center; gap: 20px; }
  }
  @media (hover: none) {
    .stru-svc-tooltip { display: none; }
    .stru-svc-item.stru-tip-visible .stru-svc-tooltip { display: block; opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  }
</style>

<section class="stru-services">
  <div class="stru-services-glow"></div>
  <div class="stru-services-inner">
    <div class="stru-services-header">
      <div class="stru-services-eyebrow">What We Deliver</div>
      <h2>Structure Layer <em>Services</em></h2>
      <p class="stru-services-subtitle">The structural layer defines how information is organised, named, classified, and exchanged across your programme. Four pillars, dozens of deliverables — each one engineered to make collaboration possible.</p>
    </div>

    <div class="stru-services-grid">

      <!-- PILLAR 01 — Data Architecture -->
      <div class="stru-svc-card" data-stru-svc>
        <div class="stru-svc-accent"></div>
        <div class="stru-svc-card-header">
          <span class="stru-svc-card-label">Pillar 01</span>
          <span class="stru-svc-card-count">ISO 19650-2</span>
        </div>
        <h3>Data Architecture</h3>
        <p class="stru-svc-card-desc">Configure the Common Data Environment as a governed system — not a file dump. Folder structures, workflows, permissions, status codes, and approval gates engineered before anyone uploads.</p>
        <div class="stru-svc-items">
          <div class="stru-svc-item" data-stru-tip>CDE Configuration &amp; Deployment<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">CDE Config</span><p>Setting up the Common Data Environment — ACC, ProjectWise, Procore, or others — with folder structures, user roles, access permissions, and metadata schemas tailored to your programme's scale and contract structure.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Folder Structure &amp; Container Strategy<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Folder Structure</span><p>Designing the logical hierarchy of information containers — by discipline, zone, phase, or package — so every file has one correct home. Prevents duplication, misfiling, and the chaos of flat folder systems.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Status Code &amp; Revision Workflows<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Status Codes</span><p>Defining the lifecycle states every document and model passes through — Work in Progress, Shared, Published, Archived — with approval gates, review triggers, and audit trails at each transition.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Permission &amp; Access Control Mapping<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Access Control</span><p>Defining who can see, edit, approve, and publish within each CDE area. Role-based access control prevents unauthorised changes and ensures contractual data boundaries are respected between parties.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Metadata Schema Design<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Metadata</span><p>Defining the structured attributes attached to every file and model — discipline, originator, phase, type, status — so information is searchable, filterable, and machine-readable from day one.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>CDE Governance Documentation<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">CDE Governance</span><p>The written rules of engagement for your CDE — naming, uploading, reviewing, publishing. A living document that new team members can follow on day one without prior training.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Platform Migration &amp; Legacy Data Structuring<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Migration</span><p>When projects change platforms mid-stream — or inherit unstructured data from previous phases — we restructure, reclassify, and migrate content into the new CDE with integrity intact.</p></div></div>
        </div>
        <div class="stru-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 — Naming & Classification -->
      <div class="stru-svc-card" data-stru-svc>
        <div class="stru-svc-accent"></div>
        <div class="stru-svc-card-header">
          <span class="stru-svc-card-label">Pillar 02</span>
          <span class="stru-svc-card-count">ISO 19650-2</span>
        </div>
        <h3>Naming &amp; Classification</h3>
        <p class="stru-svc-card-desc">Establish the conventions that make every file identifiable and every element classifiable — from document naming to element coding systems that map across disciplines and into operations.</p>
        <div class="stru-svc-items">
          <div class="stru-svc-item" data-stru-tip>File &amp; Document Naming Conventions<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Naming Conventions</span><p>Structured naming rules for every file type — models, drawings, specifications, reports — using field codes for project, originator, discipline, zone, type, and revision. Makes every file self-describing and auditable.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Model Naming &amp; Federation Strategy<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Model Naming</span><p>How individual model files are named, split, and federated across disciplines. Defines the granularity of model breakdown — by building, zone, discipline, or system — and how they combine for coordination.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Uniclass / OmniClass / MasterFormat Mapping<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Classification Mapping</span><p>Mapping your project's elements to an industry classification system — Uniclass (UK/international), OmniClass, or MasterFormat (North America) — so data aligns across disciplines, QTO systems, and asset registers.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Element Coding Systems<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Element Coding</span><p>Assigning structured codes to every model element — walls, doors, ducts, structural members — so they can be tracked, filtered, quantified, and handed over with consistent identity across the full lifecycle.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Drawing &amp; Sheet Numbering Standards<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Sheet Numbering</span><p>Standardised numbering for every drawing sheet — encoding discipline, zone, sequence, and revision — so transmittals, reviews, and approvals reference a single unambiguous identifier.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Spatial Zone &amp; Location Breakdown<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Zone Breakdown</span><p>Defining the spatial hierarchy — site, building, level, zone, space — that structures how models are split, how data is organised, and how facility managers will navigate the asset after handover.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Classification Compliance Auditing<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Classification Audit</span><p>Periodic verification that naming and classification rules are being followed across all teams. Catches drift early — before incorrect codes propagate into quantity take-offs, schedules, and handover datasets.</p></div></div>
        </div>
        <div class="stru-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 — LOD/LOI Frameworks -->
      <div class="stru-svc-card" data-stru-svc>
        <div class="stru-svc-accent"></div>
        <div class="stru-svc-card-header">
          <span class="stru-svc-card-label">Pillar 03</span>
          <span class="stru-svc-card-count">ISO 19650-2</span>
        </div>
        <h3>LOD/LOI Frameworks</h3>
        <p class="stru-svc-card-desc">Define what level of geometric detail and information content each element requires at each project stage — so teams model what's needed, not what they assume.</p>
        <div class="stru-svc-items">
          <div class="stru-svc-item" data-stru-tip>LOD/LOI Matrix Development<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">LOD/LOI Matrix</span><p>A project-specific table defining the required Level of Development (geometry) and Level of Information (data attributes) for every element type at every project stage. The single reference that prevents over-modelling and under-delivering.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Model Element Breakdown Structure<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Element Breakdown</span><p>A hierarchical list of every element type expected in the model — from structural foundations to mechanical ductwork — each assigned an owner, a classification code, and LOD/LOI requirements by phase.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Information Delivery Milestone Mapping<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Milestone Mapping</span><p>Tying LOD/LOI requirements to project milestones and gate reviews — so teams know exactly what level of model maturity is expected at each design freeze, tender issue, and construction package release.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Discipline-Specific LOD Specifications<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Discipline LOD</span><p>Tailoring LOD requirements to each discipline's reality — structural, architectural, MEP, civil — because a wall at LOD 300 means something very different to an architect than to a fire engineer.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Model Progression Specification (MPS)<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">MPS</span><p>A visual and tabular specification showing how each element type evolves from concept through to as-built — including geometry, parameters, materials, and manufacturer data at each stage.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>LOD Compliance Checking &amp; Validation<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">LOD Validation</span><p>Automated and manual checks to verify that submitted models meet the required LOD/LOI at each milestone. Catches under-developed elements before they derail coordination reviews or contractual submissions.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Parameter &amp; Property Set Standards<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Property Sets</span><p>Defining which data parameters (cost, material, manufacturer, fire rating, maintenance interval) must be populated at each LOI level — ensuring the model carries the information operations teams actually need.</p></div></div>
        </div>
        <div class="stru-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 — Exchange & Interoperability -->
      <div class="stru-svc-card" data-stru-svc>
        <div class="stru-svc-accent"></div>
        <div class="stru-svc-card-header">
          <span class="stru-svc-card-label">Pillar 04</span>
          <span class="stru-svc-card-count">openBIM / IFC</span>
        </div>
        <h3>Exchange &amp; Interoperability</h3>
        <p class="stru-svc-card-desc">Engineer how data moves between platforms, disciplines, and lifecycle phases — IFC mapping, MVD definitions, and validation rules that ensure nothing is lost in translation.</p>
        <div class="stru-svc-items">
          <div class="stru-svc-item" data-stru-tip>IFC Export &amp; Mapping Strategy<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">IFC Strategy</span><p>Defining which IFC schema version, entity mappings, and property set configurations each discipline uses for export — so data arrives in the coordination model intact, not stripped of critical parameters.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Model View Definition (MVD) Specification<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">MVD</span><p>Defining which subset of the IFC schema is required for each exchange use case — coordination, quantity take-off, energy analysis, FM handover — so exports contain exactly what's needed and nothing irrelevant.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>openBIM Workflow Design<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">openBIM</span><p>Designing vendor-neutral data exchange workflows — BCF for issue tracking, IFC for geometry and data, COBie for handover — so your project isn't locked into a single software ecosystem.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Data Validation &amp; Quality Rules<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Validation Rules</span><p>Automated rule sets — in Solibri, SMC, or platform-native tools — that check incoming models against naming, classification, LOD, and parameter requirements before they enter the coordination environment.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Cross-Platform Data Integrity Testing<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Integrity Testing</span><p>Round-trip testing between authoring tools and coordination platforms to identify where data is lost, corrupted, or misinterpreted — before it affects production models and downstream workflows.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>COBie &amp; Handover Format Planning<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">COBie Planning</span><p>Defining the handover data format from the start — COBie spreadsheets, IFC datasets, or CMMS-ready exports — so the structural foundation for operations data is built into the model from day one.</p></div></div>
          <div class="stru-svc-item" data-stru-tip>Exchange Requirement Documentation<span class="stru-svc-item-info">i</span><div class="stru-svc-tooltip"><span class="stru-svc-tooltip-title">Exchange Docs</span><p>Written specifications for each information exchange — who sends what, in which format, at what stage, validated against which rules — so every handoff between parties is contractually clear and technically executable.</p></div></div>
        </div>
        <div class="stru-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="stru-deliverables">
      <div class="stru-deliverables-label">Key Deliverables</div>
      <div class="stru-deliverables-tags">
        <span class="stru-del-tag">CDE Configuration</span>
        <span class="stru-del-tag">Naming Conventions</span>
        <span class="stru-del-tag">Classification Mapping</span>
        <span class="stru-del-tag">LOD / LOI Matrix</span>
        <span class="stru-del-tag">Model Element Breakdown</span>
        <span class="stru-del-tag">IFC Export Strategy</span>
        <span class="stru-del-tag">Data Validation Rules</span>
        <span class="stru-del-tag">Status Code Workflows</span>
        <span class="stru-del-tag">Folder Structure</span>
        <span class="stru-del-tag">Metadata Schema</span>
        <span class="stru-del-tag">MVD Specification</span>
        <span class="stru-del-tag">COBie Plan</span>
        <span class="stru-del-tag">Zone Breakdown</span>
        <span class="stru-del-tag">Property Set Standards</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="stru-services-cta-strip">
      <span class="stru-services-cta-text"><strong>Don't see what you need?</strong> Our structure services extend beyond what's listed here.</span>
      <a href="/contact/" class="stru-services-cta-btn">Discuss Your Programme \u2192</a>
    </div>

    <div class="stru-services-iso">
      <span>Aligned to ISO 19650-2 \u00b7 Uniclass \u00b7 OmniClass \u00b7 IFC \u00b7 openBIM</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-stru-svc]');
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

  var tags = document.querySelectorAll('.stru-del-tag');
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

  var icons = document.querySelectorAll('.stru-svc-item-info');
  icons.forEach(function(icon) {
    var row = icon.closest('.stru-svc-item');
    icon.addEventListener('mouseenter', function() {
      document.querySelectorAll('.stru-tip-visible').forEach(function(el) { el.classList.remove('stru-tip-visible'); });
      if (row) row.classList.add('stru-tip-visible');
    });
    icon.addEventListener('mouseleave', function() {
      if (row) row.classList.remove('stru-tip-visible');
    });
  });

  var tipRows = document.querySelectorAll('[data-stru-tip]');
  tipRows.forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.closest('.stru-svc-tooltip')) return;
      e.stopPropagation();
      var wasActive = row.classList.contains('stru-tip-visible');
      document.querySelectorAll('.stru-tip-visible').forEach(function(el) { el.classList.remove('stru-tip-visible'); });
      if (!wasActive) row.classList.add('stru-tip-visible');
    });
    row.style.cursor = 'pointer';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-stru-tip]')) {
      document.querySelectorAll('.stru-tip-visible').forEach(function(el) { el.classList.remove('stru-tip-visible'); });
    }
  });
})();`;

export default function StructureServices() {
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
