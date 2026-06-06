import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async (request, context) => {
    if (!context.user) {
      return createResponse(
        false,
        'Invalid token',
        undefined,
        HTTP_STATUS.UNAUTHORIZED
      )
    }

    const user = database.getUserById(context.user.userId)
    if (!user) {
      return createResponse(
        false,
        'User not found',
        undefined,
        HTTP_STATUS.UNAUTHORIZED
      )
    }

    return createResponse(
      true,
      'Token is valid',
      {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      HTTP_STATUS.OK
    )
  })
}
