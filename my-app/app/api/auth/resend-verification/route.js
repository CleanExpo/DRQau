import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a verification email has been sent." },
        { status: 200 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      )
    }

    // Generate new verification token
    const verifyToken = crypto.randomBytes(32).toString("hex")
    const verifyTokenExpiry = new Date(Date.now() + 86400000) // 24 hours

    // Update user with new token
    await prisma.user.update({
      where: { email },
      data: {
        verifyToken,
        verifyTokenExpiry
      }
    })

    // Send verification email
    const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verifyToken}`
    await sendVerificationEmail(email, verifyUrl)

    return NextResponse.json(
      { message: "If an account exists, a verification email has been sent." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { message: "Error sending verification email" },
      { status: 500 }
    )
  }
}
