"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

export function HeroSection() {
  console.log("HeroSection component rendered")

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10 py-16">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            data-macaly="hero-title"
          >
            Excellence in
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-emerald-500 bg-clip-text text-transparent animate-glow">
              Exam Management
            </span>
          </h1>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-macaly="hero-description"
          >
            Transform your educational institution with our premium exam management platform. 
            Streamline assessments, track performance, and elevate academic excellence.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            asChild 
            className="text-lg px-8 py-4 magnetic-hover"
            data-macaly="cta-primary"
          >
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            asChild 
            className="text-lg px-8 py-4 magnetic-hover glass"
            data-macaly="cta-secondary"
          >
            <Link href="#features">
              Learn More
            </Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 glass rounded-2xl magnetic-hover animate-float" data-macaly="feature-card-1">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Assessments</h3>
            <p className="text-muted-foreground">
              Create, manage, and distribute exams with intelligent question banks and automated grading.
            </p>
          </div>

          <div className="p-6 glass rounded-2xl magnetic-hover animate-float-delayed" data-macaly="feature-card-2">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-muted-foreground">
              Comprehensive student profiles with performance tracking and personalized insights.
            </p>
          </div>

          <div className="p-6 glass rounded-2xl magnetic-hover animate-float" data-macaly="feature-card-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-muted-foreground">
              Advanced analytics with beautiful charts and comprehensive performance reports.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-border/50">
          <div className="text-center" data-macaly="stat-1">
            <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center" data-macaly="stat-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Institutions</div>
          </div>
          <div className="text-center" data-macaly="stat-3">
            <div className="text-3xl md:text-4xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">Exams Conducted</div>
          </div>
          <div className="text-center" data-macaly="stat-4">
            <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}