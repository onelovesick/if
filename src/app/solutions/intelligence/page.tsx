import type { Metadata } from 'next';
import IntelligenceHero from '@/components/sections/solutions/intelligence/IntelligenceHero';
// import IntelligenceProblem from '@/components/sections/solutions/intelligence/IntelligenceProblem';
// import IntelligenceServices from '@/components/sections/solutions/intelligence/IntelligenceServices';
// import IntelligenceBridge from '@/components/sections/solutions/intelligence/IntelligenceBridge';
// import IntelligenceMII from '@/components/sections/solutions/intelligence/IntelligenceMII';
// import IntelligenceIntegration from '@/components/sections/solutions/intelligence/IntelligenceIntegration';
// import IntelligenceMatrix from '@/components/sections/solutions/intelligence/IntelligenceMatrix';
// import IntelligenceNavigator from '@/components/sections/solutions/intelligence/IntelligenceNavigator';
// import IntelligenceCTA from '@/components/sections/solutions/intelligence/IntelligenceCTA';

export const metadata: Metadata = {
  title: 'Intelligence — BIM Modelling, Coordination & Verification | Infraforma',
  description:
    'Solution Layer 03: BIM modelling, federated coordination, reality capture, and data verification — engineered so every model element carries audit-grade intelligence.',
  openGraph: {
    title: 'Intelligence — BIM Modelling, Coordination & Verification | Infraforma',
    description:
      'Rule-based validation, automated compliance checking, and federated coordination that surfaces risk before it becomes cost.',
    url: 'https://if-henna.vercel.app/solutions/intelligence/',
    siteName: 'Infraforma',
    type: 'website',
  },
};

export default function IntelligencePage() {
  return (
    <main>
      <IntelligenceHero />
      {/* <IntelligenceProblem /> */}
      {/* <IntelligenceServices /> */}
      {/* <IntelligenceBridge /> */}
      {/* <IntelligenceMII /> */}
      {/* <IntelligenceIntegration /> */}
      {/* <IntelligenceMatrix /> */}
      {/* <IntelligenceNavigator /> */}
      {/* <IntelligenceCTA /> */}
    </main>
  );
}
