"use client"
// ... previous imports ...
import ExportButton from "@/components/ExportButton"

export default function ConsultationDetail() {
  // ... previous code ...

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/consultations")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Consultations
        </button>

        <ExportButton consultationId={id} />
      </div>

      {/* Rest of your consultation detail page... */}
    </div>
  )
}
