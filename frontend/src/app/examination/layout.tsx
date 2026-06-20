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
 */
const MODULE_COLOR = '#A855F7';
const MODULE_NAME = 'Examination';

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
