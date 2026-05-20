import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur"
      data-testid="site-header"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-[0.8rem]">
        <Link href="/" className="block shrink-0" data-testid="logo-link" aria-label="Originfacts home">
          <Image
            src="/brand/logo/logo.svg"
            alt="Originfacts"
            width={300}
            height={167}
            priority
            className="h-[3rem] w-auto"
          />
        </Link>

        <form
          action="/articles"
          method="get"
          role="search"
          className="hidden md:flex h-10 w-full max-w-md flex-1 items-center gap-2 rounded-[4px] border border-forest-900/15 bg-white px-4 transition focus-within:border-primary-emphasis"
          data-testid="header-search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-forest-900/50"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <label htmlFor="header-search-input" className="sr-only">Search stories</label>
          <input
            id="header-search-input"
            type="search"
            name="q"
            placeholder="Search stories…"
            className="h-full w-full bg-transparent text-sm text-forest-900 outline-none placeholder:text-forest-900/45"
            data-testid="header-search-input"
          />
        </form>

        <div className="ml-auto flex items-center justify-end gap-2">
          <nav className="hidden md:block" data-testid="primary-nav">
            <ul className="flex items-center justify-end gap-1 font-urbanist text-[1rem] font-semibold tracking-[0.3px]">
              <li data-testid="nav-item-destinations">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[#000000] transition-colors hover:text-[rgb(1,79,211)]"
                  data-testid="nav-destinations"
                >
                  Destinations
                </Link>
              </li>
              <li data-testid="nav-item-flights">
                <Link
                  href="/flight-search"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[#000000] transition-colors hover:text-[rgb(1,79,211)]"
                  data-testid="nav-flights"
                >
                  Flight Search
                </Link>
              </li>
              <li
                className="group/allarticles relative"
                data-testid="nav-item-articles"
              >
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[#000000] transition-colors hover:text-[rgb(1,79,211)]"
                  data-testid="nav-articles"
                  aria-haspopup="true"
                >
                  Blog
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 opacity-60"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
                <div
                  className="invisible absolute left-0 top-full z-10 pt-1 opacity-0 transition duration-150 group-hover/allarticles:visible group-hover/allarticles:opacity-100 group-focus-within/allarticles:visible group-focus-within/allarticles:opacity-100"
                  data-testid="nav-articles-dropdown"
                >
                  <div
                    role="menu"
                    className="min-w-[220px] rounded-md border border-forest-900/10 bg-paper p-1 shadow-md"
                  >
                    <Link
                      href="/hotels"
                      className="block rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                      role="menuitem"
                      data-testid="nav-articles-hotels"
                    >
                      Hotels
                    </Link>
                    <Link
                      href="/category/car-rentals"
                      className="block rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                      role="menuitem"
                      data-testid="nav-articles-car-rentals"
                    >
                      Car Rentals
                    </Link>
                    <Link
                      href="/category/travel-tips"
                      className="block rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                      role="menuitem"
                      data-testid="nav-articles-travel-tips"
                    >
                      Travel Tips
                    </Link>
                  </div>
                </div>
              </li>
              <li
                className="group/resources relative"
                data-testid="nav-item-resources"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[#000000] transition-colors hover:text-[rgb(1,79,211)]"
                  data-testid="nav-resources"
                  aria-haspopup="true"
                >
                  Resources
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 opacity-60"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="invisible absolute right-0 top-full z-10 pt-1 opacity-0 transition duration-150 group-hover/resources:visible group-hover/resources:opacity-100 group-focus-within/resources:visible group-focus-within/resources:opacity-100"
                  data-testid="nav-resources-dropdown"
                >
                  <div
                    role="menu"
                    className="min-w-[220px] rounded-md border border-forest-900/10 bg-paper p-1 shadow-md"
                  >
                    <Link
                      href="/airlines"
                      className="block rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                      role="menuitem"
                      data-testid="nav-airlines"
                    >
                      Airlines
                    </Link>
                    <div className="group/airports-sub relative">
                      <Link
                        href="/airports"
                        className="flex items-center justify-between rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                        role="menuitem"
                        data-testid="nav-airports-all"
                        aria-haspopup="true"
                      >
                        Airports
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 opacity-60"
                          aria-hidden
                        >
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </Link>
                      <div
                        className="invisible absolute right-full top-0 z-10 pr-1 opacity-0 transition duration-150 group-hover/airports-sub:visible group-hover/airports-sub:opacity-100 group-focus-within/airports-sub:visible group-focus-within/airports-sub:opacity-100"
                        data-testid="nav-airports-submenu"
                      >
                        <div
                          role="menu"
                          className="min-w-[200px] rounded-md border border-forest-900/10 bg-paper p-1 shadow-md"
                        >
                          <Link
                            href="/airports/hubs"
                            className="block rounded px-3 py-2 text-base text-[#000000] transition-colors hover:bg-forest-900/5 hover:text-[rgb(1,79,211)]"
                            role="menuitem"
                            data-testid="nav-airports-hubs"
                          >
                            Top 100 Airports
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}
