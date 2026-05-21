import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flights from Perth — Cheap Destinations Explorer',
  description: 'Where can you fly from Perth? Cheapest destinations, monthly views, budget tiers, weekend trips, and non-stop only — refreshed daily.',
  alternates: { canonical: '/flights-from-perth' },
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function PerthExploreIndex() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16" data-testid="perth-explore-index">
      <header>
        <p className="text-xs uppercase tracking-widest text-forest-900/55">Flights from Perth (PER)</p>
        <h1 className="editorial-h mt-2 text-3xl font-bold text-forest-900 sm:text-4xl">
          Where can I fly from Perth?
        </h1>
        <p className="mt-3 max-w-3xl text-base text-forest-900/75">
          Live cheap-fare data from Google Travel Explore, sliced however you want to plan. All
          pages refresh every 24 hours. Click any tile to see real prices, dates, and a deep link
          straight into Google Flights for booking.
        </p>
      </header>

      <Section title="Browse by category" testid="category-tiles">
        <Tile href="/flights-from-perth/cheap-destinations" label="Top 20 cheapest now" />
        <Tile href="/flights-from-perth/non-stop" label="Non-stop only" />
        <Tile href="/flights-from-perth/under-800" label="Under $800" />
        <Tile href="/flights-from-perth/under-1500" label="Under $1,500" />
        <Tile href="/flights-from-perth/weekend-trips" label="Weekend trips" />
        <Tile href="/flights-from-perth/two-week-trips" label="Two-week trips" />
      </Section>

      <Section title="Browse by month" testid="month-tiles">
        {MONTHS.map((m) => (
          <Tile
            key={m}
            href={`/flights-from-perth/cheap-destinations/${m.toLowerCase()}`}
            label={m}
          />
        ))}
      </Section>

      <footer className="mt-12 border-t border-forest-900/10 pt-6 text-xs text-forest-900/55">
        Data pulled from Google Travel Explore via SerpAPI. One API call per page; results cached
        for 24 hours. Add <code className="font-mono">SERPAPI_API_KEY</code> to{' '}
        <code className="font-mono">.env.local</code> to enable live fare data.
      </footer>
    </main>
  );
}

function Section({
  title,
  testid,
  children,
}: {
  title: string;
  testid: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10" data-testid={testid}>
      <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </section>
  );
}

function Tile({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-[0.3rem] border border-forest-900/10 bg-forest-900/[0.02] px-4 py-3 font-urbanist text-base font-bold text-forest-900 transition hover:-translate-y-0.5 hover:border-forest-900/30 hover:bg-paper"
    >
      <span className="group-hover:text-forest-700">{label}</span>
      <span aria-hidden className="text-forest-900/40 group-hover:text-forest-700">→</span>
    </Link>
  );
}
