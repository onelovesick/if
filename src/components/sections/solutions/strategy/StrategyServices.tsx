'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-services {
    position: relative;
    background: #1C1F23;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-services::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .str-services-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .str-services-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .str-services-eyebrow {
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

  .str-services-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-services h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #F4F6F8;
    margin: 0 0 20px 0;
  }

  .str-services h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-services-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #7a9bb5;
    max-width: 620px;
    margin: 0 auto;
  }

  .str-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .str-service-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10);
    padding: 44px 36px 40px;
    transition: all 0.4s ease;
    backdrop-filter: blur(4px);
  }

  /* Corner brackets */
  .str-service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-top: 1px solid rgba(71,181,255,0.3);
    border-left: 1px solid rgba(71,181,255,0.3);
    transition: all 0.3s ease;
  }

  .str-service-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.3);
    border-right: 1px solid rgba(71,181,255,0.3);
    transition: all 0.3s ease;
  }

  .str-service-card:hover {
    background: rgba(71,181,255,0.04);
    border-color: rgba(71,181,255,0.22);
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.3);
  }

  .str-service-card:hover::before,
  .str-service-card:hover::after {
    border-color: rgba(71,181,255,0.5);
  }

  /* Accent line draw on hover */
  .str-service-accent-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.3));
    transition: width 0.5s ease;
  }

  .str-service-card:hover .str-service-accent-line {
    width: 100%;
  }

  .str-service-card-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    margin-bottom: 18px;
  }

  .str-service-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.01em;
    color: #F4F6F8;
    margin: 0 0 14px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .str-service-card:hover h3 {
    color: #47B5FF;
  }

  .str-service-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.75;
    color: #7a9bb5;
    margin: 0 0 24px 0;
  }

  .str-service-deliverables {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .str-service-deliverable {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(244,246,248,0.6);
  }

  .str-service-deliverable::before {
    content: '→';
    color: #47B5FF;
    font-size: 12px;
  }

  /* ISO tag at bottom of section */
  .str-services-iso {
    text-align: center;
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .str-services-iso span {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.4);
  }

  @media (max-width: 768px) {
    .str-services-grid {
      grid-template-columns: 1fr;
    }
    .str-services {
      padding: 80px 20px;
    }
  }
</style>

<section class="str-services">
  <div class="str-services-inner">
    <div class="str-services-header">
      <div class="str-services-eyebrow">What We Deliver</div>
      <h2>Strategy Layer <em>Services</em></h2>
      <p class="str-services-subtitle">
        Four core service areas that define the information backbone of your programme — before a single model is opened.
      </p>
    </div>

    <div class="str-services-grid">
      <div class="str-service-card">
        <div class="str-service-accent-line"></div>
        <div class="str-service-card-number">Service 01</div>
        <h3>BEP Development</h3>
        <p class="str-service-card-desc">
          We author BIM execution plans that reflect how your team actually operates — not copied templates. Responsibilities, exchanges, LOD requirements, and coordination protocols defined with precision.
        </p>
        <div class="str-service-deliverables">
          <div class="str-service-deliverable">BIM Execution Plan (Pre- & Post-Contract)</div>
          <div class="str-service-deliverable">Responsibility matrices</div>
          <div class="str-service-deliverable">Model production schedules</div>
          <div class="str-service-deliverable">Information exchange tables</div>
        </div>
      </div>

      <div class="str-service-card">
        <div class="str-service-accent-line"></div>
        <div class="str-service-card-number">Service 02</div>
        <h3>EIR Authoring</h3>
        <p class="str-service-card-desc">
          Employer's Information Requirements that set clear, contractually enforceable expectations for what information is needed, when, and to what standard — aligned to ISO 19650.
        </p>
        <div class="str-service-deliverables">
          <div class="str-service-deliverable">Employer's Information Requirements</div>
          <div class="str-service-deliverable">Asset Information Requirements</div>
          <div class="str-service-deliverable">Organisational Information Requirements</div>
          <div class="str-service-deliverable">Exchange information requirements</div>
        </div>
      </div>

      <div class="str-service-card">
        <div class="str-service-accent-line"></div>
        <div class="str-service-card-number">Service 03</div>
        <h3>Digital Roadmaps</h3>
        <p class="str-service-card-desc">
          Phased implementation plans that match digital ambition to organisational maturity. We map where you are, where you need to be, and every step between — without over-engineering.
        </p>
        <div class="str-service-deliverables">
          <div class="str-service-deliverable">Digital maturity assessment</div>
          <div class="str-service-deliverable">Phased implementation timeline</div>
          <div class="str-service-deliverable">Technology stack recommendations</div>
          <div class="str-service-deliverable">Training & adoption strategy</div>
        </div>
      </div>

      <div class="str-service-card">
        <div class="str-service-accent-line"></div>
        <div class="str-service-card-number">Service 04</div>
        <h3>Risk Assessment</h3>
        <p class="str-service-card-desc">
          We identify information risk before it becomes project risk. Gap analyses, maturity benchmarks, and contractual alignment reviews that surface vulnerabilities early.
        </p>
        <div class="str-service-deliverables">
          <div class="str-service-deliverable">Information risk register</div>
          <div class="str-service-deliverable">Gap analysis report</div>
          <div class="str-service-deliverable">Contractual BIM requirement review</div>
          <div class="str-service-deliverable">Stakeholder readiness assessment</div>
        </div>
      </div>
    </div>

    <div class="str-services-iso">
      <span>Aligned to ISO 19650-1 · Information Management Framework</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  const cards = document.querySelectorAll('.str-service-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            card.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(card);
  });
})();`;

export default function StrategyServices() {
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
