import { NextResponse } from "next/server"
import * as emailTemplates from "@/lib/email"

export async function GET(req) {
  const searchParams = new URL(req.url).searchParams
  const template = searchParams.get("template")
  const type = searchParams.get("type") || "default"

  if (!template || !emailTemplates[template]) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 404 }
    )
  }

  // Sample data for different templates
  const sampleData = {
    verificationEmail: {
      to: "test@example.com",
      verifyUrl: "http://localhost:3000/verify?token=sample",
      name: "John Doe"
    },
    consultationReminder: {
      to: "test@example.com",
      name: "John Doe",
      consultationDetails: {
        id: "123",
        title: "Initial Consultation",
        datetime: new Date().toISOString(),
        description: "Discussion about project requirements"
      }
    },
    // Add more sample data for other templates
  }

  try {
    let html = ""
    if (typeof emailTemplates[template] === "function") {
      html = await emailTemplates[template](...Object.values(sampleData[template] || {}))
    }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating preview" },
      { status: 500 }
    )
  }
}
