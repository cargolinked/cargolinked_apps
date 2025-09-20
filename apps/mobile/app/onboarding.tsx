import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Hero Section */}
      <View className="flex-1 justify-center items-center px-8">
        <View className="w-32 h-32 bg-blue-100 rounded-full justify-center items-center mb-8">
          <Text className="text-4xl">🚛</Text>
        </View>
        
        <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
          Welcome to Cargolinked
        </Text>
        
        <Text className="text-lg text-gray-600 text-center mb-12 leading-6">
          Connect with freight professionals and get your cargo moving efficiently
        </Text>

        {/* Features */}
        <View className="w-full space-y-4 mb-12">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-4">
              <Text className="text-blue-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">Post freight requests instantly</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-4">
              <Text className="text-blue-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">Get quotes from verified agents</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-4">
              <Text className="text-blue-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">Track shipments in real-time</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-8 pb-12 space-y-4">
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-lg"
          onPress={() => router.push('/auth/register')}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="border border-gray-300 py-4 rounded-lg"
          onPress={() => router.push('/auth/login')}
        >
          <Text className="text-gray-700 text-center text-lg font-semibold">
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
