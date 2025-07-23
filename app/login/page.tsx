"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  console.log("Login page rendered", { email, userType })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    console.log("Login attempt:", { email, userType })
    
    // Simple authentication simulation
    setTimeout(() => {
      if (email && password && userType) {
        console.log("Login successful, redirecting to dashboard")
        // Store user data in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          userType, 
          name: userType === 'admin' ? 'Admin User' : 'Student User' 
        }))
        router.push(userType === 'admin' ? '/admin/dashboard' : '/student/dashboard')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 magnetic-hover" data-macaly="back-home">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md glass" data-macaly="login-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold" data-macaly="login-title">
              Welcome to GradeMe
            </CardTitle>
            <CardDescription data-macaly="login-description">
              Sign in to your account to continue
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="magnetic-hover"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 magnetic-hover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full magnetic-hover" 
              disabled={isLoading}
              data-macaly="login-submit"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Demo Credentials:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Admin:</strong> admin@grademe.com</p>
              <p><strong>Student:</strong> student@grademe.com</p>
              <p><strong>Password:</strong> Any password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}