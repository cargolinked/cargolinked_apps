'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowLeft,
  Truck,
  Star,
  Clock,
  MapPin,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  shipments: {
    current: number;
    previous: number;
    change: number;
  };
  customers: {
    current: number;
    previous: number;
    change: number;
  };
  avgRating: {
    current: number;
    previous: number;
    change: number;
  };
}

interface ChartData {
  month: string;
  revenue: number;
  shipments: number;
  customers: number;
}

interface TopRoute {
  id: string;
  origin: string;
  destination: string;
  shipments: number;
  revenue: number;
  avgRating: number;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    revenue: { current: 45750, previous: 38200, change: 19.8 },
    shipments: { current: 156, previous: 142, change: 9.9 },
    customers: { current: 89, previous: 76, change: 17.1 },
    avgRating: { current: 4.8, previous: 4.6, change: 4.3 }
  };

  const chartData: ChartData[] = [
    { month: 'Jul', revenue: 32000, shipments: 120, customers: 65 },
    { month: 'Aug', revenue: 35500, shipments: 135, customers: 72 },
    { month: 'Sep', revenue: 38200, shipments: 142, customers: 76 },
    { month: 'Oct', revenue: 41800, shipments: 148, customers: 82 },
    { month: 'Nov', revenue: 43200, shipments: 152, customers: 85 },
    { month: 'Dec', revenue: 45750, shipments: 156, customers: 89 }
  ];

  const topRoutes: TopRoute[] = [
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      shipments: 24,
      revenue: 76800,
      avgRating: 4.9
    },
    {
      id: '2',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      shipments: 18,
      revenue: 50400,
      avgRating: 4.8
    },
    {
      id: '3',
      origin: 'Seattle, WA',
      destination: 'Phoenix, AZ',
      shipments: 15,
      revenue: 42000,
      avgRating: 4.7
    },
    {
      id: '4',
      origin: 'Detroit, MI',
      destination: 'Dallas, TX',
      shipments: 12,
      revenue: 36000,
      avgRating: 4.6
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'On-Time Delivery',
      value: 94.5,
      target: 95,
      unit: '%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      id: '2',
      name: 'Customer Satisfaction',
      value: 4.8,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      id: '3',
      name: 'Average Response Time',
      value: 2.3,
      target: 4,
      unit: 'hrs',
      trend: 'down',
      color: 'text-green-600'
    },
    {
      id: '4',
      name: 'Quote Win Rate',
      value: 68.2,
      target: 70,
      unit: '%',
      trend: 'stable',
      color: 'text-yellow-600'
    }
  ];

  const handleRefresh = async () => {
    setIsLoading(true);
    // TODO: Fetch fresh analytics data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // TODO: Generate and download analytics report
    console.log('Exporting analytics report');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <div className="w-4 h-4" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Truck className="text-primary text-2xl mr-3" />
                <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Track your performance and business insights</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button onClick={handleExport} className="bg-primary hover:bg-primary-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.revenue.current)}</p>
                  <div className={`flex items-center mt-1 ${getTrendColor(analyticsData.revenue.change)}`}>
                    {getTrendIcon(analyticsData.revenue.change)}
                    <span className="text-sm ml-1">{formatPercentage(analyticsData.revenue.change)}</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.shipments.current}</p>
                  <div className={`flex items-center mt-1 ${getTrendColor(analyticsData.shipments.change)}`}>
                    {getTrendIcon(analyticsData.shipments.change)}
                    <span className="text-sm ml-1">{formatPercentage(analyticsData.shipments.change)}</span>
                  </div>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.customers.current}</p>
                  <div className={`flex items-center mt-1 ${getTrendColor(analyticsData.customers.change)}`}>
                    {getTrendIcon(analyticsData.customers.change)}
                    <span className="text-sm ml-1">{formatPercentage(analyticsData.customers.change)}</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.avgRating.current}</p>
                  <div className={`flex items-center mt-1 ${getTrendColor(analyticsData.avgRating.change)}`}>
                    {getTrendIcon(analyticsData.avgRating.change)}
                    <span className="text-sm ml-1">{formatPercentage(analyticsData.avgRating.change)}</span>
                  </div>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-primary rounded-t w-full transition-all duration-300 hover:bg-primary-700"
                      style={{ height: `${(data.revenue / 50000) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators and targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        metric.value >= metric.target ? 'bg-green-500' : 
                        metric.value >= metric.target * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${metric.color}`}>
                        {metric.value}{metric.unit}
                      </span>
                      <span className="text-xs text-gray-500">
                        / {metric.target}{metric.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Routes */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Routes</CardTitle>
              <CardDescription>Most profitable shipping routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRoutes.map((route, index) => (
                  <div key={route.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <MapPin className="w-3 h-3 mr-1 text-green-600" />
                          <span>{route.origin}</span>
                          <span className="mx-2">→</span>
                          <MapPin className="w-3 h-3 mr-1 text-red-600" />
                          <span>{route.destination}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                          <span>{route.shipments} shipments</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                            <span>{route.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(route.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Business Insights</CardTitle>
              <CardDescription>Key insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Revenue Growth</h4>
                    <p className="text-sm text-green-700">Your revenue increased by 19.8% this month. Great job!</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Quote Win Rate</h4>
                    <p className="text-sm text-yellow-700">Your quote win rate is slightly below target. Consider adjusting pricing strategy.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Peak Season</h4>
                    <p className="text-sm text-blue-700">December is typically a high-demand month. Consider increasing capacity.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-900">Customer Satisfaction</h4>
                    <p className="text-sm text-purple-700">Your rating improved to 4.8/5. Customers love your service!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
