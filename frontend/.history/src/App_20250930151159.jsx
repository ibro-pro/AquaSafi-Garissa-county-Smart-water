import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'import React from 'react'

import ErrorBoundary from './components/ErrorBoundary'import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProfessionalNavbar from './components/ProfessionalNavbar'import ErrorBoundary from './components/ErrorBoundary'

import SimpleUserDashboard from './components/SimpleUserDashboard'import ProfessionalNavbar from './components/ProfessionalNavbar'

import SimpleHome from './pages/SimpleHome'import SimpleUserDashboard from './components/SimpleUserDashboard'

import About from './pages/About'import SimpleHome from './pages/SimpleHome'

import Contact from './pages/Contact'import About from './pages/About'

import Services from './pages/Services'import Contact from './pages/Contact'

import Services from './pages/Services'

function App() {

  return (function App() {

    <ErrorBoundary>  return (

      <BrowserRouter>    <ErrorBoundary>

        <div className="min-h-screen">      <BrowserRouter>

          <Routes>        <div className="min-h-screen">

            {/* Dashboard Route (No Navbar) */}          <Routes>

            <Route path="/dashboard" element={<SimpleUserDashboard />} />            {/* Dashboard Route (No Navbar) */}

                        <Route path="/dashboard" element={<SimpleUserDashboard />} />

            {/* Regular Pages (With Navbar) */}            

            <Route path="/" element={            {/* Regular Pages (With Navbar) */}

              <>            <Route path="/" element={

                <ProfessionalNavbar />              <>

                <SimpleHome />                <ProfessionalNavbar />

              </>                <SimpleHome />

            } />              </>

            <Route path="/about" element={            } />

              <>            <Route path="/about" element={

                <ProfessionalNavbar />              <>

                <About />                <ProfessionalNavbar />

              </>                <About />

            } />              </>

            <Route path="/services" element={            } />

              <>            <Route path="/services" element={

                <ProfessionalNavbar />              <>

                <Services />                <ProfessionalNavbar />

              </>                <Services />

            } />              </>

            <Route path="/services/monitoring" element={            } />

              <>            <Route path="/services/monitoring" element={

                <ProfessionalNavbar />              <>

                <Services />                <ProfessionalNavbar />

              </>                <Services />

            } />              </>

            <Route path="/services/community" element={            } />

              <>            <Route path="/services/community" element={

                <ProfessionalNavbar />              <>

                <Services />                <ProfessionalNavbar />

              </>                <Services />

            } />              </>

            <Route path="/services/mobile" element={            } />

              <>            <Route path="/services/mobile" element={

                <ProfessionalNavbar />              <>

                <Services />                <ProfessionalNavbar />

              </>                <Services />

            } />              </>

            <Route path="/services/analytics" element={            } />

              <>            <Route path="/services/analytics" element={

                <ProfessionalNavbar />              <>

                <Services />                <ProfessionalNavbar />

              </>                <Services />

            } />              </>

            <Route path="/contact" element={            } />

              <>            <Route path="/contact" element={

                <ProfessionalNavbar />              <>

                <Contact />                <ProfessionalNavbar />

              </>                <Contact />

            } />              </>

          </Routes>            } />

        </div>          </Routes>

      </BrowserRouter>        </div>

    </ErrorBoundary>      </BrowserRouter>

  )    </ErrorBoundary>

}  )

}

export default App            <Route path="/about" element={
              <>
                <ProfessionalNavbar />
                <About />
              </>
            } />
            <Route path="/services" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/monitoring" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/community" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/mobile" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/services/analytics" element={
              <>
                <ProfessionalNavbar />
                <Services />
              </>
            } />
            <Route path="/contact" element={
              <>
                <ProfessionalNavbar />
                <Contact />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
