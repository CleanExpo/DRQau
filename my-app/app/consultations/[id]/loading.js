export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="w-2/3">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="w-2/3">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-2/3">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
