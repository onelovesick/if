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

/* Background video */
.esk-bgvid {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}
/* Dark overlay on video */
.esk-bgdim {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(6,14,24,0.7) 0%, rgba(6,14,24,0.4) 50%, rgba(6,14,24,0.8) 100%);
  pointer-events: none;
  z-index: 0;
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

/* ── 3x2 Grid ── */
.esk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Card ── */
.esk-card {
  background: rgba(12,22,34,0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 10px;
  padding: clamp(28px,2.5vw,36px);
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(40px) scale(0.94);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1),
    border-color 0.35s, box-shadow 0.4s, background 0.35s;
}
.esk-card.esk-in { opacity: 1; transform: translateY(0) scale(1); }

/* Staggered unique entrances */
.esk-card:nth-child(1) { transform: translateY(50px) translateX(-16px) scale(0.93) rotate(-0.6deg); transition-delay: 0s; }
.esk-card:nth-child(2) { transform: translateY(55px) scale(0.92); transition-delay: 0.08s; }
.esk-card:nth-child(3) { transform: translateY(50px) translateX(16px) scale(0.93) rotate(0.6deg); transition-delay: 0.16s; }
.esk-card:nth-child(4) { transform: translateY(50px) translateX(-16px) scale(0.93) rotate(-0.6deg); transition-delay: 0.24s; }
.esk-card:nth-child(5) { transform: translateY(55px) scale(0.92); transition-delay: 0.32s; }
.esk-card:nth-child(6) { transform: translateY(50px) translateX(16px) scale(0.93) rotate(0.6deg); transition-delay: 0.4s; }
.esk-card:nth-child(1).esk-in,
.esk-card:nth-child(2).esk-in,
.esk-card:nth-child(3).esk-in,
.esk-card:nth-child(4).esk-in,
.esk-card:nth-child(5).esk-in,
.esk-card:nth-child(6).esk-in { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }

/* Top accent line */
.esk-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.esk-card:hover::before { transform: scaleX(1); }

/* Hover glow */
.esk-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 80px;
  background: linear-gradient(180deg, rgba(71,181,255,0.05) 0%, transparent 100%);
  opacity: 0; transition: opacity 0.35s;
  pointer-events: none;
}
.esk-card:hover::after { opacity: 1; }

.esk-card:hover {
  border-color: rgba(71,181,255,0.22);
  box-shadow: 0 12px 40px rgba(71,181,255,0.06), 0 0 0 1px rgba(71,181,255,0.06);
  background: rgba(14,26,40,0.75);
}

/* Number */
.esk-card-num {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.14em; font-weight: 500;
  color: var(--accent); opacity: 0.5;
  margin-bottom: 20px;
  display: block;
  transition: opacity 0.3s;
}
.esk-card:hover .esk-card-num { opacity: 1; }

/* Label */
.esk-card-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(17px,1.4vw,22px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); letter-spacing: -0.01em;
  line-height: 1.1; margin-bottom: 14px;
  transition: color 0.3s;
}
.esk-card:hover .esk-card-label { color: var(--accent); }

/* Description */
.esk-card-desc {
  font-size: clamp(13px,0.95vw,15px);
  color: var(--muted); line-height: 1.75;
  opacity: 0.65;
  transition: opacity 0.3s;
}
.esk-card:hover .esk-card-desc { opacity: 0.85; }

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
  .esk-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .esk-grid { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .esk-wrap { max-width: 1600px; }
  .esk-grid { max-width: 1600px; gap: 18px; }
  .esk-card-label { font-size: 22px; }
}
@media (min-width: 2400px) {
  .esk-grid { max-width: 1920px; }
}
</style>

<section class="esk" id="eskRoot" aria-labelledby="eskHeadline">
  <video class="esk-bgvid" autoplay muted loop playsinline>
    <source src="/videos/stakeholder-bg.mp4" type="video/mp4" />
  </video>
  <div class="esk-bgdim"></div>
  <div class="esk-wrap">

    <!-- Header -->
    <header class="esk-header" id="eskHeader">
      <div class="esk-eyebrow">Who We Serve</div>
      <h2 class="esk-headline" id="eskHeadline">Empowering Every <span class="esk-hl-accent">Stakeholder</span></h2>
      <p class="esk-intro">From planning to post-construction, we align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.</p>
    </header>

    <!-- 3x2 Grid -->
    <div class="esk-grid">

      <div class="esk-card">
        <span class="esk-card-num">01</span>
        <div class="esk-card-label">Contractors</div>
        <p class="esk-card-desc">General contractors, subcontractors, and field teams executing digital work packages with structured data.</p>
      </div>

      <div class="esk-card">
        <span class="esk-card-num">02</span>
        <div class="esk-card-label">Architects</div>
        <p class="esk-card-desc">Design teams producing coordinated BIM models and design documentation across all project phases.</p>
      </div>

      <div class="esk-card">
        <span class="esk-card-num">03</span>
        <div class="esk-card-label">Government Agencies</div>
        <p class="esk-card-desc">Public owners, regulatory bodies, and permitting authorities requiring compliance and transparency.</p>
      </div>

      <div class="esk-card">
        <span class="esk-card-num">04</span>
        <div class="esk-card-label">Consultants &amp; PMs</div>
        <p class="esk-card-desc">Project managers, cost consultants, and digital delivery advisors coordinating complex programmes.</p>
      </div>

      <div class="esk-card">
        <span class="esk-card-num">05</span>
        <div class="esk-card-label">Engineers</div>
        <p class="esk-card-desc">Structural, mechanical, electrical, and civil engineering disciplines producing technical deliverables.</p>
      </div>

      <div class="esk-card">
        <span class="esk-card-num">06</span>
        <div class="esk-card-label">Owners &amp; Developers</div>
        <p class="esk-card-desc">Asset owners, developers, and investment groups managing capital programmes and long-term operations.</p>
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
