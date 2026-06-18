'use client';

import { useAppStore } from '@/stores/useAppStore';
import { useEffect, useRef, useState } from 'react';

export function useStoreHydrated() {
  const store = useAppStore();
  const [hydrated, setHydrated] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && store) {
      initialized.current = true;
      const id = requestAnimationFrame(() => setHydrated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [store]);

  return hydrated;
}
