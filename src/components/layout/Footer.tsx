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
  --muted-h: rgba(244,246,248,0.65);
  --border: rgba(71,181,255,0.06);
  --mono: 'DM Mono', monospace;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Accent top edge */
.ftr::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.15) 30%, var(--accent) 50%, rgba(71,181,255,0.15) 70%, transparent 95%);
  z-index: 2;
}

/* ══ Giant brand statement ══ */
.ftr-hero {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(80px,9vw,140px) clamp(24px,5%,64px) clamp(64px,7vw,100px);
  text-align: center;
}

.ftr-hero-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(48px,7vw,120px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: rgba(255,255,255,0.04);
  -webkit-text-stroke: 1px rgba(71,181,255,0.08);
  margin-bottom: 24px;
  user-select: none;
}
.ftr-hero-title span {
  -webkit-text-stroke: 1px rgba(71,181,255,0.2);
  color: rgba(71,181,255,0.06);
}

.ftr-hero-sub {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(20px,2.4vw,36px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 16px;
}
.ftr-hero-sub em {
  color: var(--accent);
  font-style: normal;
}

.ftr-hero-desc {
  font-size: clamp(14px,1.1vw,17px);
  color: var(--muted);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto 36px;
}

.ftr-hero-btns {
  display: flex; gap: 12px;
  justify-content: center; flex-wrap: wrap;
}

.ftr-btn-p {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--bg); background: var(--accent);
  border: none; border-radius: 2px;
  padding: 16px 36px; text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.ftr-btn-p:hover {
  background: #6bc5ff; transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(71,181,255,0.3);
}
.ftr-btn-arr { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.ftr-btn-p:hover .ftr-btn-arr { transform: translateX(4px); }

.ftr-btn-g {
  display: inline-flex; align-items: center;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted-h); background: transparent;
  border: 1px solid rgba(244,246,248,0.1);
  border-radius: 2px; padding: 15px 32px;
  text-decoration: none;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}
.ftr-btn-g:hover {
  border-color: rgba(71,181,255,0.3); color: var(--text);
  background: rgba(71,181,255,0.04);
}

/* ══ Divider ══ */
.ftr-div {
  max-width: 1400px; margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
}
.ftr-div-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.08) 20%, rgba(71,181,255,0.08) 80%, transparent);
}

/* ══ Nav grid ══ */
.ftr-body {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: clamp(48px,5vw,72px) clamp(24px,5%,64px);
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr;
  gap: 40px 28px;
}

/* Brand */
.ftr-brand {}

.ftr-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 18px; text-decoration: none;
}
.ftr-logo-mark { width: 28px; height: 28px; flex-shrink: 0; }
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 15px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}

.ftr-brand-tagline {
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(16px,1.4vw,22px);
  font-weight: 900;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 14px;
  max-width: 260px;
}
.ftr-brand-tagline span { color: var(--accent); }

.ftr-brand-desc {
  font-size: 12px; color: var(--muted);
  line-height: 1.8; max-width: 260px;
  margin-bottom: 24px;
}

.ftr-socials { display: flex; gap: 6px; }
.ftr-social {
  width: 32px; height: 32px;
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
.ftr-social svg { width: 13px; height: 13px; }

/* Nav cols */
.ftr-nav {}
.ftr-nav-title {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent); opacity: 0.55;
  margin-bottom: 16px;
}
.ftr-nav-list {
  list-style: none; display: flex;
  flex-direction: column; gap: 0;
}
.ftr-nav-list a {
  display: block; padding: 6px 0;
  font-size: 13px; color: var(--muted);
  text-decoration: none;
  transition: color 0.2s, padding-left 0.2s;
}
.ftr-nav-list a:hover {
  color: var(--text); padding-left: 4px;
}

/* Sub-section in nav */
.ftr-nav-sub {
  margin-top: 20px;
}

/* ══ Bottom ══ */
.ftr-bottom-wrap {
  max-width: 1400px; margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
}
.ftr-bottom {
  border-top: 1px solid var(--border);
  padding: 20px 0 28px;
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}

.ftr-copy {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.15); letter-spacing: 0.04em;
}

