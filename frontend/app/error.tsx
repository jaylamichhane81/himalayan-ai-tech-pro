'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-purple-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-glass-dark border border-glass-light rounded-2xl p-8 max-w-md w-full backdrop-blur-xl"
      >
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Try refreshing the page or contact support if the problem persists.
        </p>

        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full btn-primary"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  )
}
