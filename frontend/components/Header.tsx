'use client'

import { motion } from 'framer-motion'

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-dark/80 border-b border-primary/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-gradient"
        >
          🏔️ Himalayan AI
        </motion.div>

        <nav className="hidden md:flex gap-8">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Why Us', id: 'why-us' },
            { label: 'Founder', id: 'founder' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ color: '#00d4ff' }}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-300 hover:text-primary transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="btn-primary hidden md:block"
        >
          Book Consultation
        </motion.button>
      </div>
    </motion.header>
  )
}
