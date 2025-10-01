import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWater,
  FaBars, 
  FaTimes,
  FaChevronDown,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaChartLine,
  FaUsers,
  FaMobileAlt,
  FaCog,
  FaMapMarkerAlt
} from 'react-icons/fa';

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Navigation items
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <FaHome className="w-4 h-4" />
    },
    {
      name: 'About',
      path: '/about',
      icon: <FaInfoCircle className="w-4 h-4" />
    },
    {
      name: 'Services',
      path: '/services',
      icon: <FaChartLine className="w-4 h-4" />,
      dropdown: [
        {
          name: 'Water Monitoring',
          path: '/services/monitoring',
          icon: <FaWater className="w-4 h-4 text-cyan-600" />,
          description: 'Real-time water quality tracking'
        },
        {
          name: 'Community Platform',
          path: '/services/community',
          icon: <FaUsers className="w-4 h-4 text-emerald-600" />,
          description: 'Engage with local communities'
        },
        {
          name: 'Mobile App',
          path: '/services/mobile',
          icon: <FaMobileAlt className="w-4 h-4 text-blue-600" />,
          description: 'Water management on the go'
        },
        {
          name: 'Data Analytics',
          path: '/services/analytics',
          icon: <FaChartLine className="w-4 h-4 text-purple-600" />,
          description: 'Insights and reporting tools'
        }
      ]
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: <FaPhone className="w-4 h-4" />
    }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // NavLink active styles
  const getNavLinkClass = ({ isActive }) => `
    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
    ${isActive 
      ? scrolled 
        ? 'text-cyan-600 bg-cyan-50' 
        : 'text-yellow-400 bg-white/10'
      : scrolled 
        ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50' 
        : 'text-white hover:text-yellow-400 hover:bg-white/10'
    }
  `;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <FaWater className={`text-2xl md:text-3xl transition-colors duration-300 ${
                  scrolled ? 'text-cyan-600' : 'text-white'
                }`} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Aqua<span className="text-yellow-400">Safi</span>
                </h1>
                <p className={`text-xs hidden md:block transition-colors duration-300 ${
                  scrolled ? 'text-gray-600' : 'text-gray-200'
                }`}>
                  Water Resilience System
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        location.pathname.startsWith(item.path)
                          ? scrolled 
                            ? 'text-cyan-600 bg-cyan-50' 
                            : 'text-yellow-400 bg-white/10'
                          : scrolled 
                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50' 
                            : 'text-white hover:text-yellow-400 hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              onClick={closeMenu}
                              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                            >
                              {dropdownItem.icon}
                              <div className="text-left">
                                <div className="font-medium text-gray-800">{dropdownItem.name}</div>
                                <div className="text-sm text-gray-600">{dropdownItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={getNavLinkClass}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg mt-2 py-4"
            >
              {navItems.map((item, index) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gray-50"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                onClick={closeMenu}
                                className="w-full flex items-center space-x-3 px-8 py-3 text-gray-600 hover:text-cyan-600 hover:bg-white transition-colors duration-200"
                              >
                                {dropdownItem.icon}
                                <div className="text-left">
                                  <div className="font-medium">{dropdownItem.name}</div>
                                  <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) => `
                        w-full flex items-center space-x-3 px-4 py-3 transition-colors duration-200
                        ${isActive 
                          ? 'text-cyan-600 bg-cyan-50 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="px-4 pt-4 border-t border-gray-200 mt-4">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="w-full block text-center bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ProfessionalNavbar;