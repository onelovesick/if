"use client"
import { useEffect, useRef } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&family=Inter+Tight:wght@600;700;800&display=swap');
@media (prefers-reduced-motion: reduce) {
  .ifs *, .ifs *::before, .ifs *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .ifs [data-gsap] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
}
.ifs { --accent:#47B5FF;--navy:#0B3C5D;--bg:#F4F7FA;--muted:#4a6a82;--mono:'DM Mono',monospace; position:relative; min-height:100vh; background:var(--bg); overflow:hidden; font-family:'Inter',sans-serif; }
.ifs-layer { position:absolute; inset:0; pointer-events:none; }
.ifs-d0 { z-index:0; background-image:radial-gradient(circle,rgba(11,60,93,0.05) 1px,transparent 1px); background-size:32px 32px; mask-image:radial-gradient(ellipse 85% 75% at 50% 50%,black 10%,transparent 60%); -webkit-mask-image:radial-gradient(ellipse 85% 75% at 50% 50%,black 10%,transparent 60%); }
.ifs-d1 { z-index:1; background:radial-gradient(ellipse 55% 45% at 25% 55%,rgba(71,181,255,0.04) 0%,transparent 100%),radial-gradient(ellipse 45% 40% at 75% 45%,rgba(11,60,93,0.025) 0%,transparent 100%); }
.ifs-d2 { position:absolute; left:0; right:0; bottom:0; height:170px; z-index:2; pointer-events:none; display:flex; align-items:flex-end; justify-content:center; overflow:hidden; padding-bottom:16px; }
.ifs-ghost { font-family:'Outfit',sans-serif; font-size:clamp(100px,15vw,240px); font-weight:900; letter-spacing:-0.04em; line-height:0.78; text-transform:uppercase; color:transparent; -webkit-text-stroke:1px rgba(11,60,93,0.04); white-space:nowrap; user-select:none; opacity:0; }
.ifs-d5 { z-index:5; }
.ifs-d5::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.07) 30%,rgba(11,60,93,0.07) 70%,transparent 92%); }
.ifs-d5::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.07) 30%,rgba(11,60,93,0.07) 70%,transparent 92%); }
.ifs-content { position:relative; z-index:4; display:flex; flex-direction:column; min-height:100vh; }
.ifs-top { display:flex; align-items:flex-end; justify-content:space-between; padding:clamp(48px,5.5vw,90px) clamp(32px,5%,90px) 0; gap:44px; }
.ifs-left { display:flex; flex-direction:column; gap:clamp(16px,2vw,26px); max-width:640px; }
.ifs-eyebrow { font-family:var(--mono); font-size:11px; font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:14px; opacity:0; }
.ifs-eyebrow-line { display:inline-block; width:0; height:1.5px; background:var(--accent); }
.ifs-headline { max-width:680px; }
.ifs-h-mask { overflow:hidden; line-height:1.08; }
.ifs-h-line { display:block; font-family:'Outfit',sans-serif; font-weight:700; text-transform:uppercase; color:var(--navy); letter-spacing:-0.02em; }
.ifs-h-sm { font-size:clamp(20px,2.2vw,38px); color:var(--muted); font-weight:600; }
.ifs-h-lg { font-size:clamp(44px,5vw,88px); font-weight:800; color:var(--accent); line-height:0.94; position:relative; }
.ifs-h-rule { display:block; width:0; height:3px; margin-top:4px; background:linear-gradient(90deg,var(--accent),rgba(71,181,255,0.12)); border-radius:2px; }
.ifs-h-md { font-size:clamp(28px,3.2vw,56px); }
.ifs-sub { font-size:clamp(14px,1.1vw,17px); color:var(--muted); line-height:1.78; max-width:470px; opacity:0; }
.ifs-cta { display:inline-flex; align-items:center; gap:10px; align-self:flex-start; font-family:var(--mono); font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:#fff; background:var(--navy); border-radius:2px; padding:16px 30px; text-decoration:none; border:none; cursor:pointer; opacity:0; transition:background 0.25s,box-shadow 0.3s,transform 0.3s; }
.ifs-cta:hover { background:#0d4d78; box-shadow:0 8px 28px rgba(11,60,93,0.2); transform:translateY(-2px); }
.ifs-cta-arr { transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.ifs-cta:hover .ifs-cta-arr { transform:translateX(5px); }
.ifs-right { display:flex; flex-direction:column; align-items:flex-end; gap:10px; text-align:right; opacity:0; }
.ifs-right-ey { font-family:var(--mono); font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(11,60,93,0.38); }
.ifs-right-t { font-family:'Outfit',sans-serif; font-size:clamp(16px,1.4vw,24px); font-weight:700; text-transform:uppercase; color:var(--navy); letter-spacing:0.01em; line-height:1.2; }
.ifs-right-s { font-size:clamp(13px,0.95vw,15px); color:var(--muted); line-height:1.65; max-width:400px; }
.ifs-canvas-wrap { flex:1; position:relative; z-index:3; margin:clamp(18px,2.5vw,36px) clamp(18px,2.5vw,36px) 0; clip-path:inset(0 100% 0 0); }
.ifs-canvas-wrap canvas { display:block; width:100%; height:clamp(380px,46vh,540px); border-radius:8px; }
.ifs-bottom { position:relative; z-index:6; }
.ifs-legend { display:flex; gap:clamp(22px,2.8vw,36px); justify-content:center; padding:clamp(14px,1.4vw,20px) 40px clamp(6px,1vw,12px); opacity:0; }
.ifs-leg { display:flex; align-items:center; gap:8px; font-family:var(--mono); font-size:10px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:var(--navy); opacity:0.5; }
.ifs-dot { width:9px; height:9px; border-radius:50%; }
.ifs-foot { text-align:center; padding:6px 40px clamp(28px,3.5vw,48px); font-family:var(--mono); font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(11,60,93,0.2); opacity:0; }
@media (max-width:1000px) { .ifs-top{flex-direction:column;align-items:flex-start;} .ifs-right{align-items:flex-start;text-align:left;} }
@media (max-width:480px) { .ifs-legend{flex-direction:column;align-items:center;gap:8px;} }
@media (min-width:1800px) { .ifs-top{padding:100px 110px 0;} .ifs-sub{font-size:18px;max-width:520px;} .ifs-right-t{font-size:26px;} }
@media (min-width:2400px) { .ifs-top{padding:120px 150px 0;} .ifs-ghost{font-size:280px;} }
</style>
<section class="ifs" id="ifsSection" aria-label="Data transformation methodology">
  <div class="ifs-layer ifs-d0" data-depth="0" aria-hidden="true"></div>
  <div class="ifs-layer ifs-d1" data-depth="1" aria-hidden="true"></div>
  <div class="ifs-d2" data-depth="2" aria-hidden="true"><div class="ifs-ghost" id="ifsGhost">INFRAFORMA</div></div>
  <div class="ifs-content">
    <div class="ifs-top">
      <div class="ifs-left">
        <div class="ifs-eyebrow" id="ifsEyebrow"><span class="ifs-eyebrow-line" id="ifsEyeLine"></span>What We Do</div>
        <h2 class="ifs-headline">
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-sm" id="ifsH1">We help project teams deliver</span></div>
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-lg" id="ifsH2">Real Projects</span></div>
          <span class="ifs-h-rule" id="ifsHRule"></span>
          <div class="ifs-h-mask"><span class="ifs-h-line ifs-h-md" id="ifsH3">with digital power</span></div>
        </h2>
        <p class="ifs-sub" id="ifsSub">We build lean digital systems that match how your teams actually work. No tool overload. No process bloat. Just the structure your project needs to move.</p>
        <a href="/solutions/" class="ifs-cta" id="ifsCta">Discover The Process <span class="ifs-cta-arr">&rarr;</span></a>
      </div>
      <div class="ifs-right" id="ifsRight">
        <div class="ifs-right-ey">Data Transformation</div>
        <div class="ifs-right-t">Raw data in. Structured intelligence out.</div>
        <p class="ifs-right-s">Three critical project disciplines converge through our methodology &mdash; delivering clarity where complexity lives.</p>
      </div>
    </div>
    <div class="ifs-canvas-wrap" id="ifsCanvasWrap"><canvas id="ifsCanvas"></canvas></div>
    <div class="ifs-bottom">
      <div class="ifs-legend" id="ifsLegend">
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(22,50,135,0.75)"></div>Cost &amp; Estimating</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(25,155,105,0.75)"></div>Scheduling &amp; Planning</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(0,160,215,0.75)"></div>Risk Management</div>
      </div>
      <div class="ifs-foot" id="ifsFoot">&darr; Infraforma intelligence methodology</div>
    </div>
  </div>
  <div class="ifs-layer ifs-d5" data-depth="5" aria-hidden="true"></div>
</section>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"><\/script>`

const sectionScript = `(function(){
if(typeof gsap==='undefined'){console.warn('GSAP not loaded');return;}
gsap.registerPlugin(ScrollTrigger);
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var scene=document.getElementById('ifsSection');
if(!scene)return;

/* ═══ PARALLAX ═══ */
if(!reduced){
  var df={'0':0.06,'1':0.15,'2':0.30,'5':1.05};
  var layers=scene.querySelectorAll('[data-depth]');
  for(var i=0;i<layers.length;i++){
    var d=layers[i].getAttribute('data-depth');
    var f=df[d]||1;
    gsap.to(layers[i],{yPercent:-8*f,ease:'none',scrollTrigger:{trigger:scene,start:'top bottom',end:'bottom top',scrub:true}});
  }
}

/* ═══ SET INITIAL STATES ═══ */
if(!reduced){
  gsap.set('#ifsEyebrow',{opacity:0,x:-24});
  gsap.set('#ifsEyeLine',{width:0});
  gsap.set(['#ifsH1','#ifsH2','#ifsH3'],{y:'115%'});
  gsap.set('#ifsHRule',{width:0});
  gsap.set('#ifsSub',{opacity:0,y:32});
  gsap.set('#ifsCta',{opacity:0,y:24});
  gsap.set('#ifsRight',{opacity:0,y:28,x:20});
  gsap.set('#ifsCanvasWrap',{clipPath:'inset(0 100% 0 0)'});
  gsap.set('#ifsGhost',{opacity:0,y:20});
  gsap.set('#ifsLegend',{opacity:0,y:16});
  gsap.set('#ifsFoot',{opacity:0});
}

/* ═══ ENTRANCE TIMELINE ═══ */
if(!reduced){
  var tl=gsap.timeline({
    scrollTrigger:{trigger:scene,start:'top 72%',toggleActions:'play none none none'}
  });

  tl.to('#ifsEyeLine',{width:32,duration:0.7,ease:'power2.out'},0)
    .to('#ifsEyebrow',{opacity:1,x:0,duration:0.6,ease:'power3.out'},0.05)

    .to('#ifsH1',{y:'0%',duration:0.9,ease:'power4.out'},0.12)
    .to('#ifsH2',{y:'0%',duration:1.0,ease:'power4.out'},0.28)
    .to('#ifsH3',{y:'0%',duration:0.9,ease:'power4.out'},0.48)
    .to('#ifsHRule',{width:'100%',duration:1.0,ease:'power2.out'},0.60)

    .to('#ifsSub',{opacity:1,y:0,duration:0.8,ease:'power3.out'},0.50)
    .to('#ifsCta',{opacity:1,y:0,duration:0.7,ease:'power3.out'},0.68)

    .to('#ifsRight',{opacity:1,y:0,x:0,duration:0.8,ease:'power3.out'},0.30)

    .to('#ifsCanvasWrap',{clipPath:'inset(0 0% 0 0)',duration:1.4,ease:'power2.inOut'},0.35)

    .to('#ifsGhost',{opacity:1,y:0,duration:1.8,ease:'power1.out'},0.70)

    .to('#ifsLegend',{opacity:1,y:0,duration:0.7,ease:'power3.out'},1.05)
    .to('#ifsFoot',{opacity:1,duration:0.6,ease:'power2.out'},1.20);
} else {
  gsap.set(['#ifsEyebrow','#ifsH1','#ifsH2','#ifsH3','#ifsSub','#ifsCta','#ifsRight','#ifsCanvasWrap','#ifsGhost','#ifsLegend','#ifsFoot'],{opacity:1,y:0,x:0,clearProps:'clipPath'});
  gsap.set('#ifsEyeLine',{width:32});
  gsap.set('#ifsHRule',{width:'100%'});
}

/* ═══════════════════════════
   PARTICLE CANVAS
   ═══════════════════════════ */
var C=document.getElementById('ifsCanvas');
if(!C)return;
var X=C.getContext('2d');
var dpr=Math.min(devicePixelRatio||1,2);
var W,H;
var SC=[{b:[12,30,100],r:[28,60,155],txt:[12,40,120]},{b:[15,115,75],r:[28,170,112],txt:[8,100,68]},{b:[0,135,190],r:[0,190,240],txt:[0,105,155]}];
var LABELS=['Cost & estimating','Scheduling & planning','Risk management'];
var WP=[
  ['Budget confidence','Estimate accuracy','Cost transparency','Variance control','Forecast precision','Cash flow clarity','Quantity assurance','Value engineering','Bid optimization','Procurement insight','Change order control','Cost benchmarking'],
  ['Milestone clarity','Resource optimization','Critical path insight','Delivery predictability','Sequence alignment','Look-ahead planning','Float management','Baseline integrity','Progress tracking','Delay mitigation','Earned value analysis','Schedule compression'],
  ['Threat visibility','Mitigation planning','Exposure reduction','Contingency precision','Probability assessment','Impact analysis','Risk register depth','Scenario modeling','Early warning systems','Residual risk tracking','Response strategy','Tolerance mapping']
];
var SX=0.20,FE=0.50,PX=0.65,NP=1800,NO=12;
var pR=false;
function lerp(a,b,t){return a+(b-a)*t;}
function clamp(v,l,h){return v<l?l:v>h?h:v;}
function sY(si){return H*(0.14+si*0.36);}
function oY(i){return H*(0.05+i*(0.90/11));}
function cF(si,v){var s=SC[si];return[Math.round(lerp(s.b[0],s.r[0],v)),Math.round(lerp(s.b[1],s.r[1],v)),Math.round(lerp(s.b[2],s.r[2],v))];}
function bz(a,b,c,d,e,f,g,h,t){var u=1-t,uu=u*u,uuu=uu*u,tt=t*t,ttt=tt*t;return{x:uuu*a+3*uu*t*c+3*u*tt*e+ttt*g,y:uuu*b+3*uu*t*d+3*u*tt*f+ttt*h};}
var cv=[];
function bC(){cv=[];var sx=W*SX,ex=W*FE;for(var si=0;si<3;si++){var sy=sY(si);for(var oi=0;oi<12;oi++){var ey=oY(oi),dy=ey-sy;cv.push({si:si,oi:oi,p0x:sx,p0y:sy,p1x:sx+(ex-sx)*0.30,p1y:sy+dy*0.06,p2x:sx+(ex-sx)*0.68,p2y:ey-dy*0.10,p3x:ex,p3y:ey});}}}
function rsz(){var r=C.getBoundingClientRect();C.width=r.width*dpr;C.height=r.height*dpr;X.setTransform(dpr,0,0,dpr,0,0);W=r.width;H=r.height;bC();}
rsz();window.addEventListener('resize',rsz);
function Pt(li){this.a0(true,li);}
Pt.prototype.a0=function(init,li){this.si=Math.floor(Math.random()*3);this.oi=Math.floor(Math.random()*12);this.ci=this.si*12+this.oi;this.v=Math.random();this.col=cF(this.si,this.v);this.bA=0.30+Math.random()*0.50;this.sz=0.6+Math.random()*1.8;this.yO=(Math.random()-0.5)*22;this.wo=Math.random()*Math.PI*2;this.sp=0.50+Math.random()*0.80;this.fS=0.0014+Math.random()*0.0022;this.rY=(Math.random()-0.5)*5;this.ph=0;this.fT=0;this.y=sY(this.si);this.a=0;if(init&&typeof li==='number'&&li<20){this.x=-(li*8+Math.random()*30);this.sp=0.9+Math.random()*0.5;this.fS=0.003+Math.random()*0.002;}else if(init){this.x=-(Math.random()*W*0.12+5);}else{this.x=-(5+Math.random()*W*0.14);}};
Pt.prototype.rs=function(){this.a0(false);};
Pt.prototype.up=function(t){var sx=W*SX,fx=W*FE,px=W*PX;var w=Math.sin(t*0.002+this.wo)*2.5;if(this.ph===0){this.x+=this.sp;this.y=sY(this.si)+this.yO+w;this.a=this.bA*clamp(this.x/(W*0.05),0,1);if(this.x>=sx){this.ph=1;this.fT=0;}}else if(this.ph===1){this.fT+=this.fS;if(this.fT>=1.0){this.ph=2;this.x=fx;return;}var c=cv[this.ci];if(!c){this.rs();return;}var p=bz(c.p0x,c.p0y,c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y,this.fT);var lf=1-this.fT*0.7;this.x=p.x;this.y=p.y+this.yO*lf*0.3+w*lf;this.a=this.bA*0.85;}else if(this.ph===2){this.x+=this.sp;this.y=oY(this.oi)+this.rY+w*0.3;var nP=clamp((this.x-(px-W*0.05))/(W*0.05),0,1);this.a=this.bA*(1+nP*0.25);if(this.x>=px){if(!pR)pR=true;this.rs();}}};
var pts=[];for(var i=0;i<NP;i++)pts.push(new Pt(i));
var ws=[];for(var i=0;i<NO;i++){var si=i<4?0:i<8?1:2;ws.push({si:si,g:i,pool:WP[si].slice(),pi:0,ins:[],cd:80+i*60});}
var twC={};function tw(t){if(!twC[t]){X.font='700 13px "Inter Tight",sans-serif';twC[t]=X.measureText(t).width;}return twC[t];}
function nw(s){var w=s.pool[s.pi%s.pool.length];s.pi++;return w;}
var time=0,cV=false;
var cO=new IntersectionObserver(function(e){e.forEach(function(en){cV=en.isIntersecting;});},{threshold:0.05});
cO.observe(C);
function dFG(){for(var i=0;i<cv.length;i++){var c=cv[i],s=SC[c.si];X.strokeStyle='rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.05)';X.lineWidth=0.5;X.beginPath();X.moveTo(c.p0x,c.p0y);X.bezierCurveTo(c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y);X.stroke();}}
function dSG(){for(var si=0;si<3;si++){var sy=sY(si),s=SC[si];var g=X.createLinearGradient(0,sy-26,0,sy+26);g.addColorStop(0,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');g.addColorStop(0.5,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.04)');g.addColorStop(1,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');X.fillStyle=g;X.fillRect(0,sy-26,W*SX+10,52);}}
function dP(){var px=W*PX;var g=X.createLinearGradient(px-18,0,px+18,0);g.addColorStop(0,'rgba(30,80,140,0)');g.addColorStop(0.3,'rgba(30,80,140,0.035)');g.addColorStop(0.5,'rgba(30,80,140,0.10)');g.addColorStop(0.7,'rgba(30,80,140,0.035)');g.addColorStop(1,'rgba(30,80,140,0)');X.fillStyle=g;X.fillRect(px-18,0,36,H);var pu=0.15+Math.sin(time*0.003)*0.07;X.strokeStyle='rgba(30,80,150,'+pu+')';X.lineWidth=1.5;X.beginPath();X.moveTo(px,H*0.01);X.lineTo(px,H*0.99);X.stroke();X.strokeStyle='rgba(0,140,200,'+(pu*0.2)+')';X.lineWidth=0.5;[-4,4].forEach(function(o){X.beginPath();X.moveTo(px+o,H*0.01);X.lineTo(px+o,H*0.99);X.stroke();});for(var i=0;i<12;i++){var ny=oY(i),np=0.18+Math.sin(time*0.004+i*0.5)*0.07;X.beginPath();X.arc(px,ny,2,0,Math.PI*2);X.fillStyle='rgba(30,80,150,'+(np+0.18)+')';X.fill();}}
function dL(){X.font='500 10px "DM Mono",monospace';X.textAlign='left';for(var si=0;si<3;si++){var yC=sY(si),s=SC[si];X.fillStyle='rgba('+s.txt[0]+','+s.txt[1]+','+s.txt[2]+',0.58)';X.fillText(LABELS[si].toUpperCase(),10,yC-18);}}
function dG(){if(!pR)return;var px=W*PX;X.strokeStyle='rgba(30,80,140,0.025)';X.lineWidth=0.5;for(var i=0;i<12;i++){var y=oY(i);X.beginPath();X.moveTo(px+12,y);X.lineTo(W,y);X.stroke();}}
function dEW(){
  if(!pR)return;var px=W*PX,MG=40;X.textAlign='left';X.font='700 13px "Inter Tight",sans-serif';
  for(var s=0;s<ws.length;s++){var sl=ws[s];
    for(var i=sl.ins.length-1;i>=0;i--){var w=sl.ins[i];w.x+=w.sp;w.a=Math.min(w.a+0.006,0.92);var fe=W*0.90,fo=w.x>fe?Math.max(0,1-(w.x-fe)/(W*0.10)):1;if(w.x>W+30){sl.ins.splice(i,1);continue;}var ty=oY(sl.g),sc=SC[sl.si];X.fillStyle='rgba('+sc.txt[0]+','+sc.txt[1]+','+sc.txt[2]+','+(w.a*fo)+')';X.fillText(w.txt,w.x,ty+5);}
    sl.cd--;if(sl.cd<=0&&sl.ins.length<2){var ok=true;if(sl.ins.length>0){var la=sl.ins[sl.ins.length-1];if(la.x+tw(la.txt)+MG>px+24)ok=false;}
    if(ok){var mx=Infinity;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].sp<mx)mx=sl.ins[j].sp;}var sp=sl.ins.length===0?0.20+Math.random()*0.15:Math.min(0.18+Math.random()*0.10,mx*0.95);var txt=nw(sl);var uq=true;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].txt===txt)uq=false;}if(uq){sl.ins.push({x:px+24,a:0,sp:sp,txt:txt});sl.cd=350+Math.random()*400;}else{sl.cd=20;}}else{sl.cd=30;}}
  }
}
function frame(){time++;if(!cV){requestAnimationFrame(frame);return;}X.clearRect(0,0,W,H);dSG();dFG();dG();dP();dL();for(var i=0;i<pts.length;i++)pts[i].up(time);for(var i=0;i<pts.length;i++){var p=pts[i];if(p.a<0.01)continue;X.beginPath();X.arc(p.x,p.y,p.sz,0,Math.PI*2);X.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+clamp(p.a,0,1)+')';X.fill();}dEW();requestAnimationFrame(frame);}
frame();
}());`

export default function Section1() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const waitForGsap = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        clearInterval(waitForGsap)
        try {
          // eslint-disable-next-line no-new-func
          new Function(sectionScript)()
        } catch(e) {
          console.error('Section1 GSAP error:', e)
        }
      }
    }, 80)

    const safety = setTimeout(() => {
      clearInterval(waitForGsap)
      try { new Function(sectionScript)() } catch(e) { /* silent */ }
    }, 4000)

    return () => { clearInterval(waitForGsap); clearTimeout(safety); }
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
