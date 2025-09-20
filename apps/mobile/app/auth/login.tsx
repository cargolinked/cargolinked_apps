import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white px-8 pt-16">
      {/* Header */}
      <View className="mb-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-8"
        >
          <Text className="text-blue-600 text-lg">← Back</Text>
        </TouchableOpacity>
        
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back
        </Text>
        <Text className="text-gray-600 text-lg">
          Sign in to your account
        </Text>
      </View>

      {/* Form */}
      <View className="space-y-6">
        <View>
          <Text className="text-gray-700 text-base font-medium mb-2">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-700 text-base font-medium mb-2">
            Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="flex-1 justify-end pb-8">
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-blue-600 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
