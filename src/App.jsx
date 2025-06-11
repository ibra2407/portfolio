import React from 'react'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero         from './components/Hero.jsx'
import About        from './components/About.jsx'
import Experiences  from './components/Experiences.jsx'
import Projects     from './components/Projects.jsx'

export default function App() {
  return (
    // Removed bg colors - let components handle their own backgrounds
    <div className="flex flex-col min-h-screen transition-colors">
      <Hero />
      <About />
      <Experiences />
      <Projects />
    </div>
  )
}