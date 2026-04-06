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
  --border-col: rgba(71,181,255,0.12);
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
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.25) 30%, var(--accent) 50%, rgba(71,181,255,0.25) 70%, transparent 95%);
  z-index: 2;
}

/* ══ C: Ghost watermark behind nav ══ */
.ftr-ghost {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(72px, 12vw, 160px);
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(71,181,255,0.028);
  pointer-events: none;
  user-select: none;
  z-index: 0;
  line-height: 1;
}

/* ══ CTA Banner ══ */
.ftr-cta {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px,5%,64px);
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;
  min-height: 340px;
  overflow: hidden;
}

.ftr-cta-left {
  padding: clamp(56px,6vw,88px) 0;
  max-width: 560px;
}

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
  margin-bottom: 32px;
}

.ftr-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }

.ftr-btn-p {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--bg); background: var(--accent);
  border: none; border-radius: 2px;
  padding: 16px 32px; text-decoration: none;
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
}
.ftr-btn-p:hover {
  background: #6bc5ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(71,181,255,0.3);
}
.ftr-btn-p-arr { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
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

/* ══ 3D Canvas ══ */
.ftr-canvas-wrap {
  position: relative;
  height: 340px;
  overflow: hidden;
}
.ftr-canvas-wrap::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0; width: 80px;
  background: linear-gradient(90deg, #050c14, transparent);
  z-index: 2; pointer-events: none;
}
.ftr-canvas-wrap::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0; height: 60px;
  background: linear-gradient(to top, #050c14, transparent);
  z-index: 2; pointer-events: none;
}
#ftr-canvas { display: block; width: 100%; height: 340px; }

.ftr-layer-labels {
  position: absolute; top: 50%; right: 8px;
  transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 8px; z-index: 3;
}
.ftr-layer-tag {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(71,181,255,0.55); text-align: right;
}

/* ══ Divider ══ */
.ftr-divider { max-width: 1400px; margin: 0 auto; padding: 0 clamp(24px,5%,64px); }
.ftr-divider-line { height: 1px; background: var(--border); }

/* ══ Nav grid ══ */
.ftr-body {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: clamp(40px,4vw,60px) clamp(24px,5%,64px) clamp(32px,3vw,48px);
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px 36px;
}

/* Brand col */
.ftr-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; text-decoration: none;
}
.ftr-logo-mark { width: 32px; height: 32px; flex-shrink: 0; }
.ftr-logo-name {
  font-family: 'Inter Tight', sans-serif;
  font-size: 16px; font-weight: 900;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text);
}
.ftr-brand-desc {
  font-size: 12px; color: var(--muted);
  line-height: 1.8; max-width: 260px; margin-bottom: 24px;
}
.ftr-socials { display: flex; gap: 8px; }
.ftr-social {
  width: 32px; height: 32px; border-radius: 6px;
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

/* ══ E: Nav columns with top border draw ══ */
.ftr-nav {
  padding-top: 20px;
  border-top: 1px solid transparent;
  position: relative;
  transition: border-color 0.6s ease;
}
.ftr-nav.ftr-nav-in {
  border-color: var(--border-col);
}

/* Animated draw line on top of each col */
.ftr-nav::before {
  content: '';
  position: absolute;
  top: -1px; left: 0;
  height: 1px;
  width: 0%;
  background: var(--accent);
  opacity: 0.5;
  transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
}
.ftr-nav.ftr-nav-in::before { width: 40%; }

.ftr-nav-title {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); opacity: 0.7; margin-bottom: 20px;
}

.ftr-nav-list { list-style: none; display: flex; flex-direction: column; gap: 0; }

/* ══ E: Underline slide hover ══ */
.ftr-nav-list a {
  display: inline-block; padding: 6px 0;
  font-size: 13px; color: var(--muted);
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
}
.ftr-nav-list a::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 0;
  width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
}
.ftr-nav-list a:hover { color: var(--text); }
.ftr-nav-list a:hover::after { width: 100%; }

/* D: Coordinate block */
.ftr-location { margin-top: 28px; }
.ftr-location-label {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); opacity: 0.7; margin-bottom: 12px;
}
.ftr-coord-block {
  display: flex; flex-direction: column; gap: 5px;
}
.ftr-coord-line {
  font-family: var(--mono); font-size: 11px;
  color: rgba(244,246,248,0.45); letter-spacing: 0.04em;
  display: flex; align-items: center; gap: 8px;
}
.ftr-coord-line .ftr-coord-val { color: rgba(71,181,255,0.75); }
.ftr-coord-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  animation: ftr-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes ftr-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
}
.ftr-coord-sub {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.22); margin-top: 4px;
  letter-spacing: 0.04em;
}

