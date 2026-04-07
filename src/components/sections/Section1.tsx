"use client"
import { useEffect, useRef } from 'react'

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&family=Inter+Tight:wght@600;700;800&display=swap');

@media (prefers-reduced-motion: reduce) {
  .ifs *, .ifs *::before, .ifs *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; }
}

/* ═══ SECTION ═══ */
.ifs {
  --accent:#47B5FF; --navy:#0B3C5D; --bg:#F4F7FA; --muted:#4a6a82; --mono:'DM Mono',monospace;
  position:relative; min-height:100vh; background:var(--bg);
  overflow:hidden; font-family:'Inter',sans-serif;
}

/* ═══ ABSTRACT BACKGROUND ═══ */
.ifs-bg-canvas { position:absolute; inset:0; z-index:0; pointer-events:none; }
.ifs-bg-canvas canvas { width:100%; height:100%; display:block; }

/* dot grid overlay */
.ifs::after {
  content:''; position:absolute; inset:0; z-index:1; pointer-events:none;
  background-image:radial-gradient(circle,rgba(11,60,93,0.04) 1px,transparent 1px);
  background-size:36px 36px;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 5%,transparent 55%);
  -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 5%,transparent 55%);
}

/* top/bottom edge lines */
.ifs::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px; z-index:5;
  background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.06) 30%,rgba(11,60,93,0.06) 70%,transparent 92%);
}
.ifs-edge-b { position:absolute; bottom:0; left:0; right:0; height:1px; z-index:5;
  background:linear-gradient(90deg,transparent 8%,rgba(11,60,93,0.06) 30%,rgba(11,60,93,0.06) 70%,transparent 92%); }

/* ═══ CONTENT WRAPPER ═══ */
.ifs-wrap { position:relative; z-index:3; display:flex; flex-direction:column; min-height:100vh; }

/* ═══ HEADER — single row, left-aligned ═══ */
.ifs-header {
  padding:clamp(44px,5vw,80px) clamp(28px,5%,80px) 0;
  display:flex; gap:clamp(40px,5vw,80px); align-items:flex-start; justify-content:space-between;
}
.ifs-left { max-width:580px; display:flex; flex-direction:column; gap:clamp(14px,1.6vw,22px); }
.ifs-eyebrow {
  font-family:var(--mono); font-size:11px; font-weight:500;
  letter-spacing:0.28em; text-transform:uppercase; color:var(--accent);
  display:flex; align-items:center; gap:14px; opacity:0;
}
.ifs-eyebrow-line { display:inline-block; width:0; height:1.5px; background:var(--accent); }

.ifs-h-mask { overflow:hidden; line-height:1.06; }
.ifs-h-line { display:block; font-family:'Outfit',sans-serif; font-weight:700; text-transform:uppercase; color:var(--navy); letter-spacing:-0.02em; }
.ifs-h-sm { font-size:clamp(18px,1.8vw,30px); color:var(--muted); font-weight:600; }
.ifs-h-lg { font-size:clamp(40px,4.8vw,80px); font-weight:800; color:var(--accent); line-height:0.94; }
.ifs-h-rule { display:block; width:0; height:3px; margin-top:4px; background:linear-gradient(90deg,var(--accent),rgba(71,181,255,0.1)); border-radius:2px; }
.ifs-h-md { font-size:clamp(24px,2.8vw,48px); }

