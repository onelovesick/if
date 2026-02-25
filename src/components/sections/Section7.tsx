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
  padding: 80px clamp(32px,5%,96px);
}

/* Max-width container */
.blg-inner {
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ── */
.blg-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 32px;
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
.blg-eyebrow::before { content:''; width:20px; height:1px; background:var(--accent); }

.blg-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,3.2vw,52px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  line-height: 0.93;
  letter-spacing: -0.01em;
}

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

/* ── Main editorial grid ── */
.blg-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2px;
  background: var(--border);
  margin-bottom: 2px;
}

/* ── Card base ── */
.blg-card {
  background: var(--bg);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.22,1,0.36,1),
    background 0.2s ease;
}
.blg-card.vis { opacity: 1; transform: translateY(0); }
.blg-card:nth-child(1) { transition-delay: 0.04s; }
.blg-card:nth-child(2) { transition-delay: 0.10s; }
.blg-card:nth-child(3) { transition-delay: 0.16s; }
.blg-card:nth-child(4) { transition-delay: 0.22s; }
.blg-card:nth-child(5) { transition-delay: 0.28s; }

.blg-card:hover { background: var(--paper); }

/* Left accent line on hover */
.blg-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  z-index: 3;
}
.blg-card:hover::after { transform: scaleY(1); }
/* Featured uses top line instead (it has left image) */
.blg-card--featured::after {
  top: 0; left: 0; right: 0; bottom: auto;
  width: auto; height: 3px;
  transform: scaleX(0);
  transform-origin: left;
}
.blg-card--featured:hover::after { transform: scaleX(1); }

/* Featured: spans 2 cols */
.blg-card--featured {
  grid-column: span 2;
  flex-direction: row;
}
.blg-card--featured .blg-card-img {
  width: 55%;
  flex-shrink: 0;
}

/* Image */
.blg-card-img {
  position: relative;
  overflow: hidden;
  height: 260px;
  flex-shrink: 0;
}
.blg-card--featured .blg-card-img { height: auto; min-height: 300px; }

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

/* ── Bottom row: 3 equal small cards ── */
.blg-grid-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--border);
}
.blg-grid-bottom .blg-card {
  flex-direction: row;
  align-items: stretch;
}
.blg-grid-bottom .blg-card-img {
  width: 140px;
  height: auto;
  flex-shrink: 0;
}
.blg-grid-bottom .blg-card-body {
  padding: 18px 20px 20px;
}
.blg-grid-bottom .blg-card-heading {
  font-size: 15px !important;
}
.blg-grid-bottom .blg-card-excerpt { display: none; }

/* Responsive */
@media (max-width: 1024px) {
  .blg-card--featured { grid-column: span 3; flex-direction: column; }
  .blg-card--featured .blg-card-img { width: 100%; height: 280px; }
}
@media (max-width: 768px) {
  .blg-grid { grid-template-columns: 1fr 1fr; }
  .blg-card--featured { grid-column: span 2; }
  .blg-grid-bottom { grid-template-columns: 1fr 1fr; }
  .blg-grid-bottom .blg-card:last-child { display: none; }
}
@media (max-width: 520px) {
  .blg-grid, .blg-grid-bottom { grid-template-columns: 1fr; }
  .blg-card--featured { grid-column: span 1; }
  .blg-grid-bottom .blg-card { flex-direction: column; }
  .blg-grid-bottom .blg-card-img { width: 100%; height: 160px; }
}
</style>

