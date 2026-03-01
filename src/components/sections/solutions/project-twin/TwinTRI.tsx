'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  /* ════════ WRAPPER ════════ */
  .twin-diff { position: relative; background: #1C1F23; padding: 120px 32px 140px; overflow: hidden; }
  .twin-diff::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(71,181,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(71,181,255,0.02) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
  .twin-diff-glow { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120%; height: 40%; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.06) 0%, transparent 70%); pointer-events: none; }
  .twin-diff-inner { position: relative; max-width: 1200px; margin: 0 auto; z-index: 1; }
  .twin-diff h2 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(28px, 3.2vw, 44px); line-height: 1.08; letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 18px; }
  .twin-diff h2 em { font-style: italic; color: #47B5FF; }

  /* ════════ WATERFALL ════════ */
  .twin-wf-header { text-align: center; margin-bottom: 56px; }
  .twin-wf-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px; }
  .twin-wf-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .twin-wf-sub { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 620px; margin: 0 auto; }
  .twin-wf-visual { position: relative; width: 100%; margin-bottom: 56px; }
  .twin-wf-canvas-wrap { position: relative; width: 100%; height: 280px; }
  .twin-wf-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .twin-wf-phases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 2px solid rgba(255,140,60,0.15); }
  .twin-wf-phase { position: relative; padding: 28px 20px 24px; border-right: 1px solid rgba(71,181,255,0.06); transition: background 0.3s ease; }
  .twin-wf-phase:last-child { border-right: none; }
  .twin-wf-phase:hover { background: rgba(255,140,60,0.02); }
  .twin-wf-phase-bar { position: absolute; top: -2px; left: 0; width: 100%; height: 2px; }
  .twin-wf-phase:nth-child(1) .twin-wf-phase-bar { background: rgba(71,181,255,0.5); }
  .twin-wf-phase:nth-child(2) .twin-wf-phase-bar { background: rgba(255,200,60,0.5); }
  .twin-wf-phase:nth-child(3) .twin-wf-phase-bar { background: rgba(255,140,60,0.5); }
  .twin-wf-phase:nth-child(4) .twin-wf-phase-bar { background: rgba(255,80,60,0.5); }
  .twin-wf-phase-pct { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: 36px; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .twin-wf-phase:nth-child(1) .twin-wf-phase-pct { color: rgba(71,181,255,0.7); }
  .twin-wf-phase:nth-child(2) .twin-wf-phase-pct { color: rgba(255,200,60,0.7); }
  .twin-wf-phase:nth-child(3) .twin-wf-phase-pct { color: rgba(255,140,60,0.7); }
  .twin-wf-phase:nth-child(4) .twin-wf-phase-pct { color: rgba(255,80,60,0.7); }
  .twin-wf-phase-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(244,246,248,0.5); margin-bottom: 10px; }
  .twin-wf-phase-name { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 15px; text-transform: uppercase; color: #F4F6F8; margin: 0 0 8px; }
  .twin-wf-phase-desc { font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 400; line-height: 1.65; color: #5a7a96; margin: 0 0 8px; }
  .twin-wf-phase-source { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.06em; color: rgba(71,181,255,0.3); text-decoration: none; }
  .twin-wf-phase-source:hover { color: rgba(71,181,255,0.6); }
  .twin-wf-loss { text-align: center; padding: 32px 0 0; border-top: 1px solid rgba(71,181,255,0.06); margin-top: 8px; }
  .twin-wf-loss-stat { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(20px, 2.2vw, 28px); text-transform: uppercase; color: rgba(255,140,60,0.7); margin-bottom: 6px; }
  .twin-wf-loss-stat em { font-style: italic; color: rgba(255,80,60,0.8); }
  .twin-wf-loss-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(122,155,181,0.35); }

  /* ════════ DIVIDER ════════ */
  .twin-diff-divider { display: flex; align-items: center; gap: 16px; margin: 72px 0; }
  .twin-diff-divider::before, .twin-diff-divider::after { content: ''; flex: 1; height: 1px; background: repeating-linear-gradient(90deg, rgba(71,181,255,0.25) 0px, rgba(71,181,255,0.25) 6px, transparent 6px, transparent 12px); }
  .twin-diff-divider-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.55); white-space: nowrap; }

  /* ════════ MATURITY CONTINUUM ════════ */
  .twin-mc-wrap {
    position: relative;
  }
  .twin-mc-bg {
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0;
    transition: opacity 1.5s ease;
  }
  .twin-mc-bg.twin-mc-bg-vis { opacity: 1; }
  .twin-mc-bg canvas {
    width: 100%; height: 100%;
    display: block;
  }
  .twin-mc-header { text-align: center; margin-bottom: 56px; position: relative; z-index: 1; }
  .twin-mc-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px; }
  .twin-mc-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .twin-mc-sub { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 660px; margin: 0 auto; }

  /* Continuum strip */
  .twin-mc-strip { position: relative; margin-bottom: 16px; z-index: 1; }

  /* Zone labels */
  .twin-mc-zones { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 0; }
  .twin-mc-zone { padding: 12px 20px; border-bottom: 2px solid rgba(71,181,255,0.1); }
  .twin-mc-zone:first-child { border-right: 1px solid rgba(71,181,255,0.08); }
  .twin-mc-zone-label { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
  .twin-mc-zone:first-child .twin-mc-zone-label { color: rgba(244,246,248,0.35); }
  .twin-mc-zone:last-child .twin-mc-zone-label { color: rgba(71,181,255,0.5); }

  /* 6 stage cards */
  .twin-mc-stages { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; }
  .twin-mc-stage {
    position: relative; padding: 32px 16px 28px;
    border-right: 1px solid rgba(71,181,255,0.06);
    overflow: hidden; cursor: default;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease;
    /* Start dim for scroll illuminate */
    opacity: 0.3; filter: saturate(0.2);
  }
  .twin-mc-stage:last-child { border-right: none; }

  /* Scroll illuminate state */
  .twin-mc-stage.twin-mc-lit {
    opacity: 1; filter: saturate(1);
    transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease;
  }

  /* Hover depth */
  .twin-mc-stage:hover {
    background: rgba(71,181,255,0.03);
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 24px rgba(71,181,255,0.06);
    z-index: 3;
  }

  /* Progressive gradient bar at top */
  .twin-mc-stage-bar {
    position: absolute; top: 0; left: 0; width: 0; height: 3px;
    transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .twin-mc-stage.twin-mc-lit .twin-mc-stage-bar { width: 100%; }
  .twin-mc-stage:nth-child(1) .twin-mc-stage-bar { background: rgba(244,246,248,0.15); }
  .twin-mc-stage:nth-child(2) .twin-mc-stage-bar { background: rgba(244,246,248,0.2); }
  .twin-mc-stage:nth-child(3) .twin-mc-stage-bar { background: rgba(244,246,248,0.25); }
  .twin-mc-stage:nth-child(4) .twin-mc-stage-bar { background: rgba(71,181,255,0.3); }
  .twin-mc-stage:nth-child(5) .twin-mc-stage-bar { background: rgba(71,181,255,0.5); }
  .twin-mc-stage:nth-child(6) .twin-mc-stage-bar { background: #47B5FF; }

  /* Stage number */
  .twin-mc-stage-num {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(36px, 4vw, 52px); letter-spacing: -0.04em; line-height: 1;
    color: rgba(71,181,255,0.04); margin-bottom: 12px;
    transition: color 0.5s ease;
  }
  .twin-mc-stage.twin-mc-lit .twin-mc-stage-num { color: rgba(71,181,255,0.08); }
  .twin-mc-stage:hover .twin-mc-stage-num { color: rgba(71,181,255,0.15); }

  /* Icon area */
  .twin-mc-stage-icon {
    width: 40px; height: 40px; margin-bottom: 16px;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
  }
  .twin-mc-stage-icon svg { width: 100%; height: 100%; }
  .twin-mc-stage:hover .twin-mc-stage-icon {
    transform: scale(1.15);
    filter: drop-shadow(0 0 8px rgba(71,181,255,0.3));
  }

  /* Icon glow background on illuminate */
  .twin-mc-stage.twin-mc-lit .twin-mc-stage-icon {
    filter: drop-shadow(0 0 4px rgba(71,181,255,0.15));
  }

  .twin-mc-stage-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 14px; text-transform: uppercase; color: #F4F6F8;
    margin: 0 0 6px; letter-spacing: 0.01em;
    transition: color 0.3s ease;
  }
  .twin-mc-stage:hover .twin-mc-stage-name { color: #47B5FF; }

  .twin-mc-stage-question {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
    font-style: italic; color: rgba(71,181,255,0.5); margin: 0 0 10px;
    transition: color 0.3s ease;
  }
  .twin-mc-stage:hover .twin-mc-stage-question { color: rgba(71,181,255,0.7); }

  .twin-mc-stage-desc {
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400;
    line-height: 1.65; color: #5a7a96; margin: 0;
  }

  /* Pulse flash on illuminate */
  .twin-mc-stage::before {
    content: '';
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 0; height: 0;
    background: radial-gradient(circle, rgba(71,181,255,0.12) 0%, transparent 70%);
    border-radius: 50%;
    transition: width 0.8s ease, height 0.8s ease, opacity 0.8s ease;
    opacity: 0; pointer-events: none; z-index: 0;
  }
  .twin-mc-stage.twin-mc-lit::before {
    width: 200px; height: 200px; opacity: 1;
  }

  /* Arrow connectors between stages */
  .twin-mc-stage::after {
    content: '\u25B6'; position: absolute; right: -7px; top: 50%;
    transform: translateY(-50%); font-size: 10px;
    color: rgba(71,181,255,0.08); z-index: 2;
    transition: color 0.4s ease;
  }
  .twin-mc-stage.twin-mc-lit::after { color: rgba(71,181,255,0.25); }
  .twin-mc-stage:last-child::after { display: none; }

  /* Foundation bar */
  .twin-mc-foundation {
    display: flex; align-items: center; justify-content: center; gap: 24px;
    padding: 20px 24px;
    background: rgba(71,181,255,0.03);
    border: 1px solid rgba(71,181,255,0.1);
    border-top: 2px solid rgba(71,181,255,0.2);
    margin-bottom: 64px;
  }
  .twin-mc-foundation-label {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.5);
  }
  .twin-mc-foundation-tri {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 18px; text-transform: uppercase; color: #47B5FF; letter-spacing: -0.01em;
  }
  .twin-mc-foundation-desc {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400;
    color: #7a9bb5;
  }

  /* ════════ HEXAGON RESULT ════════ */
  .twin-mc-hex-wrap {
    display: flex; flex-direction: column; align-items: center;
    margin: 0 auto 64px; position: relative; z-index: 1;
  }
  .twin-mc-hex-label-top {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(71,181,255,0.4); margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .twin-mc-hex-label-top::before, .twin-mc-hex-label-top::after {
    content: ''; width: 32px; height: 1px;
    background: rgba(71,181,255,0.15);
  }
  .twin-mc-hex-container {
    position: relative;
    width: 320px; height: 320px;
    margin-bottom: 20px;
  }
  .twin-mc-hex-svg {
    position: absolute; inset: 0; width: 100%; height: 100%;
  }
  .twin-mc-hex-centre {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center; z-index: 2;
  }
  .twin-mc-hex-title {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: 22px; text-transform: uppercase; letter-spacing: -0.02em;
    color: #F4F6F8; margin-bottom: 4px;
  }
  .twin-mc-hex-title em { color: #47B5FF; font-style: italic; }
  .twin-mc-hex-score {
    font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(71,181,255,0.5);
  }
  /* Dimension labels around hex */
  .twin-mc-hex-dim {
    position: absolute;
    font-family: 'Inter Tight', sans-serif; font-size: 12px; font-weight: 800;
    letter-spacing: 0.04em; text-transform: uppercase;
    color: rgba(244,246,248,0.7);
    white-space: nowrap;
    transition: color 0.4s ease;
  }
  .twin-mc-hex-wrap:hover .twin-mc-hex-dim { color: #47B5FF; }
  .twin-mc-hex-dim[data-pos="1"] { top: -14px; left: 50%; transform: translateX(-50%); }
  .twin-mc-hex-dim[data-pos="2"] { top: 22%; right: -72px; }
  .twin-mc-hex-dim[data-pos="3"] { bottom: 22%; right: -68px; }
  .twin-mc-hex-dim[data-pos="4"] { bottom: -14px; left: 50%; transform: translateX(-50%); }
  .twin-mc-hex-dim[data-pos="5"] { bottom: 22%; left: -76px; }
  .twin-mc-hex-dim[data-pos="6"] { top: 22%; left: -60px; }

  .twin-mc-hex-sub {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400;
    line-height: 1.7; color: #7a9bb5; text-align: center;
    max-width: 480px;
  }
  .twin-mc-hex-sub strong { font-weight: 600; color: #F4F6F8; }

  @media (max-width: 640px) {
    .twin-mc-hex-container { width: 240px; height: 240px; }
    .twin-mc-hex-dim { font-size: 10px; }
    .twin-mc-hex-dim[data-pos="2"] { right: -58px; }
    .twin-mc-hex-dim[data-pos="3"] { right: -52px; }
    .twin-mc-hex-dim[data-pos="5"] { left: -62px; }
    .twin-mc-hex-dim[data-pos="6"] { left: -48px; }
    .twin-mc-hex-title { font-size: 18px; }
  }

  /* ════════ EXPLAINER ════════ */
  .twin-mc-explainer { max-width: 840px; margin: 0 auto 56px; position: relative; z-index: 1; }
  .twin-mc-explainer-title { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 18px; text-transform: uppercase; color: #F4F6F8; margin: 0 0 16px; }
  .twin-mc-explainer p { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 300; line-height: 1.85; color: #7a9bb5; margin: 0 0 14px; }
  .twin-mc-explainer strong { font-weight: 600; color: #F4F6F8; }

  /* ════════ KPIs ════════ */
  .twin-mc-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 56px; position: relative; z-index: 1; }
  .twin-mc-kpi { position: relative; padding: 28px 24px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.08); transition: all 0.35s ease; overflow: hidden; }
  .twin-mc-kpi::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: rgba(71,181,255,0.1); transition: background 0.4s ease; }
  .twin-mc-kpi:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .twin-mc-kpi:hover::before { background: #47B5FF; }
  .twin-mc-kpi-val { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.03em; color: #47B5FF; line-height: 1; margin-bottom: 8px; }
  .twin-mc-kpi-label { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; color: #F4F6F8; margin: 0 0 6px; }
  .twin-mc-kpi-desc { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.6; color: #5a7a96; margin: 0 0 8px; }
  .twin-mc-kpi-source { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.06em; color: rgba(71,181,255,0.3); text-decoration: none; }
  .twin-mc-kpi-source:hover { color: rgba(71,181,255,0.6); }

  /* ════════ BOTTOM CARDS ════════ */
  .twin-diff-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .twin-diff-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.1); padding: 32px 28px 28px; transition: all 0.35s cubic-bezier(0.22,1,0.36,1); overflow: hidden; }
  .twin-diff-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15)); transition: width 0.45s cubic-bezier(0.22,1,0.36,1); }
  .twin-diff-card:hover::before { width: 100%; }
  .twin-diff-card:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .twin-diff-card-icon { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #47B5FF; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .twin-diff-card-icon::before { content: ''; width: 6px; height: 6px; background: rgba(71,181,255,0.3); border: 1px solid rgba(71,181,255,0.5); border-radius: 50%; flex-shrink: 0; }
  .twin-diff-card h4 { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 16px; text-transform: uppercase; color: #F4F6F8; margin: 0 0 10px; transition: color 0.3s ease; }
  .twin-diff-card:hover h4 { color: #47B5FF; }
  .twin-diff-card p { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.75; color: #5a7a96; margin: 0; }

  @media (max-width: 1000px) { .twin-mc-stages { grid-template-columns: repeat(3, 1fr); } .twin-mc-stage:nth-child(3)::after { display: none; } }
  @media (max-width: 900px) { .twin-diff { padding: 80px 20px 100px; } .twin-wf-phases { grid-template-columns: 1fr 1fr; } .twin-mc-kpis { grid-template-columns: 1fr 1fr; } .twin-diff-cards { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .twin-wf-phases { grid-template-columns: 1fr; } .twin-wf-canvas-wrap { height: 200px; } .twin-mc-stages { grid-template-columns: 1fr 1fr; } .twin-mc-stage::after { display: none; } .twin-mc-kpis { grid-template-columns: 1fr; } .twin-mc-zones { grid-template-columns: 1fr; } }
</style>

<section class="twin-diff">
  <div class="twin-diff-glow"></div>
  <div class="twin-diff-inner">

    <!-- ════════ WATERFALL ════════ -->
    <div class="twin-wf-header" id="twin-wf-header">
      <div class="twin-wf-eyebrow">The Problem</div>
      <h2>Data Dies At Every <em>Phase Gate</em></h2>
      <p class="twin-wf-sub">Project data degrades at every transition. By handover, the owner receives a fraction of what was created. The rest is scattered, corrupted, or lost entirely.</p>
    </div>
    <div class="twin-wf-visual" id="twin-wf-visual">
      <div class="twin-wf-canvas-wrap"><canvas class="twin-wf-canvas" id="twin-wf-canvas"></canvas></div>
      <div class="twin-wf-phases" id="twin-wf-phases">
        <div class="twin-wf-phase" data-twin-wfp><div class="twin-wf-phase-bar"></div><div class="twin-wf-phase-pct" data-pct="100">0%</div><div class="twin-wf-phase-label">Phase 01</div><div class="twin-wf-phase-name">Design</div><p class="twin-wf-phase-desc">Full project data exists \u2014 specifications, model geometry, schedules, cost data. The information estate is complete.</p><a class="twin-wf-phase-source" href="https://nvlpubs.nist.gov/nistpubs/gcr/2004/nist.gcr.04-867.pdf" target="_blank" rel="noopener">NIST GCR 04-867</a></div>
        <div class="twin-wf-phase" data-twin-wfp><div class="twin-wf-phase-bar"></div><div class="twin-wf-phase-pct" data-pct="72">0%</div><div class="twin-wf-phase-label">Phase 02</div><div class="twin-wf-phase-name">Construction</div><p class="twin-wf-phase-desc">Field changes go unrecorded. Substitutions aren\u2019t captured. The model diverges from reality. ~28% of data integrity lost.</p><a class="twin-wf-phase-source" href="https://eracore.com/bim-data-loss/" target="_blank" rel="noopener">Eracore \u00b7 BIM Data Loss</a></div>
        <div class="twin-wf-phase" data-twin-wfp><div class="twin-wf-phase-bar"></div><div class="twin-wf-phase-pct" data-pct="45">0%</div><div class="twin-wf-phase-label">Phase 03</div><div class="twin-wf-phase-name">Commissioning</div><p class="twin-wf-phase-desc">Test records scatter across email. Certificates sit in personal drives. O&amp;M manuals arrive as unlinked PDFs.</p><a class="twin-wf-phase-source" href="https://www.mimosa.org/2011/07/21/problems-with-information-handover/" target="_blank" rel="noopener">FIATECH / MIMOSA</a></div>
        <div class="twin-wf-phase" data-twin-wfp><div class="twin-wf-phase-bar"></div><div class="twin-wf-phase-pct" data-pct="33">0%</div><div class="twin-wf-phase-label">Phase 04</div><div class="twin-wf-phase-name">Handover</div><p class="twin-wf-phase-desc">One-third of original project data survives. Owners spend $10.6B annually recovering what should have been delivered.</p><a class="twin-wf-phase-source" href="https://nvlpubs.nist.gov/nistpubs/gcr/2004/nist.gcr.04-867.pdf" target="_blank" rel="noopener">NIST \u00b7 $10.6B Recovery</a></div>
      </div>
      <div class="twin-wf-loss"><div class="twin-wf-loss-stat">67% Of Project Data Lost By <em>Handover Day</em></div><div class="twin-wf-loss-sub">NIST GCR 04-867 \u00b7 Cost Analysis of Inadequate Interoperability</div></div>
    </div>

    <!-- ════════ DIVIDER ════════ -->
    <div class="twin-diff-divider"><span class="twin-diff-divider-label">How We Close The Gap</span></div>

    <!-- ════════ MATURITY CONTINUUM ════════ -->
    <div class="twin-mc-wrap" id="twin-mc-wrap">
      <div class="twin-mc-bg" id="twin-mc-bg"><canvas id="twin-mc-bg-canvas"></canvas></div>

    <div class="twin-mc-header" id="twin-mc-header">
      <div class="twin-mc-eyebrow">Our Differentiator</div>
      <h2>The Digital Twin <em>Maturity Continuum</em></h2>
      <p class="twin-mc-sub">A digital twin is not a 3D model. It is a living, queryable representation of the physical asset that matures through six stages of operational intelligence \u2014 from basic reporting to autonomous decisioning. None of it works without structured data at handover.</p>
    </div>

    <div class="twin-mc-strip">
      <!-- Zone labels -->
      <div class="twin-mc-zones">
        <div class="twin-mc-zone"><span class="twin-mc-zone-label">The Operational Technology (OT) World</span></div>
        <div class="twin-mc-zone"><span class="twin-mc-zone-label">The Integrated IT / OT World</span></div>
      </div>

      <!-- 6 Stages -->
      <div class="twin-mc-stages" id="twin-mc-stages">
        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">1</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="28" height="24" rx="1" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><line x1="12" y1="16" x2="28" y2="16" stroke="rgba(71,181,255,0.25)" stroke-width="1"/><line x1="12" y1="21" x2="28" y2="21" stroke="rgba(71,181,255,0.25)" stroke-width="1"/><line x1="12" y1="26" x2="22" y2="26" stroke="rgba(71,181,255,0.25)" stroke-width="1"/></svg></div>
          <div class="twin-mc-stage-name">Reporting</div>
          <div class="twin-mc-stage-question">What happened to my asset?</div>
          <p class="twin-mc-stage-desc">Operational data from sensors and OT systems presented as a structured representation of asset performance and condition.</p>
        </div>

        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">2</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><path d="M14 22 L18 16 L22 24 L26 18" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="twin-mc-stage-name">Analysing</div>
          <div class="twin-mc-stage-question">Why did it happen?</div>
          <p class="twin-mc-stage-desc">Historical trend analysis and root cause identification. Pattern recognition across asset performance data to understand deterioration and failure modes.</p>
        </div>

        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">3</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 28 L16 20 L22 24 L30 12" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 12 L30 12 L30 16" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="30" x2="30" y2="30" stroke="rgba(71,181,255,0.2)" stroke-width="1"/></svg></div>
          <div class="twin-mc-stage-name">Predicting</div>
          <div class="twin-mc-stage-question">What might happen next?</div>
          <p class="twin-mc-stage-desc">Modelling likely future behaviour based on operational parameters. Predictive maintenance scheduling before failure occurs.</p>
        </div>

        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">4</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="14" width="12" height="12" rx="1" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><rect x="22" y="14" width="12" height="12" rx="1" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><line x1="18" y1="20" x2="22" y2="20" stroke="rgba(71,181,255,0.5)" stroke-width="1.5"/><path d="M20 10 L20 14" stroke="rgba(71,181,255,0.3)" stroke-width="1" stroke-dasharray="2 2"/><path d="M20 26 L20 30" stroke="rgba(71,181,255,0.3)" stroke-width="1" stroke-dasharray="2 2"/></svg></div>
          <div class="twin-mc-stage-name">Integrating</div>
          <div class="twin-mc-stage-question">Bridging the IT/OT divide</div>
          <p class="twin-mc-stage-desc">Combining operational models with enterprise and external data for a strategic, contextual view of asset performance across the portfolio.</p>
        </div>

        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">5</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 28 L20 12 L28 28 Z" stroke="rgba(71,181,255,0.4)" stroke-width="1.5" fill="none"/><circle cx="20" cy="22" r="2" fill="rgba(71,181,255,0.5)"/><line x1="20" y1="16" x2="20" y2="19" stroke="rgba(71,181,255,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div class="twin-mc-stage-name">Prescribing</div>
          <div class="twin-mc-stage-question">Recommending actions</div>
          <p class="twin-mc-stage-desc">AI-driven analytics prescribing interventions and courses of action across the value chain. The twin recommends \u2014 the operator decides.</p>
        </div>

        <div class="twin-mc-stage" data-twin-ms>
          <div class="twin-mc-stage-bar"></div>
          <div class="twin-mc-stage-num">6</div>
          <div class="twin-mc-stage-icon"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" stroke="rgba(71,181,255,0.4)" stroke-width="1.5"/><circle cx="20" cy="20" r="6" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><circle cx="20" cy="20" r="2" fill="#47B5FF"/><path d="M20 8 L20 11" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><path d="M20 29 L20 32" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><path d="M8 20 L11 20" stroke="rgba(71,181,255,0.3)" stroke-width="1"/><path d="M29 20 L32 20" stroke="rgba(71,181,255,0.3)" stroke-width="1"/></svg></div>
          <div class="twin-mc-stage-name">Autonomous</div>
          <div class="twin-mc-stage-question">Taking actions, automatically</div>
          <p class="twin-mc-stage-desc">The twin at the heart of the enterprise \u2014 autonomously making interventions to maintain efficiency, quality, reliability, and safety.</p>
        </div>
      </div>

      <!-- Foundation bar -->
      <div class="twin-mc-foundation">
        <span class="twin-mc-foundation-tri">TRI 80+</span>
        <span class="twin-mc-foundation-label">Required Foundation</span>
        <span class="twin-mc-foundation-desc">\u2014 None of the above is possible without structured, verified, complete data at handover.</span>
      </div>
    </div>

    <!-- Hexagon Result -->
    <div class="twin-mc-hex-wrap" id="twin-mc-hex">
      <div class="twin-mc-hex-label-top">The Result</div>
      <div class="twin-mc-hex-container">
        <svg class="twin-mc-hex-svg" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer hex -->
          <polygon points="160,16 296,88 296,232 160,304 24,232 24,88" fill="none" stroke="rgba(71,181,255,0.12)" stroke-width="1.5"/>
          <!-- Inner hex -->
          <polygon points="160,56 262,108 262,212 160,264 58,212 58,108" fill="rgba(71,181,255,0.02)" stroke="rgba(71,181,255,0.06)" stroke-width="1"/>
          <!-- Innermost hex -->
          <polygon points="160,96 228,128 228,192 160,224 92,192 92,128" fill="rgba(71,181,255,0.01)" stroke="rgba(71,181,255,0.04)" stroke-width="1" stroke-dasharray="4,4"/>
          <!-- Connecting lines from vertices to inner hex -->
          <line x1="160" y1="16" x2="160" y2="56" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <line x1="296" y1="88" x2="262" y2="108" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <line x1="296" y1="232" x2="262" y2="212" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <line x1="160" y1="304" x2="160" y2="264" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <line x1="24" y1="232" x2="58" y2="212" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <line x1="24" y1="88" x2="58" y2="108" stroke="rgba(71,181,255,0.08)" stroke-width="1"/>
          <!-- Vertex dots -->
          <circle cx="160" cy="16" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <circle cx="296" cy="88" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <circle cx="296" cy="232" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <circle cx="160" cy="304" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <circle cx="24" cy="232" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <circle cx="24" cy="88" r="4" fill="rgba(71,181,255,0.15)" stroke="rgba(71,181,255,0.3)" stroke-width="1"/>
          <!-- Pulse ring animation -->
          <circle cx="160" cy="160" r="40" fill="none" stroke="rgba(71,181,255,0.06)" stroke-width="1">
            <animate attributeName="r" values="40;60;40" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <!-- Centre content -->
        <div class="twin-mc-hex-centre">
          <div class="twin-mc-hex-title"><em>Digital</em> Twin</div>
          <div class="twin-mc-hex-score">All Layers Deployed</div>
        </div>
        <!-- 6 Infraforma solution layers at vertices -->
        <div class="twin-mc-hex-dim" data-pos="1">01 \u00b7 Strategy</div>
        <div class="twin-mc-hex-dim" data-pos="2">02 \u00b7 Structure</div>
        <div class="twin-mc-hex-dim" data-pos="3">03 \u00b7 Intelligence</div>
        <div class="twin-mc-hex-dim" data-pos="4">04 \u00b7 Execution</div>
        <div class="twin-mc-hex-dim" data-pos="5">05 \u00b7 Project Twin</div>
        <div class="twin-mc-hex-dim" data-pos="6">06 \u00b7 Insights</div>
      </div>
      <p class="twin-mc-hex-sub">When all six Infraforma layers are deployed across a project \u2014 from strategy through to insights \u2014 the result is an <strong>operational digital twin</strong>. Not a deliverable. A living asset that supports the full maturity continuum.</p>
    </div>

    <!-- Explainer -->
    <div class="twin-mc-explainer" id="twin-mc-explainer">
      <div class="twin-mc-explainer-title">What Is A Digital Twin In Construction?</div>
      <p>A digital twin is not a 3D model handed over on a USB drive. It is a <strong>dynamic digital replica</strong> of a physical asset that mirrors its real-world counterpart using data from sensors, IoT devices, and building management systems. Unlike a BIM model \u2014 which can exist before the building is constructed \u2014 a digital twin comes alive only after the physical asset exists, and it <strong>updates continuously</strong> throughout the operational lifecycle.</p>
      <p>The maturity continuum above shows where the value lies. At level one, the twin simply reports on what happened. By level six, it autonomously manages interventions across the entire asset. But <strong>most projects never get past level one</strong> \u2014 because the data that arrives at handover is incomplete, unstructured, and disconnected from the systems that need it.</p>
      <p>The TRI measures whether your project data is being built for the twin from day one. Six data dimensions \u2014 as-built accuracy, data completeness, COBie compliance, traceability, FM system readiness, and documentation coverage \u2014 scored, verified, and progressively activated through every phase of delivery. That\u2019s the foundation the entire continuum sits on.</p>
    </div>

    <!-- KPIs -->
    <div class="twin-mc-kpis">
      <div class="twin-mc-kpi" data-twin-kpi><div class="twin-mc-kpi-val">$15.8B</div><div class="twin-mc-kpi-label">Annual Interoperability Cost</div><p class="twin-mc-kpi-desc">Cost of inadequate interoperability in U.S. capital facilities. Two-thirds borne by owners during O&amp;M.</p><a class="twin-mc-kpi-source" href="https://nvlpubs.nist.gov/nistpubs/gcr/2004/nist.gcr.04-867.pdf" target="_blank" rel="noopener">NIST GCR 04-867</a></div>
      <div class="twin-mc-kpi" data-twin-kpi><div class="twin-mc-kpi-val">85%</div><div class="twin-mc-kpi-label">Lifecycle Is Operations</div><p class="twin-mc-kpi-desc">Of a building\u2019s total lifecycle cost is spent during operations and maintenance \u2014 where data quality matters most.</p><a class="twin-mc-kpi-source" href="https://www.nist.gov/el/economics/economic-studies-construction-industry" target="_blank" rel="noopener">NIST \u00b7 Construction Economics</a></div>
      <div class="twin-mc-kpi" data-twin-kpi><div class="twin-mc-kpi-val">30%</div><div class="twin-mc-kpi-label">Lifecycle Cost Reduction</div><p class="twin-mc-kpi-desc">Potential reduction in facility lifecycle costs through effective digital twin implementation and structured asset data.</p><a class="twin-mc-kpi-source" href="https://www.cdbb.cam.ac.uk/what-we-do/national-digital-twin-programme" target="_blank" rel="noopener">CDBB \u00b7 National Digital Twin</a></div>
      <div class="twin-mc-kpi" data-twin-kpi><div class="twin-mc-kpi-val">2\u20134%</div><div class="twin-mc-kpi-label">O&amp;M Data Recovery Cost</div><p class="twin-mc-kpi-desc">Of total project cost spent by owner-operators manually correcting and re-entering handover information.</p><a class="twin-mc-kpi-source" href="https://www.mimosa.org/2011/07/21/problems-with-information-handover/" target="_blank" rel="noopener">FIATECH / MIMOSA</a></div>
    </div>

    </div><!-- /twin-mc-wrap -->

    <!-- Bottom cards -->
    <div class="twin-diff-cards">
      <div class="twin-diff-card" data-twin-dc><div class="twin-diff-card-icon">What We Diagnose</div><h4>Handover Readiness</h4><p>The TRI scores your project across six data dimensions. A single auditable metric that tells the programme whether its asset data will serve operations for decades \u2014 or arrive dead on delivery.</p></div>
      <div class="twin-diff-card" data-twin-dc><div class="twin-diff-card-icon">How We Deploy</div><h4>Progressive Activation</h4><p>We run the TRI before engagement. It shows exactly which data dimensions are failing. Then we build the handover framework progressively \u2014 structuring, populating, and validating through every phase.</p></div>
      <div class="twin-diff-card" data-twin-dc><div class="twin-diff-card-icon">What You Get</div><h4>A Living Asset</h4><p>Projects that complete with a TRI above 80 deliver the foundation for the full maturity continuum \u2014 from reporting through to autonomous decisioning. Not a box of files. A twin-ready asset.</p></div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  /* WATERFALL CANVAS */
  var wfCanvas=document.getElementById('twin-wf-canvas');var wfWrap=wfCanvas?wfCanvas.parentElement:null;
  if(wfCanvas&&wfWrap){var wCtx=wfCanvas.getContext('2d');var dpr=window.devicePixelRatio||1;var wW,wH,wParts=[],wRun=false;
  function wResize(){var r=wfWrap.getBoundingClientRect();wW=r.width;wH=r.height;wfCanvas.width=wW*dpr;wfCanvas.height=wH*dpr;wCtx.setTransform(dpr,0,0,dpr,0,0);}wResize();window.addEventListener('resize',wResize);
  var volumes=[1.0,0.72,0.45,0.33];var phaseColors=[[71,181,255],[255,200,60],[255,140,60],[255,80,60]];
  function spawnWf(){var x=Math.random()*wW*0.22;var sH=wH*volumes[0];return{x:x,y:(wH-sH)/2+Math.random()*sH,vx:0.6+Math.random()*1.2,vy:0,phase:0,life:1,size:1.2+Math.random()*1.5,col:phaseColors[0]};}
  function wAnim(){if(!wRun)return;wCtx.clearRect(0,0,wW,wH);for(var i=0;i<4;i++){var bx2=(i+1)*wW/4;wCtx.strokeStyle='rgba(71,181,255,0.04)';wCtx.setLineDash([2,6]);wCtx.beginPath();wCtx.moveTo(bx2,0);wCtx.lineTo(bx2,wH);wCtx.stroke();wCtx.setLineDash([]);}for(var i=0;i<4;i++){var x1=i*wW/4,x2=(i+1)*wW/4,sv=volumes[i],st=(wH-wH*sv)/2,sb=(wH+wH*sv)/2;var nst=i<3?(wH-wH*volumes[i+1])/2:st;var nsb=i<3?(wH+wH*volumes[i+1])/2:sb;var c=phaseColors[i];wCtx.fillStyle='rgba('+c[0]+','+c[1]+','+c[2]+',0.03)';wCtx.beginPath();wCtx.moveTo(x1,st);wCtx.lineTo(x2,nst);wCtx.lineTo(x2,nsb);wCtx.lineTo(x1,sb);wCtx.closePath();wCtx.fill();wCtx.strokeStyle='rgba('+c[0]+','+c[1]+','+c[2]+',0.12)';wCtx.lineWidth=1;wCtx.beginPath();wCtx.moveTo(x1,st);wCtx.lineTo(x2,nst);wCtx.stroke();wCtx.beginPath();wCtx.moveTo(x1,sb);wCtx.lineTo(x2,nsb);wCtx.stroke();}
  if(Math.random()<0.25&&wParts.length<120)wParts.push(spawnWf());for(var i=wParts.length-1;i>=0;i--){var p=wParts[i];p.x+=p.vx;var np=Math.min(Math.floor(p.x/(wW/4)),3);if(np>p.phase){p.phase=np;p.col=phaseColors[np];if(Math.random()>volumes[np]/volumes[Math.max(np-1,0)]){p.vy=(Math.random()-0.5)*3;p.vx*=0.3;p.life=0.3;}}var sv2=volumes[p.phase],st2=(wH-wH*sv2)/2,sb2=(wH+wH*sv2)/2;p.y+=p.vy;p.vy*=0.95;if(p.y<st2+4){p.y=st2+4;p.vy=Math.abs(p.vy)*0.5;}if(p.y>sb2-4){p.y=sb2-4;p.vy=-Math.abs(p.vy)*0.5;}p.life-=0.003;if(p.x>wW||p.life<=0){wParts.splice(i,1);continue;}var al=Math.min(p.life,1)*0.6;wCtx.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+al+')';wCtx.beginPath();wCtx.arc(p.x,p.y,p.size,0,Math.PI*2);wCtx.fill();wCtx.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+(al*0.15)+')';wCtx.beginPath();wCtx.arc(p.x,p.y,p.size*3,0,Math.PI*2);wCtx.fill();}requestAnimationFrame(wAnim);}
  var wObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!wRun){wRun=true;wAnim();}else if(!e.isIntersecting){wRun=false;}});},{threshold:0.05});wObs.observe(wfWrap);}

  /* Waterfall counters */
  document.querySelectorAll('[data-twin-wfp]').forEach(function(c,i){c.style.opacity='0';c.style.transform='translateY(20px)';var pctEl=c.querySelector('.twin-wf-phase-pct');var tgt=pctEl?parseInt(pctEl.getAttribute('data-pct')):0;var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){c.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';c.style.opacity='1';c.style.transform='translateY(0)';if(pctEl){var cur=0;var iv=setInterval(function(){cur+=2;if(cur>tgt)cur=tgt;pctEl.textContent=cur+'%';if(cur>=tgt)clearInterval(iv);},20);}},i*120);o.disconnect();}});},{threshold:0.1});o.observe(c);});

  /* ================================================================
     BUILDING TWIN BACKGROUND — wireframe + x-ray
     ================================================================ */
  var bgWrap = document.getElementById('twin-mc-bg');
  var bgCanvas = document.getElementById('twin-mc-bg-canvas');
  var mcWrap = document.getElementById('twin-mc-wrap');
  if (bgCanvas && bgWrap && mcWrap) {
    var bCtx = bgCanvas.getContext('2d');
    var bDpr = window.devicePixelRatio || 1;
    var bW, bH;

    function bResize() {
      var r = mcWrap.getBoundingClientRect();
      bW = r.width; bH = r.height;
      bgCanvas.width = bW * bDpr; bgCanvas.height = bH * bDpr;
      bCtx.setTransform(bDpr, 0, 0, bDpr, 0, 0);
      drawBuilding();
    }

    function drawBuilding() {
      bCtx.clearRect(0, 0, bW, bH);

      var floors = 12;
      var bldgW = Math.min(bW * 0.55, 600);
      var bldgH = bH * 0.85;
      var bldgX = (bW - bldgW) / 2;
      var bldgY = (bH - bldgH) / 2;
      var flH = bldgH / floors;
      var cols = 8;
      var colW = bldgW / cols;
      var midX = bldgX + bldgW / 2;

      /* ---- LEFT HALF: Wireframe (white/grey, structural) ---- */
      bCtx.save();
      bCtx.beginPath();
      bCtx.rect(bldgX, bldgY, bldgW / 2, bldgH);
      bCtx.clip();

      /* Floor slabs */
      for (var f = 0; f <= floors; f++) {
        var fy = bldgY + f * flH;
        bCtx.strokeStyle = f === 0 || f === floors ? 'rgba(244,246,248,0.06)' : 'rgba(244,246,248,0.03)';
        bCtx.lineWidth = f === 0 || f === floors ? 1.5 : 1;
        bCtx.beginPath(); bCtx.moveTo(bldgX, fy); bCtx.lineTo(midX, fy); bCtx.stroke();
      }
      /* Columns */
      for (var c = 0; c <= cols / 2; c++) {
        var cx2 = bldgX + c * colW;
        bCtx.strokeStyle = 'rgba(244,246,248,0.02)';
        bCtx.lineWidth = 1;
        bCtx.beginPath(); bCtx.moveTo(cx2, bldgY); bCtx.lineTo(cx2, bldgY + bldgH); bCtx.stroke();
      }
      /* Column joints */
      for (var f2 = 0; f2 <= floors; f2++) {
        for (var c2 = 0; c2 <= cols / 2; c2++) {
          var jx = bldgX + c2 * colW;
          var jy = bldgY + f2 * flH;
          bCtx.fillStyle = 'rgba(244,246,248,0.04)';
          bCtx.fillRect(jx - 2, jy - 2, 4, 4);
        }
      }
      /* Windows */
      for (var f3 = 1; f3 < floors; f3++) {
        for (var c3 = 0; c3 < cols / 2; c3++) {
          var wx = bldgX + c3 * colW + colW * 0.2;
          var wy = bldgY + f3 * flH + flH * 0.2;
          bCtx.strokeStyle = 'rgba(244,246,248,0.025)';
          bCtx.strokeRect(wx, wy, colW * 0.6, flH * 0.5);
        }
      }
      /* Cross bracing on a few floors */
      [2, 5, 8, 11].forEach(function(f4) {
        var by1 = bldgY + f4 * flH; var by2 = bldgY + (f4 + 1) * flH;
        bCtx.strokeStyle = 'rgba(244,246,248,0.015)';
        bCtx.setLineDash([4, 6]);
        bCtx.beginPath(); bCtx.moveTo(bldgX, by1); bCtx.lineTo(midX, by2); bCtx.stroke();
        bCtx.beginPath(); bCtx.moveTo(midX, by1); bCtx.lineTo(bldgX, by2); bCtx.stroke();
        bCtx.setLineDash([]);
      });
      bCtx.restore();

      /* ---- RIGHT HALF: X-ray / Digital Twin (blue, translucent systems) ---- */
      bCtx.save();
      bCtx.beginPath();
      bCtx.rect(midX, bldgY, bldgW / 2, bldgH);
      bCtx.clip();

      /* Floor slabs - blue */
      for (var f5 = 0; f5 <= floors; f5++) {
        var fy2 = bldgY + f5 * flH;
        bCtx.strokeStyle = f5 === 0 || f5 === floors ? 'rgba(71,181,255,0.08)' : 'rgba(71,181,255,0.04)';
        bCtx.lineWidth = f5 === 0 || f5 === floors ? 1.5 : 1;
        bCtx.beginPath(); bCtx.moveTo(midX, fy2); bCtx.lineTo(bldgX + bldgW, fy2); bCtx.stroke();
      }
      /* Columns */
      for (var c4 = Math.ceil(cols / 2); c4 <= cols; c4++) {
        var cx4 = bldgX + c4 * colW;
        bCtx.strokeStyle = 'rgba(71,181,255,0.025)';
        bCtx.beginPath(); bCtx.moveTo(cx4, bldgY); bCtx.lineTo(cx4, bldgY + bldgH); bCtx.stroke();
      }
      /* Windows - blue fill */
      for (var f6 = 1; f6 < floors; f6++) {
        for (var c5 = Math.ceil(cols / 2); c5 < cols; c5++) {
          var wx2 = bldgX + c5 * colW + colW * 0.15;
          var wy2 = bldgY + f6 * flH + flH * 0.15;
          bCtx.fillStyle = 'rgba(71,181,255,0.015)';
          bCtx.fillRect(wx2, wy2, colW * 0.7, flH * 0.6);
          bCtx.strokeStyle = 'rgba(71,181,255,0.04)';
          bCtx.strokeRect(wx2, wy2, colW * 0.7, flH * 0.6);
        }
      }
      /* MEP horizontal runs */
      for (var f7 = 2; f7 < floors; f7 += 2) {
        var my = bldgY + f7 * flH + flH * 0.7;
        bCtx.strokeStyle = 'rgba(71,181,255,0.035)';
        bCtx.lineWidth = 2;
        bCtx.setLineDash([6, 4]);
        bCtx.beginPath(); bCtx.moveTo(midX + 10, my); bCtx.lineTo(bldgX + bldgW - 10, my); bCtx.stroke();
        bCtx.setLineDash([]);
        bCtx.lineWidth = 1;
      }
      /* Vertical risers */
      [0.25, 0.65].forEach(function(pct) {
        var rx = midX + (bldgW / 2) * pct;
        bCtx.strokeStyle = 'rgba(71,181,255,0.025)';
        bCtx.lineWidth = 2;
        bCtx.setLineDash([3, 8]);
        bCtx.beginPath(); bCtx.moveTo(rx, bldgY + flH); bCtx.lineTo(rx, bldgY + bldgH - flH); bCtx.stroke();
        bCtx.setLineDash([]);
        bCtx.lineWidth = 1;
      });
      /* Data tags */
      var tags = [{f:3,t:'SN:4821'},{f:5,t:'WTY:2027'},{f:7,t:'CAP:450kW'},{f:9,t:'MFR:TRANE'},{f:11,t:'CLS:Ss_25'}];
      tags.forEach(function(d) {
        var tx = midX + bldgW * 0.22;
        var ty = bldgY + d.f * flH + flH * 0.4;
        bCtx.fillStyle = 'rgba(71,181,255,0.02)';
        bCtx.fillRect(tx - 22, ty - 6, 44, 12);
        bCtx.strokeStyle = 'rgba(71,181,255,0.04)';
        bCtx.strokeRect(tx - 22, ty - 6, 44, 12);
        bCtx.fillStyle = 'rgba(71,181,255,0.06)';
        bCtx.font = '7px DM Mono, monospace';
        bCtx.textAlign = 'center';
        bCtx.fillText(d.t, tx, ty + 3);
      });
      /* Connection nodes */
      for (var f8 = 2; f8 < floors; f8 += 2) {
        var ny = bldgY + f8 * flH + flH * 0.5;
        bCtx.beginPath();
        bCtx.arc(bldgX + bldgW - 12, ny, 3, 0, Math.PI * 2);
        bCtx.fillStyle = 'rgba(71,181,255,0.04)';
        bCtx.fill();
        bCtx.strokeStyle = 'rgba(71,181,255,0.06)';
        bCtx.stroke();
      }
      bCtx.restore();

      /* ---- Centre dividing line ---- */
      bCtx.strokeStyle = 'rgba(71,181,255,0.04)';
      bCtx.setLineDash([6, 8]);
      bCtx.beginPath(); bCtx.moveTo(midX, bldgY - 20); bCtx.lineTo(midX, bldgY + bldgH + 20); bCtx.stroke();
      bCtx.setLineDash([]);

      /* ---- Gradient fade at edges for readability ---- */
      var fadeW = bldgW * 0.35;
      var gLeft = bCtx.createLinearGradient(bldgX, 0, bldgX + fadeW, 0);
      gLeft.addColorStop(0, 'rgba(28,31,35,1)'); gLeft.addColorStop(1, 'rgba(28,31,35,0)');
      bCtx.fillStyle = gLeft;
      bCtx.fillRect(bldgX - fadeW, 0, fadeW * 2, bH);

      var gRight = bCtx.createLinearGradient(bldgX + bldgW - fadeW, 0, bldgX + bldgW, 0);
      gRight.addColorStop(0, 'rgba(28,31,35,0)'); gRight.addColorStop(1, 'rgba(28,31,35,1)');
      bCtx.fillStyle = gRight;
      bCtx.fillRect(bldgX + bldgW - fadeW, 0, fadeW * 2, bH);

      var gTop = bCtx.createLinearGradient(0, bldgY, 0, bldgY + flH * 2);
      gTop.addColorStop(0, 'rgba(28,31,35,1)'); gTop.addColorStop(1, 'rgba(28,31,35,0)');
      bCtx.fillStyle = gTop;
      bCtx.fillRect(0, bldgY - flH, bW, flH * 3);

      var gBot = bCtx.createLinearGradient(0, bldgY + bldgH - flH * 2, 0, bldgY + bldgH);
      gBot.addColorStop(0, 'rgba(28,31,35,0)'); gBot.addColorStop(1, 'rgba(28,31,35,1)');
      bCtx.fillStyle = gBot;
      bCtx.fillRect(0, bldgY + bldgH - flH * 3, bW, flH * 4);
    }

    bResize();
    window.addEventListener('resize', bResize);

    /* Fade in on scroll */
    var bgObs = new IntersectionObserver(function(es) { es.forEach(function(e) {
      if (e.isIntersecting) { bgWrap.classList.add('twin-mc-bg-vis'); bgObs.disconnect(); }
    }); }, { threshold: 0.1 });
    bgObs.observe(mcWrap);
  }

  /* Maturity stages — scroll-driven progressive illuminate */
  var stages = document.querySelectorAll('[data-twin-ms]');
  var stagesLit = 0;
  var stagesContainer = document.getElementById('twin-mc-stages');
  if (stagesContainer && stages.length) {
    var litObs = new IntersectionObserver(function(es) { es.forEach(function(e) {
      if (e.isIntersecting && stagesLit === 0) {
        /* Sequential illuminate with staggered delay */
        stages.forEach(function(s, i) {
          setTimeout(function() {
            s.classList.add('twin-mc-lit');
            stagesLit = i + 1;
          }, i * 350);
        });
        litObs.disconnect();
      }
    }); }, { threshold: 0.2 });
    litObs.observe(stagesContainer);
  }

  /* KPI entrance */
  document.querySelectorAll('[data-twin-kpi]').forEach(function(c,i){c.style.opacity='0';c.style.transform='translateY(20px)';var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){c.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';c.style.opacity='1';c.style.transform='translateY(0)';},i*100);o.disconnect();}});},{threshold:0.08});o.observe(c);});

  /* Header entrances */
  ['twin-wf-header','twin-mc-header','twin-mc-explainer','twin-mc-hex'].forEach(function(id){var el=document.getElementById(id);if(el){el.style.opacity='0';el.style.transform='translateY(24px)';var ho=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){el.style.transition='opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)';el.style.opacity='1';el.style.transform='translateY(0)';ho.disconnect();}});},{threshold:0.15});ho.observe(el);}});

  /* Bottom cards */
  document.querySelectorAll('[data-twin-dc]').forEach(function(c,i){c.style.opacity='0';c.style.transform='translateY(28px)';var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){c.style.transition='opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';c.style.opacity='1';c.style.transform='translateY(0)';},i*120);o.disconnect();}});},{threshold:0.08});o.observe(c);});
})()`;

export default function TwinTRI() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const s = document.createElement('script');
      s.textContent = script;
      el.appendChild(s);
    }, 150);
    return () => { clearTimeout(timer); };
  }, []);
  return (
    <div ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
