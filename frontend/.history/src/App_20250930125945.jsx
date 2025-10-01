
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import UserDashboard from './components/UserDashboard'
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
            <Route path="/dashboard" element={<UserDashboard />} />
            
            {/* Regular Pages (With Navbar) */}
            <Route path="/*" element={
              <>
                <ProfessionalNavbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/monitoring" element={<Services />} />
                  <Route path="/services/community" element={<Services />} />
                  <Route path="/services/mobile" element={<Services />} />
                  <Route path="/services/analytics" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
