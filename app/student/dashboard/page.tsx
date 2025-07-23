"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Award,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react'

export default function StudentDashboard() {
  console.log("Student dashboard rendered")

  const stats = [
    {
      title: "Average Score",
      value: "85.4%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
      title: "Completed Exams", 
      value: "24",
      change: "+3",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Upcoming Exams",
      value: "5",
      change: "This week",
      icon: Calendar,
      color: "text-purple-600", 
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Study Hours",
      value: "127h",
      change: "+12h",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    }
  ]

  const activeExams = [
    { 
      name: "Mathematics Final", 
      subject: "Mathematics",
      dueDate: "Dec 28, 2024", 
      duration: "2 hours",
      status: "available" 
    },
    { 
      name: "Physics Midterm", 
      subject: "Physics",
      dueDate: "Dec 30, 2024", 
      duration: "1.5 hours",
      status: "available" 
    },
    { 
      name: "Chemistry Quiz", 
      subject: "Chemistry",
      dueDate: "Jan 2, 2025", 
      duration: "45 minutes",
      status: "upcoming" 
    },
  ]

  const recentResults = [
    { name: "Biology Test", score: 92, maxScore: 100, grade: "A", date: "Dec 20" },
    { name: "History Essay", score: 78, maxScore: 100, grade: "B+", date: "Dec 18" },
    { name: "English Literature", score: 88, maxScore: 100, grade: "A-", date: "Dec 15" },
    { name: "Computer Science", score: 95, maxScore: 100, grade: "A", date: "Dec 12" },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", average: 87, trend: "up" },
    { subject: "Physics", average: 82, trend: "up" },
    { subject: "Chemistry", average: 91, trend: "stable" },
    { subject: "Biology", average: 76, trend: "down" }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-macaly="student-dashboard-title">
          My Dashboard
        </h1>
        <p className="text-muted-foreground" data-macaly="student-dashboard-subtitle">
          Track your academic progress and upcoming assessments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="magnetic-hover" data-macaly={`student-stat-card-${index + 1}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${stat.color}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Exams */}
        <Card className="lg:col-span-2 magnetic-hover" data-macaly="active-exams-card">
          <CardHeader>
            <CardTitle>Active Exams</CardTitle>
            <CardDescription>Exams available for you to take</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeExams.map((exam, index) => (
                <div key={exam.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-medium">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground">{exam.subject}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {exam.dueDate}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {exam.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={exam.status === 'available' ? 'default' : 'secondary'}
                      className="mb-2"
                    >
                      {exam.status === 'available' ? (
                        <><CheckCircle className="w-3 h-3 mr-1" />Available</>
                      ) : (
                        <><AlertCircle className="w-3 h-3 mr-1" />Upcoming</>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="magnetic-hover" data-macaly="recent-results-card">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Your latest exam scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{result.name}</h4>
                    <p className="text-xs text-muted-foreground">{result.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{result.score}/{result.maxScore}</div>
                    <Badge variant={
                      result.grade.startsWith('A') ? 'default' : 
                      result.grade.startsWith('B') ? 'secondary' : 'outline'
                    } className="text-xs">
                      {result.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="magnetic-hover" data-macaly="subject-performance-card">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your average scores by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span>{subject.average}%</span>
                    {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                    {subject.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                    {subject.trend === 'stable' && <BarChart3 className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
                <Progress value={subject.average} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="magnetic-hover" data-macaly="study-goals-card">
          <CardHeader>
            <CardTitle>Study Goals</CardTitle>
            <CardDescription>Track your academic objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Monthly Study Hours</span>
                <span className="font-medium">127/150 hours</span>
              </div>
              <Progress value={84} className="h-2" />
              <p className="text-xs text-muted-foreground">23 hours remaining</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Target Average Score</span>
                <span className="font-medium">85.4/90%</span>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-muted-foreground">4.6% to goal</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Exams This Month</span>
                <span className="font-medium">8/12 completed</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground">4 exams remaining</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-medium">Achievement: Dean's List Candidate</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Maintain 85%+ average to qualify
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="magnetic-hover" data-macaly="quick-actions-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors magnetic-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Take Available Exam</p>
                  <p className="text-sm text-muted-foreground">Start an exam</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors magnetic-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium">View Results</p>
                  <p className="text-sm text-muted-foreground">Check exam scores</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors magnetic-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Study Schedule</p>
                  <p className="text-sm text-muted-foreground">Plan study time</p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}