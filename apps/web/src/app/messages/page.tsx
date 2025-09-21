'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  ArrowLeft,
  User,
  Truck,
  Clock,
  CheckCheck,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    role: 'agent' | 'shipper';
    online: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
    read: boolean;
  };
  unreadCount: number;
  freightRequest?: {
    id: string;
    title: string;
  };
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'quote' | 'system';
  read: boolean;
  fileUrl?: string;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock current user
  const currentUserId = 'current-user';

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      participant: {
        id: 'user-1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        role: 'shipper',
        online: true
      },
      lastMessage: {
        content: 'Thanks for the quick response! When can you pick up?',
        timestamp: '2024-12-22T10:30:00Z',
        senderId: 'user-1',
        read: false
      },
      unreadCount: 2,
      freightRequest: {
        id: 'req-1',
        title: 'Electronics Shipment to NYC'
      }
    },
    {
      id: '2',
      participant: {
        id: 'user-2',
        name: 'Mike Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'agent',
        online: false
      },
      lastMessage: {
        content: 'I can handle this shipment. My quote is $2,800.',
        timestamp: '2024-12-21T16:45:00Z',
        senderId: 'user-2',
        read: true
      },
      unreadCount: 0,
      freightRequest: {
        id: 'req-2',
        title: 'Medical Equipment Transport'
      }
    },
    {
      id: '3',
      participant: {
        id: 'user-3',
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        role: 'agent',
        online: true
      },
      lastMessage: {
        content: 'Perfect! I\'ll send you the tracking details shortly.',
        timestamp: '2024-12-21T14:20:00Z',
        senderId: currentUserId,
        read: true
      },
      unreadCount: 0
    }
  ];

  // Mock messages data
  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: 'msg-1',
        senderId: currentUserId,
        content: 'Hi Sarah, I saw your electronics shipment request. I can handle this for you.',
        timestamp: '2024-12-22T09:00:00Z',
        type: 'text',
        read: true
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        content: 'Great! What\'s your quote for the Los Angeles to New York route?',
        timestamp: '2024-12-22T09:15:00Z',
        type: 'text',
        read: true
      },
      {
        id: 'msg-3',
        senderId: currentUserId,
        content: 'For 2,500 lbs of electronics with expedited delivery, I can do it for $3,200.',
        timestamp: '2024-12-22T09:30:00Z',
        type: 'quote',
        read: true
      },
      {
        id: 'msg-4',
        senderId: 'user-1',
        content: 'That sounds reasonable. Do you have insurance coverage?',
        timestamp: '2024-12-22T10:00:00Z',
        type: 'text',
        read: true
      },
      {
        id: 'msg-5',
        senderId: currentUserId,
        content: 'Yes, full coverage up to $100,000. I also provide real-time tracking.',
        timestamp: '2024-12-22T10:15:00Z',
        type: 'text',
        read: true
      },
      {
        id: 'msg-6',
        senderId: 'user-1',
        content: 'Thanks for the quick response! When can you pick up?',
        timestamp: '2024-12-22T10:30:00Z',
        type: 'text',
        read: false
      }
    ],
    '2': [
      {
        id: 'msg-7',
        senderId: 'user-2',
        content: 'I can handle this shipment. My quote is $2,800.',
        timestamp: '2024-12-21T16:45:00Z',
        type: 'quote',
        read: true
      }
    ],
    '3': [
      {
        id: 'msg-8',
        senderId: 'user-3',
        content: 'Shipment delivered successfully!',
        timestamp: '2024-12-21T14:00:00Z',
        type: 'system',
        read: true
      },
      {
        id: 'msg-9',
        senderId: currentUserId,
        content: 'Perfect! I\'ll send you the tracking details shortly.',
        timestamp: '2024-12-21T14:20:00Z',
        type: 'text',
        read: true
      }
    ]
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.freightRequest?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // TODO: Implement actual message sending with Supabase
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {conversation.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        {conversation.freightRequest && (
                          <p className="text-xs text-blue-600 mb-1">
                            Re: {conversation.freightRequest.title}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage.senderId === currentUserId ? 'You: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {selectedConv.participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {selectedConv.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {selectedConv.participant.name}
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">
                          {selectedConv.participant.role} • {selectedConv.participant.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Freight Request Context */}
                  {selectedConv.freightRequest && (
                    <div className="p-3 bg-blue-50 border-b border-blue-200">
                      <div className="flex items-center text-sm text-blue-800">
                        <Truck className="w-4 h-4 mr-2" />
                        <span>Discussing: {selectedConv.freightRequest.title}</span>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === currentUserId
                              ? 'bg-primary text-white'
                              : message.type === 'system'
                              ? 'bg-gray-100 text-gray-700 text-center'
                              : message.type === 'quote'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.type === 'quote' && (
                            <div className="text-xs font-medium mb-1">💰 Quote</div>
                          )}
                          {message.type === 'system' && (
                            <div className="text-xs font-medium mb-1">📋 System Update</div>
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          
                          <div className={`flex items-center justify-end mt-1 space-x-1 ${
                            message.senderId === currentUserId ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.senderId === currentUserId && (
                              message.read ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary hover:bg-primary-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Conversation Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from the sidebar to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
