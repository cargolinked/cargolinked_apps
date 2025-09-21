'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Star, 
  Shield, 
  Camera,
  Edit,
  Save,
  X,
  Truck,
  Package,
  DollarSign,
  Calendar,
  Award,
  FileText,
  Eye,
  MessageCircle,
  Settings,
  Bell,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'agent' | 'shipper';
  companyName?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  avatar: string;
  verified: boolean;
  joinDate: string;
  bio: string;
  website?: string;
  // Agent specific
  rating?: number;
  totalJobs?: number;
  completionRate?: number;
  services?: string[];
  coverageAreas?: string[];
  // Shipper specific
  totalShipments?: number;
  totalSpent?: number;
}

interface Transaction {
  id: string;
  type: 'shipment' | 'payment' | 'quote';
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  counterparty: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@fasttracklogistics.com',
    phone: '+1 (555) 123-4567',
    role: 'agent',
    companyName: 'FastTrack Logistics',
    address: {
      street: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    joinDate: '2020-03-15',
    bio: 'Experienced freight agent with over 10 years in the industry. Specializing in electronics and automotive parts transportation with a focus on timely delivery and customer satisfaction.',
    website: 'https://fasttracklogistics.com',
    rating: 4.9,
    totalJobs: 245,
    completionRate: 98.5,
    services: ['General Freight', 'Electronics', 'Automotive Parts', 'Express Delivery'],
    coverageAreas: ['California', 'Nevada', 'Arizona', 'Utah']
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Electronics Shipment Payment',
      amount: 3200,
      date: '2024-12-20',
      status: 'completed',
      counterparty: 'TechCorp Industries'
    },
    {
      id: '2',
      type: 'shipment',
      title: 'Medical Equipment Transport',
      amount: 2800,
      date: '2024-12-18',
      status: 'completed',
      counterparty: 'MedSupply Solutions'
    },
    {
      id: '3',
      type: 'quote',
      title: 'Automotive Parts Quote',
      amount: 4100,
      date: '2024-12-15',
      status: 'pending',
      counterparty: 'AutoParts Co.'
    }
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // TODO: Save to API
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile] as any,
          [child]: value
        }
      }));
    } else {
      setEditedProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
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
                <Truck className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
              </Link>
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
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    {profile.verified && (
                      <Shield className="w-5 h-5 text-green-500 ml-2" />
                    )}
                  </div>
                  
                  {profile.companyName && (
                    <p className="text-gray-600 mb-2">{profile.companyName}</p>
                  )}
                  
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {profile.role}
                  </span>
                </div>

                {/* Quick Stats for Agents */}
                {profile.role === 'agent' && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{profile.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Jobs</span>
                      <span className="text-sm font-medium">{profile.totalJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-medium">{profile.completionRate}%</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full"
                    variant={isEditing ? "outline" : "default"}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </Button>
                  
                  {profile.website && (
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Website
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', name: 'Overview', icon: User },
                  { id: 'activity', name: 'Activity', icon: Package },
                  { id: 'transactions', name: 'Transactions', icon: DollarSign },
                  { id: 'reviews', name: 'Reviews', icon: Star }
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
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Your basic profile information</CardDescription>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-gray-900">{profile.email}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="text-gray-900">{profile.phone}</p>
                          </div>
                        )}
                      </div>

                      {profile.companyName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedProfile.companyName || ''}
                              onChange={(e) => handleInputChange('companyName', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Building className="w-4 h-4 text-gray-400 mr-2" />
                              <p className="text-gray-900">{profile.companyName}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Member Since
                        </label>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-gray-900">{formatDate(profile.joinDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedProfile.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.bio}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Services & Coverage (for agents) */}
                {profile.role === 'agent' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Services Offered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {profile.services?.map((service, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Coverage Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {profile.coverageAreas?.map((area, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {area}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            {transaction.type === 'payment' && <DollarSign className="w-5 h-5 text-white" />}
                            {transaction.type === 'shipment' && <Package className="w-5 h-5 text-white" />}
                            {transaction.type === 'quote' && <FileText className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{transaction.title}</h4>
                            <p className="text-sm text-gray-600">with {transaction.counterparty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(transaction.amount)}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other tabs would be implemented similarly */}
            {(activeTab === 'activity' || activeTab === 'reviews') && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'activity' && <Package className="w-8 h-8 text-gray-400" />}
                  {activeTab === 'reviews' && <Star className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming Soon
                </h3>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
