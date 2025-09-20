import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TRPCProvider } from '@/components/providers/trpc-provider';
import '../global.css';

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </TRPCProvider>
  );
}
