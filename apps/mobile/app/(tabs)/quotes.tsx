import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { trpc } from '@/lib/trpc';
import { formatCurrency, formatDate } from '@cargolinked/utils';

export default function QuotesScreen() {
  const { data: profile } = trpc.auth.getProfile.useQuery();
  
  // Show different quotes based on user role
  const { data: myQuotes } = trpc.quotes.getMyQuotes.useQuery(
    { page: 1, limit: 20 },
    { enabled: profile?.role === 'agent' }
  );
  
  const { data: quotesForMyRequests } = trpc.quotes.getQuotesForMyRequests.useQuery(
    { page: 1, limit: 20 },
    { enabled: profile?.role !== 'agent' }
  );

  const quotes = profile?.role === 'agent' ? myQuotes : quotesForMyRequests;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {profile?.role === 'agent' ? 'My Quotes' : 'Received Quotes'}
          </Text>
          <Text className="text-gray-600 text-lg">
            {profile?.role === 'agent' 
              ? 'Quotes you\'ve submitted to freight requests'
              : 'Quotes received for your freight requests'
            }
          </Text>
        </View>

        {/* Quotes List */}
        {quotes?.data.length === 0 ? (
          <View className="bg-white p-8 rounded-lg text-center">
            <Text className="text-gray-500 text-center text-lg">
              No quotes found
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              {profile?.role === 'agent' 
                ? 'Start submitting quotes to freight requests'
                : 'Post a freight request to receive quotes'
              }
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {quotes?.data.map((quote) => (
              <TouchableOpacity
                key={quote.id}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="font-semibold text-gray-900 text-lg flex-1 mr-2">
                    {formatCurrency(quote.price, quote.currency)}
                  </Text>
                  <View className={`px-3 py-1 rounded-full ${
                    quote.status === 'accepted' ? 'bg-green-100' :
                    quote.status === 'rejected' ? 'bg-red-100' :
                    quote.status === 'expired' ? 'bg-gray-100' :
                    'bg-yellow-100'
                  }`}>
                    <Text className={`text-xs font-medium capitalize ${
                      quote.status === 'accepted' ? 'text-green-600' :
                      quote.status === 'rejected' ? 'text-red-600' :
                      quote.status === 'expired' ? 'text-gray-600' :
                      'text-yellow-600'
                    }`}>
                      {quote.status}
                    </Text>
                  </View>
                </View>

                <Text className="text-gray-600 mb-3 leading-5">
                  {quote.message}
                </Text>

                {/* Freight Request Info */}
                {quote.freight_request && (
                  <View className="bg-gray-50 p-4 rounded-lg mb-4">
                    <Text className="font-medium text-gray-900 mb-2">
                      {quote.freight_request.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {quote.freight_request.origin_city} → {quote.freight_request.destination_city}
                    </Text>
                  </View>
                )}

                {/* Agent Info (for non-agents) */}
                {profile?.role !== 'agent' && quote.agent && (
                  <View className="bg-gray-50 p-4 rounded-lg mb-4">
                    <Text className="font-medium text-gray-900 mb-1">
                      {quote.agent.company_name || `${quote.agent.first_name} ${quote.agent.last_name}`}
                    </Text>
                    {quote.agent_profile && (
                      <View className="flex-row items-center space-x-4">
                        <Text className="text-gray-600 text-sm">
                          ⭐ {quote.agent_profile.rating?.toFixed(1) || 'No rating'}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {quote.agent_profile.total_jobs} jobs completed
                        </Text>
                        {quote.agent_profile.is_verified && (
                          <Text className="text-green-600 text-sm">✓ Verified</Text>
                        )}
                      </View>
                    )}
                  </View>
                )}

                {/* Estimated Dates */}
                <View className="space-y-2 mb-4">
                  {quote.estimated_pickup_date && (
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-sm w-20">Pickup:</Text>
                      <Text className="text-gray-900 text-sm flex-1">
                        {formatDate(quote.estimated_pickup_date)}
                      </Text>
                    </View>
                  )}
                  {quote.estimated_delivery_date && (
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-sm w-20">Delivery:</Text>
                      <Text className="text-gray-900 text-sm flex-1">
                        {formatDate(quote.estimated_delivery_date)}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                  <Text className="text-gray-500 text-xs">
                    Submitted {formatDate(quote.created_at)}
                  </Text>
                  {quote.expires_at && (
                    <Text className="text-gray-500 text-xs">
                      Expires {formatDate(quote.expires_at)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
