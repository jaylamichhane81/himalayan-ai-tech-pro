
'use client'
import { useState } from 'react'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
)

export default function AIDemo() {
  const [msg, setMsg] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  async function send() {
    if (!msg.trim()) return

    const userMessage = { role: 'user', content: msg }
    setMessages([...messages, userMessage])
    setMsg('')
    setLoading(true)

    try {
      const r = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      const d = await r.json()
      const aiMessage = { role: 'assistant', content: d.reply }
      setMessages(prev => [...prev, aiMessage])
      setReply(d.reply)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #001a33 100%)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#ffffff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(0,102,204,0.2)', padding: '20px 40px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: '700' }}>
            <Logo />
            <span>Himalayan AI Chat</span>
          </div>
          <a href="/" style={{ color: '#0096ff', textDecoration: 'none', cursor: 'pointer', fontWeight: '500' }}>← Back Home</a>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              <div>
                <Logo />
                <div style={{ fontSize: '60px', marginBottom: '20px', marginTop: '20px' }}>💬</div>
                <p style={{ fontSize: '18px' }}>Start a conversation with our AI assistant</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '20px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)' : 'rgba(0,102,204,0.1)',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(0,102,204,0.3)',
                    wordBreak: 'break-word',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0096ff' }}>
              <span>AI is thinking</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: '#0096ff', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#0096ff', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#0096ff', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.4s' }}></div>
              </div>
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(0,102,204,0.2)' }}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Type your message..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(0,102,204,0.05)',
              border: '1px solid rgba(0,102,204,0.3)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.3s',
              cursor: loading ? 'not-allowed' : 'text',
              opacity: loading ? 0.5 : 1,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(0,102,204,0.6)'
              e.target.style.background = 'rgba(0,102,204,0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,102,204,0.3)'
              e.target.style.background = 'rgba(0,102,204,0.05)'
            }}
          />
          <button
            onClick={send}
            disabled={loading || !msg.trim()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (!loading && msg.trim()) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,102,204,0.4)'
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

      {/* Main Chat Area */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              <div>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>💬</div>
                <p style={{ fontSize: '18px' }}>Start a conversation with our AI assistant</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '20px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'rgba(255,255,255,0.1)',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    wordBreak: 'break-word',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1' }}>
              <span>AI is thinking</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.4s' }}></div>
              </div>
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Type your message..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.3s',
              cursor: loading ? 'not-allowed' : 'text',
              opacity: loading ? 0.5 : 1,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(99,102,241,0.5)'
              e.target.style.background = 'rgba(255,255,255,0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
          />
          <button
            onClick={send}
            disabled={loading || !msg.trim()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (!loading && msg.trim()) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 10px 30px rgba(99,102,241,0.3)'
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
