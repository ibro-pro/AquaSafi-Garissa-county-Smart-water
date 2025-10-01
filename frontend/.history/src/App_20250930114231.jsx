
import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import SimpleHome from './components/SimpleHome'
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'

function App() {
  return (
    <ErrorBoundary>
      <div>
       <SimpleHome/>
        <h1 className="text-2xl font-bold text-center p-4">Welcome to My App</h1>
        {/* <About/>
        <h3>home now</h3>
        <h2> contact</h2>
        <Contact/> */}
      </div>
    </ErrorBoundary>
  )
}

export default App
