"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Play, 
  Clock, 
  Calendar,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Timer,
  Users,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Mock exam data for students
const mockStudentExams = [
  {
    id: 1,
    title: 'Physics Final Exam',
    subject: 'Physics',
    description: 'Comprehensive final exam covering mechanics, thermodynamics, and electromagnetism',
    date: '2024-07-05',
    time: '10:00',
    duration: '3 hours',
    totalMarks: 100,
    status: 'active',
    difficulty: 'Hard',
    instructions: 'Read all questions carefully. Answer all sections. Calculator allowed.',
    timeRemaining: '2 days',
    attempts: 0,
    maxAttempts: 1,
    passingScore: 60
  },
  {
    id: 2,
    title: 'Chemistry Quiz',
    subject: 'Chemistry',
    description: 'Quick assessment on organic chemistry fundamentals',
    date: '2024-07-06',
    time: '14:00',
    duration: '1 hour',
    totalMarks: 50,
    status: 'active',
    difficulty: 'Medium',
    instructions: 'Multiple choice questions. Select the best answer for each question.',
    timeRemaining: '3 days',
    attempts: 0,
    maxAttempts: 2,
    passingScore: 30
  },
  {
    id: 3,
    title: 'Mathematics Midterm',
    subject: 'Mathematics',
    description: 'Midterm examination covering algebra and calculus',
    date: '2024-06-28',
    time: '09:00',
    duration: '2.5 hours',
    totalMarks: 80,
    status: 'completed',
    difficulty: 'Medium',
    score: 72,
    grade: 'B+',
    attempts: 1,
    maxAttempts: 1,
    passingScore: 48
  },
  {
    id: 4,
    title: 'Biology Test',
    subject: 'Biology',
    description: 'Test on cell biology and genetics',
    date: '2024-07-08',
    time: '11:00',
    duration: '2 hours',
    totalMarks: 75,
    status: 'scheduled',
    difficulty: 'Easy',
    instructions: 'Open book exam. Reference materials allowed.',
    timeRemaining: '5 days',
    attempts: 0,
    maxAttempts: 1,
    passingScore: 45
  },
  {
    id: 5,
    title: 'English Essay',
    subject: 'English',
    description: 'Essay writing assessment on literature analysis',
    date: '2024-07-12',
    time: '13:00',
    duration: '2 hours',
    totalMarks: 60,
    status: 'scheduled',
    difficulty: 'Medium',
    instructions: 'Choose one topic from the given list. Write a minimum of 1000 words.',
    timeRemaining: '9 days',
    attempts: 0,
    maxAttempts: 1,
    passingScore: 36
  }
];

export default function StudentExams() {
  const [exams, setExams] = useState(mockStudentExams);
  const [selectedTab, setSelectedTab] = useState('active');
  const { toast } = useToast();
  const router = useRouter();

  console.log('Student exams page loaded:', { exams, selectedTab });

  const handleStartExam = (exam: any) => {
    if (exam.attempts >= exam.maxAttempts) {
      toast({
        title: "Maximum Attempts Reached",
        description: "You have already used all your attempts for this exam.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Starting Exam",
      description: `Starting ${exam.title}. Good luck!`,
    });
    
    console.log('Starting exam:', exam.id);
    
    // In a real app, this would navigate to the exam interface
    // For now, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Exam Started",
        description: "You have been redirected to the exam interface.",
      });
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (score: number, totalMarks: number) => {
    const percentage = (score / totalMarks) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-5 h-5 text-green-600" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-gray-600" />;
      case 'scheduled': return <Calendar className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredExams = exams.filter(exam => {
    if (selectedTab === 'active') return exam.status === 'active';
    if (selectedTab === 'completed') return exam.status === 'completed';
    if (selectedTab === 'scheduled') return exam.status === 'scheduled';
    return true;
  });

  const tabs = [
    { id: 'active', label: 'Active Exams', count: exams.filter(e => e.status === 'active').length },
    { id: 'scheduled', label: 'Scheduled', count: exams.filter(e => e.status === 'scheduled').length },
    { id: 'completed', label: 'Completed', count: exams.filter(e => e.status === 'completed').length }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-macaly="student-exams-title">
            My Exams
          </h1>
          <p className="text-gray-600 mt-1" data-macaly="student-exams-subtitle">
            View and take your assigned exams
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(exam.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900" data-macaly={`exam-${exam.id}-title`}>
                          {exam.title}
                        </h3>
                        <p className="text-sm text-gray-600">{exam.subject}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status}
                        </Badge>
                        <Badge className={getDifficultyColor(exam.difficulty)}>
                          {exam.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{exam.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{exam.date} at {exam.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{exam.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{exam.totalMarks} marks</span>
                      </div>
                    </div>

                    {exam.status === 'active' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Timer className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Time Remaining: {exam.timeRemaining}
                          </span>
                        </div>
                        <p className="text-xs text-yellow-700">
                          Attempts: {exam.attempts}/{exam.maxAttempts}
                        </p>
                      </div>
                    )}

                    {exam.status === 'completed' && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-800">
                              Score: {exam.score}/{exam.totalMarks}
                            </span>
                          </div>
                          <div className={`font-semibold ${getGradeColor(exam.score!, exam.totalMarks)}`}>
                            {exam.grade}
                          </div>
                        </div>
                        <Progress 
                          value={(exam.score! / exam.totalMarks) * 100} 
                          className="mt-2 h-2"
                        />
                      </div>
                    )}

                    {exam.status === 'scheduled' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">
                            Scheduled in {exam.timeRemaining}
                          </span>
                        </div>
                      </div>
                    )}

                    {exam.instructions && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Instructions:</h4>
                        <p className="text-xs text-gray-600">{exam.instructions}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6">
                    {exam.status === 'active' && (
                      <Button 
                        onClick={() => handleStartExam(exam)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={exam.attempts >= exam.maxAttempts}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Exam
                      </Button>
                    )}
                    {exam.status === 'completed' && (
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    )}
                    {exam.status === 'scheduled' && (
                      <Button variant="outline" disabled>
                        <Calendar className="w-4 h-4 mr-2" />
                        Scheduled
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {selectedTab} exams
              </h3>
              <p className="text-gray-600">
                {selectedTab === 'active' 
                  ? 'You currently have no active exams to take.'
                  : selectedTab === 'scheduled'
                  ? 'You have no upcoming exams scheduled.'
                  : 'You have not completed any exams yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}