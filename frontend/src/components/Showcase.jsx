import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons

export default function Showcase() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_URL = import.meta.env.VITE_API_BASE_URL_FOR_IMAGES;
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/frontend/showcase`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);
  
  // scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="showcase" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Work Showcase</h2>
          <p className="text-gray-600">Swipe to explore our latest projects</p>
        </div>

        {images.length > 0 ? (
          <>
            {!showAll ? (
              <div className="relative">
                {/* Scroll container */}
                <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-6 min-w-max">
                    {images.slice(0, 6).map((img) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-80 h-64 flex-shrink-0 group"
                      >
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <img
                            src={`${IMAGE_URL}/uploads/${img.filename}`}
                            alt="Showcase"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scroll buttons */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6 text-green-700" />
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6 text-green-700" />
                </button>

                {/* View All Button */}
                {images.length > 6 && (
                  <motion.button
                    onClick={() => setShowAll(true)}
                    className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full mx-auto block
                           hover:bg-green-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Projects
                  </motion.button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <div className="overflow-hidden rounded-lg shadow-md">
                      <img
                        src={`${IMAGE_URL}/uploads/${img.filename}`}
                        alt="Showcase"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <p className="text-gray-600">No images uploaded yet.</p>
        )}
      </div>
    </section>
  );
}
