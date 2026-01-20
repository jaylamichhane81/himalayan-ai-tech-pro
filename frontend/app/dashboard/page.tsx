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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', content: '' })

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#ffffff' }}>
      {/* Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh' }}>
        <div style={{ background: 'rgba(0,20,50,0.3)', borderRight: '1px solid rgba(0,102,204,0.2)', padding: '30px 0' }}>
          <div style={{ padding: '0 20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Logo />
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Himalayan</h2>
            </div>
            <p style={{ fontSize: '12px', opacity: 0.5, margin: '8px 0 0 0' }}>Admin Dashboard</p>
          </div>

          <nav>
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'ai-chat', label: '🤖 AI Chat', icon: '🤖' },
              { id: 'blog', label: '📝 Blog Manager', icon: '📝' },
              { id: 'payments', label: '💳 Payments', icon: '💳' },
              { id: 'messages', label: '💬 Messages', icon: '💬' },
              { id: 'users', label: '👥 Users', icon: '👥' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: activeTab === item.id ? 'rgba(0,102,204,0.2)' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === item.id ? '3px solid #0096ff' : '3px solid transparent',
                  color: '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === item.id ? '600' : '500',
                  transition: 'all 0.3s',
                  opacity: activeTab === item.id ? 1 : 0.7,
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'rgba(0,102,204,0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ overflow: 'auto' }}>
          {/* Header */}
          <div style={{ background: 'rgba(0,20,50,0.2)', borderBottom: '1px solid rgba(0,102,204,0.2)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0 }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>
              {activeTab === 'overview' && '📊 Dashboard Overview'}
              {activeTab === 'ai-chat' && '🤖 AI Chat Management'}
              {activeTab === 'blog' && '📝 Blog Manager'}
              {activeTab === 'payments' && '💳 Payment Transactions'}
              {activeTab === 'messages' && '💬 Contact Messages'}
              {activeTab === 'users' && '👥 User Management'}
              {activeTab === 'analytics' && '📈 Analytics & Reports'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h1>
            <a href="/" style={{ color: '#0096ff', textDecoration: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>← Back</a>
          </div>

          {/* Content Area */}
          <div style={{ padding: '40px' }}>
            {activeTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                  {[
                    { label: 'Total Users', value: '10,234', change: '+12%' },
                    { label: 'API Calls', value: '1.2M', change: '+23%' },
                    { label: 'Revenue', value: '$45,230', change: '+8%' },
                    { label: 'Uptime', value: '99.9%', change: '+0.1%' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ background: 'rgba(0,102,204,0.12)', border: '1px solid rgba(0,102,204,0.3)', padding: '24px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '12px', opacity: 0.6, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                      <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#0096ff' }}>{stat.value}</div>
                      <p style={{ fontSize: '12px', color: '#22c55e', margin: 0 }}>{stat.change} from last month</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: '600', color: '#0096ff' }}>Recent Activity</h3>
                  <div style={{ opacity: 0.6, fontSize: '14px' }}>
                    <p>• 2,341 API calls in the last hour</p>
                    <p>• 234 new user registrations today</p>
                    <p>• 8 new blog posts published</p>
                    <p>• 45 contact form submissions</p>
                    <p>• System uptime: 100% (last 30 days)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div style={{ background: 'rgba(0,102,204,0.12)', border: '1px solid rgba(0,102,204,0.3)', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#0096ff' }}>Create New Blog Post</h3>
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(0,102,204,0.05)',
                      border: '1px solid rgba(0,102,204,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      marginBottom: '12px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  <textarea
                    placeholder="Blog Content"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(0,102,204,0.05)',
                      border: '1px solid rgba(0,102,204,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      marginBottom: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      minHeight: '120px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                    Publish Post
                  </button>
                </div>

                <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0,102,204,0.2)', background: 'rgba(0,20,50,0.3)' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Title</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Date</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Views</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { title: 'Getting Started with AI', date: 'Jan 18, 2026', views: '1,234' },
                        { title: 'Advanced ML Techniques', date: 'Jan 15, 2026', views: '892' },
                        { title: 'Future of Automation', date: 'Jan 12, 2026', views: '2,103' },
                      ].map((blog, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(0,102,204,0.1)' }}>
                          <td style={{ padding: '16px' }}>{blog.title}</td>
                          <td style={{ padding: '16px', opacity: 0.7 }}>{blog.date}</td>
                          <td style={{ padding: '16px', opacity: 0.7 }}>{blog.views}</td>
                          <td style={{ padding: '16px' }}>
                            <button style={{ background: 'rgba(0,102,204,0.2)', border: '1px solid rgba(0,102,204,0.4)', padding: '6px 12px', borderRadius: '6px', color: '#0096ff', cursor: 'pointer', fontSize: '12px', marginRight: '8px', fontWeight: '600' }}>Edit</button>
                            <button style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', padding: '6px 12px', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0,102,204,0.2)', background: 'rgba(0,20,50,0.3)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Transaction ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Amount</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Method</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'TXN001', amount: '$99.00', method: 'Khalti', status: 'Completed' },
                      { id: 'TXN002', amount: '$29.00', method: 'eSewa', status: 'Completed' },
                      { id: 'TXN003', amount: '$199.00', method: 'Khalti', status: 'Completed' },
                    ].map((tx, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(0,102,204,0.1)' }}>
                        <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px' }}>{tx.id}</td>
                        <td style={{ padding: '16px', fontWeight: '600' }}>{tx.amount}</td>
                        <td style={{ padding: '16px', opacity: 0.7 }}>{tx.method}</td>
                        <td style={{ padding: '16px' }}><span style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{tx.status}</span></td>
                        <td style={{ padding: '16px', opacity: 0.7 }}>Jan 20, 2026</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', borderRadius: '12px', padding: '20px' }}>
                {[
                  { name: 'John Doe', email: 'john@example.com', subject: 'Product Inquiry', message: 'I would like to know more about your enterprise plan.' },
                  { name: 'Jane Smith', email: 'jane@example.com', subject: 'Technical Support', message: 'Having issues with API integration.' },
                  { name: 'Bob Johnson', email: 'bob@example.com', subject: 'Partnership', message: 'Interested in partnership opportunities.' },
                ].map((msg, idx) => (
                  <div key={idx} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: idx < 2 ? '1px solid rgba(0,102,204,0.2)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{msg.name}</div>
                        <div style={{ fontSize: '13px', opacity: 0.6 }}>{msg.email}</div>
                      </div>
                      <button style={{ background: 'rgba(0,102,204,0.2)', border: '1px solid rgba(0,102,204,0.4)', padding: '6px 12px', borderRadius: '6px', color: '#0096ff', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Reply</button>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>{msg.subject}</div>
                    <p style={{ fontSize: '13px', opacity: 0.7, margin: '8px 0 0 0' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{ maxWidth: '600px' }}>
                <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', padding: '24px', borderRadius: '12px', marginBottom: '20px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#0096ff' }}>API Configuration</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>API Key</label>
                    <input type="password" defaultValue="sk_prod_1234567890" style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,102,204,0.05)', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#ffffff', fontSize: '13px', fontFamily: 'monospace' }} />
                  </div>
                  <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #0066cc 0%, #0096ff 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Regenerate Key</button>
                </div>

                <div style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#0096ff' }}>Billing</h3>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>
                    <p>Plan: Professional</p>
                    <p>Billing Cycle: Monthly</p>
                    <p>Next Billing Date: February 20, 2026</p>
                  </div>
                </div>
              </div>
            )}

            {!['overview', 'blog', 'payments', 'messages', 'settings'].includes(activeTab) && (
              <div style={{ textAlign: 'center', opacity: 0.5, padding: '60px 20px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔧</div>
                <p style={{ fontSize: '18px' }}>This section is under development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
            <p style={{ fontSize: '12px', opacity: 0.5, margin: '8px 0 0 0' }}>Admin Dashboard</p>
          </div>

          <nav>
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'ai-chat', label: '🤖 AI Chat', icon: '🤖' },
              { id: 'blog', label: '📝 Blog Manager', icon: '📝' },
              { id: 'payments', label: '💳 Payments', icon: '💳' },
              { id: 'messages', label: '💬 Messages', icon: '💬' },
              { id: 'users', label: '👥 Users', icon: '👥' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: activeTab === item.id ? 'rgba(99,102,241,0.2)' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === item.id ? '3px solid #6366f1' : '3px solid transparent',
                  color: '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === item.id ? '600' : '500',
                  transition: 'all 0.3s',
                  opacity: activeTab === item.id ? 1 : 0.7,
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ overflow: 'auto' }}>
          {/* Header */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0 }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>
              {activeTab === 'overview' && '📊 Dashboard Overview'}
              {activeTab === 'ai-chat' && '🤖 AI Chat Management'}
              {activeTab === 'blog' && '📝 Blog Manager'}
              {activeTab === 'payments' && '💳 Payment Transactions'}
              {activeTab === 'messages' && '💬 Contact Messages'}
              {activeTab === 'users' && '👥 User Management'}
              {activeTab === 'analytics' && '📈 Analytics & Reports'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h1>
            <a href="/" style={{ color: '#6366f1', textDecoration: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>← Back</a>
          </div>

          {/* Content Area */}
          <div style={{ padding: '40px' }}>
            {activeTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                  {[
                    { label: 'Total Users', value: '10,234', change: '+12%' },
                    { label: 'API Calls', value: '1.2M', change: '+23%' },
                    { label: 'Revenue', value: '$45,230', change: '+8%' },
                    { label: 'Uptime', value: '99.9%', change: '+0.1%' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '24px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '12px', opacity: 0.6, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                      <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>{stat.value}</div>
                      <p style={{ fontSize: '12px', color: '#22c55e', margin: 0 }}>{stat.change} from last month</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: '600' }}>Recent Activity</h3>
                  <div style={{ opacity: 0.6, fontSize: '14px' }}>
                    <p>• 2,341 API calls in the last hour</p>
                    <p>• 234 new user registrations today</p>
                    <p>• 8 new blog posts published</p>
                    <p>• 45 contact form submissions</p>
                    <p>• System uptime: 100% (last 30 days)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Create New Blog Post</h3>
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      marginBottom: '12px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  <textarea
                    placeholder="Blog Content"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      marginBottom: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      minHeight: '120px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                    Publish Post
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Title</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Date</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Views</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { title: 'Getting Started with AI', date: 'Jan 18, 2026', views: '1,234' },
                        { title: 'Advanced ML Techniques', date: 'Jan 15, 2026', views: '892' },
                        { title: 'Future of Automation', date: 'Jan 12, 2026', views: '2,103' },
                      ].map((blog, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '16px' }}>{blog.title}</td>
                          <td style={{ padding: '16px', opacity: 0.7 }}>{blog.date}</td>
                          <td style={{ padding: '16px', opacity: 0.7 }}>{blog.views}</td>
                          <td style={{ padding: '16px' }}>
                            <button style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', padding: '6px 12px', borderRadius: '6px', color: '#6366f1', cursor: 'pointer', fontSize: '12px', marginRight: '8px', fontWeight: '600' }}>Edit</button>
                            <button style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Transaction ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Amount</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Method</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'TXN001', amount: '$99.00', method: 'Khalti', status: 'Completed' },
                      { id: 'TXN002', amount: '$29.00', method: 'eSewa', status: 'Completed' },
                      { id: 'TXN003', amount: '$199.00', method: 'Khalti', status: 'Completed' },
                    ].map((tx, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px' }}>{tx.id}</td>
                        <td style={{ padding: '16px', fontWeight: '600' }}>{tx.amount}</td>
                        <td style={{ padding: '16px', opacity: 0.7 }}>{tx.method}</td>
                        <td style={{ padding: '16px' }}><span style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{tx.status}</span></td>
                        <td style={{ padding: '16px', opacity: 0.7 }}>Jan 20, 2026</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px' }}>
                {[
                  { name: 'John Doe', email: 'john@example.com', subject: 'Product Inquiry', message: 'I would like to know more about your enterprise plan.' },
                  { name: 'Jane Smith', email: 'jane@example.com', subject: 'Technical Support', message: 'Having issues with API integration.' },
                  { name: 'Bob Johnson', email: 'bob@example.com', subject: 'Partnership', message: 'Interested in partnership opportunities.' },
                ].map((msg, idx) => (
                  <div key={idx} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{msg.name}</div>
                        <div style={{ fontSize: '13px', opacity: 0.6 }}>{msg.email}</div>
                      </div>
                      <button style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', padding: '6px 12px', borderRadius: '6px', color: '#6366f1', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Reply</button>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>{msg.subject}</div>
                    <p style={{ fontSize: '13px', opacity: 0.7, margin: '8px 0 0 0' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{ maxWidth: '600px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', marginBottom: '20px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>API Configuration</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>API Key</label>
                    <input type="password" defaultValue="sk_prod_1234567890" style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#ffffff', fontSize: '13px', fontFamily: 'monospace' }} />
                  </div>
                  <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Regenerate Key</button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Billing</h3>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>
                    <p>Plan: Professional</p>
                    <p>Billing Cycle: Monthly</p>
                    <p>Next Billing Date: February 20, 2026</p>
                  </div>
                </div>
              </div>
            )}

            {!['overview', 'blog', 'payments', 'messages', 'settings'].includes(activeTab) && (
              <div style={{ textAlign: 'center', opacity: 0.5, padding: '60px 20px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔧</div>
                <p style={{ fontSize: '18px' }}>This section is under development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
