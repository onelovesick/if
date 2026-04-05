"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

.prf *, .prf *::before, .prf *::after { box-sizing: border-box; margin: 0; padding: 0; }

.prf {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #060e18;
  --text: #F0F4F7;
  --muted: #7a9bb5;
  --border: rgba(71,181,255,0.08);
  --mono: 'DM Mono', monospace;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  padding: clamp(36px,3.5vw,56px) clamp(24px,5%,64px);
}

.prf-wrap {
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.prf-header {
  text-align: center;
  margin-bottom: clamp(32px,3vw,48px);
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.prf-header.prf-in { opacity: 1; transform: translateY(0); }

.prf-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}
.prf-eyebrow::before, .prf-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.prf-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(28px,3vw,44px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); line-height: 1;
  letter-spacing: -0.03em;
}
.prf-title-accent { color: var(--accent); }

/* ── Stats grid ── */
.prf-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: clamp(20px,2vw,28px);
}

.prf-stat {
  text-align: center;
  padding: clamp(20px,2vw,32px) 20px;
  position: relative;
  opacity: 0; transform: translateY(24px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.prf-stat.prf-in { opacity: 1; transform: translateY(0); }
.prf-stat:nth-child(1) { transition-delay: 0s; }
.prf-stat:nth-child(2) { transition-delay: 0.1s; }
.prf-stat:nth-child(3) { transition-delay: 0.2s; }
.prf-stat:nth-child(4) { transition-delay: 0.3s; }

/* Vertical dividers */
.prf-stat + .prf-stat::before {
  content: '';
  position: absolute; left: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(71,181,255,0.12) 30%, rgba(71,181,255,0.12) 70%, transparent);
}

.prf-stat-number {
  font-family: 'Inter', sans-serif;
  font-size: clamp(36px,4vw,60px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.prf-count { display: inline-block; }

.prf-suffix {
  font-size: 0.32em;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--accent);
  margin-left: 4px;
}

.prf-stat-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(13px,1vw,15px);
  font-weight: 700; text-transform: uppercase;
  color: var(--text); letter-spacing: 0.02em;
  margin-bottom: 6px;
}

.prf-stat-desc {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--muted); opacity: 0.6;
  line-height: 1.6;
}

/* ── Contract bar ── */
.prf-contracts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: clamp(24px,2.5vw,36px);
  border-top: 1px solid var(--border);
  opacity: 0; transform: translateY(14px);
  transition: opacity 1.2s ease 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s;
}
.prf-contracts.prf-in { opacity: 1; transform: translateY(0); }

.prf-contracts-label {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted); margin-right: 8px;
}

.prf-tag {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(71,181,255,0.6);
  border: 1px solid rgba(71,181,255,0.15);
  border-radius: 3px;
  padding: 6px 14px;
  background: rgba(71,181,255,0.03);
  transition: background 0.25s, border-color 0.25s, color 0.25s;
  cursor: default;
}
.prf-tag:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.35);
  color: var(--text);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .prf-stats { grid-template-columns: repeat(2, 1fr); }
  .prf-stat:nth-child(3)::before { display: none; }
  .prf-contracts { justify-content: flex-start; }
}
@media (max-width: 480px) {
  .prf-stats { grid-template-columns: 1fr; }
  .prf-stat + .prf-stat::before { display: none; }
}
@media (min-width: 1800px) {
  .prf-wrap { max-width: 1600px; }
  .prf-stat-number { font-size: clamp(72px,5vw,100px); }
}
</style>

<section class="prf" id="prfRoot">
  <div class="prf-wrap">

    <!-- Header -->
    <header class="prf-header" id="prfHeader">
      <div class="prf-eyebrow">Track Record</div>
      <h2 class="prf-title">Proven Across <span class="prf-title-accent">Complex Programmes</span></h2>
      <p class="prf-sub">Decades of combined expertise delivering structured digital workflows for capital infrastructure across North America.</p>
    </header>

    <!-- Stats -->
    <div class="prf-stats">
      <div class="prf-stat" id="prfStat0">
        <div class="prf-stat-number"><span class="prf-count" data-target="55" data-suffix="">55</span><span class="prf-suffix">+ YRS</span></div>
        <p class="prf-stat-label">Combined Experience</p>
        <p class="prf-stat-desc">Canada, United States, International</p>
      </div>
      <div class="prf-stat" id="prfStat1">
        <div class="prf-stat-number">$<span class="prf-count" data-target="50" data-suffix="">50</span><span class="prf-suffix">B+</span></div>
        <p class="prf-stat-label">Assets Delivered</p>
        <p class="prf-stat-desc">Modelled, coordinated, verified</p>
      </div>
      <div class="prf-stat" id="prfStat2">
        <div class="prf-stat-number"><span class="prf-count" data-target="3" data-suffix="">3</span><span class="prf-suffix">CTRY</span></div>
        <p class="prf-stat-label">Countries of Delivery</p>
        <p class="prf-stat-desc">Quebec-based, national reach</p>
      </div>
      <div class="prf-stat" id="prfStat3">
        <div class="prf-stat-number"><span class="prf-count" data-target="100" data-suffix="">100</span><span class="prf-suffix">%</span></div>
        <p class="prf-stat-label">Sectors Covered</p>
        <p class="prf-stat-desc">Civil, institutional, commercial, industrial</p>
      </div>
    </div>

    <!-- Contract types -->
    <div class="prf-contracts" id="prfContracts">
      <span class="prf-contracts-label">Contract Types</span>
      <span class="prf-tag">Design-Bid-Build</span>
      <span class="prf-tag">Design-Build</span>
      <span class="prf-tag">PPP / P3</span>
      <span class="prf-tag">Construction Management</span>
      <span class="prf-tag">Integrated Project Delivery</span>
    </div>

  </div>
</section>`

const sectionScript = `
(function(){
'use strict';
var root = document.getElementById('prfRoot');
if (!root) return;

var triggered = false;

function animateCount(el){
  var target = parseInt(el.getAttribute('data-target'));
  var suffix = el.getAttribute('data-suffix') || '';
  var t0 = null, dur = 1800;
  function ease(t){ return 1 - Math.pow(1-t,3); }
  function step(ts){
    if(!t0) t0 = ts;
    var p = Math.min((ts-t0)/dur, 1);
    el.textContent = Math.round(ease(p)*target) + suffix;
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function onVisible(){
  if(triggered) return;
  triggered = true;

  var header = document.getElementById('prfHeader');
  if (header) header.classList.add('prf-in');

  [0,1,2,3].forEach(function(i){
    setTimeout(function(){
      var el = document.getElementById('prfStat'+i);
      if(!el) return;
      el.classList.add('prf-in');
      setTimeout(function(){
        var c = el.querySelector('.prf-count');
        if(c) animateCount(c);
      }, 200);
    }, i * 120);
  });

  setTimeout(function(){
    var cb = document.getElementById('prfContracts');
    if(cb) cb.classList.add('prf-in');
  }, 650);
}

new IntersectionObserver(function(e){
  if(e[0].isIntersecting) onVisible();
}, { threshold: 0.1 }).observe(root);
}());
`

export default function Section10() {
  useEffect(() => {
    setTimeout(() => {
      try { new Function(sectionScript)() }
      catch(e) { console.error('Section10 script error:', e) }
    }, 300)
  }, [])
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
}
