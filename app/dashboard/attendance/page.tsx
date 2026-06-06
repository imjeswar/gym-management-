'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, QrCode, CheckCircle, Clock, Flame } from 'lucide-react'
import { database } from '@/lib/db'
import type { AttendanceRecord, Member } from '@/types'

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

export default function AttendancePage() {
  const [members, setMembers] = useState<Member[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showQRModal, setShowQRModal] = useState(false)
  const qrRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMembers(database.getAllMembers())
    loadAttendance()
  }, [selectedDate])

  const loadAttendance = () => {
    const records = database.getAttendanceRecords(null, selectedDate, selectedDate)
    setAttendance(records)
  }

  const markAttendance = (memberId: string) => {
    database.createAttendanceRecord({
      memberId,
      attendanceTime: new Date().toISOString(),
    })
    loadAttendance()
  }

  const getTodayAttendanceCount = () => {
    return attendance.length
  }

  const getTotalMembers = () => {
    return members.length
  }

  const getAttendancePercentage = () => {
    const total = getTotalMembers()
    if (total === 0) return 0
    return Math.round((getTodayAttendanceCount() / total) * 100)
  }

  const generateQRCode = async () => {
    if (!qrRef.current) return

    // Generate a gym check-in QR code
    const canvas = qrRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // For demo purposes, create a simple QR-like pattern
    const size = 300
    canvas.width = size
    canvas.height = size

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // Draw simple grid pattern to simulate QR code
    ctx.fillStyle = '#000000'
    const moduleSize = 10
    for (let i = 0; i < size / moduleSize; i++) {
      for (let j = 0; j < size / moduleSize; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize - 1, moduleSize - 1)
        }
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track member check-ins and attendance</p>
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-border bg-input/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            onClick={() => {
              setShowQRModal(true)
              setTimeout(generateQRCode, 100)
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg"
          >
            <QrCode className="h-5 w-5" />
            Show QR Code
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Present Today</p>
              <p className="text-3xl font-bold text-foreground">{getTodayAttendanceCount()}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="text-3xl font-bold text-foreground">{getTotalMembers()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-3xl font-bold text-foreground">{getAttendancePercentage()}%</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>
      </motion.div>

      {/* Attendance List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-foreground">Members Today</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur">
          <div className="divide-y divide-border">
            {members.length > 0 ? (
              members.map((member) => {
                const memberAttendance = attendance.find((a) => a.memberId === member._id)
                return (
                  <motion.div
                    key={member._id}
                    variants={itemVariants}
                    className="flex items-center justify-between border-border px-6 py-4 transition-colors hover:bg-input/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{member.name}</p>
                          {member._id && database.getMemberStreak(member._id) > 0 && (
                            <div className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-500">
                              <Flame className="h-3 w-3" />
                              {database.getMemberStreak(member._id)} Day Streak
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    {memberAttendance ? (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-500">Present</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(memberAttendance.attendanceTime).toLocaleTimeString()}
                          </p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <button
                        onClick={() => member._id && markAttendance(member._id)}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-white"
                      >
                        Mark Present
                      </button>
                    )}
                  </motion.div>
                )
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground">No members available</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      {showQRModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-8 backdrop-blur"
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Gym Check-in QR Code</h2>
            <div className="flex justify-center mb-6">
              <canvas
                ref={qrRef}
                className="rounded-lg border border-border"
                style={{ width: '300px', height: '300px' }}
              />
            </div>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Members can scan this code to check in
            </p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
