'use client'

import { motion } from 'framer-motion'

const services = [
  {
    icon: '🧠',
    title: 'AI Web Applications',
    description: 'Custom-built web apps powered by LLMs, RAG systems, and intelligent workflows. FastAPI backends with modern React/Next.js frontends.',
    features: ['Real-time AI responses', 'Scalable infrastructure', 'Custom LLM fine-tuning'],
  },
  {
    icon: '⚙️',
    title: 'AI Automation (n8n)',
    description: 'No-code to low-code intelligent automation. Connect APIs, automate workflows, and eliminate manual tasks with n8n.',
    features: ['Workflow automation', 'API orchestration', 'Cost-effective scaling'],
  },
  {
    icon: '💬',
    title: 'AI Chatbots & Agents',
    description: 'Intelligent conversational agents that understand context, learn from interactions, and handle complex tasks autonomously.',
    features: ['24/7 availability', 'Multi-language support', 'Autonomous decision-making'],
  },
]

export function Services() {
  return (
    <section id="services" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-lg text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          AI solutions tailored for your business. From simple automations to complex agentic systems.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
              className="glass-effect p-8 group cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-primary flex items-center gap-2">
                    <span>→</span> {feature}
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
