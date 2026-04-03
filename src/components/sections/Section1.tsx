"use client"
import { useEffect } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ost *, .ost *::before, .ost *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ost {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F4F7FA;
  --white:  #ffffff;
  --text:   #0d1f2d;
  --muted:  #5a7a96;
  --mono:   'DM Mono', monospace;

  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 80vh;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* ══ DOT GRID BACKGROUND ══ */
.ost::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(11,60,93,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
}

/* Top edge divider */
.ost::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: rgba(11,60,93,0.06);
  z-index: 1;
}

/* ══ LEFT ══ */
.ost-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(28px,3vw,48px);
  padding: clamp(64px,6vw,120px) clamp(40px,4vw,72px) clamp(64px,6vw,120px) clamp(48px,6%,120px);
  position: relative;
  z-index: 1;
  margin-left: auto;
  max-width: 700px;
}
.ost-left::after {
  content: '';
  position: absolute;
  right: 0; top: 10%; bottom: 10%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(11,60,93,0.08) 25%, rgba(11,60,93,0.08) 75%, transparent);
}

.ost-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 14px;
}
.ost-eyebrow::before {
  content: '';
  width: 28px;
  height: 1px;
  background: var(--accent);
}

.ost-headline {
  max-width: 620px;
}
.ost-h-line {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--navy);
  letter-spacing: -0.02em;
  line-height: 1;
}
.ost-h-sm {
  font-size: clamp(24px,2.4vw,40px);
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 6px;
}
.ost-h-md {
  font-size: clamp(32px,3.2vw,56px);
  margin-bottom: 4px;
}
.ost-h-lg {
  font-size: clamp(44px,4.6vw,82px);
  font-weight: 800;
  color: var(--accent);
  line-height: 0.95;
  margin-bottom: 8px;
  position: relative;
}
.ost-h-lg::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), rgba(71,181,255,0.15));
  border-radius: 2px;
}

/* ══ SUBLINE ══ */
.ost-sub {
  font-size: clamp(15px,1.1vw,18px);
  color: var(--muted);
  line-height: 1.75;
  max-width: 480px;
}

.ost-cta {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--white); background: var(--navy);
  border-radius: 2px; padding: 16px 28px;
  text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
  align-self: flex-start;
}
.ost-cta:hover {
  background: #0d4d78;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(11,60,93,0.2);
}
.ost-cta-arr { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.ost-cta:hover .ost-cta-arr { transform: translateX(5px); }

/* ══ RIGHT — Live Ecosystem ══ */
.ost-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(40px,4vw,80px) clamp(20px,2vw,48px);
  z-index: 1;
  perspective: 900px;
}
.ost-diagram {
  width: 100%;
  max-width: 620px;
  height: auto;
  transform: rotateX(18deg) rotateY(-8deg) rotateZ(2deg);
  transform-style: preserve-3d;
  filter: drop-shadow(0 30px 40px rgba(11,60,93,0.08)) drop-shadow(0 8px 16px rgba(11,60,93,0.04));
}

