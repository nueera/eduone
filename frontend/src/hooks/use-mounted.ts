'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  const init = useCallback(() => {
    if (!initialized.current) {
      initialized.current = true;
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(init);
    return () => cancelAnimationFrame(id);
  }, [init]);

  return mounted;
}
