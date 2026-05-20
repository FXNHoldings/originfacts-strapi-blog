'use client';

import { useEffect, useState } from 'react';

const SHOW_THRESHOLD = 400;

const SOCIALS: { label: string; href: string; icon: 'facebook' | 'x' }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/originfacts/', icon: 'facebook' },
  { label: 'X / Twitter', href: 'https://x.com/realoriginfacts', icon: 'x' },
];

export default function FixedSocialFollow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      data-testid="fixed-social-follow"
      className={`fixed bottom-[30px] right-[50px] z-40 hidden flex-col items-center gap-2 transition-opacity duration-300 lg:flex ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* "FOLLOW" pill — dark capsule with vertical text */}
      <div className="flex h-[100px] w-[44px] items-center justify-center rounded-full bg-forest-950 shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
        <span
          className="font-urbanist text-[11px] font-bold uppercase tracking-[0.25em] text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]"
        >
          Follow
        </span>
      </div>

      {/* Social icons pill — white capsule, icons stacked vertically */}
      <ul className="flex w-[44px] flex-col items-center gap-5 rounded-full bg-white py-5 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-5 w-5 items-center justify-center text-forest-950 transition hover:text-primary-emphasis"
            >
              <SocialIcon name={s.icon} />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function SocialIcon({ name }: { name: 'facebook' | 'x' }) {
  const cls = 'h-[18px] w-[18px] fill-current';
  switch (name) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.78v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.1c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.76 8.52-4.92 8.52-9.94z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.255 2.25h6.83l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}
