import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return protectedRoute(req, async () => {
    try {
      const { id } = await params
      const member = database.getMemberById(id)

      if (!member) {
        return createResponse(
          false,
          ERROR_MESSAGES.MEMBER_NOT_FOUND,
          undefined,
          HTTP_STATUS.NOT_FOUND
        )
      }

      return createResponse(true, 'Member retrieved successfully', member)
    } catch (error) {
      console.error('Get member error:', error)
      return createResponse(
        false,
        'Failed to retrieve member',
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return protectedRoute(req, async (request) => {
    try {
      const { id } = await params
      const body = await request.json()

      const member = database.getMemberById(id)
      if (!member) {
        return createResponse(
          false,
          ERROR_MESSAGES.MEMBER_NOT_FOUND,
          undefined,
          HTTP_STATUS.NOT_FOUND
        )
      }

      const updated = database.updateMember(id, body)

      return createResponse(true, SUCCESS_MESSAGES.MEMBER_UPDATED, updated)
    } catch (error) {
      console.error('Update member error:', error)
      return createResponse(
        false,
        'Failed to update member',
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return protectedRoute(req, async () => {
    try {
      const { id } = await params
      const member = database.getMemberById(id)

      if (!member) {
        return createResponse(
          false,
          ERROR_MESSAGES.MEMBER_NOT_FOUND,
          undefined,
          HTTP_STATUS.NOT_FOUND
        )
      }

      const deleted = database.deleteMember(id)

      if (!deleted) {
        return createResponse(
          false,
          'Failed to delete member',
          undefined,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        )
      }

      return createResponse(true, SUCCESS_MESSAGES.MEMBER_DELETED)
    } catch (error) {
      console.error('Delete member error:', error)
      return createResponse(
        false,
        'Failed to delete member',
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  })
}
