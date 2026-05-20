import Script from 'next/script';
import PopularDestinationsBlock from '@/components/PopularDestinationsBlock';
import { tpwlSearchUrl } from '@/lib/tpwl-link';
import { FALLBACK_ORIGIN } from '@/lib/flights-data';

export const metadata = {
  title: 'Flights',
  description: 'Search hundreds of airlines in one place. Powered by our travel partners.',
};

const BOOKING_FAQ: { q: string; a: string }[] = [
  {
    q: 'How do I find the cheapest flights with Originfacts?',
    a: 'Enter your origin, destination, and dates in the search box above. Originfacts compares fares from hundreds of airlines and online travel agencies through our partner Travelpayouts and surfaces the lowest price for each route — usually within a few seconds. For the absolute cheapest fares, leave the dates flexible and use the calendar view to spot which day of the week is least expensive.',
  },
  {
    q: 'Does Originfacts actually book my flight?',
    a: 'No. Originfacts is a travel blog with a metasearch widget — once you find a fare you like, you complete the booking directly on the airline or OTA website. That means your ticket, payment, and any changes or refunds are handled by them, not us, and you keep any loyalty miles or status credits.',
  },
  {
    q: 'Are the prices I see the same as on the airline’s own website?',
    a: 'In the vast majority of cases, yes — our partner pulls live fares straight from the airlines and OTAs, so the headline price you see is the price you pay before optional extras like seat selection or checked bags. Always confirm the final total on the booking page before paying.',
  },
  {
    q: 'When is the cheapest time to book a flight?',
    a: 'For short-haul, booking 1–3 months ahead usually gets the best fare. For long-haul, 2–6 months ahead is the sweet spot. Tuesday and Wednesday departures tend to be cheaper than Friday and Sunday, and flying outside school holidays makes a much bigger difference than booking time.',
  },
  {
    q: 'Are last-minute flights cheaper?',
    a: 'Rarely. The old "wait until the day before" trick mostly stopped working a decade ago — airlines now use dynamic pricing that raises fares as seats fill up. Last-minute bargains do exist on routes with surplus capacity, but they’re the exception, not the rule.',
  },
  {
    q: 'How can being flexible with my dates save money?',
    a: 'Shifting a return by one or two days can cut the total by 20–40% on popular routes. Use the “whole month” or “cheapest month” view in the search widget above to see prices laid out day-by-day — the cheapest fare is often hiding mid-week, just outside the dates you originally picked.',
  },
  {
    q: 'Why does the price change while I’m searching?',
    a: 'Fares are pulled live every time you load a result, and airlines adjust them constantly based on demand, seat availability, and competitor pricing. If you see a good fare, lock it in — it can move within minutes.',
  },
  {
    q: 'Do you earn a commission when I book through Originfacts?',
    a: 'Yes. Originfacts is an affiliate of Travelpayouts and earns a small commission when you complete a booking via one of our search links — at no extra cost to you. It’s how we keep the blog independently funded and the search free to use. See our Affiliate Disclosure for the full details.',
  },
];

type TravelProCard = { title: string; description: string; image: string; bg: string };

const TRAVEL_PROS: TravelProCard[] = [
  {
    title: 'Plan with AI',
    description: 'Get travel questions answered',
    image: 'https://nxt.deals/images/plan-with-ai.svg',
    bg: 'from-forest-100 to-forest-200',
  },
  {
    title: 'Best Time to Travel',
    description: 'Know when to save',
    image: 'https://nxt.deals/images/best-time.svg',
    bg: 'from-sand-100 to-sand-200',
  },
  {
    title: 'Explore',
    description: 'See destinations on your budget',
    image: 'https://nxt.deals/images/explore.svg',
    bg: 'from-primary-hover to-primary-pressed',
  },
  {
    title: 'Trips',
    description: 'Keep all your plans in one place',
    image: 'https://nxt.deals/images/trips.svg',
    bg: 'from-sand-200 to-sand-300',
  },
];

const DESTINATION_CITIES: { name: string; iata: string }[] = [
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
  { name: 'Ho Chi Minh City', iata: 'SGN' },
];

const ORIGIN_CITIES: { name: string; iata: string }[] = [
  { name: 'London', iata: 'LON' },
  { name: 'New York', iata: 'NYC' },
  { name: 'Sydney', iata: 'SYD' },
  { name: 'Singapore', iata: 'SIN' },
  { name: 'Dubai', iata: 'DXB' },
];

