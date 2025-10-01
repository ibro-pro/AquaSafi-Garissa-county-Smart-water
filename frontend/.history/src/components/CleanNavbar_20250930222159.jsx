import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CleanLoginPopup from './CleanLoginPopup';
import { 
  FaWater,
  FaBars, 
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaChartLine,
  FaCog
} from 'react-icons/fa';

const CleanNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState('login'); // 'login' or 'signup'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLogin = () => {
    setLoginMode('login');
    setIsLoginOpen(true);
    closeMenu();
  };

  const openSignup = () => {
    setLoginMode('signup');
    setIsLoginOpen(true);
    closeMenu();
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const navLinks = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/about', icon: FaInfoCircle, label: 'About' },
    { to: '/services', icon: FaChartLine, label: 'Services' },
    { to: '/contact', icon: FaPhone, label: 'Contact' }
  ];

  return (
    <>
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#0891b2',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            <FaWater style={{ marginRight: '10px', color: '#0891b2' }} />
            Aqua<span style={{ color: '#fbbf24' }}>Safi</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '30px'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#0891b2' : '#4b5563',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '16px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                })}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f0f9ff';
                  e.target.style.color = '#0891b2';
                }}
                onMouseOut={(e) => {
                  const isActive = e.target.getAttribute('aria-current') === 'page';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = isActive ? '#0891b2' : '#4b5563';
                }}
              >
                <link.icon />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '15px'
          }} className="desktop-auth">
            <button
              onClick={openLogin}
              style={{
                backgroundColor: 'transparent',
                color: '#0891b2',
                border: '2px solid #0891b2',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#0891b2';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#0891b2';
              }}
            >
              Login
            </button>
            <button
              onClick={openSignup}
              style={{
                backgroundColor: '#0891b2',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#0e7490';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#0891b2';
              }}
            >
              Sign Up
            </button>
            <Link
              to="/dashboard"
              style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#047857';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#059669';
              }}
            >
              <FaChartLine />
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            style={{
              display: 'block',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#0891b2',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '20px',
            display: 'block'
          }} className="mobile-menu">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#0891b2' : '#4b5563',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s ease'
                  })}
                >
                  <link.icon />
                  {link.label}
                </NavLink>
              ))}
              
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '15px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <button
                  onClick={openLogin}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0891b2',
                    border: '2px solid #0891b2',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Login
                </button>
                <button
                  onClick={openLogin}
                  style={{
                    backgroundColor: '#0891b2',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign Up
                </button>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <FaChartLine />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '70px' }}></div>

      {/* Login Popup */}
      {isLoginOpen && (
        <CleanLoginPopup isOpen={isLoginOpen} onClose={closeLogin} />
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-auth {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CleanNavbar;