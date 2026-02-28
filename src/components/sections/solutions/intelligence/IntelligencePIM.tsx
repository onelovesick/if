'use client';
import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@300;400;500&amp;display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════════════
     SECTION A — 3-COLUMN COMPARISON (Light)
     ═══════════════════════════════════════════════ */
  .intel-pim {
    position: relative;
    background: #F2F5F8;
    padding: 120px 32px 0;
    overflow: hidden;
  }

  .intel-pim::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
  }

  .intel-pim-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .intel-pim-header { text-align: center; margin-bottom: 64px; }

  .intel-pim-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 24px;
  }
  .intel-pim-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-pim h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(28px, 3.4vw, 44px); line-height: 1.08;
    letter-spacing: -0.025em; text-transform: uppercase; color: #0B3C5D; margin: 0 0 20px;
  }
  .intel-pim h2 em { font-style: italic; color: #47B5FF; }

  .intel-pim-subtitle {
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 300;
    line-height: 1.8; color: #5a7a96; max-width: 640px; margin: 0 auto;
  }

  /* ── 3-Column Comparison ── */
  .intel-pim-compare {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-bottom: 0;
  }

  .intel-pim-col {
    position: relative;
    padding: 40px 32px 36px;
    border: 1px solid rgba(11,60,93,0.07);
    border-right: none;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden;
  }

  .intel-pim-col:last-child { border-right: 1px solid rgba(11,60,93,0.07); }

  .intel-pim-col::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 100%; height: 3px;
    transition: background 0.3s ease;
  }

  .intel-pim-col[data-intel-col="static"]::before { background: rgba(11,60,93,0.1); }
  .intel-pim-col[data-intel-col="smart"]::before { background: rgba(71,181,255,0.3); }
  .intel-pim-col[data-intel-col="pim"]::before { background: #47B5FF; }

  .intel-pim-col:hover { background: rgba(71,181,255,0.015); }

  /* PIM column highlight */
  .intel-pim-col[data-intel-col="pim"] {
    background: rgba(71,181,255,0.025);
    border-color: rgba(71,181,255,0.12);
  }
  .intel-pim-col[data-intel-col="pim"]:hover {
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-col-badge {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding: 5px 14px;
  }

  .intel-pim-col[data-intel-col="static"] .intel-pim-col-badge {
    color: rgba(90,122,150,0.5);
    border: 1px solid rgba(11,60,93,0.1);
  }
  .intel-pim-col[data-intel-col="smart"] .intel-pim-col-badge {
    color: rgba(71,181,255,0.6);
    border: 1px solid rgba(71,181,255,0.2);
  }
  .intel-pim-col[data-intel-col="pim"] .intel-pim-col-badge {
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.35);
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-col h3 {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 22px;
    text-transform: uppercase; letter-spacing: -0.01em;
    color: #0B3C5D; margin: 0 0 12px;
  }
  .intel-pim-col[data-intel-col="pim"] h3 { color: #0B3C5D; }

  .intel-pim-col-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14.5px; font-weight: 400;
    line-height: 1.75; color: #5a7a96;
    margin: 0 0 28px;
  }

  .intel-pim-col-items {
    display: flex; flex-direction: column; gap: 0;
    border-top: 1px solid rgba(11,60,93,0.06);
  }

  .intel-pim-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(11,60,93,0.04);
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400;
    color: #3d5a73; line-height: 1.5;
  }

  .intel-pim-item-icon {
    flex-shrink: 0; width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }

  .intel-pim-check { color: #47B5FF; }
  .intel-pim-cross { color: rgba(180,60,60,0.45); }
  .intel-pim-partial { color: rgba(255,180,60,0.55); }

  .intel-pim-col-verdict {
    margin-top: 24px;
    padding: 14px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
  }

  .intel-pim-col[data-intel-col="static"] .intel-pim-col-verdict {
    color: rgba(90,122,150,0.45);
    border: 1px dashed rgba(11,60,93,0.1);
    background: rgba(11,60,93,0.015);
  }
  .intel-pim-col[data-intel-col="smart"] .intel-pim-col-verdict {
    color: rgba(71,181,255,0.5);
    border: 1px dashed rgba(71,181,255,0.15);
    background: rgba(71,181,255,0.015);
  }
  .intel-pim-col[data-intel-col="pim"] .intel-pim-col-verdict {
    color: #47B5FF;
    border: 1px solid rgba(71,181,255,0.25);
    background: rgba(71,181,255,0.03);
  }

  /* ═══════════════════════════════════════════════
     SECTION B — EXPLODED PIM (Dark sub-section)
     ═══════════════════════════════════════════════ */
  .intel-pim-exploded {
    position: relative;
    background: #1C1F23;
    margin-top: 80px;
    padding: 80px 32px 100px;
    overflow: hidden;
  }

  .intel-pim-exploded::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .intel-pim-exploded-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 50%;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(71,181,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .intel-pim-exploded-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  .intel-pim-exploded-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .intel-pim-exploded-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase; color: #47B5FF; margin-bottom: 20px;
  }
  .intel-pim-exploded-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #47B5FF; }

  .intel-pim-exploded-header h2 {
    font-family: 'Inter Tight', sans-serif; font-weight: 900;
    font-size: clamp(24px, 2.8vw, 36px); line-height: 1.1;
    letter-spacing: -0.02em; text-transform: uppercase; color: #F4F6F8; margin: 0 0 16px;
  }
  .intel-pim-exploded-header h2 em { font-style: italic; color: #47B5FF; }

  .intel-pim-exploded-sub {
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 300;
    line-height: 1.8; color: #7a9bb5; max-width: 580px; margin: 0 auto;
  }

  /* Exploded grid — two halves */
  .intel-pim-exploded-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .intel-pim-half {
    position: relative;
  }

  .intel-pim-half-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px; padding-bottom: 16px;
    border-bottom: 1px solid rgba(71,181,255,0.1);
  }

  .intel-pim-half-icon {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(71,181,255,0.2);
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    color: #47B5FF;
  }

  .intel-pim-half-title {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 800; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0.01em;
    color: #F4F6F8; margin: 0;
  }

  .intel-pim-half-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(122,155,181,0.4);
  }

  .intel-pim-feed-items {
    display: flex; flex-direction: column; gap: 0;
  }

  .intel-pim-feed-item {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(71,181,255,0.06);
    align-items: start;
    transition: all 0.25s ease;
  }

  .intel-pim-feed-item:hover {
    padding-left: 6px;
  }

  .intel-pim-feed-dot {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(71,181,255,0.15);
    font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
    color: rgba(71,181,255,0.45);
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  .intel-pim-feed-item:hover .intel-pim-feed-dot {
    border-color: rgba(71,181,255,0.4);
    color: #47B5FF;
    background: rgba(71,181,255,0.04);
  }

  .intel-pim-feed-label {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 500;
    color: rgba(244,246,248,0.75);
    margin: 0 0 3px;
    transition: color 0.25s ease;
  }

  .intel-pim-feed-item:hover .intel-pim-feed-label { color: #F4F6F8; }

  .intel-pim-feed-detail {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 400;
    line-height: 1.6; color: #5a7a96; margin: 0;
  }

  /* Divider between halves (vertical on desktop) */
  .intel-pim-divider {
    display: none;
  }

  /* Connector line between the two sections */
  .intel-pim-connector {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0 0;
    margin-top: 40px;
    border-top: 1px solid rgba(71,181,255,0.08);
  }

  .intel-pim-connector-text {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(71,181,255,0.35);
  }

  .intel-pim-connector-text em {
    color: #47B5FF;
    font-style: normal;
    font-weight: 500;
  }

  /* ═══ Responsive ═══ */
  @media (max-width: 900px) {
    .intel-pim-compare { grid-template-columns: 1fr; }
    .intel-pim-col { border-right: 1px solid rgba(11,60,93,0.07); border-bottom: none; }
    .intel-pim-col:last-child { border-bottom: 1px solid rgba(11,60,93,0.07); }
    .intel-pim-exploded-grid { grid-template-columns: 1fr; gap: 48px; }
    .intel-pim-exploded { margin-top: 56px; padding: 56px 20px 72px; }
  }

  @media (max-width: 480px) {
    .intel-pim { padding: 80px 20px 0; }
  }
</style>

<!-- ═══ SECTION A: 3-COLUMN COMPARISON ═══ -->
<section class="intel-pim">
  <div class="intel-pim-inner">

    <div class="intel-pim-header" id="intel-pim-header">
      <div class="intel-pim-eyebrow">Model Maturity Spectrum</div>
      <h2>Static Model \u2192 Smart Model \u2192 <em>PIM</em></h2>
      <p class="intel-pim-subtitle">Three levels of model maturity. Most teams deliver the first. Some achieve the second. We deliver the third \u2014 a Project Information Model that serves as the single source of truth for every decision on the programme.</p>
    </div>

    <div class="intel-pim-compare">

      <!-- STATIC MODEL -->
      <div class="intel-pim-col" data-intel-col="static" data-intel-pc>
        <span class="intel-pim-col-badge">Level 01</span>
        <h3>Static Model</h3>
        <p class="intel-pim-col-desc">Geometry exists. That\u2019s it. The model is a 3D representation of the design \u2014 visually useful but informationally empty. What most projects receive and call \u201cBIM.\u201d</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Embedded parameters</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Classification codes</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Clash-free coordination</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Data verification</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>CDE integration</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Contractual compliance</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 1 / 5 \u2014 Visual Only</div>
      </div>

      <!-- SMART MODEL -->
      <div class="intel-pim-col" data-intel-col="smart" data-intel-pc>
        <span class="intel-pim-col-badge">Level 02</span>
        <h3>Smart Model</h3>
        <p class="intel-pim-col-desc">Geometry with data. Parameters are populated, some classification applied. Coordination has been attempted. Better \u2014 but nobody has verified the data is correct, complete, or contractually compliant.</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Embedded parameters</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-partial">\u25D0</span>Classification codes (partial)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-partial">\u25D0</span>Clash detection (ad-hoc)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Data verification</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>CDE integration</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-cross">\u2717</span>Contractual compliance</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 2\u20133 / 5 \u2014 Partially Intelligent</div>
      </div>

      <!-- PIM -->
      <div class="intel-pim-col" data-intel-col="pim" data-intel-pc>
        <span class="intel-pim-col-badge">Level 03 \u2014 What We Deliver</span>
        <h3>Project Information Model</h3>
        <p class="intel-pim-col-desc">A verified, classified, coordinated, and audited digital asset. Every element carries contractually required data. Every report is extractable. Every decision is traceable to the model.</p>
        <div class="intel-pim-col-items">
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>3D geometry &amp; spatial layout</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>View generation &amp; sheets</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Embedded parameters (audited)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Full classification (Uniclass / OmniClass)</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Clash-free &amp; design-validated</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Data verified &amp; QTO-ready</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>CDE-integrated &amp; status-coded</div>
          <div class="intel-pim-item"><span class="intel-pim-item-icon intel-pim-check">\u2713</span>Contractually compliant &amp; sign-off ready</div>
        </div>
        <div class="intel-pim-col-verdict">MII Score: 5 / 5 \u2014 Decision-Ready</div>
      </div>

    </div>
  </div>

  <!-- ═══ SECTION B: EXPLODED PIM ═══ -->
  <div class="intel-pim-exploded">
    <div class="intel-pim-exploded-glow"></div>
    <div class="intel-pim-exploded-inner">

      <div class="intel-pim-exploded-header" id="intel-pim-exploded-header">
        <div class="intel-pim-exploded-eyebrow">Inside The PIM</div>
        <h2>What Goes Into A Project<br><em>Information</em> Model</h2>
        <p class="intel-pim-exploded-sub">The PIM is the convergence of graphical and non-graphical intelligence. Here\u2019s everything that feeds into the model your team will actually use to make decisions.</p>
      </div>

      <div class="intel-pim-exploded-grid">

        <!-- LEFT \u2014 Graphical -->
        <div class="intel-pim-half" data-intel-ph>
          <div class="intel-pim-half-header">
            <div class="intel-pim-half-icon">G</div>
            <div>
              <div class="intel-pim-half-title">Graphical Intelligence</div>
              <div class="intel-pim-half-sub">What you can see in the model</div>
            </div>
          </div>
          <div class="intel-pim-feed-items">
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">01</div>
              <div>
                <div class="intel-pim-feed-label">3D Geometry &amp; Spatial Positioning</div>
                <div class="intel-pim-feed-detail">Element shapes, dimensions, and locations \u2014 the visual representation of every building component at the contracted LOD.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">02</div>
              <div>
                <div class="intel-pim-feed-label">Federated Model Assembly</div>
                <div class="intel-pim-feed-detail">All discipline models combined with verified origins, correct positioning, and version-controlled references.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">03</div>
              <div>
                <div class="intel-pim-feed-label">Clash-Free Coordination</div>
                <div class="intel-pim-feed-detail">Spatial conflicts resolved across all discipline pairs. Hard clashes, soft clashes, and clearance violations eliminated before issue.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">04</div>
              <div>
                <div class="intel-pim-feed-label">Point Cloud &amp; Scan Integration</div>
                <div class="intel-pim-feed-detail">Reality capture data registered and overlaid \u2014 as-existing conditions verified against design intent with deviation analysis.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">05</div>
              <div>
                <div class="intel-pim-feed-label">4D Schedule Visualisation</div>
                <div class="intel-pim-feed-detail">Model elements linked to programme activities. Construction sequence simulated and validated before the first pour.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">06</div>
              <div>
                <div class="intel-pim-feed-label">Section, Detail &amp; Sheet Production</div>
                <div class="intel-pim-feed-detail">Views, annotations, and drawing sheets generated directly from the model \u2014 not redrawn in 2D.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT \u2014 Non-Graphical -->
        <div class="intel-pim-half" data-intel-ph>
          <div class="intel-pim-half-header">
            <div class="intel-pim-half-icon">NG</div>
            <div>
              <div class="intel-pim-half-title">Non-Graphical Intelligence</div>
              <div class="intel-pim-half-sub">What you can\u2019t see \u2014 but drives every decision</div>
            </div>
          </div>
          <div class="intel-pim-feed-items">
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">01</div>
              <div>
                <div class="intel-pim-feed-label">Element Parameters &amp; Property Sets</div>
                <div class="intel-pim-feed-detail">Materials, specifications, manufacturer data, fire ratings, acoustic values \u2014 embedded in every element, extractable and queryable.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">02</div>
              <div>
                <div class="intel-pim-feed-label">Classification &amp; Naming Compliance</div>
                <div class="intel-pim-feed-detail">Uniclass, OmniClass, or project-specific coding applied to every element. File naming per the EIR. CDE status codes enforced.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">03</div>
              <div>
                <div class="intel-pim-feed-label">Quantity Take-Off Data</div>
                <div class="intel-pim-feed-detail">Verified quantities by element, area, volume, and length \u2014 extracted directly from the model with full traceability to the spec.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">04</div>
              <div>
                <div class="intel-pim-feed-label">Issue Logs &amp; Coordination Records</div>
                <div class="intel-pim-feed-detail">BCF issues, clash resolution history, RFI linkage, and coordination meeting outcomes \u2014 the full audit trail of how the model was validated.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">05</div>
              <div>
                <div class="intel-pim-feed-label">LOD/LOI Compliance &amp; Model Health</div>
                <div class="intel-pim-feed-detail">BEP compliance scores, data completeness reports, model health metrics, and deliverable verification records at each milestone.</div>
              </div>
            </div>
            <div class="intel-pim-feed-item">
              <div class="intel-pim-feed-dot">06</div>
              <div>
                <div class="intel-pim-feed-label">CDE Metadata &amp; Audit Trail</div>
                <div class="intel-pim-feed-detail">Revision history, approval workflows, status transitions, access logs, and contractual sign-off records. The governance layer that makes the PIM legally defensible.</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="intel-pim-connector">
        <span class="intel-pim-connector-text">Graphical + Non-Graphical = <em>Decision-Ready Intelligence</em></span>
      </div>

    </div>
  </div>

</section>
`;

const script = `(function(){
  /* Header A */
  var hdr = document.getElementById('intel-pim-header');
  if (hdr) {
    hdr.style.opacity = '0';
    hdr.style.transform = 'translateY(20px)';
    var obsH = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hdr.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          hdr.style.opacity = '1';
          hdr.style.transform = 'translateY(0)';
          obsH.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH.observe(hdr);
  }

  /* Columns */
  var cols = document.querySelectorAll('[data-intel-pc]');
  cols.forEach(function(col, i) {
    col.style.opacity = '0';
    col.style.transform = 'translateY(24px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            col.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, border-color 0.4s ease';
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
          }, i * 150);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(col);
  });

  /* Header B */
  var hdr2 = document.getElementById('intel-pim-exploded-header');
  if (hdr2) {
    hdr2.style.opacity = '0';
    hdr2.style.transform = 'translateY(20px)';
    var obsH2 = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hdr2.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
          hdr2.style.opacity = '1';
          hdr2.style.transform = 'translateY(0)';
          obsH2.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obsH2.observe(hdr2);
  }

  /* Halves */
  var halves = document.querySelectorAll('[data-intel-ph]');
  halves.forEach(function(half, i) {
    half.style.opacity = '0';
    half.style.transform = 'translateY(24px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            half.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            half.style.opacity = '1';
            half.style.transform = 'translateY(0)';
          }, i * 180);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    obs.observe(half);
  });

  /* Feed items \u2014 stagger within each half */
  var feeds = document.querySelectorAll('.intel-pim-feed-item');
  feeds.forEach(function(fi, i) {
    fi.style.opacity = '0';
    fi.style.transform = 'translateX(-10px)';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() {
            fi.style.transition = 'opacity 0.45s ease, transform 0.45s ease, padding-left 0.25s ease';
            fi.style.opacity = '1';
            fi.style.transform = 'translateX(0)';
          }, (i % 6) * 80);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(fi);
  });
})();`;

export default function IntelligencePIM() {
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
