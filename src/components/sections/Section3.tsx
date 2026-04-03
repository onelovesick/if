"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.sdf *, .sdf *::before, .sdf *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sdf {
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
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
}
.sdf.sdf-reveal { opacity: 1; transform: translateY(0); }

/* Canvas bg */
.sdf-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
}

/* ── Header ── */
.sdf-header {
  position: relative; z-index: 1;
  text-align: center;
  margin-bottom: clamp(48px,5vw,72px);
}
.sdf-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  opacity: 0; transform: translateY(16px) scale(0.95);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1);
}
.sdf-eyebrow.sdf-in { opacity: 1; transform: translateY(0) scale(1); }
.sdf-eyebrow::before, .sdf-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}
.sdf-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(36px,4.8vw,76px);
  font-weight: 900; text-transform: uppercase;
  line-height: 1;
  letter-spacing: -0.03em; margin-bottom: 20px;
}
.sdf-char {
  display: inline-block;
  color: rgba(11,60,93,0.12);
  transition: color 0.8s cubic-bezier(0.22,1,0.36,1);
}
.sdf-char.sdf-filled { color: var(--navy); }
.sdf-char.sdf-space { width: 0.3em; }
.sdf-intro {
  font-size: clamp(14px,1.1vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 620px; margin: 0 auto;
  opacity: 0; transform: translateY(20px);
  transition: opacity 1.2s ease 0.2s, transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.sdf-intro.sdf-in { opacity: 1; transform: translateY(0); }

/* ── Timeline track ── */
.sdf-track {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
}

/* ── Step cards ── */
.sdf-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.sdf-step {
  position: relative;
  padding: clamp(28px,2.5vw,40px) clamp(20px,2vw,32px);
  opacity: 0;
  transform: translateY(40px) scale(0.92);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1);
}
.sdf-step.vis { opacity: 1; transform: translateY(0) scale(1); }

/* Each card enters from a unique origin */
.sdf-step:nth-child(1) { transform: translateY(60px) translateX(-24px) scale(0.90) rotate(-1.5deg); transition-delay: 0s; }
.sdf-step:nth-child(2) { transform: translateY(70px) scale(0.88); transition-delay: 0.15s; }
.sdf-step:nth-child(3) { transform: translateY(70px) scale(0.88); transition-delay: 0.3s; }
.sdf-step:nth-child(4) { transform: translateY(60px) translateX(24px) scale(0.90) rotate(1.5deg); transition-delay: 0.45s; }
.sdf-step:nth-child(1).vis,
.sdf-step:nth-child(2).vis,
.sdf-step:nth-child(3).vis,
.sdf-step:nth-child(4).vis { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }

/* Card surface */
.sdf-step-card {
  background: var(--white);
  border: 1px solid rgba(11,60,93,0.06);
  border-radius: 10px;
  padding: clamp(24px,2.5vw,36px);
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1);
}
.sdf-step-card:hover {
  border-color: rgba(71,181,255,0.25);
  box-shadow: 0 12px 40px rgba(11,60,93,0.08), 0 0 20px rgba(71,181,255,0.04);
  transform: translateY(-4px);
}

/* Top accent bar */
.sdf-step-accent {
  position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s;
}
.sdf-step.vis .sdf-step-accent { transform: scaleX(1); }

/* Glow on hover */
.sdf-step-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(71,181,255,0.04) 0%, transparent 100%);
  opacity: 0; transition: opacity 0.3s;
  pointer-events: none;
}
.sdf-step-card:hover::after { opacity: 1; }

/* Number */
.sdf-step-num {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.04em;
  background: var(--navy); color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
  transition: background 0.3s, transform 0.3s;
}
.sdf-step-card:hover .sdf-step-num {
  background: var(--accent); transform: scale(1.08);
}

@keyframes sdf-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(71,181,255,0.8); background: var(--accent); transform: scale(1.15); }
  50%  { box-shadow: 0 0 0 14px rgba(71,181,255,0); background: var(--accent); transform: scale(1.05); }
  100% { box-shadow: 0 0 0 14px rgba(71,181,255,0); background: var(--navy); transform: scale(1); }
}
.sdf-step-num.pulse { animation: sdf-pulse 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }

