import InsightsHero from '@/components/sections/solutions/insights/InsightsHero';
import InsightsProblem from '@/components/sections/solutions/insights/InsightsProblem';
import InsightsServices from '@/components/sections/solutions/insights/InsightsServices';
import InsightsBridge from '@/components/sections/solutions/insights/InsightsBridge';
import InsightsPipeline from '@/components/sections/solutions/insights/InsightsPipeline';
import InsightsIntegration from '@/components/sections/solutions/insights/InsightsIntegration';
import InsightsMatrix from '@/components/sections/solutions/insights/InsightsMatrix';
import InsightsNavigator from '@/components/sections/solutions/insights/InsightsNavigator';
import InsightsCTA from '@/components/sections/solutions/insights/InsightsCTA';

export const metadata = {
  title: 'Insights — Dashboards, BIM Auditing & Programme Analytics | Infraforma',
  description: 'Custom dashboards, BIM auditing, 5D cost integration, compliance scorecards, and programme analytics — structured visibility that transforms scattered construction data into the intelligence your programme needs to make better decisions, faster.',
};

export default function InsightsPage() {
  return (
    <main>
      <InsightsHero />
      <InsightsProblem />
      <InsightsServices />
      <InsightsBridge />
      <InsightsPipeline />
      <InsightsIntegration />
      <InsightsMatrix />
      <InsightsNavigator />
      <InsightsCTA />
    </main>
  );
}
