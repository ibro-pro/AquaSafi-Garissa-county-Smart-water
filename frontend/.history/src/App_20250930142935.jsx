
import React from 'react'
import TestApp from './TestApp'

function App() {
  return (
    <TestApp />
        <div className="min-h-screen">
          <Routes>
            {/* Dashboard Route (No Navbar) */}
            <Route path="/dashboard" element={<UserDashboard />} />
            
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
