import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400; // 24h — inspirational content, daily refresh is plenty

export const metadata: Metadata = {
  title: 'Cheap Flights from Perth — Where Can I Fly?',
  description:
    'Live cheapest destinations from Perth (PER), refreshed daily from Google Travel Explore. Sorted by price; weekend trips, non-stop only, and per-month variants on this page.',
  alternates: { canonical: '/flights-from-perth/cheap-destinations' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'all' }}
      title="Cheap flights from Perth — top destinations right now"
      intro="The 20 cheapest places you can actually fly to from Perth (PER) today, ranked by typical economy round-trip price. Data pulled live from Google Travel Explore and refreshed every 24 hours. Use the filters below to narrow by month, budget, trip length, or non-stop only."
    />
  );
}