.ftr-bottom-mid { display: flex; gap: 6px; }
.ftr-cert {
  font-family: var(--mono); font-size: 7px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(71,181,255,0.25);
  border: 1px solid rgba(71,181,255,0.06);
  border-radius: 2px; padding: 3px 8px;
}

.ftr-bottom-right { display: flex; gap: 16px; }
.ftr-bottom-right a {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.15); text-decoration: none;
  letter-spacing: 0.04em; transition: color 0.2s;
}
.ftr-bottom-right a:hover { color: var(--accent); }

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .ftr-body { grid-template-columns: 1fr 1fr 1fr; gap: 36px 24px; }
  .ftr-brand { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .ftr-body { grid-template-columns: 1fr 1fr; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
  .ftr-hero-btns { flex-direction: column; width: 100%; max-width: 320px; margin: 0 auto; }
  .ftr-btn-p, .ftr-btn-g { width: 100%; justify-content: center; }
  .ftr-hero-title { font-size: clamp(36px, 10vw, 64px); }
}
@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .ftr-body, .ftr-hero, .ftr-bottom-wrap, .ftr-div { max-width: 1600px; }
  .ftr-hero-title { font-size: 130px; }
}
</style>

<footer class="ftr">

  <!-- Giant brand statement -->
  <div class="ftr-hero">
    <div class="ftr-hero-title">INFRA<span>FORMA</span></div>
    <h2 class="ftr-hero-sub">Where Data Meets <em>Delivery</em></h2>
    <p class="ftr-hero-desc">Structured information management for the teams that build, govern, and operate complex infrastructure.</p>
    <div class="ftr-hero-btns">
      <a href="/contact" class="ftr-btn-p">Schedule a Call <span class="ftr-btn-arr">&rarr;</span></a>
      <a href="/solutions" class="ftr-btn-g">Explore Solutions</a>
    </div>
  </div>

  <div class="ftr-div"><div class="ftr-div-line"></div></div>

  <!-- Nav -->
  <div class="ftr-body">

    <div class="ftr-brand">
      <a href="/" class="ftr-logo">
        <svg class="ftr-logo-mark" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="#47B5FF" stroke-width="0.8"/>
          <circle cx="14" cy="14" r="6" stroke="#47B5FF" stroke-width="0.5" opacity="0.4"/>
          <circle cx="14" cy="14" r="2" fill="#47B5FF" opacity="0.5"/>
        </svg>
        <span class="ftr-logo-name">Infraforma</span>
      </a>
      <h3 class="ftr-brand-tagline">Infrastructure, <span>Thought Through.</span></h3>
      <p class="ftr-brand-desc">Quebec-based specialists in BIM, digital twin, and information management. Delivering across Canada and internationally.</p>
      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </div>

    <nav class="ftr-nav">
      <p class="ftr-nav-title">Solutions</p>
      <ul class="ftr-nav-list">
        <li><a href="/solutions/strategy">Strategy &amp; Governance</a></li>
        <li><a href="/solutions/intelligence">Digital Delivery</a></li>
        <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
        <li><a href="/solutions">All Solutions</a></li>
      </ul>
    </nav>

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

    <nav class="ftr-nav">
      <p class="ftr-nav-title">Get in Touch</p>
      <ul class="ftr-nav-list">
        <li><a href="mailto:info@infraforma.ca">info@infraforma.ca</a></li>
        <li><a href="/contact">Schedule a Call</a></li>
      </ul>
      <div class="ftr-nav-sub">
        <p class="ftr-nav-title">Location</p>
        <ul class="ftr-nav-list">
          <li><a href="#">Quebec City, Canada</a></li>
          <li><a href="#">National &amp; Remote</a></li>
        </ul>
      </div>
    </nav>

  </div>

  <!-- Bottom -->
  <div class="ftr-bottom-wrap">
    <div class="ftr-bottom">
      <p class="ftr-copy">&copy; 2025 Infraforma Inc. All rights reserved.</p>
      <div class="ftr-bottom-mid">
        <span class="ftr-cert">ISO 19650</span>
        <span class="ftr-cert">Quebec Based</span>
        <span class="ftr-cert">Platform Agnostic</span>
      </div>
      <div class="ftr-bottom-right">
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
