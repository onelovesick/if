'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .exec-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .exec-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .exec-problem-inner {
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
  .exec-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .exec-problem-eyebrow {
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

  .exec-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .exec-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .exec-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .exec-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .exec-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* ── Stat blocks ── */
  .exec-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .exec-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .exec-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .exec-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .exec-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .exec-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .exec-stat-source {
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

  .exec-stat-source:hover {
    color: #47B5FF;
  }

  .exec-stat-source::before {
    content: '\u2197';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .exec-stat-source:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════
     RIGHT COLUMN — Starts lower with top pad
     ═══════════════════════════════════ */
  .exec-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .exec-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .exec-failure-card::before {
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

  .exec-failure-card::after {
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

  .exec-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .exec-failure-card:hover::before,
  .exec-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .exec-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .exec-failure-card:hover .exec-fc-accent {
    width: 100%;
  }

  .exec-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #47B5FF, rgba(71,181,255,0.1));
    transition: height 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .exec-failure-card:hover .exec-fc-side {
    height: 100%;
  }

  .exec-fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .exec-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .exec-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.12);
    padding: 3px 12px;
  }

  .exec-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .exec-failure-card:hover h3 {
    color: #47B5FF;
  }

  .exec-failure-card p {
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
    .exec-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .exec-problem-left {
      position: relative;
      top: auto;
    }
    .exec-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .exec-problem {
      padding: 80px 20px 100px;
    }
    .exec-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .exec-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="exec-problem">
  <div class="exec-problem-inner">

    <!-- LEFT \u2014 Sticky column (starts higher) -->
    <div class="exec-problem-left" id="exec-problem-left">
      <div class="exec-problem-eyebrow">The Execution Gap</div>
      <h2>Your Model Is Ready.<br>Your <em>Site</em> Isn\u2019t.</h2>
      <p class="exec-problem-text">
        The model is coordinated, verified, and decision-ready. But the field doesn\u2019t use models \u2014 it uses schedules, work packages, inspection forms, and progress reports. When there\u2019s no bridge between the digital asset and physical construction, every dollar spent on BIM intelligence dies at the site gate. <strong>Execution means connecting verified project data to the crews, trades, and workflows that actually build.</strong>
      </p>

      <div class="exec-problem-stats">
        <div class="exec-stat-block">
          <div class="exec-stat-number">70<span>%</span></div>
          <div class="exec-stat-content">
            <div class="exec-stat-label">Of construction projects finish late \u2014 not from design failures, but from scheduling disconnects, sequencing conflicts, and field-level coordination gaps.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="exec-stat-source">McKinsey Global Institute (2017)</a>
          </div>
        </div>
        <div class="exec-stat-block">
          <div class="exec-stat-number">35<span>%</span></div>
          <div class="exec-stat-content">
            <div class="exec-stat-label">Of construction time is spent on non-productive activities \u2014 waiting for information, rework, and material handling caused by poor work packaging.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="exec-stat-source">McKinsey / KPMG (2017)</a>
          </div>
        </div>
        <div class="exec-stat-block">
          <div class="exec-stat-number">98<span>%</span></div>
          <div class="exec-stat-content">
            <div class="exec-stat-label">Of megaprojects experience cost overruns or delays \u2014 often because actual progress was never compared to planned progress at the element level.</div>
            <a href="https://www.pmi.org/learning/thought-leadership/pulse/pulse-of-the-profession-2023" target="_blank" rel="noopener" class="exec-stat-source">PMI Pulse of the Profession (2023)</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT \u2014 Scrolling failure cards (starts lower) -->
    <div class="exec-problem-right">
      <div class="exec-failure-card" data-exec-fc>
        <div class="exec-fc-accent"></div>
        <div class="exec-fc-side"></div>
        <div class="exec-fc-header">
          <span class="exec-fc-number">Failure Mode 01</span>
          <span class="exec-fc-tag">Scheduling</span>
        </div>
        <h3>Schedule Disconnected From Model</h3>
        <p>The programme lives in Primavera or MS Project. The model lives in Revit or Navisworks. Nobody links them. Construction sequences are planned in abstraction \u2014 no spatial validation, no phasing simulation, no visual verification of what gets built when. Sequence conflicts surface on site, not on screen, and every late discovery is a delay claim waiting to happen.</p>
      </div>

      <div class="exec-failure-card" data-exec-fc>
        <div class="exec-fc-accent"></div>
        <div class="exec-fc-side"></div>
        <div class="exec-fc-header">
          <span class="exec-fc-number">Failure Mode 02</span>
          <span class="exec-fc-tag">Work Packaging</span>
        </div>
        <h3>No Scoped Work Packages</h3>
        <p>Trades receive full federated models \u2014 500MB files with every discipline visible. The mechanical foreman scrolls through architectural walls looking for ductwork. The electrician can\u2019t isolate their scope. Information overload kills field productivity. Without trade-specific, zone-scoped work packages, the model is a liability on site, not a tool.</p>
      </div>

      <div class="exec-failure-card" data-exec-fc>
        <div class="exec-fc-accent"></div>
        <div class="exec-fc-side"></div>
        <div class="exec-fc-header">
          <span class="exec-fc-number">Failure Mode 03</span>
          <span class="exec-fc-tag">Issue Resolution</span>
        </div>
        <h3>Reactive Field Issues</h3>
        <p>Site issues get logged in emails, WhatsApp groups, and spreadsheets. There\u2019s no traceability back to the model element. The same conflict gets flagged three times by three different trades. Nobody knows which issues are open, which are resolved, and which are blocking the next pour. Field intelligence is lost because it was never captured in a system that connects to the project data.</p>
      </div>

      <div class="exec-failure-card" data-exec-fc>
        <div class="exec-fc-accent"></div>
        <div class="exec-fc-side"></div>
        <div class="exec-fc-header">
          <span class="exec-fc-number">Failure Mode 04</span>
          <span class="exec-fc-tag">Progress Tracking</span>
        </div>
        <h3>No Actual vs. Planned</h3>
        <p>Progress is reported by percentage \u2014 \u201cwe\u2019re 60% done\u201d \u2014 not by element. Nobody compares what was planned to what was actually installed. Variance is invisible until it becomes a delay claim. Earned value is calculated from spreadsheets, not from the model. The schedule says one thing, the site says another, and the owner finds out too late.</p>
      </div>

      <div class="exec-failure-card" data-exec-fc>
        <div class="exec-fc-accent"></div>
        <div class="exec-fc-side"></div>
        <div class="exec-fc-header">
          <span class="exec-fc-number">Failure Mode 05</span>
          <span class="exec-fc-tag">QA/QC</span>
        </div>
        <h3>Paper-Based Inspections</h3>
        <p>Inspections happen on clipboards and PDF checklists. Defects are photographed on personal phones with no geolocation, no model link, no element reference. Data never feeds back into the CDE. By handover, the contractor has a box of paper and the owner has no verified record of what was inspected, when, by whom, or against what standard. The QA/QC data that should prove compliance doesn\u2019t exist digitally.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Left column \u2014 fast entrance */
  var left = document.getElementById('exec-problem-left');
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
  var cards = document.querySelectorAll('[data-exec-fc]');
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
  var stats = document.querySelectorAll('.exec-stat-block');
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

export default function ExecutionProblem() {
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
