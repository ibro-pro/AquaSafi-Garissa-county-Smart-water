import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNavbar from './AdminNavbar';
import AdminAnalytics from './AdminAnalytics';
import WaterInfrastructure from './WaterInfrastructure';
import RealTimeMonitoring from './RealTimeMonitoring';
import { 
  FaWater,
  FaTachometerAlt,
  FaChartLine,
  FaUsers,
  FaExclamationTriangle,
  FaCog,
  FaBell,
  FaMapMarkerAlt,
  FaDownload,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaCheckCircle,
  FaArrowUp,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaShieldAlt,
  FaTools,
  FaUsersCog,
  FaChartBar,
  FaMoneyBillWave,
  FaWarehouse,
  FaHeadset,
  FaGlobe,
  FaHistory,
  FaBullhorn,
  FaRocket,
  FaCrown,
  FaGem,
  FaThumbsUp
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // Enhanced Admin Dashboard Data
  const [adminData] = useState({
    systemStats: {
      totalWaterPoints: 412,
      activePoints: 387,
      maintenancePoints: 18,
      offlinePoints: 7,
      totalUsers: 15429,
      activeUsers: 12384,
      administrativeStaff: 45,
      fieldTechnicians: 78,
      monthlyRevenue: 4567890,
      operationalCosts: 2890340,
      systemEfficiency: 96.8,
      customerSatisfaction: 94.2,
      alertsToday: 23,
      reportsProcessed: 156,
      maintenanceCompleted: 12,
      newRegistrations: 89
    },
    regionalData: [
      {
        id: 1,
        region: 'Garissa Town',
        waterPoints: 89,
        population: 5247,
        coverage: 94.2,
        qualityScore: 92.8,
        revenue: 1234567,
        status: 'excellent'
      },
      {
        id: 2,
        region: 'Dadaab Complex',
        waterPoints: 156,
        population: 8956,
        coverage: 87.5,
        qualityScore: 89.1,
        revenue: 2134890,
        status: 'good'
      },
      {
        id: 3,
        region: 'Ijara District',
        waterPoints: 67,
        population: 3456,
        coverage: 91.3,
        qualityScore: 88.7,
        revenue: 987456,
        status: 'good'
      },
      {
        id: 4,
        region: 'Lagdera',
        waterPoints: 45,
        population: 2187,
        coverage: 78.9,
        qualityScore: 82.4,
        revenue: 567234,
        status: 'needs-attention'
      },
      {
        id: 5,
        region: 'Balambala',
        waterPoints: 55,
        population: 2983,
        coverage: 85.6,
        qualityScore: 86.2,
        revenue: 743289,
        status: 'good'
      }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'maintenance',
        title: 'Pump Replacement Completed',
        location: 'Garissa Main Borehole',
        user: 'Ahmed Hassan',
        timestamp: '15 mins ago',
        priority: 'high',
        status: 'completed'
      },
      {
        id: 2,
        type: 'alert',
        title: 'Water Quality Alert',
        location: 'Dadaab Camp Section C',
        user: 'System Monitor',
        timestamp: '32 mins ago',
        priority: 'critical',
        status: 'investigating'
      },
      {
        id: 3,
        type: 'user',
        title: 'New User Registration',
        location: 'Iftin Village',
        user: 'Fatima Mohammed',
        timestamp: '1 hour ago',
        priority: 'low',
        status: 'approved'
      },
      {
        id: 4,
        type: 'financial',
        title: 'Payment Processed',
        location: 'Sankuri Community',
        user: 'Payment Gateway',
        timestamp: '2 hours ago',
        priority: 'medium',
        status: 'completed'
      }
    ],
    systemAlerts: [
      {
        id: 1,
        type: 'critical',
        title: 'Server Load High - Immediate Action Required',
        description: 'Database server experiencing high load. Consider scaling.',
        timestamp: '5 mins ago',
        acknowledged: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Scheduled Maintenance Reminder',
        description: 'Lagdera water treatment plant maintenance due tomorrow.',
        timestamp: '1 hour ago',
        acknowledged: true
      },
      {
        id: 3,
        type: 'info',
        title: 'System Update Available',
        description: 'AquaSafi v2.1.4 with security patches available.',
        timestamp: '3 hours ago',
        acknowledged: false
      }
    ]
  });

  // Enhanced Sidebar Menu Items for Admin
  const adminMenuItems = [
    { 
      id: 'overview', 
      label: 'System Overview', 
      icon: FaTachometerAlt, 
      badge: null,
      category: 'main'
    },
    { 
      id: 'water-infrastructure', 
      label: 'Water Infrastructure', 
      icon: FaWater, 
      badge: '412',
      category: 'main'
    },
    { 
      id: 'real-time-monitoring', 
      label: 'Real-time Monitoring', 
      icon: FaChartLine, 
      badge: 'LIVE',
      category: 'main'
    },
    { 
      id: 'user-management', 
      label: 'User Management', 
      icon: FaUsersCog, 
      badge: '15.4K',
      category: 'management'
    },
    { 
      id: 'staff-management', 
      label: 'Staff Management', 
      icon: FaUsers, 
      badge: '123',
      category: 'management'
    },
    { 
      id: 'financial-management', 
      label: 'Financial Management', 
      icon: FaMoneyBillWave, 
      badge: null,
      category: 'management'
    },
    { 
      id: 'inventory-assets', 
      label: 'Inventory & Assets', 
      icon: FaWarehouse, 
      badge: null,
      category: 'operations'
    },
    { 
      id: 'maintenance-operations', 
      label: 'Maintenance Operations', 
      icon: FaTools, 
      badge: '23',
      category: 'operations'
    },
    { 
      id: 'quality-control', 
      label: 'Quality Control', 
      icon: FaFlask, 
      badge: null,
      category: 'operations'
    },
    { 
      id: 'reports-analytics', 
      label: 'Reports & Analytics', 
      icon: FaChartBar, 
      badge: null,
      category: 'analytics'
    },
    { 
      id: 'emergency-response', 
      label: 'Emergency Response', 
      icon: FaExclamationTriangle, 
      badge: '3',
      category: 'emergency'
    },
    { 
      id: 'communication-center', 
      label: 'Communication Center', 
      icon: FaBullhorn, 
      badge: null,
      category: 'communication'
    },
    { 
      id: 'system-administration', 
      label: 'System Administration', 
      icon: FaShieldAlt, 
      badge: null,
      category: 'system'
    },
    { 
      id: 'audit-logs', 
      label: 'Audit & Logs', 
      icon: FaHistory, 
      badge: null,
      category: 'system'
    },
    { 
      id: 'settings-configuration', 
      label: 'Settings & Configuration', 
      icon: FaCog, 
      badge: null,
      category: 'system'
    }
  ];

  // System Overview Component
  const SystemOverview = () => (
    <div className="space-y-8">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Water Points</p>
              <p className="text-4xl font-bold">{adminData.systemStats.totalWaterPoints}</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-green-300 text-sm">+8.2% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <FaWater className="text-3xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Active Users</p>
              <p className="text-4xl font-bold">{(adminData.systemStats.activeUsers / 1000).toFixed(1)}K</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-green-300 text-sm">+12.4% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <FaUsers className="text-3xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Monthly Revenue</p>
              <p className="text-4xl font-bold">₦{(adminData.systemStats.monthlyRevenue / 1000000).toFixed(1)}M</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-green-300 text-sm">+15.7% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <FaMoneyBillWave className="text-3xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">System Efficiency</p>
              <p className="text-4xl font-bold">{adminData.systemStats.systemEfficiency}%</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-300 mr-1" />
                <span className="text-green-300 text-sm">+2.1% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <FaRocket className="text-3xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-cyan-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.activePoints}</p>
            <p className="text-sm text-gray-600">Active Points</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{width: `${(adminData.systemStats.activePoints/adminData.systemStats.totalWaterPoints)*100}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.maintenancePoints}</p>
            <p className="text-sm text-gray-600">Maintenance</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${(adminData.systemStats.maintenancePoints/adminData.systemStats.totalWaterPoints)*100}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.offlinePoints}</p>
            <p className="text-sm text-gray-600">Offline</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-red-500 h-2 rounded-full" style={{width: `${(adminData.systemStats.offlinePoints/adminData.systemStats.totalWaterPoints)*100}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.alertsToday}</p>
            <p className="text-sm text-gray-600">Today's Alerts</p>
            <div className="flex justify-center mt-2">
              <FaBell className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.newRegistrations}</p>
            <p className="text-sm text-gray-600">New Users</p>
            <div className="flex justify-center mt-2">
              <FaUserCircle className="text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-indigo-500">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{adminData.systemStats.customerSatisfaction}%</p>
            <p className="text-sm text-gray-600">Satisfaction</p>
            <div className="flex justify-center mt-2">
              <FaThumbsUp className="text-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Performance and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaGlobe className="mr-3 text-blue-600" />
              Regional Performance
            </h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {adminData.regionalData.map((region, index) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{region.region}</h4>
                  <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                    <div>
                      <p className="text-gray-600">Points: <span className="font-medium">{region.waterPoints}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coverage: <span className="font-medium">{region.coverage}%</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quality: <span className="font-medium">{region.qualityScore}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    region.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    region.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {region.status}
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <FaEye />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaHistory className="mr-3 text-green-600" />
              Recent Activities
            </h3>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {adminData.recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'maintenance' ? 'bg-yellow-100 text-yellow-600' :
                  activity.type === 'alert' ? 'bg-red-100 text-red-600' :
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {activity.type === 'maintenance' ? <FaTools /> :
                   activity.type === 'alert' ? <FaExclamationTriangle /> :
                   activity.type === 'user' ? <FaUserCircle /> :
                   <FaMoneyBillWave />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{activity.location} • {activity.user}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <FaBell className="mr-3 text-red-600" />
            System Alerts
          </h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Mark All Read
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              Critical Only
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminData.systemAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    alert.type === 'critical' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{alert.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {!alert.acknowledged && (
                    <div className={`w-3 h-3 rounded-full ${
                      alert.type === 'critical' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  )}
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FaTimes />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );





  // User Management Component
  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">User Management System</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaPlus className="mr-2" />
            Add User
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <FaUsersCog className="mr-2" />
            Bulk Actions
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Comprehensive user management interface will be implemented here.</p>
        <p className="text-gray-600 mt-2">Features include: User profiles, Access control, Activity tracking, Communication tools.</p>
      </div>
    </div>
  );

  // Financial Management Component
  const FinancialManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Financial Management Center</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <FaChartLine className="mr-2" />
            Generate Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Payment Processing
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Complete financial management system will be implemented here.</p>
        <p className="text-gray-600 mt-2">Features include: Revenue tracking, Payment processing, Budget management, Financial reporting.</p>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SystemOverview />;
      case 'water-infrastructure':
        return <WaterInfrastructure />;
      case 'real-time-monitoring':
        return <RealTimeMonitoring />;
      case 'user-management':
        return <UserManagement />;
      case 'financial-management':
        return <FinancialManagement />;
      case 'reports-analytics':
        return <AdminAnalytics />;
      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl text-gray-300 mb-4">
              <FaRocket />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {adminMenuItems.find(item => item.id === activeTab)?.label || 'Feature'} Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              This advanced administrative feature is currently under development and will be available soon.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Request Early Access
            </button>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Enhanced Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col relative shadow-2xl`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <FaCrown className="text-white text-xl" />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AquaSafi Admin
                </h1>
                <p className="text-xs text-slate-400">Professional Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-2">
            {adminMenuItems.map((item, index) => {
              const isActive = activeTab === item.id;
              const categoryItems = adminMenuItems.filter(i => i.category === item.category);
              const isFirstInCategory = categoryItems[0].id === item.id;
              
              return (
                <div key={item.id}>
                  {isFirstInCategory && sidebarOpen && item.category !== 'main' && (
                    <div className="px-3 py-2 mt-6 mb-2">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {item.category.replace('-', ' ')}
                      </h3>
                    </div>
                  )}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg transform scale-105'
                        : 'hover:bg-slate-700 hover:translate-x-1'
                    }`}
                  >
                    <item.icon className={`text-lg ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                    {sidebarOpen && (
                      <>
                        <span className={`ml-3 font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                            isActive 
                              ? 'bg-white bg-opacity-20 text-white' 
                              : item.badge === 'LIVE'
                                ? 'bg-green-500 text-white animate-pulse'
                                : 'bg-slate-600 text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isActive && (
                      <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-full"></div>
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          {sidebarOpen ? <FaTimes className="text-xs" /> : <FaBars className="text-xs" />}
        </button>

        {/* Admin Profile */}
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <FaUserCircle className="text-white text-lg" />
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-white">Administrator</p>
                <p className="text-xs text-slate-400">System Admin</p>
              </div>
            )}
            {sidebarOpen && (
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <FaSignOutAlt />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {/* Enhanced Top Navigation */}
        <AdminNavbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onToggleFullscreen={() => setFullScreen(!fullScreen)}
          darkMode={darkMode}
          fullScreen={fullScreen}
        />

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

export default AdminDashboard;