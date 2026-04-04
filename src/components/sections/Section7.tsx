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
  --border: rgba(11,60,93,0.08);
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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(36px,4vw,56px);
  flex-wrap: wrap;
}

.blg-header-left {
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
}
.blg-header-left.blg-in { opacity: 1; transform: translateY(0); }

.blg-eyebrow {
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 14px;
  display: flex; align-items: center; gap: 10px;
}
.blg-eyebrow::before { content:''; width:24px; height:1px; background:var(--accent); opacity:0.5; }

.blg-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  line-height: 1; letter-spacing: -0.03em;
}
.blg-char {
  display: inline-block;
  color: rgba(11,60,93,0.10);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.blg-char.blg-filled { color: var(--navy); }
.blg-char.blg-space { width: 0.3em; }

/* CTA link */
.blg-viewall {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--navy); text-decoration: none;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px; border: 1px solid var(--navy);
  position: relative; overflow: hidden;
  flex-shrink: 0; transition: color 0.35s;
  opacity: 0; transform: translateY(14px);
  transition: color 0.35s, opacity 1.2s ease 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s;
}
.blg-viewall.blg-in { opacity: 1; transform: translateY(0); }
.blg-viewall::before {
  content:''; position: absolute; inset: 0;
  background: var(--navy);
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  z-index: 0;
}
.blg-viewall:hover::before { transform: translateX(0); }
.blg-viewall:hover { color: white; }
.blg-viewall span { position: relative; z-index: 1; }
.blg-viewall-arr {
  position: relative; z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.blg-viewall:hover .blg-viewall-arr { transform: translateX(4px); }

/* ── Main grid: featured left + stack right ── */
.blg-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

/* ── Card ── */
.blg-card {
  background: var(--white);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(11,60,93,0.04);
  opacity: 0;
  transform: translateY(36px) scale(0.96);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1),
    box-shadow 0.4s, border-color 0.3s;
}
.blg-card.vis { opacity: 1; transform: translateY(0) scale(1); }

.blg-card:hover {
  box-shadow: 0 12px 40px rgba(11,60,93,0.08);
  border-color: rgba(71,181,255,0.15);
}

/* Top accent */
.blg-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--accent); z-index: 3;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.blg-card:hover::before { transform: scaleX(1); }

/* Stagger */
.blg-card:nth-child(1) { transition-delay: 0s; }
.blg-card:nth-child(2) { transition-delay: 0.08s; }

/* ── Featured card ── */
.blg-card--feat {
  grid-row: 1 / 2;
}
.blg-card--feat .blg-card-img { height: 100%; min-height: 380px; }

/* ── Stack column ── */
.blg-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.blg-stack .blg-card {
  flex-direction: row;
  flex: 1;
}
.blg-stack .blg-card .blg-card-img {
  width: 180px; height: auto;
  flex-shrink: 0;
}
.blg-stack .blg-card:nth-child(1) { transition-delay: 0.1s; }
.blg-stack .blg-card:nth-child(2) { transition-delay: 0.18s; }

/* ── Image ── */
.blg-card-img {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.blg-card-img img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  filter: saturate(0.75) brightness(0.92);
  transition: transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
}
.blg-card:hover .blg-card-img img {
  transform: scale(1.05);
  filter: saturate(1) brightness(0.98);
}

/* Badge */
.blg-badge {
  position: absolute; top: 14px; left: 14px;
  font-family: var(--mono); font-size: 8px;
  letter-spacing: 0.14em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 3px; z-index: 2;
}
.blg-badge--guide   { background: var(--navy); color: white; }
.blg-badge--article { background: rgba(11,60,93,0.85); color: var(--accent); }
.blg-badge--insight { background: #1a6b3a; color: white; }
.blg-badge--news    { background: #8B3A00; color: white; }

/* Body */
.blg-card-body {
  padding: clamp(18px,1.5vw,28px);
  display: flex; flex-direction: column;
  flex: 1; gap: 8px;
}
.blg-card--feat .blg-card-body {
  padding: clamp(24px,2vw,32px);
}

.blg-card-topic {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent); opacity: 0.85;
}

.blg-card-heading {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-weight: 900; text-transform: uppercase;
  color: var(--navy); line-height: 1.05;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}
.blg-card--feat .blg-card-heading { font-size: clamp(20px,1.8vw,28px); }
.blg-card:not(.blg-card--feat) .blg-card-heading { font-size: clamp(14px,1.1vw,18px); }
.blg-card:hover .blg-card-heading { color: var(--accent); }

.blg-card-excerpt {
  font-size: clamp(12px,0.9vw,14px);
  color: var(--muted); line-height: 1.7;
  display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
}

.blg-card-tags {
  display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px;
}
.blg-card-tag {
  font-family: var(--mono); font-size: 7px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); border: 1px solid var(--border);
  padding: 3px 8px; border-radius: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.blg-card:hover .blg-card-tag { color: var(--accent); border-color: rgba(71,181,255,0.25); }

.blg-card-meta {
  display: flex; align-items: center;
  justify-content: space-between;
  padding-top: 12px; border-top: 1px solid var(--border);
  margin-top: auto;
}
.blg-card-date {
  font-family: var(--mono); font-size: 8px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); opacity: 0.8;
}
.blg-card-arr {
  font-family: var(--mono); font-size: 8px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--navy); opacity: 0.3;
  transition: opacity 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.blg-card:hover .blg-card-arr { opacity: 1; transform: translateX(4px); }

