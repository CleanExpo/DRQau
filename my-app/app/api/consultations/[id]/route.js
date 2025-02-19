import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"

export async function GET(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const consultation = await prisma.consultation.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        attachments: true,
        _count: {
          select: { 
            messages: true,
            appointments: true
          }
        }
      }
    })

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(consultation)
  } catch (error) {
    console.error("Error fetching consultation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const data = await req.json()
    const { title, description, status, category, priority } = data

    const consultation = await prisma.consultation.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(category && { category }),
        ...(priority && { priority })
      },
      include: {
        attachments: true,
        _count: {
          select: { 
            messages: true,
            appointments: true
          }
        }
      }
    })

    return NextResponse.json(consultation)
  } catch (error) {
    console.error("Error updating consultation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.consultation.delete({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    return NextResponse.json({ message: "Consultation deleted successfully" })
  } catch (error) {
    console.error("Error deleting consultation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
