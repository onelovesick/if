'use client';
import { useEffect, useRef } from 'react';

const html = `

<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-eri { position: relative; background: #1C1F23; padding: 120px 32px 140px; overflow: hidden; }
  .exec-eri::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
  .exec-eri-glow { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 120%; height: 50%; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.08) 0%, transparent 70%); pointer-events: none; }
  .exec-eri-inner { position: relative; max-width: 1200px; margin: 0 auto; z-index: 1; }

  /* Header */
  .exec-eri-header { text-align: center; margin-bottom: 40px; }
  .exec-eri-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px; }
  .exec-eri-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .exec-eri h2 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(30px, 3.5vw, 46px); line-height: 1.08; letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px; }
  .exec-eri h2 em { font-style: italic; color: #47B5FF; }
  .exec-eri-subtitle { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 640px; margin: 0 auto; }

  /* Radar */
  .exec-eri-radar-wrap { width: 100%; max-width: 540px; margin: 0 auto 16px; aspect-ratio: 1; }
  .exec-eri-radar-svg { width: 100%; height: 100%; }

  /* Dimension grid — 3 cols */
  .exec-eri-dims { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 14px; }
  #exec-eri-dims-bot { margin-bottom: 56px; }
  .exec-eri-dim { position: relative; padding: 22px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.08); transition: all 0.35s ease; cursor: default; }
  .exec-eri-dim::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: rgba(71,181,255,0.1); transition: background 0.4s ease; }
  .exec-eri-dim:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .exec-eri-dim:hover::before { background: #47B5FF; }
  .exec-eri-dim-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .exec-eri-dim-num { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(71,181,255,0.5); }
  .exec-eri-dim-score { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: rgba(255,140,60,0.7); }
  .exec-eri-dim-name { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0; color: #F4F6F8; margin: 0 0 6px; transition: color 0.3s ease; }
  .exec-eri-dim:hover .exec-eri-dim-name { color: #47B5FF; }
  .exec-eri-dim-desc { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.65; color: #5a7a96; margin: 0; }
  .exec-eri-dim-source { display: inline-block; margin-top: 8px; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.06em; color: rgba(71,181,255,0.35); text-decoration: none; transition: color 0.3s ease; }
  .exec-eri-dim-source:hover { color: rgba(71,181,255,0.7); }
  .exec-eri-dim-bar { height: 3px; background: rgba(71,181,255,0.06); margin-top: 10px; position: relative; overflow: hidden; }
  .exec-eri-dim-bar-fill { position: absolute; top: 0; left: 0; height: 100%; background: linear-gradient(90deg, rgba(255,140,60,0.6), rgba(255,140,60,0.3)); width: 0; transition: width 1.2s cubic-bezier(0.22,1,0.36,1); }

  /* Composite score */
  .exec-eri-composite { text-align: center; padding: 0 0 40px; margin-bottom: 8px; }
  .exec-eri-composite-score { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(64px, 7vw, 96px); color: rgba(255,140,60,0.8); letter-spacing: -0.04em; line-height: 1; margin-bottom: 12px; }
  .exec-eri-composite-meta { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .exec-eri-composite-verdict { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,140,60,0.5); }
  .exec-eri-composite-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(71,181,255,0.3); }

  /* Loop sub-header */
  .exec-eri-loop-header { text-align: center; margin-bottom: 48px; }
  .exec-eri-loop-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 20px; }
  .exec-eri-loop-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .exec-eri-loop-header h3 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(24px, 2.8vw, 36px); line-height: 1.1; letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 14px; }
  .exec-eri-loop-header h3 em { font-style: italic; color: #47B5FF; }
  .exec-eri-loop-sub { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 300; line-height: 1.75; color: #7a9bb5; max-width: 560px; margin: 0 auto; }

  /* Hex visual */
  .exec-eri-hex { position: relative; width: 100%; max-width: 540px; margin: 0 auto 56px; aspect-ratio: 1; }
  .exec-eri-hex-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .exec-eri-hex-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .exec-eri-node { position: absolute; width: 120px; text-align: center; transform: translate(-50%, -50%); cursor: default; z-index: 2; }
  .exec-eri-node-ring { width: 50px; height: 50px; border: 2px solid rgba(71,181,255,0.25); border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; background: rgba(28,31,35,0.9); transition: all 0.5s ease; position: relative; }
  .exec-eri-node-ring::before { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgba(71,181,255,0.08); transition: all 0.5s ease; }
  .exec-eri-node:hover .exec-eri-node-ring { border-color: rgba(71,181,255,0.6); box-shadow: 0 0 24px rgba(71,181,255,0.15); }
  .exec-eri-node-num { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; color: #47B5FF; letter-spacing: 0.05em; }
  .exec-eri-node-label { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #F4F6F8; line-height: 1.3; margin-bottom: 3px; transition: color 0.3s ease; }
  .exec-eri-node:hover .exec-eri-node-label { color: #47B5FF; }
  .exec-eri-node-desc { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.06em; color: rgba(122,155,181,0.5); text-transform: uppercase; line-height: 1.4; }
  .exec-eri-node[data-node="1"] { top: 8%; left: 50%; }
  .exec-eri-node[data-node="2"] { top: 28%; left: 87%; }
  .exec-eri-node[data-node="3"] { top: 68%; left: 87%; }
  .exec-eri-node[data-node="4"] { top: 88%; left: 50%; }
  .exec-eri-node[data-node="5"] { top: 68%; left: 13%; }
  .exec-eri-node[data-node="6"] { top: 28%; left: 13%; }
  .exec-eri-hub { position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 3; }
  .exec-eri-hub-ring { width: 80px; height: 80px; border: 2px solid rgba(71,181,255,0.15); border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; background: rgba(28,31,35,0.95); position: relative; animation: eri-hub-pulse 5s ease-in-out infinite; }
  .exec-eri-hub-ring::before { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid rgba(71,181,255,0.06); animation: eri-hub-pulse 5s ease-in-out infinite 0.8s; }
  @keyframes eri-hub-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.04); opacity: 0.85; } }
  .exec-eri-hub-text { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.14em; color: #47B5FF; }
  .exec-eri-hub-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(71,181,255,0.35); }

  /* Bottom dims — same grid */
  /* Stopline */
  .exec-eri-stopline { display: flex; align-items: center; gap: 16px; margin-bottom: 56px; }
  .exec-eri-stopline::before, .exec-eri-stopline::after { content: ''; flex: 1; height: 1px; background: repeating-linear-gradient(90deg, rgba(71,181,255,0.25) 0px, rgba(71,181,255,0.25) 6px, transparent 6px, transparent 12px); }
  .exec-eri-stopline-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.55); white-space: nowrap; }

  /* Result cards */
  .exec-eri-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .exec-eri-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.1); padding: 32px 28px 28px; transition: all 0.35s cubic-bezier(0.22,1,0.36,1); overflow: hidden; }
  .exec-eri-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15)); transition: width 0.45s cubic-bezier(0.22,1,0.36,1); }
  .exec-eri-card:hover::before { width: 100%; }
  .exec-eri-card:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .exec-eri-card-icon { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #47B5FF; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .exec-eri-card-icon::before { content: ''; width: 6px; height: 6px; background: rgba(71,181,255,0.3); border: 1px solid rgba(71,181,255,0.5); border-radius: 50%; flex-shrink: 0; }
  .exec-eri-card h4 { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 0; color: #F4F6F8; margin: 0 0 10px; transition: color 0.3s ease; }
  .exec-eri-card:hover h4 { color: #47B5FF; }
  .exec-eri-card p { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.75; color: #5a7a96; margin: 0; }

  /* Responsive */
  @media (max-width: 1080px) {
    .exec-eri-dims { grid-template-columns: 1fr 1fr; }
    .exec-eri-hex { max-width: 400px; }
    .exec-eri-cards { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .exec-eri { padding: 80px 20px 100px; }
    .exec-eri-dims { grid-template-columns: 1fr 1fr; gap: 10px; }
    .exec-eri-dim { padding: 14px 16px; }
    .exec-eri-dim-desc { font-size: 11px; }
    .exec-eri-dim-name { font-size: 12px; }
    .exec-eri-dim-source { font-size: 8px; }
    .exec-eri-hex { max-width: 300px; }
    .exec-eri-node { width: 90px; }
    .exec-eri-node-ring { width: 38px; height: 38px; }
    .exec-eri-node-num { font-size: 11px; }
    .exec-eri-node-label { font-size: 9px; }
    .exec-eri-node-desc { display: none; }
    .exec-eri-hub-ring { width: 60px; height: 60px; }
    .exec-eri-hub-text { font-size: 10px; }
    .exec-eri-radar-wrap { max-width: 300px; }
  }
</style>

<section class="exec-eri">
  <div class="exec-eri-glow"></div>
  <div class="exec-eri-inner">

    <div class="exec-eri-header" id="exec-eri-header">
      <div class="exec-eri-eyebrow">Our Differentiator</div>
      <h2>The Execution<br><em>Readiness</em> Index</h2>
      <p class="exec-eri-subtitle">We score every project across six dimensions that define whether your digital investment reaches the field &#x2014; or dies at the server. The industry average is brutal.</p>
    </div>

    <!-- RADAR -->
    <div class="exec-eri-radar-wrap">
      <svg class="exec-eri-radar-svg" id="exec-eri-radar" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>

    <div class="exec-eri-composite" id="exec-eri-composite">
      <div class="exec-eri-composite-score" id="exec-eri-score-num">0</div>
      <div class="exec-eri-composite-meta">
        <span class="exec-eri-composite-verdict">Critical &#x2014; Execution Gap</span>
        <span class="exec-eri-composite-label">Industry Average &#x00b7; Execution Readiness Index</span>
      </div>
    </div>

    <!-- TOP 3 DIMENSIONS -->
    <div class="exec-eri-dims" id="exec-eri-dims-top">
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 01</span><span class="exec-eri-dim-score">15/100</span></div>
        <div class="exec-eri-dim-name">Schedule&#x2013;Model Integration</div>
        <p class="exec-eri-dim-desc">4D BIM adoption remains low &#x2014; used mainly on small projects due to complexity. Most schedules and models live in separate systems with no link.</p>
        <a class="exec-eri-dim-source" href="https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2022.998309/full" target="_blank" rel="noopener">Frontiers in Built Environment &#x00b7; Boton et al.</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="15"></div></div>
      </div>
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 02</span><span class="exec-eri-dim-score">18/100</span></div>
        <div class="exec-eri-dim-name">Work Package Maturity</div>
        <p class="exec-eri-dim-desc">Most trades still receive full model dumps or printed drawings. Scoped digital packages with shop drawings and quality forms remain rare.</p>
        <a class="exec-eri-dim-source" href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">McKinsey Global Institute &#x00b7; Construction Productivity</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="18"></div></div>
      </div>
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 03</span><span class="exec-eri-dim-score">12/100</span></div>
        <div class="exec-eri-dim-name">Field Data Connectivity</div>
        <p class="exec-eri-dim-desc">0.4% annual productivity growth since 2000. Field data doesn&#x2019;t flow back. As-built conditions and quantity changes stay in spreadsheets.</p>
        <a class="exec-eri-dim-source" href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">McKinsey Global Institute &#x00b7; 0.4% Annual Growth</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="12"></div></div>
      </div>
    </div>

    
    <div class="exec-eri-dims" id="exec-eri-dims-bot">
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 04</span><span class="exec-eri-dim-score">20/100</span></div>
        <div class="exec-eri-dim-name">Progress Verification</div>
        <p class="exec-eri-dim-desc">Rework consumes 11&#x2013;20% of project cost across 15 countries. No actual vs. planned at element level. Earned value from spreadsheets.</p>
        <a class="exec-eri-dim-source" href="https://info.planradar.com/hubfs/PDFs/Ebook_EN_CostofRework.pdf" target="_blank" rel="noopener">PlanRadar &#x00b7; Cost of Rework Study (15 Countries)</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="20"></div></div>
      </div>
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 05</span><span class="exec-eri-dim-score">14/100</span></div>
        <div class="exec-eri-dim-name">Inspection &amp; QA/QC</div>
        <p class="exec-eri-dim-desc">67% of firms still rely on manual QA/QC. Inspections on clipboards, defects on WhatsApp. Model-linked inspections remain the exception.</p>
        <a class="exec-eri-dim-source" href="https://www.planradar.com/sa-en/digital-qaqc-in-construction-gcc/" target="_blank" rel="noopener">PlanRadar &#x00b7; QA/QC Impact Report 2025</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="14"></div></div>
      </div>
      <div class="exec-eri-dim" data-exec-dim>
        <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 06</span><span class="exec-eri-dim-score">8/100</span></div>
        <div class="exec-eri-dim-name">Handover Readiness</div>
        <p class="exec-eri-dim-desc">Digital twin-ready handover requires progressive as-built data and verified records. Most projects reconstruct from scattered files &#x2014; if at all.</p>
        <a class="exec-eri-dim-source" href="https://hexagon.com/resources/insights/digital-twin/statistics" target="_blank" rel="noopener">Hexagon &#x00b7; Digital Twin Statistics 2025</a>
        <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="8"></div></div>
      </div>
    </div>

    


    <!-- HOW WE SOLVE IT — LOOP -->
    <div class="exec-eri-loop-header" id="exec-eri-loop-header">
      <div class="exec-eri-loop-eyebrow">How We Close The Gap</div>
      <h3>The Execution <em>Loop</em></h3>
      <p class="exec-eri-loop-sub">Six stages. One continuous cycle. Every piece of field data feeds back into the model, updates the schedule, and goes back to the field.</p>
    </div>

    <!-- HEX VISUAL -->
    <div class="exec-eri-hex" id="exec-eri-hex">
      <canvas class="exec-eri-hex-canvas" id="exec-eri-canvas"></canvas>
      <svg class="exec-eri-hex-svg" id="exec-eri-svg" viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
      <div class="exec-eri-node" data-node="1"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">01</span></div><div class="exec-eri-node-label">Model</div><div class="exec-eri-node-desc">Coordinated PIM</div></div>
      <div class="exec-eri-node" data-node="2"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">02</span></div><div class="exec-eri-node-label">Package</div><div class="exec-eri-node-desc">Digital work lots</div></div>
      <div class="exec-eri-node" data-node="3"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">03</span></div><div class="exec-eri-node-label">Deploy</div><div class="exec-eri-node-desc">Field BIM &#x00b7; Tablets</div></div>
      <div class="exec-eri-node" data-node="4"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">04</span></div><div class="exec-eri-node-label">Capture</div><div class="exec-eri-node-desc">Inspections &#x00b7; Scans</div></div>
      <div class="exec-eri-node" data-node="5"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">05</span></div><div class="exec-eri-node-label">Verify</div><div class="exec-eri-node-desc">Actual vs. Planned</div></div>
      <div class="exec-eri-node" data-node="6"><div class="exec-eri-node-ring"><span class="exec-eri-node-num">06</span></div><div class="exec-eri-node-label">Update</div><div class="exec-eri-node-desc">Model &#x00b7; Schedule &#x00b7; QTO</div></div>
      <div class="exec-eri-hub"><div class="exec-eri-hub-ring"><span class="exec-eri-hub-text">ERI</span></div><div class="exec-eri-hub-label">Execution Readiness</div></div>
    </div>

    <!-- STOPLINE + CARDS -->
    <div class="exec-eri-stopline"><span class="exec-eri-stopline-label">From 15 To 80+ &#x2014; Verified, Defensible, Handover-Ready</span></div>
    <div class="exec-eri-cards">
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">What We Diagnose</div><h4>Execution Connectivity</h4><p>The ERI scores your project across six dimensions. A single auditable metric that tells the programme whether its digital investment is reaching the field or stopping at the server.</p></div>
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">How We Deploy</div><h4>Diagnose, Loop, Verify</h4><p>We run the ERI before engagement. It shows exactly where the gaps are. Then we deploy the Execution Loop &#x2014; connecting model to field and field back to model. Every cycle raises the score.</p></div>
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">What You Get</div><h4>Verified Handover</h4><p>Projects that complete with a target ERI above 80 deliver verified as-built data, traceable inspection records, and a digital twin-ready dataset &#x2014; not a box of paper.</p></div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  /* Header entrance */
  var h=document.getElementById('exec-eri-header');
  if(h){h.style.opacity='0';h.style.transform='translateY(24px)';var ho=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){h.style.transition='opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)';h.style.opacity='1';h.style.transform='translateY(0)';ho.disconnect();}});},{threshold:0.15});ho.observe(h);}

  /* Radar */
  var svg=document.getElementById('exec-eri-radar');
  if(svg){
    var cx=240,cy=240,R=180,d=6,sc=[15,18,12,20,14,8],lb=['SCHEDULE-MODEL','WORK PACKAGES','FIELD DATA','PROGRESS','QA/QC','HANDOVER'];
    function pc(a,r){var rd=(a-90)*Math.PI/180;return{x:cx+r*Math.cos(rd),y:cy+r*Math.sin(rd)};}
    function hp(r){var p=[];for(var i=0;i<d;i++){var pt=pc(i*60,r);p.push(pt.x+','+pt.y);}return p.join(' ');}
    while(svg.firstChild)svg.removeChild(svg.firstChild);
    [.25,.5,.75,1].forEach(function(p){var rg=document.createElementNS('http://www.w3.org/2000/svg','polygon');rg.setAttribute('points',hp(R*p));rg.setAttribute('stroke',p===1?'rgba(71,181,255,0.1)':'rgba(71,181,255,0.05)');rg.setAttribute('stroke-width','1');rg.setAttribute('fill','none');svg.appendChild(rg);});
    for(var i=0;i<d;i++){var p=pc(i*60,R);var l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',cx);l.setAttribute('y1',cy);l.setAttribute('x2',p.x);l.setAttribute('y2',p.y);l.setAttribute('stroke','rgba(71,181,255,0.06)');l.setAttribute('stroke-width','1');svg.appendChild(l);}
    for(var i=0;i<d;i++){var lp=pc(i*60,R+32);var t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',lp.x);t.setAttribute('y',lp.y);t.setAttribute('text-anchor','middle');t.setAttribute('dominant-baseline','middle');t.setAttribute('fill','rgba(122,155,181,0.5)');t.setAttribute('font-family','DM Mono, monospace');t.setAttribute('font-size','10');t.setAttribute('letter-spacing','0.08em');t.textContent=lb[i];svg.appendChild(t);}
    var tp=document.createElementNS('http://www.w3.org/2000/svg','polygon');tp.setAttribute('points',hp(R*.8));tp.setAttribute('fill','none');tp.setAttribute('stroke','rgba(71,181,255,0.2)');tp.setAttribute('stroke-width','1');tp.setAttribute('stroke-dasharray','4,6');svg.appendChild(tp);
    var tl=document.createElementNS('http://www.w3.org/2000/svg','text');var tlp=pc(30,R*.83);tl.setAttribute('x',tlp.x+8);tl.setAttribute('y',tlp.y);tl.setAttribute('fill','rgba(71,181,255,0.45)');tl.setAttribute('font-family','DM Mono, monospace');tl.setAttribute('font-size','11');tl.setAttribute('letter-spacing','0.1em');tl.textContent='TARGET: 80';svg.appendChild(tl);
    var dp=document.createElementNS('http://www.w3.org/2000/svg','polygon');dp.setAttribute('points',hp(0));dp.setAttribute('fill','rgba(255,140,60,0.12)');dp.setAttribute('stroke','rgba(255,140,60,0.7)');dp.setAttribute('stroke-width','2');dp.style.transition='all 1.5s cubic-bezier(0.22,1,0.36,1)';svg.appendChild(dp);
    var dots=[];for(var i=0;i<d;i++){var dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('cx',cx);dot.setAttribute('cy',cy);dot.setAttribute('r','4');dot.setAttribute('fill','rgba(255,140,60,1)');dot.setAttribute('stroke','rgba(255,140,60,0.4)');dot.setAttribute('stroke-width','8');dot.style.transition='all 1.5s cubic-bezier(0.22,1,0.36,1)';svg.appendChild(dot);dots.push(dot);}
    
    
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var pts=[];for(var i=0;i<d;i++){var r=R*(sc[i]/100);var p=pc(i*60,r);pts.push(p.x+','+p.y);dots[i].setAttribute('cx',p.x);dots[i].setAttribute('cy',p.y);}dp.setAttribute('points',pts.join(' '));ro.disconnect();}});},{threshold:0.2});ro.observe(svg);
  }

  /* Dim bars + entrance */
  document.querySelectorAll('[data-exec-dim]').forEach(function(c,i){c.style.opacity='0';c.style.transform='translateY(20px)';var f=c.querySelector('.exec-eri-dim-bar-fill');var w=f?f.getAttribute('data-width'):0;var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){c.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';c.style.opacity='1';c.style.transform='translateY(0)';if(f)f.style.width=w+'%';},i*80);o.disconnect();}});},{threshold:0.08});o.observe(c);});

  /* Composite counter */
  var sn=document.getElementById('exec-eri-score-num');
  if(sn){var tgt=15,ct2=false;var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!ct2){ct2=true;var cur=0;var iv=setInterval(function(){cur++;sn.textContent=cur;if(cur>=tgt)clearInterval(iv);},60);co.disconnect();}});},{threshold:0.3});co.observe(sn);}

  /* Hex nodes entrance */
  var nodes=document.querySelectorAll('.exec-eri-node');
  nodes.forEach(function(n,i){n.style.opacity='0';n.style.transform='translate(-50%,-50%) scale(0.8)';var no=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){n.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';n.style.opacity='1';n.style.transform='translate(-50%,-50%) scale(1)';},i*120);no.disconnect();}});},{threshold:0.05});no.observe(n);});

  /* Hub entrance */
  var hub=document.querySelector('.exec-eri-hub');
  if(hub){hub.style.opacity='0';hub.style.transform='translate(-50%,-50%) scale(0.7)';var hubo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){hub.style.transition='opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';hub.style.opacity='1';hub.style.transform='translate(-50%,-50%) scale(1)';},800);hubo.disconnect();}});},{threshold:0.05});hubo.observe(hub);}

  /* SVG hex edges */
  var hsvg=document.getElementById('exec-eri-svg');
  var hex=document.getElementById('exec-eri-hex');
  if(hsvg&&hex){
    var pts=[{x:50,y:8},{x:87,y:28},{x:87,y:68},{x:50,y:88},{x:13,y:68},{x:13,y:28}];
    var sp=pts.map(function(p){return{x:p.x*5.4,y:p.y*5.4};});
    for(var i=0;i<6;i++){var nx=(i+1)%6;var ln=document.createElementNS('http://www.w3.org/2000/svg','line');ln.setAttribute('x1',sp[i].x);ln.setAttribute('y1',sp[i].y);ln.setAttribute('x2',sp[nx].x);ln.setAttribute('y2',sp[nx].y);ln.setAttribute('stroke','rgba(71,181,255,0.12)');ln.setAttribute('stroke-width','1');ln.classList.add('exec-eri-edge');var len=Math.sqrt(Math.pow(sp[nx].x-sp[i].x,2)+Math.pow(sp[nx].y-sp[i].y,2));ln.setAttribute('stroke-dasharray',len);ln.setAttribute('stroke-dashoffset',len);ln.style.transition='stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1) '+(0.6+i*0.12)+'s';hsvg.appendChild(ln);}
    var hcx=50*5.4,hcy=48*5.4;
    for(var i=0;i<6;i++){var sk=document.createElementNS('http://www.w3.org/2000/svg','line');sk.setAttribute('x1',sp[i].x);sk.setAttribute('y1',sp[i].y);sk.setAttribute('x2',hcx);sk.setAttribute('y2',hcy);sk.setAttribute('stroke','rgba(71,181,255,0.05)');sk.setAttribute('stroke-width','1');sk.setAttribute('stroke-dasharray','2,8');hsvg.appendChild(sk);}
    var eo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){hsvg.querySelectorAll('.exec-eri-edge').forEach(function(ed){ed.setAttribute('stroke-dashoffset','0');});eo.disconnect();}});},{threshold:0.15});eo.observe(hex);
  }

  /* Canvas particles */
  var canvas=document.getElementById('exec-eri-canvas');
  if(canvas&&hex){
    var ctx2=canvas.getContext('2d');var parts=[];var run=false;
    function rsz(){var r=hex.getBoundingClientRect();canvas.width=r.width*(window.devicePixelRatio||1);canvas.height=r.height*(window.devicePixelRatio||1);ctx2.scale(window.devicePixelRatio||1,window.devicePixelRatio||1);}
    rsz();window.addEventListener('resize',rsz);
    function gnp(){var w=hex.offsetWidth,h2=hex.offsetHeight;return[{x:.5*w,y:.08*h2},{x:.87*w,y:.28*h2},{x:.87*w,y:.68*h2},{x:.5*w,y:.88*h2},{x:.13*w,y:.68*h2},{x:.13*w,y:.28*h2}];}
    function sp2(){var np=gnp();var si=Math.floor(Math.random()*6);var ei=(si+1)%6;return{sx:np[si].x,sy:np[si].y,ex:np[ei].x,ey:np[ei].y,pr:0,spd:0.003+Math.random()*0.005,sz:1.5+Math.random()*1.5,al:0};}
    function anim(){if(!run)return;var w=hex.offsetWidth,h2=hex.offsetHeight;ctx2.clearRect(0,0,w,h2);if(Math.random()<0.12&&parts.length<30)parts.push(sp2());for(var i=parts.length-1;i>=0;i--){var p=parts[i];p.pr+=p.spd;if(p.pr<0.15)p.al=p.pr/0.15;else if(p.pr>0.85)p.al=(1-p.pr)/0.15;else p.al=1;if(p.pr>=1){parts.splice(i,1);continue;}var x=p.sx+(p.ex-p.sx)*p.pr,y=p.sy+(p.ey-p.sy)*p.pr;ctx2.beginPath();ctx2.arc(x,y,p.sz,0,Math.PI*2);ctx2.fillStyle='rgba(71,181,255,'+(0.5*p.al)+')';ctx2.fill();ctx2.beginPath();ctx2.arc(x,y,p.sz*3,0,Math.PI*2);ctx2.fillStyle='rgba(71,181,255,'+(0.08*p.al)+')';ctx2.fill();}requestAnimationFrame(anim);}
    var cvo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!run){run=true;anim();}else if(!e.isIntersecting){run=false;}});},{threshold:0.05});cvo.observe(hex);
  }

  /* Card entrance */
  document.querySelectorAll('[data-exec-ec]').forEach(function(c,i){c.style.opacity='0';c.style.transform='translateY(28px)';var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){c.style.transition='opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';c.style.opacity='1';c.style.transform='translateY(0)';},i*120);o.disconnect();}});},{threshold:0.08});o.observe(c);});
})()`;

export default function ExecutionERI() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.innerHTML = html;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = script;
    el.appendChild(scriptEl);
    return () => { el.innerHTML = ''; };
  }, []);
  return <div ref={ref} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: '' }} />;
}
