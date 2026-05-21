import { listAirports } from '@/lib/strapi';
import AirportDirectory from '@/components/AirportDirectory';
import ExpandableDescription from '@/components/ExpandableDescription';

export const revalidate = 60;

export const metadata = {
  title: 'Airport Directory',
  description: 'A searchable directory of commercial airports worldwide — IATA codes, cities, hubs, and route information.',
};

export default async function AirportsPage() {
  const airports = await listAirports().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="airports-page">
      <header>
        <h1 className="editorial-h text-3xl font-bold text-forest-900">Airports — Travel Directory</h1>
        <ExpandableDescription
          text="A searchable index of every commercial airport we track — large international hubs, secondary city fields, and the regional strips that quietly stitch the long-haul network together. Each entry carries the three-letter IATA code, the four-letter ICAO identifier, the city and country it serves, latitude and longitude, time zone, and the world region it sits in. Use the filters to find an airport by code, by city name, or by country, then click through to its profile to see the airlines that fly there and the routes it operates. The directory is most useful when you're translating between codes and cities, working out whether two nearby airports actually share a metro area, or planning a self-connect — the kind of question travel-site search boxes never let you ask directly."
        />
      </header>

      <AirportDirectory airports={airports} />
    </div>
  );
}
