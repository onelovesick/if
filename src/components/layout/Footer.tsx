import HtmlSection from '@/components/ui/HtmlSection'

const html = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ftr *, .ftr *::before, .ftr *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ftr {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #050c14;
  --text: #F0F4F7;
  --muted: rgba(244,246,248,0.45);
  --border: rgba(71,181,255,0.08);
  --mono: 'DM Mono', monospace;

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Top accent line */
.ftr::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.3) 30%, var(--accent) 50%, rgba(71,181,255,0.3) 70%, transparent);
  z-index: 2;
}

/* ── Main body ── */
.ftr-body {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px,6vw,88px) clamp(24px,5%,64px) clamp(40px,4vw,56px);
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 48px 40px;
}

/* ── Brand column ── */
.ftr-brand {}

.ftr-logo {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 24px; text-decoration: none;
}
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 18px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}

.ftr-tagline {
  font-family: 'Inter Tight', sans-serif;
  font-size: clamp(18px,1.8vw,26px);
  font-weight: 900; line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 16px;
  max-width: 280px;
}
.ftr-tagline span { color: var(--accent); }

.ftr-desc {
  font-size: 12.5px; color: var(--muted);
  line-height: 1.8; max-width: 280px;
  margin-bottom: 28px;
}

/* Socials */
.ftr-socials { display: flex; gap: 8px; }
.ftr-social {
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(71,181,255,0.15);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; color: var(--muted);
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.1);
  border-color: var(--accent); color: var(--accent);
  transform: translateY(-2px);
}
.ftr-social svg { width: 14px; height: 14px; }

/* ── Nav columns ── */
.ftr-nav {}

.ftr-nav-title {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
}

.ftr-nav-list {
  list-style: none; display: flex;
  flex-direction: column; gap: 0;
}
.ftr-nav-list a {
  display: block;
  padding: 7px 0;
  font-size: 13px; color: var(--muted);
  text-decoration: none;
  transition: color 0.2s, padding-left 0.25s;
  border-bottom: 1px solid transparent;
}
.ftr-nav-list a:hover {
  color: var(--text);
  padding-left: 6px;
}

/* ── Bottom bar ── */
.ftr-bottom {
  position: relative; z-index: 1;
  border-top: 1px solid var(--border);
  max-width: 1400px; margin: 0 auto;
  padding: 24px clamp(24px,5%,64px) 32px;
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 16px;
}

.ftr-copy {
  font-family: var(--mono); font-size: 10px;
  color: var(--muted); letter-spacing: 0.04em;
}
.ftr-copy strong { color: rgba(244,246,248,0.65); font-weight: 500; }

.ftr-bottom-right {
  display: flex; align-items: center; gap: 24px;
}
.ftr-bottom-right a {
  font-family: var(--mono); font-size: 10px;
  color: var(--muted); text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 0.2s;
}
.ftr-bottom-right a:hover { color: var(--accent); }

.ftr-certs {
  display: flex; align-items: center; gap: 8px;
}
.ftr-cert {
  font-family: var(--mono); font-size: 8px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(71,181,255,0.5);
  border: 1px solid rgba(71,181,255,0.12);
  border-radius: 2px; padding: 3px 8px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .ftr-body {
    grid-template-columns: 1fr 1fr;
    gap: 40px 32px;
  }
  .ftr-brand { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .ftr-body { grid-template-columns: 1fr 1fr; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-tagline { max-width: 100%; }
  .ftr-desc { max-width: 100%; }
  .ftr-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .ftr-body { max-width: 1600px; padding: 80px 5% 60px; }
  .ftr-bottom { max-width: 1600px; }
}
</style>

<footer class="ftr">
  <div class="ftr-body">

    <!-- Brand -->
    <div class="ftr-brand">
      <a href="/" class="ftr-logo">
        <span class="ftr-logo-name">Infraforma</span>
      </a>
      <h3 class="ftr-tagline">Where data meets <span>delivery.</span></h3>
      <p class="ftr-desc">Information management, digital delivery, and BIM governance for complex infrastructure programmes. Based in Quebec, delivering across North America.</p>
      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </div>

    <!-- Solutions -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Solutions</p>
      <ul class="ftr-nav-list">
        <li><a href="/solutions/strategy">Information Strategy</a></li>
        <li><a href="/solutions/intelligence">Digital Delivery</a></li>
        <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
        <li><a href="/industries">Industries</a></li>
        <li><a href="/process">Our Process</a></li>
      </ul>
    </nav>

    <!-- Company -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Company</p>
      <ul class="ftr-nav-list">
        <li><a href="/about">About</a></li>
        <li><a href="/knowledge">Knowledge Base</a></li>
        <li><a href="/careers">Careers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- Contact -->
    <nav class="ftr-nav">
      <p class="ftr-nav-title">Get in Touch</p>
      <ul class="ftr-nav-list">
        <li><a href="mailto:info@infraforma.ca">info@infraforma.ca</a></li>
        <li><a href="/contact">Schedule a Call</a></li>
      </ul>
      <p class="ftr-nav-title" style="margin-top:28px;">Location</p>
      <ul class="ftr-nav-list">
        <li><a href="#">Quebec, Canada</a></li>
        <li><a href="#">National Delivery</a></li>
      </ul>
    </nav>

  </div>

  <!-- Bottom -->
  <div class="ftr-bottom">
    <p class="ftr-copy">&copy; 2025 <strong>Infraforma Inc.</strong> All rights reserved.</p>
    <div class="ftr-certs">
      <span class="ftr-cert">ISO 19650</span>
      <span class="ftr-cert">Quebec Based</span>
    </div>
    <div class="ftr-bottom-right">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
  </div>

</footer>`

export default function Footer() {
  return <HtmlSection html={html} />
}
