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
  FaRecycle
} from 'react-icons/fa';

const RealTimeMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [alertsOnly, setAlertsOnly] = useState(false);

  // Simulated real-time data
  const [monitoringData, setMonitoringData] = useState({
    systemStatus: {
      totalSensors: 156,
      activeSensors: 148,
      alertSensors: 5,
      offlineSensors: 3,
      lastUpdate: new Date().toLocaleTimeString(),
      systemHealth: 94.8,
      networkLatency: 23,
      dataTransmission: 99.2
    },
    waterPoints: [
      {
        id: 'WP001',
        name: 'Garissa Main Borehole',
        location: 'Garissa Town',
        coordinates: { lat: -0.4569, lng: 39.6582 },
        sensors: {
          flow: { value: 45.2, unit: 'L/min', status: 'normal', lastUpdate: '2s ago' },
          temperature: { value: 24.5, unit: '°C', status: 'normal', lastUpdate: '1s ago' },
          ph: { value: 7.2, unit: 'pH', status: 'normal', lastUpdate: '3s ago' },
          pressure: { value: 2.8, unit: 'bar', status: 'normal', lastUpdate: '2s ago' },
          turbidity: { value: 2.1, unit: 'NTU', status: 'normal', lastUpdate: '1s ago' },
          chlorine: { value: 0.8, unit: 'ppm', status: 'normal', lastUpdate: '4s ago' }
        },
        connectivity: { signal: 95, status: 'excellent', protocol: '4G' },
        powerStatus: { battery: 87, charging: true, voltage: 12.4 }
      },
      {
        id: 'WP002',
        name: 'Dadaab Treatment Plant',
        location: 'Dadaab Complex',
        coordinates: { lat: -0.0566, lng: 40.3119 },
        sensors: {
          flow: { value: 0, unit: 'L/min', status: 'offline', lastUpdate: '15m ago' },
          temperature: { value: 26.1, unit: '°C', status: 'normal', lastUpdate: '1m ago' },
          ph: { value: 7.4, unit: 'pH', status: 'normal', lastUpdate: '2m ago' },
          pressure: { value: 0, unit: 'bar', status: 'offline', lastUpdate: '15m ago' },
          turbidity: { value: 1.8, unit: 'NTU', status: 'normal', lastUpdate: '1m ago' },
          chlorine: { value: 1.2, unit: 'ppm', status: 'normal', lastUpdate: '2m ago' }
        },
        connectivity: { signal: 78, status: 'good', protocol: '3G' },
        powerStatus: { battery: 45, charging: false, voltage: 11.8 }
      },
      {
        id: 'WP003',
        name: 'Sankuri Community Well',
        location: 'Sankuri Village',
        coordinates: { lat: -0.4234, lng: 39.7123 },
        sensors: {
          flow: { value: 12.8, unit: 'L/min', status: 'low', lastUpdate: '5s ago' },
          temperature: { value: 28.3, unit: '°C', status: 'high', lastUpdate: '3s ago' },
          ph: { value: 6.1, unit: 'pH', status: 'critical', lastUpdate: '2s ago' },
          pressure: { value: 1.2, unit: 'bar', status: 'low', lastUpdate: '4s ago' },
          turbidity: { value: 8.5, unit: 'NTU', status: 'critical', lastUpdate: '1s ago' },
          chlorine: { value: 0.3, unit: 'ppm', status: 'critical', lastUpdate: '6s ago' }
        },
        connectivity: { signal: 34, status: 'weak', protocol: '2G' },
        powerStatus: { battery: 12, charging: false, voltage: 10.9 }
      },
      {
        id: 'WP004',
        name: 'Ijara Distribution Hub',
        location: 'Ijara District',
        coordinates: { lat: -1.3267, lng: 40.5317 },
        sensors: {
          flow: { value: 62.7, unit: 'L/min', status: 'normal', lastUpdate: '1s ago' },
          temperature: { value: 25.2, unit: '°C', status: 'normal', lastUpdate: '2s ago' },
          ph: { value: 7.6, unit: 'pH', status: 'normal', lastUpdate: '1s ago' },
          pressure: { value: 3.2, unit: 'bar', status: 'normal', lastUpdate: '3s ago' },
          turbidity: { value: 1.2, unit: 'NTU', status: 'normal', lastUpdate: '2s ago' },
          chlorine: { value: 1.0, unit: 'ppm', status: 'normal', lastUpdate: '1s ago' }
        },
        connectivity: { signal: 89, status: 'excellent', protocol: '4G' },
        powerStatus: { battery: 92, charging: true, voltage: 12.6 }
      }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMonitoringData(prevData => ({
        ...prevData,
        systemStatus: {
          ...prevData.systemStatus,
          lastUpdate: new Date().toLocaleTimeString(),
          networkLatency: Math.floor(Math.random() * 50) + 10,
          dataTransmission: 95 + Math.random() * 5
        },
        waterPoints: prevData.waterPoints.map(point => ({
          ...point,
          sensors: {
            ...point.sensors,
            flow: {
              ...point.sensors.flow,
              value: point.sensors.flow.status !== 'offline' ? 
                Math.max(0, point.sensors.flow.value + (Math.random() - 0.5) * 2) : 0,
              lastUpdate: Math.floor(Math.random() * 10) + 1 + 's ago'
            },
            temperature: {
              ...point.sensors.temperature,
              value: point.sensors.temperature.value + (Math.random() - 0.5) * 0.5,
              lastUpdate: Math.floor(Math.random() * 10) + 1 + 's ago'
            }
          }
        }))
      }));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isMonitoring, refreshInterval]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
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
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FaCheckCircle className="text-green-600" />
            <span className="text-2xl font-bold text-green-800">{monitoringData.systemStatus.activeSensors}</span>
          </div>
          <p className="text-sm text-green-700">Active Sensors</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FaExclamationTriangle className="text-red-600" />
            <span className="text-2xl font-bold text-red-800">{monitoringData.systemStatus.alertSensors}</span>
          </div>
          <p className="text-sm text-red-700">Alert Sensors</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FaNetworkWired className="text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">{monitoringData.systemStatus.networkLatency}ms</span>
          </div>
          <p className="text-sm text-blue-700">Network Latency</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FaDatabase className="text-purple-600" />
            <span className="text-2xl font-bold text-purple-800">{monitoringData.systemStatus.dataTransmission.toFixed(1)}%</span>
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
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaIndustry className="text-blue-600" />
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
            <FaWifi className={getConnectivityColor(waterPoint.connectivity.status)} />
            <span className="text-xs text-gray-600">{waterPoint.connectivity.signal}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaBolt className={waterPoint.powerStatus.charging ? 'text-green-500' : 'text-gray-500'} />
            <span className="text-xs text-gray-600">{waterPoint.powerStatus.battery}%</span>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(waterPoint.sensors).map(([sensorType, sensor]) => (
          <div key={sensorType} className={`p-3 rounded-xl border ${getStatusColor(sensor.status)}`}>
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
                {sensor.value.toFixed(1)}
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
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
            <FaEye />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Configure">
            <FaCog />
          </button>
          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download Data">
            <FaDownload />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Health Score</p>
          <div className="flex items-center space-x-2">
            <div className="w-12 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ 
                  width: `${Math.max(0, Math.min(100, 
                    Object.values(waterPoint.sensors).filter(s => s.status === 'normal').length / 
                    Object.values(waterPoint.sensors).length * 100
                  ))}%` 
                }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(Object.values(waterPoint.sensors).filter(s => s.status === 'normal').length / 
                Object.values(waterPoint.sensors).length * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const filteredWaterPoints = alertsOnly ? 
    monitoringData.waterPoints.filter(point => 
      Object.values(point.sensors).some(sensor => 
        sensor.status === 'critical' || sensor.status === 'offline'
      )
    ) : 
    monitoringData.waterPoints;

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
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>1s</option>
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
            </select>
          </div>
          
          <button
            onClick={() => setAlertsOnly(!alertsOnly)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
              alertsOnly 
                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaExclamationTriangle className="mr-2" />
            {alertsOnly ? 'Show All' : 'Alerts Only'}
          </button>
          
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
              isMonitoring 
                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {isMonitoring ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
            {isMonitoring ? 'Pause' : 'Resume'}
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
            <FaDownload className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* System Status Overview */}
      <SystemStatusCard />

      {/* Water Points Monitoring Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Water Points Status</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
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
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
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
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Alerts Found</h3>
            <p className="text-gray-500">All systems are operating normally</p>
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

      {/* Real-time Charts Section */}
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
              <p className="text-sm">Implementation coming soon</p>
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
            {monitoringData.waterPoints.map((point, index) => (
              <div key={point.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getConnectivityColor(point.connectivity.status).replace('text-', 'bg-')}`} />
                  <span className="text-sm font-medium text-gray-800">{point.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{point.connectivity.signal}%</span>
                  <span className="text-xs text-gray-500">{point.connectivity.protocol}</span>
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