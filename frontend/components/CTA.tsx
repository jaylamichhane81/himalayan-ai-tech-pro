'use client'

import { motion } from 'framer-motion'

export function CTA() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative card-premium md:p-20 text-center overflow-hidden border-ai-cyan/30 hover:border-ai-cyan/60"
      >
        {/* Background gradient animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-ai-cyan/10 to-ai-purple/10 opacity-30"
        />

        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get a free AI audit tailored to your business. Discover opportunities, understand costs, and launch faster.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="btn-primary text-lg px-8 py-3"
            >
              Book Free Consultation
            </motion.button>

            <motion.a
              href="https://wa.me/977xxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg"
            >
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
