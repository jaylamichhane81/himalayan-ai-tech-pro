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
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <motion.p 
            className="text-sm font-bold bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Himalayan AI Tech
          </motion.p>
        </div>

        {/* Bottom: Main message & Copyright */}
        <motion.div
          className="mt-6 pt-6 border-t border-ai-cyan/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            AI solutions, automation & intelligent systems for modern businesses. | © 2026 Himalayan AI Tech. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
