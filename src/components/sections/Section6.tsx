"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.esk *, .esk *::before, .esk *::after { box-sizing: border-box; margin: 0; padding: 0; }

.esk {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #060e18;
  --surface: #0c1622;
  --text: #F0F4F7;
  --muted: #7a9bb5;
  --mono: 'DM Mono', monospace;

  position: relative;
  width: 100%;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  padding: clamp(56px,6vw,96px) clamp(24px,5%,96px);
}

/* Subtle radial glow */
.esk::after {
  content: '';
  position: absolute; top: 30%; left: 50%;
  width: 80%; height: 60%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(71,181,255,0.04) 0%, transparent 60%);
  pointer-events: none;
}

.esk-wrap {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.esk-header {
  text-align: center;
  margin-bottom: clamp(48px,5vw,72px);
  opacity: 0; transform: translateY(24px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.esk-header.esk-in { opacity: 1; transform: translateY(0); }

.esk-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
}
.esk-eyebrow::before, .esk-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.esk-headline {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); line-height: 1;
  letter-spacing: -0.03em; margin-bottom: 20px;
}
.esk-hl-accent { color: var(--accent); }

.esk-intro {
  font-size: clamp(14px,1.1vw,17px);
  color: var(--muted); line-height: 1.8;
  max-width: 620px; margin: 0 auto;
}

/* ── Hub + Grid Layout ── */
.esk-system {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto auto auto;
  gap: 16px;
  align-items: center;
  justify-items: center;
}

/* ── Central Hub ── */
.esk-hub {
  grid-column: 2; grid-row: 1 / 4;
  width: 160px; height: 160px;
  border-radius: 50%;
  border: 1.5px solid rgba(71,181,255,0.2);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 6px;
  position: relative;
  opacity: 0; transform: scale(0.8);
  transition: opacity 1.2s ease 0.3s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s;
}
.esk-hub.esk-in { opacity: 1; transform: scale(1); }

/* Pulse ring */
.esk-hub::before {
  content: '';
  position: absolute; inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.1);
  animation: esk-pulse 3s ease-in-out infinite;
}
.esk-hub::after {
  content: '';
  position: absolute; inset: -28px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.05);
  animation: esk-pulse 3s ease-in-out infinite 1s;
}
@keyframes esk-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.06); opacity: 0.3; }
}

.esk-hub-label {
  font-family: 'Inter Tight', sans-serif;
  font-size: 11px; font-weight: 900;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--accent);
}
.esk-hub-sub {
  font-family: var(--mono);
  font-size: 8px; letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.4);
}
/* Hub inner glow */
.esk-hub-glow {
  position: absolute; inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71,181,255,0.08) 0%, transparent 70%);
}

/* ── Stakeholder Cards ── */
.esk-card {
  width: 100%;
  max-width: 380px;
  background: var(--surface);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 8px;
  padding: clamp(20px,2vw,28px);
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0; transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1),
    border-color 0.35s, box-shadow 0.35s, background 0.35s;
}
.esk-card.esk-in { opacity: 1; transform: translateY(0); }

/* Stagger */
.esk-card:nth-child(1) { transition-delay: 0.05s; }
.esk-card:nth-child(2) { transition-delay: 0.1s; }
.esk-card:nth-child(3) { transition-delay: 0.15s; }
.esk-card:nth-child(5) { transition-delay: 0.2s; }
.esk-card:nth-child(6) { transition-delay: 0.25s; }
.esk-card:nth-child(7) { transition-delay: 0.3s; }

/* Accent top bar */
.esk-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.esk-card:hover::before { transform: scaleX(1); }

.esk-card:hover {
  border-color: rgba(71,181,255,0.2);
  box-shadow: 0 8px 32px rgba(71,181,255,0.06), 0 0 0 1px rgba(71,181,255,0.08);
  background: #0e1a28;
}

/* Connection line to hub */
.esk-card::after {
  content: '';
  position: absolute;
  top: 50%; width: 40px; height: 1px;
  background: linear-gradient(90deg, rgba(71,181,255,0.15), rgba(71,181,255,0.03));
  transition: background 0.3s;
}
.esk-card.esk-left::after { right: -40px; }
.esk-card.esk-right-card::after { left: -40px; background: linear-gradient(90deg, rgba(71,181,255,0.03), rgba(71,181,255,0.15)); }
.esk-card:hover::after {
  background: linear-gradient(90deg, rgba(71,181,255,0.4), rgba(71,181,255,0.08));
}
.esk-card.esk-right-card:hover::after {
  background: linear-gradient(90deg, rgba(71,181,255,0.08), rgba(71,181,255,0.4));
}

.esk-card-head {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 10px;
}

.esk-card-num {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.04em; font-weight: 500;
  background: rgba(71,181,255,0.08);
  color: var(--accent);
  border-radius: 6px;
  transition: background 0.3s;
}
.esk-card:hover .esk-card-num { background: rgba(71,181,255,0.15); }

