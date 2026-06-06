'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, Flame, Activity, User, ActivitySquare } from 'lucide-react'
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

interface ProgressData {
  memberId: string
  weight?: number
  bodyFat?: number
  benchPress?: number
  squatMax?: number
  notes?: string
  recordDate: string
}

export default function ProgressPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isAddingProgress, setIsAddingProgress] = useState(false)
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    benchPress: '',
    squatMax: '',
    notes: '',
  })

  useEffect(() => {
    // Re-fetch members in case they were updated
    setMembers(database.getAllMembers())
  }, [])

  const handleAddProgress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember || !selectedMember._id) return

    const progressRecord: ProgressData = {
      memberId: selectedMember._id,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
      benchPress: formData.benchPress ? parseFloat(formData.benchPress) : undefined,
      squatMax: formData.squatMax ? parseFloat(formData.squatMax) : undefined,
      notes: formData.notes,
      recordDate: new Date().toISOString(),
    }

    database.createProgressRecord(progressRecord as any)

    setFormData({
      weight: '',
      bodyFat: '',
      benchPress: '',
      squatMax: '',
      notes: '',
    })
    setIsAddingProgress(false)
    setSelectedMember(null)
    
    // Force a re-render to fetch the latest progress
    setMembers([...database.getAllMembers()])
  }

  const getLatestProgress = (memberId: string) => {
    const progress = database.getProgressRecords(memberId)
    if (progress.length === 0) return null
    return progress.sort((a, b) => new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime())[0]
  }

  const openAddModal = (member: Member) => {
    setSelectedMember(member)
    setIsAddingProgress(true)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Member Progress</h1>
          <p className="text-muted-foreground">Track stats and streaks for all members</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Member</th>
                  <th className="px-6 py-4 font-semibold text-foreground">ID</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Streak</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Latest Stats</th>
                  <th className="px-6 py-4 font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.length > 0 ? (
                  members.map((member) => {
                    const latestStats = member._id ? getLatestProgress(member._id) : null;
                    const streak = member._id ? database.getMemberStreak(member._id) : 0;
                    return (
                      <motion.tr variants={itemVariants} key={member._id} className="transition-colors hover:bg-input/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {member.memberIdNumber || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {streak > 0 ? (
                            <div className="flex items-center gap-1 text-orange-500 font-medium">
                              <Flame className="h-4 w-4" />
                              {streak} Days
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {latestStats ? (
                            <div className="flex flex-col gap-1 text-sm">
                              {latestStats.weight && <span className="text-foreground">Weight: {latestStats.weight}kg</span>}
                              {latestStats.bodyFat && <span className="text-foreground">Body Fat: {latestStats.bodyFat}%</span>}
                              {!latestStats.weight && !latestStats.bodyFat && <span className="text-muted-foreground">Recorded</span>}
                            </div>
                          ) : (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <ActivitySquare className="h-4 w-4" /> No stats yet
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openAddModal(member)}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                          >
                            <Plus className="h-4 w-4" />
                            Record
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No members found. Add some members to start tracking progress!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Progress Modal */}
      {isAddingProgress && selectedMember && (
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
            <h2 className="mb-4 text-2xl font-bold text-foreground">Record Progress</h2>
            <p className="mb-4 text-sm text-muted-foreground">For: {selectedMember.name} ({selectedMember.memberIdNumber || 'N/A'})</p>
            <form onSubmit={handleAddProgress} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="75.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  step="0.1"
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Body Fat (%)</label>
                <input
                  type="number"
                  placeholder="15.5"
                  value={formData.bodyFat}
                  onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                  step="0.1"
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Bench Press (kg)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.benchPress}
                    onChange={(e) => setFormData({ ...formData, benchPress: e.target.value })}
                    step="0.5"
                    className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Squat Max (kg)</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={formData.squatMax}
                    onChange={(e) => setFormData({ ...formData, squatMax: e.target.value })}
                    step="0.5"
                    className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Notes</label>
                <textarea
                  placeholder="Add any notes about this progress record..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none resize-none h-24"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingProgress(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-input"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Save Stats
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
