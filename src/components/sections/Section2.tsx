"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,900;1,700&amp;family=Inter:wght@300;400;500;600;700;800&amp;family=DM+Mono:wght@300;400;500&amp;display=swap');


/* Scroll reveal */
.ifw-root {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ifw-root.ifw-visible {
  opacity: 1;
  transform: translateY(0);
}

.ifw-root {
  --bg:      #1C1F23;
  --surface: #0d2236;
  --border:  rgba(71,181,255,0.18);
  --text:    #F4F6F8;
  --muted:   #7a9bb5;
  --accent:  #47B5FF;
  --c1: #1A6FAD; --c2: #2178B0; --c3: #2788CC;
  --c4: #2E99E0; --c5: #3AA8F0; --c6: #47B5FF;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Grid texture */
.ifw-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
}

/* Blue bloom on right half */
.ifw-root::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 60% at 75% 50%, rgba(11,60,93,0.55) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── 2-column grid ── */
.ifw-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ════════════════════════════
   LEFT COLUMN
════════════════════════════ */
.ifw-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 36px 60px 15%;
  box-sizing: border-box;
  min-height: 100vh;
}

/* Header block — sits in the flow, centered by parent flexbox */
.ifw-header-block {
  opacity: 0;
  animation: ifw-up 0.7s ease forwards 0.2s;
}

.ifw-eyebrow {
  font-size: 10px;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
  margin: 0 0 10px;
}
.ifw-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(32px, 4vw, 62px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 14px;
}
.ifw-headline span {
  background: linear-gradient(135deg, #fff 0%, #47B5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ifw-subline {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.75;
  max-width: 460px;
  margin: 0 0 26px;
}

/* Thin rule */
.ifw-rule {
  width: 36px;
  height: 1px;
  background: var(--border);
  margin-bottom: 24px;
}

/* ── Content area: idle hint + panel stack here, CTA follows ── */
.ifw-content-area {
  display: flex;
  flex-direction: column;
}

/* Idle hint */
.ifw-idle {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.ifw-idle p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.7;
  margin: 0 0 14px;
  max-width: 460px;
}
.ifw-idle-cue {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 0;
}
.ifw-arr {
  width: 28px;
  height: 1px;
  background: var(--accent);
  position: relative;
  flex-shrink: 0;
}
.ifw-arr::after {
  content: '';
  position: absolute;
  right: 0; top: -3px;
  width: 6px; height: 6px;
  border-top: 1px solid var(--accent);
  border-right: 1px solid var(--accent);
  transform: rotate(45deg);
}

/* Dynamic panel */
.ifw-panel {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.34,1.3,0.64,1);
  pointer-events: none;
  max-height: 0;
  overflow: hidden;
}
.ifw-panel.ifw-on {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  max-height: 600px; /* large enough */
}

.ifw-p-eyebrow {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin: 0 0 8px;
}
.ifw-p-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(28px, 3.2vw, 48px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 8px;
}
.ifw-p-sub {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.65;
  margin: 0 0 14px;
  max-width: 460px;
}
.ifw-p-body {
  font-size: 13px;
  color: rgba(244,246,248,0.72);
  line-height: 1.85;
  margin: 0 0 20px;
  max-width: 460px;
}
.ifw-checks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ifw-checks li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  color: var(--text);
  line-height: 1.5;
}
.ifw-tick {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* CTA — flows right below content, no margin-top: auto */
.ifw-cta {
  padding-top: 28px;
  opacity: 0;
  animation: ifw-up 0.6s ease forwards 0.85s;
  transition: padding-top 0.4s ease;
}
.ifw-cta.ifw-cta-expanded {
  padding-top: 32px;
}
.ifw-cta p {
  font-size: 11px;
  color: var(--muted);
  margin: 0 0 14px;
  letter-spacing: 0.06em;
}
.ifw-btn-p {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: #0B3C5D;
  border: 1px solid var(--accent);
  border-radius: 3px;
  padding: 12px 26px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
}
.ifw-btn-p:hover { background: var(--accent); color: #0B3C5D; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(71,181,255,0.28); }
.ifw-btn-g {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  background: transparent;
  border: 1px solid rgba(71,181,255,0.18);
  border-radius: 3px;
  padding: 12px 26px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 10px;
  transition: all 0.25s ease;
}
.ifw-btn-g:hover { border-color: var(--accent); color: var(--text); background: rgba(71,181,255,0.06); }

/* ════════════════════════════
   RIGHT COLUMN — WHEEL
════════════════════════════ */
.ifw-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 1% 24px 0;
  box-sizing: border-box;
  min-height: 100vh;
}

/* Wheel fills the full column width minus minimal edge padding */
.ifw-wheel {
  position: relative;
  width: min(880px, 49vw);
  height: min(880px, 49vw);
  flex-shrink: 0;
  opacity: 0;
  animation: ifw-in 0.8s ease forwards 0.7s;
}

/* Ambient rings */
.ifw-gr {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.055);
  animation: ifw-pulse 4s ease-in-out infinite;
  pointer-events: none;
}
.ifw-gr:nth-child(2) { inset: 36px; animation-delay: 0.6s; }
.ifw-gr:nth-child(3) { inset: 72px; animation-delay: 1.2s; }

@keyframes ifw-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }

/* SVG (orbit ring + connector) — fills wheel wrapper exactly */
.ifw-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

/* The rotating layer — nodes injected here, this div spins */
.ifw-rl {
  position: absolute;
  inset: 0;
  /* transition set by JS */
}

