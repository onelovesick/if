'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-problem__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .str-problem__eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .str-problem__eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-problem__heading {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 3.4vw, 42px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 16px;
    max-width: 700px;
  }

  .str-problem__heading em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-problem__intro {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.75;
    color: #5a7a96;
    max-width: 660px;
    margin: 0 0 56px;
  }

  .str-problem__intro strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  .str-problem__grid {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 64px;
    align-items: start;
  }

  /* ── Left column — sticky stats ── */
  .str-problem__left {
    position: sticky;
    top: 120px;
  }

  .str-problem__stats {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .str-problem__stat {
    position: relative;
    padding: 28px 24px;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.09);
  }

  .str-problem__stat::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-top: 2px solid rgba(71,181,255,0.3);
    border-left: 2px solid rgba(71,181,255,0.3);
  }

  .str-problem__stat::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid rgba(71,181,255,0.3);
    border-right: 2px solid rgba(71,181,255,0.3);
  }

  .str-problem__stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 42px;
    color: #0B3C5D;
    line-height: 1;
    margin-bottom: 10px;
  }

  .str-problem__stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #5a7a96;
    line-height: 1.55;
    margin-bottom: 12px;
  }

  .str-problem__stat-source {
    display: block;
  }

  .str-problem__stat-source a {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.06em;
    color: rgba(90,122,150,0.55);
    text-decoration: none;
    transition: color 0.3s;
  }

  .str-problem__stat-source a:hover {
    color: #47B5FF;
  }

  /* ── Right column — failure cards ── */
  .str-problem__right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .str-problem__card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.09);
    padding: 32px 28px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: default;
  }

  .str-problem__card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #47B5FF;
    transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  .str-problem__card:hover::before {
    width: 100%;
  }

  .str-problem__card:hover {
    box-shadow: 0 8px 32px rgba(11,60,93,0.08);
    transform: translateY(-2px);
  }

  .str-problem__card-top {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 4px;
  }

  .str-problem__card-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .str-problem__card-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(90,122,150,0.6);
  }

  .str-problem__card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #0B3C5D;
    line-height: 1.25;
    margin: 12px 0 14px;
  }

  .str-problem__card-body {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    color: #5a7a96;
  }

  @media (max-width: 960px) {
    .str-problem__grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .str-problem__left {
      position: static;
    }

    .str-problem__stats {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 16px;
    }

    .str-problem__stat {
      flex: 1;
      min-width: 240px;
    }
  }

  @media (max-width: 768px) {
    .str-problem {
      padding: 80px 20px;
    }

    .str-problem__stat-number {
      font-size: 32px;
    }

    .str-problem__card {
      padding: 24px 20px;
    }

    .str-problem__stats {
      flex-direction: column;
    }

    .str-problem__stat {
      min-width: unset;
    }
  }
</style>

