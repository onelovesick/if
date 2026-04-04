"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

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
  padding: clamp(56px,6vw,96px) clamp(24px,5%,96px);
  position: relative;
  overflow: hidden;
}

/* ── Header ── */
.ind-header {
  position: relative; z-index: 1;
  text-align: center;
  margin-bottom: clamp(40px,4vw,64px);
}
.ind-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  opacity: 0; transform: translateY(16px) scale(0.95);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1);
}
.ind-eyebrow.ind-in { opacity: 1; transform: translateY(0) scale(1); }
.ind-eyebrow::before, .ind-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.ind-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  line-height: 1; letter-spacing: -0.03em;
  margin-bottom: 20px;
}
.ind-char {
  display: inline-block;
  color: rgba(11,60,93,0.10);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ind-char.ind-filled { color: var(--navy); }
.ind-char.ind-space { width: 0.3em; }

.ind-intro {
  font-size: clamp(14px,1.1vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 620px; margin: 0 auto;
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease 0.2s, transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.ind-intro.ind-in { opacity: 1; transform: translateY(0); }

/* ── Grid ── */
.ind-grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
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
  border-radius: 10px;
  min-height: clamp(340px, 28vw, 440px);
  opacity: 0;
  transform: translateY(40px) scale(0.94);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
}
.ind-card.vis { opacity: 1; transform: translateY(0) scale(1); }
.ind-card:nth-child(1) { transform: translateY(50px) translateX(-16px) scale(0.93) rotate(-0.8deg); transition-delay: 0s; }
.ind-card:nth-child(2) { transform: translateY(60px) scale(0.92); transition-delay: 0.1s; }
.ind-card:nth-child(3) { transform: translateY(50px) translateX(16px) scale(0.93) rotate(0.8deg); transition-delay: 0.2s; }
.ind-card:nth-child(4) { transform: translateY(50px) translateX(-16px) scale(0.93) rotate(-0.8deg); transition-delay: 0.3s; }
.ind-card:nth-child(5) { transform: translateY(60px) scale(0.92); transition-delay: 0.4s; }
.ind-card:nth-child(6) { transform: translateY(50px) translateX(16px) scale(0.93) rotate(0.8deg); transition-delay: 0.5s; }
.ind-card:nth-child(1).vis,
.ind-card:nth-child(2).vis,
.ind-card:nth-child(3).vis,
.ind-card:nth-child(4).vis,
.ind-card:nth-child(5).vis,
.ind-card:nth-child(6).vis { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }

.ind-card:hover {
  box-shadow: 0 16px 48px rgba(11,60,93,0.15), 0 0 0 1px rgba(71,181,255,0.12);
}

/* Background image */
.ind-card-img {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  filter: saturate(0.35) brightness(0.6);
  transform: scale(1.06);
  transition: filter 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ind-card:hover .ind-card-img {
  filter: saturate(0.75) brightness(0.5);
  transform: scale(1.0);
}

/* Overlay */
.ind-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top,
    rgba(7,18,30,0.92) 0%,
    rgba(7,18,30,0.5) 45%,
    rgba(7,18,30,0.12) 100%);
  transition: background 0.6s ease;
}
.ind-card:hover .ind-card-overlay {
  background: linear-gradient(to top,
    rgba(7,18,30,0.95) 0%,
    rgba(7,18,30,0.55) 50%,
    rgba(7,18,30,0.18) 100%);
}

/* Accent line */
.ind-card-line {
  position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  z-index: 3;
  border-radius: 10px 10px 0 0;
}
.ind-card:hover .ind-card-line { transform: scaleX(1); }

/* Number */
.ind-card-num {
  position: absolute; top: 20px; left: 20px;
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.18);
  z-index: 3; transition: color 0.3s;
}
.ind-card:hover .ind-card-num { color: rgba(71,181,255,0.6); }

