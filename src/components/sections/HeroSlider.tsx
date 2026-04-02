"use client"
import { useEffect } from 'react'

const heroHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');

.h3 *, .h3 *::before, .h3 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.h3 {
  --accent: #47B5FF;
  --accent-light: #7DD4FF;
  --accent-dim: rgba(71,181,255,0.08);
  --navy: #0B3C5D;
  --bg-deep: #030a12;
  --bg: #060e18;
  --text: #F4F6F8;
  --muted: rgba(244,246,248,0.45);

  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg-deep);
}

/* ══ GRADIENT MESH + ENERGY NODES BACKGROUND ══ */
.h3-mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  background: radial-gradient(ellipse 120% 80% at 50% 50%, #060e1a 0%, var(--bg-deep) 100%);
}

/* Base atmosphere layers — deep, dark, high contrast */
.h3-mesh-layer {
  position: absolute;
  inset: -60%;
  width: 220%;
  height: 220%;
  will-change: transform;
}
.h3-mesh-1 {
  background: radial-gradient(ellipse 60% 50% at 30% 50%, rgba(71,181,255,0.1), transparent 65%);
  animation: h3m1 30s ease-in-out infinite alternate;
}
.h3-mesh-2 {
  background: radial-gradient(ellipse 50% 60% at 75% 30%, rgba(11,60,93,0.25), transparent 60%);
  animation: h3m2 36s ease-in-out infinite alternate-reverse;
}
.h3-mesh-3 {
  background: radial-gradient(ellipse 40% 45% at 60% 75%, rgba(20,70,130,0.08), transparent 55%);
  animation: h3m3 26s ease-in-out infinite alternate;
}
.h3-mesh-4 {
  background: radial-gradient(ellipse 35% 35% at 85% 55%, rgba(71,181,255,0.05), transparent 50%);
  animation: h3m4 22s ease-in-out infinite alternate-reverse;
}

/* ── Energy Nodes — bright focal points that breathe ── */
.h3-node {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
}

/* Node 1 — primary, upper right, largest glow */
.h3-node-1 {
  width: 500px; height: 500px;
  top: 8%; right: 12%;
  background: radial-gradient(circle, rgba(71,181,255,0.18) 0%, rgba(71,181,255,0.06) 30%, transparent 65%);
  animation: h3pulse1 6s ease-in-out infinite, h3drift1 20s ease-in-out infinite alternate;
}
.h3-node-1::after { display: none; }

/* Node 2 — secondary, lower left */
.h3-node-2 {
  width: 350px; height: 350px;
  bottom: 20%; left: 25%;
  background: radial-gradient(circle, rgba(40,140,220,0.12) 0%, rgba(40,140,220,0.03) 35%, transparent 60%);
  animation: h3pulse2 8s ease-in-out infinite 2s, h3drift2 25s ease-in-out infinite alternate;
}
.h3-node-2::after { display: none; }

/* Node 3 — tertiary, center-right, subtle */
.h3-node-3 {
  width: 250px; height: 250px;
  top: 45%; right: 30%;
  background: radial-gradient(circle, rgba(71,181,255,0.08) 0%, transparent 55%);
  animation: h3pulse3 7s ease-in-out infinite 4s, h3drift3 18s ease-in-out infinite alternate-reverse;
}
.h3-node-3::after { display: none; }

/* Node 4 — small accent, top center-left */
.h3-node-4 {
  width: 180px; height: 180px;
  top: 15%; left: 40%;
  background: radial-gradient(circle, rgba(71,181,255,0.06) 0%, transparent 50%);
  animation: h3pulse2 9s ease-in-out infinite 3s, h3drift4 22s ease-in-out infinite alternate;
}
.h3-node-4::after { display: none; }

/* Node 5 — faint deep node, bottom right */
.h3-node-5 {
  width: 400px; height: 400px;
  bottom: 5%; right: 5%;
  background: radial-gradient(circle, rgba(20,80,140,0.07) 0%, transparent 55%);
  animation: h3pulse3 10s ease-in-out infinite 1s, h3drift5 28s ease-in-out infinite alternate;
}

