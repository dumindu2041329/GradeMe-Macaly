"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  PlusCircle,
  Calendar,
  X
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar({ onClose, onNavigate }: { onClose?: () => void; onNavigate?: (href: string) => void }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const adminNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students', icon: Users },
    { href: '/admin/exams', label: 'Exams', icon: FileText },
    { href: '/admin/papers', label: 'Papers', icon: BookOpen },
    { href: '/admin/results', label: 'Results', icon: BarChart3 },
    { href: '/admin/profile', label: 'Profile', icon: Settings },
  ];

  const studentNavItems = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/exams', label: 'Exams', icon: FileText },
    { href: '/student/history', label: 'History', icon: Calendar },
    { href: '/student/profile', label: 'Profile', icon: Settings },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900" data-macaly="sidebar-logo">
              GradeMe
            </h1>
          </div>
          {/* Mobile Close Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {user?.profilePhoto ? (
              <img 
                src={user.profilePhoto} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {user?.name?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900" data-macaly="user-name">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize" data-macaly="user-role">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} prefetch={true}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start space-x-3 transition-all duration-150 ${
                  isActive 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => {
                  console.log('Navigation clicked:', item.href);
                  if (onNavigate) {
                    onNavigate(item.href);
                  } else {
                    onClose && onClose();
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}