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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Brand & tagline */}
          <motion.div 
            className="flex flex-col items-start md:items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-bold bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">
              Himalayan AI Tech
            </p>
            <p className="text-xs text-slate-400">
              Enterprise AI • 50+ Delivered • 99.9% Uptime
            </p>
          </motion.div>

          {/* Center: Premium divider */}
          <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-ai-cyan/40 to-transparent"></div>

          {/* Right: Links */}
          <motion.div 
            className="flex gap-6 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="#" className="text-slate-400 hover:text-ai-cyan transition-colors duration-300 font-medium">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-ai-cyan transition-colors duration-300 font-medium">Terms</a>
            <a href="#contact" className="text-slate-400 hover:text-ai-cyan transition-colors duration-300 font-medium">Contact</a>
          </motion.div>
        </div>

        {/* Bottom: Copyright */}
        <motion.div
          className="mt-6 pt-6 border-t border-ai-cyan/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            AI solutions, automation & intelligent systems for modern businesses.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            © 2026 Himalayan AI Tech. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
