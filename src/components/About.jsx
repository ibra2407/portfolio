// src/components/About.jsx
import React from "react"
import { motion } from "framer-motion"
import Tilt       from "react-parallax-tilt"
import {
  Sparkles,
  Database,
  Code,
  Brain,
  TrendingUp,
  Cpu,
  BookOpen,
  Trophy,
  Star,
  Briefcase,
  Award,
} from "lucide-react"

export default function About() {
  const competencies = [
    {
      icon: Database,
      title: "Data Analysis",
      desc: "Turning raw data into actionable insights.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      shadow: "hover:shadow-purple-400/40",
    },
    {
      icon: Code,
      title: "Web/Cloud Development",
      desc: "Building scalable, user-first applications.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      shadow: "hover:shadow-purple-400/40",
    },
    {
      icon: Brain,
      title: "AI/ML",
      desc: "Leveraging AI/ML for smart solutions.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      shadow: "hover:shadow-purple-400/40",
    },
  ]

  const education = [
    {
      icon: TrendingUp,
      title: "Business Analytics & Operations Research",
      desc: "Specialized in optimization and decision science to drive strategic business outcomes.",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-200",
      shadow: "hover:shadow-orange-300/40",
    },
    {
      icon: Cpu,
      title: "Minor in Artificial Intelligence",
      desc: "Explored machine learning models, NLP, and computer vision to build intelligent systems.",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-200",
      shadow: "hover:shadow-orange-300/40",
    },
    {
      icon: BookOpen,
      title: "Minor in Digital Humanities",
      desc: "Combined tech and humanities; applied data visualization and text analysis to cultural research.",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-200",
      shadow: "hover:shadow-orange-300/40",
    },
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "2nd Place • SUTD Design Awards",
      desc: (
        <>
          (2025) Capstone Project with Tan Tock Seng Hospital; built an AI communications coach under{" "}
          <a
            href="https://www.linkedin.com/in/minyangchow/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-300"
          >
            Dr Minyang Chow
          </a>
          ; awarded by{" "}
          <a
            href="https://www.linkedin.com/in/tharman-shanmugaratnam/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-300"
          >
            President Tharman
          </a>
          .
        </>
      ),
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-300",
      shadow: "hover:shadow-yellow-300/40",
    },
    {
      icon: Star,
      title: "3rd Place • NUS Maritime Hackathon",
      desc: "(2025) Applied AI/ML methods on maritime datasets to help detect anomalies, streamline operations and improve worker safety.",
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-300",
      shadow: "hover:shadow-yellow-300/40",
    },
    {
      icon: Briefcase,
      title: "ESD Industry Showcase",
      desc: "(2024) Selected to showcase my Simulation & Modelling Analysis project (an evolution simulator) to industry partners.",
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-300",
      shadow: "hover:shadow-yellow-300/40",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          id="competencies"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="text-purple-600"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-600">My Key Competencies</h2>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            I'm a data analyst with experience in web/cloud development and AI/ML applications. I'm fascinated by the power of data and technology to solve real-world problems.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((c, i) => {
              const Icon = c.icon
              return (
                <Tilt
                  key={i}
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  glareEnable={false}
                  className="rounded-2xl"
                >
                  <motion.div
                    variants={item}
                    className={`
                      p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl
                      transition-transform transform hover:-translate-y-1
                      ${c.shadow}
                    `}
                  >
                    <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${c.gradient}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{c.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{c.desc}</p>
                  </motion.div>
                </Tilt>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          id="education"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ y: [2, -4, 2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-orange-500"
            >
              <TrendingUp className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-orange-500">Education & Specializations</h2>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            I graduated with <strong>Honours with Distinction</strong> from the <strong>Engineering Systems & Design</strong> (B.Eng.) pillar from the <strong>Singapore University of Technology and Design</strong> (SUTD), from Sep 2021 to May 2025.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((e, i) => {
              const Icon = e.icon
              return (
                <Tilt
                  key={i}
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  glareEnable={false}
                  className="rounded-2xl"
                >
                  <motion.div
                    variants={item}
                    className={`
                      p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl
                      transition-transform transform hover:-translate-y-1
                      ${e.shadow}
                    `}
                  >
                    <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${e.gradient}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{e.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{e.desc}</p>
                  </motion.div>
                </Tilt>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          id="achievements"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [0.95, 1.15, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-yellow-500"
            >
              <Award className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-yellow-500">Achievements</h2>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            A few highlights from experiences that I had the privilege of participating in.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a, i) => {
              const Icon = a.icon
              return (
                <Tilt
                  key={i}
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  glareEnable={false}
                  className="rounded-2xl"
                >
                  <motion.div
                    variants={item}
                    className={`
                      p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl
                      transition-transform transform hover:-translate-y-1
                      ${a.shadow}
                    `}
                  >
                    <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${a.gradient}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{a.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{a.desc}</p>
                  </motion.div>
                </Tilt>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}