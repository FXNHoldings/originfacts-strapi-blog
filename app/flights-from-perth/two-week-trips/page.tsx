import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Two-Week Trips from Perth (14-Day Round-Trip)',
  description: '14-day round-trip destinations from Perth (PER) — long-haul holiday-length stays. Refreshed daily from Google Travel Explore.',
  alternates: { canonical: '/flights-from-perth/two-week-trips' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'duration', tripLength: 14, label: 'Two weeks' }}
      title="Two-week trips from Perth — 14-day round-trips"
      intro="Round-trip destinations from Perth (PER) priced for the typical two-week holiday window. Europe, the Americas, and longer-haul Asian destinations open up at this length. Refreshed every 24 hours from Google Travel Explore."
    />
  );
}
