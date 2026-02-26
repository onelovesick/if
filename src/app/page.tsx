import HeroSlider from '@/components/sections/HeroSlider'
import Section1   from '@/components/sections/Section1'
import Section2   from '@/components/sections/Section2'
import Section3   from '@/components/sections/Section3'
import Section4   from '@/components/sections/Section4'
import Section5   from '@/components/sections/Section5'
import Section6   from '@/components/sections/Section6'
import Section7   from '@/components/sections/Section7'
import PageLoader  from '@/components/layout/PageLoader'

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <main style={{ margin: 0, padding: 0 }}>
        <HeroSlider />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </main>
    </>
  )
}
