"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;family=DM+Mono:ital,wght@0,300;0,400;1,300&amp;display=swap');

.cta-root *, .cta-root *::before, .cta-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.cta-root {
  --accent: #47B5FF;
  --text:   #F4F6F8;
  --muted:  rgba(244,246,248,0.52);
  --navy:   #0B3C5D;

  position: relative;
  width: 100%;
  height: 100vh;          /* exactly one viewport */
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: var(--text);
}

/* ── Dark base layer (always visible) ── */
.cta-base {
  position: absolute; inset: 0;
  background: #050c14;
  z-index: 0;
}

/* ── Revealed background (clipped from left to right on scroll) ── */
.cta-bg {
  position: absolute;
  inset: -20%;
  will-change: clip-path, transform;
  clip-path: inset(0 100% 0 0);
  z-index: 1;
  overflow: hidden;
}
.cta-bg-video {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

/* ── Reveal edge glow (vertical light bar at the wipe edge) ── */
.cta-reveal-edge {
  position: absolute;
  top: 0; bottom: 0;
  width: 3px;
  left: 0%;
  background: var(--accent);
  box-shadow: 0 0 40px 8px rgba(71,181,255,0.5), 0 0 80px 16px rgba(71,181,255,0.2);
  z-index: 4;
  opacity: 0;
  pointer-events: none;
  will-change: left, opacity;
}

/* ── Dark overlay on top of revealed image ── */
.cta-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom,
      rgba(5,12,20,0.72) 0%,
      rgba(8,24,40,0.60) 45%,
      rgba(5,12,20,0.85) 100%),
    radial-gradient(ellipse 90% 70% at 50% 40%, rgba(11,60,93,0.25) 0%, transparent 65%);
  z-index: 2;
}

/* Fine grid — blueprint feel */
.cta-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.032) 1px, transparent 1px);
  background-size: 56px 56px;
  z-index: 3;
  pointer-events: none;
}

/* Slow scan line */
.cta-scan {
  position: absolute;
  left: 0; right: 0;
  height: 35%;
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(71,181,255,0.028) 50%,
    transparent 100%);
  z-index: 3;
  animation: cta-scan 11s linear infinite;
  pointer-events: none;
}
@keyframes cta-scan {
  from { top: -35%; }
  to   { top: 100%; }
}

