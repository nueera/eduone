'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkspaceDockItem {
  id: string;
  moduleId: string;
  label: string;
  pinned: boolean;
}

interface WorkspaceState {
  dockItems: WorkspaceDockItem[];
  addDockItem: (item: WorkspaceDockItem) => void;
  removeDockItem: (id: string) => void;
  togglePin: (id: string) => void;
}

const DEFAULT_DOCK_ITEMS: WorkspaceDockItem[] = [
  { id: 'admission', moduleId: 'admission', label: 'Admission CRM', pinned: true },
  { id: 'academics', moduleId: 'academics', label: 'Academic Ops', pinned: true },
  { id: 'examination', moduleId: 'examination', label: 'Examination', pinned: true },
  { id: 'campus', moduleId: 'campus', label: 'Campus Ops', pinned: true },
  { id: 'finance', moduleId: 'finance', label: 'Finance', pinned: true },
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      dockItems: DEFAULT_DOCK_ITEMS,
      addDockItem: (item) =>
        set((s) => {
          if (s.dockItems.find((d) => d.moduleId === item.moduleId)) return s;
          return { dockItems: [...s.dockItems, item] };
        }),
      removeDockItem: (id) =>
        set((s) => ({
          dockItems: s.dockItems.filter((d) => d.id !== id),
        })),
      togglePin: (id) =>
        set((s) => ({
          dockItems: s.dockItems.map((d) =>
            d.id === id ? { ...d, pinned: !d.pinned } : d
          ),
        })),
    }),
    { name: 'collegeos-workspace' }
  )
);
