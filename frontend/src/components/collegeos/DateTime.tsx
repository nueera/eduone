'use client';

import { useEffect, useRef } from 'react';

export default function DateTime() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);

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
        className="text-5xl sm:text-6xl font-light tracking-tight text-foreground"
      />
      <br />
      <span
        ref={dateRef}
        className="text-sm sm:text-base font-medium text-muted-foreground"
      />
    </div>
  );
}