/* ── Content ── */
.cta-content {
  position: relative;
  z-index: 10;
  text-align: center;
  width: 100%;
  max-width: 1100px;
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Eyebrow */
.cta-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.cta-eyebrow.vis { opacity: 1; transform: translateY(0); }
.cta-eline { width: 28px; height: 1px; background: var(--accent); }

/* ── Headline — max 2 lines, large, sharp ── */
.cta-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(38px, 5.8vw, 82px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  color: #fff;
  margin-bottom: 28px;
  max-width: 1000px;
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.8s ease 0.12s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.12s;
}
.cta-headline.vis { opacity: 1; transform: translateY(0); }

.cta-headline em {
  font-style: normal;
  background: linear-gradient(135deg, #fff 20%, #47B5FF 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Thin rule between headline and body */
.cta-rule {
  width: 40px;
  height: 1px;
  background: rgba(71,181,255,0.5);
  margin: 0 auto 24px;
  opacity: 0;
  transition: opacity 0.5s ease 0.3s, width 0.6s ease 0.3s;
}
.cta-rule.vis { opacity: 1; }

/* Body copy */
.cta-body {
  font-size: clamp(14px, 1.15vw, 17px);
  font-weight: 400;
  color: var(--muted);
  line-height: 1.8;
  max-width: 580px;
  margin-bottom: 44px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s;
}
.cta-body.vis { opacity: 1; transform: translateY(0); }

/* ── Stats ── */
.cta-stats {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-bottom: 48px;
  border: 1px solid rgba(71,181,255,0.15);
  border-radius: 3px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.65s ease 0.5s, transform 0.65s ease 0.5s;
}
.cta-stats.vis { opacity: 1; transform: translateY(0); }

.cta-stat {
  padding: 20px 40px;
  text-align: center;
  border-right: 1px solid rgba(71,181,255,0.15);
  background: rgba(11,60,93,0.2);
  backdrop-filter: blur(4px);
  transition: background 0.25s ease;
}
.cta-stat:last-child { border-right: none; }
.cta-stat:hover { background: rgba(71,181,255,0.08); }

.cta-stat-n {
  font-family: 'Inter', sans-serif;
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  display: block;
  line-height: 1;
  margin-bottom: 7px;
}
.cta-stat-n span { color: var(--accent); }

.cta-stat-l {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--muted);
  text-transform: uppercase;
  line-height: 1.5;
}

/* ── Buttons ── */
.cta-btns {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.65s ease 0.62s, transform 0.65s ease 0.62s;
}
.cta-btns.vis { opacity: 1; transform: translateY(0); }

.cta-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0B3C5D;
  background: var(--accent);
  border-radius: 2px;
  padding: 14px 32px;
  text-decoration: none;
  transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
}
.cta-btn-p:hover {
  background: #6bc5ff;
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(71,181,255,0.38);
}
.cta-btn-p .arr { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
.cta-btn-p:hover .arr { transform: translateX(4px); }

.cta-btn-g {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.8);
  background: transparent;
  border: 1px solid rgba(244,246,248,0.2);
  border-radius: 2px;
  padding: 13px 30px;
  text-decoration: none;
  transition: border-color 0.22s ease, color 0.22s ease, background 0.22s ease, transform 0.22s ease;
}
.cta-btn-g:hover {
  border-color: rgba(71,181,255,0.5);
  color: #fff;
  background: rgba(71,181,255,0.07);
  transform: translateY(-2px);
}

/* ── Corner marks ── */
.cta-corner {
  position: absolute;
  width: 36px; height: 36px;
  z-index: 10;
  pointer-events: none;
  opacity: 0.45;
}
.cta-tl { top: 28px; left: 28px; border-top: 1px solid var(--accent); border-left: 1px solid var(--accent); }
.cta-tr { top: 28px; right: 28px; border-top: 1px solid var(--accent); border-right: 1px solid var(--accent); }
.cta-bl { bottom: 28px; left: 28px; border-bottom: 1px solid var(--accent); border-left: 1px solid var(--accent); }
.cta-br { bottom: 28px; right: 28px; border-bottom: 1px solid var(--accent); border-right: 1px solid var(--accent); }

/* Bottom edge accent */
.cta-edge {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.4) 30%, var(--accent) 50%, rgba(71,181,255,0.4) 70%, transparent);
  z-index: 10;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cta-headline { font-size: clamp(32px, 8.5vw, 56px); letter-spacing: -0.025em; }
  .cta-stats { flex-wrap: wrap; border: none; gap: 1px; background: rgba(71,181,255,0.15); border-radius: 3px; }
  .cta-stat { flex: 1 1 calc(50% - 1px); min-width: 140px; padding: 18px 20px; }
  .cta-btns { flex-direction: column; width: 100%; max-width: 320px; }
  .cta-btn-p, .cta-btn-g { width: 100%; justify-content: center; }
  .cta-corner { display: none; }
}

@media (min-width: 1800px) {
  .cta-headline { font-size: clamp(72px, 5.5vw, 100px); }
  .cta-body { font-size: 18px; max-width: 640px; }
  .cta-stat { padding: 24px 52px; }
}
</style>

