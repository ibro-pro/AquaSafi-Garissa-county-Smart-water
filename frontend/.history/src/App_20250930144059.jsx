
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import SimpleProfessionalNavbar from './components/SimpleProfessionalNavbar'
import SimpleUserDashboard from './components/SimpleUserDashboard'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            {/* Dashboard Route (No Navbar) */}
            <Route path="/dashboard" element={<SimpleUserDashboard />} />
            
            {/* Regular Pages (With Navbar) */}
            <Route path="/" element={
              <>
                <SimpleProfessionalNavbar />
                <Home />
              </>
            } />
            <Route path="/about" element={
              <>
                <SimpleProfessionalNavbar />
                <About />
              </>
            } />
            <Route path="/services" element={
              <>
                <SimpleProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/monitoring" element={
              <>
                <SimpleProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/community" element={
              <>
                <SimpleProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/mobile" element={
              <>
                <SimpleProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/analytics" element={
              <>
                <SimpleProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/contact" element={
              <>
                <SimpleProfessionalNavbar />
                <Contact />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