/* ── Pulse keyframes — breathing intensity ── */
@keyframes h3pulse1 {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
}
@keyframes h3pulse1core {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
}
@keyframes h3pulse2 {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.9; }
}
@keyframes h3pulse2core {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.25); opacity: 1; }
}
@keyframes h3pulse3 {
  0%, 100% { transform: scale(0.95); opacity: 0.4; }
  50% { transform: scale(1.08); opacity: 0.85; }
}
@keyframes h3pulse3core {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.2); opacity: 0.9; }
}

/* ── Drift keyframes — slow spatial movement ── */
@keyframes h3drift1 { 0%{translate: 0 0} 50%{translate: -30px 20px} 100%{translate: 25px -15px} }
@keyframes h3drift2 { 0%{translate: 0 0} 50%{translate: 20px -25px} 100%{translate: -20px 30px} }
@keyframes h3drift3 { 0%{translate: 0 0} 50%{translate: -15px -20px} 100%{translate: 20px 10px} }
@keyframes h3drift4 { 0%{translate: 0 0} 50%{translate: 25px 15px} 100%{translate: -18px -22px} }
@keyframes h3drift5 { 0%{translate: 0 0} 50%{translate: -20px 18px} 100%{translate: 15px -12px} }

/* ── Base mesh drift ── */
@keyframes h3m1 { 0%{transform:translate(0,0)} 50%{transform:translate(-4%,3%)} 100%{transform:translate(3%,-2%)} }
@keyframes h3m2 { 0%{transform:translate(0,0)} 50%{transform:translate(3%,-4%)} 100%{transform:translate(-5%,2%)} }
@keyframes h3m3 { 0%{transform:translate(0,0)} 50%{transform:translate(-3%,-3%)} 100%{transform:translate(4%,3%)} }
@keyframes h3m4 { 0%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(2%,4%) rotate(1deg)} 100%{transform:translate(-3%,-2%) rotate(-1deg)} }

/* ══ GRID OVERLAY — disabled ══ */
.h3-grid {
  display: none;
}

/* ══ GRAIN OVERLAY ══ */
.h3-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.035;
  pointer-events: none;
  mix-blend-mode: overlay;
}
.h3-grain-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ══ FLOATING GEOMETRIC SHAPES ══ */
.h3-shapes {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  transition: transform 0.15s ease-out;
}
.h3-shape {
  position: absolute;
  border: 1px solid rgba(71,181,255,0.06);
  pointer-events: none;
  opacity: 0;
  animation: h3fadeIn 2s ease forwards;
}
.h3-shape-1 {
  width: 180px; height: 180px;
  top: 12%; right: 18%;
  transform: rotate(12deg);
  animation-delay: 1s;
  border-radius: 2px;
}
.h3-shape-1::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(71,181,255,0.04);
  border-radius: 2px;
}
.h3-shape-2 {
  width: 120px; height: 120px;
  top: 55%; right: 12%;
  border-radius: 50%;
  animation-delay: 1.3s;
}
.h3-shape-3 {
  width: 240px; height: 1px;
  top: 35%; right: 8%;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.08), transparent);
  border: none;
  transform: rotate(-8deg);
  animation-delay: 1.6s;
}
.h3-shape-4 {
  width: 80px; height: 80px;
  bottom: 28%; right: 32%;
  transform: rotate(45deg);
  animation-delay: 1.8s;
  border-color: rgba(71,181,255,0.04);
}
.h3-shape-5 {
  width: 160px; height: 160px;
  top: 20%; right: 40%;
  border-radius: 50%;
  border-style: dashed;
  border-color: rgba(71,181,255,0.03);
  animation: h3fadeIn 2s ease forwards 2s, h3spinSlow 60s linear infinite;
}
.h3-shape-6 {
  width: 300px; height: 300px;
  bottom: 15%; right: 5%;
  border-radius: 50%;
  border-color: rgba(71,181,255,0.03);
  animation-delay: 1.5s;
}
.h3-shape-6::before {
  content: '';
  position: absolute;
  inset: 30px;
  border: 1px solid rgba(71,181,255,0.025);
  border-radius: 50%;
}
.h3-shape-6::after {
  content: '';
  position: absolute;
  inset: 60px;
  border: 1px solid rgba(71,181,255,0.02);
  border-radius: 50%;
}

