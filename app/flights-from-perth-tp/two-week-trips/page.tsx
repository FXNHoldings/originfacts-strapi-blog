import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Two-Week Trips from Perth — TravelPayouts',
  description: '14-day round-trip destinations from Perth (PER) via TravelPayouts.',
  alternates: { canonical: '/flights-from-perth-tp/two-week-trips' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'duration', tripLength: 14, label: 'Two weeks' }}
      title="Two-week trips from Perth — 14-day round-trips"
      intro="TravelPayouts fares from Perth (PER) where the cached itinerary is around 14 days — typical holiday-length stays. The list opens up to Hong Kong, Vietnam, Sri Lanka, and the longer-haul Asian destinations at this duration."
    />
  );
}
