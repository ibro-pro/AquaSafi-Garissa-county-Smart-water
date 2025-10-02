import React, { useState, useEffect } from 'react';
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
  FaIndustry,
  FaSave,
  FaTimes
} from 'react-icons/fa';

// API base URL - adjust according to your backend
const API_BASE_URL = 'http://localhost:5000/api';

const WaterInfrastructure = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedWaterPoint, setSelectedWaterPoint] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [waterPoints, setWaterPoints] = useState([]);
  const [error, setError] = useState(null);

  // Form state for adding new water point
  const [newWaterPoint, setNewWaterPoint] = useState({
    name: '',
    type: 'Borehole',
    region: '',
    location: '',
    latitude: '',
    longitude: '',
    capacity: '',
    current_level: 0,
    quality_score: 0,
    coverage: 0,
    population_served: '',
    water_source: 'Groundwater',
    infrastructure_type: 'Public',
    treatment_method: 'Chlorination',
    status: 'active',
    notes: ''
  });

  // Fetch water points from backend
  const fetchWaterPoints = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch water points');
      }

      const data = await response.json();
      setWaterPoints(data.water_points || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching water points:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch detailed water point data
  const fetchWaterPointDetails = async (waterPointId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points/${waterPointId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch water point details');
      }

      const data = await response.json();
      return data.water_point;
    } catch (err) {
      console.error('Error fetching water point details:', err);
      throw err;
    }
  };

  // Create new water point
  const createWaterPoint = async (waterPointData) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(waterPointData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create water point');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error creating water point:', err);
      throw err;
    }
  };

  // Update water point
  const updateWaterPoint = async (waterPointId, updateData) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points/${waterPointId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update water point');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error updating water point:', err);
      throw err;
    }
  };

  // Delete water point
  const deleteWaterPoint = async (waterPointId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points/${waterPointId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete water point');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error deleting water point:', err);
      throw err;
    }
  };

  // Archive water point
  const archiveWaterPoint = async (waterPointId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/admin/water-points/${waterPointId}/archive`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to archive water point');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error archiving water point:', err);
      throw err;
    }
  };

  // Export data
  const exportData = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/export/water_points`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `water_points_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting data:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Load water points on component mount
  useEffect(() => {
    fetchWaterPoints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWaterPoint(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleAddWaterPoint = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for API
      const waterPointData = {
        name: newWaterPoint.name,
        type: newWaterPoint.type,
        region: newWaterPoint.region,
        location: newWaterPoint.location,
        latitude: newWaterPoint.latitude !== '' ? parseFloat(newWaterPoint.latitude) : null,
        longitude: newWaterPoint.longitude !== '' ? parseFloat(newWaterPoint.longitude) : null,
        capacity: newWaterPoint.capacity !== '' ? parseInt(newWaterPoint.capacity) : null,
        current_level: newWaterPoint.current_level !== '' ? parseInt(newWaterPoint.current_level) : 0,
        quality_score: newWaterPoint.quality_score !== '' ? parseInt(newWaterPoint.quality_score) : 0,
        coverage: newWaterPoint.coverage !== '' ? parseInt(newWaterPoint.coverage) : 0,
        population_served: newWaterPoint.population_served !== '' ? parseInt(newWaterPoint.population_served) : null,
        water_source: newWaterPoint.water_source,
        infrastructure_type: newWaterPoint.infrastructure_type,
        treatment_method: newWaterPoint.treatment_method,
        status: newWaterPoint.status,
        notes: newWaterPoint.notes
      };

      await createWaterPoint(waterPointData);
      
      // Refresh the water points list
      await fetchWaterPoints();
      
      // Reset form and close modal
      setNewWaterPoint({
        name: '',
        type: 'Borehole',
        region: '',
        location: '',
        latitude: '',
        longitude: '',
        capacity: '',
        current_level: 0,
        quality_score: 0,
        coverage: 0,
        population_served: '',
        water_source: 'Groundwater',
        infrastructure_type: 'Public',
        treatment_method: 'Chlorination',
        status: 'active',
        notes: ''
      });
      
      setShowAddModal(false);
    } catch (err) {
      alert(`Error creating water point: ${err.message}`);
    }
  };

  // Handle view details
  const handleViewDetails = async (waterPoint) => {
    try {
      const detailedData = await fetchWaterPointDetails(waterPoint.id);
      setSelectedWaterPoint(detailedData);
      setShowDetailsModal(true);
    } catch (err) {
      alert(`Error fetching details: ${err.message}`);
    }
  };

  // Handle delete water point
  const handleDeleteWaterPoint = async (waterPointId, waterPointName) => {
    if (window.confirm(`Are you sure you want to delete "${waterPointName}"?`)) {
      try {
        await deleteWaterPoint(waterPointId);
        await fetchWaterPoints(); // Refresh the list
        alert('Water point deleted successfully');
      } catch (err) {
        alert(`Error deleting water point: ${err.message}`);
      }
    }
  };

  // Handle archive water point
  const handleArchiveWaterPoint = async (waterPointId, waterPointName) => {
    if (window.confirm(`Are you sure you want to archive "${waterPointName}"?`)) {
      try {
        await archiveWaterPoint(waterPointId);
        await fetchWaterPoints(); // Refresh the list
        alert('Water point archived successfully');
      } catch (err) {
        alert(`Error archiving water point: ${err.message}`);
      }
    }
  };

  const filteredWaterPoints = waterPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.id.toString().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || point.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || point.region === regionFilter;
    
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
            <p className="text-sm text-gray-600">ID: {waterPoint.id} • {waterPoint.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(waterPoint.status)}`}>
            {waterPoint.status}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 mb-4">
        <FaMapMarkerAlt className="text-gray-400" />
        <span className="text-sm text-gray-600">{waterPoint.region}</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-sm text-gray-600">{waterPoint.population_served?.toLocaleString()} people</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Capacity</span>
            <FaWater className="text-blue-500" />
          </div>
          <p className="text-lg font-bold text-blue-800">{waterPoint.capacity?.toLocaleString()} L</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Quality Score</span>
            <FaVial className="text-green-500" />
          </div>
          <p className="text-lg font-bold text-green-800">{waterPoint.quality_score}%</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              waterPoint.status === 'active' ? 'bg-green-500' :
              waterPoint.status === 'maintenance' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <span className="text-xs text-gray-600">{waterPoint.status}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-gray-400 text-xs" />
            <span className="text-xs text-gray-600">{waterPoint.coverage}% coverage</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Current Level</p>
          <p className="text-sm font-medium text-gray-700">{waterPoint.current_level}%</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewDetails(waterPoint)}
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
          <button 
            onClick={() => handleArchiveWaterPoint(waterPoint.id, waterPoint.name)}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" 
            title="Archive"
          >
            <FaTimes />
          </button>
          <button 
            onClick={() => handleDeleteWaterPoint(waterPoint.id, waterPoint.name)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Water Source</p>
          <p className="text-sm font-medium text-gray-700">{waterPoint.water_source}</p>
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
                    <p className="text-gray-600">ID: {selectedWaterPoint.id} • {selectedWaterPoint.type}</p>
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
              {/* Status and Operations */}
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
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium">{selectedWaterPoint.capacity?.toLocaleString()} L</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Level</span>
                      <span className="font-medium">{selectedWaterPoint.current_level}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Coverage</span>
                      <span className="font-medium">{selectedWaterPoint.coverage}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Location & Service</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Region</span>
                      <span className="font-medium">{selectedWaterPoint.region}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{selectedWaterPoint.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Population Served</span>
                      <span className="font-medium">{selectedWaterPoint.population_served?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Quality Score</span>
                      <span className="font-medium">{selectedWaterPoint.quality_score}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Water Source</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedWaterPoint.water_source}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Infrastructure Type</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedWaterPoint.infrastructure_type}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Treatment Method</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedWaterPoint.treatment_method}</p>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              {(selectedWaterPoint.latitude || selectedWaterPoint.longitude) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Coordinates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-medium text-gray-800">Latitude</span>
                      <p className="text-sm text-gray-600 mt-1">{selectedWaterPoint.latitude}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-medium text-gray-800">Longitude</span>
                      <p className="text-sm text-gray-600 mt-1">{selectedWaterPoint.longitude}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedWaterPoint.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600">{selectedWaterPoint.notes}</p>
                  </div>
                </div>
              )}
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

  const AddWaterPointModal = () => (
    <AnimatePresence>
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          // Removed backdropFilter to prevent blinking
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            // Removed onClick handler to prevent interference
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaPlus className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Add New Water Point</h2>
                    <p className="text-gray-600">Create a new water infrastructure point</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleAddWaterPoint} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Water Point Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newWaterPoint.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter water point name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={newWaterPoint.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Borehole">Borehole</option>
                      <option value="Treatment Plant">Treatment Plant</option>
                      <option value="Community Well">Community Well</option>
                      <option value="Distribution Hub">Distribution Hub</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Region *
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={newWaterPoint.region}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter region"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Address *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newWaterPoint.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Technical Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity (Liters) *
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={newWaterPoint.capacity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter capacity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Population Served *
                    </label>
                    <input
                      type="number"
                      name="population_served"
                      value={newWaterPoint.population_served}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter population served"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={newWaterPoint.latitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Latitude"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={newWaterPoint.longitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Longitude"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={newWaterPoint.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="alert">Alert</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Water Source
                    </label>
                    <select
                      name="water_source"
                      value={newWaterPoint.water_source}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Groundwater">Groundwater</option>
                      <option value="Surface Water">Surface Water</option>
                      <option value="Rainwater">Rainwater</option>
                      <option value="Mixed">Mixed Sources</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Infrastructure Type
                    </label>
                    <select
                      name="infrastructure_type"
                      value={newWaterPoint.infrastructure_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Public">Public</option>
                      <option value="Community">Community</option>
                      <option value="Private">Private</option>
                      <option value="Institutional">Institutional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Method
                    </label>
                    <select
                      name="treatment_method"
                      value={newWaterPoint.treatment_method}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Chlorination">Chlorination</option>
                      <option value="Filtration">Filtration</option>
                      <option value="UV Treatment">UV Treatment</option>
                      <option value="Boiling">Boiling</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newWaterPoint.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaSave className="mr-2" />
                  Add Water Point
                </button>
              </div>
            </form>
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
          <button 
            onClick={exportData}
            disabled={isExporting}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="mr-2" />
            {isExporting ? 'Exporting...' : 'Export Data'}
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

      {/* Modals */}
      <WaterPointDetailsModal />
      <AddWaterPointModal />
    </div>
  );
};

export default WaterInfrastructure;