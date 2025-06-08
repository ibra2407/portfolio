// src/components/Hero.jsx
import React from 'react';
import mePhoto from '../assets/hero/me.jpg';

export default function Hero() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8">
        {/* TEXT */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Hi, I’m Ibrahim!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary">
            Data Analyst · Developer · AI/ML Enthusiast
          </p>
          <p className="text-gray-700 max-w-md mx-auto md:mx-0">
            I craft minimal, mobile-first interfaces with pastel-green accents—focused on clarity and performance.
          </p>
          <a
            href="#projects"
            className="inline-block bg-primary text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow hover:bg-accent transition"
          >
            View My Work
          </a>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-xl border-4 border-primary">
            <img
              src={mePhoto}
              alt="Portrait of Ibrahim"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
