import type { Metadata } from 'next';
import { listArticles } from '@/lib/strapi';
import { findSection } from '@/lib/sections';
import CategoryHero from '@/components/CategoryHero';
import CategoryArticleList from '@/components/CategoryArticleList';
import CategoryDescription from '@/components/CategoryDescription';

export const revalidate = 60;

const CATEGORY_SLUG = 'hotels';
const HERO_COUNT = 5;
const LIST_PAGE_SIZE = 5;

const FALLBACK_DESCRIPTION =
  'Honest, walked-the-halls reviews of hotels we actually slept in, plus the booking craft behind getting a better room for less — loyalty status, free-night certificates, resort-fee traps, and the OTA rebates worth stacking.';

export const metadata: Metadata = {
  title: 'Hotels',
  description: FALLBACK_DESCRIPTION,
  alternates: { canonical: '/hotels' },
};

export default async function HotelsPage() {
  const initialPageSize = HERO_COUNT + LIST_PAGE_SIZE;
  const section = findSection(CATEGORY_SLUG);
  const title = section?.title ?? 'Hotels';
  const tagline = section?.tagline;
  const description = section?.description ?? FALLBACK_DESCRIPTION;

  const { data: articles, meta } = await listArticles({
    category: CATEGORY_SLUG,
    pageSize: initialPageSize,
  }).catch(() => ({
    data: [],
    meta: { pagination: { page: 1, pageSize: initialPageSize, pageCount: 0, total: 0 } },
  }));

  const heroArticles = articles.slice(0, HERO_COUNT);
  const listArticlesInitial = articles.slice(HERO_COUNT);
  const totalLoaded = articles.length;
  const totalAvailable = meta?.pagination?.total ?? totalLoaded;
  const hasMore = totalAvailable > totalLoaded;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="hotels-page">
      <header>
        <h1 className="editorial-h text-3xl font-bold text-forest-900">{title}</h1>
        {tagline && (
          <p className="font-urbanist mt-4 text-sm uppercase tracking-wider text-forest-900/60">
            {tagline}
          </p>
        )}
        <CategoryDescription text={description} />
      </header>

      {articles.length === 0 ? (
        <p className="mt-20 text-center text-forest-900/60" data-testid="hotels-empty">
          No hotel stories yet. Check back soon.
        </p>
      ) : (
        <>
          <div className="mt-10">
            <CategoryHero articles={heroArticles} />
          </div>

          {(listArticlesInitial.length > 0 || hasMore) && (
            <div className="mt-16">
              <CategoryArticleList
                initialArticles={listArticlesInitial}
                categorySlug={CATEGORY_SLUG}
                initialPage={2}
                pageSize={LIST_PAGE_SIZE}
                hasMore={hasMore}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
