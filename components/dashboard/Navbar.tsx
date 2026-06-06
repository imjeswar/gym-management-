'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  Dumbbell,
  Users,
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  Cog,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES, ROLE_LABELS } from '@/lib/constants'

interface NavbarProps {
  userName?: string
  userRole?: string
  onSidebarToggle?: (open: boolean) => void
}

export function Navbar({ userName = 'User', userRole = 'member', onSidebarToggle }: NavbarProps) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push(ROUTES.HOME)
  }

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: ROUTES.DASHBOARD },
    { icon: Users, label: 'Members', href: ROUTES.MEMBERS },
    { icon: Cog, label: 'Trainers', href: ROUTES.TRAINERS },
    { icon: Calendar, label: 'Attendance', href: ROUTES.ATTENDANCE },
    { icon: Users, label: 'Memberships', href: ROUTES.MEMBERSHIPS },
    { icon: DollarSign, label: 'Payments', href: ROUTES.PAYMENTS },
    { icon: TrendingUp, label: 'Progress Tracker', href: ROUTES.PROGRESS },
    { icon: BarChart3, label: 'Analytics', href: ROUTES.ANALYTICS },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="hidden text-xl font-bold tracking-widest text-foreground uppercase sm:inline">FITZONE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Notification Bell */}
            <Link
              href={ROUTES.NOTIFICATIONS}
              className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-input hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-input"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                <span className="hidden sm:inline">{userName}</span>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card/80 backdrop-blur shadow-lg"
                >
                  <div className="border-b border-border/50 px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">{ROLE_LABELS[userRole as keyof typeof ROLE_LABELS]}</p>
                  </div>
                  <div className="space-y-1 p-2">
                    <Link
                      href={ROUTES.SETTINGS}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-input"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-input"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => onSidebarToggle?.(!showMenu)}
              className="rounded-lg p-2 text-foreground md:hidden hover:bg-input"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
