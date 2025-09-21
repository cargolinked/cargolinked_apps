'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Phone,
  Mail,
  Globe,
  Package,
  Calendar,
  ArrowLeft,
  Eye,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  totalJobs: number;
  verified: boolean;
  services: string[];
  coverageAreas: string[];
  description: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  joinedDate: string;
  avatar: string;
}

export default function BrowseDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - in real app, this would come from API
  const agents: Agent[] = [
    {
      id: '1',
      name: 'John Smith',
      company: 'FastTrack Logistics',
      location: 'Los Angeles, CA',
      rating: 4.9,
      totalJobs: 245,
      verified: true,
      services: ['General Freight', 'Electronics', 'Automotive'],
      coverageAreas: ['California', 'Nevada', 'Arizona'],
      description: 'Experienced freight agent with over 10 years in the industry. Specializing in electronics and automotive parts transportation.',
      contactEmail: 'john@fasttracklogistics.com',
      contactPhone: '+1 (555) 123-4567',
      website: 'https://fasttracklogistics.com',
      joinedDate: '2020-03-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'MedTrans Express',
      location: 'Chicago, IL',
      rating: 4.8,
      totalJobs: 189,
      verified: true,
      services: ['Medical Equipment', 'Fragile Items', 'Temperature Controlled'],
      coverageAreas: ['Illinois', 'Indiana', 'Wisconsin', 'Michigan'],
      description: 'Specialized in medical equipment transportation with temperature-controlled vehicles and certified handling procedures.',
      contactEmail: 'sarah@medtransexpress.com',
      contactPhone: '+1 (555) 234-5678',
      joinedDate: '2019-08-22',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      company: 'AutoHaul Pro',
      location: 'Detroit, MI',
      rating: 4.7,
      totalJobs: 312,
      verified: true,
      services: ['Automotive Parts', 'Heavy Machinery', 'Construction Materials'],
      coverageAreas: ['Michigan', 'Ohio', 'Pennsylvania', 'New York'],
      description: 'Heavy-duty transportation specialist with expertise in automotive and construction industry logistics.',
      contactEmail: 'mike@autohaulpro.com',
      contactPhone: '+1 (555) 345-6789',
      website: 'https://autohaulpro.com',
      joinedDate: '2018-12-10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Lisa Chen',
      company: 'Pacific Freight Solutions',
      location: 'Seattle, WA',
      rating: 4.9,
      totalJobs: 156,
      verified: true,
      services: ['Food & Beverage', 'Perishables', 'General Freight'],
      coverageAreas: ['Washington', 'Oregon', 'California'],
      description: 'Specializing in perishable goods transportation with refrigerated trucks and expedited delivery services.',
      contactEmail: 'lisa@pacificfreight.com',
      contactPhone: '+1 (555) 456-7890',
      joinedDate: '2021-01-18',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const services = ['General Freight', 'Electronics', 'Automotive', 'Medical Equipment', 'Food & Beverage', 'Construction Materials', 'Fragile Items', 'Hazardous Materials'];
  const locations = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Michigan'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = selectedService === 'all' || agent.services.includes(selectedService);
    const matchesLocation = selectedLocation === 'all' || agent.coverageAreas.includes(selectedLocation);
    
    return matchesSearch && matchesService && matchesLocation;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'jobs':
        return b.totalJobs - a.totalJobs;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleContactAgent = (agent: Agent) => {
    // TODO: Implement contact functionality
    console.log('Contacting agent:', agent);
  };

  const handleViewProfile = (agent: Agent) => {
    // TODO: Navigate to agent profile page
    console.log('Viewing profile:', agent);
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
                <Link href="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Home</Link>
                <span className="text-primary font-medium px-3 py-2 rounded-md">Browse Directory</span>
                <Link href="/post-request" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Post Request</Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Dashboard</Link>
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
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Agent Directory</h1>
          <p className="text-gray-600">Find verified freight agents for your shipping needs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search agents, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Service Filter */}
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="jobs">Sort by Jobs Completed</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {sortedAgents.length} of {agents.length} agents
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

        {/* Agents Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {agent.name}
                        {agent.verified && (
                          <Shield className="w-4 h-4 text-green-500 ml-2" />
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{agent.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 mb-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{agent.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{agent.totalJobs} jobs</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span>{agent.location}</span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 line-clamp-2">{agent.description}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-900 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                      {agent.services.length > 3 && (
                        <span className="text-xs text-gray-500">+{agent.services.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-900 mb-1">Coverage Areas:</p>
                    <p className="text-xs text-gray-600">{agent.coverageAreas.join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProfile(agent)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary-700"
                      onClick={() => handleContactAgent(agent)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
