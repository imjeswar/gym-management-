import { NextRequest } from 'next/server'
import { publicRoute, createResponse, validateEmail, validatePassword } from '@/lib/api-handler'
import { hashPassword, generateToken } from '@/lib/auth'
import { database } from '@/lib/db'
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants'

export async function POST(req: NextRequest) {
  return publicRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { email, password, name, role } = body

      // Validation
      if (!email || !password || !name || !role) {
        return createResponse(
          false,
          'Missing required fields',
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

      if (!validatePassword(password)) {
        return createResponse(
          false,
          'Password must be at least 6 characters',
          undefined,
          HTTP_STATUS.BAD_REQUEST
        )
      }

      // Check if user exists
      if (database.getUserByEmail(email)) {
        return createResponse(
          false,
          ERROR_MESSAGES.EMAIL_EXISTS,
          undefined,
          HTTP_STATUS.BAD_REQUEST
        )
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create user
      const user = database.createUser({
        email,
        password: hashedPassword,
        name,
        role: role as 'admin' | 'trainer' | 'member',
      })

      // Generate token
      const token = generateToken({
        userId: user._id!,
        email: user.email,
        role: user.role,
      })

      // If member role, also create member profile
      if (role === 'member') {
        database.createMember({
          ...user,
          membershipStatus: 'pending',
        })
      }

      // If trainer role, also create trainer profile
      if (role === 'trainer') {
        database.createTrainer({
          ...user,
          yearsOfExperience: 0,
        })
      }

      return createResponse(
        true,
        SUCCESS_MESSAGES.SIGNUP_SUCCESS,
        {
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
        HTTP_STATUS.CREATED
      )
    } catch (error) {
      console.error('Signup error:', error)
      return createResponse(
        false,
        ERROR_MESSAGES.INTERNAL_ERROR,
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  })
}
