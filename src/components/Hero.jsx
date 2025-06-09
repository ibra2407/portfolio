import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Mail,
  FileText,
  Github,
  Linkedin,
  Code,
  Database,
  Cloud
} from "lucide-react";
import mePhoto from "../assets/hero/me.jpg";

export default function Hero() {
  const roles = [
    "Data Analyst",
    "Software Developer",
    "AI/ML Developer",
    "Problem Solver",
    "Tech Enthusiast"
  ];
  const [current, setCurrent] = useState(0);

  // Ref for the main photo container to get its size for dynamic orbit sizing
  const photoContainerRef = useRef(null);
  const [orbitRadius, setOrbitRadius] = useState(128); // Default radius (half of initial w-64)

  useEffect(() => {
    const iv = setInterval(() => setCurrent(i => (i + 1) % roles.length), 2500);

    // Function to update orbit radius based on the photo container's size
    const updateOrbitRadius = () => {
      if (photoContainerRef.current) {
        // We want the orbit to be just outside the image, so we take the width,
        // divide by 2 for the radius, and add a little extra for padding.
        const newRadius = photoContainerRef.current.offsetWidth / 2;
        setOrbitRadius(newRadius);
      }
    };

    // Update radius on mount and on window resize
    updateOrbitRadius();
    window.addEventListener("resize", updateOrbitRadius);

    // Cleanup listeners on component unmount
    return () => {
      clearInterval(iv);
      window.removeEventListener("resize", updateOrbitRadius);
    };
  }, [roles.length]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Configuration for the three badges on a single orbit
  const orbitingIcons = [
    {
      icon: Code,
      color: "from-purple-500 to-blue-500",
      angle: 0 // Start at the top
    },
    {
      icon: Database,
      color: "from-green-500 to-blue-500",
      angle: 120 // 120 degrees from the first
    },
    {
      icon: Cloud,
      color: "from-blue-500 to-cyan-500",
      angle: 240 // 240 degrees from the first
    }
  ];

  return (
    <section id="hero" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* ── TEXT ── */}
          <motion.div variants={item} className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I’m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                Ibrahim
              </span>
              !
            </h1>
            <motion.div variants={item} className="inline-flex items-center gap-2 text-lg text-gray-700 mb-6">
              <Mail className="w-5 h-5 text-purple-600" />
              <span>I'm a&nbsp;</span>
              <div className="relative inline-block">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={current}
                    initial={{ opacity: 0, rotateX: 90, y: -10 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: -90, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    {roles[current]}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 -bottom-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.p variants={item} className="text-gray-700 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              I want to make the world a better place through
              <span className="font-semibold text-purple-600"> data analytics</span>,
              <span className="font-semibold text-pink-500"> artificial intelligence</span>, and
              <span className="font-semibold text-blue-600"> cloud technologies</span>.
              (this site is an update of my previous portfolio. its still under construction! -09.06.2025)
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
              <motion.a
                href="mailto:mehloldex@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-4 h-4 mr-2" />Contact
              </motion.a>
              <motion.a
                href="https://docs.google.com/document/d/1t9ZvH4xpYiK55fCqSmDwELYqckL5Gn1m/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full shadow hover:bg-gray-200 hover:scale-105 transition-transform"
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="w-4 h-4 mr-2" />Resume
              </motion.a>
            </motion.div>
            <motion.div variants={item} className="flex justify-center md:justify-start gap-4">
              <motion.a href="https://github.com/ibra2407/" className="p-2 bg-gray-100 rounded-full hover:scale-105 transition-transform" whileTap={{ scale: 0.9 }}>
                <Github className="w-5 h-5 text-gray-800" />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/mdibrahim2407/" className="p-2 bg-gray-100 rounded-full hover:scale-105 transition-transform" whileTap={{ scale: 0.9 }}>
                <Linkedin className="w-5 h-5 text-blue-700" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── PHOTO + ORBITS ── */}
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            glareEnable
            glareMaxOpacity={0.2}
            className="w-full md:w-1/2 flex justify-center"
          >
            <motion.div
              ref={photoContainerRef}
              variants={item}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex justify-center items-center"
            >
              {/* The Image - positioned behind the orbit */}
              <img
                src={mePhoto}
                alt="Ibrahim"
                className="relative z-10 w-full h-full object-cover rounded-full shadow-xl"
              />

              {/* Orbit container - this div will rotate */}
              <motion.div
                className="absolute inset-0 z-20" // z-20 to be in front of the image (z-10)
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* SVG for the colorful circular path */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 300" // Use a consistent viewBox for scaling
                  className="absolute inset-0"
                >
                  <defs>
                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="150"
                    cy="150"
                    r="148" // Slightly smaller than viewBox to prevent clipping
                    fill="none"
                    stroke="url(#orbitGradient)"
                    strokeWidth="3"
                    strokeDasharray="10 5" // Optional: make it dashed
                    opacity="0.9"
                  />
                </svg>

                {/* Map over the icons to place them */}
                {orbitingIcons.map((cfg, i) => {
                  const IconComponent = cfg.icon;
                  // Calculate the position of each badge
                  const x = 150 + 148 * Math.cos((cfg.angle * Math.PI) / 180);
                  const y = 150 + 148 * Math.sin((cfg.angle * Math.PI) / 180);

                  return (
                    // This div holds the badge. It's positioned on the SVG canvas.
                    // It will rotate with the parent, but we'll counter-rotate the inner content.
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        // Position based on the SVG viewBox
                        left: `${(x / 300) * 100}%`,
                        top: `${(y / 300) * 100}%`,
                        // Center the badge on its calculated position
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* This is the badge itself. We counter-rotate it so it stays upright. */}
                      <motion.div
                        className={`p-2 sm:p-3 bg-gradient-to-r ${cfg.color} rounded-full shadow-lg border border-white/20 backdrop-blur-sm`}
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}