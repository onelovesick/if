'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .ins-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .ins-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .ins-problem-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  /* \u2550\u2550\u2550 LEFT COLUMN \u2014 Sticky \u2550\u2550\u2550 */
  .ins-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .ins-problem-eyebrow {
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

  .ins-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .ins-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .ins-problem h2 em {
    font-style: italic;
    color: #47B5FF;
    margin-right: 0.08em;
  }

  .ins-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .ins-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* \u2550\u2550\u2550 Stat blocks \u2550\u2550\u2550 */
  .ins-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .ins-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .ins-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .ins-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .ins-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ins-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .ins-stat-source {
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

  .ins-stat-source:hover {
    color: #47B5FF;
  }

  .ins-stat-source::before {
    content: '\u2197';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .ins-stat-source:hover::before {
    opacity: 1;
  }

  /* \u2550\u2550\u2550 RIGHT COLUMN \u2014 Scrolling failure cards \u2550\u2550\u2550 */
  .ins-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .ins-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .ins-failure-card::before {
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

  .ins-failure-card::after {
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

  .ins-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .ins-failure-card:hover::before,
  .ins-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .ins-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.15));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .ins-failure-card:hover .ins-fc-accent {
    width: 100%;
  }

  .ins-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: rgba(71,181,255,0.4);
    transition: height 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .ins-failure-card:hover .ins-fc-side {
    height: 100%;
  }

  .ins-fc-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .ins-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .ins-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.5);
    padding: 3px 12px;
    border: 1px solid rgba(11,60,93,0.08);
  }

  .ins-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 19px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .ins-failure-card:hover h3 {
    color: #47B5FF;
  }

  .ins-failure-card p {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    color: #3d5a73;
    margin: 0;
  }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 960px) {
    .ins-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .ins-problem-left {
      position: relative;
      top: auto;
    }
    .ins-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .ins-problem {
      padding: 80px 20px 100px;
    }
    .ins-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .ins-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="ins-problem">
  <div class="ins-problem-inner">

    <!-- LEFT \u2014 Sticky column -->
    <div class="ins-problem-left" id="ins-problem-left">
      <div class="ins-problem-eyebrow">The Visibility Gap</div>
      <h2>Your Projects Generate Data.<br>Nobody Can <em>See</em> It.</h2>
      <p class="ins-problem-text">
        Construction projects produce enormous volumes of data \u2014 models, schedules, cost reports, inspection logs, quality records, compliance documents. But without structured analytics, the data sits in silos that nobody cross-references, trusts, or acts on. Monthly reports arrive late, based on data that was already stale when collected. Dashboards show fragments of a picture that no stakeholder can assemble into a decision. <strong>The visibility gap isn\u2019t a data problem. It\u2019s an analytics architecture problem that compounds through every phase.</strong>
      </p>

      <div class="ins-problem-stats">
        <div class="ins-stat-block">
          <div class="ins-stat-number">96<span>%</span></div>
          <div class="ins-stat-content">
            <div class="ins-stat-label">Of all data generated in construction and engineering goes unused. Data volume doubled between 2019 and 2021 \u2014 but analytics capability didn\u2019t follow.</div>
            <a href="https://fmicorp.com/insights/quick-reads/harnessing-the-data-advantage-in-engineering-and-construction" target="_blank" rel="noopener" class="ins-stat-source">FMI / Autodesk \u2014 Harnessing the Data Advantage in E&amp;C</a>
          </div>
        </div>
        <div class="ins-stat-block">
          <div class="ins-stat-number">1.85<span>T</span></div>
          <div class="ins-stat-content">
            <div class="ins-stat-label">Estimated global cost of poor data management in construction in a single year. Bad data drives bad decisions \u2014 rework, disputes, schedule overruns.</div>
            <a href="https://fmicorp.com/insights/quick-reads/harnessing-the-data-advantage-in-engineering-and-construction" target="_blank" rel="noopener" class="ins-stat-source">FMI / Autodesk \u2014 3,900 Industry Leaders Survey</a>
          </div>
        </div>
        <div class="ins-stat-block">
          <div class="ins-stat-number">33<span>%</span></div>
          <div class="ins-stat-content">
            <div class="ins-stat-label">Of firms that collect financial data actually analyse it and use it for decision-making. The rest collect data they never act on.</div>
            <a href="https://www.autodesk.com/blogs/construction/state-of-data-capabilities-in-construction/" target="_blank" rel="noopener" class="ins-stat-source">Autodesk / Deloitte \u2014 State of Data Capabilities in Construction</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT \u2014 Scrolling failure cards -->
    <div class="ins-problem-right">
      <div class="ins-failure-card" data-ins-fc>
        <div class="ins-fc-accent"></div>
        <div class="ins-fc-side"></div>
        <div class="ins-fc-header">
          <span class="ins-fc-number">Failure Mode 01</span>
          <span class="ins-fc-tag">Fragmentation</span>
        </div>
        <h3>Disconnected Dashboards</h3>
        <p>Every discipline builds its own reports in its own format. Schedule data lives in Primavera, cost data in Excel, quality in another platform, safety in a spreadsheet nobody updates. No single view. No cross-referencing. Stakeholders see fragments of the project \u2014 never the full picture. When leadership asks for a status update, three teams produce three different answers from three different datasets.</p>
      </div>

      <div class="ins-failure-card" data-ins-fc>
        <div class="ins-fc-accent"></div>
        <div class="ins-fc-side"></div>
        <div class="ins-fc-header">
          <span class="ins-fc-number">Failure Mode 02</span>
          <span class="ins-fc-tag">Model Quality</span>
        </div>
        <h3>Models Delivered Without Validation</h3>
        <p>BIM models are delivered and accepted without systematic auditing. Nobody checks naming conventions, classification compliance, LOD adherence, or data completeness against EIR requirements until it\u2019s too late \u2014 at handover, when the asset operator discovers years of accumulated errors. The model looked correct. The data inside it was never validated.</p>
      </div>

      <div class="ins-failure-card" data-ins-fc>
        <div class="ins-fc-accent"></div>
        <div class="ins-fc-side"></div>
        <div class="ins-fc-header">
          <span class="ins-fc-number">Failure Mode 03</span>
          <span class="ins-fc-tag">Cost Blindness</span>
        </div>
        <h3>Cost Data Without Model Context</h3>
        <p>Budget reports exist but don\u2019t connect to the model. Quantities are re-extracted manually every reporting cycle. Cost variances surface months late. Earned value is calculated on spreadsheets nobody trusts \u2014 because the data feeding them is already outdated. The 5D dimension that should link geometry to money is absent, and nobody notices until the overrun is irreversible.</p>
      </div>

      <div class="ins-failure-card" data-ins-fc>
        <div class="ins-fc-accent"></div>
        <div class="ins-fc-side"></div>
        <div class="ins-fc-header">
          <span class="ins-fc-number">Failure Mode 04</span>
          <span class="ins-fc-tag">Compliance</span>
        </div>
        <h3>Compliance By Assumption</h3>
        <p>ISO 19650 compliance is claimed, not measured. EIR requirements are buried in procurement documents that nobody cross-references against actual deliverables. Nobody scores BEP adherence. When audits come, teams scramble to assemble evidence that should have been tracked continuously. Compliance isn\u2019t binary \u2014 it\u2019s a spectrum, and without scoring, you don\u2019t know where you sit.</p>
      </div>

      <div class="ins-failure-card" data-ins-fc>
        <div class="ins-fc-accent"></div>
        <div class="ins-fc-side"></div>
        <div class="ins-fc-header">
          <span class="ins-fc-number">Failure Mode 05</span>
          <span class="ins-fc-tag">Reporting Lag</span>
        </div>
        <h3>Monthly Reports, Monthly Late</h3>
        <p>Monthly reports arrive two weeks after the reporting period, based on data that was already stale when collected. By the time leadership sees a variance, the opportunity to correct it has passed. The project runs on reactive management because the reporting cadence is slower than the pace of construction. Real-time data exists in the tools \u2014 but nobody has built the pipeline to make it visible.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var left = document.getElementById('ins-problem-left');
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

  var cards = document.querySelectorAll('[data-ins-fc]');
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

  var stats = document.querySelectorAll('.ins-stat-block');
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

export default function InsightsProblem() {
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
