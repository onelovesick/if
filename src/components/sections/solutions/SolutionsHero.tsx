'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&amp;family=Inter+Tight:ital,wght@0,100..900;1,100..900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
<style>
.sol-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #1C1F23;
  overflow: hidden;
}

/* Blueprint grid */
.sol-hero .grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.14) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.4;
}

/* Depth gradients */
.sol-hero .gradient-layer {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 50%, rgba(11,60,93,0.4) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 80% 40%, rgba(71,181,255,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 80% 40% at 50% 100%, rgba(11,60,93,0.25) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Vignette */
.sol-hero .vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(28,31,35,0.75) 100%);
  pointer-events: none;
  z-index: 1;
}

/* Network canvas */
.sol-hero #networkCanvas {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

/* Scan line */
.sol-hero .scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #47B5FF, transparent);
  opacity: 0.2;
  animation: solScanDown 8s linear infinite;
  pointer-events: none;
  z-index: 3;
}
@keyframes solScanDown {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Corner brackets */
.sol-hero .bracket-tl {
  position: absolute;
  top: 100px; left: 40px;
  width: 44px; height: 44px;
  border-top: 1px solid rgba(71,181,255,0.3);
  border-left: 1px solid rgba(71,181,255,0.3);
  opacity: 0.5;
  z-index: 4;
}
.sol-hero .bracket-br {
  position: absolute;
  bottom: 80px; right: 40px;
  width: 44px; height: 44px;
  border-bottom: 1px solid rgba(71,181,255,0.3);
  border-right: 1px solid rgba(71,181,255,0.3);
  opacity: 0.5;
  z-index: 4;
}

/* Side label */
.sol-hero .side-label {
  position: absolute;
  right: 44px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.3;
  z-index: 4;
  white-space: nowrap;
}

/* ───── Content ───── */
.sol-hero-content {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 100%;
}
.sol-hero-left {
  max-width: 600px;
  flex-shrink: 0;
}

/* Eyebrow */
.sol-hero .eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #47B5FF;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.sol-hero .eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #47B5FF;
  flex-shrink: 0;
}

/* Heading */
.sol-hero h1 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 1.02;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #F4F6F8;
  margin-bottom: 24px;
}
.sol-hero h1 em {
  font-style: italic;
  color: #47B5FF;
}

/* Sub text */
.sol-hero .hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: #7a9bb5;
  max-width: 520px;
  margin-bottom: 36px;
}

/* Meta tags */
.sol-hero .hero-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #7a9bb5;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.6;
}

/* CTAs */
.sol-hero .hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.sol-hero .btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: none;
  color: #fff;
  background: #47B5FF;
  cursor: pointer;
  transition: all 0.35s ease;
  text-decoration: none;
}
.sol-hero .btn-accent:hover {
  background: #3aa0e6;
  transform: translateY(-1px);
}
.sol-hero .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 1px solid rgba(71,181,255,0.14);
  color: #F4F6F8;
  background: transparent;
  cursor: pointer;
  transition: all 0.4s ease;
  text-decoration: none;
}
.sol-hero .btn-primary:hover {
  background: #0B3C5D;
  border-color: #47B5FF;
  color: #fff;
}

/* ───── Network Legend (right side) ───── */
.sol-hero-right {
  position: relative;
  flex-shrink: 0;
  width: 380px;
  height: 380px;
}
.network-legend {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.net-node-label {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
  cursor: default;
  transition: all 0.4s ease;
}
.net-node-label:hover .net-dot {
  box-shadow: 0 0 0 8px rgba(71,181,255,0.12), 0 0 24px rgba(71,181,255,0.2);
  transform: scale(1.15);
}
.net-node-label:hover .net-label {
  color: #F4F6F8;
}
.net-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #47B5FF;
  flex-shrink: 0;
  position: relative;
  transition: all 0.4s ease;
}
.net-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.3);
}
.net-dot.large {
  width: 18px; height: 18px;
}
.net-dot.large::after { inset: -6px; }
.net-dot.accent-dim {
  background: rgba(71,181,255,0.5);
}
.net-num {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.15em;
  color: #47B5FF;
  opacity: 0.6;
}
.net-label {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #7a9bb5;
  transition: color 0.4s ease;
  white-space: nowrap;
}
.net-sublabel {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  color: #7a9bb5;
  opacity: 0.4;
  letter-spacing: 0.08em;
  margin-top: 2px;
}

