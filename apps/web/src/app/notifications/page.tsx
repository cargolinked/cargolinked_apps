'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  Bell, 
  Check, 
  X, 
  Truck, 
  DollarSign, 
  MessageSquare, 
  AlertTriangle,
  Calendar,
  Star,
  Settings,
  Filter,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface Notification {
  id: string;
  type: 'quote' | 'message' | 'payment' | 'system' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'quotes' | 'messages' | 'payments'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'quote',
      title: 'New Quote Request',
      message: 'You have a new quote request for Electronics shipment from Los Angeles to New York.',
      time: '2 minutes ago',
      read: false,
      actionUrl: '/browse-requests',
      actionText: 'View Request'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $3,200 has been processed for shipment #FR-2024-001.',
      time: '1 hour ago',
      read: false,
      actionUrl: '/payments',
      actionText: 'View Payment'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about the automotive parts shipment.',
      time: '3 hours ago',
      read: true,
      actionUrl: '/messages',
      actionText: 'Reply'
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star review from TechCorp for excellent service.',
      time: '1 day ago',
      read: true,
      actionUrl: '/profile',
      actionText: 'View Profile'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Update',
      message: 'CargoLinked has been updated with new features and improvements.',
      time: '2 days ago',
      read: true,
      actionUrl: '/blog',
      actionText: 'Learn More'
    },
    {
      id: '6',
      type: 'quote',
      title: 'Quote Accepted',
      message: 'Your quote for Medical Equipment shipment has been accepted by HealthCare Inc.',
      time: '3 days ago',
      read: true,
      actionUrl: '/agent/dashboard',
      actionText: 'View Job'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'system':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'quotes':
        return notification.type === 'quote';
      case 'messages':
        return notification.type === 'message';
      case 'payments':
        return notification.type === 'payment';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Notifications" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your freight activities and important updates
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              <Button variant="outline" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'quotes', label: 'Quotes', count: notifications.filter(n => n.type === 'quote').length },
              { key: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
              { key: 'payments', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === filterOption.key
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span>{filterOption.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === filterOption.key
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filterOption.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? "You're all caught up! No notifications to show."
                    : `No ${filter} notifications found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-primary bg-blue-50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${
                        !notification.read ? 'bg-white' : 'bg-gray-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{notification.time}</span>
                          </div>
                          
                          {notification.actionUrl && (
                            <Link href={notification.actionUrl}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.actionText}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="p-1"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="px-8">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}