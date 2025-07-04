"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  TrendingUp, 
  Trophy, 
  Target,
  Calendar,
  Clock,
  BookOpen,
  Star,
  BarChart3,
  Play
} from 'lucide-react';

// Mock data for student dashboard
const mockStudentData = {
  totalExams: 15,
  averageScore: 87.5,
  bestRank: 3,
  projectGoal: 90,
  currentProgress: 87.5,
  activeExams: [
    { id: 1, title: 'Physics Final', deadline: '2024-07-05', duration: '2 hours', difficulty: 'Hard' },
    { id: 2, title: 'Chemistry Quiz', deadline: '2024-07-06', duration: '1 hour', difficulty: 'Medium' }
  ],
  upcomingExams: [
    { id: 3, title: 'Biology Test', date: '2024-07-08', time: '10:00 AM' },
    { id: 4, title: 'Mathematics Final', date: '2024-07-10', time: '2:00 PM' },
    { id: 5, title: 'English Essay', date: '2024-07-12', time: '9:00 AM' }
  ],
  performanceTrend: 85, // Percentage improvement
  gradeDistribution: {
    A: 40,
    B: 35,
    C: 20,
    D: 5
  },
  examHistory: [
    { id: 1, title: 'Mathematics Midterm', date: '2024-06-28', score: 92, grade: 'A' },
    { id: 2, title: 'Physics Quiz', date: '2024-06-25', score: 88, grade: 'B+' },
    { id: 3, title: 'Chemistry Test', date: '2024-06-22', score: 85, grade: 'B' },
    { id: 4, title: 'Biology Quiz', date: '2024-06-20', score: 90, grade: 'A-' }
  ],
  studyRecommendations: [
    'Focus on Physics concepts for the upcoming final',
    'Review Chemistry molecular structures',
    'Practice more Mathematics problem-solving',
    'Improve English essay writing skills'
  ]
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'student') {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  console.log('Student dashboard loaded:', mockStudentData);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="student-dashboard-title">
              Student Dashboard
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="student-dashboard-subtitle">
              Welcome back, {user?.name}! Ready to excel in your studies?
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/student/exams')}>
              <Play className="w-4 h-4 mr-2" />
              Take Exam
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" data-macaly="total-exams-title">
                    Total Exams
                  </p>
                  <p className="text-2xl font-bold text-gray-900" data-macaly="total-exams-value">
                    {mockStudentData.totalExams}
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" data-macaly="avg-score-title">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900" data-macaly="avg-score-value">
                    {mockStudentData.averageScore}%
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" data-macaly="best-rank-title">
                    Best Rank
                  </p>
                  <p className="text-2xl font-bold text-gray-900" data-macaly="best-rank-value">
                    #{mockStudentData.bestRank}
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" data-macaly="project-goal-title">
                    Project Goal
                  </p>
                  <p className="text-2xl font-bold text-gray-900" data-macaly="project-goal-value">
                    {mockStudentData.projectGoal}%
                  </p>
                  <Progress value={mockStudentData.currentProgress} className="mt-2" />
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance and Grade Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Improvement</span>
                  <span className="text-green-600 font-semibold">+{mockStudentData.performanceTrend}%</span>
                </div>
                <Progress value={mockStudentData.performanceTrend} className="h-2" />
                <p className="text-xs text-gray-500">
                  You're performing better than last semester!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(mockStudentData.gradeDistribution).map(([grade, percentage]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <span className="text-sm font-medium">Grade {grade}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={percentage} className="w-24 h-2" />
                      <span className="text-sm text-gray-600">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Active Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudentData.activeExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900" data-macaly={`active-exam-${exam.id}-title`}>
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Deadline: {exam.deadline} • Duration: {exam.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Exam
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams and Study Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudentData.upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900" data-macaly={`upcoming-exam-${exam.id}-title`}>
                        {exam.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {exam.date} at {exam.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        Prepare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Study Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudentData.studyRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700" data-macaly={`recommendation-${index}`}>
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Exam History
              </span>
              <Button variant="outline" size="sm" onClick={() => router.push('/student/history')}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStudentData.examHistory.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900" data-macaly={`history-exam-${exam.id}-title`}>
                      {exam.title}
                    </h4>
                    <p className="text-sm text-gray-600">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{exam.score}%</p>
                    <p className={`text-sm font-medium ${getGradeColor(exam.grade)}`}>
                      {exam.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}