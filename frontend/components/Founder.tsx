'use client'

import { motion } from 'framer-motion'

export function Founder() {
  return (
    <section id="founder" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="glass-effect p-12 md:p-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl"
          >
            👨‍💻
          </motion.div>

          <h2 className="heading-md mb-6 text-gradient">Founder-Led</h2>

          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            Hi, I'm building Himalayan AI to solve real business problems with AI technology. 
            No corporate bloat, no BS—just solid engineering and results.
          </p>

          <p className="text-gray-400 mb-8">
            Every project gets my direct attention. You get the founder, not a sales team. 
            We move fast, build quality, and deliver on promises.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center text-sm text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {['FastAPI', 'React/Next.js', 'LLMs', 'n8n', 'PostgreSQL', 'AWS'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
