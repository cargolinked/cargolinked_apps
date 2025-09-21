'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Truck, 
  Search, 
  Calendar, 
  User,
  Tag,
  ArrowRight,
  Clock,
  Eye,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  comments: number;
  tags: string[];
}

interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - in real app, this would come from API
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Freight: How AI is Transforming Logistics',
      slug: 'future-of-freight-ai-transforming-logistics',
      excerpt: 'Discover how artificial intelligence is revolutionizing the freight industry, from route optimization to predictive maintenance.',
      content: 'Full article content...',
      featuredImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop',
      category: { name: 'Technology', slug: 'technology' },
      author: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      publishedAt: '2024-12-20',
      readTime: 8,
      views: 1250,
      comments: 15,
      tags: ['AI', 'Technology', 'Innovation']
    },
    {
      id: '2',
      title: '10 Essential Tips for New Freight Agents',
      slug: 'essential-tips-new-freight-agents',
      excerpt: 'Starting your career as a freight agent? Here are the top 10 tips to help you succeed in the competitive logistics industry.',
      content: 'Full article content...',
      featuredImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
      category: { name: 'Tips & Guides', slug: 'tips-guides' },
      author: { name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      publishedAt: '2024-12-18',
      readTime: 6,
      views: 890,
      comments: 23,
      tags: ['Tips', 'Career', 'Beginner']
    },
    {
      id: '3',
      title: 'CargoLinked Launches New Mobile App Features',
      slug: 'cargolinked-new-mobile-app-features',
      excerpt: 'We\'re excited to announce several new features in our mobile app that will make freight management even easier.',
      content: 'Full article content...',
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      category: { name: 'Company Updates', slug: 'company-updates' },
      author: { name: 'CargoLinked Team', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face' },
      publishedAt: '2024-12-15',
      readTime: 4,
      views: 2100,
      comments: 8,
      tags: ['Mobile App', 'Features', 'Updates']
    },
    {
      id: '4',
      title: 'Understanding Freight Insurance: A Complete Guide',
      slug: 'understanding-freight-insurance-complete-guide',
      excerpt: 'Everything you need to know about freight insurance, from basic coverage to specialized policies for high-value cargo.',
      content: 'Full article content...',
      featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
      category: { name: 'Tips & Guides', slug: 'tips-guides' },
      author: { name: 'Lisa Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      publishedAt: '2024-12-12',
      readTime: 12,
      views: 1560,
      comments: 31,
      tags: ['Insurance', 'Guide', 'Risk Management']
    },
    {
      id: '5',
      title: 'Industry Report: Freight Rates Trends for 2025',
      slug: 'freight-rates-trends-2025-industry-report',
      excerpt: 'Our comprehensive analysis of freight rate trends and what to expect in the coming year.',
      content: 'Full article content...',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      category: { name: 'Industry News', slug: 'industry-news' },
      author: { name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      publishedAt: '2024-12-10',
      readTime: 15,
      views: 3200,
      comments: 45,
      tags: ['Market Analysis', 'Rates', 'Trends']
    }
  ];

  const categories: BlogCategory[] = [
    { name: 'All Posts', slug: 'all', count: posts.length },
    { name: 'Industry News', slug: 'industry-news', count: 1 },
    { name: 'Tips & Guides', slug: 'tips-guides', count: 2 },
    { name: 'Technology', slug: 'technology', count: 1 },
    { name: 'Company Updates', slug: 'company-updates', count: 1 }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category.slug === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
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
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <Link href="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Home</Link>
                <Link href="/browse-directory" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Browse Directory</Link>
                <Link href="/post-request" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">Post Request</Link>
                <span className="text-primary font-medium px-3 py-2 rounded-md">Blog</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CargoLinked Blog</h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights, tips, and news from the world of freight and logistics
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {!searchTerm && selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category.name}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{featuredPost.author.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{featuredPost.readTime} min read</span>
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <Button className="bg-primary hover:bg-primary-700">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.slug === selectedCategory)?.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                          {post.category.name}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Subscribe to our newsletter for the latest freight industry insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button className="w-full bg-primary hover:bg-primary-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
