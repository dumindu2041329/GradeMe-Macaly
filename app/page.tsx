import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ThreeSceneWrapper } from '@/components/three-scene-wrapper'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ThreeSceneWrapper />
      <Navigation />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
