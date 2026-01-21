import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Himalayan AI Tech | AI Solutions for Modern Businesses',
  description: 'Premium AI Web Apps, Automation, Chatbots & Agentic AI solutions. Fast delivery, practical results, modern stack.',
  keywords: 'AI solutions, FastAPI, n8n automation, AI chatbots, agentic AI, web applications',
  openGraph: {
    title: 'Himalayan AI Tech',
    description: 'AI Solutions for Modern Businesses',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="bg-dark">
        {children}
      </body>
    </html>
  )
}
