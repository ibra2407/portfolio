// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  // initialize from localStorage or default to light
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  // whenever theme changes, update <html> class and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="
        flex items-center justify-center
        p-2 rounded-full
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        transition-all duration-200
        hover:scale-105
        group
      "
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-colors duration-200 group-hover:text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 transition-colors duration-200 group-hover:text-purple-700" />
      )}
    </button>
  )
}