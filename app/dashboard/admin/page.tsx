'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Users, TrendingUp, CreditCard, Activity, AlertCircle, Download } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    averageMonthlyRevenue: 0,
  })

  useEffect(() => {
    // Simulated data - in production this would come from API
    setStats({
      totalMembers: 245,
      activeMembers: 189,
      totalRevenue: 52500,
      averageMonthlyRevenue: 4375,
    })
  }, [])

  const membershipData = [
    { name: 'Basic', value: 85, color: '#7C3AED' },
    { name: 'Standard', value: 102, color: '#06B6D4' },
    { name: 'Premium', value: 58, color: '#22C55E' },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 3200, expenses: 1200 },
    { month: 'Feb', revenue: 3800, expenses: 1400 },
    { month: 'Mar', revenue: 4200, expenses: 1600 },
    { month: 'Apr', revenue: 4500, expenses: 1800 },
    { month: 'May', revenue: 5200, expenses: 2000 },
    { month: 'Jun', revenue: 6500, expenses: 2200 },
  ]

  const attendanceData = [
    { date: 'Mon', attendance: 45 },
    { date: 'Tue', attendance: 52 },
    { date: 'Wed', attendance: 48 },
    { date: 'Thu', attendance: 61 },
    { date: 'Fri', attendance: 55 },
    { date: 'Sat', attendance: 38 },
    { date: 'Sun', attendance: 22 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#0F172A] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Comprehensive gym analytics and management overview</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Users,
              label: 'Total Members',
              value: stats.totalMembers,
              subtext: `${stats.activeMembers} active`,
              color: 'from-primary/20 to-primary/5',
            },
            {
              icon: Activity,
              label: 'Active Rate',
              value: `${Math.round((stats.activeMembers / stats.totalMembers) * 100)}%`,
              subtext: '↑ 12% from last month',
              color: 'from-accent/20 to-accent/5',
            },
            {
              icon: CreditCard,
              label: 'Total Revenue',
              value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`,
              subtext: 'All-time earnings',
              color: 'from-secondary/20 to-secondary/5',
            },
            {
              icon: TrendingUp,
              label: 'Avg Monthly',
              value: `$${(stats.averageMonthlyRevenue / 1000).toFixed(1)}K`,
              subtext: 'Monthly average',
              color: 'from-yellow-500/20 to-yellow-500/5',
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className={`rounded-2xl border border-border bg-gradient-to-br ${stat.color} p-6 backdrop-blur transition-all hover:border-primary/50`}>
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3">
                    <stat.icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Revenue Chart */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Revenue vs Expenses</h2>
              <button className="rounded-lg bg-primary/10 p-2 text-primary transition-all hover:bg-primary/20">
                <Download className="h-5 w-5" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
                <XAxis stroke="rgba(148, 163, 184, 0.5)" />
                <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#06B6D4" name="Revenue" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#7C3AED" name="Expenses" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Membership Distribution */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">Membership Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {membershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attendance Trends */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Weekly Attendance Trends</h2>
              <div className="flex gap-2">
                <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary transition-all hover:bg-primary/20">
                  This Week
                </button>
                <button className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-muted/80">
                  Last Week
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
                <XAxis stroke="rgba(148, 163, 184, 0.5)" />
                <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ fill: '#22C55E', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Alerts Section */}
        <motion.div variants={itemVariants} className="mt-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-orange-500/10 p-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">System Alerts</h2>
          </div>
          <div className="space-y-3">
            {[
              { message: 'Low attendance on Sunday - Consider running a promotion', type: 'warning' },
              { message: '12 members have memberships expiring this month', type: 'info' },
              { message: '3 new trainer applications pending review', type: 'info' },
            ].map((alert, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
