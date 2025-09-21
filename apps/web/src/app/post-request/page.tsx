'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  MapPin, 
  Package, 
  Calendar, 
  DollarSign, 
  ArrowLeft,
  Plus,
  Minus,
  Info,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  title: string;
  description: string;
  cargoType: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  origin: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  destination: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  pickupDate: string;
  deliveryDate: string;
  budget: string;
  specialRequirements: string;
  contactPreference: string;
}

export default function PostRequestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    cargoType: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    origin: {
      address: '',
      city: '',
      state: '',
      postalCode: ''
    },
    destination: {
      address: '',
      city: '',
      state: '',
      postalCode: ''
    },
    pickupDate: '',
    deliveryDate: '',
    budget: '',
    specialRequirements: '',
    contactPreference: 'email'
  });

  const cargoTypes = [
    'General Freight',
    'Electronics',
    'Automotive Parts',
    'Medical Equipment',
    'Food & Beverage',
    'Construction Materials',
    'Fragile Items',
    'Hazardous Materials',
    'Perishables',
    'Oversized Items',
    'Other'
  ];

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.cargoType;
      case 2:
        return formData.weight && formData.dimensions.length && formData.dimensions.width && formData.dimensions.height;
      case 3:
        return formData.origin.address && formData.origin.city && formData.origin.state && 
               formData.destination.address && formData.destination.city && formData.destination.state;
      case 4:
        return formData.pickupDate && formData.deliveryDate && formData.budget;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Implement actual API call to create freight request
      console.log('Submitting freight request:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Posted Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Your freight request has been posted and agents will start submitting quotes shortly.
            </p>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-primary hover:bg-primary-700">
                  View My Requests
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    title: '',
                    description: '',
                    cargoType: '',
                    weight: '',
                    dimensions: { length: '', width: '', height: '' },
                    origin: { address: '', city: '', state: '', postalCode: '' },
                    destination: { address: '', city: '', state: '', postalCode: '' },
                    pickupDate: '',
                    deliveryDate: '',
                    budget: '',
                    specialRequirements: '',
                    contactPreference: 'email'
                  });
                }}
              >
                Post Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Post Freight Request</h1>
            <span className="text-sm text-gray-600">Step {currentStep} of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                  <p className="text-gray-600">Tell us about your shipment</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Electronics shipment from LA to NYC"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Describe your cargo, any special handling requirements, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo Type *
                    </label>
                    <select
                      value={formData.cargoType}
                      onChange={(e) => handleInputChange('cargoType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select cargo type</option>
                      {cargoTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dimensions & Weight */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Dimensions & Weight</h2>
                  <p className="text-gray-600">Provide the physical specifications of your cargo</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (lbs) *
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter weight in pounds"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (inches) *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input
                          type="number"
                          value={formData.dimensions.length}
                          onChange={(e) => handleInputChange('dimensions.length', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Length"
                        />
                        <p className="text-xs text-gray-500 mt-1">Length</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          value={formData.dimensions.width}
                          onChange={(e) => handleInputChange('dimensions.width', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Width"
                        />
                        <p className="text-xs text-gray-500 mt-1">Width</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          value={formData.dimensions.height}
                          onChange={(e) => handleInputChange('dimensions.height', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Height"
                        />
                        <p className="text-xs text-gray-500 mt-1">Height</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pickup & Delivery Locations */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pickup & Delivery Locations</h2>
                  <p className="text-gray-600">Where should we pick up and deliver your cargo?</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Origin */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Pickup Location
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        value={formData.origin.address}
                        onChange={(e) => handleInputChange('origin.address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          value={formData.origin.city}
                          onChange={(e) => handleInputChange('origin.city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <select
                          value={formData.origin.state}
                          onChange={(e) => handleInputChange('origin.state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select state</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.origin.postalCode}
                        onChange={(e) => handleInputChange('origin.postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="ZIP code"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-600" />
                      Delivery Location
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        value={formData.destination.address}
                        onChange={(e) => handleInputChange('destination.address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          value={formData.destination.city}
                          onChange={(e) => handleInputChange('destination.city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <select
                          value={formData.destination.state}
                          onChange={(e) => handleInputChange('destination.state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select state</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.destination.postalCode}
                        onChange={(e) => handleInputChange('destination.postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="ZIP code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Timeline & Budget */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline & Budget</h2>
                  <p className="text-gray-600">When do you need this shipped and what&apos;s your budget?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Pickup Date *
                      </label>
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Delivery Date *
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your budget"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">This is your maximum budget. Agents may quote lower prices.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Any special handling, insurance, or delivery requirements..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Request</h2>
                  <p className="text-gray-600">Please review all details before submitting</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Basic Information</h3>
                    <p className="text-gray-600">{formData.title}</p>
                    <p className="text-gray-600">{formData.cargoType}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Cargo Details</h3>
                    <p className="text-gray-600">Weight: {formData.weight} lbs</p>
                    <p className="text-gray-600">
                      Dimensions: {formData.dimensions.length}" × {formData.dimensions.width}" × {formData.dimensions.height}"
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Route</h3>
                    <p className="text-gray-600">
                      From: {formData.origin.address}, {formData.origin.city}, {formData.origin.state}
                    </p>
                    <p className="text-gray-600">
                      To: {formData.destination.address}, {formData.destination.city}, {formData.destination.state}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Timeline & Budget</h3>
                    <p className="text-gray-600">Pickup: {formData.pickupDate}</p>
                    <p className="text-gray-600">Delivery: {formData.deliveryDate}</p>
                    <p className="text-gray-600">Budget: ${formData.budget}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">What happens next?</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Your request will be posted to our network of verified agents. You&apos;ll receive quotes within 24 hours and can choose the best option for your needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <Minus className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="bg-primary hover:bg-primary-700 flex items-center"
                >
                  Next
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-700 flex items-center"
                >
                  {isLoading ? 'Submitting...' : 'Submit Request'}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
