'use client';

import { useState } from 'react';

type Props = {
  /** Raw about text. Paragraphs separated by blank lines (`\n\n`). */
  text: string;
  /** Word count at which the teaser is truncated. Default 25. */
  wordLimit?: number;
};

/**
 * Same UX as ExpandableDescription but preserves paragraph breaks when
 * expanded. Used on the route detail page where `route.about` contains
 * multiple paragraphs separated by blank lines.
 */
export default function ExpandableAbout({ text, wordLimit = 25 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const words = text.trim().split(/\s+/);
  const isLong = words.length > wordLimit;
  const paragraphs = text.split(/\n{2,}/);

  // Short enough to show in full — no toggle needed.
  if (!isLong) {
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </>
    );
  }

  if (expanded) {
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="ml-1 inline cursor-pointer text-base font-normal text-primary-emphasis underline underline-offset-2 hover:no-underline"
            data-testid="expandable-about-toggle"
            aria-expanded
          >
            Read Less
          </button>
        </p>
      </>
    );
  }

  const teaser = words.slice(0, wordLimit).join(' ');
  const remainder = words.slice(wordLimit).join(' ');

  return (
    <p data-testid="expandable-about">
      {`${teaser}… `}
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="ml-1 inline cursor-pointer text-base font-normal text-primary-emphasis underline underline-offset-2 hover:no-underline"
        data-testid="expandable-about-toggle"
        aria-expanded={false}
      >
        Read More
      </button>
      {/* Keep the rest of the prose in the DOM (visually hidden) so SEO and
          copy-paste still see the full text. */}
      <span className="sr-only">{` ${remainder}`}</span>
    </p>
  );
}