/* Step name */
.sdf-step-name {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(18px,1.6vw,24px);
  font-weight: 900; text-transform: uppercase;
  color: var(--navy); letter-spacing: -0.01em;
  line-height: 1; margin-bottom: 14px;
  transition: color 0.25s;
}
.sdf-step-card:hover .sdf-step-name { color: var(--accent); }

/* Step body */
.sdf-step-body {
  font-size: clamp(13px,0.95vw,14.5px);
  color: var(--muted); line-height: 1.78;
}

/* Connector dots between cards */
.sdf-step + .sdf-step::before {
  content: '';
  position: absolute; left: 0; top: 50%;
  width: 1px; height: 40%;
  transform: translateY(-50%);
  background: linear-gradient(to bottom, transparent, rgba(11,60,93,0.08) 30%, rgba(11,60,93,0.08) 70%, transparent);
}

/* ── Key Principle callout ── */
.sdf-principle {
  position: relative; z-index: 1;
  max-width: 1400px; margin: clamp(40px,4vw,64px) auto 0;
  display: flex; align-items: center;
  gap: clamp(24px,3vw,48px);
  padding: clamp(24px,2.5vw,36px) clamp(28px,3vw,44px);
  background: var(--white);
  border: 1px solid rgba(11,60,93,0.06);
  border-radius: 10px;
  border-left: 3px solid var(--accent);
  opacity: 0; transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1);
}
.sdf-principle.sdf-in { opacity: 1; transform: translateY(0); }
.sdf-principle-text {
  flex: 1;
}
.sdf-principle-label {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 8px; display: block;
}
.sdf-principle-strong {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(16px,1.4vw,22px);
  font-weight: 900; text-transform: uppercase;
  color: var(--navy); line-height: 1.1; letter-spacing: -0.01em;
}
.sdf-principle-sub {
  font-size: clamp(13px,0.95vw,15px); color: var(--muted);
  line-height: 1.7; margin-top: 10px;
}

