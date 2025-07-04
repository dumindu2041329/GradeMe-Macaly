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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BookOpen, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  FileText,
  HelpCircle,
  CheckCircle,
  X,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock papers data
const mockPapers = [
  {
    id: 1,
    title: 'Mathematics Final Paper',
    examId: 1,
    examTitle: 'Mathematics Final Exam',
    subject: 'Mathematics',
    totalQuestions: 25,
    totalMarks: 100,
    duration: '3 hours',
    instructions: 'Answer all questions. Show all working. Calculator allowed.',
    createdDate: '2024-06-15',
    status: 'published'
  },
  {
    id: 2,
    title: 'Physics Theory Paper',
    examId: 2,
    examTitle: 'Physics Midterm',
    subject: 'Physics',
    totalQuestions: 15,
    totalMarks: 75,
    duration: '2 hours',
    instructions: 'Answer all questions. Formula sheet provided.',
    createdDate: '2024-06-20',
    status: 'draft'
  }
];

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    paperId: 1,
    questionNumber: 1,
    type: 'multiple-choice',
    question: 'What is the derivative of x²?',
    options: ['2x', 'x²', '2x²', 'x'],
    correctAnswer: '2x',
    explanation: 'The derivative of x² is 2x using the power rule.',
    marks: 2,
    difficulty: 'Easy'
  },
  {
    id: 2,
    paperId: 1,
    questionNumber: 2,
    type: 'short-answer',
    question: 'Solve the equation 2x + 5 = 13',
    correctAnswer: 'x = 4',
    explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
    marks: 3,
    difficulty: 'Medium'
  },
  {
    id: 3,
    paperId: 1,
    questionNumber: 3,
    type: 'essay',
    question: 'Explain the concept of limits in calculus with examples.',
    correctAnswer: '',
    explanation: 'Students should demonstrate understanding of limit concepts, notation, and provide relevant examples.',
    marks: 10,
    difficulty: 'Hard'
  }
];