/* ── Center circle ── */
.ifw-center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  /* 38% of wheel = good size — larger than before */
  width: 38%;
  height: 38%;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  box-shadow: 0 0 56px rgba(11,60,93,0.6), inset 0 1px 0 rgba(71,181,255,0.08);
}

.ifw-cd { /* center default */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.ifw-lm { width: 40px; height: 40px; margin-bottom: 10px; opacity: 0.22; }
.ifw-cd p {
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.1em;
  line-height: 1.65;
  text-align: center;
  margin: 0;
}

.ifw-cc { /* center active content */
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 14px;
  box-sizing: border-box;
  opacity: 0;
  transform: scale(0.88);
  transition: all 0.4s cubic-bezier(0.34,1.4,0.64,1);
  pointer-events: none;
  overflow: hidden;
}
.ifw-cc.ifw-show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.ifw-cn { /* number */
  font-size: 10px;
  letter-spacing: 0.22em;
  margin-bottom: 3px;
}
.ifw-ct { /* title */
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 1.6vw, 18px);
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.15;
}
.ifw-cl { /* topics list */
  width: 100%;
  list-style: none;
  margin: 0 0 10px;
  padding: 0;
}
.ifw-cl li {
  font-size: clamp(7px, 0.75vw, 9.5px);
  color: var(--muted);
  letter-spacing: 0.03em;
  line-height: 1.9;
  border-bottom: 1px solid rgba(71,181,255,0.07);
  text-align: center;
  transition: color 0.2s;
  padding: 0; margin: 0;
}
.ifw-cl li:last-child { border: none; }
.ifw-cl li:hover { color: var(--text); }
.ifw-cta-sm {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 7.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 2px;
  padding: 5px 11px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}
.ifw-cta-sm:hover { background: rgba(71,181,255,0.1); }

/* ── Nodes ── */
.ifw-node {
  position: absolute;
  /* size = ~15.5% of wheel */
  width: 15.5%;
  height: 15.5%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(71,181,255,0.15);
  background: linear-gradient(145deg, #111820, #0d1f30);
  z-index: 20;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(71,181,255,0.06);
}
.ifw-node::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.ifw-node:hover::after  { opacity: 0.6; }
.ifw-node.on::after     { opacity: 1; }

.ifw-node[data-id="1"]::after { box-shadow: 0 0 0 2px var(--c1), 0 0 28px var(--c1); }
.ifw-node[data-id="2"]::after { box-shadow: 0 0 0 2px var(--c2), 0 0 28px var(--c2); }
.ifw-node[data-id="3"]::after { box-shadow: 0 0 0 2px var(--c3), 0 0 28px var(--c3); }
.ifw-node[data-id="4"]::after { box-shadow: 0 0 0 2px var(--c4), 0 0 28px var(--c4); }
.ifw-node[data-id="5"]::after { box-shadow: 0 0 0 2px var(--c5), 0 0 28px var(--c5); }
.ifw-node[data-id="6"]::after { box-shadow: 0 0 0 2px var(--c6), 0 0 28px var(--c6); }

.ifw-ni { font-size: 1.7em; margin-bottom: 3px; line-height: 1; flex-shrink: 0; }
.ifw-nn { font-size: 0.62em; letter-spacing: 0.18em; opacity: 0.38; margin-bottom: 2px; flex-shrink: 0; }
.ifw-nl {
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.78;
  text-align: center;
  line-height: 1.2;
  width: 88%;
  word-break: break-word;
  hyphens: auto;
  transition: opacity 0.2s;
  flex-shrink: 0;
  margin: 0; padding: 0;
}
/* node font size set as % of wheel via JS on build */
.ifw-node:hover .ifw-nl, .ifw-node.on .ifw-nl { opacity: 1; }

/* ── Tablet: stack columns but keep wheel ── */
@media (max-width: 800px) {
  .ifw-grid { grid-template-columns: 1fr; }
  .ifw-left { min-height: auto; padding: 48px 24px 32px; }
  .ifw-right { min-height: auto; padding: 0 24px 48px; }
  .ifw-wheel { width: min(480px, 92vw); height: min(480px, 92vw); }
  .ifw-panel { position: relative; width: 100%; }
}

/* ══════════════════════════════════════════
   PHONE-ONLY ACCORDION MODE (≤ 600px)
   Hides the wheel entirely, shows accordion
══════════════════════════════════════════ */
@media (max-width: 600px) {

  /* Hide the wheel column completely */
  .ifw-right { display: none; }

  /* Left column resets */
  .ifw-left {
    padding: 0;
    min-height: auto;
    display: block;
  }

  /* Hide desktop-only pieces */
  .ifw-idle,
  .ifw-panel,
  .ifw-rule,
  .ifw-content-area { display: none; }

  /* ── Mobile hero header ── */
  .ifw-mobile-hero {
    background: #1C1F23;
    padding: 48px 24px 32px;
    position: relative;
    overflow: hidden;
  }
  .ifw-mobile-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }
  .ifw-mobile-hero::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(71,181,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .ifw-mobile-hero .ifw-eyebrow {
    opacity: 1;
    animation: none;
    font-size: 10px;
    margin-bottom: 10px;
  }
  .ifw-mobile-hero .ifw-headline {
    font-size: clamp(34px, 10vw, 52px);
    opacity: 1;
    animation: none;
    margin-bottom: 14px;
  }
  .ifw-mobile-hero .ifw-subline {
    font-size: 13px;
    opacity: 1;
    animation: none;
    max-width: 100%;
    margin-bottom: 0;
  }

  /* ── Accordion section ── */
  .ifw-accordion {
    background: #1C1F23;
    padding: 8px 0 0;
  }

  .ifw-acc-item {
    border-top: 1px solid rgba(71,181,255,0.1);
    overflow: hidden;
  }
  .ifw-acc-item:last-child {
    border-bottom: 1px solid rgba(71,181,255,0.1);
  }

  /* Accordion trigger row */
  .ifw-acc-trigger {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 18px 24px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    position: relative;
    transition: background 0.2s ease;
  }
  .ifw-acc-trigger:hover {
    background: rgba(71,181,255,0.04);
  }
  .ifw-acc-trigger.ifw-acc-open {
    background: rgba(71,181,255,0.06);
  }

  /* Node icon badge */
  .ifw-acc-badge {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.2);
    background: linear-gradient(145deg, #111820, #0d1f30);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .ifw-acc-trigger.ifw-acc-open .ifw-acc-badge {
    box-shadow: 0 0 20px currentColor;
    border-color: currentColor;
  }

  /* Title area */
  .ifw-acc-meta {
    flex: 1;
    min-width: 0;
  }
  .ifw-acc-num {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 0.2em;
    opacity: 0.45;
    margin: 0 0 2px;
    display: block;
  }
  .ifw-acc-label {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #F4F6F8;
    margin: 0;
    letter-spacing: -0.01em;
  }

  /* Chevron */
  .ifw-acc-chevron {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.35s ease, border-color 0.3s ease, background 0.3s ease;
    color: #7a9bb5;
    font-size: 11px;
  }
  .ifw-acc-trigger.ifw-acc-open .ifw-acc-chevron {
    transform: rotate(180deg);
    border-color: rgba(71,181,255,0.4);
    background: rgba(71,181,255,0.08);
    color: #47B5FF;
  }

  /* Accordion body */
  .ifw-acc-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ifw-acc-body.ifw-acc-open {
    max-height: 700px;
  }

  .ifw-acc-inner {
    padding: 4px 24px 28px 82px; /* align with label */
  }

  .ifw-acc-sub {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #7a9bb5;
    line-height: 1.65;
    margin: 0 0 14px;
    font-style: italic;
  }

  .ifw-acc-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: rgba(244,246,248,0.72);
    line-height: 1.85;
    margin: 0 0 18px;
  }

  /* Checks inside accordion */
  .ifw-acc-checks {
    list-style: none;
    margin: 0 0 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ifw-acc-checks li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #F4F6F8;
    line-height: 1.5;
  }
  .ifw-acc-tick {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Topics pills */
  .ifw-acc-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 0;
  }
  .ifw-acc-topic {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 0.06em;
    color: #7a9bb5;
    border: 1px solid rgba(71,181,255,0.15);
    border-radius: 2px;
    padding: 4px 9px;
    background: rgba(71,181,255,0.04);
  }

  /* ── Mobile CTA ── */
  .ifw-mobile-cta {
    background: #1C1F23;
    padding: 32px 24px 56px;
    border-top: 1px solid rgba(71,181,255,0.1);
  }
  .ifw-mobile-cta p {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #7a9bb5;
    margin: 0 0 16px;
    letter-spacing: 0.06em;
  }
  .ifw-mobile-cta .ifw-btn-p {
    display: block;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 14px 24px;
    margin-bottom: 10px;
  }
  .ifw-mobile-cta .ifw-btn-g {
    display: block;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 14px 24px;
    margin-left: 0;
  }
}

