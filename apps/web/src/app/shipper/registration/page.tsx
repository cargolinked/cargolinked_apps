'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Building, 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DocumentFile {
  id: string;
  name: string;
  type: 'business_license' | 'tax_id' | 'other';
  file: File;
  status: 'uploading' | 'uploaded' | 'error';
}

export default function ShipperRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentFile[]>([]);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyType: '',
    taxId: '',
    yearsInBusiness: '',
    website: '',
    
    // Contact Information
    contactPersonName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Shipping Information
    typicalShipmentTypes: [] as string[],
    averageShipmentsPerMonth: '',
    preferredShippingMethods: [] as string[],
    
    // Additional Information
    companyDescription: '',
    specialRequirements: '',
    emergencyContact: '',
    emergencyPhone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const shipmentTypes = [
    'General Freight',
    'Electronics',
    'Automotive Parts',
    'Medical Equipment',
    'Food & Beverage',
    'Chemicals',
    'Textiles',
    'Machinery',
    'Consumer Goods',
    'Raw Materials'
  ];

  const shippingMethods = [
    'Standard Ground',
    'Expedited',
    'White Glove',
    'Refrigerated',
    'Hazmat',
    'Oversized',
    'LTL (Less Than Truckload)',
    'FTL (Full Truckload)'
  ];

  const stateOptions = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const checkboxName = (e.target as HTMLInputElement).name;
      
      if (checkboxName.startsWith('shipmentTypes_') || checkboxName.startsWith('shippingMethods_')) {
        const fieldName = checkboxName.split('_')[0] as 'shipmentTypes' | 'shippingMethods';
        const optionValue = checkboxName.split('_')[1];
        
        const fieldMapping = {
          shipmentTypes: 'typicalShipmentTypes',
          shippingMethods: 'preferredShippingMethods'
        };
        
        const actualFieldName = fieldMapping[fieldName];
        
        setFormData(prev => ({
          ...prev,
          [actualFieldName]: checked 
            ? [...prev[actualFieldName as keyof typeof prev] as string[], optionValue]
            : (prev[actualFieldName as keyof typeof prev] as string[]).filter(item => item !== optionValue)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, type: DocumentFile['type']) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const documentFile: DocumentFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        file,
        status: 'uploading'
      };

      setUploadedDocuments(prev => [...prev, documentFile]);

      // Simulate upload
      setTimeout(() => {
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.id === documentFile.id 
              ? { ...doc, status: 'uploaded' }
              : doc
          )
        );
      }, 2000);
    });
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companyType) newErrors.companyType = 'Company type is required';
      if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required';
      if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
      if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (formData.typicalShipmentTypes.length === 0) newErrors.typicalShipmentTypes = 'Please select at least one shipment type';
      if (!formData.averageShipmentsPerMonth) newErrors.averageShipmentsPerMonth = 'Please select average shipments per month';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    
    try {
      // TODO: Implement actual registration with Supabase
      console.log('Shipper registration:', formData);
      console.log('Uploaded documents:', uploadedDocuments);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/shipper/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.companyName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="companyType" className="text-sm font-medium text-gray-700">
              Company Type *
            </label>
            <select
              id="companyType"
              name="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.companyType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select company type</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="e_commerce">E-commerce</option>
              <option value="logistics_provider">Logistics Provider</option>
              <option value="other">Other</option>
            </select>
            {errors.companyType && (
              <p className="text-red-500 text-sm">{errors.companyType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="taxId" className="text-sm font-medium text-gray-700">
              Tax ID / EIN
            </label>
            <input
              id="taxId"
              name="taxId"
              type="text"
              value={formData.taxId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter Tax ID or EIN"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="yearsInBusiness" className="text-sm font-medium text-gray-700">
              Years in Business
            </label>
            <select
              id="yearsInBusiness"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select years</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="website" className="text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://your-company.com"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="contactPersonName" className="text-sm font-medium text-gray-700">
              Contact Person Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="contactPersonName"
                name="contactPersonName"
                type="text"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.contactPersonName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter contact person name"
              />
            </div>
            {errors.contactPersonName && (
              <p className="text-red-500 text-sm">{errors.contactPersonName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="contactTitle" className="text-sm font-medium text-gray-700">
              Title / Position
            </label>
            <input
              id="contactTitle"
              name="contactTitle"
              type="text"
              value={formData.contactTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Logistics Manager"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">
              Contact Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter contact email"
              />
            </div>
            {errors.contactEmail && (
              <p className="text-red-500 text-sm">{errors.contactEmail}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
              Contact Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.contactPhone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter contact phone"
              />
            </div>
            {errors.contactPhone && (
              <p className="text-red-500 text-sm">{errors.contactPhone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Address</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700">
              Street Address *
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter street address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium text-gray-700">
                State *
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select state</option>
                {stateOptions.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                ZIP Code *
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.zipCode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter ZIP code"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Typical Shipment Types *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shipmentTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`shipmentTypes_${type.toLowerCase().replace(/\s+/g, '_')}`}
                    checked={formData.typicalShipmentTypes.includes(type.toLowerCase().replace(/\s+/g, '_'))}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            {errors.typicalShipmentTypes && (
              <p className="text-red-500 text-sm mt-2">{errors.typicalShipmentTypes}</p>
            )}
          </div>

          <div>
            <label htmlFor="averageShipmentsPerMonth" className="text-sm font-medium text-gray-700">
              Average Shipments Per Month *
            </label>
            <select
              id="averageShipmentsPerMonth"
              name="averageShipmentsPerMonth"
              value={formData.averageShipmentsPerMonth}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.averageShipmentsPerMonth ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select average shipments</option>
              <option value="1-5">1-5 shipments</option>
              <option value="6-20">6-20 shipments</option>
              <option value="21-50">21-50 shipments</option>
              <option value="51-100">51-100 shipments</option>
              <option value="100+">100+ shipments</option>
            </select>
            {errors.averageShipmentsPerMonth && (
              <p className="text-red-500 text-sm">{errors.averageShipmentsPerMonth}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Preferred Shipping Methods
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shippingMethods.map(method => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`shippingMethods_${method.toLowerCase().replace(/\s+/g, '_')}`}
                    checked={formData.preferredShippingMethods.includes(method.toLowerCase().replace(/\s+/g, '_'))}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="companyDescription" className="text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell us about your company and shipping needs..."
            />
          </div>

          <div>
            <label htmlFor="specialRequirements" className="text-sm font-medium text-gray-700">
              Special Requirements
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Any special handling, timing, or delivery requirements..."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Documents</h3>
        <p className="text-sm text-gray-600 mb-4">Upload any relevant business documents (optional):</p>
        
        <div className="space-y-4">
          {[
            { type: 'business_license', label: 'Business License', required: false },
            { type: 'tax_id', label: 'Tax ID Certificate', required: false },
          ].map(({ type, label, required }) => (
            <div key={type} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleDocumentUpload(e, type as DocumentFile['type'])}
                  className="hidden"
                  id={`upload-${type}`}
                />
                <label
                  htmlFor={`upload-${type}`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </label>
              </div>
              
              {/* Show uploaded documents for this type */}
              {uploadedDocuments
                .filter(doc => doc.type === type)
                .map(doc => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{doc.name}</span>
                      {doc.status === 'uploading' && (
                        <span className="ml-2 text-xs text-blue-600">Uploading...</span>
                      )}
                      {doc.status === 'uploaded' && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                      )}
                      {doc.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </div>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/signup" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </Link>
          
          <div className="flex items-center mb-4">
            <Building className="text-primary text-3xl mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shipper Registration</h1>
              <p className="text-gray-600">Complete your profile to start shipping</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 2 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Company & Contact Information'}
              {currentStep === 2 && 'Shipping Details & Preferences'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us about your company and primary contact'}
              {currentStep === 2 && 'What do you ship and how often?'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mt-6">
                {errors.general}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>

              {currentStep < 2 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="px-6 bg-primary hover:bg-primary-700"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 bg-primary hover:bg-primary-700"
                >
                  {isLoading ? 'Submitting...' : 'Complete Registration'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
