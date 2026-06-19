'use client';

import { motion } from 'framer-motion';
import { Users, ClipboardList, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Panel } from '@/components/ui/panel';
import { ChartTooltip, chartGridProps, chartAxisProps, chartActiveDot, chartGradient } from '@/components/ui/chart-tooltip';

const MODULE_COLOR = '#F97316';

// Hero stat — gets the spotlight + sparkline + display serif treatment
const heroStat = {
  label: 'Conversion Rate',
  value: '63',
  unit: '%',
  icon: TrendingUp,
  delta: 5.2,
  deltaLabel: 'vs last month',
  trend: [42, 45, 48, 52, 55, 58, 60, 63],
};

const secondaryStats = [
  { label: 'New Leads', value: '142', icon: Users, delta: 12, trend: [65, 78, 90, 110, 130, 142] },
  { label: 'Applications', value: '89', icon: ClipboardList, delta: 8, trend: [40, 52, 60, 75, 85, 89] },
  { label: 'Enrolled', value: '67', icon: GraduationCap, delta: 15, trend: [25, 35, 42, 55, 63, 67] },
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 noise-overlay">
      {/* Premium asymmetric stat grid — 1 hero + 3 secondary */}
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
        {secondaryStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={stat.label}
              size="md"
              className="col-span-12 sm:col-span-6 lg:col-span-2"
              label={stat.label}
              value={stat.value}
              icon={Icon}
              accentColor={MODULE_COLOR}
              delta={stat.delta}
              trend={stat.trend}
              index={i + 1}
              gridColumns={12}
            />
          );
        })}
      </div>

      {/* Chart + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Panel
          className="lg:col-span-3"
          title="Enrollment Funnel"
          description="Leads → Applications → Enrolled over the last 6 months"
          accentColor={MODULE_COLOR}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <defs>
                  {chartGradient('colorLeads', '#F97316')}
                  {chartGradient('colorApps', '#FB923C')}
                  {chartGradient('colorEnrolled', '#FDBA74')}
                </defs>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="month" {...chartAxisProps} />
                <YAxis {...chartAxisProps} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#F97316"
                  fill="url(#colorLeads)"
                  strokeWidth={2}
                  activeDot={chartActiveDot}
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#FB923C"
                  fill="url(#colorApps)"
                  strokeWidth={2}
                  activeDot={chartActiveDot}
                />
                <Area
                  type="monotone"
                  dataKey="enrolled"
                  stroke="#FDBA74"
                  fill="url(#colorEnrolled)"
                  strokeWidth={2}
                  activeDot={chartActiveDot}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Recent Leads"
          description="Latest 5 inbound leads"
          accentColor={MODULE_COLOR}
          actions={
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5 num-tabular">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          }
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="space-y-1">
            {recentLeads.map((lead) => (
              <div
                key={lead.name}
                className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.course}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-md font-medium num-tabular"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${statusColors[lead.status]} 14%, transparent)`,
                      color: statusColors[lead.status],
                    }}
                  >
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground num-tabular w-16 text-right">
                    {lead.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
