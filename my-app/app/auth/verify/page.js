"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState("verifying")
  const [error, setError] = useState("")

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    }
  }, [token])

  const verifyEmail = async (token) => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Verification failed")
      }

      setStatus("verified")
      setTimeout(() => {
        router.push("/auth/signin?verified=true")
      }, 3000)
    } catch (error) {
      setError(error.message)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          
          {status === "verifying" && (
            <div className="mt-2 text-center text-sm text-gray-600">
              Verifying your email...
            </div>
          )}

          {status === "verified" && (
            <div className="mt-2 text-center text-sm text-green-600">
              Your email has been verified! Redirecting to login...
            </div>
          )}

          {status === "error" && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <Link
                href="/auth/signin"
                className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Return to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
