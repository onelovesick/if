'use client'
import { useEffect, useRef } from 'react'

export default function HtmlSectionFixed({ html, height = '100vh' }: { html: string; height?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return
    doc.open()
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>${html}</body></html>`)
    doc.close()
  }, [html])

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height, border: 'none', display: 'block' }}
      scrolling="no"
      title="section"
    />
  )
}
