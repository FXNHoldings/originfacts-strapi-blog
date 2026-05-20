'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_ORIGIN } from '@/lib/flights-data';

export type Origin = { name: string; iata: string };

const CACHE_KEY = 'originfacts.visitor-origin.v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CachedOrigin = { origin: Origin; decidedAt: number };

function readCache(): Origin | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedOrigin;
    if (Date.now() - parsed.decidedAt > CACHE_TTL_MS) return null;
    if (!parsed.origin?.iata) return null;
    return parsed.origin;
  } catch {
    return null;
  }
}

function writeCache(origin: Origin) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ origin, decidedAt: Date.now() } satisfies CachedOrigin),
    );
  } catch {
    /* private mode / storage off — silent */
  }
}

// Module-level promise memo so concurrent callers (e.g. both blocks
// mounting at once) share the same ipapi → /api/nearest-airport
// roundtrip instead of each firing their own.
let inflight: Promise<Origin | null> | null = null;

export function resolveVisitorOrigin(): Promise<Origin | null> {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const geoRes = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
      if (!geoRes.ok) return null;
      const geo = (await geoRes.json()) as
        | { latitude?: number; longitude?: number; city?: string; error?: boolean }
        | null;
      if (
        !geo ||
        geo.error ||
        typeof geo.latitude !== 'number' ||
        typeof geo.longitude !== 'number'
      ) {
        return null;
      }
      const airRes = await fetch(`/api/nearest-airport?lat=${geo.latitude}&lon=${geo.longitude}`);
      if (!airRes.ok) return null;
      const airport = (await airRes.json()) as
        | { iata?: string; city?: string | null; name?: string }
        | null;
      if (!airport?.iata) return null;
      const origin: Origin = {
        iata: airport.iata,
        name: airport.city || airport.name || geo.city || airport.iata,
      };
      writeCache(origin);
      return origin;
    } catch {
      return null;
    } finally {
      // allow a future revalidation in the same session if needed
      inflight = null;
    }
  })();
  return inflight;
}

export function useVisitorOrigin(): Origin {
  const [origin, setOrigin] = useState<Origin>(() => readCache() ?? FALLBACK_ORIGIN);
  const [resolved, setResolved] = useState<boolean>(() => readCache() !== null);

  useEffect(() => {
    if (resolved) return;
    let cancelled = false;
    resolveVisitorOrigin().then((o) => {
      if (cancelled || !o) return;
      setOrigin(o);
      setResolved(true);
    });
    return () => {
      cancelled = true;
    };
  }, [resolved]);

  return origin;
}
