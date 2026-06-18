'use client';

import { motion } from 'framer-motion';
import { DollarSign, Receipt, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  { label: 'Revenue', value: '₹24.5L', change: '+12%', icon: DollarSign, color: '#22C55E', positive: true },
  { label: 'Pending Fees', value: '₹8.2L', change: '-5%', icon: Receipt, color: '#4ADE80', positive: false },
  { label: 'Payroll', value: '₹12.1L', change: '+2%', icon: Wallet, color: '#86EFAC', positive: true },
  { label: 'Net Surplus', value: '₹4.3L', change: '+18%', icon: TrendingUp, color: '#22C55E', positive: true },
];

const revenueData = [
  { month: 'Jan', revenue: 1800000, expenses: 1200000, surplus: 600000 },
  { month: 'Feb', revenue: 2100000, expenses: 1300000, surplus: 800000 },
  { month: 'Mar', revenue: 1900000, expenses: 1100000, surplus: 800000 },
  { month: 'Apr', revenue: 2300000, expenses: 1400000, surplus: 900000 },
  { month: 'May', revenue: 2500000, expenses: 1500000, surplus: 1000000 },
  { month: 'Jun', revenue: 2450000, expenses: 1210000, surplus: 1240000 },
];

const feeBreakdown = [
  { category: 'Tuition', collected: '₹18.5L', pending: '₹4.2L', percentage: 81 },
  { category: 'Hostel', collected: '₹3.8L', pending: '₹1.5L', percentage: 72 },
  { category: 'Transport', collected: '₹1.2L', pending: '₹0.8L', percentage: 60 },
  { category: 'Lab Fee', collected: '₹0.8L', pending: '₹0.4L', percentage: 67 },
  { category: 'Exam Fee', collected: '₹0.2L', pending: '₹1.3L', percentage: 13 },
];

const recentTransactions = [
  { id: 'TXN001', description: 'Tuition - Aarav Sharma', amount: '₹85,000', type: 'credit', date: 'Today' },
  { id: 'TXN002', description: 'Faculty Salary - June', amount: '₹12,10,000', type: 'debit', date: 'Yesterday' },
  { id: 'TXN003', description: 'Hostel Fee - Priya Patel', amount: '₹45,000', type: 'credit', date: '2 days ago' },
  { id: 'TXN004', description: 'Lab Equipment Purchase', amount: '₹1,80,000', type: 'debit', date: '3 days ago' },
  { id: 'TXN005', description: 'Transport Fee - Rohit Kumar', amount: '₹18,000', type: 'credit', date: '4 days ago' },
];

export default function FinanceDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}18` }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" tickFormatter={(v) => `₹${v / 100000}L`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} formatter={(v: number) => [`₹${v / 100000}L`]} />
                <Area type="monotone" dataKey="revenue" stroke="#22C55E" fill="url(#colorRevenue)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="url(#colorExpenses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Fee Collection by Category</h3>
          <div className="space-y-3">
            {feeBreakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground">{item.collected} / {item.pending}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#22C55E' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: txn.type === 'credit' ? '#22C55E18' : '#EF444418' }}
                >
                  {txn.type === 'credit' ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{txn.description}</p>
                  <p className="text-xs text-muted-foreground">{txn.id} · {txn.date}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${txn.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                {txn.type === 'credit' ? '+' : '-'}{txn.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
