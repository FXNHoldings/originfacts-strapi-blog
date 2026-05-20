'use client';

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';
import { mediaUrl, type StrapiArticle } from '@/lib/strapi';

export type SidebarCategoryTile = {
  slug: string;
  name: string;
  count: number;
  image: string | null;
};

export default function BlogSidebar({
  popularPosts = [],
  recentPosts = [],
  categoryTiles = [],
  backToTopHref,
}: {
  popularPosts?: StrapiArticle[];
  recentPosts?: StrapiArticle[];
  categoryTiles?: SidebarCategoryTile[];
  backToTopHref?: string;
}) {
  const [tab, setTab] = useState<'popular' | 'recent'>('popular');
  const activePosts = (tab === 'popular' ? popularPosts : recentPosts).slice(0, 5);

  return (
    <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start" data-testid="blog-sidebar">
      <div>
        <div className="inline-flex border border-forest-900/10 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setTab('popular')}
            aria-pressed={tab === 'popular'}
            className={
              'px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ' +
              (tab === 'popular' ? 'bg-forest-900 text-white' : 'text-forest-900/60 hover:text-forest-900')
            }
          >
            Popular
          </button>
          <button
            type="button"
            onClick={() => setTab('recent')}
            aria-pressed={tab === 'recent'}
            className={
              'rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ' +
              (tab === 'recent' ? 'bg-forest-900 text-white' : 'text-forest-900/60 hover:text-forest-900')
            }
          >
            Recent
          </button>
        </div>
        {activePosts.length > 0 && (
          <ul
            className="mt-5 divide-y divide-forest-900/10"
            data-testid={`blog-sidebar-${tab}-list`}
          >
            {activePosts.map((post) => (
              <li key={post.id} className="py-3 first:pt-0 last:pb-0">
                <SidebarPostRow article={post} />
              </li>
            ))}
          </ul>
        )}
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

      {categoryTiles.length > 0 && (
        <div data-testid="blog-sidebar-categories">
          <h3 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-forest-900">
            Categories
            <span aria-hidden className="h-px w-10 bg-forest-900/20" />
          </h3>
          <ul className="mt-4 space-y-3">
            {categoryTiles.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/category/${t.slug}`}
                  className="group relative block h-16 overflow-hidden rounded bg-forest-900"
                >
                  {t.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/55" />
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="font-urbanist text-sm font-bold uppercase tracking-wider text-white">
                      {t.name}
                    </span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-xs font-bold text-white backdrop-blur">
                      {t.count}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

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

      {backToTopHref && (
        <Link
          href={backToTopHref}
          className="hidden text-[10px] font-semibold uppercase tracking-widest text-forest-900/30 hover:text-primary-emphasis"
          aria-hidden
        >
          ↑ back to top
        </Link>
      )}
    </aside>
  );
}

function SidebarPostRow({ article }: { article: StrapiArticle }) {
  const img = mediaUrl(article.coverImage ?? null);
  const dateStr = article.publishedAt ? format(new Date(article.publishedAt), 'd MMM yyyy') : '';

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3"
    >
      <div className="overflow-hidden rounded bg-forest-900/5">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={article.coverImage?.alternativeText || article.title}
            className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="aspect-square bg-gradient-to-br from-primary-hover to-primary-pressed" />
        )}
      </div>
      <div className="min-w-0">
        <h4 className="line-clamp-2 font-urbanist text-sm font-bold leading-snug text-forest-950 transition group-hover:text-primary-emphasis">
          {article.title}
        </h4>
        {dateStr && (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-forest-900/55">
            {dateStr}
          </p>
        )}
      </div>
    </Link>
  );
}