<section class="str-problem">
  <div class="str-problem__container">
    <div class="str-problem__eyebrow">The Cost of No Structure</div>
    <h2 class="str-problem__heading">
      Models Don't Fail From Lack Of <em>Software</em>
    </h2>
    <p class="str-problem__intro">
      They fail from lack of organisation. When teams skip the structural layer — deploying a CDE without governance, modelling without naming conventions, exchanging files without classification — every downstream coordination is built on sand. <strong>The data is unambiguous.</strong>
    </p>

    <div class="str-problem__grid">
      <div class="str-problem__left">
        <div class="str-problem__stats" id="str-stats">
          <div class="str-problem__stat">
            <div class="str-problem__stat-number" data-target="35" data-suffix="%">0%</div>
            <div class="str-problem__stat-label">Of project time is spent searching for information rather than using it — driven by poor naming and folder structures.</div>
            <span class="str-problem__stat-source"><a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">McKinsey Global Institute (2017)</a></span>
          </div>
          <div class="str-problem__stat">
            <div class="str-problem__stat-number" data-target="50" data-suffix="%">0%</div>
            <div class="str-problem__stat-label">Of BIM data is lost or degraded during exchange between platforms due to undefined IFC mapping and export standards.</div>
            <span class="str-problem__stat-source"><a href="https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/" target="_blank" rel="noopener">buildingSMART / IFC Implementation Studies</a></span>
          </div>
          <div class="str-problem__stat">
            <div class="str-problem__stat-number" data-target="98" data-suffix="%">0%</div>
            <div class="str-problem__stat-label">Of large projects exceed their budgets — poor data structure compounds rework, miscommunication, and handover failure.</div>
            <span class="str-problem__stat-source"><a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener">McKinsey Global Institute (2017)</a></span>
          </div>
        </div>
      </div>

      <div class="str-problem__right" id="str-failures">
        <div class="str-problem__card">
          <div class="str-problem__card-top">
            <span class="str-problem__card-label">Failure Mode 01</span>
            <span class="str-problem__card-tag">Naming</span>
          </div>
          <h3>File Naming Anarchy</h3>
          <div class="str-problem__card-body">
            Hundreds of models across dozens of contributors, no naming convention enforced. Files are renamed on download, duplicated across folders, impossible to locate by anyone but their author. Versioning becomes guesswork. Contractual submissions fail audit because nobody can prove which file is current.
          </div>
        </div>

        <div class="str-problem__card">
          <div class="str-problem__card-top">
            <span class="str-problem__card-label">Failure Mode 02</span>
            <span class="str-problem__card-tag">CDE</span>
          </div>
          <h3>CDE Without Governance</h3>
          <div class="str-problem__card-body">
            The platform is deployed — ACC, ProjectWise, Procore — but without status codes, approval workflows, or folder structure logic. It becomes an expensive file dump. Teams revert to email and shared drives because the CDE creates friction instead of removing it. The tool was never the problem — the missing governance was.
          </div>
        </div>

        <div class="str-problem__card">
          <div class="str-problem__card-top">
            <span class="str-problem__card-label">Failure Mode 03</span>
            <span class="str-problem__card-tag">LOD / LOI</span>
          </div>
          <h3>LOD/LOI With No Project Definition</h3>
          <div class="str-problem__card-body">
            Contracts reference LOD 300 or LOD 350 with no project-specific matrix. The architect models door hardware at LOD 400 while the structural engineer delivers foundation piles at LOD 200. Nobody agrees on what level of detail or information is required at which milestone — coordination collapses at every review gate.
          </div>
        </div>

        <div class="str-problem__card">
          <div class="str-problem__card-top">
            <span class="str-problem__card-label">Failure Mode 04</span>
            <span class="str-problem__card-tag">Classification</span>
          </div>
          <h3>No Consistent Classification System</h3>
          <div class="str-problem__card-body">
            The mechanical engineer uses a proprietary element taxonomy, the architect classifies by Revit category, the civil team uses a spreadsheet. Data doesn't map between models, quantity take-offs require manual reconciliation, and nothing aligns with the owner's asset register or CMMS. Classification was never agreed — so interoperability was never possible.
          </div>
        </div>

        <div class="str-problem__card">
          <div class="str-problem__card-top">
            <span class="str-problem__card-label">Failure Mode 05</span>
            <span class="str-problem__card-tag">Exchange</span>
          </div>
          <h3>Exchange Format Chaos</h3>
          <div class="str-problem__card-body">
            IFC exports that strip parameters, proprietary formats that lock data inside one platform, MVDs that nobody defined. Interoperability is promised in the contract but never engineered. Models arrive in formats the coordination team can't read, and data fidelity degrades with every exchange cycle. The handover inherits every upstream format failure.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  /* ── Stat counter animation ── */
  var stats = document.querySelectorAll('.str-problem__stat-number');
  if (!stats.length) return;
  var animated = false;

  function animateStats() {
    if (animated) return;
    animated = true;
    stats.forEach(function(stat) {
      var target = parseInt(stat.getAttribute('data-target'));
      var suffix = stat.getAttribute('data-suffix') || '';
      var duration = 1600;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        stat.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  var statsSection = document.getElementById('str-stats');
  if (statsSection) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { animateStats(); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    obs.observe(statsSection);
  }

  /* ── Staggered card entrance ── */
  var cards = document.querySelectorAll('#str-failures .str-problem__card');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)';
    card.style.transitionDelay = (i * 120) + 'ms';
  });

  var failSection = document.getElementById('str-failures');
  if (failSection) {
    var obs2 = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          cards.forEach(function(card) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          obs2.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs2.observe(failSection);
  }
})();`;

export default function StructureProblem() {
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
