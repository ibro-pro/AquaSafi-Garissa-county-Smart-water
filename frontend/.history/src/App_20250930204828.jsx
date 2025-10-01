import React from 'react'
import MinimalTest from './pages/MinimalTest'

function App() {
  console.log('App component is rendering!');
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffff00' }}>
      <MinimalTest />
    </div>
  );
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
          <Route path="/contact" element={
            <>
              <ProfessionalNavbar />
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
  )
}

export default App
