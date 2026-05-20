import Link from 'next/link';
import { mediaUrl, type StrapiArticle } from '@/lib/strapi';

type Size = 'lead' | 'side';

function Tile({ article, size }: { article: StrapiArticle; size: Size }) {
  const img = mediaUrl(article.coverImage ?? null);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group relative block overflow-hidden rounded ${
        size === 'lead'
          ? 'aspect-[5/6] sm:aspect-[5/4] lg:aspect-auto lg:h-full'
          : 'aspect-[4/3]'
      } bg-forest-900/10`}
      data-testid={`category-hero-${size}-${article.slug}`}
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={article.coverImage?.alternativeText || article.title}
          loading={size === 'lead' ? 'eager' : 'lazy'}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950" />
      )}

      {/* Dark layer over the whole image + a stronger gradient at the bottom for title legibility */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col text-white ${
          size === 'lead' ? 'p-6 sm:p-8' : 'p-4 sm:p-5'
        }`}
      >
        <h3
          className={`font-bold leading-tight !text-white drop-shadow-sm transition group-hover:!text-white/90 ${
            size === 'lead' ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'
          }`}
        >
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

export default function CategoryHero({ articles }: { articles: StrapiArticle[] }) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const sides = rest.slice(0, 4);

  return (
    <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
      <Tile article={lead} size="lead" />
      <div className={`grid gap-4 ${sides.length > 0 ? 'sm:grid-cols-2' : ''}`}>
        {sides.map((a) => (
          <Tile key={a.id} article={a} size="side" />
        ))}
      </div>
    </div>
  );
}
