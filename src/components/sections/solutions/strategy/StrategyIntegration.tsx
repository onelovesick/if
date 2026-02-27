'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-integration {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-integration-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .str-integration-header {
    max-width: 680px;
    margin-bottom: 72px;
  }

  .str-integration-eyebrow {
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

  .str-integration-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #47B5FF;
  }

  .str-integration h2 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 20px 0;
  }

  .str-integration h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-integration-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #5a7a96;
  }

  /* Lifecycle bar */
  .str-lifecycle {
    position: relative;
    display: flex;
    gap: 0;
    margin-bottom: 56px;
  }

  .str-lifecycle-phase {
    flex: 1;
    position: relative;
    padding: 28px 20px 24px;
    border: 1px solid rgba(11,60,93,0.09);
    border-right: none;
    background: #fff;
    transition: all 0.4s ease;
    cursor: default;
  }

  .str-lifecycle-phase:last-child {
    border-right: 1px solid rgba(11,60,93,0.09);
  }

  .str-lifecycle-phase.str-phase-ideal {
    background: rgba(71,181,255,0.06);
    border-color: rgba(71,181,255,0.2);
  }

  .str-lifecycle-phase.str-phase-ideal + .str-lifecycle-phase {
    border-left-color: rgba(71,181,255,0.2);
  }

  .str-lifecycle-phase-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5a7a96;
    margin-bottom: 8px;
  }

  .str-lifecycle-phase.str-phase-ideal .str-lifecycle-phase-label {
    color: #47B5FF;
  }

  .str-lifecycle-phase-name {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    color: #0B3C5D;
    margin-bottom: 6px;
  }

  .str-lifecycle-phase-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.6;
    color: #5a7a96;
  }

  /* Ideal badge */
  .str-phase-badge {
    position: absolute;
    top: -12px;
    left: 20px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #1C1F23;
    background: #47B5FF;
    padding: 3px 12px;
  }

  /* Integration possible indicator */
  .str-phase-possible {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'DM Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7a9bb5;
    background: #F2F5F8;
    padding: 2px 10px;
    white-space: nowrap;
  }

  /* Connection to process framework */
  .str-integration-process {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    padding-top: 48px;
    border-top: 1px solid rgba(11,60,93,0.09);
  }

  .str-integration-process-text h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 22px;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 16px 0;
  }

  .str-integration-process-text p {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: #5a7a96;
    margin: 0 0 24px 0;
  }

  .str-integration-process-link {
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

  .str-integration-process-link:hover {
    gap: 14px;
  }

  /* Process mini-steps */
  .str-integration-steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .str-integration-step {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.07);
    transition: all 0.3s ease;
  }

  .str-integration-step.str-step-active {
    border-color: rgba(71,181,255,0.25);
    background: rgba(71,181,255,0.04);
  }

  .str-integration-step-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: rgba(71,181,255,0.4);
    min-width: 28px;
  }

  .str-integration-step.str-step-active .str-integration-step-num {
    color: #47B5FF;
  }

  .str-integration-step-name {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #0B3C5D;
  }

  .str-integration-step-tag {
    margin-left: auto;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.2);
    padding: 3px 10px;
  }

  @media (max-width: 900px) {
    .str-lifecycle {
      flex-direction: column;
    }
    .str-lifecycle-phase {
      border-right: 1px solid rgba(11,60,93,0.09);
      border-bottom: none;
    }
    .str-lifecycle-phase:last-child {
      border-bottom: 1px solid rgba(11,60,93,0.09);
    }
    .str-integration-process {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .str-phase-possible {
      position: static;
      transform: none;
      display: inline-block;
      margin-top: 8px;
    }
  }
</style>

<section class="str-integration">
  <div class="str-integration-inner">
    <div class="str-integration-header">
      <div class="str-integration-eyebrow">When To Integrate</div>
      <h2>Best At Inception.<br><em>Effective</em> At Any Stage.</h2>
      <p class="str-integration-subtitle">
        Strategy delivers the most value when defined before the first model is opened. But projects rarely start clean — we meet programmes where they are and build the strategic layer around what's already in motion.
      </p>
    </div>

    <div class="str-lifecycle">
      <div class="str-lifecycle-phase str-phase-ideal">
        <div class="str-phase-badge">Ideal Entry</div>
        <div class="str-lifecycle-phase-label">Phase 01</div>
        <div class="str-lifecycle-phase-name">Concept & Design</div>
        <div class="str-lifecycle-phase-desc">Maximum influence. Define requirements before commitments are locked.</div>
      </div>
      <div class="str-lifecycle-phase">
        <div class="str-lifecycle-phase-label">Phase 02</div>
        <div class="str-lifecycle-phase-name">Detailed Design</div>
        <div class="str-lifecycle-phase-desc">Governance still shapeable. BEP and EIR can redirect modelling efforts.</div>
        <div class="str-phase-possible">Integration possible</div>
      </div>
      <div class="str-lifecycle-phase">
        <div class="str-lifecycle-phase-label">Phase 03</div>
        <div class="str-lifecycle-phase-name">Construction</div>
        <div class="str-lifecycle-phase-desc">Strategy becomes triage. Focus on handover requirements and data structure.</div>
        <div class="str-phase-possible">Integration possible</div>
      </div>
      <div class="str-lifecycle-phase">
        <div class="str-lifecycle-phase-label">Phase 04</div>
        <div class="str-lifecycle-phase-name">Operations</div>
        <div class="str-lifecycle-phase-desc">Retroactive. AIR definition and FM data structuring for existing assets.</div>
        <div class="str-phase-possible">Integration possible</div>
      </div>
    </div>

    <div class="str-integration-process">
      <div class="str-integration-process-text">
        <h3>Connected To Our Process</h3>
        <p>
          The strategy layer aligns primarily with the <strong>Assess</strong> and <strong>Define</strong> steps of our delivery framework — but its outputs govern every step that follows. A strong strategy layer means clearer implementation and tighter control.
        </p>
        <a href="/process/" class="str-integration-process-link">
          Discover The Process <span>→</span>
        </a>
      </div>
      <div class="str-integration-steps">
        <div class="str-integration-step str-step-active">
          <span class="str-integration-step-num">01</span>
          <span class="str-integration-step-name">Assess</span>
          <span class="str-integration-step-tag">Primary</span>
        </div>
        <div class="str-integration-step str-step-active">
          <span class="str-integration-step-num">02</span>
          <span class="str-integration-step-name">Define</span>
          <span class="str-integration-step-tag">Primary</span>
        </div>
        <div class="str-integration-step">
          <span class="str-integration-step-num">03</span>
          <span class="str-integration-step-name">Implement</span>
        </div>
        <div class="str-integration-step">
          <span class="str-integration-step-num">04</span>
          <span class="str-integration-step-name">Control</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  const phases = document.querySelectorAll('.str-lifecycle-phase');
  phases.forEach((phase, i) => {
    phase.style.opacity = '0';
    phase.style.transform = 'translateY(16px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            phase.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.4s ease, border-color 0.4s ease';
            phase.style.opacity = '1';
            phase.style.transform = 'translateY(0)';
          }, i * 100);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(phase);
  });
})();`;

export default function StrategyIntegration() {
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
