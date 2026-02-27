'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: hidden;
  }

  /* Subtle texture */
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
    gap: 72px;
    align-items: start;
  }

  /* ── LEFT COLUMN — Sticky ── */
  .str-problem-left {
    position: sticky;
    top: 120px;
    align-self: start;
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
    grid-template-columns: 100px 1fr;
    gap: 20px;
    align-items: start;
  }

  .str-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 38px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .str-stat-number span {
    font-size: 20px;
    color: #47B5FF;
    font-weight: 800;
  }

  .str-stat-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .str-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.4;
  }

  .str-stat-source {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(90,122,150,0.6);
  }

  .str-stat-source a {
    color: rgba(71,181,255,0.7);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .str-stat-source a:hover {
    color: #47B5FF;
  }

  /* ── RIGHT COLUMN — Scrolling failure cards ── */
  .str-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .str-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 32px 32px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  /* Corner brackets */
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

  /* Accent top line draw */
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

  /* Left border accent — alive state */
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
    margin-bottom: 14px;
  }

  .str-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.45);
  }

  .str-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.1);
    padding: 2px 10px;
    border-radius: 0;
  }

  .str-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .str-failure-card:hover h3 {
    color: #47B5FF;
  }

  .str-failure-card p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    color: #5a7a96;
    margin: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 960px) {
    .str-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .str-problem-left {
      position: relative;
      top: auto;
    }
    .str-stat-block {
      grid-template-columns: 80px 1fr;
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
      font-size: 32px;
    }
  }
</style>

<section class="str-problem">
  <div class="str-problem-inner">

    <!-- LEFT — Sticky column -->
    <div class="str-problem-left">
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
            <div class="str-stat-source">FMI / Autodesk — "Construction Disconnected" (2018)</div>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">52<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Of all construction rework is caused by poor project data and miscommunication — not field errors.</div>
            <div class="str-stat-source">FMI / Autodesk — "Construction Disconnected" (2018)</div>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">1<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Annual productivity growth in construction over 20 years — vs. 3.6% in manufacturing.</div>
            <div class="str-stat-source">McKinsey Global Institute — "Reinventing Construction" (2017)</div>
          </div>
        </div>
        <div class="str-stat-block">
          <div class="str-stat-number">80<span>%</span></div>
          <div class="str-stat-content">
            <div class="str-stat-label">Of large construction projects exceed budgets by 20% or more — driven by poor data, not poor labour.</div>
            <div class="str-stat-source">McKinsey Global Institute (2017)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT — Scrolling failure cards -->
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
  /* Staggered card entrance */
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
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(card);
  });

  /* Stat number count-up animation */
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
