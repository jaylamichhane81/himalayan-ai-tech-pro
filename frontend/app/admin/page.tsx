'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DashboardStats {
  total_contacts: number
  total_blogs: number
  total_payments: number
  total_revenue: number
}

interface RecentContact {
  id: string
  name: string
  email: string
  created_at: string
  status: string
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [contacts, setContacts] = useState<RecentContact[]>([])
  const [error, setError] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000'

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
      setToken(data.access_token)
      setIsLoggedIn(true)

      // Fetch dashboard data
      await fetchDashboardData(data.access_token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch Dashboard Data
  const fetchDashboardData = async (authToken: string) => {
    try {
      // Fetch stats
      const statsResponse = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent contacts
      const contactsResponse = await fetch(`${API_URL}/contact/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json()
        setContacts(contactsData.slice(0, 5))
      }
    } catch (err) {
      // Error handling for fetch failures
    }
  }

  // Logout
  const handleLogout = () => {
    setToken('')
    setIsLoggedIn(false)
    setStats(null)
    setContacts([])
    setUsername('')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-glass-dark border border-glass-light rounded-2xl p-8 backdrop-blur-xl"
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6"
            >
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-cyan-400 text-sm font-medium mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-glass-light/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-cyan-400 text-sm font-medium mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-glass-light/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary mt-6"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            Demo credentials: admin / admin123
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-purple-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your business overview.</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Contacts', value: stats.total_contacts, icon: '📧' },
              { label: 'Total Blogs', value: stats.total_blogs, icon: '📝' },
              { label: 'Total Payments', value: stats.total_payments, icon: '💳' },
              { label: 'Total Revenue', value: `NPR ${stats.total_revenue}`, icon: '💰' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-glass-dark border border-glass-light rounded-xl p-6 backdrop-blur-xl hover:border-cyan-400/50 transition"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-glass-dark border border-glass-light rounded-xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recent Contacts</h2>

          {contacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-glass-light">
                    <th className="text-cyan-400 font-semibold py-3">Name</th>
                    <th className="text-cyan-400 font-semibold py-3">Email</th>
                    <th className="text-cyan-400 font-semibold py-3">Date</th>
                    <th className="text-cyan-400 font-semibold py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-glass-light/50 hover:bg-glass-light/20 transition"
                    >
                      <td className="text-white py-3">{contact.name}</td>
                      <td className="text-gray-300 py-3">{contact.email}</td>
                      <td className="text-gray-400 py-3">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-300">
                          {contact.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No contacts yet</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
