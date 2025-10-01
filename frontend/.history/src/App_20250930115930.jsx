
import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import SafeHome from './components/SafeHome'
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <SafeHome />
        {/* <Home/>
        <About/>
        <Contact/> */}
      </div>
    </ErrorBoundary>
  )
}

export default App
