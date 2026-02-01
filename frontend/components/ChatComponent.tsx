/**
 * AI Chat Component - Fully Responsive & Production Ready
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { api, endpoints } from '@/lib/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    setIsAuthenticated(!!token)
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<{ reply: string }>(
        endpoints.chat,
        { message: input },
        true // authenticated
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply || 'No response received',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err: any) {
      if (err.status === 401) {
        setIsAuthenticated(false)
        setShowLoginPrompt(true)
        setError('Session expired. Please login again.')
      } else {
        setError(err.message || 'Failed to send message')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            🤖 Himalayan AI Assistant
          </h1>
          <p className="text-gray-400 text-lg">
            Ask anything about our services and technology
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth">
            {messages.length === 0 && !loading && (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Start a Conversation
                  </h2>
                  <p className="text-gray-400">
                    Ask me anything about Himalayan AI Tech Pro
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-slate-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm md:text-base break-words">{msg.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              </div>
            )}

            {showLoginPrompt && (
              <div className="flex justify-center">
                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg text-sm max-w-sm">
                  Please log in to use the chat feature
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4 md:p-6 bg-slate-800/30">
            {!isAuthenticated && (
              <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-400 text-sm">
                <p className="mb-2">Please log in to start chatting</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-blue-300 hover:text-blue-200 underline text-sm"
                >
                  Go to login →
                </button>
              </div>
            )}

            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
                placeholder={isAuthenticated ? "Type your message..." : "Please log in..."}
                disabled={loading || !isAuthenticated}
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 transition-colors text-sm md:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim() || !isAuthenticated}
                className="px-4 md:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Press Enter or click Send to submit
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-white mb-1">Secure</h3>
            <p className="text-sm text-gray-400">Your conversations are encrypted</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Fast</h3>
            <p className="text-sm text-gray-400">Instant responses powered by AI</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="font-semibold text-white mb-1">24/7</h3>
            <p className="text-sm text-gray-400">Available anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  )
}