/* ── Bottom row: 3 compact ── */
.blg-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.blg-row .blg-card { flex-direction: row; }
.blg-row .blg-card .blg-card-img {
  width: 140px; height: auto; flex-shrink: 0;
}
.blg-row .blg-card .blg-card-body { padding: 16px 18px; }
.blg-row .blg-card .blg-card-heading { font-size: clamp(13px,1vw,15px) !important; }
.blg-row .blg-card .blg-card-excerpt { display: none; }
.blg-row .blg-card:nth-child(1) { transition-delay: 0.2s; }
.blg-row .blg-card:nth-child(2) { transition-delay: 0.28s; }
.blg-row .blg-card:nth-child(3) { transition-delay: 0.36s; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .blg-grid { grid-template-columns: 1fr; }
  .blg-card--feat .blg-card-img { min-height: 280px; height: 280px; }
  .blg-stack .blg-card { flex-direction: column; }
  .blg-stack .blg-card .blg-card-img { width: 100%; height: 200px; }
  .blg-row { grid-template-columns: 1fr 1fr; }
  .blg-row .blg-card:last-child { display: none; }
}
@media (max-width: 640px) {
  .blg-row { grid-template-columns: 1fr; }
  .blg-row .blg-card:last-child { display: flex; }
  .blg-row .blg-card { flex-direction: column; }
  .blg-row .blg-card .blg-card-img { width: 100%; height: 180px; }
  .blg-header { flex-direction: column; align-items: flex-start; }
}
@media (min-width: 1800px) {
  .blg-wrap { max-width: 1600px; }
  .blg-title { font-size: clamp(56px,4.8vw,88px); }
}
</style>

