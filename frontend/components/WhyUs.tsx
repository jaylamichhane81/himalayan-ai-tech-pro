'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    title: 'Lightning-Fast Delivery',
    description: 'Average MVP in 4 days. We move quickly without cutting corners.',
  },
  {
    title: 'Practical AI, Real Results',
    description: 'No hype. Every solution is built for business outcomes, not tech theater.',
  },
  {
    title: 'Modern Tech Stack',
    description: 'FastAPI, n8n, LLMs, and React—proven technologies that scale.',
  },
  {
    title: 'Founder-Led Expertise',
    description: 'Direct access to engineering knowledge. No middlemen, no delays.',
  },
  {
    title: 'Cost-Effective Scaling',
    description: 'Smart architecture that grows with you. Pay for what you use.',
  },
  {
    title: 'Complete Support',
    description: 'From concept to production, we handle everything. Peace of mind included.',
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-lg text-center mb-4">Why Choose Himalayan AI?</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          We build AI solutions that work. Here's what sets us apart.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect-dark p-6 border-l-2 border-primary/50"
            >
              <h3 className="text-lg font-semibold mb-2 text-gradient">
                {reason.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
