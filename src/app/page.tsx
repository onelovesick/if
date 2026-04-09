import HeroSlider from '@/components/sections/HeroSlider'
import HeroIntro from '@/components/sections/HeroIntro'
import SectionStatement from '@/components/sections/SectionStatement'
import Section1   from '@/components/sections/Section1'
import Section2   from '@/components/sections/Section2'
import Section3   from '@/components/sections/Section3'
import Section4   from '@/components/sections/Section4'
import Section5   from '@/components/sections/Section5'
import Section6   from '@/components/sections/Section6'
import Section7   from '@/components/sections/Section7'
import Section8   from '@/components/sections/Section8'
import Section10  from '@/components/sections/Section10'

export default function HomePage() {
  return (
    <>
      <main style={{ margin: 0, padding: 0 }}>
        <HeroIntro />
        <HeroSlider />
        {/* Content scrolls OVER the fixed hero */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          background: '#F4F7FA',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}>
          <SectionStatement />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section10 />
          <Section8 />
          <Section7 />
        </div>
      </main>
    </>
  )
}
