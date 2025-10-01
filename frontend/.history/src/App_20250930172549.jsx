import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
    textAlign: 'center'
  }}>
    🌊 AquaSafi Home 🌊
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
