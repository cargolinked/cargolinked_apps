'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@cargolinked/ui';
import { Truck, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Get user role from authentication context
    // For now, redirect to agent dashboard as default
    // In a real app, you would check the user's role and redirect accordingly
    
    const checkUserRole = async () => {
      try {
        // Simulate checking user role
        // const { createClient } = await import('../lib/supabase');
        // const supabase = createClient();
        // const { data: { user } } = await supabase.auth.getUser();
        
        // For demo purposes, redirect to agent dashboard
        // In production, you would check the user's actual role
        router.push('/agent/dashboard');
      } catch (error) {
        console.error('Error checking user role:', error);
        // If not authenticated, redirect to login
        router.push('/login');
      }
    };

    checkUserRole();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard</h1>
          <p className="text-gray-600 mb-4">Redirecting you to your personalized dashboard...</p>
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
