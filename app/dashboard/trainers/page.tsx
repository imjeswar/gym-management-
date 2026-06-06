'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Award, Users } from 'lucide-react'
import { database } from '@/lib/db'
import type { Trainer } from '@/types'

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

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingTrainer, setIsAddingTrainer] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    yearsOfExperience: '',
    phoneNumber: '',
  })

  useEffect(() => {
    const allTrainers = database.getAllTrainers()
    setTrainers(allTrainers)
  }, [])

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTrainer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newTrainer = database.createTrainer({
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        password: '',
        role: 'trainer',
      })
      setTrainers([...trainers, newTrainer])
      setFormData({
        name: '',
        email: '',
        specialty: '',
        yearsOfExperience: '',
        phoneNumber: '',
      })
      setIsAddingTrainer(false)
    } catch (error) {
      console.error('Error adding trainer:', error)
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
          <h1 className="text-3xl font-bold text-foreground">Trainers</h1>
          <p className="text-muted-foreground">Manage your gym trainers and their assignments</p>
        </div>
        <button
          onClick={() => setIsAddingTrainer(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
        >
          <Plus className="h-5 w-5" />
          Add Trainer
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
          placeholder="Search trainers by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-input/50 pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </motion.div>

      {/* Add Trainer Modal */}
      {isAddingTrainer && (
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
            <h2 className="mb-4 text-2xl font-bold text-foreground">Add New Trainer</h2>
            <form onSubmit={handleAddTrainer} className="space-y-4">
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
                placeholder="Specialty (e.g., Strength Training)"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="number"
                placeholder="Years of Experience"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full rounded-lg border border-border bg-input/50 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingTrainer(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-input"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Trainers Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredTrainers.length > 0 ? (
          filteredTrainers.map((trainer) => (
            <motion.div key={trainer._id} variants={itemVariants} className="group">
              <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur transition-all hover:border-secondary/50 hover:bg-card/80">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-accent" />
                </div>

                {/* Info */}
                <div className="mb-4 space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">{trainer.name}</p>
                    {trainer.specialty && <p className="text-sm text-secondary">{trainer.specialty}</p>}
                  </div>

                  {trainer.email && <p className="text-sm text-muted-foreground">{trainer.email}</p>}

                  {trainer.phoneNumber && (
                    <p className="text-sm text-muted-foreground">{trainer.phoneNumber}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="border-t border-border/50 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-semibold text-foreground">{trainer.yearsOfExperience || 0} yrs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Members</p>
                        <p className="font-semibold text-foreground">{trainer.assignedMembers?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants} className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No trainers found matching your search.' : 'No trainers yet. Add your first trainer!'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
