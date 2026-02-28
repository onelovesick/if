'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════════════
     SECTION A — 3-COLUMN COMPARISON (Light)
     ═══════════════════════════════════════════════ */
  .intel-pim {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  .intel-pim::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .intel-pim-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .intel-pim-header { text-align: center; margin-bottom: 64px; }

  .intel-pim-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .intel-pim-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-pim h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px); line-height: 1.08;
    letter-spacing: -0.025em; text-transform: uppercase; color: #0B3C5D; margin: 0 0 20px;
  }
  .intel-pim h2 em { font-style: italic; color: #47B5FF; }

  .intel-pim-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #5a7a96; max-width: 640px; margin: 0 auto;
  }

  /* ── 3-Column Comparison ── */
  .intel-pim-compare {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-bottom: 80px;
  }

  .intel-pim-col {
    position: relative;
    padding: 40px 32px 36px;
    border: 1px solid rgba(11,60,93,0.07);
    border-right: none;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-pim-col:last-child { border-right: 1px solid rgba(11,60,93,0.07); }

  .intel-pim-col::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 100%; height: 3px;
    transition: background 0.3s ease;
  }

  .intel-pim-col[data-intel-col="static"]::before { background: rgba(11,60,93,0.1); }
  .intel-pim-col[data-intel-col="smart"]::before { background: rgba(71,181,255,0.3); }
  .intel-pim-col[data-intel-col="pim"]::before { background: #47B5FF; }

  .intel-pim-col:hover { background: rgba(71,181,255,0.015); }

  /* PIM column highlight */
  .intel-pim-col[data-intel-col="pim"] {
    background: rgba(71,181,255,0.025);
    border-color: rgba(71,181,255,0.12);
  }
  .intel-pim-col[data-intel-col="pim"]:hover {
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-col-badge {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding: 5px 14px;
  }

  .intel-pim-col[data-intel-col="static"] .intel-pim-col-badge {
    color: rgba(90,122,150,0.5);
    border: 1px solid rgba(11,60,93,0.1);
  }
  .intel-pim-col[data-intel-col="smart"] .intel-pim-col-badge {
    color: rgba(71,181,255,0.6);
    border: 1px solid rgba(71,181,255,0.2);
  }
  .intel-pim-col[data-intel-col="pim"] .intel-pim-col-badge {
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.35);
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-col h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 22px;
    text-transform: uppercase; letter-spacing: -0.01em;
    color: #0B3C5D; margin: 0 0 12px;
  }
  .intel-pim-col[data-intel-col="pim"] h3 { color: #0B3C5D; }

  .intel-pim-col-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14.5px; font-weight: 400;
    line-height: 1.75; color: #5a7a96;
    margin: 0 0 28px;
  }

  .intel-pim-col-items {
    display: flex; flex-direction: column; gap: 0;
    border-top: 1px solid rgba(11,60,93,0.06);
  }

  .intel-pim-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(11,60,93,0.04);
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400;
    color: #3d5a73; line-height: 1.5;
  }

  .intel-pim-item-icon {
    flex-shrink: 0; width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }

  .intel-pim-check { color: #47B5FF; }
  .intel-pim-cross { color: rgba(180,60,60,0.45); }
  .intel-pim-partial { color: rgba(255,180,60,0.55); }

  .intel-pim-col-verdict {
    margin-top: 24px;
    padding: 14px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
  }

  .intel-pim-col[data-intel-col="static"] .intel-pim-col-verdict {
    color: rgba(90,122,150,0.45);
    border: 1px dashed rgba(11,60,93,0.1);
    background: rgba(11,60,93,0.015);
  }
  .intel-pim-col[data-intel-col="smart"] .intel-pim-col-verdict {
    color: rgba(71,181,255,0.5);
    border: 1px dashed rgba(71,181,255,0.15);
    background: rgba(71,181,255,0.015);
  }
  .intel-pim-col[data-intel-col="pim"] .intel-pim-col-verdict {
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.25);
    background: rgba(71,181,255,0.03);
  }

  /* ═══════════════════════════════════════════════
     SECTION B — EXPLODED PIM (Dark sub-section)
     ═══════════════════════════════════════════════ */
  .intel-pim-exploded {
    position: relative;
    background: #1C1F23;
    margin: 0;
    padding: 80px 32px 100px;
    overflow: hidden;
  }

  .intel-pim-exploded::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .intel-pim-exploded-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 50%;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .intel-pim-exploded-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .intel-pim-exploded-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .intel-pim-exploded-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 20px;
  }
  .intel-pim-exploded-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-pim-exploded-header h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(24px, 2.8vw, 36px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 16px;
  }
  .intel-pim-exploded-header h2 em { font-style: italic; color: #47B5FF; }

  .intel-pim-exploded-sub {
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 580px; margin: 0 auto;
  }

  /* Exploded grid — two halves */
  .intel-pim-exploded-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .intel-pim-half {
    position: relative;
  }

  .intel-pim-half-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px; padding-bottom: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.1);
  }

  .intel-pim-half-icon {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(71,181,255,0.2);
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    color: #47B5FF;
  }

  .intel-pim-half-title {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0.01em;
    color: #F4F6F8; margin: 0;
  }

  .intel-pim-half-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(122,155,181,0.4);
  }

  .intel-pim-feed-items {
    display: flex; flex-direction: column; gap: 0;
  }

  .intel-pim-feed-item {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(71,181,255,0.06);
    align-items: start;
    transition: all 0.25s ease;
  }

  .intel-pim-feed-item:hover {
    padding-left: 6px;
  }

  .intel-pim-feed-dot {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    color: rgba(71,181,255,0.45);
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  .intel-pim-feed-item:hover .intel-pim-feed-dot {
    border-color: rgba(71,181,255,0.4);
    color: #47B5FF;
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-feed-label {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 500;
    color: rgba(244,246,248,0.75);
    margin: 0 0 3px;
    transition: color 0.25s ease;
  }

  .intel-pim-feed-item:hover .intel-pim-feed-label { color: #F4F6F8; }

  .intel-pim-feed-detail {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 400;
    line-height: 1.6; color: #5a7a96; margin: 0;
  }

  /* Divider between halves (vertical on desktop) */
  .intel-pim-divider {
    display: none;
  }

  /* ═══════════════════════════════════════════════
     CONVERGENCE ANIMATION
     ═══════════════════════════════════════════════ */
  .intel-converge {
    position: relative;
    margin-top: 64px;
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .intel-converge-field {
    position: relative;
    width: 100%;
    height: 520px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Central PIM node */
  .intel-converge-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .intel-core-ring {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.12);
  }

  .intel-core-ring-1 {
    width: 90px; height: 90px;
    border-color: rgba(71,181,255,0.3);
    background: rgba(71,181,255,0.05);
    animation: corePulse 5s ease-in-out infinite;
  }

  .intel-core-ring-2 {
    width: 140px; height: 140px;
    border-color: rgba(71,181,255,0.12);
    animation: corePulse 5s ease-in-out infinite 0.8s;
  }

  .intel-core-ring-3 {
    width: 190px; height: 190px;
    border-color: rgba(71,181,255,0.05);
    animation: corePulse 5s ease-in-out infinite 1.6s;
  }

  @keyframes corePulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.7; }
  }

  .intel-core-label {
    position: relative;
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900; font-size: 26px;
    letter-spacing: 0.12em;
    color: #47B5FF;
    z-index: 2;
  }

  .intel-core-fullname {
    position: absolute;
    top: calc(50% + 110px);
    left: 50%;
    transform: translateX(-50%);
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.3);
    white-space: nowrap;
    z-index: 10;
  }

  /* SVG connector lines */
  .intel-converge-svg {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .intel-converge-svg path {
    fill: none;
    stroke-width: 1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .intel-converge-svg path.intel-line-visible {
    opacity: 1;
  }

  /* Data stream nodes */
  .intel-stream {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .intel-stream.intel-stream-visible {
    opacity: 1;
    transform: translateX(0) !important;
  }

  .intel-stream-left {
    left: 0;
    transform: translateX(-30px);
  }

  .intel-stream-right {
    right: 0;
    transform: translateX(30px);
  }

  .intel-stream-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #47B5FF;
    box-shadow: 0 0 12px rgba(71,181,255,0.5), 0 0 24px rgba(71,181,255,0.2);
    flex-shrink: 0;
    animation: dotPulse 4s ease-in-out infinite;
    animation-delay: inherit;
  }

  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 8px rgba(71,181,255,0.4), 0 0 16px rgba(71,181,255,0.15); }
    50% { box-shadow: 0 0 16px rgba(71,181,255,0.7), 0 0 32px rgba(71,181,255,0.3); }
  }

  .intel-stream-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 700; font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #F4F6F8;
    line-height: 1.2;
    margin-bottom: 2px;
  }

  .intel-stream-data {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.08em;
    color: rgba(122,155,181,0.5);
    text-transform: uppercase;
  }

  .intel-stream-right .intel-stream-info { text-align: right; }

  /* Particle canvas */
  .intel-converge-canvas {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    z-index: 3;
    pointer-events: none;
  }

  /* Verdict */
  .intel-converge-verdict {
    text-align: center;
    margin-top: 48px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.35);
  }

  .intel-converge-verdict-num {
    color: #47B5FF;
    font-weight: 500;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 900px) {
    .intel-pim-compare { grid-template-columns: 1fr; }
    .intel-pim-col { border-right: 1px solid rgba(11,60,93,0.07); border-bottom: none; }
    .intel-pim-col:last-child { border-bottom: 1px solid rgba(11,60,93,0.07); }
    .intel-pim-exploded-grid { grid-template-columns: 1fr; gap: 48px; }
    .intel-pim-exploded { padding: 56px 20px 72px; }
    .intel-converge-field { height: auto; min-height: 400px; }
    .intel-converge-svg { display: none; }
    .intel-converge-canvas { display: none; }
    .intel-converge-core { position: relative; top: auto; left: auto; transform: none; margin: 40px auto; }
    .intel-stream { position: relative; top: auto !important; left: auto; right: auto; transform: none !important; opacity: 1; margin-bottom: 16px; }
    .intel-stream-left, .intel-stream-right { justify-content: flex-start; }
    .intel-stream-right .intel-stream-info { text-align: left; }
    .intel-converge-field { display: flex; flex-direction: column; }
  }

  @media (max-width: 480px) {
    .intel-pim { padding: 80px 20px 0; }
  }
