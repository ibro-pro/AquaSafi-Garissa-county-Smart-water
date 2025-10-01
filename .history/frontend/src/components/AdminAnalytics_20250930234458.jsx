import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaExpand,
  FaTrendingUp,
  FaWater,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaMapMarkerAlt
} from 'react-icons/fa';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');


  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 4567890,
      revenueGrowth: 15.7,
      activeUsers: 12384,
      userGrowth: 12.4,
      waterConsumption: 2456789,
      consumptionGrowth: 8.2,
      systemEfficiency: 96.8,
      efficiencyChange: 2.1
    },
    chartData: {
      revenue: [
        { month: 'Jan', value: 3200000 },
        { month: 'Feb', value: 3450000 },
        { month: 'Mar', value: 3780000 },
        { month: 'Apr', value: 4100000 },
        { month: 'May', value: 4350000 },
        { month: 'Jun', value: 4567890 }
      ],
      users: [
        { month: 'Jan', value: 8500 },
        { month: 'Feb', value: 9200 },
        { month: 'Mar', value: 10100 },
        { month: 'Apr', value: 10800 },
        { month: 'May', value: 11600 },
        { month: 'Jun', value: 12384 }
      ],
      consumption: [
        { month: 'Jan', value: 1890000 },
        { month: 'Feb', value: 2010000 },
        { month: 'Mar', value: 2145000 },
        { month: 'Apr', value: 2280000 },
        { month: 'May', value: 2390000 },
        { month: 'Jun', value: 2456789 }
      ]
    },
    regionalPerformance: [
      { region: 'Garissa Town', performance: 94.2, trend: 'up', users: 5247, revenue: 1234567 },
      { region: 'Dadaab Complex', performance: 87.5, trend: 'up', users: 8956, revenue: 2134890 },
      { region: 'Ijara District', performance: 91.3, trend: 'stable', users: 3456, revenue: 987456 },
      { region: 'Lagdera', performance: 78.9, trend: 'down', users: 2187, revenue: 567234 },
      { region: 'Balambala', performance: 85.6, trend: 'up', users: 2983, revenue: 743289 }
    ],
    waterQualityMetrics: {
      excellent: 68,
      good: 22,
      fair: 8,
      poor: 2
    },
    systemAlerts: {
      critical: 3,      
      warning: 12,
      info: 23,
      resolved: 156
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color, format = 'number' }) => {
    const isPositive = change > 0;
    const formattedValue = format === 'currency' ? 
      `₦${(value / 1000000).toFixed(1)}M` : 
      format === 'percentage' ? 
      `${value}%` : 
      value.toLocaleString();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-2xl shadow-xl p-6 border-l-4 border-${color}-500 hover:shadow-2xl transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mb-2">{formattedValue}</p>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              <span>{Math.abs(change)}% vs last period</span>
            </div>
          </div>
          <div className={`p-4 bg-${color}-100 rounded-full`}>
            <Icon className={`text-2xl text-${color}-600`} />
          </div>
        </div>
      </motion.div>
    );
  };

  const ChartContainer = ({ title, children, actions = null }) => (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          {actions}
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <FaExpand />
          </button>
        </div>
      </div>
      {children}
    </div>
  );

  const SimpleBarChart = ({ data, color = 'blue' }) => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-16 text-sm text-gray-600 font-medium">{item.month}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full`}
            />
          </div>
          <div className="w-20 text-sm text-gray-800 font-semibold text-right">
            {item.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );

  const DonutChart = ({ data, colors }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            {Object.entries(data).map(([key, value], index) => {
              const percentage = (value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              const color = colors[index % colors.length];
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={key}
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        <div className="ml-6 space-y-2">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600 capitalize">{key}: {value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaChartLine className="mr-3 text-blue-600" />
            Advanced Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-1">Comprehensive system performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={analyticsData.overview.totalRevenue}
          change={analyticsData.overview.revenueGrowth}
          icon={FaMoneyBillWave}
          color="green"
          format="currency"
        />
        <MetricCard
          title="Active Users"
          value={analyticsData.overview.activeUsers}
          change={analyticsData.overview.userGrowth}
          icon={FaUsers}
          color="blue"
        />
        <MetricCard
          title="Water Consumption (L)"
          value={analyticsData.overview.waterConsumption}
          change={analyticsData.overview.consumptionGrowth}
          icon={FaWater}
          color="cyan"
        />
        <MetricCard
          title="System Efficiency"
          value={analyticsData.overview.systemEfficiency}
          change={analyticsData.overview.efficiencyChange}
          icon={FaTrendingUp}
          color="purple"
          format="percentage"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <ChartContainer 
          title="Revenue Trend"
          actions={
            <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg">
              Monthly
            </button>
          }
        >
          <SimpleBarChart data={analyticsData.chartData.revenue} color="green" />
        </ChartContainer>

        {/* User Growth */}
        <ChartContainer 
          title="User Growth"
          actions={
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg">
              Active Users
            </button>
          }
        >
          <SimpleBarChart data={analyticsData.chartData.users} color="blue" />
        </ChartContainer>
      </div>

      {/* Quality Metrics and Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Quality Distribution */}
        <ChartContainer title="Water Quality Distribution">
          <DonutChart 
            data={analyticsData.waterQualityMetrics}
            colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444']}
          />
        </ChartContainer>

        {/* System Alerts Status */}
        <ChartContainer title="System Alerts Status">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-800 font-semibold">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{analyticsData.systemAlerts.critical}</p>
                </div>
                <FaExclamationTriangle className="text-red-500 text-xl" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 font-semibold">Warning</p>
                  <p className="text-2xl font-bold text-yellow-600">{analyticsData.systemAlerts.warning}</p>
                </div>
                <FaClock className="text-yellow-500 text-xl" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 font-semibold">Info</p>
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.systemAlerts.info}</p>
                </div>
                <FaChartBar className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-semibold">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{analyticsData.systemAlerts.resolved}</p>
                </div>
                <FaCheckCircle className="text-green-500 text-xl" />
              </div>  
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Regional Performance Table */}
      <ChartContainer 
        title="Regional Performance Analysis"
        actions={
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg flex items-center">
              <FaFilter className="mr-1" />
              Filter
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg">
              Export
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Users</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.regionalPerformance.map((region, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="font-medium text-gray-800">{region.region}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${region.performance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{region.performance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-800">{region.users.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-800">₦{(region.revenue / 1000000).toFixed(1)}M</td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center space-x-1 ${
                      region.trend === 'up' ? 'text-green-600' :
                      region.trend === 'down' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {region.trend === 'up' ? <FaArrowUp /> :
                       region.trend === 'down' ? <FaArrowDown /> :
                       <div className="w-3 h-3 bg-gray-400 rounded-full" />}
                      <span className="text-sm capitalize">{region.trend}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>

      {/* Water Consumption Analysis */}
      <ChartContainer 
        title="Water Consumption Patterns"
        actions={
          <button className="px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded-lg">
            Monthly View
          </button>
        }
      >
        <SimpleBarChart data={analyticsData.chartData.consumption} color="cyan" />
      </ChartContainer>
    </div>
  );
};

export default AdminAnalytics;