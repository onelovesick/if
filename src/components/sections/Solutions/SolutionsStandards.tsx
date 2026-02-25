'use client';

import { useEffect, useRef } from 'react';

const html = `
<style>
.sol-standards {
  background: #0B3C5D;
  padding: 48px 0;
  position: relative;
  overflow: hidden;
}
.sol-standards .std-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
}
.sol-standards .std-left {
  display: flex;
  align-items: center;
  gap: 24px;
}
.sol-standards .std-badge {
  width: 60px; height: 60px;
  border: 1px solid rgba(71,181,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sol-standards .std-badge span {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: 11px;
  color: #47B5FF;
  text-align: center;
  line-height: 1.2;
}
.sol-standards .std-text h4 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  margin-bottom: 4px;
}
.sol-standards .std-text p {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #7a9bb5;
}
.sol-standards .std-logos {
  display: flex;
  gap: 40px;
  align-items: center;
}
.sol-standards .std-logo {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  white-space: nowrap;
}
@media (max-width: 1024px) {
  .sol-standards .std-container { flex-direction: column; text-align: center; }
  .sol-standards .std-left { flex-direction: column; }
  .sol-standards .std-logos { justify-content: center; flex-wrap: wrap; }
}
</style>

<section class="sol-standards">
  <div class="std-container">
    <div class="std-left">
      <div class="std-badge">
        <span>ISO<br/>19650</span>
      </div>
      <div class="std-text">
        <h4>Built on International Standards</h4>
        <p>Every solution layer aligns to the ISO 19650 information management framework</p>
      </div>
    </div>
    <div class="std-logos">
      <span class="std-logo">DBB</span>
      <span class="std-logo">Design-Build</span>
      <span class="std-logo">PPP / P3</span>
      <span class="std-logo">CM</span>
      <span class="std-logo">IPD</span>
    </div>
  </div>
</section>
`;

export default function SolutionsStandards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
