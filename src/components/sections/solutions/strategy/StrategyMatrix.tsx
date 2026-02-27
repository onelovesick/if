'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-matrix {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-matrix::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .str-matrix-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .str-matrix-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .str-matrix-eyebrow {
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

  .str-matrix-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-matrix h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 20px 0;
  }

  .str-matrix h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-matrix-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 580px;
    margin: 0 auto;
  }

  .str-matrix-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  /* Column headers */
  .str-matrix-col-header {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.5);
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.1);
    margin-bottom: 20px;
  }

  .str-matrix-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .str-matrix-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid rgba(71,181,255,0.06);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .str-matrix-item:hover {
    background: rgba(71,181,255,0.04);
    padding-left: 28px;
  }

  .str-matrix-item-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .str-matrix-item-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: rgba(71,181,255,0.3);
    min-width: 24px;
  }

  .str-matrix-item-name {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #F4F6F8;
    transition: color 0.3s ease;
  }

  .str-matrix-item:hover .str-matrix-item-name {
    color: #47B5FF;
  }

  .str-matrix-item-relevance {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 3px 10px;
    border: 1px solid rgba(71,181,255,0.15);
    color: rgba(244,246,248,0.5);
  }

  .str-matrix-item-relevance.str-relevance-primary {
    border-color: rgba(71,181,255,0.35);
    color: #47B5FF;
  }

  .str-matrix-item-arrow {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: rgba(71,181,255,0.3);
    transition: all 0.3s ease;
    margin-left: 12px;
  }

  .str-matrix-item:hover .str-matrix-item-arrow {
    color: #47B5FF;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .str-matrix-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .str-matrix {
      padding: 80px 20px;
    }
  }
</style>

<section class="str-matrix">
  <div class="str-matrix-inner">
    <div class="str-matrix-header">
      <div class="str-matrix-eyebrow">Who Benefits</div>
      <h2>Industries & <em>Stakeholders</em></h2>
      <p class="str-matrix-subtitle">
        The strategy layer serves every sector we operate in — and the people making decisions within them.
      </p>
    </div>

    <div class="str-matrix-grid">
      <div class="str-matrix-col">
        <div class="str-matrix-col-header">Industries</div>
        <div class="str-matrix-list">
          <a href="/industries/heavy-civil/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">01</span>
              <span class="str-matrix-item-name">Heavy Civil & Transportation</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/industries/mining/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">02</span>
              <span class="str-matrix-item-name">Mining & Resource Extraction</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/industries/energy/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">03</span>
              <span class="str-matrix-item-name">Energy, Renewable & Utilities</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/industries/institutional/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">04</span>
              <span class="str-matrix-item-name">Institutional & Government</span>
            </div>
            <span class="str-matrix-item-relevance">Supporting</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/industries/industrial/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">05</span>
              <span class="str-matrix-item-name">Industrial & Heavy Manufacturing</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/industries/commercial/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">06</span>
              <span class="str-matrix-item-name">Commercial Real Estate & Mixed-Use</span>
            </div>
            <span class="str-matrix-item-relevance">Supporting</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
        </div>
      </div>

      <div class="str-matrix-col">
        <div class="str-matrix-col-header">Stakeholders</div>
        <div class="str-matrix-list">
          <a href="/who-we-support/owners/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">01</span>
              <span class="str-matrix-item-name">Owners & Developers</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/who-we-support/government/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">02</span>
              <span class="str-matrix-item-name">Government & Agencies</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/who-we-support/consultants-pms/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">03</span>
              <span class="str-matrix-item-name">Consultants & PMs</span>
            </div>
            <span class="str-matrix-item-relevance str-relevance-primary">Primary</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/who-we-support/contractors/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">04</span>
              <span class="str-matrix-item-name">Contractors</span>
            </div>
            <span class="str-matrix-item-relevance">Supporting</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/who-we-support/architects/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">05</span>
              <span class="str-matrix-item-name">Architects & Designers</span>
            </div>
            <span class="str-matrix-item-relevance">Supporting</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
          <a href="/who-we-support/engineers/" class="str-matrix-item">
            <div class="str-matrix-item-left">
              <span class="str-matrix-item-num">06</span>
              <span class="str-matrix-item-name">Engineers</span>
            </div>
            <span class="str-matrix-item-relevance">Supporting</span>
            <span class="str-matrix-item-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  const items = document.querySelectorAll('.str-matrix-item');
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-12px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, padding-left 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, (i % 6) * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obs.observe(item);
  });
})();`;

export default function StrategyMatrix() {
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