export default function AdminPapers() {
  const [papers, setPapers] = useState(mockPapers);
  const [questions, setQuestions] = useState(mockQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const [isCreatePaperDialogOpen, setIsCreatePaperDialogOpen] = useState(false);
  const [isCreateQuestionDialogOpen, setIsCreateQuestionDialogOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState<any>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const { toast } = useToast();

  // Paper form state
  const [paperForm, setPaperForm] = useState({
    title: '',
    examId: '',
    subject: '',
    duration: '',
    instructions: ''
  });

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    marks: 1,
    difficulty: 'Medium'
  });

  console.log('Admin papers page loaded:', { papers, questions, selectedPaper });

  const handlePaperInputChange = (field: string, value: string) => {
    setPaperForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuestionInputChange = (field: string, value: any) => {
    setQuestionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const resetPaperForm = () => {
    setPaperForm({
      title: '',
      examId: '',
      subject: '',
      duration: '',
      instructions: ''
    });
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      marks: 1,
      difficulty: 'Medium'
    });
  };

  const handleCreatePaper = () => {
    if (!paperForm.title || !paperForm.subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newPaper = {
      id: papers.length + 1,
      ...paperForm,
      examId: parseInt(paperForm.examId) || 0,
      examTitle: `${paperForm.subject} Exam`,
      totalQuestions: 0,
      totalMarks: 0,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };

    setPapers([newPaper, ...papers]);
    resetPaperForm();
    setIsCreatePaperDialogOpen(false);
    
    toast({
      title: "Paper Created",
      description: "The exam paper has been created successfully.",
    });
    
    console.log('New paper created:', newPaper);
  };

  const handleCreateQuestion = () => {
    if (!questionForm.question || !selectedPaper) {
      toast({
        title: "Error",
        description: "Please fill in the question and select a paper.",
        variant: "destructive",
      });
      return;
    }

    const paperQuestions = questions.filter(q => q.paperId === selectedPaper.id);
    const newQuestion = {
      id: questions.length + 1,
      paperId: selectedPaper.id,
      questionNumber: paperQuestions.length + 1,
      ...questionForm
    };

    setQuestions([...questions, newQuestion]);
    
    // Update paper totals
    const updatedPapers = papers.map(paper => 
      paper.id === selectedPaper.id 
        ? { 
            ...paper, 
            totalQuestions: paper.totalQuestions + 1,
            totalMarks: paper.totalMarks + questionForm.marks
          }
        : paper
    );
    setPapers(updatedPapers);
    
    resetQuestionForm();
    setIsCreateQuestionDialogOpen(false);
    
    toast({
      title: "Question Added",
      description: "The question has been added to the paper.",
    });
    
    console.log('New question created:', newQuestion);
  };

  const handleDeletePaper = (paperId: number) => {
    const updatedPapers = papers.filter(paper => paper.id !== paperId);
    const updatedQuestions = questions.filter(q => q.paperId !== paperId);
    setPapers(updatedPapers);
    setQuestions(updatedQuestions);
    
    if (selectedPaper?.id === paperId) {
      setSelectedPaper(null);
    }
    
    toast({
      title: "Paper Deleted",
      description: "The paper and all its questions have been deleted.",
    });
    
    console.log('Paper deleted:', paperId);
  };

  const handleDeleteQuestion = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    
    // Update paper totals
    const updatedPapers = papers.map(paper => 
      paper.id === question.paperId 
        ? { 
            ...paper, 
            totalQuestions: paper.totalQuestions - 1,
            totalMarks: paper.totalMarks - question.marks
          }
        : paper
    );
    setPapers(updatedPapers);
    
    toast({
      title: "Question Deleted",
      description: "The question has been removed from the paper.",
    });
    
    console.log('Question deleted:', questionId);
  };

  const handleDuplicateQuestion = (questionId: number) => {
    const originalQuestion = questions.find(q => q.id === questionId);
    if (!originalQuestion) return;

    const paperQuestions = questions.filter(q => q.paperId === originalQuestion.paperId);
    const duplicatedQuestion = {
      ...originalQuestion,
      id: questions.length + 1,
      questionNumber: paperQuestions.length + 1,
      question: `${originalQuestion.question} (Copy)`
    };

    setQuestions([...questions, duplicatedQuestion]);
    
    // Update paper totals
    const updatedPapers = papers.map(paper => 
      paper.id === originalQuestion.paperId 
        ? { 
            ...paper, 
            totalQuestions: paper.totalQuestions + 1,
            totalMarks: paper.totalMarks + originalQuestion.marks
          }
        : paper
    );
    setPapers(updatedPapers);
    
    toast({
      title: "Question Duplicated",
      description: "The question has been duplicated successfully.",
    });
    
    console.log('Question duplicated:', duplicatedQuestion);
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'short-answer': return <Edit className="w-4 h-4 text-green-500" />;
      case 'essay': return <FileText className="w-4 h-4 text-purple-500" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || paper.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedPaperQuestions = selectedPaper 
    ? questions.filter(q => q.paperId === selectedPaper.id)
    : [];

  const PaperForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paperTitle">Paper Title *</Label>
          <Input
            id="paperTitle"
            value={paperForm.title}
            onChange={(e) => handlePaperInputChange('title', e.target.value)}
            placeholder="Enter paper title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Select value={paperForm.subject} onValueChange={(value) => handlePaperInputChange('subject', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={paperForm.duration}
            onChange={(e) => handlePaperInputChange('duration', e.target.value)}
            placeholder="e.g., 3 hours"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="examId">Exam ID</Label>
          <Input
            id="examId"
            value={paperForm.examId}
            onChange={(e) => handlePaperInputChange('examId', e.target.value)}
            placeholder="Enter exam ID"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          value={paperForm.instructions}
          onChange={(e) => handlePaperInputChange('instructions', e.target.value)}
          placeholder="Enter exam instructions"
          rows={3}
        />
      </div>
    </div>
  );

  const QuestionForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="questionType">Question Type</Label>
          <Select value={questionForm.type} onValueChange={(value) => handleQuestionInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={questionForm.difficulty} onValueChange={(value) => handleQuestionInputChange('difficulty', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="question">Question *</Label>
        <Textarea
          id="question"
          value={questionForm.question}
          onChange={(e) => handleQuestionInputChange('question', e.target.value)}
          placeholder="Enter your question"
          rows={3}
        />
      </div>

      {questionForm.type === 'multiple-choice' && (
        <div className="space-y-2">
          <Label>Options</Label>
          {questionForm.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm font-medium w-6">{String.fromCharCode(65 + index)}.</span>
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                className="flex-1"
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="correctAnswer">Correct Answer</Label>
            <Select value={questionForm.correctAnswer} onValueChange={(value) => handleQuestionInputChange('correctAnswer', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select correct answer" />
              </SelectTrigger>
              <SelectContent>
                {questionForm.options.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {String.fromCharCode(65 + index)}. {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {questionForm.type === 'short-answer' && (
        <div className="space-y-2">
          <Label htmlFor="correctAnswer">Expected Answer</Label>
          <Input
            id="correctAnswer"
            value={questionForm.correctAnswer}
            onChange={(e) => handleQuestionInputChange('correctAnswer', e.target.value)}
            placeholder="Enter the expected answer"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="marks">Marks</Label>
          <Input
            id="marks"
            type="number"
            value={questionForm.marks}
            onChange={(e) => handleQuestionInputChange('marks', parseInt(e.target.value))}
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation</Label>
        <Textarea
          id="explanation"
          value={questionForm.explanation}
          onChange={(e) => handleQuestionInputChange('explanation', e.target.value)}
          placeholder="Enter explanation or marking guide"
          rows={2}
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
            <h1 className="text-3xl font-bold text-gray-900" data-macaly="admin-papers-title">
              Paper & Question Management
            </h1>
            <p className="text-gray-600 mt-1" data-macaly="admin-papers-subtitle">
              Create and manage exam papers with questions
            </p>
          </div>
          <Dialog open={isCreatePaperDialogOpen} onOpenChange={setIsCreatePaperDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Paper
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Paper</DialogTitle>
              </DialogHeader>
              <PaperForm />
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreatePaperDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePaper} className="bg-blue-600 hover:bg-blue-700">
                  Create Paper
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="papers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="papers">Papers</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="papers">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search papers..."
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
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Papers List */}
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900" data-macaly={`paper-${paper.id}-title`}>
                              {paper.title}
                            </h3>
                            <p className="text-sm text-gray-600">{paper.subject}</p>
                          </div>
                          <Badge className={getStatusColor(paper.status)}>
                            {paper.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Questions:</span>
                            <span className="ml-1 font-medium">{paper.totalQuestions}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Marks:</span>
                            <span className="ml-1 font-medium">{paper.totalMarks}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-1 font-medium">{paper.duration || 'Not set'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Created:</span>
                            <span className="ml-1 font-medium">{paper.createdDate}</span>
                          </div>
                        </div>
                        
                        {paper.instructions && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {paper.instructions}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedPaper(paper)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeletePaper(paper.id)}
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
          </TabsContent>

          <TabsContent value="questions">
            {selectedPaper ? (
              <div className="space-y-6">
                {/* Selected Paper Info */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {selectedPaper.title}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Dialog open={isCreateQuestionDialogOpen} onOpenChange={setIsCreateQuestionDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700">
                              <PlusCircle className="w-4 h-4 mr-2" />
                              Add Question
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Add New Question</DialogTitle>
                            </DialogHeader>
                            <QuestionForm />
                            <div className="flex justify-end space-x-2 mt-6">
                              <Button variant="outline" onClick={() => setIsCreateQuestionDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleCreateQuestion} className="bg-green-600 hover:bg-green-700">
                                Add Question
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" onClick={() => setSelectedPaper(null)}>
                          <X className="w-4 h-4 mr-2" />
                          Close
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Questions:</span>
                        <span className="ml-1 font-medium">{selectedPaper.totalQuestions}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Marks:</span>
                        <span className="ml-1 font-medium">{selectedPaper.totalMarks}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Subject:</span>
                        <span className="ml-1 font-medium">{selectedPaper.subject}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Questions List */}
                <div className="space-y-4">
                  {selectedPaperQuestions.map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {question.questionNumber}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getQuestionTypeIcon(question.type)}
                                <span className="text-sm font-medium text-gray-600 capitalize">
                                  {question.type.replace('-', ' ')}
                                </span>
                              </div>
                              <Badge className={getDifficultyColor(question.difficulty)}>
                                {question.difficulty}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {question.marks} marks
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-gray-900 font-medium mb-2">
                                {question.question}
                              </p>
                              
                              {question.type === 'multiple-choice' && question.options && (
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                  {question.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <span className="text-sm font-medium w-6">
                                        {String.fromCharCode(65 + index)}.
                                      </span>
                                      <span className={`text-sm ${option === question.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                                        {option}
                                      </span>
                                      {option === question.correctAnswer && (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {question.type === 'short-answer' && question.correctAnswer && (
                                <div className="mb-2">
                                  <span className="text-sm font-medium text-gray-700">Expected Answer: </span>
                                  <span className="text-sm text-green-600 font-medium">{question.correctAnswer}</span>
                                </div>
                              )}
                              
                              {question.explanation && (
                                <div className="bg-gray-50 p-2 rounded text-sm text-gray-600">
                                  <span className="font-medium">Explanation: </span>
                                  {question.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDuplicateQuestion(question.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-gray-600 hover:text-gray-700"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteQuestion(question.id)}
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

                {selectedPaperQuestions.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions yet</h3>
                      <p className="text-gray-600 mb-4">
                        Start building your exam paper by adding questions.
                      </p>
                      <Button 
                        onClick={() => setIsCreateQuestionDialogOpen(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add First Question
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Paper</h3>
                  <p className="text-gray-600">
                    Choose a paper from the Papers tab to manage its questions.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}