.esk-card-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(15px,1.2vw,19px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); letter-spacing: -0.01em;
  transition: color 0.25s;
}
.esk-card:hover .esk-card-label { color: var(--accent); }

.esk-card-desc {
  font-size: clamp(12px,0.9vw,14px);
  color: var(--muted); line-height: 1.7;
  opacity: 0.7;
}

/* ── Connector dots (decorative) ── */
.esk-dot-line {
  display: flex; align-items: center; gap: 6px;
  padding: 0 8px;
}
.esk-dot-line span {
  width: 3px; height: 3px; border-radius: 50%;
  background: rgba(71,181,255,0.15);
}

/* ── Bottom ── */
.esk-bottom {
  text-align: center;
  margin-top: clamp(40px,4vw,64px);
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s;
}
.esk-bottom.esk-in { opacity: 1; transform: translateY(0); }

.esk-bottom-text {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(71,181,255,0.3);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .esk-system {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .esk-hub { grid-column: 1; grid-row: auto; margin: 20px 0; }
  .esk-card::after { display: none; }
  .esk-dot-line { display: none; }
}
@media (min-width: 1800px) {
  .esk-wrap { max-width: 1600px; }
  .esk-hub { width: 180px; height: 180px; }
}
</style>

<section class="esk" id="eskRoot" aria-labelledby="eskHeadline">
  <div class="esk-wrap">

    <!-- Header -->
    <header class="esk-header" id="eskHeader">
      <div class="esk-eyebrow">Who We Serve</div>
      <h2 class="esk-headline" id="eskHeadline">Empowering Every <span class="esk-hl-accent">Stakeholder</span></h2>
      <p class="esk-intro">From planning to post-construction, we align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.</p>
    </header>

    <!-- System Layout: Left cards | Hub | Right cards -->
    <div class="esk-system">

      <!-- Left column cards -->
      <div style="display:flex; flex-direction:column; gap:16px; width:100%; align-items:flex-end;">
        <div class="esk-card esk-left">
          <div class="esk-card-head">
            <span class="esk-card-num">01</span>
            <span class="esk-card-label">Contractors</span>
          </div>
          <p class="esk-card-desc">General contractors, subcontractors, and field teams executing digital work packages with structured data.</p>
        </div>
        <div class="esk-card esk-left">
          <div class="esk-card-head">
            <span class="esk-card-num">02</span>
            <span class="esk-card-label">Architects</span>
          </div>
          <p class="esk-card-desc">Design teams producing coordinated BIM models and design documentation across all phases.</p>
        </div>
        <div class="esk-card esk-left">
          <div class="esk-card-head">
            <span class="esk-card-num">03</span>
            <span class="esk-card-label">Government Agencies</span>
          </div>
          <p class="esk-card-desc">Public owners, regulatory bodies, and permitting authorities requiring compliance and transparency.</p>
        </div>
      </div>

      <!-- Central Hub -->
      <div class="esk-hub" id="eskHub">
        <div class="esk-hub-glow"></div>
        <span class="esk-hub-label">Infraforma</span>
        <span class="esk-hub-sub">Digital Hub</span>
      </div>

      <!-- Right column cards -->
      <div style="display:flex; flex-direction:column; gap:16px; width:100%; align-items:flex-start;">
        <div class="esk-card esk-right-card">
          <div class="esk-card-head">
            <span class="esk-card-num">04</span>
            <span class="esk-card-label">Consultants & PMs</span>
          </div>
          <p class="esk-card-desc">Project managers, cost consultants, and digital delivery advisors coordinating complex programmes.</p>
        </div>
        <div class="esk-card esk-right-card">
          <div class="esk-card-head">
            <span class="esk-card-num">05</span>
            <span class="esk-card-label">Engineers</span>
          </div>
          <p class="esk-card-desc">Structural, mechanical, electrical, and civil engineering disciplines producing technical deliverables.</p>
        </div>
        <div class="esk-card esk-right-card">
          <div class="esk-card-head">
            <span class="esk-card-num">06</span>
            <span class="esk-card-label">Owners & Developers</span>
          </div>
          <p class="esk-card-desc">Asset owners, developers, and investment groups managing capital programmes and long-term operations.</p>
        </div>
      </div>

    </div>

    <!-- Bottom -->
    <div class="esk-bottom" id="eskBottom">
      <span class="esk-bottom-text">6 Stakeholder Groups · One Digital Ecosystem</span>
    </div>

  </div>
</section>`

const sectionScript = `
(function(){
'use strict';
var root = document.getElementById('eskRoot');
if (!root) return;

var targets = [
  document.getElementById('eskHeader'),
  document.getElementById('eskHub'),
  document.getElementById('eskBottom')
].concat(Array.from(root.querySelectorAll('.esk-card')));

var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){
      e.target.classList.add('esk-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

targets.forEach(function(t){ if (t) io.observe(t); });
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
