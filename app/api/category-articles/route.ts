import { NextResponse } from 'next/server';
import { listArticles, listDestinationArticles } from '@/lib/strapi';

export const revalidate = 60;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') ?? '';
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1);
  const pageSize = Math.min(20, Math.max(1, Number(url.searchParams.get('pageSize') ?? '5') || 5));

  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400 });
  }

  try {
    const res = await (slug === 'destinations'
      ? listDestinationArticles({ page, pageSize })
      : listArticles({ category: slug, pageSize, page }));

    return NextResponse.json({
      data: res.data,
      pagination: res.meta.pagination,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load articles' },
      { status: 500 },
    );
  }
}
