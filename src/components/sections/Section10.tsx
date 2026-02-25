"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
.prf-root {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.prf-root.prf-visible {
  opacity: 1;
  transform: translateY(0);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&amp;display=swap');

.prf-root *, .prf-root *::before, .prf-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.prf-root {
  --bg:      #1C1F23;
  --accent:  #47B5FF;
  --text:    #F4F6F8;
  --muted:   #7a9bb5;
  --border:  rgba(71,181,255,0.12);
  --border2: rgba(71,181,255,0.22);

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

.prf-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.022) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
  z-index: 0;
}

/* ══ ZONE 1 — STATS ══ */
.prf-stats {
  position: relative;
  z-index: 1;
  border-bottom: 1px solid var(--border);
  padding: 64px 5%;
}
.prf-stats::before {
  content: '';
  position: absolute;
  top: 0; left: 5%; right: 5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.35;
}

.prf-stats-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.prf-stat {
  padding: 0 40px 0 0;
  border-right: 1px solid var(--border);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.prf-stat:last-child { border-right: none; padding-right: 0; }
.prf-stat:not(:first-child) { padding-left: 40px; }
.prf-stat.prf-vis { opacity: 1; transform: translateY(0); }

.prf-stat-mark {
  width: 36px; height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 3px;
  margin-bottom: 20px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.prf-stat.prf-vis .prf-stat-mark { transform: scaleX(1); }

.prf-stat-number {
  font-family: 'Inter', sans-serif;
  font-size: clamp(52px, 5.2vw, 88px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ffffff 0%, #47B5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px;
  display: flex;
  align-items: baseline;
}
.prf-suffix {
  font-size: 0.38em;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: linear-gradient(135deg, #ffffff 0%, #47B5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: 3px;
}
.prf-count { display: inline-block; }

.prf-stat-label {
  font-size: clamp(13px, 1.1vw, 16px);
  font-weight: 700;
  color: var(--text);
  margin: 0 0 5px;
}
.prf-stat-sub {
  font-family: 'DM Mono', monospace;
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.05em;
  line-height: 1.6;
}

.prf-contract-bar {
  max-width: 1400px;
  margin: 44px auto 0;
  padding-top: 28px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s;
}
.prf-contract-bar.prf-vis { opacity: 1; transform: translateY(0); }

.prf-contract-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--muted);
  text-transform: uppercase;
  margin-right: 24px;
  flex-shrink: 0;
}
.prf-contract-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.prf-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--accent);
  border: 1px solid rgba(71,181,255,0.25);
  border-radius: 2px;
  padding: 5px 12px;
  background: rgba(71,181,255,0.05);
  text-transform: uppercase;
  transition: background 0.22s, border-color 0.22s, color 0.22s;
  cursor: default;
}
.prf-tag:hover { background: rgba(71,181,255,0.12); border-color: rgba(71,181,255,0.5); color: #fff; }

/* ══ ZONE 2 — WHO WE WORK WITH ══ */
.prf-who {
  position: relative;
  z-index: 1;
  padding: 48px 5% 52px;
}
.prf-who-inner { max-width: 1400px; margin: 0 auto; }

.prf-who-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 24px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.prf-who-header.prf-vis { opacity: 1; transform: translateY(0); }

.prf-who-left { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }

.prf-who-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;
}
.prf-who-eyebrow::before {
  content: '';
  width: 18px; height: 1px;
  background: var(--accent);
  flex-shrink: 0;
  display: block;
}

.prf-who-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(18px, 1.8vw, 28px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  white-space: nowrap;
}
.prf-who-title span {
  background: linear-gradient(135deg, #fff 0%, #47B5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.prf-who-desc {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 320px;
  text-align: right;
}

/* ── 6-item horizontal strip ── */
.prf-strip {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
  background: var(--border);
  gap: 1px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s;
}
.prf-strip.prf-vis { opacity: 1; transform: translateY(0); }

.prf-sitem {
  background: var(--bg);
  padding: 22px 18px 44px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  transition: background 0.28s ease;
  min-height: 160px;
}

/* Top accent sweep */
.prf-sitem::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 2px;
  background: var(--accent);
  transition: width 0.38s cubic-bezier(0.22,1,0.36,1);
  z-index: 2;
}
.prf-sitem:hover::before { width: 100%; }

/* Blue wash */
.prf-sitem::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(11,60,93,0.5) 0%, rgba(71,181,255,0.04) 100%);
  opacity: 0;
  transition: opacity 0.32s ease;
}
.prf-sitem:hover::after { opacity: 1; }
.prf-sitem:hover { background: #1a2028; }

.prf-sitem-num {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--accent);
  opacity: 0.5;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}
