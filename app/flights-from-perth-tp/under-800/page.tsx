import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth Under $800 (TP)',
  description: 'Round-trip destinations from Perth (PER) under USD $800 via TravelPayouts.',
  alternates: { canonical: '/flights-from-perth-tp/under-800' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'budget', maxPrice: 800 }}
      title="Cheap flights from Perth under $800"
      intro="Round-trip destinations under USD $800, pulled from TravelPayouts' Perth fare cache. Short-haul Asia-Pacific dominates this list — Bali, Singapore, KL, the Philippines. Click any card to book via your affiliate marker."
    />
  );
}
