'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-mii {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  /* Blueprint grid */
  .intel-mii::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .intel-mii-glow-top {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 50%;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .intel-mii-glow-centre {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(71,181,255,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  .intel-mii-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .intel-mii-header { text-align: center; margin-bottom: 80px; }

  .intel-mii-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .intel-mii-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-mii h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(30px, 3.5vw, 46px); line-height: 1.08;
    letter-spacing: -0.025em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 20px;
  }
  .intel-mii h2 em { font-style: italic; color: #47B5FF; }

  .intel-mii-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 620px; margin: 0 auto;
  }

  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     EXPLODED STACK VISUAL
     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  .intel-mii-visual-zone {
    display: grid;
    grid-template-columns: 80px 1fr 80px;
    gap: 0;
    align-items: center;
    margin-bottom: 80px;
    min-height: 560px;
  }

  /* Left axis */
  .intel-mii-axis {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .intel-mii-axis-line {
    width: 1px;
    height: 80%;
    background: linear-gradient(180deg, rgba(71,181,255,0.05) 0%, rgba(71,181,255,0.35) 50%, rgba(71,181,255,0.05) 100%);
    position: relative;
  }

  .intel-mii-axis-arrow {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid rgba(71,181,255,0.45);
  }

  .intel-mii-axis-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.35);
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    margin-top: 16px;
  }

  /* Stack container */
  .intel-mii-stack {
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;
    perspective: 1200px;
  }

  /* Individual layer */
  .intel-mii-layer {
    position: relative;
    display: grid;
    grid-template-columns: 56px 1fr auto;
    align-items: center;
    gap: 20px;
    padding: 0;
    transform-style: preserve-3d;
    opacity: 0;
    transform: translateY(30px) rotateX(8deg);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }

  .intel-mii-layer.intel-mii-visible {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }

  /* Layer plane — the axonometric slab */
  .intel-mii-plane {
    position: absolute;
    inset: -2px -16px;
    border: 1px solid rgba(71,181,255,0.08);
    background: rgba(71,181,255,0.015);
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
    z-index: -1;
  }

  .intel-mii-layer:hover .intel-mii-plane {
    border-color: rgba(71,181,255,0.2);
    background: rgba(71,181,255,0.035);
    box-shadow: 0 4px 40px rgba(71,181,255,0.06), inset 0 0 40px rgba(71,181,255,0.02);
  }

  /* Accent bar on left of each plane */
  .intel-mii-plane::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    transition: background 0.4s ease, box-shadow 0.4s ease;
  }

  .intel-mii-layer[data-intel-layer="1"] .intel-mii-plane::before { background: rgba(71,181,255,0.12); }
  .intel-mii-layer[data-intel-layer="2"] .intel-mii-plane::before { background: rgba(71,181,255,0.2); }
  .intel-mii-layer[data-intel-layer="3"] .intel-mii-plane::before { background: rgba(71,181,255,0.32); }
  .intel-mii-layer[data-intel-layer="4"] .intel-mii-plane::before { background: rgba(71,181,255,0.5); }
  .intel-mii-layer[data-intel-layer="5"] .intel-mii-plane::before { background: #47B5FF; box-shadow: 0 0 12px rgba(71,181,255,0.3); }

  .intel-mii-layer:hover .intel-mii-plane::before {
    box-shadow: 0 0 16px rgba(71,181,255,0.25);
  }

  /* Layer number */
  .intel-mii-layer-num {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 28px;
    letter-spacing: -0.03em;
    text-align: center;
    transition: color 0.3s ease;
    padding: 22px 0;
  }

  .intel-mii-layer[data-intel-layer="1"] .intel-mii-layer-num { color: rgba(71,181,255,0.18); }
  .intel-mii-layer[data-intel-layer="2"] .intel-mii-layer-num { color: rgba(71,181,255,0.28); }
  .intel-mii-layer[data-intel-layer="3"] .intel-mii-layer-num { color: rgba(71,181,255,0.42); }
  .intel-mii-layer[data-intel-layer="4"] .intel-mii-layer-num { color: rgba(71,181,255,0.62); }
  .intel-mii-layer[data-intel-layer="5"] .intel-mii-layer-num { color: #47B5FF; }

  .intel-mii-layer:hover .intel-mii-layer-num { color: #47B5FF; }

  /* Layer content */
  .intel-mii-layer-content {
    padding: 20px 0;
  }

  .intel-mii-layer-title {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    margin: 0 0 6px 0;
    transition: color 0.3s ease;
  }

  .intel-mii-layer[data-intel-layer="1"] .intel-mii-layer-title { color: rgba(244,246,248,0.35); }
  .intel-mii-layer[data-intel-layer="2"] .intel-mii-layer-title { color: rgba(244,246,248,0.48); }
  .intel-mii-layer[data-intel-layer="3"] .intel-mii-layer-title { color: rgba(244,246,248,0.62); }
  .intel-mii-layer[data-intel-layer="4"] .intel-mii-layer-title { color: rgba(244,246,248,0.8); }
  .intel-mii-layer[data-intel-layer="5"] .intel-mii-layer-title { color: #F4F6F8; }

  .intel-mii-layer:hover .intel-mii-layer-title { color: #F4F6F8; }

  .intel-mii-layer-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.65;
    color: #5a7a96;
    margin: 0;
    max-width: 480px;
    transition: color 0.3s ease;
  }

  .intel-mii-layer:hover .intel-mii-layer-desc { color: #7a9bb5; }

  /* Layer tag — right side */
  .intel-mii-layer-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 6px 14px;
    border: 1px solid rgba(71,181,255,0.12);
    color: rgba(122,155,181,0.45);
    white-space: nowrap;
    transition: all 0.3s ease;
    margin-right: 8px;
  }

  .intel-mii-layer:hover .intel-mii-layer-tag {
    border-color: rgba(71,181,255,0.3);
    color: #47B5FF;
  }

  .intel-mii-layer[data-intel-layer="5"] .intel-mii-layer-tag {
    border-color: rgba(71,181,255,0.35);
    color: rgba(71,181,255,0.7);
    background: rgba(71,181,255,0.04);
  }

  /* Right label zone */
  .intel-mii-right-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .intel-mii-right-text {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.25);
    writing-mode: vertical-lr;
  }

  /* "Most teams stop here" marker */
  .intel-mii-stopline {
    position: relative;
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 0;
    margin: 4px 0;
  }

  .intel-mii-stopline::before {
    content: '';
    flex: 1;
    height: 1px;
    background: repeating-linear-gradient(90deg, rgba(255,140,60,0.35) 0px, rgba(255,140,60,0.35) 6px, transparent 6px, transparent 12px);
  }

  .intel-mii-stopline::after {
    content: '';
    flex: 1;
    height: 1px;
    background: repeating-linear-gradient(90deg, rgba(255,140,60,0.35) 0px, rgba(255,140,60,0.35) 6px, transparent 6px, transparent 12px);
  }

  .intel-mii-stopline-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,140,60,0.65);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     CONTEXT CARDS
     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  .intel-mii-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .intel-mii-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 32px 28px 28px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-mii-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .intel-mii-card:hover::before { width: 100%; }

  .intel-mii-card:hover {
    border-color: rgba(71,181,255,0.2);
    background: rgba(71,181,255,0.03);
  }

  .intel-mii-card-icon {
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }

  .intel-mii-card-icon::before {
    content: '';
    width: 6px; height: 6px;
    background: rgba(71,181,255,0.3);
    border: 1px solid rgba(71,181,255,0.5);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .intel-mii-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0;
    color: #F4F6F8; margin: 0 0 10px 0;
    transition: color 0.3s ease;
  }
  .intel-mii-card:hover h3 { color: #47B5FF; }

  .intel-mii-card p {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    line-height: 1.75; color: #5a7a96; margin: 0;
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 960px) {
    .intel-mii-visual-zone {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .intel-mii-axis, .intel-mii-right-label { display: none; }
    .intel-mii-layer { grid-template-columns: 44px 1fr; }
    .intel-mii-layer-tag { display: none; }
    .intel-mii-cards { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .intel-mii { padding: 80px 20px 100px; }
    .intel-mii-layer { grid-template-columns: 1fr; gap: 4px; }
    .intel-mii-layer-num { text-align: left; font-size: 22px; padding: 8px 0 0; }
    .intel-mii-layer-content { padding: 4px 0 16px; }
  }
</style>

<section class="intel-mii">
  <div class="intel-mii-glow-top"></div>
  <div class="intel-mii-glow-centre"></div>
  <div class="intel-mii-inner">

    <div class="intel-mii-header" id="intel-mii-header">
      <div class="intel-mii-eyebrow">Our Differentiator</div>
      <h2>The Model <em>Intelligence</em> Index</h2>
      <p class="intel-mii-subtitle">Most teams measure progress by geometry. We measure it by intelligence \u2014 five cumulative layers that define whether your project data is just files or a decision-ready ecosystem of models, reports, and verified information.</p>
    </div>

    <div class="intel-mii-visual-zone">

      <!-- Left axis -->
      <div class="intel-mii-axis">
        <div class="intel-mii-axis-line">
          <div class="intel-mii-axis-arrow"></div>
        </div>
        <div class="intel-mii-axis-label">Intelligence</div>
      </div>

      <!-- Stack -->
      <div class="intel-mii-stack" id="intel-mii-stack">

        <!-- Layer 01 \u2014 Geometry (bottom, dimmest) -->
        <div class="intel-mii-layer" data-intel-layer="1">
          <div class="intel-mii-plane"></div>
          <div class="intel-mii-layer-num">01</div>
          <div class="intel-mii-layer-content">
            <h3 class="intel-mii-layer-title">Geometry</h3>
            <p class="intel-mii-layer-desc">Shape, spatial positioning, 3D representation. What most teams think a model is. Necessary \u2014 but insufficient. A model with only geometry is a 3D drawing, not a data asset.</p>
          </div>
          <span class="intel-mii-layer-tag">Visual Only</span>
        </div>

        <!-- STOP LINE -->
        <div class="intel-mii-stopline" data-intel-stopline>
          <span class="intel-mii-stopline-label">\u25B2 Most Teams Stop Here</span>
        </div>

        <!-- Layer 02 \u2014 Parameters -->
        <div class="intel-mii-layer" data-intel-layer="2">
          <div class="intel-mii-plane"></div>
          <div class="intel-mii-layer-num">02</div>
          <div class="intel-mii-layer-content">
            <h3 class="intel-mii-layer-title">Parameters</h3>
            <p class="intel-mii-layer-desc">Data embedded in every element \u2014 materials, specifications, property sets, manufacturer data. The non-graphical information that makes model elements queryable and extractable.</p>
          </div>
          <span class="intel-mii-layer-tag">Queryable</span>
        </div>

        <!-- Layer 03 \u2014 Classification -->
        <div class="intel-mii-layer" data-intel-layer="3">
          <div class="intel-mii-plane"></div>
          <div class="intel-mii-layer-num">03</div>
          <div class="intel-mii-layer-content">
            <h3 class="intel-mii-layer-title">Classification</h3>
            <p class="intel-mii-layer-desc">Uniclass, OmniClass, or project-specific codes mapped to every element. Naming compliance enforced. CDE status codes applied. The taxonomy that makes the model interoperable across disciplines and systems.</p>
          </div>
          <span class="intel-mii-layer-tag">Interoperable</span>
        </div>

        <!-- Layer 04 \u2014 Coordination -->
        <div class="intel-mii-layer" data-intel-layer="4">
          <div class="intel-mii-plane"></div>
          <div class="intel-mii-layer-num">04</div>
          <div class="intel-mii-layer-content">
            <h3 class="intel-mii-layer-title">Coordination</h3>
            <p class="intel-mii-layer-desc">Clash-free, spatially verified, interdisciplinary validation complete. Issues tracked to closure. Design validated not just for spatial conflicts but for compliance, constructability, and buildability.</p>
          </div>
          <span class="intel-mii-layer-tag">Validated</span>
        </div>

        <!-- Layer 05 \u2014 Verification (top, brightest) -->
        <div class="intel-mii-layer" data-intel-layer="5">
          <div class="intel-mii-plane"></div>
          <div class="intel-mii-layer-num">05</div>
          <div class="intel-mii-layer-content">
            <h3 class="intel-mii-layer-title">Verification</h3>
            <p class="intel-mii-layer-desc">Audited against the BEP, EIR, and LOD matrix. QTO-ready. Data completeness scored. Contractually defensible. The model isn\u2019t just coordinated \u2014 it\u2019s decision-ready and deliverable-grade.</p>
          </div>
          <span class="intel-mii-layer-tag">Decision-Ready</span>
        </div>

      </div>

      <!-- Right label -->
      <div class="intel-mii-right-label">
        <div class="intel-mii-right-text">Infraforma \u00b7 MII</div>
      </div>

    </div>

    <!-- Context cards -->
    <div class="intel-mii-cards">
      <div class="intel-mii-card" data-intel-mc>
        <div class="intel-mii-card-icon">What It Measures</div>
        <h3>Data Maturity, Not Geometry</h3>
        <p>The MII scores every model element across five dimensions \u2014 from basic geometry to full verification. The result is a single, auditable metric that tells the programme whether the model is contractually compliant or needs remediation before the next milestone.</p>
      </div>

      <div class="intel-mii-card" data-intel-mc>
        <div class="intel-mii-card-icon">How It\u2019s Applied</div>
        <h3>Per Element, Per Milestone</h3>
        <p>MII isn\u2019t a project-level average. It\u2019s assessed per element, per discipline, at each contractual milestone. This means you can see exactly which systems are falling behind on data completeness \u2014 and intervene before it compounds into a handover gap.</p>
      </div>

      <div class="intel-mii-card" data-intel-mc>
        <div class="intel-mii-card-icon">Why It Matters</div>
        <h3>Intelligence Enables Decisions</h3>
        <p>At Layer 1, you have a visual. At Layer 5, you have an asset that drives procurement, validates quantities, informs scheduling, and satisfies handover \u2014 with every coordination record, CDE status, and issue resolution traceable. The MII quantifies the difference and gives your teams the intelligence to act faster and with confidence.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Header fade */
  var hdr = document.getElementById('intel-mii-header');
  if (hdr) {
    hdr.style.opacity = '0';
    hdr.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hdr.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          hdr.style.opacity = '1';
          hdr.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(hdr);
  }

  /* Layers \u2014 staggered reveal from bottom (Layer 1 first since column-reverse) */
  var stack = document.getElementById('intel-mii-stack');
  if (stack) {
    var layers = stack.querySelectorAll('.intel-mii-layer');
    var stopline = stack.querySelector('[data-intel-stopline]');
    if (stopline) {
      stopline.style.opacity = '0';
    }

    var obsStack = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          /* Layers are in DOM order (1,stopline,2,3,4,5) but displayed column-reverse.
             We want 1 to appear first (bottom), then stop line, then 2,3,4,5. */
          var allItems = [];
          var children = stack.children;
          for (var c = 0; c < children.length; c++) {
            allItems.push(children[c]);
          }

          allItems.forEach(function(item, idx) {
            setTimeout(function() {
              if (item.classList.contains('intel-mii-layer')) {
                item.classList.add('intel-mii-visible');
              }
              if (item.hasAttribute('data-intel-stopline')) {
                item.style.transition = 'opacity 0.5s ease';
                item.style.opacity = '1';
              }
            }, idx * 200);
          });

          obsStack.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obsStack.observe(stack);
  }

  /* Context cards */
  var cards = document.querySelectorAll('[data-intel-mc]');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(card);
  });
})();`;

export default function IntelligenceMII() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const timer = setTimeout(() => { try { new Function(script)(); } catch(e) { console.error(e); } }, 300);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
