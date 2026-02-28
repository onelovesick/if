import StructureHero from '@/components/sections/solutions/structure/StructureHero';
import StructureProblem from '@/components/sections/solutions/structure/StructureProblem';
import StructureServices from '@/components/sections/solutions/structure/StructureServices';
import StructurePDSBridge from '@/components/sections/solutions/structure/StructurePDSBridge';
import StructurePDS from '@/components/sections/solutions/structure/StructurePDS';
// import StructureIntegration from '@/components/sections/solutions/structure/StructureIntegration';
// import StructureMatrix from '@/components/sections/solutions/structure/StructureMatrix';
// import StructureNavigator from '@/components/sections/solutions/structure/StructureNavigator';
// import StructureCTA from '@/components/sections/solutions/structure/StructureCTA';

export const metadata = {
  title: 'Structure — CDE, Naming, LOD Frameworks & Data Architecture | Infraforma',
  description: 'CDE configuration, naming conventions, classification mapping, and LOD/LOI frameworks — the organisational backbone that makes every exchange reliable and every dataset contractually defensible.',
};

export default function StructurePage() {
  return (
    <main>
      <StructureHero />
      <StructureProblem />
      <StructureServices />
      <StructurePDSBridge />
      <StructurePDS />
      {/* <StructureIntegration /> */}
      {/* <StructureMatrix /> */}
      {/* <StructureNavigator /> */}
      {/* <StructureCTA /> */}
    </main>
  );
}
