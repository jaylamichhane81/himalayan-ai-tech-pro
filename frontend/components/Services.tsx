'use client'

import { motion } from 'framer-motion'

const services = [
  {
    icon: '🧠',
    title: 'Custom AI Applications',
    description: 'Enterprise-grade web apps with LLM integration, RAG systems, and real-time intelligence. Built for scalability and performance.',
    features: ['LLM Integration', 'Real-time Processing', '24/7 Support'],
  },
  {
    icon: '⚙️',
    title: 'Intelligent Automation',
    description: 'Visual workflow automation with n8n. Eliminate manual tasks, reduce costs, and scale operations instantly.',
    features: ['Process Automation', 'API Integration', 'Data Orchestration'],
  },
  {
    icon: '🤖',
    title: 'Autonomous AI Agents',
    description: 'Intelligent agents that reason, learn, and execute complex business logic autonomously. Maximized efficiency.',
    features: ['Autonomous Tasks', 'Intelligent Reasoning', 'Context Awareness'],
  },
]

export function Services() {
  return (
    <section id="services" className="section-container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">Services Built for Business Growth</h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          Three proven AI solutions to transform your operations, reduce costs, and stay competitive.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)' }}
              className="card-premium group cursor-pointer hover:border-ai-cyan/50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-ai-cyan flex items-center gap-2">
                    <span className="text-ai-glow">→</span> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
