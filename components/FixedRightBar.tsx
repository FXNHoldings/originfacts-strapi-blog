import Link from 'next/link';

type BarItem = {
  label: string;
  href?: string;
  icon: 'user' | 'menu' | 'search' | 'lightning' | 'cart';
  count?: number;
};

const ITEMS: BarItem[] = [
  { label: 'Contact', href: '/contact', icon: 'user' },
  { label: 'Sitemap', href: '/sitemap', icon: 'menu' },
  { label: 'Search', href: '/articles', icon: 'search' },
  { label: 'Trending', href: '/articles', icon: 'lightning' },
  { label: 'Flights', href: '/flight-search', icon: 'cart', count: 0 },
];

export default function FixedRightBar() {
  return (
    <div
      className="pointer-events-none fixed right-6 top-[200px] z-40 hidden lg:block"
      data-testid="fixed-right-bar"
    >
      <ul className="pointer-events-auto flex flex-col items-center gap-[10px]">
        {ITEMS.map((item) => (
          <li key={item.label} className="group relative">
            <Link
              href={item.href ?? '#'}
              aria-label={item.label}
              className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white text-forest-900 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition hover:text-primary-emphasis"
            >
              <BarIcon name={item.icon} />
              {typeof item.count === 'number' && (
                <span
                  className="absolute -top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-emphasis text-[11px] font-bold text-forest-900"
                  aria-hidden
                >
                  {item.count}
                </span>
              )}
            </Link>
            {/* Hover tooltip — left of icon */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-full top-1/2 mr-5 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 font-urbanist text-[11px] font-bold uppercase tracking-wider text-forest-900 opacity-0 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition group-hover:translate-x-0 group-hover:opacity-100"
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarIcon({ name }: { name: BarItem['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-[18px] w-[18px]',
    'aria-hidden': true,
  };
  switch (name) {
    case 'user':
      return (
        <svg {...common}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case 'lightning':
      return (
        <svg {...common}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'cart':
      return (
        <svg {...common}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      );
  }
}
