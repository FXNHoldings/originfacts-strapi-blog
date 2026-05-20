'use client';

import { useState } from 'react';

const PREVIEW_WORDS = 15;

export default function CategoryDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(/\s+/).filter(Boolean);
  const isTruncatable = words.length > PREVIEW_WORDS;
  const preview = isTruncatable ? words.slice(0, PREVIEW_WORDS).join(' ') : text;

  return (
    <p className="mt-5 text-[1rem] text-ink/75" data-testid="category-description">
      {expanded || !isTruncatable ? text : `${preview}… `}
      {isTruncatable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 inline text-[15px] font-semibold text-primary-emphasis underline underline-offset-2 hover:no-underline"
          aria-expanded={expanded}
          data-testid="category-description-read-more"
        >
          {expanded ? 'Show less' : 'Read More'}
        </button>
      )}
    </p>
  );
}