/* Card body */
.ind-card-body {
  position: relative; z-index: 3;
  padding: 28px 28px 28px;
}
.ind-card-tag {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 10px;
  opacity: 0; transform: translateY(8px);
  transition: opacity 0.5s ease 0.05s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s;
}
.ind-card:hover .ind-card-tag { opacity: 1; transform: translateY(0); }

.ind-card-name {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 900; text-transform: uppercase;
  color: #fff; line-height: 1.05; letter-spacing: -0.01em;
  margin-bottom: 0;
  transition: margin-bottom 0.5s cubic-bezier(0.22,1,0.36,1);
}
.ind-card:hover .ind-card-name { margin-bottom: 12px; }

.ind-card-desc {
  font-size: 13px; color: rgba(255,255,255,0.55);
  line-height: 1.65; max-height: 0; overflow: hidden;
  opacity: 0; transform: translateY(6px);
  transition: max-height 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s,
    opacity 0.45s ease 0.08s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.08s;
}
.ind-card:hover .ind-card-desc { max-height: 80px; opacity: 1; transform: translateY(0); }

.ind-card-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--accent); margin-top: 14px;
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.4s ease 0.12s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.12s;
}
.ind-card-cta-arr { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.ind-card:hover .ind-card-cta { opacity: 1; transform: translateY(0); }
.ind-card:hover .ind-card-cta-arr { transform: translateX(4px); }

/* ── Bottom CTA ── */
.ind-bottom {
  position: relative; z-index: 1;
  display: flex; align-items: center;
  justify-content: center; gap: 32px;
  max-width: 1400px; margin: 0 auto;
  padding-top: clamp(32px,3vw,48px);
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1);
}
.ind-bottom.ind-in { opacity: 1; transform: translateY(0); }

