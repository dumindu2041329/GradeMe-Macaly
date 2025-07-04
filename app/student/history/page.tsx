"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Trophy,
  TrendingUp,
  TrendingDown,
  Star,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  Target,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock student exam history
const mockExamHistory = [
  {
    id: 1,
    examTitle: 'Mathematics Final Exam',
    subject: 'Mathematics',
    date: '2024-06-28',
    time: '09:00',
    score: 87,
    totalMarks: 100,
    percentage: 87,
    grade: 'A-',
    rank: 3,
    totalStudents: 45,
    timeSpent: '2h 45m',
    status: 'completed',
    difficulty: 'Hard',
    passingScore: 60,
    improvement: '+5'
  },
  {
    id: 2,
    examTitle: 'Physics Quiz',
    subject: 'Physics',
    date: '2024-06-25',
    time: '14:00',
    score: 68,
    totalMarks: 75,
    percentage: 90.7,
    grade: 'A',
    rank: 2,
    totalStudents: 38,
    timeSpent: '55m',
    status: 'completed',
    difficulty: 'Medium',
    passingScore: 45,
    improvement: '+12'
  },
  {
    id: 3,
    examTitle: 'Chemistry Test',
    subject: 'Chemistry',
    date: '2024-06-22',
    time: '11:00',
    score: 42,
    totalMarks: 50,
    percentage: 84,
    grade: 'B+',
    rank: 5,
    totalStudents: 52,
    timeSpent: '1h 30m',
    status: 'completed',
    difficulty: 'Medium',
    passingScore: 30,
    improvement: '-3'
  },
  {
    id: 4,
    examTitle: 'Biology Quiz',
    subject: 'Biology',
    date: '2024-06-20',
    time: '15:00',
    score: 45,
    totalMarks: 50,
    percentage: 90,
    grade: 'A',
    rank: 1,
    totalStudents: 41,
    timeSpent: '45m',
    status: 'completed',
    difficulty: 'Easy',
    passingScore: 30,
    improvement: '+8'
  },
  {
    id: 5,
    examTitle: 'English Essay',
    subject: 'English',
    date: '2024-06-18',
    time: '13:00',
    score: 52,
    totalMarks: 60,
    percentage: 86.7,
    grade: 'A-',
    rank: 4,
    totalStudents: 35,
    timeSpent: '1h 50m',
    status: 'completed',
    difficulty: 'Medium',
    passingScore: 36,
    improvement: '+2'
  },
  {
    id: 6,
    examTitle: 'History Test',
    subject: 'History',
    date: '2024-06-15',
    time: '10:00',
    score: 38,
    totalMarks: 50,
    percentage: 76,
    grade: 'B+',
    rank: 8,
    totalStudents: 42,
    timeSpent: '1h 15m',
    status: 'completed',
    difficulty: 'Hard',
    passingScore: 30,
    improvement: '-1'
  }
];

// Mock performance analytics
const mockPerformanceData = {
  totalExams: 6,
  averageScore: 85.2,
  bestScore: 90.7,
  worstScore: 76,
  totalTimeSpent: '9h 45m',
  averageRank: 3.8,
  improvementTrend: '+3.8',
  subjectPerformance: [
    { subject: 'Mathematics', average: 87, exams: 1, trend: 'up' },
    { subject: 'Physics', average: 90.7, exams: 1, trend: 'up' },
    { subject: 'Chemistry', average: 84, exams: 1, trend: 'down' },
    { subject: 'Biology', average: 90, exams: 1, trend: 'up' },
    { subject: 'English', average: 86.7, exams: 1, trend: 'up' },
    { subject: 'History', average: 76, exams: 1, trend: 'down' }
  ],
  gradeDistribution: {
    'A': 3,
    'B+': 2,
    'B': 1,
    'C+': 0,
    'C': 0,
    'D': 0,
    'F': 0
  },
  monthlyProgress: [
    { month: 'March', average: 78 },
    { month: 'April', average: 82 },
    { month: 'May', average: 85 },
    { month: 'June', average: 85.2 }
  ]
};

