import { notFound } from 'next/navigation';
import {
  getCategory,
  listArticles,
  listDestinationArticles,
  listSidebarArticles,
  listSidebarCategoryTiles,
} from '@/lib/strapi';
import { SECTIONS, findSection } from '@/lib/sections';
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

  const [
    { data: articles, meta },
    sidebar,
    categoryTiles,
  ] = await Promise.all([
    (slug === 'destinations'
      ? listDestinationArticles({ pageSize: initialPageSize })
      : listArticles({ category: slug, pageSize: initialPageSize })
    ).catch(() => ({
      data: [] as Awaited<ReturnType<typeof listArticles>>['data'],
      meta: { pagination: { page: 1, pageSize: initialPageSize, pageCount: 0, total: 0 } },
    })),
    listSidebarArticles(5).catch(() => ({ recent: [], popular: [] })),
    listSidebarCategoryTiles(
      SECTIONS.filter((s) => s.slug !== 'destinations').map((s) => s.slug),
    ).catch(() => []),
  ]);

  const heroArticles = articles.slice(0, HERO_COUNT);
  const listArticlesInitial = articles.slice(HERO_COUNT);
  const totalLoaded = articles.length;
  const totalAvailable = meta?.pagination?.total ?? totalLoaded;
  const hasMore = totalAvailable > totalLoaded;

  return (
    <div data-testid={`category-page-${slug}`}>
      <div className="mx-auto max-w-7xl px-6 pt-16">
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
          <div className="mt-10">
            <CategoryHero articles={heroArticles} />
          </div>
        )}
      </div>

      {articles.length > 0 && (listArticlesInitial.length > 0 || hasMore) && (
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <CategoryArticleList
            initialArticles={listArticlesInitial}
            categorySlug={slug}
            initialPage={2}
            pageSize={LIST_PAGE_SIZE}
            hasMore={hasMore}
            popularPosts={sidebar.popular}
            recentPosts={sidebar.recent}
            categoryTiles={categoryTiles}
          />
        </div>
      )}

      {articles.length === 0 && <div className="pb-16" />}
    </div>
  );
}
