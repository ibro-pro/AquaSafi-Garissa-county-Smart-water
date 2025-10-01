import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BasicHome from './pages/BasicHome'
import About from './pages/About'
import CleanServices from './pages/CleanServices'
import Contact from './pages/Contact'
import CleanNavbar from './components/CleanNavbar'
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
