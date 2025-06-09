// src/components/Experiences.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ClipboardList, X } from "lucide-react";
import experiences from "../content/experiences.json";

export default function Experiences() {
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
    <section id="experiences" className="py-16 bg-white">
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
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-blue-600"
            >
              <ClipboardList className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">
              My Experiences
            </h2>
          </motion.div>
          <motion.p
            variants={item}
            className="mt-4 text-gray-700 max-w-2xl mx-auto"
          >
            A compilation of my key roles, from internships, industry projects and self-initiated ventures.
            <br />
            <br />
            Click on any card to see more details.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {experiences
            .slice()
            .sort(
              (a, b) => new Date(b.startDate) - new Date(a.startDate)
            )
            .map((exp, idx) => (
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
                    relative px-6 pb-6 pt-6 bg-white
                    border border-gray-200 rounded-2xl
                    shadow-lg shadow-blue-200/40
                    transition-transform transform
                    hover:-translate-y-1 hover:bg-blue-50
                    hover:shadow-[0_20px_30px_rgba(59,130,246,0.3)]
                    cursor-pointer
                  "
                >
                  <div className="flex items-start">
                    {/* placeholder + dashed border just outside */}
                    <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
                      {/* actual square */}
                      <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden">
                        {exp.images && exp.images.length > 0 ? (
                          <img
                            src={new URL(
                              `../assets/experiences/${exp.images[0]}`,
                              import.meta.url
                            ).href}
                            alt={exp.role}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-600 text-[10px]">
                            {exp.placeholder || "No Image"}
                          </div>
                        )}
                      </div>
                      {/* marching-dashes around it */}
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute"
                        style={{
                          top: "-2px",
                          left: "-2px",
                          width: "calc(100% + 4px)",
                          height: "calc(100% + 4px)",
                          pointerEvents: "none",
                        }}
                      >
                        <motion.rect
                          x="2"
                          y="2"
                          width="96"
                          height="96"
                          rx="12"
                          ry="12"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="4"
                          strokeDasharray="7 7"
                          animate={{ strokeDashoffset: [0, 14] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                          }}
                        />
                      </motion.svg>
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-blue-600">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {exp.organisation}
                      </p>
                      <p className="text-sm text-gray-400 italic mt-1">
                        {exp.startDate}
                        {exp.endDate ? ` – ${exp.endDate}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Two impact bullet points */}
                  <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                    {exp.bullets.slice(0, 2).map((b, i) => (
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
                <h3 className="text-2xl font-bold text-blue-600">
                  {experiences[modalIdx].role} @{" "}
                  {experiences[modalIdx].organisation}
                </h3>
                <p className="text-sm text-gray-400 italic">
                  {experiences[modalIdx].startDate}
                  {experiences[modalIdx].endDate
                    ? ` – ${experiences[modalIdx].endDate}`
                    : ""}
                </p>
                <p className="text-gray-700">
                  {experiences[modalIdx].summary}
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {experiences[modalIdx].bullets.map((b, i) => (
                    <li key={i} className="text-sm">
                      {b}
                    </li>
                  ))}
                </ul>

                {/* extended details */}
                <div className="space-y-4">
                  {experiences[modalIdx].details?.map((d, i) => (
                    <p key={i} className="text-gray-700">
                      {d}
                    </p>
                  ))}
                </div>

                {/* extended images */}
                {experiences[modalIdx].images?.length > 1 && (
                  <div className="flex flex-wrap gap-4">
                    {experiences[modalIdx].images.map((img, i) => (
                      <img
                        key={i}
                        src={new URL(
                          `../assets/experiences/${img}`,
                          import.meta.url
                        ).href}
                        alt={`${experiences[modalIdx].role}-${i}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}