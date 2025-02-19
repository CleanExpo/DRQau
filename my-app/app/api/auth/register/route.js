import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      )
    }

    // Validate password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString("hex")
    const verifyTokenExpiry = new Date(Date.now() + 86400000) // 24 hours

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyToken,
        verifyTokenExpiry
      }
    })

    // Send verification email
    const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verifyToken}`
    await sendVerificationEmail(email, verifyUrl)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        message: "User created successfully. Please check your email to verify your account.",
        user: userWithoutPassword
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
}
