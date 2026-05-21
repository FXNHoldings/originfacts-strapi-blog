import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Weekend Trips from Perth — TravelPayouts',
  description: '3-day round-trip destinations from Perth (PER) — short-haul weekend escapes via TravelPayouts.',
  alternates: { canonical: '/flights-from-perth-tp/weekend-trips' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'duration', tripLength: 3, label: 'Weekend (3 days)' }}
      title="Weekend trips from Perth — 3-day round-trips"
      intro="TravelPayouts fares from Perth (PER) where the cached itinerary lasts roughly 3 days — short-haul weekend escapes. Bali and the closer Australian east-coast cities are typical hits at this length."
    />
  );
}
