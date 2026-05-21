import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Non-Stop Flights from Perth',
  description: 'Direct, non-stop destinations from Perth (PER) — no layovers. Refreshed daily from Google Travel Explore.',
  alternates: { canonical: '/flights-from-perth/non-stop' },
};

export default function Page() {
  return (
    <PerthExplorePage
      variant={{ kind: 'non-stop' }}
      title="Non-stop flights from Perth"
      intro="Direct destinations from Perth (PER) — no layovers. The list is shorter than the cheap-and-cheerful one (Perth's catchment is geographically isolated), but every fare here is a true point-to-point flight. Pulled live from Google Travel Explore."
    />
  );
}
