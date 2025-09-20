import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const router = useRouter();
  const { data: profile } = trpc.auth.getProfile.useQuery();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-8">
        {/* Header */}
        <View className="bg-white p-6 rounded-lg mb-6">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-blue-100 rounded-full justify-center items-center mb-4">
              <Text className="text-2xl font-bold text-blue-600">
                {profile.first_name.charAt(0)}{profile.last_name.charAt(0)}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              {profile.first_name} {profile.last_name}
            </Text>
            <Text className="text-gray-600 capitalize">
              {profile.role} {profile.is_verified && '• Verified'}
            </Text>
            {profile.company_name && (
              <Text className="text-gray-600 mt-1">
                {profile.company_name}
              </Text>
            )}
          </View>
        </View>

        {/* Profile Details */}
        <View className="bg-white p-6 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Profile Information
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Email</Text>
              <Text className="text-gray-900">{profile.email}</Text>
            </View>
            
            {profile.phone && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Phone</Text>
                <Text className="text-gray-900">{profile.phone}</Text>
              </View>
            )}
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Member since</Text>
              <Text className="text-gray-900">
                {new Date(profile.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Agent Profile Section */}
        {profile.role === 'agent' && (
          <View className="bg-white p-6 rounded-lg mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                Agent Profile
              </Text>
              <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
                <Text className="text-white text-sm font-medium">
                  Setup Profile
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text className="text-gray-600">
              Complete your agent profile to start receiving freight requests
            </Text>
          </View>
        )}

        {/* Menu Items */}
        <View className="bg-white rounded-lg mb-6">
          <TouchableOpacity className="p-4 border-b border-gray-100">
            <Text className="text-gray-900 text-base">Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-4 border-b border-gray-100">
            <Text className="text-gray-900 text-base">Notification Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-4 border-b border-gray-100">
            <Text className="text-gray-900 text-base">Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-4 border-b border-gray-100">
            <Text className="text-gray-900 text-base">Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-4">
            <Text className="text-gray-900 text-base">Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600 py-4 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
