"use client"
import { useState } from "react"
import { Paperclip, X } from "lucide-react"

export default function FileAttachment({ onFileUpload, onFileRemove }) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files)
    setUploading(true)

    try {
      const uploadedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Upload failed")
          }

          const data = await response.json()
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            url: data.url,
          }
        })
      )

      setFiles((prev) => [...prev, ...uploadedFiles])
      onFileUpload(uploadedFiles)
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      newFiles.splice(index, 1)
      onFileRemove(index)
      return newFiles
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <div className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </div>
        </label>
        {uploading && (
          <span className="text-sm text-gray-500">Uploading...</span>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
