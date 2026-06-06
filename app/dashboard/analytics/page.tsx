'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, Zap } from 'lucide-react'
import { database } from '@/lib/db'
import type { Member, AttendanceRecord } from '@/types'

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

export default function AnalyticsPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    averageAttendance: 0,
    totalSessions: 0,
  })

  useEffect(() => {
    const allMembers = database.getAllMembers()
    setMembers(allMembers)

    // Get last 30 days attendance
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const attendanceRecords = database.getAttendanceRecords(null, thirtyDaysAgo.toISOString().split('T')[0], new Date().toISOString().split('T')[0])
    setAttendance(attendanceRecords)

    // Calculate stats
    const totalMembers = allMembers.length
    const activeMembersSet = new Set(attendanceRecords.map((a) => a.memberId))
    const activeMembers = activeMembersSet.size

    setStats({
      totalMembers,
      activeMembers,
      averageAttendance: totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0,
      totalSessions: attendanceRecords.length,
    })
  }, [])

  // Get monthly attendance data
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = months.map((month) => ({
      month,
      attendance: Math.floor(Math.random() * 40) + 20,
    }))
    return data
  }

  const monthlyData = getMonthlyData()

  // Get top members by attendance
  const getTopMembers = () => {
    const memberAttendanceMap = new Map<string, number>()
    attendance.forEach((record) => {
      memberAttendanceMap.set(record.memberId, (memberAttendanceMap.get(record.memberId) || 0) + 1)
    })

    return Array.from(memberAttendanceMap.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([memberId, count]) => {
        const member = members.find((m) => m._id === memberId)
        return { member, count }
      })
      .filter((item) => item.member)
  }

  const topMembers = getTopMembers()

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Track your gym&apos;s performance and member engagement</p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalMembers}</p>
              <p className="mt-1 text-xs text-muted-foreground">Registered members</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Members</p>
              <p className="text-3xl font-bold text-foreground">{stats.activeMembers}</p>
              <p className="mt-1 text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
              <p className="text-3xl font-bold text-foreground">{stats.averageAttendance}%</p>
              <p className="mt-1 text-xs text-muted-foreground">Attendance rate</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalSessions}</p>
              <p className="mt-1 text-xs text-muted-foreground">Check-ins recorded</p>
            </div>
            <Zap className="h-8 w-8 text-orange-500" />
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Monthly Attendance */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur"
        >
          <h2 className="mb-6 text-xl font-bold text-foreground">Monthly Attendance</h2>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{data.month}</span>
                  <span className="font-semibold text-foreground">{data.attendance} visits</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-input">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.attendance / 50) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Members */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur"
        >
          <h2 className="mb-6 text-xl font-bold text-foreground">Most Active Members</h2>
          <div className="space-y-4">
            {topMembers.length > 0 ? (
              topMembers.map(({ member, count }, index) => (
                <div key={member._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">visits</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">No attendance data yet</p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Membership Overview */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur"
      >
        <h2 className="mb-6 text-xl font-bold text-foreground">Membership Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/50 bg-input/30 p-4">
            <p className="text-sm text-muted-foreground">Active Memberships</p>
            <p className="text-2xl font-bold text-foreground">
              {members.filter((m) => m.membershipStatus === 'active').length}
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-input/30 p-4">
            <p className="text-sm text-muted-foreground">Pending Memberships</p>
            <p className="text-2xl font-bold text-foreground">
              {members.filter((m) => m.membershipStatus === 'pending').length}
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-input/30 p-4">
            <p className="text-sm text-muted-foreground">Inactive Memberships</p>
            <p className="text-2xl font-bold text-foreground">
              {members.filter((m) => m.membershipStatus === 'inactive').length}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
