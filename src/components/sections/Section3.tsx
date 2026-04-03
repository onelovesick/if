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
}
.sdf-eyebrow::before, .sdf-eyebrow::after {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}
.sdf-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(32px,4vw,64px);
  font-weight: 900; text-transform: uppercase;
  color: var(--navy); line-height: 0.95;
  letter-spacing: -0.025em; margin-bottom: 20px;
}
.sdf-title-accent {
  display: inline;
  background: linear-gradient(100deg, var(--navy) 0%, var(--accent) 60%, #1A6FAD 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.sdf-intro {
  font-size: clamp(14px,1.1vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 620px; margin: 0 auto;
}

/* ── Timeline track ── */
.sdf-track {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
}

/* Horizontal rail */
.sdf-rail {
  position: relative; height: 3px;
  background: rgba(11,60,93,0.06);
  border-radius: 2px;
  margin-bottom: 0;
}
.sdf-rail-fill {
  position: absolute; top: 0; left: 0;
  height: 100%; width: 0%;
  background: linear-gradient(90deg, var(--accent), rgba(71,181,255,0.4));
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(71,181,255,0.3);
}
.sdf-rail-dot {
  position: absolute; top: 50%; left: 0;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(71,181,255,0.2), 0 0 20px rgba(71,181,255,0.5);
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 2;
}
/* Dot trail glow */
.sdf-rail-glow {
  position: absolute; top: 50%; left: 0;
  width: 80px; height: 3px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.6), transparent);
  transform: translate(-100%, -50%);
  opacity: 0;
  filter: blur(2px);
  z-index: 1;
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
  transform: translateY(24px) scale(0.97);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.sdf-step.vis { opacity: 1; transform: translateY(0) scale(1); }

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
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
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
}
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
  .sdf-title { font-size: clamp(56px,4vw,76px); }
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
    <h2 class="sdf-title" id="sdfTitle">How We Bring <span class="sdf-title-accent">Control</span> to Infrastructure</h2>
    <p class="sdf-intro">Across design, construction, and operations, we apply a disciplined four-step framework that aligns information, teams, and systems around what truly matters.</p>
  </header>

  <!-- Timeline -->
  <div class="sdf-track">
    <div class="sdf-rail" id="sdfRail">
      <div class="sdf-rail-fill" id="sdfFill"></div>
      <div class="sdf-rail-glow" id="sdfGlow"></div>
      <div class="sdf-rail-dot" id="sdfDot"></div>
    </div>

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

/* ══ GEOMETRIC GRID CANVAS ══ */
(function(){
  var canvas = document.getElementById('sdfCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, scrollY = 0, paused = false, raf;
  var nodes = [];
  var NODE_COUNT = 50;
  var CONN_DIST = 180;
  var time = 0;

  function resize(){
    var r = root.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++){
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        size: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(){
    if (paused) return;
    time += 0.008;
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < NODE_COUNT; i++){
      var p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }

    /* connections */
    for (var i = 0; i < NODE_COUNT; i++){
      var a = nodes[i];
      for (var j = i + 1; j < NODE_COUNT; j++){
        var b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CONN_DIST){
          var alpha = (1 - dist / CONN_DIST) * 0.08;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(11,60,93,' + alpha.toFixed(4) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    /* nodes */
    for (var i = 0; i < NODE_COUNT; i++){
      var p = nodes[i];
      var pulse = 0.6 + 0.4 * Math.sin(time * 2 + p.phase);
      var alpha = 0.06 * pulse;
      ctx.beginPath();
      ctx.arc(p.x, p.y + scrollY * 0.02, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(11,60,93,' + alpha.toFixed(4) + ')';
      ctx.fill();
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

  resize(); init();
  window.addEventListener('resize', function(){ resize(); init(); });
  window.addEventListener('scroll', function(){ scrollY = -root.getBoundingClientRect().top; }, { passive: true });
  draw();
})();

/* ══ TIMELINE ANIMATION ══ */
(function(){
  var fill   = document.getElementById('sdfFill');
  var dot    = document.getElementById('sdfDot');
  var glow   = document.getElementById('sdfGlow');
  var steps  = Array.from(document.querySelectorAll('.sdf-step'));
  var nums   = Array.from(document.querySelectorAll('.sdf-step-num'));
  var fired  = false;

  function easeInOut(t){ return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function runSequence(){
    var stepDur = 600;
    var pause   = 140;

    dot.style.opacity  = '1';
    glow.style.opacity = '1';
    dot.style.left  = '0%';
    glow.style.left = '0%';
    fill.style.width = '0%';

    var stops = steps.map(function(s){ return parseFloat(s.getAttribute('data-stop')); });

    function animateTo(idx, startPct, endPct, onDone){
      var start = null;
      function frame(ts){
        if (!start) start = ts;
        var t = Math.min((ts - start) / stepDur, 1);
        var cur = startPct + (endPct - startPct) * easeInOut(t);
        dot.style.left  = cur + '%';
        glow.style.left = cur + '%';
        fill.style.width = cur + '%';
        if (t < 1){ requestAnimationFrame(frame); return; }
        setTimeout(function(){
          var num = nums[idx];
          num.classList.remove('pulse');
          void num.offsetWidth;
          num.classList.add('pulse');
          steps[idx].classList.add('vis');
          setTimeout(onDone, pause);
        }, 40);
      }
      requestAnimationFrame(frame);
    }

    animateTo(0, 0, stops[0], function(){
      animateTo(1, stops[0], stops[1], function(){
        animateTo(2, stops[1], stops[2], function(){
          animateTo(3, stops[2], stops[3], function(){
            dot.style.transition  = 'opacity 0.6s ease';
            glow.style.transition = 'opacity 0.6s ease';
            dot.style.opacity  = '0';
            glow.style.opacity = '0';
            fill.style.width = '100%';
          });
        });
      });
    });
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting && !fired){
        fired = true; io.disconnect();
        setTimeout(runSequence, 400);
      }
    });
  }, { threshold: 0.25 });
  if (root) io.observe(root);
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
