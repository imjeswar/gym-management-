'use client'

import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/auth/AuthForm'
import { ROUTES } from '@/lib/constants'
import { useCallback } from 'react'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = useCallback(
    async (data: Record<string, string>) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Login failed')
      }

      // Store token and user data
      localStorage.setItem('authToken', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))

      // Redirect to dashboard
      setTimeout(() => router.push(ROUTES.DASHBOARD), 1000)
    },
    [router]
  )

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your FitFlow account"
      fields={[
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
          placeholder: 'Enter your password',
          required: true,
        },
      ]}
      submitLabel="Sign In"
      footerText="Don&apos;t have an account?"
      footerLink={{ text: 'Create one', href: ROUTES.SIGNUP }}
    />
  )
}
