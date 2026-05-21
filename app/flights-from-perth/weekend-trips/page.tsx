import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Weekend Trips from Perth (3-Day Round-Trip)',
  description: '3-day round-trip destinations from Perth (PER) — short-haul weekend escapes. Refreshed daily from Google Travel Explore.',
  alternates: { canonical: '/flights-from-perth/weekend-trips' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'duration', tripLength: 3, label: 'Weekend (3 days)' }}
      title="Weekend trips from Perth — 3-day round-trips"
      intro="Round-trip destinations from Perth (PER) you can do in three days. Mostly Bali, Singapore, KL, and the closer Asia-Pacific. Pulled live from Google Travel Explore."
    />
  );
}