<section class="blg" id="blgRoot" aria-labelledby="blgTitle">
<div class="blg-wrap">

  <!-- Header -->
  <div class="blg-header">
    <div class="blg-header-left" id="blgHeaderLeft">
      <div class="blg-eyebrow">Insights &amp; Resources</div>
      <h2 class="blg-title" id="blgTitle" data-text="From The Field"></h2>
    </div>
    <a href="/blog/" class="blg-viewall" id="blgViewAll">
      <span>View All</span>
      <span class="blg-viewall-arr">→</span>
    </a>
  </div>

  <!-- Top: Featured + 2 stacked -->
  <div class="blg-grid">

    <!-- Featured -->
    <a href="/blog/iso-19650-practical-guide/" class="blg-card blg-card--feat">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=75" alt="BIM on infrastructure site" loading="lazy"/>
        <span class="blg-badge blg-badge--guide">Guide</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">ISO 19650 · Information Management</div>
        <h3 class="blg-card-heading">ISO 19650 In Practice: What It Actually Means For Your Project Team</h3>
        <p class="blg-card-excerpt">Most projects claim ISO 19650 compliance. Few implement it with discipline. We break down what the standard demands at each phase and where teams consistently fall short.</p>
        <div class="blg-card-tags">
          <span class="blg-card-tag">BIM Standards</span>
          <span class="blg-card-tag">CDE</span>
          <span class="blg-card-tag">Compliance</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Jan 2025 · 8 min read</span>
          <span class="blg-card-arr">Read Guide →</span>
        </div>
      </div>
    </a>

    <!-- Side stack -->
    <div class="blg-stack">
      <a href="/blog/bep-template-guide/" class="blg-card">
        <div class="blg-card-img">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75" alt="BEP planning" loading="lazy"/>
          <span class="blg-badge blg-badge--article">Article</span>
        </div>
        <div class="blg-card-body">
          <div class="blg-card-topic">BEP · Project Planning</div>
          <h3 class="blg-card-heading">Writing a BEP That People Actually Follow</h3>
          <p class="blg-card-excerpt">A BIM Execution Plan is only useful if it reflects how your team works.</p>
          <div class="blg-card-meta">
            <span class="blg-card-date">Feb 2025 · 6 min</span>
            <span class="blg-card-arr">Read →</span>
          </div>
        </div>
      </a>
      <a href="/blog/cde-selection-2025/" class="blg-card">
        <div class="blg-card-img">
          <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=75" alt="CDE platform" loading="lazy"/>
          <span class="blg-badge blg-badge--insight">Insight</span>
        </div>
        <div class="blg-card-body">
          <div class="blg-card-topic">CDE · Platforms</div>
          <h3 class="blg-card-heading">Choosing a CDE: Beyond the Feature List</h3>
          <p class="blg-card-excerpt">We compare the leading platforms on what actually matters for delivery.</p>
          <div class="blg-card-meta">
            <span class="blg-card-date">Dec 2024 · 5 min</span>
            <span class="blg-card-arr">Read →</span>
          </div>
        </div>
      </a>
    </div>

  </div>

  <!-- Bottom row -->
  <div class="blg-row">
    <a href="/blog/digital-twin-handover/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75" alt="Digital twin" loading="lazy"/>
        <span class="blg-badge blg-badge--article">Article</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">Digital Twin · FM</div>
        <h3 class="blg-card-heading">Why Most Digital Twins Fail at Handover</h3>
        <div class="blg-card-tags">
          <span class="blg-card-tag">Tandem</span>
          <span class="blg-card-tag">COBie</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Nov 2024 · 5 min</span>
          <span class="blg-card-arr">Read →</span>
        </div>
      </div>
    </a>
    <a href="/blog/p3-bim-requirements/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=500&q=75" alt="P3 project" loading="lazy"/>
        <span class="blg-badge blg-badge--news">News</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">P3 · Procurement</div>
        <h3 class="blg-card-heading">New BIM Requirements in Canadian P3 Contracts</h3>
        <div class="blg-card-tags">
          <span class="blg-card-tag">Infrastructure</span>
          <span class="blg-card-tag">Canada</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Oct 2024 · 3 min</span>
          <span class="blg-card-arr">Read →</span>
        </div>
      </div>
    </a>
    <a href="/blog/scan-to-bim-accuracy/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75" alt="Scan to BIM" loading="lazy"/>
        <span class="blg-badge blg-badge--article">Article</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">Scan-to-BIM · QA</div>
        <h3 class="blg-card-heading">Scan-to-BIM Accuracy: What Tolerance Actually Means</h3>
        <div class="blg-card-tags">
          <span class="blg-card-tag">Point Cloud</span>
          <span class="blg-card-tag">Verification</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Sep 2024 · 4 min</span>
          <span class="blg-card-arr">Read →</span>
        </div>
      </div>
    </a>
  </div>

</div>
</section>`

const sectionScript = `
(function(){
'use strict';
var root = document.getElementById('blgRoot');
if (!root) return;

/* ── Character fill on scroll ── */
(function(){
  var titleEl = document.getElementById('blgTitle');
  if (!titleEl) return;
  var text = titleEl.getAttribute('data-text') || '';
  var html = '';
  for (var i = 0; i < text.length; i++){
    if (text[i] === ' ') html += '<span class="blg-char blg-space"> </span>';
    else html += '<span class="blg-char">' + text[i] + '</span>';
  }
  titleEl.innerHTML = html;

  var chars = Array.from(titleEl.querySelectorAll('.blg-char'));
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

/* ── Scroll entrance ── */
var headerLeft = document.getElementById('blgHeaderLeft');
var viewAll = document.getElementById('blgViewAll');
var cards = Array.from(root.querySelectorAll('.blg-card'));

var targets = [];
if (headerLeft) targets.push(headerLeft);
if (viewAll) targets.push(viewAll);
cards.forEach(function(c){ targets.push(c); });

var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){
      e.target.classList.add(e.target.classList.contains('blg-card') ? 'vis' : 'blg-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

targets.forEach(function(t){ io.observe(t); });
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
