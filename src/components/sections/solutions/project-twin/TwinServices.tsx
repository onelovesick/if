'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .twin-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .twin-services-glow {
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

  .twin-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .twin-services-header { text-align: center; margin-bottom: 72px; }

  .twin-services-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .twin-services-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .twin-services h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px 0;
  }
  .twin-services h2 em { font-style: italic; color: #47B5FF; }

  .twin-services-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 660px; margin: 0 auto;
  }

  .twin-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 64px; }

  .twin-svc-card {
    position: relative; background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10); padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1); backdrop-filter: blur(4px); overflow: visible;
  }
  .twin-svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .twin-svc-card::after {
    content: ''; position: absolute; bottom: 0; right: 0; width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .twin-svc-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); }
  .twin-svc-card:hover::before, .twin-svc-card:hover::after { border-color: rgba(71,181,255,0.45); }

  .twin-svc-accent {
    position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .twin-svc-card:hover .twin-svc-accent { width: 100%; }

  .twin-svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .twin-svc-card-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; }
  .twin-svc-card-count { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(122,155,181,0.4); border: 1px solid rgba(71,181,255,0.1); padding: 3px 10px; }

  .twin-svc-card h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 20px;
    letter-spacing: -0.01em; color: #F4F6F8; margin: 0 0 12px 0;
    text-transform: uppercase; transition: color 0.3s ease;
  }
  .twin-svc-card:hover h3 { color: #47B5FF; }

  .twin-svc-card-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.75; color: #7a9bb5; margin: 0 0 28px 0; }

  .twin-svc-items { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(71,181,255,0.08); }

  .twin-svc-item {
    position: relative; display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400;
    color: rgba(244,246,248,0.7); transition: color 0.2s ease, padding-left 0.2s ease; cursor: default;
  }
  .twin-svc-item:hover { color: #F4F6F8; padding-left: 6px; }
  .twin-svc-item::before { content: '\u2192'; font-size: 11px; color: #47B5FF; opacity: 0.5; flex-shrink: 0; transition: opacity 0.2s ease; }
  .twin-svc-item:hover::before { opacity: 1; }

  .twin-svc-item-info {
    position: relative; margin-left: auto; flex-shrink: 0; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    color: rgba(71,181,255,0.55); border: 1px solid rgba(71,181,255,0.3);
    border-radius: 50%; transition: all 0.2s ease; cursor: help;
  }
  .twin-svc-item-info:hover { color: #47B5FF; border-color: #47B5FF; background: rgba(71,181,255,0.08); }

  .twin-svc-tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(6px); background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2); padding: 14px 18px; width: 300px;
    z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .twin-svc-item.twin-tip-visible .twin-svc-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .twin-svc-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #0B3C5D; }
  .twin-svc-tooltip p { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.7; color: rgba(244,246,248,0.85); margin: 0; }
  .twin-svc-tooltip-title { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #47B5FF; margin-bottom: 6px; display: block; }

  .twin-svc-more {
    display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px;
    border-top: 1px dashed rgba(71,181,255,0.1); font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400; color: rgba(122,155,181,0.5); letter-spacing: 0.01em;
  }
  .twin-svc-more::before { content: '+'; color: rgba(71,181,255,0.4); font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; }

  .twin-deliverables { padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.08); }
  .twin-deliverables-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 20px; text-align: center; }
  .twin-deliverables-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .twin-del-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244,246,248,0.45); border: 1px solid rgba(71,181,255,0.1); padding: 7px 16px; transition: all 0.3s ease; white-space: nowrap; }
  .twin-del-tag:hover { border-color: rgba(71,181,255,0.35); color: #47B5FF; }

  .twin-services-cta-strip { margin-top: 56px; padding: 40px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
  .twin-services-cta-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #7a9bb5; }
  .twin-services-cta-text strong { color: #F4F6F8; font-weight: 600; }
  .twin-services-cta-btn { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF; padding: 14px 32px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
  .twin-services-cta-btn:hover { background: #3a9fe0; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.2); }

  .twin-services-iso { text-align: center; margin-top: 40px; }
  .twin-services-iso span { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  @media (max-width: 900px) {
    .twin-services-grid { grid-template-columns: 1fr; }
    .twin-services { padding: 80px 20px; }
    .twin-svc-tooltip { width: 240px; left: 20%; }
    .twin-services-cta-strip { flex-direction: column; text-align: center; gap: 20px; }
  }
  @media (hover: none) {
    .twin-svc-tooltip { display: none; }
    .twin-svc-item.twin-tip-visible .twin-svc-tooltip { display: block; opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  }
</style>

<section class="twin-services">
  <div class="twin-services-glow"></div>
  <div class="twin-services-inner">
    <div class="twin-services-header">
      <div class="twin-services-eyebrow">What We Deliver</div>
      <h2>Project Twin <em>Services</em></h2>
      <p class="twin-services-subtitle">The handover layer transforms construction data into verified, structured, operational asset information. Four pillars covering as-built verification, asset data structuring, twin configuration, and FM integration.</p>
    </div>

    <div class="twin-services-grid">

      <!-- PILLAR 01 \u2014 As-Built Model Verification -->
      <div class="twin-svc-card" data-twin-svc>
        <div class="twin-svc-accent"></div>
        <div class="twin-svc-card-header">
          <span class="twin-svc-card-label">Pillar 01</span>
          <span class="twin-svc-card-count">Revit \u00b7 Navisworks \u00b7 Faro</span>
        </div>
        <h3>As-Built Model Verification</h3>
        <p class="twin-svc-card-desc">Updating the design BIM to reflect what was actually constructed \u2014 not what was intended. Scan-to-BIM comparison, field change integration, and progressive as-built updates that ensure the model matches the building at handover.</p>
        <div class="twin-svc-items">
          <div class="twin-svc-item" data-twin-tip>Scan-to-BIM Deviation Analysis<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Deviation</span><p>Comparing point cloud captures against the design model to identify and quantify deviations. Heat maps and tolerance reports showing where the as-built diverges from the as-designed \u2014 element by element.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Progressive As-Built Updates<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Progressive</span><p>Updating the model during construction \u2014 not after. Field changes, substitutions, and routing modifications integrated into the BIM as they happen so the model stays current through every phase.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Field Change &amp; Substitution Integration<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Changes</span><p>Capturing product substitutions, field-driven routing changes, and site modifications and reflecting them in the model with full revision history and traceability back to the RFI or change order.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Model Accuracy Certification<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Certification</span><p>Formal verification that the as-built model meets defined accuracy tolerances \u2014 LOD 500 compliance checks against contractual requirements and ISO 19650 standards.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>MEP Routing &amp; Systems Verification<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">MEP</span><p>Verifying mechanical, electrical, and plumbing systems as-installed against the coordinated model. MEP carries the highest operational data density and the greatest risk of information loss at handover.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Model Handover Quality Audit<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Audit</span><p>Pre-handover audit checking model completeness, data population, naming compliance, classification accuracy, and spatial integrity. Identifying gaps before the owner discovers them.</p></div></div>
        </div>
        <div class="twin-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 \u2014 Asset Information Modelling -->
      <div class="twin-svc-card" data-twin-svc>
        <div class="twin-svc-accent"></div>
        <div class="twin-svc-card-header">
          <span class="twin-svc-card-label">Pillar 02</span>
          <span class="twin-svc-card-count">COBie \u00b7 IFC \u00b7 ISO 19650-3</span>
        </div>
        <h3>Asset Information Modelling</h3>
        <p class="twin-svc-card-desc">Structuring operational asset data per ISO 19650-3, COBie, and IFC standards. Building the Asset Information Model (AIM) progressively from the Project Information Model (PIM) so handover data is complete, classified, and validated \u2014 not assembled retroactively.</p>
        <div class="twin-svc-items">
          <div class="twin-svc-item" data-twin-tip>COBie Dataset Development<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">COBie</span><p>Building COBie-compliant datasets progressively through design, construction, and commissioning. Facilities, floors, spaces, zones, types, components, systems, attributes, and documents \u2014 structured from day one, not scraped together at handover.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Asset Classification &amp; Taxonomy Mapping<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Classification</span><p>Mapping BIM elements to the owner\u2019s asset classification system \u2014 Uniclass, OmniClass, or custom taxonomies. Ensuring every asset type maps to the CAFM/CMMS hierarchy so data imports cleanly.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Attribute Population &amp; Validation<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Attributes</span><p>Populating asset attributes \u2014 serial numbers, warranty dates, maintenance intervals, manufacturer data, specification references \u2014 and validating completeness against contractual AIR requirements.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>IFC Export Strategy &amp; Validation<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">IFC</span><p>Defining IFC Model View Definitions, mapping property sets, and validating exports against buildingSMART standards. Ensuring the open-format dataset is platform-agnostic and survives beyond the authoring tool.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>PIM-to-AIM Transition Management<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">PIM \u2192 AIM</span><p>Managing the structured transition from Project Information Model to Asset Information Model per ISO 19650-3. Defining what data carries forward, what gets stripped, and what new attributes operations requires.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Document Linking &amp; O&amp;M Association<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Documents</span><p>Linking O&amp;M manuals, warranties, certificates, test reports, and commissioning records to specific asset types and instances in the model. Every document traceable to the element it supports.</p></div></div>
        </div>
        <div class="twin-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 \u2014 Digital Twin Configuration -->
      <div class="twin-svc-card" data-twin-svc>
        <div class="twin-svc-accent"></div>
        <div class="twin-svc-card-header">
          <span class="twin-svc-card-label">Pillar 03</span>
          <span class="twin-svc-card-count">Tandem \u00b7 iTwin \u00b7 Azure</span>
        </div>
        <h3>Digital Twin Configuration</h3>
        <p class="twin-svc-card-desc">Setting up the digital twin platform \u2014 not as a 3D viewer, but as a structured data environment where geometry, asset data, IoT feeds, and operational records converge into a queryable, maintainable digital representation of the physical asset.</p>
        <div class="twin-svc-items">
          <div class="twin-svc-item" data-twin-tip>Platform Selection &amp; Architecture<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Platform</span><p>Evaluating and selecting the right digital twin platform based on the owner\u2019s operational requirements \u2014 Autodesk Tandem, Bentley iTwin, Azure Digital Twins, or custom solutions. Architecture design for data flows, integrations, and user access.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Model Ingestion &amp; Optimisation<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Ingestion</span><p>Preparing and loading the as-built model into the twin platform. Geometry optimisation for web rendering, LOD level management, and spatial indexing for fast queries across large facility datasets.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>IoT &amp; Sensor Data Integration<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">IoT</span><p>Connecting building management systems, sensor networks, and IoT devices to the digital twin \u2014 real-time temperature, occupancy, energy consumption, and equipment status overlaid on the spatial model.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Traceability Layer Configuration<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Traceability</span><p>Building the chain of custody into the twin \u2014 linking each asset back through its inspection records, submittal approvals, specification references, and procurement data. The evidence trail that proves what was installed and why.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>User Role &amp; Access Configuration<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Access</span><p>Configuring role-based access so facility managers, maintenance crews, and operations staff see the data relevant to their function. Not everyone needs the full model \u2014 access is scoped by role and responsibility.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Operational Dashboard Setup<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Dashboards</span><p>Configuring operational dashboards within the twin platform \u2014 asset health, maintenance schedules, space utilisation, energy performance, and lifecycle cost tracking. The twin as a decision-making interface, not just a viewer.</p></div></div>
        </div>
        <div class="twin-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 \u2014 Handover & FM Integration -->
      <div class="twin-svc-card" data-twin-svc>
        <div class="twin-svc-accent"></div>
        <div class="twin-svc-card-header">
          <span class="twin-svc-card-label">Pillar 04</span>
          <span class="twin-svc-card-count">Maximo \u00b7 Archibus \u00b7 FM:Systems</span>
        </div>
        <h3>Handover &amp; FM Integration</h3>
        <p class="twin-svc-card-desc">Packaging verified asset data for the owner\u2019s CAFM/CMMS systems, training operations teams, and ensuring the handover dataset is complete, importable, and structured for decades of facility management \u2014 not filed and forgotten.</p>
        <div class="twin-svc-items">
          <div class="twin-svc-item" data-twin-tip>CAFM/CMMS Data Mapping &amp; Import<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Data Mapping</span><p>Mapping COBie and BIM asset data to the owner\u2019s target FM system \u2014 field-by-field alignment of asset types, attributes, locations, and maintenance schedules to the CAFM/CMMS schema.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Handover Package Assembly<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Packages</span><p>Compiling the complete handover deliverable \u2014 as-built models, COBie datasets, O&amp;M manuals, warranties, certificates, test results, and commissioning records \u2014 structured per contractual requirements and indexed for retrieval.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Warranty &amp; Maintenance Schedule Setup<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Warranties</span><p>Configuring warranty tracking and preventive maintenance schedules within the FM system based on manufacturer data and commissioning records. Every asset with a defined maintenance regime from day one of operations.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Operations Team Training &amp; Onboarding<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Training</span><p>Training facility management staff on how to use the digital twin, navigate the asset data, retrieve documents, and maintain the dataset as the facility evolves. Handover isn\u2019t complete until the operations team can use what they\u2019ve received.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Soft Landings &amp; Post-Occupancy Support<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Soft Landings</span><p>Extended support through the initial occupancy period \u2014 resolving data gaps, tuning building systems, and ensuring the digital twin aligns with real operational performance. The transition from project to asset, managed.</p></div></div>
          <div class="twin-svc-item" data-twin-tip>Lifecycle Data Governance Framework<span class="twin-svc-item-info">i</span><div class="twin-svc-tooltip"><span class="twin-svc-tooltip-title">Governance</span><p>Defining how asset data is maintained, updated, and governed post-handover. Who owns the data, how changes are recorded, and what standards apply as the facility evolves through renovations, retrofits, and re-commissioning.</p></div></div>
        </div>
        <div class="twin-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="twin-deliverables">
      <div class="twin-deliverables-label">Key Deliverables</div>
      <div class="twin-deliverables-tags">
        <span class="twin-del-tag">As-Built Models</span>
        <span class="twin-del-tag">COBie Datasets</span>
        <span class="twin-del-tag">Asset Information Models (AIM)</span>
        <span class="twin-del-tag">IFC Exports</span>
        <span class="twin-del-tag">Digital Twin Platform Config</span>
        <span class="twin-del-tag">FM Integration Specs</span>
        <span class="twin-del-tag">Scan-to-BIM Deviation Reports</span>
        <span class="twin-del-tag">O&amp;M Document Packages</span>
        <span class="twin-del-tag">Warranty Registers</span>
        <span class="twin-del-tag">Classification Mapping</span>
        <span class="twin-del-tag">Handover Quality Audits</span>
        <span class="twin-del-tag">Operations Training</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="twin-services-cta-strip">
      <span class="twin-services-cta-text"><strong>Don\u2019t see what you need?</strong> Our handover services extend beyond what\u2019s listed here.</span>
      <a href="/contact/" class="twin-services-cta-btn">Discuss Your Programme \u2192</a>
    </div>

    <div class="twin-services-iso">
      <span>Revit \u00b7 Navisworks \u00b7 Tandem \u00b7 iTwin \u00b7 Maximo \u00b7 COBie \u00b7 IFC</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-twin-svc]');
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

  var tags = document.querySelectorAll('.twin-del-tag');
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

  var icons = document.querySelectorAll('.twin-svc-item-info');
  icons.forEach(function(icon) {
    var row = icon.closest('.twin-svc-item');
    icon.addEventListener('mouseenter', function() {
      document.querySelectorAll('.twin-tip-visible').forEach(function(el) { el.classList.remove('twin-tip-visible'); });
      if (row) row.classList.add('twin-tip-visible');
    });
    icon.addEventListener('mouseleave', function() {
      if (row) row.classList.remove('twin-tip-visible');
    });
  });

  var tipRows = document.querySelectorAll('[data-twin-tip]');
  tipRows.forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.closest('.twin-svc-tooltip')) return;
      e.stopPropagation();
      var wasActive = row.classList.contains('twin-tip-visible');
      document.querySelectorAll('.twin-tip-visible').forEach(function(el) { el.classList.remove('twin-tip-visible'); });
      if (!wasActive) row.classList.add('twin-tip-visible');
    });
    row.style.cursor = 'pointer';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-twin-tip]')) {
      document.querySelectorAll('.twin-tip-visible').forEach(function(el) { el.classList.remove('twin-tip-visible'); });
    }
  });
})();`;

export default function TwinServices() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const s = document.createElement('script');
    s.textContent = script;
    el.appendChild(s);
    return () => { obs.disconnect(); if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
