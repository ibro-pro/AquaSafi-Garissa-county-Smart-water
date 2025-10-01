import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Aqua<span className="text-yellow-300">Safi</span>
          </h1>
          <h2 className="text-3xl font-semibold mb-4">
            Garissa Smart Water & Environmental Resilience System
          </h2>
          <p className="text-2xl mb-8 max-w-3xl mx-auto">
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

      {/* Simple Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-700 mb-16">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-cyan-700 mb-2">287+</div>
              <div className="text-gray-600 font-medium">Water Points Monitored</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-cyan-700 mb-2">1567+</div>
              <div className="text-gray-600 font-medium">Community Reports</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-cyan-700 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Community Members</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-cyan-700 mb-2">12+</div>
              <div className="text-gray-600 font-medium">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-cyan-700 mb-8">
            About AquaSafi
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            AquaSafi is Garissa County's comprehensive water management and environmental resilience system. 
            We combine cutting-edge IoT technology, community engagement, and data analytics to ensure 
            sustainable water security for all residents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600">Advanced IoT sensors track water quality and availability 24/7</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Community Platform</h3>
              <p className="text-gray-600">Mobile-first design empowers residents to report and track issues</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Data Analytics</h3>
              <p className="text-gray-600">AI-powered insights help optimize water resource management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Mission for Water Security
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to contribute to water security in Garissa County? Partner with us or join our community platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-cyan-900 font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-block"
            >
              Get In Touch
            </Link>
            <Link 
              to="/dashboard"
              className="border-2 border-white hover:bg-white hover:text-cyan-700 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-block"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;