import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaUsers, FaUserShield, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CleanLoginPopup = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Reset form mode when initialMode changes
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

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
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isAdminLogin) {
        // Admin login API call
        const response = await fetch('http://localhost:5000/api/users/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          // Store admin token and data
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('admin', JSON.stringify(data.admin));
          
          // Notify parent component
          if (onLoginSuccess) {
            onLoginSuccess(data.admin, data.token, 'admin');
          }
          
          // Redirect to admin dashboard
          navigate('/admin');
          onClose();
        } else {
          setError(data.message || 'Admin login failed');
        }
      } else if (isLogin) {
        // Regular user login API call
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Notify parent component
          if (onLoginSuccess) {
            onLoginSuccess(data.user, data.token, 'user');
          }
          
          // Redirect to user dashboard
          navigate('/dashboard');
          onClose();
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        // Registration API call
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            location: formData.location,
            community: formData.community,
            role: formData.role,
            organization: formData.organization,
            nationalId: formData.nationalId,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone
          })
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Notify parent component
          if (onLoginSuccess) {
            onLoginSuccess(data.user, data.token, 'user');
          }
          
          // Switch to login mode instead of closing
          setIsLogin(true);
          setIsAdminLogin(false);
          setFormData({
            email: formData.email, // Keep the email for login
            password: '',
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
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsAdminLogin(false);
    setError('');
    setFormData({
      email: '',
      password: '',
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

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
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
        maxWidth: isAdminLogin || isLogin ? '450px' : '600px',
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '10px'
          }}>
            {isAdminLogin && <FaUserShield style={{ color: '#dc2626', fontSize: '24px' }} />}
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: isAdminLogin ? '#dc2626' : '#0891b2',
              marginBottom: '10px'
            }}>
              {isAdminLogin 
                ? 'Admin Access' 
                : isLogin 
                  ? 'Welcome Back' 
                  : 'Join AquaSafi'
              }
            </h2>
          </div>
          <p style={{
            color: '#6b7280',
            fontSize: '16px'
          }}>
            {isAdminLogin 
              ? 'Sign in to access the administration dashboard' 
              : isLogin 
                ? 'Sign in to access your water management dashboard' 
                : 'Create your account to start monitoring water resources'
            }
          </p>
        </div>

        {/* Admin/User Switch (Only for login mode) */}
        {isLogin && !isAdminLogin && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <button
              onClick={toggleAdminLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#6b7280',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              <FaUserShield />
              Admin Login
            </button>
          </div>
        )}

        {/* Back to User Login (Admin mode) */}
        {isAdminLogin && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <button
              onClick={toggleAdminLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#6b7280',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              <FaUser />
              Back to User Login
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Registration Fields - Only show for user registration */}
          {!isLogin && !isAdminLogin && (
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white',
                          appearance: 'none'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                      disabled={isLoading}
                      style={{
                        width: '100%', 
                        padding: '12px 45px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '10px',
                        fontSize: '16px', 
                        outline: 'none', 
                        transition: 'border-color 0.3s ease', 
                        boxSizing: 'border-box',
                        backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                        disabled={isLoading}
                        style={{
                          width: '100%', 
                          padding: '12px 45px', 
                          border: '2px solid #e5e7eb', 
                          borderRadius: '10px',
                          fontSize: '16px', 
                          outline: 'none', 
                          transition: 'border-color 0.3s ease', 
                          boxSizing: 'border-box',
                          backgroundColor: isLoading ? '#f9fafb' : 'white'
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
                placeholder={isAdminLogin ? "Enter admin email" : "Enter your email"}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 45px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                  backgroundColor: isLoading ? '#f9fafb' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = isAdminLogin ? '#dc2626' : '#0891b2'}
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
                placeholder={isAdminLogin ? "Enter admin password" : "Enter your password"}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 45px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                  backgroundColor: isLoading ? '#f9fafb' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = isAdminLogin ? '#dc2626' : '#0891b2'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  padding: '5px'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Registration only) */}
          {!isLogin && !isAdminLogin && (
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
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: isLoading ? '#f9fafb' : 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          )}

          {/* Forgot Password (Login only) */}
          {isLogin && !isAdminLogin && (
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
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading 
                ? '#9ca3af' 
                : isAdminLogin 
                  ? '#dc2626' 
                  : '#0891b2',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = isAdminLogin ? '#b91c1c' : '#0e7490';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = isAdminLogin ? '#dc2626' : '#0891b2';
              }
            }}
          >
            {isLoading 
              ? 'Processing...' 
              : isAdminLogin 
                ? 'Admin Sign In' 
                : isLogin 
                  ? 'Sign In' 
                  : 'Create Account'
            }
          </button>

          {/* Toggle Mode (Only show for user login/register) */}
          {!isAdminLogin && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  disabled={isLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0891b2',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}
        </form>

        {/* Admin Demo Credentials */}
        {isAdminLogin && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <strong>Demo Admin Credentials:</strong><br />
            Email: admin@watermanagement.com<br />
            Password: admin123
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanLoginPopup;