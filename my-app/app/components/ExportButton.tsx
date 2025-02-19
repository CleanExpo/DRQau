"use client"
import { useState } from "react"
import { Download, FileText, Table, FileDown } from "lucide-react"

export default function ExportButton({ consultationId }) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format) => {
    try {
      setExporting(true)
      const response = await fetch(
        `/api/consultations/${consultationId}/export?format=${format}`,
        {
          method: "GET"
        }
      )

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `consultation-${consultationId}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting:", error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <div className="flex space-x-2">
        <button
          onClick={() => handleExport("pdf")}
          disabled={exporting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FileText className="h-4 w-4 mr-2" />
          PDF
        </button>

        <button
          onClick={() => handleExport("csv")}
          disabled={exporting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Table className="h-4 w-4 mr-2" />
          CSV
        </button>

        <button
          onClick={() => handleExport("markdown")}
          disabled={exporting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Markdown
        </button>
      </div>

      {exporting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <Download className="h-5 w-5 animate-spin text-primary-600" />
        </div>
      )}
    </div>
  )
}
