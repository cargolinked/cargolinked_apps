import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';

export default function HomeScreen() {
  const router = useRouter();
  const { data: profile } = trpc.auth.getProfile.useQuery();
  const { data: recentRequests } = trpc.freightRequests.getAll.useQuery({
    page: 1,
    limit: 5,
  });

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-16 pb-6">
        <Text className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.first_name || 'User'}!
        </Text>
        <Text className="text-gray-600 mt-1">
          {profile?.role === 'agent' 
            ? 'Find new freight opportunities' 
            : 'Manage your freight requests'}
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 px-6 rounded-lg"
            onPress={() => router.push('/(tabs)/create')}
          >
            <Text className="text-white text-center font-semibold">
              Post Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-white border border-gray-300 py-4 px-6 rounded-lg"
            onPress={() => router.push('/(tabs)/requests')}
          >
            <Text className="text-gray-700 text-center font-semibold">
              Browse Requests
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-6 py-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Recent Freight Requests
        </Text>
        
        {recentRequests?.data.length === 0 ? (
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-gray-500 text-center">
              No recent requests found
            </Text>
          </View>
        ) : (
          <View className="space-y-3">
            {recentRequests?.data.map((request) => (
              <TouchableOpacity
                key={request.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <Text className="font-semibold text-gray-900 mb-1">
                  {request.title}
                </Text>
                <Text className="text-gray-600 text-sm mb-2">
                  {request.origin_city} → {request.destination_city}
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-gray-500 capitalize">
                    {request.cargo_type}
                  </Text>
                  <Text className="text-xs text-blue-600 font-medium">
                    {request.quotes?.length || 0} quotes
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Stats (for agents) */}
      {profile?.role === 'agent' && (
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Your Stats
          </Text>
          <View className="bg-white p-6 rounded-lg">
            <View className="flex-row justify-between items-center">
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">0</Text>
                <Text className="text-gray-600 text-sm">Active Quotes</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">0</Text>
                <Text className="text-gray-600 text-sm">Jobs Completed</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-yellow-600">0</Text>
                <Text className="text-gray-600 text-sm">Rating</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
