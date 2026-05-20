'use client';

import { useState } from 'react';

export default function CategoryDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-5 text-[1rem] text-ink/75" data-testid="category-description">
      <p
        className={expanded ? '' : 'line-clamp-2'}
        style={expanded ? undefined : { WebkitLineClamp: 2 }}
      >
        {text}
      </p>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-1 text-[1rem] font-semibold text-[rgb(1,79,211)] hover:underline"
          data-testid="category-description-read-more"
        >
          Read More
        </button>
      )}
    </div>
  );
}
