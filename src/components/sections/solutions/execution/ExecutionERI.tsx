'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-eri { position: relative; background: #1C1F23; padding: 120px 32px 140px; overflow: hidden; }
  .exec-eri::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
  .exec-eri-glow-top { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 120%; height: 50%; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.08) 0%, transparent 70%); pointer-events: none; }
  .exec-eri-inner { position: relative; max-width: 1200px; margin: 0 auto; z-index: 1; }
  .exec-eri-header { text-align: center; margin-bottom: 72px; }
  .exec-eri-eyebrow { display: inline-flex; align-items: center; gap: 14px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px; }
  .exec-eri-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }
  .exec-eri h2 { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(30px, 3.5vw, 46px); line-height: 1.08; letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px; }
  .exec-eri h2 em { font-style: italic; color: #47B5FF; }
  .exec-eri-subtitle { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: #7a9bb5; max-width: 640px; margin: 0 auto; }
  .exec-eri-zone { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-bottom: 72px; }
  .exec-eri-radar-wrap { position: sticky; top: 80px; width: 100%; max-width: 480px; margin: 0 auto; aspect-ratio: 1; }
  .exec-eri-radar-svg { width: 100%; height: 100%; }
  .exec-eri-dims { display: flex; flex-direction: column; gap: 12px; }
  .exec-eri-dim { position: relative; padding: 20px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.08); transition: all 0.35s ease; cursor: default; }
  .exec-eri-dim::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: rgba(71,181,255,0.15); transition: background 0.3s ease; }
  .exec-eri-dim:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .exec-eri-dim:hover::before { background: #47B5FF; }
  .exec-eri-dim-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .exec-eri-dim-num { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(71,181,255,0.5); }
  .exec-eri-dim-score { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: rgba(255,140,60,0.7); }
  .exec-eri-dim-name { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0; color: #F4F6F8; margin: 0 0 4px; transition: color 0.3s ease; }
  .exec-eri-dim:hover .exec-eri-dim-name { color: #47B5FF; }
  .exec-eri-dim-desc { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.65; color: #5a7a96; margin: 0; }
  .exec-eri-dim-source { display: inline-block; margin-top: 8px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: rgba(71,181,255,0.35); text-decoration: none; transition: color 0.3s ease; }
  .exec-eri-dim-source:hover { color: rgba(71,181,255,0.7); }
  .exec-eri-dim-bar { height: 3px; background: rgba(71,181,255,0.06); margin-top: 10px; position: relative; overflow: hidden; }
  .exec-eri-dim-bar-fill { position: absolute; top: 0; left: 0; height: 100%; background: linear-gradient(90deg, rgba(255,140,60,0.6), rgba(255,140,60,0.3)); width: 0; transition: width 1.2s cubic-bezier(0.22,1,0.36,1); }
  .exec-eri-composite { text-align: center; padding: 48px 0; border-top: 1px solid rgba(71,181,255,0.08); border-bottom: 1px solid rgba(71,181,255,0.08); margin-bottom: 80px; }
  .exec-eri-composite-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(71,181,255,0.4); margin-bottom: 16px; }
  .exec-eri-composite-score { font-family: 'Inter Tight', sans-serif; font-weight: 900; font-size: clamp(56px, 6vw, 80px); color: rgba(255,140,60,0.7); letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
  .exec-eri-composite-verdict { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,140,60,0.5); }
  .exec-eri-composite-note { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300; color: #5a7a96; margin-top: 16px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.7; }
  .exec-eri-stopline { display: flex; align-items: center; gap: 16px; margin-bottom: 56px; }
  .exec-eri-stopline::before, .exec-eri-stopline::after { content: ''; flex: 1; height: 1px; background: repeating-linear-gradient(90deg, rgba(71,181,255,0.25) 0px, rgba(71,181,255,0.25) 6px, transparent 6px, transparent 12px); }
  .exec-eri-stopline-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(71,181,255,0.55); white-space: nowrap; }
  .exec-eri-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .exec-eri-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(71,181,255,0.1); padding: 32px 28px 28px; transition: all 0.35s cubic-bezier(0.22,1,0.36,1); overflow: hidden; }
  .exec-eri-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15)); transition: width 0.45s cubic-bezier(0.22,1,0.36,1); }
  .exec-eri-card:hover::before { width: 100%; }
  .exec-eri-card:hover { border-color: rgba(71,181,255,0.2); background: rgba(71,181,255,0.03); }
  .exec-eri-card-icon { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #47B5FF; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .exec-eri-card-icon::before { content: ''; width: 6px; height: 6px; background: rgba(71,181,255,0.3); border: 1px solid rgba(71,181,255,0.5); border-radius: 50%; flex-shrink: 0; }
  .exec-eri-card h4 { font-family: 'Inter Tight', sans-serif; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 0; color: #F4F6F8; margin: 0 0 10px; transition: color 0.3s ease; }
  .exec-eri-card:hover h4 { color: #47B5FF; }
  .exec-eri-card p { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.75; color: #5a7a96; margin: 0; }

  @media (max-width: 1080px) {
    .exec-eri-zone { grid-template-columns: 1fr; gap: 56px; }
    .exec-eri-radar-wrap { max-width: 440px; position: static; margin: 0 auto; }
    .exec-eri-dims { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .exec-eri-cards { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .exec-eri { padding: 80px 20px 100px; }
    .exec-eri-radar-wrap { max-width: 300px; }
    .exec-eri-dims { grid-template-columns: 1fr 1fr; gap: 10px; }
    .exec-eri-dim { padding: 14px 16px; }
    .exec-eri-dim-desc { font-size: 11px; }
    .exec-eri-dim-name { font-size: 12px; }
    .exec-eri-dim-source { font-size: 9px; }
  }
</style>

<section class="exec-eri">
  <div class="exec-eri-glow-top"></div>
  <div class="exec-eri-inner">

    <div class="exec-eri-header" id="exec-eri-header">
      <div class="exec-eri-eyebrow">Our Differentiator</div>
      <h2>The Execution<br><em>Readiness</em> Index</h2>
      <p class="exec-eri-subtitle">We score every project across six dimensions that define whether your digital investment reaches the field — or dies at the server. The industry average is brutal. Most projects don’t fail because of bad models. They fail because the model never connects to what gets built.</p>
    </div>

    <div class="exec-eri-zone">
      <div class="exec-eri-radar-wrap">
        <svg class="exec-eri-radar-svg" id="exec-eri-radar" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>

      <div class="exec-eri-dims" id="exec-eri-dims">

        <div class="exec-eri-dim" data-exec-dim data-score="15">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 01</span><span class="exec-eri-dim-score">Avg: 15/100</span></div>
          <div class="exec-eri-dim-name">Schedule–Model Integration</div>
          <p class="exec-eri-dim-desc">4D BIM adoption remains low — used mainly on small projects due to complexity and heterogeneous expertise. Most schedules and models live in separate systems with no link.</p>
          <a class="exec-eri-dim-source" href="https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2022.998309/full" target="_blank" rel="noopener">Source: Frontiers in Built Environment · Boton et al.</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="15"></div></div>
        </div>

        <div class="exec-eri-dim" data-exec-dim data-score="18">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 02</span><span class="exec-eri-dim-score">Avg: 18/100</span></div>
          <div class="exec-eri-dim-name">Work Package Maturity</div>
          <p class="exec-eri-dim-desc">Most trades still receive full model dumps or printed drawings. Scoped digital packages with shop drawings, fabrication data, and quality forms remain rare outside leading firms.</p>
          <a class="exec-eri-dim-source" href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">Source: McKinsey Global Institute · Construction Productivity</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="18"></div></div>
        </div>

        <div class="exec-eri-dim" data-exec-dim data-score="12">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 03</span><span class="exec-eri-dim-score">Avg: 12/100</span></div>
          <div class="exec-eri-dim-name">Field Data Connectivity</div>
          <p class="exec-eri-dim-desc">Construction productivity grew 0.4% per year since 2000. Field data doesn’t flow back. As-built conditions, redlines, and quantity changes stay in spreadsheets. The model diverges from reality on day one.</p>
          <a class="exec-eri-dim-source" href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">Source: McKinsey Global Institute · 0.4% Annual Growth</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="12"></div></div>
        </div>

        <div class="exec-eri-dim" data-exec-dim data-score="20">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 04</span><span class="exec-eri-dim-score">Avg: 20/100</span></div>
          <div class="exec-eri-dim-name">Progress Verification</div>
          <p class="exec-eri-dim-desc">Rework consumes 11–20% of project cost across 15 countries surveyed. Root cause: no actual vs. planned at the element level. Earned value from spreadsheets, not verified model data.</p>
          <a class="exec-eri-dim-source" href="https://info.planradar.com/hubfs/PDFs/Ebook_EN_CostofRework.pdf" target="_blank" rel="noopener">Source: PlanRadar · Cost of Rework Study (15 Countries)</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="20"></div></div>
        </div>

        <div class="exec-eri-dim" data-exec-dim data-score="14">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 05</span><span class="exec-eri-dim-score">Avg: 14/100</span></div>
          <div class="exec-eri-dim-name">Inspection &amp; QA/QC Digitisation</div>
          <p class="exec-eri-dim-desc">67% of firms still rely on manual QA/QC. Over 60% in Asia use analogue methods. Inspections on clipboards, defects on WhatsApp, sign-offs in email. Model-linked inspections remain the exception.</p>
          <a class="exec-eri-dim-source" href="https://www.planradar.com/sa-en/digital-qaqc-in-construction-gcc/" target="_blank" rel="noopener">Source: PlanRadar · QA/QC Impact Report 2025</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="14"></div></div>
        </div>

        <div class="exec-eri-dim" data-exec-dim data-score="8">
          <div class="exec-eri-dim-top"><span class="exec-eri-dim-num">Dimension 06</span><span class="exec-eri-dim-score">Avg: 8/100</span></div>
          <div class="exec-eri-dim-name">Handover Readiness</div>
          <p class="exec-eri-dim-desc">Digital twin-ready handover requires progressive as-built data, traceable inspections, and verified records. Most projects reconstruct this from scattered files after completion — if at all.</p>
          <a class="exec-eri-dim-source" href="https://hexagon.com/resources/insights/digital-twin/statistics" target="_blank" rel="noopener">Source: Hexagon · Digital Twin Statistics 2025</a>
          <div class="exec-eri-dim-bar"><div class="exec-eri-dim-bar-fill" data-width="8"></div></div>
        </div>

      </div>
    </div>

    <div class="exec-eri-composite" id="exec-eri-composite">
      <div class="exec-eri-composite-label">Industry Average · Execution Readiness Index</div>
      <div class="exec-eri-composite-score" id="exec-eri-score-num">0</div>
      <div class="exec-eri-composite-verdict">Critical — Execution Gap</div>
      <p class="exec-eri-composite-note">Most projects score under 25. The model exists. The schedule exists. But the connection between them — the closed loop that turns data into field action — doesn’t.</p>
    </div>

    <!-- Transition to Loop section -->
    <div class="exec-eri-stopline"><span class="exec-eri-stopline-label">From 15 To 80+ — Verified, Defensible, Handover-Ready</span></div>

    <div class="exec-eri-cards">
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">What We Diagnose</div><h4>Execution Connectivity</h4><p>The ERI scores your project across six dimensions — from schedule-model integration to handover readiness. A single, auditable metric that tells the programme whether its digital investment is reaching the field or stopping at the server.</p></div>
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">How We Deploy</div><h4>Diagnose, Loop, Verify</h4><p>We run the ERI before engagement. It shows exactly where the gaps are. Then we deploy the Execution Loop — connecting model to field and field back to model. Every cycle closes a gap. Every cycle raises the score.</p></div>
      <div class="exec-eri-card" data-exec-ec><div class="exec-eri-card-icon">What You Get</div><h4>Verified Handover</h4><p>Projects that complete the execution layer with a target ERI above 80 deliver verified as-built data, traceable inspection records, and a digital twin-ready dataset — not a box of paper and a model that hasn’t been updated since detailed design.</p></div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var header = document.getElementById('exec-eri-header');
  if (header) { header.style.opacity='0'; header.style.transform='translateY(24px)'; var hObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){header.style.transition='opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)';header.style.opacity='1';header.style.transform='translateY(0)';hObs.disconnect();}});},{threshold:0.15});hObs.observe(header); }

  var svgEl=document.getElementById('exec-eri-radar');
  if(svgEl){
    var cx=240,cy=240,maxR=190,dims=6;
    var scores=[15,18,12,20,14,8];
    var labels=['SCHEDULE\u2013MODEL','WORK PACKAGES','FIELD DATA','PROGRESS','QA/QC','HANDOVER'];
    function p2c(a,r){var rad=(a-90)*Math.PI/180;return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)};}
    function hxp(r){var pts=[];for(var i=0;i<dims;i++){var p=p2c(i*60,r);pts.push(p.x+','+p.y);}return pts.join(' ');}
    while(svgEl.firstChild)svgEl.removeChild(svgEl.firstChild);
    [0.25,0.5,0.75,1.0].forEach(function(pct){var ring=document.createElementNS('http://www.w3.org/2000/svg','polygon');ring.setAttribute('points',hxp(maxR*pct));ring.setAttribute('stroke',pct===1?'rgba(71,181,255,0.1)':'rgba(71,181,255,0.05)');ring.setAttribute('stroke-width','1');ring.setAttribute('fill','none');svgEl.appendChild(ring);});
    for(var i=0;i<dims;i++){var p=p2c(i*60,maxR);var line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',cx);line.setAttribute('y1',cy);line.setAttribute('x2',p.x);line.setAttribute('y2',p.y);line.setAttribute('stroke','rgba(71,181,255,0.06)');line.setAttribute('stroke-width','1');svgEl.appendChild(line);}
    for(var i=0;i<dims;i++){var lp=p2c(i*60,maxR+36);var text=document.createElementNS('http://www.w3.org/2000/svg','text');text.setAttribute('x',lp.x);text.setAttribute('y',lp.y);text.setAttribute('text-anchor','middle');text.setAttribute('dominant-baseline','middle');text.setAttribute('fill','rgba(122,155,181,0.45)');text.setAttribute('font-family','DM Mono, monospace');text.setAttribute('font-size','11');text.setAttribute('letter-spacing','0.08em');text.textContent=labels[i];svgEl.appendChild(text);}
    var tp=document.createElementNS('http://www.w3.org/2000/svg','polygon');tp.setAttribute('points',hxp(maxR*0.8));tp.setAttribute('fill','none');tp.setAttribute('stroke','rgba(71,181,255,0.12)');tp.setAttribute('stroke-width','1');tp.setAttribute('stroke-dasharray','4,6');svgEl.appendChild(tp);
    var tl=document.createElementNS('http://www.w3.org/2000/svg','text');var tlp=p2c(30,maxR*0.83);tl.setAttribute('x',tlp.x+8);tl.setAttribute('y',tlp.y);tl.setAttribute('fill','rgba(71,181,255,0.25)');tl.setAttribute('font-family','DM Mono, monospace');tl.setAttribute('font-size','8');tl.setAttribute('letter-spacing','0.1em');tl.textContent='TARGET: 80';svgEl.appendChild(tl);
    var dp=document.createElementNS('http://www.w3.org/2000/svg','polygon');dp.setAttribute('points',hxp(0));dp.setAttribute('fill','rgba(255,140,60,0.08)');dp.setAttribute('stroke','rgba(255,140,60,0.5)');dp.setAttribute('stroke-width','1.5');dp.style.transition='all 1.5s cubic-bezier(0.22,1,0.36,1)';svgEl.appendChild(dp);
    var dots=[];for(var i=0;i<dims;i++){var dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('cx',cx);dot.setAttribute('cy',cy);dot.setAttribute('r','4');dot.setAttribute('fill','rgba(255,140,60,0.8)');dot.setAttribute('stroke','rgba(255,140,60,0.3)');dot.setAttribute('stroke-width','6');dot.style.transition='all 1.5s cubic-bezier(0.22,1,0.36,1)';svgEl.appendChild(dot);dots.push(dot);}
    var ct=document.createElementNS('http://www.w3.org/2000/svg','text');ct.setAttribute('x',cx);ct.setAttribute('y',cy-6);ct.setAttribute('text-anchor','middle');ct.setAttribute('fill','rgba(255,140,60,0.5)');ct.setAttribute('font-family','DM Mono, monospace');ct.setAttribute('font-size','28');ct.setAttribute('font-weight','700');ct.textContent='ERI';svgEl.appendChild(ct);
    var cs=document.createElementNS('http://www.w3.org/2000/svg','text');cs.setAttribute('x',cx);cs.setAttribute('y',cy+18);cs.setAttribute('text-anchor','middle');cs.setAttribute('fill','rgba(255,140,60,0.3)');cs.setAttribute('font-family','DM Mono, monospace');cs.setAttribute('font-size','10');cs.setAttribute('letter-spacing','0.15em');cs.textContent='INDUSTRY AVG';svgEl.appendChild(cs);
    var rObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var pts=[];for(var i=0;i<dims;i++){var r=maxR*(scores[i]/100);var p=p2c(i*60,r);pts.push(p.x+','+p.y);dots[i].setAttribute('cx',p.x);dots[i].setAttribute('cy',p.y);}dp.setAttribute('points',pts.join(' '));rObs.disconnect();}});},{threshold:0.2});rObs.observe(svgEl);
  }

  var dimCards=document.querySelectorAll('[data-exec-dim]');
  dimCards.forEach(function(card,i){card.style.opacity='0';card.style.transform='translateX(20px)';var fill=card.querySelector('.exec-eri-dim-bar-fill');var w=fill?fill.getAttribute('data-width'):0;var dObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){setTimeout(function(){card.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';card.style.opacity='1';card.style.transform='translateX(0)';if(fill)fill.style.width=w+'%';},i*100);dObs.disconnect();}});},{threshold:0.08});dObs.observe(card);});

  var scoreEl=document.getElementById('exec-eri-score-num');
  if(scoreEl){var target=15;var counted=false;var cObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting&&!counted){counted=true;var current=0;var interval=setInterval(function(){current++;scoreEl.textContent=current;if(current>=target)clearInterval(interval);},60);cObs.disconnect();}});},{threshold:0.3});cObs.observe(scoreEl);}

  var steps=document.querySelectorAll('[data-exec-step]');
  steps.forEach(function(step,i){step.style.opacity='0';step.style.transform='translateY(20px)';var sObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){setTimeout(function(){step.style.transition='opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';step.style.opacity='1';step.style.transform='translateY(0)';},i*100);sObs.disconnect();}});},{threshold:0.08});sObs.observe(step);});

  var cards=document.querySelectorAll('[data-exec-ec]');
  cards.forEach(function(card,i){card.style.opacity='0';card.style.transform='translateY(28px)';var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){setTimeout(function(){card.style.transition='opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';card.style.opacity='1';card.style.transform='translateY(0)';},i*120);obs.disconnect();}});},{threshold:0.08});obs.observe(card);});
})()`;

export default function ExecutionERI() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.innerHTML = html;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = script;
    el.appendChild(scriptEl);
    return () => { el.innerHTML = ''; };
  }, []);

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  );
}