/* ══ GIANT SLIDE NUMBER ══ */
.h3-bignum {
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-55%);
  z-index: 4;
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  height: clamp(220px, 48vh, 550px);
  transition: transform 0.15s ease-out;
}
.h3-bignum-text {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(220px, 48vh, 550px);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, rgba(71,181,255,0.07) 0%, rgba(71,181,255,0.02) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
  opacity: 0;
  animation: h3fadeIn 1.5s ease forwards 0.8s;
}
.h3-bignum-text.h3-num-exit {
  transform: translateY(-100%);
  opacity: 0;
}
.h3-bignum-text.h3-num-enter {
  transform: translateY(60%);
  opacity: 0;
}

/* ══ CURSOR GLOW ══ */
.h3-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71,181,255,0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  will-change: left, top;
}
.h3.h3-mouse-active .h3-glow {
  opacity: 1;
}

/* ══ SCAN LINE ══ */
.h3-scanline {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  z-index: 6;
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.5) 30%, rgba(71,181,255,0.8) 50%, rgba(71,181,255,0.5) 70%, transparent 95%);
  box-shadow: 0 0 30px rgba(71,181,255,0.3), 0 0 60px rgba(71,181,255,0.1);
  opacity: 0;
  top: 0;
  animation: h3scan 2.5s cubic-bezier(0.4,0,0.2,1) forwards 0.6s;
  pointer-events: none;
}
@keyframes h3scan {
  0% { top: -1px; opacity: 0; }
  5% { opacity: 1; }
  85% { opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}

/* ══ CORNER MARKS ══ */
.h3-corner {
  position: absolute;
  width: 32px; height: 32px;
  z-index: 8;
  pointer-events: none;
  opacity: 0;
  animation: h3fadeIn 0.8s ease forwards 2.2s;
}
.h3-corner.tl { top: 24px; left: 24px; border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25); }
.h3-corner.tr { top: 24px; right: 24px; border-top: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25); }
.h3-corner.bl { bottom: 90px; left: 24px; border-bottom: 1px solid rgba(71,181,255,0.15); border-left: 1px solid rgba(71,181,255,0.15); }
.h3-corner.br { bottom: 90px; right: 24px; border-bottom: 1px solid rgba(71,181,255,0.15); border-right: 1px solid rgba(71,181,255,0.15); }

/* ══ SLIDES ══ */
.h3-slides {
  position: absolute;
  inset: 0;
  z-index: 10;
}
.h3-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 5%;
  pointer-events: none;
}
.h3-slide.active { pointer-events: auto; }

/* Slide content */
.h3-content {
  width: 50vw;
  max-width: 720px;
  min-width: 280px;
}

/* ══ EYEBROW ══ */
.h3-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}
.h3-eyebrow-line {
  display: block;
  height: 1px;
  width: 44px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s;
}
.h3-slide.active .h3-eyebrow-line { transform: scaleX(1); }

.h3-eyebrow-text {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
}
.h3-slide.active .h3-eyebrow-text { opacity: 1; transform: translateX(0); }

