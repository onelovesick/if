import HtmlSection from '@/components/ui/HtmlSection'

const html = `<!-- ============================================================
     INFRAFORMA — Professional Footer
     WEBFLOW EMBED — paste entire block into an HTML Embed element
     Background: Deep Navy #0B3C5D — contrasts with charcoal section above
     ============================================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

.ftr-root {
  --bg:      #0B3C5D;
  --bg2:     #092e49;
  --accent:  #47B5FF;
  --text:    #F4F6F8;
  --muted:   rgba(244,246,248,0.5);
  --border:  rgba(255,255,255,0.1);
  --border2: rgba(71,181,255,0.25);

  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Mono', monospace;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Subtle grid texture */
.ftr-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
  z-index: 0;
}

/* Top edge accent line */
.ftr-root::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 30%, rgba(71,181,255,0.4) 70%, transparent 100%);
  z-index: 2;
}

/* ── Main footer body ── */
.ftr-body {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 72px 5% 52px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px 40px;
  box-sizing: border-box;
}

/* ════════════════
   COL 1 — Brand
════════════════ */
.ftr-brand {}

/* Logo mark */
.ftr-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  text-decoration: none;
}
.ftr-logo-mark {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}
.ftr-logo-name {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1;
}
.ftr-logo-name span {
  display: block;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.22em;
  color: var(--accent);
  text-transform: uppercase;
  margin-top: 3px;
  font-family: 'DM Mono', monospace;
}

/* Tagline */
.ftr-tagline {
  font-family: 'Syne', sans-serif;
  font-size: clamp(20px, 2vw, 30px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 20px;
  max-width: 280px;
}
.ftr-tagline span {
  color: var(--accent);
}

.ftr-brand-desc {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.8;
  margin: 0 0 32px;
  max-width: 280px;
}

/* Social icons row */
.ftr-socials {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.ftr-social {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--muted);
  font-size: 14px;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  flex-shrink: 0;
}
.ftr-social:hover {
  background: rgba(71,181,255,0.15);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
}

/* ════════════════
   NAV COLUMNS
════════════════ */
.ftr-nav-col {}

.ftr-nav-heading {
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ftr-nav-heading::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border2);
}

.ftr-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ftr-nav-item a {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 7px 0;
  font-size: 12.5px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.22s ease, gap 0.22s ease, padding-left 0.22s ease;
  position: relative;
  border-bottom: 1px solid transparent;
}
.ftr-nav-item a::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.25s ease;
  flex-shrink: 0;
  margin-right: 0;
  vertical-align: middle;
}
.ftr-nav-item a:hover {
  color: var(--text);
  padding-left: 4px;
}
.ftr-nav-item a:hover::before {
  width: 14px;
  margin-right: 8px;
}

/* ── Bottom bar ── */
.ftr-bottom {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 5% 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  box-sizing: border-box;
}

.ftr-copy {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.04em;
  margin: 0;
}
.ftr-copy strong {
  color: rgba(244,246,248,0.75);
  font-weight: 500;
}

.ftr-bottom-links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.ftr-bottom-links a {
  font-size: 11px;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 0.2s ease;
}
.ftr-bottom-links a:hover { color: var(--accent); }

/* Certification badges row */
.ftr-certs {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ftr-cert {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--accent);
  border: 1px solid var(--border2);
  border-radius: 2px;
  padding: 4px 9px;
  text-transform: uppercase;
  opacity: 0.8;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .ftr-body {
    grid-template-columns: 1fr 1fr;
    gap: 48px 40px;
  }
  .ftr-brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .ftr-body {
    grid-template-columns: 1fr 1fr;
    padding: 52px 6% 36px;
    gap: 40px 24px;
  }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-tagline { font-size: clamp(18px, 5vw, 26px); max-width: 100%; }
  .ftr-brand-desc { max-width: 100%; }
  .ftr-bottom {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 6% 32px;
  }
  .ftr-certs { flex-wrap: wrap; }
}

@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}

@media (min-width: 1800px) {
  .ftr-body { padding: 88px 5% 64px; }
  .ftr-tagline { font-size: clamp(26px, 2.2vw, 38px); max-width: 320px; }
  .ftr-brand-desc { font-size: 13px; max-width: 320px; }
  .ftr-nav-item a { font-size: 13.5px; }
}
</style>

<footer class="ftr-root">
  <div class="ftr-body">

    <!-- ── Col 1: Brand ── -->
    <div class="ftr-brand">

      <a href="/" class="ftr-logo">
        <svg class="ftr-logo-mark" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="#47B5FF" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="9"  stroke="#47B5FF" stroke-width="1"/>
          <circle cx="18" cy="18" r="3"  fill="#47B5FF" opacity="0.7"/>
          <line x1="18" y1="2"  x2="18" y2="34" stroke="#47B5FF" stroke-width="0.7" opacity="0.3"/>
          <line x1="2"  y1="18" x2="34" y2="18" stroke="#47B5FF" stroke-width="0.7" opacity="0.3"/>
        </svg>
        <div class="ftr-logo-name">
          INFRAFORMA
          <span>BIM &amp; Digital Delivery</span>
        </div>
      </a>

      <h3 class="ftr-tagline">Where data meets <span>delivery.</span></h3>

      <p class="ftr-brand-desc">
        Québec-based specialists in BIM, digital twin, and information management. 55+ years of combined experience across Canada, the United States, and international markets.
      </p>

      <div class="ftr-socials">
        <a href="#" class="ftr-social" aria-label="LinkedIn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" class="ftr-social" aria-label="X / Twitter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" class="ftr-social" aria-label="Instagram">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>
      </div>

    </div>

    <!-- ── Col 2: Services ── -->
    <nav class="ftr-nav-col">
      <p class="ftr-nav-heading">Services</p>
      <ul class="ftr-nav-list">
        <li class="ftr-nav-item"><a href="/services/strategy">Strategy</a></li>
        <li class="ftr-nav-item"><a href="/services/structure">Structure</a></li>
        <li class="ftr-nav-item"><a href="/services/intelligence">Intelligence</a></li>
        <li class="ftr-nav-item"><a href="/services/execution">Execution</a></li>
        <li class="ftr-nav-item"><a href="/services/project-twin">Project Twin</a></li>
        <li class="ftr-nav-item"><a href="/services/insights">Insights</a></li>
      </ul>
    </nav>

    <!-- ── Col 3: Company ── -->
    <nav class="ftr-nav-col">
      <p class="ftr-nav-heading">Company</p>
      <ul class="ftr-nav-list">
        <li class="ftr-nav-item"><a href="/about">About</a></li>
        <li class="ftr-nav-item"><a href="/team">Our Team</a></li>
        <li class="ftr-nav-item"><a href="/projects">Projects</a></li>
        <li class="ftr-nav-item"><a href="/blog">Insights Blog</a></li>
        <li class="ftr-nav-item"><a href="/careers">Careers</a></li>
        <li class="ftr-nav-item"><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- ── Col 4: Contact ── -->
    <div class="ftr-nav-col">
      <p class="ftr-nav-heading">Contact</p>
      <ul class="ftr-nav-list">
        <li class="ftr-nav-item"><a href="/cdn-cgi/l/email-protection#4c25222a230c25222a3e2d2a233e212d622f2d"><span class="__cf_email__" data-cfemail="f49d9a929bb49d9a928695929b869995da9795">[email&#160;protected]</span></a></li>
        <li class="ftr-nav-item"><a href="/contact">Schedule a Call</a></li>
        <li class="ftr-nav-item"><a href="/framework">Download Framework</a></li>
      </ul>

      <p class="ftr-nav-heading" style="margin-top:32px;">Location</p>
      <ul class="ftr-nav-list">
        <li class="ftr-nav-item"><a href="#">Québec, Canada</a></li>
        <li class="ftr-nav-item"><a href="#">National &amp; Remote Delivery</a></li>
      </ul>
    </div>

  </div>

  <!-- ── Bottom bar ── -->
  <div class="ftr-bottom">

    <p class="ftr-copy">
      &copy; 2025 <strong>Infraforma Inc.</strong> — All rights reserved. Québec, Canada.
    </p>

    <div class="ftr-certs">
      <span class="ftr-cert">ISO 19650</span>
      <span class="ftr-cert">BIM Ready</span>
      <span class="ftr-cert">Québec Based</span>
    </div>

    <div class="ftr-bottom-links">
      <a href="/privacy">P
<script>
(function() {
  function reportHeight() {
    window.parent.postMessage({ type: 'iframeHeight', height: document.body.scrollHeight }, '*');
  }
  reportHeight();
  setTimeout(reportHeight, 300);
  if (window.ResizeObserver) {
    new ResizeObserver(reportHeight).observe(document.body);
  }
})();
</script>`

export default function Footer() {
  return <HtmlSection html={html} />
}
