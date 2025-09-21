'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  Globe, 
  Settings, 
  Trash2,
  Download,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  FileText,
  Cookie
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface PrivacySection {
  id: string;
  title: string;
  icon: any;
  content: string[];
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const lastUpdated = 'December 1, 2024';
  const effectiveDate = 'December 1, 2024';

  const privacySections: PrivacySection[] = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal Information: We collect information you provide directly, such as name, email address, phone number, and company details when you create an account.',
        'Profile Information: Business information, certifications, licenses, and other professional details for freight agents and shippers.',
        'Transaction Data: Information about freight requests, quotes, bookings, and payment transactions processed through our platform.',
        'Communication Data: Messages, support tickets, and other communications between users and with our support team.',
        'Usage Information: Data about how you use our platform, including pages visited, features used, and time spent on the platform.',
        'Device Information: Information about the device and browser you use to access our platform, including IP address, operating system, and browser type.',
        'Location Data: General location information based on IP address and, with your permission, precise location data from mobile devices.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Settings,
      content: [
        'Platform Operations: To provide, maintain, and improve our freight matching services and platform functionality.',
        'Account Management: To create and manage your account, verify your identity, and provide customer support.',
        'Matching Services: To connect shippers with appropriate freight agents based on location, capabilities, and preferences.',
        'Communication: To send you important updates, notifications about platform activity, and respond to your inquiries.',
        'Payment Processing: To process payments, prevent fraud, and maintain financial records in compliance with regulations.',
        'Safety and Security: To protect the platform and users from fraud, abuse, and other harmful activities.',
        'Legal Compliance: To comply with applicable laws, regulations, and legal processes.',
        'Analytics and Improvement: To analyze platform usage and improve our services, features, and user experience.'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Users,
      content: [
        'Between Users: We share relevant information between shippers and agents to facilitate freight transactions, including contact details and shipment information.',
        'Service Providers: We may share information with third-party service providers who help us operate the platform, process payments, or provide customer support.',
        'Business Partners: With your consent, we may share information with business partners who provide complementary services.',
        'Legal Requirements: We may disclose information when required by law, court order, or government request.',
        'Safety and Security: We may share information to investigate fraud, protect user safety, or enforce our terms of service.',
        'Business Transfers: In the event of a merger, acquisition, or sale of assets, user information may be transferred to the new entity.',
        'Aggregated Data: We may share aggregated, non-personally identifiable information for research, analytics, or marketing purposes.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security and Protection',
      icon: Lock,
      content: [
        'Encryption: We use industry-standard encryption to protect data in transit and at rest.',
        'Access Controls: We implement strict access controls to limit who can access your personal information.',
        'Regular Audits: We conduct regular security audits and assessments to identify and address potential vulnerabilities.',
        'Employee Training: Our employees receive training on data protection and privacy best practices.',
        'Incident Response: We have procedures in place to respond quickly to any data security incidents.',
        'Third-Party Security: We require our service providers to maintain appropriate security measures for your information.',
        'Data Minimization: We collect and retain only the information necessary to provide our services.',
        'Secure Infrastructure: Our platform is hosted on secure, regularly updated infrastructure with multiple layers of protection.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Privacy Rights',
      icon: Shield,
      content: [
        'Access: You have the right to access the personal information we have about you.',
        'Correction: You can request correction of inaccurate or incomplete personal information.',
        'Deletion: You may request deletion of your personal information, subject to certain limitations.',
        'Portability: You have the right to receive your personal information in a portable format.',
        'Opt-Out: You can opt out of certain communications and data processing activities.',
        'Restriction: You may request that we restrict the processing of your personal information in certain circumstances.',
        'Objection: You have the right to object to certain types of data processing.',
        'Withdrawal of Consent: Where processing is based on consent, you can withdraw that consent at any time.'
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies and Tracking Technologies',
      icon: Cookie,
      content: [
        'Essential Cookies: We use cookies necessary for the platform to function properly, such as authentication and security cookies.',
        'Analytics Cookies: We use cookies to understand how users interact with our platform and improve our services.',
        'Preference Cookies: These cookies remember your settings and preferences to enhance your user experience.',
        'Marketing Cookies: With your consent, we may use cookies for targeted advertising and marketing purposes.',
        'Third-Party Cookies: Some cookies are set by third-party services we use, such as analytics providers.',
        'Cookie Management: You can control cookie settings through your browser, though this may affect platform functionality.',
        'Do Not Track: We respect Do Not Track signals where technically feasible.',
        'Mobile Tracking: Our mobile apps may use device identifiers and other tracking technologies for analytics and functionality.'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention and Deletion',
      icon: Calendar,
      content: [
        'Retention Periods: We retain personal information only as long as necessary to provide our services and comply with legal obligations.',
        'Account Data: Active account information is retained while your account remains active and for a reasonable period after closure.',
        'Transaction Records: Financial and transaction data may be retained longer to comply with accounting and tax requirements.',
        'Communication Records: Support communications may be retained to improve our services and resolve future issues.',
        'Legal Requirements: Some information may be retained longer when required by law or for legal proceedings.',
        'Automatic Deletion: We have automated processes to delete certain types of data after specified retention periods.',
        'User-Requested Deletion: You can request deletion of your account and associated data, subject to legal and operational requirements.',
        'Backup Systems: Deleted data may remain in backup systems for a limited time before permanent deletion.'
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: Globe,
      content: [
        'Global Operations: CargoLinked operates globally, and your information may be transferred to and processed in countries other than your own.',
        'Adequate Protection: We ensure that international transfers are protected by appropriate safeguards, such as standard contractual clauses.',
        'Privacy Shield: Where applicable, we comply with Privacy Shield principles for transfers from the EU to the US.',
        'Local Laws: We comply with local data protection laws in jurisdictions where we operate.',
        'Transfer Mechanisms: We use approved transfer mechanisms such as adequacy decisions and binding corporate rules.',
        'User Consent: In some cases, we may rely on your explicit consent for international transfers.',
        'Data Localization: Where required by law, we may store certain data locally within specific jurisdictions.',
        'Cross-Border Cooperation: We may cooperate with international authorities on data protection matters.'
      ]
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: Users,
      content: [
        'Age Restrictions: Our platform is not intended for use by children under 13 years of age.',
        'No Knowing Collection: We do not knowingly collect personal information from children under 13.',
        'Parental Consent: If we become aware that we have collected information from a child under 13, we will seek parental consent or delete the information.',
        'Teen Users: Users between 13 and 18 should have parental permission before using our platform.',
        'Educational Use: Any educational or training programs involving minors require appropriate parental consent and supervision.',
        'Reporting: If you believe we have inadvertently collected information from a child, please contact us immediately.',
        'Compliance: We comply with applicable children\'s privacy laws, including COPPA in the United States.',
        'Special Protections: We implement additional protections for any information related to minors.'
      ]
    }
  ];

  const navigationItems = [
    { id: 'overview', title: 'Privacy Overview', icon: Eye },
    ...privacySections.map(section => ({ id: section.id, title: section.title, icon: section.icon })),
    { id: 'contact', title: 'Contact & Rights', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Privacy Policy" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Your privacy is important to us. This policy explains how we collect, use, and protect 
            your personal information when you use the CargoLinked platform.
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

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Privacy Policy
          </Button>
          <Link href="/contact-support">
            <Button variant="outline" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Privacy Questions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Privacy Topics</CardTitle>
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
                    <CardTitle>Privacy Policy Overview</CardTitle>
                    <CardDescription>
                      Key information about how we protect your privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-6">
                        At CargoLinked, we are committed to protecting your privacy and ensuring the security 
                        of your personal information. This Privacy Policy explains our practices regarding the 
                        collection, use, and disclosure of information when you use our freight matching platform.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-3">Our Privacy Commitments</h3>
                        <ul className="space-y-2 text-green-800">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>We collect only the information necessary to provide our services</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>We use industry-standard security measures to protect your data</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>We never sell your personal information to third parties</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>You have control over your personal information and privacy settings</span>
                          </li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {privacySections.slice(0, 6).map((section) => (
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

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Privacy Rights</h3>
                        <p className="text-blue-800 mb-4">
                          You have important rights regarding your personal information, including the right to 
                          access, correct, delete, and control how your information is used.
                        </p>
                        <Link href="#" onClick={() => setActiveSection('user-rights')}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Learn About Your Rights
                          </Button>
                        </Link>
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
                    Privacy Contact & Rights Requests
                  </CardTitle>
                  <CardDescription>
                    How to contact us about privacy matters and exercise your rights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">CargoLinked Privacy Team</p>
                        <p>Email: privacy@cargolinked.com</p>
                        <p>Phone: 1-800-CARGO-01 (Privacy Extension)</p>
                        <p>Address: 123 Freight Avenue, Logistics City, LC 12345</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Exercise Your Privacy Rights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Eye className="w-5 h-5 text-primary mr-2" />
                            <h5 className="font-medium">Access Your Data</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Request a copy of the personal information we have about you.
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            Request Data Access
                          </Button>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Settings className="w-5 h-5 text-primary mr-2" />
                            <h5 className="font-medium">Update Information</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Correct or update your personal information.
                          </p>
                          <Link href="/profile">
                            <Button size="sm" variant="outline" className="w-full">
                              Update Profile
                            </Button>
                          </Link>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Trash2 className="w-5 h-5 text-primary mr-2" />
                            <h5 className="font-medium">Delete Account</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Request deletion of your account and personal data.
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            Request Deletion
                          </Button>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Download className="w-5 h-5 text-primary mr-2" />
                            <h5 className="font-medium">Export Data</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Download your data in a portable format.
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Response Times</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>Privacy inquiries:</span>
                            <span className="font-medium">Within 5 business days</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Data access requests:</span>
                            <span className="font-medium">Within 30 days</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Deletion requests:</span>
                            <span className="font-medium">Within 30 days</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Data portability:</span>
                            <span className="font-medium">Within 30 days</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Related Resources</h4>
                      <div className="space-y-2">
                        <Link href="/terms-of-service" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Terms of Service
                        </Link>
                        <Link href="/safety-guidelines" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Safety Guidelines
                        </Link>
                        <Link href="/contact-support" className="flex items-center text-primary hover:underline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Contact Support
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {privacySections.map((section) => (
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
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Privacy Questions or Concerns?</h2>
            <p className="text-blue-100 mb-6">
              Our privacy team is here to help you understand and exercise your privacy rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Privacy Team
              </Button>
              <Link href="/help-center">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Visit Help Center
                </Button>
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-blue-400 text-sm text-blue-100">
              <p>Last updated: {lastUpdated} | Effective: {effectiveDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
