import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';
import type { UserRole } from '@cargolinked/types';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'individual' as UserRole,
    companyName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      Alert.alert(
        'Success',
        'Registration successful! Please check your email for verification.',
        [{ text: 'OK', onPress: () => router.push('/auth/login') }]
      );
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.role === 'business' && !formData.companyName) {
      Alert.alert('Error', 'Company name is required for business accounts');
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-8 pt-16 pb-8">
        {/* Header */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-8"
          >
            <Text className="text-blue-600 text-lg">← Back</Text>
          </TouchableOpacity>
          
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </Text>
          <Text className="text-gray-600 text-lg">
            Join the Cargolinked community
          </Text>
        </View>

        {/* Role Selection */}
        <View className="mb-6">
          <Text className="text-gray-700 text-base font-medium mb-3">
            Account Type
          </Text>
          <View className="flex-row space-x-3">
            {(['individual', 'business', 'agent'] as UserRole[]).map((role) => (
              <TouchableOpacity
                key={role}
                className={`flex-1 py-3 px-4 rounded-lg border ${
                  formData.role === role
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300'
                }`}
                onPress={() => setFormData({ ...formData, role })}
              >
                <Text
                  className={`text-center text-sm font-medium capitalize ${
                    formData.role === role ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Text className="text-gray-700 text-base font-medium mb-2">
                First Name *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="First name"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-base font-medium mb-2">
                Last Name *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="Last name"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">
              Email *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">
              Password *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
          </View>

          {(formData.role === 'business' || formData.role === 'agent') && (
            <View>
              <Text className="text-gray-700 text-base font-medium mb-2">
                Company Name {formData.role === 'business' ? '*' : ''}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="Enter company name"
                value={formData.companyName}
                onChangeText={(text) => setFormData({ ...formData, companyName: text })}
              />
            </View>
          )}

          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">
              Phone Number
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Enter phone number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            className={`py-4 rounded-lg mt-6 ${
              registerMutation.isLoading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handleRegister}
            disabled={registerMutation.isLoading}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {registerMutation.isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8">
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text className="text-blue-600 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
