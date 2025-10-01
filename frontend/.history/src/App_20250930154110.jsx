import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <>
              <ProfessionalNavbar />
              <Home />
            </>
          } />
          <Route path="/about" element={
            <>
              <ProfessionalNavbar />
              <About />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
