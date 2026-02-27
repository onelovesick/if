'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800;900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  .str-problem {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px;
    overflow: hidden;
  }

  .str-problem-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
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
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #0B3C5D;
    margin: 0 0 24px 0;
  }

  .str-problem h2 em {
    font-style: italic;
    color: #47B5FF;
  }

  .str-problem-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #5a7a96;
  }

  .str-problem-text p {
    margin: 0 0 20px 0;
  }

  .str-problem-text strong {
    font-weight: 600;
    color: #0B3C5D;
  }

  /* Failure cards on the right */
  .str-problem-failures {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .str-failure-card {
    position: relative;
    background: #fff;
    border: 1px solid rgba(11,60,93,0.09);
    padding: 32px 32px 32px 40px;
    transition: all 0.35s ease;
  }

  /* Corner brackets */
  .str-failure-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-top: 1px solid rgba(71,181,255,0.3);
    border-left: 1px solid rgba(71,181,255,0.3);
  }

  .str-failure-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.3);
    border-right: 1px solid rgba(71,181,255,0.3);
  }

  .str-failure-card:hover {
    border-color: rgba(71,181,255,0.25);
    box-shadow: 0 8px 32px rgba(11,60,93,0.08);
    transform: translateY(-2px);
  }

  .str-failure-card-number {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.5);
    margin-bottom: 10px;
  }

  .str-failure-card h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: -0.01em;
    color: #0B3C5D;
    margin: 0 0 10px 0;
    text-transform: uppercase;
  }

  .str-failure-card p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    color: #5a7a96;
    margin: 0;
  }

  /* Accent top line on hover */
  .str-failure-card-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #47B5FF;
    transition: width 0.4s ease;
  }

  .str-failure-card:hover .str-failure-card-accent {
    width: 100%;
  }

  @media (max-width: 900px) {
    .str-problem-inner {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
</style>

<section class="str-problem">
  <div class="str-problem-inner">
    <div class="str-problem-left">
      <div class="str-problem-eyebrow">The Cost of No Strategy</div>
      <h2>Projects Don't Fail<br>From Lack Of <em>Tools</em></h2>
      <div class="str-problem-text">
        <p>
          They fail from lack of structure. When teams skip the strategic layer — jumping straight into modelling without defined information requirements, without a BEP, without clear governance — every downstream decision is built on assumption.
        </p>
        <p>
          <strong>The result is predictable:</strong> rework compounds, coordination breaks down, handover becomes a crisis, and digital delivery becomes a cost centre instead of a control mechanism.
        </p>
        <p>
          Strategy isn't a phase you complete and forget. It's a reference frame that every model, every exchange, and every decision aligns to — whether you're at 10% design or 90% construction.
        </p>
      </div>
    </div>

    <div class="str-problem-failures">
      <div class="str-failure-card">
        <div class="str-failure-card-accent"></div>
        <div class="str-failure-card-number">Failure Mode 01</div>
        <h3>Undefined Information Requirements</h3>
        <p>No EIR means no measurable expectations. Teams model what they assume is needed — not what the contract, the owner, or operations actually demand.</p>
      </div>
      <div class="str-failure-card">
        <div class="str-failure-card-accent"></div>
        <div class="str-failure-card-number">Failure Mode 02</div>
        <h3>BEP as a Filing Exercise</h3>
        <p>Most BIM execution plans are copied templates that no one follows. A functional BEP is a live governance document that reflects how your team actually works.</p>
      </div>
      <div class="str-failure-card">
        <div class="str-failure-card-accent"></div>
        <div class="str-failure-card-number">Failure Mode 03</div>
        <h3>Digital Tools Without a Mandate</h3>
        <p>Software gets procured. Platforms get deployed. But without a strategic framework linking tools to project outcomes, adoption stalls and data fragments.</p>
      </div>
      <div class="str-failure-card">
        <div class="str-failure-card-accent"></div>
        <div class="str-failure-card-number">Failure Mode 04</div>
        <h3>Handover as an Afterthought</h3>
        <p>If asset information requirements aren't defined at inception, handover becomes a frantic data-gathering exercise instead of a structured delivery milestone.</p>
      </div>
    </div>
  </div>
</section>
`;

const script = `(function(){
  const cards = document.querySelectorAll('.str-failure-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
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
