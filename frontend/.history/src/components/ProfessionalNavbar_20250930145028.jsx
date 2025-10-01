import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPopup from './LoginPopup';
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
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfoCircle },
    {
      name: 'Services',
      href: '/services',
      icon: FaChartLine,
      dropdown: [
        { name: 'Water Monitoring', href: '/services/monitoring', icon: FaWater },
        { name: 'Community Engagement', href: '/services/community', icon: FaUsers },
        { name: 'Mobile Solutions', href: '/services/mobile', icon: FaMobileAlt },
        { name: 'Data Analytics', href: '/services/analytics', icon: FaChartLine }
      ]
    },
    { name: 'Contact', href: '/contact', icon: FaPhone }
  ];

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    closeDropdowns();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FaWater className="text-2xl md:text-3xl text-cyan-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                AquaSafi
              </Link>
              <p className="text-xs text-gray-600 -mt-1">Water Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-200 ${
                        location.pathname.startsWith(item.href)
                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                          : scrolled
                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'
                            : 'text-white hover:text-cyan-200 hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="text-sm" />
                      <span className="font-medium">{item.name}</span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        {item.dropdown.map((dropdownItem) => (
                          <NavLink
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            onClick={closeDropdowns}
                            className={({ isActive }) =>
                              `flex items-center space-x-3 px-4 py-3 transition-colors duration-200 ${
                                isActive
                                  ? 'bg-gradient-to-r from-cyan-50 to-emerald-50 text-cyan-700 border-r-2 border-cyan-500'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`
                            }
                          >
                            <dropdownItem.icon className="text-cyan-600" />
                            <div>
                              <span className="font-medium">{dropdownItem.name}</span>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                          : scrolled
                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'
                            : 'text-white hover:text-cyan-200 hover:bg-white/10'
                      }`
                    }
                  >
                    <item.icon className="text-sm" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                )}
              </div>
            ))}

            {/* Login Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'
                    : 'text-white hover:text-cyan-200 hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg border border-gray-100 mt-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon />
                          <span>{item.name}</span>
                        </div>
                        <FaChevronDown className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <NavLink
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                closeDropdowns();
                              }}
                              className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                                  isActive
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                              }
                            >
                              <dropdownItem.icon />
                              <span>{dropdownItem.name}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                          isActive
                            ? 'bg-cyan-50 text-cyan-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-md mt-2 hover:from-cyan-600 hover:to-emerald-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Popup */}
      <AnimatePresence>
        {showLogin && (
          <LoginPopup 
            onClose={() => setShowLogin(false)}
            onLogin={() => setShowLogin(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfessionalNavbar;