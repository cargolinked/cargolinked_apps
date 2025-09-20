'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  DollarSign, 
  Package, 
  Star, 
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
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Requests', value: '24', icon: Package, color: 'text-blue-600' },
    { label: 'This Month Earnings', value: '$12,450', icon: DollarSign, color: 'text-green-600' },
    { label: 'Completed Jobs', value: '156', icon: Truck, color: 'text-purple-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
  ];

  const recentRequests = [
    {
      id: 1,
      title: 'Electronics Shipment',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      weight: '2,500 lbs',
      pickup: 'Tomorrow',
      price: '$3,200',
      priority: 'URGENT',
      priorityColor: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Medical Equipment',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      weight: '1,800 lbs',
      pickup: '2 days',
      price: '$2,800',
      priority: 'HIGH',
      priorityColor: 'bg-orange-500'
    },
    {
      id: 3,
      title: 'Automotive Parts',
      origin: 'Detroit, MI',
      destination: 'Dallas, TX',
      weight: '3,200 lbs',
      pickup: '3 days',
      price: '$4,100',
      priority: 'PREMIUM',
      priorityColor: 'bg-yellow-500'
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Food & Beverage Delivery',
      origin: 'Portland, OR',
      destination: 'Seattle, WA',
      status: 'In Transit',
      progress: 75,
      delivery: 'Today 3:00 PM'
    },
    {
      id: 2,
      title: 'Construction Materials',
      origin: 'Phoenix, AZ',
      destination: 'Las Vegas, NV',
      status: 'Pickup Scheduled',
      progress: 25,
      delivery: 'Tomorrow 10:00 AM'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Truck className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <span className="text-primary font-medium px-3 py-2 rounded-md cursor-pointer">Dashboard</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">Browse Requests</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">My Jobs</span>
                <span className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors cursor-pointer">Earnings</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your freight business today.</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Freight Requests</CardTitle>
                    <CardDescription>New opportunities matching your profile</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                            <span className={`ml-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${request.priorityColor}`}>
                              {request.priority}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-primary" />
                              <span>{request.origin} → {request.destination}</span>
                            </div>
                            <div className="flex items-center">
                              <Weight className="w-4 h-4 mr-1 text-primary" />
                              <span>{request.weight}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 text-primary" />
                              <span>Pickup: {request.pickup}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-primary" />
                              <span className="font-semibold text-gray-900">{request.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button className="bg-primary hover:bg-primary-700">
                            Quote Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Active Jobs & Quick Actions */}
          <div className="space-y-6">
            {/* Active Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Active Jobs</CardTitle>
                <CardDescription>Your current shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{job.origin} → {job.destination}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{job.delivery}</span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{job.status}</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
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
                    <FileText className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Payment History
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jobs Completed</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-semibold text-green-600">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On-Time Delivery</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Rating</span>
                    <span className="font-semibold">4.8/5</span>
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
