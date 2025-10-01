
import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import AquaSafiNavbar from './components/AquaSafiNavbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <AquaSafiNavbar />
        <section id="home">
          <Home/>
        </section>
        <section id="about">
          <About/>
        </section>
        <section id="contact">
          <Contact/>
        </section>
      </div>
    </ErrorBoundary>
  )
}

export default App
