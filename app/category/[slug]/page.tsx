import { notFound } from 'next/navigation';
import { getCategory, listArticles, listDestinationArticles } from '@/lib/strapi';
import { findSection } from '@/lib/sections';
import CategoryHero from '@/components/CategoryHero';
import CategoryArticleList from '@/components/CategoryArticleList';
import CategoryDescription from '@/components/CategoryDescription';
import type { Metadata } from 'next';

export const revalidate = 60;

const HERO_COUNT = 5;
const LIST_PAGE_SIZE = 5;

type Props = { params: Promise<{ slug: string }> };

async function resolveCategory(slug: string) {
  const strapi = await getCategory(slug).catch(() => null);
  if (strapi) {
    return {
      name: strapi.name,
      description: strapi.description ?? findSection(slug)?.description,
      tagline: findSection(slug)?.tagline,
      fromStrapi: true as const,
    };
  }
  const section = findSection(slug);
  if (section) {
    return {
      name: section.title,
      description: section.description,
      tagline: section.tagline,
      fromStrapi: false as const,
    };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await resolveCategory(slug);
  if (!c) return { title: 'Not found' };
  return {
    title: c.name,
    description: c.description,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await resolveCategory(slug);
  if (!category) notFound();

  const initialPageSize = HERO_COUNT + LIST_PAGE_SIZE;

  const { data: articles, meta } = await (slug === 'destinations'
    ? listDestinationArticles({ pageSize: initialPageSize })
    : listArticles({ category: slug, pageSize: initialPageSize })
  ).catch(
    () => ({
      data: [],
      meta: { pagination: { page: 1, pageSize: initialPageSize, pageCount: 0, total: 0 } },
    }),
  );

  const heroArticles = articles.slice(0, HERO_COUNT);
  const listArticlesInitial = articles.slice(HERO_COUNT);
  const totalLoaded = articles.length;
  const totalAvailable = meta?.pagination?.total ?? totalLoaded;
  const hasMore = totalAvailable > totalLoaded;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid={`category-page-${slug}`}>
      <header>
        <h1 className="editorial-h text-3xl font-bold text-forest-900">{category.name}</h1>
        {category.tagline && (
          <p className="font-urbanist mt-4 text-sm uppercase tracking-wider text-forest-900/60">{category.tagline}</p>
        )}
        {category.description && (
          <CategoryDescription text={category.description} />
        )}
      </header>

      {articles.length === 0 ? (
        <p className="mt-20 text-center text-forest-900/60" data-testid="category-empty">
          No articles in this category yet. Check back soon.
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
                categorySlug={slug}
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
