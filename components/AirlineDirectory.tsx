'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mediaUrl, type StrapiAirline, type AirlineRegion, type AirlineType } from '@/lib/strapi';

const REGION_ORDER: AirlineRegion[] = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
const TYPE_OPTIONS: AirlineType[] = ['Scheduled', 'Low-cost', 'Regional', 'Charter', 'Cargo'];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PER_REGION_LIMIT = 9;
const POPULAR_LIMIT = 20;
const POPULAR_SLIDE_MS = 2200;

// Curated list of well-known international carriers, ordered by global
// recognition. Matched against airline.iataCode case-insensitively — entries
// not in the dataset are silently skipped.
const POPULAR_IATA = [
  'QF', 'JQ', 'VA', 'TR', 'AA', 'EK', 'UA', 'SQ', 'BA', 'AF',
  'LH', 'KL', 'CX', 'QR', 'EY', 'TK', 'NH', 'JL', 'AC', 'DL',
  'NZ', 'EI', 'IB', 'AY', 'OS', 'LX',
];

function firstLetterBucket(name: string): string {
  const first = (name ?? '').trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}

export default function AirlineDirectory({ airlines }: { airlines: StrapiAirline[] }) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<AirlineType | null>(null);
  const [activeRegion, setActiveRegion] = useState<AirlineRegion | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Set<AirlineRegion>>(new Set());

  const toggleRegion = (r: AirlineRegion) =>
    setExpandedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r); else next.add(r);
      return next;
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return airlines.filter((a) => {
      if (activeType && a.type !== activeType) return false;
      if (activeRegion && a.region !== activeRegion) return false;
      if (activeLetter && firstLetterBucket(a.name) !== activeLetter) return false;
      if (!q) return true;
      const hay = [a.name, a.iataCode, a.icaoCode, a.country, a.city, a.legalName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [airlines, query, activeType, activeRegion, activeLetter]);

  // Which letters actually have airlines in the (base) dataset — used to grey out unused ones.
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const a of airlines) set.add(firstLetterBucket(a.name));
    return set;
  }, [airlines]);

  const byRegion = useMemo(() => {
    const map = new Map<AirlineRegion, StrapiAirline[]>();
    for (const a of filtered) {
      const r = (a.region || 'Asia') as AirlineRegion;
      if (!map.has(r)) map.set(r, []);
      map.get(r)!.push(a);
    }
    return map;
  }, [filtered]);

  const countryCount = useMemo(
    () => new Set(airlines.map((a) => a.country).filter(Boolean)).size,
    [airlines],
  );
  const regionCount = useMemo(
    () => new Set(airlines.map((a) => a.region).filter(Boolean)).size,
    [airlines],
  );

  const orderedRegions = REGION_ORDER.filter((r) => byRegion.has(r));

  return (
    <div className="mt-10">
      {/* Stat strip */}
      <div className="grid gap-6 rounded-[0.3rem] border border-forest-900/10 bg-forest-900/[0.02] p-6 sm:grid-cols-3">
        <Stat label="Airlines" value={airlines.length.toString()} />
        <Stat label="Countries" value={countryCount.toString()} />
        <Stat label="Regions" value={regionCount.toString()} />
      </div>

      {/* Search + filters */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr,auto]">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, IATA code (e.g. SQ), country…"
          className="w-full rounded-[0.3rem] border border-forest-900/15 bg-paper px-4 py-3 font-sans text-base text-ink placeholder:text-forest-900/40 focus:border-terracotta-800 focus:outline-none focus:ring-2 focus:ring-forest-800/20"
          data-testid="airline-search"
        />
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="All types"
            active={activeType === null}
            onClick={() => setActiveType(null)}
          />
          {TYPE_OPTIONS.map((t) => (
            <FilterChip
              key={t}
              label={t}
              active={activeType === t}
              onClick={() => setActiveType(activeType === t ? null : t)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-forest-900/50">Region:</span>
        <FilterChip
          label="All"
          active={activeRegion === null}
          onClick={() => setActiveRegion(null)}
        />
        {REGION_ORDER.map((r) => (
          <FilterChip
            key={r}
            label={r}
            active={activeRegion === r}
            onClick={() => setActiveRegion(activeRegion === r ? null : r)}
          />
        ))}
      </div>

      {/* A-Z letter filter */}
      <div className="mt-4 flex flex-wrap items-center gap-1">
        <span className="mr-2 text-xs uppercase tracking-widest text-forest-900/50">Letter:</span>
        <LetterChip
          label="All"
          active={activeLetter === null}
          onClick={() => setActiveLetter(null)}
        />
        {LETTERS.map((L) => (
          <LetterChip
            key={L}
            label={L}
            active={activeLetter === L}
            disabled={!availableLetters.has(L)}
            onClick={() => setActiveLetter(activeLetter === L ? null : L)}
          />
        ))}
        {availableLetters.has('#') && (
          <LetterChip
            label="#"
            active={activeLetter === '#'}
            onClick={() => setActiveLetter(activeLetter === '#' ? null : '#')}
          />
        )}
      </div>

      {/* Popular airlines (auto-sliding strip) */}
      <PopularAirlinesStrip airlines={airlines} />

      {/* Results */}
      <div className="mt-10 grid gap-12 lg:grid-cols-[180px,1fr]">
        {/* Sticky region nav (desktop) */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 text-xs uppercase tracking-widest text-forest-900/50">Jump to</p>
            {orderedRegions.map((r) => (
              <a
                key={r}
                href={`#region-${r.replace(/\s+/g, '-').toLowerCase()}`}
                className="block rounded-[0.3rem] px-3 py-2 text-sm text-forest-900/80 transition hover:bg-forest-900/5 hover:text-forest-900"
              >
                {r}
                <span className="ml-2 text-xs text-forest-900/40">{byRegion.get(r)?.length ?? 0}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="min-w-0">
          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-forest-900/60" data-testid="airlines-empty">
              No airlines match that search. Try clearing a filter.
            </p>
          ) : (
            orderedRegions.map((r) => {
              const regionList = byRegion.get(r)!;
              const isExpanded = expandedRegions.has(r);
              const displayed = isExpanded ? regionList : regionList.slice(0, PER_REGION_LIMIT);
              const overflow = regionList.length - PER_REGION_LIMIT;
              return (
                <section
                  key={r}
                  id={`region-${r.replace(/\s+/g, '-').toLowerCase()}`}
                  className="mb-16 scroll-mt-24"
                  data-testid={`region-${r.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <header className="flex items-baseline justify-between border-b border-forest-900/10 pb-3">
                    <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">{r}</h2>
                    <span className="text-sm font-light text-forest-900/50">
                      {regionList.length} airline{regionList.length === 1 ? '' : 's'}
                      {overflow > 0 && !isExpanded && (
                        <span className="ml-2 text-forest-900/40">· showing {PER_REGION_LIMIT}</span>
                      )}
                    </span>
                  </header>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {displayed.map((a) => <AirlineCard key={a.id} airline={a} />)}
                  </div>
                  {overflow > 0 && (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => toggleRegion(r)}
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-2 rounded-full border border-forest-900/20 px-5 py-2 font-urbanist text-sm font-bold text-forest-900 transition hover:border-forest-900 hover:bg-forest-900 hover:text-sand-100"
                        data-testid={`region-toggle-${r.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {isExpanded
                          ? `Show less`
                          : `View all ${regionList.length} airlines in ${r}`}
                        <span aria-hidden>{isExpanded ? '↑' : '→'}</span>
                      </button>
                    </div>
                  )}
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-urbanist text-3xl font-bold text-forest-900">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-forest-900/60">{label}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider transition ' +
        (active
          ? 'border-forest-900 bg-forest-900 text-sand-100'
          : 'border-forest-900/20 text-forest-900/80 hover:border-forest-900/40 hover:bg-forest-900/5')
      }
    >
      {label}
    </button>
  );
}

function LetterChip({
  label,
  active,
  disabled = false,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={
        'inline-flex h-8 min-w-[2rem] items-center justify-center rounded-[0.3rem] border px-2 font-mono text-xs font-bold tracking-wider transition ' +
        (active
          ? 'border-forest-900 bg-forest-900 text-sand-100'
          : disabled
            ? 'cursor-not-allowed border-forest-900/10 text-forest-900/20'
            : 'border-forest-900/20 text-forest-900/80 hover:border-forest-900/40 hover:bg-forest-900/5')
      }
      data-testid={`letter-${label}`}
    >
      {label}
    </button>
  );
}

function AirlineCard({ airline }: { airline: StrapiAirline }) {
  const logo = mediaUrl(airline.logo ?? null);
  return (
    <Link
      href={`/airlines/${airline.slug}`}
      className="group flex items-center gap-4 rounded-[0.3rem] border border-forest-900/10 bg-[#f7f8fa] p-4 transition hover:-translate-y-0.5 hover:border-forest-900/30 hover:shadow-sm"
      data-testid={`airline-card-${airline.slug}`}
    >
      <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-[0.3rem] bg-forest-900/5">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={airline.name} className="h-full w-full object-contain" />
        ) : (
          <span className="font-urbanist text-sm font-bold text-forest-900/60">
            {(airline.iataCode || airline.name).slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate font-urbanist text-base font-bold text-forest-900 group-hover:text-forest-700">
            {airline.name}
          </div>
          {airline.iataCode && (
            <span className="flex-none rounded-[0.3rem] bg-forest-900 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-sand-100">
              {airline.iataCode}
            </span>
          )}
        </div>
        <div className="mt-1 truncate text-xs text-forest-900/60">
          {[airline.country, airline.city].filter(Boolean).join(' · ')}
          {airline.type && <span className="ml-2 text-forest-900/40">· {airline.type}</span>}
        </div>
      </div>
    </Link>
  );
}

function PopularAirlinesStrip({ airlines }: { airlines: StrapiAirline[] }) {
  // Build IATA → airline lookup, then walk POPULAR_IATA in order so the
  // strip mirrors the curated ranking. Drop carriers we don't have data for.
  const popular = useMemo(() => {
    const byIata = new Map<string, StrapiAirline>();
    for (const a of airlines) {
      if (a.iataCode) byIata.set(a.iataCode.toUpperCase(), a);
    }
    const out: StrapiAirline[] = [];
    for (const code of POPULAR_IATA) {
      const a = byIata.get(code);
      if (a) out.push(a);
      if (out.length >= POPULAR_LIMIT) break;
    }
    return out;
  }, [airlines]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstItem = track.firstElementChild as HTMLElement | null;
    if (!firstItem) return;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const stride = firstItem.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    let next = track.scrollLeft + stride;
    if (next >= maxScroll - 2) next = 0;
    track.scrollTo({ left: next, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused || popular.length <= 1) return;
    const id = window.setInterval(step, POPULAR_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, popular.length, step]);

  if (popular.length === 0) return null;

  return (
    <section className="mt-12" data-testid="popular-airlines">
      <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">Popular airlines</h2>
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="mt-5 flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {popular.map((a) => (
          <PopularAirlineCard key={a.id} airline={a} />
        ))}
      </div>
    </section>
  );
}

function PopularAirlineCard({ airline }: { airline: StrapiAirline }) {
  const logo = mediaUrl(airline.logo ?? null);
  return (
    <Link
      href={`/airlines/${airline.slug}`}
      className="snap-start group flex h-[78px] w-[200px] shrink-0 items-center gap-3 rounded-[4px] border border-forest-900/10 bg-[#f7f8fa] px-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition hover:border-forest-900/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
      data-testid={`popular-airline-${airline.slug}`}
    >
      <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-md bg-white">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={airline.name} className="h-full w-full object-contain" />
        ) : (
          <span className="font-urbanist text-xs font-bold text-forest-900/60">
            {(airline.iataCode || airline.name).slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 font-urbanist text-sm font-bold leading-tight text-forest-950 group-hover:text-primary-emphasis">
          {airline.name}
        </p>
      </div>
    </Link>
  );
}
