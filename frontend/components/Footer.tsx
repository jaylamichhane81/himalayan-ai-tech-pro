'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-primary/10 py-12 text-center text-gray-400"
    >
      <div className="section-container">
        <p className="mb-4">
          © 2026 Himalayan AI Tech. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </motion.footer>
  )
}
