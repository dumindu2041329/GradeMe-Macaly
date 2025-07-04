"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  BarChart3,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock students data
const mockStudents = [
  {
    id: 1,
    studentId: 'ST001',
    name: 'Kasun Perera',
    email: 'kasun@student.com',
    phone: '+94 71 234 5678',
    address: 'Colombo, Sri Lanka',
    enrollmentDate: '2024-01-15',
    status: 'active',
    grade: 'Grade 12',
    averageScore: 87.5,
    totalExams: 15,
    profilePhoto: ''
  },
  {
    id: 2,
    studentId: 'ST002',
    name: 'Nimali Silva',
    email: 'nimali@student.com',
    phone: '+94 77 345 6789',
    address: 'Kandy, Sri Lanka',
    enrollmentDate: '2024-01-20',
    status: 'active',
    grade: 'Grade 12',
    averageScore: 92.3,
    totalExams: 18,
    profilePhoto: ''
  },
  {
    id: 3,
    studentId: 'ST003',
    name: 'Ruwan Fernando',
    email: 'ruwan@student.com',
    phone: '+94 70 456 7890',
    address: 'Galle, Sri Lanka',
    enrollmentDate: '2024-02-01',
    status: 'active',
    grade: 'Grade 11',
    averageScore: 78.9,
    totalExams: 12,
    profilePhoto: ''
  },
  {
    id: 4,
    studentId: 'ST004',
    name: 'Sachini Rajapakse',
    email: 'sachini@student.com',
    phone: '+94 75 567 8901',
    address: 'Matara, Sri Lanka',
    enrollmentDate: '2024-02-10',
    status: 'inactive',
    grade: 'Grade 11',
    averageScore: 65.2,
    totalExams: 8,
    profilePhoto: ''
  },
  {
    id: 5,
    studentId: 'ST005',
    name: 'Dinesh Wickramasinghe',
    email: 'dinesh@student.com',
    phone: '+94 76 678 9012',
    address: 'Negombo, Sri Lanka',
    enrollmentDate: '2024-02-15',
    status: 'active',
    grade: 'Grade 12',
    averageScore: 89.7,
    totalExams: 16,
    profilePhoto: ''
  }
];

export default function AdminStudents() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  console.log('Admin students page loaded:', { students, searchTerm, filterStatus, filterGrade });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      grade: '',
      enrollmentDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleCreateStudent = () => {
    if (!formData.studentId || !formData.name || !formData.email || !formData.grade) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newStudent = {
      id: students.length + 1,
      ...formData,
      status: 'active',
      averageScore: 0,
      totalExams: 0,
      profilePhoto: ''
    };

    setStudents([newStudent, ...students]);
    resetForm();
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Student Created",
      description: "The student has been added successfully.",
    });
    
    console.log('New student created:', newStudent);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      grade: student.grade,
      enrollmentDate: student.enrollmentDate
    });
  };

  const handleUpdateStudent = () => {
    if (!formData.studentId || !formData.name || !formData.email || !formData.grade) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedStudents = students.map(student => 
      student.id === editingStudent.id 
        ? { ...student, ...formData }
        : student
    );

    setStudents(updatedStudents);
    setEditingStudent(null);
    resetForm();
    
    toast({
      title: "Student Updated",
      description: "The student information has been updated successfully.",
    });
    
    console.log('Student updated:', editingStudent.id);
  };

  const handleDeleteStudent = (studentId: number) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    
    toast({
      title: "Student Deleted",
      description: "The student has been removed successfully.",
    });
    
    console.log('Student deleted:', studentId);
  };

  const handleToggleStatus = (studentId: number) => {
    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    );

    setStudents(updatedStudents);
    
    toast({
      title: "Status Updated",
      description: "Student status has been changed.",
    });
    
    console.log('Student status toggled:', studentId);
  };

  const handleExportStudents = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Email', 'Phone', 'Grade', 'Status', 'Average Score', 'Total Exams'].join(','),
      ...students.map(student => [
        student.studentId,
        student.name,
        student.email,
        student.phone,
        student.grade,
        student.status,
        student.averageScore,
        student.totalExams
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Students data has been exported to CSV.",
    });
    
    console.log('Students exported to CSV');
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const StudentForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID *</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => handleInputChange('studentId', e.target.value)}
            placeholder="e.g., ST001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter student name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">Grade *</Label>
          <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 9">Grade 9</SelectItem>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 11">Grade 11</SelectItem>
              <SelectItem value="Grade 12">Grade 12</SelectItem>
              <SelectItem value="Grade 13">Grade 13</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="enrollmentDate">Enrollment Date</Label>
          <Input
            id="enrollmentDate"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter student address"
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
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="admin-students-title">
              Student Management
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="admin-students-subtitle">
              Manage student registrations and information
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleExportStudents}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <StudentForm />
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStudent} className="bg-blue-600 hover:bg-blue-700">
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <GraduationCap className="w-6 h-6 text-white" />
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
                    {(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Exams Taken</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.reduce((sum, s) => sum + s.totalExams, 0)}
                  </p>
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-white" />
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
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="Grade 9">Grade 9</SelectItem>
                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                    <SelectItem value="Grade 11">Grade 11</SelectItem>
                    <SelectItem value="Grade 12">Grade 12</SelectItem>
                    <SelectItem value="Grade 13">Grade 13</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.profilePhoto} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{student.email}</span>
                        </div>
                        {student.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{student.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{student.grade}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`text-sm font-medium ${getGradeColor(student.averageScore)}`}>
                          {student.averageScore}% avg
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.totalExams} exams
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusColor(student.status)} cursor-pointer`}
                        onClick={() => handleToggleStatus(student.id)}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                            </DialogHeader>
                            <StudentForm />
                            <div className="flex justify-end space-x-2 mt-6">
                              <Button variant="outline" onClick={() => setEditingStudent(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleUpdateStudent} className="bg-blue-600 hover:bg-blue-700">
                                Update Student
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' || filterGrade !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first student to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}