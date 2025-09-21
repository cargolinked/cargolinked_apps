'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageSquare, 
  Phone, 
  Mail, 
  Book, 
  HelpCircle, 
  FileText, 
  Video, 
  Download,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  url: string;
}

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', count: 45 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'posting-requests', name: 'Posting Requests', count: 12 },
    { id: 'payments', name: 'Payments & Billing', count: 10 },
    { id: 'tracking', name: 'Tracking & Delivery', count: 7 },
    { id: 'account', name: 'Account Management', count: 8 },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I create an account on CargoLinked?',
      answer: 'To create an account, click the "Sign Up" button in the top right corner of the homepage. Choose whether you\'re a shipper or agent, fill in your details, and verify your email address. Once verified, you can complete your profile and start using the platform.'
    },
    {
      id: '2',
      category: 'posting-requests',
      question: 'What information do I need to post a freight request?',
      answer: 'You\'ll need: pickup and delivery addresses, cargo type and weight, dimensions, preferred pickup date, any special handling requirements, and your budget range. The more detailed information you provide, the better quotes you\'ll receive from agents.'
    },
    {
      id: '3',
      category: 'payments',
      question: 'How do payments work on CargoLinked?',
      answer: 'Payments are processed securely through our platform. Shippers can pay via credit card, bank transfer, or ACH. Funds are held in escrow until delivery is confirmed. Agents receive payment within 24-48 hours after successful delivery confirmation.'
    },
    {
      id: '4',
      category: 'tracking',
      question: 'Can I track my shipment in real-time?',
      answer: 'Yes! Once your shipment is in transit, you can track it in real-time through your dashboard. You\'ll receive SMS and email updates at key milestones, and can view the current location and estimated delivery time.'
    },
    {
      id: '5',
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to your profile page by clicking on your avatar in the top right corner, then select "Profile". You can update your personal information, company details, contact information, and preferences. Don\'t forget to save your changes.'
    },
    {
      id: '6',
      category: 'getting-started',
      question: 'What\'s the difference between individual and business accounts?',
      answer: 'Individual accounts are for personal shipping needs, while business accounts offer additional features like multiple users, invoicing, analytics, and volume discounts. Business accounts also have higher transaction limits and priority support.'
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'Complete Guide to Posting Your First Freight Request',
      description: 'Step-by-step walkthrough of creating an effective freight request that attracts quality agents.',
      category: 'getting-started',
      readTime: '5 min read',
      url: '/help-center/posting-guide'
    },
    {
      id: '2',
      title: 'Understanding Freight Classifications and Pricing',
      description: 'Learn how freight is classified and how it affects your shipping costs.',
      category: 'posting-requests',
      readTime: '8 min read',
      url: '/help-center/freight-classification'
    },
    {
      id: '3',
      title: 'Payment Security and Escrow Protection',
      description: 'How CargoLinked protects your payments and ensures secure transactions.',
      category: 'payments',
      readTime: '4 min read',
      url: '/help-center/payment-security'
    },
    {
      id: '4',
      title: 'Tracking Your Shipment: A Complete Guide',
      description: 'Everything you need to know about monitoring your freight from pickup to delivery.',
      category: 'tracking',
      readTime: '6 min read',
      url: '/help-center/tracking-guide'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Help Center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions, browse helpful articles, and get the support you need to succeed with CargoLinked.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat Support</h3>
                <p className="text-gray-600">Get instant help from our support team</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="mailto:support@cargolinked.com">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600">Send us an email and we'll respond within 24 hours</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="tel:+1-800-CARGO-01">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600">Call us Monday-Friday, 8 AM - 8 PM EST</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white bg-opacity-20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Popular Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Popular Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                        <Link href={article.url}>
                          <Button size="sm" variant="outline">
                            Read More
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Video className="w-6 h-6 mr-2" />
                Video Tutorials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Getting Started with CargoLinked
                    </h3>
                    <p className="text-gray-600 mb-4">
                      A comprehensive overview of how to use CargoLinked for your freight needs.
                    </p>
                    <Button className="w-full">
                      Watch Video (5:30)
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How to Post Your First Request
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Step-by-step guide to creating an effective freight request.
                    </p>
                    <Button className="w-full">
                      Watch Video (3:45)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Still Need Help */}
            <Card className="bg-primary text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                <p className="text-blue-100 mb-6">
                  Can't find what you're looking for? Our support team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/messages">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/agent-resources">
                    <Button className="bg-white text-primary hover:bg-gray-100">
                      Browse Resources
                    </Button>
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
