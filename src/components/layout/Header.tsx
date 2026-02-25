"use client"
import { useEffect } from 'react'

const headerHtml = `<!-- ============================================================
     INFRAFORMA — Header v3
     Updated nav: mega-menu Solutions · Knowledge categories ·
     About dropdown · Process link · Sitemap-aligned URLs
     Replace YOUR_LOGO_URL with your Webflow asset URL
     ============================================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;family=DM+Mono:wght@300;400;500&amp;display=swap');

.hdr-root *, .hdr-root *::before, .hdr-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.hdr-root {
  --bg:       #0B3C5D;
  --accent:   #47B5FF;
  --text:     #F4F6F8;
  --muted:    rgba(244,246,248,0.5);
  --border:   rgba(71,181,255,0.14);
  --drop-bg:  #071e2e;

  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
}

/* ── Progress bar ── */
.hdr-progress {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), rgba(71,181,255,0.3));
  z-index: 10;
  transition: width 0.08s linear;
}

/* ── Main bar ── */
.hdr-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 3.5%;
  height: 72px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: relative;
  transition: height 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s ease,
              box-shadow 0.45s ease, padding 0.45s ease;
  overflow: visible;
}

.hdr-root.hdr-hidden .hdr-bar {
  height: 44px;
  background: rgba(11,60,93,0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: none;
  border-bottom-color: transparent;
}

.hdr-root.hdr-compact .hdr-bar {
  height: 56px;
  background: rgba(11,60,93,0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: none;
  border-bottom-color: transparent;
}

/* ── Left nav ── */
.hdr-left {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
  padding-right: 32px;
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1);
}
.hdr-root.hdr-hidden .hdr-left {
  opacity: 0; pointer-events: none; transform: translateX(-16px);
}
.hdr-root.hdr-compact .hdr-left {
  opacity: 1; pointer-events: auto; transform: translateX(0);
}

/* ── Center logo ── */
.hdr-center {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
}
.hdr-logo {
  display: flex; align-items: center;
  text-decoration: none; flex-shrink: 0;
}
.hdr-logo img {
  height: 30px; width: auto; display: block;
  transition: height 0.4s ease;
}
.hdr-root.hdr-hidden .hdr-logo img,
.hdr-root.hdr-compact .hdr-logo img { height: 24px; }
.hdr-logo-text {
  font-family: 'Inter', sans-serif; font-size: 15px;
  font-weight: 800; color: var(--text);
  letter-spacing: 0.12em; text-transform: uppercase;
  transition: font-size 0.4s ease;
}
.hdr-root.hdr-hidden .hdr-logo-text,
.hdr-root.hdr-compact .hdr-logo-text { font-size: 13px; }

/* ── Right nav ── */
.hdr-right {
  display: flex; align-items: center; gap: 2px;
  justify-content: flex-start; padding-left: 32px;
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1);
}
.hdr-root.hdr-hidden .hdr-right {
  opacity: 0; pointer-events: none; transform: translateX(16px);
}
.hdr-root.hdr-compact .hdr-right {
  opacity: 1; pointer-events: auto; transform: translateX(0);
}

/* ── Nav links ── */
.hdr-nav-item { position: relative; list-style: none; }

.hdr-nav-link {
  display: flex; align-items: center; gap: 4px;
  padding: 7px 12px;
  font-size: 10.5px; font-weight: 500;
  letter-spacing: 0.13em; text-transform: uppercase;
  color: var(--muted);
  text-decoration: none; border-radius: 3px;
  white-space: nowrap; position: relative;
  transition: color 0.22s ease, background 0.22s ease;
}
.hdr-nav-link::after {
  content: '';
  position: absolute;
  bottom: 3px; left: 12px; right: 12px;
  height: 1px; background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.hdr-nav-link:hover, .hdr-nav-link.active {
  color: var(--text); background: rgba(71,181,255,0.08);
}
.hdr-nav-link:hover::after, .hdr-nav-link.active::after { transform: scaleX(1); }

.hdr-chev {
  font-size: 8px; opacity: 0.45;
  transition: transform 0.25s ease, opacity 0.25s ease;
  display: inline-block;
}
.hdr-nav-item.hdr-dd-open .hdr-chev { transform: rotate(180deg); opacity: 1; }

/* ── CTA button ── */
.hdr-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #0B3C5D; background: var(--accent);
  border-radius: 3px; padding: 8px 18px;
  text-decoration: none; margin-left: 8px;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  white-space: nowrap;
}
.hdr-cta:hover {
  background: #6bc5ff; transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(71,181,255,0.3);
}
.hdr-cta-arr { transition: transform 0.2s ease; }
.hdr-cta:hover .hdr-cta-arr { transform: translateX(3px); }

/* ══════════════════════════════════
   STANDARD DROPDOWN (Industries, About, Knowledge)
══════════════════════════════════ */
.hdr-dropdown {
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%) translateY(0px);
  min-width: 220px;
  background: var(--drop-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px 8px 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,0.6);
  opacity: 0; pointer-events: none;
  transition: opacity 0.18s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1);
  z-index: 200;
}
.hdr-dropdown.hdr-dd-open {
  opacity: 1; pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
/* Right-aligned variant */
.hdr-dropdown.dd-right {
  left: auto; right: 0;
  transform: translateY(0px);
}
.hdr-dropdown.dd-right.hdr-dd-open { transform: translateY(0); }

.hdr-dropdown::before {
  content: '';
  position: absolute;
  top: 7px; left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 9px; height: 9px;
  background: var(--drop-bg);
  border-left: 1px solid var(--border);
  border-top: 1px solid var(--border);
  z-index: 1;
}
.hdr-dropdown.dd-right::before { left: auto; right: 28px; }

/* Dropdown items */
.hdr-di {
  display: flex; align-items: center;
  padding: 9px 12px; border-radius: 3px;
  font-size: 11.5px; color: var(--muted);
  text-decoration: none; white-space: nowrap;
  transition: background 0.2s, color 0.2s, padding-left 0.2s;
  position: relative;
}
.hdr-di::before {
  content: ''; width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.22s ease, margin-right 0.22s ease;
  flex-shrink: 0;
}
.hdr-di:hover { background: rgba(71,181,255,0.08); color: var(--text); padding-left: 14px; }
.hdr-di:hover::before { width: 10px; margin-right: 8px; }

.hdr-di-num {
  font-size: 8px; letter-spacing: 0.14em;
  color: var(--accent); opacity: 0.5;
  margin-left: auto; padding-left: 12px; flex-shrink: 0;
}

/* Dropdown sub-label */
.hdr-dd-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--accent);
  opacity: 0.55; padding: 6px 12px 4px;
}

.hdr-dd-divider {
  height: 1px; background: var(--border); margin: 6px 8px;
}

/* Dropdown footer link */
.hdr-dd-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 12px; border-radius: 3px; margin-top: 2px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--accent);
  text-decoration: none; border-top: 1px solid var(--border);
  transition: background 0.2s, color 0.2s;
}
.hdr-dd-footer:hover { background: rgba(71,181,255,0.08); color: #fff; }

/* ══════════════════════════════════
   MEGA-MENU (Solutions)
══════════════════════════════════ */
.hdr-mega {
  position: fixed;  /* fixed so it spans full width */
  top: 72px; left: 0; right: 0;
  background: var(--drop-bg);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 24px 64px rgba(0,0,0,0.65);
  opacity: 0; pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1);
  z-index: 200;
}
.hdr-mega.hdr-dd-open {
  opacity: 1; pointer-events: auto; transform: translateY(0);
}
/* Compact header adjust */
.hdr-root.hdr-compact .hdr-mega { top: 56px; }
.hdr-root.hdr-hidden .hdr-mega  { top: 44px; }

.hdr-mega-inner {
  max-width: 1400px; margin: 0 auto;
  padding: 32px 5% 28px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0 40px;
}

/* Left: section title */
.hdr-mega-aside {
  border-right: 1px solid var(--border);
  padding-right: 32px;
  display: flex; flex-direction: column; justify-content: space-between;
}
.hdr-mega-aside-title {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--accent);
  opacity: 0.6; margin-bottom: 10px;
}
.hdr-mega-aside-headline {
  font-size: 17px; font-weight: 700;
  color: var(--text); line-height: 1.3;
  margin-bottom: 16px;
}
.hdr-mega-aside-desc {
  font-size: 11.5px; color: var(--muted);
  line-height: 1.7; margin-bottom: 20px;
}
.hdr-mega-all {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--accent);
  text-decoration: none; padding: 8px 14px;
  border: 1px solid rgba(71,181,255,0.25); border-radius: 3px;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.hdr-mega-all:hover { background: rgba(71,181,255,0.1); color: #fff; border-color: rgba(71,181,255,0.5); }
.hdr-mega-all-arr { transition: transform 0.2s ease; }
.hdr-mega-all:hover .hdr-mega-all-arr { transform: translateX(3px); }

/* Right: 2×3 solution grid */
.hdr-mega-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.hdr-mega-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 16px; border-radius: 4px;
  text-decoration: none;
  transition: background 0.22s ease;
  position: relative;
  overflow: hidden;
}
.hdr-mega-item::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px; background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
}
.hdr-mega-item:hover { background: rgba(71,181,255,0.06); }
.hdr-mega-item:hover::before { transform: scaleX(1); }

.hdr-mega-icon {
  font-size: 18px; flex-shrink: 0; margin-top: 1px;
  opacity: 0.85; line-height: 1;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.hdr-mega-item:hover .hdr-mega-icon { transform: scale(1.15) translateY(-1px); }

.hdr-mega-item-body { flex: 1; min-width: 0; }
.hdr-mega-num {
  font-family: 'DM Mono', monospace;
  font-size: 8.5px; letter-spacing: 0.18em;
  color: var(--accent); opacity: 0.5; margin-bottom: 3px;
}
.hdr-mega-title {
  font-size: 12.5px; font-weight: 700; color: var(--text);
  margin-bottom: 4px; line-height: 1.2;
  transition: color 0.2s;
}
.hdr-mega-item:hover .hdr-mega-title { color: #fff; }
.hdr-mega-desc {
  font-size: 10.5px; color: var(--muted);
  line-height: 1.6; transition: color 0.2s;
}
.hdr-mega-item:hover .hdr-mega-desc { color: rgba(244,246,248,0.65); }

/* ── Hamburger ── */
.hdr-burger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; padding: 6px;
  border: 1px solid var(--border); border-radius: 3px;
  background: none; position: absolute; right: 4%;
}
.hdr-burger span {
  display: block; width: 20px; height: 1.5px;
  background: var(--text); border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.hdr-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hdr-burger.open span:nth-child(2) { opacity: 0; }
.hdr-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile drawer ── */
.hdr-mob {
  position: fixed;
  top: 72px; left: 0; right: 0;
  background: rgba(7,30,46,0.99);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  max-height: 0; overflow: hidden;
  transition: max-height 0.42s cubic-bezier(0.4,0,0.2,1);
  z-index: 9990;
}
.hdr-mob.open { max-height: 92vh; overflow-y: auto; }
.hdr-mob-inner { padding: 12px 6% 32px; }

.hdr-mob-link {
  display: flex; align-items: center;
  justify-content: space-between; padding: 15px 0;
  font-size: 16px; font-weight: 700;
  color: var(--muted); text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s; cursor: pointer;
}
.hdr-mob-link:hover { color: var(--text); }

.hdr-mob-sub {
  max-height: 0; overflow: hidden;
  transition: max-height 0.35s ease;
  padding-left: 0;
}
.hdr-mob-sub.open { max-height: 600px; }

/* Section label inside mobile sub */
.hdr-mob-sub-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--accent);
  opacity: 0.55; padding: 12px 0 4px;
  display: block;
}

.hdr-mob-sub a {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 11px 0;
  font-size: 13px; color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid rgba(71,181,255,0.06);
  transition: color 0.2s, padding-left 0.2s;
}
.hdr-mob-sub a:hover { color: var(--accent); padding-left: 6px; }
.hdr-mob-sub a:last-child { border: none; }

.hdr-mob-sub-desc {
  font-size: 10.5px; color: rgba(244,246,248,0.3);
  line-height: 1.5; margin-top: 2px;
  transition: color 0.2s;
  display: block;
}
.hdr-mob-sub a:hover .hdr-mob-sub-desc { color: rgba(71,181,255,0.5); }

.hdr-mob-sub-name { display: block; font-weight: 600; }

.hdr-mob-cta {
  margin-top: 24px; display: block;
  text-align: center; padding: 14px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: #0B3C5D; background: var(--accent);
  border-radius: 3px; text-decoration: none;
  transition: background 0.22s;
}
.hdr-mob-cta:hover { background: #6bc5ff; }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .hdr-left, .hdr-right { display: none; }
  .hdr-burger { display: flex; }
}
@media (min-width: 1101px) { .hdr-mob { display: none; } }
@media (min-width: 1800px) {
  .hdr-bar { height: 78px; }
  .hdr-nav-link { font-size: 11px; padding: 8px 14px; }
  .hdr-mega { top: 78px; }
  .hdr-root.hdr-compact .hdr-mega { top: 56px; }
}
@media (max-width: 1300px) {
  .hdr-mega-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>

<!-- ════════════════════════════════════════ HTML ═══════════════════════════════════ -->
<div class="hdr-root" id="hdrRoot">
  <div class="hdr-progress" id="hdrProg"></div>

  <div class="hdr-bar">

    <!-- ── LEFT NAV ── -->
    <div class="hdr-left">
      <ul style="display:flex;align-items:center;gap:2px;list-style:none">

        <!-- Solutions — mega-menu trigger -->
        <li class="hdr-nav-item" id="niSolutions">
          <a href="/solutions/" class="hdr-nav-link">Solutions <span class="hdr-chev">▾</span></a>
        </li>

        <!-- Industries -->
        <li class="hdr-nav-item" id="niIndustries">
          <a href="/industries/" class="hdr-nav-link">Industries <span class="hdr-chev">▾</span></a>
          <div class="hdr-dropdown" id="ddIndustries">
            <div class="hdr-dd-label">Sectors We Serve</div>
            <a href="/industries/infrastructure/"    class="hdr-di">Civil Infrastructure      <span class="hdr-di-num">01</span></a>
            <a href="/industries/institutional/"     class="hdr-di">Institutional             <span class="hdr-di-num">02</span></a>
            <a href="/industries/commercial/"        class="hdr-di">Commercial                <span class="hdr-di-num">03</span></a>
            <a href="/industries/industrial/"        class="hdr-di">Industrial &amp; Heavy    <span class="hdr-di-num">04</span></a>
            <a href="/industries/transit-transport/" class="hdr-di">Transit &amp; Transport   <span class="hdr-di-num">05</span></a>
            <a href="/industries/" class="hdr-dd-footer">All Industries <span>→</span></a>
          </div>
        </li>

        <!-- Who We Support -->
        <li class="hdr-nav-item" id="niWho">
          <a href="/who-we-support/" class="hdr-nav-link">Who We Support <span class="hdr-chev">▾</span></a>
          <div class="hdr-dropdown" id="ddWho">
            <div class="hdr-dd-label">Stakeholders</div>
            <a href="/who-we-support/contractors/"       class="hdr-di">Contractors</a>
            <a href="/who-we-support/architects/"        class="hdr-di">Architects &amp; Designers</a>
            <a href="/who-we-support/engineers/"         class="hdr-di">Engineers</a>
            <a href="/who-we-support/owners/"            class="hdr-di">Owners &amp; Developers</a>
            <a href="/who-we-support/government/"        class="hdr-di">Government &amp; Agencies</a>
            <a href="/who-we-support/consultants-pms/"   class="hdr-di">Consultants &amp; PMs</a>
            <a href="/who-we-support/" class="hdr-dd-footer">View All <span>→</span></a>
          </div>
        </li>

        <!-- Process — standalone link -->
        <li class="hdr-nav-item">
          <a href="/process/" class="hdr-nav-link">Process</a>
        </li>

      </ul>
    </div>

    <!-- ── CENTER LOGO ── -->
    <div class="hdr-center">
      <a href="/" class="hdr-logo">
        <img src="YOUR_LOGO_URL" alt="Infraforma"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
        <span class="hdr-logo-text" style="display:none">INFRAFORMA</span>
      </a>
    </div>

    <!-- ── RIGHT NAV ── -->
    <div class="hdr-right">
      <ul style="display:flex;align-items:center;gap:2px;list-style:none">

        <!-- Knowledge -->
        <li class="hdr-nav-item" id="niKnowledge">
          <a href="/knowledge/" class="hdr-nav-link">Knowledge <span class="hdr-chev">▾</span></a>
          <div class="hdr-dropdown dd-right" id="ddKnowledge">
            <div class="hdr-dd-label">Learn</div>
            <a href="/knowledge/?cat=bim-basics"      class="hdr-di">BIM Basics &amp; Standards</a>
            <a href="/knowledge/?cat=digital-delivery" class="hdr-di">Digital Delivery Guides</a>
            <a href="/knowledge/?cat=iso-standards"    class="hdr-di">ISO 19650 &amp; Compliance</a>
            <a href="/knowledge/?cat=tools"            class="hdr-di">Tools &amp; Technology</a>
            <div class="hdr-dd-divider"></div>
            <div class="hdr-dd-label">Projects</div>
            <a href="/case-studies/"  class="hdr-di">Case Studies</a>
            <a href="/knowledge/" class="hdr-dd-footer">All Resources <span>→</span></a>
          </div>
        </li>

        <!-- About -->
        <li class="hdr-nav-item" id="niAbout">
          <a href="/about/" class="hdr-nav-link">About <span class="hdr-chev">▾</span></a>
          <div class="hdr-dropdown dd-right" id="ddAbout">
            <div class="hdr-dd-label">Company</div>
            <a href="/about/"          class="hdr-di">About Infraforma</a>
            <a href="/about/team/"     class="hdr-di">Our Team</a>
            <a href="/about/news/"     class="hdr-di">News &amp; Press</a>
            <div class="hdr-dd-divider"></div>
            <a href="/locations/quebec-city/" class="hdr-di">Québec City Office</a>
          </div>
        </li>

        <!-- Contact plain link -->
        <li class="hdr-nav-item">
          <a href="/contact/" class="hdr-nav-link">Contact</a>
        </li>

        <!-- CTA -->
        <li class="hdr-nav-item">
          <a href="/contact/" class="hdr-cta">Schedule a Call <span class="hdr-cta-arr">→</span></a>
        </li>

      </ul>
    </div>

    <!-- Mobile burger -->
    <button class="hdr-burger" id="hdrBurger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>

  </div><!-- /hdr-bar -->

  <!-- ════════════════════════ MEGA-MENU — Solutions ════════════════════════ -->
  <div class="hdr-mega" id="megaSolutions">
    <div class="hdr-mega-inner">

      <!-- Aside -->
      <div class="hdr-mega-aside">
        <div>
          <div class="hdr-mega-aside-title">Our Solutions</div>
          <div class="hdr-mega-aside-headline">End-to-end digital delivery across the full project lifecycle</div>
          <div class="hdr-mega-aside-desc">From BIM strategy on day one to digital twin handover — structured around how you actually build.</div>
        </div>
        <a href="/solutions/" class="hdr-mega-all">All Solutions <span class="hdr-mega-all-arr">→</span></a>
      </div>

      <!-- 2×3 grid -->
      <div class="hdr-mega-grid">

        <a href="/solutions/strategy/" class="hdr-mega-item">
          <span class="hdr-mega-icon">🎯</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">01</div>
            <div class="hdr-mega-title">Strategy</div>
            <div class="hdr-mega-desc">BIM execution plans, EIR development, and digital delivery roadmaps.</div>
          </div>
        </a>

        <a href="/solutions/structure/" class="hdr-mega-item">
          <span class="hdr-mega-icon">🏗️</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">02</div>
            <div class="hdr-mega-title">Structure</div>
            <div class="hdr-mega-desc">CDE setup, naming conventions, LOD frameworks, and data architecture.</div>
          </div>
        </a>

        <a href="/solutions/intelligence/" class="hdr-mega-item">
          <span class="hdr-mega-icon">🧠</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">03</div>
            <div class="hdr-mega-title">Intelligence</div>
            <div class="hdr-mega-desc">BIM modelling, clash detection, scan-to-BIM, and quantity verification.</div>
          </div>
        </a>

        <a href="/solutions/execution/" class="hdr-mega-item">
          <span class="hdr-mega-icon">⚙️</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">04</div>
            <div class="hdr-mega-title">Execution</div>
            <div class="hdr-mega-desc">4D scheduling, digital work packaging, and construction BIM compliance.</div>
          </div>
        </a>

        <a href="/solutions/project-twin/" class="hdr-mega-item">
          <span class="hdr-mega-icon">🌐</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">05</div>
            <div class="hdr-mega-title">Project Twin</div>
            <div class="hdr-mega-desc">As-built models, COBie handover, and operations-ready digital twins.</div>
          </div>
        </a>

        <a href="/solutions/insights/" class="hdr-mega-item">
          <span class="hdr-mega-icon">📊</span>
          <div class="hdr-mega-item-body">
            <div class="hdr-mega-num">06</div>
            <div class="hdr-mega-title">Insights</div>
            <div class="hdr-mega-desc">Project dashboards, BIM auditing, 5D analytics, and progress tracking.</div>
          </div>
        </a>

      </div><!-- /hdr-mega-grid -->
    </div><!-- /hdr-mega-inner -->
  </div><!-- /mega -->

</div><!-- /hdr-root -->

<!-- ═══════════════════════ MOBILE DRAWER ═══════════════════════ -->
<div class="hdr-mob" id="hdrMob">
  <div class="hdr-mob-inner">

    <!-- Solutions -->
    <div class="hdr-mob-link" data-sub="ms1">Solutions <span id="ms1ic">+</span></div>
    <div class="hdr-mob-sub" id="ms1">
      <a href="/solutions/strategy/"><span class="hdr-mob-sub-name">Strategy</span><span class="hdr-mob-sub-desc">BIM plans, EIR, digital roadmaps</span></a>
      <a href="/solutions/structure/"><span class="hdr-mob-sub-name">Structure</span><span class="hdr-mob-sub-desc">CDE, naming, LOD frameworks</span></a>
      <a href="/solutions/intelligence/"><span class="hdr-mob-sub-name">Intelligence</span><span class="hdr-mob-sub-desc">Modelling, clash detection, scan-to-BIM</span></a>
      <a href="/solutions/execution/"><span class="hdr-mob-sub-name">Execution</span><span class="hdr-mob-sub-desc">4D scheduling, work packaging</span></a>
      <a href="/solutions/project-twin/"><span class="hdr-mob-sub-name">Project Twin</span><span class="hdr-mob-sub-desc">As-built, COBie, digital handover</span></a>
      <a href="/solutions/insights/"><span class="hdr-mob-sub-name">Insights</span><span class="hdr-mob-sub-desc">Dashboards, auditing, 5D analytics</span></a>
      <a href="/solutions/" style="color:var(--accent);font-weight:700;padding:12px 0 4px;border:none">View All Solutions →</a>
    </div>

    <!-- Industries -->
    <div class="hdr-mob-link" data-sub="ms2">Industries <span id="ms2ic">+</span></div>
    <div class="hdr-mob-sub" id="ms2">
      <a href="/industries/infrastructure/">Civil Infrastructure</a>
      <a href="/industries/institutional/">Institutional</a>
      <a href="/industries/commercial/">Commercial</a>
      <a href="/industries/industrial/">Industrial &amp; Heavy</a>
      <a href="/industries/transit-transport/">Transit &amp; Transport</a>
    </div>

    <!-- Who We Support -->
    <div class="hdr-mob-link" data-sub="ms3">Who We Support <span id="ms3ic">+</span></div>
    <div class="hdr-mob-sub" id="ms3">
      <a href="/who-we-support/contractors/">Contractors</a>
      <a href="/who-we-support/architects/">Architects &amp; Designers</a>
      <a href="/who-we-support/engineers/">Engineers</a>
      <a href="/who-we-support/owners/">Owners &amp; Developers</a>
      <a href="/who-we-support/government/">Government &amp; Agencies</a>
      <a href="/who-we-support/consultants-pms/">Consultants &amp; PMs</a>
    </div>

    <!-- Process -->
    <a href="/process/" class="hdr-mob-link">Process</a>

    <!-- Knowledge -->
    <div class="hdr-mob-link" data-sub="ms4">Knowledge <span id="ms4ic">+</span></div>
    <div class="hdr-mob-sub" id="ms4">
      <span class="hdr-mob-sub-label">Guides</span>
      <a href="/knowledge/?cat=bim-basics">BIM Basics &amp; Standards</a>
      <a href="/knowledge/?cat=digital-delivery">Digital Delivery Guides</a>
      <a href="/knowledge/?cat=iso-standards">ISO 19650 &amp; Compliance</a>
      <a href="/knowledge/?cat=tools">Tools &amp; Technology</a>
      <span class="hdr-mob-sub-label">Projects</span>
      <a href="/case-studies/">Case Studies</a>
      <a href="/knowledge/" style="color:var(--accent);font-weight:700;padding:10px 0 4px;border:none">All Resources →</a>
    </div>

    <!-- About -->
    <div class="hdr-mob-link" data-sub="ms5">About <span id="ms5ic">+</span></div>
    <div class="hdr-mob-sub" id="ms5">
      <a href="/about/">About Infraforma</a>
      <a href="/about/team/">Our Team</a>
      <a href="/about/news/">News &amp; Press</a>
      <a href="/locations/quebec-city/">Québec City Office</a>
    </div>

    <a href="/contact/" class="hdr-mob-link">Contact</a>
    <a href="/contact/" class="hdr-mob-cta">Schedule a Call →</a>

  </div>
</div>`
const headerScript = "(function(){\n'use strict';\n\nvar root     = document.getElementById('hdrRoot');\nvar prog     = document.getElementById('hdrProg');\nvar burger   = document.getElementById('hdrBurger');\nvar mob      = document.getElementById('hdrMob');\nvar mega     = document.getElementById('megaSolutions');\nvar niSol    = document.getElementById('niSolutions');\n\n// \u2500\u2500 Scroll behaviour \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nvar lastY = 0, ticking = false;\nfunction onScroll(){\n  var y = window.pageYOffset;\n  if(y < 6){\n    root.classList.remove('hdr-hidden','hdr-compact');\n  } else if(y > lastY + 4){\n    root.classList.add('hdr-hidden');\n    root.classList.remove('hdr-compact');\n    closeAll();\n  } else if(y < lastY - 4){\n    root.classList.remove('hdr-hidden');\n    root.classList.add('hdr-compact');\n  }\n  lastY = y;\n  // progress bar\n  var docH = document.documentElement.scrollHeight - window.innerHeight;\n  prog.style.width = (docH > 0 ? (y / docH * 100) : 0) + '%';\n}\nwindow.addEventListener('scroll', function(){\n  if(!ticking){ requestAnimationFrame(function(){ onScroll(); ticking=false; }); ticking=true; }\n}, {passive:true});\n\n// \u2500\u2500 Active page highlight \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nvar path = window.location.pathname;\ndocument.querySelectorAll('.hdr-nav-link').forEach(function(a){\n  if(a.getAttribute('href') && path.startsWith(a.getAttribute('href').replace(/\\/$/,''))){\n    a.classList.add('active');\n  }\n});\n\n// \u2500\u2500 Dropdown logic \u2014 standard dropdowns \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nvar stdItems = [\n  { ni: document.getElementById('niIndustries'),  dd: document.getElementById('ddIndustries') },\n  { ni: document.getElementById('niWho'),         dd: document.getElementById('ddWho') },\n  { ni: document.getElementById('niKnowledge'),   dd: document.getElementById('ddKnowledge') },\n  { ni: document.getElementById('niAbout'),       dd: document.getElementById('ddAbout') },\n];\n\nfunction closeAll(){\n  stdItems.forEach(function(o){\n    if(o.dd){ o.dd.classList.remove('hdr-dd-open'); o.ni.classList.remove('hdr-dd-open'); }\n  });\n  mega.classList.remove('hdr-dd-open');\n  niSol.classList.remove('hdr-dd-open');\n}\n\nstdItems.forEach(function(o){\n  if(!o.ni || !o.dd) return;\n  var t = null;\n  function open(){\n    closeAll();\n    clearTimeout(t);\n    o.ni.classList.add('hdr-dd-open');\n    o.dd.classList.add('hdr-dd-open');\n  }\n  function schedClose(){\n    clearTimeout(t);\n    t = setTimeout(function(){\n      o.ni.classList.remove('hdr-dd-open');\n      o.dd.classList.remove('hdr-dd-open');\n    }, 300);\n  }\n  o.ni.addEventListener('mouseenter', open);\n  o.ni.addEventListener('mouseleave', schedClose);\n  o.dd.addEventListener('mouseenter', function(){ clearTimeout(t); open(); });\n  o.dd.addEventListener('mouseleave', schedClose);\n});\n\n// \u2500\u2500 Mega-menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nvar megaT = null;\nfunction openMega(){\n  closeAll();\n  clearTimeout(megaT);\n  niSol.classList.add('hdr-dd-open');\n  mega.classList.add('hdr-dd-open');\n}\nfunction schedCloseMega(){\n  clearTimeout(megaT);\n  megaT = setTimeout(function(){\n    niSol.classList.remove('hdr-dd-open');\n    mega.classList.remove('hdr-dd-open');\n  }, 300);\n}\nniSol.addEventListener('mouseenter', openMega);\nniSol.addEventListener('mouseleave', schedCloseMega);\nmega.addEventListener('mouseenter', function(){ clearTimeout(megaT); openMega(); });\nmega.addEventListener('mouseleave', schedCloseMega);\n\n// Close on outside click\ndocument.addEventListener('click', function(e){\n  if(!root.contains(e.target) && !mega.contains(e.target)){ closeAll(); }\n});\n\n// \u2500\u2500 Mobile burger \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nburger.addEventListener('click', function(){\n  burger.classList.toggle('open');\n  mob.classList.toggle('open');\n});\n\n// \u2500\u2500 Mobile accordions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nvar subs = ['ms1','ms2','ms3','ms4','ms5'];\nsubs.forEach(function(id){\n  var trigger = document.querySelector('[data-sub=\"'+id+'\"]');\n  var sub     = document.getElementById(id);\n  var ic      = document.getElementById(id+'ic');\n  if(!trigger||!sub) return;\n  trigger.addEventListener('click', function(){\n    var isOpen = sub.classList.contains('open');\n    subs.forEach(function(oid){\n      var os = document.getElementById(oid);\n      var oi = document.getElementById(oid+'ic');\n      if(os){ os.classList.remove('open'); }\n      if(oi){ oi.textContent = '+'; }\n    });\n    if(!isOpen){\n      sub.classList.add('open');\n      if(ic) ic.textContent = '\u2212';\n    }\n  });\n});\n\n}());"

