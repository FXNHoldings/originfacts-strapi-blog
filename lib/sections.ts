/**
 * Canonical list of the 6 main site sections shown on the homepage AND used
 * as a fallback by /category/[slug] when a matching Strapi Category record
 * doesn't exist yet.
 *
 * Keep slugs in sync with the Strapi Category collection.
 */
export type SectionLayout = 'atlas' | 'departure' | 'wirecutter' | 'directory' | 'masonry' | 'grid';

export type Section = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  layout: SectionLayout;
};

export const SECTIONS: Section[] = [
  {
    slug: 'destinations',
    title: 'Destinations',
    tagline: 'Places that change you',
    description:
      'Field-tested guides to cities, regions, and out-of-the-way corners worth the flight — the kind of places that earn a second visit. Expect honest takes on when to go, where to stay, what to eat, and which experiences are worth your time versus the ones that exist purely for the photo. Every guide is built on first-hand reporting, paired with the practical logistics you actually need: airport transfers, neighborhood breakdowns, daily budgets, and the small-print quirks of each country that catch first-timers off guard.',
    layout: 'atlas',
  },
  {
    slug: 'flights',
    title: 'Flights',
    tagline: 'Pay less, fly more',
    description:
      'Everything we know about paying less for a seat in the air — from the search habits that surface the cheapest fares to the routing tricks (mixed cabins, hidden-city, error fares, positioning flights) that move the price needle. We track booking windows by route, compare metasearch tools head-to-head, and break down loyalty programs in plain English so you know which points are worth chasing and which are a distraction. Whether you fly twice a year or twenty times, the playbooks here pay back the time you spend reading them.',
    layout: 'departure',
  },
  {
    slug: 'hotels',
    title: 'Hotels',
    tagline: 'Beds worth booking twice',
    description:
      'Honest, walked-the-halls reviews of hotels we actually slept in — boutique finds, design-led independents, the dependable city standbys, and the rare resort worth the splurge. Beyond the reviews we dig into the booking craft: how to stack OTA rebates with hotel loyalty status, when status matching is worth the email, which credit-card free-night certs deliver the best per-dollar value, and how to spot resort-fee inflation before it shows up at check-out. Boring fluff promised nowhere here.',
    layout: 'wirecutter',
  },
  {
    slug: 'car-rental',
    title: 'Car Rental',
    tagline: 'Wheels without the markup',
    description:
      'Renting a car has more landmines than booking a flight: airport surcharges, fuel policies that punish honesty, "free upgrades" that aren\'t, and damage claims that can outlive the trip itself. This section pulls apart the daily-rate game on the routes most travelers actually take — Mediterranean coastlines, US road trips, New Zealand loops — and explains exactly which insurance you need, which agencies still respect a reservation, and the off-airport pickup pattern that quietly knocks 30%+ off the bill. Everything written from a driver\'s seat, not a press release.',
    layout: 'wirecutter',
  },
  {
    slug: 'travel-tips',
    title: 'Travel Tips',
    tagline: 'Shortcuts from the road',
    description:
      'The small moves that make travel dramatically easier — packing systems that actually compress, gear that justifies the carry-on space, the airport routines that save hours, and the practical habits that head off the kind of trouble a Google search can\'t fix once it\'s started. Less Instagram-grid advice, more "here\'s what to do when your phone dies in a foreign taxi" — written for people who already travel and want to do it with less friction. New tips dropped weekly, the evergreen ones reviewed twice a year so nothing here is silently out of date.',
    layout: 'masonry',
  },
];

export function findSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}
