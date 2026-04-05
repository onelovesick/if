"use client"

const footerHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top accent line */
.ftr::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.15) 30%, var(--accent) 50%, rgba(71,181,255,0.15) 70%, transparent 95%);
  z-index: 2;
}

/* Giant ghost logo watermark */
.ftr-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 620px;
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
}
.ftr-watermark circle,
.ftr-watermark line {
  stroke: var(--accent);
}
.ftr-watermark .wm-fill {
  fill: var(--accent);
}

/* ══ Main body ══ */
.ftr-body {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(80px,10vw,160px) clamp(24px,5%,64px) 0;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 64px;
  flex: 1;
  align-content: start;
}

/* ══ Left column ══ */
.ftr-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ftr-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: clamp(48px,6vw,80px);
  text-decoration: none;
}
.ftr-logo-mark { width: 36px; height: 36px; flex-shrink: 0; }
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 18px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}

.ftr-statement {
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(48px,6vw,96px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: clamp(48px,5vw,72px);
}
.ftr-statement span {
  color: var(--accent);
}

.ftr-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.85;
  max-width: 400px;
  margin-bottom: 32px;
}

.ftr-socials {
  display: flex;
  gap: 10px;
  margin-bottom: 0;
}
.ftr-social {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.1);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  color: var(--muted);
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.3);
  color: var(--accent);
  transform: translateY(-2px);
}
.ftr-social svg { width: 15px; height: 15px; }

/* ══ Right column ══ */
.ftr-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ftr-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: clamp(40px,4vw,64px);
}

.ftr-nav-link {
  display: block;
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(32px,3.5vw,56px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: rgba(244,246,248,0.12);
  text-decoration: none;
  padding: clamp(8px,1vw,14px) 0;
  transition: color 0.35s ease, padding-left 0.35s ease;
  line-height: 1.1;
  border-bottom: 1px solid rgba(71,181,255,0.04);
}
.ftr-nav-link:first-child {
  border-top: 1px solid rgba(71,181,255,0.04);
}
.ftr-nav-link:hover {
  color: var(--text);
  padding-left: 12px;
}

/* Sub-links grid */
.ftr-sub-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 48px;
}

.ftr-sub-col {}
.ftr-sub-title {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.6;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.ftr-sub-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.ftr-sub-list a {
  display: block;
  padding: 5px 0;
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.25s, padding-left 0.25s;
}
.ftr-sub-list a:hover {
  color: var(--text);
  padding-left: 6px;
}

/* ══ Bottom bar ══ */
.ftr-bottom-outer {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
}

.ftr-bottom {
  border-top: 1px solid var(--border);
  padding: 28px 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.ftr-contact-row {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.ftr-brand-email {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
.ftr-brand-email:hover { color: #7DD4FF; }

.ftr-location {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.ftr-loc-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(71,181,255,0.2);
  display: inline-block;
}

.ftr-copy {
  font-family: var(--mono);
  font-size: 10px;
  color: rgba(244,246,248,0.12);
  letter-spacing: 0.04em;
}

.ftr-legal {
  display: flex;
  gap: 18px;
}
.ftr-legal a {
  font-family: var(--mono);
  font-size: 10px;
  color: rgba(244,246,248,0.12);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.ftr-legal a:hover { color: var(--accent); }

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .ftr { min-height: auto; }
  .ftr-body {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: clamp(64px,8vw,100px);
  }
  .ftr-statement { font-size: clamp(40px,8vw,72px); }
  .ftr-nav-link { font-size: clamp(28px,5vw,44px); }
}

@media (max-width: 640px) {
  .ftr-sub-grid { grid-template-columns: 1fr; gap: 24px; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
  .ftr-contact-row { flex-direction: column; align-items: flex-start; gap: 8px; }
  .ftr-statement { font-size: clamp(36px,10vw,56px); }
  .ftr-nav-link { font-size: clamp(24px,7vw,36px); }
}

@media (min-width: 1800px) {
  .ftr-body, .ftr-bottom-outer { max-width: 1600px; }
  .ftr-statement { font-size: 104px; }
  .ftr-nav-link { font-size: 60px; }
}
</style>

<footer class="ftr">

  <!-- Ghost watermark -->
  <svg class="ftr-watermark" viewBox="0 0 620 620" fill="none">
    <circle cx="310" cy="310" r="280" stroke-width="1.2"/>
    <circle cx="310" cy="310" r="180" stroke-width="0.8"/>
    <circle cx="310" cy="310" r="90" stroke-width="0.5"/>
    <circle cx="310" cy="310" r="30" class="wm-fill" opacity="0.4"/>
    <line x1="310" y1="20" x2="310" y2="600" stroke-width="0.6"/>
    <line x1="20" y1="310" x2="600" y2="310" stroke-width="0.6"/>
    <line x1="85" y1="85" x2="535" y2="535" stroke-width="0.4"/>
    <line x1="535" y1="85" x2="85" y2="535" stroke-width="0.4"/>
  </svg>

  <div class="ftr-body">

    <!-- Left: Brand + Statement -->
    <div class="ftr-left">
      <div>
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

        <h3 class="ftr-statement">Infrastructure,<br/><span>Thought<br/>Through.</span></h3>

        <p class="ftr-desc">Quebec-based specialists in BIM, digital twin, and information management for complex infrastructure programmes. Delivering across Canada and internationally.</p>
      </div>

      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
      </div>
    </div>

    <!-- Right: Nav + Sub links -->
    <div class="ftr-right">
      <nav class="ftr-nav-links">
        <a href="/" class="ftr-nav-link">Home</a>
        <a href="/solutions" class="ftr-nav-link">Solutions</a>
        <a href="/industries" class="ftr-nav-link">Industries</a>
        <a href="/about" class="ftr-nav-link">About</a>
        <a href="/knowledge" class="ftr-nav-link">Knowledge</a>
        <a href="/contact" class="ftr-nav-link">Contact</a>
      </nav>

      <div class="ftr-sub-grid">
        <div class="ftr-sub-col">
          <p class="ftr-sub-title">Solutions</p>
          <ul class="ftr-sub-list">
            <li><a href="/solutions/strategy">Strategy & Governance</a></li>
            <li><a href="/solutions/intelligence">Digital Delivery</a></li>
            <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
          </ul>
        </div>
        <div class="ftr-sub-col">
          <p class="ftr-sub-title">Resources</p>
          <ul class="ftr-sub-list">
            <li><a href="/knowledge/?cat=bim-basics">BIM Basics</a></li>
            <li><a href="/knowledge/?cat=iso-standards">ISO Standards</a></li>
            <li><a href="/case-studies">Case Studies</a></li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="ftr-bottom-outer">
    <div class="ftr-bottom">
      <div class="ftr-contact-row">
        <a href="mailto:info@infraforma.ca" class="ftr-brand-email">info@infraforma.ca</a>
        <span class="ftr-loc-sep"></span>
        <span class="ftr-location">Quebec City</span>
        <span class="ftr-loc-sep"></span>
        <span class="ftr-location">National & Remote</span>
      </div>
      <p class="ftr-copy">&copy; 2025 Infraforma Inc.</p>
      <div class="ftr-legal">
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
