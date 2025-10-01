import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWater,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTools,
  FaChartLine,
  FaThermometerHalf,
  FaVial,
  FaWifi,
  FaBell,
  FaSync,
  FaPrint,
  FaExport,
  FaImport,
  FaCalendarAlt,
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCog,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaBroadcastTower,
  FaSatellite,
  FaMicrochip,
  FaBolt,
  FaLeaf,
  FaIndustry
} from 'react-icons/fa';

const WaterInfrastructure = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedWaterPoint, setSelectedWaterPoint] = useState(null);

  // Mock water infrastructure data
  const [waterPoints] = useState([
    {
      id: 'WP001',
      name: 'Garissa Main Borehole',
      type: 'Borehole',
      location: {
        region: 'Garissa Town',
        coordinates: { lat: -0.4569, lng: 39.6582 },
        address: 'Garissa Town Center, Main Street'
      },
      status: 'active',
      capacity: 5000,
      currentFlow: 45.2,
      waterQuality: {
        ph: 7.2,
        temperature: 24.5,
        turbidity: 2.1,
        chlorine: 0.8,
        tds: 450,
        grade: 'excellent'
      },
      equipment: {
        pump: { model: 'Grundfos SP 30-2', status: 'operational', lastMaintenance: '2024-08-15' },
        generator: { model: 'Caterpillar C9', status: 'operational', fuelLevel: 85 },
        sensors: { temperature: 'online', flow: 'online', quality: 'online' },
        connectivity: 'online'
      },
      technician: {
        name: 'Ahmed Hassan',
        phone: '+254712345678',
        email: 'ahmed.hassan@aquasafi.ke'
      },
      lastInspection: '2024-09-25',
      nextMaintenance: '2024-10-15',
      commissionDate: '2023-03-15',
      servingPopulation: 2500,
      dailyUsage: 3200,
      monthlyRevenue: 145000,
      alerts: []
    },
    {
      id: 'WP002',
      name: 'Dadaab Treatment Plant',
      type: 'Treatment Plant',
      location: {
        region: 'Dadaab Complex',
        coordinates: { lat: -0.0566, lng: 40.3119 },
        address: 'Dadaab Refugee Complex, Section A'
      },
      status: 'maintenance',
      capacity: 15000,
      currentFlow: 0,
      waterQuality: {
        ph: 7.4,
        temperature: 26.1,
        turbidity: 1.8,
        chlorine: 1.2,
        tds: 420,
        grade: 'good'
      },
      equipment: {
        pump: { model: 'Grundfos CR 64-3', status: 'maintenance', lastMaintenance: '2024-09-28' },
        generator: { model: 'Perkins 1104D', status: 'operational', fuelLevel: 92 },
        sensors: { temperature: 'online', flow: 'offline', quality: 'online' },
        connectivity: 'online'
      },
      technician: {
        name: 'Sarah Mwangi',
        phone: '+254798765432',
        email: 'sarah.mwangi@aquasafi.ke'
      },
      lastInspection: '2024-09-28',
      nextMaintenance: '2024-10-01',
      commissionDate: '2022-11-20',
      servingPopulation: 8500,
      dailyUsage: 0,
      monthlyRevenue: 0,
      alerts: [
        { type: 'maintenance', message: 'Pump replacement scheduled for tomorrow', priority: 'high' }
      ]
    },
    {
      id: 'WP003',
      name: 'Sankuri Community Well',
      type: 'Community Well',
      location: {
        region: 'Sankuri',
        coordinates: { lat: -0.4234, lng: 39.7123 },
        address: 'Sankuri Village, Community Center'
      },
      status: 'alert',
      capacity: 2000,
      currentFlow: 12.8,
      waterQuality: {
        ph: 6.1,
        temperature: 28.3,
        turbidity: 8.5,
        chlorine: 0.3,
        tds: 680,
        grade: 'poor'
      },
      equipment: {
        pump: { model: 'Pedrollo 4SR', status: 'operational', lastMaintenance: '2024-07-20' },
        generator: { model: 'Honda EU22i', status: 'low_fuel', fuelLevel: 15 },
        sensors: { temperature: 'online', flow: 'online', quality: 'alert' },
        connectivity: 'weak'
      },
      technician: {
        name: 'Mohamed Ali',
        phone: '+254723456789',
        email: 'mohamed.ali@aquasafi.ke'
      },
      lastInspection: '2024-09-20',
      nextMaintenance: '2024-10-20',
      commissionDate: '2023-08-10',
      servingPopulation: 1200,
      dailyUsage: 980,
      monthlyRevenue: 67000,
      alerts: [
        { type: 'critical', message: 'Water quality below standards - immediate action required', priority: 'critical' },
        { type: 'warning', message: 'Generator fuel level low', priority: 'medium' }
      ]
    },
    {
      id: 'WP004',
      name: 'Ijara Distribution Hub',
      type: 'Distribution Hub',
      location: {
        region: 'Ijara District',
        coordinates: { lat: -1.3267, lng: 40.5317 },
        address: 'Ijara Township, Industrial Area'
      },
      status: 'active',
      capacity: 8000,
      currentFlow: 62.7,
      waterQuality: {
        ph: 7.6,
        temperature: 25.2,
        turbidity: 1.2,
        chlorine: 1.0,
        tds: 380,
        grade: 'excellent'
      },
      equipment: {
        pump: { model: 'Wilo Helix V 5203', status: 'operational', lastMaintenance: '2024-08-30' },
        generator: { model: 'Cummins QSB7', status: 'operational', fuelLevel: 78 },
        sensors: { temperature: 'online', flow: 'online', quality: 'online' },
        connectivity: 'online'
      },
      technician: {
        name: 'Grace Kiprotich',
        phone: '+254734567890',
        email: 'grace.kiprotich@aquasafi.ke'
      },
      lastInspection: '2024-09-22',
      nextMaintenance: '2024-11-30',
      commissionDate: '2023-01-25',
      servingPopulation: 4200,
      dailyUsage: 5100,
      monthlyRevenue: 234000,
      alerts: []
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQualityColor = (grade) => {
    switch (grade) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Borehole': return <FaWater className="text-blue-600" />;
      case 'Treatment Plant': return <FaIndustry className="text-purple-600" />;
      case 'Community Well': return <FaWater className="text-green-600" />;
      case 'Distribution Hub': return <FaNetworkWired className="text-orange-600" />;
      default: return <FaWater className="text-gray-600" />;
    }
  };

  const filteredWaterPoints = waterPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || point.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || point.location.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const WaterPointCard = ({ waterPoint }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gray-100 rounded-xl">
            {getTypeIcon(waterPoint.type)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{waterPoint.name}</h3>
            <p className="text-sm text-gray-600">{waterPoint.id} • {waterPoint.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(waterPoint.status)}`}>
            {waterPoint.status}
          </span>
          {waterPoint.alerts.length > 0 && (
            <div className="flex items-center space-x-1">
              <FaBell className="text-red-500 text-sm" />
              <span className="text-xs text-red-500 font-medium">{waterPoint.alerts.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 mb-4">
        <FaMapMarkerAlt className="text-gray-400" />
        <span className="text-sm text-gray-600">{waterPoint.location.region}</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-sm text-gray-600">{waterPoint.servingPopulation.toLocaleString()} people</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Flow Rate</span>
            <FaWater className="text-blue-500" />
          </div>
          <p className="text-lg font-bold text-blue-800">{waterPoint.currentFlow} L/min</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Quality</span>
            <FaVial className="text-green-500" />
          </div>
          <p className={`text-lg font-bold capitalize ${getQualityColor(waterPoint.waterQuality.grade)}`}>
            {waterPoint.waterQuality.grade}
          </p>
        </div>
      </div>

      {/* Equipment Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              waterPoint.equipment.pump.status === 'operational' ? 'bg-green-500' :
              waterPoint.equipment.pump.status === 'maintenance' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <span className="text-xs text-gray-600">Pump</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              waterPoint.equipment.connectivity === 'online' ? 'bg-green-500' :
              waterPoint.equipment.connectivity === 'weak' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <span className="text-xs text-gray-600">Connectivity</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Next Maintenance</p>
          <p className="text-sm font-medium text-gray-700">{waterPoint.nextMaintenance}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedWaterPoint(waterPoint);
              setShowDetailsModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <FaEye />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
            <FaEdit />
          </button>
          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Maintenance">
            <FaTools />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Monthly Revenue</p>
          <p className="text-sm font-bold text-green-600">₦{waterPoint.monthlyRevenue.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );

  const WaterPointDetailsModal = () => (
    <AnimatePresence>
      {showDetailsModal && selectedWaterPoint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    {getTypeIcon(selectedWaterPoint.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedWaterPoint.name}</h2>
                    <p className="text-gray-600">{selectedWaterPoint.id} • {selectedWaterPoint.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Status & Operations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedWaterPoint.status)}`}>
                        {selectedWaterPoint.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Flow Rate</span>
                      <span className="font-medium">{selectedWaterPoint.currentFlow} L/min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium">{selectedWaterPoint.capacity.toLocaleString()} L</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Daily Usage</span>
                      <span className="font-medium">{selectedWaterPoint.dailyUsage.toLocaleString()} L</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Water Quality</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Overall Grade</span>
                      <span className={`font-bold capitalize ${getQualityColor(selectedWaterPoint.waterQuality.grade)}`}>
                        {selectedWaterPoint.waterQuality.grade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">pH Level</span>
                      <span className="font-medium">{selectedWaterPoint.waterQuality.ph}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Temperature</span>
                      <span className="font-medium">{selectedWaterPoint.waterQuality.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">TDS</span>
                      <span className="font-medium">{selectedWaterPoint.waterQuality.tds} ppm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Pump System</span>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedWaterPoint.equipment.pump.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-600">{selectedWaterPoint.equipment.pump.model}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last Maintenance: {selectedWaterPoint.equipment.pump.lastMaintenance}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Generator</span>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedWaterPoint.equipment.generator.fuelLevel > 50 ? 'bg-green-500' :
                        selectedWaterPoint.equipment.generator.fuelLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-600">{selectedWaterPoint.equipment.generator.model}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Fuel Level: {selectedWaterPoint.equipment.generator.fuelLevel}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {selectedWaterPoint.alerts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Alerts</h3>
                  <div className="space-y-3">
                    {selectedWaterPoint.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-xl border-l-4 ${
                        alert.priority === 'critical' ? 'bg-red-50 border-red-500' :
                        alert.priority === 'high' ? 'bg-orange-50 border-orange-500' :
                        'bg-yellow-50 border-yellow-500'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <FaExclamationTriangle className={
                            alert.priority === 'critical' ? 'text-red-600' :
                            alert.priority === 'high' ? 'text-orange-600' :
                            'text-yellow-600'
                          } />
                          <span className="font-medium text-gray-800">{alert.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technician Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Technician</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{selectedWaterPoint.technician.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaPhoneAlt className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600">{selectedWaterPoint.technician.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaEnvelope className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600">{selectedWaterPoint.technician.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Schedule Maintenance
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Details
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaWater className="mr-3 text-blue-600" />
            Water Infrastructure Management
          </h2>
          <p className="text-gray-600 mt-1">Monitor and manage all water points across the system</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Water Point
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Water Points</p>
              <p className="text-3xl font-bold text-gray-800">{waterPoints.length}</p>
            </div>
            <FaWater className="text-3xl text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Points</p>
              <p className="text-3xl font-bold text-gray-800">
                {waterPoints.filter(p => p.status === 'active').length}
              </p>
            </div>
            <FaCheckCircle className="text-3xl text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Under Maintenance</p>
              <p className="text-3xl font-bold text-gray-800">
                {waterPoints.filter(p => p.status === 'maintenance').length}
              </p>
            </div>
            <FaTools className="text-3xl text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Critical Alerts</p>
              <p className="text-3xl font-bold text-gray-800">
                {waterPoints.reduce((sum, p) => sum + p.alerts.filter(a => a.priority === 'critical').length, 0)}
              </p>
            </div>
            <FaExclamationTriangle className="text-3xl text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search water points..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="alert">Alert</option>
              <option value="offline">Offline</option>
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="Garissa Town">Garissa Town</option>
              <option value="Dadaab Complex">Dadaab Complex</option>
              <option value="Ijara District">Ijara District</option>
              <option value="Sankuri">Sankuri</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center">
              <FaFilter className="mr-2" />
              More Filters
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <FaSync />
            </button>
          </div>
        </div>
      </div>

      {/* Water Points Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWaterPoints.map((waterPoint) => (
          <WaterPointCard key={waterPoint.id} waterPoint={waterPoint} />
        ))}
      </div>

      {filteredWaterPoints.length === 0 && (
        <div className="text-center py-12">
          <FaWater className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No water points found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Details Modal */}
      <WaterPointDetailsModal />
    </div>
  );
};

export default WaterInfrastructure;