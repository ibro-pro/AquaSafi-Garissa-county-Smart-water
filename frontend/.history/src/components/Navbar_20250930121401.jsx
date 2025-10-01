
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMosque, 
  FaBars, 
  FaTimes,
  FaChevronDown,
  FaHandsHelping,
  FaBook,
  FaUsers,
  FaHeart
} from 'react-icons/fa';

const Navbar = () => {
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

  const programsMenu = [
    {
      icon: <FaBook className="text-green-600" />,
      title: "Da'wah Programs",
      description: "Islamic outreach and education",
      path: "/programs/dawah"
    },
    {
      icon: <FaBook className="text-green-600" />,
      title: "Islamic Education",
      description: "Quran and Islamic studies",
      path: "/programs/education"
    },
    {
      icon: <FaHandsHelping className="text-green-600" />,
      title: "Charity Services",
      description: "Support for those in need",
      path: "/programs/charity"
    },
    {
      icon: <FaUsers className="text-green-600" />,
      title: "Community Assistance",
      description: "Social support programs",
      path: "/programs/assistance"
    }
  ];

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/programs", label: "Programs", hasDropdown: true },
    { path: "/charity", label: "Charity" },
    { path: "/community", label: "Community" },
    { path: "/contact", label: "Contact" }
  ];

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-xl py-2' 
        : 'bg-white shadow-lg py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaMosque className="text-white text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-700 leading-tight">
                SHOW ME THE
              </span>
              <span className="text-lg font-semibold text-green-600 leading-tight">
                REAL PATH
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('programs')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 group">
                      <span>{link.label}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === 'programs' ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-xs mt-1 group-hover:text-green-700" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'programs' && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden"
                        >
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-green-700 mb-3 uppercase tracking-wide">
                              Our Programs
                            </h3>
                            <div className="space-y-2">
                              {programsMenu.map((program) => (
                                <NavLink
                                  key={program.path}
                                  to={program.path}
                                  className={({ isActive }) =>
                                    `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                                      isActive
                                        ? 'bg-green-50 border border-green-200'
                                        : 'hover:bg-green-50 hover:border hover:border-green-100'
                                    }`
                                  }
                                >
                                  <div className="flex-shrink-0">
                                    {program.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 group-hover:text-green-700">
                                      {program.title}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                      {program.description}
                                    </div>
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-4 py-3 font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-green-700'
                          : 'text-gray-700 hover:text-green-700'
                      }`
                    }
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full"
                      />
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <NavLink
              to="/get-started"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <FaHeart className="text-sm" />
              <span>Get Started</span>
            </NavLink>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden bg-green-50 hover:bg-green-100 p-3 rounded-xl transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="text-green-700 text-xl" />
            ) : (
              <FaBars className="text-green-700 text-xl" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden bg-white border-t border-gray-200 mt-4 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    {link.hasDropdown ? (
                      <div className="px-4 py-3">
                        <div className="font-medium text-gray-900 mb-2">
                          Programs
                        </div>
                        <div className="space-y-2 ml-4">
                          {programsMenu.map((program) => (
                            <NavLink
                              key={program.path}
                              to={program.path}
                              className={({ isActive }) =>
                                `block py-2 px-3 rounded-lg transition-all duration-200 ${
                                  isActive
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                                }`
                              }
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center space-x-3">
                                {program.icon}
                                <div>
                                  <div className="font-medium">{program.title}</div>
                                  <div className="text-sm text-gray-500">{program.description}</div>
                                </div>
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block px-4 py-3 mx-2 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-green-50 text-green-700 font-semibold border border-green-200'
                              : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Button */}
                <div className="px-4 pt-4 border-t border-gray-200">
                  <NavLink
                    to="/get-started"
                    className="block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-center py-3 px-4 rounded-xl font-semibold shadow-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaHeart />
                      <span>Get Started Today</span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;