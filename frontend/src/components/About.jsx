import { motion } from "framer-motion";

const stats = [
  { number: "20+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "100+", label: "Regular Clients" },
  { number: "Pan", label: "India Presence" }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Added Client Image */}
            <h2 className="text-4xl font-bold text-green-700 mb-6">About Us</h2>
            <motion.div 
              className="mb-8 flex justify-start"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-green-500 ring-offset-4">
                <img
                  src="/images/director.jpg" // Update with your image path
                  alt="Company Director"
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
            {/* <h2 className="text-4xl font-bold text-green-700 mb-6">About Us</h2> */}

            <div className="space-y-4 text-gray-700">
              <p>
                Diamond Enterprises is a leading name in the field of Housekeeping, 
                Plant & Flower Decoration, and Botanical Garden Services.
              </p>
              <p>
                With over 20 years of experience, we have proudly served prestigious 
                clients and event organizers across India. From exhibitions and conferences 
                to state pavilions and special events, we bring beauty, cleanliness, 
                and greenery to every space we touch.
              </p>
              <p>
                We operate pan-India, delivering high-quality services at major venues 
                and exhibitions across the country. Our work is driven by professionalism, 
                reliability, and a commitment to excellence.
              </p>
              <p>
                Whether it's India Expo Mart, Pragati Maidan, or other big platforms — 
                we've consistently delivered our best, earning trust through our 
                dedicated services.
              </p>
            </div>
            <motion.p 
              className="mt-6 text-xl text-green-600 font-semibold italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "Your Trusted Partner in Cleanliness & Green Decor"
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold text-green-600 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-green-600 text-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Professional Excellence
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Pan-India Coverage
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Trusted by Industry Leaders
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Specialists in Botanical Garden Setup
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}