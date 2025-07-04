"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Sidebar from './sidebar';
import LoginForm from '../auth/login-form';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Optimistic navigation - close sidebar immediately and show loading state
  const handleNavigation = (href: string) => {
    console.log('Navigation started to:', href);
    setIsNavigating(true);
    setIsSidebarOpen(false); // Close sidebar immediately for faster UX
    
    // Small delay to show loading state, then navigate
    setTimeout(() => {
      router.push(href);
      setIsNavigating(false);
    }, 100);
  };

  // Reset navigation state when route changes
  useEffect(() => {
    setIsNavigating(false);
  }, []);

  // Preload critical routes for faster navigation
  useEffect(() => {
    if (user) {
      const criticalRoutes = user.role === 'admin' 
        ? ['/admin/dashboard', '/admin/students', '/admin/exams']
        : ['/student/dashboard', '/student/exams', '/student/profile'];
      
      criticalRoutes.forEach(route => {
        router.prefetch(route);
      });
      console.log('Preloaded critical routes for', user.role);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Hamburger Menu */}
      {!isSidebarOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="bg-white shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 
        fixed lg:static 
        inset-y-0 left-0 
        z-40 
        transition-transform duration-150 ease-out
        lg:transition-none
      `}>
        <Sidebar onClose={closeSidebar} onNavigate={handleNavigation} />
      </div>

      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-3" />
            <p className="text-sm text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}