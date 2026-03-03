import IndHero from '@/components/sections/industries/hub/IndHero';
import IndGrid from '@/components/sections/industries/hub/IndGrid';
import IndLayers from '@/components/sections/industries/hub/IndLayers';
import IndProcess from '@/components/sections/industries/hub/IndProcess';
import IndCTA from '@/components/sections/industries/hub/IndCTA';

export const metadata = {
  title: 'Industries — Infrastructure Sectors We Serve | Infraforma',
  description:
    'Infraforma delivers structured digital engineering across six infrastructure sectors: heavy civil, mining, energy, institutional, industrial, and commercial. ISO 19650 aligned, platform agnostic.',
};

export default function IndustriesPage() {
  return (
    <main>
      <IndHero />
      <IndGrid />
      <IndLayers />
      <IndProcess />
      <IndCTA />
    </main>
  );
}
