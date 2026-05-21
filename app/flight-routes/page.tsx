import { listRoutes } from '@/lib/strapi';
import RouteDirectory from '@/components/RouteDirectory';
import ExpandableDescription from '@/components/ExpandableDescription';

export const revalidate = 60;

export const metadata = {
  title: 'Flight Routes Directory',
  description: 'Every route we track — searchable by origin, destination, IATA code, or country. Click through for carriers, flight time, and booking.',
};

export default async function FlightsPage() {
  const routes = await listRoutes().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="flights-page">
      <header>
        <h1 className="editorial-h text-3xl font-bold text-forest-900">Flight Routes Directory</h1>
        <ExpandableDescription
          text="Every route in our index is a city-pair — the bones of how the world actually flies. We track which carriers operate each leg, the typical block time, the great-circle distance, and the airports at either end, so you can size up a trip before you ever open a search engine. Use the filters to narrow by origin, destination, country, or IATA code; tap any route to see the airlines flying it, their hubs, and a live fare search pre-populated for the city pair. The directory is most useful when you already know roughly where you want to go and want a sober view of who flies it, how long the flight takes, and how many stops you should expect — long before you start chasing the headline price."
        />
      </header>

      <RouteDirectory routes={routes} />
    </div>
  );
}
