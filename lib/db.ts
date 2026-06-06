import type {
  User,
  Member,
  Trainer,
  Membership,
  MembershipType,
  Attendance,
  Payment,
  Progress,
  Notification,
  QRCode,
} from '@/types'

// In-memory database - will be replaced with MongoDB in production
interface Database {
  users: User[]
  members: Member[]
  trainers: Trainer[]
  memberships: Membership[]
  membershipTypes: MembershipType[]
  attendance: Attendance[]
  payments: Payment[]
  progress: Progress[]
  notifications: Notification[]
  qrcodes: QRCode[]
}

// Initialize with default data
const defaultDB: Database = {
  users: [],
  members: [
    {
      _id: 'member_1',
      memberIdNumber: 'GYM-1001',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'member',
      password: 'password',
      joinDate: new Date(),
      createdAt: new Date(),
    }
  ],
  trainers: [],
  memberships: [],
  membershipTypes: [
    {
      _id: 'monthly',
      name: 'Monthly',
      duration: 1,
      price: 99,
      features: ['Unlimited gym access', 'Basic support'],
    },
    {
      _id: 'quarterly',
      name: 'Quarterly',
      duration: 3,
      price: 249,
      features: ['Unlimited gym access', 'Priority support', 'Free assessment'],
    },
    {
      _id: 'half_yearly',
      name: 'Half-Yearly',
      duration: 6,
      price: 449,
      features: ['Unlimited gym access', 'Priority support', 'Free assessment', '1 trainer session/month'],
    },
    {
      _id: 'yearly',
      name: 'Yearly',
      duration: 12,
      price: 799,
      features: [
        'Unlimited gym access',
        'Priority support',
        'Free assessment',
        '2 trainer sessions/month',
        'Nutrition plan',
      ],
    },
  ],
  attendance: [],
  payments: [],
  progress: [],
  notifications: [],
  qrcodes: [],
}

// Global database instance
let db: Database = JSON.parse(JSON.stringify(defaultDB))

