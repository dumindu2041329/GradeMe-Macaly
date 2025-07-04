"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Download, 
  Search,
  Filter,
  FileText,
  Trophy,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock exam results data
const mockResults = [
  {
    id: 1,
    examId: 1,
    examTitle: 'Mathematics Final Exam',
    studentId: 'ST001',
    studentName: 'Kasun Perera',
    studentEmail: 'kasun@student.com',
    score: 87,
    totalMarks: 100,
    percentage: 87,
    grade: 'A-',
    rank: 3,
    totalStudents: 45,
    submissionTime: '2024-06-28 11:45',
    timeSpent: '2h 45m',
    status: 'completed',
    subject: 'Mathematics'
  },
  {
    id: 2,
    examId: 1,
    examTitle: 'Mathematics Final Exam',
    studentId: 'ST002',
    studentName: 'Nimali Silva',
    studentEmail: 'nimali@student.com',
    score: 94,
    totalMarks: 100,
    percentage: 94,
    grade: 'A',
    rank: 1,
    totalStudents: 45,
    submissionTime: '2024-06-28 11:32',
    timeSpent: '2h 32m',
    status: 'completed',
    subject: 'Mathematics'
  },
  {
    id: 3,
    examId: 2,
    examTitle: 'Physics Midterm',
    studentId: 'ST001',
    studentName: 'Kasun Perera',
    studentEmail: 'kasun@student.com',
    score: 68,
    totalMarks: 75,
    percentage: 90.7,
    grade: 'A',
    rank: 2,
    totalStudents: 38,
    submissionTime: '2024-06-25 10:28',
    timeSpent: '1h 58m',
    status: 'completed',
    subject: 'Physics'
  },
  {
    id: 4,
    examId: 3,
    examTitle: 'Chemistry Quiz',
    studentId: 'ST003',
    studentName: 'Ruwan Fernando',
    studentEmail: 'ruwan@student.com',
    score: 38,
    totalMarks: 50,
    percentage: 76,
    grade: 'B+',
    rank: 12,
    totalStudents: 52,
    submissionTime: '2024-06-30 09:45',
    timeSpent: '55m',
    status: 'completed',
    subject: 'Chemistry'
  },
  {
    id: 5,
    examId: 1,
    examTitle: 'Mathematics Final Exam',
    studentId: 'ST005',
    studentName: 'Dinesh Wickramasinghe',
    studentEmail: 'dinesh@student.com',
    score: 91,
    totalMarks: 100,
    percentage: 91,
    grade: 'A',
    rank: 2,
    totalStudents: 45,
    submissionTime: '2024-06-28 11:55',
    timeSpent: '2h 55m',
    status: 'completed',
    subject: 'Mathematics'
  }
];

// Mock exam statistics
const mockExamStats = [
  {
    examId: 1,
    examTitle: 'Mathematics Final Exam',
    totalStudents: 45,
    completedStudents: 45,
    averageScore: 78.5,
    highestScore: 94,
    lowestScore: 45,
    passingRate: 82.2,
    subject: 'Mathematics'
  },
  {
    examId: 2,
    examTitle: 'Physics Midterm',
    totalStudents: 38,
    completedStudents: 36,
    averageScore: 71.3,
    highestScore: 92,
    lowestScore: 38,
    passingRate: 75.0,
    subject: 'Physics'
  },
  {
    examId: 3,
    examTitle: 'Chemistry Quiz',
    totalStudents: 52,
    completedStudents: 48,
    averageScore: 68.7,
    highestScore: 88,
    lowestScore: 32,
    passingRate: 69.2,
    subject: 'Chemistry'
  }
];

