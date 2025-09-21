'use client';

import { useState } from 'react';
import { Button } from '@cargolinked/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@cargolinked/ui';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Download, 
  Eye, 
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Truck,
  ArrowLeft,
  Wallet,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';

interface Invoice {
  id: string;
  invoiceNumber: string;
  shipmentTitle: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
  payer: {
    name: string;
    company: string;
  };
  payee: {
    name: string;
    company: string;
  };
  createdAt: string;
}

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  processedAt: string;
  failureReason?: string;
}

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'refund' | 'withdrawal';
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const walletBalance = 2450.75;
  
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-12345',
      shipmentTitle: 'Electronics Shipment to NYC',
      amount: 3200,
      taxAmount: 256,
      totalAmount: 3456,
      status: 'paid',
      dueDate: '2024-12-25',
      paidAt: '2024-12-22T10:30:00Z',
      payer: {
        name: 'Sarah Johnson',
        company: 'TechCorp Industries'
      },
      payee: {
        name: 'John Smith',
        company: 'FastTrack Logistics'
      },
      createdAt: '2024-12-20T08:00:00Z'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-12346',
      shipmentTitle: 'Medical Equipment Transport',
      amount: 2800,
      taxAmount: 224,
      totalAmount: 3024,
      status: 'sent',
      dueDate: '2024-12-28',
      payer: {
        name: 'Mike Rodriguez',
        company: 'MedSupply Solutions'
      },
      payee: {
        name: 'Lisa Chen',
        company: 'Pacific Freight Solutions'
      },
      createdAt: '2024-12-21T14:00:00Z'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-12347',
      shipmentTitle: 'Automotive Parts Delivery',
      amount: 4100,
      taxAmount: 328,
      totalAmount: 4428,
      status: 'overdue',
      dueDate: '2024-12-20',
      payer: {
        name: 'AutoParts Co.',
        company: 'AutoParts Co.'
      },
      payee: {
        name: 'John Smith',
        company: 'FastTrack Logistics'
      },
      createdAt: '2024-12-15T12:00:00Z'
    }
  ];

  const payments: Payment[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-12345',
      amount: 3456,
      status: 'succeeded',
      paymentMethod: 'Visa ****1234',
      processedAt: '2024-12-22T10:30:00Z'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-12344',
      amount: 2100,
      status: 'failed',
      paymentMethod: 'Mastercard ****5678',
      processedAt: '2024-12-21T16:45:00Z',
      failureReason: 'Insufficient funds'
    }
  ];

  const walletTransactions: WalletTransaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 3456,
      balanceAfter: 2450.75,
      description: 'Payment received for INV-2024-12345',
      createdAt: '2024-12-22T10:30:00Z'
    },
    {
      id: '2',
      type: 'debit',
      amount: 500,
      balanceAfter: -1005.25,
      description: 'Platform fee for December',
      createdAt: '2024-12-21T08:00:00Z'
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 1000,
      balanceAfter: -505.25,
      description: 'Bank transfer to account ****1234',
      createdAt: '2024-12-20T14:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'succeeded': return 'text-green-600 bg-green-100';
      case 'sent': case 'pending': return 'text-blue-600 bg-blue-100';
      case 'overdue': case 'failed': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': case 'succeeded': return <CheckCircle className="w-4 h-4" />;
      case 'sent': case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.shipmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.payer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = () => {
    // TODO: Navigate to create invoice page
    console.log('Creating new invoice');
  };

  const handlePayInvoice = (invoiceId: string) => {
    // TODO: Implement Stripe payment flow
    console.log('Paying invoice:', invoiceId);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Generate and download PDF invoice
    console.log('Downloading invoice:', invoiceId);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Invoices</h1>
          <p className="text-gray-600">Manage your payments, invoices, and wallet balance</p>
        </div>

        {/* Wallet Balance Card */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(walletBalance)}</h3>
                  <p className="text-gray-600">Available Balance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(8750)}</h3>
                  <p className="text-gray-600">This Month Income</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingDown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(1250)}</h3>
                  <p className="text-gray-600">This Month Expenses</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-4">
                <Button className="bg-primary hover:bg-primary-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'invoices', name: 'Invoices', icon: FileText },
              { id: 'payments', name: 'Payments', icon: CreditCard },
              { id: 'wallet', name: 'Wallet History', icon: Wallet }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <Button onClick={handleCreateInvoice} className="bg-primary hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            {/* Invoices Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                              <div className="text-sm text-gray-500">{invoice.shipmentTitle}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{invoice.payer.name}</div>
                              <div className="text-sm text-gray-500">{invoice.payer.company}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.totalAmount)}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1 capitalize">{invoice.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">
                            {formatDate(invoice.dueDate)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDownloadInvoice(invoice.id)}>
                                <Download className="w-3 h-3" />
                              </Button>
                              {invoice.status === 'sent' && (
                                <Button size="sm" className="bg-primary hover:bg-primary-700" onClick={() => handlePayInvoice(invoice.id)}>
                                  <CreditCard className="w-3 h-3 mr-1" />
                                  Pay
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{payment.invoiceNumber}</h4>
                        <p className="text-sm text-gray-600">{payment.paymentMethod}</p>
                        {payment.failureReason && (
                          <p className="text-sm text-red-600">{payment.failureReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-500">{formatDate(payment.processedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wallet History Tab */}
        {activeTab === 'wallet' && (
          <Card>
            <CardHeader>
              <CardTitle>Wallet Transactions</CardTitle>
              <CardDescription>Your wallet activity and balance changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' || transaction.type === 'refund' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' || transaction.type === 'refund' ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">{transaction.type}</h4>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' || transaction.type === 'refund' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' || transaction.type === 'refund' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: {formatCurrency(transaction.balanceAfter)}
                      </p>
                      <p className="text-xs text-gray-400">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
