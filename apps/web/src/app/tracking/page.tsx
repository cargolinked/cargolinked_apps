'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertTriangle,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  Download,
  Camera,
  ArrowLeft,
  Navigation,
  Info
} from 'lucide-react';
import Link from 'next/link';

interface TrackingEvent {
  id: string;
  type: 'created' | 'confirmed' | 'picked_up' | 'in_transit' | 'location_update' | 'delivered' | 'exception' | 'cancelled';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ShipmentDetails {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  title: string;
  origin: {
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  estimatedDelivery: string;
  actualDelivery?: string;
  agent: {
    name: string;
    company: string;
    phone: string;
    email: string;
  };
  shipper: {
    name: string;
    company: string;
  };
  cargo: {
    type: string;
    weight: number;
    dimensions: string;
    value: number;
  };
  events: TrackingEvent[];
  documents: Array<{
    id: string;
    type: string;
    name: string;
    url: string;
    uploadedAt: string;
  }>;
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock shipment data
  const mockShipment: ShipmentDetails = {
    id: '1',
    trackingNumber: 'CL2024-123456',
    status: 'in_transit',
    title: 'Electronics Shipment to New York',
    origin: {
      address: '123 Tech Street',
      city: 'Los Angeles',
      state: 'CA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    destination: {
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    estimatedDelivery: '2024-12-25T14:00:00Z',
    agent: {
      name: 'John Smith',
      company: 'FastTrack Logistics',
      phone: '+1 (555) 123-4567',
      email: 'john@fasttracklogistics.com'
    },
    shipper: {
      name: 'Sarah Johnson',
      company: 'TechCorp Industries'
    },
    cargo: {
      type: 'Electronics',
      weight: 2500,
      dimensions: '48" × 36" × 24"',
      value: 50000
    },
    events: [
      {
        id: '1',
        type: 'created',
        title: 'Shipment Created',
        description: 'Shipment request has been created and is awaiting confirmation.',
        location: 'Los Angeles, CA',
        timestamp: '2024-12-22T08:00:00Z'
      },
      {
        id: '2',
        type: 'confirmed',
        title: 'Shipment Confirmed',
        description: 'Agent has confirmed the shipment and scheduled pickup.',
        location: 'Los Angeles, CA',
        timestamp: '2024-12-22T09:30:00Z'
      },
      {
        id: '3',
        type: 'picked_up',
        title: 'Package Picked Up',
        description: 'Package has been picked up from the origin location.',
        location: 'Los Angeles, CA',
        timestamp: '2024-12-22T14:00:00Z',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      {
        id: '4',
        type: 'in_transit',
        title: 'In Transit',
        description: 'Package is on its way to the destination.',
        location: 'Phoenix, AZ',
        timestamp: '2024-12-23T10:30:00Z',
        coordinates: { lat: 33.4484, lng: -112.0740 }
      },
      {
        id: '5',
        type: 'location_update',
        title: 'Location Update',
        description: 'Package is currently in transit through Denver.',
        location: 'Denver, CO',
        timestamp: '2024-12-24T08:15:00Z',
        coordinates: { lat: 39.7392, lng: -104.9903 }
      }
    ],
    documents: [
      {
        id: '1',
        type: 'bill_of_lading',
        name: 'Bill of Lading - CL2024-123456.pdf',
        url: '#',
        uploadedAt: '2024-12-22T14:00:00Z'
      },
      {
        id: '2',
        type: 'photo',
        name: 'Pickup Photo - Package.jpg',
        url: '#',
        uploadedAt: '2024-12-22T14:05:00Z'
      }
    ]
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement actual tracking API call
      console.log('Tracking shipment:', trackingNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (trackingNumber === 'CL2024-123456') {
        setShipment(mockShipment);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setShipment(null);
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setError('Failed to track shipment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in_transit': case 'out_for_delivery': return 'text-blue-600 bg-blue-100';
      case 'picked_up': return 'text-purple-600 bg-purple-100';
      case 'confirmed': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created': return <FileText className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'picked_up': return <Package className="w-4 h-4" />;
      case 'in_transit': case 'location_update': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'exception': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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

        {/* Tracking Search */}
        <div className="mb-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Track Your Shipment</CardTitle>
              <CardDescription>
                Enter your tracking number to get real-time updates on your shipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    placeholder="Enter tracking number (e.g., CL2024-123456)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleTrack}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-700 py-3 text-lg font-semibold"
                >
                  {isLoading ? 'Tracking...' : 'Track Shipment'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Try tracking number: <code className="bg-gray-100 px-2 py-1 rounded">CL2024-123456</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Details */}
        {shipment && (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{shipment.title}</h3>
                    <p className="text-gray-600">Tracking: {shipment.trackingNumber}</p>
                  </div>
                  
                  <div className="text-center">
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <p className="text-gray-600 mt-2">Current Status</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center text-gray-600 mb-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        {formatDate(shipment.estimatedDelivery)}
                      </span>
                    </div>
                    <p className="text-gray-600">Estimated Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking History</CardTitle>
                    <CardDescription>Real-time updates on your shipment progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {shipment.events.map((event, index) => (
                        <div key={event.id} className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {getEventIcon(event.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                              <span className="text-xs text-gray-500">{formatDate(event.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipment Details Sidebar */}
              <div className="space-y-6">
                {/* Route Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Route Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Origin</h4>
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <div>
                          <p>{shipment.origin.address}</p>
                          <p>{shipment.origin.city}, {shipment.origin.state}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Destination</h4>
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-600" />
                        <div>
                          <p>{shipment.destination.address}</p>
                          <p>{shipment.destination.city}, {shipment.destination.state}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cargo Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cargo Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium">{shipment.cargo.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Weight:</span>
                      <span className="text-sm font-medium">{shipment.cargo.weight.toLocaleString()} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Dimensions:</span>
                      <span className="text-sm font-medium">{shipment.cargo.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Value:</span>
                      <span className="text-sm font-medium">${shipment.cargo.value.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Agent</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{shipment.agent.name}</p>
                        <p className="text-sm text-gray-600">{shipment.agent.company}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2" />
                          <span>{shipment.agent.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-2" />
                          <span>{shipment.agent.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Shipper</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{shipment.shipper.name}</p>
                        <p className="text-sm text-gray-600">{shipment.shipper.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shipment.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            {doc.type === 'photo' ? (
                              <Camera className="w-4 h-4 text-gray-600" />
                            ) : (
                              <FileText className="w-4 h-4 text-gray-600" />
                            )}
                            <span className="text-sm text-gray-900">{doc.name}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