</style>

<!-- ═══ SECTION A: 3-COLUMN COMPARISON ═══ -->
<section class="intel-pim">
  <div class="intel-pim-inner">

    <div class="intel-pim-header" id="intel-pim-header">
      <div class="intel-pim-eyebrow">Model Maturity Spectrum</div>
      <h2>Static Model \u2192 Smart Model \u2192 <em>PIM</em></h2>
      <p class="intel-pim-subtitle">Three levels of model maturity. Most teams deliver the first. Some achieve the second. We deliver the third \u2014 a Project Information Model that serves as the single source of truth for every decision on the programme.</p>
    </div>

    <div class="intel-pim-compare">

      <!-- STATIC MODEL -->
      <div class="intel-pim-col" data-intel-col="static" data-intel-pc>
        <span class="intel-pim-col-badge">Level 01</span>
        <h3>Static Model</h3>
        <p class="intel-pim-col-desc">Geometry exists. That\u2019s it. The model is a 3D representation of the design \u2014 visually useful but informationally empty. What most projects receive and call \u201cBIM.\u201d</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Embedded parameters</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Classification codes</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Clash-free coordination</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Data verification</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>CDE integration</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Contractual compliance</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 1 / 5 \u2014 Visual Only</div>
      </div>

      <!-- SMART MODEL -->
      <div class="intel-pim-col" data-intel-col="smart" data-intel-pc>
        <span class="intel-pim-col-badge">Level 02</span>
        <h3>Smart Model</h3>
        <p class="intel-pim-col-desc">Geometry with data. Parameters are populated, some classification applied. Coordination has been attempted. Better \u2014 but nobody has verified the data is correct, complete, or contractually compliant.</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Embedded parameters</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-partial">\u25D0</span>Classification codes (partial)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-partial">\u25D0</span>Clash detection (ad-hoc)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Data verification</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>CDE integration</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Contractual compliance</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 2\u20133 / 5 \u2014 Partially Intelligent</div>
      </div>

      <!-- PIM -->
      <div class="intel-pim-col" data-intel-col="pim" data-intel-pc>
        <span class="intel-pim-col-badge">Level 03 \u2014 What We Deliver</span>
        <h3>Project Information Model</h3>
        <p class="intel-pim-col-desc">A verified, classified, coordinated, and audited digital asset. Every element carries contractually required data. Every report is extractable. Every decision is traceable to the model.</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Embedded parameters (audited)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Full classification (Uniclass / OmniClass)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Clash-free &amp; design-validated</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Data verified &amp; QTO-ready</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>CDE-integrated &amp; status-coded</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Contractually compliant &amp; sign-off ready</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 5 / 5 \u2014 Decision-Ready</div>
      </div>

    </div>
  </div>

