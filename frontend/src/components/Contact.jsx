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
        Have questions about our exhibition stalls? We'd love to hear from you.
      </p>
    </div>

    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="relative w-full">
          <User className="absolute top-4 left-3 w-5 h-5 text-green-600 pointer-events-none" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder=" "
            className="peer w-full pl-10 pr-4 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label
            htmlFor="name"
            className="absolute left-10 text-green-600 transition-all duration-200 bg-white px-1
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
              peer-focus:-top-3 peer-focus:text-green-500"
          >
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative w-full">
          <Mail className="absolute top-4 left-3 w-5 h-5 text-green-600 pointer-events-none" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
            placeholder=" "
            className="peer w-full pl-10 pr-4 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label
            htmlFor="email"
            className="absolute left-10 text-green-600 transition-all duration-200 bg-white px-1
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
              peer-focus:-top-3 peer-focus:text-green-500"
          >
            Email
          </label>
        </div>

        {/* Message */}
        <div className="relative w-full">
          <MessageSquare className="absolute top-4 left-3 w-5 h-5 text-green-600 pointer-events-none" />
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder=" "
            className="peer w-full pl-10 pr-4 pt-4 pb-2 rounded-lg border border-green-300/50 text-green-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          ></textarea>
          <label
            htmlFor="message"
            className="absolute left-10 text-green-600 transition-all duration-200 bg-white px-1
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-green-700
              peer-focus:-top-3 peer-focus:text-green-500"
          >
            Message
          </label>
        </div>

        {/* Submit */}
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      
      {/* Company Info */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Diamond Enterprises</h3>
        <div className="space-y-4 text-green-100">
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-green-200 mt-1" />
            <div>
              <p className="text-base">9810378577</p>
              <p className="text-base">7065762167</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-green-200 mt-1" />
            <p className="text-base">
              diamondenterprises.exhibition@gmail.com
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-green-200 mt-1" />
            <p className="text-base">
              Exhibition Services
              <br />
              Delhi, India
            </p>
          </div>
          <div className="flex items-start space-x-3">
            {/* <Clock className="w-5 h-5 text-green-200 mt-1" /> */}
            {/* <div>
              <p className="text-base">Monday - Friday</p>
              <p className="text-base">9:00 am – 6:00 pm</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Services</h4>
        <ul className="space-y-2 text-green-100">
          {["Exhibition Stalls", "Custom Designs", "Installation", "Maintenance"].map((service) => (
            <li key={service}>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                {service}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-green-100">
          {["About Us", "Portfolio", "Why Choose Us", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Business Info */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Business Info</h4>
        <p className="text-green-100 mb-6">
          <span className="font-semibold">GST No:</span>
          <br />
          07CZEPK6405J1ZA
        </p>
        <p className="text-sm text-green-200">
          Professional exhibition stall designers and contractors
        </p>
      </div>
    </div>

    {/* Bottom Bar */}
    {/* <div className="mt-12 border-t border-green-500/30 pt-6 text-center text-sm text-green-200">
      © {new Date().getFullYear()} Diamond Enterprises. All rights reserved.
    </div> */}
  </div>
</footer>

    </>
  );
}
