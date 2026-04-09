"use client"
import { useEffect } from 'react'

const introHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');

.hi *, .hi *::before, .hi *::after { box-sizing: border-box; margin: 0; padding: 0; }

.hi {
  position: relative;
  width: 100%;
  height: 300vh;
  background: #03040a;
  overflow: hidden;
}

/* ══ FIXED CANVAS LAYER ══ */
.hi-canvas-wrap {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 0;
  pointer-events: none;
}
.hi-canvas-wrap canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* ══ FIXED UI OVERLAY ══ */
.hi-ui {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 1;
  pointer-events: none;
}

/* Brand top-left */
.hi-brand {
  position: absolute;
  top: clamp(24px,3vw,40px);
  left: clamp(24px,4vw,48px);
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.12);
  opacity: 0;
  animation: hiFade 1.2s ease forwards 0.5s;
}

/* Tagline bottom-right */
.hi-tagline {
  position: absolute;
  bottom: clamp(24px,3vw,40px);
  right: clamp(24px,4vw,48px);
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.08);
  opacity: 0;
  animation: hiFade 1.2s ease forwards 1s;
}

/* Scroll prompt bottom-center */
.hi-scroll {
  position: absolute;
  bottom: clamp(28px,4vw,48px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: hiFade 1s ease forwards 1.5s;
}
.hi-scroll-text {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
}
.hi-scroll-bar {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, rgba(71,181,255,0.4), transparent);
  animation: hiBarPulse 2.4s ease-in-out infinite;
}
@keyframes hiBarPulse {
  0%, 100% { opacity: 0.2; transform: scaleY(0.7); }
  50% { opacity: 0.7; transform: scaleY(1); }
}

/* Center title that fades in during scroll */
.hi-center-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
.hi-center-word {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(32px, 6vw, 90px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: rgba(255,255,255,0);
  display: block;
  transition: color 0.8s ease, text-shadow 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  transform: translateY(20px);
}
.hi-center-word.hi-w-accent {
  color: rgba(71,181,255,0);
  transition: color 0.8s ease, text-shadow 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
}

/* Enter prompt */
.hi-enter {
  position: absolute;
  bottom: clamp(80px,12vh,140px);
  left: 50%;
  transform: translateX(-50%);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0);
  transition: color 1.2s ease;
  white-space: nowrap;
}

/* Corner brackets */
.hi-corner {
  position: absolute;
  width: 24px; height: 24px;
  opacity: 0;
  animation: hiFade 0.6s ease forwards 0.8s;
}
.hi-corner.tl { top: clamp(20px,2.5vw,36px); left: clamp(20px,3.5vw,44px); border-top: 1px solid rgba(71,181,255,0.15); border-left: 1px solid rgba(71,181,255,0.15); }
.hi-corner.tr { top: clamp(20px,2.5vw,36px); right: clamp(20px,3.5vw,44px); border-top: 1px solid rgba(71,181,255,0.15); border-right: 1px solid rgba(71,181,255,0.15); }
.hi-corner.bl { bottom: clamp(20px,2.5vw,36px); left: clamp(20px,3.5vw,44px); border-bottom: 1px solid rgba(71,181,255,0.08); border-left: 1px solid rgba(71,181,255,0.08); }
.hi-corner.br { bottom: clamp(20px,2.5vw,36px); right: clamp(20px,3.5vw,44px); border-bottom: 1px solid rgba(71,181,255,0.08); border-right: 1px solid rgba(71,181,255,0.08); }

/* Scan line */
.hi-scanline {
  position: absolute;
  left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.08), transparent);
  animation: hiScan 6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes hiScan { 0% { top: 0; } 100% { top: 100%; } }

@keyframes hiFade { to { opacity: 1; } }

/* ══ Responsive ══ */
@media (max-width: 640px) {
  .hi-center-word { font-size: clamp(28px, 10vw, 48px); }
  .hi-brand, .hi-tagline { font-size: 7px; }
}
</style>

<section class="hi" id="hiRoot">
  <div class="hi-canvas-wrap" id="hiCanvasWrap"></div>

  <div class="hi-ui" id="hiUi">
    <span class="hi-brand">INFRAFORMA</span>
    <span class="hi-tagline">Structural Intelligence</span>

    <div class="hi-corner tl"></div>
    <div class="hi-corner tr"></div>
    <div class="hi-corner bl"></div>
    <div class="hi-corner br"></div>
    <div class="hi-scanline"></div>

    <div class="hi-center-title" id="hiTitle">
      <span class="hi-center-word" id="hiW1">One World.</span>
      <span class="hi-center-word hi-w-accent" id="hiW2">One Standard.</span>
      <span class="hi-center-word" id="hiW3">Built Right.</span>
    </div>

    <span class="hi-enter" id="hiEnter">Enter the System</span>

    <div class="hi-scroll" id="hiScroll">
      <span class="hi-scroll-text">Scroll</span>
      <div class="hi-scroll-bar"></div>
    </div>
  </div>
</section>`

const introScript = `(function(){
'use strict';

var root = document.getElementById('hiRoot');
if (!root) return;

var wrap = document.getElementById('hiCanvasWrap');
var ui = document.getElementById('hiUi');
var w1 = document.getElementById('hiW1');
var w2 = document.getElementById('hiW2');
var w3 = document.getElementById('hiW3');
var enterEl = document.getElementById('hiEnter');
var scrollEl = document.getElementById('hiScroll');

/* ══ CANVAS SETUP ══ */
var canvas = document.createElement('canvas');
wrap.appendChild(canvas);
var ctx = canvas.getContext('2d');
var dpr = Math.min(window.devicePixelRatio || 1, 2);
var W, H;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener('resize', resize);

/* ══ PARTICLES ══ */
var PARTICLE_COUNT = 120;
var particles = [];
var connections = [];

for (var i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    baseAlpha: Math.random() * 0.3 + 0.1,
    pulseOffset: Math.random() * Math.PI * 2
  });
}