.ind-cta {
  position: relative;
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--navy); text-decoration: none;
  padding: 18px 32px; border: 1px solid var(--navy);
  background: transparent; overflow: hidden;
  white-space: nowrap; transition: color 0.4s ease;
}
.ind-cta::before {
  content: ''; position: absolute; inset: 0;
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

/* ── Responsive ── */
@media (max-width: 1024px) {
  .ind-grid { grid-template-columns: repeat(2, 1fr); }
  .ind-card:nth-child(n+3)::before { display: none; }
}
@media (max-width: 640px) {
  .ind-grid { grid-template-columns: 1fr; gap: 12px; }
  .ind-card { min-height: 300px; }
}
@media (min-width: 1800px) {
  .ind-grid { max-width: 1600px; }
  .ind-title { font-size: clamp(56px,4.8vw,88px); }
  .ind-card { min-height: 480px; }
  .ind-card-name { font-size: 28px; }
}
@media (min-width: 2400px) {
  .ind-grid { max-width: 1920px; }
}
</style>

<section class="ind" id="indRoot" aria-labelledby="indTitle">

  <!-- Header -->
  <header class="ind-header">
    <div class="ind-eyebrow" id="indEyebrow">Industries We Serve</div>
    <h2 class="ind-title" id="indTitle" data-text="Industries With Critical Infrastructure"></h2>
    <p class="ind-intro" id="indIntro">We support industries operating complex, capital-intensive infrastructure. Our role is to bring structure, clarity, and control to information across the full asset lifecycle.</p>
  </header>

  <!-- 3x2 Grid -->
  <div class="ind-grid">

    <a href="/industries/heavy-civil/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/heavy_civil.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">01</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Corridor Programme Control</div>
        <div class="ind-card-name">Heavy Civil &amp; Transportation</div>
        <p class="ind-card-desc">Bridges, highways, rail, and transit corridors. Complex staging, multi-contractor environments, long delivery timelines.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <a href="/industries/mining/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/mining.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">02</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Asset Visibility at Scale</div>
        <div class="ind-card-name">Mining &amp; Resource Extraction</div>
        <p class="ind-card-desc">Large-scale sites. Phased development. Operational pressure. Digital delivery that supports production continuity and asset reliability.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <a href="/industries/energy/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/energy.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">03</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Distributed Critical Assets</div>
        <div class="ind-card-name">Energy, Renewable &amp; Utilities</div>
        <p class="ind-card-desc">Power generation, transmission, renewables. Asset data must survive handover and serve operations for decades.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <a href="/industries/institutional/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/gov.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">04</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Long-Lifecycle Buildings</div>
        <div class="ind-card-name">Institutional &amp; Government</div>
        <p class="ind-card-desc">Hospitals, courthouses, universities, and civic buildings. High stakeholder complexity, rigorous compliance, FM handover requirements.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <a href="/industries/industrial/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/industrial.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">05</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Operational Continuity</div>
        <div class="ind-card-name">Industrial &amp; Heavy Manufacturing</div>
        <p class="ind-card-desc">Process plants, refineries, and industrial facilities. Information management tied directly to uptime and safety performance.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

    <a href="/industries/commercial/" class="ind-card">
      <div class="ind-card-img" style="background-image:url('/images/industries/real_estate.jpg')"></div>
      <div class="ind-card-overlay"></div>
      <div class="ind-card-line"></div>
      <span class="ind-card-num">06</span>
      <div class="ind-card-body">
        <div class="ind-card-tag">Portfolio-Scale Delivery</div>
        <div class="ind-card-name">Commercial Real Estate &amp; Mixed-Use</div>
        <p class="ind-card-desc">Large-scale developments and portfolios where structured data reduces risk, accelerates approvals, and supports FM operations.</p>
        <div class="ind-card-cta"><span>Explore</span><span class="ind-card-cta-arr">→</span></div>
      </div>
    </a>

  </div>

  <!-- Bottom CTA -->
  <div class="ind-bottom" id="indBottom">
    <a href="/industries/" class="ind-cta">
      <span>View All Industries</span>
      <span class="ind-cta-arr">→</span>
    </a>
  </div>

</section>`

const sectionScript = `
(function(){
'use strict';

var root = document.getElementById('indRoot');
if (!root) return;

/* ══ CHARACTER FILL ON SCROLL ══ */
(function(){
  var titleEl = document.getElementById('indTitle');
  if (!titleEl) return;
  var text = titleEl.getAttribute('data-text') || '';
  var html = '';
  for (var i = 0; i < text.length; i++){
    if (text[i] === ' '){
      html += '<span class="ind-char ind-space"> </span>';
    } else {
      html += '<span class="ind-char">' + text[i] + '</span>';
    }
  }
  titleEl.innerHTML = html;

  var chars = Array.from(titleEl.querySelectorAll('.ind-char'));
  var total = chars.length;
  var ticking = false;

  function updateChars(){
    var rect = root.getBoundingClientRect();
    var winH = window.innerHeight;
    var start = winH;
    var end = winH * 0.15;
    var raw = (start - rect.top) / (start - end);
    var progress = Math.max(0, Math.min(1, raw));
    var filled = Math.floor(progress * total);

    for (var i = 0; i < total; i++){
      if (i < filled) chars[i].classList.add('ind-filled');
      else chars[i].classList.remove('ind-filled');
    }
    ticking = false;
  }

  function onScroll(){
    if (!ticking){ ticking = true; requestAnimationFrame(updateChars); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  updateChars();
})();

/* ══ SCROLL ENTRANCE FOR ELEMENTS ══ */
(function(){
  var eyebrow = document.getElementById('indEyebrow');
  var intro   = document.getElementById('indIntro');
  var cards   = Array.from(root.querySelectorAll('.ind-card'));
  var bottom  = document.getElementById('indBottom');

  var targets = [];
  if (eyebrow) targets.push(eyebrow);
  if (intro) targets.push(intro);
  cards.forEach(function(c){ targets.push(c); });
  if (bottom) targets.push(bottom);

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add(e.target.classList.contains('ind-card') ? 'vis' : 'ind-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function(t){ io.observe(t); });
})();

}());
`

export default function Section5() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section5 script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
