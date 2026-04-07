"use client"
import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   INFRAFORMA — Section 1: Data Transformation (Epic Design)
   
   Techniques applied:
   - 6-layer depth system (depth 0–5)
   - Masked line curtain reveal (headlines)
   - Line draw eyebrow
   - Clip-path wipe reveal (canvas)
   - Staggered fade-up (body, CTA, legend)
   - Ghost watermark at bottom (depth-2)
   - Particle stream canvas with portal gate
   - prefers-reduced-motion fallback
   ═══════════════════════════════════════════════════════════════ */

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&family=Inter+Tight:wght@600;700;800&display=swap');

/* ═══ REDUCED MOTION ═══ */
@media (prefers-reduced-motion: reduce) {
  .ifs *, .ifs *::before, .ifs *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .ifs .ifs-anim { opacity: 1 !important; transform: none !important; clip-path: none !important; }
  .ifs .ifs-h-line { transform: none !important; }
  .ifs .ifs-canvas-wrap { clip-path: none !important; }
}

/* ═══ SCENE ═══ */
.ifs {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --bg:     #F4F7FA;
  --text:   #0d1f2d;
  --muted:  #4a6a82;
  --mono:   'DM Mono', monospace;
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* ═══ DEPTH LAYERS ═══ */
.ifs .ifs-layer { position: absolute; inset: 0; pointer-events: none; }

/* depth-0: dot grid */
.ifs .ifs-d0 {
  z-index: 0;
  background-image: radial-gradient(circle, rgba(11,60,93,0.045) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 65%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 65%);
}

/* depth-1: atmosphere */
.ifs .ifs-d1 {
  z-index: 1;
  background: radial-gradient(ellipse 50% 40% at 30% 60%, rgba(71,181,255,0.035) 0%, transparent 100%),
              radial-gradient(ellipse 40% 35% at 70% 50%, rgba(11,60,93,0.02) 0%, transparent 100%);
}

/* depth-2: ghost watermark at bottom */
.ifs .ifs-d2 {
  position: absolute; left: 0; right: 0; bottom: 0; height: 160px;
  z-index: 2; pointer-events: none;
  display: flex; align-items: flex-end; justify-content: center;
  overflow: hidden; padding-bottom: 14px;
}
.ifs-ghost {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(100px, 14vw, 220px);
  font-weight: 900; letter-spacing: -0.04em; line-height: 0.80;
  text-transform: uppercase; color: transparent;
  -webkit-text-stroke: 1px rgba(11,60,93,0.04);
  white-space: nowrap; user-select: none;
  opacity: 0;
  transition: opacity 2s cubic-bezier(0.22,1,0.36,1);
}
.ifs-ghost.vis { opacity: 1; }

/* depth-5: edge lines */
.ifs .ifs-d5 { z-index: 5; }
.ifs .ifs-d5::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 10%, rgba(11,60,93,0.06) 30%, rgba(11,60,93,0.06) 70%, transparent 90%);
}
.ifs .ifs-d5::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 10%, rgba(11,60,93,0.06) 30%, rgba(11,60,93,0.06) 70%, transparent 90%);
}

/* ═══ CONTENT ═══ */
.ifs .ifs-content {
  position: relative; z-index: 4;
  display: flex; flex-direction: column;
  min-height: 100vh;
}

.ifs .ifs-top {
  display: flex; align-items: flex-end; justify-content: space-between;
  padding: clamp(48px,5vw,80px) clamp(32px,5%,80px) 0;
  gap: 40px;
}

/* ── LEFT ── */
.ifs .ifs-left { display: flex; flex-direction: column; gap: clamp(16px,2vw,24px); max-width: 620px; }

