'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { database } from '@/lib/db'
import type { Member, Payment } from '@/types'

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

export default function PaymentsPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'credit_card' as const,
    description: '',
  })

  useEffect(() => {
    setMembers(database.getAllMembers())
    setPayments(database.getAllPayments())
  }, [])

  const getMemberPayments = (memberId: string): Payment[] => {
    return payments.filter((p) => p.memberId === memberId)
  }

  const getTotalRevenue = (): number => {
    return payments.reduce((total, p) => {
      if (p.status === 'success') {
        return total + (p.amount || 0)
      }
      return total
    }, 0)
  }

  const getPendingPayments = (): number => {
    return payments.filter((p) => p.status === 'pending').length
  }

  const getSuccessfulPayments = (): number => {
    return payments.filter((p) => p.status === 'success').length
  }

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember || !formData.amount) return

    const payment = database.createPayment({
      memberId: selectedMember,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      status: 'success',
      transactionId: `TXN_${Date.now()}`,
      description: formData.description || 'Membership payment',
      isDemo: false,
    })

    setPayments([...payments, payment])
    setFormData({
      amount: '',
      paymentMethod: 'credit_card',
      description: '',
    })
    setSelectedMember('')
    setIsCreatingPayment(false)
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPaymentMethodLabel = (method: string): string => {
    const methods: Record<string, string> = {
      credit_card: 'Credit Card',
      upi: 'UPI',
      net_banking: 'Net Banking',
      cash: 'Cash',
    }
    return methods[method] || method
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
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage member payments and track revenue</p>
        </div>
        <button
          onClick={() => setIsCreatingPayment(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
        >
          <Plus className="h-5 w-5" />
          Record Payment
        </button>
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
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground">${getTotalRevenue().toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Successful Payments</p>
              <p className="text-3xl font-bold text-foreground">{getSuccessfulPayments()}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-3xl font-bold text-foreground">{getPendingPayments()}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </motion.div>
      </motion.div>

      {/* Create Payment Modal */}
      {isCreatingPayment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 backdrop-blur"
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground">Record Payment</h2>
            <form onSubmit={handleCreatePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Select Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Choose a member...</option>
                  {members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Amount ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  step="0.01"
                  required
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: e.target.value as any,
                    })
                  }
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="upi">UPI</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Payment description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingPayment(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-input"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Members & Payments List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input/50 pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
          />
        </motion.div>

        <div className="space-y-4">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => {
              const memberPayments = getMemberPayments(member._id || '')
              const totalPaid = memberPayments.reduce((sum, p) => sum + (p.amount || 0), 0)

              return (
                <motion.div
                  key={member._id}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                      <div>
                        <p className="font-semibold text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="text-lg font-bold text-primary">${totalPaid.toFixed(2)}</p>
                    </div>
                  </div>

                  {memberPayments.length > 0 && (
                    <div className="space-y-2 border-t border-border/50 pt-4">
                      {memberPayments.slice(-3).map((payment) => (
                        <div key={payment._id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">{getPaymentMethodLabel(payment.paymentMethod)}</span>
                          </div>
                          <span className="font-semibold text-foreground">${payment.amount?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? 'No members found.' : 'No members available.'}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
