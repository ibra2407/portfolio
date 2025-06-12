import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero         from './components/Hero.jsx'
import About        from './components/About.jsx'
import Experiences  from './components/Experiences.jsx'
import Projects     from './components/Projects.jsx'

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      <Hero />
      <About />
      <Experiences />
      <Projects />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-50
            p-3 rounded-full
            bg-gray-200 dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:scale-110
            group
          "
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 transition-colors duration-200 group-hover:text-blue-500" />
        </button>
      )}
    </div>
  )
}