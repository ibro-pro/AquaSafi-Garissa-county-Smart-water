import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWater,
  FaChartLine,
  FaMapMarkerAlt,
  FaThermometerHalf,
  FaVial,
  FaBroadcastTower,
  FaWifi,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaSync,
  FaExpand,
  FaCompress,
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaFilter,
  FaSearch,
  FaBell,
  FaEye,
  FaCog,
  FaTachometerAlt,
  FaBolt,
  FaSnowflake,
  FaIndustry,
  FaNetworkWired,
  FaSatellite,
  FaMicrochip,
  FaServer,
  FaDatabase,
  FaCloud,
  FaRocket,
  FaAtom,
  FaFan,
  FaTemperatureHigh,
  FaLeaf,
  FaRecycle,
  FaUsers,
  FaTools,
  FaFlask,
  FaShieldAlt,
  FaHistory,
  FaFileExport
} from 'react-icons/fa';

const RealTimeMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [viewMode, setViewMode] = useState('grid');
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Real data state from backend endpoints
  const [monitoringData, setMonitoringData] = useState({
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
    dashboardStats: {},
    activeAlerts: [],
    systemHealth: {},
    notifications: []
  });

  // API Base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Get authentication token
  const getAuthToken = () => {
    return localStorage.getItem('access_token');
  };

  // API call function
  const fetchData = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      setError(`Failed to fetch data: ${error.message}`);
      throw error;
    }
  };

  // Fetch monitoring dashboard data
  const fetchDashboardData = async () => {
    try {
      const data = await fetchData('/monitoring/dashboard');
      return data;
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      return null;
    }
  };

  // Fetch water points status
  const fetchWaterPointsStatus = async () => {
    try {
      const data = await fetchData('/monitoring/water-points/status');
      return data.water_points || [];
    } catch (error) {
      console.error('Failed to fetch water points status:', error);
      return [];
    }
  };

  // Fetch active alerts
  const fetchActiveAlerts = async () => {
    try {
      const data = await fetchData('/monitoring/alerts/active');
      return data.alerts || [];
    } catch (error) {
      console.error('Failed to fetch active alerts:', error);
      return [];
    }
  };

  // Fetch system health
  const fetchSystemHealth = async () => {
    try {
      const data = await fetchData('/monitoring/system-health');
      return data;
    } catch (error) {
      console.error('Failed to fetch system health:', error);
      return {};
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const data = await fetchData('/monitoring/notifications');
      return data.notifications || [];
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    }
  };

  // Fetch all monitoring data
  const fetchAllMonitoringData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        dashboardData,
        waterPointsData,
        alertsData,
        healthData,
        notificationsData
      ] = await Promise.all([
        fetchDashboardData(),
        fetchWaterPointsStatus(),
        fetchActiveAlerts(),
        fetchSystemHealth(),
        fetchNotifications()
      ]);

      // Transform data for frontend
      const transformedData = {
        systemStatus: {
          totalSensors: dashboardData?.system_status?.total_water_points * 6 || 0, // 6 sensors per water point
          activeSensors: dashboardData?.system_status?.active_water_points * 6 || 0,
          alertSensors: dashboardData?.alerts_summary?.total || 0,
          offlineSensors: dashboardData?.system_status?.offline_water_points * 6 || 0,
          lastUpdate: new Date().toLocaleTimeString(),
          systemHealth: dashboardData?.system_status?.system_health || 0,
          networkLatency: dashboardData?.system_status?.network_latency || 0,
          dataTransmission: dashboardData?.system_status?.data_transmission || 0
        },
        waterPoints: waterPointsData.map(wp => ({
          id: wp.id,
          name: wp.name,
          location: wp.location,
          coordinates: { lat: 0, lng: 0 }, // You might want to get this from your backend
          sensors: wp.sensors || {},
          connectivity: wp.connectivity || { signal: 0, status: 'offline', protocol: 'N/A' },
          powerStatus: wp.power_status || { battery: 0, charging: false, voltage: 0 },
          overallStatus: wp.overall_status || 'offline'
        })),
        dashboardStats: dashboardData,
        activeAlerts: alertsData,
        systemHealth: healthData,
        notifications: notificationsData
      };

      setMonitoringData(transformedData);
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
      setError('Failed to load monitoring data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Acknowledge alert
  const acknowledgeAlert = async (alertId) => {
    try {
      await fetchData(`/alerts/${alertId}/acknowledge`, {
        method: 'POST'
      });
      // Refresh alerts after acknowledgment
      fetchAllMonitoringData();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
      setError('Failed to acknowledge alert');
    }
  };

  // Resolve alert
  const resolveAlert = async (alertId) => {
    try {
      await fetchData(`/alerts/${alertId}/resolve`, {
        method: 'POST'
      });
      // Refresh alerts after resolution
      fetchAllMonitoringData();
    } catch (error) {
      console.error('Failed to resolve alert:', error);
      setError('Failed to resolve alert');
    }
  };

  // Export data
  const exportData = async (resourceType) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/export/${resourceType}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${resourceType}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export data');
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    fetchAllMonitoringData();

    if (!isMonitoring) return;

    const interval = setInterval(() => {
      fetchAllMonitoringData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isMonitoring, refreshInterval]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100 border-green-200';
      case 'offline': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'low': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
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
            <p className="text-sm text-gray-600">Last updated: {monitoringData.systemStatus.lastUpdate}</p>
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
            <span className="text-2xl font-bold text-green-800">{monitoringData.systemStatus.activeSensors}</span>
          </div>
          <p className="text-sm text-green-700">Active Sensors</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <FaExclamationTriangle className="text-red-600" />
            <span className="text-2xl font-bold text-red-800">{monitoringData.systemStatus.alertSensors}</span>
          </div>
          <p className="text-sm text-red-700">Alert Sensors</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <FaNetworkWired className="text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">{monitoringData.systemStatus.networkLatency}ms</span>
          </div>
          <p className="text-sm text-blue-700">Network Latency</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <FaDatabase className="text-purple-600" />
            <span className="text-2xl font-bold text-purple-800">{monitoringData.systemStatus.dataTransmission.toFixed(1)}%</span>
          </div>
          <p className="text-sm text-purple-700">Data Transmission</p>
        </div>
      </div>

      {/* System Health Overview */}
      {monitoringData.systemHealth.overall_health && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">System Health</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(monitoringData.systemHealth.components || {}).map(([component, data]) => (
              <div key={component} className="text-center">
                <div className="text-2xl font-bold text-gray-800">{data.score}</div>
                <div className="text-sm text-gray-600 capitalize">{component}</div>
                <div className={`text-xs mt-1 ${
                  data.status === 'excellent' ? 'text-green-600' :
                  data.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                }`}>
                  {data.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
            waterPoint.overallStatus === 'critical' ? 'bg-red-100' :
            waterPoint.overallStatus === 'warning' ? 'bg-yellow-100' :
            waterPoint.overallStatus === 'offline' ? 'bg-gray-100' : 'bg-green-100'
          }`}>
            <FaIndustry className={
              waterPoint.overallStatus === 'critical' ? 'text-red-600' :
              waterPoint.overallStatus === 'warning' ? 'text-yellow-600' :
              waterPoint.overallStatus === 'offline' ? 'text-gray-600' : 'text-green-600'
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
            <FaBolt className={waterPoint.powerStatus?.charging ? 'text-green-500' : 'text-gray-500'} />
            <span className="text-xs text-gray-600">{waterPoint.powerStatus?.battery}%</span>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(waterPoint.sensors).map(([sensorType, sensor]) => (
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
            <p className="text-xs text-gray-500 mt-1">{sensor.lastUpdate}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
            title="View Details"
            onClick={() => window.open(`/water-points/${waterPoint.id}`, '_blank')}
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
            onClick={() => exportData('water_points')}
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
                  waterPoint.overallStatus === 'critical' ? 'bg-red-500' :
                  waterPoint.overallStatus === 'warning' ? 'bg-yellow-500' :
                  waterPoint.overallStatus === 'offline' ? 'bg-gray-500' : 'bg-green-500'
                }`}
                style={{ 
                  width: `${Math.max(0, Math.min(100, 
                    Object.values(waterPoint.sensors).filter(s => s.status === 'normal').length / 
                    Math.max(Object.values(waterPoint.sensors).length, 1) * 100
                  ))}%` 
                }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(Object.values(waterPoint.sensors).filter(s => s.status === 'normal').length / 
                Math.max(Object.values(waterPoint.sensors).length, 1) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const AlertCard = ({ alert, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-lg border-l-4 ${
        alert.priority === 'critical' ? 'border-red-500 bg-red-50' :
        alert.priority === 'high' ? 'border-orange-500 bg-orange-50' :
        alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
        'border-blue-500 bg-blue-50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`} />
            <span className="text-sm font-medium text-gray-800">{alert.title}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              alert.priority === 'critical' ? 'bg-red-200 text-red-800' :
              alert.priority === 'high' ? 'bg-orange-200 text-orange-800' :
              alert.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
              'bg-blue-200 text-blue-800'
            }`}>
              {alert.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{alert.water_point_name}</span>
            <span>{new Date(alert.timestamp).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => acknowledgeAlert(alert.id)}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Acknowledge
          </button>
          <button
            onClick={() => resolveAlert(alert.id)}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Resolve
          </button>
        </div>
      </div>
    </motion.div>
  );

  const NotificationCard = ({ notification, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-3 rounded-lg border ${
        notification.priority === 'critical' ? 'border-red-200 bg-red-50' :
        notification.priority === 'warning' ? 'border-yellow-200 bg-yellow-50' :
        'border-blue-200 bg-blue-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${
          notification.type === 'alert' ? 'bg-red-100 text-red-600' :
          notification.type === 'maintenance' ? 'bg-green-100 text-green-600' :
          'bg-yellow-100 text-yellow-600'
        }`}>
          {notification.type === 'alert' ? <FaExclamationTriangle /> :
           notification.type === 'maintenance' ? <FaTools /> : <FaFlask />}
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-medium text-gray-800">{notification.title}</h5>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
        </div>
        {notification.action_required && (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Action Required
          </span>
        )}
      </div>
    </motion.div>
  );

  const filteredWaterPoints = alertsOnly ? 
    monitoringData.waterPoints.filter(point => 
      point.overallStatus === 'critical' || point.overallStatus === 'warning'
    ) : 
    monitoringData.waterPoints;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
            onClick={() => exportData('water_points')}
          >
            <FaFileExport className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* System Status Overview */}
      <SystemStatusCard />

      {/* Active Alerts Section */}
      {monitoringData.activeAlerts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-600" />
              Active Alerts ({monitoringData.activeAlerts.length})
            </h3>
          </div>
          <div className="space-y-3">
            {monitoringData.activeAlerts.slice(0, 5).map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </div>
        </div>
      )}

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

      {/* Notifications Section */}
      {monitoringData.notifications.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaBell className="mr-2 text-blue-600" />
              Recent Notifications
            </h3>
            <span className="text-sm text-gray-500">
              {monitoringData.notifications.length} notifications
            </span>
          </div>
          <div className="space-y-3">
            {monitoringData.notifications.slice(0, 10).map((notification, index) => (
              <NotificationCard key={notification.id} notification={notification} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* System Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">System Performance</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FaChartLine className="mx-auto text-4xl mb-2" />
              <p>Real-time performance chart</p>
              <p className="text-sm">Connected to backend API</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Network Status</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <FaExpand />
            </button>
          </div>
          <div className="space-y-4">
            {monitoringData.waterPoints.slice(0, 5).map((point) => (
              <div key={point.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getConnectivityColor(point.connectivity?.status).replace('text-', 'bg-')}`} />
                  <span className="text-sm font-medium text-gray-800">{point.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{point.connectivity?.signal}%</span>
                  <span className="text-xs text-gray-500">{point.connectivity?.protocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;