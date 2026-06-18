'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Command,
} from 'lucide-react';
import Background from '@/components/collegeos/Background';
import TileGrid from '@/components/collegeos/TileGrid';
import DateTime from '@/components/collegeos/DateTime';
import CommandPalette from '@/components/collegeos/CommandPalette';
import AccentPicker from '@/components/collegeos/AccentPicker';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

const statusItems = [
  { label: 'API Gateway', status: 'operational', color: '#10B981' },
  { label: 'Database', status: 'operational', color: '#10B981' },
  { label: 'Auth Service', status: 'operational', color: '#10B981' },
  { label: 'CDN', status: 'degraded', color: '#EAB308' },
];

export default function Home() {
  const { toggleCommandPalette } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">C</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground tracking-tight">CollegeOS</h1>
            <p className="text-[10px] text-muted-foreground">Campus Management Platform</p>
          </div>
        </motion.div>

        {/* Right controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <AccentPicker />

          <button
            onClick={toggleCommandPalette}
            className="glass rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-muted px-1 text-[9px] font-medium">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </motion.div>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-4 pb-24">
        <DateTime />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <TileGrid />
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>

      <CommandPalette />
    </div>
  );
}
