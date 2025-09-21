'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  FileText, 
  Calendar, 
  Scale, 
  Shield, 
  Users, 
  CreditCard, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  Print,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface TermsSection {
  id: string;
  title: string;
  icon: any;
  content: string[];
}

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const lastUpdated = 'December 1, 2024';
  const effectiveDate = 'December 1, 2024';

  const termsSections: TermsSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing or using the CargoLinked platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        'If you do not agree with any of these terms, you are prohibited from using or accessing this platform.',
        'These terms apply to all users of the platform, including but not limited to shippers, freight agents, and visitors.',
        'Your continued use of the platform constitutes acceptance of any modifications to these terms.'
      ]
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: FileText,
      content: [
        '"Platform" refers to the CargoLinked website, mobile applications, and all related services.',
        '"User" means any person or entity that accesses or uses the platform.',
        '"Shipper" refers to individuals or businesses posting freight requests.',
        '"Agent" refers to freight agents or carriers providing transportation services.',
        '"Services" means all features, tools, and functionality provided through the platform.',
        '"Content" includes all text, data, information, software, graphics, or other materials.'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      icon: Users,
      content: [
        'You must create an account to access certain features of the platform.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must provide accurate, current, and complete information during registration.',
        'You are responsible for all activities that occur under your account.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to suspend or terminate accounts that violate these terms.',
        'One person or entity may not maintain multiple accounts without our express permission.'
      ]
    },
    {
      id: 'platform-use',
      title: 'Platform Use and Restrictions',
      icon: Shield,
      content: [
        'You may use the platform only for lawful purposes and in accordance with these terms.',
        'You agree not to use the platform to transmit any unlawful, harmful, or objectionable content.',
        'You may not attempt to gain unauthorized access to any part of the platform.',
        'You may not use automated systems or software to extract data from the platform.',
        'You may not interfere with or disrupt the platform or servers connected to it.',
        'You may not impersonate any person or entity or misrepresent your affiliation.',
        'Commercial use of the platform is permitted only through authorized business accounts.'
      ]
    },
    {
      id: 'freight-services',
      title: 'Freight and Transportation Services',
      icon: Truck,
      content: [
        'CargoLinked is a platform that connects shippers with freight agents and does not provide transportation services directly.',
        'All transportation agreements are between shippers and agents; CargoLinked is not a party to these agreements.',
        'Users are responsible for compliance with all applicable transportation laws and regulations.',
        'Shippers must provide accurate information about their freight, including weight, dimensions, and special requirements.',
        'Agents must have appropriate licenses, insurance, and qualifications to provide transportation services.',
        'All users must comply with DOT regulations and other applicable transportation laws.',
        'CargoLinked does not guarantee the availability, quality, or timeliness of transportation services.'
      ]
    },
    {
      id: 'payments',
      title: 'Payments and Fees',
      icon: CreditCard,
      content: [
        'Platform fees and payment terms are described in our pricing policy.',
        'All fees are non-refundable unless otherwise specified.',
        'You are responsible for all taxes associated with your use of the platform.',
        'Payment processing is handled by third-party providers subject to their terms.',
        'We may change our fees with 30 days\' notice to users.',
        'Disputed charges must be reported within 60 days of the transaction.',
        'We reserve the right to suspend services for non-payment of fees.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Scale,
      content: [
        'CargoLinked\'s liability is limited to the maximum extent permitted by law.',
        'We are not liable for any indirect, incidental, special, or consequential damages.',
        'Our total liability shall not exceed the amount paid by you for platform services in the 12 months preceding the claim.',
        'We are not responsible for the actions or omissions of users or third parties.',
        'We do not warrant that the platform will be uninterrupted or error-free.',
        'You agree to indemnify CargoLinked against claims arising from your use of the platform.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: Shield,
      content: [
        'Your privacy is important to us. Please review our Privacy Policy for information about how we collect and use your data.',
        'By using the platform, you consent to the collection and use of your information as described in our Privacy Policy.',
        'We implement appropriate security measures to protect your personal information.',
        'You have certain rights regarding your personal data, as described in our Privacy Policy.',
        'We may share your information with third parties only as described in our Privacy Policy.',
        'You are responsible for the accuracy of the information you provide to us.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: AlertTriangle,
      content: [
        'Either party may terminate this agreement at any time with or without cause.',
        'We may suspend or terminate your account immediately if you violate these terms.',
        'Upon termination, your right to use the platform ceases immediately.',
        'Provisions that by their nature should survive termination will remain in effect.',
        'We may retain certain information as required by law or for legitimate business purposes.',
        'You remain liable for all obligations incurred prior to termination.'
      ]
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      icon: Calendar,
      content: [
        'We reserve the right to modify these terms at any time.',
        'Material changes will be communicated to users via email or platform notification.',
        'Continued use of the platform after changes constitutes acceptance of the new terms.',
        'If you do not agree to modified terms, you must discontinue use of the platform.',
        'We will maintain previous versions of terms for your reference.',
        'The effective date of any changes will be clearly indicated.'
      ]
    }
  ];

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: FileText },
    ...termsSections.map(section => ({ id: section.id, title: section.title, icon: section.icon })),
    { id: 'contact', title: 'Contact Information', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Terms of Service" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Please read these terms carefully before using the CargoLinked platform. 
            These terms govern your use of our services and establish the legal relationship between you and CargoLinked.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Effective: {effectiveDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" className="flex items-center">
            <Print className="w-4 h-4 mr-2" />
            Print Terms
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center text-sm ${
                        activeSection === item.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  ))}
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
                    <CardTitle>Terms of Service Overview</CardTitle>
                    <CardDescription>
                      Key points about using the CargoLinked platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-6">
                        Welcome to CargoLinked. These Terms of Service ("Terms") govern your use of our freight 
                        matching platform and related services. By using CargoLinked, you enter into a legally 
                        binding agreement with us.
                      </p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Points to Remember</h3>
                        <ul className="space-y-2 text-blue-800">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>CargoLinked is a platform that connects shippers with freight agents</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>You are responsible for compliance with all applicable laws and regulations</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Transportation agreements are between shippers and agents directly</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>We may modify these terms with appropriate notice</span>
                          </li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {termsSections.slice(0, 6).map((section) => (
                          <div
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-center mb-2">
                              <section.icon className="w-5 h-5 text-primary mr-2" />
                              <h4 className="font-semibold text-gray-900">{section.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              {section.content[0].substring(0, 100)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Legal Notice</h3>
                        <p className="text-yellow-800 mb-4">
                          These terms contain important provisions that limit our liability and require disputes 
                          to be resolved through arbitration. Please read them carefully.
                        </p>
                        <p className="text-sm text-yellow-700">
                          If you have questions about these terms, please contact our legal team before using the platform.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'contact' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    How to reach us regarding these Terms of Service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Legal Questions</h4>
                      <p className="text-gray-700 mb-2">
                        For questions about these Terms of Service, please contact our legal team:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">CargoLinked Legal Department</p>
                        <p>Email: legal@cargolinked.com</p>
                        <p>Phone: 1-800-CARGO-01 (Legal Extension)</p>
                        <p>Address: 123 Freight Avenue, Logistics City, LC 12345</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">General Support</h4>
                      <p className="text-gray-700 mb-2">
                        For general platform support and non-legal questions:
                      </p>
                      <div className="space-y-2">
                        <Link href="/contact-support" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Mail className="w-4 h-4 mr-2" />
                            Submit Support Ticket
                          </Button>
                        </Link>
                        <Link href="/help-center" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="w-4 h-4 mr-2" />
                            Browse Help Center
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Related Documents</h4>
                      <div className="space-y-2">
                        <Link href="/privacy-policy" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Privacy Policy
                        </Link>
                        <Link href="/safety-guidelines" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Safety Guidelines
                        </Link>
                        <Link href="/help-center" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Help Center
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {termsSections.map((section) => (
              activeSection === section.id && (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <section.icon className="w-6 h-6 mr-2" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="space-y-4">
                        {section.content.map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </div>

        {/* Footer */}
        <Card className="mt-12 bg-gray-900 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-gray-300 mb-6">
              Our legal team is available to help clarify any provisions in these Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Legal Team
              </Button>
              <Link href="/help-center">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  Visit Help Center
                </Button>
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
              <p>Last updated: {lastUpdated} | Effective: {effectiveDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
