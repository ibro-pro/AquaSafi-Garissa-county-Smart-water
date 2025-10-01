import React from 'react';
// Removed unused motion import
import { 
  FaWater,
  FaUsers,
  FaMobileAlt,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 'monitoring',
      icon: <FaWater className="text-4xl text-cyan-600" />,
      title: 'Water Monitoring',
      description: 'Real-time water quality and quantity tracking across all water points in Garissa County.',
      features: [
        'IoT sensor networks for continuous monitoring',
        'Real-time quality alerts and notifications',
        'Automated data collection and reporting',
        'Predictive maintenance scheduling'
      ],
      color: 'cyan'
    },
    {
      id: 'community',
      icon: <FaUsers className="text-4xl text-emerald-600" />,
      title: 'Community Platform',
      description: 'Empower local communities with tools to engage in water management decisions.',
      features: [
        'Community feedback and reporting system',
        'Local water committee coordination',
        'Educational resources and training',
        'Community-driven data collection'
      ],
      color: 'emerald'
    },
    {
      id: 'mobile',
      icon: <FaMobileAlt className="text-4xl text-blue-600" />,
      title: 'Mobile Application',
      description: 'Access water information and services anywhere, anytime through our mobile app.',
      features: [
        'Water point location and status',
        'Issue reporting and tracking',
        'Water usage analytics',
        'Offline functionality for remote areas'
      ],
      color: 'blue'
    },
    {
      id: 'analytics',
      icon: <FaChartLine className="text-4xl text-purple-600" />,
      title: 'Data Analytics',
      description: 'Transform water data into actionable insights for better decision making.',
      features: [
        'Advanced data visualization dashboards',
        'Predictive analytics and forecasting',
        'Custom reporting and KPI tracking',
        'AI-powered trend analysis'
      ],
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Comprehensive water management solutions designed for Garissa County's unique challenges
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-2xl bg-${service.color}-50 mr-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <FaCheckCircle className={`text-${service.color}-600 mr-3 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`flex items-center text-${service.color}-600 hover:text-${service.color}-700 font-semibold transition-colors duration-200`}>
                  Learn More
                  <FaArrowRight className="ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Ready to Transform Water Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Join communities across Garissa County in building a more resilient water future
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Services;