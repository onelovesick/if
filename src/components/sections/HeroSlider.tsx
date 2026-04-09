"use client"
import { useEffect, useRef, useState } from 'react'

export default function HeroSlider() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [loadPct, setLoadPct] = useState(0)

  /* ── Bridge 3D scene ── */
  useEffect(() => {
    if (!canvasRef.current) return
    let cancelled = false

    import('./bridgeScene').then(({ initBridgeScene }) => {
      if (cancelled || !canvasRef.current) return
      cleanupRef.current = initBridgeScene(
        canvasRef.current,
        () => { if (!cancelled) setLoaded(true) },
        (pct) => { if (!cancelled) setLoadPct(pct) },
      )
    })

    return () => {
      cancelled = true
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  /* ── Scroll-driven parallax ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sp = Math.min(1, window.scrollY / window.innerHeight)

        const brand = hero.querySelector('[data-hero-brand]') as HTMLElement | null
        const lines = hero.querySelectorAll('[data-hero-line]') as NodeListOf<HTMLElement>
        const desc = hero.querySelector('[data-hero-desc]') as HTMLElement | null
        const scroll = hero.querySelector('[data-hero-scroll]') as HTMLElement | null

        if (brand) {
          brand.style.transform = `translateY(${-sp * 120}px)`
          brand.style.opacity = String(Math.max(0, 1 - sp * 3))
        }
        lines.forEach((el, i) => {
          const speed = 1 + i * 0.15
          el.style.transform = `translateY(${-sp * 80 * speed}px) scale(${1 + sp * 0.15})`
          el.style.opacity = String(Math.max(0, 1 - sp * 2))
        })
        if (desc) {
          desc.style.transform = `translateY(${-sp * 100}px)`
          desc.style.opacity = String(Math.max(0, 1 - sp * 2.5))
        }
        if (scroll) {
          scroll.style.opacity = String(Math.max(0, 1 - sp * 10))
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Fixed hero layer */}
      <div
        ref={heroRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* 3D canvas background */}
        <div
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />

        {/* Loading state */}
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#040507',
            transition: 'opacity 1.5s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{
              width: 32, height: 32,
              border: '1px solid rgba(255,255,255,0.04)',
              borderTopColor: 'rgba(255,255,255,0.25)',
              borderRadius: '50%',
              animation: 'heroSpin 1.4s linear infinite',
              marginBottom: 20,
            }} />
            <div style={{
              fontFamily: 'sans-serif',
              fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: 6,
              textTransform: 'uppercase' as const,
            }}>
              {loadPct > 0 ? `LOADING ${loadPct}%` : 'LOADING MODEL'}
            </div>
          </div>
        )}

        {/* Text overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
        }}>

          {/* Brand top-left */}
          <div
            data-hero-brand
            style={{
              position: 'absolute',
              top: 'clamp(28px, 3.5vw, 44px)',
              left: 'clamp(28px, 4vw, 48px)',
              fontFamily: "'Instrument Sans', 'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.7)',
              opacity: 0,
              animation: loaded ? 'heroFadeIn 0.8s ease forwards 0.2s' : 'none',
              willChange: 'transform, opacity',
            }}
          >
            InfraForma
          </div>

          {/* Headline bottom-left */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(100px, 14vh, 160px)',
            left: 'clamp(28px, 4vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            {/* Eyebrow */}
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 20,
              opacity: 0,
              animation: loaded ? 'heroFadeIn 0.6s ease forwards 0.3s' : 'none',
            }}>
              Infrastructure Intelligence
            </div>

            {['One World.', 'One Standard.', 'Built Right.'].map((line, i) => (
              <div
                key={line}
                style={{
                  overflow: 'hidden',
                  lineHeight: 1,
                }}
              >
                <div
                  data-hero-line
                  style={{
                    fontFamily: "'Instrument Sans', 'Inter', sans-serif",
                    fontSize: 'clamp(42px, 7vw, 110px)',
                    fontWeight: 700,
                    letterSpacing: '-0.035em',
                    textTransform: 'uppercase' as const,
                    color: '#fff',
                    lineHeight: 1.02,
                    transform: 'translateY(110%)',
                    animation: loaded ? `heroClipReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards ${0.4 + i * 0.15}s` : 'none',
                    willChange: 'transform, opacity',
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* Descriptor right-center */}
          <div
            data-hero-desc
            style={{
              position: 'absolute',
              right: 'clamp(28px, 4vw, 48px)',
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: 'right',
              maxWidth: 280,
              opacity: 0,
              animation: loaded ? 'heroFadeIn 0.6s ease forwards 0.8s' : 'none',
              willChange: 'transform, opacity',
            }}
          >
            <p style={{
              fontFamily: "'Instrument Sans', 'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)',
            }}>
              Structured information management for the world's most complex infrastructure projects.
            </p>
            <a
              href="/solutions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 28,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                paddingBottom: 4,
                borderBottom: '1.5px solid rgba(255,255,255,0.3)',
                pointerEvents: 'auto',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.5' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              Explore Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Scroll indicator bottom-center */}
          <div
            data-hero-scroll
            style={{
              position: 'absolute',
              bottom: 'clamp(28px, 4vw, 44px)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              opacity: 0,
              animation: loaded ? 'heroFadeIn 0.5s ease forwards 1.5s' : 'none',
            }}
          >
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.25)',
            }}>
              Scroll
            </span>
            <div style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
              animation: 'heroPulse 2s ease-in-out infinite',
            }} />
          </div>

        </div>
      </div>

      {/* Spacer to reserve hero space in document flow */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0 }} />

      {/* Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroSpin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes heroFadeIn { to { opacity: 1 } }
        @keyframes heroClipReveal { to { transform: translateY(0) } }
        @keyframes heroPulse { 0%,100% { transform: scaleY(1); opacity: 1 } 50% { transform: scaleY(0.35); opacity: 0.35 } }

        @media (max-width: 767px) {
          [data-hero-desc] { display: none !important; }
          [data-hero-line] { font-size: clamp(36px, 11vw, 52px) !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          [data-hero-line] { font-size: clamp(36px, 7vw, 64px) !important; }
          [data-hero-desc] { max-width: 220px !important; }
        }
      `}} />
    </>
  )
}
