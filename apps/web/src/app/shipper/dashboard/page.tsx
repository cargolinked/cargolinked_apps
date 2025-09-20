'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Building, 
  DollarSign, 
  Package, 
  Truck, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Weight, 
  Clock,
  Bell,
  Settings,
  User,
  FileText,
  Search,
  Filter,
  Plus,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ShipperDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Shipments', value: '8', icon: Package, color: 'text-blue-600' },
    { label: 'This Month Spend', value: '$8,750', icon: DollarSign, color: 'text-green-600' },
    { label: 'Total Shipments', value: '89', icon: Truck, color: 'text-purple-600' },
    { label: 'Active Agents', value: '12', icon: User, color: 'text-orange-600' },
  ];

  const activeShipments = [
    {
      id: 1,
      title: 'Electronics to New York',
      agent: 'FastTrack Logistics',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      status: 'In Transit',
      progress: 65,
      estimatedDelivery: 'Tomorrow 2:00 PM',
      trackingNumber: 'CL-2024-001'
    },
    {
      id: 2,
      title: 'Medical Equipment to Miami',
      agent: 'MedTrans Express',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'Pickup Scheduled',
      progress: 20,
      estimatedDelivery: 'Dec 25, 10:00 AM',
      trackingNumber: 'CL-2024-002'
    },
    {
      id: 3,
      title: 'Automotive Parts to Dallas',
      agent: 'AutoHaul Pro',
      origin: 'Detroit, MI',
      destination: 'Dallas, TX',
      status: 'Delivered',
      progress: 100,
      estimatedDelivery: 'Completed',
      trackingNumber: 'CL-2024-003'
    },
  ];

  const recentQuotes = [
    {
      id: 1,
      title: 'Construction Materials',
      origin: 'Phoenix, AZ',
      destination: 'Las Vegas, NV',
      weight: '5,000 lbs',
      quotes: 3,
      bestPrice: '$2,400',
      status: 'Reviewing'
    },
    {
      id: 2,
      title: 'Food & Beverage',
      origin: 'Portland, OR',
      destination: 'Seattle, WA',
      weight: '1,200 lbs',
      quotes: 5,
      bestPrice: '$850',
      status: 'Agent Selected'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-500';
      case 'Pickup Scheduled': return 'bg-yellow-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Building className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <span className="text-primary font-medium px-3 py-2 rounded-md cursor-pointer">Dashboard</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">Post Request</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">My Shipments</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">Browse Agents</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </button>
              <button className="text-gray-600 hover:text-primary">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, ABC Manufacturing!</h1>
          <p className="text-gray-600 mt-2">Manage your shipments and track deliveries from your dashboard.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary-700">
              <Plus className="w-4 h-4 mr-2" />
              Post New Request
            </Button>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Browse Agents
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Active Shipments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Shipments</CardTitle>
                    <CardDescription>Track your current shipments in real-time</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeShipments.map((shipment) => (
                    <div key={shipment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{shipment.title}</h3>
                            <span className={`ml-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Agent: {shipment.agent}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-primary" />
                              <span>{shipment.origin} → {shipment.destination}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1 text-primary" />
                              <span>{shipment.estimatedDelivery}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{shipment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${shipment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Quotes & Quick Info */}
          <div className="space-y-6">
            {/* Recent Quotes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quote Requests</CardTitle>
                <CardDescription>Your latest shipping requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuotes.map((quote) => (
                    <div key={quote.id} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2">{quote.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{quote.origin} → {quote.destination}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Weight className="w-3 h-3 mr-1" />
                          <span>{quote.weight}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">{quote.quotes} quotes received</span>
                        <span className="text-sm font-semibold text-green-600">{quote.bestPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          quote.status === 'Agent Selected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quote.status}
                        </span>
                        <Button variant="outline" size="sm">
                          View Quotes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Request
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Find Agents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Shipping Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Month Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipments Sent</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Spend</span>
                    <span className="font-semibold text-blue-600">$8,750</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On-Time Delivery</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Cost per Shipment</span>
                    <span className="font-semibold">$1,094</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Agents</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
