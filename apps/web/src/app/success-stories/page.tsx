'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Star, 
  Quote, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Award, 
  Building,
  Truck,
  Package,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface SuccessStory {
  id: string;
  type: 'agent' | 'shipper' | 'partnership';
  title: string;
  company: string;
  industry: string;
  location: string;
  image: string;
  quote: string;
  author: string;
  position: string;
  metrics: {
    label: string;
    value: string;
    icon: any;
  }[];
  challenge: string;
  solution: string;
  results: string[];
  featured: boolean;
  videoUrl?: string;
}

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'All Stories', count: 12 },
    { id: 'agent', name: 'Agent Success', count: 6 },
    { id: 'shipper', name: 'Shipper Success', count: 4 },
    { id: 'partnership', name: 'Partnerships', count: 2 },
  ];

  const successStories: SuccessStory[] = [
    {
      id: '1',
      type: 'agent',
      title: 'From Local Hauler to Regional Powerhouse',
      company: 'Midwest Express Logistics',
      industry: 'Transportation',
      location: 'Chicago, IL',
      image: '/api/placeholder/400/300',
      quote: 'CargoLinked transformed our business. We went from struggling to find loads to having more opportunities than we can handle.',
      author: 'Mike Rodriguez',
      position: 'Owner & Operator',
      metrics: [
        { label: 'Revenue Increase', value: '340%', icon: TrendingUp },
        { label: 'Monthly Loads', value: '150+', icon: Package },
        { label: 'Fleet Growth', value: '12 trucks', icon: Truck }
      ],
      challenge: 'Mike was spending hours each day cold-calling shippers and brokers, often driving empty miles between jobs. His small fleet was underutilized, and cash flow was inconsistent.',
      solution: 'After joining CargoLinked, Mike optimized his routes using our matching algorithm, built relationships with verified shippers, and leveraged our payment protection services.',
      results: [
        'Reduced empty miles by 65%',
        'Increased average rate per mile by $0.45',
        'Expanded fleet from 3 to 12 trucks in 18 months',
        'Established contracts with 15 regular shippers'
      ],
      featured: true,
      videoUrl: '/videos/mike-success-story.mp4'
    },
    {
      id: '2',
      type: 'shipper',
      title: 'Scaling E-commerce Fulfillment Nationwide',
      company: 'TechGear Direct',
      industry: 'E-commerce',
      location: 'Austin, TX',
      image: '/api/placeholder/400/300',
      quote: 'CargoLinked gave us the flexibility to scale our shipping operations without the overhead of managing carrier relationships.',
      author: 'Sarah Chen',
      position: 'VP of Operations',
      metrics: [
        { label: 'Cost Savings', value: '28%', icon: DollarSign },
        { label: 'Delivery Speed', value: '2x faster', icon: Clock },
        { label: 'Coverage Area', value: '48 states', icon: MapPin }
      ],
      challenge: 'TechGear Direct was growing rapidly but struggled with inconsistent shipping costs and delivery times. Managing multiple carrier relationships was becoming overwhelming.',
      solution: 'Using CargoLinked\'s shipper platform, TechGear automated their freight posting process and gained access to a network of pre-vetted carriers with competitive rates.',
      results: [
        'Reduced shipping costs by 28% on average',
        'Improved on-time delivery rate to 98.5%',
        'Expanded same-day delivery to 12 major cities',
        'Streamlined operations with automated booking'
      ],
      featured: true
    },
    {
      id: '3',
      type: 'agent',
      title: 'Specialized Hauling Success Story',
      company: 'Heavy Duty Transport Co.',
      industry: 'Heavy Haul',
      location: 'Houston, TX',
      image: '/api/placeholder/400/300',
      quote: 'The specialized freight matching on CargoLinked helped us find high-value loads that match our equipment perfectly.',
      author: 'James Wilson',
      position: 'Fleet Manager',
      metrics: [
        { label: 'Rate Increase', value: '$2.85/mile', icon: DollarSign },
        { label: 'Utilization', value: '95%', icon: TrendingUp },
        { label: 'Repeat Customers', value: '80%', icon: Users }
      ],
      challenge: 'Heavy Duty Transport specialized in oversized loads but struggled to find consistent work that matched their specialized equipment and permits.',
      solution: 'CargoLinked\'s specialized freight categories and detailed equipment matching helped connect them with shippers needing heavy haul services.',
      results: [
        'Increased average rate to $2.85 per mile',
        'Achieved 95% equipment utilization',
        '80% of business now comes from repeat customers',
        'Reduced permit and routing complexity'
      ],
      featured: false
    },
    {
      id: '4',
      type: 'shipper',
      title: 'Manufacturing Supply Chain Optimization',
      company: 'American Steel Works',
      industry: 'Manufacturing',
      location: 'Pittsburgh, PA',
      image: '/api/placeholder/400/300',
      quote: 'CargoLinked\'s network helped us maintain just-in-time delivery even during supply chain disruptions.',
      author: 'Robert Thompson',
      position: 'Logistics Director',
      metrics: [
        { label: 'On-Time Rate', value: '99.2%', icon: Clock },
        { label: 'Cost Reduction', value: '15%', icon: DollarSign },
        { label: 'Carrier Network', value: '200+', icon: Users }
      ],
      challenge: 'American Steel Works needed reliable transportation for time-sensitive steel deliveries to construction sites across the region.',
      solution: 'CargoLinked\'s real-time tracking and extensive carrier network provided the reliability and visibility needed for critical deliveries.',
      results: [
        'Maintained 99.2% on-time delivery rate',
        'Reduced transportation costs by 15%',
        'Built relationships with 200+ verified carriers',
        'Improved customer satisfaction scores by 25%'
      ],
      featured: false
    },
    {
      id: '5',
      type: 'partnership',
      title: 'Strategic Partnership Drives Growth',
      company: 'Regional Logistics Alliance',
      industry: 'Logistics',
      location: 'Multi-State',
      image: '/api/placeholder/400/300',
      quote: 'Our partnership with CargoLinked created a win-win situation for all members of our logistics alliance.',
      author: 'Maria Gonzalez',
      position: 'Alliance Coordinator',
      metrics: [
        { label: 'Member Growth', value: '150%', icon: Users },
        { label: 'Load Volume', value: '5,000/month', icon: Package },
        { label: 'Coverage', value: '12 states', icon: MapPin }
      ],
      challenge: 'The Regional Logistics Alliance needed a platform to help their member companies collaborate and share freight opportunities efficiently.',
      solution: 'CargoLinked\'s partnership program provided white-label solutions and API integration to create a seamless experience for alliance members.',
      results: [
        'Increased alliance membership by 150%',
        'Facilitated 5,000+ loads per month between members',
        'Expanded coverage to 12 states',
        'Created $50M+ in new business opportunities'
      ],
      featured: true
    },
    {
      id: '6',
      type: 'agent',
      title: 'Technology-Driven Efficiency Gains',
      company: 'Smart Haul Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      image: '/api/placeholder/400/300',
      quote: 'CargoLinked\'s API integration allowed us to automate our entire load booking process.',
      author: 'David Kim',
      position: 'CTO',
      metrics: [
        { label: 'Automation', value: '90%', icon: TrendingUp },
        { label: 'Processing Time', value: '5 minutes', icon: Clock },
        { label: 'Error Reduction', value: '85%', icon: Award }
      ],
      challenge: 'Smart Haul Solutions wanted to leverage technology to automate their freight operations but needed a platform with robust API capabilities.',
      solution: 'CargoLinked\'s comprehensive API allowed Smart Haul to integrate freight matching directly into their existing TMS and automate the entire process.',
      results: [
        'Automated 90% of load booking processes',
        'Reduced booking time from 2 hours to 5 minutes',
        'Decreased operational errors by 85%',
        'Improved driver satisfaction through better load matching'
      ],
      featured: false
    }
  ];

  const filteredStories = successStories.filter(story => {
    const matchesCategory = selectedCategory === 'all' || story.type === selectedCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStories = successStories.filter(story => story.featured);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % featuredStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Success Stories" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Success Stories</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how businesses across the freight industry are achieving remarkable results with CargoLinked. 
            From small owner-operators to large enterprises, see real success stories from our community.
          </p>
        </div>

        {/* Featured Story Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Success Stories</h2>
          <Card className="overflow-hidden">
            <div className="relative">
              {featuredStories.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{featuredStories[currentStoryIndex].company}</h3>
                        <p className="text-gray-600">{featuredStories[currentStoryIndex].industry} • {featuredStories[currentStoryIndex].location}</p>
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{featuredStories[currentStoryIndex].title}</h4>
                    
                    <div className="flex items-start mb-6">
                      <Quote className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg text-gray-700 italic mb-2">{featuredStories[currentStoryIndex].quote}</p>
                        <p className="text-sm text-gray-600">
                          — {featuredStories[currentStoryIndex].author}, {featuredStories[currentStoryIndex].position}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {featuredStories[currentStoryIndex].metrics.map((metric, index) => {
                        const IconComponent = metric.icon;
                        return (
                          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary mx-auto mb-1" />
                            <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                            <div className="text-xs text-gray-600">{metric.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex space-x-4">
                      <Button className="flex-1">
                        Read Full Story
                      </Button>
                      {featuredStories[currentStoryIndex].videoUrl && (
                        <Button variant="outline" className="flex items-center">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="w-24 h-24 text-white opacity-80" />
                    </div>
                  </div>
                </div>
              )}

              {/* Carousel Controls */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={prevStory}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={nextStory}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStoryIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.company}</h3>
                    <p className="text-sm text-gray-600">{story.industry}</p>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-3">{story.title}</h4>

                <div className="flex items-start mb-4">
                  <Quote className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 italic">"{story.quote}"</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {story.metrics.slice(0, 2).map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <div key={index} className="text-center p-2 bg-gray-50 rounded">
                        <IconComponent className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {story.location}
                  </div>
                  <Button size="sm" variant="outline">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="mb-12 bg-gradient-to-r from-primary to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Success by the Numbers</h2>
              <p className="text-blue-100">
                Real results from real businesses using CargoLinked
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$50M+</div>
                <div className="text-blue-100">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25,000+</div>
                <div className="text-blue-100">Successful Shipments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98.5%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <div className="text-blue-100">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of successful businesses already using CargoLinked to grow their freight operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="px-8">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact-support">
                <Button size="lg" variant="outline" className="px-8">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>2,500+ Active Users</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>Industry Leading Platform</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
