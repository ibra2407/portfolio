import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Folder, X } from "lucide-react";
import projects from "../content/projects.json";

export default function Projects() {
  const [modalIdx, setModalIdx] = useState(null);

  // --- START: New Scroll Indicator States and Ref ---
  const [isAtTop, setIsAtTop] = useState(true); // Initially assume at top
  const [isAtBottom, setIsAtBottom] = useState(false); // Assume content might be scrollable initially
  const scrollRef = useRef(null); // Ref for the scrollable div
  // --- END: New Scroll Indicator States and Ref ---

  // Effect to prevent body scrolling when modal is open/closed
  useEffect(() => {
    if (modalIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIdx]);

  // --- START: New Scroll Handling Logic ---
  // Handle scroll event for the modal content
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setIsAtTop(scrollTop < 10); // A small buffer for "at top"
      // A small buffer for "at bottom"
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);
    }
  };

  // Effect to set initial scroll states and attach/detach listener
  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setIsAtTop(scrollTop < 10);
        setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);

        // If content is not scrollable at all, ensure both indicators are hidden
        if (scrollHeight <= clientHeight) {
          setIsAtTop(true);
          setIsAtBottom(true);
        }
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
      // Initial check after component mounts and when modal opens
      checkScrollPosition();
      // A small timeout to ensure content has rendered before checking scrollability
      const initialCheckTimeout = setTimeout(checkScrollPosition, 50);

      return () => {
        currentScrollRef.removeEventListener('scroll', handleScroll);
        clearTimeout(initialCheckTimeout);
      };
    }
  }, [modalIdx]); // Dependency on modalIdx ensures re-check when a new modal opens
  // --- END: New Scroll Handling Logic ---


  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Sort by endDate desc (empty = use startDate), then startDate desc
  const sorted = [...projects].sort((a, b) => {
    const parse = str => {
      // "May 2024" or "2024" both valid
      return new Date(str);
    };
    const endA = a.card.endDate ? parse(a.card.endDate) : parse(a.card.startDate);
    const endB = b.card.endDate ? parse(b.card.endDate) : parse(b.card.startDate);
    if (endB - endA !== 0) return endB - endA;
    // tie -> startDate desc
    return parse(b.card.startDate) - parse(a.card.startDate);
  });

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
            className="mt-4 text-gray-700 max-w-4xl mx-auto"
          >
            A showcase of projects I've worked on. Click on the cards to see more details.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
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
                  relative p-6 bg-white border border-gray-200 rounded-2xl
                  shadow-lg shadow-red-200/40
                  transition-transform transform
                  hover:-translate-y-1 hover:bg-red-50 hover:shadow-[0_20px_30px_rgba(239,68,68,0.3)]
                  cursor-pointer
                "
              >
                {/* Image/Placeholder for card */}
                <div
                  className="relative flex-shrink-0"
                  style={{ width: '100%', height: 160 }}
                >
                  <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
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


                {/* Title & dates */}
                <h3 className="text-xl font-semibold text-red-600 mt-4">
                  {proj.card.title}
                </h3>
                <p className="text-sm text-gray-500 italic mb-3">
                  {proj.card.startDate}
                  {proj.card.endDate ? ` – ${proj.card.endDate}` : ""}
                </p>

                {/* Two bullet highlights */}
                <ul className="list-disc list-outside pl-4 text-gray-700 space-y-1">
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

      {/* Modal */}
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
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] relative overflow-hidden flex flex-col h-full"
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalIdx(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content Wrapper - Provides uniform p-8 padding for all content */}
              <div className="flex-grow p-8 flex flex-col h-full">

                {/* Modal Header (ONLY title and dates, NO card bullets) */}
                <div>
                  <h3 className="text-2xl font-bold text-red-600">
                    {sorted[modalIdx].card.title}
                  </h3>
                  <p className="text-sm text-gray-400 italic mb-6">
                    {sorted[modalIdx].card.startDate}
                    {sorted[modalIdx].card.endDate
                      ? ` – ${sorted[modalIdx].card.endDate}`
                      : ""}
                  </p>
                </div>

                {/* Scrollable Body Container - This div is relative to position the fades */}
                <div className="relative flex-grow min-h-0">
                  {/* Top Fade Indicator (changed back to subtle gradient) */}
                  <motion.div
                    className="absolute top-0 left-0 right-4 h-12 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isAtTop ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Bottom Fade Indicator (changed back to subtle gradient) */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-4 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isAtBottom ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Actual Scrollable Content */}
                  <div
                    ref={scrollRef}
                    className="h-full overflow-y-scroll scrollbar-thin pr-4"
                    onScroll={handleScroll}
                  >
                    {/* Dynamically render segments based on key presence */}
                    {sorted[modalIdx].modal.segments.map((segment, i) => (
                      <div key={i} className="mb-6">
                        {/* Render text and/or image if either is present in the segment, and it's not a linkGroup */}
                        {("text" in segment || "image" in segment) && !("linkGroup" in segment) && (
                          <>
                            {segment.text && (
                              <p className="text-gray-700 leading-relaxed">
                                {segment.text}
                              </p>
                            )}
                            {segment.image && (
                              <img
                                src={
                                  new URL(
                                    `../assets/projects/${segment.image}`,
                                    import.meta.url
                                  ).href
                                }
                                loading="eager"
                                alt={`${sorted[modalIdx].card.title} - ${i}`}
                                className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                              />
                            )}
                          </>
                        )}
                        {/* Render linkGroup segments separately */}
                        {"linkGroup" in segment && (
                          <div className="flex flex-wrap gap-4 mt-4">
                            {segment.linkGroup.demo && (
                              <motion.a
                                href={segment.linkGroup.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-red-600 text-white rounded-full shadow"
                                whileHover={{ backgroundColor: "#b91c1c" }} // red-700
                                transition={{ duration: 0.2 }}
                              >
                                Live Demo
                              </motion.a>
                            )}
                            {segment.linkGroup.source && (
                              <motion.a
                                href={segment.linkGroup.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-gray-600 text-white rounded-full shadow"
                                whileHover={{ backgroundColor: "#374151" }} // gray-700
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
  );
}