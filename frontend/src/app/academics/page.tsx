'use client';

import { BookOpen, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Panel } from '@/components/ui/panel';
import { ChartTooltip, chartGridProps, chartAxisProps } from '@/components/ui/chart-tooltip';

const MODULE_COLOR = '#3B82F6';

const heroStat = {
  label: 'Pass Rate',
  value: '92',
  unit: '%',
  icon: TrendingUp,
  delta: 2.1,
  deltaLabel: 'vs last semester',
  trend: [84, 86, 88, 89, 90, 91, 92],
};

const secondaryStats = [
  { label: 'Active Courses', value: '48', icon: BookOpen, delta: 9, trend: [40, 42, 44, 45, 46, 48] },
  { label: 'Faculty Members', value: '156', icon: Users, delta: 5, trend: [142, 145, 148, 152, 154, 156] },
  { label: 'Avg Attendance', value: '87', unit: '%', icon: Clock, delta: 3, trend: [78, 80, 82, 84, 86, 87] },
];

const departmentData = [
  { dept: 'CSE', students: 420, faculty: 32 },
  { dept: 'ECE', students: 380, faculty: 28 },
  { dept: 'ME', students: 290, faculty: 22 },
  { dept: 'CE', students: 250, faculty: 20 },
  { dept: 'MBA', students: 180, faculty: 18 },
  { dept: 'BSc', students: 320, faculty: 24 },
];

const courseDistribution = [
  { name: 'B.Tech', value: 45, color: '#3B82F6' },
  { name: 'M.Tech', value: 15, color: '#60A5FA' },
  { name: 'MBA', value: 12, color: '#93C5FD' },
  { name: 'B.Sc', value: 18, color: '#BFDBFE' },
  { name: 'MCA', value: 10, color: '#DBEAFE' },
];

const upcomingClasses = [
  { subject: 'Data Structures', time: '9:00 AM', room: 'LH-201', faculty: 'Dr. Gupta' },
  { subject: 'Digital Electronics', time: '10:30 AM', room: 'LH-305', faculty: 'Prof. Singh' },
  { subject: 'Thermodynamics', time: '1:00 PM', room: 'LH-102', faculty: 'Dr. Verma' },
  { subject: 'Financial Mgmt', time: '2:30 PM', room: 'LH-401', faculty: 'Prof. Jain' },
  { subject: 'Machine Learning', time: '4:00 PM', room: 'Lab-3', faculty: 'Dr. Reddy' },
];

export default function AcademicsDashboard() {
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
          title="Department Strength"
          description="Students vs faculty by department"
          accentColor={MODULE_COLOR}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="dept" {...chartAxisProps} />
                <YAxis {...chartAxisProps} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--accent)', opacity: 0.3 }} />
                <Bar dataKey="students" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="faculty" fill="#93C5FD" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Course Distribution"
          description="Active programs by enrollment"
          accentColor={MODULE_COLOR}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={84}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip hideSwatch valueFormatter={(v) => `${v}%`} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {courseDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="text-foreground font-medium num-tabular">{item.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Today's Schedule */}
      <Panel
        title="Today's Schedule"
        description="5 classes across departments"
        accentColor={MODULE_COLOR}
        actions={
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
            Full timetable <ArrowRight className="w-3 h-3" />
          </button>
        }
        index={2}
        gridColumns={1}
        bodyClassName="pt-2"
      >
        <div className="space-y-1">
          {upcomingClasses.map((cls) => (
            <div
              key={cls.subject}
              className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-1 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: MODULE_COLOR }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{cls.subject}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {cls.faculty} · {cls.room}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground num-tabular shrink-0 ml-3">
                {cls.time}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
