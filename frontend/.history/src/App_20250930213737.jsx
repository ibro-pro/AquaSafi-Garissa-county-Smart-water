import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
// Components
import ProfessionalNavbar from './components/ProfessionalNavbar'
import UserDashboard from './components/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <>
              <CleanNavbar />
              <BasicHome />
            </>
          } />
          <Route path="/about" element={
            <>
              <CleanNavbar />
              <About />
            </>
          } />
          <Route path="/services" element={
            <>
              <CleanNavbar />
              <Services />
            </>
          } />
          <Route path="/contact" element={
            <>
              <CleanNavbar />
              <Contact />
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
  );
}

export default App
