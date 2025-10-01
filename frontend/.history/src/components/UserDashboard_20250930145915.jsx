import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWater,
  FaTachometerAlt,
  FaChartLine,
  FaUsers,
  FaExclamationTriangle,
  FaCog,
  FaBell,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaMobileAlt,
  FaDroplet,
  FaThermometerHalf,
  FaPh,
  FaFlask,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaBars,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [_notifications, _setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with real API data later
  const [dashboardData, _setDashboardData] = useState({
    stats: {
      totalWaterPoints: 287,
      activePoints: 245,
      qualityAlerts: 12,
      communityReports: 156,
      weeklyTrend: '+5.2%',
      monthlyUsage: '2.4M liters',
      efficiency: 94.7
    },
    waterPoints: [
      {
        id: 1,
        name: 'Garissa Town Borehole A1',
        location: 'Garissa Town Center',
        status: 'active',
        quality: 'excellent',
        flow: 45.2,
        ph: 7.2,
        temperature: 24.5,
        lastUpdated: '2 mins ago',
        coordinates: { lat: -0.4569, lng: 39.6582 }
      },
      {
        id: 2,
        name: 'Iftin Water Point',
        location: 'Iftin Village',
        status: 'maintenance',
        quality: 'good',
        flow: 0,
        ph: 7.4,
        temperature: 26.1,
        lastUpdated: '1 hour ago',
        coordinates: { lat: -0.4690, lng: 39.6401 }
      },
      {
        id: 3,
        name: 'Sankuri Community Well',
        location: 'Sankuri',
        status: 'alert',
        quality: 'poor',
        flow: 12.8,
        ph: 6.1,
        temperature: 28.3,
        lastUpdated: '5 mins ago',
        coordinates: { lat: -0.4234, lng: 39.7123 }
      }
    ],
    recentReports: [
      {
        id: 1,
        title: 'Water Quality Concern',
        location: 'Dadaab Camp',
        reporter: 'Amina Hassan',
        status: 'investigating',
        priority: 'high',
        timestamp: '15 mins ago',
        category: 'quality'
      },
      {
        id: 2,
        title: 'Pump Not Working',
        location: 'Hulugho Village',
        reporter: 'Mohamed Ali',
        status: 'resolved',
        priority: 'medium',
        timestamp: '2 hours ago',
        category: 'technical'
      }
    ]
  });

  // Sidebar menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaTachometerAlt },
    { id: 'water-points', label: 'Water Points', icon: FaDroplet },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: FaChartLine },
    { id: 'reports', label: 'Community Reports', icon: FaFileAlt },
    { id: 'analytics', label: 'Analytics & Insights', icon: FaChartLine },
    { id: 'community', label: 'Community Management', icon: FaUsers },
    { id: 'alerts', label: 'Alerts & Notifications', icon: FaBell },
    { id: 'maps', label: 'Interactive Maps', icon: FaMapMarkerAlt },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'alert': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-orange-600 bg-orange-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Quality colors
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Overview Dashboard Component
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Water Points</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.totalWaterPoints}</p>
              <p className="text-green-600 text-sm flex items-center mt-2">
                <FaArrowUp className="mr-1" />
                {dashboardData.stats.weeklyTrend} from last week
              </p>
            </div>
            <div className="p-3 bg-cyan-100 rounded-full">
              <FaDroplet className="text-2xl text-cyan-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Points</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.activePoints}</p>
              <p className="text-gray-600 text-sm mt-2">
                {Math.round((dashboardData.stats.activePoints / dashboardData.stats.totalWaterPoints) * 100)}% operational
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Quality Alerts</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.qualityAlerts}</p>
              <p className="text-red-600 text-sm mt-2">Requires attention</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaExclamationTriangle className="text-2xl text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Community Reports</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.communityReports}</p>
              <p className="text-purple-600 text-sm mt-2">This month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUsers className="text-2xl text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Water Usage Trends</h3>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-4xl text-cyan-600 mx-auto mb-4" />
              <p className="text-gray-600">Chart will be rendered here</p>
              <p className="text-sm text-gray-500 mt-2">Integration with Chart.js or D3.js</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Community Reports</h3>
            <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentReports.map((report) => (
              <div key={report.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full ${
                  report.priority === 'high' ? 'bg-red-100' : report.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <FaFileAlt className={`text-sm ${
                    report.priority === 'high' ? 'text-red-600' : report.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.location} • {report.reporter}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="text-xs text-gray-500">{report.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg hover:from-cyan-100 hover:to-cyan-200 transition-all duration-200 group">
            <FaPlus className="text-2xl text-cyan-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Add Water Point</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
            <FaFileAlt className="text-2xl text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Generate Report</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
            <FaBell className="text-2xl text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Send Alert</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group">
            <FaDownload className="text-2xl text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Export Data</p>
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Water Points Management Component
  const WaterPointsManagement = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Water Points Management</h2>
          <button className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 flex items-center">
            <FaPlus className="mr-2" />
            Add New Water Point
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search water points..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="alert">Alert</option>
          </select>
        </div>
      </div>

      {/* Water Points Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Point</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flow Rate</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH Level</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.waterPoints.map((point) => (
                <tr key={point.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-cyan-100 rounded-full mr-3">
                        <FaDroplet className="text-cyan-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{point.name}</div>
                        <div className="text-sm text-gray-500">ID: {point.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{point.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(point.status)}`}>
                      {point.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${getQualityColor(point.quality)}`}>
                      {point.quality}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{point.flow} L/min</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{point.ph}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{point.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-cyan-600 hover:text-cyan-900 p-2 hover:bg-cyan-50 rounded-full transition-colors">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Real-time Monitoring Component
  const RealTimeMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Real-time Water Monitoring</h2>
        
        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Sensors</span>
                <span className="font-semibold">245/287</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Points/Min</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-semibold">99.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Water Quality Index</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">94.7</div>
              <div className="text-sm text-gray-600">Excellent Quality</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '94.7%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alert Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-red-600 text-sm">Critical</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-600 text-sm">Warning</span>
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-sm">Info</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Water Flow Rates (L/min)</h4>
            <div className="h-64 bg-white rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-4xl text-cyan-600 mx-auto mb-4" />
                <p className="text-gray-600">Real-time Flow Chart</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Water Quality Parameters</h4>
            <div className="h-64 bg-white rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaFlask className="text-4xl text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Quality Metrics Chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Community Reports Component
  const CommunityReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Community Reports</h2>
          <div className="flex space-x-3">
            <button className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 flex items-center">
              <FaDownload className="mr-2" />
              Export
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center">
              <FaPlus className="mr-2" />
              New Report
            </button>
          </div>
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">22</div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {dashboardData.recentReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.priority === 'high' ? 'bg-red-100 text-red-600' : 
                      report.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {report.priority} priority
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {report.location}
                    </span>
                    <span className="flex items-center">
                      <FaUserCircle className="mr-1" />
                      {report.reporter}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {report.timestamp}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-cyan-600 hover:text-cyan-900 p-2 hover:bg-cyan-50 rounded-full transition-colors">
                    <FaEye />
                  </button>
                  <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors">
                    <FaEdit />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors">
                    <FaEnvelope />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" defaultValue="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                  <option>Water Committee Member</option>
                  <option>Community Leader</option>
                  <option>NGO Worker</option>
                  <option>Government Official</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Email notifications for critical alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">SMS notifications for water quality issues</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" />
                <span className="ml-2 text-sm text-gray-700">Weekly summary reports</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Mobile app push notifications</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewDashboard />;
      case 'water-points': return <WaterPointsManagement />;
      case 'monitoring': return <RealTimeMonitoring />;
      case 'reports': return <CommunityReports />;
      case 'analytics': return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800">Analytics & Insights</h2><p className="text-gray-600 mt-4">Advanced analytics dashboard coming soon...</p></div>;
      case 'community': return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800">Community Management</h2><p className="text-gray-600 mt-4">Community management tools coming soon...</p></div>;
      case 'alerts': return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800">Alerts & Notifications</h2><p className="text-gray-600 mt-4">Alert management system coming soon...</p></div>;
      case 'maps': return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800">Interactive Maps</h2><p className="text-gray-600 mt-4">Interactive map integration coming soon...</p></div>;
      case 'settings': return <Settings />;
      default: return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 relative`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="relative">
                <FaWater className="text-2xl text-cyan-600" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Aqua<span className="text-cyan-600">Safi</span>
                  </h1>
                  <p className="text-xs text-gray-600">Dashboard</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
            </button>
          </div>
        </div>

        <nav className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <Icon className="text-lg flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-600">Water Committee</p>
              </div>
            )}
            {sidebarOpen && (
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaSignOutAlt />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-gray-600">Welcome back to AquaSafi Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                  <FaBell className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                </button>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;