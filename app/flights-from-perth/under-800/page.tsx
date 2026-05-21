import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth Under $800',
  description: 'Round-trip destinations from Perth (PER) under USD $800. Refreshed daily from Google Travel Explore.',
  alternates: { canonical: '/flights-from-perth/under-800' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'budget', maxPrice: 800 }}
      title="Cheap flights from Perth under $800"
      intro="Round-trip destinations you can fly to from Perth (PER) for under USD $800. Pulled live from Google Travel Explore — short-haul Asia-Pacific dominates this list. Refreshed every 24 hours."
    />
  );
}
