import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import TestHome from './pages/TestHome'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import UserDashboard from './components/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <>
              <ProfessionalNavbar />
              <TestHome />
            </>
          } />
          <Route path="/about" element={
            <>
              <ProfessionalNavbar />
              <About />
            </>
          } />
          <Route path="/contact" element={
            <>
              <ProfessionalNavbar />
              <Contact />
            </>
          } />
          <Route path="/services" element={
            <>
              <ProfessionalNavbar />
              <Services />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <UserDashboard />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
