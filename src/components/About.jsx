// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Database, Code, Brain } from "lucide-react";

export default function About() {
  const skills = [
    {
      icon: Database,
      title: "Data Analysis",
      desc: "Turning raw data into actionable insights",
      gradient: "bg-gradient-to-r from-cyan-500 to-blue-500"
    },
    {
      icon: Code,
      title: "Web Dev",
      desc: "Building scalable, user-first applications",
      gradient: "bg-gradient-to-r from-purple-600 to-pink-500"
    },
    {
      icon: Brain,
      title: "AI/ML",
      desc: "Leveraging ML for smart solutions",
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-400"
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
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-600">About Me</h2>
          </motion.div>
          <motion.p variants={item} className="max-w-2xl mx-auto text-gray-700">
            I’m a data analyst turned developer with a passion for AI/ML. I turn
            complex datasets into insights and build sleek, user-first interfaces
            that scale across devices.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-white ${s.gradient}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
