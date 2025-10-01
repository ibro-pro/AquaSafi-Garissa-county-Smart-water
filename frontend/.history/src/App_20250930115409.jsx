
import React from 'react'
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        AquaSafi - Test Page
      </h1>
      <p className="text-lg text-center text-gray-700">
        If you can see this, React and Tailwind are working!
      </p>
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">System Status:</h2>
        <ul className="space-y-2">
          <li className="text-green-600">✅ React rendering</li>
          <li className="text-green-600">✅ Tailwind CSS working</li>
          <li className="text-green-600">✅ Vite development server</li>
        </ul>
      </div>
    </div>
  )
}

export default App
