import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  Users, 
  Shield, 
  Star, 
  MapPin, 
  Weight, 
  Calendar, 
  Clock,
  Search,
  List,
  Grid3X3,
  Bookmark,
  UserPlus,
  Play,
  CheckCircle,
  Phone,
  Mail,
  CreditCard,
  BarChart3,
  Smartphone,
  Headphones,
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Apple,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <Header currentPage="Home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Connect with Trusted Freight Agents
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of freight agents who find quality shipment requests daily. Browse active requests, submit competitive quotes, and grow your logistics business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary-700 flex items-center justify-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Join as Agent
                  </Button>
                </Link>
                <Link href="/browse-requests">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-4 text-lg font-semibold hover:bg-gray-50 flex items-center justify-center">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Requests
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2,450+</div>
                  <div className="text-sm text-gray-600">Active Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15,230</div>
                  <div className="text-sm text-gray-600">Completed Shipments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8/5</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-lg shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Truck className="w-32 h-32 text-white opacity-80" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">124 new requests today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Urgent Requests */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Urgent Freight Requests</h2>
            <p className="text-lg text-gray-600">High-priority shipments requiring immediate attention from qualified agents</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Urgent Request 1 */}
            <Card className="bg-red-50 border-red-200 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-status-urgent text-white text-xs px-2 py-1 rounded-full">URGENT</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Electronics Shipment</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>Los Angeles, CA → New York, NY</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Weight className="mr-2 h-4 w-4 text-primary" />
                    <span>2,500 lbs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>Pickup: Tomorrow</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">$3,200</div>
                  <Link href="/browse-requests">
                    <Button className="bg-primary hover:bg-primary-700">Quote Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* High Priority Request */}
            <Card className="bg-orange-50 border-orange-200 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-status-high text-white text-xs px-2 py-1 rounded-full">HIGH PRIORITY</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Medical Equipment</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>Chicago, IL → Miami, FL</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Weight className="mr-2 h-4 w-4 text-primary" />
                    <span>1,800 lbs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>Pickup: 2 days</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">$2,800</div>
                  <Link href="/browse-requests">
                    <Button className="bg-primary hover:bg-primary-700">Quote Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Premium Request */}
            <Card className="bg-yellow-50 border-yellow-200 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-status-premium text-white text-xs px-2 py-1 rounded-full">PREMIUM</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Automotive Parts</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>Detroit, MI → Dallas, TX</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Weight className="mr-2 h-4 w-4 text-primary" />
                    <span>3,200 lbs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>Pickup: 3 days</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">$4,100</div>
                  <Link href="/browse-requests">
                    <Button className="bg-primary hover:bg-primary-700">Quote Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by location, cargo type..." 
                  className="w-full sm:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                <option>All Cargo Types</option>
                <option>Electronics</option>
                <option>Automotive</option>
                <option>Medical</option>
                <option>Food & Beverage</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                <option>Distance Range</option>
                <option>0-100 miles</option>
                <option>100-500 miles</option>
                <option>500+ miles</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Showing 247 active requests</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button className="px-4 py-2 bg-primary text-white">
                  <List className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CargoLinked Works for Agents</h2>
            <p className="text-lg text-gray-600">Simple steps to start earning with quality freight opportunities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Create Your Profile</h3>
              <p className="text-gray-600">Set up your agent profile with credentials, equipment details, and service areas to attract quality clients.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Browse & Quote</h3>
              <p className="text-gray-600">Search through verified freight requests, review details, and submit competitive quotes to win jobs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Deliver & Earn</h3>
              <p className="text-gray-600">Complete shipments safely and on time, get paid securely, and build your reputation for more opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CargoLinked */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CargoLinked?</h2>
            <p className="text-lg text-gray-600">Comprehensive benefits designed to help freight agents succeed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary text-xl" />
                </div>
                <CardTitle className="text-xl">Verified Clients</CardTitle>
                <CardDescription>
                  All clients undergo thorough verification processes to ensure legitimate, high-quality freight opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="text-green-600 text-xl" />
                </div>
                <CardTitle className="text-xl">Secure Payments</CardTitle>
                <CardDescription>
                  Fast, secure payment processing with multiple options and protection against non-payment issues.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="text-purple-600 text-xl" />
                </div>
                <CardTitle className="text-xl">24/7 Support</CardTitle>
                <CardDescription>
                  Round-the-clock customer support to help resolve issues and answer questions whenever you need assistance.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-yellow-600 text-xl" />
                </div>
                <CardTitle className="text-xl">Performance Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics and insights to help you optimize your business and increase profitability.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="text-red-600 text-xl" />
                </div>
                <CardTitle className="text-xl">Mobile App</CardTitle>
                <CardDescription>
                  Manage your freight operations on-the-go with our comprehensive mobile application for iOS and Android.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-indigo-600 text-xl" />
                </div>
                <CardTitle className="text-xl">Agent Community</CardTitle>
                <CardDescription>
                  Connect with other successful agents, share insights, and learn best practices through our exclusive community.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Freight Business?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of successful agents earning more with quality freight opportunities</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary px-8 py-4 text-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Start as Agent Today
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-primary flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>No monthly fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Instant approval</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold">CargoLinked</span>
              </div>
              <p className="text-gray-400 mb-4">Connecting freight agents with quality shipment opportunities across the nation.</p>
              <div className="flex space-x-4">
                <Facebook className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
                <Twitter className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
                <Linkedin className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
                <Instagram className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Agents</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/browse-requests" className="hover:text-white cursor-pointer">Browse Requests</Link></li>
                <li><Link href="/agent/dashboard" className="hover:text-white cursor-pointer">Agent Dashboard</Link></li>
                <li><Link href="/payments" className="hover:text-white cursor-pointer">Payment Center</Link></li>
                <li><Link href="/success-stories" className="hover:text-white cursor-pointer">Success Stories</Link></li>
                <li><Link href="/agent-resources" className="hover:text-white cursor-pointer">Agent Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Shippers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/post-request" className="hover:text-white cursor-pointer">Post a Request</Link></li>
                <li><Link href="/browse-directory" className="hover:text-white cursor-pointer">Browse Directory</Link></li>
                <li><Link href="/shipper/dashboard" className="hover:text-white cursor-pointer">Shipper Dashboard</Link></li>
                <li><Link href="/tracking" className="hover:text-white cursor-pointer">Track Shipments</Link></li>
                <li><Link href="/subscription" className="hover:text-white cursor-pointer">Pricing Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help-center" className="hover:text-white cursor-pointer">Help Center</Link></li>
                <li><Link href="/contact-support" className="hover:text-white cursor-pointer">Contact Support</Link></li>
                <li><Link href="/safety-guidelines" className="hover:text-white cursor-pointer">Safety Guidelines</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-white cursor-pointer">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white cursor-pointer">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 CargoLinked. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Available on:</span>
              <Apple className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
              <PlayCircle className="text-gray-400 hover:text-white cursor-pointer h-5 w-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
