import React from 'react'
import BasicHome from './pages/BasicHome'

function App() {
  console.log('App component is rendering!');
  
  return (
    <div style={{ minHeight: '100vh' }}>
      <BasicHome />
    </div>
  );
}

export default App