/* ══ HEADLINE ══ */
.h3-title {
  margin-bottom: 28px;
}
.h3-word {
  display: block;
  overflow: hidden;
  line-height: 1.05;
}
.h3-word-inner {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(32px, 4.8vw, 80px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  color: #fff;
  transform: translateY(120%);
  transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.h3-word:nth-child(1) .h3-word-inner { transition-delay: 0.15s; }
.h3-word:nth-child(2) .h3-word-inner { transition-delay: 0.25s; }
.h3-word:nth-child(3) .h3-word-inner { transition-delay: 0.35s; }
.h3-slide.active .h3-word-inner { transform: translateY(0); }

/* Exit state */
.h3-slide.h3-exiting .h3-word-inner {
  transform: translateY(-120%);
  transition: transform 0.5s cubic-bezier(0.7,0,0.3,1);
}
.h3-slide.h3-exiting .h3-word:nth-child(1) .h3-word-inner { transition-delay: 0s; }
.h3-slide.h3-exiting .h3-word:nth-child(2) .h3-word-inner { transition-delay: 0.04s; }
.h3-slide.h3-exiting .h3-word:nth-child(3) .h3-word-inner { transition-delay: 0.08s; }

/* Accent word — gradient fill */
.h3-word.h3-accent .h3-word-inner {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 40%, var(--accent) 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: h3grad 5s ease-in-out infinite;
  font-weight: 800;
  filter: drop-shadow(0 0 30px rgba(71,181,255,0.15));
}
@keyframes h3grad {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ══ BODY TEXT ══ */
.h3-body {
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  color: var(--muted);
  line-height: 1.85;
  max-width: 480px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
}
.h3-slide.active .h3-body { opacity: 1; transform: translateY(0); }
.h3-slide.h3-exiting .h3-body { opacity: 0; transform: translateY(-10px); transition: opacity 0.3s ease, transform 0.3s ease; }

/* ══ TAG ══ */
.h3-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.55);
  margin-bottom: 36px;
  opacity: 0;
  transition: opacity 0.5s ease 0.72s;
}
.h3-slide.active .h3-tag { opacity: 1; }
.h3-slide.h3-exiting .h3-tag { opacity: 0; transition: opacity 0.2s ease; }

/* ══ BUTTONS ══ */
.h3-btns {
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease 0.82s, transform 0.5s ease 0.82s;
}
.h3-slide.active .h3-btns { opacity: 1; transform: translateY(0); }
.h3-slide.h3-exiting .h3-btns { opacity: 0; transform: translateY(-8px); transition: opacity 0.25s ease, transform 0.25s ease; }

.h3-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bg-deep);
  background: var(--accent);
  border: none;
  border-radius: 1px;
  padding: 15px 30px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
}
.h3-btn-p::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.h3-btn-p:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(71,181,255,0.35), 0 0 60px rgba(71,181,255,0.1);
}
.h3-btn-p:hover::before { transform: translateX(100%); }
.h3-btn-arr { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.h3-btn-p:hover .h3-btn-arr { transform: translateX(4px); }

.h3-btn-g {
  display: inline-flex;
  align-items: center;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.6);
  border: 1px solid rgba(244,246,248,0.12);
  border-radius: 1px;
  padding: 14px 28px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.h3-btn-g:hover {
  border-color: rgba(71,181,255,0.4);
  color: #fff;
  background: rgba(71,181,255,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(71,181,255,0.08);
}

/* ══ DOT NAV ══ */
.h3-nav {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 12;
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  animation: h3fadeIn 0.8s ease forwards 2.5s;
}
.h3-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.3);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  position: relative;
}
.h3-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.4);
  box-shadow: 0 0 12px rgba(71,181,255,0.4);
}
.h3-dot:hover:not(.active) {
  border-color: rgba(71,181,255,0.6);
  background: rgba(71,181,255,0.15);
}

/* ══ PHASE TABS ══ */
.h3-phases {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 11;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(71,181,255,0.1);
  opacity: 0;
  transform: translateY(100%);
  animation: h3slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards 2.2s;
}
@keyframes h3slideUp {
  to { opacity: 1; transform: translateY(0); }
}

