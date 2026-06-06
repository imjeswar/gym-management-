export const APP_NAME = 'FitFlow'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const API_BASE_URL = `${APP_URL}/api`

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/dashboard/admin',
  MEMBERS: '/dashboard/members',
  TRAINERS: '/dashboard/trainers',
  ATTENDANCE: '/dashboard/attendance',
  MEMBERSHIPS: '/dashboard/memberships',
  PAYMENTS: '/dashboard/payments',
  PROGRESS: '/dashboard/progress',
  ANALYTICS: '/dashboard/analytics',
  SETTINGS: '/dashboard/settings',
  NOTIFICATIONS: '/dashboard/notifications',
  TRAINER_DASHBOARD: '/dashboard/trainer',
}

export const MEMBERSHIP_TYPES = [
  {
    id: 'monthly',
    name: 'Monthly',
    duration: 1,
    price: 99,
    features: ['Unlimited gym access', 'Basic support'],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    duration: 3,
    price: 249,
    features: ['Unlimited gym access', 'Priority support', 'Free assessment'],
  },
  {
    id: 'half_yearly',
    name: 'Half-Yearly',
    duration: 6,
    price: 449,
    features: ['Unlimited gym access', 'Priority support', 'Free assessment', '1 trainer session/month'],
  },
  {
    id: 'yearly',
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
]

export const COLORS = {
  primary: '#7C3AED', // Purple
  secondary: '#06B6D4', // Cyan
  accent: '#22C55E', // Green
  background: '#020617',
  foreground: '#F8FAFC',
  muted: '#475569',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
}

export const PAYMENT_METHODS = [
  { id: 'credit_card', name: 'Credit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'net_banking', name: 'Net Banking', icon: '🏦' },
]

export const USER_ROLES = {
  ADMIN: 'admin' as const,
  TRAINER: 'trainer' as const,
  MEMBER: 'member' as const,
}

export const ROLE_LABELS = {
  admin: 'Administrator',
  trainer: 'Trainer',
  member: 'Member',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'Email already registered',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid or expired token',
  INTERNAL_ERROR: 'Internal server error',
  MEMBER_NOT_FOUND: 'Member not found',
  TRAINER_NOT_FOUND: 'Trainer not found',
}

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Account created successfully',
  MEMBER_CREATED: 'Member added successfully',
  MEMBER_UPDATED: 'Member updated successfully',
  MEMBER_DELETED: 'Member deleted successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully (Demo)',
  ATTENDANCE_CHECKED_IN: 'Checked in successfully',
  ATTENDANCE_CHECKED_OUT: 'Checked out successfully',
}

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
}
