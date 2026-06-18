'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { label: 'Active Courses', value: '48', change: '+4', icon: BookOpen, color: '#3B82F6' },
  { label: 'Faculty Members', value: '156', change: '+8', icon: Users, color: '#60A5FA' },
  { label: 'Avg Attendance', value: '87%', change: '+3%', icon: Clock, color: '#93C5FD' },
  { label: 'Pass Rate', value: '92%', change: '+2%', icon: TrendingUp, color: '#3B82F6' },
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
          <h3 className="text-sm font-semibold text-foreground mb-4">Department Strength</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="dept" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
                <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="faculty" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Course Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {courseDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Today&apos;s Schedule</h3>
        <div className="space-y-2">
          {upcomingClasses.map((cls) => (
            <div key={cls.subject} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">{cls.subject}</p>
                  <p className="text-xs text-muted-foreground">{cls.faculty} · {cls.room}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{cls.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
