"use client"

const footerHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ftr *, .ftr *::before, .ftr *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ftr {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #060e18;
  --card-bg: rgba(71,181,255,0.03);
  --card-border: rgba(71,181,255,0.08);
  --text: #F0F4F7;
  --muted: rgba(244,246,248,0.4);
  --mono: 'DM Mono', monospace;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Subtle top glow */
.ftr::before {
  content: '';
  position: absolute;
  top: -200px; left: 50%;
  transform: translateX(-50%);
  width: 800px; height: 400px;
  background: radial-gradient(ellipse, rgba(71,181,255,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ══ Cards grid ══ */
.ftr-cards {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(64px,7vw,100px) clamp(24px,5%,64px) 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.ftr-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: clamp(28px,2.5vw,40px) clamp(24px,2vw,32px);
  position: relative;
  transition: border-color 0.35s, background 0.35s;
}
.ftr-card:hover {
  border-color: rgba(71,181,255,0.15);
  background: rgba(71,181,255,0.05);
}

/* Top accent arc on each card */
.ftr-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 20%;
  right: 20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.4;
  border-radius: 0 0 50% 50%;
}

.ftr-card-title {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
  width: 100%;
}

.ftr-card-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ftr-card-links a {
  display: block;
  padding: 6px 0;
  font-size: 13.5px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.25s, padding-left 0.25s;
}
.ftr-card-links a:hover {
  color: var(--text);
  padding-left: 6px;
}

/* Two-column link layout for card with many items */
.ftr-card-links-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
.ftr-card-links-grid a {
  display: block;
  padding: 6px 0;
  font-size: 13.5px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.25s, padding-left 0.25s;
}
.ftr-card-links-grid a:hover {
  color: var(--text);
  padding-left: 6px;
}

/* Cert badges in last card */
.ftr-badges {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(71,181,255,0.06);
}
.ftr-badge {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.35);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 6px;
  padding: 8px 12px;
  background: rgba(71,181,255,0.02);
  line-height: 1.4;
  text-align: center;
}

/* ══ Bottom bar ══ */
.ftr-bottom-outer {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(40px,4vw,56px) clamp(24px,5%,64px) clamp(32px,3vw,44px);
}

.ftr-bottom {
  border-top: 1px solid rgba(71,181,255,0.06);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.ftr-brand-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.6;
}

.ftr-copy {
  font-family: var(--mono);
  font-size: 11px;
  color: rgba(244,246,248,0.2);
  letter-spacing: 0.04em;
}

.ftr-socials {
  display: flex;
  gap: 12px;
}
.ftr-social {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(71,181,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--muted);
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.25);
  color: var(--accent);
  transform: translateY(-2px);
}
.ftr-social svg { width: 14px; height: 14px; }

/* ══ Decorative bottom gradient ══ */
.ftr-glow {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(71,181,255,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ══ Responsive ══ */
@media (max-width: 1100px) {
  .ftr-cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .ftr-cards { grid-template-columns: 1fr; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
}
@media (min-width: 1800px) {
  .ftr-cards, .ftr-bottom-outer { max-width: 1600px; }
}
</style>

<footer class="ftr">

  <div class="ftr-glow"></div>

  <!-- Cards -->
  <div class="ftr-cards">

    <!-- Solutions -->
    <div class="ftr-card">
      <p class="ftr-card-title">Solutions</p>
      <ul class="ftr-card-links">
        <li><a href="/solutions/strategy">Strategy &amp; Governance</a></li>
        <li><a href="/solutions/intelligence">Digital Delivery</a></li>
        <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
        <li><a href="/solutions">All Solutions</a></li>
      </ul>
    </div>

    <!-- Company -->
    <div class="ftr-card">
      <p class="ftr-card-title">Company</p>
      <ul class="ftr-card-links">
        <li><a href="/about">About Us</a></li>
        <li><a href="/process">Our Process</a></li>
        <li><a href="/who-we-support">Who We Support</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </div>

    <!-- Industries -->
    <div class="ftr-card">
      <p class="ftr-card-title">Industries</p>
      <ul class="ftr-card-links">
        <li><a href="/industries/heavy-civil">Heavy Civil</a></li>
        <li><a href="/industries/mining">Mining</a></li>
        <li><a href="/industries/energy">Energy</a></li>
        <li><a href="/industries/institutional">Institutional</a></li>
        <li><a href="/industries/industrial">Industrial</a></li>
        <li><a href="/industries/commercial">Commercial</a></li>
      </ul>
    </div>

    <!-- Knowledge & Support -->
    <div class="ftr-card">
      <p class="ftr-card-title">Knowledge</p>
      <ul class="ftr-card-links">
        <li><a href="/knowledge">Knowledge Base</a></li>
        <li><a href="/knowledge/?cat=bim-basics">BIM Basics</a></li>
        <li><a href="/knowledge/?cat=iso-standards">ISO Standards</a></li>
        <li><a href="/case-studies">Case Studies</a></li>
      </ul>
      <div class="ftr-badges">
        <span class="ftr-badge">ISO 19650</span>
        <span class="ftr-badge">Quebec Based</span>
        <span class="ftr-badge">Platform Agnostic</span>
      </div>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="ftr-bottom-outer">
    <div class="ftr-bottom">
      <span class="ftr-brand-name">Infraforma</span>
      <p class="ftr-copy">&copy; 2025 Infraforma Inc. All rights reserved.</p>
      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </div>
  </div>

</footer>`

export default function Footer() {
  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: footerHtml }} />
  )
}
