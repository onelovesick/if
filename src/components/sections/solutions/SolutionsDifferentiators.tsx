'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<style>
.df{background:#1C1F23;padding:120px 0;position:relative;overflow:hidden}

/* Layered background: radial color echoes */
.df::before{content:'';position:absolute;top:-20%;left:-10%;width:60%;height:70%;background:radial-gradient(ellipse,rgba(11,60,93,.25) 0%,transparent 70%);pointer-events:none;z-index:0}
.df::after{content:'';position:absolute;bottom:-15%;right:-5%;width:50%;height:60%;background:radial-gradient(ellipse,rgba(71,181,255,.08) 0%,transparent 70%);pointer-events:none;z-index:0}
.df-glow1{position:absolute;top:40%;left:50%;width:40%;height:40%;background:radial-gradient(ellipse,rgba(71,181,255,.04) 0%,transparent 70%);transform:translate(-50%,-50%);pointer-events:none;z-index:0}
.df-glow2{position:absolute;top:10%;right:10%;width:200px;height:200px;background:radial-gradient(circle,rgba(71,181,255,.06) 0%,transparent 70%);pointer-events:none;z-index:0;border-radius:50%}
.df-glow3{position:absolute;bottom:10%;left:15%;width:160px;height:160px;background:radial-gradient(circle,rgba(11,60,93,.3) 0%,transparent 70%);pointer-events:none;z-index:0;border-radius:50%}

/* Subtle noise texture overlay */
.df-noise{position:absolute;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:128px 128px;pointer-events:none;z-index:0}

.df-c{max-width:1200px;margin:0 auto;padding:0 32px;position:relative;z-index:2}

.df-hd{text-align:center;max-width:600px;margin:0 auto 72px;opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.df-hd.vis{opacity:1;transform:translateY(0)}
.df-ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;gap:12px;margin-bottom:20px;justify-content:center}
.df-ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.df-hd h2{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(28px,3.5vw,44px);text-transform:uppercase;letter-spacing:-.02em;color:#F4F6F8;margin-bottom:16px;line-height:1.08}
.df-hd h2 em{font-style:italic;color:#47B5FF}
.df-hd p{font-family:'Inter',sans-serif;font-size:15px;color:#7a9bb5;line-height:1.7}

.df-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}

.df-card{border:1px solid rgba(71,181,255,.08);padding:52px 40px;position:relative;background:rgba(28,31,35,.6);backdrop-filter:blur(4px);overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease,background .4s ease,border-color .4s ease}
.df-card.vis{opacity:1;transform:translateY(0)}

/* Card hover glow */
.df-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 50% 0%,rgba(71,181,255,.06) 0%,transparent 70%);opacity:0;transition:opacity .5s ease;pointer-events:none;z-index:0}
.df-card:hover::before{opacity:1}
.df-card:hover{background:rgba(11,60,93,.15);border-color:rgba(71,181,255,.2)}

/* Corner accents */
.df-corner-tl,.df-corner-br{position:absolute;width:16px;height:16px;pointer-events:none;z-index:1;opacity:.3;transition:opacity .4s ease}
.df-corner-tl{top:-1px;left:-1px;border-top:1px solid #47B5FF;border-left:1px solid #47B5FF}
.df-corner-br{bottom:-1px;right:-1px;border-bottom:1px solid #47B5FF;border-right:1px solid #47B5FF}
.df-card:hover .df-corner-tl,.df-card:hover .df-corner-br{opacity:.7}

/* Icon */
.df-icon{width:52px;height:52px;border:1px solid rgba(71,181,255,.12);display:flex;align-items:center;justify-content:center;margin-bottom:28px;font-size:20px;color:#47B5FF;position:relative;z-index:1;transition:border-color .4s ease,box-shadow .4s ease,transform .3s ease;background:rgba(11,60,93,.08)}
.df-card:hover .df-icon{border-color:rgba(71,181,255,.3);box-shadow:0 0 20px rgba(71,181,255,.08);transform:translateY(-2px)}

/* Text */
.df-card h4{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:17px;text-transform:uppercase;color:#F4F6F8;margin-bottom:14px;letter-spacing:-.01em;position:relative;z-index:1;transition:color .3s ease}
.df-card:hover h4{color:#47B5FF}
.df-card p{font-family:'Inter',sans-serif;font-size:14px;line-height:1.7;color:#7a9bb5;position:relative;z-index:1;transition:color .3s ease}
.df-card:hover p{color:#9ab8d0}

/* Bottom accent line */
.df-line{position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(90deg,#47B5FF,rgba(71,181,255,.3));transition:width .6s cubic-bezier(.22,1,.36,1);z-index:2}
.df-card:hover .df-line{width:100%}

/* Top shimmer on hover */
.df-shimmer{position:absolute;top:0;left:-100%;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(71,181,255,.4),transparent);transition:none;z-index:2}
.df-card:hover .df-shimmer{animation:df-shimmer .8s ease forwards}
@keyframes df-shimmer{0%{left:-100%}100%{left:100%}}

@media(max-width:1024px){.df-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.df{padding:80px 0}.df-c{padding:0 20px}.df-grid{grid-template-columns:1fr}.df-card{padding:40px 28px}}
</style>

<section class="df">
<div class="df-glow1"></div>
<div class="df-glow2"></div>
<div class="df-glow3"></div>
<div class="df-noise"></div>
<div class="df-c">
<div class="df-hd" data-df-hd>
<div class="df-ey">Why Infraforma</div>
<h2>Not just tools.<br/><em>Structured</em> delivery.</h2>
<p>We don't sell software licences. We engineer the systems, governance, and workflows that make your existing technology actually work.</p>
</div>

<div class="df-grid" data-df-grid>
<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">⎔</div>
<h4>Platform Agnostic</h4>
<p>We work with your existing stack — Autodesk, Bentley, Procore, or others. We integrate, not replace.</p>
<div class="df-line"></div>
</div>

<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">◇</div>
<h4>ISO 19650 Native</h4>
<p>Every solution is built on international information management standards. Compliance isn't an add-on — it's foundational.</p>
<div class="df-line"></div>
</div>

<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">⬡</div>
<h4>Lifecycle Thinking</h4>
<p>We don't stop at design. Our solutions extend through construction, commissioning, and into operations and FM.</p>
<div class="df-line"></div>
</div>

<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">△</div>
<h4>Lean Implementation</h4>
<p>We deploy only what adds measurable value. No bloated workflows, no unnecessary tools, no scope creep.</p>
<div class="df-line"></div>
</div>

<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">⊞</div>
<h4>People-First Process</h4>
<p>Technology serves the team, not the other way around. We design systems that people actually want to use.</p>
<div class="df-line"></div>
</div>

<div class="df-card" data-df-card>
<div class="df-corner-tl"></div><div class="df-corner-br"></div>
<div class="df-shimmer"></div>
<div class="df-icon">◎</div>
<h4>Proven at Scale</h4>
<p>55+ years combined experience. $50B+ in assets delivered. From P3 corridors to institutional campuses.</p>
<div class="df-line"></div>
</div>
</div>
</div>
</section>
`;

const script = `
(function(){
  var hd = document.querySelector('[data-df-hd]');
  var cards = document.querySelectorAll('[data-df-card]');
  if (!hd) return;

  var hdObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.15 });
  hdObs.observe(hd);

  // Staggered card reveal
  var gridObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        var allCards = e.target.querySelectorAll('[data-df-card]');
        allCards.forEach(function(card, i){
          setTimeout(function(){
            card.classList.add('vis');
          }, i * 120);
        });
        gridObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  var grid = document.querySelector('[data-df-grid]');
  if (grid) gridObs.observe(grid);
})();
`;

export default function SolutionsDifferentiators() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.innerHTML = html;
    const timer = setTimeout(() => {
      try { new Function(script)(); } catch(e) { console.error(e); }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} suppressHydrationWarning />
  );
}
