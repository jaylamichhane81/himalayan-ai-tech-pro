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
        
        <div className="text-center mb-8">
          <p className="text-slate-300 font-semibold text-sm mb-2">
            Himalayan AI Tech
          </p>
          <p className="text-slate-500 text-xs">
            Enterprise AI Solutions • Fast Delivery • Proven Results
          </p>
        </div>

        {/* Credentials */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8 py-6 border-y border-ai-cyan/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {['✓ 50+ Projects', '✓ 4-Day MVP', '✓ 99.9% Uptime', '✓ 100% Satisfaction'].map((cred) => (
            <span key={cred} className="text-xs text-ai-cyan font-semibold">
              {cred}
            </span>
          ))}
        </motion.div>
        
        <div className="flex justify-center gap-8 text-sm mb-8">
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
          className="pt-6 border-t border-ai-cyan/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-slate-500">
            © 2026 Himalayan AI Tech. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Built with precision. Powered by AI. Trusted by businesses.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
