import HtmlSection from '@/components/ui/HtmlSection'
import { readFileSync } from 'fs'
import path from 'path'

// CTA duplicate (check if needed)
export default function CtaSection2() {
  const html = readFileSync(
    path.join(process.cwd(), 'src/raw/sec5.html'),
    'utf-8'
  )
  return <HtmlSection html={html} />
}
