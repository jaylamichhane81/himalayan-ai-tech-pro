'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormState {
  name: string
  email: string
  project: string
}

interface ApiResponse {
  status: string
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    project: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required')
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Valid email is required')
      return false
    }
    if (!formData.project.trim()) {
      setError('Project description is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) return

    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000'
      const response = await fetch(`${apiUrl}/contact/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      setSubmitted(true)
      setFormData({ name: '', email: '', project: '' })
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      setError(errorMessage)
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">Let's Build Your AI Solution</h2>
        <p className="text-center text-slate-400 mb-12 text-lg">
          Get a free AI audit. No commitment, no pressure. Just genuine expertise.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="card-premium space-y-6 border-ai-cyan/20 hover:border-ai-cyan/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-ai-cyan/10 border border-ai-cyan/30 rounded-lg text-ai-cyan text-sm"
            >
              ✓ Perfect! We'll review your project and connect within 24 hours.
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                setError(null)
              }}
              placeholder="Your full name"
              disabled={loading}
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setError(null)
              }}
              placeholder="you@company.com"
              disabled={loading}
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Description *
            </label>
            <textarea
              value={formData.project}
              onChange={(e) => {
                setFormData({ ...formData, project: e.target.value })
                setError(null)
              }}
              placeholder="Describe your AI project goals and timeline..."
              rows={5}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all resize-none disabled:opacity-50"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading || submitted}
            whileHover={!loading && !submitted ? { scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' } : {}}
            whileTap={!loading && !submitted ? { scale: 0.95 } : {}}
            className="w-full btn-primary text-lg py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="animate-spin">⚙️</span>
            )}
            {loading ? 'Sending...' : submitted ? '✓ Sent Successfully!' : 'Send Project Details'}
          </motion.button>

          <p className="text-center text-xs text-slate-500">
            We'll respond within 24 hours. No spam, ever.
          </p>
        </motion.form>
      </motion.div>
    </section>
  )
}
