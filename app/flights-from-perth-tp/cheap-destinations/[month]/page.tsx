import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PerthExplorePage, { ALL_MONTH_SLUGS } from '@/components/PerthExplorePage';

export const revalidate = 3600;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type Props = { params: Promise<{ month: string }> };

export function generateStaticParams() {
  return ALL_MONTH_SLUGS.map((month) => ({ month }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  const idx = ALL_MONTH_SLUGS.indexOf(month.toLowerCase());
  if (idx === -1) return { title: 'Month not found' };
  const label = MONTH_NAMES[idx];
  return {
    title: `Cheap Flights from Perth in ${label} (TP)`,
    description: `Cheapest destinations from Perth (PER) departing in ${label}, via TravelPayouts.`,
    alternates: { canonical: `/flights-from-perth-tp/cheap-destinations/${month.toLowerCase()}` },
  };
}

export default async function Page({ params }: Props) {
  const { month } = await params;
  const idx = ALL_MONTH_SLUGS.indexOf(month.toLowerCase());
  if (idx === -1) notFound();
  const label = MONTH_NAMES[idx];
  return (
    <PerthExplorePage
      source="travelpayouts"
      variant={{ kind: 'month', monthIndex: idx + 1, monthLabel: label }}
      title={`Cheap flights from Perth departing in ${label}`}
      intro={`Cached TravelPayouts fares from Perth (PER) where the outbound flight departs in ${label}. The list may be short — TP only caches around 30 destinations per origin and not every month has live data — but every fare here funnels through your affiliate marker on click.`}
    />
  );
}
