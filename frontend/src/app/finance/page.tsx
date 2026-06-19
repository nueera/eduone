'use client';

import { DollarSign, Receipt, Wallet, TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Panel } from '@/components/ui/panel';
import { ChartTooltip, chartGridProps, chartAxisProps, chartActiveDot, chartGradient } from '@/components/ui/chart-tooltip';

const MODULE_COLOR = '#22C55E';

const heroStat = {
  label: 'Net Surplus',
  value: '₹4.3',
  unit: 'L',
  icon: TrendingUp,
  delta: 18.2,
  deltaLabel: 'vs last month',
  trend: [2.1, 2.6, 3.0, 3.4, 3.8, 4.1, 4.3],
};

const secondaryStats = [
  { label: 'Revenue', value: '₹24.5', unit: 'L', icon: DollarSign, delta: 12, trend: [18, 19, 21, 22, 23, 24.5] },
  { label: 'Pending Fees', value: '₹8.2', unit: 'L', icon: Receipt, delta: -5, deltaDirection: 'up' as const, trend: [9.5, 9.2, 9.0, 8.7, 8.5, 8.2] },
  { label: 'Payroll', value: '₹12.1', unit: 'L', icon: Wallet, delta: 2, trend: [11.5, 11.7, 11.8, 11.9, 12.0, 12.1] },
];

const revenueData = [
  { month: 'Jan', revenue: 1800000, expenses: 1200000 },
  { month: 'Feb', revenue: 2100000, expenses: 1300000 },
  { month: 'Mar', revenue: 1900000, expenses: 1100000 },
  { month: 'Apr', revenue: 2300000, expenses: 1400000 },
  { month: 'May', revenue: 2500000, expenses: 1500000 },
  { month: 'Jun', revenue: 2450000, expenses: 1210000 },
];

const feeBreakdown = [
  { category: 'Tuition', collected: 18.5, pending: 4.2, percentage: 81 },
  { category: 'Hostel', collected: 3.8, pending: 1.5, percentage: 72 },
  { category: 'Transport', collected: 1.2, pending: 0.8, percentage: 60 },
  { category: 'Lab Fee', collected: 0.8, pending: 0.4, percentage: 67 },
  { category: 'Exam Fee', collected: 0.2, pending: 1.3, percentage: 13 },
];

const recentTransactions = [
  { id: 'TXN001', description: 'Tuition — Aarav Sharma', amount: '₹85,000', type: 'credit', date: 'Today' },
  { id: 'TXN002', description: 'Faculty Salary — June', amount: '₹12,10,000', type: 'debit', date: 'Yesterday' },
  { id: 'TXN003', description: 'Hostel Fee — Priya Patel', amount: '₹45,000', type: 'credit', date: '2 days ago' },
  { id: 'TXN004', description: 'Lab Equipment Purchase', amount: '₹1,80,000', type: 'debit', date: '3 days ago' },
  { id: 'TXN005', description: 'Transport Fee — Rohit Kumar', amount: '₹18,000', type: 'credit', date: '4 days ago' },
];

const formatLakh = (v: number) => `₹${(v / 100000).toFixed(1)}L`;

export default function FinanceDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 noise-overlay">
      {/* Asymmetric stat grid */}
      <div className="grid grid-cols-12 gap-4">
        <StatCard
          size="hero"
          className="col-span-12 lg:col-span-6"
          label={heroStat.label}
          value={heroStat.value}
          unit={heroStat.unit}
          icon={heroStat.icon}
          accentColor={MODULE_COLOR}
          delta={heroStat.delta}
          deltaLabel={heroStat.deltaLabel}
          trend={heroStat.trend}
          index={0}
          gridColumns={12}
        />
        {secondaryStats.map((stat, i) => (
          <StatCard
            key={stat.label}
            size="md"
            className="col-span-12 sm:col-span-6 lg:col-span-2"
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            icon={stat.icon}
            accentColor={MODULE_COLOR}
            delta={stat.delta}
            deltaDirection={stat.deltaDirection}
            trend={stat.trend}
            index={i + 1}
            gridColumns={12}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Panel
          className="lg:col-span-3"
          title="Revenue vs Expenses"
          description="Monthly trend over the last 6 months"
          accentColor={MODULE_COLOR}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                <defs>
                  {chartGradient('colorRevenue', '#22C55E')}
                  {chartGradient('colorExpenses', '#EF4444', { fromOpacity: 0.18 })}
                </defs>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="month" {...chartAxisProps} />
                <YAxis {...chartAxisProps} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip
                  content={<ChartTooltip valueFormatter={(v) => formatLakh(Number(v))} />}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#22C55E"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                  activeDot={chartActiveDot}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#EF4444"
                  fill="url(#colorExpenses)"
                  strokeWidth={2}
                  activeDot={chartActiveDot}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Fee Collection by Category"
          description="Collected vs pending"
          accentColor={MODULE_COLOR}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="space-y-3.5">
            {feeBreakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground num-tabular">
                    ₹{item.collected}L / <span className="text-rose-500/80">₹{item.pending}L</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.percentage}%`,
                      background: `linear-gradient(90deg, ${MODULE_COLOR}, #4ADE80)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Recent Transactions */}
      <Panel
        title="Recent Transactions"
        description="Latest 5 transactions across all accounts"
        accentColor={MODULE_COLOR}
        actions={
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        }
        index={2}
        gridColumns={1}
        bodyClassName="pt-2"
      >
        <div className="space-y-0.5">
          {recentTransactions.map((txn) => {
            const isCredit = txn.type === 'credit';
            return (
              <div
                key={txn.id}
                className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isCredit
                        ? 'color-mix(in oklch, #22C55E 14%, transparent)'
                        : 'color-mix(in oklch, #EF4444 14%, transparent)',
                    }}
                  >
                    {isCredit ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{txn.description}</p>
                    <p className="text-xs text-muted-foreground num-tabular">
                      {txn.id} · {txn.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold num-tabular shrink-0 ml-3 ${
                    isCredit ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {isCredit ? '+' : '−'}
                  {txn.amount}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
