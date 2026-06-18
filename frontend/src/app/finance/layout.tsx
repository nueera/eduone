'use client';

import { type ReactNode } from 'react';
import { DollarSign, BarChart3, Receipt, Wallet, CreditCard, TrendingUp } from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/finance' },
  { id: 'fee-collection', label: 'Fee Collection', icon: Receipt, path: '/finance/fee-collection' },
  { id: 'payroll', label: 'Payroll', icon: Wallet, path: '/finance/payroll' },
  { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/finance/transactions' },
  { id: 'budget', label: 'Budget', icon: TrendingUp, path: '/finance/budget' },
];

const MODULE_COLOR = '#22C55E';
const MODULE_NAME = 'Finance';

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar
          items={SIDEBAR_ITEMS}
          moduleColor={MODULE_COLOR}
          moduleName={MODULE_NAME}
          moduleIcon={DollarSign}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ModuleTopbar moduleName={MODULE_NAME} moduleColor={MODULE_COLOR} />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </ModuleErrorBoundary>
  );
}