</section>

<!-- ═══ SECTION B: EXPLODED PIM ═══ -->
<section class="intel-pim-exploded">
    <div class="intel-pim-exploded-glow"></div>
    <div class="intel-pim-exploded-inner">

      <div class="intel-pim-exploded-header" id="intel-pim-exploded-header">
        <div class="intel-pim-exploded-eyebrow">Inside The PIM</div>
        <h2>What Goes Into A Project<br><em>Information</em> Model</h2>
        <p class="intel-pim-exploded-sub">The PIM is the convergence of graphical and non-graphical intelligence. Here\u2019s everything that feeds into the model your team will actually use to make decisions.</p>
      </div>

      <div class="intel-pim-exploded-grid">

        <!-- LEFT \u2014 Graphical -->
        <div class="intel-pim-half" data-intel-ph>
          <div class="intel-pim-half-header">
            <div class="intel-pim-half-icon">G</div>
            <div>
              <div class="intel-pim-half-title">Graphical Intelligence</div>
              <div class="intel-pim-half-sub">What you can see in the model</div>
            </div>
          </div>
          <div class="intel-pim-feed-items">
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">01</div>
              <div>
                <div class="intel-pim-feed-label">3D Geometry &amp; Spatial Positioning</div>
                <div class="intel-pim-feed-detail">Element shapes, dimensions, and locations \u2014 the visual representation of every building component at the contracted LOD.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">02</div>
              <div>
                <div class="intel-pim-feed-label">Federated Model Assembly</div>
                <div class="intel-pim-feed-detail">All discipline models combined with verified origins, correct positioning, and version-controlled references.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">03</div>
              <div>
                <div class="intel-pim-feed-label">Clash-Free Coordination</div>
                <div class="intel-pim-feed-detail">Spatial conflicts resolved across all discipline pairs. Hard clashes, soft clashes, and clearance violations eliminated before issue.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">04</div>
              <div>
                <div class="intel-pim-feed-label">Point Cloud &amp; Scan Integration</div>
                <div class="intel-pim-feed-detail">Reality capture data registered and overlaid \u2014 as-existing conditions verified against design intent with deviation analysis.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">05</div>
              <div>
                <div class="intel-pim-feed-label">4D Schedule Visualisation</div>
                <div class="intel-pim-feed-detail">Model elements linked to programme activities. Construction sequence simulated and validated before the first pour.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">06</div>
              <div>
                <div class="intel-pim-feed-label">Section, Detail &amp; Sheet Production</div>
                <div class="intel-pim-feed-detail">Views, annotations, and drawing sheets generated directly from the model \u2014 not redrawn in 2D.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT \u2014 Non-Graphical -->
        <div class="intel-pim-half" data-intel-ph>
          <div class="intel-pim-half-header">
            <div class="intel-pim-half-icon">NG</div>
            <div>
              <div class="intel-pim-half-title">Non-Graphical Intelligence</div>
              <div class="intel-pim-half-sub">What you can\u2019t see \u2014 but drives every decision</div>
            </div>
          </div>
          <div class="intel-pim-feed-items">
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">01</div>
              <div>
                <div class="intel-pim-feed-label">Element Parameters &amp; Property Sets</div>
                <div class="intel-pim-feed-detail">Materials, specifications, manufacturer data, fire ratings, acoustic values \u2014 embedded in every element, extractable and queryable.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">02</div>
              <div>
                <div class="intel-pim-feed-label">Classification &amp; Naming Compliance</div>
                <div class="intel-pim-feed-detail">Uniclass, OmniClass, or project-specific coding applied to every element. File naming per the EIR. CDE status codes enforced.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">03</div>
              <div>
                <div class="intel-pim-feed-label">Quantity Take-Off Data</div>
                <div class="intel-pim-feed-detail">Verified quantities by element, area, volume, and length \u2014 extracted directly from the model with full traceability to the spec.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">04</div>
              <div>
                <div class="intel-pim-feed-label">Issue Logs &amp; Coordination Records</div>
                <div class="intel-pim-feed-detail">BCF issues, clash resolution history, RFI linkage, and coordination meeting outcomes \u2014 the full audit trail of how the model was validated.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">05</div>
              <div>
                <div class="intel-pim-feed-label">LOD/LOI Compliance &amp; Model Health</div>
                <div class="intel-pim-feed-detail">BEP compliance scores, data completeness reports, model health metrics, and deliverable verification records at each milestone.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">06</div>
              <div>
                <div class="intel-pim-feed-label">CDE Metadata &amp; Audit Trail</div>
                <div class="intel-pim-feed-detail">Revision history, approval workflows, status transitions, access logs, and contractual sign-off records. The governance layer that makes the PIM legally defensible.</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══ CONVERGENCE ANIMATION ═══ -->
      <div class="intel-converge" id="intel-converge">

        <div class="intel-converge-field">
          <!-- Central PIM node -->
          <div class="intel-converge-core" id="intel-core">
            <div class="intel-core-ring intel-core-ring-3"></div>
            <div class="intel-core-ring intel-core-ring-2"></div>
            <div class="intel-core-ring intel-core-ring-1"></div>
            <div class="intel-core-label">PIM</div>
          </div>
          <div class="intel-core-fullname">Project Information Model</div>

          <!-- SVG lines drawn from streams to core -->
          <svg class="intel-converge-svg" id="intel-converge-svg" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="stream-grad-l" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="rgba(71,181,255,0)" />
                <stop offset="100%" stop-color="rgba(71,181,255,0.4)" />
              </linearGradient>
              <linearGradient id="stream-grad-r" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stop-color="rgba(71,181,255,0)" />
                <stop offset="100%" stop-color="rgba(71,181,255,0.4)" />
              </linearGradient>
              <filter id="stream-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <!-- Lines drawn by JS -->
          </svg>

          <!-- Left streams (Graphical) -->
          <div class="intel-stream intel-stream-left" data-stream data-stream-idx="0" style="top: 30px;">
            <div class="intel-stream-dot"></div>
            <div class="intel-stream-info">
              <div class="intel-stream-name">Architectural</div>
              <div class="intel-stream-data">Spatial layout · Room data · Finishes</div>
            </div>
          </div>
          <div class="intel-stream intel-stream-left" data-stream data-stream-idx="1" style="top: 120px;">
            <div class="intel-stream-dot"></div>
            <div class="intel-stream-info">
              <div class="intel-stream-name">Structural</div>
              <div class="intel-stream-data">Framing · Foundations · Load paths</div>
            </div>
          </div>
          <div class="intel-stream intel-stream-left" data-stream data-stream-idx="2" style="top: 210px;">
            <div class="intel-stream-dot"></div>
            <div class="intel-stream-info">
              <div class="intel-stream-name">MEP / Building Services</div>
              <div class="intel-stream-data">HVAC · Electrical · Plumbing · Fire</div>
            </div>
          </div>
          <div class="intel-stream intel-stream-left" data-stream data-stream-idx="3" style="top: 300px;">
            <div class="intel-stream-dot"></div>
            <div class="intel-stream-info">
              <div class="intel-stream-name">Civil &amp; Infrastructure</div>
              <div class="intel-stream-data">Grading · Utilities · Corridors</div>
            </div>
          </div>
          <div class="intel-stream intel-stream-left" data-stream data-stream-idx="4" style="top: 390px;">
            <div class="intel-stream-dot"></div>
            <div class="intel-stream-info">
              <div class="intel-stream-name">Survey &amp; Reality Capture</div>
              <div class="intel-stream-data">Point clouds · Drone data · As-existing</div>
            </div>
          </div>

          <!-- Right streams (Non-Graphical) -->
          <div class="intel-stream intel-stream-right" data-stream data-stream-idx="5" style="top: 30px;">
            <div class="intel-stream-info">
              <div class="intel-stream-name">Classification &amp; Naming</div>
              <div class="intel-stream-data">Uniclass · OmniClass · File codes</div>
            </div>
            <div class="intel-stream-dot"></div>
          </div>
          <div class="intel-stream intel-stream-right" data-stream data-stream-idx="6" style="top: 120px;">
            <div class="intel-stream-info">
              <div class="intel-stream-name">Parameters &amp; Properties</div>
              <div class="intel-stream-data">Materials · Specs · Fire ratings</div>
            </div>
            <div class="intel-stream-dot"></div>
          </div>
          <div class="intel-stream intel-stream-right" data-stream data-stream-idx="7" style="top: 210px;">
            <div class="intel-stream-info">
              <div class="intel-stream-name">Coordination Records</div>
              <div class="intel-stream-data">Clash reports · BCF issues · RFIs</div>
            </div>
            <div class="intel-stream-dot"></div>
          </div>
          <div class="intel-stream intel-stream-right" data-stream data-stream-idx="8" style="top: 300px;">
            <div class="intel-stream-info">
              <div class="intel-stream-name">Quantities &amp; Verification</div>
              <div class="intel-stream-data">QTO · Audit reports · LOD compliance</div>
            </div>
            <div class="intel-stream-dot"></div>
          </div>
          <div class="intel-stream intel-stream-right" data-stream data-stream-idx="9" style="top: 390px;">
            <div class="intel-stream-info">
              <div class="intel-stream-name">CDE &amp; Governance</div>
              <div class="intel-stream-data">Status codes · Approvals · Audit trail</div>
            </div>
            <div class="intel-stream-dot"></div>
          </div>

          <!-- Particle canvas -->
          <canvas class="intel-converge-canvas" id="intel-converge-canvas"></canvas>

        </div>

        <div class="intel-converge-verdict">
          <span class="intel-converge-verdict-num">10</span> discipline streams &middot; <span class="intel-converge-verdict-num">1</span> verified, decision-ready asset
        </div>

      </div>

    </div>
