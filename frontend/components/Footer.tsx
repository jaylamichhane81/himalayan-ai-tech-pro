'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-ai-cyan/20 bg-gradient-to-b from-midnight to-midnight-light/30 backdrop-blur-xl py-8"
    >
      <div className="section-container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            AI solutions, automation & intelligent systems for modern businesses. © 2026 Himalayan AI Tech. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
