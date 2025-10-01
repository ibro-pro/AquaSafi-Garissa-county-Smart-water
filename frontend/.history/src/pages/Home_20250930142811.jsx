
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
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

const Home = () => {
  // Counter animation refs
  const waterPointsRef = useRef(null);
  const reportsRef = useRef(null);
  const communitiesRef = useRef(null);
  const partnersRef = useRef(null);
  
  const waterPointsInView = useInView(waterPointsRef, { once: true });
  const reportsInView = useInView(reportsRef, { once: true });
  const communitiesInView = useInView(communitiesRef, { once: true });
  const partnersInView = useInView(partnersRef, { once: true });

  const Counter = ({ target, duration = 2000, ref, inView, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  const programs = [
    {
      icon: <FaWater className="text-3xl" />,
      title: "Real-time Water Monitoring",
      description: "Advanced IoT sensors track water quality, quantity, and operational status across all water points in real-time with 99.9% uptime reliability."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community Engagement Platform",
      description: "Empower residents with mobile tools to report issues, share insights, and participate in water management decisions through our inclusive platform."
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Data Analytics Dashboard",
      description: "AI-powered insights and predictive analytics help government agencies and NGOs make data-driven decisions for water resource management."
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Mobile-First Design",
      description: "Fully responsive interface optimized for all devices, ensuring accessibility for community members across Garissa County with offline capabilities."
    }
  ];

  const testimonials = [
    {
      quote: "AquaSafi has revolutionized our water management. The real-time monitoring has reduced water shortages by 70% and empowered our community to take charge of our water resources.",
      author: "Amina Mohamed",
      role: "Community Leader, Garissa Town"
    },
    {
      quote: "The data analytics and reporting capabilities have been invaluable for our intervention programs. AquaSafi provides insights we never had access to before.",
      author: "David Ochieng",
      role: "NGO Water Specialist"
    },
    {
      quote: "Before AquaSafi, we spent hours searching for water. Now, with the mobile app, I can check water availability and report issues instantly. It has changed our lives.",
      author: "Fatuma Abdi",
      role: "Local Resident & Mother"
    }
  ];

  const principles = [
    {
      title: "Our Mission",
      description: "To ensure water security and environmental resilience in Garissa County through innovative technology and community-driven solutions.",
      icon: <FaWater />
    },
    {
      title: "Our Vision",
      description: "A future where every community in Garissa County has sustainable access to clean, safe water and resilient environmental systems.",
      icon: <FaChartLine />
    },
    {
      title: "Our Objectives",
      description: "Monitor water resources in real-time, engage communities in water management, and provide data-driven insights for sustainable development.",
      icon: <FaHandHoldingWater />
    },
    {
      title: "Core Values",
      description: "Innovation, Community, Sustainability, Transparency, and Resilience in all our water security initiatives.",
      icon: <FaHeart />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 to-emerald-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Aqua<span className="text-yellow-300">Safi</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl md:text-3xl font-semibold mb-4"
          >
            Garissa Smart Water & Environmental Resilience System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Transforming water security through real-time monitoring, community engagement, and data-driven environmental resilience
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/dashboard"
              className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-block"
            >
              Explore Dashboard
            </Link>
            <button className="border-2 border-white hover:bg-white hover:text-cyan-600 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Report Issue Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                ref: waterPointsRef, 
                inView: waterPointsInView, 
                target: 287, 
                suffix: '+',
                label: "Water Points Monitored", 
                icon: <FaWater /> 
              },
              { 
                ref: reportsRef, 
                inView: reportsInView, 
                target: 1567, 
                suffix: '+',
                label: "Community Reports", 
                icon: <FaUsers /> 
              },
              { 
                ref: communitiesRef, 
                inView: communitiesInView, 
                target: 50, 
                suffix: 'K+',
                label: "Community Members", 
                icon: <FaHeart /> 
              },
              { 
                ref: partnersRef, 
                inView: partnersInView, 
                target: 12, 
                suffix: '+',
                label: "Partner Organizations", 
                icon: <FaHandHoldingWater /> 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300"
              >
                <div className="text-cyan-700 mb-4 flex justify-center">
                  <div className="p-3 bg-cyan-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-cyan-700 mb-2">
                  <Counter 
                    target={stat.target} 
                    ref={stat.ref} 
                    inView={stat.inView}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Guiding Principles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-cyan-100"
              >
                <div className="text-cyan-700 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-700 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Core Functionalities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 group"
              >
                <div className="text-cyan-700 mb-4 group-hover:scale-110 transition duration-300">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-700 mb-4">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="monitoring" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            How AquaSafi Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Monitor & Detect",
                description: "Advanced IoT sensors continuously monitor water points for operational status, quality issues, and potential threats",
                icon: "🔍"
              },
              {
                step: "02",
                title: "Report & Alert",
                description: "Community members and automated systems report issues via mobile app, SMS, or web platform with instant alerts",
                icon: "📱"
              },
              {
                step: "03",
                title: "Analyze & Coordinate",
                description: "AI-powered analytics identify patterns and automatically coordinate response teams for efficient resolution",
                icon: "📊"
              },
              {
                step: "04",
                title: "Resolve & Improve",
                description: "Rapid resolution of issues followed by system improvements and community feedback integration",
                icon: "✅"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-8 mx-auto">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-cyan-700 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Response Section */}
      <section id="community" className="py-20 bg-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            24/7 Emergency Water Response
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Our rapid response team is available around the clock to address critical water issues and emergencies in Garissa County
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white text-cyan-700 p-8 rounded-xl shadow-lg max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Emergency Hotline</h3>
            <div className="text-3xl font-bold mb-4">0700 123 456</div>
            <p className="text-gray-600 mb-6">Available 24/7 for urgent water issues</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-full transition duration-300">
              🚨 Report Emergency
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="mobile" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Community Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg border border-cyan-100"
              >
                <FaQuoteLeft className="text-cyan-700 text-2xl mb-4" />
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-cyan-700">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="analytics" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-cyan-700 mb-6"
          >
            Join Our Mission for Water Security
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Ready to contribute to water security in Garissa County? Partner with us or join our community platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Become a Partner
            </button>
            <button className="border-2 border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Join Community Platform
            </button>
          </motion.div>
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

export default Home;