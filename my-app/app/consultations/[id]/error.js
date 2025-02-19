"use client"

export default function Error({ error, reset }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-6">
            {error.message || "There was an error loading the consultation."}
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.href = "/consultations"}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Consultations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