.ifs-sub { font-size:clamp(14px,1vw,16px); color:var(--muted); line-height:1.75; max-width:440px; opacity:0; }
.ifs-cta {
  display:inline-flex; align-items:center; gap:10px; align-self:flex-start;
  font-family:var(--mono); font-size:11px; font-weight:500;
  letter-spacing:0.12em; text-transform:uppercase;
  color:#fff; background:var(--navy); border-radius:2px; padding:15px 28px;
  text-decoration:none; border:none; cursor:pointer; opacity:0;
  transition:background 0.25s,box-shadow 0.3s,transform 0.3s;
}
.ifs-cta:hover { background:#0d4d78; box-shadow:0 8px 28px rgba(11,60,93,0.2); transform:translateY(-2px); }
.ifs-cta-arr { transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.ifs-cta:hover .ifs-cta-arr { transform:translateX(5px); }

/* ── Right descriptor ── */
.ifs-right {
  max-width:360px; padding-top:clamp(8px,1vw,16px);
  display:flex; flex-direction:column; gap:6px; opacity:0;
}
.ifs-right-ey { font-family:var(--mono); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(11,60,93,0.32); }
.ifs-right-t { font-family:'Outfit',sans-serif; font-size:clamp(14px,1.1vw,18px); font-weight:700; color:var(--navy); letter-spacing:0.01em; line-height:1.3; }
.ifs-right-s { font-size:clamp(12px,0.85vw,14px); color:var(--muted); line-height:1.6; }

/* ═══ PARTICLE CANVAS ═══ */
.ifs-stream { flex:1; position:relative; z-index:3; margin:clamp(12px,1.5vw,24px) clamp(12px,2vw,28px) 0; clip-path:inset(0 100% 0 0); }
.ifs-stream canvas { display:block; width:100%; height:clamp(340px,42vh,480px); border-radius:6px; }

/* ═══ BOTTOM ═══ */
.ifs-bottom { position:relative; z-index:4; }
.ifs-legend { display:flex; gap:clamp(20px,2.5vw,32px); justify-content:center; padding:clamp(10px,1.2vw,16px) 32px clamp(4px,0.6vw,8px); opacity:0; }
.ifs-leg { display:flex; align-items:center; gap:7px; font-family:var(--mono); font-size:10px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:var(--navy); opacity:0.5; }
.ifs-dot { width:8px; height:8px; border-radius:50%; }
.ifs-foot { text-align:center; padding:2px 32px clamp(24px,3vw,40px); font-family:var(--mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(11,60,93,0.18); opacity:0; }

@media (max-width:900px) { .ifs-header{flex-direction:column;} .ifs-right{max-width:100%;} }
@media (max-width:480px) { .ifs-legend{flex-direction:column;align-items:center;gap:6px;} }
@media (min-width:1800px) { .ifs-header{padding:90px 110px 0;} .ifs-right-t{font-size:20px;} }
</style>

<section class="ifs" id="ifsSection">
  <div class="ifs-bg-canvas"><canvas id="ifsBg"></canvas></div>
  <div class="ifs-edge-b"></div>

  <div class="ifs-wrap">
    <div class="ifs-header">
      <div class="ifs-left">
        <div class="ifs-eyebrow" id="ifsEyebrow"><span class="ifs-eyebrow-line" id="ifsEyeLine"></span>What We Do</div>
        <h2>
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
        <p class="ifs-right-s">Three project disciplines converge through our methodology &mdash; delivering clarity where complexity lives.</p>
      </div>
    </div>

    <div class="ifs-stream" id="ifsStream"><canvas id="ifsCanvas"></canvas></div>

    <div class="ifs-bottom">
      <div class="ifs-legend" id="ifsLegend">
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(22,50,135,0.7)"></div>Cost &amp; Estimating</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(25,155,105,0.7)"></div>Scheduling &amp; Planning</div>
        <div class="ifs-leg"><div class="ifs-dot" style="background:rgba(0,160,215,0.7)"></div>Risk Management</div>
      </div>
      <div class="ifs-foot" id="ifsFoot">&darr; Infraforma intelligence methodology</div>
    </div>
  </div>
</section>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"><\/script>`

const sectionScript = `(function(){
if(typeof gsap==='undefined')return;
gsap.registerPlugin(ScrollTrigger);
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var scene=document.getElementById('ifsSection');
if(!scene)return;

/* ═══════════════════════════
   ABSTRACT BACKGROUND MESH
   ═══════════════════════════ */
var bgC=document.getElementById('ifsBg');
if(bgC){
  var bX=bgC.getContext('2d');
  var bDpr=Math.min(devicePixelRatio||1,2);
  var bW,bH;
  function bgResize(){
    var r=bgC.getBoundingClientRect();
    bgC.width=r.width*bDpr;bgC.height=r.height*bDpr;
    bX.setTransform(bDpr,0,0,bDpr,0,0);bW=r.width;bH=r.height;
  }
  bgResize();window.addEventListener('resize',bgResize);

  var nodes=[];
  for(var i=0;i<60;i++){
    nodes.push({
      x:Math.random()*1.2-0.1,
      y:Math.random()*1.2-0.1,
      vx:(Math.random()-0.5)*0.00008,
      vy:(Math.random()-0.5)*0.00008,
      r:1+Math.random()*1.5
    });
  }
  var bTime=0;
  function bgFrame(){
    bTime++;
    bX.clearRect(0,0,bW,bH);
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      n.x+=n.vx+Math.sin(bTime*0.001+i)*0.00003;
      n.y+=n.vy+Math.cos(bTime*0.0012+i*0.7)*0.00003;
      if(n.x<-0.1)n.x=1.1;if(n.x>1.1)n.x=-0.1;
      if(n.y<-0.1)n.y=1.1;if(n.y>1.1)n.y=-0.1;
    }
    bX.strokeStyle='rgba(11,60,93,0.025)';
    bX.lineWidth=0.5;
    for(var i=0;i<nodes.length;i++){
      for(var j=i+1;j<nodes.length;j++){
        var dx=(nodes[i].x-nodes[j].x)*bW;
        var dy=(nodes[i].y-nodes[j].y)*bH;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<180){
          var a=0.025*(1-dist/180);
          bX.strokeStyle='rgba(11,60,93,'+a+')';
          bX.beginPath();
          bX.moveTo(nodes[i].x*bW,nodes[i].y*bH);
          bX.lineTo(nodes[j].x*bW,nodes[j].y*bH);
          bX.stroke();
        }
      }
    }
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      bX.beginPath();bX.arc(n.x*bW,n.y*bH,n.r,0,Math.PI*2);
      bX.fillStyle='rgba(11,60,93,0.04)';bX.fill();
    }
    requestAnimationFrame(bgFrame);
  }
  bgFrame();
}

/* ═══ GSAP SETUP ═══ */
if(!reduced){
  gsap.set('#ifsEyebrow',{opacity:0,x:-24});
  gsap.set('#ifsEyeLine',{width:0});
  gsap.set(['#ifsH1','#ifsH2','#ifsH3'],{y:'115%'});
  gsap.set('#ifsHRule',{width:0});
  gsap.set('#ifsSub',{opacity:0,y:28});
  gsap.set('#ifsCta',{opacity:0,y:20});
  gsap.set('#ifsRight',{opacity:0,y:20,x:16});
  gsap.set('#ifsStream',{clipPath:'inset(0 100% 0 0)'});
  gsap.set('#ifsLegend',{opacity:0,y:12});
  gsap.set('#ifsFoot',{opacity:0});

  var tl=gsap.timeline({scrollTrigger:{trigger:scene,start:'top 70%',toggleActions:'play none none none'}});
  tl.to('#ifsEyeLine',{width:32,duration:0.6,ease:'power2.out'},0)
    .to('#ifsEyebrow',{opacity:1,x:0,duration:0.5,ease:'power3.out'},0.05)
    .to('#ifsH1',{y:'0%',duration:0.8,ease:'power4.out'},0.10)
    .to('#ifsH2',{y:'0%',duration:0.9,ease:'power4.out'},0.22)
    .to('#ifsH3',{y:'0%',duration:0.8,ease:'power4.out'},0.40)
    .to('#ifsHRule',{width:'100%',duration:0.9,ease:'power2.out'},0.52)
    .to('#ifsSub',{opacity:1,y:0,duration:0.7,ease:'power3.out'},0.42)
    .to('#ifsCta',{opacity:1,y:0,duration:0.6,ease:'power3.out'},0.58)
    .to('#ifsRight',{opacity:1,y:0,x:0,duration:0.7,ease:'power3.out'},0.25)
    .to('#ifsStream',{clipPath:'inset(0 0% 0 0)',duration:1.2,ease:'power2.inOut'},0.30)
    .to('#ifsLegend',{opacity:1,y:0,duration:0.6,ease:'power3.out'},0.90)
    .to('#ifsFoot',{opacity:1,duration:0.5,ease:'power2.out'},1.0);
}else{
  gsap.set(['#ifsEyebrow','#ifsH1','#ifsH2','#ifsH3','#ifsSub','#ifsCta','#ifsRight','#ifsStream','#ifsLegend','#ifsFoot'],{opacity:1,y:0,x:0,clearProps:'clipPath'});
  gsap.set('#ifsEyeLine',{width:32});gsap.set('#ifsHRule',{width:'100%'});
}

/* ═══════════════════════════
   PARTICLE STREAM CANVAS
   ═══════════════════════════ */
var C=document.getElementById('ifsCanvas');if(!C)return;
var X=C.getContext('2d');var dpr=Math.min(devicePixelRatio||1,2);var W,H;

var SC=[
  {b:[12,30,100],r:[28,60,155],txt:[10,38,115]},
  {b:[15,115,75],r:[28,170,112],txt:[6,95,64]},
  {b:[0,135,190],r:[0,190,240],txt:[0,100,150]}
];
var LABELS=['Cost & estimating','Scheduling & planning','Risk management'];

/* 12 UNIQUE word lists — one per output row */
var ROW_WORDS=[
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

var SX=0.18,FE=0.48,PX=0.63,NP=2200,NO=12;
var pR=false;

function lerp(a,b,t){return a+(b-a)*t;}
function clamp(v,l,h){return v<l?l:v>h?h:v;}
function sY(si){return H*(0.13+si*0.37);}
function oY(i){return H*(0.045+i*(0.91/11));}
function cF(si,v){var s=SC[si];return[Math.round(lerp(s.b[0],s.r[0],v)),Math.round(lerp(s.b[1],s.r[1],v)),Math.round(lerp(s.b[2],s.r[2],v))];}
function bz(a,b,c,d,e,f,g,h,t){var u=1-t,uu=u*u,uuu=uu*u,tt=t*t,ttt=tt*t;return{x:uuu*a+3*uu*t*c+3*u*tt*e+ttt*g,y:uuu*b+3*uu*t*d+3*u*tt*f+ttt*h};}

var cv=[];
function bC(){cv=[];var sx=W*SX,ex=W*FE;for(var si=0;si<3;si++){var sy=sY(si);for(var oi=0;oi<12;oi++){var ey=oY(oi),dy=ey-sy;cv.push({si:si,oi:oi,p0x:sx,p0y:sy,p1x:sx+(ex-sx)*0.28,p1y:sy+dy*0.05,p2x:sx+(ex-sx)*0.70,p2y:ey-dy*0.08,p3x:ex,p3y:ey});}}}
function rsz(){var r=C.getBoundingClientRect();C.width=r.width*dpr;C.height=r.height*dpr;X.setTransform(dpr,0,0,dpr,0,0);W=r.width;H=r.height;bC();}
rsz();window.addEventListener('resize',rsz);

function Pt(li){this.init(true,li);}
Pt.prototype.init=function(first,li){
  this.si=Math.floor(Math.random()*3);this.oi=Math.floor(Math.random()*12);
  this.ci=this.si*12+this.oi;this.v=Math.random();this.col=cF(this.si,this.v);
  this.bA=0.28+Math.random()*0.52;this.sz=0.5+Math.random()*1.9;
  this.yO=(Math.random()-0.5)*24;this.wo=Math.random()*Math.PI*2;
  /* FASTER speeds */
  this.sp=0.8+Math.random()*1.2;
  this.fS=0.0025+Math.random()*0.0035;
  this.rY=(Math.random()-0.5)*5;this.ph=0;this.fT=0;this.y=sY(this.si);this.a=0;
  if(first&&typeof li==='number'&&li<30){
    this.x=-(li*6+Math.random()*20);this.sp=1.4+Math.random()*0.8;this.fS=0.005+Math.random()*0.003;
  }else if(first){this.x=-(Math.random()*W*0.10+3);}
  else{this.x=-(3+Math.random()*W*0.12);}
};
Pt.prototype.rs=function(){this.init(false);};
Pt.prototype.up=function(t){
  var sx=W*SX,fx=W*FE,px=W*PX;var w=Math.sin(t*0.002+this.wo)*2.5;
  if(this.ph===0){this.x+=this.sp;this.y=sY(this.si)+this.yO+w;this.a=this.bA*clamp(this.x/(W*0.04),0,1);if(this.x>=sx){this.ph=1;this.fT=0;}}
  else if(this.ph===1){this.fT+=this.fS;if(this.fT>=1){this.ph=2;this.x=fx;return;}var c=cv[this.ci];if(!c){this.rs();return;}var p=bz(c.p0x,c.p0y,c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y,this.fT);var lf=1-this.fT*0.7;this.x=p.x;this.y=p.y+this.yO*lf*0.3+w*lf;this.a=this.bA*0.85;}
  else if(this.ph===2){this.x+=this.sp;this.y=oY(this.oi)+this.rY+w*0.3;var nP=clamp((this.x-(px-W*0.04))/(W*0.04),0,1);this.a=this.bA*(1+nP*0.25);if(this.x>=px){if(!pR)pR=true;this.rs();}}
};

var pts=[];for(var i=0;i<NP;i++)pts.push(new Pt(i));

/* ── Word slots: each row has its OWN unique word pool ── */
var ws=[];
for(var i=0;i<NO;i++){
  var si=i<4?0:i<8?1:2;
  ws.push({si:si,g:i,words:ROW_WORDS[i],wi:0,ins:[],cd:60+i*40});
}

var twC={};
function tw(t){if(!twC[t]){X.font='700 13px "Inter Tight",sans-serif';twC[t]=X.measureText(t).width;}return twC[t];}

var time=0,cV=false;
var cO=new IntersectionObserver(function(e){e.forEach(function(en){cV=en.isIntersecting;});},{threshold:0.05});
cO.observe(C);

function dFG(){for(var i=0;i<cv.length;i++){var c=cv[i],s=SC[c.si];X.strokeStyle='rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.045)';X.lineWidth=0.5;X.beginPath();X.moveTo(c.p0x,c.p0y);X.bezierCurveTo(c.p1x,c.p1y,c.p2x,c.p2y,c.p3x,c.p3y);X.stroke();}}
function dSG(){for(var si=0;si<3;si++){var sy=sY(si),s=SC[si];var g=X.createLinearGradient(0,sy-28,0,sy+28);g.addColorStop(0,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');g.addColorStop(0.5,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0.04)');g.addColorStop(1,'rgba('+s.r[0]+','+s.r[1]+','+s.r[2]+',0)');X.fillStyle=g;X.fillRect(0,sy-28,W*SX+10,56);}}
function dP(){
  var px=W*PX;var g=X.createLinearGradient(px-18,0,px+18,0);
  g.addColorStop(0,'rgba(30,80,140,0)');g.addColorStop(0.3,'rgba(30,80,140,0.03)');
  g.addColorStop(0.5,'rgba(30,80,140,0.09)');g.addColorStop(0.7,'rgba(30,80,140,0.03)');
  g.addColorStop(1,'rgba(30,80,140,0)');
  X.fillStyle=g;X.fillRect(px-18,0,36,H);
  var pu=0.14+Math.sin(time*0.003)*0.06;
  X.strokeStyle='rgba(30,80,150,'+pu+')';X.lineWidth=1.5;
  X.beginPath();X.moveTo(px,H*0.01);X.lineTo(px,H*0.99);X.stroke();
  X.strokeStyle='rgba(0,140,200,'+(pu*0.18)+')';X.lineWidth=0.5;
  [-4,4].forEach(function(o){X.beginPath();X.moveTo(px+o,H*0.01);X.lineTo(px+o,H*0.99);X.stroke();});
  for(var i=0;i<12;i++){var ny=oY(i),np=0.16+Math.sin(time*0.004+i*0.5)*0.06;X.beginPath();X.arc(px,ny,2,0,Math.PI*2);X.fillStyle='rgba(30,80,150,'+(np+0.16)+')';X.fill();}
}
function dL(){X.font='500 10px "DM Mono",monospace';X.textAlign='left';for(var si=0;si<3;si++){var yC=sY(si),s=SC[si];X.fillStyle='rgba('+s.txt[0]+','+s.txt[1]+','+s.txt[2]+',0.55)';X.fillText(LABELS[si].toUpperCase(),10,yC-18);}}
function dG(){if(!pR)return;var px=W*PX;X.strokeStyle='rgba(30,80,140,0.02)';X.lineWidth=0.5;for(var i=0;i<12;i++){var y=oY(i);X.beginPath();X.moveTo(px+12,y);X.lineTo(W,y);X.stroke();}}

function dEW(){
  if(!pR)return;
  var px=W*PX,MG=45;
  X.textAlign='left';X.font='700 13px "Inter Tight",sans-serif';
  for(var s=0;s<ws.length;s++){
    var sl=ws[s];
    for(var i=sl.ins.length-1;i>=0;i--){
      var w=sl.ins[i];w.x+=w.sp;w.a=Math.min(w.a+0.007,0.90);
      var fe=W*0.89,fo=w.x>fe?Math.max(0,1-(w.x-fe)/(W*0.11)):1;
      if(w.x>W+30){sl.ins.splice(i,1);continue;}
      var ty=oY(sl.g),sc=SC[sl.si];
      X.fillStyle='rgba('+sc.txt[0]+','+sc.txt[1]+','+sc.txt[2]+','+(w.a*fo)+')';
      X.fillText(w.txt,w.x,ty+5);
    }
    sl.cd--;
    if(sl.cd<=0&&sl.ins.length<2){
      var ok=true;
      if(sl.ins.length>0){var la=sl.ins[sl.ins.length-1];if(la.x+tw(la.txt)+MG>px+24)ok=false;}
      if(ok){
        var mx=Infinity;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].sp<mx)mx=sl.ins[j].sp;}
        var sp=sl.ins.length===0?0.22+Math.random()*0.16:Math.min(0.20+Math.random()*0.10,mx*0.92);
        var txt=sl.words[sl.wi%sl.words.length];sl.wi++;
        var uq=true;for(var j=0;j<sl.ins.length;j++){if(sl.ins[j].txt===txt)uq=false;}
        if(uq){sl.ins.push({x:px+24,a:0,sp:sp,txt:txt});sl.cd=300+Math.random()*400;}
        else{sl.cd=15;}
      }else{sl.cd=25;}
    }
  }
}

function frame(){
  time++;if(!cV){requestAnimationFrame(frame);return;}
  X.clearRect(0,0,W,H);
  dSG();dFG();dG();dP();dL();
  for(var i=0;i<pts.length;i++)pts[i].up(time);
  for(var i=0;i<pts.length;i++){var p=pts[i];if(p.a<0.01)continue;X.beginPath();X.arc(p.x,p.y,p.sz,0,Math.PI*2);X.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+clamp(p.a,0,1)+')';X.fill();}
  dEW();requestAnimationFrame(frame);
}
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
        try { new Function(sectionScript)() } catch(e) { console.error('S1 err:', e) }
      }
    }, 80)

    const safety = setTimeout(() => {
      clearInterval(waitForGsap)
      try { new Function(sectionScript)() } catch(e) { /* silent */ }
    }, 4000)

    return () => { clearInterval(waitForGsap); clearTimeout(safety) }
  }, [])

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: sectionHtml }} />
}
