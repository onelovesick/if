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

.lc-track{position:relative;display:flex;gap:0;margin-bottom:80px;padding:0 20px}

/* Line segments between each dot pair */
.lc-seg{position:absolute;top:10px;height:2px;background:#47B5FF;z-index:1;transform:scaleX(0);transform-origin:left}
.lc-seg.a{opacity:0}

/* 5 dots positioned at center of each flex column = 10%, 30%, 50%, 70%, 90% */
.lc-seg-1{left:calc(10% + 10px);width:calc(20% - 10px)}
.lc-seg-2{left:calc(30% + 10px);width:calc(20% - 10px)}
.lc-seg-3{left:calc(50% + 10px);width:calc(20% - 10px)}
.lc-seg-4{left:calc(70% + 10px);width:calc(20% - 10px)}

.lc-step{flex:1;text-align:center;position:relative;z-index:4;padding-top:32px}

.lc-dot{width:20px;height:20px;border-radius:50%;background:#F2F5F8;border:2px solid rgba(11,60,93,.12);margin:0 auto 28px;position:relative;z-index:5;transition:border-color .3s ease,box-shadow .3s ease}
.lc-dot::after{content:'';position:absolute;inset:4px;border-radius:50%;background:transparent;transition:background .3s ease,transform .3s ease;transform:scale(0)}
.lc-dot.a{border-color:#47B5FF;animation:dot-pop .4s cubic-bezier(.22,1,.36,1) forwards}
.lc-dot.a::after{background:#47B5FF;transform:scale(1)}
@keyframes dot-pop{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}

.lc-step:hover .lc-dot.a{box-shadow:0 0 0 8px rgba(71,181,255,.1)}

.lc-step-content{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease}
.lc-step-content.a{opacity:1;transform:translateY(0)}

.lc-stage{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#47B5FF;margin-bottom:10px;opacity:.7}
.lc-step h4{font-family:'Inter Tight',sans-serif;font-weight:800;font-size:16px;text-transform:uppercase;color:#0B3C5D;margin-bottom:10px;letter-spacing:-.01em;line-height:1.25}
.lc-step p{font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;color:#5a7a96;max-width:180px;margin:0 auto 16px}
.lc-sols{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
.lc-sols span{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(11,60,93,.1);color:#0B3C5D;background:rgba(255,255,255,.6);transition:all .3s ease}
.lc-sols span:hover{background:#fff;border-color:#47B5FF;color:#47B5FF}

.lc-ft{text-align:center;opacity:0;transform:translateY(20px);transition:opacity .8s ease,transform .8s ease}
.lc-ft.vis{opacity:1;transform:translateY(0)}
.lc-ft-bar{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(11,60,93,.12),transparent);margin-bottom:44px}
.lc-ft-txt{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(24px,3vw,38px);text-transform:uppercase;letter-spacing:.02em;color:#0B3C5D;line-height:1.3}
.lc-ft-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#47B5FF;vertical-align:middle;margin:0 16px;position:relative;top:-2px}
.lc-ft-sub{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#0B3C5D;margin-top:16px;opacity:.4}

@media(max-width:1024px){.lc-track{flex-wrap:wrap;padding:0}.lc-step{min-width:33%;margin-bottom:40px;padding-top:0}.lc-seg{display:none}.lc-dot{animation:none!important;border-color:#47B5FF!important}.lc-dot::after{background:#47B5FF!important;transform:scale(1)!important}.lc-step-content{opacity:1!important;transform:none!important}}
@media(max-width:640px){.lc{padding:80px 0 72px}.lc-c{padding:0 20px}.lc-step{min-width:50%}.lc-hd{margin-bottom:48px}.lc-ft-txt{font-size:clamp(20px,5vw,30px)}.lc-ft-dot{width:6px;height:6px;margin:0 10px}}
</style>

<section class="lc">
<div class="lc-c">
<div class="lc-hd" data-lc-hd>
<div class="lc-ey">Full Lifecycle Coverage</div>
<h2>Every stage of delivery,<br/><em>structured.</em></h2>
<p>Our six layers map directly to the stages of infrastructure delivery. From inception through operations — every handover is governed, every gap is closed.</p>
</div>

<div class="lc-track" data-lc-track>
<div class="lc-seg lc-seg-1" data-seg="1"></div>
<div class="lc-seg lc-seg-2" data-seg="2"></div>
<div class="lc-seg lc-seg-3" data-seg="3"></div>
<div class="lc-seg lc-seg-4" data-seg="4"></div>

<div class="lc-step" data-step="0">
<div class="lc-dot" data-dot="0"></div>
<div class="lc-step-content" data-content="0">
<div class="lc-stage">Stage 01</div>
<h4>Concept</h4>
<p>Requirements definition, digital strategy, and procurement alignment</p>
<div class="lc-sols"><span>Strategy</span></div>
</div>
</div>

<div class="lc-step" data-step="1">
<div class="lc-dot" data-dot="1"></div>
<div class="lc-step-content" data-content="1">
<div class="lc-stage">Stage 02</div>
<h4>Design</h4>
<p>Model coordination, CDE governance, and design-phase compliance</p>
<div class="lc-sols"><span>Structure</span><span>Intelligence</span></div>
</div>
</div>

<div class="lc-step" data-step="2">
<div class="lc-dot" data-dot="2"></div>
<div class="lc-step-content" data-content="2">
<div class="lc-stage">Stage 03</div>
<h4>Construction</h4>
<p>Field BIM, 4D sequencing, progress tracking, and quality assurance</p>
<div class="lc-sols"><span>Execution</span><span>Insights</span></div>
</div>
</div>

<div class="lc-step" data-step="3">
<div class="lc-dot" data-dot="3"></div>
<div class="lc-step-content" data-content="3">
<div class="lc-stage">Stage 04</div>
<h4>Commissioning</h4>
<p>As-built verification, data validation, and structured handover</p>
<div class="lc-sols"><span>Project Twin</span><span>Insights</span></div>
</div>
</div>

<div class="lc-step" data-step="4">
<div class="lc-dot" data-dot="4"></div>
<div class="lc-step-content" data-content="4">
<div class="lc-stage">Stage 05</div>
<h4>Operations</h4>
<p>Digital twin activation, FM integration, and asset intelligence</p>
<div class="lc-sols"><span>Project Twin</span></div>
</div>
</div>
</div>

<div class="lc-ft" data-lc-ft>
<div class="lc-ft-bar"></div>
<div class="lc-ft-txt">End-to-end <span class="lc-ft-dot"></span> No gaps <span class="lc-ft-dot"></span> No silos</div>
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

  var started = false;

  function runSequence() {
    if (started) return;
    started = true;

    var dots = [];
    var contents = [];
    var segs = [];
    for (var i = 0; i < 5; i++) {
      dots.push(document.querySelector('[data-dot="' + i + '"]'));
      contents.push(document.querySelector('[data-content="' + i + '"]'));
    }
    for (var j = 1; j <= 4; j++) {
      segs.push(document.querySelector('[data-seg="' + j + '"]'));
    }

    /* Timing: each step is ~400ms
       dot0 appears at 0ms
       content0 at 150ms
       seg1 draws 300ms (duration 350ms)
       dot1 pops at 650ms
       content1 at 800ms
       seg2 draws 900ms ...
    */

    var stepDelay = 500;
    var lineDrawDuration = 350;

    for (var s = 0; s < 5; s++) {
      (function(idx) {
        var dotTime = idx === 0 ? 0 : (idx * stepDelay + 150);
        var contentTime = dotTime + 150;
        var segTime = idx > 0 ? ((idx - 1) * stepDelay + 300) : -1;

        // Draw line segment BEFORE this dot (connects prev dot to this one)
        if (idx > 0 && segs[idx - 1]) {
          setTimeout(function(){
            var seg = segs[idx - 1];
            seg.style.opacity = '1';
            seg.style.transition = 'transform ' + lineDrawDuration + 'ms cubic-bezier(.22,1,.36,1)';
            seg.style.transform = 'scaleX(1)';
          }, segTime);
        }

        // Pop dot
        setTimeout(function(){
          if (dots[idx]) dots[idx].classList.add('a');
        }, dotTime);

        // Reveal content
        setTimeout(function(){
          if (contents[idx]) contents[idx].classList.add('a');
        }, contentTime);

      })(s);
    }

    // Reveal footer after all steps done
    var totalTime = 4 * stepDelay + 500;
    setTimeout(function(){
      ft.classList.add('vis');
    }, totalTime);
  }

  // Header reveal
  var hdObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.15 });
  hdObs.observe(hd);

  // Track sequence trigger
  var trackObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) runSequence();
    });
  }, { threshold: 0.2 });
  trackObs.observe(track);
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
