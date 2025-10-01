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
              <CleanNavbar />
              <Home />
            </>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <>
              <CleanNavbar />
              <About />
            </>
          } />
          
          {/* Services Page */}
          <Route path="/services" element={
            <>
              <CleanNavbar />
              <Services />
            </>
          } />
          
          {/* Contact Page */}
          <Route path="/contact" element={
            <>
              <CleanNavbar />
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
              <CleanNavbar />
              <Home />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
