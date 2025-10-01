import React from 'react';

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aqua<span className="text-yellow-300">Safi</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Garissa Smart Water & Environmental Resilience System
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transforming water security through real-time monitoring, community engagement, and data-driven environmental resilience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;