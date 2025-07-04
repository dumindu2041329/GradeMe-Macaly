"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to appropriate dashboard based on user role
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    }
  }, [user, isLoading, router]);

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-macaly="welcome-title">
            Welcome to GradeMe
          </h1>
          <p className="text-gray-600" data-macaly="welcome-description">
            Your comprehensive exam management system
          </p>
        </div>
      </div>
    </MainLayout>
  );
}