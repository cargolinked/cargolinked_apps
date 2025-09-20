import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';
import type { CargoType } from '@cargolinked/types';

export default function CreateRequestScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    origin: {
      address: '',
      city: '',
      state: '',
      country: 'Malaysia',
      postalCode: '',
    },
    destination: {
      address: '',
      city: '',
      state: '',
      country: 'Malaysia',
      postalCode: '',
    },
    cargoType: 'general' as CargoType,
    weight: '',
    budget: '',
    currency: 'MYR',
  });

  const createMutation = trpc.freightRequests.create.useMutation({
    onSuccess: () => {
      Alert.alert(
        'Success',
        'Your freight request has been posted successfully!',
        [{ text: 'OK', onPress: () => router.push('/(tabs)/requests') }]
      );
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const cargoTypes: CargoType[] = [
    'general', 'fragile', 'hazardous', 'perishable', 'oversized', 'liquid', 'other'
  ];

  const handleSubmit = () => {
    if (!formData.title || !formData.description || 
        !formData.origin.address || !formData.destination.address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    createMutation.mutate({
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Post Freight Request
          </Text>
          <Text className="text-gray-600 text-lg">
            Get quotes from verified freight agents
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Basic Info */}
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Title *
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="e.g., Ship 5 pallets from KL to Penang"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
              </View>

              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Description *
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base h-24"
                  placeholder="Describe your cargo and any special requirements"
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Cargo Type
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-2">
                    {cargoTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        className={`py-2 px-4 rounded-full border ${
                          formData.cargoType === type
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 bg-white'
                        }`}
                        onPress={() => setFormData({ ...formData, cargoType: type })}
                      >
                        <Text
                          className={`text-sm font-medium capitalize ${
                            formData.cargoType === type ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Origin */}
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Pickup Location
            </Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Address *
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="Street address"
                  value={formData.origin.address}
                  onChangeText={(text) => 
                    setFormData({ 
                      ...formData, 
                      origin: { ...formData.origin, address: text } 
                    })
                  }
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    City *
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="City"
                    value={formData.origin.city}
                    onChangeText={(text) => 
                      setFormData({ 
                        ...formData, 
                        origin: { ...formData.origin, city: text } 
                      })
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    State *
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="State"
                    value={formData.origin.state}
                    onChangeText={(text) => 
                      setFormData({ 
                        ...formData, 
                        origin: { ...formData.origin, state: text } 
                      })
                    }
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Postal Code
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="Postal code"
                  value={formData.origin.postalCode}
                  onChangeText={(text) => 
                    setFormData({ 
                      ...formData, 
                      origin: { ...formData.origin, postalCode: text } 
                    })
                  }
                />
              </View>
            </View>
          </View>

          {/* Destination */}
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Location
            </Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Address *
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="Street address"
                  value={formData.destination.address}
                  onChangeText={(text) => 
                    setFormData({ 
                      ...formData, 
                      destination: { ...formData.destination, address: text } 
                    })
                  }
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    City *
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="City"
                    value={formData.destination.city}
                    onChangeText={(text) => 
                      setFormData({ 
                        ...formData, 
                        destination: { ...formData.destination, city: text } 
                      })
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    State *
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="State"
                    value={formData.destination.state}
                    onChangeText={(text) => 
                      setFormData({ 
                        ...formData, 
                        destination: { ...formData.destination, state: text } 
                      })
                    }
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-700 text-base font-medium mb-2">
                  Postal Code
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="Postal code"
                  value={formData.destination.postalCode}
                  onChangeText={(text) => 
                    setFormData({ 
                      ...formData, 
                      destination: { ...formData.destination, postalCode: text } 
                    })
                  }
                />
              </View>
            </View>
          </View>

          {/* Additional Details */}
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Additional Details
            </Text>
            
            <View className="space-y-4">
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    Weight (kg)
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="0"
                    value={formData.weight}
                    onChangeText={(text) => setFormData({ ...formData, weight: text })}
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 text-base font-medium mb-2">
                    Budget (MYR)
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="0"
                    value={formData.budget}
                    onChangeText={(text) => setFormData({ ...formData, budget: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className={`py-4 rounded-lg ${
              createMutation.isLoading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handleSubmit}
            disabled={createMutation.isLoading}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {createMutation.isLoading ? 'Posting...' : 'Post Request'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
