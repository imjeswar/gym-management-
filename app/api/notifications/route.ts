import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Return mock notifications
    const notifications = [
      {
        _id: 'notif_1',
        userId: user.id,
        title: 'New member signed up',
        message: 'John Smith has joined your gym',
        type: 'member',
        read: false,
        createdAt: new Date(Date.now() - 3600000),
      },
      {
        _id: 'notif_2',
        userId: user.id,
        title: 'Membership expiring soon',
        message: '5 members have memberships expiring within 7 days',
        type: 'membership',
        read: false,
        createdAt: new Date(Date.now() - 7200000),
      },
      {
        _id: 'notif_3',
        userId: user.id,
        title: 'Payment received',
        message: 'Payment of $500 received from Premium memberships',
        type: 'payment',
        read: true,
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        _id: 'notif_4',
        userId: user.id,
        title: 'Low attendance alert',
        message: '10 members have low attendance this week',
        type: 'attendance',
        read: true,
        createdAt: new Date(Date.now() - 172800000),
      },
    ]

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId } = body

    // Mark notification as read (mock implementation)
    return NextResponse.json({ success: true, notificationId })
  } catch (error) {
    console.error('Error marking notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
