export type UserRole = 'admin' | 'trainer' | 'member'

export interface User {
  _id?: string
  email: string
  password: string
  name: string
  role: UserRole
  phoneNumber?: string
  profileImage?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Member extends User {
  memberIdNumber?: string
  height?: number
  weight?: number
  bmi?: number
  fitnessGoal?: string
  joinDate?: Date
  membershipStatus?: 'active' | 'expired' | 'pending' | 'inactive'
  currentMembership?: string
  membershipPlan?: 'basic' | 'standard' | 'premium'
  membershipStartDate?: string
  membershipEndDate?: string
  membershipPrice?: number
}

export interface Trainer extends User {
  specialty?: string
  yearsOfExperience?: number
  assignedMembers?: string[]
  schedule?: ScheduleSlot[]
}

export interface MembershipType {
  _id?: string
  name: string
  duration: number // in months
  price: number
  features: string[]
  createdAt?: Date
}

export interface Membership {
  _id?: string
  memberId: string
  membershipTypeId: string
  startDate: Date
  endDate: Date
  status: 'active' | 'expired' | 'pending_renewal'
  isDemo?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Attendance {
  _id?: string
  memberId: string
  checkIn?: Date
  checkOut?: Date
  duration?: number // in minutes
  date?: Date
  attendanceTime?: string
  createdAt?: Date
}

export interface AttendanceRecord {
  _id?: string
  memberId: string
  attendanceTime: string
  createdAt?: Date
}

export interface Payment {
  _id?: string
  memberId: string
  amount: number
  paymentMethod: 'credit_card' | 'upi' | 'net_banking' | 'cash'
  status: 'success' | 'pending' | 'failed'
  transactionId: string
  description: string
  isDemo: boolean
  createdAt?: Date
}

export interface Progress {
  _id?: string
  memberId: string
  date: Date
  weight?: number
  bmi?: number
  measurement?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    legs?: number
  }
  notes?: string
  createdAt?: Date
}

export interface Milestone {
  _id?: string
  memberId: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  completed: boolean
  completedDate?: Date
  createdAt?: Date
}

export interface Notification {
  _id?: string
  userId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  link?: string
  createdAt?: Date
}

export interface ScheduleSlot {
  _id?: string
  day: string
  startTime: string
  endTime: string
  maxCapacity?: number
}

export interface QRCode {
  _id?: string
  memberId: string
  code: string
  createdAt?: Date
}

export interface DashboardMetrics {
  totalMembers: number
  activeMemberships: number
  totalRevenue: number
  totalTrainers: number
  attendanceRate: number
  membershipRenewals: number
  todayAttendance: number
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}
