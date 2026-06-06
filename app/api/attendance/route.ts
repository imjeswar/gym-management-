import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async () => {
    try {
      const searchParams = req.nextUrl.searchParams
      const memberId = searchParams.get('memberId')
      const fromDate = searchParams.get('fromDate')
      const toDate = searchParams.get('toDate')

      const records = database.getAttendanceRecords(memberId, fromDate, toDate)
      return createResponse(true, 'Attendance records retrieved successfully', records)
    } catch (error) {
      console.error('Get attendance error:', error)
      return createResponse(false, 'Failed to retrieve attendance records', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}

export async function POST(req: NextRequest) {
  return protectedRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { memberId, attendanceTime } = body

      if (!memberId) {
        return createResponse(false, 'Member ID is required', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const record = database.createAttendanceRecord({
        memberId,
        attendanceTime: attendanceTime || new Date().toISOString(),
      })

      return createResponse(true, 'Attendance marked successfully', record, HTTP_STATUS.CREATED)
    } catch (error) {
      console.error('Create attendance error:', error)
      return createResponse(false, 'Failed to mark attendance', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}
