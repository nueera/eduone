'use client';

import { motion } from 'framer-motion';
import { Building2, Home, Bus, Utensils, Shield, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const stats = [
  { label: 'Hostel Occupancy', value: '92%', change: '+3%', icon: Home, color: '#10B981' },
  { label: 'Bus Routes', value: '18', change: '+2', icon: Bus, color: '#34D399' },
  { label: 'Cafeteria Rating', value: '4.2', change: '+0.3', icon: Utensils, color: '#6EE7B7' },
  { label: 'Incidents Today', value: '2', change: '-3', icon: Shield, color: '#10B981' },
];

const hostelData = [
  { name: 'Boys Hostel A', occupancy: 95, capacity: 200 },
  { name: 'Boys Hostel B', occupancy: 88, capacity: 180 },
  { name: 'Girls Hostel A', occupancy: 97, capacity: 150 },
  { name: 'Girls Hostel B', occupancy: 82, capacity: 160 },
  { name: 'PG Block', occupancy: 90, capacity: 100 },
];

const facilityUsage = [
  { name: 'Library', value: 85, fill: '#10B981' },
  { name: 'Sports', value: 72, fill: '#34D399' },
  { name: 'Lab', value: 90, fill: '#6EE7B7' },
  { name: 'Auditorium', value: 45, fill: '#A7F3D0' },
];

const transportRoutes = [
  { route: 'Route 1 - City Center', buses: 3, students: 145, status: 'Active' },
  { route: 'Route 2 - Station Road', buses: 2, students: 98, status: 'Active' },
  { route: 'Route 3 - Highway', buses: 2, students: 112, status: 'Active' },
  { route: 'Route 4 - Old Town', buses: 1, students: 56, status: 'Delayed' },
];

export default function CampusDashboard() {
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
                <span className="text-xs font-medium text-green-500 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />{stat.change}
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
          <h3 className="text-sm font-semibold text-foreground mb-4">Hostel Occupancy</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
                <Bar dataKey="occupancy" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Facility Usage %</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={facilityUsage} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" background cornerRadius={6} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {facilityUsage.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transport */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Transport Routes</h3>
        <div className="space-y-2">
          {transportRoutes.map((route) => (
            <div key={route.route} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{route.route}</p>
                <p className="text-xs text-muted-foreground">{route.buses} buses · {route.students} students</p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: route.status === 'Active' ? '#10B98118' : '#EAB30818',
                  color: route.status === 'Active' ? '#10B981' : '#EAB308',
                }}
              >
                {route.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
