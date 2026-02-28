'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════════════
     PDS / EDS SECTION — "The Infrastructure"
     ═══════════════════════════════════════════════ */
  .pds-section {
    position: relative;
    background: #080B10;
    padding: 140px 32px 130px;
    overflow: hidden;
    isolation: isolate;
  }

  /* Layered atmosphere */
  .pds-atmo-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.018) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 70%);
    pointer-events: none;
  }

  .pds-atmo-glow-deep {
    position: absolute;
    top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    width: 1100px; height: 1100px;
    background: radial-gradient(circle, rgba(71,181,255,0.04) 0%, transparent 55%);
    pointer-events: none;
  }

  .pds-atmo-glow-top {
    position: absolute;
    top: -5%; left: 50%;
    transform: translateX(-50%);
    width: 120%; height: 45%;
    background: radial-gradient(ellipse 55% 80% at 50% 0%, rgba(11,60,93,0.25) 0%, transparent 65%);
    pointer-events: none;
  }

  .pds-atmo-noise {
    position: absolute; inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px 128px;
    pointer-events: none;
  }

  .pds-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 2;
  }

  /* ═══ HEADER ═══ */
  .pds-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .pds-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 28px;
  }

  .pds-eyebrow::before,
  .pds-eyebrow::after {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: linear-gradient(90deg, transparent, #47B5FF);
  }

  .pds-eyebrow::after {
    background: linear-gradient(90deg, #47B5FF, transparent);
  }

  .pds-section h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 4.2vw, 56px);
    line-height: 1.04;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 24px 0;
  }

  .pds-section h2 em {
    font-style: italic;
    background: linear-gradient(135deg, #47B5FF 0%, #7dd4ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pds-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 300;
    line-height: 1.85;
    color: #6a8faa;
    max-width: 620px;
    margin: 0 auto 0;
  }

  .pds-sub strong { font-weight: 500; color: #c0d8e8; }

  /* ═══ ORBITAL SYSTEM ═══ */
  .pds-orbital {
    position: relative;
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    aspect-ratio: 1 / 1;
  }

  /* Rings */
  .pds-orbit-ring {
    position: absolute;
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid transparent;
  }

  .pds-orbit-ring-1 {
    width: 95%; height: 95%;
    border-color: rgba(71,181,255,0.04);
  }

  .pds-orbit-ring-2 {
    width: 68%; height: 68%;
    border-color: rgba(71,181,255,0.06);
    border-style: dashed;
    border-width: 1px;
    animation: pds-ring-rotate 90s linear infinite;
  }

  .pds-orbit-ring-3 {
    width: 40%; height: 40%;
    border-color: rgba(71,181,255,0.1);
  }

  @keyframes pds-ring-rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Sweep line */
  .pds-sweep {
    position: absolute;
    top: 50%; left: 50%;
    width: 47.5%;
    height: 1px;
    transform-origin: 0 0;
    animation: pds-sweep-rotate 15s linear infinite;
  }

  .pds-sweep-line {
    width: 100%; height: 100%;
    background: linear-gradient(90deg, rgba(71,181,255,0.2), transparent 80%);
  }

  .pds-sweep-trail {
    position: absolute;
    top: -20px; left: 0;
    width: 100%; height: 40px;
    transform-origin: 0 center;
    background: linear-gradient(90deg, rgba(71,181,255,0.03), transparent 60%);
  }

  @keyframes pds-sweep-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ── CENTRE NEXUS ── */
  .pds-nexus {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 188px; height: 188px;
    z-index: 10;
  }

  .pds-nexus-outer {
    position: absolute; inset: -24px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.06);
    animation: pds-nexus-breathe 5s ease-in-out infinite;
  }

  .pds-nexus-ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.18);
    animation: pds-nexus-breathe 5s ease-in-out infinite 0.5s;
  }

  .pds-nexus-glow {
    position: absolute; inset: -40px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(71,181,255,0.08) 0%, transparent 65%);
    animation: pds-nexus-breathe 5s ease-in-out infinite 1s;
  }

  @keyframes pds-nexus-breathe {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.06); }
  }

  .pds-nexus-core {
    position: absolute; inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 45% 40%, rgba(71,181,255,0.12) 0%, rgba(8,11,16,0.97) 60%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pds-nexus-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.45);
    margin-bottom: 4px;
  }

  .pds-nexus-code {
    font-family: 'DM Mono', monospace;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.18em;
    color: #47B5FF;
    margin-bottom: 2px;
  }

  .pds-nexus-label {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(244,246,248,0.7);
    margin-top: 6px;
  }

  .pds-nexus-sub {
    font-family: 'DM Mono', monospace;
    font-size: 7px; font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.35);
    margin-top: 2px;
  }

  /* ── SVG CONNECTIONS ── */
  .pds-connections {
    position: absolute; inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  .pds-conn-glow {
    fill: none;
    stroke: rgba(71,181,255,0.06);
    stroke-width: 8;
    opacity: 0;
    transition: opacity 1.2s ease;
  }

  .pds-conn-active .pds-conn-glow { opacity: 1; }

  .pds-conn-path {
    fill: none;
    stroke: rgba(71,181,255,0.25);
    stroke-width: 1.5;
    stroke-dasharray: 6 4;
    opacity: 0;
    transition: opacity 1s ease;
  }

  .pds-conn-active .pds-conn-path { opacity: 1; }

  .pds-conn-solid {
    fill: none;
    stroke: rgba(71,181,255,0.10);
    stroke-width: 1;
    opacity: 0;
    transition: opacity 1s ease 0.2s;
  }

  .pds-conn-active .pds-conn-solid { opacity: 1; }

  .pds-conn-particle {
    fill: #47B5FF;
    filter: drop-shadow(0 0 4px rgba(71,181,255,0.6));
    visibility: hidden;
    transition: visibility 0s linear 0.5s;
  }

  .pds-conn-active .pds-conn-particle { visibility: visible; }

  /* ── ORBITAL NODES — circle-anchored system ── */
  .pds-nd-circle {
    position: absolute;
    width: 56px; height: 56px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.2);
    display: flex; align-items: center; justify-content: center;
    background: rgba(8,11,16,0.85);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    transition: all 0.35s ease;
    z-index: 6; cursor: default;
  }
  .pds-nd-circle::after {
    content: ''; position: absolute; inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.05);
    transition: border-color 0.35s ease;
  }
  .pds-nd-circle:hover {
    border-color: rgba(71,181,255,0.5);
    background: rgba(71,181,255,0.06);
    box-shadow: 0 0 32px rgba(71,181,255,0.12), inset 0 0 20px rgba(71,181,255,0.04);
  }
  .pds-nd-circle:hover::after { border-color: rgba(71,181,255,0.15); }
  .pds-nd-icon {
    font-family: 'DM Mono', monospace;
    font-size: 14px; font-weight: 500;
    letter-spacing: 0.06em; color: #47B5FF;
    transition: text-shadow 0.35s ease;
  }
  .pds-nd-circle:hover .pds-nd-icon { text-shadow: 0 0 12px rgba(71,181,255,0.4); }

  .pds-nd-label {
    position: absolute; z-index: 5;
    white-space: nowrap; pointer-events: none;
  }
  .pds-nd-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 12px; text-transform: uppercase;
    letter-spacing: 0.04em; color: #F4F6F8;
  }
  .pds-nd-desc {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    color: rgba(122,155,181,0.5); margin-top: 2px;
  }

  /* Circle positions — these MATCH the SVG line endpoints exactly */
  .pds-c1 { top: 3%; left: 50%; }
  .pds-c2 { top: 22%; left: 93%; }
  .pds-c3 { top: 63%; left: 96%; }
  .pds-c4 { top: 90%; left: 68%; }
  .pds-c5 { top: 90%; left: 32%; }
  .pds-c6 { top: 63%; left: 4%; }
  .pds-c7 { top: 22%; left: 7%; }

  /* Label positions — flipped to opposite side of each circle */
  /* 4D — below circle, centred (stays) */
  .pds-l1 { top: 8.5%; left: 50%; transform: translateX(-50%); text-align: center; }
  /* 5D — now RIGHT of circle */
  .pds-l2 { top: 20.5%; left: 98%; text-align: left; }
  /* FM — now RIGHT of circle */
  .pds-l3 { top: 61.5%; left: 101%; text-align: left; }
  /* QA — now RIGHT of circle */
  .pds-l4 { top: 88.5%; left: 73%; text-align: left; }
  /* PR — now LEFT of circle */
  .pds-l5 { top: 88.5%; right: 73%; text-align: right; }
  /* WBS — now LEFT of circle */
  .pds-l6 { top: 61.5%; right: 101%; text-align: right; }
  /* GIS — now LEFT of circle */
  .pds-l7 { top: 20.5%; right: 98%; text-align: right; }

  /* ═══ TWO-COLUMN CONTEXT ═══ */
  .pds-context {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-bottom: 72px;
    align-items: start;
  }

  .pds-context-block {
    position: relative;
    padding: 36px 32px 32px;
    border: 1px solid rgba(71,181,255,0.08);
    background: rgba(255,255,255,0.012);
    overflow: hidden;
  }

  .pds-context-block::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 20px; height: 20px;
    border-top: 1px solid rgba(71,181,255,0.2);
    border-left: 1px solid rgba(71,181,255,0.2);
  }

  .pds-context-block::after {
    content: '';
    position: absolute; bottom: 0; right: 0;
    width: 20px; height: 20px;
    border-bottom: 1px solid rgba(71,181,255,0.2);
    border-right: 1px solid rgba(71,181,255,0.2);
  }

  .pds-ctx-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pds-ctx-eyebrow::before {
    content: '';
    width: 14px; height: 1px;
    background: #47B5FF;
  }

  .pds-ctx-title {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #F4F6F8;
    margin-bottom: 14px;
  }

  .pds-ctx-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    line-height: 1.75;
    color: #6a8faa;
    margin-bottom: 20px;
  }

  .pds-ctx-scope {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pds-ctx-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(244,246,248,0.35);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 5px 12px;
    transition: all 0.25s ease;
  }

  .pds-ctx-tag:hover {
    color: #47B5FF;
    border-color: rgba(71,181,255,0.25);
  }

  /* ═══ EDS WITHIN PDS EXPLAINER ═══ */
  .pds-explainer {
    position: relative;
    margin-bottom: 72px;
    padding: 0 8px;
  }

  .pds-exp-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    text-align: center;
    margin-bottom: 32px;
  }

  .pds-exp-layout {
    display: grid;
    grid-template-columns: 240px 80px 1fr;
    gap: 0;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  /* Object visual */
  .pds-exp-object { display: flex; justify-content: center; }

  .pds-exp-obj-frame {
    position: relative;
    width: 200px;
    padding: 32px 24px 24px;
    background: rgba(255,255,255,0.015);
    border: 1px solid rgba(71,181,255,0.1);
    text-align: center;
  }

  .pds-exp-obj-corner {
    position: absolute;
    width: 14px; height: 14px;
  }

  .pds-exp-obj-tl { top: 0; left: 0; border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25); }
  .pds-exp-obj-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25); }

  .pds-exp-col-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    position: relative;
  }

  .pds-exp-col-cap {
    width: 48px; height: 8px;
    background: linear-gradient(180deg, rgba(71,181,255,0.2), rgba(71,181,255,0.08));
    border: 1px solid rgba(71,181,255,0.15);
    border-bottom: none;
  }

  .pds-exp-col-shaft {
    width: 32px; height: 64px;
    background: linear-gradient(180deg, rgba(71,181,255,0.08), rgba(71,181,255,0.03));
    border-left: 1px solid rgba(71,181,255,0.12);
    border-right: 1px solid rgba(71,181,255,0.12);
    position: relative;
  }

  .pds-exp-col-shaft::after {
    content: '';
    position: absolute;
    top: 8px; bottom: 8px; left: 50%;
    width: 1px;
    background: linear-gradient(180deg, rgba(71,181,255,0.15), transparent);
  }

  .pds-exp-col-base {
    width: 52px; height: 10px;
    background: linear-gradient(180deg, rgba(71,181,255,0.08), rgba(71,181,255,0.15));
    border: 1px solid rgba(71,181,255,0.15);
    border-top: none;
  }

  .pds-exp-col-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(71,181,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .pds-exp-obj-tag {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: #F4F6F8;
    margin-bottom: 4px;
  }

  .pds-exp-obj-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: rgba(122,155,181,0.4);
  }

  /* Arrow */
  .pds-exp-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  .pds-exp-arrow-line {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(71,181,255,0.08), rgba(71,181,255,0.3), rgba(71,181,255,0.08));
    position: relative;
  }

  .pds-exp-arrow-line::after {
    content: '▸';
    position: absolute;
    right: -4px; top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: rgba(71,181,255,0.4);
    line-height: 1;
  }

  .pds-exp-arrow-pulse {
    position: absolute;
    top: 50%; left: 0;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #47B5FF;
    transform: translateY(-50%);
    animation: pds-exp-pulse-move 2.5s ease-in-out infinite;
  }

  @keyframes pds-exp-pulse-move {
    0% { left: 10%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { left: 85%; opacity: 0; }
  }

  .pds-exp-arrow-text {
    font-family: 'DM Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.35);
    white-space: nowrap;
  }

  /* Code block */
  .pds-exp-code-block {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 28px 28px 24px;
  }

  .pds-exp-code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .pds-exp-code-badge {
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    background: rgba(71,181,255,0.06);
    border: 1px solid rgba(71,181,255,0.15);
    padding: 4px 14px;
  }

  .pds-exp-code-derived {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.35);
  }

  .pds-exp-segs {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .pds-exp-seg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .pds-exp-seg-val {
    font-family: 'DM Mono', monospace;
    font-size: 18px; font-weight: 500;
    letter-spacing: 0.1em;
    color: #F4F6F8;
    padding: 8px 12px 6px;
    background: rgba(71,181,255,0.04);
    border: 1px solid rgba(71,181,255,0.08);
    min-width: 52px;
    text-align: center;
  }

  .pds-exp-seg[data-grp="sys"] .pds-exp-seg-val { border-bottom: 2px solid rgba(71,181,255,0.3); }
  .pds-exp-seg[data-grp="sts"] .pds-exp-seg-val { border-bottom: 2px solid rgba(255,180,71,0.35); }
  .pds-exp-seg[data-grp="loc"] .pds-exp-seg-val { border-bottom: 2px solid rgba(71,255,150,0.25); }

  .pds-exp-seg-lbl {
    font-family: 'DM Mono', monospace;
    font-size: 7px; font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.4);
  }

  .pds-exp-seg-sep {
    font-family: 'DM Mono', monospace;
    font-size: 18px;
    color: rgba(71,181,255,0.15);
    padding-bottom: 16px;
  }

  .pds-exp-feeds {
    padding-top: 16px;
    border-top: 1px solid rgba(71,181,255,0.06);
  }

  .pds-exp-feed-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.35);
    margin-bottom: 10px;
  }

  .pds-exp-feed-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .pds-exp-feed-item {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 500;
    color: rgba(244,246,248,0.6);
    background: rgba(71,181,255,0.04);
    border: 1px solid rgba(71,181,255,0.08);
    padding: 4px 10px;
    transition: all 0.25s ease;
  }

  .pds-exp-feed-item:hover {
    color: #47B5FF;
    border-color: rgba(71,181,255,0.25);
  }

  .pds-exp-feed-dot {
    color: rgba(71,181,255,0.2);
    font-size: 14px;
  }

  /* PDS container frame (wraps the whole explainer) */
  .pds-exp-pds-frame {
    position: absolute;
    inset: -12px -20px;
    border: 1px dashed rgba(71,181,255,0.08);
    pointer-events: none;
    z-index: 1;
  }

  .pds-exp-pds-corner {
    position: absolute;
    width: 10px; height: 10px;
  }

  .pds-exp-pds-tl { top: 0; left: 0; border-top: 2px solid rgba(71,181,255,0.15); border-left: 2px solid rgba(71,181,255,0.15); }
  .pds-exp-pds-tr { top: 0; right: 0; border-top: 2px solid rgba(71,181,255,0.15); border-right: 2px solid rgba(71,181,255,0.15); }
  .pds-exp-pds-bl { bottom: 0; left: 0; border-bottom: 2px solid rgba(71,181,255,0.15); border-left: 2px solid rgba(71,181,255,0.15); }
  .pds-exp-pds-br { bottom: 0; right: 0; border-bottom: 2px solid rgba(71,181,255,0.15); border-right: 2px solid rgba(71,181,255,0.15); }

  .pds-exp-pds-label-l {
    position: absolute;
    top: -9px; left: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.3);
    background: #080B10;
    padding: 0 10px;
  }

  .pds-exp-pds-label-r {
    position: absolute;
    bottom: -9px; right: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.2);
    background: #080B10;
    padding: 0 10px;
  }

  @media (max-width: 960px) {
    .pds-exp-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .pds-exp-arrow {
      transform: rotate(90deg);
      height: 60px;
      width: 60px;
      margin: 0 auto;
    }
    .pds-exp-arrow-text { transform: rotate(-90deg); }
  }

  @media (max-width: 600px) {
    .pds-exp-obj-frame { width: 100%; }
    .pds-exp-segs { gap: 3px; }
    .pds-exp-seg-val { font-size: 14px; min-width: 40px; padding: 6px 8px 4px; }
    .pds-exp-pds-frame { inset: -8px -10px; }
  }

  /* ═══ METRICS ROW ═══ */
  .pds-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(71,181,255,0.06);
    margin-bottom: 64px;
  }

  .pds-metric {
    background: #080B10;
    padding: 32px 24px;
    text-align: center;
    transition: background 0.3s ease;
  }

  .pds-metric:hover { background: rgba(71,181,255,0.02); }

  .pds-metric-num {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 42px;
    letter-spacing: -0.04em;
    color: #F4F6F8;
    line-height: 1;
    margin-bottom: 4px;
  }

  .pds-metric-num span {
    font-size: 22px;
    font-weight: 800;
    color: #47B5FF;
  }

  .pds-metric-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 500;
    color: #6a8faa;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ═══ CTA ═══ */
  .pds-cta {
    text-align: center;
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.06);
  }

  .pds-cta-statement {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: clamp(18px, 2vw, 24px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #F4F6F8;
    margin-bottom: 12px;
  }

  .pds-cta-statement em {
    font-style: italic;
    color: #47B5FF;
  }

  .pds-cta-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: #6a8faa;
    margin-bottom: 32px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
  }

  .pds-cta-btn {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #080B10;
    background: #47B5FF;
    padding: 16px 44px;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .pds-cta-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .pds-cta-btn:hover::before { transform: translateX(100%); }

  .pds-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(71,181,255,0.25), 0 0 80px rgba(71,181,255,0.08);
  }

  .pds-cta-proprietary {
    margin-top: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.2);
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 960px) {
    .pds-context { grid-template-columns: 1fr; gap: 24px; }
    .pds-metrics { grid-template-columns: repeat(2, 1fr); }
    .pds-orbital { max-width: 560px; }
    .pds-nd-desc { display: none; }
    .pds-nd-circle { width: 44px; height: 44px; }
    .pds-nd-icon { font-size: 12px; }
  }

  @media (max-width: 600px) {
    .pds-section { padding: 90px 20px 80px; }
    .pds-orbital { max-width: 380px; }
    .pds-nd-name { font-size: 10px; }
    .pds-nd-circle { width: 36px; height: 36px; }
    .pds-nd-circle::after { display: none; }
    .pds-nd-icon { font-size: 10px; }
    .pds-nexus { width: 130px; height: 130px; }
    .pds-nexus-code { font-size: 12px; }
    .pds-metrics { grid-template-columns: 1fr 1fr; }
    .pds-context-block { padding: 28px 22px 24px; }
  }
