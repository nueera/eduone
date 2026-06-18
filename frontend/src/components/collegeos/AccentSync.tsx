'use client';

import { useAppStore } from '@/stores/useAppStore';
import { useEffect } from 'react';

export function AccentSync() {
  const { accentColor } = useAppStore();

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', `oklch(0.7 0.15 ${accentColor.oklchHue})`);
    document.documentElement.style.setProperty('--accent-foreground', 'oklch(1 0 0)');
    document.documentElement.style.setProperty('--ring', `oklch(0.6 0.15 ${accentColor.oklchHue})`);
  }, [accentColor]);

  return null;
}

export function ThemePresetSync() {
  return null;
}
