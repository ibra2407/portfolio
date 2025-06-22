// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence }     from "framer-motion"
import Tilt                           from "react-parallax-tilt"
import {
  Mail,
  FileText,
  Github,
  Linkedin,
  Code,
  Database,
  Cloud,
} from "lucide-react"
import ThemeToggle from "./ThemeToggle"

const modules = import.meta.globEager("../assets/hero/*.{png,jpg,jpeg}")
const photos  = Object.values(modules).map((m) => m.default)

export default function Hero() {
  const roles = [
    "Data Analyst",
    "Software Developer",
    "AI/ML Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ]

  const [currentRole, setCurrentRole]     = useState(0)
  const [currentPhoto, setCurrentPhoto]   = useState(0)
  const [imagesLoaded, setImagesLoaded]   = useState(new Set())
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)

  const resumeTimeout    = useRef(null)
  const autoInterval     = useRef(null)
  const photoContainerRef = useRef(null)

  useEffect(() => {
    const preload = async () => {
      const loadImage = (src, idx, first = false) =>
        new Promise((res) => {
          const img = new Image()
          img.onload = () => {
            setImagesLoaded((p) => new Set(p).add(idx))
            if (first) setFirstImageLoaded(true)
            res()
          }
          img.onerror = () => {
            console.error(`Failed to load image ${idx}: ${src}`)
            setImagesLoaded((p) => new Set(p).add(idx))
            res()
          }
          img.src = src
        })

      if (photos.length > 0) {
        await loadImage(photos[0], 0, true)
      }
      photos.slice(1).forEach((src, i) => loadImage(src, i + 1))
    }
    preload()
  }, [])

  useEffect(() => {
    const iv = setInterval(
      () => setCurrentRole((i) => (i + 1) % roles.length),
      2500
    )
    return () => clearInterval(iv)
  }, [roles.length])

  const startAuto = () => {
    clearInterval(autoInterval.current)
    autoInterval.current = setInterval(
      () => setCurrentPhoto((i) => (i + 1) % photos.length),
      3000
    )
  }

  useEffect(() => {
    if (firstImageLoaded) startAuto()
    return () => {
      clearInterval(autoInterval.current)
      clearTimeout(resumeTimeout.current)
    }
  }, [firstImageLoaded, photos.length])

  const handlePhotoClick = () => {
    setCurrentPhoto((i) => (i + 1) % photos.length)
    clearInterval(autoInterval.current)
    clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(startAuto, 3000)
  }

  useEffect(() => {
    const update = () => {
      if (photoContainerRef.current) {
        const r = photoContainerRef.current.offsetWidth / 2
        photoContainerRef.current.style.setProperty(
          "--orbit-r",
          `${r}px`
        )
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const orbitingIcons = [
    { icon: Code,      color: "from-purple-500 to-blue-500",  angle: 0   },
    { icon: Database,  color: "from-green-500 to-blue-500",   angle: 120 },
    { icon: Cloud,     color: "from-blue-500 to-cyan-500",    angle: 240 },
  ]

  return (
    <section id="hero" className="relative py-16 bg-white dark:bg-gray-900 transition-colors">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-gray-100 dark:bg-gray-700 transition-colors rounded-full">
          <ThemeToggle />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* TEXT */}
          <motion.div
            variants={item}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                Ibrahim
              </span>
              !
            </h1>

            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300 mb-6"
            >
              <Mail className="w-5 h-5 text-purple-600" />
              <span>I'm a&nbsp;</span>
              <div className="relative inline-block">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, rotateX: 90, y: -10 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: -90, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    {roles[currentRole]}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentRole}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 -bottom-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0"
            >
              I want to make the world a better place through
              <span className="font-semibold text-purple-600"> data analytics</span>,
              <span className="font-semibold text-pink-500"> artificial intelligence</span>, and
              <span className="font-semibold text-blue-600"> cloud technologies</span>.
              <br />
              <br />
              <strong className="text-gray-800 dark:text-gray-200">
                (This site is an update of my previous portfolio. It's still under construction!)
              </strong>
            </motion.p>

            <motion.div
              variants={item}
              className="flex items-center justify-center md:justify-start gap-3 sm:gap-4"
            >
              <motion.a
                href="mailto:mehloldex@gmail.com"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform text-xs sm:text-sm font-medium"
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Contact
              </motion.a>
              <motion.a
                href="https://docs.google.com/document/d/1t9ZvH4xpYiK55fCqSmDwELYqckL5Gn1m/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform text-xs sm:text-sm font-medium"
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Resume
              </motion.a>
              <motion.a
                href="https://github.com/ibra2407/"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-full hover:scale-105 transition-transform flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mdibrahim2407/"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-full hover:scale-105 transition-transform flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 text-blue-700 dark:text-blue-300"
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* PHOTO + ORBITS */}
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            glareEnable
            glareMaxOpacity={0}
            className="w-full md:w-1/2 flex justify-center"
          >
            <motion.div
              ref={photoContainerRef}
              variants={item}
              onClick={handlePhotoClick}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex justify-center items-center cursor-pointer"
            >
              {/** loading placeholder */}
              {!firstImageLoaded && (
                <div className="absolute inset-0 z-5 w-full h-full bg-gray-100 dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 p-6">
                    <div className="w-8 h-8 border-4 border-gray-400 border-t-purple-600 rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Loading...
                    </span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {firstImageLoaded && (
                  <motion.div
                    key={currentPhoto}
                    className="absolute inset-0 z-10 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "linear" }}
                  >
                    <img
                      src={photos[currentPhoto]}
                      alt={`Ibrahim ${currentPhoto + 1}`}
                      className="w-full h-full object-cover rounded-full shadow-xl"
                      loading="eager"
                    />
                    {!imagesLoaded.has(currentPhoto) && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-gray-400 dark:border-gray-600 rounded-full animate-spin"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Loading...
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {firstImageLoaded && (
                <motion.div
                  className="absolute inset-0 z-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 300"
                    className="absolute inset-0"
                  >
                    <defs>
                      <linearGradient
                        id="orbitGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="150"
                      cy="150"
                      r="148"
                      fill="none"
                      stroke="url(#orbitGradient)"
                      strokeWidth="3"
                      strokeDasharray="10 5"
                      opacity="0.9"
                    />
                  </svg>

                  {orbitingIcons.map((cfg, i) => {
                    const IconComp = cfg.icon
                    const rad       = (cfg.angle * Math.PI) / 180
                    const x         = 150 + 148 * Math.cos(rad)
                    const y         = 150 + 148 * Math.sin(rad)
                    return (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${(x / 300) * 100}%`,
                          top: `${(y / 300) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <motion.div
                          className={`p-2 sm:p-3 bg-gradient-to-r ${cfg.color} rounded-full shadow-lg border border-white/20 backdrop-blur-sm`}
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}