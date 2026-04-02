"use client"
import { useEffect } from 'react'

const statementHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.stmt *, .stmt *::before, .stmt *::after { box-sizing: border-box; margin: 0; padding: 0; }

.stmt {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --mono:   'DM Mono', monospace;

  position: relative;
  background: var(--navy);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: clamp(32px,4vw,64px);
  padding: clamp(48px,5vw,80px) clamp(40px,6%,120px);
}

/* Label */
.stmt-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.stmt-label.vis {
  opacity: 1;
  transform: translateX(0);
}

/* Vertical divider */
.stmt-divider {
  width: 1px;
  align-self: stretch;
  background: rgba(71,181,255,0.25);
  flex-shrink: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s;
}
.stmt-divider.vis {
  transform: scaleY(1);
}

/* Statement text */
.stmt-text {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(20px,2.4vw,38px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ease 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.stmt-text.vis {
  opacity: 1;
  transform: translateX(0);
}

.stmt-text .stmt-fade {
  color: rgba(255,255,255,0.35);
  font-weight: 600;
}

/* ══ RESPONSIVE ══ */
@media (min-width: 1600px) {
  .stmt { padding: 72px 8%; }
  .stmt-text { font-size: 36px; }
  .stmt-label { font-size: 11px; }
}

@media (min-width: 2200px) {
  .stmt { padding: 88px 10%; gap: 72px; }
  .stmt-text { font-size: 42px; }
  .stmt-label { font-size: 12px; letter-spacing: 0.35em; }
}

@media (min-width: 3200px) {
  .stmt { padding: 100px 12%; gap: 80px; }
  .stmt-text { font-size: 50px; }
}

@media (max-width: 768px) {
  .stmt {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 48px 24px;
  }
  .stmt-divider {
    width: 40px;
    height: 1px;
    align-self: auto;
    transform: scaleX(0);
    transform-origin: left;
  }
  .stmt-divider.vis { transform: scaleX(1); }
  .stmt-text { font-size: 20px; }
}
</style>

<section class="stmt" id="stmtRoot" aria-label="How we work">
  <div class="stmt-label" id="stmtLabel">How We Work</div>
  <div class="stmt-divider" id="stmtDiv"></div>
  <div class="stmt-text" id="stmtText">Infrastructure projects don't fail from lack of tools. They fail from lack of structure. <span class="stmt-fade">We connect every team around one source of truth.</span></div>
</section>`

const statementScript = `(function(){
  var els = [
    document.getElementById('stmtLabel'),
    document.getElementById('stmtDiv'),
    document.getElementById('stmtText')
  ];
  if(!els[0]) return;

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('vis');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  els.forEach(function(el){ if(el) io.observe(el); });
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
