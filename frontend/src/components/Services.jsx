import { useEffect, useState } from "react";

export default function Services() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transforming spaces with professional decoration and maintenance services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon || "❓"}</div>
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                {service.title || "Untitled Service"}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description || "No description available"}
              </p>

              <div className="border-t pt-4">
                {Array.isArray(service.features) && service.features.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 italic">No features listed</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300">
            Request a Service
          </button>
        </div> */}
      </div>
    </section>
  );
}
