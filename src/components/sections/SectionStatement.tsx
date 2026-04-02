"use client"
import { useEffect } from 'react'

const statementHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.stmt *, .stmt *::before, .stmt *::after { box-sizing: border-box; margin: 0; padding: 0; }

.stmt {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F4F7FA;
  --white:  #ffffff;
  --text:   #0d1f2d;
  --muted:  #5a7a96;
  --mono:   'DM Mono', monospace;

  position: relative;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  padding: clamp(80px,10vw,160px) clamp(40px,6%,120px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Eyebrow */
.stmt-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(32px,4vw,56px);
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s ease, transform 1s cubic-bezier(0.22,1,0.36,1);
}
.stmt-eyebrow::before {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}
.stmt-eyebrow.vis {
  opacity: 1;
  transform: translateX(0);
}

/* Main statement */
.stmt-text {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px,4vw,64px);
  font-weight: 600;
  color: var(--navy);
  line-height: 1.25;
  max-width: 1100px;
}

.stmt-line {
  display: block;
  overflow: hidden;
}

.stmt-line-inner {
  display: block;
  opacity: 0;
  transform: translateX(-100px);
  transition: opacity 0.9s ease, transform 1.2s cubic-bezier(0.22,1,0.3,1);
}

.stmt-line:nth-child(1) .stmt-line-inner { transition-delay: 0.1s; }
.stmt-line:nth-child(2) .stmt-line-inner { transition-delay: 0.2s; }
.stmt-line:nth-child(3) .stmt-line-inner { transition-delay: 0.3s; }

.stmt-line.vis .stmt-line-inner {
  opacity: 1;
  transform: translateX(0);
}

.stmt-text strong {
  font-weight: 700;
  color: var(--accent);
}

/* Bottom accent line */
.stmt-accent {
  width: 0;
  height: 2px;
  background: var(--accent);
  margin-top: clamp(36px,4vw,64px);
  transition: width 1.4s cubic-bezier(0.22,1,0.36,1) 0.5s;
}
.stmt-accent.vis {
  width: clamp(80px,12vw,200px);
}

/* ══ RESPONSIVE ══ */
@media (min-width: 1600px) {
  .stmt { padding: 140px 8%; }
  .stmt-text { font-size: 58px; max-width: 1200px; }
  .stmt-eyebrow { font-size: 12px; }
}

@media (min-width: 2200px) {
  .stmt { padding: 160px 10%; }
  .stmt-text { font-size: 68px; max-width: 1400px; }
  .stmt-eyebrow { font-size: 13px; margin-bottom: 64px; }
  .stmt-eyebrow::before { width: 44px; }
}

@media (min-width: 3200px) {
  .stmt { padding: 180px 12%; }
  .stmt-text { font-size: 80px; max-width: 1600px; }
}

@media (max-width: 768px) {
  .stmt { padding: 64px 24px; }
  .stmt-text { font-size: 24px; }
}
</style>

<section class="stmt" id="stmtRoot" aria-label="Our philosophy">
  <div class="stmt-eyebrow" id="stmtEye">How We Work</div>
  <div class="stmt-text">
    <span class="stmt-line" id="stmtL1"><span class="stmt-line-inner">Infrastructure projects don't fail from lack of tools.</span></span>
    <span class="stmt-line" id="stmtL2"><span class="stmt-line-inner">They fail from lack of <strong>structure.</strong></span></span>
    <span class="stmt-line" id="stmtL3"><span class="stmt-line-inner">We connect teams around one source of truth.</span></span>
  </div>
  <div class="stmt-accent" id="stmtAccent"></div>
</section>`

const statementScript = `(function(){
  var eye = document.getElementById('stmtEye');
  var l1 = document.getElementById('stmtL1');
  var l2 = document.getElementById('stmtL2');
  var l3 = document.getElementById('stmtL3');
  var accent = document.getElementById('stmtAccent');
  if(!eye) return;

  var targets = [eye, l1, l2, l3, accent];
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('vis');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function(t){ if(t) io.observe(t); });
}());`

export default function SectionStatement() {
  useEffect(() => {
    setTimeout(() => {
      try {
        new Function(statementScript)()
      } catch(e) {
        console.error('SectionStatement script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: statementHtml }}
    />
  )
}
