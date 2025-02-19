"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react"
import { consultationSchema } from "@/lib/validations/consultation"
import FileUpload from "@/components/FileUpload"

export default function NewConsultation() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "general",
      priority: "normal",
      attachments: []
    }
  })

  const attachments = watch("attachments")

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // First, upload any attachments
      const uploadPromises = data.attachments.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })
        const { url } = await response.json()
        return url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      
      // Create consultation with file URLs
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          attachments: data.attachments.map((file, index) => ({
            ...file,
            url: uploadedUrls[index]
          }))
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create consultation")
      }

      const consultation = await response.json()
      router.push(`/consultations/${consultation.id}`)
    } catch (error) {
      console.error("Error creating consultation:", error)
      // Handle error (show error message, etc.)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.push("/consultations")}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Consultations
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          New Consultation
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter consultation title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              {...register("description")}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your consultation needs"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label 
                htmlFor="category" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category *
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="business">Business</option>
                <option value="legal">Legal</option>
                <option value="health">Healthcare</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label 
                htmlFor="priority" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority *
              </label>
              <select
                {...register("priority")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Attachments
            </label>
            <FileUpload
              value={attachments}
              onChange={(files) => setValue("attachments", files)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/consultations")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-2 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Create Consultation"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Guidelines Panel */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Consultation Guidelines
        </h2>
        <div className="text-gray-600 space-y-2">
          <p>To get the most out of your consultation:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Be specific about your needs in the description</li>
            <li>Choose the appropriate category for faster matching</li>
            <li>Set priority based on urgency of your needs</li>
            <li>Include any relevant files as attachments</li>
            <li>Provide clear context in your description</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
