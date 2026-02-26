'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&amp;family=Inter+Tight:ital,wght@0,100..900;1,100..900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
<style>
.sh{
  position:relative;min-height:100vh;display:flex;align-items:center;
  justify-content:center;background:#1C1F23;overflow:hidden;
  padding:140px 32px 80px;
}

/* Background — rich branded gradients, no grid */
.sh .bg{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 55% at 50% 40%,rgba(11,60,93,0.45) 0%,transparent 65%),
    radial-gradient(ellipse 40% 40% at 20% 70%,rgba(11,60,93,0.2) 0%,transparent 55%),
    radial-gradient(ellipse 35% 30% at 80% 25%,rgba(71,181,255,0.05) 0%,transparent 50%);
  pointer-events:none;z-index:1;
}
.sh .vig{
  position:absolute;inset:0;
  background:radial-gradient(ellipse at center,transparent 40%,rgba(28,31,35,0.6) 100%);
  pointer-events:none;z-index:1;
}
.sh .scn{
  position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(71,181,255,0.4),transparent);
  opacity:.15;animation:scn 8s linear infinite;pointer-events:none;z-index:3;
}
@keyframes scn{0%{top:0}100%{top:100%}}

/* Corner brackets */
.sh .btl{position:absolute;top:100px;left:40px;width:40px;height:40px;border-top:1px solid rgba(71,181,255,0.2);border-left:1px solid rgba(71,181,255,0.2);z-index:4}
.sh .bbr{position:absolute;bottom:60px;right:40px;width:40px;height:40px;border-bottom:1px solid rgba(71,181,255,0.2);border-right:1px solid rgba(71,181,255,0.2);z-index:4}

/* ── Center content ── */
.sh-inner{
  position:relative;z-index:5;max-width:1000px;width:100%;
  text-align:center;
}

.sh .ey{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:#47B5FF;display:inline-flex;align-items:center;
  gap:12px;margin-bottom:28px;
}
.sh .ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}

.sh h1{
  font-family:'Inter Tight',sans-serif;font-weight:900;
  font-size:clamp(38px,5.5vw,68px);line-height:1.04;
  text-transform:uppercase;letter-spacing:-.025em;
  color:#F4F6F8;margin-bottom:20px;
}
.sh h1 em{font-style:italic;color:#47B5FF}

.sh .sub{
  font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;
  color:#7a9bb5;max-width:580px;margin:0 auto 48px;
}

/* ── Solution cards grid ── */
.sh-cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:2px;
  margin-bottom:48px;text-align:left;
  background:rgba(71,181,255,0.06);border:1px solid rgba(71,181,255,0.08);
}
.sh-card{
  background:rgba(28,31,35,0.7);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  padding:28px 24px;position:relative;transition:all .4s cubic-bezier(.22,1,.36,1);
  text-decoration:none;display:block;overflow:hidden;
}
.sh-card:hover{background:rgba(11,60,93,0.25)}
.sh-card::after{
  content:'';position:absolute;bottom:0;left:0;width:0;height:2px;
  background:#47B5FF;transition:width .5s cubic-bezier(.22,1,.36,1);
}
.sh-card:hover::after{width:100%}

.sh-card .sc-num{
  font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;
  color:#47B5FF;opacity:.6;margin-bottom:10px;display:block;
}
.sh-card h4{
  font-family:'Inter Tight',sans-serif;font-weight:800;font-size:17px;
  text-transform:uppercase;letter-spacing:-.01em;color:#F4F6F8;
  margin-bottom:8px;transition:color .3s ease;
}
.sh-card:hover h4{color:#47B5FF}
.sh-card .sc-desc{
  font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;
  color:#7a9bb5;margin-bottom:14px;
}
.sh-card .sc-arrow{
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:#47B5FF;opacity:0;
  transform:translateX(-8px);transition:all .35s ease;
}
.sh-card:hover .sc-arrow{opacity:1;transform:translateX(0)}

/* ── Bottom CTAs ── */
.sh-ctas{
  display:flex;gap:16px;justify-content:center;flex-wrap:wrap;
}
.sh .ba{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;
  text-transform:uppercase;padding:14px 28px;border:none;color:#fff;
  background:#47B5FF;cursor:pointer;transition:all .35s ease;text-decoration:none;
}
.sh .ba:hover{background:#3aa0e6;transform:translateY(-1px)}
.sh .bp{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;
  text-transform:uppercase;padding:14px 28px;border:1px solid rgba(71,181,255,0.18);
  color:#F4F6F8;background:transparent;cursor:pointer;transition:all .4s ease;text-decoration:none;
}
.sh .bp:hover{background:#0B3C5D;border-color:#47B5FF;color:#fff}

/* Scroll */
.sh .sci{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:8px;z-index:5;
}
.sh .sci span{
  font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;
  text-transform:uppercase;color:#7a9bb5;opacity:.5;
}
.sh .scl{width:1px;height:28px;background:#47B5FF;opacity:.3;animation:scp 2s ease-in-out infinite}
@keyframes scp{0%,100%{opacity:.15;transform:scaleY(.6)}50%{opacity:.4;transform:scaleY(1)}}

/* ── Responsive ── */
@media(max-width:900px){
  .sh-cards{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:640px){
  .sh{padding:120px 20px 80px}
  .sh-cards{grid-template-columns:1fr}
  .sh h1{font-size:clamp(32px,8vw,48px)}
}
</style>

<section class="sh">
  <div class="bg"></div>
  <div class="vig"></div>
  <div class="scn"></div>
  <div class="btl"></div>
  <div class="bbr"></div>

  <div class="sh-inner">
    <div class="ey">Our Solutions</div>
    <h1>Six Layers of<br/><em>Digital</em> Control</h1>
    <p class="sub">End-to-end digital delivery across the full project lifecycle — from BIM strategy on day one to digital twin handover. Structured around how infrastructure actually gets built.</p>

    <div class="sh-cards">
      <a href="/solutions/strategy/" class="sh-card">
        <span class="sc-num">01</span>
        <h4>Strategy</h4>
        <p class="sc-desc">BIM execution plans, EIR development, and digital delivery roadmaps.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
      <a href="/solutions/structure/" class="sh-card">
        <span class="sc-num">02</span>
        <h4>Structure</h4>
        <p class="sc-desc">CDE setup, naming conventions, LOD frameworks, and data architecture.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
      <a href="/solutions/intelligence/" class="sh-card">
        <span class="sc-num">03</span>
        <h4>Intelligence</h4>
        <p class="sc-desc">BIM modelling, clash detection, scan-to-BIM, and quantity verification.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
      <a href="/solutions/execution/" class="sh-card">
        <span class="sc-num">04</span>
        <h4>Execution</h4>
        <p class="sc-desc">4D scheduling, digital work packaging, and construction BIM compliance.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
      <a href="/solutions/project-twin/" class="sh-card">
        <span class="sc-num">05</span>
        <h4>Project Twin</h4>
        <p class="sc-desc">As-built models, COBie handover, and operations-ready digital twins.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
      <a href="/solutions/insights/" class="sh-card">
        <span class="sc-num">06</span>
        <h4>Insights</h4>
        <p class="sc-desc">Project dashboards, BIM auditing, 5D analytics, and progress tracking.</p>
        <span class="sc-arrow">Explore →</span>
      </a>
    </div>

    <div class="sh-ctas">
      <a href="/contact/" class="ba">Schedule a Discovery Call</a>
      <a href="/process/" class="bp">Our Process →</a>
    </div>
  </div>

  <div class="sci">
    <span>Scroll</span>
    <div class="scl"></div>
  </div>
</section>
`;

export default function SolutionsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } }); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
