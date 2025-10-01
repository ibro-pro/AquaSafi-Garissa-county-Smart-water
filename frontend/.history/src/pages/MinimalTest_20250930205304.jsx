import React from 'react';

const MinimalTest = () => {
  console.log('MinimalTest component is rendering!');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#00ff00', 
      minHeight: '100vh',
      display: 'block',
      position: 'relative',
      zIndex: 1000
    }}>
      <h1 style={{ 
        color: '#ff0000', 
        fontSize: '48px',
        margin: '20px 0',
        display: 'block'
      }}>
        HELLO WORLD - TESTING REACT!
      </h1>
      <p style={{ 
        color: '#000000', 
        fontSize: '24px',
        margin: '20px 0',
        display: 'block'
      }}>
        If you can see this GREEN background and RED text, React is working!
      </p>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '30px', 
        margin: '20px 0', 
        border: '5px solid #000000',
        display: 'block'
      }}>
        <h2 style={{ color: '#0000ff', fontSize: '32px' }}>AquaSafi Status Test</h2>
        <p style={{ color: '#000000', fontSize: '18px' }}>This is a minimal test component with inline styles</p>
        <button style={{
          backgroundColor: '#ff6600',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }} onClick={() => alert('Button clicked! React is working!')}>
          Click Me to Test React
        </button>
      </div>
    </div>
  );
};

export default MinimalTest;