/* SVG network lines */
.network-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.network-svg line {
  stroke: rgba(71,181,255,0.12);
  stroke-width: 1;
}
.network-svg .pulse-line {
  stroke: rgba(71,181,255,0.35);
  stroke-width: 1;
  stroke-dasharray: 4 8;
  animation: dashFlow 3s linear infinite;
}
@keyframes dashFlow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -24; }
}

/* Scroll indicator */
.sol-hero .scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 5;
}
.sol-hero .scroll-indicator span {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7a9bb5;
  opacity: 0.5;
}
.sol-hero .scroll-line {
  width: 1px;
  height: 32px;
  background: #47B5FF;
  opacity: 0.3;
  animation: solScrollPulse 2s ease-in-out infinite;
}
@keyframes solScrollPulse {
  0%, 100% { opacity: 0.15; transform: scaleY(0.6); }
  50% { opacity: 0.4; transform: scaleY(1); }
}

/* ───── Responsive ───── */
@media (max-width: 1024px) {
  .sol-hero .side-label { display: none; }
  .sol-hero-content { flex-direction: column; text-align: left; padding-top: 120px; }
  .sol-hero-right { width: 320px; height: 320px; margin: 0 auto; }
}
@media (max-width: 640px) {
  .sol-hero-content { padding: 120px 20px 80px; }
  .sol-hero-right { width: 280px; height: 280px; }
  .sol-hero h1 { font-size: clamp(32px, 8vw, 48px); }
}
</style>

<section class="sol-hero">
  <div class="grid-overlay"></div>
  <div class="gradient-layer"></div>
  <canvas id="networkCanvas"></canvas>
  <div class="vignette"></div>
  <div class="scan-line"></div>
  <div class="bracket-tl"></div>
  <div class="bracket-br"></div>
  <div class="side-label">Solutions · Interconnected Digital Delivery</div>

  <div class="sol-hero-content">
    <div class="sol-hero-left">
      <div class="eyebrow">End-to-End Digital Delivery</div>
      <h1>Six Layers.<br/>One <em>Connected</em><br/>System.</h1>
      <p class="hero-sub">
        Every solution we deliver is interconnected — strategy informs structure, intelligence drives execution, and data flows from model to twin. No silos. One controlled outcome.
      </p>
      <div class="hero-meta">Strategy · Structure · Intelligence · Execution · Project Twin · Insights</div>
      <div class="hero-ctas">
        <a href="/contact/" class="btn-accent">Schedule a Discovery Call</a>
        <a href="/process/" class="btn-primary">Our Process →</a>
      </div>
    </div>

    <div class="sol-hero-right">
      <!-- SVG connection lines -->
      <svg class="network-svg" viewBox="0 0 380 380">
        <!-- Connections: Strategy→Structure, Strategy→Intelligence, Structure→Execution, Intelligence→Execution, Execution→Twin, Twin→Insights, Strategy→Insights (cross) -->
        <line x1="90" y1="48" x2="280" y2="68" />
        <line x1="90" y1="48" x2="50" y2="175" class="pulse-line" />
        <line x1="280" y1="68" x2="320" y2="195" />
        <line x1="50" y1="175" x2="320" y2="195" class="pulse-line" />
        <line x1="320" y1="195" x2="265" y2="310" />
        <line x1="265" y1="310" x2="100" y2="295" class="pulse-line" />
        <line x1="90" y1="48" x2="100" y2="295" />
        <line x1="50" y1="175" x2="265" y2="310" />
        <line x1="280" y1="68" x2="100" y2="295" />
        <line x1="50" y1="175" x2="100" y2="295" />
        <line x1="280" y1="68" x2="320" y2="195" class="pulse-line" />
      </svg>

      <!-- Node labels -->
      <div class="network-legend">
        <div class="net-node-label" style="top: 30px; left: 52px;">
          <div class="net-dot large"></div>
          <div>
            <div class="net-num">01</div>
            <div class="net-label">Strategy</div>
            <div class="net-sublabel">BEP · EIR · Roadmaps</div>
          </div>
        </div>

        <div class="net-node-label" style="top: 48px; right: 62px;">
          <div class="net-dot"></div>
          <div>
            <div class="net-num">02</div>
            <div class="net-label">Structure</div>
            <div class="net-sublabel">CDE · LOD · Naming</div>
          </div>
        </div>

        <div class="net-node-label" style="top: 158px; left: 10px;">
          <div class="net-dot large"></div>
          <div>
            <div class="net-num">03</div>
            <div class="net-label">Intelligence</div>
            <div class="net-sublabel">BIM · Clash · Scan</div>
          </div>
        </div>

        <div class="net-node-label" style="top: 178px; right: 18px;">
          <div class="net-dot"></div>
          <div>
            <div class="net-num">04</div>
            <div class="net-label">Execution</div>
            <div class="net-sublabel">4D · Field · QA</div>
          </div>
        </div>

        <div class="net-node-label" style="bottom: 52px; right: 72px;">
          <div class="net-dot large"></div>
          <div>
            <div class="net-num">05</div>
            <div class="net-label">Project Twin</div>
            <div class="net-sublabel">As-Built · COBie · FM</div>
          </div>
        </div>

        <div class="net-node-label" style="bottom: 68px; left: 46px;">
          <div class="net-dot accent-dim"></div>
          <div>
            <div class="net-num">06</div>
            <div class="net-label">Insights</div>
            <div class="net-sublabel">Dashboards · 5D · Audit</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