/* ── Large screens: 1800px+ (27–32 inch) ── */
@media (min-width: 1800px) {
  .ifw-left  { padding: 80px 48px 80px 15%; }
  .ifw-headline { font-size: clamp(44px, 3.2vw, 72px); }
  .ifw-subline  { font-size: 15px; max-width: 520px; }
  .ifw-eyebrow  { font-size: 11px; }
  .ifw-idle p   { font-size: 15px; max-width: 520px; }
  .ifw-p-title  { font-size: clamp(36px, 2.8vw, 58px); }
  .ifw-p-sub    { font-size: 14px; max-width: 520px; }
  .ifw-p-body   { font-size: 14px; max-width: 520px; }
  .ifw-checks li { font-size: 13px; }
  .ifw-cta p    { font-size: 13px; }
  .ifw-btn-p, .ifw-btn-g { font-size: 12px; padding: 14px 32px; }
  .ifw-wheel { width: min(1000px, 48vw); height: min(1000px, 48vw); }
  .ifw-right { padding: 24px 1% 24px 0; }
}

/* ── XL screens: 2400px+ (32 inch 4K / ultrawide) ── */
@media (min-width: 2400px) {
  .ifw-left  { padding: 100px 64px 100px 15%; }
  .ifw-headline { font-size: clamp(52px, 3vw, 86px); }
  .ifw-subline  { font-size: 17px; max-width: 600px; }
  .ifw-eyebrow  { font-size: 13px; letter-spacing: 0.3em; }
  .ifw-idle p   { font-size: 17px; max-width: 600px; }
  .ifw-idle-cue { font-size: 12px; }
  .ifw-p-eyebrow { font-size: 12px; }
  .ifw-p-title  { font-size: clamp(44px, 2.6vw, 72px); }
  .ifw-p-sub    { font-size: 16px; max-width: 600px; }
  .ifw-p-body   { font-size: 15px; max-width: 600px; line-height: 1.9; }
  .ifw-checks li { font-size: 15px; gap: 12px; }
  .ifw-tick     { width: 20px; height: 20px; font-size: 10px; }
  .ifw-rule     { width: 48px; margin-bottom: 32px; }
  .ifw-cta p    { font-size: 15px; }
  .ifw-btn-p, .ifw-btn-g { font-size: 13px; padding: 16px 36px; }
  .ifw-wheel { width: min(1160px, 47vw); height: min(1160px, 47vw); }
  .ifw-right { padding: 24px 1% 24px 0; }
  /* center circle text scales via % so auto-adjusts — just ensure enough padding */
  .ifw-cd p { font-size: 12px; }
  .ifw-cn   { font-size: 13px; }
  .ifw-ct   { font-size: clamp(16px, 1.4vw, 24px); }
  .ifw-cl li { font-size: clamp(9px, 0.65vw, 12px); }
}

