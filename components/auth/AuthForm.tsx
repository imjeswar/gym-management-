'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface AuthFormProps {
  title: string
  subtitle: string
  fields: {
    name: string
    label: string
    type: 'email' | 'password' | 'text' | 'select'
    placeholder?: string
    required?: boolean
    options?: { value: string; label: string }[]
  }[]
  submitLabel: string
  onSubmit: (data: Record<string, string>) => Promise<void>
  footerText?: string
  footerLink?: { text: string; href: string }
}

export function AuthForm({
  title,
  subtitle,
  fields,
  submitLabel,
  onSubmit,
  footerText,
  footerLink,
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(formData)
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-[#0F172A] to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">FitFlow</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-accent/50 bg-accent/10 p-4 text-accent"
            >
              Success! Redirecting...
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full rounded-lg border border-border bg-input/50 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="relative">
                    <input
                      type={field.type === 'password' && showPassword ? 'text' : field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full rounded-lg border border-border bg-input/50 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    {field.type === 'password' && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {submitLabel}
            </button>
          </form>

          {/* Footer */}
          {footerText && footerLink && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footerText}{' '}
              <Link href={footerLink.href} className="text-primary hover:text-primary/80 font-medium transition-colors">
                {footerLink.text}
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
