// src/components/Projects.jsx
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Tilt                       from "react-parallax-tilt"
import { Folder, X }              from "lucide-react"
import projects                   from "../content/projects.json"

export default function Projects() {
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

  const sorted = [...projects].sort((a, b) => {
    // This will sort by the most recent date, prioritizing endDate if available,
    // otherwise falling back to startDate.
    const dateA = a.card.endDate ? new Date(a.card.endDate) : new Date(a.card.startDate);
    const dateB = b.card.endDate ? new Date(b.card.endDate) : new Date(b.card.startDate);
    
    return dateB - dateA; // Sort in descending order (most recent first)
  });

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-900 transition-colors">
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
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
            className="mt-4 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto"
          >
            A showcase of projects I've worked on. Click on the cards to see more details.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {sorted.map((proj, idx) => (
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
                  relative p-6 bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  rounded-2xl shadow-lg shadow-red-200/40
                  transition-transform transform
                  hover:-translate-y-1 hover:bg-red-50 dark:hover:bg-red-900
                  hover:shadow-[0_20px_30px_rgba(239,68,68,0.3)]
                  cursor-pointer
                "
              >
                <div
                  className="relative flex-shrink-0"
                  style={{ width: "100%", height: 160 }}
                >
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {proj.card.image ? (
                      <img
                        src={
                          new URL(
                            `../assets/projects/${proj.card.image}`,
                            import.meta.url
                          ).href
                        }
                        loading="eager"
                        alt={proj.card.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-red-600 text-[10px]">
                        {proj.card.placeholder || "No Image"}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-red-600 mt-4">
                  {proj.card.title}
                </h3>
                <p className="text-sm italic mb-3 text-gray-500 dark:text-gray-400">
                  {proj.card.startDate}
                  {proj.card.endDate ? ` – ${proj.card.endDate}` : ""}
                </p>

                <ul className="list-disc list-outside pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                  {proj.card.bullets.slice(0, 2).map((b, i) => (
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
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow p-8 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {sorted[modalIdx].card.title}
                  </h3>
                  <p className="text-sm italic mb-6 text-gray-400 dark:text-gray-500">
                    {sorted[modalIdx].card.startDate}
                    {sorted[modalIdx].card.endDate
                      ? ` – ${sorted[modalIdx].card.endDate}`
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
                    {sorted[modalIdx].modal.segments.map((seg, i) => (
                      <div key={i} className="mb-6">
                        {("text" in seg || "image" in seg) && !("linkGroup" in seg) && (
                          <>
                            {seg.text && (
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {seg.text}
                              </p>
                            )}
                            {seg.image && (
                              <img
                                src={
                                  new URL(
                                    `../assets/projects/${seg.image}`,
                                    import.meta.url
                                  ).href
                                }
                                loading="eager"
                                alt={`${sorted[modalIdx].card.title} segment ${i}`}
                                className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                              />
                            )}
                          </>
                        )}
                        {"linkGroup" in seg && (
                          <div className="flex flex-wrap gap-4 mt-4">
                            {seg.linkGroup.demo && (
                              <motion.a
                                href={seg.linkGroup.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-red-600 text-white rounded-full shadow"
                                whileHover={{ backgroundColor: "#b91c1c" }}
                                transition={{ duration: 0.2 }}
                              >
                                Live Demo
                              </motion.a>
                            )}
                            {seg.linkGroup.source && (
                              <motion.a
                                href={seg.linkGroup.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-gray-600 text-white rounded-full shadow"
                                whileHover={{ backgroundColor: "#374151" }}
                                transition={{ duration: 0.2 }}
                              >
                                View Source
                              </motion.a>
                            )}
                          </div>
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
