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
