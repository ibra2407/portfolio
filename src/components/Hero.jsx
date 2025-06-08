// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Github, Linkedin } from "lucide-react";
import mePhoto from "../assets/hero/me.jpg";

export default function Hero() {
  const roles = ["Data Analyst","Developer","AI/ML Enthusiast","Problem Solver"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCurrent((i) => (i+1)%roles.length), 2500);
    return () => clearInterval(iv);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="hero" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* TEXT */}
          <motion.div variants={item} className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I’m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                Ibrahim
              </span>
            </h1>

            <motion.div variants={item}
              className="inline-flex items-center gap-2 text-lg text-gray-700 mb-6"
            >
              <Mail className="w-5 h-5 text-purple-600" />
              <span>I'm a</span>
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                {roles[current]}
              </motion.span>
            </motion.div>

            <motion.p variants={item}
              className="text-gray-700 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0"
            >
              I build minimal, mobile-first interfaces focused on 
              <span className="font-semibold text-purple-600"> clarity</span>, 
              <span className="font-semibold text-pink-500"> performance</span>, and 
              <span className="font-semibold text-blue-600"> polished UX</span>.
            </motion.p>

            <motion.div variants={item}
              className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start"
            >
              <motion.a
                href="mailto:mehloldex@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg transform transition hover:scale-105"
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 mr-2" /> Contact Me
              </motion.a>
              <motion.a
                href="https://docs.google.com/document/d/1t9ZvH4xpYiK55fCqSmDwELYqckL5Gn1m/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full shadow transition hover:bg-gray-200"
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4 mr-2" /> My Resume
              </motion.a>
            </motion.div>

            <motion.div variants={item}
              className="flex justify-center md:justify-start gap-4"
            >
              <motion.a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5 text-gray-800" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div variants={item} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-xl">
              <img
                src={mePhoto}
                alt="Ibrahim"
                className="w-full h-full object-cover"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-purple-200"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
