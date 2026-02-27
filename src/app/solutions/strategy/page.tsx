import StrategyHero from '@/components/sections/solutions/strategy/StrategyHero';
import StrategyProblem from '@/components/sections/solutions/strategy/StrategyProblem';
import StrategyServices from '@/components/sections/solutions/strategy/StrategyServices';
import StrategyIntegration from '@/components/sections/solutions/strategy/StrategyIntegration';
import StrategyMatrix from '@/components/sections/solutions/strategy/StrategyMatrix';
import StrategyNavigator from '@/components/sections/solutions/strategy/StrategyNavigator';
import StrategyCTA from '@/components/sections/solutions/strategy/StrategyCTA';

export const metadata = {
  title: 'Strategy — BIM Execution Plans, EIR & Digital Roadmaps | Infraforma',
  description: 'Define the information backbone of your programme before a single model is opened. BEP development, EIR authoring, digital roadmaps, and risk assessment — aligned to ISO 19650.',
};

export default function StrategyPage() {
  return (
    <main>
      <StrategyHero />
      <StrategyProblem />
      <StrategyServices />
      <StrategyIntegration />
      <StrategyMatrix />
      <StrategyNavigator />
      <StrategyCTA />
    </main>
  );
}
