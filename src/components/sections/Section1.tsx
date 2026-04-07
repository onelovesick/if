"use client"
import { useEffect, useRef } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&family=Inter+Tight:wght@600;700;800;900&display=swap');
@media(prefers-reduced-motion:reduce){.ifs *,.ifs *::before,.ifs *::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}

.ifs{--accent:#47B5FF;--navy:#0B3C5D;--bg:#F4F7FA;--muted:#5a7a96;--mono:'DM Mono',monospace;position:relative;background:var(--bg);overflow:hidden;font-family:'Inter',sans-serif;}
.ifs-bg{position:absolute;inset:0;z-index:0;pointer-events:none;}
.ifs-bg canvas{width:100%;height:100%;display:block;}
.ifs::after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background-image:radial-gradient(circle,rgba(11,60,93,0.035) 1px,transparent 1px);background-size:36px 36px;mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,black 5%,transparent 50%);-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,black 5%,transparent 50%);}
.ifs::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;z-index:5;background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.06) 30%,rgba(11,60,93,0.06) 70%,transparent 92%);}

.ifs-wrap{position:relative;z-index:3;max-width:1440px;margin:0 auto;padding:clamp(56px,6vw,100px) clamp(24px,5%,96px);}
.ifs-grid{display:grid;grid-template-columns:42fr 58fr;gap:clamp(28px,3.5vw,56px);align-items:center;}

/* LEFT */
.ifs-copy{display:flex;flex-direction:column;gap:clamp(18px,2vw,28px);}
.ifs-eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:0.28em;text-transform:uppercase;color:var(--accent);opacity:0;}
.ifs-eyebrow::before{content:'';width:0;height:1.5px;background:var(--accent);}
.ifs-headline{font-family:'Outfit',sans-serif;font-size:clamp(26px,2.8vw,44px);font-weight:800;line-height:1.08;letter-spacing:-0.02em;text-transform:uppercase;color:var(--navy);opacity:0;}
.ifs-hl-accent{color:var(--accent);}
.ifs-body{font-size:clamp(14px,1.05vw,17px);color:var(--muted);line-height:1.78;max-width:480px;opacity:0;}
.ifs-body strong{color:var(--navy);font-weight:600;}
.ifs-example-label{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:rgba(11,60,93,0.28);margin-top:4px;opacity:0;}
.ifs-tags{display:flex;flex-wrap:wrap;gap:8px;opacity:0;}
.ifs-tag{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:4px;background:rgba(255,255,255,0.55);border:1px solid rgba(11,60,93,0.05);font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:var(--navy);opacity:0.50;transition:border-color 0.3s,box-shadow 0.3s;}
.ifs-tag:hover{border-color:rgba(71,181,255,0.18);box-shadow:0 2px 10px rgba(11,60,93,0.04);}
.ifs-tag-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.ifs-cta{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#fff;background:var(--navy);border-radius:3px;padding:15px 28px;text-decoration:none;border:none;cursor:pointer;opacity:0;transition:background 0.25s,box-shadow 0.3s,transform 0.3s;}
.ifs-cta:hover{background:#0d4d78;box-shadow:0 8px 28px rgba(11,60,93,0.2);transform:translateY(-2px);}
.ifs-cta-arr{transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1);}
.ifs-cta:hover .ifs-cta-arr{transform:translateX(5px);}

/* RIGHT CARD */
.ifs-card{background:#fff;border:1px solid rgba(11,60,93,0.06);border-radius:12px;padding:clamp(16px,1.6vw,22px) clamp(14px,1.4vw,20px) clamp(14px,1.2vw,18px);box-shadow:0 1px 3px rgba(11,60,93,0.04),0 4px 14px rgba(11,60,93,0.04),0 14px 40px rgba(11,60,93,0.05),0 28px 72px rgba(11,60,93,0.03);opacity:0;}
.ifs-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:clamp(8px,0.8vw,12px);padding-bottom:clamp(8px,0.7vw,10px);border-bottom:1px solid rgba(11,60,93,0.05);}
.ifs-card-label{font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:rgba(11,60,93,0.30);}
.ifs-card-dots{display:flex;gap:5px;}
.ifs-card-dot{width:6px;height:6px;border-radius:50%;}
.ifs-card canvas{display:block;width:100%;height:clamp(320px,38vh,460px);border-radius:6px;}
.ifs-card-bottom{display:flex;gap:clamp(14px,1.6vw,24px);justify-content:center;padding-top:clamp(8px,0.7vw,10px);margin-top:clamp(8px,0.7vw,10px);border-top:1px solid rgba(11,60,93,0.04);opacity:0;}
.ifs-leg{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--navy);opacity:0.40;}
.ifs-ldot{width:7px;height:7px;border-radius:50%;}

