import prisma from "@/lib/prisma"
import { generateCompletion } from "@/lib/ai/utils"

export async function analyzeConsultation(consultationId) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            attachments: true,
            analysis: true
          }
        }
      }
    })

    const analysis = await generateCompletion(
      [
        {
          role: "system",
          content: `
            Analyze this consultation comprehensively. Consider:
            1. Overall Progress
            2. Key Topics & Themes
            3. Sentiment Analysis
            4. Action Items & Next Steps
            5. Potential Concerns
            6. Recommendations
          `
        },
        {
          role: "user",
          content: `
            Consultation Details:
            Title: ${consultation.title}
            Description: ${consultation.description}
            Status: ${consultation.status}
            Created: ${consultation.createdAt}
            
            Message History:
            ${consultation.messages.map(m => `
              Role: ${m.role}
              Content: ${m.content}
              Time: ${m.createdAt}
              Attachments: ${m.attachments.length}
              Previous Analysis: ${m.analysis.map(a => a.content).join("\n")}
            `).join("\n\n")}
          `
        }
      ]
    )

    await prisma.consultationAnalysis.create({
      data: {
        consultationId,
        content: analysis,
        metadata: {
          timestamp: new Date().toISOString(),
          type: "comprehensive-analysis"
        }
      }
    })

    return analysis
  } catch (error) {
    console.error("Error analyzing consultation:", error)
    throw error
  }
}