// Database operations
export const database = {
  // Users
  createUser: (user: User): User => {
    const newUser: User = {
      ...user,
      _id: `user_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.users.push(newUser)
    return newUser
  },

  getUserByEmail: (email: string): User | undefined => {
    return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  },

  getUserById: (id: string): User | undefined => {
    return db.users.find((u) => u._id === id)
  },

  getAllUsers: (): User[] => {
    return db.users
  },

  updateUser: (id: string, updates: Partial<User>): User | null => {
    const index = db.users.findIndex((u) => u._id === id)
    if (index === -1) return null
    db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date() }
    return db.users[index]
  },

  deleteUser: (id: string): boolean => {
    const index = db.users.findIndex((u) => u._id === id)
    if (index === -1) return false
    db.users.splice(index, 1)
    return true
  },

  // Members
  createMember: (member: Member): Member => {
    const nextIdNumber = 1001 + db.members.length;
    const memberIdNumber = `GYM-${nextIdNumber}`;

    const newMember: Member = {
      ...member,
      _id: `member_${Date.now()}`,
      memberIdNumber,
      joinDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.members.push(newMember)
    return newMember
  },

  getMemberById: (id: string): Member | undefined => {
    return db.members.find((m) => m._id === id)
  },

  getAllMembers: (): Member[] => {
    return db.members
  },

  updateMember: (id: string, updates: Partial<Member>): Member | null => {
    const index = db.members.findIndex((m) => m._id === id)
    if (index === -1) return null
    db.members[index] = { ...db.members[index], ...updates, updatedAt: new Date() }
    return db.members[index]
  },

  deleteMember: (id: string): boolean => {
    const index = db.members.findIndex((m) => m._id === id)
    if (index === -1) return false
    db.members.splice(index, 1)
    return true
  },

  // Trainers
  createTrainer: (trainer: Trainer): Trainer => {
    const newTrainer: Trainer = {
      ...trainer,
      _id: `trainer_${Date.now()}`,
      assignedMembers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.trainers.push(newTrainer)
    return newTrainer
  },

  getTrainerById: (id: string): Trainer | undefined => {
    return db.trainers.find((t) => t._id === id)
  },

  getAllTrainers: (): Trainer[] => {
    return db.trainers
  },

  updateTrainer: (id: string, updates: Partial<Trainer>): Trainer | null => {
    const index = db.trainers.findIndex((t) => t._id === id)
    if (index === -1) return null
    db.trainers[index] = { ...db.trainers[index], ...updates, updatedAt: new Date() }
    return db.trainers[index]
  },

  deleteTrainer: (id: string): boolean => {
    const index = db.trainers.findIndex((t) => t._id === id)
    if (index === -1) return false
    db.trainers.splice(index, 1)
    return true
  },

  // Memberships
  createMembership: (membership: Membership): Membership => {
    const newMembership: Membership = {
      ...membership,
      _id: `membership_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.memberships.push(newMembership)
    return newMembership
  },

  getMembershipById: (id: string): Membership | undefined => {
    return db.memberships.find((m) => m._id === id)
  },

  getMembershipsByMemberId: (memberId: string): Membership[] => {
    return db.memberships.filter((m) => m.memberId === memberId)
  },

  getAllMemberships: (): Membership[] => {
    return db.memberships
  },

  updateMembership: (id: string, updates: Partial<Membership>): Membership | null => {
    const index = db.memberships.findIndex((m) => m._id === id)
    if (index === -1) return null
    db.memberships[index] = {
      ...db.memberships[index],
      ...updates,
      updatedAt: new Date(),
    }
    return db.memberships[index]
  },

  // Membership Types
  getMembershipTypes: (): MembershipType[] => {
    return db.membershipTypes
  },

  // Attendance
  createAttendance: (attendance: Attendance): Attendance => {
    const newAttendance: Attendance = {
      ...attendance,
      _id: `attendance_${Date.now()}`,
      date: new Date(attendance.date),
      createdAt: new Date(),
    }
    db.attendance.push(newAttendance)
    return newAttendance
  },

  createAttendanceRecord: (record: { memberId: string; attendanceTime: string }): any => {
    const newRecord = {
      _id: `attendance_${Date.now()}`,
      memberId: record.memberId,
      attendanceTime: record.attendanceTime,
      createdAt: new Date(),
    }
    db.attendance.push(newRecord as any)
    return newRecord
  },

  getAttendanceRecords: (memberId: string | null, fromDate: string | null, toDate: string | null): any[] => {
    let records = db.attendance

    if (memberId) {
      records = records.filter((a: any) => a.memberId === memberId)
    }

    if (fromDate && toDate) {
      const [fy, fm, fd] = fromDate.split('-').map(Number)
      const fromDateObj = new Date(fy, fm - 1, fd)
      fromDateObj.setHours(0, 0, 0, 0)
      const from = fromDateObj.getTime()

      const [ty, tm, td] = toDate.split('-').map(Number)
      const toDateObj = new Date(ty, tm - 1, td)
      toDateObj.setHours(23, 59, 59, 999)
      const to = toDateObj.getTime()
      
      records = records.filter((a: any) => {
        const time = new Date(a.attendanceTime || a.date).getTime()
        return time >= from && time <= to
      })
    }

    return records
  },

  getAttendanceByMemberId: (memberId: string): Attendance[] => {
    return db.attendance.filter((a) => a.memberId === memberId)
  },

  getAllAttendance: (): Attendance[] => {
    return db.attendance
  },

  updateAttendance: (id: string, updates: Partial<Attendance>): Attendance | null => {
    const index = db.attendance.findIndex((a) => a._id === id)
    if (index === -1) return null
    db.attendance[index] = { ...db.attendance[index], ...updates }
    return db.attendance[index]
  },

  getMemberStreak: (memberId: string): number => {
    const records = db.attendance.filter((a) => a.memberId === memberId)
    if (records.length === 0) return 0

    const dates = new Set<string>()
    records.forEach((r) => {
      const dateObj = new Date(r.attendanceTime || r.date || new Date())
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
      dates.add(dateStr)
    })

    const uniqueDates = Array.from(dates).sort((a, b) => b.localeCompare(a))
    if (uniqueDates.length === 0) return 0

    let streak = 0
    const todayObj = new Date()
    const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`
    
    // Check if the latest attendance is from today or yesterday
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    
    if (uniqueDates[0] !== todayStr) {
      // Latest attendance is not today. Check if it was yesterday.
      currentDate.setDate(currentDate.getDate() - 1)
      const yesterdayStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      
      if (uniqueDates[0] !== yesterdayStr) {
        return 0 // Missed both yesterday and today
      }
    }

    // Now iterate backwards
    for (const dStr of uniqueDates) {
      const expectedStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      
      if (dStr === expectedStr) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  },

  // Payments
  createPayment: (payment: Payment): Payment => {
    const newPayment: Payment = {
      ...payment,
      _id: `payment_${Date.now()}`,
      createdAt: new Date(),
    }
    db.payments.push(newPayment)
    return newPayment
  },

  getPaymentsByMemberId: (memberId: string): Payment[] => {
    return db.payments.filter((p) => p.memberId === memberId)
  },

  getAllPayments: (): Payment[] => {
    return db.payments
  },

  // Progress
  createProgress: (progress: Progress): Progress => {
    const newProgress: Progress = {
      ...progress,
      _id: `progress_${Date.now()}`,
      date: new Date(progress.date),
      createdAt: new Date(),
    }
    db.progress.push(newProgress)
    return newProgress
  },

  createProgressRecord: (record: {
    memberId: string
    weight?: number
    bodyFat?: number
    benchPress?: number
    squatMax?: number
    notes?: string
    recordDate: string
  }): any => {
    const newRecord = {
      _id: `progress_${Date.now()}`,
      memberId: record.memberId,
      weight: record.weight,
      bodyFat: record.bodyFat,
      benchPress: record.benchPress,
      squatMax: record.squatMax,
      notes: record.notes,
      recordDate: record.recordDate,
      createdAt: new Date(),
    }
    db.progress.push(newRecord as any)
    return newRecord
  },

  getProgressRecords: (memberId: string): any[] => {
    return db.progress.filter((p: any) => p.memberId === memberId)
  },

  getProgressByMemberId: (memberId: string): Progress[] => {
    return db.progress.filter((p) => p.memberId === memberId)
  },

  getAllProgress: (): Progress[] => {
    return db.progress
  },

  // Notifications
  createNotification: (notification: Notification): Notification => {
    const newNotification: Notification = {
      ...notification,
      _id: `notification_${Date.now()}`,
      createdAt: new Date(),
    }
    db.notifications.push(newNotification)
    return newNotification
  },

  getNotificationsByUserId: (userId: string): Notification[] => {
    return db.notifications.filter((n) => n.userId === userId)
  },

  updateNotification: (id: string, updates: Partial<Notification>): Notification | null => {
    const index = db.notifications.findIndex((n) => n._id === id)
    if (index === -1) return null
    db.notifications[index] = { ...db.notifications[index], ...updates }
    return db.notifications[index]
  },

  // QR Codes
  createQRCode: (qrcode: QRCode): QRCode => {
    const newQRCode: QRCode = {
      ...qrcode,
      _id: `qrcode_${Date.now()}`,
      createdAt: new Date(),
    }
    db.qrcodes.push(newQRCode)
    return newQRCode
  },

  getQRCodeByMemberId: (memberId: string): QRCode | undefined => {
    return db.qrcodes.find((q) => q.memberId === memberId)
  },

  // Reset database (for testing)
  reset: (): void => {
    db = JSON.parse(JSON.stringify(defaultDB))
  },

  // Get entire database
  getDatabase: (): Database => {
    return db
  },
}

export default database
