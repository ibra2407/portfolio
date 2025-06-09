// src/components/Projects.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Folder, X } from "lucide-react";
import projects from "../content/projects.json";

export default function Projects() {
  const [modalIdx, setModalIdx] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-16 bg-white">
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
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-red-600"
            >
              <Folder className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-red-600">
              My Projects
            </h2>
          </motion.div>
          <motion.p
            variants={item}
            className="mt-4 text-gray-700 max-w-4xl mx-auto"
          >
            A showcase of select projects—click any card for full details.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects
            .slice()
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((proj, idx) => (
              <Tilt
                key={idx}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                glareEnable={false}
                className="rounded-2xl"
              >
                <motion.div
                  variants={item}
                  onClick={() => setModalIdx(idx)}
                  className="
                    relative p-6 bg-white border border-gray-200 rounded-2xl
                    shadow-lg shadow-red-200/40
                    transition-transform transform
                    hover:-translate-y-1 hover:bg-red-50 hover:shadow-[0_20px_30px_rgba(239,68,68,0.3)]
                    cursor-pointer
                  "
                >
                  {/* Pulsing “image” placeholder */}
                  <motion.div
                    className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {proj.images.length > 0 ? (
                      <img
                        src={new URL(
                          `../assets/projects/${proj.images[0]}`,
                          import.meta.url
                        ).href}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </motion.div>

                  {/* Title & dates */}
                  <h3 className="text-xl font-semibold text-red-600">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">
                    {proj.startDate}
                    {proj.endDate ? ` – ${proj.endDate}` : ""}
                  </p>

                  {/* Two bullet highlights */}
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {proj.bullets.slice(0, 2).map((b, i) => (
                      <li key={i} className="text-sm">
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt>
            ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIdx !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto p-8 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setModalIdx(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-600">
                  {projects[modalIdx].title}
                </h3>
                <p className="text-sm text-gray-400 italic">
                  {projects[modalIdx].startDate}
                  {projects[modalIdx].endDate
                    ? ` – ${projects[modalIdx].endDate}`
                    : ""}
                </p>
                <p className="text-gray-700">
                  {projects[modalIdx].summary}
                </p>

                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {projects[modalIdx].bullets.map((b, i) => (
                    <li key={i} className="text-sm">
                      {b}
                    </li>
                  ))}
                </ul>

                {/* extended details */}
                <div className="space-y-4">
                  {projects[modalIdx].details.map((d, i) => (
                    <p key={i} className="text-gray-700">
                      {d}
                    </p>
                  ))}
                </div>

                {/* additional images */}
                {projects[modalIdx].images.length > 1 && (
                  <div className="flex flex-wrap gap-4">
                    {projects[modalIdx].images.map((img, i) => (
                      <img
                        key={i}
                        src={new URL(
                          `../assets/projects/${img}`,
                          import.meta.url
                        ).href}
                        alt={`${projects[modalIdx].title}-${i}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {projects[modalIdx].demo && (
                    <motion.a
                      href={projects[modalIdx].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-red-600 text-white rounded-full shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  )}
                  {projects[modalIdx].source && (
                    <motion.a
                      href={projects[modalIdx].source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gray-600 text-white rounded-full shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Source
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