.h3-phase {
  padding: 20px 24px;
  border-right: 1px solid rgba(71,181,255,0.06);
  cursor: pointer;
  position: relative;
  background: rgba(3,10,18,0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.3s ease;
  overflow: hidden;
}
.h3-phase:last-child { border-right: none; }
.h3-phase:hover { background: rgba(71,181,255,0.04); }
.h3-phase.active { background: rgba(71,181,255,0.06); }

/* Progress bar — glowing */
.h3-phase-prog {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(71,181,255,0.5), 0 0 20px rgba(71,181,255,0.2);
  transition: width 0.08s linear;
}

/* Active tab glow underneath progress */
.h3-phase.active::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40px;
  background: linear-gradient(180deg, rgba(71,181,255,0.06) 0%, transparent 100%);
  pointer-events: none;
}

.h3-phase-num {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.22em;
  color: var(--accent);
  opacity: 0.4;
  margin-bottom: 6px;
  transition: opacity 0.3s;
}
.h3-phase.active .h3-phase-num { opacity: 0.8; }

.h3-phase-name {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.35);
  transition: color 0.3s;
}
.h3-phase.active .h3-phase-name,
.h3-phase:hover .h3-phase-name { color: var(--text); }

/* ══ SCROLL INDICATOR ══ */
.h3-scroll {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: h3fadeIn 0.6s ease forwards 3s;
}
.h3-scroll-text {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.35);
}
.h3-scroll-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, rgba(71,181,255,0.5), transparent);
  animation: h3scrollPulse 2s ease-in-out infinite;
}
@keyframes h3scrollPulse { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.35);opacity:0.35} }

/* ══ VIGNETTES ══ */
.h3-vig-left {
  position: absolute;
  inset: 0;
  z-index: 6;
  background: linear-gradient(90deg, rgba(3,10,18,0.88) 0%, rgba(3,10,18,0.5) 35%, transparent 65%);
  pointer-events: none;
}
.h3-vig-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 35%;
  z-index: 6;
  background: linear-gradient(to top, rgba(3,10,18,0.9) 0%, transparent 100%);
  pointer-events: none;
}
.h3-vig-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 20%;
  z-index: 6;
  background: linear-gradient(to bottom, rgba(3,10,18,0.4) 0%, transparent 100%);
  pointer-events: none;
}

/* ══ KEYFRAMES ══ */
@keyframes h3fadeIn { to { opacity: 1; } }
@keyframes h3spinSlow { to { transform: rotate(360deg); } }

