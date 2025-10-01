import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
// Components
import CleanNavbar from './components/CleanNavbar'
import UserDashboard from './components/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <ProfessionalNavbar />
              <Home />
            </>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <>
              <ProfessionalNavbar />
              <About />
            </>
          } />
          
          {/* Services Page */}
          <Route path="/services" element={
            <>
              <ProfessionalNavbar />
              <Services />
            </>
          } />
          
          {/* Contact Page */}
          <Route path="/contact" element={
            <>
              <ProfessionalNavbar />
              <Contact />
            </>
          } />
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={
            <>
              <UserDashboard />
            </>
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={
            <>
              <ProfessionalNavbar />
              <Home />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
