type Props = {
  testId?: string;
  imageSrc?: string;
  imageAspect?: string;
  imageAlt?: string;
};

export default function AdBanner({
  testId = 'ad-banner',
  imageSrc = '/ads/mow-banner.jpg',
  imageAspect = 'aspect-[1600/250]',
  imageAlt = 'Modern blog and magazine theme',
}: Props) {
  return (
    <section className="py-10" data-testid={testId}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-forest-900/50">
          Advertisement
        </p>
        <a
          href="/contact"
          aria-label="Advertise with Originfacts"
          className="mt-3 block overflow-hidden rounded-[0.3rem] bg-gradient-to-br from-[#15172b] via-[#1f2240] to-[#15172b]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`${imageAspect} w-full object-cover`}
          />
        </a>
      </div>
    </section>
  );
}
