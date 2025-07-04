"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  Users,
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock exam data
const mockExams = [
  {
    id: 1,
    title: 'Mathematics Final Exam',
    subject: 'Mathematics',
    description: 'Comprehensive final exam covering all topics from the semester',
    date: '2024-07-10',
    time: '14:00',
    duration: '3 hours',
    totalMarks: 100,
    status: 'scheduled',
    enrolledStudents: 45,
    createdBy: 'Dr. Smith',
    createdDate: '2024-06-15'
  },
  {
    id: 2,
    title: 'Physics Midterm',
    subject: 'Physics',
    description: 'Midterm examination covering mechanics and thermodynamics',
    date: '2024-07-05',
    time: '10:00',
    duration: '2 hours',
    totalMarks: 75,
    status: 'active',
    enrolledStudents: 38,
    createdBy: 'Prof. Johnson',
    createdDate: '2024-06-20'
  },
  {
    id: 3,
    title: 'Chemistry Quiz',
    subject: 'Chemistry',
    description: 'Quick assessment on organic chemistry fundamentals',
    date: '2024-06-30',
    time: '09:00',
    duration: '1 hour',
    totalMarks: 50,
    status: 'completed',
    enrolledStudents: 52,
    createdBy: 'Dr. Williams',
    createdDate: '2024-06-25'
  },
  {
    id: 4,
    title: 'Biology Test',
    subject: 'Biology',
    description: 'Test on cell biology and genetics',
    date: '2024-07-08',
    time: '11:00',
    duration: '2.5 hours',
    totalMarks: 80,
    status: 'scheduled',
    enrolledStudents: 41,
    createdBy: 'Dr. Brown',
    createdDate: '2024-06-18'
  }
];

export default function AdminExams() {
  const [exams, setExams] = useState(mockExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: 100
  });

  console.log('Admin exams page loaded:', { exams, searchTerm, filterStatus });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateExam = () => {
    if (!formData.title || !formData.subject || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newExam = {
      id: exams.length + 1,
      ...formData,
      status: 'scheduled',
      enrolledStudents: 0,
      createdBy: 'Current Admin',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setExams([newExam, ...exams]);
    setFormData({
      title: '',
      subject: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      totalMarks: 100
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Exam Created",
      description: "The exam has been created successfully.",
    });
    
    console.log('New exam created:', newExam);
  };

  const handleEditExam = (exam: any) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title,
      subject: exam.subject,
      description: exam.description,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      totalMarks: exam.totalMarks
    });
  };

  const handleUpdateExam = () => {
    if (!formData.title || !formData.subject || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedExams = exams.map(exam => 
      exam.id === editingExam.id 
        ? { ...exam, ...formData }
        : exam
    );

    setExams(updatedExams);
    setEditingExam(null);
    setFormData({
      title: '',
      subject: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      totalMarks: 100
    });
    
    toast({
      title: "Exam Updated",
      description: "The exam has been updated successfully.",
    });
    
    console.log('Exam updated:', editingExam.id);
  };

  const handleDeleteExam = (examId: number) => {
    const updatedExams = exams.filter(exam => exam.id !== examId);
    setExams(updatedExams);
    
    toast({
      title: "Exam Deleted",
      description: "The exam has been deleted successfully.",
    });
    
    console.log('Exam deleted:', examId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const ExamForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Exam Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter exam title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="History">History</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            placeholder="e.g., 2 hours"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalMarks">Total Marks</Label>
          <Input
            id="totalMarks"
            type="number"
            value={formData.totalMarks}
            onChange={(e) => handleInputChange('totalMarks', e.target.value)}
            min="1"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter exam description"
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="admin-exams-title">
              Exam Management
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="admin-exams-subtitle">
              Create, manage, and monitor all exams
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
              </DialogHeader>
              <ExamForm />
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateExam} className="bg-blue-600 hover:bg-blue-700">
                  Create Exam
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exams List */}
        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900" data-macaly={`exam-${exam.id}-title`}>
                          {exam.title}
                        </h3>
                        <p className="text-sm text-gray-600">{exam.subject}</p>
                      </div>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{exam.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{exam.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{exam.enrolledStudents} students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{exam.totalMarks} marks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEditExam(exam)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Exam</DialogTitle>
                        </DialogHeader>
                        <ExamForm />
                        <div className="flex justify-end space-x-2 mt-6">
                          <Button variant="outline" onClick={() => setEditingExam(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateExam} className="bg-blue-600 hover:bg-blue-700">
                            Update Exam
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first exam to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}