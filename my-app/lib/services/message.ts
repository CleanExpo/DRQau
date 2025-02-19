import prisma from "@/lib/prisma"
import { generateCompletion } from "@/lib/ai/utils"

export async function createMessage(consultationId, content, role, attachments = []) {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        role,
        consultationId,
        attachments: {
          create: attachments.map(att => ({
            name: att.name,
            url: att.url,
            size: att.size,
            type: att.type
          }))
        }
      },
      include: {
        attachments: true
      }
    })

    // If this is a user message, analyze it
    if (role === "user") {
      await analyzeMessage(message, consultationId)
    }

    return message
  } catch (error) {
    console.error("Error creating message:", error)
    throw error
  }
}

export async function analyzeMessage(message, consultationId) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 10 // Get last 10 messages for context
        }
      }
    })

    const analysis = await generateCompletion(
      [
        {
          role: "system",
          content: "Analyze this message in the context of the consultation. Consider: sentiment, key points, action items, and any potential concerns."
        },
        {
          role: "user",
          content: `
            Consultation Context:
            Title: ${consultation.title}
            Description: ${consultation.description}
            
            Recent Messages:
            ${consultation.messages.map(m => `${m.role}: ${m.content}`).join("\n")}
            
            Current Message:
            ${message.content}
          `
        }
      ]
    )

    await prisma.messageAnalysis.create({
      data: {
        messageId: message.id,
        content: analysis,
        metadata: {
          timestamp: new Date().toISOString(),
          type: "sentiment-analysis"
        }
      }
    })
  } catch (error) {
    console.error("Error analyzing message:", error)
    // Don't throw - we don't want to block message creation if analysis fails
  }
}
