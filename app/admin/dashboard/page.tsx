"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Calendar,
  PlusCircle,
  TrendingUp,
  Clock,
  BookOpen
} from 'lucide-react';

// Mock data for admin dashboard
const mockDashboardData = {
  totalStudents: 156,
  activeExams: 8,
  completedExams: 23,
  upcomingExams: 5,
  recentExams: [
    { id: 1, title: 'Mathematics Final', date: '2024-07-02', students: 45, status: 'completed' },
    { id: 2, title: 'Physics Midterm', date: '2024-07-01', students: 38, status: 'active' },
    { id: 3, title: 'Chemistry Quiz', date: '2024-06-30', students: 52, status: 'completed' },
    { id: 4, title: 'Biology Test', date: '2024-06-29', students: 41, status: 'upcoming' },
    { id: 5, title: 'English Essay', date: '2024-06-28', students: 35, status: 'completed' }
  ]
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/student/dashboard');
    }
  }, [user, router]);

  console.log('Admin dashboard loaded:', mockDashboardData);

  const statsCards = [
    {
      title: 'Total Students',
      value: mockDashboardData.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Exams',
      value: mockDashboardData.activeExams,
      icon: FileText,
      color: 'bg-green-500',
      change: '+3'
    },
    {
      title: 'Completed Exams',
      value: mockDashboardData.completedExams,
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: '+5'
    },
    {
      title: 'Upcoming Exams',
      value: mockDashboardData.upcomingExams,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="admin-dashboard-title">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="admin-dashboard-subtitle">
              Welcome back, {user?.name}! Here's what's happening today.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/admin/exams')}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Exam
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/students')}>
              <Users className="w-4 h-4 mr-2" />
              Manage Students
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-macaly={`stat-${index}-title`}>
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900" data-macaly={`stat-${index}-value`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 mt-1" data-macaly={`stat-${index}-change`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Recent Exams
              </span>
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/exams')}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDashboardData.recentExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900" data-macaly={`exam-${exam.id}-title`}>
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exam.students} students • {exam.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="p-6 h-auto flex-col space-y-2" onClick={() => router.push('/admin/exams')}>
                <PlusCircle className="w-8 h-8 text-blue-600" />
                <span>Create New Exam</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex-col space-y-2" onClick={() => router.push('/admin/students')}>
                <Users className="w-8 h-8 text-green-600" />
                <span>Add Student</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex-col space-y-2" onClick={() => router.push('/admin/results')}>
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <span>View Results</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}