<section class="cta-root" id="ctaRoot">

  <div class="cta-base"></div>
  <div class="cta-bg" id="ctaBg">
    <video class="cta-bg-video" autoplay muted loop playsinline>
      <source src="/videos/bridge-bg.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="cta-reveal-edge" id="ctaEdge"></div>
  <div class="cta-overlay"></div>
  <div class="cta-grid"></div>
  <div class="cta-scan"></div>

  <div class="cta-corner cta-tl"></div>
  <div class="cta-corner cta-tr"></div>
  <div class="cta-corner cta-bl"></div>
  <div class="cta-corner cta-br"></div>

  <div class="cta-content">

    <div class="cta-eyebrow" id="ctaEyebrow">
      <span class="cta-eline"></span>
      Our Promise
      <span class="cta-eline"></span>
    </div>

    <h2 class="cta-headline" id="ctaHeadline">
      We Bridge The Gap Between<br/><em>Digital</em> &amp; Reality
    </h2>

    <div class="cta-rule" id="ctaRule"></div>

    <p class="cta-body" id="ctaBody">
      Most teams invest in tools, technology, and software. The real advantage is in the people and processes behind them. We design controlled digital ecosystems that align with enterprise culture and deliver measurable results from day one.
    </p>

    <div class="cta-stats" id="ctaStats">
      <div class="cta-stat">
        <span class="cta-stat-n"><span class="cta-count" data-t="55">0</span><span>+</span></span>
        <span class="cta-stat-l">Years Combined<br/>Experience</span>
      </div>
      <div class="cta-stat">
        <span class="cta-stat-n">$<span class="cta-count" data-t="50">0</span><span>B+</span></span>
        <span class="cta-stat-l">Assets Delivered<br/>&amp; Modelled</span>
      </div>
      <div class="cta-stat">
        <span class="cta-stat-n"><span class="cta-count" data-t="3">0</span></span>
        <span class="cta-stat-l">Countries of<br/>Delivery</span>
      </div>
    </div>

    <div class="cta-btns" id="ctaBtns">
      <a href="/services" class="cta-btn-p">What We Do <span class="arr">→</span></a>
      <a href="/contact"  class="cta-btn-g">Contact Us</a>
    </div>

  </div>

  <div class="cta-edge"></div>
</section>`
const sectionScripts = ["\n(function(){\n'use strict';\n\nvar bg   = document.getElementById('ctaBg');\nvar edge = document.getElementById('ctaEdge');\nvar root = document.getElementById('ctaRoot');\nvar ticking = false;\n\n/* \u2500\u2500 Scroll-driven left-to-right reveal \u2500\u2500 */\nfunction doReveal(){\n  var rect = root.getBoundingClientRect();\n  var winH = window.innerHeight;\n  /* progress: 0 when section top hits viewport bottom, 1 when section top reaches 20% from top */\n  var start = winH;\n  var end = winH * 0.2;\n  var raw = (start - rect.top) / (start - end);\n  var progress = Math.max(0, Math.min(1, raw));\n\n  /* Reveal clip from left */\n  var revealPct = 100 - (progress * 100);\n  bg.style.clipPath = 'inset(0 ' + revealPct.toFixed(1) + '% 0 0)';\n\n  /* Parallax on the bg */\n  var center = rect.top + rect.height / 2 - winH / 2;\n  bg.style.transform = 'translateY(' + (center * 0.25) + 'px)';\n\n  /* Edge glow follows the wipe edge */\n  if (progress > 0.01 && progress < 0.98){\n    edge.style.opacity = '1';\n    edge.style.left = (progress * 100).toFixed(1) + '%';\n  } else {\n    edge.style.opacity = '0';\n  }\n\n  ticking = false;\n}\n\nwindow.addEventListener('scroll', function(){\n  if(!ticking){ ticking = true; requestAnimationFrame(doReveal); }\n}, { passive: true });\ndoReveal();\n\n/* \u2500\u2500 Entrance animations \u2500\u2500 */\nvar done = false;\nfunction animate(){\n  if(done) return; done = true;\n  ['ctaEyebrow','ctaHeadline','ctaRule','ctaBody','ctaStats','ctaBtns'].forEach(function(id){\n    var el = document.getElementById(id);\n    if(el) el.classList.add('vis');\n  });\n  /* Count up */\n  document.querySelectorAll('.cta-count').forEach(function(el){\n    var target = +el.getAttribute('data-t');\n    var t0 = null, dur = 1800;\n    function step(ts){\n      if(!t0) t0 = ts;\n      var p = Math.min((ts-t0)/dur, 1);\n      var e = 1 - Math.pow(1-p, 3);\n      el.textContent = Math.round(e * target);\n      if(p < 1) requestAnimationFrame(step);\n    }\n    setTimeout(function(){ requestAnimationFrame(step); }, 550);\n  });\n}\nnew IntersectionObserver(function(e){ if(e[0].isIntersecting){ animate(); } }, { threshold: 0.15 }).observe(root);\n\n}());\n"]

export default function Section4() {
  useEffect(() => {
    setTimeout(() => {
      sectionScripts.forEach((script) => {
        try {
          // eslint-disable-next-line no-new-func
          new Function(script)()
        } catch(e) {
          console.error('Section4 script error:', e)
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
