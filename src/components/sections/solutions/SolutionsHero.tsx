'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&amp;family=Inter+Tight:ital,wght@0,100..900;1,100..900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
<style>
.sh{position:relative;min-height:100vh;display:flex;align-items:center;background:#1C1F23;overflow:hidden}
.sh .bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 68% 45%,rgba(11,60,93,0.5) 0%,transparent 65%),radial-gradient(ellipse 50% 45% at 22% 55%,rgba(11,60,93,0.3) 0%,transparent 60%),radial-gradient(ellipse 35% 35% at 60% 25%,rgba(71,181,255,0.06) 0%,transparent 50%);pointer-events:none;z-index:1}
.sh .vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 35%,rgba(28,31,35,0.65) 100%);pointer-events:none;z-index:1}
.sh .scn{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(71,181,255,0.45),transparent);opacity:.15;animation:scn 8s linear infinite;pointer-events:none;z-index:3}
@keyframes scn{0%{top:0}100%{top:100%}}
.sh .btl{position:absolute;top:100px;left:40px;width:44px;height:44px;border-top:1px solid rgba(71,181,255,0.25);border-left:1px solid rgba(71,181,255,0.25);z-index:4}
.sh .bbr{position:absolute;bottom:80px;right:40px;width:44px;height:44px;border-bottom:1px solid rgba(71,181,255,0.25);border-right:1px solid rgba(71,181,255,0.25);z-index:4}
.sh .slbl{position:absolute;right:44px;top:50%;transform:translateY(-50%) rotate(90deg);font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#7a9bb5;opacity:.25;z-index:4;white-space:nowrap}

.sh-inner{position:relative;z-index:5;max-width:1200px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;gap:48px;width:100%}
.sh-left{max-width:540px;flex-shrink:0}

.sh .ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;gap:12px;margin-bottom:24px}
.sh .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.sh h1{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(40px,5vw,64px);line-height:1.04;text-transform:uppercase;letter-spacing:-.02em;color:#F4F6F8;margin-bottom:24px}
.sh h1 em{font-style:italic;color:#47B5FF}
.sh .sub{font-family:'Inter',sans-serif;font-size:17px;line-height:1.75;color:#7a9bb5;max-width:490px;margin-bottom:32px}
.sh .tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}
.sh .tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(71,181,255,0.18);color:#7a9bb5;transition:all .3s ease}
.sh .tag:hover{border-color:#47B5FF;color:#47B5FF}
.sh .tag span{color:#47B5FF;margin-right:6px;opacity:.5}
.sh .ctas{display:flex;gap:16px;flex-wrap:wrap}
.sh .ba{display:inline-flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:14px 28px;border:none;color:#fff;background:#47B5FF;cursor:pointer;transition:all .35s ease;text-decoration:none}
.sh .ba:hover{background:#3aa0e6;transform:translateY(-1px)}
.sh .bp{display:inline-flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:14px 28px;border:1px solid rgba(71,181,255,0.18);color:#F4F6F8;background:transparent;cursor:pointer;transition:all .4s ease;text-decoration:none}
.sh .bp:hover{background:#0B3C5D;border-color:#47B5FF;color:#fff}

/* ── Right: Abstract brand mark ── */
.sh-right{flex-shrink:0;width:460px;height:460px;position:relative;display:flex;align-items:center;justify-content:center}

/* Ambient glow */
.sh-right .glow{position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(71,181,255,0.08) 0%,rgba(11,60,93,0.06) 40%,transparent 70%);pointer-events:none}

/* Hexagonal rings */
.hex-ring{position:absolute;top:50%;left:50%;transform-origin:center center}
.hex-ring svg{display:block}

.hr1{width:280px;height:280px;margin-left:-140px;margin-top:-140px;animation:hRot1 50s linear infinite}
.hr2{width:200px;height:200px;margin-left:-100px;margin-top:-100px;animation:hRot2 35s linear infinite reverse}
.hr3{width:130px;height:130px;margin-left:-65px;margin-top:-65px;animation:hRot3 25s linear infinite}
.hr4{width:360px;height:360px;margin-left:-180px;margin-top:-180px;animation:hRot4 70s linear infinite reverse}

@keyframes hRot1{to{transform:rotate(360deg)}}
@keyframes hRot2{to{transform:rotate(360deg)}}
@keyframes hRot3{to{transform:rotate(360deg)}}
@keyframes hRot4{to{transform:rotate(360deg)}}

/* Center core */
.core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:3;text-align:center}
.core-circle{width:90px;height:90px;border-radius:50%;background:rgba(28,31,35,0.9);border:1px solid rgba(71,181,255,0.2);display:flex;align-items:center;justify-content:center;position:relative;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.core-circle::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(71,181,255,0.08);animation:corePulse 3s ease-in-out infinite}
.core-circle::after{content:'';position:absolute;inset:-18px;border-radius:50%;border:1px solid rgba(71,181,255,0.04);animation:corePulse 3s ease-in-out .5s infinite}
@keyframes corePulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.03)}}
.core-text{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#F4F6F8;line-height:1.3}
.core-sub{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.12em;color:#47B5FF;opacity:.7;margin-top:2px;text-transform:uppercase}

/* Floating dots */
.fdot{position:absolute;border-radius:50%;background:#47B5FF;pointer-events:none}
.fd1{width:3px;height:3px;top:18%;left:22%;opacity:.15;animation:fdFloat 6s ease-in-out infinite}
.fd2{width:2px;height:2px;top:72%;left:15%;opacity:.1;animation:fdFloat 8s ease-in-out 1s infinite}
.fd3{width:4px;height:4px;top:25%;right:18%;opacity:.12;animation:fdFloat 7s ease-in-out 2s infinite}
.fd4{width:2px;height:2px;top:68%;right:22%;opacity:.15;animation:fdFloat 5s ease-in-out .5s infinite}
.fd5{width:3px;height:3px;top:45%;left:8%;opacity:.08;animation:fdFloat 9s ease-in-out 3s infinite}
.fd6{width:2px;height:2px;bottom:20%;right:30%;opacity:.1;animation:fdFloat 6s ease-in-out 1.5s infinite}
@keyframes fdFloat{0%,100%{transform:translateY(0) scale(1);opacity:.1}50%{transform:translateY(-12px) scale(1.3);opacity:.25}}

/* Scroll indicator */
.sh .sci{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:5}
.sh .sci span{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#7a9bb5;opacity:.5}
.sh .scl{width:1px;height:32px;background:#47B5FF;opacity:.3;animation:scp 2s ease-in-out infinite}
@keyframes scp{0%,100%{opacity:.15;transform:scaleY(.6)}50%{opacity:.4;transform:scaleY(1)}}

@media(max-width:1100px){
  .sh .slbl{display:none}
  .sh-inner{flex-direction:column;text-align:left;padding-top:130px;padding-bottom:100px}
  .sh-right{width:350px;height:350px}
}
@media(max-width:640px){
  .sh-inner{padding:130px 20px 100px}
  .sh-right{width:280px;height:280px}
  .sh h1{font-size:clamp(32px,8vw,48px)}
  .core-circle{width:70px;height:70px}
}
</style>

<section class="sh">
  <div class="bg"></div>
  <div class="vig"></div>
  <div class="scn"></div>
  <div class="btl"></div>
  <div class="bbr"></div>
  <div class="slbl">Solutions · Six Layers of Control</div>

  <div class="sh-inner">
    <div class="sh-left">
      <div class="ey">Six-Layer Solutions Framework</div>
      <h1>Structured<br/>Digital <em>Delivery.</em></h1>
      <p class="sub">Six integrated layers that take your project from strategic planning through to operational intelligence. Each layer compounds on the last — building a controlled digital ecosystem across your entire programme lifecycle.</p>
      <div class="tags">
        <div class="tag"><span>01</span> Strategy</div>
        <div class="tag"><span>02</span> Structure</div>
        <div class="tag"><span>03</span> Intelligence</div>
        <div class="tag"><span>04</span> Execution</div>
        <div class="tag"><span>05</span> Project Twin</div>
        <div class="tag"><span>06</span> Insights</div>
      </div>
      <div class="ctas">
        <a href="/contact/" class="ba">Schedule a Discovery Call</a>
        <a href="/process/" class="bp">Our Process →</a>
      </div>
    </div>

    <div class="sh-right">
      <div class="glow"></div>

      <!-- Outer ring -->
      <div class="hex-ring hr4">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,2 93,27 93,73 50,98 7,73 7,27" stroke="rgba(71,181,255,0.06)" stroke-width="0.3" fill="none"/>
        </svg>
      </div>

      <!-- Large ring -->
      <div class="hex-ring hr1">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,2 93,27 93,73 50,98 7,73 7,27" stroke="rgba(71,181,255,0.15)" stroke-width="0.4" fill="none" stroke-dasharray="2 3"/>
        </svg>
      </div>

      <!-- Medium ring -->
      <div class="hex-ring hr2">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,2 93,27 93,73 50,98 7,73 7,27" stroke="rgba(71,181,255,0.2)" stroke-width="0.5" fill="none"/>
        </svg>
      </div>

      <!-- Inner ring -->
      <div class="hex-ring hr3">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="rgba(71,181,255,0.25)" stroke-width="0.6" fill="rgba(71,181,255,0.02)"/>
        </svg>
      </div>

      <!-- Core -->
      <div class="core">
        <div class="core-circle">
          <div>
            <div class="core-text">Infraforma</div>
            <div class="core-sub">Solutions</div>
          </div>
        </div>
      </div>

      <!-- Floating particles -->
      <div class="fdot fd1"></div>
      <div class="fdot fd2"></div>
      <div class="fdot fd3"></div>
      <div class="fdot fd4"></div>
      <div class="fdot fd5"></div>
      <div class="fdot fd6"></div>
    </div>
  </div>

  <div class="sci">
    <span>Scroll</span>
    <div class="scl"></div>
  </div>
</section>
`;

export default function SolutionsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
