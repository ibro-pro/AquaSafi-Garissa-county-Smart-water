import React from 'react'
import MinimalTest from './pages/MinimalTest'

function App() {
  console.log('App component is rendering!');
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffff00' }}>
      <MinimalTest />
    </div>
  );
}

export default App
