
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ProfessionalNavbar from './components/ProfessionalNavbar'
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
            {/* Dashboard Route (No Navbar) - Temporarily disabled */}
            {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
            
            {/* Regular Pages (With Navbar) */}
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
            <Route path="/services" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/monitoring" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/community" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/mobile" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/analytics" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/contact" element={
              <>
                <ProfessionalNavbar />
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
