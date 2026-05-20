import { NextResponse } from 'next/server';
import { listAirports, type StrapiAirport } from '@/lib/strapi';
import { haversineKm } from '@/lib/geo';

type CommercialAirport = Required<Pick<StrapiAirport, 'iata' | 'name' | 'latitude' | 'longitude'>> &
  Pick<StrapiAirport, 'city' | 'country' | 'countryCode'>;

let cache: { airports: CommercialAirport[]; loadedAt: number } | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

async function getAirportsCached(): Promise<CommercialAirport[]> {
  if (cache && Date.now() - cache.loadedAt < CACHE_TTL_MS) return cache.airports;
  const all = await listAirports();
  const filtered: CommercialAirport[] = [];
  for (const a of all) {
    if (
      typeof a.iata === 'string' &&
      a.iata.length === 3 &&
      typeof a.latitude === 'number' &&
      typeof a.longitude === 'number' &&
      Number.isFinite(a.latitude) &&
      Number.isFinite(a.longitude)
    ) {
      filtered.push({
        iata: a.iata,
        name: a.name,
        latitude: a.latitude,
        longitude: a.longitude,
        city: a.city,
        country: a.country,
        countryCode: a.countryCode,
      });
    }
  }
  cache = { airports: filtered, loadedAt: Date.now() };
  return filtered;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = Number(url.searchParams.get('lat'));
  const lon = Number(url.searchParams.get('lon'));
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: 'lat and lon query params required' }, { status: 400 });
  }

  const airports = await getAirportsCached();
  let best: CommercialAirport | null = null;
  let bestDist = Infinity;
  for (const a of airports) {
    const d = haversineKm(lat, lon, a.latitude, a.longitude);
    if (d < bestDist) {
      bestDist = d;
      best = a;
    }
  }

  if (!best) return NextResponse.json({ error: 'no airport found' }, { status: 404 });

  return NextResponse.json(
    {
      iata: best.iata,
      name: best.name,
      city: best.city ?? null,
      country: best.country ?? null,
      countryCode: best.countryCode ?? null,
      distanceKm: Math.round(bestDist),
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } },
  );
}
