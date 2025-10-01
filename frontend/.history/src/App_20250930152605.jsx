import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-blue-500 text-white p-8">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-4xl font-bold mb-4">Step 1: Router Working</h1>
              <p className="text-xl">Basic routing is functional</p>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
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
