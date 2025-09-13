/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const clients = [
  "Deepali Design & Exhibits Pvt. Ltd",
  "Pavilion and Interior",
  "Dara Projects",
  "Sardana Arts",
  "Expression 360",
  "Quick Target",
  "Grace India",
  "Frameslab India",
  "Modern Staze",
  "Isckons Global Pvt. Ltd",
  "Swift Corporation",
  "XS Production India Pvt. Ltd",
  "Four Nine Media Pvt. Ltd",
  "INCL Pvt. Ltd",
  "All Day Production",
  "Kunj Event Pvt. Ltd",
  "Craftsman Exhibition and Interiors",
  "Showcraft Pavilion Furniture Pvt. Ltd",
  "Shubham Kiraya Bhandar Event & Exhibition",
  "Lalu and Sons",
  "The Kalki Culture Event & Promotion",
  "Arya Exhibition and Conference",
  "Mode Interior",
  "Show Supporters LLP",
  "Graphic Ads",
  "Capco Arts",
  "Real Best Event Service Pvt. Ltd",
  "Shrikhala",
  "Percept Limited",
  "Expro India"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Clients() {
  return (
    <section id="clients" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-green-700 mb-4"
          >
            Our Trusted Clients
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We're proud to work with leading companies in the exhibition and event industry
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {clients?.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-gray-800 font-medium text-center">
                {client}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}