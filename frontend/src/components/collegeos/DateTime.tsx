'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function DateTime() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      if (timeRef.current) {
        timeRef.current.textContent = now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      }
      if (dateRef.current) {
        dateRef.current.textContent = now.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center select-none">
      <span
        ref={timeRef}
        className="text-5xl sm:text-6xl font-light tracking-tight"
        style={{
          color: resolvedTheme === 'dark' ? 'oklch(0.95 0 0)' : 'oklch(0.15 0 0)',
        }}
      />
      <br />
      <span
        ref={dateRef}
        className="text-sm sm:text-base font-medium opacity-60"
        style={{
          color: resolvedTheme === 'dark' ? 'oklch(0.8 0 0)' : 'oklch(0.4 0 0)',
        }}
      />
    </div>
  );
}
