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

/* === TIMELINE ROW: dots + line === */
.lc-timeline{position:relative;display:flex;align-items:center;margin:0 auto 48px;padding:0 calc(10% - 10px)}

/* Base line (faint track) */
.lc-timeline::before{content:'';position:absolute;top:50%;left:calc(10%);right:calc(10%);height:2px;background:rgba(11,60,93,.08);transform:translateY(-50%);z-index:1}

/* Animated line segments */
.lc-seg{position:absolute;top:50%;height:2px;background:#47B5FF;z-index:2;transform:scaleX(0) translateY(-50%);transform-origin:left;opacity:0}

/* Each segment spans from one dot center to the next: 25% apart */
.lc-seg-1{left:calc(10% + 10px);width:calc(20%)}
.lc-seg-2{left:calc(30% + 10px);width:calc(20%)}
.lc-seg-3{left:calc(50% + 10px);width:calc(20%)}
.lc-seg-4{left:calc(70% + 10px);width:calc(20%)}

/* Dots */
.lc-dots{display:flex;width:100%;justify-content:space-between;position:relative;z-index:3}
.lc-dot-wrap{width:20px;height:20px;position:relative;cursor:pointer}
.lc-dot{width:20px;height:20px;border-radius:50%;background:#F2F5F8;border:2px solid rgba(11,60,93,.12);position:relative;z-index:4;transition:border-color .3s ease,box-shadow .4s ease,transform .3s ease}
.lc-dot::after{content:'';position:absolute;inset:4px;border-radius:50%;background:transparent;transition:background .3s ease,transform .3s cubic-bezier(.22,1,.36,1);transform:scale(0)}

/* Dot active state */
.lc-dot.a{border-color:#47B5FF;animation:dot-pop .45s cubic-bezier(.22,1,.36,1) forwards}
.lc-dot.a::after{background:#47B5FF;transform:scale(1)}
@keyframes dot-pop{0%{transform:scale(0)}50%{transform:scale(1.35)}100%{transform:scale(1)}}

/* Dot pulse ring on active */
.lc-dot.a::before{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(71,181,255,.2);animation:dot-ring 2s ease-in-out infinite;opacity:0}
@keyframes dot-ring{0%,100%{opacity:0;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}

/* === CONTENT ROW === */
.lc-content{display:flex;gap:0;margin-bottom:80px}
.lc-item{flex:1;text-align:center;padding:0 12px;position:relative;cursor:pointer}

.lc-item-inner{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease;padding:20px 8px;border-radius:4px;position:relative}
.lc-item-inner.a{opacity:1;transform:translateY(0)}

/* Hover effect */
.lc-item:hover .lc-item-inner{background:rgba(255,255,255,.7)}
.lc-item:hover .lc-item-inner::after{content:'';position:absolute;bottom:0;left:20%;right:20%;height:2px;background:#47B5FF;border-radius:1px}
.lc-item:hover h4{color:#47B5FF!important}
.lc-item:hover .lc-stage{opacity:1}

.lc-stage{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#47B5FF;margin-bottom:10px;opacity:.6;transition:opacity .3s ease}
.lc-item h4{font-family:'Inter Tight',sans-serif;font-weight:800;font-size:16px;text-transform:uppercase;color:#0B3C5D;margin-bottom:10px;letter-spacing:-.01em;line-height:1.25;transition:color .3s ease}
.lc-item p{font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;color:#5a7a96;max-width:180px;margin:0 auto 16px}
.lc-sols{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
.lc-sols span{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(11,60,93,.1);color:#0B3C5D;background:rgba(255,255,255,.6);transition:all .3s ease}
.lc-item:hover .lc-sols span{border-color:rgba(71,181,255,.25);color:#47B5FF}

/* Hover on dot too */
.lc-dot-wrap:hover .lc-dot.a{box-shadow:0 0 0 10px rgba(71,181,255,.1);transform:scale(1.15)}

/* === FOOTER === */
.lc-ft{text-align:center;opacity:0;transform:translateY(20px);transition:opacity .8s ease,transform .8s ease}
.lc-ft.vis{opacity:1;transform:translateY(0)}
.lc-ft-bar{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(11,60,93,.12),transparent);margin-bottom:44px}
.lc-ft-txt{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(24px,3vw,38px);text-transform:uppercase;letter-spacing:.02em;color:#0B3C5D;line-height:1.3}
.lc-ft-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#47B5FF;vertical-align:middle;margin:0 16px;position:relative;top:-2px}
.lc-ft-sub{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#0B3C5D;margin-top:16px;opacity:.4}

@media(max-width:1024px){
.lc-timeline{display:none}
.lc-content{flex-wrap:wrap}
.lc-item{min-width:33%;margin-bottom:36px}
.lc-item-inner{opacity:1!important;transform:none!important}
}
@media(max-width:640px){
.lc{padding:80px 0 72px}
.lc-c{padding:0 20px}
.lc-item{min-width:50%}
.lc-hd{margin-bottom:48px}
.lc-ft-txt{font-size:clamp(20px,5vw,30px)}
.lc-ft-dot{width:6px;height:6px;margin:0 10px}
}
</style>

<section class="lc">
<div class="lc-c">
<div class="lc-hd" data-lc-hd>
<div class="lc-ey">Full Lifecycle Coverage</div>
<h2>Every stage of delivery,<br/><em>structured.</em></h2>
<p>Our six layers map directly to the stages of infrastructure delivery. From concept through operations — every handover is governed, every gap is closed.</p>
</div>

<div class="lc-timeline" data-lc-tl>
<div class="lc-seg lc-seg-1" data-seg="1"></div>
<div class="lc-seg lc-seg-2" data-seg="2"></div>
<div class="lc-seg lc-seg-3" data-seg="3"></div>
<div class="lc-seg lc-seg-4" data-seg="4"></div>
<div class="lc-dots">
<div class="lc-dot-wrap" data-dw="0"><div class="lc-dot" data-dot="0"></div></div>
<div class="lc-dot-wrap" data-dw="1"><div class="lc-dot" data-dot="1"></div></div>
<div class="lc-dot-wrap" data-dw="2"><div class="lc-dot" data-dot="2"></div></div>
<div class="lc-dot-wrap" data-dw="3"><div class="lc-dot" data-dot="3"></div></div>
<div class="lc-dot-wrap" data-dw="4"><div class="lc-dot" data-dot="4"></div></div>
</div>
</div>

<div class="lc-content" data-lc-content>
<div class="lc-item" data-hover="0">
<div class="lc-item-inner" data-content="0">
<div class="lc-stage">Stage 01</div>
<h4>Concept</h4>
<p>Requirements definition, digital strategy, and procurement alignment</p>
<div class="lc-sols"><span>Strategy</span></div>
</div>
</div>

<div class="lc-item" data-hover="1">
<div class="lc-item-inner" data-content="1">
<div class="lc-stage">Stage 02</div>
<h4>Design</h4>
<p>Model coordination, CDE governance, and design-phase compliance</p>
<div class="lc-sols"><span>Structure</span><span>Intelligence</span></div>
</div>
</div>

<div class="lc-item" data-hover="2">
<div class="lc-item-inner" data-content="2">
<div class="lc-stage">Stage 03</div>
<h4>Construction</h4>
<p>Field BIM, 4D sequencing, progress tracking, and quality assurance</p>
<div class="lc-sols"><span>Execution</span><span>Insights</span></div>
</div>
</div>

<div class="lc-item" data-hover="3">
<div class="lc-item-inner" data-content="3">
<div class="lc-stage">Stage 04</div>
<h4>Commissioning</h4>
<p>As-built verification, data validation, and structured handover</p>
<div class="lc-sols"><span>Project Twin</span><span>Insights</span></div>
</div>
</div>

<div class="lc-item" data-hover="4">
<div class="lc-item-inner" data-content="4">
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
  var tl = document.querySelector('[data-lc-tl]');
  var ft = document.querySelector('[data-lc-ft]');
  if (!hd || !tl || !ft) return;

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

    var stepDelay = 450;
    var lineDrawMs = 350;

    for (var s = 0; s < 5; s++) {
      (function(idx) {
        var baseTime = idx * stepDelay;

        // 1. Pop the dot
        setTimeout(function(){
          if (dots[idx]) dots[idx].classList.add('a');
        }, baseTime);

        // 2. Reveal content slightly after dot
        setTimeout(function(){
          if (contents[idx]) contents[idx].classList.add('a');
        }, baseTime + 180);

        // 3. Draw line segment TO the next dot (starts shortly after this dot appears)
        if (idx < 4 && segs[idx]) {
          setTimeout(function(){
            segs[idx].style.opacity = '1';
            segs[idx].style.transition = 'transform ' + lineDrawMs + 'ms cubic-bezier(.22,1,.36,1)';
            segs[idx].style.transform = 'scaleX(1) translateY(-50%)';
          }, baseTime + 120);
        }

      })(s);
    }

    // Footer after everything
    setTimeout(function(){
      ft.classList.add('vis');
    }, 5 * stepDelay + 300);
  }

  // Hover sync: hovering content highlights corresponding dot
  for (var h = 0; h < 5; h++) {
    (function(idx){
      var item = document.querySelector('[data-hover="' + idx + '"]');
      var dotW = document.querySelector('[data-dw="' + idx + '"]');
      if (!item || !dotW) return;
      item.addEventListener('mouseenter', function(){
        var d = dotW.querySelector('.lc-dot');
        if (d && d.classList.contains('a')) {
          d.style.boxShadow = '0 0 0 10px rgba(71,181,255,.1)';
          d.style.transform = 'scale(1.15)';
        }
      });
      item.addEventListener('mouseleave', function(){
        var d = dotW.querySelector('.lc-dot');
        if (d) {
          d.style.boxShadow = '';
          d.style.transform = '';
        }
      });
      dotW.addEventListener('mouseenter', function(){
        item.querySelector('.lc-item-inner').style.background = 'rgba(255,255,255,.7)';
        item.querySelector('h4').style.color = '#47B5FF';
      });
      dotW.addEventListener('mouseleave', function(){
        item.querySelector('.lc-item-inner').style.background = '';
        item.querySelector('h4').style.color = '';
      });
    })(h);
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
  trackObs.observe(tl);
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
