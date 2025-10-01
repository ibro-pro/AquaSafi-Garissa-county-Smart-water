import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TestHome from './pages/TestHome'
import ProfessionalNavbar from './components/ProfessionalNavbar'

const SimpleNavbar = () => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#0891b2',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
      AquaSafi
    </h1>
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
      <button style={{
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer'
      }}>
        Login
      </button>
    </div>
  </nav>
)

const HomePage = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0891b2, #10b981)',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '80px'
  }}>
    🌊 AquaSafi Home 🌊
  </div>
)

const AboutPage = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #10b981, #0891b2)',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '80px'
  }}>
    📖 About AquaSafi 📖
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ProfessionalNavbar />
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
