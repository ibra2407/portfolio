// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Sparkles,
  Database,
  Code,
  Brain,
  TrendingUp,
  Cpu,
  BookOpen
} from "lucide-react";

export default function About() {
  const skills = [
    {
      icon: Database,
      title: "Data Analysis",
      desc: "Turning raw data into actionable insights. Design and implement data pipelines.",
      gradient: "bg-gradient-to-r from-cyan-500 to-blue-500"
    },
    {
      icon: Code,
      title: "Web Development",
      desc: "Building scalable, user-first applications. Proficient in React, Node.js, and modern web technologies.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "AI/ML",
      desc: "Leveraging AI/ML for smart solutions. Experience with PyTorch, CV and NLP.",
      gradient: "bg-gradient-to-r from-emerald-400 to-teal-600"
    }
  ];

  const education = [
    {
      icon: TrendingUp,
      title: "Business Analytics & Operations Research",
      desc: "Specialized in optimization and decision science to drive strategic business outcomes.",
      gradient: "bg-gradient-to-r from-red-500 to-red-300"
    },
    {
      icon: Cpu,
      title: "Minor in Artificial Intelligence",
      desc: "Explored machine learning models, NLP, and computer vision to build intelligent systems.",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-200"
    },
    {
      icon: BookOpen,
      title: "Minor in Digital Humanities",
      desc: "Combined tech and humanities; applied data visualization and text analysis to cultural research.",
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-200"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            {/* Rotating Sparkles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 text-purple-600"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-600">About Me</h2>
          </motion.div>

          <motion.p variants={item} className="max-w-4xl mx-auto text-gray-700">
            I’m a data analyst with experience in web development and AI/ML applications. I'm fascinated by the power of data and technology to solve real-world problems. My key competencies are:
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <Tilt
                key={i}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={false}
                className="rounded-2xl"
              >
                <motion.div
                  variants={item}
                  className="p-6 bg-white border rounded-2xl shadow-purple-600/25 shadow-md hover:shadow-lg hover:shadow-purple-600/30 transition-transform transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${s.gradient}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </motion.div>
              </Tilt>
            );
          })}
        </motion.div>

        {/* Education Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.h3
            variants={item}
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            Education & Specializations
          </motion.h3>
          {/* Added education summary */}
          <motion.p variants={item} className="max-w-2xl mx-auto text-gray-700 mb-8">
            Graduated with <strong>Honours with Distinction</strong> in <strong>Engineering Systems & Design</strong> (B.Eng.) from <strong>Singapore University of Technology and Design</strong> (SUTD), Sep 2021 to May 2025.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {education.map((e, i) => {
            const Icon = e.icon;
            return (
              <Tilt
                key={i}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={false}
                className="rounded-2xl"
              >
                <motion.div
                  variants={item}
                  className="p-6 bg-white border rounded-2xl shadow-md shadow-red-400/25 hover:shadow-lg hover:shadow-red-400/40 transition-transform transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${e.gradient}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">{e.title}</h3>
                  <p className="text-gray-600 text-sm">{e.desc}</p>
                </motion.div>
              </Tilt>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
