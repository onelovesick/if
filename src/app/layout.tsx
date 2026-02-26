import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Section8 from '@/components/sections/Section8'
import Section10 from '@/components/sections/Section10'

export const metadata: Metadata = {
  title: 'Infraforma Solutions — Infrastructure, Thought Through',
  description: 'Human-Led, Digitally Enabled. Structured information management for complex infrastructure projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Section8 />
        <Section10 />
        <Footer />
      </body>
    </html>
  )
}
