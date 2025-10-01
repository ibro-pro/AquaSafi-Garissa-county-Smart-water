import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfessionalNavbar from './components/ProfessionalNavbar'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <>
              <ProfessionalNavbar />
              <div style={{
                padding: '6rem 2rem 2rem 2rem',
                backgroundColor: '#059669',
                color: 'white',
                minHeight: '100vh'
              }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Step 2: Navbar Added
                </h1>
                <p style={{ fontSize: '1.25rem' }}>
                  Testing if ProfessionalNavbar works
                </p>
              </div>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
