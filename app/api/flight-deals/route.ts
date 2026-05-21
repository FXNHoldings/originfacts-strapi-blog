import { NextResponse } from 'next/server';

const TP_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
const TP_BASE = 'https://api.travelpayouts.com';

export const revalidate = 1800;

type CheapPriceRow = {
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at?: string;
  expires_at: string;
};

type CheapPriceResponse = {
  success: boolean;
  data: Record<string, Record<string, CheapPriceRow>>;
  error?: string | null;
};

export type FlightDeal = {
  origin: string;
  destination: string;
  price: number;
  currency: string;
  airline: string;
  departureAt: string;
  returnAt?: string;
};

export async function GET(req: Request) {
  if (!TP_TOKEN) {
    return NextResponse.json({ error: 'TRAVELPAYOUTS_API_TOKEN not set' }, { status: 500 });
  }
  const url = new URL(req.url);
  const origin = (url.searchParams.get('origin') || '').toUpperCase();
  const destination = (url.searchParams.get('destination') || '-').toUpperCase();
  const currency = (url.searchParams.get('currency') || 'usd').toLowerCase();
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 4), 1), 10);

  if (!/^[A-Z]{3}$/.test(origin)) {
    return NextResponse.json({ error: 'origin must be a 3-letter IATA' }, { status: 400 });
  }

  const tpQs = new URLSearchParams({
    origin,
    destination,
    currency,
    token: TP_TOKEN,
  });

  let json: CheapPriceResponse;
  try {
    const res = await fetch(`${TP_BASE}/v1/prices/cheap?${tpQs.toString()}`, {
      headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Travelpayouts ${res.status}` }, { status: 502 });
    }
    json = (await res.json()) as CheapPriceResponse;
  } catch (e) {
    return NextResponse.json({ error: 'Travelpayouts fetch failed' }, { status: 502 });
  }

  if (!json.success || !json.data) {
    return NextResponse.json({ deals: [], currency }, {
      headers: { 'Cache-Control': 'public, max-age=600, s-maxage=1800' },
    });
  }

  const deals: FlightDeal[] = [];
  for (const [destIata, byNumber] of Object.entries(json.data)) {
    const rows = Object.values(byNumber);
    if (rows.length === 0) continue;
    const best = rows.reduce((a, b) => (b.price < a.price ? b : a));
    deals.push({
      origin,
      destination: destIata,
      price: best.price,
      currency,
      airline: best.airline,
      departureAt: best.departure_at,
      returnAt: best.return_at,
    });
  }
  deals.sort((a, b) => a.price - b.price);

  return NextResponse.json(
    { deals: deals.slice(0, limit), currency },
    { headers: { 'Cache-Control': 'public, max-age=600, s-maxage=1800' } },
  );
}
