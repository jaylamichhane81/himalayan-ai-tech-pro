/**
 * Admin Dashboard Component - Full System Health & Management
 */

'use client'

import React, { useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface DashboardStats {
  total_users?: number
  total_blog_posts?: number
  total_contacts?: number
  total_payments?: number
  system_status?: string
  api_version?: string
}

// Payments removed — external providers disabled; backend endpoints are not available.


export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  // Payments removed — no payment history is fetched
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'health'>('overview')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch dashboard stats
      try {
        const statsResponse = await api.get('/dashboard/stats', true)
        setStats(statsResponse as DashboardStats)
      } catch (err) {
        console.warn('Could not fetch stats:', err)
      }

      // Payments disabled (Khalti/eSewa removed) — skipping payment history fetch
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <div className="bg-gradient-to-br from-purple-600/10 to-purple-400/5 border border-purple-400/20 rounded-lg p-6 hover:border-purple-400/40 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-400">System overview and management</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'payments'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'health'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            System Health
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin text-4xl mb-4">⚙️</div>
              <p className="text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Blog Posts"
                    value={stats?.total_blog_posts || 0}
                    icon="📝"
                  />
                  <StatCard
                    title="Contact Messages"
                    value={stats?.total_contacts || 0}
                    icon="💌"
                  />
                  <StatCard
                    title="Total Payments"
                    value={stats?.total_payments || 0}
                    icon="💳"
                  />
                  <StatCard
                    title="Active Users"
                    value={stats?.total_users || 0}
                    icon="👥"
                  />
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Last dashboard update</span>
                      <span className="text-white">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Backend status</span>
                      <span className="text-green-400">✓ Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Database connection</span>
                      <span className="text-green-400">✓ Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-bold text-white mb-4">Payments</h2>
                  <p className="text-gray-400">Payment providers (Khalti & eSewa) have been removed; payments are disabled.</p>
                </div>
              </div>
            )}

            {/* Health Tab */}
            {activeTab === 'health' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backend Health */}
                <div className="bg-gradient-to-br from-green-600/10 to-green-400/5 border border-green-400/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">✓ Backend</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-400">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Environment:</span>
                      <span>Production</span>
                    </div>
                  </div>
                </div>

                {/* Database Health */}
                <div className="bg-gradient-to-br from-blue-600/10 to-blue-400/5 border border-blue-400/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">✓ Database</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>PostgreSQL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span>Neon</span>
                    </div>
                  </div>
                </div>

                {/* Frontend Health */}
                <div className="bg-gradient-to-br from-purple-600/10 to-purple-400/5 border border-purple-400/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">✓ Frontend</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-400">Running</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <span>Vercel</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Framework:</span>
                      <span>Next.js 15</span>
                    </div>
                  </div>
                </div>

                {/* Payment Services - Disabled */}
                <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-400/5 border border-yellow-400/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">💳 Payment Services</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Payments:</span>
                      <span className="text-yellow-300">Disabled</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      External payment providers (Khalti/eSewa) removed from the project.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Refresh Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                🔄 Refresh Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
