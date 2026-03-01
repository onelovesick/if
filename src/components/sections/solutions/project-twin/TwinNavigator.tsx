'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .twin-nav {
    position: relative;
    background: #F2F5F8;
    padding: 100px 32px 110px;
    overflow: hidden;
  }

  .twin-nav::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .twin-nav-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .twin-nav-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  .twin-nav-left {}

  .twin-nav-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF;
    margin-bottom: 16px;
  }
  .twin-nav-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .twin-nav h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(24px, 2.8vw, 34px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: #0B3C5D; margin: 0;
  }
  .twin-nav h2 em { font-style: italic; color: #47B5FF; }

  .twin-nav-hub {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.14em; text-transform: uppercase;
    text-decoration: none; color: #47B5FF;
    display: inline-flex; align-items: center; gap: 8px;
    transition: gap 0.2s ease;
    flex-shrink: 0;
  }
  .twin-nav-hub:hover { gap: 14px; }

  /* \u2550\u2550\u2550 6-column grid \u2550\u2550\u2550 */
  .twin-nav-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
  }

  .twin-nav-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    padding: 24px 20px 22px;
    text-decoration: none;
    display: block;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .twin-nav-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 3px;
    background: #47B5FF;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }

  .twin-nav-card:hover::before { width: 100%; }

  .twin-nav-card:hover {
    border-color: rgba(71,181,255,0.15);
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(11,60,93,0.07);
  }

  /* Active card */
  .twin-nav-card.twin-nav-active {
    background: #0B3C5D;
    border-color: rgba(71,181,255,0.2);
  }
  .twin-nav-card.twin-nav-active::before { width: 100%; }

  .twin-nav-card.twin-nav-active .twin-nav-num { color: rgba(71,181,255,0.6); }
  .twin-nav-card.twin-nav-active .twin-nav-name { color: #F4F6F8; }
  .twin-nav-card.twin-nav-active .twin-nav-tag { color: #7a9bb5; }

  .twin-nav-card.twin-nav-active:hover {
    transform: none;
    box-shadow: none;
    cursor: default;
  }

  .twin-nav-num {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.16em; color: rgba(71,181,255,0.5);
    margin-bottom: 10px;
  }

  .twin-nav-name {
    font-family: 'Inter Tight', sans-serif; font-weight: 800;
    font-size: 15px; text-transform: uppercase;
    color: #0B3C5D; margin-bottom: 6px;
    transition: color 0.3s ease;
    line-height: 1.2;
  }
  .twin-nav-card:hover .twin-nav-name { color: #47B5FF; }
  .twin-nav-card.twin-nav-active:hover .twin-nav-name { color: #F4F6F8; }

  .twin-nav-tag {
    font-family: 'Inter', sans-serif; font-size: 12px;
    font-weight: 400; line-height: 1.5; color: #5a7a96;
  }

  .twin-nav-current {
    display: inline-block;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 8px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #47B5FF;
    padding: 3px 10px;
    border: 1px solid rgba(71,181,255,0.3);
  }

  .twin-nav-arrow {
    display: inline-flex; align-items: center; gap: 5px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(71,181,255,0.5);
    transition: color 0.2s ease, gap 0.2s ease;
  }
  .twin-nav-card:hover .twin-nav-arrow { color: #47B5FF; gap: 8px; }

  /* \u2550\u2550\u2550 Responsive \u2550\u2550\u2550 */
  @media (max-width: 1080px) {
    .twin-nav-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 600px) {
    .twin-nav { padding: 80px 20px 90px; }
    .twin-nav-grid { grid-template-columns: repeat(2, 1fr); }
    .twin-nav-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  }
</style>

<section class="twin-nav">
  <div class="twin-nav-inner">

    <div class="twin-nav-header" id="twin-nav-header">
      <div class="twin-nav-left">
        <div class="twin-nav-eyebrow">Explore Solutions</div>
        <h2>Six Integrated <em>Layers</em></h2>
      </div>
      <a href="/solutions/" class="twin-nav-hub">All Solutions \u2192</a>
    </div>

    <div class="twin-nav-grid">
      <a href="/solutions/strategy/" class="twin-nav-card" data-twin-nav>
        <div class="twin-nav-num">01</div>
        <div class="twin-nav-name">Strategy</div>
        <div class="twin-nav-tag">BIM plans, EIR, digital roadmaps</div>
        <div class="twin-nav-arrow">Explore \u2192</div>
      </a>
      <a href="/solutions/structure/" class="twin-nav-card" data-twin-nav>
        <div class="twin-nav-num">02</div>
        <div class="twin-nav-name">Structure</div>
        <div class="twin-nav-tag">CDE, naming, LOD frameworks</div>
        <div class="twin-nav-arrow">Explore \u2192</div>
      </a>
      <a href="/solutions/intelligence/" class="twin-nav-card" data-twin-nav>
        <div class="twin-nav-num">03</div>
        <div class="twin-nav-name">Intelligence</div>
        <div class="twin-nav-tag">Modelling, coordination, verification</div>
        <div class="twin-nav-arrow">Explore \u2192</div>
      </a>
      <a href="/solutions/execution/" class="twin-nav-card" data-twin-nav>
        <div class="twin-nav-num">04</div>
        <div class="twin-nav-name">Execution</div>
        <div class="twin-nav-tag">4D scheduling, work packaging, field QA/QC</div>
        <div class="twin-nav-arrow">Explore \u2192</div>
      </a>
      <a href="/solutions/project-twin/" class="twin-nav-card twin-nav-active">
        <div class="twin-nav-num">05</div>
        <div class="twin-nav-name">Project Twin</div>
        <div class="twin-nav-tag">As-built, COBie, digital handover</div>
        <div class="twin-nav-current">You Are Here</div>
      </a>
      <a href="/solutions/insights/" class="twin-nav-card" data-twin-nav>
        <div class="twin-nav-num">06</div>
        <div class="twin-nav-name">Insights</div>
        <div class="twin-nav-tag">Dashboards, auditing, analytics</div>
        <div class="twin-nav-arrow">Explore \u2192</div>
      </a>
    </div>

  </div>
</section>
`;

const script = `(function(){
  var header = document.getElementById('twin-nav-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(16px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          header.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(header);
  }

  var cards = document.querySelectorAll('[data-twin-nav]');
  cards.forEach(function(c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(14px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            c.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(c);
  });
})();`;

export default function TwinNavigator() {
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
