'use client';

import { FileCheck, Calendar, Award, TrendingUp, Clock, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Panel } from '@/components/ui/panel';
import { ChartTooltip, chartGridProps, chartAxisProps, chartActiveDot } from '@/components/ui/chart-tooltip';

/**
 * Examination Dashboard
 * ---------------------
 * All theming flows through the global `--module-examination` CSS
 * variable (defined in globals.css). No hardcoded hex colors anywhere —
 * charts read the same token via the `var(--module-examination)` string,
 * which Recharts passes straight through to `stroke` / `fill` CSS props.
 *
 * Status dots on the upcoming-exam cards use the `.accent-bullet`
 * utility class — same pattern as SubModuleLanding feature bullets.
 */
const MODULE_ACCENT = 'var(--module-examination)';

const heroStat = {
  label: 'Average Score',
  value: '76',
  unit: '%',
  icon: TrendingUp,
  delta: 5.5,
  deltaLabel: 'vs last semester',
  trend: [62, 65, 68, 70, 72, 74, 76],
};

const secondaryStats = [
  { label: 'Upcoming Exams', value: '12', icon: Calendar, delta: 0, trend: [8, 9, 10, 11, 12, 12] },
  { label: 'Results Published', value: '8', icon: Award, delta: 33, trend: [3, 4, 5, 6, 7, 8] },
  { label: 'Total Exams', value: '156', icon: FileCheck, delta: 8, trend: [120, 130, 138, 145, 150, 156] },
];

const passRateData = [
  { semester: 'Sem 1', passRate: 88, distinction: 22 },
  { semester: 'Sem 2', passRate: 85, distinction: 19 },
  { semester: 'Sem 3', passRate: 91, distinction: 28 },
  { semester: 'Sem 4', passRate: 87, distinction: 24 },
  { semester: 'Sem 5', passRate: 93, distinction: 32 },
  { semester: 'Sem 6', passRate: 90, distinction: 30 },
];

const subjectPerformance = [
  { subject: 'Data Structures', avg: 72 },
  { subject: 'DBMS', avg: 78 },
  { subject: 'OS', avg: 68 },
  { subject: 'Networks', avg: 74 },
  { subject: 'ML', avg: 81 },
];

const upcomingExams = [
  { subject: 'Data Structures', date: 'Jun 20', time: '9:00 AM', students: 180 },
  { subject: 'DBMS', date: 'Jun 22', time: '2:00 PM', students: 165 },
  { subject: 'Operating Systems', date: 'Jun 25', time: '9:00 AM', students: 172 },
  { subject: 'Computer Networks', date: 'Jun 28', time: '10:30 AM', students: 155 },
];

export default function ExaminationDashboardPage() {
  return (
    <div
      className="p-4 sm:p-6 lg:p-8 space-y-6 noise-overlay"
      style={{ ['--panel-accent' as string]: MODULE_ACCENT }}
    >
      {/* Asymmetric stat grid */}
      <div className="grid grid-cols-12 gap-4">
        <StatCard
          size="hero"
          className="col-span-12 lg:col-span-6"
          label={heroStat.label}
          value={heroStat.value}
          unit={heroStat.unit}
          icon={heroStat.icon}
          accentColor={MODULE_ACCENT}
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
            icon={stat.icon}
            accentColor={MODULE_ACCENT}
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
          title="Semester Pass Rate Trend"
          description="Pass rate & distinction % across 6 semesters"
          accentColor={MODULE_ACCENT}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={passRateData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="semester" {...chartAxisProps} />
                <YAxis {...chartAxisProps} domain={[0, 100]} />
                <Tooltip content={<ChartTooltip suffix="%" />} />
                <Line
                  type="monotone"
                  dataKey="passRate"
                  name="Pass Rate"
                  stroke={MODULE_ACCENT}
                  strokeWidth={2}
                  dot={false}
                  activeDot={chartActiveDot}
                />
                <Line
                  type="monotone"
                  dataKey="distinction"
                  name="Distinction"
                  stroke="color-mix(in oklch, var(--module-examination) 55%, var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  dot={false}
                  activeDot={chartActiveDot}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Subject Averages"
          description="Average score by subject"
          accentColor={MODULE_ACCENT}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance} layout="vertical" margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
                <CartesianGrid {...chartGridProps} horizontal={false} vertical={true} />
                <XAxis type="number" {...chartAxisProps} domain={[0, 100]} />
                <YAxis dataKey="subject" type="category" {...chartAxisProps} width={88} />
                <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: 'var(--accent)', opacity: 0.3 }} />
                <Bar dataKey="avg" name="Average" fill={MODULE_ACCENT} radius={[0, 6, 6, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Upcoming Exams — accent comes from the parent --panel-accent scope */}
      <Panel
        title="Upcoming Examinations"
        description="4 exams scheduled in the next 2 weeks"
        accentColor={MODULE_ACCENT}
        index={2}
        gridColumns={1}
        bodyClassName="pt-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcomingExams.map((exam) => (
            <div
              key={exam.subject}
              className="rounded-lg border border-border/70 p-3 hover:border-[color:var(--panel-accent)]/40 hover:bg-accent/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                {/* Bullet — global .accent-bullet utility, reads from --panel-accent */}
                <span className="accent-bullet w-1.5 h-1.5 rounded-full shrink-0" />
                <span className="text-xs text-muted-foreground num-tabular">{exam.date}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{exam.subject}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 num-tabular">
                  <Clock className="w-3 h-3" />
                  {exam.time}
                </span>
                <span className="flex items-center gap-1 num-tabular">
                  <Users className="w-3 h-3" />
                  {exam.students}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
