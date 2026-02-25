import { industries } from '@/lib/content'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }))
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find(i => i.slug === params.slug)
  if (!industry) notFound()

  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px', background: '#F2F5F8', minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
          <img src={industry.image} alt={industry.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7) brightness(0.55)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,18,30,0.95) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '56px 5%' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#47B5FF', marginBottom: '12px' }}>{industry.tag}</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 0.92 }}>{industry.name}</h1>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 5%' }}>
          <p style={{ fontSize: '18px', color: '#0B3C5D', fontWeight: 500, lineHeight: 1.75, marginBottom: '32px' }}>{industry.desc}</p>
          <p style={{ fontSize: '14px', color: '#5a7a96', lineHeight: 1.8, fontStyle: 'italic' }}>
            Full industry page content goes here. Add it to the <code>industries</code> array in <code>src/lib/content.ts</code>, or connect Sanity CMS.
          </p>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '40px', fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0B3C5D', padding: '18px 32px', border: '1px solid #0B3C5D', textDecoration: 'none' }}>
            Start a Conversation →
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
