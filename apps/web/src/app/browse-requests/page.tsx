'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  Search, 
  Filter, 
  MapPin, 
  Weight, 
  Calendar, 
  DollarSign,
  Package,
  Clock,
  ArrowLeft,
  Eye,
  MessageCircle,
  Star,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface FreightRequest {
  id: string;
  title: string;
  description: string;
  cargoType: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  origin: {
    city: string;
    state: string;
  };
  destination: {
    city: string;
    state: string;
  };
  pickupDate: string;
  deliveryDate: string;
  budget: number;
  priority: 'urgent' | 'high' | 'normal' | 'premium';
  postedDate: string;
  expiresAt: string;
  shipper: {
    name: string;
    rating: number;
    totalShipments: number;
    verified: boolean;
  };
  quotesReceived: number;
  distance: number;
}

export default function BrowseRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargoType, setSelectedCargoType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [maxDistance, setMaxDistance] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - in real app, this would come from API
  const requests: FreightRequest[] = [
    {
      id: '1',
      title: 'Electronics Shipment - Urgent Delivery',
      description: 'High-value electronics equipment requiring careful handling and expedited delivery. Temperature-controlled environment preferred.',
      cargoType: 'Electronics',
      weight: 2500,
      dimensions: { length: 48, width: 36, height: 24 },
      origin: { city: 'Los Angeles', state: 'CA' },
      destination: { city: 'New York', state: 'NY' },
      pickupDate: '2024-12-24',
      deliveryDate: '2024-12-26',
      budget: 3200,
      priority: 'urgent',
      postedDate: '2024-12-22',
      expiresAt: '2024-12-25',
      shipper: {
        name: 'TechCorp Industries',
        rating: 4.8,
        totalShipments: 156,
        verified: true
      },
      quotesReceived: 8,
      distance: 2789
    },
    {
      id: '2',
      title: 'Medical Equipment Transport',
      description: 'Sensitive medical equipment requiring specialized handling and insurance coverage. Must maintain sterile conditions.',
      cargoType: 'Medical Equipment',
      weight: 1800,
      dimensions: { length: 60, width: 40, height: 30 },
      origin: { city: 'Chicago', state: 'IL' },
      destination: { city: 'Miami', state: 'FL' },
      pickupDate: '2024-12-25',
      deliveryDate: '2024-12-27',
      budget: 2800,
      priority: 'high',
      postedDate: '2024-12-21',
      expiresAt: '2024-12-26',
      shipper: {
        name: 'MedSupply Solutions',
        rating: 4.9,
        totalShipments: 89,
        verified: true
      },
      quotesReceived: 12,
      distance: 1377
    },
    {
      id: '3',
      title: 'Automotive Parts - Premium Service',
      description: 'High-end automotive parts for luxury vehicles. Requires secure transport and white-glove delivery service.',
      cargoType: 'Automotive Parts',
      weight: 3200,
      dimensions: { length: 72, width: 48, height: 36 },
      origin: { city: 'Detroit', state: 'MI' },
      destination: { city: 'Dallas', state: 'TX' },
      pickupDate: '2024-12-26',
      deliveryDate: '2024-12-29',
      budget: 4100,
      priority: 'premium',
      postedDate: '2024-12-20',
      expiresAt: '2024-12-27',
      shipper: {
        name: 'Luxury Auto Parts Co.',
        rating: 4.7,
        totalShipments: 234,
        verified: true
      },
      quotesReceived: 15,
      distance: 925
    },
    {
      id: '4',
      title: 'Food & Beverage Distribution',
      description: 'Perishable food items requiring refrigerated transport. Strict temperature monitoring required throughout journey.',
      cargoType: 'Food & Beverage',
      weight: 1200,
      dimensions: { length: 48, width: 40, height: 48 },
      origin: { city: 'Portland', state: 'OR' },
      destination: { city: 'Seattle', state: 'WA' },
      pickupDate: '2024-12-24',
      deliveryDate: '2024-12-24',
      budget: 850,
      priority: 'normal',
      postedDate: '2024-12-22',
      expiresAt: '2024-12-25',
      shipper: {
        name: 'Fresh Foods Inc.',
        rating: 4.6,
        totalShipments: 67,
        verified: false
      },
      quotesReceived: 5,
      distance: 173
    }
  ];

  const cargoTypes = ['Electronics', 'Medical Equipment', 'Automotive Parts', 'Food & Beverage', 'Construction Materials', 'General Freight'];
  const priorities = ['urgent', 'high', 'premium', 'normal'];
  const distances = ['100', '250', '500', '1000'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'premium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityText = (priority: string) => {
    return priority.toUpperCase();
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCargoType = selectedCargoType === 'all' || request.cargoType === selectedCargoType;
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    const matchesDistance = maxDistance === 'all' || request.distance <= parseInt(maxDistance);
    
    return matchesSearch && matchesCargoType && matchesPriority && matchesDistance;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'budget':
        return b.budget - a.budget;
      case 'distance':
        return a.distance - b.distance;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, premium: 2, normal: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const handleQuoteNow = (request: FreightRequest) => {
    // TODO: Navigate to quote submission page
    console.log('Submitting quote for request:', request);
  };

  const handleViewDetails = (request: FreightRequest) => {
    // TODO: Navigate to request details page
    console.log('Viewing details for request:', request);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours}h remaining`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d remaining`;
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
                <Truck className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <Link href="/agent/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Dashboard</Link>
                <span className="text-primary font-medium px-3 py-2 rounded-md">Browse Requests</span>
                <Link href="/agent/jobs" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">My Jobs</Link>
                <Link href="/agent/earnings" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Earnings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/agent/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Freight Requests</h1>
          <p className="text-gray-600">Find and quote on active freight requests that match your capabilities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Cargo Type Filter */}
            <select
              value={selectedCargoType}
              onChange={(e) => setSelectedCargoType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Cargo Types</option>
              {cargoTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
              ))}
            </select>

            {/* Distance Filter */}
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Any Distance</option>
              {distances.map(distance => (
                <option key={distance} value={distance}>Within {distance} miles</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="budget">Highest Budget</option>
              <option value="distance">Closest Distance</option>
              <option value="priority">Highest Priority</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {sortedRequests.length} of {requests.length} requests
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
          {sortedRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <span className={`ml-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${getPriorityColor(request.priority)}`}>
                        {getPriorityText(request.priority)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Package className="w-4 h-4 mr-1 text-primary" />
                      <span>{request.cargoType}</span>
                      <span className="mx-2">•</span>
                      <Weight className="w-4 h-4 mr-1 text-primary" />
                      <span>{request.weight.toLocaleString()} lbs</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1 text-orange-500" />
                      <span>{getTimeRemaining(request.expiresAt)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${request.budget.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {request.quotesReceived} quotes
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{request.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{request.origin.city}, {request.origin.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-600" />
                      <span>{request.destination.city}, {request.destination.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>Pickup: {formatDate(request.pickupDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>Delivery: {formatDate(request.deliveryDate)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-semibold">
                            {request.shipper.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{request.shipper.name}</span>
                        {request.shipper.verified && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                        <span>{request.shipper.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{request.shipper.totalShipments} shipments</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Distance: {request.distance} miles
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary-700"
                        onClick={() => handleQuoteNow(request)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Quote Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedRequests.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