export default function AdminResults() {
  const [results, setResults] = useState(mockResults);
  const [examStats, setExamStats] = useState(mockExamStats);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [selectedView, setSelectedView] = useState('results');
  const { toast } = useToast();

  console.log('Admin results page loaded:', { results, examStats, selectedView });

  const handleExportResults = (format: string) => {
    let content = '';
    let filename = '';
    
    if (format === 'csv') {
      content = [
        ['Student ID', 'Student Name', 'Exam Title', 'Score', 'Total Marks', 'Percentage', 'Grade', 'Rank', 'Subject', 'Submission Time'].join(','),
        ...filteredResults.map(result => [
          result.studentId,
          result.studentName,
          result.examTitle,
          result.score,
          result.totalMarks,
          result.percentage,
          result.grade,
          result.rank,
          result.subject,
          result.submissionTime
        ].join(','))
      ].join('\n');
      filename = 'exam_results.csv';
    } else if (format === 'json') {
      content = JSON.stringify(filteredResults, null, 2);
      filename = 'exam_results.json';
    }

    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `Results exported as ${format.toUpperCase()} successfully.`,
    });
    
    console.log(`Results exported as ${format}`);
  };

  const handleExportStatistics = () => {
    const content = [
      ['Exam Title', 'Subject', 'Total Students', 'Completed', 'Average Score', 'Highest Score', 'Lowest Score', 'Passing Rate'].join(','),
      ...examStats.map(stat => [
        stat.examTitle,
        stat.subject,
        stat.totalStudents,
        stat.completedStudents,
        stat.averageScore,
        stat.highestScore,
        stat.lowestScore,
        `${stat.passingRate}%`
      ].join(','))
    ].join('\n');

    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam_statistics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Statistics Exported",
      description: "Exam statistics exported successfully.",
    });
    
    console.log('Statistics exported');
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (percentage >= 80) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (percentage >= 60) return <Star className="w-4 h-4 text-blue-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.examTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = filterExam === 'all' || result.examId.toString() === filterExam;
    const matchesSubject = filterSubject === 'all' || result.subject === filterSubject;
    const matchesGrade = filterGrade === 'all' || result.grade.startsWith(filterGrade);
    return matchesSearch && matchesExam && matchesSubject && matchesGrade;
  });

  const uniqueExams = Array.from(new Set(results.map(r => ({ id: r.examId, title: r.examTitle }))))
    .reduce((acc, curr) => {
      if (!acc.find(item => item.id === curr.id)) {
        acc.push(curr);
      }
      return acc;
    }, [] as { id: number; title: string }[]);

  const uniqueSubjects = Array.from(new Set(results.map(r => r.subject)));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="admin-results-title">
              Results Management
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="admin-results-subtitle">
              View, analyze, and export exam results
            </p>
          </div>
          <div className="flex space-x-3">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="results">Individual Results</SelectItem>
                <SelectItem value="statistics">Exam Statistics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => handleExportResults('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExportResults('json')}>
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Results</p>
                  <p className="text-2xl font-bold text-gray-900">{results.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {(results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)}%
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Top Performer</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...results.map(r => r.percentage)).toFixed(1)}%
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Unique Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(results.map(r => r.studentId)).size}
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedView === 'results' ? (
          <>
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search students or exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Select value={filterExam} onValueChange={setFilterExam}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Exams" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Exams</SelectItem>
                        {uniqueExams.map(exam => (
                          <SelectItem key={exam.id} value={exam.id.toString()}>
                            {exam.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="F">F Grades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{result.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{result.studentName}</p>
                              <p className="text-sm text-gray-500">{result.studentId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{result.examTitle}</p>
                            <p className="text-sm text-gray-500">{result.subject}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {getPerformanceIcon(result.percentage)}
                              <span className="font-medium">{result.score}/{result.totalMarks}</span>
                            </div>
                            <div className="w-24">
                              <Progress value={result.percentage} className="h-2" />
                            </div>
                            <span className="text-xs text-gray-500">{result.percentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium text-gray-900">#{result.rank}</div>
                            <div className="text-xs text-gray-500">of {result.totalStudents}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{result.timeSpent}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{result.submissionTime}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Exam Statistics */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Exam Statistics</h2>
              <Button variant="outline" onClick={handleExportStatistics}>
                <Download className="w-4 h-4 mr-2" />
                Export Statistics
              </Button>
            </div>

            <div className="space-y-4">
              {examStats.map((stat) => (
                <Card key={stat.examId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900" data-macaly={`stat-${stat.examId}-title`}>
                          {stat.examTitle}
                        </h3>
                        <p className="text-sm text-gray-600">{stat.subject}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {stat.completedStudents}/{stat.totalStudents} completed
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{stat.averageScore}%</div>
                        <div className="text-sm text-gray-600">Average Score</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{stat.highestScore}%</div>
                        <div className="text-sm text-gray-600">Highest Score</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{stat.lowestScore}%</div>
                        <div className="text-sm text-gray-600">Lowest Score</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{stat.passingRate}%</div>
                        <div className="text-sm text-gray-600">Passing Rate</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Performance</span>
                        <span>{stat.averageScore}%</span>
                      </div>
                      <Progress value={stat.averageScore} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {filteredResults.length === 0 && selectedView === 'results' && (
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                {searchTerm || filterExam !== 'all' || filterSubject !== 'all' || filterGrade !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No exam results available yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}