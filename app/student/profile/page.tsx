"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  Mail, 
  Bell, 
  Lock, 
  Upload,
  Save,
  Eye,
  EyeOff,
  GraduationCap,
  Trophy,
  Target
} from 'lucide-react'

export default function StudentProfile() {
  const [profileData, setProfileData] = useState({
    name: 'Student User',
    email: 'student@grademe.com',
    studentId: 'STU2024001',
    program: 'Computer Science',
    year: 'Sophomore',
    gpa: '3.85',
    joinDate: '2023-09-01'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    examReminders: true,
    gradeUpdates: true,
    announcementAlerts: false
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  console.log("Student profile page rendered", { profileData, notifications })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile update:", profileData)
    alert('Profile updated successfully!')
  }

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
    console.log("Notification setting updated:", { key, value })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    console.log("Password change attempt")
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleImageUpload = () => {
    console.log("Profile image upload triggered")
    alert('Profile image updated!')
  }

  const achievements = [
    { title: "Dean's List", semester: "Fall 2023", icon: Trophy },
    { title: "Perfect Attendance", semester: "Spring 2024", icon: Target },
    { title: "Top Performer", subject: "Mathematics", icon: GraduationCap }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-macaly="student-profile-title">
          My Profile
        </h1>
        <p className="text-muted-foreground" data-macaly="student-profile-subtitle">
          Manage your account settings and academic information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="magnetic-hover" data-macaly="student-profile-overview-card">
          <CardHeader className="text-center">
            <div className="mx-auto">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/96/96" />
                <AvatarFallback className="text-2xl font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
              <div className="flex flex-col space-y-1">
                <Badge variant="outline">ID: {profileData.studentId}</Badge>
                <Badge variant="secondary">{profileData.program}</Badge>
                <Badge variant="default">{profileData.year}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleImageUpload} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Update Photo
            </Button>
            
            {/* GPA Display */}
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{profileData.gpa}</div>
              <div className="text-sm text-muted-foreground">Current GPA</div>
              <Progress value={parseFloat(profileData.gpa) * 25} className="h-2 mt-2" />
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Student since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="lg:col-span-2 magnetic-hover" data-macaly="student-profile-info-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Student Information
            </CardTitle>
            <CardDescription>
              Update your personal and academic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="magnetic-hover"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="magnetic-hover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={profileData.studentId}
                    onChange={(e) => setProfileData(prev => ({ ...prev, studentId: e.target.value }))}
                    className="magnetic-hover"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    value={profileData.program}
                    onChange={(e) => setProfileData(prev => ({ ...prev, program: e.target.value }))}
                    className="magnetic-hover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <Input
                  id="year"
                  value={profileData.year}
                  onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value }))}
                  className="magnetic-hover"
                />
              </div>
              <Button type="submit" className="magnetic-hover">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="magnetic-hover" data-macaly="student-achievements-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Recent Achievements
          </CardTitle>
          <CardDescription>
            Your academic accomplishments and recognitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={achievement.title} className="p-4 border rounded-lg text-center hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {achievement.semester || achievement.subject}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="magnetic-hover" data-macaly="student-notification-settings-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive via email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive general email notifications about system updates
                </p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Exam Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming exams and deadlines
                </p>
              </div>
              <Switch
                checked={notifications.examReminders}
                onCheckedChange={(checked) => handleNotificationUpdate('examReminders', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Grade Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when new grades are available
                </p>
              </div>
              <Switch
                checked={notifications.gradeUpdates}
                onCheckedChange={(checked) => handleNotificationUpdate('gradeUpdates', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Announcement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about important announcements from instructors
                </p>
              </div>
              <Switch
                checked={notifications.announcementAlerts}
                onCheckedChange={(checked) => handleNotificationUpdate('announcementAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="magnetic-hover" data-macaly="student-password-change-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10 magnetic-hover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10 magnetic-hover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="pr-10 magnetic-hover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="magnetic-hover">
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}