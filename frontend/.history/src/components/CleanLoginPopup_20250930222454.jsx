import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaUsers } from 'react-icons/fa';

const CleanLoginPopup = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Login fields
    email: '',
    password: '',
    // Registration fields
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    location: '',
    community: '',
    role: '',
    organization: '',
    nationalId: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
      alert('Login functionality would be implemented here');
    } else {
      console.log('Registration attempt:', formData);
      alert('Registration functionality would be implemented here');
    }
    onClose();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      // Login fields
      email: '',
      password: '',
      // Registration fields
      confirmPassword: '',
      fullName: '',
      phoneNumber: '',
      location: '',
      community: '',
      role: '',
      organization: '',
      nationalId: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: isLogin ? '450px' : '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#0891b2',
            marginBottom: '10px'
          }}>
            {isLogin ? 'Welcome Back' : 'Join AquaSafi'}
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '16px'
          }}>
            {isLogin 
              ? 'Sign in to access your water management dashboard' 
              : 'Create your account to start monitoring water resources'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Registration Fields */}
          {!isLogin && (
            <>
              {/* Personal Information Section */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0891b2', marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                  Personal Information
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* National ID */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      National ID *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaIdCard style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        placeholder="Enter your national ID"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {/* Phone Number */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Phone Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaPhone style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+254 700 123456"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Role *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaUsers style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="">Select your role</option>
                        <option value="community-member">Community Member</option>
                        <option value="water-committee">Water Committee Member</option>
                        <option value="community-leader">Community Leader</option>
                        <option value="ngo-worker">NGO Worker</option>
                        <option value="government-official">Government Official</option>
                        <option value="health-worker">Health Worker</option>
                        <option value="volunteer">Volunteer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0891b2', marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                  Location Information
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {/* Location */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Location/Village *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaMapMarkerAlt style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Garissa Town, Dadaab, Hulugho"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Community/Ward */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Community/Ward *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaUsers style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="community"
                        value={formData.community}
                        onChange={handleInputChange}
                        placeholder="e.g., Iftin, Sankuri, Township"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Information Section */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0891b2', marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                  Organization (Optional)
                </h3>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Organization/Institution
                  </label>
                  <div style={{ position: 'relative' }}>
                    <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="e.g., Ministry of Water, UNICEF, Local NGO"
                      style={{
                        width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                        fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0891b2', marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                  Emergency Contact
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {/* Emergency Contact Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Emergency Contact Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="Emergency contact full name"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Emergency Contact Phone *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <FaPhone style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        placeholder="+254 700 123456"
                        required
                        style={{
                          width: '100%', padding: '12px 45px', border: '2px solid #e5e7eb', borderRadius: '10px',
                          fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease', boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '12px 45px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: isLogin ? '20px' : '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 45px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Registration only) */}
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '12px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          )}

          {/* Forgot Password (Login only) */}
          {isLogin && (
            <div style={{ textAlign: 'right', marginBottom: '25px' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0891b2',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#0891b2',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0e7490'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0891b2'}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          {/* Toggle Mode */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0891b2',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CleanLoginPopup;