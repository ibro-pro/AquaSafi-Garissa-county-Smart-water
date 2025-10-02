import React, { useState, useEffect } from 'react';
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
  FaThumbsUp,
  FaFlask,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSync
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    systemStats: {
      totalWaterPoints: 0,
      activePoints: 0,
      maintenancePoints: 0,
      offlinePoints: 0,
      totalUsers: 0,
      activeUsers: 0,
      administrativeStaff: 0,
      fieldTechnicians: 0,
      monthlyRevenue: 0,
      operationalCosts: 0,
      systemEfficiency: 0,
      customerSatisfaction: 0,
      alertsToday: 0,
      reportsProcessed: 0,
      maintenanceCompleted: 0,
      newRegistrations: 0
    },
    regionalData: [],
    recentActivities: [],
    systemAlerts: []
  });

  // API Base URL
  const API_BASE = 'http://localhost:5000/api/admin';

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
      badge: adminData.systemStats.totalWaterPoints?.toString() || '412',
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
      badge: adminData.systemStats.totalUsers ? `${(adminData.systemStats.totalUsers / 1000).toFixed(1)}K` : '15.4K',
      category: 'management'
    },
    { 
      id: 'staff-management', 
      label: 'Staff Management', 
      icon: FaUsers, 
      badge: (adminData.systemStats.administrativeStaff + adminData.systemStats.fieldTechnicians)?.toString() || '123',
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
      badge: adminData.systemStats.maintenancePoints?.toString() || '23',
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
      badge: adminData.systemStats.alertsToday?.toString() || '3',
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

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        switch (activeTab) {
          case 'overview':
            await fetchOverviewData(token);
            break;
          case 'water-infrastructure':
            await fetchWaterInfrastructure(token);
            break;
          case 'real-time-monitoring':
            await fetchRealTimeMonitoring(token);
            break;
          case 'user-management':
            await fetchUserManagement(token);
            break;
          case 'financial-management':
            await fetchFinancialManagement(token);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // API Functions
  const fetchOverviewData = async (token) => {
    try {
      const [overviewRes, regionalRes, activitiesRes, alertsRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/overview`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/dashboard/regional-data`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/dashboard/recent-activities`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/dashboard/system-alerts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (overviewRes.ok && regionalRes.ok && activitiesRes.ok && alertsRes.ok) {
        const [overviewData, regionalData, activitiesData, alertsData] = await Promise.all([
          overviewRes.json(),
          regionalRes.json(),
          activitiesRes.json(),
          alertsRes.json()
        ]);

        setAdminData(prev => ({
          ...prev,
          systemStats: overviewData.systemStats,
          regionalData: regionalData,
          recentActivities: activitiesData,
          systemAlerts: alertsData
        }));
      }
    } catch (error) {
      console.error('Error fetching overview data:', error);
    }
  };

  const fetchWaterInfrastructure = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/water-infrastructure`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle water infrastructure data
        console.log('Water infrastructure:', data);
      }
    } catch (error) {
      console.error('Error fetching water infrastructure:', error);
    }
  };

  const fetchRealTimeMonitoring = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/real-time-monitoring`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle real-time monitoring data
        console.log('Real-time monitoring:', data);
      }
    } catch (error) {
      console.error('Error fetching real-time monitoring:', error);
    }
  };

  const fetchUserManagement = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/user-management`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle user management data
        console.log('User management:', data);
      }
    } catch (error) {
      console.error('Error fetching user management:', error);
    }
  };

  const fetchFinancialManagement = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/financial/overview`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle financial data
        console.log('Financial overview:', data);
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  // API Functions for Actions
  const generateReport = async (reportType, periodStart, periodEnd) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: reportType,
          period_start: periodStart,
          period_end: periodEnd
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Report generation started!');
        return data;
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const updateSystemSettings = async (settings) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/system/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Settings updated successfully!');
        return data;
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const updateUserStatus = async (userId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/user-management/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        alert('User updated successfully!');
        return data;
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const getSystemSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/system/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching system settings:', error);
    }
  };

  const getWaterPointDetail = async (pointId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/water-infrastructure/${pointId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching water point detail:', error);
    }
  };

  // User Management Component with State
  const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // New user form state
    const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'customer',
      status: 'active',
      address: '',
      region: ''
    });

    // Fetch users when component mounts
    useEffect(() => {
      fetchUsers();
    }, []);

    // Filter users based on search and filters
    useEffect(() => {
      let filtered = users;
      
      if (searchTerm) {
        filtered = filtered.filter(user => 
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (filterRole !== 'all') {
        filtered = filtered.filter(user => user.role === filterRole);
      }
      
      if (filterStatus !== 'all') {
        filtered = filtered.filter(user => user.status === filterStatus);
      }
      
      setFilteredUsers(filtered);
    }, [users, searchTerm, filterRole, filterStatus]);

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/user-management`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []);
        } else {
          // Fallback mock data if API fails
          setUsers(generateMockUsers());
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback mock data if API fails
        setUsers(generateMockUsers());
      } finally {
        setLoadingUsers(false);
      }
    };

    const generateMockUsers = () => {
      const roles = ['customer', 'technician', 'admin', 'operator'];
      const statuses = ['active', 'inactive', 'suspended'];
      const regions = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'];
      
      return Array.from({ length: 50 }, (_, i) => ({
        id: `user_${i + 1}`,
        firstName: `User${i + 1}`,
        lastName: `Last${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `+23480${Math.floor(10000000 + Math.random() * 90000000)}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        registrationDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        address: `${Math.floor(Math.random() * 1000)} Sample Street`,
        region: regions[Math.floor(Math.random() * regions.length)],
        waterUsage: Math.floor(Math.random() * 10000),
        billsPaid: Math.floor(Math.random() * 12)
      }));
    };

    const handleAddUser = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/user-management`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(prev => [data.user, ...prev]);
          setShowAddUserModal(false);
          setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: 'customer',
            status: 'active',
            address: '',
            region: ''
          });
          alert('User added successfully!');
        } else {
          alert('Error adding user');
        }
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Error adding user');
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleUpdateUserStatus = async (userId, updates) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/user-management/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updates)
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, ...updates } : user
          ));
          alert('User updated successfully!');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    const handleDeleteUser = async (userId) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_BASE}/user-management/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.ok) {
            setUsers(prev => prev.filter(user => user.id !== userId));
            alert('User deleted successfully!');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-gray-100 text-gray-800';
        case 'suspended': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getRoleColor = (role) => {
      switch (role) {
        case 'admin': return 'bg-purple-100 text-purple-800';
        case 'technician': return 'bg-blue-100 text-blue-800';
        case 'operator': return 'bg-orange-100 text-orange-800';
        case 'customer': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Management System</h2>
            <p className="text-gray-600">Manage all system users and their permissions</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Add User
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <FaUsersCog className="mr-2" />
              Bulk Actions
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.role === 'customer').length}
              </p>
              <p className="text-sm text-gray-600">Customers</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.role === 'technician').length}
              </p>
              <p className="text-sm text-gray-600">Technicians</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button 
              onClick={fetchUsers}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <FaSync className="mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loadingUsers ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateUserStatus(user.id, { 
                              status: user.status === 'active' ? 'inactive' : 'active' 
                            })}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
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

        {/* Add User Modal */}
        <AnimatePresence>
          {showAddUserModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
                    <button
                      onClick={() => setShowAddUserModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAddUser} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                      </label>
                      <select
                        name="role"
                        value={newUser.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="customer">Customer</option>
                        <option value="technician">Technician</option>
                        <option value="operator">Operator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={newUser.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newUser.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <select
                      name="region"
                      value={newUser.region}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Region</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                      <option value="Kano">Kano</option>
                      <option value="Ibadan">Ibadan</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Add User
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // System Overview Component
  const SystemOverview = () => (
    <div className="space-y-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
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
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => fetchOverviewData(localStorage.getItem('token'))}
                >
                  Refresh Data
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
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  onClick={() => fetchOverviewData(localStorage.getItem('token'))}
                >
                  Refresh
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
        </>
      )}
    </div>
  );

  // Financial Management Component
  const FinancialManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Financial Management Center</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => generateReport('financial', '2024-01-01', '2024-12-31')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
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
        
        <div className="mt-4">
          <button 
            onClick={() => fetchFinancialManagement(localStorage.getItem('token'))}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Load Financial Data
          </button>
        </div>
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