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
        flex flex-col sm:flex-row items-center
        p-2 pr-4 rounded-full
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        transition-colors
      "
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span
        className="
          mt-1 sm:mt-0 sm:ml-2
          text-xs uppercase
          opacity-50
        "
      >
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
