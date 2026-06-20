'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  UserPlus,
  BookOpen,
  FileCheck,
  Building2,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { EXAMINATION_SUBMODULES } from '@/lib/examination-modules';

const commands = [
  { id: 'admission', label: 'Go to Admission CRM', icon: UserPlus, path: '/admission' },
  { id: 'academics', label: 'Go to Academic Ops', icon: BookOpen, path: '/academics' },
  { id: 'examination', label: 'Go to Examination', icon: FileCheck, path: '/examination' },
  { id: 'campus', label: 'Go to Campus Ops', icon: Building2, path: '/campus' },
  { id: 'finance', label: 'Go to Finance', icon: DollarSign, path: '/finance' },
  { id: 'analytics', label: 'Go to Analytics', icon: BarChart3, path: '/' },
  { id: 'notifications', label: 'View Notifications', icon: Bell, path: '/' },
  { id: 'settings', label: 'Open Settings', icon: Settings, path: '/' },
  // Examination sub-modules — auto-derived so the palette never drifts
  // from the launcher grid.
  ...EXAMINATION_SUBMODULES.map((m) => ({
    id: `examination-${m.id}`,
    label: `${m.code} \u2014 ${m.name}`,
    icon: m.icon,
    path: `/examination/${m.id}`,
  })),
];

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, searchQuery, setSearchQuery } = useAppStore();
  const router = useRouter();

  const filtered = searchQuery
    ? commands.filter((c) => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : commands;

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
      setCommandPaletteOpen(false);
      setSearchQuery('');
    },
    [router, setCommandPaletteOpen, setSearchQuery]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  placeholder="Search modules, actions..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd.path)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
                        'hover:bg-accent transition-colors duration-150',
                        'text-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{cmd.label}</span>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
