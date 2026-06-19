'use client';

import { Building2, Home, Bus, Utensils, Shield, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Panel } from '@/components/ui/panel';
import { ChartTooltip, chartGridProps, chartAxisProps } from '@/components/ui/chart-tooltip';

const MODULE_COLOR = '#10B981';

const heroStat = {
  label: 'Hostel Occupancy',
  value: '92',
  unit: '%',
  icon: Home,
  delta: 3.4,
  deltaLabel: 'vs last month',
  trend: [82, 84, 86, 88, 90, 91, 92],
};

const secondaryStats = [
  { label: 'Bus Routes', value: '18', icon: Bus, delta: 12, trend: [12, 13, 14, 15, 17, 18] },
  { label: 'Cafeteria Rating', value: '4.2', icon: Utensils, delta: 7.7, trend: [3.6, 3.8, 4.0, 4.1, 4.2, 4.2] },
  { label: 'Incidents Today', value: '2', icon: Shield, delta: -60, deltaDirection: 'up' as const, trend: [5, 4, 4, 3, 3, 2] },
];

const hostelData = [
  { name: 'Boys A', occupancy: 95, capacity: 100 },
  { name: 'Boys B', occupancy: 88, capacity: 100 },
  { name: 'Girls A', occupancy: 97, capacity: 100 },
  { name: 'Girls B', occupancy: 82, capacity: 100 },
  { name: 'PG Block', occupancy: 90, capacity: 100 },
];

const facilityUsage = [
  { name: 'Library', value: 85, fill: '#10B981' },
  { name: 'Sports', value: 72, fill: '#34D399' },
  { name: 'Lab', value: 90, fill: '#6EE7B7' },
  { name: 'Auditorium', value: 45, fill: '#A7F3D0' },
];

const transportRoutes = [
  { route: 'Route 1 — City Center', buses: 3, students: 145, status: 'Active' },
  { route: 'Route 2 — Station Road', buses: 2, students: 98, status: 'Active' },
  { route: 'Route 3 — Highway', buses: 2, students: 112, status: 'Active' },
  { route: 'Route 4 — Old Town', buses: 1, students: 56, status: 'Delayed' },
];

export default function CampusDashboard() {
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
          title="Hostel Occupancy"
          description="Occupancy % by hostel block"
          accentColor={MODULE_COLOR}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="name" {...chartAxisProps} />
                <YAxis {...chartAxisProps} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: 'var(--accent)', opacity: 0.3 }} />
                <Bar dataKey="occupancy" name="Occupancy" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="capacity" name="Capacity" fill="#6EE7B7" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Facility Usage"
          description="Daily utilization by facility"
          accentColor={MODULE_COLOR}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="100%"
                data={facilityUsage}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background={{ fill: 'var(--muted)' }} cornerRadius={6} />
                <Tooltip content={<ChartTooltip suffix="%" />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {facilityUsage.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="text-foreground font-medium num-tabular">{item.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Transport Routes */}
      <Panel
        title="Transport Routes"
        description="Live status of all bus routes"
        accentColor={MODULE_COLOR}
        actions={
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
            Manage <ArrowRight className="w-3 h-3" />
          </button>
        }
        index={2}
        gridColumns={1}
        bodyClassName="pt-2"
      >
        <div className="space-y-1">
          {transportRoutes.map((route) => {
            const isActive = route.status === 'Active';
            return (
              <div
                key={route.route}
                className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `color-mix(in oklch, ${MODULE_COLOR} 14%, transparent)` }}
                  >
                    <Bus className="w-4 h-4" style={{ color: MODULE_COLOR }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{route.route}</p>
                    <p className="text-xs text-muted-foreground num-tabular">
                      {route.buses} buses · {route.students} students
                    </p>
                  </div>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0"
                  style={{
                    backgroundColor: isActive
                      ? 'color-mix(in oklch, #10B981 14%, transparent)'
                      : 'color-mix(in oklch, #EAB308 14%, transparent)',
                    color: isActive ? '#10B981' : '#EAB308',
                  }}
                >
                  {route.status}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
