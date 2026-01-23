'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-purple-900 flex items-center justify-center">
      <motion.div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 border-2 border-cyan-400 border-t-purple-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-cyan-400 font-medium">Loading...</p>
      </motion.div>
    </div>
  )
}
