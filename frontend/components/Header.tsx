'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-effect bg-midnight/70"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Image 
            src="/images/logo.png" 
            alt="Himalayan AI" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-gradient">Himalayan AI</span>
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
              className="text-slate-300 hover:text-ai-cyan transition-colors text-sm font-medium"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="btn-primary hidden md:block text-xs"
        >
          Book Consultation
        </motion.button>
      </div>
    </motion.header>
  )
}
