import { listAirlines } from '@/lib/strapi';
import AirlineDirectory, { PopularAirlinesStrip } from '@/components/AirlineDirectory';
import ExpandableDescription from '@/components/ExpandableDescription';

export const revalidate = 60;

export const metadata = {
  title: 'Airline Directory',
  description: 'A searchable directory of airlines worldwide — IATA codes, hubs, and details for scheduled carriers, low-cost operators, and regional airlines.',
};

export default async function AirlinesPage() {
  const airlines = await listAirlines().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="airlines-page">
      <header>
        <h1 className="editorial-h text-3xl font-bold text-forest-900">Airline Directory</h1>
        <ExpandableDescription
          text="A working index of the world's commercial airlines — full-service flag carriers, low-cost operators, regional turboprops, and cargo airlines all live in the same searchable list. For each carrier we capture the legal name, IATA and ICAO codes, country of registration, primary hub airport, and founding year, so you can size up the airline behind a fare before you book. Use the filters to slice by region, country, or operator type; tap any airline to land on its profile page, which links straight to a marker-tagged search filtered by that carrier's IATA code. The directory is rebuilt nightly from our master dataset, so a new low-cost launch or a regional rebrand shows up here without us having to push code — it's designed to stay accurate as the industry shuffles rather than rot the moment it ships."
        />
      </header>

      <PopularAirlinesStrip airlines={airlines} />

      <AirlineDirectory airlines={airlines} />
    </div>
  );
}
