"use client"
import { useEffect } from 'react'

const heroHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');

.h3 *, .h3 *::before, .h3 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.h3 {
  --accent: #47B5FF;
  --accent-light: #7DD4FF;
  --bg-deep: #030a12;
  --bg: #060e18;
  --text: #F4F6F8;
  --muted: rgba(244,246,248,0.7);

  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg-deep);
}

/* ══ VIDEO BACKGROUND ══ */
.h3-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}
.h3-video {
  position: absolute;
  top: 50%;
  left: 65%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: contain;
}

/* Multi-layer video blending */
.h3-vid-overlay {
  position: absolute;
  inset: 0;
  background: rgba(3,10,18,0.35);
  pointer-events: none;
}
.h3-vid-left {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    rgba(3,10,18,1) 0%,
    rgba(3,10,18,0.92) 22%,
    rgba(3,10,18,0.6) 42%,
    transparent 62%
  );
  pointer-events: none;
}
.h3-vid-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(3,10,18,0.95) 0%, transparent 100%);
  pointer-events: none;
}
.h3-vid-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 25%;
  background: linear-gradient(to bottom, rgba(3,10,18,0.5) 0%, transparent 100%);
  pointer-events: none;
}
.h3-vid-right {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 15%;
  background: linear-gradient(270deg, rgba(3,10,18,0.6) 0%, transparent 100%);
  pointer-events: none;
}
.h3-vid-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 70% at 65% 45%, transparent 30%, rgba(3,10,18,0.7) 100%);
  pointer-events: none;
}

/* ══ GRAIN ══ */
.h3-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
.h3-grain-svg { width: 100%; height: 100%; display: block; }

/* ══ CORNER MARKS ══ */
.h3-corner {
  position: absolute;
  width: 32px; height: 32px;
  z-index: 8;
  pointer-events: none;
  opacity: 0;
  animation: h3fadeIn 0.8s ease forwards 2.2s;
}
.h3-corner.tl { top: 24px; left: 24px; border-top: 1px solid rgba(71,181,255,0.25); border-left: 1px solid rgba(71,181,255,0.25); }
.h3-corner.tr { top: 24px; right: 24px; border-top: 1px solid rgba(71,181,255,0.25); border-right: 1px solid rgba(71,181,255,0.25); }
.h3-corner.bl { bottom: 90px; left: 24px; border-bottom: 1px solid rgba(71,181,255,0.15); border-left: 1px solid rgba(71,181,255,0.15); }
.h3-corner.br { bottom: 90px; right: 24px; border-bottom: 1px solid rgba(71,181,255,0.15); border-right: 1px solid rgba(71,181,255,0.15); }

/* ══ SCAN LINE ══ */
.h3-scanline {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  z-index: 6;
  background: linear-gradient(90deg, transparent 5%, rgba(71,181,255,0.5) 30%, rgba(71,181,255,0.8) 50%, rgba(71,181,255,0.5) 70%, transparent 95%);
  box-shadow: 0 0 30px rgba(71,181,255,0.3), 0 0 60px rgba(71,181,255,0.1);
  opacity: 0;
  top: 0;
  animation: h3scan 2.5s cubic-bezier(0.4,0,0.2,1) forwards 0.6s;
  pointer-events: none;
}
@keyframes h3scan {
  0% { top: -1px; opacity: 0; }
  5% { opacity: 1; }
  85% { opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}

/* ══ CURSOR GLOW ══ */
.h3-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71,181,255,0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  will-change: left, top;
}
.h3.h3-mouse-active .h3-glow { opacity: 1; }

/* ══ CONTENT ══ */
.h3-content-wrap {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 clamp(5%, 6vw, 8%);
}

.h3-content {
  width: 50vw;
  max-width: 720px;
  min-width: 280px;
}

/* ══ EYEBROW ══ */
.h3-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}
.h3-eyebrow-line {
  display: block;
  height: 1px;
  width: 44px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  animation: h3lineGrow 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.3s;
}
@keyframes h3lineGrow { to { transform: scaleX(1); } }

.h3-eyebrow-text {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-12px);
  animation: h3fadeSlide 0.5s ease forwards 0.5s;
}
@keyframes h3fadeSlide { to { opacity: 1; transform: translateX(0); } }

