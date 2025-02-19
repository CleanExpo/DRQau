"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Calendar, MessageSquare, Users, BarChart } from "lucide-react"

export default function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    consultations: 0,
    upcomingAppointments: 0,
    totalMessages: 0,
    completionRate: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back, {session?.user?.name}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Consultations</p>
              <h3 className="text-2xl font-bold">{stats.consultations}</h3>
            </div>
            <MessageSquare className="text-primary-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold">{stats.upcomingAppointments}</h3>
            </div>
            <Calendar className="text-primary-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Messages</p>
              <h3 className="text-2xl font-bold">{stats.totalMessages}</h3>
            </div>
            <Users className="text-primary-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold">{stats.completionRate}%</h3>
            </div>
            <BarChart className="text-primary-600 w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Consultations</h2>
          <div className="space-y-4">
            {/* Add recent consultations list */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {/* Add upcoming appointments list */}
          </div>
        </div>
      </div>
    </div>
  )
}
