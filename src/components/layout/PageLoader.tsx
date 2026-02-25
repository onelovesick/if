"use client"
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [mounted, setMounted] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.classList.add('ldr-active')

    const loader = document.getElementById('ifLoader')
    const bar    = document.getElementById('ldrBar')
    const dot    = document.getElementById('ldrDot')
    const msg    = document.getElementById('ldrMsg')
    const pct    = document.getElementById('ldrPct')
    const track  = document.getElementById('ldrTrack')
    const pulse  = document.getElementById('ldrPulse')
    const pulse2 = document.getElementById('ldrPulse2')
    const pipe   = document.getElementById('ldrPipePath')

    if (!loader || !bar || !dot || !msg || !pct || !track) return

    let lastMsg  = ''
    let rafId: number | null = null
    let exited   = false

    const messages = [
      { at: 0,   text: 'Initialising' },
      { at: 20,  text: 'Loading assets' },
      { at: 40,  text: 'Building structure' },
      { at: 60,  text: 'Rendering components' },
      { at: 80,  text: 'Calibrating' },
      { at: 95,  text: 'Almost ready' },
      { at: 100, text: 'Complete' },
    ]

    setTimeout(() => {
      if (pipe)   pipe.setAttribute('stroke', 'rgba(71,181,255,0.45)')
      if (pulse)  pulse.setAttribute('opacity', '0.85')
      if (pulse2) pulse2.setAttribute('opacity', '0.5')
    }, 300)

    function setProgress(val: number) {
      val = Math.min(100, Math.max(0, val))
      bar!.style.width = val + '%'
      dot!.style.left  = val + '%'
      pct!.textContent = Math.round(val) + '%'
      track!.setAttribute('aria-valuenow', String(Math.round(val)))
      let newMsg = messages[0].text
      for (let i = 0; i < messages.length; i++) {
        if (val >= messages[i].at) newMsg = messages[i].text
      }
      if (newMsg !== lastMsg) {
        lastMsg = newMsg
        msg!.style.opacity = '0'
        const t = newMsg
        setTimeout(() => { msg!.textContent = t; msg!.style.opacity = '1' }, 130)
      }
    }

    function exitLoader() {
      if (exited) return
      exited = true
      if (rafId) cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('ldr-active')
      loader!.classList.add('ldr-exit')
      setTimeout(() => {
        loader!.classList.add('ldr-gone')
        setTimeout(() => setGone(true), 100)
      }, 900)
    }

    const sequence = [
      { to: 25,  duration: 380 },
      { to: 50,  duration: 320 },
      { to: 72,  duration: 320 },
      { to: 88,  duration: 380 },
      { to: 100, duration: 300 },
    ]

    let stepIndex = 0
    let stepStart: number | null = null
    let stepFrom  = 0

    function tick(ts: number) {
      if (exited) return
      if (stepIndex >= sequence.length) {
        setProgress(100)
        setTimeout(exitLoader, 300)
        return
      }
      if (!stepStart) stepStart = ts
      const s     = sequence[stepIndex]
      const t     = Math.min((ts - stepStart) / s.duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(stepFrom + (s.to - stepFrom) * eased)
      if (t >= 1) {
        stepFrom  = s.to
        stepStart = null
        stepIndex++
      }
      rafId = requestAnimationFrame(tick)
    }

    setTimeout(() => { rafId = requestAnimationFrame(tick) }, 160)

    return () => { if (rafId) cancelAnimationFrame(rafId) }
  }, [mounted])

  if (!mounted || gone) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Mono:wght@300;400&display=swap');
        html.ldr-active, html.ldr-active body { overflow: hidden !important; }
        #ifLoader {
          position: fixed; inset: 0; z-index: 999999;
          background: #060d14;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          pointer-events: all;
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        #ifLoader.ldr-exit { opacity: 0; transform: translateY(-12px); pointer-events: none; }
        #ifLoader.ldr-gone { display: none; }
        #ldrSvg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .ldr-center { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 0; }
        .ldr-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(28px,5vw,44px); font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #F4F6F8; line-height: 1; margin-bottom: 6px;
          opacity: 0; transform: translateY(10px);
          animation: ldr-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards 0.2s;
        }
        .ldr-logo span { color: #47B5FF; }
        .ldr-tagline {
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px,1.2vw,11px); letter-spacing: 0.32em;
          text-transform: uppercase; color: rgba(71,181,255,0.45);
          margin-bottom: 48px; opacity: 0;
          animation: ldr-up 0.5s ease forwards 0.45s;
        }
        .ldr-track {
          width: clamp(200px,30vw,320px); height: 1px;
          background: rgba(71,181,255,0.1);
          position: relative; margin-bottom: 16px; overflow: visible;
        }
        .ldr-bar {
          position: absolute; top: 0; left: 0; height: 100%; width: 0%;
          background: linear-gradient(90deg, #0B3C5D, #47B5FF);
          transition: width 0.12s linear;
          box-shadow: 0 0 10px rgba(71,181,255,0.6);
        }
        .ldr-dot {
          position: absolute; top: 50%; left: 0%;
          transform: translate(-50%,-50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: #47B5FF;
          box-shadow: 0 0 8px #47B5FF, 0 0 20px rgba(71,181,255,0.4);
        }
        .ldr-status {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(71,181,255,0.35); height: 14px; overflow: hidden;
          opacity: 0; animation: ldr-fade 0.4s ease forwards 0.5s;
          min-width: clamp(200px,30vw,320px);
          display: flex; justify-content: space-between; align-items: center;
        }
        .ldr-status-msg { transition: opacity 0.25s ease; }
        .ldr-status-pct { font-family: 'DM Mono', monospace; font-size: 9px; color: rgba(71,181,255,0.5); letter-spacing: 0.1em; }
        .ldr-corner { position: absolute; width: 20px; height: 20px; opacity: 0; animation: ldr-fade 0.4s ease forwards 0.3s; }
        .ldr-corner.tl { top: clamp(16px,3vw,32px); left: clamp(16px,4vw,40px); border-top: 1px solid rgba(71,181,255,0.3); border-left: 1px solid rgba(71,181,255,0.3); }
        .ldr-corner.tr { top: clamp(16px,3vw,32px); right: clamp(16px,4vw,40px); border-top: 1px solid rgba(71,181,255,0.3); border-right: 1px solid rgba(71,181,255,0.3); }
        .ldr-corner.bl { bottom: clamp(16px,3vw,32px); left: clamp(16px,4vw,40px); border-bottom: 1px solid rgba(71,181,255,0.3); border-left: 1px solid rgba(71,181,255,0.3); }
        .ldr-corner.br { bottom: clamp(16px,3vw,32px); right: clamp(16px,4vw,40px); border-bottom: 1px solid rgba(71,181,255,0.3); border-right: 1px solid rgba(71,181,255,0.3); }
        .ldr-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(71,181,255,0.15), transparent);
          animation: ldr-scan 3s ease-in-out infinite 0.8s; pointer-events: none;
        }
        @keyframes ldr-scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes ldr-up   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ldr-fade { from{opacity:0} to{opacity:1} }
      `}</style>

      <div id="ifLoader" role="status" aria-label="Loading Infraforma">
        <svg id="ldrSvg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="ldrGlow">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g stroke="rgba(71,181,255,0.04)" strokeWidth="1">
            <line x1="0" y1="150" x2="1440" y2="150"/>
            <line x1="0" y1="300" x2="1440" y2="300"/>
            <line x1="0" y1="450" x2="1440" y2="450"/>
            <line x1="0" y1="600" x2="1440" y2="600"/>
            <line x1="0" y1="750" x2="1440" y2="750"/>
            <line x1="240" y1="0" x2="240" y2="900"/>
            <line x1="480" y1="0" x2="480" y2="900"/>
            <line x1="720" y1="0" x2="720" y2="900"/>
            <line x1="960" y1="0" x2="960" y2="900"/>
            <line x1="1200" y1="0" x2="1200" y2="900"/>
          </g>
          <g stroke="rgba(71,181,255,0.07)" strokeWidth="1" fill="none">
            <path d="M0,300 L240,300 L240,150 L480,150 L480,300 L720,300 L720,150 L960,150 L960,300 L1200,300 L1200,0"/>
            <path d="M1440,600 L1200,600 L1200,450 L960,450 L960,600 L720,600 L720,750 L480,750 L480,600 L240,600 L240,900"/>
          </g>
          <path id="ldrPipePath" fill="none" stroke="rgba(71,181,255,0)" strokeWidth="1.5" filter="url(#ldrGlow)"
            d="M0,300 L240,300 L240,150 L480,150 L480,300 L720,300 L720,150 L960,150 L960,300 L1200,300 L1200,0"/>
          <g fill="rgba(71,181,255,0.4)" filter="url(#ldrGlow)">
            <circle cx="240" cy="300" r="2.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="480" cy="150" r="2.5"><animate attributeName="opacity" values="1;0.3;1" dur="2.5s" begin="0.4s" repeatCount="indefinite"/></circle>
            <circle cx="720" cy="300" r="3"><animate attributeName="r" values="2.5;4;2.5" dur="1.8s" repeatCount="indefinite"/></circle>
            <circle cx="960" cy="150" r="2.5"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="0.7s" repeatCount="indefinite"/></circle>
            <circle cx="1200" cy="300" r="2.5"><animate attributeName="opacity" values="1;0.4;1" dur="2.2s" begin="1s" repeatCount="indefinite"/></circle>
          </g>
          <circle id="ldrPulse" r="4" fill="#47B5FF" opacity="0" filter="url(#ldrGlow)">
            <animateMotion dur="2.4s" repeatCount="indefinite"
              path="M0,300 L240,300 L240,150 L480,150 L480,300 L720,300 L720,150 L960,150 L960,300 L1200,300 L1200,0"/>
          </circle>
          <circle id="ldrPulse2" r="2.5" fill="#47B5FF" opacity="0" filter="url(#ldrGlow)">
            <animateMotion dur="2.4s" begin="-1.2s" repeatCount="indefinite"
              path="M0,300 L240,300 L240,150 L480,150 L480,300 L720,300 L720,150 L960,150 L960,300 L1200,300 L1200,0"/>
          </circle>
        </svg>

        <div className="ldr-corner tl" aria-hidden="true"></div>
        <div className="ldr-corner tr" aria-hidden="true"></div>
        <div className="ldr-corner bl" aria-hidden="true"></div>
        <div className="ldr-corner br" aria-hidden="true"></div>
        <div className="ldr-scan" aria-hidden="true"></div>

        <div className="ldr-center">
          <div className="ldr-logo">INFRA<span>FORMA</span></div>
          <div className="ldr-tagline">Human-Led · Digitally Enabled</div>
          <div className="ldr-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} id="ldrTrack">
            <div className="ldr-bar" id="ldrBar"></div>
            <div className="ldr-dot" id="ldrDot"></div>
          </div>
          <div className="ldr-status" id="ldrStatus">
            <span className="ldr-status-msg" id="ldrMsg">Initialising</span>
            <span className="ldr-status-pct" id="ldrPct">0%</span>
          </div>
        </div>
      </div>
    </>
  )
}
