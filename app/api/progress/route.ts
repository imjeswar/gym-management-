import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async () => {
    try {
      const searchParams = req.nextUrl.searchParams
      const memberId = searchParams.get('memberId')

      if (!memberId) {
        return createResponse(false, 'Member ID is required', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const progressRecords = database.getProgressRecords(memberId)
      return createResponse(true, 'Progress records retrieved successfully', progressRecords)
    } catch (error) {
      console.error('Get progress error:', error)
      return createResponse(false, 'Failed to retrieve progress records', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}

export async function POST(req: NextRequest) {
  return protectedRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { memberId, weight, bodyFat, benchPress, squatMax, notes } = body

      if (!memberId) {
        return createResponse(false, 'Member ID is required', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const record = database.createProgressRecord({
        memberId,
        weight,
        bodyFat,
        benchPress,
        squatMax,
        notes,
        recordDate: new Date().toISOString(),
      })

      return createResponse(true, 'Progress recorded successfully', record, HTTP_STATUS.CREATED)
    } catch (error) {
      console.error('Create progress error:', error)
      return createResponse(false, 'Failed to record progress', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}
