import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWater,
  FaMapMarkerAlt,
  FaUsers,
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaHandHoldingWater,
  FaHeart,
  FaQuoteLeft,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

const TestHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 to-emerald-600 pt-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aqua<span className="text-yellow-300">Safi</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Garissa Smart Water & Environmental Resilience System
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transforming water security through real-time monitoring, community engagement, and data-driven environmental resilience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard"
              className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-block"
            >
              Explore Dashboard
            </Link>
            <button className="border-2 border-white hover:bg-white hover:text-cyan-600 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Report Issue Now
            </button>
          </div>
        </div>
      </section>

      {/* Impact Counters - No Motion */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { target: '287+', label: "Water Points Monitored", icon: <FaWater /> },
              { target: '1,567+', label: "Community Reports", icon: <FaUsers /> },
              { target: '50K+', label: "Community Members", icon: <FaHeart /> },
              { target: '12+', label: "Partner Organizations", icon: <FaHandHoldingWater /> }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300"
              >
                <div className="text-cyan-700 mb-4 flex justify-center">
                  <div className="p-3 bg-cyan-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-cyan-700 mb-2">
                  {stat.target}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission for Water Security
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to contribute to water security in Garissa County? Partner with us or join our community platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Join Community Platform
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaWater className="text-2xl" />
                <span className="text-xl font-bold">Aqua<span className="text-yellow-300">Safi</span></span>
              </div>
              <p className="text-cyan-200">
                Garissa Smart Water & Environmental Resilience System - Transforming water security through innovation and community engagement.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Dashboard', 'Report Issue', 'Community', 'Partners', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-cyan-200 hover:text-white transition duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <div className="space-y-2 text-cyan-200">
                <div className="flex items-center space-x-2">
                  <FaPhone />
                  <span>+254 700 123456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope />
                  <span>info@aquasafi.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt />
                  <span>Garissa County, Kenya</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-cyan-700 hover:bg-cyan-600 p-2 rounded-full transition duration-200"
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-cyan-700 mt-8 pt-8 text-center text-cyan-200">
            <p>&copy; 2024 AquaSafi: Garissa Smart Water & Environmental Resilience System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestHome;