"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null!)
  
  const particleCount = 500
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  console.log("AnimatedPoints component rendered")

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 10)
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 15)
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color="#10B981" 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  )
}

export default function ThreeScene() {
  console.log("ThreeScene component rendered")

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AnimatedPoints />
        
        <FloatingCube position={[-2, 1, 0]} />
        <FloatingCube position={[2, -1, 0]} />
        <FloatingCube position={[0, 2, -1]} />
      </Canvas>
    </div>
  )
}