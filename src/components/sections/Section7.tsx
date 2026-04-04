"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>

.blg {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.blg.blg-visible {
  opacity: 1;
  transform: translateY(0);
}

@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,900;1,700&amp;family=Inter:wght@300;400;500;600;700&amp;family=DM+Mono:wght@300;400;500&amp;display=swap');

.blg *, .blg *::before, .blg *::after { box-sizing: border-box; margin: 0; padding: 0; }

.blg {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #ffffff;
  --paper:  #F2F5F8;
  --muted:  #5a7a96;
  --border: rgba(11,60,93,0.13);
  --mono:   'DM Mono', monospace;

  background: var(--paper);
  font-family: 'Inter', sans-serif;
  padding: clamp(56px,6vw,96px) clamp(24px,5%,96px);
}

/* Max-width container */
.blg-inner {
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.blg-header {
  text-align: center;
  margin-bottom: clamp(36px,4vw,56px);
}

.blg-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.blg-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
}
.blg-eyebrow::before, .blg-eyebrow::after {
  content:''; width:28px; height:1px; background:var(--accent); opacity:0.5;
}

.blg-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: -0.03em;
}
.blg-char {
  display: inline-block;
  color: rgba(11,60,93,0.10);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.blg-char.blg-filled { color: var(--navy); }
.blg-char.blg-space { width: 0.3em; }

/* View all */
.blg-viewall {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--navy);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border: 1px solid var(--navy);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  transition: color 0.35s ease;
}
.blg-viewall::before {
  content:'';
  position: absolute;
  inset: 0;
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

/* ── Filter pills ── */
.blg-filters {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.blg-filter {
  font-family: var(--mono);
  font-size: 8.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 7px 14px;
  border-radius: 2px;
  cursor: pointer;
  background: transparent;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  font-family: var(--mono);
}
.blg-filter:hover { color: var(--navy); border-color: rgba(11,60,93,0.25); }
.blg-filter.active {
  background: var(--navy);
  color: white;
  border-color: var(--navy);
}

.blg-filter-divider {
  width: 1px; height: 16px;
  background: var(--border);
  margin: 0 4px;
}

/* ── Main grid ── */
.blg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 14px;
}

/* ── Card base ── */
.blg-card {
  background: var(--bg);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(11,60,93,0.04);
  opacity: 0;
  transform: translateY(36px) scale(0.96);
  transition:
    opacity 1.4s ease,
    transform 1.6s cubic-bezier(0.16,1,0.3,1),
    box-shadow 0.4s, border-color 0.3s;
}
.blg-card.vis { opacity: 1; transform: translateY(0) scale(1); }

.blg-card:hover {
  box-shadow: 0 12px 40px rgba(11,60,93,0.08);
  border-color: rgba(71,181,255,0.15);
}

/* Top accent line on hover */
.blg-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  z-index: 3;
}
.blg-card:hover::after { transform: scaleX(1); }

/* Image */
.blg-card-img {
  position: relative;
  overflow: hidden;
  height: 160px;
  flex-shrink: 0;
}

.blg-card-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.78) brightness(0.9);
  transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
}
.blg-card:hover .blg-card-img img {
  transform: scale(1.04);
  filter: saturate(1) brightness(0.97);
}

/* Type badge */
.blg-type-badge {
  position: absolute;
  top: 14px; left: 14px;
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 5px 10px;
  z-index: 2;
}
.blg-type-badge--article  { background: var(--navy);   color: white; }
.blg-type-badge--guide    { background: #1a6b3a;        color: white; }
.blg-type-badge--news     { background: #8B3A00;        color: white; }
.blg-type-badge--insight  { background: rgba(11,60,93,0.85); color: var(--accent); }

/* Card body */
.blg-card-body {
  padding: 22px 26px 26px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
}

.blg-card--featured .blg-card-body {
  padding: 32px 36px;
  justify-content: center;
}

.blg-card-topic {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.9;
}

.blg-card-heading {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  line-height: 1;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}
.blg-card--featured .blg-card-heading { font-size: clamp(22px,2vw,32px); }
.blg-card:not(.blg-card--featured) .blg-card-heading { font-size: clamp(17px,1.5vw,22px); }
.blg-card:hover .blg-card-heading { color: var(--accent); }

.blg-card-excerpt {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.72;
}
.blg-card:not(.blg-card--featured) .blg-card-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.blg-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.blg-card-tag {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 3px 7px;
  opacity: 0.7;
  transition: color 0.2s, border-color 0.2s;
}
.blg-card:hover .blg-card-tag {
  color: var(--accent);
  border-color: rgba(71,181,255,0.3);
}

/* Meta */
.blg-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(11,60,93,0.12);
  margin-top: auto;
}
.blg-card-date {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.85;
}
.blg-card-arr {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--navy);
  opacity: 0.35;
  transition: opacity 0.2s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.blg-card:hover .blg-card-arr { opacity: 1; transform: translateX(4px); }

/* ── Bottom row: 2 centered ── */
.blg-grid-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  max-width: 66.66%;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .blg-grid { grid-template-columns: repeat(2, 1fr); }
  .blg-grid-bottom { max-width: 100%; }
}
@media (max-width: 640px) {
  .blg-grid, .blg-grid-bottom { grid-template-columns: 1fr; }
  .blg-grid-bottom { max-width: 100%; }
  .blg-header { flex-direction: column; align-items: flex-start; gap: 20px; }
}
@media (min-width: 1800px) {
  .blg-inner { max-width: 1600px; }
  .blg-title { font-size: clamp(56px,4.8vw,88px); }
}
</style>

