'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Renders HTML in a full-width iframe that auto-sizes to content height.
 * Passes real viewport width so responsive CSS works correctly.
 * All scripts execute normally inside the iframe.
 */
export default function HtmlSection({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState('0px')

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>html,body{margin:0;padding:0;}</style>
</head>
<body>${html}
<script>
  // Report height to parent whenever content changes
  function reportHeight() {
    var h = document.body.scrollHeight;
    window.parent.postMessage({ type: 'iframeHeight', height: h }, '*');
  }
  // Report on load and after short delays for fonts/animations
  reportHeight();
  setTimeout(reportHeight, 200);
  setTimeout(reportHeight, 600);
  setTimeout(reportHeight, 1500);
  // Watch for DOM size changes
  if (window.ResizeObserver) {
    new ResizeObserver(reportHeight).observe(document.body);
  }
<\/script>
</body>
</html>`)
    doc.close()
  }, [html])

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'iframeHeight' && e.data.height > 0) {
        setHeight(e.data.height + 'px')
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height, border: 'none', display: 'block', overflow: 'hidden' }}
      scrolling="no"
      title="section"
    />
  )
}
