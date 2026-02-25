import Link from 'next/link'
import { blogPosts } from '@/lib/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function BlogPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px', background: '#F2F5F8', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 5%' }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,4vw,64px)', fontWeight: 900, textTransform: 'uppercase', color: '#0B3C5D', marginBottom: '48px' }}>
            Insights & Resources
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {blogPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: 'block', background: 'white', border: '1px solid rgba(11,60,93,0.1)', textDecoration: 'none', transition: 'transform 0.2s' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover', filter: 'saturate(0.7)' }} />
                <div style={{ padding: '24px' }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#47B5FF', marginBottom: '10px' }}>{post.topic}</div>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: '#0B3C5D', lineHeight: 1, marginBottom: '12px' }}>{post.title}</h2>
                  <p style={{ fontSize: '13px', color: '#5a7a96', lineHeight: 1.7, marginBottom: '16px' }}>{post.excerpt}</p>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a7a96' }}>{post.date} · {post.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
