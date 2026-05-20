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
