'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Bell, Lock, User, Building2, Moon, Sun } from 'lucide-react'

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

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@fitflow.com',
    phone: '+1 (555) 123-4567',
    gymName: 'FitFlow Downtown',
    gymAddress: '123 Main St, New York, NY 10001',
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    attendanceReminders: true,
    membershipExpiry: true,
    paymentReminders: true,
    systemAlerts: true,
  })

  const [saved, setSaved] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'gym', label: 'Gym Settings', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#0F172A] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex gap-2 border-b border-border"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400"
          >
            Settings saved successfully!
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gym Settings Tab */}
        {activeTab === 'gym' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Gym Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Gym Name</label>
                  <input
                    type="text"
                    name="gymName"
                    value={formData.gymName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <textarea
                    name="gymAddress"
                    value={formData.gymAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  {
                    key: 'emailNotifications',
                    label: 'Email Notifications',
                    description: 'Receive email updates about your gym',
                  },
                  {
                    key: 'attendanceReminders',
                    label: 'Attendance Reminders',
                    description: 'Get notified about low attendance rates',
                  },
                  {
                    key: 'membershipExpiry',
                    label: 'Membership Expiry Alerts',
                    description: 'Be reminded when member memberships are about to expire',
                  },
                  {
                    key: 'paymentReminders',
                    label: 'Payment Reminders',
                    description: 'Get notified about pending payments',
                  },
                  {
                    key: 'systemAlerts',
                    label: 'System Alerts',
                    description: 'Important system and security notifications',
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                      className={`relative h-6 w-11 rounded-full transition-all ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-5'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Active Sessions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="font-medium text-foreground">Current Session</p>
                    <p className="text-sm text-muted-foreground">Chrome on macOS</p>
                  </div>
                  <button className="text-sm font-medium text-muted-foreground hover:text-destructive">Logout</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  )
}
