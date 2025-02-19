import { jsPDF } from "jspdf"
import { Parser } from "json2csv"
import html2canvas from "html2canvas"

export async function exportToPDF(consultation) {
  const doc = new jsPDF()
  let yPos = 20

  // Title
  doc.setFontSize(20)
  doc.text("Consultation Report", 20, yPos)
  yPos += 15

  // Consultation Details
  doc.setFontSize(12)
  doc.text(`Title: ${consultation.title}`, 20, yPos)
  yPos += 10
  doc.text(`Status: ${consultation.status}`, 20, yPos)
  yPos += 10
  doc.text(`Created: ${new Date(consultation.createdAt).toLocaleDateString()}`, 20, yPos)
  yPos += 10

  // Description
  if (consultation.description) {
    yPos += 5
    doc.setFontSize(14)
    doc.text("Description", 20, yPos)
    yPos += 10
    doc.setFontSize(12)
    const descriptionLines = doc.splitTextToSize(consultation.description, 170)
    doc.text(descriptionLines, 20, yPos)
    yPos += (descriptionLines.length * 7)
  }

  // Messages
  yPos += 10
  doc.setFontSize(14)
  doc.text("Conversation History", 20, yPos)
  yPos += 10

  for (const message of consultation.messages) {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(12)
    doc.setFont(undefined, message.role === "user" ? "bold" : "normal")
    doc.text(`${message.role}:`, 20, yPos)
    yPos += 7

    const messageLines = doc.splitTextToSize(message.content, 170)
    doc.text(messageLines, 20, yPos)
    yPos += (messageLines.length * 7) + 5

    // Add attachments info if any
    if (message.attachments?.length) {
      doc.setFont(undefined, "italic")
      doc.text(`Attachments: ${message.attachments.map(a => a.name).join(", ")}`, 20, yPos)
      yPos += 7
    }
  }

  // Analysis if available
  if (consultation.analysis?.length) {
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    yPos += 10
    doc.setFontSize(14)
    doc.text("Analysis", 20, yPos)
    yPos += 10

    const latestAnalysis = consultation.analysis[consultation.analysis.length - 1]
    doc.setFontSize(12)
    const analysisLines = doc.splitTextToSize(latestAnalysis.content, 170)
    doc.text(analysisLines, 20, yPos)
  }

  return doc
}

export function exportToCSV(consultation) {
  const fields = [
    "id",
    "timestamp",
    "role",
    "content",
    "attachments",
    "analysis"
  ]

  const data = consultation.messages.map(message => ({
    id: message.id,
    timestamp: message.createdAt,
    role: message.role,
    content: message.content,
    attachments: message.attachments?.map(a => a.name).join(", ") || "",
    analysis: message.analysis?.[0]?.content || ""
  }))

  const parser = new Parser({ fields })
  return parser.parse(data)
}

export async function exportToMarkdown(consultation) {
  let markdown = `# ${consultation.title}\n\n`

  markdown += `## Details\n`
  markdown += `- Status: ${consultation.status}\n`
  markdown += `- Created: ${new Date(consultation.createdAt).toLocaleDateString()}\n`
  markdown += `- Category: ${consultation.category || "N/A"}\n`
  markdown += `- Priority: ${consultation.priority || "N/A"}\n\n`

  if (consultation.description) {
    markdown += `## Description\n${consultation.description}\n\n`
  }

  markdown += `## Conversation History\n\n`
  for (const message of consultation.messages) {
    markdown += `### ${message.role} (${new Date(message.createdAt).toLocaleString()})\n`
    markdown += `${message.content}\n\n`

    if (message.attachments?.length) {
      markdown += `**Attachments:**\n`
      for (const att of message.attachments) {
        markdown += `- [${att.name}](${att.url})\n`
      }
      markdown += "\n"
    }

    if (message.analysis?.length) {
      markdown += `**Analysis:**\n`
      markdown += `${message.analysis[0].content}\n\n`
    }
  }

  if (consultation.analysis?.length) {
    markdown += `## Overall Analysis\n\n`
    markdown += consultation.analysis[consultation.analysis.length - 1].content
  }

  return markdown
}
