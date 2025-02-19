import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    const userId = session.user.id

    const [
      consultationsCount,
      upcomingAppointmentsCount,
      messagesCount,
      completedConsultations
    ] = await Promise.all([
      prisma.consultation.count({ 
        where: { userId } 
      }),
      prisma.appointment.count({
        where: {
          userId,
          datetime: { gte: new Date() },
          status: "SCHEDULED"
        }
      }),
      prisma.message.count({
        where: {
          consultation: { userId }
        }
      }),
      prisma.consultation.count({
        where: {
          userId,
          status: "COMPLETED"
        }
      })
    ])

    const completionRate = consultationsCount > 0
      ? Math.round((completedConsultations / consultationsCount) * 100)
      : 0

    return NextResponse.json({
      consultations: consultationsCount,
      upcomingAppointments: upcomingAppointmentsCount,
      totalMessages: messagesCount,
      completionRate
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    )
  }
}
