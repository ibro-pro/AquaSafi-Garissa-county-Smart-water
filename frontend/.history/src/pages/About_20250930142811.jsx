

import React, { useState, useEffect, useRef } from 'react';
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
  FaAward,
  FaRocket,
  FaEye,
  FaBullseye,
  FaHandshake,
  FaGlobeAfrica,
  FaTree,
  FaTint,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaCog,
  FaLightbulb,
  FaSync,
  FaExpand
} from 'react-icons/fa';

const About = () => {
  // Counter animation refs
  const yearsRef = useRef(null);
  const projectsRef = useRef(null);
  const communitiesRef = useRef(null);
  const coverageRef = useRef(null);
  
  const yearsInView = useInView(yearsRef, { once: true });
  const projectsInView = useInView(projectsRef, { once: true });
  const communitiesInView = useInView(communitiesRef, { once: true });
  const coverageInView = useInView(coverageRef, { once: true });

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

  const teamMembers = [
    {
      name: "Dr. Amina Hassan",
      role: "Project Director",
      description: "Water resource management expert with 15+ years experience in arid regions",
      image: "👩🏾‍💼",
      expertise: ["Hydrology", "Community Development", "Project Management"]
    },
    {
      name: "Mohamed Abdi",
      role: "Technical Lead",
      description: "IoT and sensor technology specialist focusing on water monitoring systems",
      image: "👨🏾‍💻",
      expertise: ["IoT Systems", "Data Analytics", "Sensor Technology"]
    },
    {
      name: "Sarah Kimani",
      role: "Community Engagement Manager",
      description: "Social development specialist with deep roots in Garissa communities",
      image: "👩🏾‍🤝‍👩🏼",
      expertise: ["Community Outreach", "Stakeholder Engagement", "Training & Capacity Building"]
    },
    {
      name: "James Omondi",
      role: "Data Scientist",
      description: "AI and machine learning expert for predictive water resource modeling",
      image: "👨🏾‍🔬",
      expertise: ["Machine Learning", "Predictive Analytics", "Data Visualization"]
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Concept Development",
      description: "Initial research and concept development for smart water management in Garissa",
      icon: <FaLightbulb />
    },
    {
      year: "2021",
      title: "Pilot Program Launch",
      description: "Deployed first 50 IoT sensors across key water points in Garissa Town",
      icon: <FaRocket />
    },
    {
      year: "2022",
      title: "Community Platform",
      description: "Launched mobile app and web platform for community reporting and engagement",
      icon: <FaMobileAlt />
    },
    {
      year: "2023",
      title: "County-wide Expansion",
      description: "Expanded coverage to all 6 sub-counties with 250+ monitoring points",
      icon: <FaExpand />
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Implemented predictive analytics and AI-driven resource optimization",
      icon: <FaCog />
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve traditional water challenges",
      icon: <FaLightbulb />,
      color: "cyan"
    },
    {
      title: "Sustainability",
      description: "Building solutions that are environmentally and economically sustainable",
      icon: <FaSync />,
      color: "emerald"
    },
    {
      title: "Community First",
      description: "Putting local communities at the center of all our initiatives",
      icon: <FaUsers />,
      color: "cyan"
    },
    {
      title: "Transparency",
      description: "Ensuring open access to data and decision-making processes",
      icon: <FaEye />,
      color: "emerald"
    },
    {
      title: "Collaboration",
      description: "Working with partners across sectors for maximum impact",
      icon: <FaHandshake />,
      color: "cyan"
    },
    {
      title: "Resilience",
      description: "Building systems that withstand environmental and climate challenges",
      icon: <FaShieldAlt />,
      color: "emerald"
    }
  ];

  const partners = [
    {
      name: "Garissa County Government",
      role: "Strategic Partner",
      description: "Official government partner providing policy support and local coordination",
      logo: "🏛️"
    },
    {
      name: "UNICEF Kenya",
      role: "Implementation Partner",
      description: "Supporting water, sanitation and hygiene (WASH) initiatives across the county",
      logo: "🕌"
    },
    {
      name: "Kenya Red Cross",
      role: "Emergency Response Partner",
      description: "Collaborating on disaster response and community resilience programs",
      logo: "➕"
    },
    {
      name: "Water Resources Authority",
      role: "Technical Partner",
      description: "Providing technical expertise and regulatory guidance for water management",
      logo: "💧"
    }
  ];

  const technologies = [
    {
      name: "IoT Water Sensors",
      description: "Advanced sensors monitoring water quality, quantity, and flow rates in real-time",
      features: ["pH Monitoring", "Turbidity Sensors", "Flow Meters", "Water Level Sensors"],
      icon: <FaTint />
    },
    {
      name: "Mobile Platform",
      description: "Cross-platform mobile application for community reporting and data access",
      features: ["Offline Capability", "Multi-language", "SMS Integration", "Photo Upload"],
      icon: <FaMobileAlt />
    },
    {
      name: "Data Analytics",
      description: "AI-powered analytics platform for predictive modeling and insights",
      features: ["Machine Learning", "Predictive Alerts", "Trend Analysis", "Custom Reports"],
      icon: <FaChartLine />
    },
    {
      name: "Community Dashboard",
      description: "Real-time dashboard for monitoring and managing water resources",
      features: ["Live Maps", "Alert Systems", "Performance Metrics", "Historical Data"],
      icon: <FaEye />
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
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
            About <span className="text-yellow-300">Aqua</span>Safi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Transforming water security in Garissa County through innovative technology, 
            community empowerment, and data-driven environmental resilience solutions.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105"
          >
            Learn More About Our Work
          </motion.button>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 mb-6">
                Our Story: Addressing Water Security in Garissa
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AquaSafi was born from the urgent need to address persistent water challenges 
                in Garissa County, where communities face recurring droughts, water scarcity, 
                and limited access to clean water sources.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, our initiative brings together technology experts, 
                community leaders, and environmental specialists to create sustainable 
                solutions that empower local communities and transform water management practices.
              </p>
              <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                <p className="text-cyan-700 font-semibold">
                  "Our mission is to ensure that every community in Garissa County has 
                  reliable access to clean water while building resilience against 
                  environmental challenges."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Why Garissa County?</h3>
              <div className="space-y-4">
                {[
                  "Arid and semi-arid region with frequent droughts",
                  "Limited water infrastructure and monitoring systems",
                  "Growing population increasing water demand",
                  "Climate change exacerbating water scarcity",
                  "High dependence on seasonal rivers and boreholes"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-yellow-300 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
            Our Journey in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                ref: yearsRef, 
                inView: yearsInView, 
                target: 4, 
                suffix: '+',
                label: "Years of Impact", 
                icon: <FaClock />,
                description: "Dedicated service to Garissa communities"
              },
              { 
                ref: projectsRef, 
                inView: projectsInView, 
                target: 25, 
                suffix: '+',
                label: "Completed Projects", 
                icon: <FaAward />,
                description: "Successful water initiatives"
              },
              { 
                ref: communitiesRef, 
                inView: communitiesInView, 
                target: 50, 
                suffix: 'K+',
                label: "Lives Impacted", 
                icon: <FaUsers />,
                description: "Across Garissa County"
              },
              { 
                ref: coverageRef, 
                inView: coverageInView, 
                target: 6, 
                suffix: '',
                label: "Sub-Counties Covered", 
                icon: <FaMapMarkerAlt />,
                description: "Complete county coverage"
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

      {/* Mission & Vision Expanded */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Strategic Framework
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-cyan-50 p-8 rounded-2xl border border-cyan-200"
            >
              <div className="text-cyan-700 mb-4">
                <FaBullseye className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To revolutionize water security in Garissa County through innovative technology, 
                community engagement, and data-driven solutions that ensure sustainable access 
                to clean water while building environmental resilience.
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Deploy smart water monitoring systems",
                  "Empower communities through technology",
                  "Provide real-time water quality data",
                  "Enable rapid response to water issues",
                  "Build climate change resilience"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-cyan-500 text-sm flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200"
            >
              <div className="text-emerald-700 mb-4">
                <FaEye className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                A future where every community in Garissa County enjoys reliable access to 
                clean water, empowered with technology to manage their water resources 
                sustainably and resilient to environmental challenges.
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Zero water-related diseases",
                  "100% water point monitoring",
                  "Community-led water management",
                  "Climate-resilient water systems",
                  "Sustainable water for all"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-cyan-50 p-8 rounded-2xl border border-cyan-200"
            >
              <div className="text-cyan-700 mb-4">
                <FaRocket className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">2025 Goals</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ambitious targets to scale our impact and transform water security 
                across Garissa County and beyond.
              </p>
              <ul className="space-y-3 text-gray-600">
                {[
                  { target: "500+", description: "Water points monitored" },
                  { target: "100K+", description: "Community members reached" },
                  { target: "10+", description: "New partner organizations" },
                  { target: "100%", description: "Real-time data coverage" }
                ].map((goal, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-semibold text-cyan-700">{goal.target}</span>
                    <span>{goal.description}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 ${
                  value.color === 'cyan' ? 'border-cyan-500' : 'border-emerald-500'
                }`}
              >
                <div className={`${
                  value.color === 'cyan' ? 'text-cyan-700' : 'text-emerald-700'
                } mb-4`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold ${
                  value.color === 'cyan' ? 'text-cyan-700' : 'text-emerald-700'
                } mb-4`}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Passionate professionals dedicated to transforming water security in Garissa County
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-8 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-cyan-100">{member.role}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-cyan-700 text-sm">Expertise:</h4>
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-block bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Technology Stack
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-cyan-700 p-3 bg-cyan-50 rounded-xl">
                    {tech.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-700 mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {tech.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <FaCheckCircle className="text-emerald-500 text-xs flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-4"
          >
            Our Strategic Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Collaborating with leading organizations to maximize our impact in Garissa County
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-cyan-300 transition duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{partner.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-700 mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-2">
                      {partner.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-16"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-cyan-200 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-100">
                      <div className="text-cyan-700 mb-2">
                        {milestone.icon}
                      </div>
                      <div className="text-cyan-700 font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-500 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Year marker */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 -top-8 text-cyan-700 font-bold ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`} style={{ width: '200px', marginLeft: index % 2 === 0 ? '100px' : '-100px' }}>
                    {milestone.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Join Us in Transforming Water Security
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto"
          >
            Whether you're a community member, potential partner, or interested supporter, 
            there are many ways to get involved with AquaSafi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-white text-cyan-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Volunteer With Us
            </button>
            <button className="border-2 border-cyan-300 text-cyan-100 hover:bg-cyan-500 hover:text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Request Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;