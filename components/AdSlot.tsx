'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '@/lib/adsense';

type Props = {
  slot: string;
  format?: string;
  responsive?: boolean;
  label?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  label = true,
  className,
  style,
}: Props) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      /* loader not ready yet — AdSense will retry once script is parsed */
    }
  }, []);

  if (!ADSENSE_ENABLED) return null;

  return (
    <div className={className} data-testid="ad-slot">
      {label && (
        <p className="mb-2 text-[10px] uppercase tracking-widest text-forest-900/40">
          Advertisement
        </p>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
