import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async () => {
    try {
      const members = database.getAllMembers()
      return createResponse(true, 'Members retrieved successfully', members)
    } catch (error) {
      console.error('Get members error:', error)
      return createResponse(false, 'Failed to retrieve members', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}

export async function POST(req: NextRequest) {
  return protectedRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { name, email, phoneNumber, height, weight, fitnessGoal } = body

      if (!name || !email) {
        return createResponse(false, 'Name and email are required', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const newMember = database.createMember({
        name,
        email,
        password: '', // Members created by admin don't have passwords initially
        phoneNumber,
        height,
        weight,
        fitnessGoal,
        membershipStatus: 'pending',
        role: 'member',
      })

      return createResponse(true, SUCCESS_MESSAGES.MEMBER_CREATED, newMember, HTTP_STATUS.CREATED)
    } catch (error) {
      console.error('Create member error:', error)
      return createResponse(false, 'Failed to create member', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}
