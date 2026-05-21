import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth (TP) — Where Can I Fly?',
  description: 'Live cheapest destinations from Perth (PER) via TravelPayouts. Affiliate-funnel-friendly. Cached for 1 hour.',
  alternates: { canonical: '/flights-from-perth-tp/cheap-destinations' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'all' }}
      title="Cheap flights from Perth — top destinations right now"
      intro="The cheapest places you can fly to from Perth (PER) today, pulled live from TravelPayouts' fare cache. Click any card to open Aviasales with our affiliate marker pre-applied. Refreshes every hour."
    />
  );
}
