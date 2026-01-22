'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', project: '' })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">Let's Build Something Great</h2>
        <p className="text-center text-slate-400 mb-12 text-lg">
          Transform your vision into reality. Share your project details and we'll craft the perfect AI solution.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="card-premium space-y-6 border-ai-cyan/20 hover:border-ai-cyan/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jayram Lamichhane"
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Description
            </label>
            <textarea
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              placeholder="Describe your AI project, goals, and timeline..."
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-ai-cyan/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan/30 transition-all resize-none"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-primary text-lg py-3"
          >
            {submitted ? '✓ Message Sent!' : 'Send Project Details'}
          </motion.button>

          <p className="text-center text-sm text-gray-500">
            Or connect directly on WhatsApp
          </p>
        </motion.form>
      </motion.div>
    </section>
  )
}