/* ══ SCROLL ANIMATIONS ══ */
.ost-anim {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ost-anim.vis { opacity: 1; transform: translateY(0); }

/* ══ RESPONSIVE ══ */

/* Large desktops */
@media (min-width: 1600px) {
  .ost { min-height: 70vh; }
  .ost::before { background-size: 36px 36px; }
  .ost-h-sm { font-size: 36px; }
  .ost-h-lg { font-size: 74px; }
  .ost-h-md { font-size: 50px; }
  .ost-headline { max-width: 680px; }
  .ost-sub { font-size: 17px; }
  .ost-cta { font-size: 12px; padding: 18px 32px; }
  .ost-diagram { max-width: 640px; }
}

/* Ultrawide / 32" 4K */
@media (min-width: 2200px) {
  .ost { min-height: 65vh; }
  .ost::before { background-size: 44px 44px; }
  .ost-left { padding: 100px 80px 100px 60px; max-width: 860px; gap: 44px; }
  .ost-right { padding: 80px 48px; }
  .ost-eyebrow { font-size: 12px; }
  .ost-h-sm { font-size: 42px; }
  .ost-h-lg { font-size: 88px; }
  .ost-h-md { font-size: 58px; }
  .ost-headline { max-width: 780px; }
  .ost-sub { font-size: 19px; max-width: 540px; }
  .ost-cta { font-size: 13px; padding: 20px 36px; }
  .ost-diagram { max-width: 720px; }
}

@media (min-width: 3200px) {
  .ost-left { padding: 120px 100px 120px 60px; max-width: 1000px; gap: 52px; }
  .ost-right { padding: 100px 60px; }
  .ost-h-sm { font-size: 48px; }
  .ost-h-lg { font-size: 100px; }
  .ost-h-md { font-size: 66px; }
  .ost-headline { max-width: 900px; }
  .ost-diagram { max-width: 820px; }
}

/* Tablet */
@media (max-width: 1100px) {
  .ost { grid-template-columns: 1fr; min-height: auto; }
  .ost-left { max-width: 100%; margin: 0 auto; }
  .ost-left::after { display: none; }
  .ost-right { padding: 20px 20px 60px; }
  .ost-diagram { max-width: 500px; }
}
@media (max-width: 480px) {
  .ost-h-sm { font-size: 18px; }
  .ost-h-lg { font-size: 36px; }
  .ost-h-md { font-size: 24px; }
}
</style>

<section class="ost" aria-label="Our approach and technology ecosystem">

  <!-- ══ LEFT ══ -->
  <div class="ost-left">
    <div class="ost-eyebrow ost-anim" data-delay="0">What We Do</div>
    <h2 class="ost-headline ost-anim" data-delay="80">
      <span class="ost-h-line ost-h-sm">We help project teams deliver</span>
      <span class="ost-h-line ost-h-lg">Real Projects</span>
      <span class="ost-h-line ost-h-md">with digital power</span>
    </h2>
    <p class="ost-sub ost-anim" data-delay="120">We build lean digital systems that match how your teams actually work. No tool overload. No process bloat. Just the structure your project needs to move.</p>

    <a href="/process/" class="ost-cta ost-anim" data-delay="240">Discover The Process <span class="ost-cta-arr">→</span></a>
  </div>

  <!-- ══ RIGHT — Live Ecosystem ══ -->
  <div class="ost-right">
    <svg class="ost-diagram ost-anim" data-delay="200" viewBox="0 0 620 580" xmlns="http://www.w3.org/2000/svg">

      <!-- Connection paths (visible dashed lines) -->
      <path id="c1" d="M90,65 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c2" d="M310,40 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c3" d="M530,65 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c4" d="M70,235 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c5" d="M550,235 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c6" d="M530,490 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c7" d="M90,490 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c8" d="M205,548 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
      <path id="c9" d="M415,548 L310,280" stroke="rgba(11,60,93,0.08)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>

      <!-- Hidden reverse paths (for outbound dot motion) -->
      <path id="r1" d="M310,280 L90,65" fill="none" stroke="none"/>
      <path id="r2" d="M310,280 L310,40" fill="none" stroke="none"/>
      <path id="r3" d="M310,280 L530,65" fill="none" stroke="none"/>
      <path id="r4" d="M310,280 L70,235" fill="none" stroke="none"/>
      <path id="r5" d="M310,280 L550,235" fill="none" stroke="none"/>
      <path id="r6" d="M310,280 L530,490" fill="none" stroke="none"/>
      <path id="r7" d="M310,280 L90,490" fill="none" stroke="none"/>
      <path id="r8" d="M310,280 L205,548" fill="none" stroke="none"/>
      <path id="r9" d="M310,280 L415,548" fill="none" stroke="none"/>

      <!-- Subtle orbital ring -->
      <circle cx="310" cy="280" r="165" fill="none" stroke="rgba(11,60,93,0.03)" stroke-width="1" stroke-dasharray="3 8"/>

      <!-- ══ Animated dots — inbound (tool → hub) ══ -->
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.2s" repeatCount="indefinite" begin="0s"><mpath href="#c1"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.4s"><mpath href="#c2"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.9s"><mpath href="#c3"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.0s" repeatCount="indefinite" begin="1.3s"><mpath href="#c4"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.3s" repeatCount="indefinite" begin="0.2s"><mpath href="#c5"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="2.9s" repeatCount="indefinite" begin="1.6s"><mpath href="#c6"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.4s" repeatCount="indefinite" begin="0.7s"><mpath href="#c7"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.1s" repeatCount="indefinite" begin="1.1s"><mpath href="#c8"/></animateMotion></circle>
      <circle r="2.5" fill="#47B5FF" opacity="0.65"><animateMotion dur="3.6s" repeatCount="indefinite" begin="0.5s"><mpath href="#c9"/></animateMotion></circle>

      <!-- Extra inbound dots (denser traffic on select lines) -->
      <circle r="2" fill="#47B5FF" opacity="0.35"><animateMotion dur="4.5s" repeatCount="indefinite" begin="2.2s"><mpath href="#c1"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.35"><animateMotion dur="4.0s" repeatCount="indefinite" begin="2.8s"><mpath href="#c5"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.35"><animateMotion dur="4.2s" repeatCount="indefinite" begin="3.0s"><mpath href="#c7"/></animateMotion></circle>

      <!-- ══ Animated dots — outbound (hub → tool) ══ -->
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="4.1s" repeatCount="indefinite" begin="1.8s"><mpath href="#r1"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="3.8s" repeatCount="indefinite" begin="2.2s"><mpath href="#r2"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="4.3s" repeatCount="indefinite" begin="1.4s"><mpath href="#r3"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.6s"><mpath href="#r4"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="4.0s" repeatCount="indefinite" begin="2.6s"><mpath href="#r5"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="3.7s" repeatCount="indefinite" begin="0.9s"><mpath href="#r6"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="4.2s" repeatCount="indefinite" begin="1.2s"><mpath href="#r7"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="3.9s" repeatCount="indefinite" begin="2.4s"><mpath href="#r8"/></animateMotion></circle>
      <circle r="2" fill="#47B5FF" opacity="0.2"><animateMotion dur="4.5s" repeatCount="indefinite" begin="1.7s"><mpath href="#r9"/></animateMotion></circle>

      <!-- ══ Center hub ══ -->
      <circle cx="310" cy="280" r="70" fill="rgba(71,181,255,0.03)"/>
      <circle cx="310" cy="280" r="52" fill="none" stroke="rgba(71,181,255,0.12)" stroke-width="1">
        <animate attributeName="r" values="52;60;52" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.15;1" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="310" cy="282" r="44" fill="rgba(11,60,93,0.03)"/>
      <circle cx="310" cy="280" r="44" fill="#ffffff" stroke="rgba(71,181,255,0.25)" stroke-width="1.5"/>
      <text x="310" y="276" font-family="'Outfit', sans-serif" font-size="11" font-weight="700" fill="#0B3C5D" text-anchor="middle" letter-spacing="0.06em">INFRAFORMA</text>
      <text x="310" y="292" font-family="'DM Mono', monospace" font-size="7" fill="#5a7a96" text-anchor="middle" letter-spacing="0.12em">PLATFORM</text>

      <!-- ══ Tool nodes ══ -->
      <!-- Autodesk -->
      <g>
        <rect x="35" y="50" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="90" y="42" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">DESIGN · BIM</text>
        <text x="90" y="70" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">AUTODESK</text>
      </g>
      <!-- Bentley -->
      <g>
        <rect x="255" y="25" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="310" y="17" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">CIVIL · INFRA</text>
        <text x="310" y="45" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">BENTLEY</text>
      </g>
      <!-- Procore -->
      <g>
        <rect x="475" y="50" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="530" y="42" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">CONSTRUCTION</text>
        <text x="530" y="70" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">PROCORE</text>
      </g>
      <!-- Tandem -->
      <g>
        <rect x="15" y="220" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="70" y="212" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">DIGITAL TWIN</text>
        <text x="70" y="240" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">TANDEM</text>
      </g>
      <!-- ESRI -->
      <g>
        <rect x="495" y="220" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="550" y="212" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">GIS · SPATIAL</text>
        <text x="550" y="240" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">ESRI / GIS</text>
      </g>
      <!-- Dalux -->
      <g>
        <rect x="475" y="475" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="530" y="467" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">FIELD · MOBILE</text>
        <text x="530" y="495" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">DALUX</text>
      </g>
      <!-- Power BI -->
      <g>
        <rect x="35" y="475" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="90" y="467" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">ANALYTICS</text>
        <text x="90" y="495" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">POWER BI</text>
      </g>
      <!-- Solibri -->
      <g>
        <rect x="150" y="533" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="205" y="525" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">MODEL QA</text>
        <text x="205" y="553" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">SOLIBRI</text>
      </g>
      <!-- ISO 19650 -->
      <g>
        <rect x="360" y="533" width="110" height="30" rx="4" fill="#ffffff" stroke="rgba(11,60,93,0.07)" stroke-width="1"/>
        <text x="415" y="525" font-family="'DM Mono', monospace" font-size="6.5" fill="rgba(71,181,255,0.5)" text-anchor="middle" letter-spacing="0.08em">STANDARD</text>
        <text x="415" y="553" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="#0B3C5D" text-anchor="middle">ISO 19650</text>
      </g>

    </svg>
  </div>

</section>`
const sectionScript = "(function(){\n  var tools = document.querySelectorAll('.ost-tool');\n  var anims = document.querySelectorAll('.ost-anim');\n  var io = new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }\n    });\n  }, { threshold: 0.08 });\n  tools.forEach(function(t){ io.observe(t); });\n  anims.forEach(function(el){\n    el.style.transitionDelay = (el.getAttribute('data-delay') || '0') + 'ms';\n    io.observe(el);\n  });\n}());"

export default function Section1() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(sectionScript)()
      } catch(e) {
        console.error('Section1 script error:', e)
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
