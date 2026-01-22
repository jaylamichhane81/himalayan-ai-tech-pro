'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-ai-cyan/10 bg-gradient-to-t from-midnight-light/50 to-midnight/10 py-16 text-center"
    >
      <div className="section-container">
        <motion.div 
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/images/logo.png" 
            alt="Himalayan AI" 
            width={40} 
            height={40} 
            className="w-10 h-10 opacity-80"
          />
        </motion.div>
        
        <p className="mb-6 text-slate-300 text-sm">
          © 2026 Himalayan AI Tech. Premium AI Solutions.
        </p>
        
        <div className="flex justify-center gap-8 text-sm">
          <motion.a 
            href="#" 
            whileHover={{ color: '#00d4ff' }}
            className="text-slate-400 hover:text-ai-cyan transition-colors"
          >
            Privacy
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ color: '#00d4ff' }}
            className="text-slate-400 hover:text-ai-cyan transition-colors"
          >
            Terms
          </motion.a>
          <motion.a 
            href="#contact" 
            whileHover={{ color: '#00d4ff' }}
            className="text-slate-400 hover:text-ai-cyan transition-colors"
          >
            Contact
          </motion.a>
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-ai-cyan/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            Crafted with precision. Powered by AI. Built to scale.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
