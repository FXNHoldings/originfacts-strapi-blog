import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Originfacts',
  description:
    'Get in touch about Originfacts — support, privacy, cookies, accessibility, affiliate enquiries, or user content complaints.',
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-7xl px-6 py-16" data-testid="contact-page">
      <header className="max-w-3xl">
        <h1 className="editorial-h text-3xl font-bold leading-tight text-forest-900 sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 text-lg font-light text-forest-900/75">
          We&apos;re here to help with questions about Originfacts, our website content, affiliate
          links, user content, privacy, accessibility, and general support.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        {/* Left — contact info */}
        <aside className="space-y-10">
          <div>
            <h2 className="editorial-h text-sm uppercase tracking-widest text-forest-800/70">
              Email
            </h2>
            <a
              href="mailto:contact@originfacts.com"
              className="mt-2 block font-urbanist text-xl font-bold text-forest-900 hover:text-forest-700"
            >
              contact@originfacts.com
            </a>
            <p className="mt-2 text-sm font-light text-forest-900/70">
              We aim to review messages within a reasonable time.
            </p>
          </div>

          <div>
            <h2 className="editorial-h text-sm uppercase tracking-widest text-forest-800/70">
              Mailing Address
            </h2>
            <address className="mt-2 text-base not-italic leading-relaxed text-forest-900">
              FXN HOLDINGS LIMITED
              <br />
              61 Bridge Street
              <br />
              Kington, HR5 3DJ
              <br />
              United Kingdom
            </address>
          </div>

          <div>
            <h2 className="editorial-h text-sm uppercase tracking-widest text-forest-800/70">
              Follow Us
            </h2>
            <ul className="mt-3 flex items-center gap-3" aria-label="Originfacts on social media">
              <li>
                <a
                  href="https://x.com/realoriginfacts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Originfacts on X"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/20 text-forest-900 transition hover:border-primary-emphasis hover:text-primary-emphasis"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.255 2.25h6.83l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/originfacts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Originfacts on Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/20 text-forest-900 transition hover:border-primary-emphasis hover:text-primary-emphasis"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.78v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.1c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.76 8.52-4.92 8.52-9.94z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  aria-label="Originfacts RSS feed"
                  title="RSS feed"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/20 text-forest-900 transition hover:border-primary-emphasis hover:text-primary-emphasis"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M4.252 11.105a8.643 8.643 0 0 1 8.643 8.643h-2.882a5.761 5.761 0 0 0-5.761-5.761zM4.252 5.343A14.404 14.404 0 0 1 18.657 19.748h-2.882A11.523 11.523 0 0 0 4.252 8.225zM6.413 16.146a2.16 2.16 0 1 1-4.321 0 2.16 2.16 0 0 1 4.321 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-forest-900/10 bg-forest-50 p-5 text-sm leading-relaxed text-forest-900/80">
            <strong className="font-semibold text-forest-900">Booking issues?</strong> Originfacts
            does not handle bookings, payments, or refunds. If your question is about a ticket,
            hotel, rental, or tour, contact the provider you booked with directly.
          </div>
        </aside>

        {/* Right — form (Client Component) */}
        <ContactForm />
      </div>
    </article>
  );
}
