'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Calendar, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import { database } from '@/lib/db'
import type { Member } from '@/types'

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

type MembershipPlan = 'basic' | 'standard' | 'premium'

const PLANS: Record<MembershipPlan, { name: string; price: number; duration: number; features: string[] }> = {
  basic: {
    name: 'Basic',
    price: 29.99,
    duration: 30,
    features: ['Gym access', 'Locker room', 'Basic equipment'],
  },
  standard: {
    name: 'Standard',
    price: 49.99,
    duration: 30,
    features: ['Gym access', 'All equipment', 'Group classes', 'Personal trainer consultation'],
  },
  premium: {
    name: 'Premium',
    price: 79.99,
    duration: 30,
    features: ['Unlimited gym access', 'All classes', 'Personal training', 'Nutritionist consultation', 'Priority support'],
  },
}

export default function MembershipsPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [showCreateMembership, setShowCreateMembership] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>('standard')

  useEffect(() => {
    const allMembers = database.getAllMembers()
    setMembers(allMembers)
  }, [])

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === 'all') return matchesSearch
    return matchesSearch && member.membershipStatus === filterStatus
  })

  const handleCreateMembership = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember) return

    const plan = PLANS[selectedPlan]
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + plan.duration)

    database.updateMember(selectedMember, {
      membershipStatus: 'active',
      membershipPlan: selectedPlan,
      membershipStartDate: startDate.toISOString(),
      membershipEndDate: endDate.toISOString(),
      membershipPrice: plan.price,
    })

    const updatedMembers = members.map((m) =>
      m._id === selectedMember
        ? {
            ...m,
            membershipStatus: 'active',
            membershipPlan: selectedPlan,
            membershipStartDate: startDate.toISOString(),
            membershipEndDate: endDate.toISOString(),
            membershipPrice: plan.price,
          }
        : m
    )
    setMembers(updatedMembers)
    setShowCreateMembership(false)
    setSelectedMember('')
  }

  const getMembershipDaysLeft = (member: Member) => {
    if (!member.membershipEndDate) return null
    const endDate = new Date(member.membershipEndDate)
    const today = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft > 0 ? daysLeft : 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'inactive':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'inactive':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Memberships</h1>
          <p className="text-muted-foreground">Manage member subscriptions and plans</p>
        </div>
        <button
          onClick={() => setShowCreateMembership(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
        >
          <Plus className="h-5 w-5" />
          New Membership
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input/50 pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
          className="rounded-lg border border-border bg-input/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </motion.div>

      {/* Create Membership Modal */}
      {showCreateMembership && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 backdrop-blur max-h-screen overflow-y-auto"
          >
            <h2 className="mb-6 text-2xl font-bold text-foreground">Create New Membership</h2>
            <form onSubmit={handleCreateMembership} className="space-y-6">
              {/* Member Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Select Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Choose a member...</option>
                  {members
                    .filter((m) => m.membershipStatus !== 'active')
                    .map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} ({member.email})
                      </option>
                    ))}
                </select>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Select Plan</label>
                <div className="grid gap-4 sm:grid-cols-3">
                  {Object.entries(PLANS).map(([key, plan]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPlan(key as MembershipPlan)}
                      className={`rounded-lg border-2 p-4 transition-all ${
                        selectedPlan === key
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-input/30 hover:border-primary/50'
                      }`}
                    >
                      <p className="font-semibold text-foreground">{plan.name}</p>
                      <p className="text-2xl font-bold text-primary">${plan.price}/mo</p>
                      <p className="text-xs text-muted-foreground">{plan.duration} days</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Details */}
              {selectedPlan && (
                <div className="rounded-lg border border-border/50 bg-input/30 p-4">
                  <h3 className="font-semibold text-foreground mb-3">{PLANS[selectedPlan].name} Plan Includes:</h3>
                  <ul className="space-y-2">
                    {PLANS[selectedPlan].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateMembership(false)
                    setSelectedMember('')
                  }}
                  className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-input"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Create Membership
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Memberships List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur">
          <div className="divide-y divide-border">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const plan = member.membershipPlan ? PLANS[member.membershipPlan as MembershipPlan] : null
                const daysLeft = getMembershipDaysLeft(member)
                return (
                  <motion.div
                    key={member._id}
                    variants={itemVariants}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-input/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-6">
                      {plan && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Plan</p>
                          <p className="font-semibold text-foreground">{plan.name}</p>
                        </div>
                      )}

                      {member.membershipPrice && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="flex items-center gap-1 font-semibold text-foreground">
                            <DollarSign className="h-4 w-4" />
                            {member.membershipPrice}
                          </p>
                        </div>
                      )}

                      {daysLeft !== null && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Days Left</p>
                          <p className="font-semibold text-foreground">{daysLeft} days</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {getStatusIcon(member.membershipStatus || 'pending')}
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className={`font-semibold capitalize ${getStatusColor(member.membershipStatus || 'pending')}`}>
                            {member.membershipStatus || 'pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm ? 'No memberships found matching your search.' : 'No memberships yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
