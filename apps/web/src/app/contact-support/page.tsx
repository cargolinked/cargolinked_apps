'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  Upload, 
  X, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Bug,
  CreditCard,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface SupportTicket {
  subject: string;
  category: string;
  priority: string;
  description: string;
  attachments: File[];
}

export default function ContactSupportPage() {
  const [activeTab, setActiveTab] = useState('ticket');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticket, setTicket] = useState<SupportTicket>({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    attachments: []
  });

  const categories = [
    { id: 'account', name: 'Account Issues', icon: HelpCircle },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard },
    { id: 'technical', name: 'Technical Support', icon: Bug },
    { id: 'shipping', name: 'Shipping Questions', icon: Truck },
    { id: 'general', name: 'General Inquiry', icon: MessageSquare }
  ];

  const priorities = [
    { id: 'low', name: 'Low', description: 'General questions, non-urgent issues' },
    { id: 'medium', name: 'Medium', description: 'Standard support requests' },
    { id: 'high', name: 'High', description: 'Urgent issues affecting your business' },
    { id: 'critical', name: 'Critical', description: 'System down, payment issues' }
  ];

  const handleInputChange = (field: keyof SupportTicket, value: any) => {
    setTicket(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setTicket(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setTicket(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="Contact Support" />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Submitted Successfully!</h1>
              <p className="text-gray-600 mb-6">
                We&apos;ve received your support request and will respond within 24 hours. 
                Your ticket ID is <strong>#CS-2024-{Math.floor(Math.random() * 10000)}</strong>
              </p>
              <div className="space-y-4">
                <Link href="/help-center">
                  <Button className="w-full">
                    Browse Help Center
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setTicket({
                      subject: '',
                      category: '',
                      priority: 'medium',
                      description: '',
                      attachments: []
                    });
                  }}
                >
                  Submit Another Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Contact Support" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help? We&apos;re here for you. Choose how you&apos;d like to get in touch with our support team.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <p className="text-sm text-gray-500 mb-4">Available 24/7</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak directly with a support agent</p>
              <p className="text-sm text-gray-500 mb-4">Mon-Fri, 8 AM - 8 PM EST</p>
              <Button variant="outline" className="w-full">
                Call +1-800-CARGO-01
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <p className="text-sm text-gray-500 mb-4">Response within 24 hours</p>
              <Button variant="outline" className="w-full">
                Email Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Provide detailed information about your issue and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={ticket.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleInputChange('category', category.id)}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              ticket.category === category.id
                                ? 'border-primary bg-primary bg-opacity-10 text-primary'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center">
                              <IconComponent className="w-5 h-5 mr-2" />
                              <span className="font-medium">{category.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <div className="space-y-2">
                      {priorities.map((priority) => (
                        <label key={priority.id} className="flex items-start">
                          <input
                            type="radio"
                            name="priority"
                            value={priority.id}
                            checked={ticket.priority === priority.id}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{priority.name}</div>
                            <div className="text-sm text-gray-600">{priority.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={6}
                      value={ticket.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Please provide as much detail as possible about your issue, including steps to reproduce, error messages, and what you expected to happen."
                    />
                  </div>

                  {/* File Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Max 10MB per file. Supported: JPG, PNG, PDF, DOC, DOCX
                      </p>
                    </div>
                    
                    {/* Attachment List */}
                    {ticket.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {ticket.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !ticket.subject || !ticket.category || !ticket.description}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Critical Issues</span>
                    <span className="text-sm font-medium">< 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">High Priority</span>
                    <span className="text-sm font-medium">< 4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Medium Priority</span>
                    <span className="text-sm font-medium">< 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Low Priority</span>
                    <span className="text-sm font-medium">< 48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monday - Friday</span>
                    <span className="text-sm font-medium">8 AM - 8 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Saturday</span>
                    <span className="text-sm font-medium">10 AM - 4 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sunday</span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Emergency support available 24/7 for critical issues
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/help-center" className="block text-sm text-primary hover:underline">
                    Help Center & FAQs
                  </Link>
                  <Link href="/safety-guidelines" className="block text-sm text-primary hover:underline">
                    Safety Guidelines
                  </Link>
                  <Link href="/terms-of-service" className="block text-sm text-primary hover:underline">
                    Terms of Service
                  </Link>
                  <Link href="/privacy-policy" className="block text-sm text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