export default function Header() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(headerScript)()
      } catch(e) {
        console.error('Header script error:', e)
      }

      const burger = document.getElementById('hdrBurger')
      const mob = document.getElementById('hdrMob')
      if (!burger || !mob) return

      document.body.appendChild(mob)

      Object.assign(mob.style, {
        position: 'fixed',
        top: '72px',
        left: '0',
        right: '0',
        width: '100%',
        zIndex: '99999',
        background: 'rgba(7,30,46,0.99)',
        backdropFilter: 'blur(18px)',
        borderBottom: 'none',
        maxHeight: '0px',
        overflow: 'hidden',
        transition: 'max-height 0.42s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
        display: 'block',
        boxSizing: 'border-box',
      })

      const b = burger.cloneNode(true) as HTMLElement
      burger.parentNode?.replaceChild(b, burger)

      const subs = ['ms1','ms2','ms3','ms4','ms5']
      subs.forEach((id) => {
        const trigger = document.querySelector(`[data-sub="${id}"]`) as HTMLElement
        const sub = document.getElementById(id) as HTMLElement
        const ic = document.getElementById(id + 'ic') as HTMLElement
        if (!trigger || !sub) return
        const freshTrigger = trigger.cloneNode(true) as HTMLElement
        trigger.parentNode?.replaceChild(freshTrigger, trigger)
        freshTrigger.addEventListener('click', () => {
          const isOpen = sub.classList.contains('open')
          subs.forEach((oid) => {
            const os = document.getElementById(oid)
            const oi = document.getElementById(oid + 'ic')
            if (os) os.classList.remove('open')
            if (oi) oi.textContent = '+'
          })
          if (!isOpen) {
            sub.classList.add('open')
            if (ic) ic.textContent = '−'
          }
        })
      })

      b.addEventListener('click', (e) => {
        e.stopPropagation()
        const isOpen = b.classList.contains('open')
        if (isOpen) {
          b.classList.remove('open')
          mob.style.maxHeight = '0px'
          setTimeout(() => { mob.style.overflow = 'hidden' }, 420)
        } else {
          b.classList.add('open')
          mob.style.overflow = 'auto'
          mob.style.maxHeight = '92vh'
        }
      })
    }, 100)
  }, [])

  return (
    <>
      <div
        suppressHydrationWarning
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, overflow: 'visible' }}
        dangerouslySetInnerHTML={{ __html: headerHtml }}
      />
      <style suppressHydrationWarning>{`
        .hdr-mob-inner { padding: 8px 6% 32px !important; }
        .hdr-mob-link {
          display: flex !important; align-items: center !important;
          justify-content: space-between !important; padding: 16px 0 !important;
          font-size: 17px !important; font-weight: 700 !important;
          color: rgba(244,246,248,0.85) !important; text-decoration: none !important;
          border-bottom: 1px solid rgba(71,181,255,0.12) !important; cursor: pointer !important;
        }
        .hdr-mob-link:hover { color: #fff !important; }
        .hdr-mob-sub { max-height: 0 !important; overflow: hidden !important; transition: max-height 0.35s ease !important; }
        .hdr-mob-sub.open { max-height: 600px !important; }
        .hdr-mob-sub a {
          display: flex !important; flex-direction: column !important;
          padding: 12px 0 12px 12px !important; font-size: 13px !important;
          color: rgba(244,246,248,0.6) !important; text-decoration: none !important;
          border-bottom: 1px solid rgba(71,181,255,0.06) !important;
        }
        .hdr-mob-sub a:hover { color: #47B5FF !important; padding-left: 18px !important; }
        .hdr-mob-sub-name { display: block !important; font-weight: 600 !important; color: rgba(244,246,248,0.85) !important; }
        .hdr-mob-sub-desc { display: block !important; font-size: 11px !important; color: rgba(244,246,248,0.3) !important; margin-top: 2px !important; }
        .hdr-mob-sub-label { display: block !important; font-size: 9px !important; letter-spacing: 0.22em !important; text-transform: uppercase !important; color: #47B5FF !important; opacity: 0.6 !important; padding: 12px 0 4px 12px !important; }
        .hdr-mob-cta { display: block !important; margin-top: 24px !important; text-align: center !important; padding: 15px !important; font-size: 12px !important; font-weight: 700 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #0B3C5D !important; background: #47B5FF !important; border-radius: 3px !important; text-decoration: none !important; }
        .hdr-mob-cta:hover { background: #6bc5ff !important; }
        .hdr-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg) !important; }
        .hdr-burger.open span:nth-child(2) { opacity: 0 !important; }
        .hdr-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg) !important; }
      `}</style>
    </>
  )
}
