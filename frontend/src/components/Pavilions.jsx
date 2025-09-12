import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Pavilions() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_URL = import.meta.env.VITE_API_BASE_URL_FOR_IMAGES;
  console.log("IMAGE_URL:", IMAGE_URL);
  const [pavilions, setPavilions] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/frontend/pavilions`)
      .then(res => res.json())
      .then(data => setPavilions(data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    console.log("Pavilions data:", pavilions);
  }, [pavilions]);
  return (
    <section id="pavilions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">State Pavilions Work</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">Dynamic pavilion data managed by admin.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {pavilions.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative overflow-hidden rounded-full w-48 h-48 mb-4 shadow-lg group">
                {p.image && (
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                    <img 
                      src={`${IMAGE_URL}/uploads/${p.image}`} 
                      className="w-full h-full object-cover"
                      alt={`${p.state} Pavilion`}
                    />
                    <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/20 transition-colors duration-300" />
                  </div>
                )}
              </div>
              <motion.h3 
                className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300"
              >
                {p.state} Pavilion
              </motion.h3>
              <p className="text-gray-600 max-w-sm">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}