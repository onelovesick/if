'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-loop {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  .exec-loop::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .exec-loop-glow-top {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 50%;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .exec-loop-glow-centre {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(71,181,255,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  .exec-loop-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .exec-loop-header { text-align: center; margin-bottom: 80px; }

  .exec-loop-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .exec-loop-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .exec-loop h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 46px); line-height: 1.08;
    letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px;
  }
  .exec-loop h2 em { font-style: italic; color: #47B5FF; }

  .exec-loop-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 640px; margin: 0 auto;
  }

  /* ═══════════════════════════════════════
     LOOP VISUAL — Hexagonal cycle
     ═══════════════════════════════════════ */
  .exec-loop-visual {
    position: relative;
    width: 100%;
    max-width: 680px;
    margin: 0 auto 80px;
    aspect-ratio: 1;
  }

  .exec-loop-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .exec-loop-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Node positions — hexagonal arrangement */
  .exec-loop-node {
    position: absolute;
    width: 130px;
    text-align: center;
    transform: translate(-50%, -50%);
    cursor: default;
    z-index: 2;
  }

  .exec-loop-node-ring {
    width: 56px;
    height: 56px;
    border: 2px solid rgba(71,181,255,0.25);
    border-radius: 50%;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(28,31,35,0.9);
    transition: all 0.5s ease;
    position: relative;
  }

  .exec-loop-node-ring::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.08);
    transition: all 0.5s ease;
  }

  .exec-loop-node:hover .exec-loop-node-ring {
    border-color: rgba(71,181,255,0.6);
    box-shadow: 0 0 24px rgba(71,181,255,0.15);
  }

  .exec-loop-node:hover .exec-loop-node-ring::before {
    border-color: rgba(71,181,255,0.2);
  }

  .exec-loop-node-num {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    font-weight: 500;
    color: #47B5FF;
    letter-spacing: 0.05em;
  }

  .exec-loop-node-label {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #F4F6F8;
    line-height: 1.3;
    margin-bottom: 4px;
    transition: color 0.3s ease;
  }

  .exec-loop-node:hover .exec-loop-node-label { color: #47B5FF; }

  .exec-loop-node-desc {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.08em;
    color: rgba(122,155,181,0.5);
    line-height: 1.5;
    text-transform: uppercase;
  }

  /* Node positions: hexagon (top, top-right, bottom-right, bottom, bottom-left, top-left) */
  .exec-loop-node[data-node="1"] { top: 8%; left: 50%; }
  .exec-loop-node[data-node="2"] { top: 28%; left: 87%; }
  .exec-loop-node[data-node="3"] { top: 68%; left: 87%; }
  .exec-loop-node[data-node="4"] { top: 88%; left: 50%; }
  .exec-loop-node[data-node="5"] { top: 68%; left: 13%; }
  .exec-loop-node[data-node="6"] { top: 28%; left: 13%; }

  /* Centre hub */
  .exec-loop-hub {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 3;
  }

  .exec-loop-hub-ring {
    width: 100px;
    height: 100px;
    border: 2px solid rgba(71,181,255,0.15);
    border-radius: 50%;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(28,31,35,0.95);
    position: relative;
    animation: exec-hub-pulse 5s ease-in-out infinite;
  }

  .exec-loop-hub-ring::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.06);
    animation: exec-hub-pulse 5s ease-in-out infinite 0.8s;
  }

  .exec-loop-hub-ring::after {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid rgba(71,181,255,0.03);
    animation: exec-hub-pulse 5s ease-in-out infinite 1.6s;
  }

  @keyframes exec-hub-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.04); opacity: 0.85; }
  }

  .exec-loop-hub-text {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: #47B5FF;
  }

  .exec-loop-hub-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.35);
  }

  /* ─── "Most teams stop here" divider ─── */
  .exec-loop-stopline {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 0 64px;
  }
  .exec-loop-stopline::before,
  .exec-loop-stopline::after {
    content: '';
    flex: 1;
    height: 1px;
    background: repeating-linear-gradient(90deg, rgba(255,140,60,0.35) 0px, rgba(255,140,60,0.35) 6px, transparent 6px, transparent 12px);
  }
  .exec-loop-stopline-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,140,60,0.65);
    white-space: nowrap;
  }

  /* ═══ CONTEXT CARDS ═══ */
  .exec-loop-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .exec-loop-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 32px 28px 28px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .exec-loop-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .exec-loop-card:hover::before { width: 100%; }

  .exec-loop-card:hover {
    border-color: rgba(71,181,255,0.2);
    background: rgba(71,181,255,0.03);
  }

  .exec-loop-card-icon {
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }

  .exec-loop-card-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .exec-loop-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0;
    color: #F4F6F8; margin: 0 0 10px 0;
    transition: color 0.3s ease;
  }
  .exec-loop-card:hover h3 { color: #47B5FF; }

  .exec-loop-card p {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    line-height: 1.75; color: #5a7a96; margin: 0;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 960px) {
    .exec-loop-visual { max-width: 500px; }
    .exec-loop-node { width: 100px; }
    .exec-loop-node-ring { width: 44px; height: 44px; }
    .exec-loop-node-num { font-size: 12px; }
    .exec-loop-node-label { font-size: 10px; }
    .exec-loop-node-desc { display: none; }
    .exec-loop-hub-ring { width: 80px; height: 80px; }
    .exec-loop-cards { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .exec-loop { padding: 80px 20px 100px; }
    .exec-loop-visual { max-width: 340px; }
    .exec-loop-node { width: 80px; }
    .exec-loop-node-ring { width: 36px; height: 36px; }
    .exec-loop-node-label { font-size: 9px; }
    .exec-loop-hub-ring { width: 64px; height: 64px; }
    .exec-loop-hub-text { font-size: 9px; }
  }
</style>

<section class="exec-loop">
  <div class="exec-loop-glow-top"></div>
  <div class="exec-loop-glow-centre"></div>

  <div class="exec-loop-inner">

    <div class="exec-loop-header" id="exec-loop-header">
      <div class="exec-loop-eyebrow">How We Close The Gap</div>
      <h2>The Execution <em>Loop</em></h2>
      <p class="exec-loop-subtitle">
        The ERI diagnoses where the gaps are. The Execution Loop closes them. Six stages. One continuous cycle. Every piece of field data feeds back into the model, updates the schedule, re-informs the work packages, and goes back to the field. Most teams stop at step three \u2014 we close the loop.
      </p>
    </div>

    <!-- LOOP VISUAL -->
    <div class="exec-loop-visual" id="exec-loop-visual">
      <canvas class="exec-loop-canvas" id="exec-loop-canvas"></canvas>
      <svg class="exec-loop-svg" id="exec-loop-svg" viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>

      <!-- 6 NODES -->
      <div class="exec-loop-node" data-node="1">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">01</span></div>
        <div class="exec-loop-node-label">Model</div>
        <div class="exec-loop-node-desc">Coordinated PIM</div>
      </div>
      <div class="exec-loop-node" data-node="2">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">02</span></div>
        <div class="exec-loop-node-label">Package</div>
        <div class="exec-loop-node-desc">Digital work lots</div>
      </div>
      <div class="exec-loop-node" data-node="3">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">03</span></div>
        <div class="exec-loop-node-label">Deploy</div>
        <div class="exec-loop-node-desc">Field BIM \u00b7 Tablets</div>
      </div>
      <div class="exec-loop-node" data-node="4">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">04</span></div>
        <div class="exec-loop-node-label">Capture</div>
        <div class="exec-loop-node-desc">Inspections \u00b7 Scans</div>
      </div>
      <div class="exec-loop-node" data-node="5">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">05</span></div>
        <div class="exec-loop-node-label">Verify</div>
        <div class="exec-loop-node-desc">Actual vs. planned</div>
      </div>
      <div class="exec-loop-node" data-node="6">
        <div class="exec-loop-node-ring"><span class="exec-loop-node-num">06</span></div>
        <div class="exec-loop-node-label">Update</div>
        <div class="exec-loop-node-desc">Model \u00b7 Schedule \u00b7 QTO</div>
      </div>

      <!-- CENTRE HUB -->
      <div class="exec-loop-hub">
        <div class="exec-loop-hub-ring">
          <span class="exec-loop-hub-text">ERI</span>
        </div>
        <div class="exec-loop-hub-label">Execution Readiness</div>
      </div>
    </div>

    <!-- STOP LINE -->
    <div class="exec-loop-stopline">
      <span class="exec-loop-stopline-label">Most Teams Stop At Step 03 \u2014 We Close The Loop</span>
    </div>

    <!-- CONTEXT CARDS -->
    <div class="exec-loop-cards">
      <div class="exec-loop-card" data-exec-lc>
        <div class="exec-loop-card-icon">The Industry Default</div>
        <h3>One-Way Push</h3>
        <p>Model \u2192 Field. That\u2019s where most digital delivery ends. The model pushes information outward but never receives data back. As-built conditions, field modifications, inspection results, and quantity changes stay in spreadsheets, emails, and WhatsApp groups. The digital asset becomes fiction by week three.</p>
      </div>
      <div class="exec-loop-card" data-exec-lc>
        <div class="exec-loop-card-icon">Why It Matters</div>
        <h3>Closed-Loop Delivery</h3>
        <p>When field data feeds back into the model, the schedule re-baselines from verified installation, work packages update with design changes, and the handover record builds progressively \u2014 not retroactively. Every inspection, every redline, every as-built measurement flows back into the project ecosystem with full traceability.</p>
      </div>
      <div class="exec-loop-card" data-exec-lc>
        <div class="exec-loop-card-icon">The Result</div>
        <h3>Verified Handover</h3>
        <p>By project completion, the model matches the building. Every element has an inspection record. Every quantity change is tracked. Every progress claim is defensible. The owner receives a digital twin-ready dataset \u2014 not a box of paper and a model that hasn\u2019t been updated since detailed design.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* ═══ HEADER ENTRANCE ═══ */
  var header = document.getElementById('exec-loop-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(24px)';
    var hObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          hObs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    hObs.observe(header);
  }

  /* ═══ NODE ENTRANCE ═══ */
  var nodes = document.querySelectorAll('.exec-loop-node');
  nodes.forEach(function(node, i) {
    node.style.opacity = '0';
    node.style.transform = 'translate(-50%, -50%) scale(0.8)';
    var nObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            node.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
            node.style.opacity = '1';
            node.style.transform = 'translate(-50%, -50%) scale(1)';
          }, i * 120);
          nObs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    nObs.observe(node);
  });

  /* ═══ HUB ENTRANCE ═══ */
  var hub = document.querySelector('.exec-loop-hub');
  if (hub) {
    hub.style.opacity = '0';
    hub.style.transform = 'translate(-50%, -50%) scale(0.7)';
    var hubObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            hub.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
            hub.style.opacity = '1';
            hub.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 800);
          hubObs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    hubObs.observe(hub);
  }

  /* ═══ SVG HEXAGON EDGES ═══ */
  var svg = document.getElementById('exec-loop-svg');
  var visual = document.getElementById('exec-loop-visual');
  if (svg && visual) {
    /* Node centre positions (% of container) */
    var pts = [
      { x: 50, y: 8 },   /* 1: Model (top) */
      { x: 87, y: 28 },  /* 2: Package (top-right) */
      { x: 87, y: 68 },  /* 3: Deploy (bottom-right) */
      { x: 50, y: 88 },  /* 4: Capture (bottom) */
      { x: 13, y: 68 },  /* 5: Verify (bottom-left) */
      { x: 13, y: 28 }   /* 6: Update (top-left) */
    ];

    /* Convert % to SVG viewBox coords (680x680) */
    var svgPts = pts.map(function(p) {
      return { x: p.x * 6.8, y: p.y * 6.8 };
    });

    /* Draw edges 1→2→3→4→5→6→1 */
    for (var i = 0; i < 6; i++) {
      var next = (i + 1) % 6;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', svgPts[i].x);
      line.setAttribute('y1', svgPts[i].y);
      line.setAttribute('x2', svgPts[next].x);
      line.setAttribute('y2', svgPts[next].y);
      line.setAttribute('stroke', 'rgba(71,181,255,0.12)');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-dasharray', '4,6');
      line.classList.add('exec-loop-edge');

      /* Animate draw */
      var len = Math.sqrt(
        Math.pow(svgPts[next].x - svgPts[i].x, 2) +
        Math.pow(svgPts[next].y - svgPts[i].y, 2)
      );
      line.setAttribute('stroke-dasharray', len);
      line.setAttribute('stroke-dashoffset', len);
      line.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1) ' + (0.6 + i * 0.12) + 's';
      svg.appendChild(line);
    }

    /* Draw spokes from each node to centre */
    var cx = 50 * 6.8, cy = 48 * 6.8;
    for (var i = 0; i < 6; i++) {
      var spoke = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      spoke.setAttribute('x1', svgPts[i].x);
      spoke.setAttribute('y1', svgPts[i].y);
      spoke.setAttribute('x2', cx);
      spoke.setAttribute('y2', cy);
      spoke.setAttribute('stroke', 'rgba(71,181,255,0.05)');
      spoke.setAttribute('stroke-width', '1');
      spoke.setAttribute('stroke-dasharray', '2,8');
      svg.appendChild(spoke);
    }

    /* Trigger edge draw on scroll */
    var edgeObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var edges = svg.querySelectorAll('.exec-loop-edge');
          edges.forEach(function(edge) {
            edge.setAttribute('stroke-dashoffset', '0');
          });
          edgeObs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    edgeObs.observe(visual);
  }

  /* ═══ CANVAS PARTICLES ═══ */
  var canvas = document.getElementById('exec-loop-canvas');
  if (canvas && visual) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var running = false;

    function resize() {
      var rect = visual.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resize();
    window.addEventListener('resize', resize);

    /* Node positions in px (same % as CSS) */
    function getNodePx() {
      var w = visual.offsetWidth;
      var h = visual.offsetHeight;
      return [
        { x: 0.50 * w, y: 0.08 * h },
        { x: 0.87 * w, y: 0.28 * h },
        { x: 0.87 * w, y: 0.68 * h },
        { x: 0.50 * w, y: 0.88 * h },
        { x: 0.13 * w, y: 0.68 * h },
        { x: 0.13 * w, y: 0.28 * h }
      ];
    }

    function spawnParticle() {
      var nodePx = getNodePx();
      var startIdx = Math.floor(Math.random() * 6);
      var endIdx = (startIdx + 1) % 6;
      return {
        startX: nodePx[startIdx].x,
        startY: nodePx[startIdx].y,
        endX: nodePx[endIdx].x,
        endY: nodePx[endIdx].y,
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 1.5,
        alpha: 0
      };
    }

    function animate() {
      if (!running) return;
      var w = visual.offsetWidth;
      var h = visual.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      /* Spawn */
      if (Math.random() < 0.12 && particles.length < 30) {
        particles.push(spawnParticle());
      }

      /* Update & draw */
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.progress += p.speed;

        /* Fade in/out */
        if (p.progress < 0.15) {
          p.alpha = p.progress / 0.15;
        } else if (p.progress > 0.85) {
          p.alpha = (1 - p.progress) / 0.15;
        } else {
          p.alpha = 1;
        }

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        var x = p.startX + (p.endX - p.startX) * p.progress;
        var y = p.startY + (p.endY - p.startY) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(71,181,255,' + (0.5 * p.alpha) + ')';
        ctx.fill();

        /* Glow */
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(71,181,255,' + (0.08 * p.alpha) + ')';
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    var canvasObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting && !running) {
          running = true;
          animate();
        } else if (!e.isIntersecting) {
          running = false;
        }
      });
    }, { threshold: 0.05 });
    canvasObs.observe(visual);
  }

  /* ═══ CARD ENTRANCE ═══ */
  var cards = document.querySelectorAll('[data-exec-lc]');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    var cObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
          cObs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    cObs.observe(card);
  });
})()`;

export default function ExecutionLoop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.innerHTML = html;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = script;
    el.appendChild(scriptEl);
    return () => { el.innerHTML = ''; };
  }, []);

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  );
}
