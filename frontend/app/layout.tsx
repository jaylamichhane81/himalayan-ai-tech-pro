import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a0a14',
}

export const metadata: Metadata = {
  title: 'Himalayan AI Tech | AI Solutions for Modern Businesses',
  description: 'Premium AI Web Apps, Automation, Chatbots & Agentic AI solutions. Fast delivery, practical results, modern stack.',
  keywords: 'AI solutions, FastAPI, n8n automation, AI chatbots, agentic AI, web applications',
  creator: 'Himalayan AI Tech',
  applicationName: 'Himalayan AI Tech Pro',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Himalayan AI Tech',
  },
  openGraph: {
    title: 'Himalayan AI Tech',
    description: 'AI Solutions for Modern Businesses',
    type: 'website',
    siteName: 'Himalayan AI Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himalayan AI Tech',
    description: 'Premium AI Solutions',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0a0a14" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="bg-gradient-ai antialiased">
        {children}
      </body>
    </html>
  )
}
