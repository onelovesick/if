"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

.prf *, .prf *::before, .prf *::after { box-sizing: border-box; margin: 0; padding: 0; }

.prf {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #F2F5F8;
  --white: #ffffff;
  --muted: #5a7a96;
  --border: rgba(11,60,93,0.06);
  --mono: 'DM Mono', monospace;

  background: var(--bg);
  font-family: 'Inter', sans-serif;
  padding: clamp(64px,7vw,110px) clamp(24px,5%,64px);
  position: relative;
  overflow: hidden;
}

.prf-wrap {
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.prf-header {
  text-align: center;
  margin-bottom: clamp(48px,5vw,72px);
}

.prf-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.prf-eyebrow.prf-in { opacity: 1; transform: translateY(0); }
.prf-eyebrow::before, .prf-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.prf-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  line-height: 1; letter-spacing: -0.03em;
  margin-bottom: 18px;
}
.prf-char {
  display: inline-block;
  color: rgba(11,60,93,0.10);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.prf-char.prf-filled { color: var(--navy); }
.prf-char.prf-space { width: 0.3em; }

.prf-intro {
  font-size: clamp(14px,1.1vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 580px; margin: 0 auto;
  opacity: 0; transform: translateY(16px);
  transition: opacity 1.2s ease 0.15s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s;
}
.prf-intro.prf-in { opacity: 1; transform: translateY(0); }

/* ── Stats grid ── */
.prf-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: clamp(32px,3vw,48px);
}

.prf-stat {
  text-align: center;
  padding: clamp(28px,3vw,44px) 16px;
  position: relative;
  opacity: 0; transform: translateY(28px) scale(0.96);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1);
}
.prf-stat.prf-in { opacity: 1; transform: translateY(0) scale(1); }
.prf-stat:nth-child(1) { transition-delay: 0s; }
.prf-stat:nth-child(2) { transition-delay: 0.1s; }
.prf-stat:nth-child(3) { transition-delay: 0.2s; }
.prf-stat:nth-child(4) { transition-delay: 0.3s; }

/* Dividers */
.prf-stat + .prf-stat::before {
  content: '';
  position: absolute; left: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(11,60,93,0.08) 30%, rgba(11,60,93,0.08) 70%, transparent);
}

/* Stat card surface */
.prf-stat-inner {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: clamp(24px,2.5vw,36px) 16px;
  height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  transition: box-shadow 0.35s, border-color 0.3s;
}
.prf-stat-inner:hover {
  box-shadow: 0 8px 32px rgba(11,60,93,0.06);
  border-color: rgba(71,181,255,0.15);
}

.prf-stat-number {
  font-family: 'Inter', sans-serif;
  font-size: clamp(42px,4.5vw,72px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--navy);
  margin-bottom: 10px;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.prf-count { display: inline-block; }

.prf-suffix {
  font-size: 0.35em;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--accent);
  margin-left: 3px;
}

.prf-stat-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(12px,0.9vw,14px);
  font-weight: 700; text-transform: uppercase;
  color: var(--navy); letter-spacing: 0.02em;
  margin-bottom: 4px;
}

.prf-stat-desc {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--muted); opacity: 0.7;
  line-height: 1.5;
}

/* ── Contract bar ── */
.prf-contracts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: clamp(24px,2.5vw,36px);
  border-top: 1px solid var(--border);
  opacity: 0; transform: translateY(14px);
  transition: opacity 1.2s ease 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s;
}
.prf-contracts.prf-in { opacity: 1; transform: translateY(0); }

.prf-contracts-label {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--muted); margin-right: 6px;
}

.prf-tag {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--navy);
  border: 1px solid rgba(11,60,93,0.1);
  border-radius: 4px;
  padding: 7px 16px;
  background: var(--white);
  transition: border-color 0.25s, box-shadow 0.25s;
  cursor: default;
}
.prf-tag:hover {
  border-color: rgba(71,181,255,0.25);
  box-shadow: 0 4px 12px rgba(11,60,93,0.05);
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
  .prf-stat-number { font-size: clamp(60px,4.5vw,88px); }
  .prf-title { font-size: clamp(56px,4.8vw,88px); }
}
</style>

