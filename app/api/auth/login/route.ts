import { NextRequest } from 'next/server'
import { publicRoute, createResponse, validateEmail } from '@/lib/api-handler'
import { verifyPassword, generateToken } from '@/lib/auth'
import { database } from '@/lib/db'
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants'

export async function POST(req: NextRequest) {
  return publicRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { email, password } = body

      // Validation
      if (!email || !password) {
        return createResponse(
          false,
          'Email and password are required',
          undefined,
          HTTP_STATUS.BAD_REQUEST
        )
      }

      if (!validateEmail(email)) {
        return createResponse(
          false,
          'Invalid email format',
          undefined,
          HTTP_STATUS.BAD_REQUEST
        )
      }

      // Find user
      const user = database.getUserByEmail(email)
      if (!user) {
        return createResponse(
          false,
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          undefined,
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return createResponse(
          false,
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          undefined,
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      // Generate token
      const token = generateToken({
        userId: user._id!,
        email: user.email,
        role: user.role,
      })

      return createResponse(
        true,
        SUCCESS_MESSAGES.LOGIN_SUCCESS,
        {
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
        HTTP_STATUS.OK
      )
    } catch (error) {
      console.error('Login error:', error)
      return createResponse(
        false,
        ERROR_MESSAGES.INTERNAL_ERROR,
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  })
}
