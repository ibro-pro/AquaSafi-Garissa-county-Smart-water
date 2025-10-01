
import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Temporary simple content to test */}
        <div className="min-h-screen bg-gradient-to-br from-cyan-600 to-emerald-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Aqua<span className="text-yellow-300">Safi</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Garissa Smart Water & Environmental Resilience System
            </h2>
            <p className="text-xl mb-8">
              Simple version - checking if framer-motion is the issue
            </p>
          </div>
        </div>
        {/* <Home/>
        <About/>
        <Contact/> */}
      </div>
    </ErrorBoundary>
  )
}

export default App
