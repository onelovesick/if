'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .intel-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .intel-services-glow {
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

  .intel-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .intel-services-header { text-align: center; margin-bottom: 72px; }

  .intel-services-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .intel-services-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-services h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px 0;
  }
  .intel-services h2 em { font-style: italic; color: #47B5FF; }

  .intel-services-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 660px; margin: 0 auto;
  }

  .intel-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 64px; }

  .intel-svc-card {
    position: relative; background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10); padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1); backdrop-filter: blur(4px); overflow: visible;
  }
  .intel-svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .intel-svc-card::after {
    content: ''; position: absolute; bottom: 0; right: 0; width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .intel-svc-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); }
  .intel-svc-card:hover::before, .intel-svc-card:hover::after { border-color: rgba(71,181,255,0.45); }

  .intel-svc-accent {
    position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .intel-svc-card:hover .intel-svc-accent { width: 100%; }

  .intel-svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .intel-svc-card-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; }
  .intel-svc-card-count { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(122,155,181,0.4); border: 1px solid rgba(71,181,255,0.1); padding: 3px 10px; }

  .intel-svc-card h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 20px;
    letter-spacing: -0.01em; color: #F4F6F8; margin: 0 0 12px 0;
    text-transform: uppercase; transition: color 0.3s ease;
  }
  .intel-svc-card:hover h3 { color: #47B5FF; }

  .intel-svc-card-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.75; color: #7a9bb5; margin: 0 0 28px 0; }

  .intel-svc-items { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(71,181,255,0.08); }

  .intel-svc-item {
    position: relative; display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400;
    color: rgba(244,246,248,0.7); transition: color 0.2s ease, padding-left 0.2s ease; cursor: default;
  }
  .intel-svc-item:hover { color: #F4F6F8; padding-left: 6px; }
  .intel-svc-item::before { content: '\u2192'; font-size: 11px; color: #47B5FF; opacity: 0.5; flex-shrink: 0; transition: opacity 0.2s ease; }
  .intel-svc-item:hover::before { opacity: 1; }

  .intel-svc-item-info {
    position: relative; margin-left: auto; flex-shrink: 0; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    color: rgba(71,181,255,0.55); border: 1px solid rgba(71,181,255,0.3);
    border-radius: 50%; transition: all 0.2s ease; cursor: help;
  }
  .intel-svc-item-info:hover { color: #47B5FF; border-color: #47B5FF; background: rgba(71,181,255,0.08); }

  .intel-svc-tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(6px); background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2); padding: 14px 18px; width: 300px;
    z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .intel-svc-item.intel-tip-visible .intel-svc-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .intel-svc-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #0B3C5D; }
  .intel-svc-tooltip p { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.7; color: rgba(244,246,248,0.85); margin: 0; }
  .intel-svc-tooltip-title { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #47B5FF; margin-bottom: 6px; display: block; }

  .intel-svc-more {
    display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px;
    border-top: 1px dashed rgba(71,181,255,0.1); font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400; color: rgba(122,155,181,0.5); letter-spacing: 0.01em;
  }
  .intel-svc-more::before { content: '+'; color: rgba(71,181,255,0.4); font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; }

  .intel-deliverables { padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.08); }
  .intel-deliverables-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 20px; text-align: center; }
  .intel-deliverables-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .intel-del-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244,246,248,0.45); border: 1px solid rgba(71,181,255,0.1); padding: 7px 16px; transition: all 0.3s ease; white-space: nowrap; }
  .intel-del-tag:hover { border-color: rgba(71,181,255,0.35); color: #47B5FF; }

  .intel-services-cta-strip { margin-top: 56px; padding: 40px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
  .intel-services-cta-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #7a9bb5; }
  .intel-services-cta-text strong { color: #F4F6F8; font-weight: 600; }
  .intel-services-cta-btn { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF; padding: 14px 32px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
  .intel-services-cta-btn:hover { background: #3a9fe0; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.2); }

  .intel-services-iso { text-align: center; margin-top: 40px; }
  .intel-services-iso span { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  @media (max-width: 900px) {
    .intel-services-grid { grid-template-columns: 1fr; }
    .intel-services { padding: 80px 20px; }
    .intel-svc-tooltip { width: 240px; left: 20%; }
    .intel-services-cta-strip { flex-direction: column; text-align: center; gap: 20px; }
  }
  @media (hover: none) {
    .intel-svc-tooltip { display: none; }
    .intel-svc-item.intel-tip-visible .intel-svc-tooltip { display: block; opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  }
</style>

<section class="intel-services">
  <div class="intel-services-glow"></div>
  <div class="intel-services-inner">
    <div class="intel-services-header">
      <div class="intel-services-eyebrow">What We Deliver</div>
      <h2>Intelligence Layer <em>Services</em></h2>
      <p class="intel-services-subtitle">The intelligence layer transforms project data \u2014 graphical and non-graphical \u2014 into verified, queryable, decision-ready information. Four pillars covering model production through compliance verification, each engineered so your teams act on facts, not assumptions.</p>
    </div>

    <div class="intel-services-grid">

      <!-- PILLAR 01 \u2014 BIM Modelling & Production -->
      <div class="intel-svc-card" data-intel-svc>
        <div class="intel-svc-accent"></div>
        <div class="intel-svc-card-header">
          <span class="intel-svc-card-label">Pillar 01</span>
          <span class="intel-svc-card-count">Revit \u00b7 Civil 3D \u00b7 Tekla</span>
        </div>
        <h3>BIM Modelling &amp; Production</h3>
        <p class="intel-svc-card-desc">Authoring models to contract standard \u2014 parametric, classified, and data-rich. Not geometry for geometry\u2019s sake. Every element carries the parameters, classification codes, and property sets that downstream coordination, QTO, and operations require.</p>
        <div class="intel-svc-items">
          <div class="intel-svc-item" data-intel-tip>Architectural Modelling<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Architectural</span><p>Spatial layouts, room data, material specifications, and finish schedules modelled to the LOD/LOI defined in the BEP. Every wall, door, and ceiling carries the parameters that coordination and FM teams actually need.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Structural Modelling<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Structural</span><p>Foundations, framing, connections, and reinforcement modelled with structural grades, load data, and fabrication-ready geometry. Designed for direct export to analysis tools and clash-free coordination with MEP.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>MEP Modelling<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">MEP</span><p>Mechanical, electrical, and plumbing systems modelled with equipment specifications, pipe/duct sizing, and connection points. The densest models on any project \u2014 and the most clash-prone without proper intelligence.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Civil &amp; Infrastructure Modelling<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Civil</span><p>Corridors, grading, utilities, and site models built in Civil 3D or Bentley with alignment geometry, cross-sections, and quantity-ready data for earthworks, pavements, and underground services.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Parametric Family &amp; Component Development<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Families</span><p>Custom Revit families and component libraries built with parametric intelligence \u2014 adjustable dimensions, embedded data, and type catalogues that enforce consistency across the entire programme.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Template &amp; Standard Development<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Templates</span><p>Project templates pre-loaded with view standards, annotation families, shared parameters, and classification codes. Every new model starts compliant \u2014 not retrofitted.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Model Migration &amp; Upgrades<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Migration</span><p>Upgrading legacy models from older software versions, migrating between platforms, or restructuring inherited models that lack parameters, classification, or proper element breakdown.</p></div></div>
        </div>
        <div class="intel-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 \u2014 Coordination & Clash Detection -->
      <div class="intel-svc-card" data-intel-svc>
        <div class="intel-svc-accent"></div>
        <div class="intel-svc-card-header">
          <span class="intel-svc-card-label">Pillar 02</span>
          <span class="intel-svc-card-count">Navisworks \u00b7 Solibri \u00b7 BIMcollab</span>
        </div>
        <h3>Coordination &amp; Clash Detection</h3>
        <p class="intel-svc-card-desc">Federated model assembly, automated clash detection, and structured resolution workflows. Not just finding conflicts \u2014 tracking them to closure with clear ownership, priority, and decision timelines so coordination meetings produce outcomes, not lists.</p>
        <div class="intel-svc-items">
          <div class="intel-svc-item" data-intel-tip>Model Federation &amp; Assembly<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Federation</span><p>Combining discipline models into a single federated assembly with consistent origins, correct positioning, and verified file versions. The foundation for every downstream clash test and coordination review.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Automated Clash Detection<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Clash Detection</span><p>Rule-based clash testing across all discipline pairs \u2014 hard clashes, soft clashes, and clearance violations. Automated grouping and filtering so teams focus on critical conflicts, not noise.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Clash Resolution Workflows<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Resolution</span><p>Structured workflows that assign every clash to an owner, set a resolution deadline, and track status through to sign-off. Clashes don\u2019t disappear into spreadsheets \u2014 they get closed.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Design Review &amp; Visualisation<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Design Review</span><p>Walkthrough visualisations, section cuts, and annotated viewpoints that give non-BIM stakeholders clear visibility into model status, spatial conflicts, and design intent without opening authoring tools.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Coordination Matrix Development<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Coordination Matrix</span><p>Defining which discipline pairs are tested, at what frequency, with what tolerance, and who owns the resolution. The governance document that turns ad-hoc coordination into a managed process.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Issue Tracking &amp; Reporting<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Issue Tracking</span><p>Centralised issue management across BCF, BIMcollab, or platform-native tools with status dashboards, ageing reports, and trend analysis. Intelligence on how the project is actually coordinating \u2014 not just whether clashes exist.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Constructability Review<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Constructability</span><p>Field-informed review of model geometry for installation access, sequencing feasibility, crane reach, and trade stacking. Catches buildability issues that automated clash detection misses.</p></div></div>
        </div>
        <div class="intel-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 \u2014 Reality Capture & Scan-to-BIM -->
      <div class="intel-svc-card" data-intel-svc>
        <div class="intel-svc-accent"></div>
        <div class="intel-svc-card-header">
          <span class="intel-svc-card-label">Pillar 03</span>
          <span class="intel-svc-card-count">Faro \u00b7 ReCap \u00b7 CloudCompare</span>
        </div>
        <h3>Reality Capture &amp; Scan-to-BIM</h3>
        <p class="intel-svc-card-desc">Laser scanning, drone photogrammetry, point cloud registration, and scan-to-BIM modelling. Verifying design against field conditions so the model reflects what\u2019s actually built \u2014 not what was assumed.</p>
        <div class="intel-svc-items">
          <div class="intel-svc-item" data-intel-tip>Terrestrial Laser Scanning<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Laser Scanning</span><p>High-density 3D point cloud capture of existing conditions using terrestrial scanners. Millimetre-accuracy data for as-existing documentation, renovation design, and field-to-model verification.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Drone / UAV Photogrammetry<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Photogrammetry</span><p>Aerial capture for large sites, corridors, and inaccessible areas. Orthomosaics, digital elevation models, and 3D meshes that provide site context, volumetric data, and progress baselines.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Point Cloud Registration &amp; Processing<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Registration</span><p>Aligning multiple scan stations into a unified, georeferenced point cloud. Cleaning, decimating, and segmenting raw data so it\u2019s usable for modelling, deviation analysis, and coordination overlay.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Scan-to-BIM Modelling<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Scan-to-BIM</span><p>Converting registered point clouds into intelligent BIM geometry \u2014 walls, structure, MEP, and site elements modelled with parameters and classification at the LOD required for design, coordination, or FM handover.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>As-Existing Condition Documentation<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">As-Existing</span><p>Comprehensive documentation of existing conditions \u2014 floor flatness, structural deviations, ceiling heights, and service routes \u2014 delivered as 2D drawings, 3D models, or both.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Deviation Analysis &amp; Reporting<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Deviation</span><p>Comparing as-built scan data against the design model to quantify deviations. Heat maps, tolerance reports, and flagged elements that exceed contractual thresholds \u2014 verified proof of what was actually constructed.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Progress Capture &amp; Comparison<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Progress Capture</span><p>Periodic scan capture overlaid against the 4D schedule to verify installation progress, flag sequence deviations, and provide visual evidence of percent-complete \u2014 not just reported status, but measured reality.</p></div></div>
        </div>
        <div class="intel-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 \u2014 Quantity & Data Verification -->
      <div class="intel-svc-card" data-intel-svc>
        <div class="intel-svc-accent"></div>
        <div class="intel-svc-card-header">
          <span class="intel-svc-card-label">Pillar 04</span>
          <span class="intel-svc-card-count">Solibri \u00b7 Dynamo \u00b7 Power BI</span>
        </div>
        <h3>Quantity &amp; Data Verification</h3>
        <p class="intel-svc-card-desc">Model-based QTO extraction, parameter auditing, LOD compliance checking, and data completeness reporting. The intelligence layer that ensures what\u2019s in the model is what was contractually required \u2014 and that decisions are based on verified information.</p>
        <div class="intel-svc-items">
          <div class="intel-svc-item" data-intel-tip>Model-Based Quantity Take-Off<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">QTO</span><p>Extracting quantities directly from the model \u2014 areas, volumes, lengths, counts \u2014 with full traceability to the element, its classification, and its location. No manual counting. No spreadsheet reconciliation.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Parameter &amp; Data Auditing<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Data Audit</span><p>Automated checks verifying that required parameters are populated, correctly formatted, and consistent across all elements. Catches empty fields, mismatched types, and naming deviations before they propagate.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>LOD/LOI Compliance Checking<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">LOD Compliance</span><p>Validating submitted models against the project\u2019s LOD/LOI matrix at each milestone. Identifies under-developed elements, missing information, and non-compliant geometry before coordination or contractual review.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>IFC &amp; Exchange Validation<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">IFC Validation</span><p>Testing IFC exports for data integrity \u2014 property set mapping, entity classification, geometry fidelity, and schema compliance. Ensuring that what leaves the authoring tool arrives intact in the coordination or FM environment.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Data Completeness Reporting<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Completeness</span><p>Dashboards and reports showing percentage of elements with complete data across naming, classification, parameters, and status fields. Project-level intelligence on information maturity \u2014 not just model geometry.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Model Health Scoring<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Health Scoring</span><p>Composite scoring of model quality \u2014 file size, warning counts, in-place elements, unresolved references, and data completeness. A single metric that tells the project manager whether the model is production-ready or needs remediation.</p></div></div>
          <div class="intel-svc-item" data-intel-tip>Deliverable Verification &amp; Sign-Off<span class="intel-svc-item-info">i</span><div class="intel-svc-tooltip"><span class="intel-svc-tooltip-title">Sign-Off</span><p>Formal verification that model deliverables meet BEP, EIR, and contractual requirements before submission. Naming compliance, classification accuracy, parameter completeness, and file format validation \u2014 audited and documented.</p></div></div>
        </div>
        <div class="intel-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="intel-deliverables">
      <div class="intel-deliverables-label">Key Deliverables</div>
      <div class="intel-deliverables-tags">
        <span class="intel-del-tag">Federated Models</span>
        <span class="intel-del-tag">Clash Detection Reports</span>
        <span class="intel-del-tag">Scan-to-BIM Models</span>
        <span class="intel-del-tag">Point Cloud Registrations</span>
        <span class="intel-del-tag">QTO Extractions</span>
        <span class="intel-del-tag">Model Audit Reports</span>
        <span class="intel-del-tag">LOD Compliance Reports</span>
        <span class="intel-del-tag">Coordination Matrices</span>
        <span class="intel-del-tag">Parameter Validation</span>
        <span class="intel-del-tag">Data Completeness Dashboards</span>
        <span class="intel-del-tag">Issue Tracking Reports</span>
        <span class="intel-del-tag">Deviation Analysis</span>
        <span class="intel-del-tag">Model Health Scores</span>
        <span class="intel-del-tag">Deliverable Sign-Off</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="intel-services-cta-strip">
      <span class="intel-services-cta-text"><strong>Don\u2019t see what you need?</strong> Our intelligence services extend beyond what\u2019s listed here.</span>
      <a href="/contact/" class="intel-services-cta-btn">Discuss Your Programme \u2192</a>
    </div>

    <div class="intel-services-iso">
      <span>Aligned to ISO 19650-2 \u00b7 Revit \u00b7 Navisworks \u00b7 Solibri \u00b7 IFC \u00b7 openBIM</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-intel-svc]');
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

  var tags = document.querySelectorAll('.intel-del-tag');
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

  var icons = document.querySelectorAll('.intel-svc-item-info');
  icons.forEach(function(icon) {
    var row = icon.closest('.intel-svc-item');
    icon.addEventListener('mouseenter', function() {
      document.querySelectorAll('.intel-tip-visible').forEach(function(el) { el.classList.remove('intel-tip-visible'); });
      if (row) row.classList.add('intel-tip-visible');
    });
    icon.addEventListener('mouseleave', function() {
      if (row) row.classList.remove('intel-tip-visible');
    });
  });

  var tipRows = document.querySelectorAll('[data-intel-tip]');
  tipRows.forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.closest('.intel-svc-tooltip')) return;
      e.stopPropagation();
      var wasActive = row.classList.contains('intel-tip-visible');
      document.querySelectorAll('.intel-tip-visible').forEach(function(el) { el.classList.remove('intel-tip-visible'); });
      if (!wasActive) row.classList.add('intel-tip-visible');
    });
    row.style.cursor = 'pointer';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-intel-tip]')) {
      document.querySelectorAll('.intel-tip-visible').forEach(function(el) { el.classList.remove('intel-tip-visible'); });
    }
  });
})();`;

export default function IntelligenceServices() {
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
