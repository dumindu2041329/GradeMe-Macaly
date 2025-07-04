"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Sidebar from './sidebar';
import LoginForm from '../auth/login-form';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
        transition-transform duration-300 ease-in-out
        lg:transition-none
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}