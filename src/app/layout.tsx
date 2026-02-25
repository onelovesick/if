import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Infraforma Solutions — Infrastructure, Thought Through',
  description: 'Human-Led, Digitally Enabled. Structured information management for complex infrastructure projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