</section>
`;


const script = `(function(){
  /* ═══ SECTION A ANIMATIONS ═══ */
  var hdr = document.getElementById('intel-pim-header');
  if (hdr) {
    hdr.style.opacity = '0';
    hdr.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hdr.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          hdr.style.opacity = '1';
          hdr.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(hdr);
  }

  var cols = document.querySelectorAll('[data-intel-pc]');
  cols.forEach(function(col, i) {
    col.style.opacity = '0';
    col.style.transform = 'translateY(24px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            col.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, border-color 0.4s ease';
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
          }, i * 150);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(col);
  });

  /* ═══ SECTION B ANIMATIONS ═══ */
  var hdr2 = document.getElementById('intel-pim-exploded-header');
  if (hdr2) {
    hdr2.style.opacity = '0';
    hdr2.style.transform = 'translateY(20px)';
    var obsH2 = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hdr2.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          hdr2.style.opacity = '1';
          hdr2.style.transform = 'translateY(0)';
          obsH2.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH2.observe(hdr2);
  }

  var halves = document.querySelectorAll('[data-intel-ph]');
  halves.forEach(function(half, i) {
    half.style.opacity = '0';
    half.style.transform = 'translateY(24px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            half.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            half.style.opacity = '1';
            half.style.transform = 'translateY(0)';
          }, i * 180);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(half);
  });

  var feeds = document.querySelectorAll('.intel-pim-feed-item');
  feeds.forEach(function(fi, i) {
    fi.style.opacity = '0';
    fi.style.transform = 'translateX(-10px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            fi.style.transition = 'opacity 0.45s ease, transform 0.45s ease, padding-left 0.25s ease';
            fi.style.opacity = '1';
            fi.style.transform = 'translateX(0)';
          }, (i % 6) * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(fi);
  });

  /* ═══ CONVERGENCE ANIMATION ═══ */
  var converge = document.getElementById('intel-converge');
  var canvas = document.getElementById('intel-converge-canvas');
  var svg = document.getElementById('intel-converge-svg');
  if (!converge || !canvas || !svg) return;

  var ctx = canvas.getContext('2d');
  var streams = document.querySelectorAll('[data-stream]');
  var particles = [];
  var animating = false;

  function resizeCanvas() {
    var field = converge.querySelector('.intel-converge-field');
    if (!field) return;
    canvas.width = field.offsetWidth;
    canvas.height = field.offsetHeight;
  }

  function getCoreCenter() {
    var core = document.getElementById('intel-core');
    var field = converge.querySelector('.intel-converge-field');
    if (!core || !field) return { x: 600, y: 260 };
    var cR = core.getBoundingClientRect();
    var fR = field.getBoundingClientRect();
    return {
      x: (cR.left + cR.width / 2) - fR.left,
      y: (cR.top + cR.height / 2) - fR.top
    };
  }

  function getStreamPos(el) {
    var field = converge.querySelector('.intel-converge-field');
    var dot = el.querySelector('.intel-stream-dot');
    if (!dot || !field) return { x: 0, y: 0 };
    var dR = dot.getBoundingClientRect();
    var fR = field.getBoundingClientRect();
    return {
      x: (dR.left + dR.width / 2) - fR.left,
      y: (dR.top + dR.height / 2) - fR.top
    };
  }

  function drawSVGLines() {
    var core = getCoreCenter();
    svg.setAttribute('viewBox', '0 0 ' + canvas.width + ' ' + canvas.height);
    var old = svg.querySelectorAll('path');
    old.forEach(function(p) { p.remove(); });

    streams.forEach(function(s, i) {
      var pos = getStreamPos(s);
      var isLeft = s.classList.contains('intel-stream-left');
      var cpX1 = isLeft ? pos.x + (core.x - pos.x) * 0.5 : pos.x - (pos.x - core.x) * 0.5;
      var cpY1 = pos.y;
      var cpX2 = core.x;
      var cpY2 = core.y + (pos.y - core.y) * 0.3;
      var d = 'M' + pos.x + ',' + pos.y + ' C' + cpX1 + ',' + cpY1 + ' ' + cpX2 + ',' + cpY2 + ' ' + core.x + ',' + core.y;
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', isLeft ? 'url(#stream-grad-l)' : 'url(#stream-grad-r)');
      path.setAttribute('filter', 'url(#stream-glow)');
      svg.appendChild(path);
      setTimeout(function() { path.classList.add('intel-line-visible'); }, i * 120 + 600);
    });
  }

  function bezier(t, p0, p1, p2, p3) {
    var u = 1 - t;
    return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
  }

  function spawnParticle() {
    if (!animating) return;
    var core = getCoreCenter();
    var idx = Math.floor(Math.random() * streams.length);
    var s = streams[idx];
    if (!s) return;
    var pos = getStreamPos(s);
    var isLeft = s.classList.contains('intel-stream-left');
    particles.push({
      x: pos.x, y: pos.y, tx: core.x, ty: core.y,
      progress: 0,
      speed: 0.003 + Math.random() * 0.005,
      size: 1.5 + Math.random() * 2,
      alpha: 0.4 + Math.random() * 0.5,
      cpX1: isLeft ? pos.x + (core.x - pos.x) * 0.5 : pos.x - (pos.x - core.x) * 0.5,
      cpY1: pos.y,
      cpX2: core.x,
      cpY2: core.y + (pos.y - core.y) * 0.3
    });
  }

  function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.progress += p.speed;
      if (p.progress >= 1) { particles.splice(i, 1); continue; }
      var t = p.progress;
      var px = bezier(t, p.x, p.cpX1, p.cpX2, p.tx);
      var py = bezier(t, p.y, p.cpY1, p.cpY2, p.ty);
      var fade = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(71,181,255,' + (p.alpha * fade).toFixed(2) + ')';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(71,181,255,' + (p.alpha * fade * 0.12).toFixed(3) + ')';
      ctx.fill();
    }

    if (Math.random() < 0.18) spawnParticle();
    requestAnimationFrame(animate);
  }

  function startConvergence() {
    resizeCanvas();
    animating = true;
    streams.forEach(function(s, i) {
      setTimeout(function() { s.classList.add('intel-stream-visible'); }, i * 100);
    });
    setTimeout(function() { drawSVGLines(); }, 400);
    setTimeout(function() { animate(); }, 800);
  }

  var obsC = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { startConvergence(); obsC.disconnect(); }
    });
  }, { threshold: 0.1 });
  obsC.observe(converge);

  var rt;
  window.addEventListener('resize', function() {
    clearTimeout(rt);
    rt = setTimeout(function() { resizeCanvas(); drawSVGLines(); }, 200);
  });
})();`;

export default function IntelligencePIM() {
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
