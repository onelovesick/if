"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.blg *, .blg *::before, .blg *::after { box-sizing: border-box; margin: 0; padding: 0; }

.blg {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F2F5F8;
  --white:  #ffffff;
  --muted:  #5a7a96;
  --border: rgba(11,60,93,0.06);
  --mono:   'DM Mono', monospace;

  background: var(--bg);
  font-family: 'Inter', sans-serif;
  padding: clamp(56px,6vw,96px) clamp(24px,5%,96px);
  position: relative;
  overflow: hidden;
}

.blg-wrap {
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.blg-header {
  text-align: center;
  margin-bottom: clamp(36px,4vw,56px);
}

.blg-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.blg-eyebrow.blg-in { opacity: 1; transform: translateY(0); }
.blg-eyebrow::before, .blg-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.blg-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  line-height: 1; letter-spacing: -0.03em;
  margin-bottom: 18px;
}
.blg-char {
  display: inline-block;
  color: rgba(11,60,93,0.10);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.blg-char.blg-filled { color: var(--navy); }
.blg-char.blg-space { width: 0.3em; }

.blg-intro {
  font-size: clamp(14px,1.1vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 560px; margin: 0 auto;
  opacity: 0; transform: translateY(16px);
  transition: opacity 1.2s ease 0.15s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s;
}
.blg-intro.blg-in { opacity: 1; transform: translateY(0); }

/* ── Grid: 3 top + 2 bottom centered ── */
.blg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 14px;
}
.blg-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  max-width: 66.66%;
  margin: 0 auto;
}

/* ── Topic card ── */
.blg-topic {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: clamp(28px,2.5vw,40px);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: 0;
  transform: translateY(36px) scale(0.95);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1),
    border-color 0.35s, box-shadow 0.4s;
}
.blg-topic.blg-in { opacity: 1; transform: translateY(0) scale(1); }

/* Stagger */
.blg-grid .blg-topic:nth-child(1) { transform: translateY(40px) translateX(-14px) scale(0.94) rotate(-0.5deg); transition-delay: 0s; }
.blg-grid .blg-topic:nth-child(2) { transform: translateY(44px) scale(0.93); transition-delay: 0.08s; }
.blg-grid .blg-topic:nth-child(3) { transform: translateY(40px) translateX(14px) scale(0.94) rotate(0.5deg); transition-delay: 0.16s; }
.blg-grid-2 .blg-topic:nth-child(1) { transform: translateY(40px) translateX(-14px) scale(0.94) rotate(-0.5deg); transition-delay: 0.22s; }
.blg-grid-2 .blg-topic:nth-child(2) { transform: translateY(40px) translateX(14px) scale(0.94) rotate(0.5deg); transition-delay: 0.28s; }
.blg-grid .blg-topic:nth-child(1).blg-in,
.blg-grid .blg-topic:nth-child(2).blg-in,
.blg-grid .blg-topic:nth-child(3).blg-in,
.blg-grid-2 .blg-topic:nth-child(1).blg-in,
.blg-grid-2 .blg-topic:nth-child(2).blg-in { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }

/* Top accent */
.blg-topic::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--accent); z-index: 2;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.blg-topic:hover::before { transform: scaleX(1); }

/* Hover glow */
.blg-topic::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 80px;
  background: linear-gradient(180deg, rgba(71,181,255,0.04) 0%, transparent 100%);
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.blg-topic:hover::after { opacity: 1; }

.blg-topic:hover {
  border-color: rgba(71,181,255,0.18);
  box-shadow: 0 10px 36px rgba(11,60,93,0.07);
}

/* Number */
.blg-topic-num {
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(48px,4vw,72px);
  font-weight: 900; line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(11,60,93,0.05);
  margin-bottom: 16px;
  transition: color 0.35s;
}
.blg-topic:hover .blg-topic-num { color: rgba(71,181,255,0.12); }

/* Label */
.blg-topic-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(17px,1.4vw,22px);
  font-weight: 900; text-transform: uppercase;
  color: var(--navy); letter-spacing: -0.01em;
  line-height: 1.1; margin-bottom: 12px;
  transition: color 0.25s;
}
.blg-topic:hover .blg-topic-label { color: var(--accent); }

/* Description */
.blg-topic-desc {
  font-size: clamp(12px,0.9vw,14px);
  color: var(--muted); line-height: 1.7;
  margin-bottom: 20px; flex: 1;
}

/* Footer row */
.blg-topic-foot {
  display: flex; align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
.blg-topic-count {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted); opacity: 0.7;
}
.blg-topic-arr {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--navy); opacity: 0.3;
  transition: opacity 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.blg-topic:hover .blg-topic-arr { opacity: 1; transform: translateX(4px); color: var(--accent); }

/* ── Bottom CTA ── */
.blg-bottom {
  text-align: center;
  margin-top: clamp(32px,3vw,48px);
  opacity: 0; transform: translateY(16px);
  transition: opacity 1.2s ease 0.3s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s;
}
.blg-bottom.blg-in { opacity: 1; transform: translateY(0); }

