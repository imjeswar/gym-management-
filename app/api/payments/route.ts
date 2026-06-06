import { NextRequest } from 'next/server'
import { protectedRoute, createResponse } from '@/lib/api-handler'
import { database } from '@/lib/db'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '@/lib/constants'

export async function GET(req: NextRequest) {
  return protectedRoute(req, async () => {
    try {
      const searchParams = req.nextUrl.searchParams
      const memberId = searchParams.get('memberId')

      let payments
      if (memberId) {
        payments = database.getPaymentsByMemberId(memberId)
      } else {
        payments = database.getAllPayments()
      }

      return createResponse(true, 'Payments retrieved successfully', payments)
    } catch (error) {
      console.error('Get payments error:', error)
      return createResponse(false, 'Failed to retrieve payments', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}

export async function POST(req: NextRequest) {
  return protectedRoute(req, async (request) => {
    try {
      const body = await request.json()
      const { memberId, amount, paymentMethod, description } = body

      if (!memberId || !amount || !paymentMethod) {
        return createResponse(false, 'Missing required fields', undefined, HTTP_STATUS.BAD_REQUEST)
      }

      const payment = database.createPayment({
        memberId,
        amount: parseFloat(amount),
        paymentMethod,
        status: 'success',
        transactionId: `TXN_${Date.now()}`,
        description: description || 'Membership payment',
        isDemo: false,
      })

      return createResponse(true, SUCCESS_MESSAGES.PAYMENT_CREATED, payment, HTTP_STATUS.CREATED)
    } catch (error) {
      console.error('Create payment error:', error)
      return createResponse(false, 'Failed to create payment', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  })
}
