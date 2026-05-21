import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth Under $1,500 (TP)',
  description: 'Round-trip destinations from Perth (PER) under USD $1,500 via TravelPayouts.',
  alternates: { canonical: '/flights-from-perth-tp/under-1500' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'budget', maxPrice: 1500 }}
      title="Cheap flights from Perth under $1,500"
      intro="Round-trip destinations from Perth (PER) for under USD $1,500, pulled from TravelPayouts. At this budget the list opens up to most of South-East Asia, Hong Kong, and parts of the Pacific. Affiliate-funnel-friendly clicks."
    />
  );
}
