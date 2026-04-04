"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,900;1,700&amp;family=Inter:wght@300;400;500;600;700&amp;family=DM+Mono:wght@300;400;500&amp;display=swap');

.ind {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.ind.ind-visible {
  opacity: 1;
  transform: translateY(0);
}

.ind *, .ind *::before, .ind *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ind {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F2F5F8;
  --white:  #ffffff;
  --muted:  #5a7a96;
  --border: rgba(11,60,93,0.09);
  --mono:   'DM Mono', monospace;

  background: var(--bg);
  font-family: 'Inter', sans-serif;
  padding: 80px clamp(32px, 5%, 96px) 0;
  position: relative;
}

/* Faint grid */
.ind::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

/* ── Header ── */
.ind-header {
  position: relative;
  z-index: 1;
  margin-bottom: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.ind-header-left {}

.ind-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.ind-eyebrow::before { content:''; width:20px; height:1px; background:var(--accent); }

.ind-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px, 3.8vw, 58px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--navy);
  line-height: 0.93;
  letter-spacing: -0.01em;
}

.ind-header-right {
  max-width: 440px;
}
.ind-header-body {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.75;
}

/* ── Grid ── */
.ind-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 420px);
  gap: 3px;
  background: var(--border);
}

/* ── Card ── */
.ind-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;

  /* Scroll entrance */
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   0.6s ease,
    transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.ind-card.vis { opacity: 1; transform: translateY(0); }
.ind-card:nth-child(1) { transition-delay: 0.04s; }
.ind-card:nth-child(2) { transition-delay: 0.10s; }
.ind-card:nth-child(3) { transition-delay: 0.16s; }
.ind-card:nth-child(4) { transition-delay: 0.22s; }
.ind-card:nth-child(5) { transition-delay: 0.28s; }
.ind-card:nth-child(6) { transition-delay: 0.34s; }

/* Background image */
.ind-card-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: saturate(0.4) brightness(0.65);
  transform: scale(1.04);
  transition:
    filter    0.7s cubic-bezier(0.22,1,0.36,1),
    transform 0.7s cubic-bezier(0.22,1,0.36,1);
  will-change: transform, filter;
}
.ind-card:hover .ind-card-img {
  filter: saturate(0.85) brightness(0.55);
  transform: scale(1.0);
}

/* Dark gradient overlay — default heavy, lifts on hover */
.ind-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(7,18,30,0.92)  0%,
    rgba(7,18,30,0.55)  40%,
    rgba(7,18,30,0.15) 100%
  );
  transition: background 0.6s ease;
}
.ind-card:hover .ind-card-overlay {
  background: linear-gradient(
    to top,
    rgba(7,18,30,0.96)  0%,
    rgba(7,18,30,0.6)   45%,
    rgba(7,18,30,0.2)  100%
  );
}

/* Top accent line — draws in on hover */
.ind-card-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  z-index: 3;
}
.ind-card:hover .ind-card-line { transform: scaleX(1); }

/* Card number — top left */
.ind-card-num {
  position: absolute;
  top: 20px; left: 20px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.2);
  z-index: 3;
  transition: color 0.3s;
}
.ind-card:hover .ind-card-num { color: rgba(71,181,255,0.5); }

/* Card body — pinned to bottom */
.ind-card-body {
  position: relative;
  z-index: 3;
  padding: 28px 28px 32px;
}

.ind-card-tag {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease 0.05s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s;
}
.ind-card:hover .ind-card-tag { opacity: 1; transform: translateY(0); }

.ind-card-name {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(22px, 2vw, 30px);
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.01em;
  margin-bottom: 0;
  transition: margin-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
}
.ind-card:hover .ind-card-name { margin-bottom: 12px; }

.ind-card-desc {
  font-size: 12.5px;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(6px);
  transition:
    max-height 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s,
    opacity    0.4s ease 0.08s,
    transform  0.4s cubic-bezier(0.22,1,0.36,1) 0.08s;
}
.ind-card:hover .ind-card-desc {
  max-height: 80px;
  opacity: 1;
  transform: translateY(0);
}

