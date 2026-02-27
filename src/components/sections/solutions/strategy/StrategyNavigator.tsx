'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-nav {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .str-nav-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .str-nav-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-bottom: 24px;
  }

  .str-nav-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-nav h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0;
  }

  .str-nav h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  /* Six solution layer strip */
  .str-nav-layers {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    margin-bottom: 48px;
  }

  .str-nav-layer {
    position: relative;
    padding: 28px 16px 24px;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.09);
    text-decoration: none;
    text-align: center;
    transition: all 0.35s ease;
  }

  /* Corner brackets */
  .str-nav-layer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 1px solid rgba(71,181,255,0.2);
    border-left: 1px solid rgba(71,181,255,0.2);
  }

  .str-nav-layer::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-bottom: 1px solid rgba(71,181,255,0.2);
    border-right: 1px solid rgba(71,181,255,0.2);
  }

  .str-nav-layer:hover {
    border-color: rgba(71,181,255,0.25);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(11,60,93,0.08);
  }

  .str-nav-layer.str-nav-layer-active {
    background: #0B3C5D;
    border-color: rgba(71,181,255,0.3);
  }

  .str-nav-layer.str-nav-layer-active::before,
  .str-nav-layer.str-nav-layer-active::after {
    border-color: rgba(71,181,255,0.5);
  }

  .str-nav-layer-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    margin-bottom: 10px;
  }

  .str-nav-layer.str-nav-layer-active .str-nav-layer-num {
    color: rgba(71,181,255,0.7);
  }

  .str-nav-layer-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: #0B3C5D;
    margin-bottom: 6px;
  }

  .str-nav-layer.str-nav-layer-active .str-nav-layer-name {
    color: #F4F6F8;
  }

  .str-nav-layer:hover .str-nav-layer-name {
    color: #47B5FF;
  }

  .str-nav-layer-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: #5a7a96;
  }

  .str-nav-layer.str-nav-layer-active .str-nav-layer-tag {
    color: #7a9bb5;
  }

  /* Prev/Next navigation */
  .str-nav-prevnext {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .str-nav-link {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 36px 32px;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.09);
    text-decoration: none;
    transition: all 0.35s ease;
  }

  .str-nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-top: 1px solid rgba(71,181,255,0.3);
    border-left: 1px solid rgba(71,181,255,0.3);
  }

  .str-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.3);
    border-right: 1px solid rgba(71,181,255,0.3);
  }

  .str-nav-link:hover {
    border-color: rgba(71,181,255,0.2);
    box-shadow: 0 8px 32px rgba(11,60,93,0.06);
    transform: translateY(-2px);
  }

  .str-nav-link-direction {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.5);
    margin-bottom: 12px;
  }

  .str-nav-link-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 22px;
    text-transform: uppercase;
    color: #0B3C5D;
    margin-bottom: 8px;
    transition: color 0.3s ease;
  }

  .str-nav-link:hover .str-nav-link-name {
    color: #47B5FF;
  }

  .str-nav-link-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.7;
    color: #5a7a96;
  }

  .str-nav-link-arrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #47B5FF;
    margin-top: 20px;
    transition: gap 0.3s ease;
  }

  .str-nav-link:hover .str-nav-link-arrow {
    gap: 14px;
  }

  .str-nav-link.str-nav-prev {
    text-align: left;
  }

  .str-nav-link.str-nav-next {
    text-align: right;
  }

  .str-nav-link.str-nav-prev .str-nav-link-arrow {
    justify-content: flex-start;
  }

  .str-nav-link.str-nav-next .str-nav-link-arrow {
    justify-content: flex-end;
  }

  /* All solutions link */
  .str-nav-all {
    display: block;
    text-align: center;
    margin-top: 40px;
  }

  .str-nav-all a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #47B5FF;
    text-decoration: none;
    transition: gap 0.3s ease;
  }

  .str-nav-all a:hover {
    gap: 14px;
  }

  @media (max-width: 900px) {
    .str-nav-layers {
      grid-template-columns: repeat(3, 1fr);
    }
    .str-nav-prevnext {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .str-nav-layers {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section class="str-nav">
  <div class="str-nav-inner">
    <div class="str-nav-header">
      <div class="str-nav-eyebrow">Six Integrated Layers</div>
      <h2>Explore All <em>Solutions</em></h2>
    </div>

    <div class="str-nav-layers">
      <div class="str-nav-layer str-nav-layer-active" style="cursor:default;">
        <div class="str-nav-layer-num">01</div>
        <div class="str-nav-layer-name">Strategy</div>
        <div class="str-nav-layer-tag">Current</div>
      </div>
      <a href="/solutions/structure/" class="str-nav-layer">
        <div class="str-nav-layer-num">02</div>
        <div class="str-nav-layer-name">Structure</div>
        <div class="str-nav-layer-tag">CDE · Data</div>
      </a>
      <a href="/solutions/intelligence/" class="str-nav-layer">
        <div class="str-nav-layer-num">03</div>
        <div class="str-nav-layer-name">Intelligence</div>
        <div class="str-nav-layer-tag">Modelling</div>
      </a>
      <a href="/solutions/execution/" class="str-nav-layer">
        <div class="str-nav-layer-num">04</div>
        <div class="str-nav-layer-name">Execution</div>
        <div class="str-nav-layer-tag">4D · Field</div>
      </a>
      <a href="/solutions/project-twin/" class="str-nav-layer">
        <div class="str-nav-layer-num">05</div>
        <div class="str-nav-layer-name">Project Twin</div>
        <div class="str-nav-layer-tag">Handover</div>
      </a>
      <a href="/solutions/insights/" class="str-nav-layer">
        <div class="str-nav-layer-num">06</div>
        <div class="str-nav-layer-name">Insights</div>
        <div class="str-nav-layer-tag">Dashboards</div>
      </a>
    </div>

    <div class="str-nav-prevnext">
      <div class="str-nav-link str-nav-prev" style="opacity:0.35; pointer-events:none;">
        <div class="str-nav-link-direction">← Previous Layer</div>
        <div class="str-nav-link-name">—</div>
        <div class="str-nav-link-desc">Strategy is the first layer in the framework.</div>
      </div>
      <a href="/solutions/structure/" class="str-nav-link str-nav-next">
        <div class="str-nav-link-direction">Next Layer →</div>
        <div class="str-nav-link-name">02 · Structure</div>
        <div class="str-nav-link-desc">CDE setup, naming conventions, LOD frameworks, and data architecture.</div>
        <div class="str-nav-link-arrow">Explore Structure <span>→</span></div>
      </a>
    </div>

    <div class="str-nav-all">
      <a href="/solutions/">View All Solutions <span>→</span></a>
    </div>
  </div>
</section>
`;

const script = `(function(){
  const layers = document.querySelectorAll('.str-nav-layer');
  layers.forEach((layer, i) => {
    layer.style.opacity = '0';
    layer.style.transform = 'translateY(16px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            layer.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            layer.style.opacity = '1';
            layer.style.transform = 'translateY(0)';
          }, i * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(layer);
  });
})();`;

export default function StrategyNavigator() {
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
