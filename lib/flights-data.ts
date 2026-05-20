export type Destination = {
  name: string;
  iata: string;
  country: string;
  imageUrl: string;
};

export const FALLBACK_ORIGIN = { name: 'London', iata: 'LON' };

export const POPULAR_DESTINATIONS: Destination[] = [
  { name: 'Denpasar', iata: 'DPS', country: 'Indonesia', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop&auto=format' },
  { name: 'Bangkok', iata: 'BKK', country: 'Thailand', imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=500&fit=crop&auto=format' },
  { name: 'Singapore', iata: 'SIN', country: 'Singapore', imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&h=500&fit=crop&auto=format' },
  { name: 'Melbourne', iata: 'MEL', country: 'Australia', imageUrl: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=500&fit=crop&auto=format' },
  { name: 'Sydney', iata: 'SYD', country: 'Australia', imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=500&fit=crop&auto=format' },
  { name: 'Tokyo', iata: 'TYO', country: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop&auto=format' },
  { name: 'Dubai', iata: 'DXB', country: 'United Arab Emirates', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop&auto=format' },
  { name: 'New York', iata: 'NYC', country: 'United States', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop&auto=format' },
  { name: 'Paris', iata: 'PAR', country: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&auto=format' },
];

export const WIDE_DESTINATIONS = new Set(['SIN', 'NYC']);

// Cities offered under "Search cheap flights by destination" (rendered as
// the disclosure rows on /flights). Kept separate from POPULAR_DESTINATIONS
// because this list is text-only and aims for SEO breadth, not visual cards.
export const DESTINATION_CITIES: { name: string; iata: string }[] = [
  { name: 'Melbourne', iata: 'MEL' },
  { name: 'London', iata: 'LON' },
  { name: 'Seoul, South Korea', iata: 'SEL' },
  { name: 'Los Angeles', iata: 'LAX' },
  { name: 'Auckland', iata: 'AKL' },
  { name: 'Cairns', iata: 'CNS' },
  { name: 'Paris', iata: 'PAR' },
  { name: 'New York', iata: 'NYC' },
  { name: 'Sydney', iata: 'SYD' },
  { name: 'Adelaide', iata: 'ADL' },
  { name: 'Brisbane', iata: 'BNE' },
  { name: 'Singapore', iata: 'SIN' },
  { name: 'Berlin', iata: 'BER' },
  { name: 'Bangkok', iata: 'BKK' },
  { name: 'Vancouver', iata: 'YVR' },
  { name: 'Tokyo', iata: 'TYO' },
  { name: 'Kuala Lumpur', iata: 'KUL' },
  { name: 'Dubai', iata: 'DXB' },
  { name: 'Hyderabad', iata: 'HYD' },
  { name: 'Mumbai', iata: 'BOM' },
  { name: 'Denpasar', iata: 'DPS' },
  { name: 'New Delhi', iata: 'DEL' },
  { name: 'Kathmandu', iata: 'KTM' },
  { name: 'Manila', iata: 'MNL' },
];

// Alternate origin cities offered inside each disclosure ("From X → Y"
// rows). Used when comparing fares from major hubs.
export const ORIGIN_CITIES: { name: string; iata: string }[] = [
  { name: 'London', iata: 'LON' },
  { name: 'New York', iata: 'NYC' },
  { name: 'Sydney', iata: 'SYD' },
  { name: 'Singapore', iata: 'SIN' },
  { name: 'Dubai', iata: 'DXB' },
];
