
'use client'
import { useState } from 'react'

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mountain Shape */}
    <path d="M 20 60 L 35 35 L 50 50 L 65 20 L 85 60" stroke="#0066cc" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Circuit Design */}
    <circle cx="65" cy="35" r="2" fill="#0066cc"/>
    <path d="M 65 37 L 65 45" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="65" cy="47" r="2" fill="#0066cc"/>
    <path d="M 67 47 L 73 47" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="75" cy="47" r="2" fill="#0066cc"/>
    <path d="M 63 47 L 57 47" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="55" cy="47" r="2" fill="#0066cc"/>
    <circle cx="55" cy="40" r="2" fill="#0066cc"/>
    <path d="M 55 42 L 55 45" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  return (
    <div style={{ background: '#000000', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,102,204,0.2)', padding: '16px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            <Logo />
            <span>Himalayan AI</span>
          </div>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}>Features</a>
            <a href="#pricing" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}>Pricing</a>
            <a href="/ai-demos" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}>Try AI</a>
            <a href="/dashboard" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}>Dashboard</a>
            <button style={{ padding: '8px 20px', background: '#ffffff', color: '#0066cc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.background = '#f0f0f0' }} onMouseOut={(e) => { e.target.style.background = '#ffffff' }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(0,20,50,1) 0%, rgba(0,30,80,1) 50%, rgba(10,20,60,1) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Effects */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,102,204,0.2) 0%, transparent 70%)', borderRadius: '50%', top: '10%', left: '10%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,150,255,0.15) 0%, transparent 70%)', borderRadius: '50%', bottom: '10%', right: '10%', filter: 'blur(40px)' }}></div>

        <div style={{ maxWidth: '1200px', textAlign: 'center', zIndex: 10 }}>
          {/* Large Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 60 L 35 35 L 50 50 L 65 20 L 85 60" stroke="#0066cc" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="65" cy="35" r="2.5" fill="#0066cc"/>
              <path d="M 65 37 L 65 45" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="65" cy="47" r="2.5" fill="#0066cc"/>
              <path d="M 67 47 L 73 47" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="75" cy="47" r="2.5" fill="#0066cc"/>
              <path d="M 63 47 L 57 47" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="55" cy="47" r="2.5" fill="#0066cc"/>
              <circle cx="55" cy="40" r="2.5" fill="#0066cc"/>
              <path d="M 55 42 L 55 45" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div style={{ display: 'inline-block', background: 'rgba(0,102,204,0.1)', border: '1px solid rgba(0,102,204,0.3)', padding: '8px 16px', borderRadius: '20px', marginBottom: '30px', fontSize: '13px', color: '#0096ff' }}>✨ Innovating with Intelligence</div>
          
          <h1 style={{ fontSize: '72px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1', letterSpacing: '-1px' }}>
            The Future of <span style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 50%, #00d4ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligent</span> Work
          </h1>
          
          <p style={{ fontSize: '20px', opacity: 0.7, marginBottom: '40px', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 40px' }}>
            Harness the power of next-generation AI to automate, analyze, and innovate. Enterprise-grade intelligence at your fingertips.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
            <button style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(0,102,204,0.4)' }} onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}>
              Start Free Trial
            </button>
            <button style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(0,102,204,0.5)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.background = 'rgba(0,102,204,0.15)'; e.target.style.borderColor = 'rgba(0,102,204,0.7)' }} onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(0,102,204,0.5)' }}>
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px', paddingTop: '60px', borderTop: '1px solid rgba(0,102,204,0.2)' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0096ff', marginBottom: '8px' }}>10K+</div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>Active Users</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0096ff', marginBottom: '8px' }}>99.9%</div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>Uptime SLA</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0096ff', marginBottom: '8px' }}>50ms</div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>Avg Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ padding: '100px 40px', background: '#0a0a0f', borderTop: '1px solid rgba(0,102,204,0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.5px' }}>Powerful Features</h2>
            <p style={{ fontSize: '18px', opacity: 0.6, maxWidth: '600px', margin: '0 auto' }}>Everything you need to build and deploy cutting-edge AI solutions at scale</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🤖', title: 'Advanced AI Models', desc: 'State-of-the-art LLMs and custom models trained on your data' },
              { icon: '⚡', title: 'Real-Time Processing', desc: 'Sub-100ms response times for instant insights and automation' },
              { icon: '🔒', title: 'Enterprise Security', desc: 'SOC 2 Type II certified with end-to-end encryption' },
              { icon: '📊', title: 'Rich Analytics', desc: 'Deep insights into model performance and user behavior' },
              { icon: '🌍', title: 'Global Infrastructure', desc: 'Deploy across 50+ regions with automatic failover' },
              { icon: '🔧', title: 'Easy Integration', desc: 'RESTful APIs and SDKs for all major programming languages' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: hoveredFeature === idx ? 'rgba(0,102,204,0.15)' : 'rgba(255,255,255,0.05)',
                  border: hoveredFeature === idx ? '1px solid rgba(0,102,204,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  padding: '30px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  transform: hoveredFeature === idx ? 'translateY(-4px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '100px 40px', background: 'linear-gradient(135deg, rgba(0,20,50,0.5) 0%, rgba(0,30,80,0.5) 100%)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>Trusted by Industry Leaders</h2>
            <p style={{ fontSize: '18px', opacity: 0.6 }}>Companies worldwide rely on Himalayan AI</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Sarah Chen', role: 'CEO, TechVenture Inc', text: 'Himalayan AI transformed how we handle customer support. 80% reduction in response time.' },
              { name: 'James Wilson', role: 'CTO, DataFlow Systems', text: 'The performance is outstanding. We process 1M+ requests daily without any issues.' },
              { name: 'Maria Garcia', role: 'Product Lead, InnovateLabs', text: 'Best investment for our AI infrastructure. Highly recommend!' },
            ].map((testimonial, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,102,204,0.2)', padding: '30px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ fontSize: '16px' }}>⭐</span>)}
                </div>
                <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px', lineHeight: '1.6', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{testimonial.name}</div>
                  <div style={{ fontSize: '13px', opacity: 0.5 }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" style={{ padding: '100px 40px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>Simple, Transparent Pricing</h2>
            <p style={{ fontSize: '18px', opacity: 0.6 }}>Choose the plan that fits your needs</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Starter', price: '$29', features: ['10K API calls/month', 'Basic support', '2 custom models', 'Email support'] },
              { name: 'Professional', price: '$99', features: ['1M API calls/month', 'Priority support', 'Unlimited models', 'Phone & email support', 'Custom integrations'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Unlimited API calls', '24/7 dedicated support', 'Custom SLA', 'On-premise option', 'White-label solution'] },
            ].map((plan, idx) => (
              <div
                key={idx}
                style={{
                  background: plan.popular ? 'rgba(0,102,204,0.15)' : 'rgba(255,255,255,0.05)',
                  border: plan.popular ? '2px solid rgba(0,102,204,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  padding: '40px',
                  borderRadius: '12px',
                  position: 'relative',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{plan.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px' }}>{plan.price}</div>
                <div style={{ fontSize: '13px', opacity: 0.5, marginBottom: '30px' }}>/month</div>
                <button style={{ width: '100%', padding: '12px 24px', background: plan.popular ? 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)' : 'rgba(0,102,204,0.2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '30px', transition: 'all 0.3s' }}>
                  Get Started
                </button>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} style={{ padding: '10px 0', fontSize: '14px', opacity: 0.7, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#0096ff' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '100px 40px', background: 'linear-gradient(135deg, rgba(0,102,204,0.15) 0%, rgba(0,150,255,0.1) 100%)', borderTop: '1px solid rgba(0,102,204,0.3)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', opacity: 0.7, marginBottom: '40px' }}>Join thousands of companies using Himalayan AI to power their business</p>
          <button style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(0,102,204,0.4)' }} onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}>
            Start Your Free Trial Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(0,102,204,0.2)', padding: '60px 40px', color: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                <Logo />
                <span>Himalayan AI</span>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: '1.6' }}>Innovating with Intelligence. Building the future of AI-powered solutions.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.5 }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Features</a></li>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Pricing</a></li>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Security</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.5 }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>About</a></li>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Blog</a></li>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.5 }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Privacy</a></li>
                <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,102,204,0.2)', paddingTop: '30px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            <p>&copy; 2026 Himalayan AI Tech Pro. Innovating with Intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
