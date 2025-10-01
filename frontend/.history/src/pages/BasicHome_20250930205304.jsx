import React from 'react';

const BasicHome = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0891b2 0%, #059669 100%)',
      padding: '40px 20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Aqua<span style={{ color: '#fbbf24' }}>Safi</span>
        </h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Garissa Smart Water & Environmental Resilience System
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
          Transforming water security through real-time monitoring, community engagement, and data-driven environmental resilience
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: '#fbbf24',
            color: '#0891b2',
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Explore Dashboard
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid white',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Report Issue Now
          </button>
        </div>

        <div style={{ 
          marginTop: '80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>287+</h3>
            <p style={{ fontSize: '1.1rem' }}>Water Points Monitored</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>1567+</h3>
            <p style={{ fontSize: '1.1rem' }}>Community Reports</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>50K+</h3>
            <p style={{ fontSize: '1.1rem' }}>Community Members</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>12+</h3>
            <p style={{ fontSize: '1.1rem' }}>Partner Organizations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHome;