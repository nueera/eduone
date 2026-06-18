'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/useAppStore';

export function KeyboardShortcutProvider({ children }: { children: ReactNode }) {
  const toggleCommandPalette = useAppStore((s) => s.toggleCommandPalette);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette]);

  // Track active module
  const pathname = usePathname();
  useEffect(() => {
    const activeModule = pathname.split('/')[1] || null;
    useAppStore.setState({ activeModule: activeModule });
  }, [pathname]);

  return <>{children}</>;
}
