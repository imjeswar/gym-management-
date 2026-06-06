'use client'

import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/auth/AuthForm'
import { ROUTES } from '@/lib/constants'
import { useCallback } from 'react'

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = useCallback(
    async (data: Record<string, string>) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed')
      }

      // Store token
      localStorage.setItem('authToken', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))

      // Redirect based on role
      const redirectUrl =
        data.role === 'admin' || data.role === 'trainer'
          ? ROUTES.DASHBOARD
          : ROUTES.MEMBER_DASHBOARD || ROUTES.DASHBOARD

      setTimeout(() => router.push(redirectUrl), 1000)
    },
    [router]
  )

  return (
    <AuthForm
      title="Create Account"
      subtitle="Join FitFlow and start managing your gym"
      fields={[
        {
          name: 'name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
          required: true,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'At least 6 characters',
          required: true,
        },
        {
          name: 'role',
          label: 'I am a',
          type: 'select',
          required: true,
          options: [
            { value: 'admin', label: 'Gym Owner/Admin' },
            { value: 'trainer', label: 'Trainer' },
            { value: 'member', label: 'Member' },
          ],
        },
      ]}
      submitLabel="Create Account"
      footerText="Already have an account?"
      footerLink={{ text: 'Sign In', href: ROUTES.LOGIN }}
    />
  )
}
