import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { streamAIResponse } from '@/lib/ai/utils'
import prisma from '@/lib/prisma'

export const runtime = 'edge'

export async function POST(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      )
    }

    const { message, context } = await req.json()

    // Save user message
    await prisma.message.create({
      data: {
        content: message,
        role: 'user',
        consultationId: params.id
      }
    })

    // Get consultation messages for context
    const messages = await prisma.message.findMany({
      where: { consultationId: params.id },
      orderBy: { createdAt: 'asc' }
    })

    // Create stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const iterator = await streamAIResponse(messages, context)
          for await (const chunk of iterator) {
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500 }
    )
  }
}
