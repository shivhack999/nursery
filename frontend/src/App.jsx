import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Clients from "./components/Clients";
import Pavilions from "./components/Pavilions";
import Showcase from "./components/Showcase";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard"; // new page
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Admin Login Page */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Dashboard Page */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Main Website */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Services />
              <Clients />
              <Pavilions />
              <Showcase />
              {/* <WhyChooseUs /> */}
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
