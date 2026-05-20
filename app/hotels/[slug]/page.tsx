import { redirect } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export default async function HotelsSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/destinations/${slug}`);
}
