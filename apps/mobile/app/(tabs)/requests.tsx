import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { trpc } from '@/lib/trpc';
import { formatCurrency, formatDate } from '@cargolinked/utils';

export default function RequestsScreen() {
  const { data: requests, isLoading } = trpc.freightRequests.getAll.useQuery({
    page: 1,
    limit: 20,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Loading requests...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Freight Requests
          </Text>
          <Text className="text-gray-600 text-lg">
            Browse available freight opportunities
          </Text>
        </View>

        {/* Requests List */}
        {requests?.data.length === 0 ? (
          <View className="bg-white p-8 rounded-lg text-center">
            <Text className="text-gray-500 text-center text-lg">
              No freight requests found
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Check back later for new opportunities
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {requests?.data.map((request) => (
              <TouchableOpacity
                key={request.id}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="font-semibold text-gray-900 text-lg flex-1 mr-2">
                    {request.title}
                  </Text>
                  <View className="bg-blue-100 px-3 py-1 rounded-full">
                    <Text className="text-blue-600 text-xs font-medium capitalize">
                      {request.status}
                    </Text>
                  </View>
                </View>

                <Text className="text-gray-600 mb-3 leading-5">
                  {request.description}
                </Text>

                <View className="space-y-2 mb-4">
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm w-16">From:</Text>
                    <Text className="text-gray-900 text-sm flex-1">
                      {request.origin_city}, {request.origin_state}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm w-16">To:</Text>
                    <Text className="text-gray-900 text-sm flex-1">
                      {request.destination_city}, {request.destination_state}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm w-16">Type:</Text>
                    <Text className="text-gray-900 text-sm flex-1 capitalize">
                      {request.cargo_type}
                    </Text>
                  </View>
                  {request.weight && (
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-sm w-16">Weight:</Text>
                      <Text className="text-gray-900 text-sm flex-1">
                        {request.weight} kg
                      </Text>
                    </View>
                  )}
                  {request.budget && (
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-sm w-16">Budget:</Text>
                      <Text className="text-gray-900 text-sm flex-1">
                        {formatCurrency(request.budget, request.currency)}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                  <Text className="text-gray-500 text-xs">
                    Posted {formatDate(request.created_at)}
                  </Text>
                  <Text className="text-blue-600 text-sm font-medium">
                    {request.quotes?.length || 0} quotes
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
