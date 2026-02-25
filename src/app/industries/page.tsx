import { industries } from '@/lib/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HtmlSection from '@/components/ui/HtmlSection'
import { readFileSync } from 'fs'
import path from 'path'

export default function IndustriesPage() {
  // Reuse the full industries section HTML from the homepage
  // For a standalone page we just show it full-width with a header
  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px' }}>
        {/* Industries grid section renders here — same component as homepage */}
        <div style={{ background: '#F2F5F8', padding: '80px 5%' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,4vw,64px)', fontWeight: 900, textTransform: 'uppercase', color: '#0B3C5D', marginBottom: '16px' }}>
              Industries We Serve
            </h1>
            <p style={{ fontSize: '15px', color: '#5a7a96', lineHeight: 1.75, maxWidth: '560px', marginBottom: '56px' }}>
              We support industries operating complex, capital-intensive infrastructure. Our role is to bring structure, clarity, and control to information across the full asset lifecycle.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '3px', background: 'rgba(11,60,93,0.09)' }}>
              {industries.map(ind => (
                <a key={ind.slug} href={`/industries/${ind.slug}`} style={{ position: 'relative', height: '360px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none' }}>
                  <img src={ind.image} alt={ind.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.4) brightness(0.65)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,18,30,0.92), rgba(7,18,30,0.2))' }} />
                  <div style={{ position: 'relative', padding: '24px', zIndex: 1 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#47B5FF', marginBottom: '8px' }}>{ind.tag}</div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '26px', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1 }}>{ind.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
