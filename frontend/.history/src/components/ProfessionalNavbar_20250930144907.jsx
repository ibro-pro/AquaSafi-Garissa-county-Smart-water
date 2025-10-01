import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import { NavLink, useLocation, Link } from 'react-router-dom';import { NavLink, useLocation, Link } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';import { AnimatePresence } from 'framer-motion';

import LoginPopup from './LoginPopup';import LoginPopup from './LoginPopup';

import { import { 

  FaWater,  FaWater,

  FaBars,   FaBars, 

  FaTimes,  FaTimes,

  FaChevronDown,  FaChevronDown,

  FaHome,  FaHome,

  FaInfoCircle,  FaInfoCircle,

  FaPhone,  FaPhone,

  FaChartLine,  FaChartLine,

  FaUsers,  FaUsers,

  FaMobileAlt,  FaMobileAlt,

  FaCog,  FaCog,

  FaMapMarkerAlt  FaMapMarkerAlt,

} from 'react-icons/fa';  FaUserPlus,

  FaSignInAlt

const ProfessionalNavbar = () => {} from 'react-icons/fa';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);const ProfessionalNavbar = () => {

  const [scrolled, setScrolled] = useState(false);  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();  const [scrolled, setScrolled] = useState(false);

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {  const [loginTab, setLoginTab] = useState('login');

    const handleScroll = () => {  const location = useLocation();

      setScrolled(window.scrollY > 20);

    };  // Handle scroll effect

    window.addEventListener('scroll', handleScroll);  useEffect(() => {

    return () => window.removeEventListener('scroll', handleScroll);    const handleScroll = () => {

  }, []);      setScrolled(window.scrollY > 50);

    };

  const navigationItems = [    window.addEventListener('scroll', handleScroll);

    { name: 'Home', href: '/', icon: FaHome },    return () => window.removeEventListener('scroll', handleScroll);

    { name: 'About', href: '/about', icon: FaInfoCircle },  }, []);

    {

      name: 'Services',  // Close mobile menu when route changes

      href: '/services',  useEffect(() => {

      icon: FaChartLine,    setIsMenuOpen(false);

      dropdown: [    setActiveDropdown(null);

        { name: 'Water Monitoring', href: '/services/monitoring', icon: FaWater },  }, [location]);

        { name: 'Community Engagement', href: '/services/community', icon: FaUsers },

        { name: 'Mobile Solutions', href: '/services/mobile', icon: FaMobileAlt },  // Navigation items

        { name: 'Data Analytics', href: '/services/analytics', icon: FaChartLine }  const navItems = [

      ]    {

    },      name: 'Home',

    { name: 'Contact', href: '/contact', icon: FaPhone }      path: '/',

  ];      icon: <FaHome className="w-4 h-4" />

    },

  const toggleDropdown = (itemName) => {    {

    setActiveDropdown(activeDropdown === itemName ? null : itemName);      name: 'About',

  };      path: '/about',

      icon: <FaInfoCircle className="w-4 h-4" />

  const closeDropdowns = () => {    },

    setActiveDropdown(null);    {

  };      name: 'Services',

      path: '/services',

  const toggleMenu = () => {      icon: <FaChartLine className="w-4 h-4" />,

    setIsMenuOpen(!isMenuOpen);      dropdown: [

    closeDropdowns();        {

  };          name: 'Water Monitoring',

          path: '/services/monitoring',

  return (          icon: <FaWater className="w-4 h-4 text-cyan-600" />,

    <nav          description: 'Real-time water quality tracking'

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${        },

        scrolled         {

          ? 'bg-white/95 backdrop-blur-md shadow-lg'           name: 'Community Platform',

          : 'bg-transparent'          path: '/services/community',

      }`}          icon: <FaUsers className="w-4 h-4 text-emerald-600" />,

    >          description: 'Engage with local communities'

      <div className="container mx-auto px-4">        },

        <div className="flex items-center justify-between h-16 md:h-20">        {

          {/* Logo */}          name: 'Mobile App',

          <div className="flex items-center space-x-3">          path: '/services/mobile',

            <div className="relative">          icon: <FaMobileAlt className="w-4 h-4 text-blue-600" />,

              <FaWater className="text-2xl md:text-3xl text-cyan-600" />          description: 'Water management on the go'

              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>        },

            </div>        {

            <div>          name: 'Data Analytics',

              <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">          path: '/services/analytics',

                AquaSafi          icon: <FaChartLine className="w-4 h-4 text-purple-600" />,

              </Link>          description: 'Insights and reporting tools'

              <p className="text-xs text-gray-600 -mt-1">Water Management</p>        }

            </div>      ]

          </div>    },

    {

          {/* Desktop Navigation */}      name: 'Contact',

          <div className="hidden lg:flex items-center space-x-8">      path: '/contact',

            {navigationItems.map((item) => (      icon: <FaPhone className="w-4 h-4" />

              <div key={item.name} className="relative group">    }

                {item.dropdown ? (  ];

                  <div>

                    <button  const toggleDropdown = (index) => {

                      onClick={() => toggleDropdown(item.name)}    setActiveDropdown(activeDropdown === index ? null : index);

                      className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-200 ${  };

                        location.pathname.startsWith(item.href)

                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'  const closeMenu = () => {

                          : scrolled    setIsMenuOpen(false);

                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'    setActiveDropdown(null);

                            : 'text-white hover:text-cyan-200 hover:bg-white/10'  };

                      }`}

                    >  const openLogin = (tab = 'login') => {

                      <item.icon className="text-sm" />    setLoginTab(tab);

                      <span className="font-medium">{item.name}</span>    setShowLoginPopup(true);

                      <FaChevronDown className={`text-xs transition-transform duration-200 ${    closeMenu();

                        activeDropdown === item.name ? 'rotate-180' : ''  };

                      }`} />

                    </button>  const closeLogin = () => {

    setShowLoginPopup(false);

                    {activeDropdown === item.name && (  };

                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">

                        {item.dropdown.map((dropdownItem) => (  // NavLink active styles

                          <NavLink  const getNavLinkClass = ({ isActive }) => `

                            key={dropdownItem.name}    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300

                            to={dropdownItem.href}    ${isActive 

                            onClick={closeDropdowns}      ? scrolled 

                            className={({ isActive }) =>        ? 'text-cyan-600 bg-cyan-50' 

                              `flex items-center space-x-3 px-4 py-3 transition-colors duration-200 ${        : 'text-yellow-400 bg-white/10'

                                isActive      : scrolled 

                                  ? 'bg-gradient-to-r from-cyan-50 to-emerald-50 text-cyan-700 border-r-2 border-cyan-500'        ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50' 

                                  : 'text-gray-700 hover:bg-gray-50'        : 'text-white hover:text-yellow-400 hover:bg-white/10'

                              }`    }

                            }  `;

                          >

                            <dropdownItem.icon className="text-cyan-600" />  return (

                            <div>    <nav

                              <span className="font-medium">{dropdownItem.name}</span>      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${

                            </div>        scrolled 

                          </NavLink>          ? 'bg-white/95 backdrop-blur-md shadow-lg' 

                        ))}          : 'bg-transparent'

                      </div>      }`}

                    )}    >

                  </div>      <div className="container mx-auto px-4">

                ) : (        <div className="flex items-center justify-between h-16 md:h-20">

                  <NavLink          {/* Logo */}

                    to={item.href}          <Link to="/" className="flex items-center space-x-3">

                    className={({ isActive }) =>            <motion.div

                      `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${              whileHover={{ scale: 1.05 }}

                        isActive              className="flex items-center space-x-3"

                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'            >

                          : scrolled              <div className="relative">

                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'                <FaWater className={`text-2xl md:text-3xl transition-colors duration-300 ${

                            : 'text-white hover:text-cyan-200 hover:bg-white/10'                  scrolled ? 'text-cyan-600' : 'text-white'

                      }`                }`} />

                    }                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>

                  >              </div>

                    <item.icon className="text-sm" />              <div>

                    <span className="font-medium">{item.name}</span>                <h1 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${

                  </NavLink>                  scrolled ? 'text-gray-800' : 'text-white'

                )}                }`}>

              </div>                  Aqua<span className="text-yellow-400">Safi</span>

            ))}                </h1>

                <p className={`text-xs hidden md:block transition-colors duration-300 ${

            {/* Login Buttons */}                  scrolled ? 'text-gray-600' : 'text-gray-200'

            <div className="flex items-center space-x-3 ml-6">                }`}>

              <button                  Water Resilience System

                onClick={() => setShowLogin(true)}                </p>

                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${              </div>

                  scrolled            </motion.div>

                    ? 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'          </Link>

                    : 'text-white hover:text-cyan-200 hover:bg-white/10'

                }`}          {/* Desktop Navigation */}

              >          <div className="hidden lg:flex items-center space-x-8">

                Login            {navItems.map((item, index) => (

              </button>              <div key={item.name} className="relative group">

              <button                {item.dropdown ? (

                onClick={() => setShowLogin(true)}                  <div>

                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"                    <button

              >                      onClick={() => toggleDropdown(index)}

                Sign Up                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${

              </button>                        location.pathname.startsWith(item.path)

            </div>                          ? scrolled 

          </div>                            ? 'text-cyan-600 bg-cyan-50' 

                            : 'text-yellow-400 bg-white/10'

          {/* Mobile Menu Button */}                          : scrolled 

          <button                            ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50' 

            onClick={toggleMenu}                            : 'text-white hover:text-yellow-400 hover:bg-white/10'

            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${                      }`}

              scrolled                    >

                ? 'text-gray-700 hover:bg-gray-100'                      {item.icon}

                : 'text-white hover:bg-white/10'                      <span>{item.name}</span>

            }`}                      <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${

          >                        activeDropdown === index ? 'rotate-180' : ''

            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}                      }`} />

          </button>                    </button>

        </div>                    

                    <AnimatePresence>

        {/* Mobile Menu */}                      {activeDropdown === index && (

        {isMenuOpen && (                        <motion.div

          <div className="lg:hidden">                          initial={{ opacity: 0, y: 10 }}

            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg border border-gray-100 mt-2">                          animate={{ opacity: 1, y: 0 }}

              {navigationItems.map((item) => (                          exit={{ opacity: 0, y: 10 }}

                <div key={item.name}>                          transition={{ duration: 0.2 }}

                  {item.dropdown ? (                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"

                    <div>                        >

                      <button                          {item.dropdown.map((dropdownItem) => (

                        onClick={() => toggleDropdown(item.name)}                            <Link

                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"                              key={dropdownItem.name}

                      >                              to={dropdownItem.path}

                        <div className="flex items-center space-x-2">                              onClick={closeMenu}

                          <item.icon />                              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"

                          <span>{item.name}</span>                            >

                        </div>                              {dropdownItem.icon}

                        <FaChevronDown className={`transition-transform duration-200 ${                              <div className="text-left">

                          activeDropdown === item.name ? 'rotate-180' : ''                                <div className="font-medium text-gray-800">{dropdownItem.name}</div>

                        }`} />                                <div className="text-sm text-gray-600">{dropdownItem.description}</div>

                      </button>                              </div>

                                                  </Link>

                      {activeDropdown === item.name && (                          ))}

                        <div className="ml-4 mt-1 space-y-1">                        </motion.div>

                          {item.dropdown.map((dropdownItem) => (                      )}

                            <NavLink                    </AnimatePresence>

                              key={dropdownItem.name}                  </div>

                              to={dropdownItem.href}                ) : (

                              onClick={() => {                  <NavLink

                                setIsMenuOpen(false);                    to={item.path}

                                closeDropdowns();                    className={getNavLinkClass}

                              }}                  >

                              className={({ isActive }) =>                    {item.icon}

                                `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${                    <span>{item.name}</span>

                                  isActive                  </NavLink>

                                    ? 'bg-cyan-50 text-cyan-700'                )}

                                    : 'text-gray-600 hover:bg-gray-50'              </div>

                                }`            ))}

                              }            

                            >            {/* Auth Buttons */}

                              <dropdownItem.icon />            <div className="flex items-center space-x-3">

                              <span>{dropdownItem.name}</span>              <motion.button

                            </NavLink>                whileHover={{ scale: 1.05 }}

                          ))}                whileTap={{ scale: 0.95 }}

                        </div>                onClick={() => openLogin('login')}

                      )}                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${

                    </div>                  scrolled 

                  ) : (                    ? 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50' 

                    <NavLink                    : 'text-white hover:text-yellow-400 hover:bg-white/10'

                      to={item.href}                }`}

                      onClick={() => setIsMenuOpen(false)}              >

                      className={({ isActive }) =>                <FaSignInAlt className="w-4 h-4" />

                        `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${                <span>Sign In</span>

                          isActive              </motion.button>

                            ? 'bg-cyan-50 text-cyan-700'              

                            : 'text-gray-700 hover:bg-gray-50'              <motion.button

                        }`                whileHover={{ scale: 1.05 }}

                      }                whileTap={{ scale: 0.95 }}

                    >                onClick={() => openLogin('signup')}

                      <item.icon />                className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"

                      <span>{item.name}</span>              >

                    </NavLink>                <FaUserPlus className="w-4 h-4" />

                  )}                <span>Sign Up</span>

                </div>              </motion.button>

              ))}            </div>

                        </div>

              <div className="pt-4 mt-4 border-t border-gray-200">

                <button          {/* Mobile Menu Button */}

                  onClick={() => {          <button

                    setShowLogin(true);            onClick={() => setIsMenuOpen(!isMenuOpen)}

                    setIsMenuOpen(false);            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${

                  }}              scrolled 

                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"                ? 'text-gray-700 hover:bg-gray-100' 

                >                : 'text-white hover:bg-white/10'

                  Login            }`}

                </button>          >

                <button            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}

                  onClick={() => {          </button>

                    setShowLogin(true);        </div>

                    setIsMenuOpen(false);

                  }}        {/* Mobile Navigation */}

                  className="w-full text-left px-3 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-md mt-2 hover:from-cyan-600 hover:to-emerald-600"        <AnimatePresence>

                >          {isMenuOpen && (

                  Sign Up            <motion.div

                </button>              initial={{ opacity: 0, height: 0 }}

              </div>              animate={{ opacity: 1, height: 'auto' }}

            </div>              exit={{ opacity: 0, height: 0 }}

          </div>              transition={{ duration: 0.3 }}

        )}              className="lg:hidden bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg mt-2 py-4"

      </div>            >

              {navItems.map((item, index) => (

      {/* Login Popup */}                <div key={item.name}>

      <AnimatePresence>                  {item.dropdown ? (

        {showLogin && (                    <div>

          <LoginPopup                       <button

            onClose={() => setShowLogin(false)}                        onClick={() => toggleDropdown(index)}

            onLogin={() => setShowLogin(false)}                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"

          />                      >

        )}                        <div className="flex items-center space-x-3">

      </AnimatePresence>                          {item.icon}

    </nav>                          <span className="font-medium">{item.name}</span>

  );                        </div>

};                        <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${

                          activeDropdown === index ? 'rotate-180' : ''

export default ProfessionalNavbar;                        }`} />
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
              
              {/* Mobile Auth Buttons */}
              <div className="px-4 pt-4 border-t border-gray-200 mt-4 space-y-3">
                <button
                  onClick={() => openLogin('login')}
                  className="w-full flex items-center justify-center space-x-2 py-3 text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  <FaSignInAlt className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                
                <button
                  onClick={() => openLogin('signup')}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300"
                >
                  <FaUserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={closeLogin} 
        initialTab={loginTab} 
      />
    </nav>
  );
};

export default ProfessionalNavbar;