"use client"

const footerHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ftr *, .ftr *::before, .ftr *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ftr {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #050c14;
  --text: #F0F4F7;
  --muted: rgba(244,246,248,0.35);
  --muted-h: rgba(244,246,248,0.6);
  --border: rgba(71,181,255,0.06);
  --mono: 'DM Mono', monospace;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Top accent */
.ftr::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.15) 30%, var(--accent) 50%, rgba(71,181,255,0.15) 70%, transparent 95%);
  z-index: 2;
}

/* ══ Main grid ══ */
.ftr-body {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: clamp(80px,8vw,120px) clamp(24px,5%,64px) clamp(56px,5vw,80px);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 48px 32px;
}

/* ══ Brand column ══ */
.ftr-brand {}

.ftr-logo {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 24px; text-decoration: none;
}
.ftr-logo-mark { width: 36px; height: 36px; flex-shrink: 0; }
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 18px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}

.ftr-brand-tagline {
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(20px,1.8vw,28px);
  font-weight: 900; color: var(--text);
  line-height: 1.15; margin-bottom: 16px;
  max-width: 300px;
}
.ftr-brand-tagline span { color: var(--accent); }

.ftr-brand-desc {
  font-size: 13px; color: var(--muted);
  line-height: 1.85; max-width: 300px;
  margin-bottom: 32px;
}

/* Socials */
.ftr-socials { display: flex; gap: 8px; margin-bottom: 32px; }
.ftr-social {
  width: 38px; height: 38px;
  border-radius: 6px;
  border: 1px solid rgba(71,181,255,0.08);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; color: var(--muted);
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.25); color: var(--accent);
  transform: translateY(-2px);
}
.ftr-social svg { width: 15px; height: 15px; }

/* Contact info in brand col */
.ftr-brand-contact {}
.ftr-brand-email {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--accent); text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s;
}
.ftr-brand-email:hover { color: #7DD4FF; }
.ftr-brand-location {
  font-size: 12px; color: var(--muted);
  line-height: 1.7;
}

/* ══ Nav columns ══ */
.ftr-nav {}
.ftr-nav-title {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--text); opacity: 0.5;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.ftr-nav-list {
  list-style: none; display: flex;
  flex-direction: column; gap: 0;
}
.ftr-nav-list a {
  display: block; padding: 7px 0;
  font-size: 13.5px; color: var(--muted);
  text-decoration: none;
  transition: color 0.25s, padding-left 0.25s;
}
.ftr-nav-list a:hover {
  color: var(--text); padding-left: 6px;
}

/* ══ Bottom ══ */
.ftr-bottom-outer {
  max-width: 1400px; margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
}
.ftr-bottom {
  border-top: 1px solid var(--border);
  padding: 24px 0 32px;
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 14px;
}

.ftr-copy {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.15); letter-spacing: 0.04em;
}

.ftr-certs { display: flex; gap: 6px; }
.ftr-cert {
  font-family: var(--mono); font-size: 7px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(71,181,255,0.25);
  border: 1px solid rgba(71,181,255,0.06);
  border-radius: 2px; padding: 4px 8px;
}

.ftr-links { display: flex; gap: 18px; }
.ftr-links a {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.15); text-decoration: none;
  letter-spacing: 0.04em; transition: color 0.2s;
}
.ftr-links a:hover { color: var(--accent); }

/* ══ Responsive ══ */
@media (max-width: 1100px) {
  .ftr-body { grid-template-columns: 1fr 1fr 1fr; gap: 40px 24px; }
  .ftr-brand { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .ftr-brand-tagline, .ftr-brand-desc { max-width: 100%; }
}
@media (max-width: 768px) {
  .ftr-body { grid-template-columns: 1fr 1fr; }
  .ftr-brand { grid-column: 1 / -1; display: block; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .ftr-body, .ftr-bottom-outer { max-width: 1600px; }
  .ftr-brand-tagline { font-size: 28px; }
  .ftr-nav-list a { font-size: 14px; }
}
</style>

<footer class="ftr">

  <div class="ftr-body">

    <!-- Brand -->
    <div class="ftr-brand">
      <a href="/" class="ftr-logo">
        <svg class="ftr-logo-mark" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="#47B5FF" stroke-width="0.8"/>
          <circle cx="18" cy="18" r="9" stroke="#47B5FF" stroke-width="0.5" opacity="0.4"/>
          <circle cx="18" cy="18" r="3" fill="#47B5FF" opacity="0.5"/>
          <line x1="18" y1="2" x2="18" y2="34" stroke="#47B5FF" stroke-width="0.4" opacity="0.2"/>
          <line x1="2" y1="18" x2="34" y2="18" stroke="#47B5FF" stroke-width="0.4" opacity="0.2"/>
        </svg>
        <span class="ftr-logo-name">Infraforma</span>
      </a>

      <h3 class="ftr-brand-tagline">Infrastructure, <span>Thought Through.</span></h3>

      <p class="ftr-brand-desc">Quebec-based specialists in BIM, digital twin, and information management for complex infrastructure programmes. Delivering across Canada and internationally.</p>

      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>

      <div class="ftr-brand-contact">
        <a href="mailto:info@infraforma.ca" class="ftr-brand-email">info@infraforma.ca</a>
        <p class="ftr-brand-location">Quebec City, Canada<br/>National &amp; Remote Delivery</p>
      </div>
    </div>

    <!-- Solutions -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Solutions</p>
      <ul class="ftr-nav-list">
        <li><a href="/solutions/strategy">Strategy &amp; Governance</a></li>
        <li><a href="/solutions/intelligence">Digital Delivery</a></li>
        <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
        <li><a href="/solutions">All Solutions</a></li>
      </ul>
    </nav>

    <!-- Industries -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Industries</p>
      <ul class="ftr-nav-list">
        <li><a href="/industries/heavy-civil">Heavy Civil</a></li>
        <li><a href="/industries/mining">Mining</a></li>
        <li><a href="/industries/energy">Energy</a></li>
        <li><a href="/industries/institutional">Institutional</a></li>
        <li><a href="/industries/industrial">Industrial</a></li>
        <li><a href="/industries/commercial">Commercial</a></li>
      </ul>
    </nav>

    <!-- Company -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Company</p>
      <ul class="ftr-nav-list">
        <li><a href="/about">About Us</a></li>
        <li><a href="/process">Our Process</a></li>
        <li><a href="/knowledge">Knowledge Base</a></li>
        <li><a href="/who-we-support">Who We Support</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- Resources -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Resources</p>
      <ul class="ftr-nav-list">
        <li><a href="/knowledge/?cat=bim-basics">BIM Basics</a></li>
        <li><a href="/knowledge/?cat=iso-standards">ISO Standards</a></li>
        <li><a href="/knowledge/?cat=digital-delivery">Digital Delivery</a></li>
        <li><a href="/knowledge/?cat=tools">Tools &amp; Platforms</a></li>
        <li><a href="/case-studies">Case Studies</a></li>
      </ul>
    </nav>

  </div>

  <!-- Bottom -->
  <div class="ftr-bottom-outer">
    <div class="ftr-bottom">
      <p class="ftr-copy">&copy; 2025 Infraforma Inc. All rights reserved.</p>
      <div class="ftr-certs">
        <span class="ftr-cert">ISO 19650</span>
        <span class="ftr-cert">Quebec Based</span>
        <span class="ftr-cert">Platform Agnostic</span>
      </div>
      <div class="ftr-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </div>
  </div>

</footer>`

export default function Footer() {
  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: footerHtml }} />
  )
}