.blg-cta {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--navy); text-decoration: none;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 32px; border: 1px solid var(--navy);
  position: relative; overflow: hidden;
  transition: color 0.35s;
}
.blg-cta::before {
  content:''; position: absolute; inset: 0;
  background: var(--navy);
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  z-index: 0;
}
.blg-cta:hover::before { transform: translateX(0); }
.blg-cta:hover { color: white; }
.blg-cta span { position: relative; z-index: 1; }
.blg-cta-arr {
  position: relative; z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.blg-cta:hover .blg-cta-arr { transform: translateX(4px); }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .blg-grid { grid-template-columns: repeat(2, 1fr); }
  .blg-grid-2 { max-width: 100%; grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .blg-grid, .blg-grid-2 { grid-template-columns: 1fr; }
  .blg-grid-2 { max-width: 100%; }
}
@media (min-width: 1800px) {
  .blg-wrap { max-width: 1600px; }
  .blg-title { font-size: clamp(56px,4.8vw,88px); }
  .blg-topic-num { font-size: 80px; }
}
</style>

<section class="blg" id="blgRoot">
<div class="blg-wrap">

  <!-- Header -->
  <header class="blg-header">
    <div class="blg-eyebrow" id="blgEyebrow">Knowledge Base</div>
    <h2 class="blg-title" id="blgTitle" data-text="From The Field"></h2>
    <p class="blg-intro" id="blgIntro">Structured thinking on information management, digital delivery, and the systems that move infrastructure forward.</p>
  </header>

  <!-- Top row: 3 cards -->
  <div class="blg-grid">

    <a href="/knowledge/information-management/" class="blg-topic">
      <span class="blg-topic-num">01</span>
      <div class="blg-topic-label">Information Management</div>
      <p class="blg-topic-desc">ISO 19650, information requirements, level of information need, EIR, BEP, CDE governance, naming conventions, and classification logic.</p>
      <div class="blg-topic-foot">
        <span class="blg-topic-count">12 Articles</span>
        <span class="blg-topic-arr">Browse →</span>
      </div>
    </a>

    <a href="/knowledge/modelling-data/" class="blg-topic">
      <span class="blg-topic-num">02</span>
      <div class="blg-topic-label">Modelling &amp; Data</div>
      <p class="blg-topic-desc">BIM coordination, federated models, data structures, databases, IFC, openBIM, interoperability, and parametric authoring standards.</p>
      <div class="blg-topic-foot">
        <span class="blg-topic-count">9 Articles</span>
        <span class="blg-topic-arr">Browse →</span>
      </div>
    </a>

    <a href="/knowledge/for-the-field/" class="blg-topic">
      <span class="blg-topic-num">03</span>
      <div class="blg-topic-label">For the Field</div>
      <p class="blg-topic-desc">Scan-to-BIM, 4D sequencing, digital work packaging, field verification, model-based QA, reality capture, and construction validation.</p>
      <div class="blg-topic-foot">
        <span class="blg-topic-count">8 Articles</span>
        <span class="blg-topic-arr">Browse →</span>
      </div>
    </a>

  </div>

  <!-- Bottom row: 2 cards centered -->
  <div class="blg-grid-2">

    <a href="/knowledge/smart-infrastructure/" class="blg-topic">
      <span class="blg-topic-num">04</span>
      <div class="blg-topic-label">Smart Infrastructure</div>
      <p class="blg-topic-desc">Digital twin foundations, COBie, structured handover, AIM, connected assets, lifecycle intelligence, and operational readiness.</p>
      <div class="blg-topic-foot">
        <span class="blg-topic-count">7 Articles</span>
        <span class="blg-topic-arr">Browse →</span>
      </div>
    </a>

    <a href="/knowledge/industry-standards/" class="blg-topic">
      <span class="blg-topic-num">05</span>
      <div class="blg-topic-label">Industry &amp; Standards</div>
      <p class="blg-topic-desc">ISO direction, P3/PPP procurement, regulatory shifts, enterprise digital maturity, market intelligence, and compliance trends.</p>
      <div class="blg-topic-foot">
        <span class="blg-topic-count">6 Articles</span>
        <span class="blg-topic-arr">Browse →</span>
      </div>
    </a>

  </div>

  <!-- CTA -->
  <div class="blg-bottom" id="blgBottom">
    <a href="/knowledge/" class="blg-cta">
      <span>Explore All Topics</span>
      <span class="blg-cta-arr">→</span>
    </a>
  </div>

</div>
</section>`

const sectionScript = `
(function(){
'use strict';
var root = document.getElementById('blgRoot');
if (!root) return;

/* ── Character fill ── */
(function(){
  var el = document.getElementById('blgTitle');
  if (!el) return;
  var text = el.getAttribute('data-text') || '';
  var html = '';
  for (var i = 0; i < text.length; i++){
    if (text[i] === ' ') html += '<span class="blg-char blg-space"> </span>';
    else html += '<span class="blg-char">' + text[i] + '</span>';
  }
  el.innerHTML = html;

  var chars = Array.from(el.querySelectorAll('.blg-char'));
  var total = chars.length;
  var ticking = false;

  function update(){
    var rect = root.getBoundingClientRect();
    var winH = window.innerHeight;
    var raw = (winH - rect.top) / (winH * 0.85);
    var progress = Math.max(0, Math.min(1, raw));
    var filled = Math.floor(progress * total);
    for (var i = 0; i < total; i++){
      if (i < filled) chars[i].classList.add('blg-filled');
      else chars[i].classList.remove('blg-filled');
    }
    ticking = false;
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();

/* ── Scroll entrances ── */
var targets = [
  document.getElementById('blgEyebrow'),
  document.getElementById('blgIntro'),
  document.getElementById('blgBottom')
].concat(Array.from(root.querySelectorAll('.blg-topic')));

var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('blg-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });

targets.forEach(function(t){ if (t) io.observe(t); });
}());
`

export default function Section7() {
  useEffect(() => {
    setTimeout(() => {
      try {
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section7 script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
  )
}
