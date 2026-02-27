'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .stru-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 140px;
    overflow: visible;
  }

  .stru-problem::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .stru-problem-inner {
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
  .stru-problem-left {
    position: sticky;
    top: 110px;
    padding-top: 0;
  }

  .stru-problem-eyebrow {
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

  .stru-problem-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .stru-problem h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 3.8vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 28px 0;
  }

  .stru-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .stru-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #5a7a96;
    margin-bottom: 48px;
  }

  .stru-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* ── Stat blocks ── */
  .stru-problem-stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(11,60,93,0.1);
  }

  .stru-stat-block {
    padding: 28px 0;
    border-bottom: 1px solid rgba(11,60,93,0.08);
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 20px;
    align-items: start;
  }

  .stru-stat-number {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #0B3C5D;
  }

  .stru-stat-number span {
    font-size: 22px;
    color: #47B5FF;
    font-weight: 800;
  }

  .stru-stat-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stru-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #0B3C5D;
    line-height: 1.5;
  }

  .stru-stat-source {
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

  .stru-stat-source:hover {
    color: #47B5FF;
  }

  .stru-stat-source::before {
    content: '↗';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.6;
    transition: opacity 0.25s ease;
  }

  .stru-stat-source:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════
     RIGHT COLUMN — Starts lower with top pad
     ═══════════════════════════════════ */
  .stru-problem-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 52px;
  }

  .stru-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 36px 36px 34px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .stru-failure-card::before {
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

  .stru-failure-card::after {
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

  .stru-failure-card:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 12px 40px rgba(11,60,93,0.08);
    transform: translateY(-3px);
  }

  .stru-failure-card:hover::before,
  .stru-failure-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  .stru-fc-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .stru-failure-card:hover .stru-fc-accent {
    width: 100%;
  }

  .stru-fc-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #47B5FF, rgba(71,181,255,0.1));
    transition: height 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .stru-failure-card:hover .stru-fc-side {
    height: 100%;
  }

  .stru-fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .stru-fc-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
  }

  .stru-fc-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a7a96;
    border: 1px solid rgba(11,60,93,0.12);
    padding: 3px 12px;
  }

  .stru-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .stru-failure-card:hover h3 {
    color: #47B5FF;
  }

  .stru-failure-card p {
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
    .stru-problem-inner {
      grid-template-columns: 1fr;
      gap: 56px;
    }
    .stru-problem-left {
      position: relative;
      top: auto;
    }
    .stru-problem-right {
      padding-top: 0;
    }
  }

  @media (max-width: 480px) {
    .stru-problem {
      padding: 80px 20px 100px;
    }
    .stru-stat-block {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .stru-stat-number {
      font-size: 34px;
    }
  }
</style>

<section class="stru-problem">
  <div class="stru-problem-inner">

    <!-- LEFT — Sticky column (starts higher) -->
    <div class="stru-problem-left" id="stru-problem-left">
      <div class="stru-problem-eyebrow">The Cost of No Structure</div>
      <h2>Models Don't Fail<br>From Lack Of <em>Software</em></h2>
      <p class="stru-problem-text">
        They fail from lack of organisation. When teams deploy a CDE without governance, model without naming conventions, and exchange files without classification — every coordination effort is built on sand. <strong>The data is unambiguous.</strong>
      </p>

      <div class="stru-problem-stats">
        <div class="stru-stat-block">
          <div class="stru-stat-number">35<span>%</span></div>
          <div class="stru-stat-content">
            <div class="stru-stat-label">Of construction professionals' time is spent searching for project information rather than using it.</div>
            <a href="https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution" target="_blank" rel="noopener" class="stru-stat-source">McKinsey Global Institute (2017)</a>
          </div>
        </div>
        <div class="stru-stat-block">
          <div class="stru-stat-number">48<span>%</span></div>
          <div class="stru-stat-content">
            <div class="stru-stat-label">Of BIM model data is lost or degraded during exchange due to undefined IFC mapping and export standards.</div>
            <a href="https://technical.buildingsmart.org/standards/ifc/" target="_blank" rel="noopener" class="stru-stat-source">buildingSMART — IFC Implementation Studies</a>
          </div>
        </div>
        <div class="stru-stat-block">
          <div class="stru-stat-number">73<span>%</span></div>
          <div class="stru-stat-content">
            <div class="stru-stat-label">Of projects have no enforced naming convention — making file retrieval, version control, and audits unreliable.</div>
            <a href="https://www.thenbs.com/digital-construction-report" target="_blank" rel="noopener" class="stru-stat-source">NBS — Digital Construction Report</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT — Scrolling failure cards (starts lower) -->
    <div class="stru-problem-right">
      <div class="stru-failure-card" data-stru-fc>
        <div class="stru-fc-accent"></div>
        <div class="stru-fc-side"></div>
        <div class="stru-fc-header">
          <span class="stru-fc-number">Failure Mode 01</span>
          <span class="stru-fc-tag">Naming</span>
        </div>
        <h3>File Naming Anarchy</h3>
        <p>Hundreds of models across dozens of contributors, no naming convention enforced. Files are renamed on download, duplicated across folders, impossible to locate by anyone but their author. Versioning becomes guesswork. Contractual submissions fail audit because nobody can prove which file is current.</p>
      </div>

      <div class="stru-failure-card" data-stru-fc>
        <div class="stru-fc-accent"></div>
        <div class="stru-fc-side"></div>
        <div class="stru-fc-header">
          <span class="stru-fc-number">Failure Mode 02</span>
          <span class="stru-fc-tag">CDE</span>
        </div>
        <h3>CDE Without Governance</h3>
        <p>The platform is deployed — ACC, ProjectWise, Procore — but without status codes, approval workflows, or folder structure logic. It becomes an expensive file dump. Teams revert to email and shared drives because the CDE creates friction instead of removing it. The tool was never the problem. The missing governance was.</p>
      </div>

      <div class="stru-failure-card" data-stru-fc>
        <div class="stru-fc-accent"></div>
        <div class="stru-fc-side"></div>
        <div class="stru-fc-header">
          <span class="stru-fc-number">Failure Mode 03</span>
          <span class="stru-fc-tag">LOD / LOI</span>
        </div>
        <h3>LOD/LOI With No Project Definition</h3>
        <p>Contracts reference LOD 300 or LOD 350 with no project-specific matrix. The architect models door hardware at LOD 400 while the structural engineer delivers foundation piles at LOD 200. Nobody agrees on what level of detail or information is required at which milestone — coordination collapses at every review gate.</p>
      </div>

      <div class="stru-failure-card" data-stru-fc>
        <div class="stru-fc-accent"></div>
        <div class="stru-fc-side"></div>
        <div class="stru-fc-header">
          <span class="stru-fc-number">Failure Mode 04</span>
          <span class="stru-fc-tag">Classification</span>
        </div>
        <h3>No Consistent Classification System</h3>
        <p>The mechanical engineer uses a proprietary element taxonomy, the architect classifies by Revit category, the civil team uses a spreadsheet. Data doesn't map between models, quantity take-offs require manual reconciliation, and nothing aligns with the owner's asset register or CMMS. Classification was never agreed — so interoperability was never possible.</p>
      </div>

      <div class="stru-failure-card" data-stru-fc>
        <div class="stru-fc-accent"></div>
        <div class="stru-fc-side"></div>
        <div class="stru-fc-header">
          <span class="stru-fc-number">Failure Mode 05</span>
          <span class="stru-fc-tag">Exchange</span>
        </div>
        <h3>Exchange Format Chaos</h3>
        <p>IFC exports that strip parameters, proprietary formats that lock data inside one platform, MVDs that nobody defined. Interoperability is promised in the contract but never engineered. Models arrive in formats the coordination team can't read, and data fidelity degrades with every exchange cycle. The handover inherits every upstream format failure.</p>
      </div>
    </div>

  </div>
</section>
`;

const script = `(function(){
  /* Left column — fast entrance */
  var left = document.getElementById('stru-problem-left');
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
  var cards = document.querySelectorAll('[data-stru-fc]');
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
  var stats = document.querySelectorAll('.stru-stat-block');
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