/* ══ HEADLINE ══ */
.h3-title {
  margin-bottom: 28px;
}
.h3-word {
  display: block;
  overflow: hidden;
  line-height: 1.05;
}
.h3-word-inner {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(32px, 4.8vw, 80px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  transform: translateY(120%);
  animation: h3wordUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
}
.h3-word:nth-child(1) .h3-word-inner { animation-delay: 0.15s; }
.h3-word:nth-child(2) .h3-word-inner { animation-delay: 0.25s; }
.h3-word:nth-child(3) .h3-word-inner { animation-delay: 0.35s; }
@keyframes h3wordUp { to { transform: translateY(0); } }

.h3-word.h3-accent .h3-word-inner {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 40%, var(--accent) 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: h3wordUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.25s, h3grad 5s ease-in-out infinite 1.2s;
  font-weight: 800;
  filter: drop-shadow(0 0 30px rgba(71,181,255,0.15));
}
@keyframes h3grad {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ══ BODY TEXT ══ */
.h3-body {
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  color: var(--muted);
  line-height: 1.85;
  max-width: 480px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(16px);
  animation: h3fadeUp 0.6s ease forwards 0.6s;
}
@keyframes h3fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ══ TAG ══ */
.h3-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.55);
  margin-bottom: 36px;
  opacity: 0;
  animation: h3fadeIn 0.5s ease forwards 0.72s;
}

/* ══ BUTTONS ══ */
.h3-btns {
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  transform: translateY(12px);
  animation: h3fadeUp 0.5s ease forwards 0.82s;
}

.h3-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bg-deep);
  background: var(--accent);
  border: none;
  border-radius: 1px;
  padding: 15px 30px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
}
.h3-btn-p::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.h3-btn-p:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(71,181,255,0.35), 0 0 60px rgba(71,181,255,0.1);
}
.h3-btn-p:hover::before { transform: translateX(100%); }
.h3-btn-arr { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.h3-btn-p:hover .h3-btn-arr { transform: translateX(4px); }

.h3-btn-g {
  display: inline-flex;
  align-items: center;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.6);
  border: 1px solid rgba(244,246,248,0.12);
  border-radius: 1px;
  padding: 14px 28px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.h3-btn-g:hover {
  border-color: rgba(71,181,255,0.4);
  color: #fff;
  background: rgba(71,181,255,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(71,181,255,0.08);
}

/* ══ BOTTOM BAR ══ */
.h3-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 11;
  border-top: 1px solid rgba(71,181,255,0.1);
  background: rgba(3,10,18,0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 4vw, 64px);
  padding: 20px clamp(24px, 5%, 64px);
  opacity: 0;
  transform: translateY(100%);
  animation: h3slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards 2.2s;
}
@keyframes h3slideUp { to { opacity: 1; transform: translateY(0); } }

.h3-bottom-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.h3-bottom-icon {
  width: 32px; height: 32px;
  border-radius: 6px;
  border: 1px solid rgba(71,181,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.h3-bottom-icon svg {
  width: 14px; height: 14px;
  color: var(--accent);
  opacity: 0.7;
}
.h3-bottom-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244,246,248,0.35);
}
.h3-bottom-sep {
  width: 1px;
  height: 20px;
  background: rgba(71,181,255,0.1);
}

/* ══ SCROLL INDICATOR ══ */
.h3-scroll {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: h3fadeIn 0.6s ease forwards 3s;
}
.h3-scroll-text {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(71,181,255,0.35);
}
.h3-scroll-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, rgba(71,181,255,0.5), transparent);
  animation: h3scrollPulse 2s ease-in-out infinite;
}
@keyframes h3scrollPulse { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.35);opacity:0.35} }

/* ══ KEYFRAMES ══ */
@keyframes h3fadeIn { to { opacity: 1; } }

