import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import Home from './pages/Home'
import About from './pages/About'

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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
