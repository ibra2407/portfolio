// src/components/Experiences.jsx
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Tilt                       from "react-parallax-tilt"
import { ClipboardList, X }       from "lucide-react"
import experiences                from "../content/experiences.json"

export default function Experiences() {
  const [modalIdx, setModalIdx] = useState(null)
  const [isAtTop, setIsAtTop]   = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = modalIdx !== null ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [modalIdx])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setIsAtTop(scrollTop < 10)
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10)
  }

  useEffect(() => {
    const check = () => {
      if (!scrollRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setIsAtTop(scrollTop < 10)
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10)
      if (scrollHeight <= clientHeight) {
        setIsAtTop(true)
        setIsAtBottom(true)
      }
    }
    const cur = scrollRef.current
    if (cur) {
      cur.addEventListener("scroll", handleScroll)
      check()
      const to = setTimeout(check, 50)
      return () => {
        cur.removeEventListener("scroll", handleScroll)
        clearTimeout(to)
      }
    }
  }, [modalIdx])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="experiences" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              animate={{ y: [2, -4, 2] }}
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
            className="mt-4 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto"
          >
            A compilation of roles I held throughout internships, industry
            projects and self-initiated ventures.
            <br />
            <br />
            Click on the cards to see more details.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {experiences
            .slice()
            .sort(
              (a, b) =>
                new Date(b.card.startDate) - new Date(a.card.startDate)
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
                    relative px-6 pb-6 pt-6 bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-2xl shadow-lg shadow-blue-200/40
                    transition-transform transform
                    hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900
                    hover:shadow-[0_20px_30px_rgba(59,130,246,0.3)]
                    cursor-pointer
                  "
                >
                  <div className="flex items-start">
                    <div
                      className="relative flex-shrink-0"
                      style={{ width: 64, height: 64 }}
                    >
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                        {exp.card.image ? (
                          <img
                            src={
                              new URL(
                                `../assets/experiences/${exp.card.image}`,
                                import.meta.url
                              ).href
                            }
                            loading="eager"
                            alt={exp.card.role}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-600 text-[10px]">
                            {exp.card.placeholder || "No Image"}
                          </div>
                        )}
                      </div>
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
                            repeatType: "loop",
                          }}
                        />
                      </motion.svg>
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-blue-600">
                        {exp.card.role}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.card.organisation}
                      </p>
                      <p className="text-sm italic mt-1 text-gray-400 dark:text-gray-500">
                        {exp.card.startDate}
                        {exp.card.endDate ? ` – ${exp.card.endDate}` : ""}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 list-disc list-outside pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                    {exp.card.bullets.slice(0, 2).map((b, i) => (
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

      <AnimatePresence>
        {modalIdx !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIdx(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] relative overflow-hidden flex flex-col h-full transition-colors"
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalIdx(null)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow p-8 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {experiences[modalIdx].card.role} @{" "}
                    {experiences[modalIdx].card.organisation}
                  </h3>
                  <p className="text-sm italic mb-6 text-gray-400 dark:text-gray-500">
                    {experiences[modalIdx].card.startDate}
                    {experiences[modalIdx].card.endDate
                      ? ` – ${experiences[modalIdx].card.endDate}`
                      : ""}
                  </p>
                </div>

                <div className="relative flex-grow min-h-0">
                  <motion.div
                    className="absolute top-0 left-0 right-4 h-12 bg-gradient-to-b from-white dark:from-gray-800 via-white/80 dark:via-gray-800 to-transparent pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isAtTop ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-4 h-12 bg-gradient-to-t from-white dark:from-gray-800 via-white/80 dark:via-gray-800 to-transparent pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isAtBottom ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div
                    ref={scrollRef}
                    className="h-full overflow-y-scroll scrollbar-thin pr-4"
                    onScroll={handleScroll}
                  >
                    {experiences[modalIdx].modal.segments.map((seg, i) => (
                      <div key={i} className="mb-6">
                        {seg.text && (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {seg.text}
                          </p>
                        )}
                        {seg.image && (
                          <img
                            src={
                              new URL(
                                `../assets/experiences/${seg.image}`,
                                import.meta.url
                              ).href
                            }
                            loading="eager"
                            alt={`Image for ${experiences[modalIdx].card.role} segment ${i + 1}`}
                            className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
