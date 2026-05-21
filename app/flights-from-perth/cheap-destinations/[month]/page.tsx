import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PerthExplorePage, { ALL_MONTH_SLUGS } from '@/components/PerthExplorePage';

export const revalidate = 86400;

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
    title: `Cheap Flights from Perth in ${label}`,
    description: `Live cheapest destinations from Perth (PER) in ${label}, refreshed daily from Google Travel Explore.`,
    alternates: { canonical: `/flights-from-perth/cheap-destinations/${month.toLowerCase()}` },
  };
}

export default async function Page({ params }: Props) {
  const { month } = await params;
  const idx = ALL_MONTH_SLUGS.indexOf(month.toLowerCase());
  if (idx === -1) notFound();
  const label = MONTH_NAMES[idx];
  const monthIndex = idx + 1;
  return (
    <PerthExplorePage
      variant={{ kind: 'month', monthIndex, monthLabel: label }}
      title={`Cheap flights from Perth in ${label}`}
      intro={`The 20 cheapest places you can fly to from Perth (PER) in ${label}, ranked by typical economy round-trip price. Pulled live from Google Travel Explore for departures around mid-${label} and a one-week return.`}
    />
  );
}
