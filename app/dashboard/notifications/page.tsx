'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Trash2, Check } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'membership-expiry',
      title: 'Membership Expiring Soon',
      message: '5 members have memberships expiring in the next 7 days',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      icon: 'warning',
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Low Attendance Alert',
      message: 'Attendance was 30% below average on Sunday',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      icon: 'alert',
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $450 received from John Doe',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
      icon: 'success',
    },
    {
      id: 4,
      type: 'new-member',
      title: 'New Member Registered',
      message: 'Jane Smith has registered as a new member',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      read: true,
      icon: 'info',
    },
    {
      id: 5,
      type: 'trainer',
      title: 'New Trainer Application',
      message: 'Mark Johnson has applied to become a trainer',
      timestamp: new Date(Date.now() - 1000 * 60 * 300),
      read: true,
      icon: 'info',
    },
  ])

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'membership-expiry':
      case 'attendance':
        return 'from-orange-500/20 to-orange-500/5 border-orange-500/20'
      case 'payment':
        return 'from-green-500/20 to-green-500/5 border-green-500/20'
      default:
        return 'from-blue-500/20 to-blue-500/5 border-blue-500/20'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#0F172A] py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground">Notifications</h1>
            <p className="mt-2 text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Bell className="h-6 w-6 text-primary" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        {unreadCount > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex gap-2">
            <button
              onClick={markAllAsRead}
              className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              Mark all as read
            </button>
          </motion.div>
        )}

        {/* Notifications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/50 p-12 text-center backdrop-blur">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No notifications yet. You&apos;re all set!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                className={`group rounded-2xl border bg-gradient-to-r ${getNotificationColor(
                  notification.type
                )} p-4 backdrop-blur transition-all hover:border-opacity-100`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-lg bg-white/10 p-2">
                    <Bell className="h-5 w-5 text-secondary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="ml-2 h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="rounded-lg bg-white/10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="rounded-lg bg-white/10 p-2 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