/* ══ RESPONSIVE ══ */
@media (max-width: 480px) {
  .h3-content { width: 90vw; max-width: 90vw; }
  .h3-word-inner { font-size: clamp(28px, 9vw, 44px) !important; }
  .h3-bignum { display: none; }
  .h3-nav { display: none; }
  .h3-shapes { display: none; }
  .h3-phases { grid-template-columns: repeat(2, 1fr); }
  .h3-btns { flex-direction: column; align-items: flex-start; }
  .h3-corner.bl, .h3-corner.br { bottom: 180px; }
  .h3-scroll { bottom: 185px; }
}
@media (min-width: 481px) and (max-width: 767px) {
  .h3-content { width: 85vw; max-width: 85vw; }
  .h3-word-inner { font-size: clamp(28px, 7vw, 52px) !important; }
  .h3-bignum { display: none; }
  .h3-nav { display: none; }
  .h3-shapes { opacity: 0.4; }
  .h3-phases { grid-template-columns: repeat(2, 1fr); }
  .h3-corner.bl, .h3-corner.br { bottom: 180px; }
  .h3-scroll { bottom: 185px; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .h3-content { width: 62vw; max-width: 62vw; }
  .h3-word-inner { font-size: clamp(28px, 5.5vw, 60px) !important; }
  .h3-bignum { opacity: 0.5; }
  .h3-nav { display: none; }
}
@media (min-width: 1024px) and (max-width: 1439px) {
  .h3-content { width: 48vw; }
  .h3-word-inner { font-size: clamp(28px, 4.2vw, 66px) !important; }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  .h3-content { width: 44vw; max-width: 820px; }
  .h3-word-inner { font-size: clamp(28px, 3.8vw, 76px) !important; }
  .h3-body { font-size: 18px; }
}
@media (min-width: 2560px) {
  .h3-content { width: 40vw; max-width: 1000px; }
  .h3-word-inner { font-size: clamp(28px, 3.2vw, 96px) !important; }
  .h3-body { font-size: 20px; }
  .h3-phase { padding: 24px 28px; }
  .h3-phase-name { font-size: 14px; }
  .h3-btn-p, .h3-btn-g { font-size: 12px; padding: 18px 36px; }
}
</style>

<section class="h3" id="h3Root">
  <!-- Gradient mesh + energy nodes -->
  <div class="h3-mesh" id="h3Mesh">
    <div class="h3-mesh-layer h3-mesh-1"></div>
    <div class="h3-mesh-layer h3-mesh-2"></div>
    <div class="h3-mesh-layer h3-mesh-3"></div>
    <div class="h3-mesh-layer h3-mesh-4"></div>
    <div class="h3-node h3-node-1"></div>
    <div class="h3-node h3-node-2"></div>
    <div class="h3-node h3-node-3"></div>
    <div class="h3-node h3-node-4"></div>
    <div class="h3-node h3-node-5"></div>
  </div>

  <!-- Grid -->
  <div class="h3-grid"></div>

  <!-- Grain -->
  <div class="h3-grain">
    <svg class="h3-grain-svg" xmlns="http://www.w3.org/2000/svg">
      <filter id="h3grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#h3grain)"/>
    </svg>
  </div>

  <!-- Floating shapes -->
  <div class="h3-shapes" id="h3Shapes">
    <div class="h3-shape h3-shape-1"></div>
    <div class="h3-shape h3-shape-2"></div>
    <div class="h3-shape h3-shape-3"></div>
    <div class="h3-shape h3-shape-4"></div>
    <div class="h3-shape h3-shape-5"></div>
    <div class="h3-shape h3-shape-6"></div>
  </div>

  <!-- Vignettes -->
  <div class="h3-vig-left"></div>
  <div class="h3-vig-bottom"></div>
  <div class="h3-vig-top"></div>

  <!-- Giant number -->
  <div class="h3-bignum" id="h3Bignum">
    <span class="h3-bignum-text" id="h3BignumText">01</span>
  </div>

  <!-- Cursor glow -->
  <div class="h3-glow" id="h3Glow"></div>

  <!-- Scan line -->
  <div class="h3-scanline"></div>

  <!-- Corner marks -->
  <div class="h3-corner tl"></div>
  <div class="h3-corner tr"></div>
  <div class="h3-corner bl"></div>
  <div class="h3-corner br"></div>

  <!-- SLIDES -->
  <div class="h3-slides">

    <div class="h3-slide active" data-slide="0">
      <div class="h3-content">
        <div class="h3-eyebrow">
          <span class="h3-eyebrow-line"></span>
          <span class="h3-eyebrow-text">Human-Led, Digitally Enabled</span>
        </div>
        <h1 class="h3-title">
          <span class="h3-word"><span class="h3-word-inner">Infrastructure,</span></span>
          <span class="h3-word h3-accent"><span class="h3-word-inner">Thought</span></span>
          <span class="h3-word"><span class="h3-word-inner">Through.</span></span>
        </h1>
        <p class="h3-body">We help owners and delivery teams structure information and systems so projects move from design to operations with clarity and control.</p>
        <p class="h3-tag">Strategic digital engineering & information management</p>
        <div class="h3-btns">
          <a href="/solutions" class="h3-btn-p">Discover Our Solutions <span class="h3-btn-arr">&rarr;</span></a>
          <a href="/contact" class="h3-btn-g">Contact Us</a>
        </div>
      </div>
    </div>

    <div class="h3-slide" data-slide="1">
      <div class="h3-content">
        <div class="h3-eyebrow">
          <span class="h3-eyebrow-line"></span>
          <span class="h3-eyebrow-text">BIM & Digital Delivery</span>
        </div>
        <h1 class="h3-title">
          <span class="h3-word"><span class="h3-word-inner">Data That</span></span>
          <span class="h3-word h3-accent"><span class="h3-word-inner">Builds</span></span>
          <span class="h3-word"><span class="h3-word-inner">Certainty.</span></span>
        </h1>
        <p class="h3-body">55+ years of combined expertise across Canada, the United States, and international markets — delivering $50B+ in assets with precision-engineered digital workflows.</p>
        <p class="h3-tag">ISO 19650 &middot; BIM Standards &middot; Digital Twin</p>
        <div class="h3-btns">
          <a href="/solutions" class="h3-btn-p">Our Solutions <span class="h3-btn-arr">&rarr;</span></a>
          <a href="/about" class="h3-btn-g">About Us</a>
        </div>
      </div>
    </div>

    <div class="h3-slide" data-slide="2">
      <div class="h3-content">
        <div class="h3-eyebrow">
          <span class="h3-eyebrow-line"></span>
          <span class="h3-eyebrow-text">From Field to Boardroom</span>
        </div>
        <h1 class="h3-title">
          <span class="h3-word"><span class="h3-word-inner">Every</span></span>
          <span class="h3-word"><span class="h3-word-inner">Decision</span></span>
          <span class="h3-word h3-accent"><span class="h3-word-inner">Informed.</span></span>
        </h1>
        <p class="h3-body">We design controlled digital ecosystems that align with enterprise culture — transforming complex construction data into decisive intelligence at every project phase.</p>
        <p class="h3-tag">Strategy &middot; Structure &middot; Intelligence &middot; Execution</p>
        <div class="h3-btns">
          <a href="/industries" class="h3-btn-p">Who We Support <span class="h3-btn-arr">&rarr;</span></a>
          <a href="/contact" class="h3-btn-g">Get In Touch</a>
        </div>
      </div>
    </div>

    <div class="h3-slide" data-slide="3">
      <div class="h3-content">
        <div class="h3-eyebrow">
          <span class="h3-eyebrow-line"></span>
          <span class="h3-eyebrow-text">Qu&eacute;bec-Based &middot; Canada &middot; International</span>
        </div>
        <h1 class="h3-title">
          <span class="h3-word"><span class="h3-word-inner">Built For</span></span>
          <span class="h3-word h3-accent"><span class="h3-word-inner">Complex</span></span>
          <span class="h3-word"><span class="h3-word-inner">Programmes.</span></span>
        </h1>
        <p class="h3-body">From P3 infrastructure to institutional campuses — we deliver the BIM governance, data architecture, and real-time intelligence your programme demands.</p>
        <p class="h3-tag">DBB &middot; DB &middot; PPP/P3 &middot; CM &middot; IPD</p>
        <div class="h3-btns">
          <a href="/industries" class="h3-btn-p">Industries We Serve <span class="h3-btn-arr">&rarr;</span></a>
          <a href="/contact" class="h3-btn-g">Start A Conversation</a>
        </div>
      </div>
    </div>

  </div>

  <!-- Dot nav -->
  <div class="h3-nav" id="h3Nav">
    <div class="h3-dot active" data-i="0"></div>
    <div class="h3-dot" data-i="1"></div>
    <div class="h3-dot" data-i="2"></div>
    <div class="h3-dot" data-i="3"></div>
  </div>

  <!-- Phase tabs -->
  <div class="h3-phases">
    <div class="h3-phase active" data-i="0">
      <div class="h3-phase-prog"></div>
      <span class="h3-phase-num">01</span>
      <span class="h3-phase-name">Strategy</span>
    </div>
    <div class="h3-phase" data-i="1">
      <div class="h3-phase-prog"></div>
      <span class="h3-phase-num">02</span>
      <span class="h3-phase-name">Design</span>
    </div>
    <div class="h3-phase" data-i="2">
      <div class="h3-phase-prog"></div>
      <span class="h3-phase-num">03</span>
      <span class="h3-phase-name">Construction</span>
    </div>
    <div class="h3-phase" data-i="3">
      <div class="h3-phase-prog"></div>
      <span class="h3-phase-num">04</span>
      <span class="h3-phase-name">Operations & Maintenance</span>
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="h3-scroll">
    <span class="h3-scroll-text">Scroll</span>
    <div class="h3-scroll-line"></div>
  </div>

</section>`

const heroScript = `(function(){
'use strict';

var root = document.getElementById('h3Root');
if(!root) return;

/* ══ MOUSE PARALLAX + CURSOR GLOW ══ */
var mesh = document.getElementById('h3Mesh');
var shapes = document.getElementById('h3Shapes');
var bignum = document.getElementById('h3Bignum');
var glow = document.getElementById('h3Glow');

root.addEventListener('mouseenter', function(){ root.classList.add('h3-mouse-active'); });
root.addEventListener('mouseleave', function(){ root.classList.remove('h3-mouse-active'); });

root.addEventListener('mousemove', function(e){
  var rect = root.getBoundingClientRect();
  var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

  if(mesh) mesh.style.transform = 'translate(' + (x * 8) + 'px,' + (y * 6) + 'px)';
  if(shapes) shapes.style.transform = 'translate(' + (x * 18) + 'px,' + (y * 14) + 'px)';
  if(bignum) bignum.style.transform = 'translateY(-55%) translate(' + (x * 12) + 'px,' + (y * 8) + 'px)';

  if(glow){
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
  }
});

/* ══ SLIDER LOGIC ══ */
var DURATION = 6000;
var current = 0;
var slides = document.querySelectorAll('.h3-slide');
var dots = document.querySelectorAll('.h3-dot');
var phases = document.querySelectorAll('.h3-phase');
var progs = document.querySelectorAll('.h3-phase-prog');
var bignumText = document.getElementById('h3BignumText');
var total = slides.length;
var progStart = null;
var animId = null;
var transitioning = false;

function goTo(i){
  if(transitioning) return;
  var next = (i + total) % total;
  if(next === current) return;
  transitioning = true;

  /* Exit current slide */
  slides[current].classList.add('h3-exiting');
  dots[current].classList.remove('active');
  phases[current].classList.remove('active');
  progs[current].style.width = '0%';

  /* Animate number out then in */
  if(bignumText){
    bignumText.classList.add('h3-num-exit');
    setTimeout(function(){
      bignumText.textContent = String(next + 1).padStart(2, '0');
      bignumText.classList.remove('h3-num-exit');
      bignumText.classList.add('h3-num-enter');
      setTimeout(function(){
        bignumText.classList.remove('h3-num-enter');
      }, 50);
    }, 350);
  }

  /* After exit animation, swap */
  setTimeout(function(){
    slides[current].classList.remove('active', 'h3-exiting');
    current = next;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    phases[current].classList.add('active');
    transitioning = false;

    progStart = null;
    cancelAnimationFrame(animId);
    animProgress();
  }, 500);
}

function animProgress(){
  animId = requestAnimationFrame(function(ts){
    if(!progStart) progStart = ts;
    var pct = Math.min((ts - progStart) / DURATION, 1) * 100;
    progs[current].style.width = pct + '%';
    if(pct < 100) animProgress();
    else goTo(current + 1);
  });
}

/* Dot clicks */
dots.forEach(function(d){
  d.addEventListener('click', function(){
    var idx = parseInt(d.getAttribute('data-i'));
    if(idx !== current) goTo(idx);
  });
});

/* Phase clicks */
phases.forEach(function(p){
  p.addEventListener('click', function(){
    var idx = parseInt(p.getAttribute('data-i'));
    if(idx !== current) goTo(idx);
  });
});

/* Keyboard nav */
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight') goTo(current + 1);
  if(e.key === 'ArrowLeft') goTo(current - 1);
});

/* Start progress */
animProgress();

}());`

export default function HeroSlider() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(heroScript)()
      } catch(e) {
        console.error('Hero script error:', e)
      }
    }, 100)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: heroHtml }}
    />
  )
}
