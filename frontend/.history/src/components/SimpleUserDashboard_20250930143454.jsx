import React, { useState } from 'react';
import { 
  FaWater,
  FaTachometerAlt,
  FaChartLine,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaWater className="text-2xl text-cyan-600" />
              {sidebarOpen && <span className="text-xl font-bold text-gray-800">AquaSafi</span>}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded hover:bg-gray-100"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-cyan-50 text-cyan-700">
              <FaTachometerAlt />
              {sidebarOpen && <span>Overview</span>}
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <FaWater />
              {sidebarOpen && <span>Water Points</span>}
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <FaChartLine />
              {sidebarOpen && <span>Analytics</span>}
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <FaUsers />
              {sidebarOpen && <span>Community</span>}
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600">
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to AquaSafi Water Management System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Water Points</p>
                <p className="text-2xl font-bold text-gray-800">287</p>
              </div>
              <FaWater className="text-3xl text-cyan-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Points</p>
                <p className="text-2xl font-bold text-green-600">234</p>
              </div>
              <FaChartLine className="text-3xl text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Issues Reported</p>
                <p className="text-2xl font-bold text-red-600">12</p>
              </div>
              <FaTachometerAlt className="text-3xl text-red-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
              </div>
              <FaUsers className="text-3xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Water Point Status</h2>
          <div className="text-gray-600">
            <p>Dashboard content will be displayed here...</p>
            <p className="mt-2">This is a simplified version to test functionality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;