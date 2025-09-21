'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Truck, 
  Package, 
  Users, 
  FileText, 
  Download, 
  ExternalLink,
  Phone,
  Mail,
  Clock,
  MapPin,
  Weight,
  Thermometer,
  Zap,
  Droplets,
  Eye,
  HardHat,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface SafetyTopic {
  id: string;
  title: string;
  icon: any;
  description: string;
  guidelines: string[];
  resources?: string[];
}

export default function SafetyGuidelinesPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const safetyTopics: SafetyTopic[] = [
    {
      id: 'cargo-handling',
      title: 'Cargo Handling & Loading',
      icon: Package,
      description: 'Proper procedures for safe loading, securing, and unloading of freight.',
      guidelines: [
        'Always inspect cargo for damage before loading',
        'Use proper lifting techniques and equipment for heavy items',
        'Secure all cargo with appropriate tie-downs and restraints',
        'Distribute weight evenly across the trailer',
        'Never exceed vehicle weight limits or cargo capacity',
        'Use proper personal protective equipment (PPE)',
        'Follow specific handling instructions for fragile items',
        'Document any pre-existing damage with photos'
      ],
      resources: [
        'Cargo Securement Handbook (PDF)',
        'Weight Distribution Guide',
        'PPE Requirements Checklist'
      ]
    },
    {
      id: 'hazmat',
      title: 'Hazardous Materials',
      icon: AlertTriangle,
      description: 'Special safety protocols for transporting dangerous goods and hazardous materials.',
      guidelines: [
        'Verify proper hazmat certification before transport',
        'Use appropriate placards and labeling',
        'Carry required safety data sheets (SDS)',
        'Follow specific loading and segregation requirements',
        'Maintain proper ventilation during transport',
        'Have emergency response procedures readily available',
        'Report any spills or incidents immediately',
        'Ensure proper driver training and certification'
      ],
      resources: [
        'DOT Hazmat Regulations',
        'Emergency Response Guide',
        'Hazmat Certification Requirements'
      ]
    },
    {
      id: 'vehicle-safety',
      title: 'Vehicle Safety & Maintenance',
      icon: Truck,
      description: 'Regular maintenance and safety checks to ensure vehicle roadworthiness.',
      guidelines: [
        'Conduct pre-trip inspections before every journey',
        'Check tire condition, pressure, and tread depth',
        'Inspect brakes, lights, and safety equipment',
        'Verify proper fluid levels (oil, coolant, brake fluid)',
        'Test all electronic systems and GPS equipment',
        'Ensure emergency equipment is present and functional',
        'Document all maintenance and repairs',
        'Address any safety issues before departure'
      ],
      resources: [
        'Pre-Trip Inspection Checklist',
        'Maintenance Schedule Template',
        'DOT Vehicle Requirements'
      ]
    },
    {
      id: 'driver-safety',
      title: 'Driver Safety & Compliance',
      icon: Users,
      description: 'Safety protocols and compliance requirements for professional drivers.',
      guidelines: [
        'Maintain valid commercial driver\'s license (CDL)',
        'Follow hours of service regulations',
        'Use electronic logging devices (ELD) as required',
        'Avoid distracted driving and mobile phone use',
        'Take regular breaks and manage fatigue',
        'Follow speed limits and traffic regulations',
        'Report any accidents or incidents immediately',
        'Maintain professional conduct with customers'
      ],
      resources: [
        'Hours of Service Guide',
        'ELD Compliance Manual',
        'Driver Safety Training'
      ]
    },
    {
      id: 'weather-conditions',
      title: 'Weather & Road Conditions',
      icon: Thermometer,
      description: 'Guidelines for safe operation in adverse weather and road conditions.',
      guidelines: [
        'Monitor weather forecasts and road conditions',
        'Adjust driving speed for conditions',
        'Increase following distance in poor weather',
        'Use appropriate tire chains when required',
        'Avoid driving in severe weather when possible',
        'Carry emergency supplies and equipment',
        'Know when to stop and wait for conditions to improve',
        'Communicate delays to dispatch and customers'
      ],
      resources: [
        'Weather Safety Guide',
        'Winter Driving Tips',
        'Emergency Supply Checklist'
      ]
    },
    {
      id: 'security',
      title: 'Cargo Security & Theft Prevention',
      icon: Lock,
      description: 'Measures to protect cargo from theft and unauthorized access.',
      guidelines: [
        'Use high-security seals and locks',
        'Park in well-lit, secure areas when possible',
        'Avoid discussing cargo details in public',
        'Vary routes and timing when carrying high-value cargo',
        'Report suspicious activity immediately',
        'Keep cargo doors locked when unattended',
        'Use GPS tracking and monitoring systems',
        'Follow customer-specific security requirements'
      ],
      resources: [
        'Cargo Security Best Practices',
        'Theft Prevention Guide',
        'High-Value Cargo Protocols'
      ]
    }
  ];

  const emergencyContacts = [
    {
      title: 'Emergency Services',
      number: '911',
      description: 'For immediate life-threatening emergencies'
    },
    {
      title: 'DOT Emergency Hotline',
      number: '1-800-424-8802',
      description: 'For hazmat incidents and transportation emergencies'
    },
    {
      title: 'CargoLinked 24/7 Support',
      number: '1-800-CARGO-01',
      description: 'For platform-related emergencies and support'
    },
    {
      title: 'Poison Control',
      number: '1-800-222-1222',
      description: 'For chemical exposure and poisoning incidents'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Safety Guidelines" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Safety Guidelines</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety protocols and best practices to ensure secure, compliant, and professional freight operations.
          </p>
        </div>

        {/* Safety Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Safety</h2>
                <p className="text-gray-700 mb-4">
                  At CargoLinked, safety is our top priority. These guidelines are designed to protect drivers, cargo, 
                  and the public while ensuring compliance with all applicable regulations. All platform users are 
                  expected to follow these safety protocols.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">DOT Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Industry Best Practices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Regular Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Safety Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === 'overview'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Overview
                  </button>
                  {safetyTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setActiveSection(topic.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                        activeSection === topic.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <topic.icon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{topic.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveSection('emergency')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === 'emergency'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Emergency Contacts
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Safety Guidelines Overview</CardTitle>
                    <CardDescription>
                      Essential safety information for all freight operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {safetyTopics.map((topic) => {
                        const IconComponent = topic.icon;
                        return (
                          <div
                            key={topic.id}
                            onClick={() => setActiveSection(topic.id)}
                            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-5 h-5 text-primary" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                                <p className="text-sm text-gray-600">{topic.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Reference */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Before Every Trip</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Complete pre-trip vehicle inspection
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Verify cargo documentation
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Check weather and route conditions
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Ensure emergency equipment is present
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">In Case of Emergency</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                            Ensure personal safety first
                          </li>
                          <li className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                            Call 911 for life-threatening situations
                          </li>
                          <li className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                            Notify CargoLinked support immediately
                          </li>
                          <li className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                            Document incident with photos/notes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'emergency' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>
                    Important phone numbers for emergency situations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{contact.title}</h3>
                          <a
                            href={`tel:${contact.number}`}
                            className="text-lg font-bold text-primary hover:underline"
                          >
                            {contact.number}
                          </a>
                        </div>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Important Reminder</h4>
                        <p className="text-sm text-red-800">
                          Always call 911 first for life-threatening emergencies. Other contacts are for 
                          reporting and coordination purposes after ensuring immediate safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {safetyTopics.map((topic) => (
              activeSection === topic.id && (
                <div key={topic.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <topic.icon className="w-6 h-6 mr-2" />
                        {topic.title}
                      </CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Safety Guidelines</h4>
                        <ul className="space-y-3">
                          {topic.guidelines.map((guideline, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{guideline}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {topic.resources && (
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Additional Resources</h4>
                            <div className="space-y-2">
                              {topic.resources.map((resource, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-700">{resource}</span>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Safety?</h2>
            <p className="text-blue-100 mb-6">
              Our safety team is here to help. Contact us for clarification on any safety guidelines or to report safety concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-support">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Safety Team
                </Button>
              </Link>
              <Link href="/help-center">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Browse Help Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
