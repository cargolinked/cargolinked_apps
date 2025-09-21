'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Shield, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  UserX,
  FileText,
  MessageSquare,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  activeRequests: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingVerifications: number;
  activeDisputes: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registered' | 'request_posted' | 'quote_submitted' | 'payment_completed' | 'dispute_opened';
  description: string;
  timestamp: string;
  user: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'shipper' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  totalTransactions: number;
  verified: boolean;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const stats: DashboardStats = {
    totalUsers: 2847,
    activeRequests: 156,
    totalRevenue: 284750,
    monthlyGrowth: 12.5,
    pendingVerifications: 23,
    activeDisputes: 5
  };

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'user_registered',
      description: 'New agent registration',
      timestamp: '2024-12-22T10:30:00Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'request_posted',
      description: 'New freight request posted',
      timestamp: '2024-12-22T09:45:00Z',
      user: 'ABC Manufacturing'
    },
    {
      id: '3',
      type: 'payment_completed',
      description: 'Payment processed successfully',
      timestamp: '2024-12-22T08:20:00Z',
      user: 'FastTrack Logistics'
    },
    {
      id: '4',
      type: 'dispute_opened',
      description: 'New dispute opened',
      timestamp: '2024-12-21T16:15:00Z',
      user: 'TechCorp Industries'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@fasttracklogistics.com',
      role: 'agent',
      status: 'active',
      joinDate: '2024-01-15',
      totalTransactions: 45,
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@medtransexpress.com',
      role: 'agent',
      status: 'active',
      joinDate: '2024-02-20',
      totalTransactions: 32,
      verified: true
    },
    {
      id: '3',
      name: 'ABC Manufacturing',
      email: 'contact@abcmanufacturing.com',
      role: 'shipper',
      status: 'pending',
      joinDate: '2024-12-20',
      totalTransactions: 0,
      verified: false
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered': return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'request_posted': return <Package className="w-4 h-4 text-blue-600" />;
      case 'quote_submitted': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'payment_completed': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'dispute_opened': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Shield className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'requests', name: 'Requests', icon: Package },
              { id: 'payments', name: 'Payments', icon: DollarSign },
              { id: 'disputes', name: 'Disputes', icon: AlertTriangle },
              { id: 'content', name: 'Content', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeRequests}</p>
                    </div>
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                      <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-900">Pending Verifications</h3>
                      <p className="text-yellow-700">{stats.pendingVerifications} users awaiting verification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Active Disputes</h3>
                      <p className="text-red-700">{stats.activeDisputes} disputes require attention</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-semibold">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  {user.name}
                                  {user.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="capitalize text-sm text-gray-900">{user.role}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">
                            {formatDate(user.joinDate)}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">
                            {user.totalTransactions}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <UserX className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'overview' && activeTab !== 'users' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
}
