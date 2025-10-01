import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWater,
  FaMapMarkerAlt,
  FaUsers,
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaPlay,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';

const SimpleHome = () => {
  const [count, setCount] = useState({
    waterPoints: 0,
    communities: 0,
    users: 0,
    reports: 0
  });

  const Counter = ({ target, duration = 2000, suffix = '' }) => {
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCurrentCount(target);
          clearInterval(timer);
        } else {
          setCurrentCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{currentCount.toLocaleString()}{suffix}</span>;
  };

  const features = [
    {
      icon: <FaWater className="text-3xl text-cyan-500" />,
      title: "Real-time Monitoring",
      description: "24/7 water quality and quantity tracking with IoT sensors across all water points in Garissa County."
    },
    {
      icon: <FaUsers className="text-3xl text-emerald-500" />,
      title: "Community Engagement", 
      description: "Empowering local communities with tools and knowledge for sustainable water resource management."
    },
    {
      icon: <FaMobileAlt className="text-3xl text-blue-500" />,
      title: "Mobile Solutions",
      description: "User-friendly mobile apps for reporting issues, accessing data, and staying connected with your community."
    },
    {
      icon: <FaChartLine className="text-3xl text-purple-500" />,
      title: "Data Analytics",
      description: "Advanced analytics and insights to optimize water distribution and predict maintenance needs."
    }
  ];

  const stats = [
    { number: 287, label: "Water Points", suffix: "+" },
    { number: 45, label: "Communities", suffix: "+" },
    { number: 15000, label: "Active Users", suffix: "+" },
    { number: 1200, label: "Monthly Reports", suffix: "+" }
  ];

  const testimonials = [
    {
      name: "Amina Hassan",
      role: "Community Leader, Garissa",
      content: "AquaSafi has transformed how we manage our water resources. The real-time data helps us make informed decisions.",
      rating: 5
    },
    {
      name: "Dr. Mohamed Ali",
      role: "Water Engineer",  
      content: "The analytics platform provides insights we never had before. It's revolutionizing water management in our region.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50 pt-20">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Safe Water
            </span>
            <br />
            <span className="text-gray-800">For Every Community</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 mb-8 max-w-4xl mx-auto">
            Empowering Garissa County with innovative water management solutions through real-time monitoring, community engagement, and data-driven insights.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of community members, water engineers, and local leaders who trust AquaSafi to ensure sustainable access to clean, safe water for all.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/about"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2"
            >
              <span>Get Started</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <button className="group flex items-center space-x-3 px-6 py-4 text-gray-700 hover:text-cyan-600 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                <FaPlay className="text-cyan-500 ml-1" />
              </div>
              <span className="font-medium">Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Transforming Water Management Across Garissa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Comprehensive Water Management Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-cyan-200">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            How AquaSafi Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Monitor</h3>
              <p className="text-gray-600">IoT sensors continuously monitor water quality, flow rates, and system health across all water points.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Analyze</h3>
              <p className="text-gray-600">Advanced analytics process the data to identify patterns, predict issues, and optimize water distribution.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Act</h3>
              <p className="text-gray-600">Communities and engineers receive alerts and insights to take proactive action and ensure water security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <FaQuoteLeft className="text-2xl text-cyan-500 mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Community's Water Management?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join AquaSafi today and be part of the solution for sustainable water access in Garissa County.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-cyan-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;