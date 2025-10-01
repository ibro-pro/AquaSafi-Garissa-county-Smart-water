import React from 'react'

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'red',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold'
    }}>
      <div>
        <h1>REACT TEST - WORKING!</h1>
        <p>If you see this, React is rendering</p>
      </div>
    </div>
  )
}
            <Route path="/about" element={
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
