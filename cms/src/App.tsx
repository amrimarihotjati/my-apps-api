import { useState } from 'react'
import { MotorBekasPanel } from './components/MotorBekasPanel'
import { MobilBekasPanel } from './components/MobilBekasPanel'
import { HargaEmasPanel } from './components/HargaEmasPanel'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('motor')

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <h1>Unified CMS</h1>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'motor' ? 'active' : ''}`}
            onClick={() => setActiveTab('motor')}
          >
            🏍️ Motor Bekas
          </button>
          <button 
            className={`nav-item ${activeTab === 'mobil' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobil')}
          >
            🚗 Mobil Bekas
          </button>
          <button 
            className={`nav-item ${activeTab === 'emas' ? 'active' : ''}`}
            onClick={() => setActiveTab('emas')}
          >
            💰 Harga Emas
          </button>
        </nav>
      </aside>

      <main className="main-area">
        {activeTab === 'motor' && <MotorBekasPanel />}
        {activeTab === 'mobil' && <MobilBekasPanel />}
        {activeTab === 'emas' && <HargaEmasPanel />}
      </main>
    </div>
  )
}

export default App
