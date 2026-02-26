'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<style>
.lc{background:#F2F5F8;padding:120px 0 100px;position:relative;overflow:hidden}
.lc-c{max-width:1200px;margin:0 auto;padding:0 32px;position:relative;z-index:2}

.lc-hd{text-align:center;margin-bottom:80px;opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.lc-hd.vis{opacity:1;transform:translateY(0)}
.lc-ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;gap:12px;margin-bottom:20px;justify-content:center}
.lc-ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.lc-hd h2{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(28px,3.5vw,44px);text-transform:uppercase;letter-spacing:-.02em;color:#0B3C5D;margin-bottom:16px;line-height:1.08}
.lc-hd h2 em{font-style:italic;color:#47B5FF}
.lc-hd p{font-family:'Inter',sans-serif;font-size:15px;color:#5a7a96;max-width:520px;margin:0 auto;line-height:1.7}

.lc-track{position:relative;display:flex;gap:0;margin-bottom:72px;padding:0 20px}

.lc-line-bg{position:absolute;top:10px;left:calc(10% + 8px);right:calc(10% + 8px);height:2px;background:rgba(11,60,93,.1);z-index:1}
.lc-line-fill{position:absolute;top:10px;left:calc(10% + 8px);right:calc(10% + 8px);height:2px;background:linear-gradient(90deg,#47B5FF,#0B3C5D);z-index:2;transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(.22,1,.36,1) .3s}
.lc-track.vis .lc-line-fill{transform:scaleX(1)}

.lc-glow{position:absolute;top:4px;left:calc(10% + 8px);width:60px;height:14px;background:radial-gradient(ellipse,rgba(71,181,255,.5) 0%,transparent 70%);z-index:3;opacity:0;filter:blur(4px);transition:none}
.lc-track.vis .lc-glow{animation:lc-sweep 1.4s cubic-bezier(.22,1,.36,1) .3s forwards}
@keyframes lc-sweep{0%{left:calc(10% + 8px);opacity:1}100%{left:calc(90% - 52px);opacity:0}}

.lc-step{flex:1;text-align:center;position:relative;z-index:4;padding-top:32px}

.lc-dot{width:20px;height:20px;border-radius:50%;background:#F2F5F8;border:2px solid rgba(11,60,93,.15);margin:0 auto 28px;position:relative;z-index:5;transition:all .5s cubic-bezier(.22,1,.36,1);transform:scale(0)}
.lc-dot::after{content:'';position:absolute;inset:4px;border-radius:50%;background:transparent;transition:background .4s ease}
.lc-track.vis .lc-dot{transform:scale(1);border-color:#47B5FF}
.lc-track.vis .lc-dot::after{background:#47B5FF}
.lc-track.vis .lc-step:nth-child(1) .lc-dot{transition-delay:.4s}
.lc-track.vis .lc-step:nth-child(2) .lc-dot{transition-delay:.6s}
.lc-track.vis .lc-step:nth-child(3) .lc-dot{transition-delay:.8s}
.lc-track.vis .lc-step:nth-child(4) .lc-dot{transition-delay:1.0s}
.lc-track.vis .lc-step:nth-child(5) .lc-dot{transition-delay:1.2s}

.lc-step:hover .lc-dot{box-shadow:0 0 0 8px rgba(71,181,255,.1);transform:scale(1.15)!important}

.lc-step-content{opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease}
.lc-track.vis .lc-step:nth-child(1) .lc-step-content{transition-delay:.5s}
.lc-track.vis .lc-step:nth-child(2) .lc-step-content{transition-delay:.7s}
.lc-track.vis .lc-step:nth-child(3) .lc-step-content{transition-delay:.9s}
.lc-track.vis .lc-step:nth-child(4) .lc-step-content{transition-delay:1.1s}
.lc-track.vis .lc-step:nth-child(5) .lc-step-content{transition-delay:1.3s}
.lc-track.vis .lc-step-content{opacity:1;transform:translateY(0)}

.lc-stage{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#47B5FF;margin-bottom:10px;opacity:.7}
.lc-step h4{font-family:'Inter Tight',sans-serif;font-weight:800;font-size:16px;text-transform:uppercase;color:#0B3C5D;margin-bottom:10px;letter-spacing:-.01em;line-height:1.25}
.lc-step p{font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;color:#5a7a96;max-width:180px;margin:0 auto 16px}
.lc-sols{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
.lc-sols span{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(11,60,93,.1);color:#0B3C5D;background:rgba(255,255,255,.6);transition:all .3s ease}
.lc-sols span:hover{background:#fff;border-color:#47B5FF;color:#47B5FF}

.lc-ft{text-align:center;opacity:0;transform:translateY(20px);transition:opacity .8s ease,transform .8s ease}
.lc-ft.vis{opacity:1;transform:translateY(0)}
.lc-ft-bar{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(11,60,93,.1),transparent);margin-bottom:40px}
.lc-ft-txt{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(22px,2.8vw,34px);text-transform:uppercase;letter-spacing:.02em;color:#0B3C5D;line-height:1.3}
.lc-ft-txt span{color:#47B5FF}
.lc-ft-sub{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#5a7a96;margin-top:14px;opacity:.5}

@media(max-width:1024px){.lc-track{flex-wrap:wrap;padding:0}.lc-step{min-width:33%;margin-bottom:40px;padding-top:0}.lc-line-bg,.lc-line-fill,.lc-glow{display:none}.lc-dot{transform:scale(1)!important;border-color:#47B5FF!important}.lc-dot::after{background:#47B5FF!important}.lc-step-content{opacity:1!important;transform:none!important}}
@media(max-width:640px){.lc{padding:80px 0 72px}.lc-c{padding:0 20px}.lc-step{min-width:50%}.lc-hd{margin-bottom:48px}}
</style>

<section class="lc">
<div class="lc-c">
<div class="lc-hd" data-lc-hd>
<div class="lc-ey">Full Lifecycle Coverage</div>
<h2>Every stage of delivery,<br/><em>structured.</em></h2>
<p>Our six layers map directly to the stages of infrastructure delivery. From inception through operations — every handover is governed, every gap is closed.</p>
</div>

<div class="lc-track" data-lc-track>
<div class="lc-line-bg"></div>
<div class="lc-line-fill"></div>
<div class="lc-glow"></div>

<div class="lc-step">
<div class="lc-dot"></div>
<div class="lc-step-content">
<div class="lc-stage">Stage 01</div>
<h4>Concept</h4>
<p>Requirements definition, digital strategy, and procurement alignment</p>
<div class="lc-sols"><span>Strategy</span></div>
</div>
</div>

<div class="lc-step">
<div class="lc-dot"></div>
<div class="lc-step-content">
<div class="lc-stage">Stage 02</div>
<h4>Design</h4>
<p>Model coordination, CDE governance, and design-phase compliance</p>
<div class="lc-sols"><span>Structure</span><span>Intelligence</span></div>
</div>
</div>

<div class="lc-step">
<div class="lc-dot"></div>
<div class="lc-step-content">
<div class="lc-stage">Stage 03</div>
<h4>Construction</h4>
<p>Field BIM, 4D sequencing, progress tracking, and quality assurance</p>
<div class="lc-sols"><span>Execution</span><span>Insights</span></div>
</div>
</div>

<div class="lc-step">
<div class="lc-dot"></div>
<div class="lc-step-content">
<div class="lc-stage">Stage 04</div>
<h4>Commissioning</h4>
<p>As-built verification, data validation, and structured handover</p>
<div class="lc-sols"><span>Project Twin</span><span>Insights</span></div>
</div>
</div>

<div class="lc-step">
<div class="lc-dot"></div>
<div class="lc-step-content">
<div class="lc-stage">Stage 05</div>
<h4>Operations</h4>
<p>Digital twin activation, FM integration, and asset intelligence</p>
<div class="lc-sols"><span>Project Twin</span></div>
</div>
</div>
</div>

<div class="lc-ft" data-lc-ft>
<div class="lc-ft-bar"></div>
<div class="lc-ft-txt">End-to-end <span>·</span> No gaps <span>·</span> No silos</div>
<div class="lc-ft-sub">One framework from day one to decade fifty</div>
</div>
</div>
</section>
`;

const script = `
(function(){
  var hd = document.querySelector('[data-lc-hd]');
  var track = document.querySelector('[data-lc-track]');
  var ft = document.querySelector('[data-lc-ft]');
  if (!hd || !track || !ft) return;

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        e.target.classList.add('vis');
      }
    });
  }, { threshold: 0.15 });

  obs.observe(hd);
  obs.observe(track);
  obs.observe(ft);
})();
`;

export default function SolutionsLifecycle() {
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