/* ══ GRID ══ */
var gridSpacing = 80;

function drawGrid(alpha) {
  if (alpha < 0.005) return;
  ctx.strokeStyle = 'rgba(71,181,255,' + (0.04 * alpha) + ')';
  ctx.lineWidth = 0.5;
  for (var x = 0; x < W; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (var y = 0; y < H; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

/* ══ RENDER ══ */
var scrollProgress = 0;
var time = 0;
var rafId;

function render() {
  time += 0.008;
  ctx.clearRect(0, 0, W, H);

  /* Determine scroll progress (0 to 1 over 300vh) */
  var rect = root.getBoundingClientRect();
  var totalScroll = root.offsetHeight - window.innerHeight;
  scrollProgress = Math.max(0, Math.min(1, -rect.top / totalScroll));

  /* Phase logic */
  var gridAlpha = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) / 0.2);
  var particleAlpha = scrollProgress < 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) / 0.15);
  var titleProgress = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.25));
  var enterProgress = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.15));
  var fadeOut = scrollProgress > 0.75 ? Math.max(0, 1 - (scrollProgress - 0.75) / 0.25) : 1;

  /* Grid */
  drawGrid(gridAlpha * fadeOut);

  /* Connection distance */
  var connDist = 120;

  /* Update & draw particles */
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;

    var pulse = Math.sin(time * 2 + p.pulseOffset) * 0.5 + 0.5;
    var alpha = p.baseAlpha * (0.5 + pulse * 0.5) * particleAlpha * fadeOut;

    if (alpha < 0.005) continue;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(71,181,255,' + alpha + ')';
    ctx.fill();

    /* Connections */
    for (var j = i + 1; j < particles.length; j++) {
      var p2 = particles[j];
      var dx = p.x - p2.x;
      var dy = p.y - p2.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connDist) {
        var lineAlpha = (1 - dist / connDist) * 0.08 * particleAlpha * fadeOut;
        if (lineAlpha > 0.003) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(71,181,255,' + lineAlpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  /* Central glow that intensifies with scroll */
  var glowAlpha = 0.04 + scrollProgress * 0.08;
  var grad = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.4);
  grad.addColorStop(0, 'rgba(71,181,255,' + (glowAlpha * fadeOut) + ')');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  /* ══ UI Updates ══ */

  /* Title reveal */
  if (w1) {
    var w1p = Math.max(0, Math.min(1, titleProgress / 0.33));
    w1.style.color = 'rgba(255,255,255,' + w1p + ')';
    w1.style.transform = 'translateY(' + (20 * (1 - w1p)) + 'px)';
    w1.style.textShadow = '0 0 ' + (40 * w1p) + 'px rgba(255,255,255,' + (0.1 * w1p) + ')';
  }
  if (w2) {
    var w2p = Math.max(0, Math.min(1, (titleProgress - 0.25) / 0.33));
    w2.style.color = 'rgba(71,181,255,' + w2p + ')';
    w2.style.transform = 'translateY(' + (20 * (1 - w2p)) + 'px)';
    w2.style.textShadow = '0 0 ' + (50 * w2p) + 'px rgba(71,181,255,' + (0.15 * w2p) + ')';
  }
  if (w3) {
    var w3p = Math.max(0, Math.min(1, (titleProgress - 0.5) / 0.33));
    w3.style.color = 'rgba(255,255,255,' + w3p + ')';
    w3.style.transform = 'translateY(' + (20 * (1 - w3p)) + 'px)';
    w3.style.textShadow = '0 0 ' + (40 * w3p) + 'px rgba(255,255,255,' + (0.1 * w3p) + ')';
  }

  /* Enter prompt */
  if (enterEl) {
    enterEl.style.color = 'rgba(255,255,255,' + (enterProgress * 0.4 * fadeOut) + ')';
  }

  /* Hide scroll hint as user scrolls */
  if (scrollEl) {
    scrollEl.style.opacity = String(Math.max(0, 1 - scrollProgress * 4));
  }

  /* Fade entire UI on exit */
  if (ui && scrollProgress > 0.75) {
    ui.style.opacity = String(fadeOut);
  }

  /* Hide fixed layers once section is scrolled past */
  if (scrollProgress >= 0.99) {
    wrap.style.display = 'none';
    ui.style.display = 'none';
    return;
  } else {
    wrap.style.display = '';
    ui.style.display = '';
  }

  rafId = requestAnimationFrame(render);
}

rafId = requestAnimationFrame(render);

/* Cleanup on section leave */
var obs = new IntersectionObserver(function(entries) {
  if (!entries[0].isIntersecting) {
    wrap.style.display = 'none';
    ui.style.display = 'none';
  } else {
    wrap.style.display = '';
    ui.style.display = '';
    if (!rafId) rafId = requestAnimationFrame(render);
  }
}, { threshold: 0 });
obs.observe(root);

}());`

export default function HeroIntro() {
  useEffect(() => {
    setTimeout(() => {
      try {
        new Function(introScript)()
      } catch(e) {
        console.error('HeroIntro script error:', e)
      }
    }, 100)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: introHtml }}
    />
  )
}
