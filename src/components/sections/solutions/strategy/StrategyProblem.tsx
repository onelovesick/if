'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .str-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .str-problem-inner {
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
  .str-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .str-problem-eyebrow {
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

  .str-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .str-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .str-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* ── Stat blocks ── */
  .str-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .str-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .str-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .str-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .str-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .str-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .str-stat-source {
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

  .str-stat-source:hover {
    color: #47B5FF;
  }

  .str-stat-source::before {
    content: '↗';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .str-stat-source:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════
     RIGHT COLUMN — Starts lower with top pad
     ═══════════════════════════════════ */
  .str-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .str-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .str-failure-card::before {
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

  .str-failure-card::after {
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

  .str-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .str-failure-card:hover::before,
  .str-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .str-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .str-failure-card:hover .str-fc-accent {
    width: 100%;
  }

  .str-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #47B5FF, rgba(71,181,255,0.1));
    transition: height 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .str-failure-card:hover .str-fc-side {
    height: 100%;
  }

  .str-fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .str-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.5);
  }

  .str-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.12);
    padding: 3px 12px;
  }

  .str-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .str-failure-card:hover h3 {
    color: #47B5FF;
  }

  .str-failure-card p {
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
    .str-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .str-problem-left {
      position: relative;
      top: auto;
    }
    .str-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .str-problem {
      padding: 80px 20px 100px;
    }
    .str-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .str-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="str-problem">
  <div class="str-problem-inner">

    <!-- LEFT — Sticky column (starts higher) -->
    <div class="str-problem-left" id="str-problem-left">
      <div class="str-problem-eyebrow">The Cost of No Strategy</div>
      <h2>Projects Don't Fail<br>From Lack Of <em>Tools</em></h2>
      <p class="str-problem-text">
        They fail from lack of structure. When teams skip the strategic layer — jumping straight into modelling without defined information requirements, without a BEP, without clear governance — every downstream decision is built on assumption. <strong>The data is unambiguous.</strong>
      </p>

      <div class="str-problem-stats">
        <div class="str-stat-block">
          <div class="str-stat-number">$177<span>B</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Lost annually in the U.S. to rework, conflict resolution, and searching for project data.</div>
            <a href="https://www.forconstructionpros.com/business/business-services/financing-insurance-leasing/press-release/21015974/plangrid-poor-communication-rework-bad-data-management-cost-construction-industry-177b-annually" target="_blank" rel="noopener" class="str-stat-source">FMI / Autodesk — Construction Disconnected (2018)</a>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">52<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Of all construction rework is caused by poor project data and miscommunication — not field errors.</div>
            <a href="https://www.forconstructionpros.com/business/business-services/financing-insurance-leasing/press-release/21015974/plangrid-poor-communication-rework-bad-data-management-cost-construction-industry-177b-annually" target="_blank" rel="noopener" class="str-stat-source">FMI / Autodesk — Construction Disconnected (2018)</a>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">1<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Annual productivity growth in construction over 20 years — vs. 3.6% in manufacturing.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="str-stat-source">McKinsey Global Institute — Reinventing Construction (2017)</a>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">80<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Of large construction projects exceed budgets by 20% or more — driven by poor data, not poor labour.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="str-stat-source">McKinsey Global Institute (2017)</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT — Scrolling failure cards (starts lower) -->
    <div class="str-problem-right">
      <div class="str-failure-card" data-fc>
        <div class="str-fc-accent"></div>
        <div class="str-fc-side"></div>
        <div class="str-fc-header">
          <span class="str-fc-number">Failure Mode 01</span>
          <span class="str-fc-tag">Governance</span>
        </div>
        <h3>Undefined Information Requirements</h3>
        <p>No EIR means no measurable expectations. Teams model what they assume is needed — not what the contract, the owner, or operations actually demand. The result is misaligned deliverables, scope disputes, and handover rejection.</p>
      </div>

      <div class="str-failure-card" data-fc>
        <div class="str-fc-accent"></div>
        <div class="str-fc-side"></div>
        <div class="str-fc-header">
          <span class="str-fc-number">Failure Mode 02</span>
          <span class="str-fc-tag">Documentation</span>
        </div>
        <h3>BEP As a Filing Exercise</h3>
        <p>Most BIM execution plans are copied templates that no one follows. A functional BEP is a live governance document that reflects how your team actually works — responsibilities, exchanges, LOD, and coordination protocols defined with precision.</p>
      </div>

      <div class="str-failure-card" data-fc>
        <div class="str-fc-accent"></div>
        <div class="str-fc-side"></div>
        <div class="str-fc-header">
          <span class="str-fc-number">Failure Mode 03</span>
          <span class="str-fc-tag">Adoption</span>
        </div>
        <h3>Digital Tools Without a Mandate</h3>
        <p>Software gets procured. Platforms get deployed. But without a strategic framework linking tools to project outcomes, adoption stalls and data fragments. The $177B loss isn't from missing technology — it's from ungoverned technology.</p>
      </div>

      <div class="str-failure-card" data-fc>
        <div class="str-fc-accent"></div>
        <div class="str-fc-side"></div>
        <div class="str-fc-header">
          <span class="str-fc-number">Failure Mode 04</span>
          <span class="str-fc-tag">Handover</span>
        </div>
        <h3>Handover As an Afterthought</h3>
        <p>If asset information requirements aren't defined at inception, handover becomes a frantic data-gathering exercise instead of a structured delivery milestone. Operations teams inherit chaos — not an asset they can manage.</p>
      </div>

      <div class="str-failure-card" data-fc>
        <div class="str-fc-accent"></div>
        <div class="str-fc-side"></div>
        <div class="str-fc-header">
          <span class="str-fc-number">Failure Mode 05</span>
          <span class="str-fc-tag">Alignment</span>
        </div>
        <h3>Misaligned Contracts & Expectations</h3>
        <p>When BIM requirements aren't embedded in contracts from day one, information delivery becomes voluntary. Disputes multiply, change orders compound, and the digital mandate loses all enforceability.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Left column — fast entrance */
  var left = document.getElementById('str-problem-left');
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

  /* Right cards — staggered */
  var cards = document.querySelectorAll('[data-fc]');
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

  /* Stat blocks — staggered slide-in */
  var stats = document.querySelectorAll('.str-stat-block');
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

export default function StrategyProblem() {
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