.prf-sitem-icon {
  font-size: 19px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
  line-height: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.prf-sitem:hover .prf-sitem-icon { transform: translateY(-3px) scale(1.1); }

.prf-sitem-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.9vw, 13px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  transition: color 0.22s ease;
}
.prf-sitem:hover .prf-sitem-title { color: #fff; }

/* Desc slides down on hover */
.prf-sitem-desc {
  font-size: 10.5px;
  color: var(--muted);
  line-height: 1.6;
  position: relative;
  z-index: 1;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  margin-top: 0;
  transition: max-height 0.36s ease, opacity 0.28s ease 0.05s, margin-top 0.3s ease;
}
.prf-sitem:hover .prf-sitem-desc {
  max-height: 80px;
  opacity: 1;
  margin-top: 8px;
}

.prf-sitem-arr {
  position: absolute;
  bottom: 14px; right: 14px;
  font-size: 13px;
  color: var(--accent);
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  z-index: 1;
}
.prf-sitem:hover .prf-sitem-arr { opacity: 1; transform: translate(0,0); }

/* ── Responsive ── */
@media (max-width: 1200px) {
  .prf-stats-inner { grid-template-columns: repeat(2,1fr); gap: 44px 0; }
  .prf-stat:nth-child(2) { border-right: none; }
  .prf-stat:nth-child(3) { padding-left: 0; border-right: 1px solid var(--border); }
  .prf-stat:nth-child(4) { border-right: none; }
  .prf-strip { grid-template-columns: repeat(3,1fr); }
}
@media (max-width: 760px) {
  .prf-stats { padding: 52px 6%; }
  .prf-stats-inner { grid-template-columns: 1fr 1fr; gap: 32px 0; }
  .prf-stat { padding: 0 16px 0 0 !important; }
  .prf-stat:not(:first-child) { padding-left: 16px !important; }
  .prf-stat:nth-child(2) { border-right: none; }
  .prf-stat:nth-child(3) { border-right: 1px solid var(--border); }
  .prf-stat-number { font-size: clamp(36px, 9vw, 56px); }
  .prf-who { padding: 40px 6% 44px; }
  .prf-who-header { flex-direction: column; align-items: flex-start; }
  .prf-who-left { flex-direction: column; align-items: flex-start; gap: 6px; }
  .prf-who-title { white-space: normal; }
  .prf-who-desc { text-align: left; max-width: 100%; }
  .prf-strip { grid-template-columns: repeat(2,1fr); }
  .prf-contract-label { width: 100%; margin-bottom: 12px; }
}
@media (min-width: 1800px) {
  .prf-stats { padding: 80px 5%; }
  .prf-stat-number { font-size: clamp(64px, 4.5vw, 104px); }
  .prf-sitem { padding: 26px 22px 48px; }
  .prf-sitem-title { font-size: clamp(12px, 0.9vw, 15px); }
}
@media (min-width: 2400px) {
  .prf-stat-number { font-size: clamp(80px, 4.2vw, 120px); }
  .prf-sitem-title { font-size: clamp(13px, 0.85vw, 17px); }
  .prf-sitem-desc { font-size: 12px; }
}
</style>

<div class="prf-root">

  <!-- STATS -->
  <div class="prf-stats" id="prfStats">
    <div class="prf-stats-inner">
      <div class="prf-stat" id="prfStat0">
        <div class="prf-stat-mark"></div>
        <div class="prf-stat-number"><span class="prf-count" data-target="55" data-suffix="+">55</span><span class="prf-suffix">YRS</span></div>
        <p class="prf-stat-label">Combined Experience</p>
        <p class="prf-stat-sub">Canada · United States · International</p>
      </div>
      <div class="prf-stat" id="prfStat1">
        <div class="prf-stat-mark"></div>
        <div class="prf-stat-number"><span class="prf-count" data-target="50" data-suffix="+">50</span><span class="prf-suffix">B$</span></div>
        <p class="prf-stat-label">Assets Delivered</p>
        <p class="prf-stat-sub">Estimated, modelled &amp; coordinated</p>
      </div>
      <div class="prf-stat" id="prfStat2">
        <div class="prf-stat-mark"></div>
        <div class="prf-stat-number"><span class="prf-count" data-target="3" data-suffix="">3</span><span class="prf-suffix">CTRY</span></div>
        <p class="prf-stat-label">Countries of Delivery</p>
        <p class="prf-stat-sub">Québec-based · National · Global reach</p>
      </div>
      <div class="prf-stat" id="prfStat3">
        <div class="prf-stat-mark"></div>
        <div class="prf-stat-number"><span class="prf-count" data-target="100" data-suffix="%">100</span></div>
        <p class="prf-stat-label">Major Sectors Covered</p>
        <p class="prf-stat-sub">Civil · Institutional · Commercial · Industrial</p>
      </div>
    </div>
    <div class="prf-contract-bar" id="prfContractBar">
      <span class="prf-contract-label">Contract types</span>
      <div class="prf-contract-tags">
        <span class="prf-tag">Design-Bid-Build</span>
        <span class="prf-tag">Design-Build</span>
        <span class="prf-tag">PPP / P3</span>
        <span class="prf-tag">Construction Management</span>
        <span class="prf-tag">Integrated Project Delivery</span>
      </div>
    </div>
  </div>

  <!-- WHO WE WORK WITH -->
  <div class="prf-who">
    <div class="prf-who-inner">

      <div class="prf-who-header" id="prfWhoHeader">
        <div class="prf-who-left">
          <p class="prf-who-eyebrow">Who We Work With</p>
          <h2 class="prf-who-title">Built for every <span>decision maker</span></h2>
        </div>
        <p class="prf-who-desc">From the field to the boardroom — our digital delivery expertise is structured around the people who build Canada's most complex assets.</p>
      </div>

      <div class="prf-strip" id="prfStrip">

        <a href="/services/contractors" class="prf-sitem">
          <span class="prf-sitem-num">01</span>
          <span class="prf-sitem-icon">🏗</span>
          <h3 class="prf-sitem-title">Contractors</h3>
          <p class="prf-sitem-desc">Field work packaging, scan-to-BIM, 4D sequencing &amp; production analytics.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

        <a href="/services/architects" class="prf-sitem">
          <span class="prf-sitem-num">02</span>
          <span class="prf-sitem-icon">📐</span>
          <h3 class="prf-sitem-title">Architects &amp; Designers</h3>
          <p class="prf-sitem-desc">Model coordination, LOD frameworks &amp; design-phase compliance.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

        <a href="/services/engineers" class="prf-sitem">
          <span class="prf-sitem-num">03</span>
          <span class="prf-sitem-icon">⚙️</span>
          <h3 class="prf-sitem-title">Engineers</h3>
          <p class="prf-sitem-desc">Clash analytics, quantity verification &amp; performance simulation.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

        <a href="/services/owners" class="prf-sitem">
          <span class="prf-sitem-num">04</span>
          <span class="prf-sitem-icon">📊</span>
          <h3 class="prf-sitem-title">Owners &amp; Developers</h3>
          <p class="prf-sitem-desc">ISO 19650 requirements, asset data strategy &amp; digital twin frameworks.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

        <a href="/services/government" class="prf-sitem">
          <span class="prf-sitem-num">05</span>
          <span class="prf-sitem-icon">🏛</span>
          <h3 class="prf-sitem-title">Government &amp; Agencies</h3>
          <p class="prf-sitem-desc">BIM governance, RFP specifications &amp; public infrastructure compliance.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

        <a href="/services/consultants" class="prf-sitem">
          <span class="prf-sitem-num">06</span>
          <span class="prf-sitem-icon">🗂</span>
          <h3 class="prf-sitem-title">Consultants &amp; PMs</h3>
          <p class="prf-sitem-desc">CDE setup, data structure standards &amp; real-time control dashboards.</p>
          <span class="prf-sitem-arr">→</span>
        </a>

      </div>
    </div>
  </div>

</div>`
const sectionScripts = ["\n(function(){\n'use strict';\nvar triggered = false;\n\nfunction animateCount(el){\n  var target = parseInt(el.getAttribute('data-target'));\n  var suffix = el.getAttribute('data-suffix') || '';\n  var t0 = null, dur = 1800;\n  function ease(t){ return 1 - Math.pow(1-t,3); }\n  function step(ts){\n    if(!t0) t0 = ts;\n    var p = Math.min((ts-t0)/dur, 1);\n    el.textContent = Math.round(ease(p)*target) + suffix;\n    if(p < 1) requestAnimationFrame(step);\n  }\n  requestAnimationFrame(step);\n}\n\nfunction onVisible(){\n  if(triggered) return;\n  triggered = true;\n  [0,1,2,3].forEach(function(i){\n    setTimeout(function(){\n      var el = document.getElementById('prfStat'+i);\n      if(!el) return;\n      el.classList.add('prf-vis');\n      setTimeout(function(){ var c = el.querySelector('.prf-count'); if(c) animateCount(c); }, 200);\n    }, i * 120);\n  });\n  setTimeout(function(){ var cb = document.getElementById('prfContractBar'); if(cb) cb.classList.add('prf-vis'); }, 650);\n  setTimeout(function(){ var wh = document.getElementById('prfWhoHeader'); if(wh) wh.classList.add('prf-vis'); }, 450);\n  setTimeout(function(){ var s = document.getElementById('prfStrip'); if(s) s.classList.add('prf-vis'); }, 580);\n}\n\nnew IntersectionObserver(function(e){ if(e[0].isIntersecting){ onVisible(); } },{ threshold: 0.08 })\n  .observe(document.querySelector('.prf-root'));\n}());\n", "(function(){\n  var root = document.querySelector('.prf-root');\n  if (!root) return;\n  new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if (e.isIntersecting) { e.target.classList.add('prf-visible'); }\n    });\n  }, { threshold: 0.05 }).observe(root);\n}());"]

export default function Section10() {
  useEffect(() => {
    setTimeout(() => {
      sectionScripts.forEach((script) => {
        try { new Function(script)() } catch(e) { console.error('Section10 script error:', e) }
      })
    }, 300)
  }, [])
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
}
