'use client'

import { motion } from 'framer-motion'

const services = [
  {
    icon: '🧠',
    title: 'AI Web Applications',
    description: 'Enterprise-grade web apps powered by LLMs, RAG systems, and intelligent workflows. FastAPI backends with modern React/Next.js frontends.',
    features: ['Real-time AI responses', 'Scalable infrastructure', 'Custom LLM integration'],
  },
  {
    icon: '⚙️',
    title: 'AI Automation (n8n)',
    description: 'Low-code intelligent automation. Connect APIs, automate workflows, and eliminate manual tasks with visual precision.',
    features: ['Smart workflows', 'API orchestration', 'Cost-effective scaling'],
  },
  {
    icon: '💬',
    title: 'AI Chatbots & Agents',
    description: 'Autonomous conversational agents with contextual understanding, continuous learning, and complex task handling.',
    features: ['24/7 availability', 'Multi-language support', 'Autonomous reasoning'],
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">Our Services</h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          Premium AI solutions crafted for enterprise needs. From intelligent automation to agentic systems.
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
