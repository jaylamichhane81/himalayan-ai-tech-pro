// frontend/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://himalayan-ai-tech-pro.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/*', '/.env*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
