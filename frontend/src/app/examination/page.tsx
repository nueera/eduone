'use client';

import { motion } from 'framer-motion';
import { FileCheck, Calendar, Award, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stats = [
  { label: 'Upcoming Exams', value: '12', change: '3 this week', icon: Calendar, color: '#A855F7' },
  { label: 'Results Published', value: '8', change: '+2', icon: Award, color: '#C084FC' },
  { label: 'Avg Score', value: '76%', change: '+4%', icon: TrendingUp, color: '#D8B4FE' },
  { label: 'Total Exams', value: '156', change: '+12', icon: FileCheck, color: '#A855F7' },
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
  { subject: 'Data Structures', avg: 72, highest: 95, lowest: 28 },
  { subject: 'DBMS', avg: 78, highest: 92, lowest: 35 },
  { subject: 'OS', avg: 68, highest: 88, lowest: 22 },
  { subject: 'Networks', avg: 74, highest: 91, lowest: 30 },
  { subject: 'ML', avg: 81, highest: 97, lowest: 40 },
];

const upcomingExams = [
  { subject: 'Data Structures', date: 'Jun 20', time: '9:00 AM', students: 180 },
  { subject: 'DBMS', date: 'Jun 22', time: '2:00 PM', students: 165 },
  { subject: 'Operating Systems', date: 'Jun 25', time: '9:00 AM', students: 172 },
  { subject: 'Computer Networks', date: 'Jun 28', time: '10:30 AM', students: 155 },
];

export default function ExaminationDashboard() {
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
          <h3 className="text-sm font-semibold text-foreground mb-4">Semester Pass Rate Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={passRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="semester" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
                <Line type="monotone" dataKey="passRate" stroke="#A855F7" strokeWidth={2} dot={{ fill: '#A855F7', r: 4 }} />
                <Line type="monotone" dataKey="distinction" stroke="#D8B4FE" strokeWidth={2} dot={{ fill: '#D8B4FE', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Subject Averages</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis dataKey="subject" type="category" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" width={90} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }} />
                <Bar dataKey="avg" fill="#A855F7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Exams */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Upcoming Examinations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcomingExams.map((exam) => (
            <div key={exam.subject} className="rounded-xl border border-border p-3 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-xs text-muted-foreground">{exam.date}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{exam.subject}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{exam.time}</span>
                <span className="text-xs text-muted-foreground">{exam.students} students</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
