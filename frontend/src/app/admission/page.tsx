'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, ClipboardList, GraduationCap, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'New Leads', value: '142', change: '+12%', icon: Users, color: '#F97316' },
  { label: 'Applications', value: '89', change: '+8%', icon: ClipboardList, color: '#FB923C' },
  { label: 'Enrolled', value: '67', change: '+15%', icon: GraduationCap, color: '#FDBA74' },
  { label: 'Conversion Rate', value: '63%', change: '+5%', icon: TrendingUp, color: '#F97316' },
];

const enrollmentData = [
  { month: 'Jan', leads: 65, applications: 40, enrolled: 25 },
  { month: 'Feb', leads: 78, applications: 52, enrolled: 35 },
  { month: 'Mar', leads: 90, applications: 60, enrolled: 42 },
  { month: 'Apr', leads: 110, applications: 75, enrolled: 55 },
  { month: 'May', leads: 130, applications: 85, enrolled: 63 },
  { month: 'Jun', leads: 142, applications: 89, enrolled: 67 },
];

const recentLeads = [
  { name: 'Aarav Sharma', course: 'B.Tech CSE', status: 'New', date: '2 hours ago' },
  { name: 'Priya Patel', course: 'MBA', status: 'Contacted', date: '5 hours ago' },
  { name: 'Rohit Kumar', course: 'B.Sc Physics', status: 'Qualified', date: '1 day ago' },
  { name: 'Sneha Reddy', course: 'B.Tech ECE', status: 'Application', date: '2 days ago' },
  { name: 'Vikram Singh', course: 'MCA', status: 'Enrolled', date: '3 days ago' },
];

const statusColors: Record<string, string> = {
  New: '#F97316',
  Contacted: '#3B82F6',
  Qualified: '#A855F7',
  Application: '#06B6D4',
  Enrolled: '#22C55E',
};

export default function AdmissionDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Stats Cards */}
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
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-medium text-green-500 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Table row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Enrollment Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 glass rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Enrollment Funnel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FDBA74" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FDBA74" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--popover)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="#F97316" fill="url(#colorLeads)" strokeWidth={2} />
                <Area type="monotone" dataKey="applications" stroke="#FB923C" fill="url(#colorApps)" strokeWidth={2} />
                <Area type="monotone" dataKey="enrolled" stroke="#FDBA74" fill="url(#colorEnrolled)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Leads</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentLeads.map((lead) => (
              <div key={lead.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.course}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${statusColors[lead.status]}18`,
                      color: statusColors[lead.status],
                    }}
                  >
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{lead.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
