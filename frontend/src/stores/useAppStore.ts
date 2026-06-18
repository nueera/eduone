'use client';

import { create } from 'zustand';

export interface AccentColor {
  name: string;
  hex: string;
  oklchHue: number;
}

export const MODULE_ACCENTS: Record<string, AccentColor> = {
  admission: { name: 'Admission', hex: '#F97316', oklchHue: 25 },
  academics: { name: 'Academics', hex: '#3B82F6', oklchHue: 250 },
  examination: { name: 'Examination', hex: '#A855F7', oklchHue: 300 },
  campus: { name: 'Campus', hex: '#10B981', oklchHue: 160 },
  finance: { name: 'Finance', hex: '#22C55E', oklchHue: 145 },
};

export const DEFAULT_ACCENT: AccentColor = MODULE_ACCENTS.admission;

interface AppState {
  accentColor: AccentColor;
  activeModule: string | null;
  searchQuery: string;
  isFullscreen: boolean;
  commandPaletteOpen: boolean;
  setAccentColor: (color: AccentColor) => void;
  setActiveModule: (module: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleFullscreen: () => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  accentColor: DEFAULT_ACCENT,
  activeModule: null,
  searchQuery: '',
  isFullscreen: false,
  commandPaletteOpen: false,
  setAccentColor: (color) => set({ accentColor: color }),
  setActiveModule: (module) => set({ activeModule: module }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