/* CTA in principle bar */
.sdf-cta {
  position: relative;
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--navy); text-decoration: none;
  padding: 16px 28px; border: 1px solid var(--navy);
  background: transparent; overflow: hidden;
  white-space: nowrap; flex-shrink: 0;
  transition: color 0.4s;
}
.sdf-cta::before {
  content: ''; position: absolute; inset: 0;
  background: var(--navy);
  transform: translateX(-101%);
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
  z-index: 0;
}
.sdf-cta:hover::before { transform: translateX(0); }
.sdf-cta:hover { color: white; }
.sdf-cta-text { position: relative; z-index: 1; }
.sdf-cta-arr {
  position: relative; z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.sdf-cta:hover .sdf-cta-arr { transform: translateX(4px); }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .sdf-steps { grid-template-columns: repeat(2, 1fr); }
  .sdf-step:nth-child(n+3)::before { display: none; }
  .sdf-principle { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 768px) {
  .sdf-steps { grid-template-columns: 1fr; }
  .sdf-step + .sdf-step::before { display: none; }
  .sdf-step { padding: 8px 0; }
}
@media (max-width: 480px) {
  .sdf { padding: 48px 20px; }
}
@media (min-width: 1800px) {
  .sdf-track, .sdf-principle { max-width: 1600px; }
  .sdf-title { font-size: clamp(56px,4.8vw,88px); }
}
@media (min-width: 2400px) {
  .sdf-track, .sdf-principle { max-width: 1920px; }
}
</style>

<section class="sdf" id="sdfRoot" aria-labelledby="sdfTitle">

  <canvas class="sdf-canvas" id="sdfCanvas"></canvas>

  <!-- Header -->
  <header class="sdf-header">
    <div class="sdf-eyebrow">Structured Delivery Framework</div>
    <h2 class="sdf-title" id="sdfTitle" data-text="How We Bring Control to Infrastructure"></h2>
    <p class="sdf-intro">Across design, construction, and operations, we apply a disciplined four-step framework that aligns information, teams, and systems around what truly matters.</p>
  </header>

  <!-- Timeline -->
  <div class="sdf-track">
    <div class="sdf-steps">
      <div class="sdf-step" data-stop="12.5">
        <div class="sdf-step-card">
          <div class="sdf-step-accent"></div>
          <div class="sdf-step-num">01</div>
          <div class="sdf-step-name">Assess</div>
          <p class="sdf-step-body">We review contractual requirements, stakeholder objectives, and existing information maturity. Gaps, risks, and delivery constraints are identified before systems are deployed.</p>
        </div>
      </div>
      <div class="sdf-step" data-stop="37.5">
        <div class="sdf-step-card">
          <div class="sdf-step-accent"></div>
          <div class="sdf-step-num">02</div>
          <div class="sdf-step-name">Define</div>
          <p class="sdf-step-body">We translate project goals into clear information requirements, modeling standards, and data structures aligned with scale and risk. Scope and governance are established early.</p>
        </div>
      </div>
      <div class="sdf-step" data-stop="62.5">
        <div class="sdf-step-card">
          <div class="sdf-step-accent"></div>
          <div class="sdf-step-num">03</div>
          <div class="sdf-step-name">Implement</div>
          <p class="sdf-step-body">Structured digital workflows are deployed with discipline. CDE environments, validation protocols, coordination processes, and reporting frameworks. Only what adds measurable value is implemented.</p>
        </div>
      </div>
      <div class="sdf-step" data-stop="87.5">
        <div class="sdf-step-card">
          <div class="sdf-step-accent"></div>
          <div class="sdf-step-num">04</div>
          <div class="sdf-step-name">Control</div>
          <p class="sdf-step-body">Ongoing validation and oversight ensure model integrity, data consistency, and contractual alignment through delivery and handover. Control continues beyond construction.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Principle + CTA -->
  <div class="sdf-principle">
    <div class="sdf-principle-text">
      <span class="sdf-principle-label">Key Principle</span>
      <span class="sdf-principle-strong">Digital tools alone do not solve issues.</span>
      <p class="sdf-principle-sub">Our Structured Delivery Framework defines how information is assessed, governed, deployed, and controlled across the full lifecycle. Digital delivery must be engineered and planned.</p>
    </div>
    <a href="/process/" class="sdf-cta">
      <span class="sdf-cta-text">Discover The Process</span>
      <span class="sdf-cta-arr">→</span>
    </a>
  </div>

</section>`

const sectionScript = `
(function(){
'use strict';

var root = document.getElementById('sdfRoot');
if (!root) return;

/* ── Reveal ── */
var revealIO = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('sdf-reveal'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.06 });
revealIO.observe(root);

/* ══ CHARACTER FILL ON SCROLL ══ */
(function(){
  var titleEl = document.getElementById('sdfTitle');
  if (!titleEl) return;
  var text = titleEl.getAttribute('data-text') || '';
  var html = '';
  for (var i = 0; i < text.length; i++){
    if (text[i] === ' '){
      html += '<span class="sdf-char sdf-space"> </span>';
    } else {
      html += '<span class="sdf-char">' + text[i] + '</span>';
    }
  }
  titleEl.innerHTML = html;

  var chars = Array.from(titleEl.querySelectorAll('.sdf-char'));
  var total = chars.length;
  var ticking = false;

  function updateChars(){
    var rect = root.getBoundingClientRect();
    var winH = window.innerHeight;
    /* Slower fill: starts when section enters, completes when section top is 15% from viewport top */
    var start = winH;
    var end = winH * 0.15;
    var raw = (start - rect.top) / (start - end);
    var progress = Math.max(0, Math.min(1, raw));
    var filled = Math.floor(progress * total);

    for (var i = 0; i < total; i++){
      if (i < filled){
        chars[i].classList.add('sdf-filled');
      } else {
        chars[i].classList.remove('sdf-filled');
      }
    }
    ticking = false;
  }

  function onScroll(){
    if (!ticking){ ticking = true; requestAnimationFrame(updateChars); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateChars();
})();

/* ══ SCROLL ENTRANCE FOR ALL ELEMENTS ══ */
(function(){
  var eyebrow = root.querySelector('.sdf-eyebrow');
  var intro = root.querySelector('.sdf-intro');
  var steps = Array.from(root.querySelectorAll('.sdf-step'));
  var principle = root.querySelector('.sdf-principle');

  var targets = [];
  if (eyebrow) targets.push(eyebrow);
  if (intro) targets.push(intro);
  steps.forEach(function(s){ targets.push(s); });
  if (principle) targets.push(principle);

  var elIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add(e.target.classList.contains('sdf-step') ? 'vis' : 'sdf-in');
        elIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function(t){ elIO.observe(t); });
})();

/* ══ TOPOGRAPHIC CONTOUR CANVAS ══ */
(function(){
  var canvas = document.getElementById('sdfCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, paused = false, raf;
  var time = 0;

  function resize(){
    var r = root.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  /* Simple 2D noise approximation */
  var PERM = [];
  for (var i = 0; i < 512; i++) PERM[i] = Math.floor(Math.random() * 256);

  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerp(a,b,t){ return a + t*(b-a); }
  function grad(h,x,y){
    var v = (h & 1) === 0 ? x : y;
    return (h & 2) === 0 ? v : -v;
  }
  function noise2d(x,y){
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    var u = fade(x), v = fade(y);
    var a = PERM[X] + Y, b = PERM[X+1] + Y;
    return lerp(
      lerp(grad(PERM[a],x,y), grad(PERM[b],x-1,y), u),
      lerp(grad(PERM[a+1],x,y-1), grad(PERM[b+1],x-1,y-1), u),
      v
    );
  }

  var CONTOUR_LEVELS = 8;
  var SCALE = 0.0025;

  function draw(){
    if (paused) return;
    time += 0.0012;
    ctx.clearRect(0, 0, W, H);

    /* Draw contour lines using marching approach */
    var step = 28;
    var cols = Math.ceil(W / step) + 1;
    var rows = Math.ceil(H / step) + 1;

    /* Compute noise field */
    var field = [];
    for (var iy = 0; iy < rows; iy++){
      field[iy] = [];
      for (var ix = 0; ix < cols; ix++){
        field[iy][ix] = noise2d(ix * step * SCALE + time, iy * step * SCALE + time * 0.7);
      }
    }

    /* Draw contour segments */
    for (var level = 0; level < CONTOUR_LEVELS; level++){
      var threshold = -0.5 + (level / CONTOUR_LEVELS);
      var alpha = 0.03 + 0.02 * Math.sin(time * 1.5 + level * 0.8);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(71,181,255,' + alpha.toFixed(4) + ')';
      ctx.lineWidth = 0.6;

      for (var iy = 0; iy < rows - 1; iy++){
        for (var ix = 0; ix < cols - 1; ix++){
          var tl = field[iy][ix], tr = field[iy][ix+1];
          var bl = field[iy+1][ix], br = field[iy+1][ix+1];
          var x0 = ix * step, y0 = iy * step;

          /* Simple marching squares - find edge crossings */
          var edges = [];
          if ((tl >= threshold) !== (tr >= threshold)){
            var t = (threshold - tl) / (tr - tl);
            edges.push([x0 + t * step, y0]);
          }
          if ((tr >= threshold) !== (br >= threshold)){
            var t = (threshold - tr) / (br - tr);
            edges.push([x0 + step, y0 + t * step]);
          }
          if ((bl >= threshold) !== (br >= threshold)){
            var t = (threshold - bl) / (br - bl);
            edges.push([x0 + t * step, y0 + step]);
          }
          if ((tl >= threshold) !== (bl >= threshold)){
            var t = (threshold - tl) / (bl - tl);
            edges.push([x0, y0 + t * step]);
          }

          if (edges.length >= 2){
            ctx.moveTo(edges[0][0], edges[0][1]);
            ctx.lineTo(edges[1][0], edges[1][1]);
            if (edges.length === 4){
              ctx.moveTo(edges[2][0], edges[2][1]);
              ctx.lineTo(edges[3][0], edges[3][1]);
            }
          }
        }
      }
      ctx.stroke();
    }

    raf = requestAnimationFrame(draw);
  }

  var meshIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ paused = false; raf = requestAnimationFrame(draw); }
      else { paused = true; if (raf) cancelAnimationFrame(raf); }
    });
  }, { threshold: 0 });
  meshIO.observe(root);

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) return;

  resize(); draw();
  window.addEventListener('resize', resize);
})();


}());
`

export default function Section3() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section3 script error:', e)
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