<section class="blg" id="blgRoot" aria-labelledby="blgTitle">
<div class="blg-inner">

  <!-- Header -->
  <div class="blg-header">
    <div>
      <div class="blg-eyebrow">Knowledge Base</div>
      <h2 class="blg-title" id="blgTitle" data-text="From The Field"></h2>
    </div>
  </div>

  <!-- 5 category cards: 3 top + 2 bottom centered -->
  <div class="blg-grid">

    <a href="/knowledge/information-management/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75" alt="Information management" loading="lazy"/>
        <span class="blg-type-badge blg-type-badge--guide">12 Articles</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">ISO 19650 · EIR · BEP · CDE</div>
        <h3 class="blg-card-heading">Information Management</h3>
        <p class="blg-card-excerpt">Standards, information requirements, level of information need, governance, naming conventions, and classification logic.</p>
        <div class="blg-card-meta">
          <span class="blg-card-date">Core Discipline</span>
          <span class="blg-card-arr">Browse →</span>
        </div>
      </div>
    </a>

    <a href="/knowledge/modelling-data/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75" alt="Modelling and data" loading="lazy"/>
        <span class="blg-type-badge blg-type-badge--article">9 Articles</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">BIM · IFC · OpenBIM · Databases</div>
        <h3 class="blg-card-heading">Modelling &amp; Data</h3>
        <p class="blg-card-excerpt">Coordination, federated models, data structures, interoperability, and parametric authoring standards.</p>
        <div class="blg-card-meta">
          <span class="blg-card-date">Production</span>
          <span class="blg-card-arr">Browse →</span>
        </div>
      </div>
    </a>

    <a href="/knowledge/for-the-field/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&q=75" alt="Field verification" loading="lazy"/>
        <span class="blg-type-badge blg-type-badge--news">8 Articles</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">Scan-to-BIM · 4D · QA</div>
        <h3 class="blg-card-heading">For the Field</h3>
        <p class="blg-card-excerpt">Reality capture, digital work packaging, field verification, model-based QA, and construction validation.</p>
        <div class="blg-card-meta">
          <span class="blg-card-date">Verification</span>
          <span class="blg-card-arr">Browse →</span>
        </div>
      </div>
    </a>

  </div>

  <div class="blg-grid-bottom">

    <a href="/knowledge/smart-infrastructure/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75" alt="Smart infrastructure" loading="lazy"/>
        <span class="blg-type-badge blg-type-badge--insight">7 Articles</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">Digital Twin · COBie · AIM</div>
        <h3 class="blg-card-heading">Smart Infrastructure</h3>
        <p class="blg-card-excerpt">Digital twin foundations, structured handover, connected assets, lifecycle intelligence, and operational readiness.</p>
        <div class="blg-card-meta">
          <span class="blg-card-date">Operations</span>
          <span class="blg-card-arr">Browse →</span>
        </div>
      </div>
    </a>

    <a href="/knowledge/industry-standards/" class="blg-card">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=75" alt="Industry standards" loading="lazy"/>
        <span class="blg-type-badge blg-type-badge--article">6 Articles</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">P3 · Procurement · Policy</div>
        <h3 class="blg-card-heading">Industry &amp; Standards</h3>
        <p class="blg-card-excerpt">ISO direction, regulatory shifts, enterprise digital maturity, market intelligence, and compliance trends.</p>
        <div class="blg-card-meta">
          <span class="blg-card-date">Market</span>
          <span class="blg-card-arr">Browse →</span>
        </div>
      </div>
    </a>

  </div>

  <div style="text-align:center; margin-top:clamp(32px,3vw,48px);">
    <a href="/knowledge/" class="blg-viewall">
      <span>Explore All</span>
      <span class="blg-viewall-arr">→</span>
    </a>
  </div>

</div>
</section>`
const sectionScripts = [`
(function(){
'use strict';
var root = document.getElementById('blgRoot');
if (!root) return;

/* Character fill */
var el = document.getElementById('blgTitle');
if (el){
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
}

/* Scroll entrances */
var cards = Array.from(root.querySelectorAll('.blg-card'));
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }
  });
}, { threshold: 0.08 });
cards.forEach(function(c){ io.observe(c); });

/* Section reveal */
var sio = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('blg-visible'); sio.unobserve(e.target); }
  });
}, { threshold: 0.05 });
sio.observe(root);
}());
`]

export default function Section7() {
  useEffect(() => {
    setTimeout(() => {
      sectionScripts.forEach((script) => {
        try {
          // eslint-disable-next-line no-new-func
          new Function(script)()
        } catch(e) {
          console.error('Section7 script error:', e)
        }
      })
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
