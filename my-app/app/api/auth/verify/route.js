import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(req) {
  try {
    const { token } = await req.json()

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    // Update user verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verifyToken: null,
        verifyTokenExpiry: null
      }
    })

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name)

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { message: "Error verifying email" },
      { status: 500 }
    )
  }
}
