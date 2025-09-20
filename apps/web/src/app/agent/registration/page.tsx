'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
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
  type: 'business_license' | 'insurance' | 'dot_number' | 'mc_number' | 'other';
  file: File;
  status: 'uploading' | 'uploaded' | 'error';
}

export default function AgentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentFile[]>([]);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    yearsInBusiness: '',
    website: '',
    
    // Contact Information
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Services & Coverage
    services: [] as string[],
    coverageAreas: [] as string[],
    equipmentTypes: [] as string[],
    
    // Insurance & Compliance
    insuranceProvider: '',
    insuranceAmount: '',
    dotNumber: '',
    mcNumber: '',
    
    // Additional Information
    description: '',
    specialties: '',
    emergencyContact: '',
    emergencyPhone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const serviceOptions = [
    'General Freight',
    'Refrigerated Transport',
    'Hazardous Materials',
    'Oversized Loads',
    'White Glove Service',
    'Expedited Shipping',
    'Cross Border',
    'Last Mile Delivery'
  ];

  const equipmentOptions = [
    'Dry Van',
    'Refrigerated Trailer',
    'Flatbed',
    'Container',
    'Tanker',
    'Car Carrier',
    'Heavy Haul',
    'Specialized Equipment'
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
      
      if (checkboxName.startsWith('services_') || checkboxName.startsWith('equipment_')) {
        const fieldName = checkboxName.split('_')[0] as 'services' | 'equipment';
        const optionValue = checkboxName.split('_')[1];
        
        setFormData(prev => ({
          ...prev,
          [fieldName]: checked 
            ? [...prev[fieldName], optionValue]
            : prev[fieldName].filter(item => item !== optionValue)
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
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.yearsInBusiness) newErrors.yearsInBusiness = 'Years in business is required';
      if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
      if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
      if (formData.equipmentTypes.length === 0) newErrors.equipmentTypes = 'Please select at least one equipment type';
    }

    if (step === 3) {
      if (!formData.insuranceProvider.trim()) newErrors.insuranceProvider = 'Insurance provider is required';
      if (!formData.insuranceAmount.trim()) newErrors.insuranceAmount = 'Insurance amount is required';
      if (!formData.dotNumber.trim()) newErrors.dotNumber = 'DOT number is required';
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
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // TODO: Implement actual registration with Supabase
      console.log('Agent registration:', formData);
      console.log('Uploaded documents:', uploadedDocuments);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/agent/dashboard');
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
              Business Name *
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.businessName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your business name"
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="businessType" className="text-sm font-medium text-gray-700">
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.businessType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select business type</option>
              <option value="sole_proprietorship">Sole Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="llc">LLC</option>
              <option value="corporation">Corporation</option>
              <option value="s_corp">S-Corporation</option>
            </select>
            {errors.businessType && (
              <p className="text-red-500 text-sm">{errors.businessType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="businessRegistrationNumber" className="text-sm font-medium text-gray-700">
              Business Registration Number
            </label>
            <input
              id="businessRegistrationNumber"
              name="businessRegistrationNumber"
              type="text"
              value={formData.businessRegistrationNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter registration number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="yearsInBusiness" className="text-sm font-medium text-gray-700">
              Years in Business *
            </label>
            <select
              id="yearsInBusiness"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.yearsInBusiness ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select years</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            {errors.yearsInBusiness && (
              <p className="text-red-500 text-sm">{errors.yearsInBusiness}</p>
            )}
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
            placeholder="https://your-website.com"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Address</h3>
        
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {serviceOptions.map(service => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                name={`services_${service.toLowerCase().replace(/\s+/g, '_')}`}
                checked={formData.services.includes(service.toLowerCase().replace(/\s+/g, '_'))}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
        {errors.services && (
          <p className="text-red-500 text-sm mt-2">{errors.services}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {equipmentOptions.map(equipment => (
            <label key={equipment} className="flex items-center">
              <input
                type="checkbox"
                name={`equipment_${equipment.toLowerCase().replace(/\s+/g, '_')}`}
                checked={formData.equipmentTypes.includes(equipment.toLowerCase().replace(/\s+/g, '_'))}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{equipment}</span>
            </label>
          ))}
        </div>
        {errors.equipmentTypes && (
          <p className="text-red-500 text-sm mt-2">{errors.equipmentTypes}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance & Compliance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="insuranceProvider" className="text-sm font-medium text-gray-700">
              Insurance Provider *
            </label>
            <input
              id="insuranceProvider"
              name="insuranceProvider"
              type="text"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.insuranceProvider ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter insurance provider"
            />
            {errors.insuranceProvider && (
              <p className="text-red-500 text-sm">{errors.insuranceProvider}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="insuranceAmount" className="text-sm font-medium text-gray-700">
              Insurance Amount *
            </label>
            <input
              id="insuranceAmount"
              name="insuranceAmount"
              type="text"
              value={formData.insuranceAmount}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.insuranceAmount ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., $1,000,000"
            />
            {errors.insuranceAmount && (
              <p className="text-red-500 text-sm">{errors.insuranceAmount}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="dotNumber" className="text-sm font-medium text-gray-700">
              DOT Number *
            </label>
            <input
              id="dotNumber"
              name="dotNumber"
              type="text"
              value={formData.dotNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.dotNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter DOT number"
            />
            {errors.dotNumber && (
              <p className="text-red-500 text-sm">{errors.dotNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="mcNumber" className="text-sm font-medium text-gray-700">
              MC Number
            </label>
            <input
              id="mcNumber"
              name="mcNumber"
              type="text"
              value={formData.mcNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter MC number"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
        <p className="text-sm text-gray-600 mb-4">Please upload the following documents for verification:</p>
        
        <div className="space-y-4">
          {[
            { type: 'business_license', label: 'Business License', required: true },
            { type: 'insurance', label: 'Insurance Certificate', required: true },
            { type: 'dot_number', label: 'DOT Registration', required: true },
            { type: 'mc_number', label: 'MC Authority (if applicable)', required: false },
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

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Business Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell us about your business and experience..."
            />
          </div>

          <div>
            <label htmlFor="specialties" className="text-sm font-medium text-gray-700">
              Specialties
            </label>
            <input
              id="specialties"
              name="specialties"
              type="text"
              value={formData.specialties}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Electronics, Medical Equipment, Automotive Parts"
            />
          </div>
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
            <Truck className="text-primary text-3xl mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agent Registration</h1>
              <p className="text-gray-600">Complete your profile to start earning</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
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
              {currentStep === 1 && 'Business & Contact Information'}
              {currentStep === 2 && 'Services & Location'}
              {currentStep === 3 && 'Insurance & Documents'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us about your business and how to contact you'}
              {currentStep === 2 && 'What services do you offer and where do you operate?'}
              {currentStep === 3 && 'Upload required documents and insurance information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

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

              {currentStep < 3 ? (
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
