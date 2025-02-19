import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { OpenAIApi, Configuration } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function GET(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const messages = await prisma.message.findMany({
      where: {
        consultationId: params.id,
        consultation: {
          userId: session.user.id
        }
      },
      orderBy: { createdAt: "asc" },
      include: {
        attachments: true
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { content, attachments } = await req.json()

    if (!content) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      )
    }

    // First, create the user message
    const userMessage = await prisma.message.create({
      data: {
        content,
        role: "user",
        consultationId: params.id,
        ...(attachments && {
          attachments: {
            create: attachments.map(att => ({
              name: att.name,
              url: att.url,
              size: att.size,
              type: att.type
            }))
          }
        })
      },
      include: {
        attachments: true
      }
    })

    // Get consultation context
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.id },
      select: { title: true, description: true }
    })

    // Generate AI response
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI consultation assistant. Current consultation context:
            Title: ${consultation.title}
            Description: ${consultation.description}`
        },
        {
          role: "user",
          content
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    // Create AI response message
    const aiMessage = await prisma.message.create({
      data: {
        content: completion.data.choices[0].message.content,
        role: "assistant",
        consultationId: params.id
      }
    })

    return NextResponse.json([userMessage, aiMessage])
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