/* ══ RESPONSIVE ══ */
@media (max-width: 480px) {
  .h3-content { width: 90vw; max-width: 90vw; }
  .h3-word-inner { font-size: clamp(28px, 9vw, 44px) !important; }
  .h3-btns { flex-direction: column; align-items: flex-start; }
  .h3-corner.bl, .h3-corner.br { bottom: 80px; }
  .h3-scroll { bottom: 75px; }
  .h3-bottom { gap: 16px; flex-wrap: wrap; justify-content: flex-start; }
  .h3-bottom-sep { display: none; }
}
@media (min-width: 481px) and (max-width: 767px) {
  .h3-content { width: 85vw; max-width: 85vw; }
  .h3-word-inner { font-size: clamp(28px, 7vw, 52px) !important; }
  .h3-corner.bl, .h3-corner.br { bottom: 80px; }
  .h3-scroll { bottom: 75px; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .h3-content { width: 62vw; max-width: 62vw; }
  .h3-word-inner { font-size: clamp(28px, 5.5vw, 60px) !important; }
}
@media (min-width: 1024px) and (max-width: 1439px) {
  .h3-content { width: 48vw; }
  .h3-word-inner { font-size: clamp(28px, 4.2vw, 66px) !important; }
}
@media (min-width: 1920px) and (max-width: 2559px) {
  .h3-content { width: 48vw; max-width: 920px; }
  .h3-word-inner { font-size: clamp(48px, 4.5vw, 88px) !important; }
  .h3-body { font-size: 19px; max-width: 560px; line-height: 1.9; }
  .h3-eyebrow-text { font-size: 11px; letter-spacing: 0.35em; }
  .h3-tag { font-size: 11px; }
  .h3-btn-p, .h3-btn-g { font-size: 12px; padding: 17px 34px; }
}
@media (min-width: 2560px) {
  .h3 { padding: 0 2%; }
  .h3-content { width: 46vw; max-width: 1100px; }
  .h3-word-inner { font-size: clamp(56px, 4.2vw, 110px) !important; }
  .h3-body { font-size: 21px; max-width: 640px; line-height: 1.9; }
  .h3-eyebrow { margin-bottom: 36px; }
  .h3-eyebrow-text { font-size: 12px; letter-spacing: 0.35em; }
  .h3-eyebrow-line { width: 56px; }
  .h3-title { margin-bottom: 36px; }
  .h3-tag { font-size: 12px; margin-bottom: 44px; }
  .h3-btn-p, .h3-btn-g { font-size: 13px; padding: 18px 38px; }
}
</style>

<section class="h3" id="h3Root">

  <!-- Video background -->
  <div class="h3-video-wrap">
    <video class="h3-video" autoplay muted loop playsinline>
      <source src="/videos/bg_IF.mp4" type="video/mp4" />
    </video>
    <div class="h3-vid-overlay"></div>
    <div class="h3-vid-radial"></div>
    <div class="h3-vid-left"></div>
    <div class="h3-vid-right"></div>
    <div class="h3-vid-bottom"></div>
    <div class="h3-vid-top"></div>
  </div>

  <!-- Grain -->
  <div class="h3-grain">
    <svg class="h3-grain-svg" xmlns="http://www.w3.org/2000/svg">
      <filter id="h3grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#h3grain)"/>
    </svg>
  </div>

  <!-- Scan line -->
  <div class="h3-scanline"></div>

  <!-- Corner marks -->
  <div class="h3-corner tl"></div>
  <div class="h3-corner tr"></div>
  <div class="h3-corner bl"></div>
  <div class="h3-corner br"></div>

  <!-- Cursor glow -->
  <div class="h3-glow" id="h3Glow"></div>

  <!-- Content -->
  <div class="h3-content-wrap">
    <div class="h3-content">
      <div class="h3-eyebrow">
        <span class="h3-eyebrow-line"></span>
        <span class="h3-eyebrow-text">Human-Led, Digitally Enabled</span>
      </div>
      <h1 class="h3-title">
        <span class="h3-word"><span class="h3-word-inner">One World.</span></span>
        <span class="h3-word h3-accent"><span class="h3-word-inner">One Standard.</span></span>
        <span class="h3-word"><span class="h3-word-inner">Built Right.</span></span>
      </h1>
      <p class="h3-body">We bring structured information management to the world's most complex infrastructure projects. Every asset governed, every decision informed.</p>
      <p class="h3-tag">Information Management &middot; Digital Delivery &middot; Asset Intelligence</p>
      <div class="h3-btns">
        <a href="/solutions" class="h3-btn-p">Explore Our Solutions <span class="h3-btn-arr">&rarr;</span></a>
        <a href="/contact" class="h3-btn-g">Start a Conversation</a>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="h3-bottom">
    <div class="h3-bottom-item">
      <div class="h3-bottom-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </div>
      <span class="h3-bottom-label">3 Countries of Delivery</span>
    </div>
    <div class="h3-bottom-sep"></div>
    <div class="h3-bottom-item">
      <div class="h3-bottom-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <span class="h3-bottom-label">$50B+ in Assets Delivered</span>
    </div>
    <div class="h3-bottom-sep"></div>
    <div class="h3-bottom-item">
      <div class="h3-bottom-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      </div>
      <span class="h3-bottom-label">ISO 19650 Aligned</span>
    </div>
    <div class="h3-bottom-sep"></div>
    <div class="h3-bottom-item">
      <div class="h3-bottom-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <span class="h3-bottom-label">55+ Years Combined</span>
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="h3-scroll">
    <span class="h3-scroll-text">Scroll</span>
    <div class="h3-scroll-line"></div>
  </div>

</section>`

const heroScript = `(function(){
'use strict';

var root = document.getElementById('h3Root');
if(!root) return;

var glow = document.getElementById('h3Glow');

root.addEventListener('mouseenter', function(){ root.classList.add('h3-mouse-active'); });
root.addEventListener('mouseleave', function(){ root.classList.remove('h3-mouse-active'); });

root.addEventListener('mousemove', function(e){
  var rect = root.getBoundingClientRect();
  if(glow){
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
  }
});

}());`

export default function HeroSlider() {
  useEffect(() => {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        new Function(heroScript)()
      } catch(e) {
        console.error('Hero script error:', e)
      }
    }, 100)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: heroHtml }}
    />
  )
}
