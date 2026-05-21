import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth Under $1,500',
  description: 'Round-trip destinations from Perth (PER) under USD $1,500. Refreshed daily from Google Travel Explore.',
  alternates: { canonical: '/flights-from-perth/under-1500' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'budget', maxPrice: 1500 }}
      title="Cheap flights from Perth under $1,500"
      intro="Round-trip destinations from Perth (PER) for under USD $1,500 — the typical mid-haul budget that opens up Europe, parts of the Americas, and most of South-East Asia. Refreshed every 24 hours from Google Travel Explore."
    />
  );
}