/* ══ G: Tagline strip ══ */
.ftr-tagline-strip {
  position: relative; z-index: 1;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: 0 clamp(24px,5%,64px);
}
.ftr-tagline-inner {
  max-width: 1400px; margin: 0 auto;
  padding: 28px 0;
  position: relative;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px;
}
.ftr-tagline-text {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 900;
  font-size: clamp(22px, 3.5vw, 48px);
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: rgba(240,244,247,0.07);
  white-space: nowrap;
  flex-shrink: 0;
  user-select: none;
  line-height: 1;
}
.ftr-tagline-text em {
  font-style: normal;
  color: rgba(71,181,255,0.12);
}
/* F: Live clock on strip */
.ftr-clock-block {
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 4px; flex-shrink: 0;
}
.ftr-clock-label {
  font-family: var(--mono); font-size: 8px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: rgba(71,181,255,0.35);
}
.ftr-clock-time {
  font-family: var(--mono); font-size: 18px;
  color: rgba(244,246,248,0.18);
  letter-spacing: 0.04em;
  font-weight: 300;
}
.ftr-clock-zone {
  font-family: var(--mono); font-size: 8px;
  color: rgba(71,181,255,0.3);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* ══ Bottom bar ══ */
.ftr-bottom {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  padding: 20px clamp(24px,5%,64px) 28px;
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.ftr-copy {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.2); letter-spacing: 0.04em;
}
.ftr-certs { display: flex; gap: 6px; }
.ftr-cert {
  font-family: var(--mono); font-size: 7px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(71,181,255,0.35);
  border: 1px solid rgba(71,181,255,0.08);
  border-radius: 2px; padding: 3px 7px;
}
.ftr-bottom-right { display: flex; align-items: center; gap: 20px; }
.ftr-bottom-right a {
  font-family: var(--mono); font-size: 10px;
  color: rgba(244,246,248,0.2); text-decoration: none;
  letter-spacing: 0.06em; transition: color 0.2s;
}
.ftr-bottom-right a:hover { color: var(--accent); }

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .ftr-body { grid-template-columns: 1fr 1fr; gap: 36px 28px; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-cta { grid-template-columns: 1fr; }
  .ftr-canvas-wrap { display: none; }
  .ftr-cta-left { padding: clamp(48px,5vw,72px) 0; }
  .ftr-tagline-text { font-size: clamp(18px,4vw,32px); }
}
@media (max-width: 640px) {
  .ftr-body { grid-template-columns: 1fr 1fr; }
  .ftr-brand { grid-column: 1 / -1; }
  .ftr-bottom { flex-direction: column; align-items: flex-start; }
  .ftr-cta-btns { flex-direction: column; width: 100%; }
  .ftr-btn-p, .ftr-btn-g { width: 100%; justify-content: center; }
  .ftr-tagline-text { display: none; }
}
@media (max-width: 420px) {
  .ftr-body { grid-template-columns: 1fr; }
}
@media (min-width: 1800px) {
  .ftr-body, .ftr-cta, .ftr-bottom, .ftr-divider, .ftr-tagline-inner { max-width: 1600px; }
}
</style>

<footer class="ftr">

  <!-- C: Ghost watermark -->
  <div class="ftr-ghost">Infraforma</div>

  <!-- CTA -->
  <div class="ftr-cta">
    <div class="ftr-cta-left">
      <div class="ftr-cta-eyebrow">Start a Conversation</div>
      <h2 class="ftr-cta-title">Ready to Bring <span>Structure</span><br>to Your Next Programme?</h2>
      <p class="ftr-cta-desc">Whether you need a strategic review, full BIM governance, or digital delivery support, we are here to help you move with clarity.</p>
      <div class="ftr-cta-btns">
        <a href="/contact" class="ftr-btn-p">Schedule a Call <span class="ftr-btn-p-arr">&rarr;</span></a>
        <a href="/solutions" class="ftr-btn-g">View Solutions</a>
      </div>
    </div>

    <div class="ftr-canvas-wrap">
      <canvas id="ftr-canvas"></canvas>
      <div class="ftr-layer-labels">
        <span class="ftr-layer-tag">STR</span>
        <span class="ftr-layer-tag">MEP</span>
        <span class="ftr-layer-tag">ARC</span>
        <span class="ftr-layer-tag">CIV</span>
        <span class="ftr-layer-tag">GEO</span>
      </div>
    </div>
  </div>

  <div class="ftr-divider"><div class="ftr-divider-line"></div></div>

  <!-- Nav -->
  <div class="ftr-body">
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

    <!-- E: Nav cols with staggered border-draw -->
    <nav class="ftr-nav" style="transition-delay:0s">
      <p class="ftr-nav-title">Solutions</p>
      <ul class="ftr-nav-list">
        <li><a href="/solutions/strategy">Information Strategy</a></li>
        <li><a href="/solutions/intelligence">Digital Delivery</a></li>
        <li><a href="/solutions/project-twin">Asset Intelligence</a></li>
        <li><a href="/industries">Industries</a></li>
        <li><a href="/process">Our Process</a></li>
      </ul>
    </nav>

    <nav class="ftr-nav" style="transition-delay:0.1s">
      <p class="ftr-nav-title">Company</p>
      <ul class="ftr-nav-list">
        <li><a href="/about">About</a></li>
        <li><a href="/knowledge">Knowledge Base</a></li>
        <li><a href="/careers">Careers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- D: Coordinate readout replacing plain location text -->
    <nav class="ftr-nav" style="transition-delay:0.2s">
      <p class="ftr-nav-title">Get in Touch</p>
      <ul class="ftr-nav-list">
        <li><a href="mailto:info@infraforma.ca">info@infraforma.ca</a></li>
        <li><a href="/contact">Schedule a Call</a></li>
      </ul>
      <div class="ftr-location">
        <p class="ftr-location-label">Origin</p>
        <div class="ftr-coord-block">
          <div class="ftr-coord-line">
            <span class="ftr-coord-dot"></span>
            <span class="ftr-coord-val">46.8123°N</span>
            <span>/</span>
            <span class="ftr-coord-val">71.2145°W</span>
          </div>
          <div class="ftr-coord-sub">Quebec City, Canada</div>
          <div class="ftr-coord-sub" style="margin-top:8px; color:rgba(71,181,255,0.25);">National &amp; Remote Delivery</div>
        </div>
      </div>
    </nav>
  </div>

  <!-- G: Tagline strip with F: live clock -->
  <div class="ftr-tagline-strip">
    <div class="ftr-tagline-inner">
      <div class="ftr-tagline-text">Infrastructure, <em>Thought Through.</em></div>
      <div class="ftr-clock-block">
        <span class="ftr-clock-label">Local Time</span>
        <span class="ftr-clock-time" id="ftr-clock">--:--:--</span>
        <span class="ftr-clock-zone">EST / Quebec</span>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
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

</footer>

<script>
(function() {

  /* ── F: Live clock ── */
  function updateClock() {
    var el = document.getElementById('ftr-clock');
    if (!el) return;
    var now = new Date();
    var t = now.toLocaleTimeString('en-CA', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'America/Toronto'
    });
    el.textContent = t;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ── E: Scroll-triggered nav column border draw ── */
  var navCols = document.querySelectorAll('.ftr-nav');
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ftr-nav-in');
          navObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    navCols.forEach(function(col) { navObs.observe(col); });
  } else {
    navCols.forEach(function(col) { col.classList.add('ftr-nav-in'); });
  }

  /* ── Canvas: layered BIM planes ── */
  var canvas = document.getElementById('ftr-canvas');
  if (!canvas) return;

  var dpr = window.devicePixelRatio || 1;
  var W = canvas.offsetWidth;
  var H = canvas.offsetHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  var t = 0;
  var layers = [
    { r: 71,  g: 181, b: 255 },
    { r: 90,  g: 165, b: 240 },
    { r: 55,  g: 138, b: 210 },
    { r: 38,  g: 108, b: 175 },
    { r: 22,  g: 80,  b: 145 },
  ];

  function drawPlane(cx, cy, pw, ph, skewX, skewY, r, g, b, fillA, strokeA) {
    var pts = [
      { x: cx - pw/2 + skewX, y: cy - ph/2 - skewY },
      { x: cx + pw/2 + skewX, y: cy - ph/2 + skewY },
      { x: cx + pw/2 - skewX, y: cy + ph/2 + skewY },
      { x: cx - pw/2 - skewX, y: cy + ph/2 - skewY },
    ];
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.fillStyle = 'rgba('+r+','+g+','+b+','+fillA+')';
    ctx.fill();
    ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+strokeA+')';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    var gc = 7, gr = 3;
    ctx.lineWidth = 0.35;
    ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+(strokeA*0.3)+')';
    for (var ci = 1; ci < gc; ci++) {
      var f = ci/gc;
      ctx.beginPath();
      ctx.moveTo(pts[0].x+(pts[1].x-pts[0].x)*f, pts[0].y+(pts[1].y-pts[0].y)*f);
      ctx.lineTo(pts[3].x+(pts[2].x-pts[3].x)*f, pts[3].y+(pts[2].y-pts[3].y)*f);
      ctx.stroke();
    }
    for (var ri = 1; ri < gr; ri++) {
      var f2 = ri/gr;
      ctx.beginPath();
      ctx.moveTo(pts[0].x+(pts[3].x-pts[0].x)*f2, pts[0].y+(pts[3].y-pts[0].y)*f2);
      ctx.lineTo(pts[1].x+(pts[2].x-pts[1].x)*f2, pts[1].y+(pts[2].y-pts[1].y)*f2);
      ctx.stroke();
    }
  }

  function render(time) {
    ctx.clearRect(0, 0, W, H);
    var cx = W * 0.5;
    var baseY = H * 0.72;
    var spacing = 44 + Math.sin(time * 0.4) * 5;
    var skewX = 88 + Math.sin(time * 0.22) * 10;
    var skewY = 20 + Math.sin(time * 0.18) * 4;
    for (var i = layers.length - 1; i >= 0; i--) {
      var l = layers[i];
      var yPos = baseY - (layers.length - 1 - i) * spacing;
      var depth = (i + 1) / layers.length;
      drawPlane(cx, yPos, 300, 92, skewX, skewY, l.r, l.g, l.b, 0.03 + depth * 0.08, 0.18 + depth * 0.55);
    }
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    render(1.2);
  } else {
    (function frame() { t += 0.005; render(t); requestAnimationFrame(frame); })();
  }

})();
</script>`

export default function Footer() {
  return <HtmlSection html={html} />
}
