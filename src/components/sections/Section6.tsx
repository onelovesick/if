"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.esk *, .esk *::before, .esk *::after { box-sizing: border-box; margin: 0; padding: 0; }

.esk {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #060e18;
  --text: #F0F4F7;
  --muted: #93b1c8;
  --mono: 'DM Mono', monospace;

  position: relative;
  width: 100%;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  padding: clamp(100px,12vw,200px) clamp(24px,5%,96px);
}

.esk-wrap {
  position: relative; z-index: 1;
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 58% 1fr;
  gap: clamp(24px,3vw,48px);
  align-items: center;
}

/* ══ LEFT: Video ══ */
.esk-video-shell {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  margin: -40px 0;
  margin-left: clamp(-140px, -10vw, -60px);
}

.esk-video {
  width: 100%;
  display: block;
  -webkit-mask-image: radial-gradient(
    ellipse 88% 78% at center,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 62%,
    rgba(0,0,0,0.92) 74%,
    rgba(0,0,0,0.55) 88%,
    rgba(0,0,0,0) 100%
  );
  mask-image: radial-gradient(
    ellipse 88% 78% at center,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 62%,
    rgba(0,0,0,0.92) 74%,
    rgba(0,0,0,0.55) 88%,
    rgba(0,0,0,0) 100%
  );
}

