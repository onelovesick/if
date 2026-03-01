import type { Metadata } from 'next';
import ExecutionHero from '@/components/sections/solutions/execution/ExecutionHero';
import ExecutionProblem from '@/components/sections/solutions/execution/ExecutionProblem';
import ExecutionServices from '@/components/sections/solutions/execution/ExecutionServices';
import ExecutionBridge from '@/components/sections/solutions/execution/ExecutionBridge';
import ExecutionERI from '@/components/sections/solutions/execution/ExecutionERI';
import ExecutionIntegration from '@/components/sections/solutions/execution/ExecutionIntegration';
import ExecutionMatrix from '@/components/sections/solutions/execution/ExecutionMatrix';
import ExecutionNavigator from '@/components/sections/solutions/execution/ExecutionNavigator';
import ExecutionCTA from '@/components/sections/solutions/execution/ExecutionCTA';

export const metadata: Metadata = {
  title: 'Execution — 4D Scheduling, Work Packaging & Field BIM | Infraforma',
  description:
    'Solution Layer 04: 4D construction simulation, work packaging, field BIM deployment, and site verification — connecting models to what actually gets built.',
  openGraph: {
    title: 'Execution — 4D Scheduling, Work Packaging & Field BIM | Infraforma',
    description:
      '4D scheduling, work packaging, field BIM deployment, and construction verification — engineered so models drive what gets built on site.',
    url: 'https://if-henna.vercel.app/solutions/execution/',
    siteName: 'Infraforma',
    type: 'website',
  },
};

export default function ExecutionPage() {
  return (
    <main>
      <ExecutionHero />
      <ExecutionProblem />
      <ExecutionServices />
      <ExecutionBridge />
      <ExecutionERI />
      <ExecutionIntegration />
      <ExecutionMatrix />
      <ExecutionNavigator />
      <ExecutionCTA />
    </main>
  );
}
