import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"

export async function GET(req) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Build where clause
    const where = {
      userId: session.user.id,
      ...(status && { status }),
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    }

    // Get total count for pagination
    const total = await prisma.consultation.count({ where })

    // Get consultations with pagination
    const consultations = await prisma.consultation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { 
            messages: true,
            appointments: true
          }
        }
      }
    })

    return NextResponse.json({
      consultations,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    })
  } catch (error) {
    console.error("Error fetching consultations:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const data = await req.json()
    const { title, description, category, priority, attachments } = data

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        title,
        description,
        category,
        priority,
        status: "PENDING",
        userId: session.user.id,
        attachments: {
          create: attachments?.map(attachment => ({
            name: attachment.name,
            url: attachment.url,
            size: attachment.size,
            type: attachment.type
          }))
        }
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
    console.error("Error creating consultation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
