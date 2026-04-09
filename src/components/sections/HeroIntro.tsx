"use client"
import { useEffect, useState, useRef } from 'react'

export default function HeroIntro() {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    document.body.style.overflow = 'hidden'

    let cancelled = false

    import('./omma').then(({ initOmma }) => {
      if (cancelled || !containerRef.current) return

      cleanupRef.current = initOmma(containerRef.current, () => {
        setVisible(false)
        document.body.style.overflow = ''
      })
    })

    return () => {
      cancelled = true
      if (cleanupRef.current) cleanupRef.current()
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: '#03040a',
      }}
    />
  )
}
