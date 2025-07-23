"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { GraduationCap, LogIn } from 'lucide-react'

export function Navigation() {
  console.log("Navigation component rendered")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between p-4 glass rounded-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 magnetic-hover" data-macaly="logo">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">GradeMe</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors magnetic-hover"
              data-macaly="nav-features"
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors magnetic-hover"
              data-macaly="nav-about"
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors magnetic-hover"
              data-macaly="nav-contact"
            >
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button asChild className="magnetic-hover">
              <Link href="/login" data-macaly="login-button">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}