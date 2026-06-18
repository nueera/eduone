'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#3B82F6' + '18' }}>
        <span className="text-2xl" style={{ color: '#3B82F6' }}>!</span>
      </div>
      <h2 className="text-lg font-semibold text-foreground">Academic Operations — Error</h2>
      <p className="text-sm text-muted-foreground max-w-md text-center">Something went wrong. Please try again.</p>
      <button onClick={() => reset()} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#3B82F6' }}>
        Try Again
      </button>
    </div>
  );
}