.ifs-rule{position:absolute;bottom:0;left:0;right:0;height:1px;z-index:5;background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.06) 30%,rgba(11,60,93,0.06) 70%,transparent 92%);}

@media(max-width:960px){.ifs-grid{grid-template-columns:1fr;}.ifs-card{max-width:680px;}}
@media(min-width:1800px){.ifs-wrap{max-width:1560px;padding:100px 110px;}.ifs-headline{font-size:50px;}.ifs-grid{gap:72px;}}
@media(min-width:2400px){.ifs-wrap{max-width:1700px;}.ifs-headline{font-size:58px;}}
</style>

<section class="ifs" id="ifsSection">
  <div class="ifs-bg"><canvas id="ifsBg"></canvas></div>
  <div class="ifs-rule"></div>
  <div class="ifs-wrap">
    <div class="ifs-grid">
      <div class="ifs-copy">
        <div class="ifs-eyebrow" id="ifsEye"><span></span>The Infraforma Approach</div>
        <h2 class="ifs-headline" id="ifsHL">Fragmented data in.<br><span class="ifs-hl-accent">Actionable intelligence</span> out.</h2>
        <p class="ifs-body" id="ifsBody">Every infrastructure project generates data across dozens of contributors, disciplines, and platforms. Most of it stays siloed. We structure that fragmented information into a single convergent flow &mdash; so your teams stop reconciling and start deciding.</p>
        <div class="ifs-example-label" id="ifsExLabel">Example: cross-discipline convergence</div>
        <div class="ifs-tags" id="ifsTags">
          <div class="ifs-tag"><div class="ifs-tag-dot" style="background:rgba(22,50,135,0.55)"></div>Cost &amp; Estimating</div>
          <div class="ifs-tag"><div class="ifs-tag-dot" style="background:rgba(25,155,105,0.55)"></div>Scheduling &amp; Planning</div>
          <div class="ifs-tag"><div class="ifs-tag-dot" style="background:rgba(0,160,215,0.55)"></div>Risk Management</div>
        </div>
        <a href="/solutions/" class="ifs-cta" id="ifsCta">Explore Our Solutions <span class="ifs-cta-arr">&rarr;</span></a>
      </div>
      <div class="ifs-card" id="ifsCard">
        <div class="ifs-card-top">
          <div class="ifs-card-label">Live data convergence</div>
          <div class="ifs-card-dots">
            <div class="ifs-card-dot" style="background:rgba(22,50,135,0.4)"></div>
            <div class="ifs-card-dot" style="background:rgba(25,155,105,0.4)"></div>
            <div class="ifs-card-dot" style="background:rgba(0,160,215,0.4)"></div>
          </div>
        </div>
        <canvas id="ifsCanvas"></canvas>
        <div class="ifs-card-bottom" id="ifsLeg">
          <div class="ifs-leg"><div class="ifs-ldot" style="background:rgba(22,50,135,0.55)"></div>Cost</div>
          <div class="ifs-leg"><div class="ifs-ldot" style="background:rgba(25,155,105,0.55)"></div>Schedule</div>
          <div class="ifs-leg"><div class="ifs-ldot" style="background:rgba(0,160,215,0.55)"></div>Risk</div>
        </div>
      </div>
    </div>
  </div>
