'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .twin-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .twin-problem-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  /* \u2550\u2550\u2550 LEFT COLUMN \u2014 Sticky \u2550\u2550\u2550 */
  .twin-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .twin-problem-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 28px;
  }

  .twin-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .twin-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .twin-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .twin-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .twin-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 Stat blocks \u2550\u2550\u2550 */
  .twin-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .twin-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .twin-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .twin-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .twin-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .twin-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .twin-stat-source {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-decoration: none;
    color: #5a7a96;
    transition: color 0.25s ease;
  }

  .twin-stat-source:hover {
    color: #47B5FF;
  }

  .twin-stat-source::before {
    content: '\u2197';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .twin-stat-source:hover::before {
    opacity: 1;
  }

  /* \u2550\u2550\u2550 RIGHT COLUMN \u2014 Scrolling failure cards \u2550\u2550\u2550 */
  .twin-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .twin-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .twin-failure-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-top: 1px solid rgba(71,181,255,0.25);
    border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .twin-failure-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.25);
    border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .twin-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .twin-failure-card:hover::before,
  .twin-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .twin-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .twin-failure-card:hover .twin-fc-accent {
    width: 100%;
  }

  .twin-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #47B5FF, rgba(71,181,255,0.1));
    transition: height 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .twin-failure-card:hover .twin-fc-side {
    height: 100%;
  }

  .twin-fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .twin-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .twin-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.12);
    padding: 3px 12px;
  }

  .twin-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .twin-failure-card:hover h3 {
    color: #47B5FF;
  }

  .twin-failure-card p {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    color: #3d5a73;
    margin: 0;
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 960px) {
    .twin-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .twin-problem-left {
      position: relative;
      top: auto;
    }
    .twin-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .twin-problem {
      padding: 80px 20px 100px;
    }
    .twin-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .twin-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="twin-problem">
  <div class="twin-problem-inner">

    <!-- LEFT \u2014 Sticky column -->
    <div class="twin-problem-left" id="twin-problem-left">
      <div class="twin-problem-eyebrow">The Handover Gap</div>
      <h2>You Built A Model.<br>Your Owner Gets A <em>Box</em>.</h2>
      <p class="twin-problem-text">
        Construction generates enormous volumes of data \u2014 models, inspections, submittals, specifications, test results, commissioning records. But at handover, most of it is dumped into a folder structure that nobody indexed, verified, or formatted for the systems that need it. The model that took three years to build doesn\u2019t match the building. The asset data that operations needs doesn\u2019t exist in the formats their CAFM system can read. <strong>The handover gap isn\u2019t a documentation problem. It\u2019s a data architecture problem that starts on day one and compounds through every phase.</strong>
      </p>

      <div class="twin-problem-stats">
        <div class="twin-stat-block">
          <div class="twin-stat-number">1/3</div>
          <div class="twin-stat-content">
            <div class="twin-stat-label">Of all project data is lost by handover. Owners spend $10.6 billion annually to recover information that should have been structured from the start.</div>
            <a href="https://nvlpubs.nist.gov/nistpubs/gcr/2004/nist.gcr.04-867.pdf" target="_blank" rel="noopener" class="twin-stat-source">NIST GCR 04-867 (2004)</a>
          </div>
        </div>
        <div class="twin-stat-block">
          <div class="twin-stat-number">2-4<span>%</span></div>
          <div class="twin-stat-content">
            <div class="twin-stat-label">Of total project cost spent by owner-operators to manually correct, re-enter, and validate O&amp;M information that arrived incomplete, inconsistent, or in the wrong format.</div>
            <a href="https://www.mimosa.org/2011/07/21/problems-with-information-handover/" target="_blank" rel="noopener" class="twin-stat-source">FIATECH / MIMOSA (2011)</a>
          </div>
        </div>
        <div class="twin-stat-block">
          <div class="twin-stat-number">15.8<span>B</span></div>
          <div class="twin-stat-content">
            <div class="twin-stat-label">Annual cost of inadequate interoperability in the U.S. capital facilities industry \u2014 two-thirds borne by owners and operators during the operations and maintenance phase.</div>
            <a href="https://www.nist.gov/publications/inadequate-interoperability-closer-look-costs" target="_blank" rel="noopener" class="twin-stat-source">NIST / RTI International (2004)</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT \u2014 Scrolling failure cards -->
    <div class="twin-problem-right">
      <div class="twin-failure-card" data-twin-fc>
        <div class="twin-fc-accent"></div>
        <div class="twin-fc-side"></div>
        <div class="twin-fc-header">
          <span class="twin-fc-number">Failure Mode 01</span>
          <span class="twin-fc-tag">Timing</span>
        </div>
        <h3>Handover As An Afterthought</h3>
        <p>The project spends three years generating models, inspection records, submittals, and specifications \u2014 then compresses handover into the final six weeks when budgets are exhausted and teams are demobilising. Data is reconstructed from scattered files, email threads, and personal hard drives. The asset information model is assembled retroactively from whatever can be found, not progressively from what was verified. By the time anyone asks what the owner actually needs, it\u2019s too late to build it properly.</p>
      </div>

      <div class="twin-failure-card" data-twin-fc>
        <div class="twin-fc-accent"></div>
        <div class="twin-fc-side"></div>
        <div class="twin-fc-header">
          <span class="twin-fc-number">Failure Mode 02</span>
          <span class="twin-fc-tag">Model Decay</span>
        </div>
        <h3>Models That Stop At Construction</h3>
        <p>The design model was coordinated, clashed, and approved. Then construction happened. Routing changed. Products were substituted. Field conditions forced adjustments. None of it went back into the model. By handover, the BIM is a snapshot of design intent \u2014 not a record of what was built. The as-built model doesn\u2019t reflect reality because nobody maintained it through construction. The digital asset and the physical asset diverged months ago, and the gap was never closed.</p>
      </div>

      <div class="twin-failure-card" data-twin-fc>
        <div class="twin-fc-accent"></div>
        <div class="twin-fc-side"></div>
        <div class="twin-fc-header">
          <span class="twin-fc-number">Failure Mode 03</span>
          <span class="twin-fc-tag">Data Format</span>
        </div>
        <h3>COBie Non-Compliance</h3>
        <p>The contract requires COBie. The team delivers a spreadsheet with half the fields empty, types misclassified, and spaces that don\u2019t match the model. Asset attributes are incomplete \u2014 no serial numbers, no warranty dates, no maintenance intervals. The FM team receives a dataset they can\u2019t import into their CAFM system without months of manual cleanup. COBie compliance isn\u2019t a checkbox at the end \u2014 it\u2019s a data structure that must be built progressively from design through commissioning.</p>
      </div>

      <div class="twin-failure-card" data-twin-fc>
        <div class="twin-fc-accent"></div>
        <div class="twin-fc-side"></div>
        <div class="twin-fc-header">
          <span class="twin-fc-number">Failure Mode 04</span>
          <span class="twin-fc-tag">Traceability</span>
        </div>
        <h3>No Chain Of Custody</h3>
        <p>An air handling unit is installed on level 3. Can you trace it back through the inspection that verified it, the submittal that approved it, the specification that defined it, and the procurement record that sourced it? On most projects, the answer is no. Inspection records are in one system, submittals in another, specifications in a third. The asset exists in the model but the evidence trail that proves it was correctly specified, procured, installed, and inspected doesn\u2019t connect.</p>
      </div>

      <div class="twin-failure-card" data-twin-fc>
        <div class="twin-fc-accent"></div>
        <div class="twin-fc-side"></div>
        <div class="twin-fc-header">
          <span class="twin-fc-number">Failure Mode 05</span>
          <span class="twin-fc-tag">Operations</span>
        </div>
        <h3>FM Systems Can\u2019t Read What You Delivered</h3>
        <p>The owner\u2019s facility management team runs Maximo, or Archibus, or FM:Systems. They need structured asset data with classification codes, maintenance schedules, warranty information, and spatial references. What they receive is a Revit model they can\u2019t open, a folder of PDFs with no naming convention, and a COBie sheet that doesn\u2019t map to their system taxonomy. The data exists somewhere \u2014 but not in a format, structure, or level of completeness that operations can actually use.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var left = document.getElementById('twin-problem-left');
  if (left) {
    left.style.opacity = '0';
    left.style.transform = 'translateY(20px)';
    var obsL = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          left.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
          left.style.opacity = '1';
          left.style.transform = 'translateY(0)';
          obsL.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsL.observe(left);
  }

  var cards = document.querySelectorAll('[data-twin-fc]');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 200 + (i * 120));
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(card);
  });

  var stats = document.querySelectorAll('.twin-stat-block');
  stats.forEach(function(stat, i) {
    stat.style.opacity = '0';
    stat.style.transform = 'translateX(-16px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateX(0)';
          }, i * 150);
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(stat);
  });
})();`;

export default function TwinProblem() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const s = document.createElement('script');
    s.textContent = script;
    el.appendChild(s);
    return () => { obs.disconnect(); if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);
  return (
    <div ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
