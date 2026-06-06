'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react'
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

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    height: '',
    weight: '',
    fitnessGoal: '',
  })

  useEffect(() => {
    const allMembers = database.getAllMembers()
    setMembers(allMembers)
  }, [])

  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newMember = database.createMember({
        ...formData,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        password: '',
        role: 'member',
      })
      setMembers([...members, newMember])
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        height: '',
        weight: '',
        fitnessGoal: '',
      })
      setIsAddingMember(false)
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      database.deleteMember(id)
      setMembers(members.filter((m) => m._id !== id))
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
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground">Manage your gym members and their profiles</p>
        </div>
        <button
          onClick={() => setIsAddingMember(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
        >
          <Plus className="h-5 w-5" />
          Add Member
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search members by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-input/50 pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </motion.div>

      {/* Add Member Modal */}
      {isAddingMember && (
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
            <h2 className="mb-4 text-2xl font-bold text-foreground">Add New Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Fitness Goal"
                value={formData.fitnessGoal}
                onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingMember(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-input"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Add Member
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Members Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <motion.div key={member._id} variants={itemVariants} className="group">
              <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-card/80">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                  <div className="flex gap-2">
                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-input hover:text-foreground">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => member._id && handleDeleteMember(member._id)}
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-4 space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.membershipStatus || 'pending'}</p>
                  </div>

                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </div>
                  )}

                  {member.phoneNumber && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {member.phoneNumber}
                    </div>
                  )}

                  {member.fitnessGoal && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {member.fitnessGoal}
                    </div>
                  )}
                </div>

                {/* Stats */}
                {(member.height || member.weight) && (
                  <div className="border-t border-border/50 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {member.height && (
                        <div>
                          <p className="text-xs text-muted-foreground">Height</p>
                          <p className="font-semibold text-foreground">{member.height} cm</p>
                        </div>
                      )}
                      {member.weight && (
                        <div>
                          <p className="text-xs text-muted-foreground">Weight</p>
                          <p className="font-semibold text-foreground">{member.weight} kg</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants} className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No members found matching your search.' : 'No members yet. Add your first member!'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
