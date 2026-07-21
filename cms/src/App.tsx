import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Login } from './components/Login'
import { MotorBekasPanel } from './components/MotorBekasPanel'
import { MobilBekasPanel } from './components/MobilBekasPanel'
import { HargaEmasPanel } from './components/HargaEmasPanel'
import type { Session } from '@supabase/supabase-js'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [activeTab, setActiveTab] = useState('motor')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Login />
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="layout">
      {/* Mobile Header for hamburger menu */}
      <div className="mobile-header">
        <div className="brand">
          <h1>Unified CMS</h1>
        </div>
        <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
      </div>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="brand desktop-only">
          <h1>Unified CMS</h1>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'motor' ? 'active' : ''}`}
            onClick={() => { setActiveTab('motor'); setIsSidebarOpen(false); }}
          >
            🏍️ Motor Bekas
          </button>
          <button 
            className={`nav-item ${activeTab === 'mobil' ? 'active' : ''}`}
            onClick={() => { setActiveTab('mobil'); setIsSidebarOpen(false); }}
          >
            🚗 Mobil Bekas
          </button>
          <button 
            className={`nav-item ${activeTab === 'emas' ? 'active' : ''}`}
            onClick={() => { setActiveTab('emas'); setIsSidebarOpen(false); }}
          >
            💰 Harga Emas
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-email">{session.user.email}</div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      <main className="main-area">
        {activeTab === 'motor' && <MotorBekasPanel />}
        {activeTab === 'mobil' && <MobilBekasPanel />}
        {activeTab === 'emas' && <HargaEmasPanel />}
      </main>
    </div>
  )
}

export default App
