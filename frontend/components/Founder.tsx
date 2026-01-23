'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Founder() {
  return (
    <section id="founder" className="section-container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="card-premium md:p-16 text-center max-w-3xl mx-auto border-ai-cyan/20 hover:border-ai-cyan/50">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-ai-cyan to-ai-purple flex items-center justify-center text-5xl border-2 border-ai-cyan/30 glow-cyan"
          >
            👨‍💻
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Founder-Led Excellence & Accountability</h2>

          <p className="text-slate-300 leading-relaxed mb-4 text-lg">
            I'm Jayram Lamichhane, building Himalayan AI with a commitment to engineering excellence. 
            Every project gets founder-level attention and accountability.
          </p>

          <p className="text-slate-400 mb-8">
            No layers. No delays. Direct access to expertise. We deliver what we promise.
          </p>

          <motion.div
            className="flex flex-wrap gap-3 justify-center text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {['FastAPI', 'Next.js', 'Advanced LLMs', 'n8n', 'PostgreSQL', 'Cloud Native'].map((tech) => (
              <motion.span 
                key={tech} 
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gradient-to-r from-ai-cyan/10 to-ai-purple/10 rounded-full border border-ai-cyan/30 text-ai-cyan font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 pt-8 border-t border-ai-cyan/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/images/stamp.png" 
              alt="Premium certified" 
              width={80} 
              height={80} 
              className="mx-auto opacity-80"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
