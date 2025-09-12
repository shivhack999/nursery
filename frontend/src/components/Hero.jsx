import { motion } from "framer-motion";history
import { useEffect, useState } from "react";

export default function Hero() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [heroData, setHeroData] = useState({
    hero_title: "Loading...",
    hero_subtitle: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/frontend/hero`)
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
     <div className="relative w-screen overflow-hidden">
      <section
        id="home"
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/garden-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          maxWidth: "100%"
        }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white drop-shadow-lg"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {heroData.hero_title}
            </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {heroData.hero_subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#services"
              className="px-8 py-4 bg-white text-green-700 rounded-full font-semibold 
                       hover:bg-green-50 transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-xl"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold 
                       hover:bg-white hover:text-green-700 transition-all duration-300 
                       transform hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
    </div>
  );
}