<section class="blg" id="blgRoot" aria-labelledby="blgTitle">
<div class="blg-inner">

  <!-- Header -->
  <div class="blg-header">
    <div>
      <div class="blg-eyebrow">Insights & Resources</div>
      <h2 class="blg-title" id="blgTitle">From The Field</h2>
    </div>
    <a href="/blog/" class="blg-viewall">
      <span>View All</span>
      <span class="blg-viewall-arr">→</span>
    </a>
  </div>

  <!-- Filters -->
  <div class="blg-filters">
    <button class="blg-filter active" data-filter="all">All</button>
    <div class="blg-filter-divider"></div>
    <button class="blg-filter" data-filter="article">Articles</button>
    <button class="blg-filter" data-filter="guide">Guides</button>
    <button class="blg-filter" data-filter="news">News</button>
    <button class="blg-filter" data-filter="insight">Insights</button>
  </div>

  <!-- Top grid: featured (2 col) + 1 aside -->
  <div class="blg-grid">

    <!-- Featured -->
    <a href="/blog/iso-19650-practical-guide/" class="blg-card blg-card--featured" data-type="guide">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80" alt="BIM on infrastructure site"/>
        <span class="blg-type-badge blg-type-badge--guide">Guide</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">ISO 19650 · Information Management</div>
        <h3 class="blg-card-heading">ISO 19650 In Practice: What It Actually Means For Your Project Team</h3>
        <p class="blg-card-excerpt">Most projects claim ISO 19650 compliance. Few implement it with discipline. We break down what the standard demands at each phase — and where teams consistently fall short on information requirements, naming conventions, and CDE governance.</p>
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

    <!-- Aside card -->
    <a href="/blog/bep-template-guide/" class="blg-card" data-type="article">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80" alt="BEP planning document"/>
        <span class="blg-type-badge blg-type-badge--article">Article</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">BEP · Project Planning</div>
        <h3 class="blg-card-heading">Writing a BEP That People Actually Follow</h3>
        <p class="blg-card-excerpt">A BIM Execution Plan is only useful if it reflects how your team works. We share the structure we use on every programme — and what most templates get wrong.</p>
        <div class="blg-card-tags">
          <span class="blg-card-tag">BEP</span>
          <span class="blg-card-tag">Governance</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Feb 2025 · 6 min read</span>
          <span class="blg-card-arr">Read →</span>
        </div>
      </div>
    </a>

  </div>

  <!-- Bottom row: 3 compact cards -->
  <div class="blg-grid-bottom">

    <a href="/blog/cde-selection-2025/" class="blg-card" data-type="insight">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&q=80" alt="CDE platform"/>
        <span class="blg-type-badge blg-type-badge--insight">Insight</span>
      </div>
      <div class="blg-card-body">
        <div class="blg-card-topic">CDE · Platforms</div>
        <h3 class="blg-card-heading">Choosing a CDE: Beyond the Feature List</h3>
        <div class="blg-card-tags">
          <span class="blg-card-tag">Autodesk ACC</span>
          <span class="blg-card-tag">Procore</span>
        </div>
        <div class="blg-card-meta">
          <span class="blg-card-date">Dec 2024 · 5 min</span>
          <span class="blg-card-arr">Read →</span>
        </div>
      </div>
    </a>

    <a href="/blog/digital-twin-handover/" class="blg-card" data-type="article">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" alt="Digital twin handover"/>
        <span class="blg-type-badge blg-type-badge--article">Article</span>
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

    <a href="/blog/p3-bim-requirements/" class="blg-card" data-type="news">
      <div class="blg-card-img">
        <img src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=500&q=80" alt="P3 infrastructure project"/>
        <span class="blg-type-badge blg-type-badge--news">News</span>
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

  </div>

</div>
</section>`
const sectionScripts = ["\n(function(){\n  // Scroll reveal\n  var cards = document.querySelectorAll('.blg-card');\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.06 });\n  cards.forEach(function(c){ io.observe(c); });\n\n  // Filter logic\n  var filters = document.querySelectorAll('.blg-filter');\n  filters.forEach(function(btn){\n    btn.addEventListener('click', function(){\n      filters.forEach(function(f){ f.classList.remove('active'); });\n      btn.classList.add('active');\n      var type = btn.dataset.filter;\n      cards.forEach(function(card){\n        if(type === 'all' || card.dataset.type === type){\n          card.style.display = '';\n        } else {\n          card.style.display = 'none';\n        }\n      });\n    });\n  });\n}());\n", "\n(function(){\n  var root = document.querySelector('.blg');\n  if (!root) return;\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if (e.isIntersecting) { e.target.classList.add('blg-visible'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.05 });\n  io.observe(root);\n}());\n"]

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
