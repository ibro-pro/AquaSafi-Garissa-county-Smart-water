import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaWater,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';

const LoginPopup = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form data
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  // Reset form when tab changes
  useEffect(() => {
    setErrors({});
    setSuccess(false);
    setIsLoading(false);
  }, [activeTab]);

  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle signup form change
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate login form
  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate signup form
  const validateSignup = () => {
    const newErrors = {};
    
    if (!signupData.firstName) newErrors.firstName = 'First name is required';
    if (!signupData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signupData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!signupData.phone) newErrors.phone = 'Phone number is required';
    if (!signupData.location) newErrors.location = 'Location is required';
    if (!signupData.role) newErrors.role = 'Please select your role';
    
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signupData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      console.log('Login data:', loginData);
      
      // Close modal after successful login
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    }, 2000);
  };

  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      console.log('Signup data:', signupData);
      
      // Close modal after successful signup
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    }, 2000);
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="flex min-h-[700px] max-h-[90vh]">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-600 to-emerald-600 text-white p-12 flex-col justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <FaWater className="text-5xl" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold mb-4">
                  Welcome to Aqua<span className="text-yellow-300">Safi</span>
                </h2>
                
                <p className="text-xl mb-8 opacity-90">
                  Join Garissa County's smart water management revolution
                </p>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-yellow-300 mr-3 flex-shrink-0" />
                    <span>Real-time water monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-yellow-300 mr-3 flex-shrink-0" />
                    <span>Community engagement platform</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-yellow-300 mr-3 flex-shrink-0" />
                    <span>Data-driven insights</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-yellow-300 mr-3 flex-shrink-0" />
                    <span>Mobile-first experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Forms */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-start">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {activeTab === 'login' ? 'Login Successful!' : 'Account Created!'}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'login' 
                      ? 'Welcome back to AquaSafi!' 
                      : 'Welcome to the AquaSafi community!'
                    }
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Tab Headers */}
                  <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        activeTab === 'login'
                          ? 'bg-white text-cyan-600 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setActiveTab('signup')}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        activeTab === 'signup'
                          ? 'bg-white text-cyan-600 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'login' ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
                        <p className="text-gray-600 mb-8">Sign in to access your AquaSafi dashboard</p>

                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                          {/* Email Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                  errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>

                          {/* Password Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                  errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter your password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                            {errors.password && (
                              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                          </div>

                          {/* Remember Me & Forgot Password */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                              />
                              <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                              type="button"
                              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                            >
                              Forgot password?
                            </button>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isLoading ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                Signing In...
                              </>
                            ) : (
                              'Sign In'
                            )}
                          </button>

                          {/* Social Login */}
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('google')}
                              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              <FaGoogle className="text-red-500" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('facebook')}
                              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              <FaFacebook className="text-blue-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('twitter')}
                              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              <FaTwitter className="text-blue-400" />
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[650px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Join AquaSafi</h3>
                        <p className="text-gray-600 mb-6">Create your account to get started</p>

                        <form onSubmit={handleSignupSubmit} className="space-y-6 pb-8">
                          {/* Name Fields */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                              </label>
                              <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  name="firstName"
                                  value={signupData.firstName}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="First name"
                                />
                              </div>
                              {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                              </label>
                              <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  name="lastName"
                                  value={signupData.lastName}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="Last name"
                                />
                              </div>
                              {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                              )}
                            </div>
                          </div>

                          {/* Email Field */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                  errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>

                          {/* Phone & Location */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                              </label>
                              <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="tel"
                                  name="phone"
                                  value={signupData.phone}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="Phone number"
                                />
                              </div>
                              {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                              </label>
                              <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  name="location"
                                  value={signupData.location}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.location ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="Your location"
                                />
                              </div>
                              {errors.location && (
                                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                              )}
                            </div>
                          </div>

                          {/* Organization & Role */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Organization (Optional)
                              </label>
                              <div className="relative">
                                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  name="organization"
                                  value={signupData.organization}
                                  onChange={handleSignupChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                                  placeholder="Organization name"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                              </label>
                              <select
                                name="role"
                                value={signupData.role}
                                onChange={handleSignupChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                  errors.role ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select your role</option>
                                <option value="community-member">Community Member</option>
                                <option value="water-committee">Water Committee</option>
                                <option value="ngo-worker">NGO Worker</option>
                                <option value="government-official">Government Official</option>
                                <option value="researcher">Researcher</option>
                                <option value="other">Other</option>
                              </select>
                              {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                              )}
                            </div>
                          </div>

                          {/* Password Fields */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                              </label>
                              <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  name="password"
                                  value={signupData.password}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="Create password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                              </label>
                              <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  name="confirmPassword"
                                  value={signupData.confirmPassword}
                                  onChange={handleSignupChange}
                                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="Confirm password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                              )}
                            </div>
                          </div>

                          {/* Checkboxes */}
                          <div className="space-y-3">
                            <label className="flex items-start">
                              <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={signupData.agreeToTerms}
                                onChange={handleSignupChange}
                                className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 mt-1"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-cyan-600 hover:text-cyan-700 font-medium">
                                  Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-cyan-600 hover:text-cyan-700 font-medium">
                                  Privacy Policy
                                </button>
                              </span>
                            </label>
                            {errors.agreeToTerms && (
                              <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
                            )}
                            
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="subscribeNewsletter"
                                checked={signupData.subscribeNewsletter}
                                onChange={handleSignupChange}
                                className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                Subscribe to newsletter for water management updates
                              </span>
                            </label>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isLoading ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                Creating Account...
                              </>
                            ) : (
                              'Create Account'
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPopup;