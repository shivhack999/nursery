import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Get in Touch Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-green-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-green-600">
              Have questions about our exhibition stalls? We'd love to hear from
              you.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <User className="absolute top-4 left-1 w-5 h-5 text-green-600" />
                <label
                  htmlFor="name"
                  className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-green-600 transition-all
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
                    peer-focus:-top-3 bg-white px-1 peer-focus:text-green-500"
                >
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  placeholder=" "
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Mail className="absolute top-4 left-1 w-5 h-5 text-green-600" />
                <label
                  htmlFor="email"
                  className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-green-600 transition-all
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
                    peer-focus:-top-3 bg-white px-1 peer-focus:text-green-500"
                >
                  Email
                </label>
              </div>

              {/* Message */}
              <div className="relative w-full">
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                ></textarea>
                <MessageSquare className="absolute top-4 left-1 w-5 h-5 text-green-600" />
                <label
                  htmlFor="message"
                  className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-green-600 transition-all
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
                    peer-focus:-top-3 bg-white px-1 peer-focus:text-green-500"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-6">Diamond Enterprises</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-200" />
                  <div>
                    <p className="text-lg">9810378577</p>
                    <p className="text-lg">7065762167</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-200" />
                  <p className="text-sm">
                    diamondenterprises.exhibition@gmail.com
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-200 mt-1" />
                  <p className="text-sm">
                    Exhibition Services
                    <br />
                    Delhi, India
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-200" />
                  <div>
                    <p className="text-sm">Monday - Friday:</p>
                    <p className="text-sm">9:00 am - 6:00 pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Exhibition Stalls
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Custom Designs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Maintenance
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Info</h4>
              <div className="space-y-2">
                <p className="text-green-100">
                  <span className="font-semibold">GST No:</span>
                  <br />
                  07CZEPK6405J1ZA
                </p>
                <div className="mt-6">
                  <p className="text-xs text-green-200">
                    Professional exhibition stall designers and contractors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
