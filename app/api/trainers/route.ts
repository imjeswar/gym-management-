import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async () => {
    try {
      const trainers = database.getAllTrainers()
      return createResponse(true, 'Trainers retrieved successfully', trainers)
    } catch (error) {
      console.error('Get trainers error:', error)
      return createResponse(false, 'Failed to retrieve trainers', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}

export async function POST(req: NextRequest) {
  return protectedRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { name, email, specialty, yearsOfExperience, phoneNumber } = body

      if (!name || !email) {
        return createResponse(false, 'Name and email are required', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const newTrainer = database.createTrainer({
        name,
        email,
        password: '',
        specialty,
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        phoneNumber,
        role: 'trainer',
      })

      return createResponse(true, 'Trainer created successfully', newTrainer, HTTP_STATUS.CREATED)
    } catch (error) {
      console.error('Create trainer error:', error)
      return createResponse(false, 'Failed to create trainer', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}