`;

const script = `
(function() {
  var canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h, particles, mouse;

  mouse = { x: -1000, y: -1000 };

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }

  function createParticles() {
    particles = [];
    var count = Math.floor((w * h) / 18000);
    if (count > 80) count = 80;
    if (count < 25) count = 25;
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015
      });
    }
  }

  function drawFrame(time) {
    ctx.clearRect(0, 0, w, h);

    // Update + draw connections
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // Bounce off edges
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Mouse repulsion
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var md = Math.sqrt(dx * dx + dy * dy);
      if (md < 150) {
        var force = (150 - md) / 150 * 0.5;
        p.vx += (dx / md) * force;
        p.vy += (dy / md) * force;
      }

      // Speed limit
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.8) {
        p.vx = (p.vx / speed) * 0.8;
        p.vy = (p.vy / speed) * 0.8;
      }

      // Draw connections
      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var ddx = p.x - p2.x;
        var ddy = p.y - p2.y;
        var dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < 160) {
          var alpha = (1 - dist / 160) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(71,181,255,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (var k = 0; k < particles.length; k++) {
      var pk = particles[k];
      var pulseAlpha = 0.25 + Math.sin(pk.pulse) * 0.15;
      var pulseR = pk.r + Math.sin(pk.pulse) * 0.5;

      // Outer glow
      ctx.beginPath();
      ctx.arc(pk.x, pk.y, pulseR + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(71,181,255,' + (pulseAlpha * 0.15) + ')';
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(pk.x, pk.y, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(71,181,255,' + pulseAlpha + ')';
      ctx.fill();
    }

    requestAnimationFrame(drawFrame);
  }

  function handleMouse(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function handleMouseLeave() {
    mouse.x = -1000;
    mouse.y = -1000;
  }

  resize();
  createParticles();
  requestAnimationFrame(drawFrame);

  window.addEventListener('resize', function() {
    resize();
    createParticles();
  });

  canvas.parentElement.addEventListener('mousemove', handleMouse);
  canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
})();
`;

export default function SolutionsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    // Run canvas script with delay
    const timer = setTimeout(() => {
      try {
        new Function(script)();
      } catch (e) {
        console.error('SolutionsHero script error:', e);
      }
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
