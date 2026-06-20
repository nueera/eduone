'use client';

import { useEffect } from 'react';

/**
 * Examination error fallback.
 * All accent styling flows through the global `--module-examination`
 * CSS variable and the `.accent-*` utility classes — no hardcoded hex.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 noise-overlay"
      style={{ ['--panel-accent' as string]: 'var(--module-examination)' }}
    >
      {/* Icon chip — global .accent-chip utility */}
      <div className="accent-chip w-16 h-16 rounded-2xl flex items-center justify-center">
        <span className="text-2xl accent-text">!</span>
      </div>
      <h2 className="text-lg font-semibold text-foreground">Examination — Error</h2>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="accent-cta px-4 py-2 rounded-lg text-sm font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