export default function FlightsPage() {
  return (
    <>
      <Script id="tpwl-loader" strategy="afterInteractive">
        {`(function () {
  var script = document.createElement("script");
  script.async = 1;
  script.type = "module";
  script.src = "https://tpscr.com/wl_web/main.js?wl_id=16677";
  document.head.appendChild(script);
})();`}
      </Script>

      <Script id="flight-search-state" strategy="afterInteractive">
        {`(function () {
  function update() {
    var hasParam = new URLSearchParams(window.location.search).has("flightSearch");
    document.documentElement.classList.toggle("flight-search-active", hasParam);
  }
  update();
  window.addEventListener("popstate", update);
  window.addEventListener("urlchange", update);
})();`}
      </Script>

      <div className="mx-auto max-w-7xl px-6 py-16" data-testid="fly-page">
        <header className="max-w-3xl">
          <h1 className="editorial-h text-[2.5rem] font-bold text-forest-900">
            Thousands of cheap flights.
          </h1>
          <p className="mt-[5px] text-lg font-light text-forest-900/70">
            Search hundreds of airlines at once. Results appear below, no page jump.
          </p>
        </header>

        <div className="tpwl-search-wrap mt-10">
          <div id="tpwl-search" />
        </div>

        <div className="mt-12">
          <div id="tpwl-tickets" />
        </div>

        <PopularDestinationsBlock />

        {/* ---------- For travel pros ---------- */}
        <section className="mt-20" data-testid="travel-pros">
          <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">
            For travel pros
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRAVEL_PROS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-900/10 transition-shadow hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-forest-900">{card.title}</h3>
                  <p className="mt-1 text-sm text-primary-emphasis">{card.description}</p>
                </div>
                <div className={`flex h-40 items-center justify-center rounded-xl bg-gradient-to-br ${card.bg}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-auto object-contain p-3"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Search cheap flights by destination ---------- */}
        <section className="mt-20" data-testid="cheap-flights-by-destination">
          <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">
            Search cheap flights by destination
          </h2>
          <p className="mt-1 text-sm font-semibold text-forest-900/80">Find Cheap Flights</p>
          <p className="mt-4 max-w-4xl text-sm text-forest-900/70">
            Compare deals from hundreds of airline sites in one place. Whether you&apos;re booking a
            last-minute getaway or planning ahead, browse popular destinations below to surface the
            best fares for your next trip.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATION_CITIES.map((dest) => {
              const origins = ORIGIN_CITIES.filter((o) => o.iata !== dest.iata).slice(0, 4);
              return (
                <details
                  key={dest.iata}
                  className="group border-b border-forest-900/10"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                    <a
                      href={tpwlSearchUrl(FALLBACK_ORIGIN.iata, dest.iata)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-1 text-sm font-semibold text-forest-900 hover:text-primary-emphasis"
                    >
                      {dest.name} flights
                    </a>
                    <span
                      className="rounded-full p-1.5 text-forest-900/40 transition group-hover:bg-forest-900/5 group-hover:text-primary-emphasis"
                      aria-label={`Show popular routes to ${dest.name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 transition-transform group-open:rotate-180"
                        aria-hidden
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <ul className="space-y-1 pb-4">
                    {origins.map((o) => (
                      <li key={o.iata}>
                        <a
                          href={tpwlSearchUrl(o.iata, dest.iata)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="block py-1 text-sm text-forest-900/70 hover:text-primary-emphasis"
                        >
                          From {o.name} → {dest.name}{' '}
                          <span className="font-mono text-xs text-forest-900/40">
                            {o.iata}–{dest.iata}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </section>

        {/* ---------- Booking flights with Originfacts (FAQ) ---------- */}
        <section className="mt-20" data-testid="booking-faq">
          <h2 className="editorial-h text-[1.5rem] font-bold text-forest-900">
            Booking flights with Originfacts
          </h2>
          <p className="mt-2 max-w-4xl text-sm text-forest-900/70">
            Quick answers to the questions readers ask us most about searching, booking,
            and saving on flights.
          </p>
          <div className="mt-6 grid gap-x-12 sm:grid-cols-1 lg:grid-cols-2">
            {BOOKING_FAQ.map((item) => (
              <details key={item.q} className="group border-b border-forest-900/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-forest-900 transition hover:text-primary-emphasis">
                  <span>{item.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 shrink-0 text-forest-900/40 transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="pb-5 pr-8 text-sm leading-relaxed text-forest-900/75">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
