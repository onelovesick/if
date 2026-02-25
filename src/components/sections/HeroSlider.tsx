"use client"
import { useEffect } from 'react'

const sliderHtml = `<!-- ============================================================
     INFRAFORMA — Hero v2: Animated Creative Slider
     No images required — pure CSS/JS animated backgrounds
     4 slides auto-advance every 6s · fully self-contained
     WEBFLOW EMBED
     ============================================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');

.hv2 *, .hv2 *::before, .hv2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.hv2 {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #07111c;
  --text:   #F4F6F8;
  --muted:  rgba(244,246,248,0.5);

  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg);
}

/* ══ CANVAS — animated background ══ */
#hv2Canvas {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  z-index: 0;
}

/* ══ SLIDES ══ */
.hv2-slides {
  position: absolute;
  inset: 0;
  z-index: 5;
}

.hv2-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 5%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.08s ease;
}
.hv2-slide.active {
  opacity: 1;
  pointer-events: auto;
}

/* Slide content inner */
.hv2-sc {
  width: 48vw;
  max-width: 680px;
  min-width: 280px;
  overflow: hidden;
}

/* Slide accent strip — unique color per slide via data attr */
.hv2-slide-strip {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}
.hv2-strip-line {
  height: 1px; width: 40px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.hv2-slide.active .hv2-strip-line { transform: scaleX(1); }

.hv2-strip-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s;
}
.hv2-slide.active .hv2-strip-label { opacity: 1; transform: translateX(0); }

/* Headline — sized so INFRASTRUCTURE never overflows 50vw column */
.hv2-h {
  font-family: 'Inter', sans-serif;
  font-size: clamp(28px, 4.2vw, 72px);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 24px;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
}
.hv2-h-inner {
  display: block;
  transform: translateY(110%);
  transition: transform 0.75s cubic-bezier(0.22,1,0.36,1);
}
.hv2-h-inner:nth-child(2) { transition-delay: 0.08s; }
.hv2-h-inner:nth-child(3) { transition-delay: 0.16s; }
.hv2-slide.active .hv2-h-inner { transform: translateY(0); }

.hv2-h em {
  font-style: italic;
  font-weight: 900;
  -webkit-text-stroke: 1.5px #47B5FF;
  color: transparent;
}

/* Body */
.hv2-body {
  font-size: clamp(14px, 1.1vw, 16px);
  color: var(--muted);
  line-height: 1.8;
  max-width: 500px;
  margin-bottom: 36px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s;
}
.hv2-slide.active .hv2-body { opacity: 1; transform: translateY(0); }

/* Tagline */
.hv2-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.8);
  margin-bottom: 32px;
  opacity: 0;
  transition: opacity 0.5s ease 0.65s;
}
.hv2-slide.active .hv2-tag { opacity: 1; }

/* Buttons */
.hv2-btns {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s;
}
.hv2-slide.active .hv2-btns { opacity: 1; transform: translateY(0); }

.hv2-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0B3C5D;
  background: var(--accent);
  border-radius: 2px;
  padding: 14px 28px;
  text-decoration: none;
  transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
}
.hv2-btn-p:hover { background: #6bc5ff; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(71,181,255,0.35); }
.hv2-btn-arr { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
.hv2-btn-p:hover .hv2-btn-arr { transform: translateX(4px); }

.hv2-btn-g {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.75);
  border: 1px solid rgba(244,246,248,0.2);
  border-radius: 2px;
  padding: 13px 26px;
  text-decoration: none;
  transition: border-color 0.22s, color 0.22s, background 0.22s, transform 0.22s;
}
.hv2-btn-g:hover { border-color: rgba(71,181,255,0.5); color: #fff; background: rgba(71,181,255,0.07); transform: translateY(-2px); }

/* ══ RIGHT SIDE — large slide number + phase tabs ══ */
.hv2-right {
  position: absolute;
  right: 5%;
  bottom: 100px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

/* Large ghost number */
.hv2-bignum {
  font-family: 'Inter', sans-serif;
  font-size: clamp(100px, 14vw, 200px);
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 1px rgba(71,181,255,0.15);
  color: transparent;
  letter-spacing: -0.06em;
  transition: -webkit-text-stroke 0.4s ease;
  pointer-events: none;
  user-select: none;
}

/* Phase strip at bottom */
.hv2-phases {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 6;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border-top: 1px solid rgba(71,181,255,0.15);
}
.hv2-phase {
  padding: 18px 20px;
  border-right: 1px solid rgba(71,181,255,0.1);
  cursor: pointer;
  position: relative;
  background: rgba(7,17,28,0.7);
  backdrop-filter: blur(8px);
  transition: background 0.25s;
}
.hv2-phase:last-child { border-right: none; }
.hv2-phase:hover { background: rgba(71,181,255,0.07); }

/* Progress bar per phase */
.hv2-phase-prog {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: var(--accent);
  transition: width 0.1s linear;
}
.hv2-phase.active .hv2-phase-prog { /* width driven by JS */ }

.hv2-phase-num {
  display: block;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--accent);
  opacity: 0.5;
  margin-bottom: 4px;
}
.hv2-phase-name {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.5);
  transition: color 0.25s;
}
.hv2-phase.active .hv2-phase-name,
.hv2-phase:hover .hv2-phase-name { color: var(--text); }

/* ══ Controls ══ */
.hv2-nav {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 7;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hv2-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.4);
  cursor: pointer;
  transition: background 0.25s, transform 0.25s, border-color 0.25s;
}
.hv2-dot.active { background: var(--accent); border-color: var(--accent); transform: scale(1.5); }

/* Scroll hint */
.hv2-scroll {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: hv2-fade 0.6s ease forwards 2s; opacity: 0;
}
.hv2-scroll-line {
  width: 1px; height: 36px;
  background: linear-gradient(to bottom, rgba(71,181,255,0.7), transparent);
  animation: hv2-scroll-anim 1.8s ease-in-out infinite;
}
@keyframes hv2-scroll-anim { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.4);opacity:0.4} }

/* Corner marks */
.hv2-corner { position: absolute; width: 28px; height: 28px; z-index: 8; pointer-events: none; opacity: 0.35; }
.hv2-corner.tl { top: 20px; left: 20px; border-top: 1px solid #47B5FF; border-left: 1px solid #47B5FF; }
.hv2-corner.tr { top: 20px; right: 20px; border-top: 1px solid #47B5FF; border-right: 1px solid #47B5FF; }

@keyframes hv2-fade { from{opacity:0} to{opacity:0.7} }

/* ══ BREAKPOINTS ══ */
@media (max-width: 480px) {
  .hv2-slide { padding: 0 6%; }
  .hv2-sc { width: 88vw; max-width: 88vw; }
  .hv2-h  { font-size: clamp(24px, 7.5vw, 40px); }
  .hv2-bignum { display: none; }
  .hv2-nav { display: none; }
  .hv2-phases { grid-template-columns: repeat(2,1fr); }
  .hv2-btns { flex-direction: column; align-items: flex-start; }
}
@media (min-width: 481px) and (max-width: 767px) {
  .hv2-sc { width: 86vw; max-width: 86vw; }
  .hv2-h  { font-size: clamp(24px, 6.5vw, 48px); }
  .hv2-bignum { display: none; }
  .hv2-nav { display: none; }
  .hv2-phases { grid-template-columns: repeat(2,1fr); }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .hv2-sc { width: 62vw; max-width: 62vw; }
  .hv2-h  { font-size: clamp(24px, 5.2vw, 56px); }
  .hv2-bignum { display: none; }
  .hv2-nav { display: none; }
}
@media (min-width: 1024px) and (max-width: 1439px) {
  .hv2-sc { width: 46vw; }
  .hv2-h  { font-size: clamp(24px, 3.8vw, 60px); }
}
@media (min-width: 1440px) and (max-width: 1919px) {
  .hv2-sc { width: 44vw; }
  .hv2-h  { font-size: clamp(24px, 3.6vw, 64px); }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  .hv2-sc { width: 42vw; max-width: 800px; }
  .hv2-h  { font-size: clamp(24px, 3.3vw, 70px); }
  .hv2-body { font-size: 18px; }
}
@media (min-width: 2560px) and (max-width: 3199px) {
  .hv2-sc { width: 40vw; max-width: 960px; }
  .hv2-h  { font-size: clamp(24px, 3.0vw, 82px); }
  .hv2-body { font-size: 20px; }
  .hv2-phase { padding: 22px 24px; }
  .hv2-phase-name { font-size: 14px; }
}
@media (min-width: 3200px) {
  .hv2-sc { width: 38vw; max-width: 1200px; }
  .hv2-h  { font-size: clamp(24px, 2.8vw, 100px); }
  .hv2-body { font-size: 22px; }
  .hv2-phase { padding: 26px 28px; }
  .hv2-phase-name { font-size: 16px; }
  .hv2-btn-p, .hv2-btn-g { font-size: 14px; padding: 18px 36px; }
}
</style>

<section class="hv2" id="hv2Root">
  <canvas id="hv2Canvas"></canvas>

  <div class="hv2-corner tl"></div>
  <div class="hv2-corner tr"></div>

  <!-- SLIDES -->
  <div class="hv2-slides">

    <!-- Slide 1 -->
    <div class="hv2-slide active" data-slide="0">
      <div class="hv2-sc">
        <div class="hv2-slide-strip">
          <div class="hv2-strip-line"></div>
          <span class="hv2-strip-label">Human-Led, Digitally Enabled</span>
        </div>
        <h1 class="hv2-h">
          <span class="hv2-h-inner">Infrastructure,</span>
          <span class="hv2-h-inner"><em>Thought</em></span>
          <span class="hv2-h-inner">Through.</span>
        </h1>
        <p class="hv2-body">We help owners and delivery teams structure information and systems so projects move from design to operations with clarity and control.</p>
        <p class="hv2-tag">Strategic digital engineering &amp; information management</p>
        <div class="hv2-btns">
          <a href="/process" class="hv2-btn-p">Discover The Process <span class="hv2-btn-arr">→</span></a>
          <a href="/contact" class="hv2-btn-g">Contact Us</a>
        </div>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="hv2-slide" data-slide="1">
      <div class="hv2-sc">
        <div class="hv2-slide-strip">
          <div class="hv2-strip-line"></div>
          <span class="hv2-strip-label">BIM &amp; Digital Delivery</span>
        </div>
        <h1 class="hv2-h">
          <span class="hv2-h-inner">Data That</span>
          <span class="hv2-h-inner"><em>Builds</em></span>
          <span class="hv2-h-inner">Certainty.</span>
        </h1>
        <p class="hv2-body">55+ years of combined expertise across Canada, the United States, and international markets — delivering $50B+ in assets with precision-engineered digital workflows.</p>
        <p class="hv2-tag">ISO 19650 · BIM Standards · Digital Twin</p>
        <div class="hv2-btns">
          <a href="/services" class="hv2-btn-p">Our Solutions <span class="hv2-btn-arr">→</span></a>
          <a href="/about"   class="hv2-btn-g">About Us</a>
        </div>
      </div>
    </div>

    <!-- Slide 3 -->
    <div class="hv2-slide" data-slide="2">
      <div class="hv2-sc">
        <div class="hv2-slide-strip">
          <div class="hv2-strip-line"></div>
          <span class="hv2-strip-label">From Field to Boardroom</span>
        </div>
        <h1 class="hv2-h">
          <span class="hv2-h-inner">Every</span>
          <span class="hv2-h-inner">Decision</span>
          <span class="hv2-h-inner"><em>Informed.</em></span>
        </h1>
        <p class="hv2-body">We design controlled digital ecosystems that align with enterprise culture — transforming complex construction data into decisive intelligence at every project phase.</p>
        <p class="hv2-tag">Strategy · Structure · Intelligence · Execution</p>
        <div class="hv2-btns">
          <a href="/who-we-support" class="hv2-btn-p">Who We Support <span class="hv2-btn-arr">→</span></a>
          <a href="/contact"        class="hv2-btn-g">Get In Touch</a>
        </div>
      </div>
    </div>

    <!-- Slide 4 -->
    <div class="hv2-slide" data-slide="3">
      <div class="hv2-sc">
        <div class="hv2-slide-strip">
          <div class="hv2-strip-line"></div>
          <span class="hv2-strip-label">Québec-Based · Canada · International</span>
        </div>
        <h1 class="hv2-h">
          <span class="hv2-h-inner">Built For</span>
          <span class="hv2-h-inner"><em>Complex</em></span>
          <span class="hv2-h-inner">Programmes.</span>
        </h1>
        <p class="hv2-body">From P3 infrastructure to institutional campuses — we deliver the BIM governance, data architecture, and real-time intelligence your programme demands.</p>
        <p class="hv2-tag">DBB · DB · PPP/P3 · CM · IPD</p>
        <div class="hv2-btns">
          <a href="/industries" class="hv2-btn-p">Industries We Serve <span class="hv2-btn-arr">→</span></a>
          <a href="/contact"    class="hv2-btn-g">Start A Conversation</a>
        </div>
      </div>
    </div>

  </div>

  <!-- Ghost number -->
  <div class="hv2-right">
    <div class="hv2-bignum" id="hv2Bignum">01</div>
  </div>

  <!-- Dot nav -->
  <div class="hv2-nav" id="hv2Nav">
    <div class="hv2-dot active" data-i="0"></div>
    <div class="hv2-dot" data-i="1"></div>
    <div class="hv2-dot" data-i="2"></div>
    <div class="hv2-dot" data-i="3"></div>
  </div>

  <!-- Phase tabs -->
  <div class="hv2-phases">
    <div class="hv2-phase active" data-i="0">
      <div class="hv2-phase-prog"></div>
      <span class="hv2-phase-num">01</span>
      <span class="hv2-phase-name">Strategy</span>
    </div>
    <div class="hv2-phase" data-i="1">
      <div class="hv2-phase-prog"></div>
      <span class="hv2-phase-num">02</span>
      <span class="hv2-phase-name">Design</span>
    </div>
    <div class="hv2-phase" data-i="2">
      <div class="hv2-phase-prog"></div>
      <span class="hv2-phase-num">03</span>
      <span class="hv2-phase-name">Construction</span>
    </div>
    <div class="hv2-phase" data-i="3">
      <div class="hv2-phase-prog"></div>
      <span class="hv2-phase-num">04</span>
      <span class="hv2-phase-name">Operations &amp; Maintenance</span>
    </div>
  </div>

  <div class="hv2-scroll"><div class="hv2-scroll-line"></div></div>
</section>`
const sliderScript = "(function(){\n'use strict';\n\n/* \u2550\u2550 CANVAS \u2014 animated data stream background \u2550\u2550 */\nvar canvas = document.getElementById('hv2Canvas');\nvar ctx    = canvas.getContext('2d');\nvar W, H;\n\nfunction resize(){\n  W = canvas.width  = canvas.offsetWidth;\n  H = canvas.height = canvas.offsetHeight;\n}\nresize();\nwindow.addEventListener('resize', resize);\n\n/* Grid nodes */\nvar COLS = 18, ROWS = 10;\nvar nodes = [];\nfor(var r=0; r<ROWS; r++){\n  for(var c=0; c<COLS; c++){\n    nodes.push({\n      x: (c/(COLS-1)),\n      y: (r/(ROWS-1)),\n      ox:(c/(COLS-1)),\n      oy:(r/(ROWS-1)),\n      vx: (Math.random()-0.5)*0.0003,\n      vy: (Math.random()-0.5)*0.0003,\n      size: Math.random()*1.2+0.4,\n      alpha: Math.random()*0.4+0.05,\n    });\n  }\n}\n\n/* Data streams \u2014 vertical lines that fall */\nvar streams = [];\nfor(var i=0;i<24;i++){\n  streams.push({\n    x: Math.random(),\n    y: Math.random(),\n    speed: Math.random()*0.0008+0.0003,\n    length: Math.random()*0.18+0.06,\n    alpha: Math.random()*0.25+0.05,\n    width: Math.random()>0.7?2:1,\n  });\n}\n\n/* Animated rings */\nvar rings = [];\nfor(var j=0;j<5;j++){\n  rings.push({\n    x: Math.random(),\n    y: Math.random()*0.6+0.2,\n    r: Math.random()*0.08+0.03,\n    maxR: Math.random()*0.18+0.06,\n    speed: Math.random()*0.0005+0.0002,\n    alpha: 0.12,\n  });\n}\n\nvar colors = ['#47B5FF','#2E99E0','#1A6FAD'];\nvar t = 0;\n\nfunction draw(){\n  t += 0.004;\n  ctx.clearRect(0,0,W,H);\n\n  /* Deep gradient bg */\n  var grd = ctx.createLinearGradient(0,0,W,H);\n  grd.addColorStop(0,'#050e18');\n  grd.addColorStop(0.5,'#071520');\n  grd.addColorStop(1,'#050e18');\n  ctx.fillStyle = grd;\n  ctx.fillRect(0,0,W,H);\n\n  /* Grid lines */\n  ctx.strokeStyle = 'rgba(71,181,255,0.04)';\n  ctx.lineWidth = 0.5;\n  var GSIZE = 56;\n  for(var gx=0;gx<W;gx+=GSIZE){\n    ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke();\n  }\n  for(var gy=0;gy<H;gy+=GSIZE){\n    ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke();\n  }\n\n  /* Data streams */\n  streams.forEach(function(s){\n    s.y += s.speed;\n    if(s.y > 1.2) { s.y = -s.length; s.x = Math.random(); }\n    var sx = s.x * W;\n    var sy = s.y * H;\n    var gd = ctx.createLinearGradient(sx,sy,sx,sy+s.length*H);\n    gd.addColorStop(0,'rgba(71,181,255,0)');\n    gd.addColorStop(0.4,'rgba(71,181,255,'+(s.alpha)+')');\n    gd.addColorStop(1,'rgba(71,181,255,0)');\n    ctx.strokeStyle = gd;\n    ctx.lineWidth = s.width;\n    ctx.beginPath();\n    ctx.moveTo(sx, sy);\n    ctx.lineTo(sx, sy + s.length*H);\n    ctx.stroke();\n  });\n\n  /* Expanding rings */\n  rings.forEach(function(ring){\n    ring.r += ring.speed;\n    if(ring.r > ring.maxR){ ring.r = 0.02; ring.x = Math.random(); ring.y = Math.random()*0.6+0.2; }\n    var fade = 1 - ring.r/ring.maxR;\n    ctx.strokeStyle = 'rgba(71,181,255,'+(ring.alpha*fade)+')';\n    ctx.lineWidth = 0.8;\n    ctx.beginPath();\n    ctx.arc(ring.x*W, ring.y*H, ring.r*Math.min(W,H), 0, Math.PI*2);\n    ctx.stroke();\n  });\n\n  /* Nodes \u2014 drift gently */\n  nodes.forEach(function(n){\n    n.x += n.vx;\n    n.y += n.vy;\n    if(n.x<0||n.x>1) n.vx*=-1;\n    if(n.y<0||n.y>1) n.vy*=-1;\n    var pulse = 0.5+0.5*Math.sin(t*1.5+n.ox*10+n.oy*7);\n    ctx.fillStyle = 'rgba(71,181,255,'+(n.alpha*(0.5+0.5*pulse))+')';\n    ctx.beginPath();\n    ctx.arc(n.x*W, n.y*H, n.size*pulse+0.3, 0, Math.PI*2);\n    ctx.fill();\n  });\n\n  /* Connect nearby nodes */\n  ctx.lineWidth = 0.4;\n  for(var a=0;a<nodes.length;a++){\n    for(var b=a+1;b<nodes.length;b++){\n      var dx = (nodes[a].x-nodes[b].x)*W;\n      var dy = (nodes[a].y-nodes[b].y)*H;\n      var dist = Math.sqrt(dx*dx+dy*dy);\n      if(dist < 90){\n        ctx.strokeStyle = 'rgba(71,181,255,'+(0.06*(1-dist/90))+')';\n        ctx.beginPath();\n        ctx.moveTo(nodes[a].x*W, nodes[a].y*H);\n        ctx.lineTo(nodes[b].x*W, nodes[b].y*H);\n        ctx.stroke();\n      }\n    }\n  }\n\n  /* Left vignette for readability */\n  var vig = ctx.createLinearGradient(0,0,W*0.6,0);\n  vig.addColorStop(0,'rgba(5,14,24,0.85)');\n  vig.addColorStop(0.5,'rgba(5,14,24,0.4)');\n  vig.addColorStop(1,'rgba(5,14,24,0)');\n  ctx.fillStyle = vig;\n  ctx.fillRect(0,0,W,H);\n\n  /* Bottom vignette */\n  var bvig = ctx.createLinearGradient(0,H*0.7,0,H);\n  bvig.addColorStop(0,'rgba(5,14,24,0)');\n  bvig.addColorStop(1,'rgba(5,14,24,0.9)');\n  ctx.fillStyle = bvig;\n  ctx.fillRect(0,H*0.7,W,H*0.3);\n\n  requestAnimationFrame(draw);\n}\ndraw();\n\n/* \u2550\u2550 SLIDER LOGIC \u2550\u2550 */\nvar DURATION = 6000;\nvar current  = 0;\nvar slides    = document.querySelectorAll('.hv2-slide');\nvar dots      = document.querySelectorAll('.hv2-dot');\nvar phases    = document.querySelectorAll('.hv2-phase');\nvar bignum    = document.getElementById('hv2Bignum');\nvar progs     = document.querySelectorAll('.hv2-phase-prog');\nvar total     = slides.length;\nvar progStart = null;\nvar animId    = null;\n\nfunction goTo(i){\n  slides[current].classList.remove('active');\n  dots[current].classList.remove('active');\n  phases[current].classList.remove('active');\n  progs[current].style.width = '0%';\n\n  current = (i + total) % total;\n\n  slides[current].classList.add('active');\n  dots[current].classList.add('active');\n  phases[current].classList.add('active');\n  bignum.textContent = String(current+1).padStart(2,'0');\n\n  progStart = null;\n  cancelAnimationFrame(animId);\n  animProgress();\n}\n\nfunction animProgress(){\n  animId = requestAnimationFrame(function(ts){\n    if(!progStart) progStart = ts;\n    var pct = Math.min((ts - progStart) / DURATION, 1) * 100;\n    progs[current].style.width = pct + '%';\n    if(pct < 100) animProgress();\n    else goTo(current + 1);\n  });\n}\n\ndots.forEach(function(d){\n  d.addEventListener('click', function(){ goTo(+d.getAttribute('data-i')); });\n});\nphases.forEach(function(p){\n  p.addEventListener('click', function(){ goTo(+p.getAttribute('data-i')); });\n});\n\n/* Keyboard nav */\ndocument.addEventListener('keydown', function(e){\n  if(e.key==='ArrowRight') goTo(current+1);\n  if(e.key==='ArrowLeft')  goTo(current-1);\n});\n\nanimProgress();\n\n}());"

export default function HeroSlider() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sliderScript)()
      } catch(e) {
        console.error('Slider script error:', e)
      }
    }, 50)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sliderHtml }}
    />
  )
}
