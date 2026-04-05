import HtmlSection from '@/components/ui/HtmlSection'

const html = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.ftr *, .ftr *::before, .ftr *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ftr {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #050c14;
  --surface: #0a1420;
  --text: #F0F4F7;
  --muted: rgba(244,246,248,0.4);
  --muted-h: rgba(244,246,248,0.7);
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
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.25) 30%, var(--accent) 50%, rgba(71,181,255,0.25) 70%, transparent 95%);
  z-index: 2;
}

/* ══ CTA Banner ══ */
.ftr-cta {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(56px,6vw,88px) clamp(24px,5%,64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.ftr-cta-left { max-width: 600px; }

.ftr-cta-eyebrow {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.ftr-cta-eyebrow::before {
  content: ''; width: 20px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.ftr-cta-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(28px,3.2vw,48px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); line-height: 1.05;
  letter-spacing: -0.03em; margin-bottom: 14px;
}
.ftr-cta-title span { color: var(--accent); }

.ftr-cta-desc {
  font-size: clamp(13px,1vw,15px);
  color: var(--muted); line-height: 1.75;
}

.ftr-cta-btns {
  display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap;
}

.ftr-btn-p {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--bg); background: var(--accent);
  border: none; border-radius: 2px;
  padding: 16px 32px; text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.ftr-btn-p:hover {
  background: #6bc5ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(71,181,255,0.3);
}
.ftr-btn-p-arr {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.ftr-btn-p:hover .ftr-btn-p-arr { transform: translateX(4px); }

.ftr-btn-g {
  display: inline-flex; align-items: center;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted-h); background: transparent;
  border: 1px solid rgba(244,246,248,0.15);
  border-radius: 2px; padding: 15px 28px;
  text-decoration: none;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}
.ftr-btn-g:hover {
  border-color: rgba(71,181,255,0.4);
  color: var(--text);
  background: rgba(71,181,255,0.05);
}

/* ══ Divider ══ */
.ftr-divider {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
}
.ftr-divider-line {
  height: 1px;
  background: var(--border);
}

/* ══ Main nav grid ══ */
.ftr-body {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(40px,4vw,60px) clamp(24px,5%,64px) clamp(32px,3vw,48px);
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px 36px;
}

/* ── Brand ── */
.ftr-brand {}

.ftr-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; text-decoration: none;
}
.ftr-logo-mark {
  width: 32px; height: 32px; flex-shrink: 0;
}
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 16px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}

.ftr-brand-desc {
  font-size: 12px; color: var(--muted);
  line-height: 1.8; max-width: 260px;
  margin-bottom: 24px;
}

/* Socials */
.ftr-socials { display: flex; gap: 8px; }
.ftr-social {
  width: 32px; height: 32px;
  border-radius: 6px;
  border: 1px solid rgba(71,181,255,0.1);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; color: var(--muted);
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.08);
  border-color: rgba(71,181,255,0.3); color: var(--accent);
  transform: translateY(-2px);
}
.ftr-social svg { width: 13px; height: 13px; }

/* ── Nav cols ── */
.ftr-nav {}

.ftr-nav-title {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); opacity: 0.7;
  margin-bottom: 18px;
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

/* Location block */
.ftr-location {
  margin-top: 24px;
}
.ftr-location-label {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); opacity: 0.7;
  margin-bottom: 10px;
}
.ftr-location-text {
  font-size: 12px; color: var(--muted);
  line-height: 1.7;
}

/* ══ Bottom ══ */
.ftr-bottom {
  position: relative; z-index: 1;
  border-top: 1px solid var(--border);
  max-width: 1400px; margin: 0 auto;
  padding: 20px clamp(24px,5%,64px) 28px;
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}

.ftr-copy {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.25); letter-spacing: 0.04em;
}

.ftr-bottom-right {
  display: flex; align-items: center; gap: 20px;
}
.ftr-bottom-right a {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.25); text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 0.2s;
}
.ftr-bottom-right a:hover { color: var(--accent); }

.ftr-certs {
  display: flex; gap: 6px;
}
.ftr-cert {
  font-family: var(--mono); font-size: 7px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(71,181,255,0.35);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 2px; padding: 3px 7px;
}

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .ftr-body { grid-template-columns: 1fr 1fr; gap: 36px 28px; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-cta { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 640px) {
  .ftr-body { grid-template-columns: 1fr 1fr; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
  .ftr-cta-btns { flex-direction: column; width: 100%; }
  .ftr-btn-p, .ftr-btn-g { width: 100%; justify-content: center; }
}
@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .ftr-body, .ftr-cta, .ftr-bottom { max-width: 1600px; }
  .ftr-divider { max-width: 1600px; }
}
</style>

<footer class="ftr">

  <!-- CTA Banner -->
  <div class="ftr-cta">
    <div class="ftr-cta-left">
      <div class="ftr-cta-eyebrow">Start a Conversation</div>
      <h2 class="ftr-cta-title">Ready to Bring <span>Structure</span> to Your Next Programme?</h2>
      <p class="ftr-cta-desc">Whether you need a strategic review, full BIM governance, or digital delivery support, we are here to help you move with clarity.</p>
    </div>
    <div class="ftr-cta-btns">
      <a href="/contact" class="ftr-btn-p">Schedule a Call <span class="ftr-btn-p-arr">&rarr;</span></a>
      <a href="/solutions" class="ftr-btn-g">View Solutions</a>
    </div>
  </div>

  <div class="ftr-divider"><div class="ftr-divider-line"></div></div>

  <!-- Nav Grid -->
  <div class="ftr-body">

    <!-- Brand -->
    <div class="ftr-brand">
      <a href="/" class="ftr-logo">
        <svg class="ftr-logo-mark" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#47B5FF" stroke-width="1"/>
          <circle cx="16" cy="16" r="7" stroke="#47B5FF" stroke-width="0.7" opacity="0.5"/>
          <circle cx="16" cy="16" r="2.5" fill="#47B5FF" opacity="0.6"/>
        </svg>
        <span class="ftr-logo-name">Infraforma</span>
      </a>
      <p class="ftr-brand-desc">Information management, digital delivery, and BIM governance for complex infrastructure programmes. Based in Quebec, delivering across North America.</p>
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
      <div class="ftr-location">
        <p class="ftr-location-label">Location</p>
        <p class="ftr-location-text">Quebec, Canada<br/>National Delivery</p>
      </div>
    </nav>

  </div>

  <!-- Bottom -->
  <div class="ftr-bottom">
    <p class="ftr-copy">&copy; 2025 Infraforma Inc. All rights reserved.</p>
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
