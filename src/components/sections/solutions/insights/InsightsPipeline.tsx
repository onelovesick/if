'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  /* ════════ WRAPPER ════════ */
  .ins-pipe { position: relative; background: #1C1F23; padding: 120px 32px 140px; overflow: hidden; }
  .ins-pipe::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(71,181,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(71,181,255,0.02) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
  .ins-pipe-glow { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120%; height: 40%; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.06) 0%, transparent 70%); pointer-events: none; }
  .ins-pipe-inner { position: relative; max-width: 1100px; margin: 0 auto; z-index: 1; }

  /* ════════ HEADER ════════ */
  .ins-pipe-header { text-align: center; margin-bottom: 64px; }
  .ins-pipe-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px; }
  .ins-pipe-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .ins-pipe h2 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(28px, 3.2vw, 44px); line-height: 1.08; letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 18px; }
  .ins-pipe h2 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }
  .ins-pipe-sub { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 620px; margin: 0 auto; }

  /* ════════ SERPENTINE ════════ */
  .ins-serp { position: relative; width: 100%; margin-bottom: 64px; }
  .ins-serp-svg-wrap { position: relative; width: 100%; }
  .ins-serp-svg-wrap svg { display: block; width: 100%; height: auto; }

  .ins-serp-path-bg { fill: none; stroke: rgba(71,181,255,0.07); stroke-width: 2; }
  .ins-serp-path-glow { fill: none; stroke: url(#ins-pg); stroke-width: 2.5; stroke-dasharray: 2200; stroke-dashoffset: 2200; }
  .ins-serp.ins-serp-active .ins-serp-path-glow { stroke-dashoffset: 0; transition: stroke-dashoffset 3.5s cubic-bezier(0.22,1,0.36,1); }

  .ins-serp-dot { fill: #47B5FF; filter: url(#ins-dg); opacity: 0; }
  .ins-serp.ins-serp-active .ins-serp-dot { opacity: 1; }

  .ins-serp-nc { fill: #1C1F23; stroke: rgba(71,181,255,0.12); stroke-width: 1.5; transition: all 0.6s ease; }
  .ins-serp-nc.ins-nc-on { stroke: #47B5FF; filter: url(#ins-ng); }
  /* Node colour progression: dark navy → bright blue */
  .ins-serp-nc.ins-nc-on.ins-nc-1 { stroke: rgba(255,140,60,0.7); }
  .ins-serp-nc.ins-nc-on.ins-nc-2 { stroke: rgba(120,170,220,0.7); }
  .ins-serp-nc.ins-nc-on.ins-nc-3 { stroke: rgba(71,181,255,0.7); }
  .ins-serp-nc.ins-nc-on.ins-nc-4 { stroke: rgba(71,181,255,0.85); }
  .ins-serp-nc5.ins-nc-on { stroke: rgba(71,181,255,1); }
  .ins-serp-ni { fill: rgba(71,181,255,0.08); transition: fill 0.6s ease; }
  .ins-serp-nc.ins-nc-on ~ .ins-serp-ni { fill: rgba(71,181,255,0.25); }
  .ins-serp-nc.ins-nc-1.ins-nc-on ~ .ins-serp-ni-1 { fill: rgba(255,140,60,0.2); }
  .ins-serp-nc5.ins-nc-on ~ .ins-serp-ni5 { fill: rgba(71,181,255,0.3); }

  .ins-serp-icon { fill: none; stroke: rgba(71,181,255,0.2); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.6s ease; }
  .ins-serp-nc.ins-nc-on ~ .ins-serp-icon { stroke: rgba(71,181,255,0.8); }
  .ins-serp-nc5.ins-nc-on ~ .ins-serp-icon5 { stroke: rgba(71,181,255,0.9); }

  /* Content cards */
  .ins-serp-cards { position: absolute; inset: 0; pointer-events: none; }
  .ins-sc { position: absolute; width: 175px; text-align: center; pointer-events: auto; opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .ins-sc.ins-sc-on { opacity: 1; transform: translateY(0); }
  .ins-sc-num { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(71,181,255,0.45); margin-bottom: 5px; }
  .ins-sc-name { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 15px; text-transform: uppercase; color: #F4F6F8; margin-bottom: 5px; line-height: 1.25; }
  .ins-sc-desc { font-family: 'Inter', sans-serif; font-size: 11.5px; font-weight: 400; line-height: 1.55; color: #5a7a96; }
  .ins-sc-s5 .ins-sc-num { color: rgba(71,181,255,0.65); }
  .ins-sc-s5 .ins-sc-name { color: rgba(71,181,255,1); }
  .ins-sc-s1 .ins-sc-num { color: rgba(255,140,60,0.55); }
  .ins-sc-s1 .ins-sc-name { color: rgba(255,180,100,0.9); }

  /* ════════ DIVIDER ════════ */
  .ins-pipe-divider { display: flex; align-items: center; gap: 16px; margin: 0 0 64px; }
  .ins-pipe-divider::before, .ins-pipe-divider::after { content: ''; flex: 1; height: 1px; background: repeating-linear-gradient(90deg, rgba(71,181,255,0.25) 0px, rgba(71,181,255,0.25) 6px, transparent 6px, transparent 12px); }
  .ins-pipe-divider-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.55); white-space: nowrap; }

  /* ════════ OPTIMISATION LOOP ════════ */
  .ins-pipe-loop { margin-bottom: 64px; }
  .ins-pipe-loop-header { text-align: center; margin-bottom: 40px; }
  .ins-pipe-loop-header h3 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(22px, 2.5vw, 32px); text-transform: uppercase; color: #F4F6F8; margin: 0 0 14px; }
  .ins-pipe-loop-header h3 em { font-style: italic; color: #47B5FF; margin-right: 0.08em; }
  .ins-pipe-loop-header p { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 580px; margin: 0 auto; }
  .ins-pipe-loop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .ins-pipe-loop-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.08); padding: 24px 20px 20px; transition: all 0.35s cubic-bezier(0.22,1,0.36,1); overflow: hidden; }
  .ins-pipe-loop-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: rgba(71,181,255,0.6); transition: width 0.4s ease; }
  .ins-pipe-loop-card:hover::before { width: 100%; }
  .ins-pipe-loop-card:hover { background: rgba(71,181,255,0.03); border-color: rgba(71,181,255,0.18); transform: translateY(-2px); }
  .ins-pipe-loop-icon { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.6); margin-bottom: 12px; }
  .ins-pipe-loop-card-name { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; color: #F4F6F8; margin-bottom: 8px; transition: color 0.3s ease; }
  .ins-pipe-loop-card:hover .ins-pipe-loop-card-name { color: rgba(71,181,255,0.85); }
  .ins-pipe-loop-card-desc { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.6; color: #5a7a96; }
  .ins-pipe-loop-arrow { display: flex; align-items: center; justify-content: center; padding: 20px 0 0; }
  .ins-pipe-loop-arrow span { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(71,181,255,0.4); }

  /* ════════ KPI STRIP ════════ */
  .ins-pipe-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding-top: 56px; border-top: 1px solid rgba(71,181,255,0.06); }
  .ins-pipe-kpi { text-align: center; padding: 24px 16px; border: 1px solid rgba(71,181,255,0.06); background: rgba(255,255,255,0.01); transition: all 0.3s ease; }
  .ins-pipe-kpi:hover { border-color: rgba(71,181,255,0.15); background: rgba(71,181,255,0.02); }
  .ins-pipe-kpi-value { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: 28px; letter-spacing: -0.03em; color: #47B5FF; margin-bottom: 6px; }
  .ins-pipe-kpi-value span { font-size: 16px; color: rgba(71,181,255,0.6); }
  .ins-pipe-kpi-label { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; color: #7a9bb5; margin-bottom: 8px; }
  .ins-pipe-kpi-source { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.06em; color: rgba(71,181,255,0.3); text-decoration: none; }
  .ins-pipe-kpi-source:hover { color: rgba(71,181,255,0.6); }

  /* ════════ SUMMARY ════════ */
  .ins-pipe-summary { text-align: center; margin-top: 56px; padding-top: 48px; border-top: 1px solid rgba(71,181,255,0.06); }
  .ins-pipe-summary-stat { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(20px, 2.2vw, 28px); text-transform: uppercase; color: rgba(71,181,255,0.7); margin-bottom: 6px; }
  .ins-pipe-summary-stat em { font-style: italic; color: rgba(71,181,255,0.9); margin-right: 0.08em; }
  .ins-pipe-summary-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  /* ════════ Responsive ════════ */
  @media (max-width: 900px) {
    .ins-pipe { padding: 80px 20px 100px; }
    .ins-pipe-loop-grid { grid-template-columns: 1fr 1fr; }
    .ins-pipe-kpis { grid-template-columns: 1fr 1fr; }
    .ins-sc { width: 130px; }
    .ins-sc-name { font-size: 13px; }
    .ins-sc-desc { font-size: 10px; }
  }
  @media (max-width: 600px) {
    .ins-pipe-loop-grid { grid-template-columns: 1fr; }
    .ins-pipe-kpis { grid-template-columns: 1fr; }
    .ins-sc { width: 100px; }
    .ins-sc-desc { display: none; }
  }
</style>

<section class="ins-pipe">
  <div class="ins-pipe-glow"></div>
  <div class="ins-pipe-inner">

    <div class="ins-pipe-header" id="ins-pipe-header">
      <div class="ins-pipe-eyebrow">The Visibility Pipeline</div>
      <h2>From Noise To <em>Signal</em> To Decision</h2>
      <p class="ins-pipe-sub">Raw project data is noise. Structured analytics is signal. The Visibility Pipeline transforms one into the other \u2014 five stages that process, correlate, visualise, and optimise construction data into the intelligence your programme needs to make better decisions, faster.</p>
    </div>

    <!-- ═══ SERPENTINE DIAGRAM ═══ -->
    <div class="ins-serp" id="ins-serp">
      <div class="ins-serp-svg-wrap">
        <svg viewBox="0 0 1100 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="ins-pg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(255,140,60,0.7)"/>
              <stop offset="20%" stop-color="rgba(255,140,60,0.5)"/>
              <stop offset="45%" stop-color="rgba(71,181,255,0.35)"/>
              <stop offset="75%" stop-color="rgba(71,181,255,0.7)"/>
              <stop offset="100%" stop-color="rgba(71,181,255,0.9)"/>
            </linearGradient>
            <filter id="ins-dg"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="ins-ng"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          <!-- The serpentine path: weaves top\u2192bottom\u2192top\u2192bottom\u2192top -->
          <path id="ins-mp" class="ins-serp-path-bg"
            d="M 40,300
               C 80,300 100,300 140,300
               C 200,300 200,150 260,150
               L 340,150
               C 400,150 400,370 460,370
               L 540,370
               C 600,370 600,150 660,150
               L 740,150
               C 800,150 800,370 860,370
               L 920,370
               C 960,370 980,220 1020,220
               L 1060,220" />

          <path id="ins-gp" class="ins-serp-path-glow"
            d="M 40,300
               C 80,300 100,300 140,300
               C 200,300 200,150 260,150
               L 340,150
               C 400,150 400,370 460,370
               L 540,370
               C 600,370 600,150 660,150
               L 740,150
               C 800,150 800,370 860,370
               L 920,370
               C 960,370 980,220 1020,220
               L 1060,220" />

          <!-- Travelling dot -->
          <circle class="ins-serp-dot" r="5" cx="0" cy="0">
            <animateMotion id="ins-da" dur="3.5s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1">
              <mpath href="#ins-mp"/>
            </animateMotion>
          </circle>

          <!-- Start dot -->
          <circle cx="40" cy="300" r="4" fill="rgba(255,140,60,0.6)"/>
          <text x="40" y="330" fill="rgba(255,140,60,0.5)" font-family="Inter Tight,sans-serif" font-weight="900" font-size="11" text-anchor="middle" letter-spacing="0.08em">START</text>

          <!-- Node 1: Raw Data @ (300, 150) top -->
          <circle class="ins-serp-nc ins-nc-1" cx="300" cy="150" r="26" data-ins-nc/>
          <circle class="ins-serp-ni ins-serp-ni-1" cx="300" cy="150" r="16"/>
          <g class="ins-serp-icon"><circle cx="294" cy="146" r="1.8" fill="rgba(255,140,60,0.25)" stroke="none"/><circle cx="306" cy="154" r="1.8" fill="rgba(255,140,60,0.25)" stroke="none"/><circle cx="296" cy="157" r="1.8" fill="rgba(255,140,60,0.25)" stroke="none"/><circle cx="308" cy="145" r="1.8" fill="rgba(255,140,60,0.25)" stroke="none"/><circle cx="300" cy="150" r="1.8" fill="rgba(255,140,60,0.25)" stroke="none"/></g>

          <!-- Node 2: Structured @ (500, 370) bottom -->
          <circle class="ins-serp-nc ins-nc-2" cx="500" cy="370" r="26" data-ins-nc/>
          <circle class="ins-serp-ni" cx="500" cy="370" r="16"/>
          <g class="ins-serp-icon"><rect x="490" y="362" width="20" height="16" rx="1.5"/><line x1="490" y1="369" x2="510" y2="369"/><line x1="490" y1="374" x2="510" y2="374"/></g>

          <!-- Node 3: Analysed @ (700, 150) top -->
          <circle class="ins-serp-nc ins-nc-3" cx="700" cy="150" r="26" data-ins-nc/>
          <circle class="ins-serp-ni" cx="700" cy="150" r="16"/>
          <g class="ins-serp-icon"><polyline points="690,150 694,150 697,159 703,141 706,150 710,150"/></g>

          <!-- Node 4: Visualised @ (890, 370) bottom -->
          <circle class="ins-serp-nc ins-nc-4" cx="890" cy="370" r="26" data-ins-nc/>
          <circle class="ins-serp-ni" cx="890" cy="370" r="16"/>
          <g class="ins-serp-icon"><rect x="880" y="362" width="8" height="8" rx="0.5"/><rect x="892" y="362" width="8" height="8" rx="0.5"/><rect x="880" y="373" width="8" height="8" rx="0.5"/><rect x="892" y="373" width="8" height="8" rx="0.5"/></g>

          <!-- Node 5: Optimised @ (1060, 220) -->
          <circle class="ins-serp-nc ins-serp-nc5" cx="1060" cy="220" r="26" data-ins-nc/>
          <circle class="ins-serp-ni ins-serp-ni5" cx="1060" cy="220" r="16"/>
          <g class="ins-serp-icon ins-serp-icon5"><circle cx="1060" cy="220" r="10"/><path d="M1053,220 l4,4 8,-8"/></g>

          <!-- End label -->
          <text x="1060" y="268" fill="rgba(71,181,255,0.6)" font-family="Inter Tight,sans-serif" font-weight="900" font-size="11" text-anchor="middle" letter-spacing="0.08em">END</text>
        </svg>

        <!-- Overlaid content cards -->
        <div class="ins-serp-cards">
          <div class="ins-sc ins-sc-s1" data-ins-sc="0" style="left: calc(27.3% - 87px); top: 0%;">
            <div class="ins-sc-num">Stage 01</div>
            <div class="ins-sc-name">Raw Data</div>
            <div class="ins-sc-desc">Siloed across platforms. Schedules, models, cost reports, inspection logs \u2014 unconnected, mostly unused.</div>
          </div>
          <div class="ins-sc" data-ins-sc="1" style="left: calc(45.5% - 87px); bottom: 0%;">
            <div class="ins-sc-num">Stage 02</div>
            <div class="ins-sc-name">Structured</div>
            <div class="ins-sc-desc">ETL pipelines normalise data into unified schemas. Common taxonomies, shared identifiers.</div>
          </div>
          <div class="ins-sc" data-ins-sc="2" style="left: calc(63.6% - 87px); top: 0%;">
            <div class="ins-sc-num">Stage 03</div>
            <div class="ins-sc-name">Analysed</div>
            <div class="ins-sc-desc">Cross-domain correlation. Schedule vs. cost vs. quality. Variances detected, causes isolated.</div>
          </div>
          <div class="ins-sc" data-ins-sc="3" style="left: calc(80.9% - 87px); bottom: 0%;">
            <div class="ins-sc-num">Stage 04</div>
            <div class="ins-sc-name">Visualised</div>
            <div class="ins-sc-desc">Role-based dashboards. Every stakeholder sees what matters to their decisions.</div>
          </div>
          <div class="ins-sc ins-sc-s5" data-ins-sc="4" style="left: calc(96.4% - 87px); top: 5%;">
            <div class="ins-sc-num">Stage 05</div>
            <div class="ins-sc-name">Optimised</div>
            <div class="ins-sc-desc">Feedback loops refine forecasts, tighten benchmarks. Continuous improvement.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="ins-pipe-divider"><span class="ins-pipe-divider-label">The Optimisation Loop</span></div>

    <!-- OPTIMISATION LOOP -->
    <div class="ins-pipe-loop">
      <div class="ins-pipe-loop-header">
        <h3>Visibility Without <em>Optimisation</em> Is Just Reporting</h3>
        <p>Dashboards tell you what happened. The optimisation loop tells you what to do next. Each reporting cycle feeds back into the pipeline \u2014 refining forecasts, tightening benchmarks, and reducing decision latency. This is where analytics becomes a competitive advantage.</p>
      </div>
      <div class="ins-pipe-loop-grid">
        <div class="ins-pipe-loop-card" data-ins-loop>
          <div class="ins-pipe-loop-icon">Loop 01</div>
          <div class="ins-pipe-loop-card-name">Forecast Refinement</div>
          <div class="ins-pipe-loop-card-desc">Each cost and schedule cycle recalibrates estimates against actuals. Forecasts tighten as the project progresses \u2014 EAC accuracy improves from \u00b125% at concept to \u00b15% at construction.</div>
        </div>
        <div class="ins-pipe-loop-card" data-ins-loop>
          <div class="ins-pipe-loop-icon">Loop 02</div>
          <div class="ins-pipe-loop-card-name">Benchmark Calibration</div>
          <div class="ins-pipe-loop-card-desc">Cross-project data establishes performance baselines. Each completed project refines the benchmark database \u2014 productivity rates, cost indices, quality metrics become more accurate over time.</div>
        </div>
        <div class="ins-pipe-loop-card" data-ins-loop>
          <div class="ins-pipe-loop-icon">Loop 03</div>
          <div class="ins-pipe-loop-card-name">Process Improvement</div>
          <div class="ins-pipe-loop-card-desc">Analytics identify recurring inefficiencies \u2014 coordination bottlenecks, procurement delays, rework patterns. Each cycle targets the highest-impact process for intervention.</div>
        </div>
        <div class="ins-pipe-loop-card" data-ins-loop>
          <div class="ins-pipe-loop-icon">Loop 04</div>
          <div class="ins-pipe-loop-card-name">Decision Acceleration</div>
          <div class="ins-pipe-loop-card-desc">Reduced decision latency compounds over the project lifecycle. Faster variance detection, faster escalation, faster correction. The gap between event and response shrinks with every cycle.</div>
        </div>
      </div>
      <div class="ins-pipe-loop-arrow"><span>\u21BB Continuous \u00b7 Each Cycle Feeds The Next</span></div>
    </div>

    <!-- KPI STRIP -->
    <div class="ins-pipe-kpis">
      <div class="ins-pipe-kpi" data-ins-kpi>
        <div class="ins-pipe-kpi-value">50<span>%</span></div>
        <div class="ins-pipe-kpi-label">Higher annual profit growth for construction data leaders vs. beginners</div>
        <div class="ins-pipe-kpi-source">Deloitte / Autodesk \u2014 State of Data Capabilities</div>
      </div>
      <div class="ins-pipe-kpi" data-ins-kpi>
        <div class="ins-pipe-kpi-value">96<span>%</span></div>
        <div class="ins-pipe-kpi-label">Of construction data goes unused \u2014 the pipeline exists to close that gap</div>
        <div class="ins-pipe-kpi-source">FMI / Autodesk \u2014 Data Advantage in E&amp;C</div>
      </div>
      <div class="ins-pipe-kpi" data-ins-kpi>
        <div class="ins-pipe-kpi-value">2.7<span>pp</span></div>
        <div class="ins-pipe-kpi-label">Increase in expected average profit each year for data-mature firms</div>
        <div class="ins-pipe-kpi-source">Deloitte Access Economics \u2014 Construction Data Report</div>
      </div>
      <div class="ins-pipe-kpi" data-ins-kpi>
        <div class="ins-pipe-kpi-value">11.5<span>h</span></div>
        <div class="ins-pipe-kpi-label">Hours per week construction managers spend searching for data they can\u2019t find</div>
        <div class="ins-pipe-kpi-source">Deloitte / Autodesk \u2014 Data Capabilities Survey</div>
      </div>
    </div>

    <!-- SUMMARY -->
    <div class="ins-pipe-summary">
      <div class="ins-pipe-summary-stat">The Pipeline Doesn\u2019t Just Report \u2014 It <em>Compounds</em></div>
      <div class="ins-pipe-summary-sub">Each Cycle Tighter \u00b7 Each Forecast Sharper \u00b7 Each Decision Faster</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var header = document.getElementById('ins-pipe-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(header);
  }

  /* Serpentine path + travelling dot */
  var serp = document.getElementById('ins-serp');
  var gp = document.getElementById('ins-gp');
  var da = document.getElementById('ins-da');
  var ncs = document.querySelectorAll('[data-ins-nc]');
  var scs = document.querySelectorAll('[data-ins-sc]');

  if (serp && gp) {
    var len = gp.getTotalLength();
    gp.style.strokeDasharray = len;
    gp.style.strokeDashoffset = len;

    var obsS = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          serp.classList.add('ins-serp-active');
          gp.style.transition = 'stroke-dashoffset 3.5s cubic-bezier(0.22,1,0.36,1)';
          gp.style.strokeDashoffset = '0';

          if (da) { try { da.beginElement(); } catch(x) {} }

          ncs.forEach(function(n, i) {
            setTimeout(function() { n.classList.add('ins-nc-on'); }, 500 + i * 550);
          });
          scs.forEach(function(c, i) {
            setTimeout(function() { c.classList.add('ins-sc-on'); }, 700 + i * 550);
          });

          obsS.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obsS.observe(serp);
  }

  /* Loop cards stagger */
  var loops = document.querySelectorAll('[data-ins-loop]');
  loops.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.35s ease, border-color 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(card);
  });

  /* KPI cards stagger */
  var kpis = document.querySelectorAll('[data-ins-kpi]');
  kpis.forEach(function(kpi, i) {
    kpi.style.opacity = '0';
    kpi.style.transform = 'translateY(12px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            kpi.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, background 0.3s ease';
            kpi.style.opacity = '1';
            kpi.style.transform = 'translateY(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(kpi);
  });
})();`;

export default function InsightsPipeline() {
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
