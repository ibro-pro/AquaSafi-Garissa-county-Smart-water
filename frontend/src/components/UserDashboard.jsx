import React, { useState, useEffect } from 'react';
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
  FaThermometerHalf,
  FaVial,
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
  FaPhone,
  FaSpinner,
  FaWifi,
  FaBolt,
  FaSnowflake,
  FaIndustry,
  FaNetworkWired,
  FaDatabase,
  FaRocket,
  FaLeaf,
  FaMicrochip,
  FaPlay,
  FaPause,
  FaFileExport,
  FaFilePdf,
  FaFileCsv,
  FaPrint,
  FaChartBar
} from 'react-icons/fa';

// API service functions - Updated with reports endpoints
const apiService = {
  baseURL: '/api',

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  },

  // User endpoints
  async getProfile() {
    return this.request('/users/profile');
  },

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async getUsers() {
    return this.request('/users');
  },

  // Water Points endpoints
  async getWaterPoints(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/water-points?${queryParams}`);
  },

  async getWaterPoint(id) {
    return this.request(`/water-points/${id}`);
  },

  async createWaterPoint(waterPointData) {
    return this.request('/water-points', {
      method: 'POST',
      body: JSON.stringify(waterPointData),
    });
  },

  async updateWaterPoint(id, waterPointData) {
    return this.request(`/water-points/${id}`, {
      method: 'PUT',
      body: JSON.stringify(waterPointData),
    });
  },

  async getWaterPointMetrics(id) {
    return this.request(`/water-points/${id}/metrics`);
  },

  // Maintenance Tasks endpoints
  async getMaintenanceTasks(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/maintenance-tasks?${queryParams}`);
  },

  async createMaintenanceTask(taskData) {
    return this.request('/maintenance-tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  async updateMaintenanceTask(id, taskData) {
    return this.request(`/maintenance-tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  // Quality Checks endpoints
  async createQualityCheck(qualityData) {
    return this.request('/quality-checks', {
      method: 'POST',
      body: JSON.stringify(qualityData),
    });
  },

  // Alerts endpoints (from admin)
  async getAlerts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/alerts?${queryParams}`);
  },

  async acknowledgeAlert(id) {
    return this.request(`/alerts/${id}/acknowledge`, {
      method: 'POST',
    });
  },

  async resolveAlert(id) {
    return this.request(`/alerts/${id}/resolve`, {
      method: 'POST',
    });
  },

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  },

  // Monitoring endpoints
  async getMonitoringDashboard() {
    return this.request('/monitoring/dashboard');
  },

  async getWaterPointsStatus() {
    return this.request('/monitoring/water-points/status');
  },

  async getActiveAlerts() {
    return this.request('/monitoring/alerts/active');
  },

  async getSystemHealth() {
    return this.request('/monitoring/system-health');
  },

  async getNotifications() {
    return this.request('/monitoring/notifications');
  },

  // Reports endpoints
  async generateReport(reportData) {
    return this.request('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  async getReports(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/reports?${queryParams}`);
  },

  async getReport(id) {
    return this.request(`/reports/${id}`);
  },

  async deleteReport(id) {
    return this.request(`/reports/${id}`, {
      method: 'DELETE',
    });
  },

  async downloadReport(id, format = 'pdf') {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${this.baseURL}/reports/${id}/download?format=${format}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${id}.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Settings endpoints
  async getSettings() {
    return this.request('/settings');
  },

  async updateSetting(key, value) {
    return this.request(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    });
  },

  // Export endpoints
  async exportData(resource) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${this.baseURL}/export/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalWaterPoints: 0,
      activePoints: 0,
      qualityAlerts: 0,
      communityReports: 0,
      weeklyTrend: '+0%',
      monthlyUsage: '0 liters',
      efficiency: 0
    },
    waterPoints: [],
    recentReports: [],
    maintenanceTasks: [],
    alerts: [],
    reports: [],
    monitoringData: {
      systemStatus: {
        totalSensors: 0,
        activeSensors: 0,
        alertSensors: 0,
        offlineSensors: 0,
        lastUpdate: new Date().toLocaleTimeString(),
        systemHealth: 0,
        networkLatency: 0,
        dataTransmission: 0
      },
      waterPoints: [],
      activeAlerts: [],
      systemHealth: {},
      notifications: []
    }
  });

  // Real-time monitoring states
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [viewMode, setViewMode] = useState('grid');
  const [alertsOnly, setAlertsOnly] = useState(false);

  // Report generation states
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    type: 'water_quality',
    period_start: '',
    period_end: '',
    water_point_id: '',
    include_charts: true,
    include_recommendations: true
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load user profile
      const profile = await apiService.getProfile();
      setUser(profile.user);

      // Load dashboard stats
      const stats = await apiService.getDashboardStats();
      setDashboardData(prev => ({ ...prev, stats }));

      // Load water points
      const waterPointsData = await apiService.getWaterPoints({ page: 1, per_page: 10 });
      setDashboardData(prev => ({ ...prev, waterPoints: waterPointsData.water_points }));

      // Load alerts (from admin)
      const alertsData = await apiService.getAlerts({ status: 'active', per_page: 5 });
      setDashboardData(prev => ({ ...prev, alerts: alertsData.alerts }));

      // Load reports
      const reportsData = await apiService.getReports({ page: 1, per_page: 5 });
      setDashboardData(prev => ({ ...prev, reports: reportsData.reports }));

      // Load monitoring data
      await loadMonitoringData();

    } catch (error) {
      console.error('Failed to load initial data:', error);
      alert('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load monitoring data
  const loadMonitoringData = async () => {
    try {
      const [
        dashboardData,
        waterPointsData,
        alertsData,
        healthData,
        notificationsData
      ] = await Promise.all([
        apiService.getMonitoringDashboard(),
        apiService.getWaterPointsStatus(),
        apiService.getActiveAlerts(),
        apiService.getSystemHealth(),
        apiService.getNotifications()
      ]);

      const transformedData = {
        systemStatus: {
          totalSensors: dashboardData?.system_status?.total_water_points * 6 || 0,
          activeSensors: dashboardData?.system_status?.active_water_points * 6 || 0,
          alertSensors: dashboardData?.alerts_summary?.total || 0,
          offlineSensors: dashboardData?.system_status?.offline_water_points * 6 || 0,
          lastUpdate: new Date().toLocaleTimeString(),
          systemHealth: dashboardData?.system_status?.system_health || 0,
          networkLatency: dashboardData?.system_status?.network_latency || 0,
          dataTransmission: dashboardData?.system_status?.data_transmission || 0
        },
        waterPoints: waterPointsData.water_points || [],
        activeAlerts: alertsData.alerts || [],
        systemHealth: healthData,
        notifications: notificationsData.notifications || []
      };

      setDashboardData(prev => ({ 
        ...prev, 
        monitoringData: transformedData 
      }));
    } catch (error) {
      console.error('Failed to load monitoring data:', error);
    }
  };

  // Real-time monitoring effect
  useEffect(() => {
    if (activeTab === 'monitoring' && isMonitoring) {
      const interval = setInterval(() => {
        loadMonitoringData();
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [activeTab, isMonitoring, refreshInterval]);

  // Load tab-specific data when tab changes
  useEffect(() => {
    loadTabData(activeTab);
  }, [activeTab]);

  const loadTabData = async (tab) => {
    try {
      setLoading(true);
      
      switch (tab) {
        case 'water-points':
          const waterPointsData = await apiService.getWaterPoints({ 
            page: 1, 
            per_page: 10,
            status: filterStatus !== 'all' ? filterStatus : undefined
          });
          setDashboardData(prev => ({ ...prev, waterPoints: waterPointsData.water_points }));
          break;
          
        case 'maintenance':
          const tasksData = await apiService.getMaintenanceTasks({ 
            page: 1, 
            per_page: 10 
          });
          setDashboardData(prev => ({ ...prev, maintenanceTasks: tasksData.tasks }));
          break;
          
        case 'alerts':
          const alertsData = await apiService.getAlerts({ 
            page: 1, 
            per_page: 10 
          });
          setDashboardData(prev => ({ ...prev, alerts: alertsData.alerts }));
          break;
          
        case 'reports':
          const reportsData = await apiService.getReports({ 
            page: 1, 
            per_page: 10 
          });
          setDashboardData(prev => ({ ...prev, reports: reportsData.reports }));
          break;
          
        case 'monitoring':
          await loadMonitoringData();
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to load ${tab} data:`, error);
      alert(`Failed to load ${tab} data: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler functions for API calls
  const handleCreateWaterPoint = async (waterPointData) => {
    try {
      const result = await apiService.createWaterPoint(waterPointData);
      alert('Water point created successfully!');
      loadTabData('water-points');
      return result;
    } catch (error) {
      alert('Failed to create water point: ' + error.message);
      throw error;
    }
  };

  const handleUpdateWaterPoint = async (id, waterPointData) => {
    try {
      const result = await apiService.updateWaterPoint(id, waterPointData);
      alert('Water point updated successfully!');
      loadTabData('water-points');
      return result;
    } catch (error) {
      alert('Failed to update water point: ' + error.message);
      throw error;
    }
  };

  const handleCreateMaintenanceTask = async (taskData) => {
    try {
      const result = await apiService.createMaintenanceTask(taskData);
      alert('Maintenance task created successfully!');
      loadTabData('maintenance');
      return result;
    } catch (error) {
      alert('Failed to create maintenance task: ' + error.message);
      throw error;
    }
  };

  const handleAcknowledgeAlert = async (alertId) => {
    try {
      await apiService.acknowledgeAlert(alertId);
      alert('Alert acknowledged!');
      loadTabData('alerts');
      loadMonitoringData();
    } catch (error) {
      alert('Failed to acknowledge alert: ' + error.message);
    }
  };

  const handleResolveAlert = async (alertId) => {
    try {
      await apiService.resolveAlert(alertId);
      alert('Alert resolved!');
      loadTabData('alerts');
      loadMonitoringData();
    } catch (error) {
      alert('Failed to resolve alert: ' + error.message);
    }
  };

  const handleExportData = async (resource) => {
    try {
      await apiService.exportData(resource);
      alert('Data exported successfully!');
    } catch (error) {
      alert('Failed to export data: ' + error.message);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const result = await apiService.generateReport(reportData);
      alert('Report generated successfully!');
      setShowReportForm(false);
      setReportData({
        title: '',
        type: 'water_quality',
        period_start: '',
        period_end: '',
        water_point_id: '',
        include_charts: true,
        include_recommendations: true
      });
      loadTabData('reports');
      return result;
    } catch (error) {
      alert('Failed to generate report: ' + error.message);
      throw error;
    }
  };

  const handleDownloadReport = async (reportId, format = 'pdf') => {
    try {
      await apiService.downloadReport(reportId, format);
      alert(`Report downloaded as ${format.toUpperCase()}!`);
    } catch (error) {
      alert('Failed to download report: ' + error.message);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await apiService.deleteReport(reportId);
        alert('Report deleted successfully!');
        loadTabData('reports');
      } catch (error) {
        alert('Failed to delete report: ' + error.message);
      }
    }
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'alert': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-orange-600 bg-orange-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'acknowledged': return 'text-blue-600 bg-blue-100';
      case 'normal': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConnectivityColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'weak': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSensorIcon = (sensorType) => {
    switch (sensorType) {
      case 'flow': return <FaWater className="text-blue-500" />;
      case 'temperature': return <FaThermometerHalf className="text-red-500" />;
      case 'ph': return <FaVial className="text-purple-500" />;
      case 'pressure': return <FaTachometerAlt className="text-orange-500" />;
      case 'turbidity': return <FaSnowflake className="text-cyan-500" />;
      case 'chlorine': return <FaLeaf className="text-green-500" />;
      default: return <FaMicrochip className="text-gray-500" />;
    }
  };

  // Quality colors
  const getQualityColor = (qualityScore) => {
    if (qualityScore >= 90) return 'text-green-600';
    if (qualityScore >= 70) return 'text-blue-600';
    if (qualityScore >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityText = (qualityScore) => {
    if (qualityScore >= 90) return 'Excellent';
    if (qualityScore >= 70) return 'Good';
    if (qualityScore >= 50) return 'Fair';
    return 'Poor';
  };

  // Sidebar menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaTachometerAlt },
    { id: 'water-points', label: 'Water Points', icon: FaWater },
    { id: 'maintenance', label: 'Maintenance', icon: FaCog },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: FaChartLine },
    { id: 'reports', label: 'Reports', icon: FaFileAlt },
    { id: 'alerts', label: 'Alerts', icon: FaBell },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

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
                {dashboardData.stats.weeklyTrend}
              </p>
            </div>
            <div className="p-3 bg-cyan-100 rounded-full">
              <FaWater className="text-2xl text-cyan-600" />
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
                {dashboardData.stats.totalWaterPoints > 0 
                  ? Math.round((dashboardData.stats.activePoints / dashboardData.stats.totalWaterPoints) * 100)
                  : 0
                }% operational
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('water-points')}
            className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg hover:from-cyan-100 hover:to-cyan-200 transition-all duration-200 group"
          >
            <FaPlus className="text-2xl text-cyan-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Add Water Point</p>
          </button>
          <button 
            onClick={() => { setActiveTab('reports'); setShowReportForm(true); }}
            className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
          >
            <FaFileAlt className="text-2xl text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Generate Report</p>
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group"
          >
            <FaBell className="text-2xl text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">View Alerts</p>
          </button>
          <button 
            onClick={() => handleExportData('water_points')}
            className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group"
          >
            <FaDownload className="text-2xl text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-700">Export Data</p>
          </button>
        </div>
      </motion.div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent Alerts</h3>
          <button 
            onClick={() => setActiveTab('alerts')}
            className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {dashboardData.alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <FaExclamationTriangle className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{alert.title}</p>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAcknowledgeAlert(alert.id)}
                className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
              >
                Acknowledge
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Real-time Monitoring Component
  const RealTimeMonitoring = () => {
    const filteredWaterPoints = alertsOnly ? 
      dashboardData.monitoringData.waterPoints.filter(point => 
        point.overall_status === 'critical' || point.overall_status === 'warning'
      ) : 
      dashboardData.monitoringData.waterPoints;

    const SystemStatusCard = () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaRocket className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">System Status</h3>
              <p className="text-sm text-gray-600">Last updated: {dashboardData.monitoringData.systemStatus.lastUpdate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-600">{isMonitoring ? 'Live' : 'Paused'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <FaCheckCircle className="text-green-600" />
              <span className="text-2xl font-bold text-green-800">{dashboardData.monitoringData.systemStatus.activeSensors}</span>
            </div>
            <p className="text-sm text-green-700">Active Sensors</p>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <FaExclamationTriangle className="text-red-600" />
              <span className="text-2xl font-bold text-red-800">{dashboardData.monitoringData.systemStatus.alertSensors}</span>
            </div>
            <p className="text-sm text-red-700">Alert Sensors</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <FaNetworkWired className="text-blue-600" />
              <span className="text-2xl font-bold text-blue-800">{dashboardData.monitoringData.systemStatus.networkLatency}ms</span>
            </div>
            <p className="text-sm text-blue-700">Network Latency</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <FaDatabase className="text-purple-600" />
              <span className="text-2xl font-bold text-purple-800">{dashboardData.monitoringData.systemStatus.dataTransmission.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-purple-700">Data Transmission</p>
          </div>
        </div>
      </motion.div>
    );

    const WaterPointMonitorCard = ({ waterPoint, index }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              waterPoint.overall_status === 'critical' ? 'bg-red-100' :
              waterPoint.overall_status === 'warning' ? 'bg-yellow-100' :
              waterPoint.overall_status === 'offline' ? 'bg-gray-100' : 'bg-green-100'
            }`}>
              <FaIndustry className={
                waterPoint.overall_status === 'critical' ? 'text-red-600' :
                waterPoint.overall_status === 'warning' ? 'text-yellow-600' :
                waterPoint.overall_status === 'offline' ? 'text-gray-600' : 'text-green-600'
              } />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{waterPoint.name}</h4>
              <p className="text-sm text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                {waterPoint.location}
              </p>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <FaWifi className={getConnectivityColor(waterPoint.connectivity?.status)} />
              <span className="text-xs text-gray-600">{waterPoint.connectivity?.signal}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaBolt className={waterPoint.power_status?.charging ? 'text-green-500' : 'text-gray-500'} />
              <span className="text-xs text-gray-600">{waterPoint.power_status?.battery}%</span>
            </div>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(waterPoint.sensors || {}).map(([sensorType, sensor]) => (
            <div key={sensorType} className={`p-3 rounded-xl border-2 ${getStatusColor(sensor.status)}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {getSensorIcon(sensorType)}
                  <span className="text-xs font-medium capitalize">{sensorType}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                  {sensor.status}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-gray-800">
                  {sensor.value?.toFixed(1) || '0.0'}
                </span>
                <span className="text-xs text-gray-600">{sensor.unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{sensor.last_update}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
              title="View Details"
            >
              <FaEye />
            </button>
            <button 
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
              title="Configure"
            >
              <FaCog />
            </button>
            <button 
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" 
              title="Download Data"
              onClick={() => handleExportData('water_points')}
            >
              <FaDownload />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Health Score</p>
            <div className="flex items-center space-x-2">
              <div className="w-12 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    waterPoint.overall_status === 'critical' ? 'bg-red-500' :
                    waterPoint.overall_status === 'warning' ? 'bg-yellow-500' :
                    waterPoint.overall_status === 'offline' ? 'bg-gray-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.max(0, Math.min(100, 
                      Object.values(waterPoint.sensors || {}).filter(s => s.status === 'normal').length / 
                      Math.max(Object.values(waterPoint.sensors || {}).length, 1) * 100
                    ))}%` 
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(Object.values(waterPoint.sensors || {}).filter(s => s.status === 'normal').length / 
                  Math.max(Object.values(waterPoint.sensors || {}).length, 1) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );

    return (
      <div className="space-y-6">
        {/* Header and Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaChartLine className="mr-3 text-green-600" />
              Real-time System Monitoring
            </h2>
            <p className="text-gray-600 mt-1">Live monitoring of all water infrastructure sensors and systems</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Refresh:</label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>1s</option>
                <option value={5}>5s</option>
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
              </select>
            </div>
            
            <button
              onClick={() => setAlertsOnly(!alertsOnly)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
                alertsOnly 
                  ? 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <FaExclamationTriangle className="mr-2" />
              {alertsOnly ? 'Show All' : 'Alerts Only'}
            </button>
            
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
                isMonitoring 
                  ? 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300'
              }`}
            >
              {isMonitoring ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
              {isMonitoring ? 'Pause' : 'Resume'}
            </button>
            
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm border border-blue-700"
              onClick={() => handleExportData('water_points')}
            >
              <FaFileExport className="mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* System Status Overview */}
        <SystemStatusCard />

        {/* Water Points Monitoring Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Water Points Status</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {filteredWaterPoints.length === 0 ? (
            <div className="text-center py-12">
              <FaCheckCircle className="mx-auto text-6xl text-green-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {alertsOnly ? 'No Alerts Found' : 'No Water Points Found'}
              </h3>
              <p className="text-gray-500">
                {alertsOnly ? 'All systems are operating normally' : 'No water points available'}
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredWaterPoints.map((waterPoint, index) => (
                <WaterPointMonitorCard 
                  key={waterPoint.id} 
                  waterPoint={waterPoint} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Water Points Management Component
  const WaterPointsManagement = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newWaterPoint, setNewWaterPoint] = useState({
      name: '',
      type: 'borehole',
      region: '',
      location: '',
      latitude: '',
      longitude: '',
      capacity: '',
      population_served: ''
    });

    const handleCreateSubmit = async (e) => {
      e.preventDefault();
      try {
        await handleCreateWaterPoint(newWaterPoint);
        setShowCreateForm(false);
        setNewWaterPoint({
          name: '',
          type: 'borehole',
          region: '',
          location: '',
          latitude: '',
          longitude: '',
          capacity: '',
          population_served: ''
        });
      } catch (error) {
        // Error handled in the service function
      }
    };

    return (
      <div className="space-y-6">
        {/* Header with Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Water Points Management</h2>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 flex items-center"
            >
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
              onChange={(e) => {
                setFilterStatus(e.target.value);
                loadTabData('water-points');
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Create Water Point Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Water Point</h3>
              <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newWaterPoint.name}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
                <select
                  value={newWaterPoint.type}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, type: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="borehole">Borehole</option>
                  <option value="well">Well</option>
                  <option value="tap">Water Tap</option>
                  <option value="reservoir">Reservoir</option>
                </select>
                <input
                  type="text"
                  placeholder="Region"
                  value={newWaterPoint.region}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, region: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newWaterPoint.location}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, location: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={newWaterPoint.latitude}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, latitude: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={newWaterPoint.longitude}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, longitude: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Capacity (liters)"
                  value={newWaterPoint.capacity}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, capacity: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Population Served"
                  value={newWaterPoint.population_served}
                  onChange={(e) => setNewWaterPoint({...newWaterPoint, population_served: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <div className="md:col-span-2 flex space-x-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    Create Water Point
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Water Points Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <FaSpinner className="animate-spin text-cyan-600 text-2xl" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Point</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
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
                            <FaWater className="text-cyan-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{point.name}</div>
                            <div className="text-sm text-gray-500">{point.type}</div>
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
                        <span className={`font-medium ${getQualityColor(point.quality_score)}`}>
                          {getQualityText(point.quality_score)} ({point.quality_score})
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{point.capacity}L</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{point.population_served}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {new Date(point.updated_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {/* Implement view details */}}
                            className="text-cyan-600 hover:text-cyan-900 p-2 hover:bg-cyan-50 rounded-full transition-colors"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => {/* Implement edit */}}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors"
                          >
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
          )}
        </div>
      </div>
    );
  };

  // Reports Management Component
  const ReportsManagement = () => (
    <div className="space-y-6">
      {/* Report Generation Form */}
      <AnimatePresence>
        {showReportForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Generate New Report</h3>
              <button
                onClick={() => setShowReportForm(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleGenerateReport(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                  <input
                    type="text"
                    value={reportData.title}
                    onChange={(e) => setReportData({...reportData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter report title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={reportData.type}
                    onChange={(e) => setReportData({...reportData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="water_quality">Water Quality</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="usage">Water Usage</option>
                    <option value="performance">System Performance</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period Start</label>
                  <input
                    type="date"
                    value={reportData.period_start}
                    onChange={(e) => setReportData({...reportData, period_start: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period End</label>
                  <input
                    type="date"
                    value={reportData.period_end}
                    onChange={(e) => setReportData({...reportData, period_end: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Point (Optional)</label>
                  <select
                    value={reportData.water_point_id}
                    onChange={(e) => setReportData({...reportData, water_point_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">All Water Points</option>
                    {dashboardData.waterPoints.map(point => (
                      <option key={point.id} value={point.id}>{point.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportData.include_charts}
                    onChange={(e) => setReportData({...reportData, include_charts: e.target.checked})}
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Charts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportData.include_recommendations}
                    onChange={(e) => setReportData({...reportData, include_recommendations: e.target.checked})}
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Recommendations</span>
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 flex items-center"
                >
                  <FaFileAlt className="mr-2" />
                  Generate Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
            <p className="text-gray-600 mt-1">Generated reports and analytics</p>
          </div>
          <button 
            onClick={() => setShowReportForm(true)}
            className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 flex items-center mt-4 md:mt-0"
          >
            <FaPlus className="mr-2" />
            Generate Report
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <FaSpinner className="animate-spin text-cyan-600 text-2xl" />
          </div>
        ) : dashboardData.reports.length === 0 ? (
          <div className="text-center py-12">
            <FaFileAlt className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reports Generated</h3>
            <p className="text-gray-500 mb-6">Generate your first report to get started</p>
            <button 
              onClick={() => setShowReportForm(true)}
              className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300"
            >
              Generate Report
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <FaFileAlt className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{report.type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(report.period_start).toLocaleDateString()} - {new Date(report.period_end).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDownloadReport(report.id, 'pdf')}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                          title="Download PDF"
                        >
                          <FaFilePdf />
                        </button>
                        <button 
                          onClick={() => handleDownloadReport(report.id, 'csv')}
                          className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors"
                          title="Download CSV"
                        >
                          <FaFileCsv />
                        </button>
                        <button 
                          onClick={() => handleDownloadReport(report.id, 'pdf')}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                          title="Print"
                        >
                          <FaPrint />
                        </button>
                        <button 
                          onClick={() => handleDeleteReport(report.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Alerts Management Component (Alerts from Admin)
  const AlertsManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
            <p className="text-gray-600 mt-1">Alerts and notifications from system administrators</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Alerts from Admin</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <FaSpinner className="animate-spin text-cyan-600 text-2xl" />
          </div>
        ) : dashboardData.alerts.length === 0 ? (
          <div className="text-center py-12">
            <FaCheckCircle className="mx-auto text-6xl text-green-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Alerts</h3>
            <p className="text-gray-500">All systems are operating normally</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dashboardData.alerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 ${
                alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              } rounded-r-lg p-6 hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100' :
                        alert.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <FaExclamationTriangle className={
                          alert.priority === 'high' ? 'text-red-600' :
                          alert.priority === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        } />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{alert.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-600' : 
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {alert.priority} priority
                          </span>
                          <span className="text-xs text-gray-500">
                            From: System Admin
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Type: {alert.type}</span>
                      <span>Created: {new Date(alert.created_at).toLocaleDateString()}</span>
                      {alert.water_point_id && <span>Water Point: {alert.water_point_id}</span>}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {alert.status === 'active' && (
                      <button 
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                    <button 
                      onClick={() => handleResolveAlert(alert.id)}
                      className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => {
    const [profile, setProfile] = useState({
      full_name: user?.full_name || '',
      phone_number: user?.phone_number || '',
      location: user?.location || '',
      community: user?.community || '',
      organization: user?.organization || '',
      emergency_contact: user?.emergency_contact || '',
      emergency_phone: user?.emergency_phone || ''
    });

    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      try {
        await apiService.updateProfile(profile);
        alert('Profile updated successfully!');
        // Reload user data
        const userData = await apiService.getProfile();
        setUser(userData.user);
      } catch (error) {
        alert('Failed to update profile: ' + error.message);
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={profile.phone_number}
                    onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text" 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Community</label>
                  <input 
                    type="text" 
                    value={profile.community}
                    onChange={(e) => setProfile({...profile, community: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Update Profile
                </button>
              </form>
            </div>

            {/* Account Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                  <button 
                    onClick={() => {/* Implement password change modal */}}
                    className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                  >
                    Change Password
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Export Data</h4>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleExportData('water_points')}
                      className="text-sm bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-700"
                    >
                      Water Points
                    </button>
                    <button 
                      onClick={() => handleExportData('quality_checks')}
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Quality Data
                    </button>
                    <button 
                      onClick={() => handleExportData('maintenance_tasks')}
                      className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Maintenance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render appropriate content based on active tab
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-cyan-600 text-4xl" />
        </div>
      );
    }

    switch (activeTab) {
      case 'overview': return <OverviewDashboard />;
      case 'water-points': return <WaterPointsManagement />;
      case 'maintenance': return <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800">Maintenance Tasks</h2><p className="text-gray-600 mt-4">Maintenance management system coming soon...</p></div>;
      case 'monitoring': return <RealTimeMonitoring />;
      case 'alerts': return <AlertsManagement />;
      case 'reports': return <ReportsManagement />;
      case 'settings': return <Settings />;
      default: return <OverviewDashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
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
                <p className="text-sm font-medium text-gray-800">{user?.full_name || 'User'}</p>
                <p className="text-xs text-gray-600">{user?.role || 'User'}</p>
              </div>
            )}
            {sidebarOpen && (
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
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
              <p className="text-gray-600">
                {user ? `Welcome back, ${user.full_name}` : 'Welcome to AquaSafi Dashboard'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                  <FaBell className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {dashboardData.alerts.filter(alert => alert.status === 'active').length}
                  </span>
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