</style>

<section class="pds-section">
  <div class="pds-atmo-grid"></div>
  <div class="pds-atmo-glow-deep"></div>
  <div class="pds-atmo-glow-top"></div>
  <div class="pds-atmo-noise"></div>

  <div class="pds-inner">

    <!-- ═══ HEADER ═══ -->
    <div class="pds-header" id="pds-header">
      <div class="pds-eyebrow">Project Data Structure</div>
      <h2>One Object. One Code.<br>Every <em>System</em> Connected.</h2>
      <p class="pds-sub">
        We engineer a unified data architecture — the <strong>PDS</strong> — that governs how every piece of project information is classified, from documents to geometry. At the element level, a single <strong>EDS code</strong> embedded in each BIM object simultaneously feeds scheduling, cost, procurement, and operations.
      </p>
    </div>

    <!-- ═══ ORBITAL SYSTEM ═══ -->
    <div class="pds-orbital" id="pds-orbital">
      <div class="pds-orbit-ring pds-orbit-ring-1"></div>
      <div class="pds-orbit-ring pds-orbit-ring-2"></div>
      <div class="pds-orbit-ring pds-orbit-ring-3"></div>

      <div class="pds-sweep">
        <div class="pds-sweep-trail"></div>
        <div class="pds-sweep-line"></div>
      </div>

      <!-- SVG Connections -->
      <svg class="pds-connections" id="pds-connections" viewBox="0 0 780 780" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pds-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(71,181,255,0.3)"/>
            <stop offset="100%" stop-color="rgba(71,181,255,0.02)"/>
          </linearGradient>
          <radialGradient id="pds-dot-grad">
            <stop offset="0%" stop-color="#47B5FF"/>
            <stop offset="100%" stop-color="rgba(71,181,255,0)"/>
          </radialGradient>
        </defs>
        <!-- Glow layer -->
        <line class="pds-conn-glow" x1="390" y1="390" x2="390" y2="23" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="725" y2="172" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="749" y2="491" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="530" y2="702" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="250" y2="702" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="31" y2="491" />
        <line class="pds-conn-glow" x1="390" y1="390" x2="55" y2="172" />
        <!-- Solid layer -->
        <line class="pds-conn-solid" x1="390" y1="390" x2="390" y2="23" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="725" y2="172" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="749" y2="491" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="530" y2="702" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="250" y2="702" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="31" y2="491" />
        <line class="pds-conn-solid" x1="390" y1="390" x2="55" y2="172" />
        <!-- Dashed layer -->
        <line class="pds-conn-path" x1="390" y1="390" x2="390" y2="23" />
        <line class="pds-conn-path" x1="390" y1="390" x2="725" y2="172" />
        <line class="pds-conn-path" x1="390" y1="390" x2="749" y2="491" />
        <line class="pds-conn-path" x1="390" y1="390" x2="530" y2="702" />
        <line class="pds-conn-path" x1="390" y1="390" x2="250" y2="702" />
        <line class="pds-conn-path" x1="390" y1="390" x2="31" y2="491" />
        <line class="pds-conn-path" x1="390" y1="390" x2="55" y2="172" />
        <!-- Particles -->
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cy" values="370;23" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="390;390" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="400;725" dur="3.4s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="380;172" dur="3.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.4s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="400;749" dur="3.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="400;491" dur="3.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.8s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="400;530" dur="3.2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="400;702" dur="3.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.2s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="380;250" dur="3.6s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="400;702" dur="3.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.6s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="380;31" dur="3.3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="400;491" dur="3.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.3s" repeatCount="indefinite"/>
        </circle>
        <circle class="pds-conn-particle" r="3" fill="#47B5FF" opacity="0">
          <animate attributeName="cx" values="380;55" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="380;172" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.5s" repeatCount="indefinite"/>
        </circle>
      </svg>

      <!-- Centre nexus -->
      <div class="pds-nexus">
        <div class="pds-nexus-outer"></div>
        <div class="pds-nexus-glow"></div>
        <div class="pds-nexus-ring"></div>
        <div class="pds-nexus-core">
          <div class="pds-nexus-tag">EDS Code</div>
          <div class="pds-nexus-code">•••–•••–•••</div>
          <div class="pds-nexus-label">Element Data Structure</div>
          <div class="pds-nexus-sub">Single Identifier</div>
        </div>
      </div>

      <!-- 7 Orbital nodes -->
      <!-- Circles — positioned at exact SVG endpoints -->
      <div class="pds-nd-circle pds-c1" data-pds-nd><span class="pds-nd-icon">4D</span></div>
      <div class="pds-nd-circle pds-c2" data-pds-nd><span class="pds-nd-icon">5D</span></div>
      <div class="pds-nd-circle pds-c3" data-pds-nd><span class="pds-nd-icon">FM</span></div>
      <div class="pds-nd-circle pds-c4" data-pds-nd><span class="pds-nd-icon">QA</span></div>
      <div class="pds-nd-circle pds-c5" data-pds-nd><span class="pds-nd-icon">PR</span></div>
      <div class="pds-nd-circle pds-c6" data-pds-nd><span class="pds-nd-icon">WBS</span></div>
      <div class="pds-nd-circle pds-c7" data-pds-nd><span class="pds-nd-icon">GIS</span></div>

      <!-- Labels — positioned near each circle -->
      <div class="pds-nd-label pds-l1" data-pds-nd>
        <div class="pds-nd-name">Scheduling</div>
        <div class="pds-nd-desc">Programme activities by element</div>
      </div>
      <div class="pds-nd-label pds-l2" data-pds-nd>
        <div class="pds-nd-name">Cost Control</div>
        <div class="pds-nd-desc">CBS &amp; QTO derived directly</div>
      </div>
      <div class="pds-nd-label pds-l3" data-pds-nd>
        <div class="pds-nd-name">Facility Management</div>
        <div class="pds-nd-desc">Asset register at handover</div>
      </div>
      <div class="pds-nd-label pds-l4" data-pds-nd>
        <div class="pds-nd-name">Quality &amp; Progress</div>
        <div class="pds-nd-desc">Inspection tracking per object</div>
      </div>
      <div class="pds-nd-label pds-l5" data-pds-nd>
        <div class="pds-nd-name">Procurement</div>
        <div class="pds-nd-desc">Package breakdown by data</div>
      </div>
      <div class="pds-nd-label pds-l6" data-pds-nd>
        <div class="pds-nd-name">Work Breakdown</div>
        <div class="pds-nd-desc">Structure mapped to scope</div>
      </div>
      <div class="pds-nd-label pds-l7" data-pds-nd>
        <div class="pds-nd-name">Spatial &amp; GIS</div>
        <div class="pds-nd-desc">Location intelligence by code</div>
      </div>
    </div>

    <!-- ═══ TWO-COLUMN CONTEXT ═══ -->
    <div class="pds-context" id="pds-context">
      <div class="pds-context-block" data-pds-ctx>
        <div class="pds-ctx-eyebrow">PDS · Project Level</div>
        <div class="pds-ctx-title">Project Data Structure</div>
        <p class="pds-ctx-desc">The master classification framework that governs all project information — graphical and non-graphical. Models, drawings, schedules, cost plans, specifications, transmittals. Every discipline reads from the same taxonomy.</p>
        <div class="pds-ctx-scope">
          <span class="pds-ctx-tag">Documents</span>
          <span class="pds-ctx-tag">Models</span>
          <span class="pds-ctx-tag">Schedules</span>
          <span class="pds-ctx-tag">Cost Plans</span>
          <span class="pds-ctx-tag">Drawings</span>
          <span class="pds-ctx-tag">Transmittals</span>
          <span class="pds-ctx-tag">Specifications</span>
        </div>
      </div>

      <div class="pds-context-block" data-pds-ctx>
        <div class="pds-ctx-eyebrow">EDS · Element Level</div>
        <div class="pds-ctx-title">Element Data Structure</div>
        <p class="pds-ctx-desc">A single concatenated code on every BIM object — derived from the PDS — that connects one element to every downstream system simultaneously. Define once. Inherit everywhere. No re-classification.</p>
        <div class="pds-ctx-scope">
          <span class="pds-ctx-tag">3D Geometry</span>
          <span class="pds-ctx-tag">Parameters</span>
          <span class="pds-ctx-tag">Classification</span>
          <span class="pds-ctx-tag">Location Data</span>
          <span class="pds-ctx-tag">System Identity</span>
          <span class="pds-ctx-tag">Status</span>
        </div>
      </div>
    </div>

    <!-- ═══ EDS WITHIN PDS — VISUAL EXPLAINER ═══ -->
    <div class="pds-explainer" id="pds-explainer">

      <!-- Top label -->
      <div class="pds-exp-label">How It Works</div>

      <div class="pds-exp-layout">

        <!-- LEFT — The object -->
        <div class="pds-exp-object" data-pds-exp>
          <div class="pds-exp-obj-frame">
            <div class="pds-exp-obj-corner pds-exp-obj-tl"></div>
            <div class="pds-exp-obj-corner pds-exp-obj-br"></div>

            <!-- Abstract column visual -->
            <div class="pds-exp-col-wrap">
              <div class="pds-exp-col-cap"></div>
              <div class="pds-exp-col-shaft"></div>
              <div class="pds-exp-col-base"></div>
              <div class="pds-exp-col-glow"></div>
            </div>

            <div class="pds-exp-obj-tag">Concrete Column</div>
            <div class="pds-exp-obj-sub">Revit · 3D Element · LOD 300</div>
          </div>
        </div>

        <!-- CENTRE — Arrow / connection -->
        <div class="pds-exp-arrow" data-pds-exp>
          <div class="pds-exp-arrow-line"></div>
          <div class="pds-exp-arrow-pulse"></div>
          <div class="pds-exp-arrow-text">PDS assigns →</div>
        </div>

        <!-- RIGHT — The EDS code breakdown -->
        <div class="pds-exp-code-block" data-pds-exp>
          <div class="pds-exp-code-header">
            <span class="pds-exp-code-badge">EDS Code</span>
            <span class="pds-exp-code-derived">Derived from PDS</span>
          </div>

          <!-- Abstract code segments -->
          <div class="pds-exp-segs">
            <div class="pds-exp-seg" data-grp="sys">
              <div class="pds-exp-seg-val">STR</div>
              <div class="pds-exp-seg-lbl">System</div>
            </div>
            <span class="pds-exp-seg-sep">–</span>
            <div class="pds-exp-seg" data-grp="sys">
              <div class="pds-exp-seg-val">COL</div>
              <div class="pds-exp-seg-lbl">Group</div>
            </div>
            <span class="pds-exp-seg-sep">–</span>
            <div class="pds-exp-seg" data-grp="sys">
              <div class="pds-exp-seg-val">RCC</div>
              <div class="pds-exp-seg-lbl">Element</div>
            </div>
            <span class="pds-exp-seg-sep">–</span>
            <div class="pds-exp-seg" data-grp="sts">
              <div class="pds-exp-seg-val">NEW</div>
              <div class="pds-exp-seg-lbl">Status</div>
            </div>
            <span class="pds-exp-seg-sep">–</span>
            <div class="pds-exp-seg" data-grp="loc">
              <div class="pds-exp-seg-val">•••</div>
              <div class="pds-exp-seg-lbl">Location</div>
            </div>
            <span class="pds-exp-seg-sep">–</span>
            <div class="pds-exp-seg" data-grp="loc">
              <div class="pds-exp-seg-val">···</div>
              <div class="pds-exp-seg-lbl">Levels</div>
            </div>
          </div>

          <!-- What it feeds -->
          <div class="pds-exp-feeds">
            <div class="pds-exp-feed-label">This one code feeds:</div>
            <div class="pds-exp-feed-items">
              <span class="pds-exp-feed-item">4D Schedule</span>
              <span class="pds-exp-feed-dot">·</span>
              <span class="pds-exp-feed-item">5D Cost</span>
              <span class="pds-exp-feed-dot">·</span>
              <span class="pds-exp-feed-item">QA Tracking</span>
              <span class="pds-exp-feed-dot">·</span>
              <span class="pds-exp-feed-item">FM Handover</span>
              <span class="pds-exp-feed-dot">·</span>
              <span class="pds-exp-feed-item">Procurement</span>
            </div>
          </div>
        </div>

      </div>

      <!-- PDS container wrapper -->
      <div class="pds-exp-pds-frame">
        <div class="pds-exp-pds-corner pds-exp-pds-tl"></div>
        <div class="pds-exp-pds-corner pds-exp-pds-tr"></div>
        <div class="pds-exp-pds-corner pds-exp-pds-bl"></div>
        <div class="pds-exp-pds-corner pds-exp-pds-br"></div>
        <div class="pds-exp-pds-label-l">PDS · Project Data Structure</div>
        <div class="pds-exp-pds-label-r">Governs All Elements</div>
      </div>

    </div>

    <!-- ═══ METRICS ═══ -->
    <div class="pds-metrics" id="pds-metrics">
      <div class="pds-metric" data-pds-met>
        <div class="pds-metric-num">0<span>×</span></div>
        <div class="pds-metric-label">Re-Classification</div>
      </div>
      <div class="pds-metric" data-pds-met>
        <div class="pds-metric-num">1<span>×</span></div>
        <div class="pds-metric-label">Definition</div>
      </div>
      <div class="pds-metric" data-pds-met>
        <div class="pds-metric-num">7<span>+</span></div>
        <div class="pds-metric-label">Systems Fed</div>
      </div>
      <div class="pds-metric" data-pds-met>
        <div class="pds-metric-num">∞</div>
        <div class="pds-metric-label">Lifecycle Continuity</div>
      </div>
    </div>

    <!-- ═══ CTA ═══ -->
    <div class="pds-cta">
      <div class="pds-cta-statement">Define The Structure <em>Once</em>. Feed Every System.</div>
      <p class="pds-cta-desc">The PDS framework is how we eliminate the re-classification problem that costs programmes millions at every phase transition.</p>
      <a href="/contact/" class="pds-cta-btn">See It In Practice →</a>
      <div class="pds-cta-proprietary">Proprietary Framework · Infraforma</div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header */
  var header = document.getElementById('pds-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(24px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(header);
  }

  /* Connections animate in */
  var conns = document.getElementById('pds-connections');
  if (conns) {
    var obsC = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() { conns.classList.add('pds-conn-active'); }, 600);
          obsC.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obsC.observe(conns);
  }

  /* Nodes staggered fade-in */
  var nodes = document.querySelectorAll('[data-pds-nd]');
  nodes.forEach(function(node, i) {
    node.style.opacity = '0';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            node.style.transition = 'opacity 0.65s cubic-bezier(0.22,1,0.36,1)';
            node.style.opacity = '1';
          }, 700 + (i * 120));
          obs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obs.observe(node);
  });

  /* Context blocks */
  var ctxBlocks = document.querySelectorAll('[data-pds-ctx]');
  ctxBlocks.forEach(function(block, i) {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
          }, i * 150);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(block);
  });

  /* Explainer elements staggered */
  var expEls = document.querySelectorAll('[data-pds-exp]');
  expEls.forEach(function(el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            el.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 200);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });

  /* Metrics staggered */
  var metrics = document.querySelectorAll('[data-pds-met]');
  metrics.forEach(function(met, i) {
    met.style.opacity = '0';
    met.style.transform = 'translateY(14px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            met.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            met.style.opacity = '1';
            met.style.transform = 'translateY(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(met);
  });
})();`;

export default function StructurePDS() {
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
