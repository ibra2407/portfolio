import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experiences from './components/Experiences.jsx';
import Projects from './components/Projects.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <hr className="border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto" />
      <About />
      <hr className="border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto" />
      <Experiences />
      <hr className="border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto" />
      <Projects />
    </div>
  );
}
