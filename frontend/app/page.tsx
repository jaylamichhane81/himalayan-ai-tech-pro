'use client'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyUs } from '@/components/WhyUs'
import { Founder } from '@/components/Founder'
import { CTA } from '@/components/CTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-ai">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Founder />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
