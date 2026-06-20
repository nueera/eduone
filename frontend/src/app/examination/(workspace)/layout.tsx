'use client';

import { type ReactNode } from 'react';
import {
  FileCheck,
  BarChart3,
  LayoutGrid,
  FileOutput,
  ScanLine,
  MonitorSmartphone,
  Sigma,
  FolderCog,
  LifeBuoy,
  UserCheck,
  Wand2,
  type LucideIcon,
} from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { EXAMINATION_SUBMODULES } from '@/lib/examination-modules';

/**
 * Examination workspace layout
 * ----------------------------
 * Sidebar + topbar chrome for everything under /examination/<sub>.
 * The launcher at /examination is full-screen and bypasses this layout.
 *
 * Sidebar items are derived from the central EXAMINATION_SUBMODULES
 * catalog so adding a new sub-module only needs an edit in
 * `src/lib/examination-modules.ts`.
 *
 * The module color is referenced via the global `--module-examination`
 * CSS variable, not a hardcoded hex — the chrome is theme-aware for free.
 */

// Map sub-module id → sidebar icon. Centralized here so the launcher
// tile icons (defined in examination-modules.ts) and the sidebar icons
// can diverge if needed (e.g. a sub-module wants a different glyph at
// small sizes).
const SUBMODULE_ICONS: Record<string, LucideIcon> = {
  qpd: FileOutput,
  osm: ScanLine,
  oes: MonitorSmartphone,
  rps: Sigma,
  qpm: FolderCog,
  rrs: LifeBuoy,
  ses: UserCheck,
  qpg: Wand2,
};

const MODULE_NAME = 'Examination';
const MODULE_COLOR = 'var(--module-examination)';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', label: 'Module Overview', icon: LayoutGrid, path: '/examination' },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/examination/dashboard' },
  ...EXAMINATION_SUBMODULES.map((m) => ({
    id: m.id,
    label: m.code,
    icon: SUBMODULE_ICONS[m.id] ?? FileCheck,
    path: `/examination/${m.id}`,
  })),
];

export default function ExaminationWorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ModuleSidebar
        items={SIDEBAR_ITEMS}
        moduleColor={MODULE_COLOR}
        moduleName={MODULE_NAME}
        moduleIcon={FileCheck}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ModuleTopbar moduleName={MODULE_NAME} moduleColor={MODULE_COLOR} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
