import HtmlSection from '@/components/ui/HtmlSection'

const html = `<!-- ============================================================
     INFRAFORMA — Parallax CTA Section v2
     WEBFLOW EMBED — paste entire block into an HTML Embed element
     ============================================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

.cta-root *, .cta-root *::before, .cta-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.cta-root {
  --accent: #47B5FF;
  --text:   #F4F6F8;
  --muted:  rgba(244,246,248,0.52);
  --navy:   #0B3C5D;

  position: relative;
  width: 100%;
  height: 100vh;          /* exactly one viewport */
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: var(--text);
}

/* ── Parallax background ── */
.cta-bg {
  position: absolute;
  inset: -30%;            /* larger oversize = more parallax travel */
  background-image: url('https://cdn.prod.website-files.com/6990d6b6d02a54ec489cbf03/699d0dd1f85e06a8ce7df9d0_pexels-cottonbro-4570794.jpg');
  background-size: cover;
  background-position: center 30%;
  will-change: transform;
  z-index: 0;
}

/* ── Dark overlay — engineering serious tone ── */
.cta-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom,
      rgba(5,12,20,0.72) 0%,
      rgba(8,24,40,0.65) 45%,
      rgba(5,12,20,0.88) 100%),
    radial-gradient(ellipse 90% 70% at 50% 40%, rgba(11,60,93,0.28) 0%, transparent 65%);
  z-index: 1;
}

/* Fine grid — blueprint feel */
.cta-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.032) 1px, transparent 1px);
  background-size: 56px 56px;
  z-index: 2;
  pointer-events: none;
}

/* Slow scan line */
.cta-scan {
  position: absolute;
  left: 0; right: 0;
  height: 35%;
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(71,181,255,0.028) 50%,
    transparent 100%);
  z-index: 3;
  animation: cta-scan 11s linear infinite;
  pointer-events: none;
}
@keyframes cta-scan {
  from { top: -35%; }
  to   { top: 100%; }
}

/* ── Content ── */
.cta-content {
  position: relative;
  z-index: 10;
  text-align: center;
  width: 100%;
  max-width: 1100px;
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Eyebrow */
.cta-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.cta-eyebrow.vis { opacity: 1; transform: translateY(0); }
.cta-eline { width: 28px; height: 1px; background: var(--accent); }

/* ── Headline — max 2 lines, large, sharp ── */
.cta-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(38px, 5.8vw, 82px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  color: #fff;
  margin-bottom: 28px;
  max-width: 1000px;
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.8s ease 0.12s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.12s;
}
.cta-headline.vis { opacity: 1; transform: translateY(0); }

.cta-headline em {
  font-style: normal;
  background: linear-gradient(135deg, #fff 20%, #47B5FF 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Thin rule between headline and body */
.cta-rule {
  width: 40px;
  height: 1px;
  background: rgba(71,181,255,0.5);
  margin: 0 auto 24px;
  opacity: 0;
  transition: opacity 0.5s ease 0.3s, width 0.6s ease 0.3s;
}
.cta-rule.vis { opacity: 1; }

/* Body copy */
.cta-body {
  font-size: clamp(14px, 1.15vw, 17px);
  font-weight: 400;
  color: var(--muted);
  line-height: 1.8;
  max-width: 580px;
  margin-bottom: 44px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s;
}
.cta-body.vis { opacity: 1; transform: translateY(0); }

/* ── Stats ── */
.cta-stats {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-bottom: 48px;
  border: 1px solid rgba(71,181,255,0.15);
  border-radius: 3px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.65s ease 0.5s, transform 0.65s ease 0.5s;
}
.cta-stats.vis { opacity: 1; transform: translateY(0); }

.cta-stat {
  padding: 20px 40px;
  text-align: center;
  border-right: 1px solid rgba(71,181,255,0.15);
  background: rgba(11,60,93,0.2);
  backdrop-filter: blur(4px);
  transition: background 0.25s ease;
}
.cta-stat:last-child { border-right: none; }
.cta-stat:hover { background: rgba(71,181,255,0.08); }

.cta-stat-n {
  font-family: 'Inter', sans-serif;
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  display: block;
  line-height: 1;
  margin-bottom: 7px;
}
.cta-stat-n span { color: var(--accent); }

.cta-stat-l {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--muted);
  text-transform: uppercase;
  line-height: 1.5;
}

/* ── Buttons ── */
.cta-btns {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.65s ease 0.62s, transform 0.65s ease 0.62s;
}
.cta-btns.vis { opacity: 1; transform: translateY(0); }

.cta-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0B3C5D;
  background: var(--accent);
  border-radius: 2px;
  padding: 14px 32px;
  text-decoration: none;
  transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
}
.cta-btn-p:hover {
  background: #6bc5ff;
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(71,181,255,0.38);
}
.cta-btn-p .arr { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
.cta-btn-p:hover .arr { transform: translateX(4px); }

.cta-btn-g {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.8);
  background: transparent;
  border: 1px solid rgba(244,246,248,0.2);
  border-radius: 2px;
  padding: 13px 30px;
  text-decoration: none;
  transition: border-color 0.22s ease, color 0.22s ease, background 0.22s ease, transform 0.22s ease;
}
.cta-btn-g:hover {
  border-color: rgba(71,181,255,0.5);
  color: #fff;
  background: rgba(71,181,255,0.07);
  transform: translateY(-2px);
}

/* ── Corner marks ── */
.cta-corner {
  position: absolute;
  width: 36px; height: 36px;
  z-index: 10;
  pointer-events: none;
  opacity: 0.45;
}
.cta-tl { top: 28px; left: 28px; border-top: 1px solid var(--accent); border-left: 1px solid var(--accent); }
.cta-tr { top: 28px; right: 28px; border-top: 1px solid var(--accent); border-right: 1px solid var(--accent); }
.cta-bl { bottom: 28px; left: 28px; border-bottom: 1px solid var(--accent); border-left: 1px solid var(--accent); }
.cta-br { bottom: 28px; right: 28px; border-bottom: 1px solid var(--accent); border-right: 1px solid var(--accent); }

/* Bottom edge accent */
.cta-edge {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(71,181,255,0.4) 30%, var(--accent) 50%, rgba(71,181,255,0.4) 70%, transparent);
  z-index: 10;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cta-headline { font-size: clamp(32px, 8.5vw, 56px); letter-spacing: -0.025em; }
  .cta-stats { flex-wrap: wrap; border: none; gap: 1px; background: rgba(71,181,255,0.15); border-radius: 3px; }
  .cta-stat { flex: 1 1 calc(50% - 1px); min-width: 140px; padding: 18px 20px; }
  .cta-btns { flex-direction: column; width: 100%; max-width: 320px; }
  .cta-btn-p, .cta-btn-g { width: 100%; justify-content: center; }
  .cta-corner { display: none; }
}

@media (min-width: 1800px) {
  .cta-headline { font-size: clamp(72px, 5.5vw, 100px); }
  .cta-body { font-size: 18px; max-width: 640px; }
  .cta-stat { padding: 24px 52px; }
}
</style>

<section class="cta-root" id="ctaRoot">

  <div class="cta-bg" id="ctaBg"></div>
  <div class="cta-overlay"></div>
  <div class="cta-grid"></div>
  <div class="cta-scan"></div>

  <div class="cta-corner cta-tl"></div>
  <div class="cta-corner cta-tr"></div>
  <div class="cta-corner cta-bl"></div>
  <div class="cta-corner cta-br"></div>

  <div class="cta-content">

    <div class="cta-eyebrow" id="ctaEyebrow">
      <span class="cta-eline"></span>
      Our Promise
      <span class="cta-eline"></span>
    </div>

    <h2 class="cta-headline" id="ctaHeadline">
      We Bridge The Gap Between<br/><em>Digital</em> &amp; Reality
    </h2>

    <div class="cta-rule" id="ctaRule"></div>

    <p class="cta-body" id="ctaBody">
      Most teams invest in tools, technology, and software. The real advantage is in the people and processes behind them. We design controlled digital ecosystems that align with enterprise culture and deliver measurable results from day one.
    </p>

    <div class="cta-stats" id="ctaStats">
      <div class="cta-stat">
        <span class="cta-stat-n"><span class="cta-count" data-t="55">0</span><span>+</span></span>
        <span class="cta-stat-l">Years Combined<br/>Experience</span>
      </div>
      <div class="cta-stat">
        <span class="cta-stat-n">$<span class="cta-count" data-t="50">0</span><span>B+</span></span>
        <span class="cta-stat-l">Assets Delivered<br/>&amp; Modelled</span>
      </div>
      <div class="cta-stat">
        <span class="cta-stat-n"><span class="cta-count" data-t="3">0</span></span>
        <span class="cta-stat-l">Countries of<br/>Delivery</span>
      </div>
    </div>

    <div class="cta-btns" id="ctaBtns">
      <a href="/services" class="cta-btn-p">What We Do <span class="arr">→</span></a>
      <a href="/contact"  class="cta-btn-g">Contact Us</a>
    </div>

  </div>

  <div class="cta-edge"></div>
</section>

<script>
(function(){
'use strict';

var bg   = document.getElementById('ctaBg');
var root = document.getElementById('ctaRoot');
var raf  = false;

/* ── Parallax — 40% speed ── */
function doParallax(){
  var rect   = root.getBoundingClientRect();
  var center = rect.top + rect.height / 2 - window.innerHeight / 2;
  bg.style.transform = 'translateY(' + (center * 0.4) + 'px)';
  raf = false;
}
window.addEventListener('scroll', function(){
  if(!raf){ requestAnimationFrame(doParallax); raf = true; }
}, { passive: true });
doParallax();

/* ── Entrance animations ── */
var done = false;
function animate(){
  if(done) return; done = true;
  ['ctaEyebrow','ctaHeadline','ctaRule','ctaBody','ctaStats','ctaBtns'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.add('vis');
  });
  /* Count up */
  document.querySelectorAll('.cta-count').forEach(function(el){
    var target = +el.getAttribute('data-t');
    var t0 = null, dur = 1800;
    function step(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts-t0)/dur, 1);
      var e = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(e * target);
      if(p < 1) requestAnimationFrame(step);
    }
    setTimeout(function(){ requestAnimationFrame(step); }, 550);
  });
}
new IntersectionObserver(function(e){ if(e[0].isIntersecting){ animate(); } }, { threshold: 0.15 }).observe(root);

}());
</script>`

export default function CtaSection() {
  return <HtmlSection html={html} />
}