/* Side + top/bottom edge kill */
.esk-video-shell::before {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none; z-index: 2;
  background:
    linear-gradient(to right, #060e18 0%, transparent 14%, transparent 86%, #060e18 100%),
    linear-gradient(to bottom, #060e18 0%, transparent 14%, transparent 86%, #060e18 100%);
}

/* Radial fog overlay */
.esk-edge-overlay {
  position: absolute; inset: 0;
  pointer-events: none; z-index: 3;
  background: radial-gradient(
    ellipse 92% 82% at center,
    transparent 0%,
    transparent 64%,
    rgba(6,14,24,0.10) 76%,
    rgba(6,14,24,0.28) 86%,
    rgba(6,14,24,0.58) 93%,
    rgba(6,14,24,0.88) 98%,
    #060e18 100%
  );
}

/* Directional edge overlays */
.esk-edge-t {
  position: absolute; top: 0; left: 0; right: 0;
  height: 18%; pointer-events: none; z-index: 4;
  background: linear-gradient(to bottom, #060e18 0%, transparent 100%);
}
.esk-edge-b {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 18%; pointer-events: none; z-index: 4;
  background: linear-gradient(to top, #060e18 0%, transparent 100%);
}
.esk-edge-l {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 14%; pointer-events: none; z-index: 4;
  background: linear-gradient(to right, #060e18 0%, transparent 100%);
}
.esk-edge-r {
  position: absolute; top: 0; bottom: 0; right: 0;
  width: 14%; pointer-events: none; z-index: 4;
  background: linear-gradient(to left, #060e18 0%, transparent 100%);
}

/* Scroll reveal */
.esk-video-shell {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 1.4s ease, transform 1.8s cubic-bezier(0.16,1,0.3,1);
}
.esk-video-shell.esk-in {
  opacity: 1;
  transform: translateX(0);
}

/* Scroll reveal */
.esk-video-col {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 1.4s ease, transform 1.8s cubic-bezier(0.16,1,0.3,1);
}
.esk-video-col.esk-in {
  opacity: 1;
  transform: translateX(0);
}

/* ══ RIGHT: Content ══ */
.esk-right {
  display: flex;
  flex-direction: column;
  align-self: start;
  margin-top: -20px;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 1.4s ease 0.1s, transform 1.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
}
.esk-right.esk-in {
  opacity: 1;
  transform: translateX(0);
}

.esk-eyebrow {
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  display: flex; align-items: center; gap: 12px;
}
.esk-eyebrow::before {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.esk-headline {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(28px,3.2vw,48px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); line-height: 1.05;
  letter-spacing: -0.03em; margin-bottom: 18px;
}
.esk-hl-accent { color: var(--accent); }

.esk-body {
  font-size: clamp(13px,0.95vw,15px);
  color: var(--muted); line-height: 1.75;
  margin-bottom: 36px; max-width: 460px;
}

/* ══ Stakeholder grid ══ */
.esk-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.esk-card {
  background: rgba(12,22,34,0.5);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 8px;
  padding: 22px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
}
.esk-card:hover {
  border-color: rgba(71,181,255,0.2);
  background: rgba(14,26,40,0.7);
  box-shadow: 0 4px 20px rgba(71,181,255,0.04);
}

/* Top accent */
.esk-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.esk-card:hover::before { transform: scaleX(1); }

.esk-card-head {
  display: flex; align-items: center; gap: 10px;
}

.esk-card-num {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.1em; font-weight: 500;
  color: var(--accent); opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.3s;
}
.esk-card:hover .esk-card-num { opacity: 1; }

.esk-card-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(12px,0.9vw,14px);
  font-weight: 800; text-transform: uppercase;
  color: var(--text); letter-spacing: 0;
  line-height: 1.15;
  transition: color 0.25s;
}
.esk-card:hover .esk-card-label { color: var(--accent); }

.esk-card-desc {
  font-size: clamp(11px,0.78vw,12px);
  color: rgba(147,177,200,0.5);
  line-height: 1.6;
  margin-top: 8px;
}

/* Card scroll entrance */
.esk-card {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
  transition: opacity 1s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1),
    border-color 0.3s, background 0.3s, box-shadow 0.3s;
}
.esk-card.esk-in { opacity: 1; transform: translateY(0) scale(1); }
.esk-card:nth-child(1) { transition-delay: 0.05s; }
.esk-card:nth-child(2) { transition-delay: 0.1s; }
.esk-card:nth-child(3) { transition-delay: 0.15s; }
.esk-card:nth-child(4) { transition-delay: 0.2s; }
.esk-card:nth-child(5) { transition-delay: 0.25s; }
.esk-card:nth-child(6) { transition-delay: 0.3s; }

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .esk-wrap { grid-template-columns: 1fr; }
  .esk-video-shell { margin: 0; }
}
@media (min-width: 1800px) {
  .esk-wrap { max-width: 1700px; }
  .esk-headline { font-size: clamp(40px,3.2vw,56px); }
}
</style>

<section class="esk" id="eskRoot">
  <div class="esk-wrap">

    <!-- Left: Video -->
    <div class="esk-video-shell" id="eskVideoCol">
      <video class="esk-video" autoplay muted loop playsinline>
        <source src="/videos/vidwho.mp4" type="video/mp4" />
      </video>
      <div class="esk-edge-overlay"></div>
      <div class="esk-edge-t"></div>
      <div class="esk-edge-b"></div>
      <div class="esk-edge-l"></div>
      <div class="esk-edge-r"></div>
    </div>

    <!-- Right: Content -->
    <div class="esk-right" id="eskRight">
      <div class="esk-eyebrow">Who We Serve</div>
      <h2 class="esk-headline">Empowering Every <span class="esk-hl-accent">Stakeholder</span></h2>
      <p class="esk-body">We align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.</p>

      <div class="esk-grid" id="eskGrid">

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">01</span>
            <span class="esk-card-label">Contractors</span>
          </div>
          <p class="esk-card-desc">General contractors, subcontractors, and field teams executing digital work packages.</p>
        </div>

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">02</span>
            <span class="esk-card-label">Architects</span>
          </div>
          <p class="esk-card-desc">Design teams producing coordinated BIM models and design documentation.</p>
        </div>

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">03</span>
            <span class="esk-card-label">Government Agencies</span>
          </div>
          <p class="esk-card-desc">Public owners, regulatory bodies, and permitting authorities.</p>
        </div>

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">04</span>
            <span class="esk-card-label">Consultants &amp; PMs</span>
          </div>
          <p class="esk-card-desc">Project managers, cost consultants, and digital delivery advisors.</p>
        </div>

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">05</span>
            <span class="esk-card-label">Engineers</span>
          </div>
          <p class="esk-card-desc">Structural, mechanical, electrical, and civil engineering disciplines.</p>
        </div>

        <div class="esk-card">
          <div class="esk-card-head">
            <span class="esk-card-num">06</span>
            <span class="esk-card-label">Owners &amp; Developers</span>
          </div>
          <p class="esk-card-desc">Asset owners, developers, and investment groups managing capital programmes.</p>
        </div>

      </div>
    </div>

  </div>
</section>`

const sectionScript = `
(function(){
'use strict';
var root = document.getElementById('eskRoot');
if (!root) return;

var videoCol = document.getElementById('eskVideoCol');
var right = document.getElementById('eskRight');
var cards = Array.from(root.querySelectorAll('.esk-card'));

var targets = [];
if (videoCol) targets.push(videoCol);
if (right) targets.push(right);
cards.forEach(function(c){ targets.push(c); });

var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){
      e.target.classList.add('esk-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

targets.forEach(function(t){ io.observe(t); });
}());
`

export default function Section6() {
  useEffect(() => {
    setTimeout(() => {
      try {
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section6 script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
  )
}
