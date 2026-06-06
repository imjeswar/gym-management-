'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { database } from '@/lib/db'

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

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / (duration * 1000), 1)
      setDisplayValue(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return displayValue
}

const MetricCard = ({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode
  label: string
  value: number | string
  change?: { value: number; isPositive: boolean }
}) => (
  <motion.div variants={itemVariants} className="group">
    <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-card/80">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3">{Icon}</div>
        {change && (
          <div className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium ${change.isPositive ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}`}>
            <ArrowUpRight className={`h-4 w-4 ${!change.isPositive && 'rotate-180'}`} />
            {change.value}%
          </div>
        )}
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold text-foreground">
        {typeof value === 'number' && label.includes('Revenue') ? '$' : ''}
        {value}
      </p>
    </div>
  </motion.div>
)

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    activeMemberships: 0,
    totalRevenue: 0,
    totalTrainers: 0,
    attendanceToday: 0,
    membershipRenewals: 0,
  })

  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Fetch data from database
    const members = database.getAllMembers()
    const memberships = database.getAllMemberships()
    const payments = database.getAllPayments()
    const trainers = database.getAllTrainers()
    const attendance = database.getAllAttendance()

    const activeMembershipCount = memberships.filter((m) => m.status === 'active').length
    const totalRevenue = payments
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + p.amount, 0)

    const todayAttendance = attendance.filter((a) => {
      const checkInDate = new Date(a.checkIn).toDateString()
      return checkInDate === new Date().toDateString()
    }).length

    setMetrics({
      totalMembers: members.length,
      activeMemberships: activeMembershipCount,
      totalRevenue,
      totalTrainers: trainers.length,
      attendanceToday: todayAttendance,
      membershipRenewals: memberships.filter((m) => m.status === 'pending_renewal').length,
    })

    // Generate chart data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const data = months.map((month, index) => ({
      month,
      revenue: Math.floor(Math.random() * 10000) + 5000,
      members: Math.floor(Math.random() * 50) + 20,
      attendance: Math.floor(Math.random() * 300) + 150,
    }))
    setChartData(data)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your gym overview.</p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <MetricCard
          icon={<Users className="h-6 w-6 text-secondary" />}
          label="Total Members"
          value={<AnimatedCounter value={metrics.totalMembers} />}
          change={{ value: 12, isPositive: true }}
        />
        <MetricCard
          icon={<Activity className="h-6 w-6 text-secondary" />}
          label="Active Memberships"
          value={<AnimatedCounter value={metrics.activeMemberships} />}
          change={{ value: 8, isPositive: true }}
        />
        <MetricCard
          icon={<DollarSign className="h-6 w-6 text-accent" />}
          label="Total Revenue"
          value={`$${<AnimatedCounter value={Math.floor(metrics.totalRevenue / 100)} />}00`}
          change={{ value: 24, isPositive: true }}
        />
        <MetricCard
          icon={<BarChart3 className="h-6 w-6 text-secondary" />}
          label="Total Trainers"
          value={<AnimatedCounter value={metrics.totalTrainers} />}
          change={{ value: 5, isPositive: true }}
        />
        <MetricCard
          icon={<Calendar className="h-6 w-6 text-accent" />}
          label="Attendance Today"
          value={<AnimatedCounter value={metrics.attendanceToday} />}
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          label="Renewals Pending"
          value={<AnimatedCounter value={metrics.membershipRenewals} />}
          change={{ value: 3, isPositive: false }}
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7C3AED"
                strokeWidth={2}
                dot={false}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Members & Attendance Chart */}
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Members & Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="members" fill="#06B6D4" name="Members" />
              <Bar dataKey="attendance" fill="#22C55E" name="Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
        <h2 className="mb-6 text-lg font-semibold text-foreground">Recent Activities</h2>
        <div className="space-y-4">
          {[
            { activity: 'New member registered', time: '2 hours ago', icon: '👤' },
            { activity: 'Payment received', time: '5 hours ago', icon: '💰' },
            { activity: 'Membership renewed', time: '1 day ago', icon: '✅' },
            { activity: 'New trainer added', time: '3 days ago', icon: '🏃' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 bg-input/30 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-medium text-foreground">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
