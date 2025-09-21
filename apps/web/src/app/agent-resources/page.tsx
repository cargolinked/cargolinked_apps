'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  BookOpen, 
  Download, 
  Video, 
  Calculator, 
  FileText, 
  Truck, 
  DollarSign, 
  MapPin,
  Clock,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Play,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  Globe,
  Wrench,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface Resource {
  id: string;
  type: 'guide' | 'calculator' | 'template' | 'video' | 'webinar' | 'tool';
  category: string;
  title: string;
  description: string;
  downloadUrl?: string;
  externalUrl?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popular: boolean;
  new: boolean;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  url: string;
  category: string;
}

export default function AgentResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 6 },
    { id: 'operations', name: 'Operations', count: 8 },
    { id: 'business', name: 'Business Growth', count: 5 },
    { id: 'compliance', name: 'Compliance', count: 3 },
    { id: 'technology', name: 'Technology', count: 2 },
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'guide', name: 'Guides' },
    { id: 'calculator', name: 'Calculators' },
    { id: 'template', name: 'Templates' },
    { id: 'video', name: 'Videos' },
    { id: 'webinar', name: 'Webinars' },
    { id: 'tool', name: 'Tools' },
  ];

  const resources: Resource[] = [
    {
      id: '1',
      type: 'guide',
      category: 'getting-started',
      title: 'Complete Guide to Starting Your Freight Business',
      description: 'Everything you need to know to launch and grow a successful freight operation.',
      downloadUrl: '/resources/freight-business-guide.pdf',
      difficulty: 'beginner',
      popular: true,
      new: false
    },
    {
      id: '2',
      type: 'calculator',
      category: 'operations',
      title: 'Fuel Cost Calculator',
      description: 'Calculate fuel costs and optimize routes for maximum profitability.',
      externalUrl: '/tools/fuel-calculator',
      difficulty: 'beginner',
      popular: true,
      new: false
    },
    {
      id: '3',
      type: 'template',
      category: 'business',
      title: 'Rate Negotiation Templates',
      description: 'Professional templates for negotiating better rates with shippers.',
      downloadUrl: '/resources/rate-negotiation-templates.docx',
      difficulty: 'intermediate',
      popular: false,
      new: true
    },
    {
      id: '4',
      type: 'video',
      category: 'operations',
      title: 'Load Optimization Strategies',
      description: 'Learn how to maximize your truck utilization and reduce empty miles.',
      externalUrl: '/videos/load-optimization',
      duration: '15 min',
      difficulty: 'intermediate',
      popular: true,
      new: false
    },
    {
      id: '5',
      type: 'webinar',
      category: 'compliance',
      title: 'DOT Compliance Essentials',
      description: 'Stay compliant with federal regulations and avoid costly violations.',
      externalUrl: '/webinars/dot-compliance',
      duration: '45 min',
      difficulty: 'intermediate',
      popular: false,
      new: true
    },
    {
      id: '6',
      type: 'guide',
      category: 'technology',
      title: 'Digital Transformation for Freight Agents',
      description: 'Leverage technology to streamline operations and increase efficiency.',
      downloadUrl: '/resources/digital-transformation-guide.pdf',
      difficulty: 'advanced',
      popular: false,
      new: true
    }
  ];

  const tools: Tool[] = [
    {
      id: '1',
      name: 'Route Optimizer',
      description: 'Plan the most efficient routes and reduce fuel costs',
      icon: MapPin,
      url: '/tools/route-optimizer',
      category: 'operations'
    },
    {
      id: '2',
      name: 'Profit Calculator',
      description: 'Calculate profitability for individual loads and routes',
      icon: Calculator,
      url: '/tools/profit-calculator',
      category: 'business'
    },
    {
      id: '3',
      name: 'Maintenance Tracker',
      description: 'Track vehicle maintenance schedules and costs',
      icon: Wrench,
      url: '/tools/maintenance-tracker',
      category: 'operations'
    },
    {
      id: '4',
      name: 'Performance Dashboard',
      description: 'Monitor key metrics and business performance',
      icon: BarChart3,
      url: '/tools/performance-dashboard',
      category: 'business'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return BookOpen;
      case 'calculator': return Calculator;
      case 'template': return FileText;
      case 'video': return Video;
      case 'webinar': return Users;
      case 'tool': return Zap;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Agent Resources" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Agent Resources</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed as a freight agent. From getting started guides to advanced 
            business tools, we've got resources to help you grow your operation.
          </p>
        </div>

        {/* Quick Access Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.id} href={tool.url}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{resource.type}</span>
                        {resource.duration && (
                          <span className="text-xs text-gray-500">{resource.duration}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {resource.popular && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                      {resource.new && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                    
                    <div className="flex space-x-2">
                      {resource.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                      {resource.externalUrl && (
                        <Button size="sm">
                          {resource.type === 'video' || resource.type === 'webinar' ? (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              Watch
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Open
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Training & Webinars */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Training & Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-gray-600">December 15, 2024 • 2:00 PM EST</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Maximizing Profits in 2025: Advanced Strategies
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn cutting-edge strategies to increase your profitability and grow your freight business in the new year.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Free • 60 minutes</span>
                  <Button size="sm">Register Now</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-gray-600">December 22, 2024 • 1:00 PM EST</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technology Tools for Modern Freight Agents
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover the latest technology tools and platforms that can streamline your operations and boost efficiency.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Free • 45 minutes</span>
                  <Button size="sm">Register Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Metrics */}
        <Card className="mb-12 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Resource Impact</h2>
              <p className="text-gray-600">
                See how our resources are helping agents succeed
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
                <div className="text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-gray-600">Avg. Profit Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Success Stories</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Community Support
              </CardTitle>
              <CardDescription>
                Connect with other agents and share knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Agent Community Forum</h4>
                    <p className="text-sm text-gray-600">2,500+ active members</p>
                  </div>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Monthly Meetups</h4>
                    <p className="text-sm text-gray-600">Virtual and in-person events</p>
                  </div>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Mentorship Program</h4>
                    <p className="text-sm text-gray-600">Get paired with experienced agents</p>
                  </div>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Expert Support
              </CardTitle>
              <CardDescription>
                Get help from our team of freight experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">1-on-1 Consultation</h4>
                    <p className="text-sm text-gray-600">Personalized business advice</p>
                  </div>
                  <Button size="sm" variant="outline">Schedule</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Technical Support</h4>
                    <p className="text-sm text-gray-600">Platform and tool assistance</p>
                  </div>
                  <Link href="/contact-support">
                    <Button size="sm" variant="outline">Contact</Button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Business Reviews</h4>
                    <p className="text-sm text-gray-600">Quarterly performance analysis</p>
                  </div>
                  <Button size="sm" variant="outline">Request</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Something Specific?</h2>
            <p className="text-blue-100 mb-6">
              Can't find the resource you're looking for? Let us know what would help your business succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-support">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Request a Resource
                </Button>
              </Link>
              <Link href="/success-stories">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  View Success Stories
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
