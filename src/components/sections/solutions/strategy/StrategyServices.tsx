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

  /* Radial glow */
  .str-services-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 60%;
    background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,60,93,0.35) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
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
    max-width: 640px;
    margin: 0 auto;
  }

  /* ═══════════════════════════════════
     4 PILLAR CARDS — 2x2 Grid
     ═══════════════════════════════════ */
  .str-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 64px;
  }

  .str-svc-card {
    position: relative;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(71,181,255,0.10);
    padding: 40px 34px 36px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    backdrop-filter: blur(4px);
    overflow: hidden;
    cursor: default;
  }

  .str-svc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 18px; height: 18px;
    border-top: 1px solid rgba(71,181,255,0.25);
    border-left: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .str-svc-card::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 18px; height: 18px;
    border-bottom: 1px solid rgba(71,181,255,0.25);
    border-right: 1px solid rgba(71,181,255,0.25);
    transition: border-color 0.3s ease;
  }

  .str-svc-card:hover {
    background: rgba(71,181,255,0.03);
    border-color: rgba(71,181,255,0.18);
  }

  .str-svc-card:hover::before,
  .str-svc-card:hover::after {
    border-color: rgba(71,181,255,0.45);
  }

  /* Top accent draw */
  .str-svc-accent {
    position: absolute;
    top: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, #47B5FF, rgba(71,181,255,0.2));
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .str-svc-card:hover .str-svc-accent {
    width: 100%;
  }

  .str-svc-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .str-svc-card-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
  }

  .str-svc-card-count {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(122,155,181,0.4);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 3px 10px;
  }

  .str-svc-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.01em;
    color: #F4F6F8;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .str-svc-card:hover h3 {
    color: #47B5FF;
  }

  .str-svc-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.75;
    color: #7a9bb5;
    margin: 0 0 28px 0;
  }

  /* Service items list */
  .str-svc-items {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .str-svc-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(71,181,255,0.05);
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: rgba(244,246,248,0.7);
    transition: color 0.2s ease, padding-left 0.2s ease;
  }

  .str-svc-item:hover {
    color: #F4F6F8;
    padding-left: 6px;
  }

  .str-svc-item::before {
    content: '→';
    font-size: 11px;
    color: #47B5FF;
    opacity: 0.5;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
  }

  .str-svc-item:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════
     DELIVERABLES STRIP — Horizontal tags
     ═══════════════════════════════════ */
  .str-deliverables {
    padding-top: 48px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .str-deliverables-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.4);
    margin-bottom: 20px;
    text-align: center;
  }

  .str-deliverables-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .str-del-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(244,246,248,0.45);
    border: 1px solid rgba(71,181,255,0.1);
    padding: 7px 16px;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .str-del-tag:hover {
    border-color: rgba(71,181,255,0.35);
    color: #47B5FF;
  }

  /* ISO footer */
  .str-services-iso {
    text-align: center;
    margin-top: 48px;
  }

  .str-services-iso span {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(122,155,181,0.35);
  }

  /* ═══════════════════════════════════
     Responsive
     ═══════════════════════════════════ */
  @media (max-width: 900px) {
    .str-services-grid {
      grid-template-columns: 1fr;
    }
    .str-services {
      padding: 80px 20px;
    }
  }
</style>

