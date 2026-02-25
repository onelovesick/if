import { blogPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px', background: '#F2F5F8', minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.6) brightness(0.6)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,18,30,0.9) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#47B5FF', marginBottom: '12px' }}>{post.topic}</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1, maxWidth: '800px' }}>{post.title}</h1>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>{post.date} · {post.readTime}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 5%' }}>
          {post.body ? (
            <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#2d4a5e' }} dangerouslySetInnerHTML={{ __html: post.body }} />
          ) : (
            <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#2d4a5e' }}>
              <p style={{ fontSize: '18px', color: '#0B3C5D', fontWeight: 500, marginBottom: '24px' }}>{post.excerpt}</p>
              <p style={{ marginBottom: '16px', color: '#5a7a96', fontStyle: 'italic' }}>
                Full article content goes here. Add it to the <code>body</code> field in <code>src/lib/content.ts</code>, or connect Sanity CMS to manage it dynamically.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