</section>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"><\/script>`

const sectionScript = `(function(){
if(typeof gsap==='undefined')return;
gsap.registerPlugin(ScrollTrigger);
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var scene=document.getElementById('ifsSection');if(!scene)return;

/* ═══ ABSTRACT BG ═══ */
var bgC=document.getElementById('ifsBg');
if(bgC){
  var bX=bgC.getContext('2d'),bD=Math.min(devicePixelRatio||1,2),bW,bH;
  function bR(){var r=bgC.getBoundingClientRect();bgC.width=r.width*bD;bgC.height=r.height*bD;bX.setTransform(bD,0,0,bD,0,0);bW=r.width;bH=r.height;}
  bR();window.addEventListener('resize',bR);
  var nd=[];for(var i=0;i<50;i++)nd.push({x:Math.random()*1.2-0.1,y:Math.random()*1.2-0.1,vx:(Math.random()-0.5)*0.00006,vy:(Math.random()-0.5)*0.00006,r:0.7+Math.random()*1});
  var bt=0;
  function bF(){bt++;bX.clearRect(0,0,bW,bH);for(var i=0;i<nd.length;i++){var n=nd[i];n.x+=n.vx+Math.sin(bt*0.0008+i)*0.00002;n.y+=n.vy+Math.cos(bt*0.001+i*0.7)*0.00002;if(n.x<-0.1)n.x=1.1;if(n.x>1.1)n.x=-0.1;if(n.y<-0.1)n.y=1.1;if(n.y>1.1)n.y=-0.1;}for(var i=0;i<nd.length;i++){for(var j=i+1;j<nd.length;j++){var dx=(nd[i].x-nd[j].x)*bW,dy=(nd[i].y-nd[j].y)*bH,d=Math.sqrt(dx*dx+dy*dy);if(d<150){bX.strokeStyle='rgba(11,60,93,'+(0.018*(1-d/150))+')';bX.lineWidth=0.5;bX.beginPath();bX.moveTo(nd[i].x*bW,nd[i].y*bH);bX.lineTo(nd[j].x*bW,nd[j].y*bH);bX.stroke();}}}for(var i=0;i<nd.length;i++){bX.beginPath();bX.arc(nd[i].x*bW,nd[i].y*bH,nd[i].r,0,Math.PI*2);bX.fillStyle='rgba(11,60,93,0.025)';bX.fill();}requestAnimationFrame(bF);}
  bF();
}

/* ═══ GSAP ═══ */
if(!reduced){
  gsap.set('#ifsEye',{opacity:0,x:-20});gsap.set('#ifsHL',{opacity:0,y:20});gsap.set('#ifsBody',{opacity:0,y:18});gsap.set('#ifsExLabel',{opacity:0,y:10});gsap.set('#ifsTags',{opacity:0,y:14});gsap.set('#ifsCta',{opacity:0,y:14});gsap.set('#ifsCard',{opacity:0,y:28,scale:0.98});gsap.set('#ifsLeg',{opacity:0});
  var tl=gsap.timeline({scrollTrigger:{trigger:scene,start:'top 72%',toggleActions:'play none none none'}});
  tl.to('#ifsEye',{opacity:1,x:0,duration:0.6,ease:'power3.out'},0)
    .to('#ifsHL',{opacity:1,y:0,duration:0.8,ease:'power4.out'},0.08)
    .to('#ifsBody',{opacity:1,y:0,duration:0.7,ease:'power3.out'},0.25)
    .to('#ifsExLabel',{opacity:1,y:0,duration:0.5,ease:'power3.out'},0.38)
    .to('#ifsTags',{opacity:1,y:0,duration:0.6,ease:'power3.out'},0.44)
    .to('#ifsCta',{opacity:1,y:0,duration:0.6,ease:'power3.out'},0.56)
    .to('#ifsCard',{opacity:1,y:0,scale:1,duration:1.0,ease:'power3.out'},0.15)
    .to('#ifsLeg',{opacity:1,duration:0.6,ease:'power2.out'},0.75);
}else{gsap.set(['#ifsEye','#ifsHL','#ifsBody','#ifsExLabel','#ifsTags','#ifsCta','#ifsCard','#ifsLeg'],{opacity:1,y:0,x:0,scale:1});}

/* ═══ PARTICLE CANVAS ═══ */
var C=document.getElementById('ifsCanvas');if(!C)return;
var X=C.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),W,H;
var SC=[{b:[14,32,105],r:[30,62,160],txt:[10,36,112]},{b:[16,118,78],r:[30,175,115],txt:[6,92,60]},{b:[0,138,195],r:[0,195,245],txt:[0,98,148]}];
var LABELS=['Cost & estimating','Scheduling & planning','Risk management'];
var RW=[
  ['Budget confidence','Forecast precision','Cash flow clarity'],
  ['Estimate accuracy','Quantity assurance','Bid optimization'],
  ['Cost transparency','Procurement insight','Value engineering'],
  ['Variance control','Change order control','Cost benchmarking'],
  ['Milestone clarity','Sequence alignment','Look-ahead planning'],
  ['Resource optimization','Float management','Earned value analysis'],
  ['Critical path insight','Baseline integrity','Schedule compression'],
  ['Delivery predictability','Progress tracking','Delay mitigation'],
  ['Threat visibility','Probability assessment','Early warning systems'],
  ['Mitigation planning','Response strategy','Scenario modeling'],
  ['Exposure reduction','Residual risk tracking','Tolerance mapping'],
  ['Contingency precision','Impact analysis','Risk register depth']
];
var SX=0.15,FE=0.44,PX=0.58,NP=2200,NO=12;var pR=false;
function lerp(a,b,t){return a+(b-a)*t;}function clamp(v,l,h){return v<l?l:v>h?h:v;}
function sY(si){return H*(0.13+si*0.37);}function oY(i){return H*(0.04+i*(0.92/11));}
function cF(si,v){var s=SC[si];return[Math.round(lerp(s.b[0],s.r[0],v)),Math.round(lerp(s.b[1],s.r[1],v)),Math.round(lerp(s.b[2],s.r[2],v))];}
function bz(a,b,c,d,e,f,g,h,t){var u=1-t,uu=u*u,uuu=uu*u,tt=t*t,ttt=tt*t;return{x:uuu*a+3*uu*t*c+3*u*tt*e+ttt*g,y:uuu*b+3*uu*t*d+3*u*tt*f+ttt*h};}
var cv=[];
function bC(){cv=[];var sx=W*SX,ex=W*FE;for(var si=0;si<3;si++){var sy=sY(si);for(var oi=0;oi<12;oi++){var ey=oY(oi),dy=ey-sy;cv.push({si:si,oi:oi,p0x:sx,p0y:sy,p1x:sx+(ex-sx)*0.28,p1y:sy+dy*0.05,p2x:sx+(ex-sx)*0.72,p2y:ey-dy*0.08,p3x:ex,p3y:ey});}}}
function rsz(){var r=C.getBoundingClientRect();C.width=r.width*dpr;C.height=r.height*dpr;X.setTransform(dpr,0,0,dpr,0,0);W=r.width;H=r.height;bC();}
rsz();window.addEventListener('resize',rsz);

/*
  CONSTANT FLOW FIX:
  Each particle gets a random respawn delay (spawnDelay) so they don't all
  enter at once. On reset, a new random delay is assigned. The particle
  only starts moving once its delay has counted down. This staggers
  respawns evenly over time = no bunching, no gaps.
*/
function Pt(idx,total){
  this.sp=0;this.fS=0;this.ph=0;
  /* Stagger initial spawn across the full travel time so the pipeline is pre-filled */
  this.spawnDelay=Math.floor((idx/total)*280);
  this.waiting=true;
  this.preInit();
}
Pt.prototype.preInit=function(){
  this.si=Math.floor(Math.random()*3);this.oi=Math.floor(Math.random()*12);
  this.ci=this.si*12+this.oi;this.v=Math.random();this.col=cF(this.si,this.v);
  this.bA=0.28+Math.random()*0.50;this.sz=0.5+Math.random()*1.8;
  this.yO=(Math.random()-0.5)*22;this.wo=Math.random()*Math.PI*2;
  this.sp=0.8+Math.random()*1.2;this.fS=0.003+Math.random()*0.004;
  this.rY=(Math.random()-0.5)*4;this.ph=0;this.fT=0;
  this.x=-(2+Math.random()*W*0.06);
  this.y=sY(this.si);this.a=0;
};
Pt.prototype.rs=function(){
  this.preInit();
  /* Random respawn delay: 5-40 frames so particles trickle in steadily */
  this.spawnDelay=5+Math.floor(Math.random()*35);
  this.waiting=true;
};
Pt.prototype.up=function(t){
  if(this.waiting){this.spawnDelay--;if(this.spawnDelay>0)return;this.waiting=false;}
  var sx=W*SX,fx=W*FE,px=W*PX;var w=Math.sin(t*0.002+this.wo)*2;
  if(this.ph===0){this.x+=this.sp;this.y=sY(this.si)+this.yO+w;this.a=this.bA*clamp(this.x/(W*0.04),0,1);if(this.x>=sx){this.ph=1;this.fT=0;}}
  else if(this.ph===1){this.fT+=this.fS;if(this.fT>=1){this.ph=2;this.x=fx;return;}var c=cv[this.ci];if(!c){this.rs();return;}var p=bz(c.p0x,c.p0y,c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y,this.fT);var lf=1-this.fT*0.7;this.x=p.x;this.y=p.y+this.yO*lf*0.3+w*lf;this.a=this.bA*0.85;}
  else if(this.ph===2){this.x+=this.sp;this.y=oY(this.oi)+this.rY+w*0.3;var nP=clamp((this.x-(px-W*0.03))/(W*0.03),0,1);this.a=this.bA*(1+nP*0.2);if(this.x>=px){if(!pR)pR=true;this.rs();}}
};

var pts=[];for(var i=0;i<NP;i++)pts.push(new Pt(i,NP));
var ws=[];for(var i=0;i<NO;i++){var si=i<4?0:i<8?1:2;ws.push({si:si,g:i,words:RW[i],wi:0,ins:[],cd:50+i*35});}
var twC={};function tw(t){if(!twC[t]){X.font='700 12px "Inter Tight",sans-serif';twC[t]=X.measureText(t).width;}return twC[t];}
var time=0,cV=false;
var cO=new IntersectionObserver(function(e){e.forEach(function(en){cV=en.isIntersecting;});},{threshold:0.05});cO.observe(C);

function dFG(){for(var i=0;i<cv.length;i++){var c=cv[i],s=SC[c.si];X.strokeStyle='rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.04)';X.lineWidth=0.5;X.beginPath();X.moveTo(c.p0x,c.p0y);X.bezierCurveTo(c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y);X.stroke();}}
function dSG(){for(var si=0;si<3;si++){var sy=sY(si),s=SC[si];var g=X.createLinearGradient(0,sy-24,0,sy+24);g.addColorStop(0,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');g.addColorStop(0.5,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.035)');g.addColorStop(1,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');X.fillStyle=g;X.fillRect(0,sy-24,W*SX+8,48);}}
function dP(){var px=W*PX;var g=X.createLinearGradient(px-14,0,px+14,0);g.addColorStop(0,'rgba(30,80,140,0)');g.addColorStop(0.3,'rgba(30,80,140,0.025)');g.addColorStop(0.5,'rgba(30,80,140,0.08)');g.addColorStop(0.7,'rgba(30,80,140,0.025)');g.addColorStop(1,'rgba(30,80,140,0)');X.fillStyle=g;X.fillRect(px-14,0,28,H);var pu=0.12+Math.sin(time*0.003)*0.05;X.strokeStyle='rgba(30,80,150,'+pu+')';X.lineWidth=1.2;X.beginPath();X.moveTo(px,H*0.02);X.lineTo(px,H*0.98);X.stroke();X.strokeStyle='rgba(0,140,200,'+(pu*0.15)+')';X.lineWidth=0.5;[-3,3].forEach(function(o){X.beginPath();X.moveTo(px+o,H*0.02);X.lineTo(px+o,H*0.98);X.stroke();});for(var i=0;i<12;i++){var ny=oY(i),np=0.14+Math.sin(time*0.004+i*0.5)*0.05;X.beginPath();X.arc(px,ny,1.8,0,Math.PI*2);X.fillStyle='rgba(30,80,150,'+(np+0.14)+')';X.fill();}}
function dL(){X.font='500 9px "DM Mono",monospace';X.textAlign='left';for(var si=0;si<3;si++){var yC=sY(si),s=SC[si];X.fillStyle='rgba('+s.txt[0]+','+s.txt[1]+','+s.txt[2]+',0.50)';X.fillText(LABELS[si].toUpperCase(),8,yC-16);}}
function dG(){if(!pR)return;var px=W*PX;X.strokeStyle='rgba(30,80,140,0.018)';X.lineWidth=0.5;for(var i=0;i<12;i++){var y=oY(i);X.beginPath();X.moveTo(px+10,y);X.lineTo(W,y);X.stroke();}}
function dEW(){if(!pR)return;var px=W*PX,MG=36;X.textAlign='left';X.font='700 12px "Inter Tight",sans-serif';for(var s=0;s<ws.length;s++){var sl=ws[s];for(var i=sl.ins.length-1;i>=0;i--){var w=sl.ins[i];w.x+=w.sp;w.a=Math.min(w.a+0.008,0.88);var fe=W*0.92,fo=w.x>fe?Math.max(0,1-(w.x-fe)/(W*0.08)):1;if(w.x>W+20){sl.ins.splice(i,1);continue;}var ty=oY(sl.g),sc=SC[sl.si];X.fillStyle='rgba('+sc.txt[0]+','+sc.txt[1]+','+sc.txt[2]+','+(w.a*fo)+')';X.fillText(w.txt,w.x,ty+4);}sl.cd--;if(sl.cd<=0&&sl.ins.length<2){var ok=true;if(sl.ins.length>0){var la=sl.ins[sl.ins.length-1];if(la.x+tw(la.txt)+MG>px+20)ok=false;}if(ok){var mx=Infinity;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].sp<mx)mx=sl.ins[j].sp;}var sp=sl.ins.length===0?0.18+Math.random()*0.14:Math.min(0.16+Math.random()*0.10,mx*0.92);var txt=sl.words[sl.wi%sl.words.length];sl.wi++;var uq=true;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].txt===txt)uq=false;}if(uq){sl.ins.push({x:px+20,a:0,sp:sp,txt:txt});sl.cd=320+Math.random()*380;}else{sl.cd=12;}}else{sl.cd=20;}}}}

function frame(){time++;if(!cV){requestAnimationFrame(frame);return;}X.clearRect(0,0,W,H);dSG();dFG();dG();dP();dL();for(var i=0;i<pts.length;i++)pts[i].up(time);for(var i=0;i<pts.length;i++){var p=pts[i];if(p.a<0.01||p.waiting)continue;X.beginPath();X.arc(p.x,p.y,p.sz,0,Math.PI*2);X.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+clamp(p.a,0,1)+')';X.fill();}dEW();requestAnimationFrame(frame);}
frame();
}());`

export default function Section1() {
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const wait = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        clearInterval(wait)
        try { new Function(sectionScript)() } catch(e) { console.error('S1:', e) }
      }
    }, 80)
    const safety = setTimeout(() => { clearInterval(wait); try { new Function(sectionScript)() } catch(e) {} }, 4000)
    return () => { clearInterval(wait); clearTimeout(safety) }
  }, [])
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
}