<section class="prf" id="prfRoot">
  <div class="prf-wrap">

    <header class="prf-header">
      <div class="prf-eyebrow" id="prfEyebrow">Track Record</div>
      <h2 class="prf-title" id="prfTitle" data-text="Proven Across Complex Programmes"></h2>
      <p class="prf-intro" id="prfIntro">Decades of combined expertise delivering structured digital workflows for capital infrastructure across North America.</p>
    </header>

    <div class="prf-stats">
      <div class="prf-stat" id="prfStat0">
        <div class="prf-stat-inner">
          <div class="prf-stat-number"><span class="prf-count" data-target="55" data-suffix="">55</span><span class="prf-suffix">+ YRS</span></div>
          <p class="prf-stat-label">Combined Experience</p>
          <p class="prf-stat-desc">Canada, United States, International</p>
        </div>
      </div>
      <div class="prf-stat" id="prfStat1">
        <div class="prf-stat-inner">
          <div class="prf-stat-number">$<span class="prf-count" data-target="50" data-suffix="">50</span><span class="prf-suffix">B+</span></div>
          <p class="prf-stat-label">Assets Delivered</p>
          <p class="prf-stat-desc">Modelled, coordinated, verified</p>
        </div>
      </div>
      <div class="prf-stat" id="prfStat2">
        <div class="prf-stat-inner">
          <div class="prf-stat-number"><span class="prf-count" data-target="3" data-suffix="">3</span><span class="prf-suffix">CTRY</span></div>
          <p class="prf-stat-label">Countries of Delivery</p>
          <p class="prf-stat-desc">Quebec-based, national reach</p>
        </div>
      </div>
      <div class="prf-stat" id="prfStat3">
        <div class="prf-stat-inner">
          <div class="prf-stat-number"><span class="prf-count" data-target="100" data-suffix="">100</span><span class="prf-suffix">%</span></div>
          <p class="prf-stat-label">Sectors Covered</p>
          <p class="prf-stat-desc">Civil, institutional, commercial, industrial</p>
        </div>
      </div>
    </div>

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

/* Character fill */
(function(){
  var el = document.getElementById('prfTitle');
  if (!el) return;
  var text = el.getAttribute('data-text') || '';
  var html = '';
  for (var i = 0; i < text.length; i++){
    if (text[i] === ' ') html += '<span class="prf-char prf-space"> </span>';
    else html += '<span class="prf-char">' + text[i] + '</span>';
  }
  el.innerHTML = html;

  var chars = Array.from(el.querySelectorAll('.prf-char'));
  var total = chars.length;
  var ticking = false;

  function update(){
    var rect = root.getBoundingClientRect();
    var winH = window.innerHeight;
    var raw = (winH - rect.top) / (winH * 0.85);
    var progress = Math.max(0, Math.min(1, raw));
    var filled = Math.floor(progress * total);
    for (var i = 0; i < total; i++){
      if (i < filled) chars[i].classList.add('prf-filled');
      else chars[i].classList.remove('prf-filled');
    }
    ticking = false;
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();

/* Count up */
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

/* Scroll entrances */
var eyebrow = document.getElementById('prfEyebrow');
var intro = document.getElementById('prfIntro');
var contracts = document.getElementById('prfContracts');
var stats = [0,1,2,3].map(function(i){ return document.getElementById('prfStat'+i); });

var targets = [eyebrow, intro, contracts].filter(Boolean).concat(stats.filter(Boolean));

var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (!e.isIntersecting) return;
    e.target.classList.add('prf-in');
    io.unobserve(e.target);

    /* Trigger count-up when first stat appears */
    if (!triggered && e.target.id && e.target.id.startsWith('prfStat')){
      triggered = true;
      stats.forEach(function(s){
        if (!s) return;
        var c = s.querySelector('.prf-count');
        if (c) setTimeout(function(){ animateCount(c); }, 300);
      });
    }
  });
}, { threshold: 0.15 });

targets.forEach(function(t){ io.observe(t); });
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