/* Mobile wrap hidden by default — only shown via phone media query */
.ifw-mobile-wrap { display: none; }
@media (max-width: 600px) {
  .ifw-mobile-wrap { display: block; }
  .ifw-grid { display: none; } /* hide desktop layout entirely on phones */
}

@keyframes ifw-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes ifw-in { from{opacity:0} to{opacity:1} }
</style>

<!-- HTML -->
<div class="ifw-root">
  <div class="ifw-grid">

    <!-- ════ LEFT ════ -->
    <div class="ifw-left">

      <!-- Static header block -->
      <div class="ifw-header-block">
        <p class="ifw-eyebrow">Advanced BIM &amp; Digital Delivery</p>
        <h2 class="ifw-headline">Our <span>Service Framework</span></h2>
        <p class="ifw-subline">Six integrated layers — from strategic vision to operational intelligence. Select a layer to explore.</p>
        <div class="ifw-rule"></div>
      </div>

      <!-- Content area: idle → panel, then CTA right below -->
      <div class="ifw-content-area">

        <!-- Idle state -->
        <div class="ifw-idle" id="ifwIdle">
          <p>Each layer represents a distinct phase of digital delivery maturity — interconnected and built to scale with your programme.</p>
          <div class="ifw-idle-cue">
            <div class="ifw-arr"></div>
            <span>Select a layer</span>
          </div>
        </div>

        <!-- Dynamic service panel -->
        <div class="ifw-panel" id="ifwPanel"></div>

        <!-- CTA — immediately below idle/panel -->
        <div class="ifw-cta" id="ifwCta">
          <p>Ready to transform your project delivery?</p>
          <a href="#" class="ifw-btn-p">Schedule a Discovery Call</a>
          <a href="#" class="ifw-btn-g">Download Framework</a>
        </div>

      </div>

    </div>

    <!-- ════ RIGHT — WHEEL ════ -->
    <div class="ifw-right">
      <div class="ifw-wheel" id="ifwWheel">

        <div class="ifw-gr"></div>
        <div class="ifw-gr"></div>
        <div class="ifw-gr"></div>

        <!-- SVG: orbit ring + connector line -->
        <svg class="ifw-svg" id="ifwSvg" viewBox="0 0 620 620">
          <defs>
            <linearGradient id="ifwOG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stop-color="#1A6FAD" stop-opacity="0.5"/>
              <stop offset="50%"  stop-color="#2788CC" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#47B5FF" stop-opacity="0.7"/>
            </linearGradient>
            <linearGradient id="ifwLG" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%"   stop-color="#47B5FF" stop-opacity="0.85" id="ifwLC"/>
              <stop offset="100%" stop-color="#47B5FF" stop-opacity="0"/>
            </linearGradient>
          </defs>

          <!-- orbit ring — cx/cy/r updated by JS to match wheel size -->
          <circle id="ifwOR" cx="310" cy="310" r="238"
            fill="none" stroke="url(#ifwOG)"
            stroke-width="1.5" stroke-dasharray="8 5" opacity="0.7"/>

          <!-- arc glow on active -->
          <circle id="ifwAG" cx="310" cy="310" r="238"
            fill="none" stroke="#47B5FF" stroke-width="2.5"
            stroke-dasharray="0 9999" opacity="0"
            style="transition:stroke .35s,opacity .35s;"/>

          <!-- fixed top connector: always center → top -->
          <line id="ifwTL"
            x1="310" y1="310" x2="310" y2="72"
            stroke="url(#ifwLG)" stroke-width="1.5" opacity="0"
            style="transition:opacity .25s ease;"/>
        </svg>

        <!-- Rotating ring layer -->
        <div class="ifw-rl" id="ifwRL"></div>

        <!-- Center circle -->
        <div class="ifw-center" id="ifwCenter">
          <div class="ifw-cd" id="ifwCD">
            <svg class="ifw-lm" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="26" stroke="#47B5FF" stroke-width="1.5"/>
              <circle cx="28" cy="28" r="16" stroke="#47B5FF" stroke-width="1"/>
              <circle cx="28" cy="28" r="6"  fill="#47B5FF" opacity="0.3"/>
              <line x1="28" y1="2"  x2="28" y2="54" stroke="#47B5FF" stroke-width="0.6" opacity="0.2"/>
              <line x1="2"  y1="28" x2="54" y2="28" stroke="#47B5FF" stroke-width="0.6" opacity="0.2"/>
            </svg>
            <p>Select<br/>a layer</p>
          </div>
          <div class="ifw-cc" id="ifwCC">
            <div class="ifw-cn" id="ifwCN"></div>
            <div class="ifw-ct" id="ifwCT"></div>
            <ul  class="ifw-cl" id="ifwCL"></ul>
            <a   href="#" class="ifw-cta-sm" id="ifwCSM">Explore →</a>
          </div>
        </div>

      </div>
    </div>

  </div><!-- /ifw-grid -->

  <!-- ══════════════════════════════
       PHONE ACCORDION (≤600px only)
       Hidden on tablet/desktop via CSS
  ══════════════════════════════ -->
  <div class="ifw-mobile-wrap" id="ifwMobileWrap">

    <!-- Hero header -->
    <div class="ifw-mobile-hero">
      <p class="ifw-eyebrow">Advanced BIM &amp; Digital Delivery</p>
      <h2 class="ifw-headline">Our <span>Service Framework</span></h2>
      <p class="ifw-subline">Six integrated layers — from strategic vision to operational intelligence.</p>
    </div>

    <!-- Accordion -->
    <div class="ifw-accordion" id="ifwAccordion"></div>

    <!-- Mobile CTA -->
    <div class="ifw-mobile-cta">
      <p>Ready to transform your project delivery?</p>
      <a href="#" class="ifw-btn-p">Schedule a Discovery Call</a>
      <a href="#" class="ifw-btn-g">Download Framework</a>
    </div>

  </div>

