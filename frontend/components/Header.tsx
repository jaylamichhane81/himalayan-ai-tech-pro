'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-effect bg-midnight/70 w-full"
    >
      <div className="section-container py-4 flex justify-between items-center">
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
          <span className="text-lg md:text-xl font-bold text-gradient">Himalayan AI</span>
        </motion.div>

        {/* Desktop Navigation */}
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

        {/* Desktop CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="btn-primary hidden md:block text-xs"
        >
          Book Consultation
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-ai-cyan transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-ai-cyan transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-ai-cyan transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-midnight-light/50 glass-effect"
      >
        <div className="section-container py-4 flex flex-col gap-4">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Why Us', id: 'why-us' },
            { label: 'Founder', id: 'founder' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => scrollToSection(item.id)}
              className="text-slate-300 hover:text-ai-cyan transition-colors text-sm font-medium text-left"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="btn-primary w-full text-xs mt-2"
          >
            Book Consultation
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  )
}
