'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { mediaUrl, type StrapiArticle } from '@/lib/strapi';

function dateParts(iso?: string) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return {
      day: format(d, 'dd'),
      monthYear: `${format(d, 'MMM').toUpperCase()} — ${format(d, 'yyyy')}`,
    };
  } catch {
    return null;
  }
}

function Row({ article }: { article: StrapiArticle }) {
  const img = mediaUrl(article.coverImage ?? null);
  const eyebrow = (article.category?.name ?? '').toUpperCase();
  const dp = dateParts(article.publishedAt);

  return (
    <article
      className="grid grid-cols-[80px_minmax(0,1fr)_140px] items-start gap-5 border-b border-forest-900/10 py-7 sm:grid-cols-[96px_minmax(0,1fr)_160px] sm:gap-6"
      data-testid={`category-row-${article.slug}`}
    >
      <div className="border-l-2 border-primary-emphasis/40 pl-3 sm:pl-4">
        <div className="font-urbanist text-3xl font-bold leading-none text-primary-emphasis sm:text-4xl">
          {dp?.day ?? '--'}
        </div>
        <div className="mt-2 text-[10px] font-semibold tracking-widest text-forest-900/60">
          {dp?.monthYear ?? ''}
        </div>
      </div>

      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-900/55">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2">
          <Link
            href={`/articles/${article.slug}`}
            className="editorial-h text-lg font-bold leading-snug text-forest-900 transition hover:text-primary-emphasis sm:text-xl"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">
            {article.excerpt}
          </p>
        )}
        <Link
          href={`/articles/${article.slug}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-forest-900/15 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest-900 transition hover:border-primary-emphasis hover:text-primary-emphasis"
        >
          Read more
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest-900 text-white transition group-hover:bg-primary-emphasis">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </Link>
      </div>

      <Link
        href={`/articles/${article.slug}`}
        className="block overflow-hidden rounded bg-forest-900/5"
        aria-hidden
        tabIndex={-1}
      >
        <div className="aspect-square w-full">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="size-full bg-gradient-to-br from-forest-100 to-forest-200" />
          )}
        </div>
      </Link>
    </article>
  );
}

function Sidebar({ categorySlug }: { categorySlug: string }) {
  return (
    <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start" data-testid="category-sidebar">
      <div className="inline-flex rounded-full border border-forest-900/10 bg-white p-1 shadow-sm">
        <span className="rounded-full bg-forest-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
          Popular
        </span>
        <span className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-forest-900/60">
          Recent
        </span>
      </div>

      <div>
        <h3 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-forest-900">
          Join Us
          <span aria-hidden className="h-px w-10 bg-forest-900/20" />
        </h3>
        <ul className="mt-4 space-y-2.5">
          <li>
            <a
              href="https://www.facebook.com/originfacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.78v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.1c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.76 8.52-4.92 8.52-9.94z" />
                </svg>
                Facebook
              </span>
              <span className="text-xs font-semibold opacity-90">Follow</span>
            </a>
          </li>
          <li>
            <a
              href="https://x.com/realoriginfacts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.255 2.25h6.83l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X / Twitter
              </span>
              <span className="text-xs font-semibold opacity-90">Follow</span>
            </a>
          </li>
          <li>
            <a
              href="/feed.xml"
              className="flex items-center justify-between rounded bg-[#ee802f] px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M4.252 11.105a8.643 8.643 0 0 1 8.643 8.643h-2.882a5.761 5.761 0 0 0-5.761-5.761zM4.252 5.343A14.404 14.404 0 0 1 18.657 19.748h-2.882A11.523 11.523 0 0 0 4.252 8.225zM6.413 16.146a2.16 2.16 0 1 1-4.321 0 2.16 2.16 0 0 1 4.321 0z" />
                </svg>
                RSS Feed
              </span>
              <span className="text-xs font-semibold opacity-90">Subscribe</span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-forest-900">
          Deal of the Month
          <span aria-hidden className="h-px w-10 bg-forest-900/20" />
        </h3>
        <Link
          href="/flight-search"
          className="mt-4 block overflow-hidden rounded border border-forest-900/10 bg-white shadow-sm transition hover:border-primary-emphasis hover:shadow-md"
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-sand-100 via-secondary to-primary-hover" />
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-emphasis">
              Cheap Flights
            </p>
            <p className="mt-2 text-base font-bold text-forest-900">
              Compare every airline. In one search.
            </p>
            <p className="mt-2 text-xs text-ink/70">
              Live fares from hundreds of carriers and OTAs, ranked by total price.
            </p>
          </div>
        </Link>
      </div>

      <Link
        href={`/category/${categorySlug}`}
        className="hidden text-[10px] font-semibold uppercase tracking-widest text-forest-900/30 hover:text-primary-emphasis"
        aria-hidden
      >
        ↑ back to top
      </Link>
    </aside>
  );
}

export default function CategoryArticleList({
  initialArticles,
  categorySlug,
  initialPage,
  pageSize,
  hasMore: initialHasMore,
}: {
  initialArticles: StrapiArticle[];
  categorySlug: string;
  initialPage: number;
  pageSize: number;
  hasMore: boolean;
}) {
  const [articles, setArticles] = useState<StrapiArticle[]>(initialArticles);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const next = page + 1;
      const res = await fetch(
        `/api/category-articles?slug=${encodeURIComponent(categorySlug)}&page=${next}&pageSize=${pageSize}`,
      );
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const json = (await res.json()) as {
        data: StrapiArticle[];
        pagination: { page: number; pageCount: number };
      };
      setArticles((prev) => {
        const seen = new Set(prev.map((a) => a.id));
        return [...prev, ...json.data.filter((a) => !seen.has(a.id))];
      });
      setPage(next);
      setHasMore(json.pagination.page < json.pagination.pageCount);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, hasMore, loading, page, pageSize]);

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (articles.length === 0) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
      <div>
        <div className="border-t border-forest-900/10">
          {articles.map((a) => (
            <Row key={a.id} article={a} />
          ))}
        </div>
        {hasMore && (
          <div
            ref={sentinelRef}
            className="flex items-center justify-center py-10 text-[11px] font-semibold uppercase tracking-widest text-forest-900/50"
            data-testid="category-load-more-sentinel"
            aria-live="polite"
          >
            {loading ? 'Loading more stories…' : 'Scroll for more'}
          </div>
        )}
      </div>
      <Sidebar categorySlug={categorySlug} />
    </div>
  );
}
