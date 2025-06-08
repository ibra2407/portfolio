import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <hr className="border-t border-gray-200 dark:border-gray-700 w-3/4 mx-auto" />
      <About />
    </div>
  );
}
