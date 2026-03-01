import TwinHero from '@/components/sections/solutions/project-twin/TwinHero';
import TwinProblem from '@/components/sections/solutions/project-twin/TwinProblem';
import TwinServices from '@/components/sections/solutions/project-twin/TwinServices';
import TwinBridge from '@/components/sections/solutions/project-twin/TwinBridge';
import TwinTRI from '@/components/sections/solutions/project-twin/TwinTRI';
import TwinIntegration from '@/components/sections/solutions/project-twin/TwinIntegration';
import TwinMatrix from '@/components/sections/solutions/project-twin/TwinMatrix';
import TwinNavigator from '@/components/sections/solutions/project-twin/TwinNavigator';
import TwinCTA from '@/components/sections/solutions/project-twin/TwinCTA';

export const metadata = {
  title: 'Project Twin — As-Built Verification, COBie & Digital Handover | Infraforma',
  description: 'As-built model verification, structured asset information, COBie-compliant datasets, and FM-ready digital twin configuration — transforming construction data into the operational backbone your facilities team depends on.',
};

export default function ProjectTwinPage() {
  return (
    <main>
      <TwinHero />
      <TwinProblem />
      <TwinServices />
      <TwinBridge />
      <TwinTRI />
      <TwinIntegration />
      <TwinMatrix />
      <TwinNavigator />
      <TwinCTA />
    </main>
  );
}
