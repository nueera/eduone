'use client';

import { type ReactNode } from 'react';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

/**
 * Root Examination layout — intentionally lightweight.
 *
 * The launcher page at `/examination` renders full-screen (Windows 8
 * style tile grid), so it must NOT be wrapped by a sidebar/topbar.
 * Sub-routes that need the workspace chrome live under the
 * `(workspace)` route group and get their own layout with
 * ModuleSidebar + ModuleTopbar.
 *
 * The module color is referenced via the global `--module-examination`
 * CSS variable (defined in globals.css), not a hardcoded hex. This
 * keeps the layout theme-aware (light/dark) for free.
 */
const MODULE_NAME = 'Examination';
const MODULE_COLOR = 'var(--module-examination)';

export default function ExaminationRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      {children}
    </ModuleErrorBoundary>
  );
}
