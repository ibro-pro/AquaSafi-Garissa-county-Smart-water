import React from 'react';

const MinimalTest = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '48px' }}>HELLO WORLD - TEST COMPONENT</h1>
      <p style={{ color: 'black', fontSize: '24px' }}>If you can see this, React is working!</p>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px', border: '2px solid black' }}>
        <h2>AquaSafi Test</h2>
        <p>This is a minimal test component</p>
      </div>
    </div>
  );
};

export default MinimalTest;