

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaGlobe,
  FaCheckCircle,
  FaExclamationCircle,
  FaHeadset,
  FaComments,
  FaMobileAlt,
  FaDesktop,
  FaChartLine,
  FaHandshake,
  FaLightbulb,
  FaShieldAlt,
  FaRocket,
  FaAward,
  FaUsers,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaSync,
  FaExpand,
  FaWater,
  FaQuestionCircle
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Counter animation refs
  const responseTimeRef = useRef(null);
  const supportTeamRef = useRef(null);
  const satisfactionRef = useRef(null);
  const countriesRef = useRef(null);
  
  const responseTimeInView = useInView(responseTimeRef, { once: true });
  const supportTeamInView = useInView(supportTeamRef, { once: true });
  const satisfactionInView = useInView(satisfactionRef, { once: true });
  const countriesInView = useInView(countriesRef, { once: true });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone Support",
      description: "Speak directly with our support team for immediate assistance",
      details: "+254 700 123 456",
      availability: "24/7 Emergency Line",
      color: "cyan"
    },
    {
      icon: <FaWhatsapp className="text-3xl" />,
      title: "WhatsApp Business",
      description: "Quick responses via WhatsApp for convenient communication",
      details: "+254 711 123 456",
      availability: "Mon-Sun: 6AM-10PM EAT",
      color: "emerald"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Support",
      description: "Send detailed inquiries and receive comprehensive responses",
      details: "support@aquasafi.org",
      availability: "Response within 2 hours",
      color: "cyan"
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Live Chat",
      description: "Instant messaging support through our web platform",
      details: "Available on Dashboard",
      availability: "Mon-Fri: 8AM-6PM EAT",
      color: "emerald"
    }
  ];

  const inquiryTypes = [
    {
      value: "general",
      label: "General Inquiry",
      description: "General questions about AquaSafi",
      icon: <FaComments />
    },
    {
      value: "technical",
      label: "Technical Support",
      description: "Issues with platform or sensors",
      icon: <FaDesktop />
    },
    {
      value: "partnership",
      label: "Partnership",
      description: "Explore collaboration opportunities",
      icon: <FaHandshake />
    },
    {
      value: "media",
      label: "Media Inquiry",
      description: "Press and media requests",
      icon: <FaGlobe />
    },
    {
      value: "emergency",
      label: "Emergency Report",
      description: "Urgent water-related issues",
      icon: <FaShieldAlt />
    }
  ];

  const officeLocations = [
    {
      city: "Garissa Town",
      address: "AquaSafi Headquarters, Water House Complex, Garissa Town",
      phone: "+254 700 123 456",
      email: "garissa@aquasafi.org",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      coordinates: "🌍 0.4536° S, 39.6461° E",
      icon: <FaBuilding />
    },
    {
      city: "Nairobi",
      address: "Innovation Center, Upper Hill, Nairobi",
      phone: "+254 700 123 457",
      email: "nairobi@aquasafi.org",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      coordinates: "🌍 1.2921° S, 36.8219° E",
      icon: <FaRocket />
    },
    {
      city: "Mombasa",
      address: "Coastal Regional Office, Nyali, Mombasa",
      phone: "+254 700 123 458",
      email: "mombasa@aquasafi.org",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      coordinates: "🌍 4.0435° S, 39.6682° E",
      icon: <FaWater />
    }
  ];

  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We pride ourselves on rapid response times. General inquiries receive responses within 2 hours, technical support within 1 hour, and emergency reports are addressed immediately through our 24/7 hotline."
    },
    {
      question: "Do you provide support in local languages?",
      answer: "Yes! Our support team is fluent in Somali, Swahili, and English to ensure effective communication with all community members across Garissa County."
    },
    {
      question: "Can I visit your offices without an appointment?",
      answer: "While walk-ins are welcome, we recommend scheduling an appointment to ensure the right team members are available to assist you with your specific needs."
    },
    {
      question: "Do you offer training or workshops for communities?",
      answer: "Absolutely! We regularly conduct community workshops on water management, technology usage, and environmental conservation. Contact us to schedule a session for your community."
    }
  ];

  const teamMembers = [
    {
      name: "Support Team Alpha",
      role: "Technical Support Specialists",
      description: "Handles platform issues, sensor troubleshooting, and technical inquiries",
      availability: "24/7",
      responseTime: "< 1 hour",
      image: "👨🏾‍💻"
    },
    {
      name: "Community Relations",
      role: "Community Engagement Team",
      description: "Manages community outreach, training programs, and local partnerships",
      availability: "Mon-Sat: 6AM-8PM",
      responseTime: "< 4 hours",
      image: "👩🏾‍🤝‍👩🏼"
    },
    {
      name: "Emergency Response",
      role: "Rapid Response Unit",
      description: "Addresses urgent water issues and emergency situations",
      availability: "24/7",
      responseTime: "Immediate",
      image: "🚨"
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
            Get In <span className="text-yellow-300">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform water security in Garissa County? Our team is here to help 
            with technical support, partnerships, and community engagement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
            <a 
              href="tel:+254700123456"
              className="border-2 border-white hover:bg-white hover:text-cyan-600 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              Call Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Multiple Ways to Connect
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 ${
                  method.color === 'cyan' ? 'border-cyan-500' : 'border-emerald-500'
                }`}
              >
                <div className={`${
                  method.color === 'cyan' ? 'text-cyan-700' : 'text-emerald-700'
                } mb-4`}>
                  {method.icon}
                </div>
                <h3 className={`text-xl font-bold ${
                  method.color === 'cyan' ? 'text-cyan-700' : 'text-emerald-700'
                } mb-4`}>
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {method.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaPhone className="text-gray-400" />
                    <span className="font-semibold">{method.details}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <FaClock className="text-gray-400" />
                    <span>{method.availability}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Support Excellence
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                ref: responseTimeRef, 
                inView: responseTimeInView, 
                target: 98, 
                suffix: '%',
                label: "Response Rate", 
                description: "Queries answered within SLA",
                icon: <FaSync />
              },
              { 
                ref: supportTeamRef, 
                inView: supportTeamInView, 
                target: 15, 
                suffix: '+',
                label: "Support Experts", 
                description: "Dedicated team members",
                icon: <FaUsers />
              },
              { 
                ref: satisfactionRef, 
                inView: satisfactionInView, 
                target: 96, 
                suffix: '%',
                label: "Satisfaction Rate", 
                description: "Customer happiness score",
                icon: <FaStar />
              },
              { 
                ref: countriesRef, 
                inView: countriesInView, 
                target: 3, 
                suffix: '',
                label: "Office Locations", 
                description: "Across Kenya",
                icon: <FaMapMarkerAlt />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300 group"
              >
                <div className="text-cyan-700 mb-4 flex justify-center group-hover:scale-110 transition duration-300">
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
                <div className="text-gray-800 font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-cyan-600 to-emerald-600 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-cyan-100">We'll get back to you within 2 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center space-x-3"
                  >
                    <FaCheckCircle className="text-emerald-600 text-xl" />
                    <div>
                      <div className="font-semibold text-emerald-800">Message Sent Successfully!</div>
                      <div className="text-emerald-600 text-sm">We'll get back to you shortly.</div>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaUser className="inline mr-2 text-cyan-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaEnvelope className="inline mr-2 text-cyan-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaBuilding className="inline mr-2 text-cyan-600" />
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                      placeholder="Your organization (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FaComments className="inline mr-2 text-cyan-600" />
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <FaPaperPlane className="inline mr-2 text-cyan-600" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <FaComments className="inline mr-2 text-cyan-600" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSync className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <FaShieldAlt className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800">Emergency Water Issues</h3>
                    <p className="text-red-600">24/7 Rapid Response Team</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Emergency Hotline:</span>
                    <a href="tel:+254700123456" className="text-red-700 font-bold text-lg hover:text-red-800">
                      +254 700 123 456
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">WhatsApp Emergency:</span>
                    <a href="https://wa.me/254711123456" className="text-red-700 font-bold text-lg hover:text-red-800">
                      +254 711 123 456
                    </a>
                  </div>
                </div>
              </div>

              {/* Support Teams */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-700 mb-6">Our Support Teams</h3>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{member.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{member.name}</h4>
                            <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full">
                              {member.availability}
                            </span>
                          </div>
                          <p className="text-emerald-600 font-semibold text-sm mb-2">{member.role}</p>
                          <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <FaClock className="text-cyan-600" />
                            <span>Avg. Response: {member.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-700 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: <FaMobileAlt />, text: "Download Mobile App", action: "#" },
                    { icon: <FaChartLine />, text: "View Live Dashboard", action: "#" },
                    { icon: <FaHandshake />, text: "Partnership Inquiry", action: "#" },
                    { icon: <FaAward />, text: "Become a Volunteer", action: "#" }
                  ].map((action, index) => (
                    <motion.a
                      key={index}
                      href={action.action}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition duration-200 group"
                    >
                      <div className="text-cyan-600 group-hover:text-cyan-700">
                        {action.icon}
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 flex-1">
                        {action.text}
                      </span>
                      <FaArrowRight className="text-gray-400 group-hover:text-cyan-600" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Visit Our Offices
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {office.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{office.city}</h3>
                      <p className="text-cyan-100">Main Office</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-cyan-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600 text-sm">{office.address}</div>
                      <div className="text-cyan-600 text-xs mt-1">{office.coordinates}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-cyan-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-cyan-700">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-cyan-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-cyan-700">
                        {office.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-cyan-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Operating Hours</div>
                      <div className="text-gray-600 text-sm">{office.hours}</div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg transition duration-300 font-semibold">
                    Get Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-cyan-300 transition duration-300"
              >
                <h3 className="text-xl font-bold text-cyan-700 mb-3 flex items-center space-x-3">
                  <FaQuestionCircle className="text-cyan-600" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Community */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Join Our Community
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaFacebook />, name: "Facebook", handle: "@AquaSafiKE", color: "blue" },
                  { icon: <FaTwitter />, name: "Twitter", handle: "@AquaSafi", color: "cyan" },
                  { icon: <FaInstagram />, name: "Instagram", handle: "@aquasafi_ke", color: "pink" },
                  { icon: <FaLinkedin />, name: "LinkedIn", handle: "AquaSafi Kenya", color: "blue" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className={`bg-${social.color}-50 border border-${social.color}-200 rounded-xl p-4 text-center hover:shadow-md transition duration-300`}
                  >
                    <div className={`text-${social.color}-600 text-2xl mb-2`}>
                      {social.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{social.name}</div>
                    <div className="text-gray-600 text-sm">{social.handle}</div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-cyan-100 mb-6">
                Subscribe to our newsletter for the latest updates on water security initiatives, 
                technology innovations, and community programs.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-cyan-400 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold py-3 rounded-lg transition duration-300">
                  Subscribe to Newsletter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of community members, partners, and supporters in transforming 
            water security across Garissa County.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-white text-cyan-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Start Partnership
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Join Community
            </button>
            <a 
              href="tel:+254700123456"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-cyan-600 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              Call Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;