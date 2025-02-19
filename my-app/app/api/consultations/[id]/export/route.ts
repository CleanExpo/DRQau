import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { exportToPDF, exportToCSV, exportToMarkdown } from "@/lib/export/utils"

export async function GET(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const format = searchParams.get("format") || "pdf"

    const consultation = await prisma.consultation.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            attachments: true,
            analysis: true
          }
        },
        analysis: {
          orderBy: { createdAt: "desc" }
        }
      }
    })

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      )
    }

    let result
    let fileName
    let contentType

    switch (format.toLowerCase()) {
      case "pdf":
        result = await exportToPDF(consultation)
        fileName = `consultation-${consultation.id}.pdf`
        contentType = "application/pdf"
        break

      case "csv":
        result = exportToCSV(consultation)
        fileName = `consultation-${consultation.id}.csv`
        contentType = "text/csv"
        break

      case "markdown":
        result = await exportToMarkdown(consultation)
        fileName = `consultation-${consultation.id}.md`
        contentType = "text/markdown"
        break

      default:
        return NextResponse.json(
          { error: "Unsupported format" },
          { status: 400 }
        )
    }

    return new Response(result, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${fileName}`
      }
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json(
      { error: "Error exporting consultation" },
      { status: 500 }
    )
  }
}
