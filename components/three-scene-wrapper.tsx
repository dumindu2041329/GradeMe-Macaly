"use client"

import dynamic from 'next/dynamic'

// Dynamically import Three.js scene to avoid SSR issues
const ThreeScene = dynamic(() => import('@/components/three-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
})

export function ThreeSceneWrapper() {
  return <ThreeScene />
}