/* Arrow CTA inside card */
.ind-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: 14px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s ease 0.12s, transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.12s;
}
.ind-card-cta-arr {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.ind-card:hover .ind-card-cta { opacity: 1; transform: translateY(0); }
.ind-card:hover .ind-card-cta-arr { transform: translateX(4px); }

/* ── Bottom CTA strip ── */
.ind-bottom {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 36px 0 80px;
  border-top: 1px solid var(--border);
  margin-top: 3px;
}

.ind-bottom-text {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.6;
}

.ind-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--navy);
  text-decoration: none;
  padding: 18px 32px;
  border: 1px solid var(--navy);
  background: transparent;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.4s ease;
}
.ind-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--navy);
  transform: translateX(-101%);
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
  z-index: 0;
}
.ind-cta:hover::before { transform: translateX(0); }
.ind-cta:hover { color: white; }
.ind-cta span { position: relative; z-index: 1; }
.ind-cta-arr {
  position: relative; z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.ind-cta:hover .ind-cta-arr { transform: translateX(4px); }

/* Pulse ring */
.ind-cta-ring {
  position: absolute;
  inset: -6px;
  border: 1px solid rgba(71,181,255,0.3);
  pointer-events: none;
  animation: ind-ring 2.5s ease-in-out infinite;
}
@keyframes ind-ring {
  0%   { opacity: 0; transform: scale(0.96); }
  40%  { opacity: 1; }
  100% { opacity: 0; transform: scale(1.04); }
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .ind-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(3, 380px); }
}
@media (max-width: 640px) {
  .ind { padding: 56px 24px 0; }
  .ind-grid { grid-template-columns: 1fr; grid-template-rows: repeat(6, 320px); }
  .ind-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  .ind-header-right { max-width: 100%; }
  .ind-bottom { flex-direction: column; align-items: flex-start; gap: 20px; }
}
</style>

<section class="ind" id="indRoot" aria-labelledby="indTitle">

  <!-- Header -->
  <div class="ind-header">
    <div class="ind-header-left">
      <div class="ind-eyebrow">Industries We Serve</div>
      <h2 class="ind-title" id="indTitle">Industries With<br/>Critical Infrastructure</h2>
    </div>
    <div class="ind-header-right">
      <p class="ind-header-body">We support industries operating complex, capital-intensive infrastructure. Our role is to bring structure, clarity, and control to information across the full asset lifecycle.</p>
    </div>
  </div>

  <!-- 3×2 Grid -->
  <div class="ind-grid">

    <!-- 1 -->
    <a href="/industries/heavy-civil/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">01</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Corridor Program Control</div>
        <div class="ind-card-name">Heavy Civil &amp;<br/>Transportation</div>
        <p class="ind-card-desc">Bridges, highways, rail, and transit corridors. Complex staging, multi-contractor environments, long delivery timelines.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <!-- 2 -->
    <a href="/industries/mining/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1578496479763-c21ef8a43d52?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">02</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Asset Visibility at Scale</div>
        <div class="ind-card-name">Mining &amp; Resource<br/>Extraction</div>
        <p class="ind-card-desc">Large-scale sites. Phased development. Operational pressure. We structure digital delivery to support production continuity and asset reliability.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <!-- 3 -->
    <a href="/industries/energy/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">03</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Distributed Critical Assets</div>
        <div class="ind-card-name">Energy, Renewable<br/>&amp; Utilities</div>
        <p class="ind-card-desc">Power generation, transmission, renewables. Asset data must survive handover and serve operations for decades.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <!-- 4 -->
    <a href="/industries/institutional/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">04</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Long-Lifecycle Buildings</div>
        <div class="ind-card-name">Institutional &amp;<br/>Government</div>
        <p class="ind-card-desc">Hospitals, courthouses, universities, and civic buildings. High stakeholder complexity, rigorous compliance, FM handover requirements.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <!-- 5 -->
    <a href="/industries/industrial/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1611264041264-4af37e2bdf61?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">05</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Operational Continuity</div>
        <div class="ind-card-name">Industrial &amp;<br/>Heavy Manufacturing</div>
        <p class="ind-card-desc">Process plants, refineries, and industrial facilities. Information management tied directly to uptime and safety performance.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <!-- 6 -->
    <a href="/industries/commercial/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">06</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Portfolio-Scale Delivery</div>
        <div class="ind-card-name">Commercial Real<br/>Estate &amp; Mixed-Use</div>
        <p class="ind-card-desc">Large-scale developments and portfolios where structured data reduces risk, accelerates approvals, and supports FM operations.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

  </div>

  <!-- Bottom CTA -->
  <div class="ind-bottom">
    <span class="ind-bottom-text">6 Industry Verticals · Full Lifecycle Coverage</span>
    <a href="/industries/" class="ind-cta">
      <div class="ind-cta-ring"></div>
      <span>View All Industries</span>
      <span class="ind-cta-arr">→</span>
    </a>
  </div>

</section>`
const sectionScripts = ["\n(function(){\n  var cards = document.querySelectorAll('.ind-card');\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.06 });\n  cards.forEach(function(c){ io.observe(c); });\n}());\n", "\n(function(){\n  var root = document.getElementById('indRoot');\n  if (!root) return;\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if (e.isIntersecting) { e.target.classList.add('ind-visible'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.05 });\n  io.observe(root);\n}());\n"]

export default function Section5() {
  useEffect(() => {
    setTimeout(() => {
      sectionScripts.forEach((script) => {
        try {
          // eslint-disable-next-line no-new-func
          new Function(script)()
        } catch(e) {
          console.error('Section5 script error:', e)
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
