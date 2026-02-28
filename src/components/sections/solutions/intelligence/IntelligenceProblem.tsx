'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .intel-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .intel-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .intel-problem-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  /* ═══════════════════════════════════
     LEFT COLUMN — Starts higher, sticky
     ═══════════════════════════════════ */
  .intel-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .intel-problem-eyebrow {
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

  .intel-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .intel-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .intel-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .intel-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .intel-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* ── Stat blocks ── */
  .intel-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .intel-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .intel-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .intel-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .intel-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .intel-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .intel-stat-source {
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

  .intel-stat-source:hover {
    color: #47B5FF;
  }

  .intel-stat-source::before {
    content: '\u2197';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .intel-stat-source:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════
     RIGHT COLUMN — Starts lower with top pad
     ═══════════════════════════════════ */
  .intel-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .intel-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-failure-card::before {
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

  .intel-failure-card::after {
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

  .intel-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .intel-failure-card:hover::before,
  .intel-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .intel-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .intel-failure-card:hover .intel-fc-accent {
    width: 100%;
  }

  .intel-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #47B5FF, rgba(71,181,255,0.1));
    transition: height 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .intel-failure-card:hover .intel-fc-side {
    height: 100%;
  }

  .intel-fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .intel-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .intel-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.12);
    padding: 3px 12px;
  }

  .intel-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .intel-failure-card:hover h3 {
    color: #47B5FF;
  }

  .intel-failure-card p {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    color: #3d5a73;
    margin: 0;
  }

  /* ═══════════════════════════════════
     Responsive
     ═══════════════════════════════════ */
  @media (max-width: 960px) {
    .intel-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .intel-problem-left {
      position: relative;
      top: auto;
    }
    .intel-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .intel-problem {
      padding: 80px 20px 100px;
    }
    .intel-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .intel-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="intel-problem">
  <div class="intel-problem-inner">

    <!-- LEFT \u2014 Sticky column (starts higher) -->
    <div class="intel-problem-left" id="intel-problem-left">
      <div class="intel-problem-eyebrow">The Cost of Flying Blind</div>
      <h2>Models Don\u2019t Fail<br>From Lack Of <em>Software</em></h2>
      <p class="intel-problem-text">
        They fail from lack of intelligence. When models carry no embedded data, coordination is reactive, file compliance goes unchecked, and reporting is manual \u2014 every decision on the programme is made on assumptions, not information. It\u2019s not just the geometry that\u2019s unintelligent. It\u2019s the CDE, the issues log, the naming compliance, the clash reports nobody reads, and the quantities nobody trusts. <strong>Intelligence means every piece of project data \u2014 graphical and non-graphical \u2014 is verified, queryable, and decision-ready.</strong>
      </p>

      <div class="intel-problem-stats">
        <div class="intel-stat-block">
          <div class="intel-stat-number">30<span>%</span></div>
          <div class="intel-stat-content">
            <div class="intel-stat-label">Of construction work is rework \u2014 driven by uncoordinated models, design-field divergence, and clashes discovered after installation begins.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="intel-stat-source">McKinsey Global Institute (2017)</a>
          </div>
        </div>
        <div class="intel-stat-block">
          <div class="intel-stat-number">52<span>%</span></div>
          <div class="intel-stat-content">
            <div class="intel-stat-label">Of rework is caused by poor project data and miscommunication \u2014 not field errors. The problem originates in the model, not on the slab.</div>
            <a href="https://www.autodesk.com/resources/bim-rework" target="_blank" rel="noopener" class="intel-stat-source">Autodesk / FMI (2018)</a>
          </div>
        </div>
        <div class="intel-stat-block">
          <div class="intel-stat-number">5<span>-15%</span></div>
          <div class="intel-stat-content">
            <div class="intel-stat-label">Of total project cost is consumed by rework \u2014 representing billions in preventable loss across the global construction industry every year.</div>
            <a href="https://www.planradar.com/us/cost-of-rework-construction/" target="_blank" rel="noopener" class="intel-stat-source">CII / PlanRadar Research (2024)</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT \u2014 Scrolling failure cards (starts lower) -->
    <div class="intel-problem-right">
      <div class="intel-failure-card" data-intel-fc>
        <div class="intel-fc-accent"></div>
        <div class="intel-fc-side"></div>
        <div class="intel-fc-header">
          <span class="intel-fc-number">Failure Mode 01</span>
          <span class="intel-fc-tag">Modelling</span>
        </div>
        <h3>Models Without Standards</h3>
        <p>Geometry exists but carries no embedded data \u2014 no parameters, no classification, no structured naming. The model looks complete on screen but is informationally empty. QTO requires manual counting, downstream teams can\u2019t filter or query, and the CDE is full of files that nobody can validate because the data architecture was never defined at the element level.</p>
      </div>

      <div class="intel-failure-card" data-intel-fc>
        <div class="intel-fc-accent"></div>
        <div class="intel-fc-side"></div>
        <div class="intel-fc-header">
          <span class="intel-fc-number">Failure Mode 02</span>
          <span class="intel-fc-tag">Coordination</span>
        </div>
        <h3>Reactive Coordination</h3>
        <p>Clash detection happens after design is frozen, not during development. Issues are logged but never tracked to resolution \u2014 the coordination report shows 4,000 clashes, but nobody knows which are critical, which are duplicates, and which were resolved last week. Clashes become RFIs instead of being resolved in-model, and every unresolved conflict costs an average of $1,500+ in field rework.</p>
      </div>

      <div class="intel-failure-card" data-intel-fc>
        <div class="intel-fc-accent"></div>
        <div class="intel-fc-side"></div>
        <div class="intel-fc-header">
          <span class="intel-fc-number">Failure Mode 03</span>
          <span class="intel-fc-tag">Reality Capture</span>
        </div>
        <h3>No Reality Verification</h3>
        <p>As-built conditions are assumed, not captured. The design model says one thing, the field says another, and nobody reconciles until a pipe hits a beam that wasn\u2019t where the drawings showed it. Scan data may exist but was never registered to the model. Design and reality diverge silently \u2014 and the cost compounds with every trade that installs against wrong assumptions.</p>
      </div>

      <div class="intel-failure-card" data-intel-fc>
        <div class="intel-fc-accent"></div>
        <div class="intel-fc-side"></div>
        <div class="intel-fc-header">
          <span class="intel-fc-number">Failure Mode 04</span>
          <span class="intel-fc-tag">Verification</span>
        </div>
        <h3>Quantity Extraction Chaos</h3>
        <p>The estimator pulls quantities from the model and gets numbers that don\u2019t match the specification. Elements are duplicated, unclassified, or missing parameter data. QTO becomes a manual reconciliation exercise between the model, the spreadsheet, and the drawings \u2014 three sources that should be one. The model was supposed to be the single source of truth. It isn\u2019t.</p>
      </div>

      <div class="intel-failure-card" data-intel-fc>
        <div class="intel-fc-accent"></div>
        <div class="intel-fc-side"></div>
        <div class="intel-fc-header">
          <span class="intel-fc-number">Failure Mode 05</span>
          <span class="intel-fc-tag">Cross-Cutting</span>
        </div>
        <h3>No Decision Intelligence</h3>
        <p>Nobody checks whether models meet the BEP, LOD matrix, or EIR before they\u2019re shared. File naming compliance is unmonitored. CDE status codes are ignored. Clash reports go unread. The programme has data everywhere and intelligence nowhere \u2014 so decisions are made on gut feel, not verified information. By handover, the owner discovers that the data they were contractually promised was never embedded, never validated, and never real.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Left column \u2014 fast entrance */
  var left = document.getElementById('intel-problem-left');
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

  /* Right cards \u2014 staggered */
  var cards = document.querySelectorAll('[data-intel-fc]');
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

  /* Stat blocks \u2014 staggered slide-in */
  var stats = document.querySelectorAll('.intel-stat-block');
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

export default function IntelligenceProblem() {
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