</div><!-- /ifw-root -->



<!-- ── Mobile Accordion JS ── -->`
const revealScript = "\n(function(){\n  var root = document.querySelector('.ifw-root');\n  if (!root) return;\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if (e.isIntersecting) { e.target.classList.add('ifw-visible'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.08 });\n  io.observe(root);\n}());\n"

const sectionScripts = ["\n(function(){\n'use strict';\n\nvar SVC = [\n  { id:1, num:'01', label:'Strategy',     icon:'\u25c8', color:'#1A6FAD',\n    sub:'Defining the digital blueprint for your entire programme.',\n    body:'We establish the information management foundation \u2014 aligning stakeholders, governance structures, and delivery standards before a single model is created. Strategy is where ambition meets rigour.',\n    checks:['Bespoke Digital Transformation Roadmaps','ISO 19650 implementation & compliance','Enterprise BIM Standards development','Digital Maturity Assessment & benchmarking'],\n    topics:['Digital Transformation Roadmap','BIM & Information Requirements','ISO 19650 Implementation','Project Data Governance Model','Information Delivery Planning','RFP Digital Specification','Digital Maturity Assessment','Enterprise BIM Standards']\n  },\n  { id:2, num:'02', label:'Structure',    icon:'\u2b21', color:'#2178B0',\n    sub:'Building the data architecture that makes everything interoperable.',\n    body:'Robust project data structure is the backbone of any successful digital delivery. We design naming conventions, classification systems, and CDE environments that scale from concept to handover.',\n    checks:['Project Data Structure (PDS) architecture','Classification systems \u2014 MasterFormat & Uniformat','Common Data Environment configuration','LOD / LOI matrix and metadata standards'],\n    topics:['Project Data Structure Architecture','Naming Conventions & Metadata','Classification Systems','LOD / LOI Matrix Development','Data Embellishment Matrix','Common Data Environment Setup','Model Parameter Framework','Version & Document Control']\n  },\n  { id:3, num:'03', label:'Intelligence', icon:'\u2b22', color:'#2788CC',\n    sub:'Turning model data into actionable project intelligence.',\n    body:'Model intelligence goes beyond coordination. We deploy rule-based validation, automated compliance checking, and analytics that surface risk before it becomes cost \u2014 giving your teams a decisive edge.',\n    checks:['Automated clash detection & constructability analysis','Rule-based model validation & compliance','4D schedule integration & simulation','Design risk analysis & performance simulation'],\n    topics:['Model Federation & Coordination','Rule-Based Model Validation','Automated Compliance Checking','Clash & Constructability Analytics','4D Schedule Integration','Model-Based Quantity Verification','Design Risk Analysis','Performance Simulation']\n  },\n  { id:4, num:'04', label:'Execution',    icon:'\u25c7', color:'#2E99E0',\n    sub:'Connecting the model to the field \u2014 in real time.',\n    body:'Digital execution bridges design intent with construction reality. From geo-spatial integration to scan-to-BIM validation and as-built structuring, we keep your programme on track and data-rich throughout delivery.',\n    checks:['Digital field work packaging & mobile delivery','Reality capture & Scan-to-BIM validation','Progress tracking via live model integration','As-built data structuring & handover preparation'],\n    topics:['Digital Field Work Packaging','Construction Phasing Simulation','Geo-Spatial Model Integration','Progress Tracking via Model','Reality Capture & Scan-to-BIM','As-Built Data Structuring','Asset Tagging & Handover','Production vs Plan Analytics']\n  },\n  { id:5, num:'05', label:'Project Twin', icon:'\u25c9', color:'#3AA8F0',\n    sub:'A living model that evolves with your asset through its lifecycle.',\n    body:'The Project Twin bridges construction and operations. We enrich asset data, integrate IoT and sensor feeds, and build the predictive maintenance framework that transforms a completed project into a smart, managed asset.',\n    checks:['Digital Twin architecture design & deployment','Sensor & IoT data integration','Predictive maintenance framework development','Operational data synchronization & AIM'],\n    topics:['Digital Twin Architecture Design','Asset Data Enrichment','Sensor & IoT Data Integration','Predictive Maintenance Framework','Lifecycle Asset Modeling','Operational Data Synchronization','Performance Monitoring Systems','Asset Information Modeling']\n  },\n  { id:6, num:'06', label:'Insights',     icon:'\u25ce', color:'#47B5FF',\n    sub:'Real-time intelligence that drives portfolio-level decisions.',\n    body:'Insights closes the loop \u2014 translating asset and programme data into executive-ready dashboards, risk models, and capital planning tools. We make complex data legible, actionable, and commercially powerful.',\n    checks:['Real-time performance dashboards & KPI modeling','Lifecycle & predictive risk analytics','Capital portfolio planning tools','Executive reporting & data visualisation'],\n    topics:['Real-Time Performance Dashboards','KPI & Asset Health Modeling','Cost-Schedule-Risk Integration','Lifecycle Performance Analytics','Predictive Risk Modeling','Capital Portfolio Analytics','Scenario-Based Decision Modeling','Executive Reporting & Visualization']\n  }\n];\n\n/* Constants */\nvar STEPS = 60; /* degrees between nodes */\nvar BASE  = SVC.map(function(_,i){ return -90 + i*STEPS; }); /* angles, node 0 at top */\nvar DUR   = 720; /* rotation ms */\n\n/* Elements */\nvar wheel   = document.getElementById('ifwWheel');\nvar rl      = document.getElementById('ifwRL');       /* rotating layer */\nvar center  = document.getElementById('ifwCenter');\nvar cd      = document.getElementById('ifwCD');       /* center default */\nvar cc      = document.getElementById('ifwCC');       /* center content */\nvar cn      = document.getElementById('ifwCN');\nvar ct      = document.getElementById('ifwCT');\nvar cl      = document.getElementById('ifwCL');\nvar csm     = document.getElementById('ifwCSM');\nvar ag      = document.getElementById('ifwAG');       /* arc glow */\nvar tl      = document.getElementById('ifwTL');       /* top line */\nvar lc      = document.getElementById('ifwLC');       /* line color stop */\nvar panel   = document.getElementById('ifwPanel');\nvar idle    = document.getElementById('ifwIdle');\nvar ctaEl   = document.getElementById('ifwCta');\n\nvar activeId = null;\nvar rot      = 0; /* current ring rotation in degrees */\nvar ctTimer  = null;\n\n/* \u2500\u2500 Build nodes \u2500\u2500 */\nfunction build(){\n  rl.innerHTML = '';\n  var sz  = wheel.offsetWidth;\n  var half= sz / 2;\n  /* orbit radius = 238/310 of half (matching SVG viewBox 620, center 310, r 238) */\n  var r   = half * (238/310);\n  /* node size = 15.5% of wheel */\n  var ns  = sz * 0.155;\n  /* font size for node content relative to node size */\n  var fs  = ns * 0.115; /* base em in px */\n\n  SVC.forEach(function(svc,i){\n    var rad = BASE[i] * Math.PI/180;\n    var x   = half + r * Math.cos(rad);\n    var y   = half + r * Math.sin(rad);\n\n    var nd  = document.createElement('div');\n    nd.className = 'ifw-node';\n    nd.setAttribute('data-id', svc.id);\n    nd.style.left      = x+'px';\n    nd.style.top       = y+'px';\n    nd.style.color     = svc.color;\n    nd.style.width     = ns+'px';\n    nd.style.height    = ns+'px';\n    nd.style.fontSize  = fs+'px';\n    nd.style.transform = 'translate(-50%,-50%) rotate('+(- rot)+'deg)';\n    nd.innerHTML =\n      '<span class=\"ifw-ni\">'+svc.icon+'</span>'+\n      '<span class=\"ifw-nn\">'+svc.num+'</span>'+\n      '<span class=\"ifw-nl\">'+svc.label+'</span>';\n\n    nd.addEventListener('click',(function(id,idx){\n      return function(){ click(id,idx); };\n    }(svc.id,i)));\n\n    rl.appendChild(nd);\n  });\n}\n\n/* \u2500\u2500 Click \u2500\u2500 */\nfunction click(id,index){\n  if(activeId===id){\n    activeId=null;\n    spinTo(0);\n    hideCenter();\n    hideConnector();\n    hidePanel();\n    return;\n  }\n  hideConnector();\n  clearTimeout(ctTimer);\n  activeId=id;\n\n  var svc = SVC.filter(function(s){return s.id===id;})[0];\n\n  /* rotate ring so clicked node goes to top */\n  var target = -90 - BASE[index];\n  var delta  = target - rot;\n  while(delta> 180) delta-=360;\n  while(delta<-180) delta+=360;\n  spinTo(rot+delta);\n\n  showCenter(svc);\n  showPanel(svc);\n\n  ctTimer = setTimeout(function(){\n    showConnector(svc.color);\n  }, DUR);\n}\n\n/* \u2500\u2500 Spin \u2500\u2500 */\nfunction spinTo(deg){\n  rot = deg;\n  rl.style.transform = 'rotate('+deg+'deg)';\n  counterRotate();\n}\n\nfunction counterRotate(){\n  rl.querySelectorAll('.ifw-node').forEach(function(n){\n    var isOn = parseInt(n.getAttribute('data-id'))===activeId;\n    n.style.transform = 'translate(-50%,-50%) rotate('+(-rot)+'deg)'+(isOn?' scale(1.25)':'');\n    n.classList.toggle('on', isOn);\n  });\n}\n\n/* \u2500\u2500 Connector \u2500\u2500 */\nfunction showConnector(color){\n  lc.setAttribute('stop-color', color);\n  tl.style.opacity='1';\n  ag.setAttribute('stroke', color);\n  ag.style.opacity='0.45';\n}\nfunction hideConnector(){\n  tl.style.opacity='0';\n  ag.style.opacity='0';\n}\n\n/* \u2500\u2500 Center circle \u2500\u2500 */\nfunction showCenter(svc){\n  cn.textContent=svc.num+' /';\n  cn.style.color=svc.color;\n  ct.textContent=svc.label;\n  cl.innerHTML=svc.topics.map(function(t){return '<li>'+t+'</li>';}).join('');\n  csm.style.borderColor=svc.color;\n  csm.style.color=svc.color;\n  center.style.borderColor=svc.color+'55';\n  center.style.boxShadow='0 0 56px '+svc.color+'22, 0 0 100px '+svc.color+'0a';\n  cd.style.opacity='0';\n  cd.style.transform='scale(0.9)';\n  rl.querySelectorAll('.ifw-node').forEach(function(n){\n    n.classList.toggle('on', parseInt(n.getAttribute('data-id'))===activeId);\n  });\n  counterRotate();\n  setTimeout(function(){ cc.classList.add('ifw-show'); },120);\n}\n\nfunction hideCenter(){\n  cc.classList.remove('ifw-show');\n  center.style.borderColor='rgba(71,181,255,0.18)';\n  center.style.boxShadow='0 0 56px rgba(11,60,93,0.6), inset 0 1px 0 rgba(71,181,255,0.08)';\n  rl.querySelectorAll('.ifw-node').forEach(function(n){ n.classList.remove('on'); });\n  counterRotate();\n  setTimeout(function(){\n    cd.style.opacity='1';\n    cd.style.transform='scale(1)';\n  },200);\n}\n\n/* \u2500\u2500 Left panel \u2500\u2500 */\nfunction showPanel(svc){\n  idle.style.opacity='0';\n  idle.style.transform='translateY(-8px)';\n  idle.style.transition='opacity .25s ease, transform .25s ease';\n  idle.style.pointerEvents='none';\n  idle.style.maxHeight='0';\n  idle.style.overflow='hidden';\n\n  var html =\n    '<p class=\"ifw-p-eyebrow\" style=\"color:'+svc.color+'\">'+svc.num+' / '+svc.label+'</p>'+\n    '<h3 class=\"ifw-p-title\">'+svc.label+'</h3>'+\n    '<p class=\"ifw-p-sub\">'+svc.sub+'</p>'+\n    '<p class=\"ifw-p-body\">'+svc.body+'</p>'+\n    '<ul class=\"ifw-checks\">'+\n      svc.checks.map(function(c){\n        return '<li>'+\n          '<span class=\"ifw-tick\" style=\"color:'+svc.color+'\">\u2713</span>'+\n          '<span>'+c+'</span>'+\n        '</li>';\n      }).join('')+\n    '</ul>';\n\n  panel.innerHTML = html;\n  requestAnimationFrame(function(){\n    panel.classList.add('ifw-on');\n    ctaEl.classList.add('ifw-cta-expanded');\n  });\n}\n\nfunction hidePanel(){\n  panel.classList.remove('ifw-on');\n  ctaEl.classList.remove('ifw-cta-expanded');\n  setTimeout(function(){ panel.innerHTML=''; },450);\n  idle.style.opacity='1';\n  idle.style.transform='translateY(0)';\n  idle.style.pointerEvents='auto';\n  idle.style.maxHeight='';\n  idle.style.overflow='';\n}\n\n/* \u2500\u2500 Init \u2500\u2500 */\nfunction init(){\n  rl.style.transition='none';\n  rl.style.transform='rotate(0deg)';\n  build();\n  requestAnimationFrame(function(){\n    rl.style.transition='transform '+DUR+'ms cubic-bezier(0.65,0,0.35,1)';\n  });\n}\n\ninit();\n\nwindow.addEventListener('resize', function(){\n  build();\n  if(activeId){\n    var svc=SVC.filter(function(s){return s.id===activeId;})[0];\n    showConnector(svc.color);\n    rl.querySelectorAll('.ifw-node').forEach(function(n){\n      n.classList.toggle('on', parseInt(n.getAttribute('data-id'))===activeId);\n    });\n    counterRotate();\n  }\n});\n\n}());\n", "\n(function(){\n'use strict';\n\nvar ACC_SVC = [\n  { id:1, num:'01', label:'Strategy',     icon:'\u25c8', color:'#1A6FAD',\n    sub:'Defining the digital blueprint for your entire programme.',\n    body:'We establish the information management foundation \u2014 aligning stakeholders, governance structures, and delivery standards before a single model is created.',\n    checks:['Bespoke Digital Transformation Roadmaps','ISO 19650 implementation & compliance','Enterprise BIM Standards development','Digital Maturity Assessment & benchmarking'],\n    topics:['Digital Transformation Roadmap','BIM & Information Requirements','ISO 19650 Implementation','Project Data Governance Model','Information Delivery Planning','RFP Digital Specification','Digital Maturity Assessment','Enterprise BIM Standards']\n  },\n  { id:2, num:'02', label:'Structure',    icon:'\u2b21', color:'#2178B0',\n    sub:'Building the data architecture that makes everything interoperable.',\n    body:'Robust project data structure is the backbone of any successful digital delivery. We design naming conventions, classification systems, and CDE environments that scale.',\n    checks:['Project Data Structure (PDS) architecture','Classification systems \u2014 MasterFormat & Uniformat','Common Data Environment configuration','LOD / LOI matrix and metadata standards'],\n    topics:['Project Data Structure Architecture','Naming Conventions & Metadata','Classification Systems','LOD / LOI Matrix Development','Data Embellishment Matrix','Common Data Environment Setup','Model Parameter Framework','Version & Document Control']\n  },\n  { id:3, num:'03', label:'Intelligence', icon:'\u2b22', color:'#2788CC',\n    sub:'Turning model data into actionable project intelligence.',\n    body:'Model intelligence goes beyond coordination. We deploy rule-based validation, automated compliance checking, and analytics that surface risk before it becomes cost.',\n    checks:['Automated clash detection & constructability analysis','Rule-based model validation & compliance','4D schedule integration & simulation','Design risk analysis & performance simulation'],\n    topics:['Model Federation & Coordination','Rule-Based Model Validation','Automated Compliance Checking','Clash & Constructability Analytics','4D Schedule Integration','Model-Based Quantity Verification','Design Risk Analysis','Performance Simulation']\n  },\n  { id:4, num:'04', label:'Execution',    icon:'\u25c7', color:'#2E99E0',\n    sub:'Connecting the model to the field \u2014 in real time.',\n    body:'Digital execution bridges design intent with construction reality. From geo-spatial integration to scan-to-BIM validation and as-built structuring, we keep your programme on track.',\n    checks:['Digital field work packaging & mobile delivery','Reality capture & Scan-to-BIM validation','Progress tracking via live model integration','As-built data structuring & handover preparation'],\n    topics:['Digital Field Work Packaging','Construction Phasing Simulation','Geo-Spatial Model Integration','Progress Tracking via Model','Reality Capture & Scan-to-BIM','As-Built Data Structuring','Asset Tagging & Handover','Production vs Plan Analytics']\n  },\n  { id:5, num:'05', label:'Project Twin', icon:'\u25c9', color:'#3AA8F0',\n    sub:'A living model that evolves with your asset through its lifecycle.',\n    body:'The Project Twin bridges construction and operations. We enrich asset data, integrate IoT and sensor feeds, and build the predictive maintenance framework.',\n    checks:['Digital Twin architecture design & deployment','Sensor & IoT data integration','Predictive maintenance framework development','Operational data synchronization & AIM'],\n    topics:['Digital Twin Architecture Design','Asset Data Enrichment','Sensor & IoT Data Integration','Predictive Maintenance Framework','Lifecycle Asset Modeling','Operational Data Synchronization','Performance Monitoring Systems','Asset Information Modeling']\n  },\n  { id:6, num:'06', label:'Insights',     icon:'\u25ce', color:'#47B5FF',\n    sub:'Real-time intelligence that drives portfolio-level decisions.',\n    body:'Insights closes the loop \u2014 translating asset and programme data into executive-ready dashboards, risk models, and capital planning tools.',\n    checks:['Real-time performance dashboards & KPI modeling','Lifecycle & predictive risk analytics','Capital portfolio planning tools','Executive reporting & data visualisation'],\n    topics:['Real-Time Performance Dashboards','KPI & Asset Health Modeling','Cost-Schedule-Risk Integration','Lifecycle Performance Analytics','Predictive Risk Modeling','Capital Portfolio Analytics','Scenario-Based Decision Modeling','Executive Reporting & Visualization']\n  }\n];\n\nvar container = document.getElementById('ifwAccordion');\nif (!container) return;\n\n/* Build accordion items */\nACC_SVC.forEach(function(svc){\n  var item = document.createElement('div');\n  item.className = 'ifw-acc-item';\n\n  var checksHtml = svc.checks.map(function(c){\n    return '<li>' +\n      '<span class=\"ifw-acc-tick\" style=\"color:'+svc.color+'\">\u2713</span>' +\n      '<span>'+c+'</span>' +\n    '</li>';\n  }).join('');\n\n  var topicsHtml = svc.topics.map(function(t){\n    return '<span class=\"ifw-acc-topic\">'+t+'</span>';\n  }).join('');\n\n  item.innerHTML =\n    '<button class=\"ifw-acc-trigger\" aria-expanded=\"false\">' +\n      '<div class=\"ifw-acc-badge\" style=\"color:'+svc.color+'\">'+svc.icon+'</div>' +\n      '<div class=\"ifw-acc-meta\">' +\n        '<span class=\"ifw-acc-num\">'+svc.num+'</span>' +\n        '<p class=\"ifw-acc-label\">'+svc.label+'</p>' +\n      '</div>' +\n      '<div class=\"ifw-acc-chevron\">\u25be</div>' +\n    '</button>' +\n    '<div class=\"ifw-acc-body\" role=\"region\">' +\n      '<div class=\"ifw-acc-inner\">' +\n        '<p class=\"ifw-acc-sub\">'+svc.sub+'</p>' +\n        '<p class=\"ifw-acc-body-text\">'+svc.body+'</p>' +\n        '<ul class=\"ifw-acc-checks\">'+checksHtml+'</ul>' +\n        '<div class=\"ifw-acc-topics\">'+topicsHtml+'</div>' +\n      '</div>' +\n    '</div>';\n\n  /* Toggle logic */\n  var trigger = item.querySelector('.ifw-acc-trigger');\n  var body    = item.querySelector('.ifw-acc-body');\n\n  trigger.addEventListener('click', function(){\n    var isOpen = trigger.classList.contains('ifw-acc-open');\n\n    /* Close all others */\n    container.querySelectorAll('.ifw-acc-trigger.ifw-acc-open').forEach(function(t){\n      t.classList.remove('ifw-acc-open');\n      t.setAttribute('aria-expanded','false');\n      t.closest('.ifw-acc-item').querySelector('.ifw-acc-body').classList.remove('ifw-acc-open');\n    });\n\n    /* Toggle this one */\n    if (!isOpen) {\n      trigger.classList.add('ifw-acc-open');\n      trigger.setAttribute('aria-expanded','true');\n      body.classList.add('ifw-acc-open');\n      /* Smooth scroll to item after open */\n      setTimeout(function(){\n        item.scrollIntoView({ behavior:'smooth', block:'nearest' });\n      }, 100);\n    }\n  });\n\n  container.appendChild(item);\n});\n\n}());\n"]

export default function Section2() {
  useEffect(() => {
    setTimeout(() => {
      [...sectionScripts, revealScript].forEach((script) => {
        try {
          // eslint-disable-next-line no-new-func
          new Function(script)()
        } catch(e) {
          console.error('Section2 script error:', e)
        }
      })
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
