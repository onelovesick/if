import SolutionsHero from '@/components/sections/solutions/SolutionsHero';
import SolutionsOverview from '@/components/sections/solutions/SolutionsOverview';
import SolutionsLifecycle from '@/components/sections/solutions/SolutionsLifecycle';
import SolutionsDifferentiators from '@/components/sections/solutions/SolutionsDifferentiators';
import SolutionsStandards from '@/components/sections/solutions/SolutionsStandards';
import SolutionsMapping from '@/components/sections/solutions/SolutionsMapping';
import SolutionsCTA from '@/components/sections/solutions/SolutionsCTA';

export const metadata = {
  title: 'Solutions — Infraforma',
  description: 'Six integrated layers of digital delivery — from BIM strategy to digital twin handover. End-to-end infrastructure information management.',
};

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <SolutionsOverview />
      <SolutionsLifecycle />
      <SolutionsDifferentiators />
      <SolutionsStandards />
      <SolutionsMapping />
      <SolutionsCTA />
    </main>
  );
}
