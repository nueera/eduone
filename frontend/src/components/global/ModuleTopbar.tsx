'use client';

import { useTheme } from 'next-themes';
import { Bell, Search, Sun, Moon, Command } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

interface ModuleTopbarProps {
  moduleName: string;
  moduleColor: string;
}

export function ModuleTopbar({ moduleName, moduleColor }: ModuleTopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { toggleCommandPalette } = useAppStore();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-surface-topbar/80 backdrop-blur-md">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-foreground">{moduleName}</h2>
        <div
          className="h-1 w-8 rounded-full"
          style={{ backgroundColor: moduleColor }}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-muted px-1 text-[9px] font-medium">
            ⌘K
          </kbd>
        </button>

        <button className="relative w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-accent transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: moduleColor }}
          />
        </button>

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-accent transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
