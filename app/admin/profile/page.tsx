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
import { 
  User, 
  Mail, 
  Bell, 
  Lock, 
  Upload,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

export default function AdminProfile() {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@grademe.com',
    role: 'System Administrator',
    joinDate: '2023-01-15'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    examReminders: true,
    studentUpdates: false,
    systemAlerts: true
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

  console.log("Admin profile page rendered", { profileData, notifications })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile update:", profileData)
    // Simulate API call
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
    // Simulate file upload
    alert('Profile image updated!')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-macaly="profile-title">
          Profile Management
        </h1>
        <p className="text-muted-foreground" data-macaly="profile-subtitle">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="magnetic-hover" data-macaly="profile-overview-card">
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
              <Badge variant="secondary">{profileData.role}</Badge>
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
            <div className="text-center text-sm text-muted-foreground">
              Member since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="lg:col-span-2 magnetic-hover" data-macaly="profile-info-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and account details
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
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profileData.role}
                  onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
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

      {/* Notification Settings */}
      <Card className="magnetic-hover" data-macaly="notification-settings-card">
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
                <Label className="text-base">Student Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when students complete exams
                </p>
              </div>
              <Switch
                checked={notifications.studentUpdates}
                onCheckedChange={(checked) => handleNotificationUpdate('studentUpdates', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">System Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important system notifications and security alerts
                </p>
              </div>
              <Switch
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => handleNotificationUpdate('systemAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="magnetic-hover" data-macaly="password-change-card">
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