.ifs .ifs-eyebrow {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--accent);
  display: flex; align-items: center; gap: 14px;
  opacity: 0; transform: translateX(-20px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-eyebrow::before {
  content: ''; width: 0; height: 1.5px; background: var(--accent);
  transition: width 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.ifs .ifs-eyebrow.vis { opacity: 1; transform: translateX(0); }
.ifs .ifs-eyebrow.vis::before { width: 28px; }

/* ── HEADLINE — masked curtain ── */
.ifs .ifs-h-mask { overflow: hidden; line-height: 1.08; }
.ifs .ifs-h-line {
  display: block; font-family: 'Outfit', sans-serif; font-weight: 700;
  text-transform: uppercase; color: var(--navy); letter-spacing: -0.02em;
  transform: translateY(110%);
  transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-h-line.vis { transform: translateY(0); }

.ifs .ifs-h-sm { font-size: clamp(20px,2.2vw,36px); color: var(--muted); font-weight: 600; }
.ifs .ifs-h-lg {
  font-size: clamp(42px,4.8vw,82px); font-weight: 800;
  color: var(--accent); line-height: 0.95; position: relative;
}
.ifs .ifs-h-lg::after {
  content: ''; position: absolute; bottom: -3px; left: 0;
  width: 0; height: 3px;
  background: linear-gradient(90deg, var(--accent), rgba(71,181,255,0.15));
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.22,1,0.36,1) 0.6s;
}
.ifs .ifs-h-lg.vis::after { width: 100%; }
.ifs .ifs-h-md { font-size: clamp(28px,3vw,52px); }

/* ── BODY ── */
.ifs .ifs-sub {
  font-size: clamp(14px,1.05vw,17px); color: var(--muted);
  line-height: 1.75; max-width: 460px;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-sub.vis { opacity: 1; transform: translateY(0); }

.ifs .ifs-cta {
  display: inline-flex; align-items: center; gap: 10px; align-self: flex-start;
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #fff; background: var(--navy);
  border-radius: 2px; padding: 16px 28px;
  text-decoration: none; border: none; cursor: pointer;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1),
              background 0.25s, box-shadow 0.25s;
}
.ifs .ifs-cta.vis { opacity: 1; transform: translateY(0); }
.ifs .ifs-cta:hover { background: #0d4d78; box-shadow: 0 8px 24px rgba(11,60,93,0.18); }
.ifs .ifs-cta-arr { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.ifs .ifs-cta:hover .ifs-cta-arr { transform: translateX(5px); }

/* ── RIGHT ── */
.ifs .ifs-right {
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 8px; text-align: right;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-right.vis { opacity: 1; transform: translateY(0); }
.ifs .ifs-right-ey { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(11,60,93,0.35); }
.ifs .ifs-right-t { font-family: 'Outfit', sans-serif; font-size: clamp(15px,1.3vw,22px); font-weight: 700; text-transform: uppercase; color: var(--navy); letter-spacing: 0.01em; }
.ifs .ifs-right-s { font-size: clamp(12px,0.9vw,15px); color: var(--muted); line-height: 1.65; max-width: 380px; }

/* ═══ CANVAS ═══ */
.ifs .ifs-canvas-wrap {
  flex: 1; position: relative; z-index: 3;
  margin: clamp(16px,2vw,32px) clamp(16px,2vw,32px) 0;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.4s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-canvas-wrap.vis { clip-path: inset(0 0% 0 0); }
.ifs .ifs-canvas-wrap canvas {
  display: block; width: 100%; height: clamp(380px,44vh,520px); border-radius: 6px;
}

/* ═══ BOTTOM ═══ */
.ifs .ifs-bottom { position: relative; z-index: 6; }
.ifs .ifs-legend {
  display: flex; gap: clamp(20px,2.5vw,32px); justify-content: center;
  padding: clamp(12px,1.2vw,18px) 40px clamp(6px,0.8vw,10px);
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-legend.vis { opacity: 1; transform: translateY(0); }
.ifs .ifs-leg {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 10px; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--navy); opacity: 0.55;
}
.ifs .ifs-dot { width: 8px; height: 8px; border-radius: 50%; }
.ifs .ifs-foot {
  text-align: center; padding: 4px 40px clamp(24px,3vw,40px);
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(11,60,93,0.22);
  opacity: 0; transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1);
}
.ifs .ifs-foot.vis { opacity: 1; }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 1000px) {
  .ifs .ifs-top { flex-direction: column; align-items: flex-start; }
  .ifs .ifs-right { align-items: flex-start; text-align: left; }
}
@media (max-width: 480px) {
  .ifs .ifs-legend { flex-direction: column; align-items: center; gap: 8px; }
  .ifs .ifs-h-sm { font-size: 18px; }
  .ifs .ifs-h-lg { font-size: 38px; }
  .ifs .ifs-h-md { font-size: 24px; }
}
@media (min-width: 1800px) {
  .ifs .ifs-top { padding: 100px 100px 0; }
  .ifs .ifs-h-sm { font-size: 38px; }
  .ifs .ifs-h-lg { font-size: 92px; }
  .ifs .ifs-h-md { font-size: 58px; }
  .ifs .ifs-sub { font-size: 18px; }
  .ifs .ifs-right-t { font-size: 24px; }
}
@media (min-width: 2400px) {
  .ifs .ifs-top { padding: 120px 140px 0; }
  .ifs .ifs-h-lg { font-size: 110px; }
  .ifs .ifs-h-md { font-size: 68px; }
  .ifs-ghost { font-size: 260px; }
}
</style>

<section class="ifs" aria-label="Data transformation methodology">
  <div class="ifs-layer ifs-d0" aria-hidden="true"></div>
  <div class="ifs-layer ifs-d1" aria-hidden="true"></div>
  <div class="ifs-d2" aria-hidden="true"><div class="ifs-ghost ifs-anim" data-delay="800">INFRAFORMA</div></div>

  <div class="ifs-content">
    <div class="ifs-top">
      <div class="ifs-left">
        <div class="ifs-eyebrow ifs-anim" data-delay="0">What We Do</div>
        <h2>
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-sm ifs-anim" data-delay="60">We help project teams deliver</span></div>
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-lg ifs-anim" data-delay="160">Real Projects</span></div>
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-md ifs-anim" data-delay="260">with digital power</span></div>
        </h2>
        <p class="ifs-sub ifs-anim" data-delay="400">We build lean digital systems that match how your teams actually work. No tool overload. No process bloat. Just the structure your project needs to move.</p>
        <a href="/solutions/" class="ifs-cta ifs-anim" data-delay="520">Discover The Process <span class="ifs-cta-arr">→</span></a>
      </div>
      <div class="ifs-right ifs-anim" data-delay="200">
        <div class="ifs-right-ey">Data Transformation</div>
        <div class="ifs-right-t">Raw data in. Structured intelligence out.</div>
        <p class="ifs-right-s">Three critical project disciplines converge through our methodology — delivering clarity where complexity lives.</p>
      </div>
    </div>

    <div class="ifs-canvas-wrap ifs-anim" data-delay="300">
      <canvas id="ifsCanvas"></canvas>
    </div>

    <div class="ifs-bottom">
      <div class="ifs-legend ifs-anim" data-delay="900">
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(22,50,135,0.75)"></div>Cost &amp; Estimating</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(25,155,105,0.75)"></div>Scheduling &amp; Planning</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(0,160,215,0.75)"></div>Risk Management</div>
      </div>
      <div class="ifs-foot ifs-anim" data-delay="1050">↳ Infraforma intelligence methodology</div>
    </div>
  </div>

  <div class="ifs-layer ifs-d5" aria-hidden="true"></div>
</section>`

const sectionScript = `(function(){
  /* ═══ SCROLL REVEALS ═══ */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var d = parseInt(e.target.getAttribute('data-delay') || '0');
        setTimeout(function(){ e.target.classList.add('vis'); }, d);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.ifs-anim').forEach(function(el){ io.observe(el); });

  /* ═══ PARTICLE CANVAS ═══ */
  var C = document.getElementById('ifsCanvas');
  if (!C) return;
  var X = C.getContext('2d');
  var dpr = Math.min(devicePixelRatio || 1, 2);
  var W, H;

  var SC = [
    {b:[12,30,100],r:[28,60,155],txt:[12,40,120]},
    {b:[15,115,75],r:[28,170,112],txt:[8,100,68]},
    {b:[0,135,190],r:[0,190,240],txt:[0,105,155]}
  ];
  var LABELS = ['Cost & estimating','Scheduling & planning','Risk management'];
  var WORD_POOLS = [
    ['Budget confidence','Estimate accuracy','Cost transparency','Variance control','Forecast precision','Cash flow clarity','Quantity assurance','Value engineering','Bid optimization','Procurement insight','Change order control','Cost benchmarking'],
    ['Milestone clarity','Resource optimization','Critical path insight','Delivery predictability','Sequence alignment','Look-ahead planning','Float management','Baseline integrity','Progress tracking','Delay mitigation','Earned value analysis','Schedule compression'],
    ['Threat visibility','Mitigation planning','Exposure reduction','Contingency precision','Probability assessment','Impact analysis','Risk register depth','Scenario modeling','Early warning systems','Residual risk tracking','Response strategy','Tolerance mapping']
  ];

  var SPLIT_X=0.20, FAN_END=0.50, PORTAL_X=0.65, NP=1800, NUM_OUT=12;
  var portalReached = false;

  function lerp(a,b,t){return a+(b-a)*t;}
  function clamp(v,lo,hi){return v<lo?lo:v>hi?hi:v;}
  function streamY(si){return H*(0.14+si*0.36);}
  function outY(i){return H*(0.05+i*(0.90/11));}
  function cFor(si,v){var s=SC[si];return[Math.round(lerp(s.b[0],s.r[0],v)),Math.round(lerp(s.b[1],s.r[1],v)),Math.round(lerp(s.b[2],s.r[2],v))];}
  function bez(a,b,c,d,e,f,g,h,t){var u=1-t,uu=u*u,uuu=uu*u,tt=t*t,ttt=tt*t;return{x:uuu*a+3*uu*t*c+3*u*tt*e+ttt*g,y:uuu*b+3*uu*t*d+3*u*tt*f+ttt*h};}

  var curves = [];
  function buildCurves(){
    curves=[];var sx=W*SPLIT_X,ex=W*FAN_END;
    for(var si=0;si<3;si++){var sy=streamY(si);
      for(var oi=0;oi<12;oi++){var ey=outY(oi),dy=ey-sy;
        curves.push({si:si,oi:oi,p0x:sx,p0y:sy,p1x:sx+(ex-sx)*0.30,p1y:sy+dy*0.06,p2x:sx+(ex-sx)*0.68,p2y:ey-dy*0.10,p3x:ex,p3y:ey});
      }
    }
  }

  function resize(){
    var r=C.getBoundingClientRect();
    C.width=r.width*dpr;C.height=r.height*dpr;
    X.setTransform(dpr,0,0,dpr,0,0);
    W=r.width;H=r.height;
    buildCurves();
  }
  resize();
  window.addEventListener('resize',resize);

  /* ── Particle class ── */
  function P(li){this.assign(true,li);}
  P.prototype.assign=function(init,li){
    this.si=Math.floor(Math.random()*3);this.oi=Math.floor(Math.random()*12);
    this.cIdx=this.si*12+this.oi;this.v=Math.random();this.col=cFor(this.si,this.v);
    this.baseA=0.30+Math.random()*0.50;this.sz=0.6+Math.random()*1.8;
    this.yOff=(Math.random()-0.5)*22;this.wo=Math.random()*Math.PI*2;
    this.spd=0.50+Math.random()*0.80;this.fanSpd=0.0014+Math.random()*0.0022;
    this.runYOff=(Math.random()-0.5)*5;this.phase=0;this.fanT=0;
    this.y=streamY(this.si);this.a=0;
    if(init&&typeof li==='number'&&li<20){this.x=-(li*8+Math.random()*30);this.spd=0.9+Math.random()*0.5;this.fanSpd=0.003+Math.random()*0.002;}
    else if(init){this.x=-(Math.random()*W*0.12+5);}
    else{this.x=-(5+Math.random()*W*0.14);}
  };
  P.prototype.reset=function(){this.assign(false);};
  P.prototype.update=function(t){
    var sX=W*SPLIT_X,fX=W*FAN_END,pX=W*PORTAL_X;
    var w=Math.sin(t*0.002+this.wo)*2.5;
    if(this.phase===0){this.x+=this.spd;this.y=streamY(this.si)+this.yOff+w;this.a=this.baseA*clamp(this.x/(W*0.05),0,1);if(this.x>=sX){this.phase=1;this.fanT=0;}}
    else if(this.phase===1){this.fanT+=this.fanSpd;if(this.fanT>=1.0){this.phase=2;this.x=fX;return;}var c=curves[this.cIdx];if(!c){this.reset();return;}var pos=bez(c.p0x,c.p0y,c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y,this.fanT);var lf=1-this.fanT*0.7;this.x=pos.x;this.y=pos.y+this.yOff*lf*0.3+w*lf;this.a=this.baseA*0.85;}
    else if(this.phase===2){this.x+=this.spd;this.y=outY(this.oi)+this.runYOff+w*0.3;var nP=clamp((this.x-(pX-W*0.05))/(W*0.05),0,1);this.a=this.baseA*(1+nP*0.25);if(this.x>=pX){if(!portalReached)portalReached=true;this.reset();}}
  };

  var particles=[];
  for(var i=0;i<NP;i++) particles.push(new P(i));

  /* ── Word slots ── */
  var wordSlots=[];
  for(var i=0;i<NUM_OUT;i++){
    var si=i<4?0:i<8?1:2;
    wordSlots.push({si:si,g:i,pool:WORD_POOLS[si].slice(),poolIdx:0,instances:[],spawnCd:80+i*60});
  }

  var twC={};
  function tw(t){if(!twC[t]){X.font='700 13px "Inter Tight",sans-serif';twC[t]=X.measureText(t).width;}return twC[t];}
  function nextWord(slot){var w=slot.pool[slot.poolIdx%slot.pool.length];slot.poolIdx++;return w;}

  var time=0;
  var canvasVis=false;
  var cObs=new IntersectionObserver(function(entries){entries.forEach(function(e){canvasVis=e.isIntersecting;});},{threshold:0.05});
  cObs.observe(C);

  /* ── Draw helpers ── */
  function drawFG(){for(var i=0;i<curves.length;i++){var c=curves[i],sc=SC[c.si];X.strokeStyle='rgba('+sc.r[0]+','+sc.r[1]+','+sc.r[2]+',0.05)';X.lineWidth=0.5;X.beginPath();X.moveTo(c.p0x,c.p0y);X.bezierCurveTo(c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y);X.stroke();}}
  function drawSG(){for(var si=0;si<3;si++){var sy=streamY(si),sc=SC[si];var g=X.createLinearGradient(0,sy-26,0,sy+26);g.addColorStop(0,'rgba('+sc.r[0]+','+sc.r[1]+','+sc.r[2]+',0)');g.addColorStop(0.5,'rgba('+sc.r[0]+','+sc.r[1]+','+sc.r[2]+',0.04)');g.addColorStop(1,'rgba('+sc.r[0]+','+sc.r[1]+','+sc.r[2]+',0)');X.fillStyle=g;X.fillRect(0,sy-26,W*SPLIT_X+10,52);}}
  function drawPortal(){
    var px=W*PORTAL_X;
    var g=X.createLinearGradient(px-18,0,px+18,0);
    g.addColorStop(0,'rgba(30,80,140,0.0)');g.addColorStop(0.3,'rgba(30,80,140,0.035)');
    g.addColorStop(0.5,'rgba(30,80,140,0.10)');g.addColorStop(0.7,'rgba(30,80,140,0.035)');
    g.addColorStop(1,'rgba(30,80,140,0.0)');
    X.fillStyle=g;X.fillRect(px-18,0,36,H);
    var pulse=0.15+Math.sin(time*0.003)*0.07;
    X.strokeStyle='rgba(30,80,150,'+pulse+')';X.lineWidth=1.5;
    X.beginPath();X.moveTo(px,H*0.01);X.lineTo(px,H*0.99);X.stroke();
    X.strokeStyle='rgba(0,140,200,'+(pulse*0.2)+')';X.lineWidth=0.5;
    var offsets=[-4,4];for(var o=0;o<offsets.length;o++){X.beginPath();X.moveTo(px+offsets[o],H*0.01);X.lineTo(px+offsets[o],H*0.99);X.stroke();}
    for(var i=0;i<12;i++){var ny=outY(i),np=0.18+Math.sin(time*0.004+i*0.5)*0.07;X.beginPath();X.arc(px,ny,2,0,Math.PI*2);X.fillStyle='rgba(30,80,150,'+(np+0.18)+')';X.fill();}
  }
  function drawLabels(){X.font='500 10px "DM Mono",monospace';X.textAlign='left';for(var si=0;si<3;si++){var yC=streamY(si),sc=SC[si];X.fillStyle='rgba('+sc.txt[0]+','+sc.txt[1]+','+sc.txt[2]+',0.58)';X.fillText(LABELS[si].toUpperCase(),10,yC-18);}}
  function drawGuides(){if(!portalReached)return;var px=W*PORTAL_X;X.strokeStyle='rgba(30,80,140,0.025)';X.lineWidth=0.5;for(var i=0;i<12;i++){var y=outY(i);X.beginPath();X.moveTo(px+12,y);X.lineTo(W,y);X.stroke();}}
  function drawExitWords(){
    if(!portalReached)return;
    var px=W*PORTAL_X,MIN_GAP=40;
    X.textAlign='left';X.font='700 13px "Inter Tight",sans-serif';
    for(var s=0;s<wordSlots.length;s++){
      var slot=wordSlots[s];
      for(var i=slot.instances.length-1;i>=0;i--){
        var w=slot.instances[i];w.x+=w.sp;w.a=Math.min(w.a+0.006,0.92);
        var fe=W*0.90,fo=w.x>fe?Math.max(0,1-(w.x-fe)/(W*0.10)):1;
        if(w.x>W+30){slot.instances.splice(i,1);continue;}
        var ty=outY(slot.g),sc=SC[slot.si];
        X.fillStyle='rgba('+sc.txt[0]+','+sc.txt[1]+','+sc.txt[2]+','+(w.a*fo)+')';
        X.fillText(w.txt,w.x,ty+5);
      }
      slot.spawnCd-=1;
      if(slot.spawnCd<=0&&slot.instances.length<2){
        var ok=true;
        if(slot.instances.length>0){var last=slot.instances[slot.instances.length-1];var lastW=tw(last.txt);if(last.x+lastW+MIN_GAP>px+24)ok=false;}
        if(ok){
          var maxSpd=Infinity;for(var j=0;j<slot.instances.length;j++){if(slot.instances[j].sp<maxSpd)maxSpd=slot.instances[j].sp;}
          var sp=slot.instances.length===0?0.20+Math.random()*0.15:Math.min(0.18+Math.random()*0.10,maxSpd*0.95);
          var txt=nextWord(slot);
          var unique=true;for(var j=0;j<slot.instances.length;j++){if(slot.instances[j].txt===txt)unique=false;}
          if(unique){slot.instances.push({x:px+24,a:0,sp:sp,txt:txt});slot.spawnCd=350+Math.random()*400;}else{slot.spawnCd=20;}
        }else{slot.spawnCd=30;}
      }
    }
  }

  /* ── Main loop ── */
  function frame(){
    time++;
    if(!canvasVis){requestAnimationFrame(frame);return;}
    X.clearRect(0,0,W,H);
    drawSG();drawFG();drawGuides();drawPortal();drawLabels();
    for(var i=0;i<particles.length;i++) particles[i].update(time);
    for(var i=0;i<particles.length;i++){
      var p=particles[i];if(p.a<0.01)continue;
      X.beginPath();X.arc(p.x,p.y,p.sz,0,Math.PI*2);
      X.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+clamp(p.a,0,1)+')';
      X.fill();
    }
    drawExitWords();
    requestAnimationFrame(frame);
  }
  frame();
}());`

export default function Section1() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

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
