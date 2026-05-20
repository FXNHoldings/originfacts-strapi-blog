'use client';

import { useState } from 'react';

const PREVIEW_WORDS = 15;

export default function SectionDescription({
  text,
  testId,
}: {
  text: string;
  testId?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(/\s+/).filter(Boolean);
  const isTruncatable = words.length > PREVIEW_WORDS;
  const preview = isTruncatable ? words.slice(0, PREVIEW_WORDS).join(' ') : text;

  return (
    <p
      className="mt-4 text-sm leading-6 text-ink/75 sm:text-base"
      data-testid={testId}
    >
      {expanded || !isTruncatable ? text : `${preview}… `}
      {isTruncatable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 inline text-[15px] font-semibold text-primary-emphasis underline underline-offset-2 hover:no-underline"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read More'}
        </button>
      )}
    </p>
  );
}