export default function StudentHistory() {
  const [examHistory, setExamHistory] = useState(mockExamHistory);
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { toast } = useToast();

  console.log('Student history page loaded:', { examHistory, performanceData });

  const handleExportHistory = () => {
    const csvContent = [
      ['Exam Title', 'Subject', 'Date', 'Score', 'Total Marks', 'Percentage', 'Grade', 'Rank', 'Time Spent'].join(','),
      ...filteredHistory.map(exam => [
        exam.examTitle,
        exam.subject,
        exam.date,
        exam.score,
        exam.totalMarks,
        exam.percentage,
        exam.grade,
        exam.rank,
        exam.timeSpent
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_exam_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Your exam history has been exported successfully.",
    });
    
    console.log('Exam history exported');
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (percentage >= 80) return <Star className="w-4 h-4 text-green-500" />;
    if (percentage >= 70) return <TrendingUp className="w-4 h-4 text-blue-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getImprovementIcon = (improvement: string) => {
    if (improvement.startsWith('+')) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (improvement.startsWith('-')) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const filteredHistory = examHistory.filter(exam => {
    const matchesSearch = exam.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || exam.subject === filterSubject;
    const matchesGrade = filterGrade === 'all' || exam.grade.startsWith(filterGrade);
    return matchesSearch && matchesSubject && matchesGrade;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'score':
        return b.percentage - a.percentage;
      case 'subject':
        return a.subject.localeCompare(b.subject);
      default:
        return 0;
    }
  });

  const uniqueSubjects = Array.from(new Set(examHistory.map(exam => exam.subject)));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="student-history-title">
              Exam History
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="student-history-subtitle">
              Track your academic progress and performance
            </p>
          </div>
          <Button variant="outline" onClick={handleExportHistory}>
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Exam History</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Exams</p>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.totalExams}</p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-full">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.averageScore}%</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-full">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Best Score</p>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.bestScore}%</p>
                    </div>
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rank</p>
                      <p className="text-2xl font-bold text-gray-900">#{performanceData.averageRank}</p>
                    </div>
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Select value={filterSubject} onValueChange={setFilterSubject}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {uniqueSubjects.map(subject => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterGrade} onValueChange={setFilterGrade}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All Grades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="A">A Grades</SelectItem>
                        <SelectItem value="B">B Grades</SelectItem>
                        <SelectItem value="C">C Grades</SelectItem>
                        <SelectItem value="D">D Grades</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Sort by Date</SelectItem>
                        <SelectItem value="score">Sort by Score</SelectItem>
                        <SelectItem value="subject">Sort by Subject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam History List */}
            <div className="space-y-4">
              {filteredHistory.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {getPerformanceIcon(exam.percentage)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900" data-macaly={`exam-${exam.id}-title`}>
                              {exam.examTitle}
                            </h3>
                            <p className="text-sm text-gray-600">{exam.subject}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={getGradeColor(exam.grade)}>
                              {exam.grade}
                            </Badge>
                            <Badge className={getDifficultyColor(exam.difficulty)}>
                              {exam.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{exam.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{exam.timeSpent}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-gray-400" />
                            <span>Rank #{exam.rank} of {exam.totalStudents}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getImprovementIcon(exam.improvement)}
                            <span className={exam.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                              {exam.improvement}% improvement
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Score: {exam.score}/{exam.totalMarks}</span>
                            <span className="font-medium">{exam.percentage}%</span>
                          </div>
                          <Progress value={exam.percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Passing: {exam.passingScore}</span>
                            <span>{exam.percentage >= (exam.passingScore / exam.totalMarks * 100) ? 'Passed' : 'Failed'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Subject Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.subjectPerformance.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                            <p className="text-sm text-gray-600">{subject.exams} exam(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">{subject.average}%</div>
                            <div className="flex items-center space-x-1">
                              {subject.trend === 'up' ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-xs ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {subject.trend === 'up' ? 'Improving' : 'Declining'}
                              </span>
                            </div>
                          </div>
                          <div className="w-24">
                            <Progress value={subject.average} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Grade Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(performanceData.gradeDistribution).map(([grade, count]) => (
                      <div key={grade} className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">Grade {grade}</div>
                        <Badge className={getGradeColor(grade)} variant="secondary">
                          {((count / performanceData.totalExams) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Performance Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Target Average Score</h4>
                        <p className="text-sm text-gray-600">Goal: 90% | Current: {performanceData.averageScore}%</p>
                      </div>
                      <div className="w-32">
                        <Progress value={(performanceData.averageScore / 90) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Improvement Trend</h4>
                        <p className="text-sm text-gray-600">Last 4 exams: {performanceData.improvementTrend}%</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">On Track</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {filteredHistory.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No exam history found</h3>
              <p className="text-gray-600">
                {searchTerm || filterSubject !== 'all' || filterGrade !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Your completed exams will appear here.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}