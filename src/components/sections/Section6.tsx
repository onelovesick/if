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
  padding: clamp(64px,7vw,120px) clamp(24px,5%,96px);
}

.esk-wrap {
  position: relative; z-index: 1;
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 0;
  align-items: center;
}

/* ══ LEFT: Video ══ */
.esk-video-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -60px 0;
  margin-left: clamp(-120px, -8vw, -40px);
  overflow: visible;
}

.esk-video {
  width: 100%;
  display: block;
  -webkit-mask-image: radial-gradient(
    ellipse 62% 58% at 48% 50%,
    black 30%,
    rgba(0,0,0,0.7) 50%,
    rgba(0,0,0,0.25) 70%,
    rgba(0,0,0,0.05) 85%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 62% 58% at 48% 50%,
    black 30%,
    rgba(0,0,0,0.7) 50%,
    rgba(0,0,0,0.25) 70%,
    rgba(0,0,0,0.05) 85%,
    transparent 100%
  );
}

/* Edge feathering overlay — dark fog around perimeter */
.esk-video-col::after {
  content: '';
  position: absolute; inset: -20px;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(
      ellipse 55% 50% at 48% 50%,
      transparent 35%,
      rgba(6,14,24,0.3) 55%,
      rgba(6,14,24,0.7) 72%,
      #060e18 90%
    );
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
  margin-bottom: 28px; max-width: 460px;
}

/* ══ Stakeholder list ══ */
.esk-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(71,181,255,0.1);
}

.esk-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0 10px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(71,181,255,0.06);
  cursor: default;
  position: relative;
  transition: background 0.3s;
}
.esk-item:hover {
  background: rgba(71,181,255,0.025);
}

/* Left accent on hover */
.esk-item::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: var(--accent);
  transform: scaleY(0); transform-origin: bottom;
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
}
.esk-item:hover::before { transform: scaleY(1); }

.esk-item-num {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.12em; font-weight: 500;
  color: var(--accent); opacity: 0.4;
  padding-top: 3px; text-align: center;
  transition: opacity 0.3s;
}
.esk-item:hover .esk-item-num { opacity: 1; }

.esk-item-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(13px,0.95vw,15px);
  font-weight: 800; text-transform: uppercase;
  color: var(--text); letter-spacing: 0;
  line-height: 1.2; margin-bottom: 2px;
  transition: color 0.25s;
}
.esk-item:hover .esk-item-label { color: var(--accent); }

.esk-item-desc {
  font-size: clamp(11px,0.8vw,12.5px);
  color: rgba(147,177,200,0.45);
  line-height: 1.55;
}

/* Item scroll entrance */
.esk-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s ease, transform 1s cubic-bezier(0.22,1,0.36,1),
    background 0.3s;
}
.esk-item.esk-in { opacity: 1; transform: translateY(0); }
.esk-item:nth-child(1) { transition-delay: 0.05s; }
.esk-item:nth-child(2) { transition-delay: 0.12s; }
.esk-item:nth-child(3) { transition-delay: 0.19s; }
.esk-item:nth-child(4) { transition-delay: 0.26s; }
.esk-item:nth-child(5) { transition-delay: 0.33s; }
.esk-item:nth-child(6) { transition-delay: 0.40s; }

.esk-footer {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(71,181,255,0.25); margin-top: 24px;
}

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .esk-wrap { grid-template-columns: 1fr; }
  .esk-video-col { margin: 0; }
}
@media (min-width: 1800px) {
  .esk-wrap { max-width: 1700px; }
  .esk-headline { font-size: clamp(40px,3.2vw,56px); }
}
</style>

<section class="esk" id="eskRoot">
  <div class="esk-wrap">

    <!-- Left: Video -->
    <div class="esk-video-col" id="eskVideoCol">
      <video class="esk-video" autoplay muted loop playsinline>
        <source src="/videos/vidwho.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- Right: Content -->
    <div class="esk-right" id="eskRight">
      <div class="esk-eyebrow">Who We Serve</div>
      <h2 class="esk-headline">Empowering Every <span class="esk-hl-accent">Stakeholder</span></h2>
      <p class="esk-body">From planning to post-construction, we align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.</p>

      <div class="esk-list" id="eskList">

        <div class="esk-item">
          <span class="esk-item-num">01</span>
          <div>
            <div class="esk-item-label">Contractors</div>
            <p class="esk-item-desc">General contractors, subcontractors, and field teams executing digital work packages.</p>
          </div>
        </div>

        <div class="esk-item">
          <span class="esk-item-num">02</span>
          <div>
            <div class="esk-item-label">Architects</div>
            <p class="esk-item-desc">Design teams producing coordinated BIM models and design documentation.</p>
          </div>
        </div>

        <div class="esk-item">
          <span class="esk-item-num">03</span>
          <div>
            <div class="esk-item-label">Government Agencies</div>
            <p class="esk-item-desc">Public owners, regulatory bodies, and permitting authorities.</p>
          </div>
        </div>

        <div class="esk-item">
          <span class="esk-item-num">04</span>
          <div>
            <div class="esk-item-label">Consultants &amp; PMs</div>
            <p class="esk-item-desc">Project managers, cost consultants, and digital delivery advisors.</p>
          </div>
        </div>

        <div class="esk-item">
          <span class="esk-item-num">05</span>
          <div>
            <div class="esk-item-label">Engineers</div>
            <p class="esk-item-desc">Structural, mechanical, electrical, and civil engineering disciplines.</p>
          </div>
        </div>

        <div class="esk-item">
          <span class="esk-item-num">06</span>
          <div>
            <div class="esk-item-label">Owners &amp; Developers</div>
            <p class="esk-item-desc">Asset owners, developers, and investment groups managing capital programmes.</p>
          </div>
        </div>

      </div>

      <div class="esk-footer">6 Stakeholder Groups · One Digital Ecosystem</div>
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
var items = Array.from(root.querySelectorAll('.esk-item'));

var targets = [];
if (videoCol) targets.push(videoCol);
if (right) targets.push(right);
items.forEach(function(i){ targets.push(i); });

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
