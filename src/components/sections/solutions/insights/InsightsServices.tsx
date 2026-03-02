'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .ins-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .ins-services-glow {
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

  .ins-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .ins-services-header { text-align: center; margin-bottom: 72px; }

  .ins-services-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .ins-services-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .ins-services h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px 0;
  }
  .ins-services h2 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }

  .ins-services-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 660px; margin: 0 auto;
  }

  .ins-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 64px; }

  .ins-svc-card {
    position: relative; background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10); padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1); backdrop-filter: blur(4px); overflow: visible;
  }
  .ins-svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .ins-svc-card::after {
    content: ''; position: absolute; bottom: 0; right: 0; width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }
  .ins-svc-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); }
  .ins-svc-card:hover::before, .ins-svc-card:hover::after { border-color: rgba(71,181,255,0.45); }

  .ins-svc-accent {
    position: absolute; top: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .ins-svc-card:hover .ins-svc-accent { width: 100%; }

  .ins-svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .ins-svc-card-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; }
  .ins-svc-card-count { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(122,155,181,0.4); border: 1px solid rgba(71,181,255,0.1); padding: 3px 10px; }

  .ins-svc-card h3 {
    font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 20px;
    letter-spacing: -0.01em; color: #F4F6F8; margin: 0 0 12px 0;
    text-transform: uppercase; transition: color 0.3s ease;
  }
  .ins-svc-card:hover h3 { color: #47B5FF; }

  .ins-svc-card-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.75; color: #7a9bb5; margin: 0 0 28px 0; }

  .ins-svc-items { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(71,181,255,0.08); }

  .ins-svc-item {
    position: relative; display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400;
    color: rgba(244,246,248,0.7); transition: color 0.2s ease, padding-left 0.2s ease; cursor: default;
  }
  .ins-svc-item:hover { color: #F4F6F8; padding-left: 6px; }
  .ins-svc-item::before { content: '\u2192'; font-size: 11px; color: #47B5FF; opacity: 0.5; flex-shrink: 0; transition: opacity 0.2s ease; }
  .ins-svc-item:hover::before { opacity: 1; }

  .ins-svc-item-info {
    position: relative; margin-left: auto; flex-shrink: 0; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    color: rgba(71,181,255,0.55); border: 1px solid rgba(71,181,255,0.3);
    border-radius: 50%; transition: all 0.2s ease; cursor: help;
  }
  .ins-svc-item-info:hover { color: #47B5FF; border-color: #47B5FF; background: rgba(71,181,255,0.08); }

  .ins-svc-tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(6px); background: #0B3C5D;
    border: 1px solid rgba(71,181,255,0.2); padding: 14px 18px; width: 300px;
    z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .ins-svc-item.ins-tip-visible .ins-svc-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .ins-svc-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #0B3C5D; }
  .ins-svc-tooltip p { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.7; color: rgba(244,246,248,0.85); margin: 0; }
  .ins-svc-tooltip-title { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #47B5FF; margin-bottom: 6px; display: block; }

  .ins-svc-more {
    display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px;
    border-top: 1px dashed rgba(71,181,255,0.1); font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400; color: rgba(122,155,181,0.5); letter-spacing: 0.01em;
  }
  .ins-svc-more::before { content: '+'; color: rgba(71,181,255,0.4); font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; }

  .ins-deliverables { padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.08); }
  .ins-deliverables-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 20px; text-align: center; }
  .ins-deliverables-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .ins-del-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244,246,248,0.45); border: 1px solid rgba(71,181,255,0.1); padding: 7px 16px; transition: all 0.3s ease; white-space: nowrap; }
  .ins-del-tag:hover { border-color: rgba(71,181,255,0.35); color: #47B5FF; }

  .ins-services-cta-strip { margin-top: 56px; padding: 40px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
  .ins-services-cta-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #7a9bb5; }
  .ins-services-cta-text strong { color: #F4F6F8; font-weight: 600; }
  .ins-services-cta-btn { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1C1F23; background: #47B5FF; border: 1px solid #47B5FF; padding: 14px 32px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
  .ins-services-cta-btn:hover { background: #3a9fe0; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.2); }

  .ins-services-iso { text-align: center; margin-top: 40px; }
  .ins-services-iso span { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  @media (max-width: 900px) {
    .ins-services-grid { grid-template-columns: 1fr; }
    .ins-services { padding: 80px 20px; }
    .ins-svc-tooltip { width: 240px; left: 20%; }
    .ins-services-cta-strip { flex-direction: column; text-align: center; gap: 20px; }
  }
  @media (hover: none) {
    .ins-svc-tooltip { display: none; }
    .ins-svc-item.ins-tip-visible .ins-svc-tooltip { display: block; opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  }
</style>

<section class="ins-services">
  <div class="ins-services-glow"></div>
  <div class="ins-services-inner">
    <div class="ins-services-header">
      <div class="ins-services-eyebrow">What We Deliver</div>
      <h2>Insights <em>Services</em></h2>
      <p class="ins-services-subtitle">The visibility layer transforms project data into structured, actionable intelligence. Four pillars covering dashboards and reporting, BIM auditing, cost integration, and compliance analytics.</p>
    </div>

    <div class="ins-services-grid">

      <!-- PILLAR 01 \u2014 Custom Dashboards & Reporting -->
      <div class="ins-svc-card" data-ins-svc>
        <div class="ins-svc-accent"></div>
        <div class="ins-svc-card-header">
          <span class="ins-svc-card-label">Pillar 01</span>
          <span class="ins-svc-card-count">Power BI \u00b7 Tableau \u00b7 Platform-Native</span>
        </div>
        <h3>Custom Dashboards &amp; Reporting</h3>
        <p class="ins-svc-card-desc">Role-based dashboards that connect schedule, cost, quality, and compliance data into a single view \u2014 not another set of disconnected charts. Real-time or near-real-time visibility for every stakeholder, from site teams to executive leadership.</p>
        <div class="ins-svc-items">
          <div class="ins-svc-item" data-ins-tip>Executive Programme Dashboards<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Executive View</span><p>Portfolio-level dashboards showing programme health across all active projects \u2014 schedule status, cost performance index, risk exposure, and milestone achievement. One view for leadership decisions.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Project-Level KPI Reporting<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Project KPIs</span><p>Structured reporting against defined KPIs \u2014 SPI, CPI, quality non-conformance rates, RFI response times, and inspection pass rates. Automated data feeds replace manual report assembly.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Automated Report Generation<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Automation</span><p>Scheduled report generation pulling live data from connected platforms \u2014 Procore, ACC, Primavera, cost systems. Reports delivered on cadence without manual compilation.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Data Source Integration &amp; ETL<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Integration</span><p>Connecting disparate data sources into a unified analytics layer. ETL pipelines that normalise schedule, cost, quality, and model data into a single queryable dataset.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Field Progress Visualisation<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Field Progress</span><p>Visual progress tracking tied to model elements \u2014 colour-coded status overlays showing planned vs. actual installation, inspection completion, and system turnover by zone.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Stakeholder Access Configuration<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Access</span><p>Role-based access ensuring each stakeholder sees the data relevant to their function. Owners see portfolio health, contractors see earned value, inspectors see quality metrics. Scoped by role and responsibility.</p></div></div>
        </div>
        <div class="ins-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 02 \u2014 BIM Auditing & Model Quality -->
      <div class="ins-svc-card" data-ins-svc>
        <div class="ins-svc-accent"></div>
        <div class="ins-svc-card-header">
          <span class="ins-svc-card-label">Pillar 02</span>
          <span class="ins-svc-card-count">Solibri \u00b7 BIM Track \u00b7 Navisworks</span>
        </div>
        <h3>BIM Auditing &amp; Model Quality</h3>
        <p class="ins-svc-card-desc">Automated model validation against EIR/BEP requirements \u2014 naming conventions, classification compliance, LOD adherence, data completeness. Rule-based checks that catch errors before they compound into handover failures.</p>
        <div class="ins-svc-items">
          <div class="ins-svc-item" data-ins-tip>Automated Rule-Based Validation<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Rule Engine</span><p>Configurable rule sets that validate models against project-specific requirements \u2014 naming conventions, parameter population, classification accuracy, spatial integrity. Automated checks on every model submission.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>EIR/BEP Compliance Scoring<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Compliance</span><p>Scoring model deliverables against the specific requirements defined in the EIR and BEP. Quantified compliance \u2014 not subjective review. Every submission measured against the contractual standard.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>LOD/LOI Adherence Checks<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">LOD/LOI</span><p>Verifying that model elements meet the required Level of Development and Level of Information for each project phase. Geometry detail and data richness checked against the LOD/LOI matrix.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Model Health Dashboards<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Health</span><p>Continuous model health monitoring \u2014 file size trends, warning counts, duplicate elements, unplaced rooms, missing parameters. Early warning indicators that prevent model degradation over the project lifecycle.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Clash &amp; Coordination Analytics<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Coordination</span><p>Analytics on clash detection trends \u2014 clash counts by discipline pair, resolution rates, recurring conflicts. Turning coordination data into actionable patterns rather than endless clash reports.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Audit Reporting &amp; Trend Analysis<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Trends</span><p>Periodic audit reports tracking model quality over time. Trend analysis showing whether compliance is improving or degrading, which disciplines are performing, and where intervention is needed.</p></div></div>
        </div>
        <div class="ins-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 03 \u2014 5D Cost Integration & Earned Value -->
      <div class="ins-svc-card" data-ins-svc>
        <div class="ins-svc-accent"></div>
        <div class="ins-svc-card-header">
          <span class="ins-svc-card-label">Pillar 03</span>
          <span class="ins-svc-card-count">CostX \u00b7 Navisworks \u00b7 Power BI</span>
        </div>
        <h3>5D Cost Integration &amp; Earned Value</h3>
        <p class="ins-svc-card-desc">Linking model quantities to cost data \u2014 budget forecasting, cost-to-complete, and earned value tracking driven by the model, not by spreadsheets. The 5D dimension that connects geometry to money and schedule to progress.</p>
        <div class="ins-svc-items">
          <div class="ins-svc-item" data-ins-tip>Model-Based Quantity Extraction<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Quantities</span><p>Automated quantity take-off from the coordinated model \u2014 volumes, areas, counts, lengths \u2014 structured by cost code and work breakdown structure. Quantities update as the model evolves, eliminating manual re-extraction.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Cost-to-Complete Forecasting<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Forecasting</span><p>Projecting remaining costs based on actual performance data \u2014 not original estimates. Model-linked progress combined with actual cost rates to produce forecasts grounded in what\u2019s happening, not what was planned.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Earned Value Management Dashboards<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">EVM</span><p>SPI, CPI, EAC, ETC \u2014 earned value metrics calculated from model-linked progress and actual cost data. Visual dashboards that show schedule and cost performance in real time, not reconstructed from monthly reports.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Budget vs. Actual Variance Tracking<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Variance</span><p>Automated variance reporting by cost code, discipline, zone, and phase. Identifying where overruns are occurring while there\u2019s still time to intervene \u2014 not at the end of the month.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Change Order Impact Analysis<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Change Orders</span><p>Quantifying the cost and schedule impact of change orders against the model. Visual impact analysis showing what changed, where, and the cascading effects on budget and programme.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Cost System Integration<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Integration</span><p>Connecting model-based quantities to the project\u2019s cost management system \u2014 Sage, Procore Financials, or custom ERP. Bi-directional data flow so model and cost stay synchronised.</p></div></div>
        </div>
        <div class="ins-svc-more">Additional services tailored to project scope</div>
      </div>

      <!-- PILLAR 04 \u2014 Compliance Scorecards & Programme Analytics -->
      <div class="ins-svc-card" data-ins-svc>
        <div class="ins-svc-accent"></div>
        <div class="ins-svc-card-header">
          <span class="ins-svc-card-label">Pillar 04</span>
          <span class="ins-svc-card-count">ISO 19650 \u00b7 EIR/BEP \u00b7 Portfolio</span>
        </div>
        <h3>Compliance Scorecards &amp; Programme Analytics</h3>
        <p class="ins-svc-card-desc">Cross-project benchmarking, ISO 19650 compliance tracking, and portfolio-level performance metrics. Turning contractual obligations into measurable, auditable, scored dimensions \u2014 not assumptions buried in procurement documents.</p>
        <div class="ins-svc-items">
          <div class="ins-svc-item" data-ins-tip>ISO 19650 Compliance Scorecards<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">ISO 19650</span><p>Scoring project performance against ISO 19650 requirements \u2014 information delivery milestones, CDE usage, responsibility matrix adherence, and information standard compliance. Quantified, not assumed.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Cross-Project Benchmarking<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Benchmarking</span><p>Comparing performance metrics across projects in a portfolio \u2014 delivery cadence, model quality scores, cost performance, schedule adherence. Identifying which projects are performing and which need intervention.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Portfolio Performance Dashboards<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Portfolio</span><p>Aggregate analytics across all active projects \u2014 total programme value, blended CPI/SPI, compliance rates, risk heat maps. The owner\u2019s view of their entire capital programme in one interface.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Deliverable Tracking &amp; Milestone Monitoring<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Milestones</span><p>Tracking information deliverables against the MIDP/TIDP \u2014 what was due, what was delivered, what\u2019s overdue. Automated milestone monitoring with escalation triggers for missed deadlines.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Risk &amp; Issue Analytics<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Risk</span><p>Aggregating risk register data into visual analytics \u2014 risk heat maps, trending issues, mitigation status, and exposure quantification. Risk management driven by data patterns, not quarterly reviews.</p></div></div>
          <div class="ins-svc-item" data-ins-tip>Lessons Learned &amp; Performance Reporting<span class="ins-svc-item-info">i</span><div class="ins-svc-tooltip"><span class="ins-svc-tooltip-title">Lessons</span><p>Structured capture and analysis of project performance data for continuous improvement \u2014 what worked, what didn\u2019t, and quantified evidence to support future programme decisions.</p></div></div>
        </div>
        <div class="ins-svc-more">Additional services tailored to project scope</div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="ins-deliverables">
      <div class="ins-deliverables-label">Key Deliverables</div>
      <div class="ins-deliverables-tags">
        <span class="ins-del-tag">Custom Dashboards</span>
        <span class="ins-del-tag">BIM Audit Reports</span>
        <span class="ins-del-tag">5D Cost Models</span>
        <span class="ins-del-tag">Compliance Scorecards</span>
        <span class="ins-del-tag">Earned Value Dashboards</span>
        <span class="ins-del-tag">Automated Validation Rule Sets</span>
        <span class="ins-del-tag">Programme Analytics Reports</span>
        <span class="ins-del-tag">KPI Frameworks</span>
        <span class="ins-del-tag">Data Integration Specs</span>
        <span class="ins-del-tag">Model Health Reports</span>
        <span class="ins-del-tag">Portfolio Benchmarking</span>
        <span class="ins-del-tag">Risk Heat Maps</span>
      </div>
    </div>

    <!-- CTA STRIP -->
    <div class="ins-services-cta-strip">
      <span class="ins-services-cta-text"><strong>Don\u2019t see what you need?</strong> Our analytics services extend beyond what\u2019s listed here.</span>
      <a href="/contact/" class="ins-services-cta-btn">Discuss Your Programme \u2192</a>
    </div>

    <div class="ins-services-iso">
      <span>Power BI \u00b7 Tableau \u00b7 Solibri \u00b7 CostX \u00b7 Navisworks \u00b7 ACC \u00b7 Procore</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-ins-svc]');
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

  var tags = document.querySelectorAll('.ins-del-tag');
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

  var icons = document.querySelectorAll('.ins-svc-item-info');
  icons.forEach(function(icon) {
    var row = icon.closest('.ins-svc-item');
    icon.addEventListener('mouseenter', function() {
      document.querySelectorAll('.ins-tip-visible').forEach(function(el) { el.classList.remove('ins-tip-visible'); });
      if (row) row.classList.add('ins-tip-visible');
    });
    icon.addEventListener('mouseleave', function() {
      if (row) row.classList.remove('ins-tip-visible');
    });
  });

  var tipRows = document.querySelectorAll('[data-ins-tip]');
  tipRows.forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.closest('.ins-svc-tooltip')) return;
      e.stopPropagation();
      var wasActive = row.classList.contains('ins-tip-visible');
      document.querySelectorAll('.ins-tip-visible').forEach(function(el) { el.classList.remove('ins-tip-visible'); });
      if (!wasActive) row.classList.add('ins-tip-visible');
    });
    row.style.cursor = 'pointer';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-ins-tip]')) {
      document.querySelectorAll('.ins-tip-visible').forEach(function(el) { el.classList.remove('ins-tip-visible'); });
    }
  });
})();`;

export default function InsightsServices() {
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
