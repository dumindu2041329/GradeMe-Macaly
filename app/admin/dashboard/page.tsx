"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Calendar,
  Clock,
  Target,
  CheckCircle
} from 'lucide-react'

export default function AdminDashboard() {
  console.log("Admin dashboard rendered")

  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Active Exams", 
      value: "23",
      change: "+5",
      icon: BookOpen,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
      title: "Average Score",
      value: "78.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-purple-600", 
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Completed Exams",
      value: "156",
      change: "+18",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    }
  ]

  const recentExams = [
    { name: "Mathematics Final", students: 145, avgScore: 82, status: "completed" },
    { name: "Physics Midterm", students: 98, avgScore: 76, status: "active" },
    { name: "Chemistry Quiz", students: 67, avgScore: 89, status: "active" },
    { name: "Biology Test", students: 134, avgScore: 74, status: "scheduled" },
  ]

  const upcomingExams = [
    { name: "English Literature", date: "Tomorrow", time: "10:00 AM" },
    { name: "History Final", date: "Dec 28", time: "2:00 PM" },
    { name: "Computer Science", date: "Dec 30", time: "9:00 AM" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-macaly="dashboard-title">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground" data-macaly="dashboard-subtitle">
          Welcome back! Here's what's happening with your exams today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="magnetic-hover" data-macaly={`stat-card-${index + 1}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${stat.color}`}>
                    {stat.change} from last month
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
        {/* Recent Exams */}
        <Card className="lg:col-span-2 magnetic-hover" data-macaly="recent-exams-card">
          <CardHeader>
            <CardTitle>Recent Exams</CardTitle>
            <CardDescription>Overview of your latest exam activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam, index) => (
                <div key={exam.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{exam.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {exam.students} students
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {exam.avgScore}% avg
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      exam.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : exam.status === 'active'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {exam.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {exam.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                      {exam.status === 'scheduled' && <Calendar className="w-3 h-3 mr-1" />}
                      {exam.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="magnetic-hover" data-macaly="upcoming-exams-card">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={exam.name} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm">{exam.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{exam.date}</span>
                      <span>•</span>
                      <span>{exam.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="magnetic-hover" data-macaly="performance-card">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Student performance across subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Mathematics</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Physics</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Chemistry</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Biology</span>
                <span className="font-medium">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="magnetic-hover" data-macaly="quick-actions-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Create New Exam</p>
                  <p className="text-xs text-muted-foreground">Set up a new assessment</p>
                </div>
              </div>
            </button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Add Students</p>
                  <p className="text-xs text-muted-foreground">Enroll new students</p>
                </div>
              </div>
            </button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">View Reports</p>
                  <p className="text-xs text-muted-foreground">Analyze performance data</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}