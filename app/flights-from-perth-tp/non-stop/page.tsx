import type { Metadata } from 'next';
import PerthExplorePage from '@/components/PerthExplorePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Non-Stop Flights from Perth — TravelPayouts',
  description: 'Direct, non-stop destinations from Perth (PER) — no layovers. Via TravelPayouts.',
  alternates: { canonical: '/flights-from-perth-tp/non-stop' },
};

export default function Page() {
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'non-stop' }}
      title="Non-stop flights from Perth"
      intro="Direct destinations from Perth (PER) — no layovers — pulled from TravelPayouts' fare cache. Perth's catchment is geographically isolated so the non-stop set is small, but every fare here is a true point-to-point flight."
    />
  );
}