<section class="str-services">
  <div class="str-services-glow"></div>
  <div class="str-services-inner">
    <div class="str-services-header">
      <div class="str-services-eyebrow">What We Deliver</div>
      <h2>Strategy Layer <em>Services</em></h2>
      <p class="str-services-subtitle">
        The strategic layer defines the information backbone of your programme. Four pillars, dozens of deliverables — each one engineered to prevent downstream failure.
      </p>
    </div>

    <div class="str-services-grid">

      <!-- PILLAR 01 — Information Requirements -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 01</span>
          <span class="str-svc-card-count">8 Services</span>
        </div>
        <h3>Information Requirements</h3>
        <p class="str-svc-card-desc">Define what information is needed, by whom, at what stage, and to what standard — from organisational objectives down to exchange-level specifics.</p>
        <div class="str-svc-items">
          <div class="str-svc-item">OIR — Organisational Information Requirements</div>
          <div class="str-svc-item">PIR — Project Information Requirements</div>
          <div class="str-svc-item">AIR — Asset Information Requirements</div>
          <div class="str-svc-item">EIR — Exchange Information Requirements</div>
          <div class="str-svc-item">Level of Information Need (LOD / LOI) Frameworks</div>
          <div class="str-svc-item">Information Delivery Milestone Planning</div>
          <div class="str-svc-item">PIM to AIM Transition Strategy</div>
          <div class="str-svc-item">Contractual BIM Requirement Embedding</div>
        </div>
      </div>

      <!-- PILLAR 02 — Execution Planning -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 02</span>
          <span class="str-svc-card-count">8 Services</span>
        </div>
        <h3>BIM Execution Planning</h3>
        <p class="str-svc-card-desc">Author BEPs that teams actually follow — governance documents that map responsibilities, exchanges, and coordination protocols to how your project really operates.</p>
        <div class="str-svc-items">
          <div class="str-svc-item">Pre-Appointment BEP Development</div>
          <div class="str-svc-item">Post-Appointment BEP Development</div>
          <div class="str-svc-item">Responsibility Matrices (RACI)</div>
          <div class="str-svc-item">Task Information Delivery Plans (TIDP)</div>
          <div class="str-svc-item">Master Information Delivery Plans (MIDP)</div>
          <div class="str-svc-item">Model Production Scheduling</div>
          <div class="str-svc-item">BIM Use Case Identification & Mapping</div>
          <div class="str-svc-item">Information Protocol & Legal Frameworks</div>
        </div>
      </div>

      <!-- PILLAR 03 — Digital Roadmaps & Maturity -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 03</span>
          <span class="str-svc-card-count">7 Services</span>
        </div>
        <h3>Digital Roadmaps & Maturity</h3>
        <p class="str-svc-card-desc">Phased implementation plans that match digital ambition to organisational readiness — technology stack, workflows, training, and adoption sequenced without over-engineering.</p>
        <div class="str-svc-items">
          <div class="str-svc-item">Digital Maturity Assessment</div>
          <div class="str-svc-item">Phased Implementation Roadmaps</div>
          <div class="str-svc-item">Technology Stack Evaluation & Selection</div>
          <div class="str-svc-item">CDE Strategy & Platform Selection</div>
          <div class="str-svc-item">Training & Capability Development Planning</div>
          <div class="str-svc-item">Change Management & Adoption Strategy</div>
          <div class="str-svc-item">Digital Delivery KPI Frameworks</div>
        </div>
      </div>

      <!-- PILLAR 04 — Risk & Governance -->
      <div class="str-svc-card" data-svc>
        <div class="str-svc-accent"></div>
        <div class="str-svc-card-header">
          <span class="str-svc-card-label">Pillar 04</span>
          <span class="str-svc-card-count">7 Services</span>
        </div>
        <h3>Risk Assessment & Governance</h3>
        <p class="str-svc-card-desc">Identify information risk before it becomes project risk. Gap analyses, compliance reviews, and governance frameworks that surface vulnerabilities early and maintain control.</p>
        <div class="str-svc-items">
          <div class="str-svc-item">Information Risk Registers</div>
          <div class="str-svc-item">Gap Analysis & Compliance Audits</div>
          <div class="str-svc-item">Contractual BIM Alignment Review</div>
          <div class="str-svc-item">Stakeholder Readiness Assessment</div>
          <div class="str-svc-item">Information Security Planning (ISO 19650-5)</div>
          <div class="str-svc-item">Procurement & Tender BIM Support</div>
          <div class="str-svc-item">RFP / RFQ BIM Specification Writing</div>
        </div>
      </div>
    </div>

    <!-- DELIVERABLES TAG STRIP -->
    <div class="str-deliverables">
      <div class="str-deliverables-label">Key Deliverables</div>
      <div class="str-deliverables-tags">
        <span class="str-del-tag">BEP</span>
        <span class="str-del-tag">EIR</span>
        <span class="str-del-tag">OIR</span>
        <span class="str-del-tag">AIR</span>
        <span class="str-del-tag">PIR</span>
        <span class="str-del-tag">TIDP</span>
        <span class="str-del-tag">MIDP</span>
        <span class="str-del-tag">RACI</span>
        <span class="str-del-tag">Risk Register</span>
        <span class="str-del-tag">LOD / LOI Matrix</span>
        <span class="str-del-tag">Digital Roadmap</span>
        <span class="str-del-tag">Maturity Assessment</span>
        <span class="str-del-tag">CDE Strategy</span>
        <span class="str-del-tag">Information Protocol</span>
        <span class="str-del-tag">PIM → AIM Plan</span>
      </div>
    </div>

    <div class="str-services-iso">
      <span>Aligned to ISO 19650-1 · 19650-2 · 19650-3 · 19650-5</span>
    </div>
  </div>
</section>
`;

const script = `(function(){
  var cards = document.querySelectorAll('[data-svc]');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            card.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(card);
  });

  /* Stagger deliverable tags */
  var tags = document.querySelectorAll('.str-del-tag');
  tags.forEach(function(tag, i) {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, color 0.3s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, i * 50);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(tag);
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
