import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromHeader } from './auth'
import { HTTP_STATUS, ERROR_MESSAGES } from './constants'
import type { DecodedToken, ApiResponse } from '@/types'

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiContext {
  user?: DecodedToken
  params?: Record<string, string>
  searchParams?: Record<string, string | string[]>
}

export function createResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success,
      message,
      data,
      error: !success ? message : undefined,
    },
    { status }
  )
}

export async function authenticateRequest(
  req: NextRequest
): Promise<DecodedToken | null> {
  const authHeader = req.headers.get('authorization')
  const token = getTokenFromHeader(authHeader)

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  return decoded
}

export async function protectedRoute(
  req: NextRequest,
  handler: (
    req: NextRequest,
    context: ApiContext
  ) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const user = await authenticateRequest(req)

    if (!user) {
      return createResponse(
        false,
        ERROR_MESSAGES.UNAUTHORIZED,
        undefined,
        HTTP_STATUS.UNAUTHORIZED
      )
    }

    return await handler(req, { user })
  } catch (error) {
    console.error('[API Error]', error)
    return createResponse(
      false,
      ERROR_MESSAGES.INTERNAL_ERROR,
      undefined,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  }
}

export async function publicRoute(
  req: NextRequest,
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler(req, {})
  } catch (error) {
    console.error('[API Error]', error)
    return createResponse(
      false,
      ERROR_MESSAGES.INTERNAL_ERROR,
      undefined,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}
