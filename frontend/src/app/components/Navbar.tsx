import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { 
      name: "Services", 
      path: "https://arckae-backend.onrender.com/api/services",
      hasDropdown: true,
      subLinks: [
        { name: "Core Services", path: "https://arckae-backend.onrender.com/api/services" },
        { name: "We Also Provide", path: "/we-also-provide" }
      ]
    },
    { name: "Study Options", path: "/study-options" },
    { name: "Destinations", path: "/destinations" },
    { name: "FAQ", path: "https://arckae-backend.onrender.com/api/faqs" },
    { name: "Location", path: "/location" },
    { name: "Contact", path: "https://arckae-backend.onrender.com/api/contact" },
    { name: "Staff", path: "https://arckae-backend.onrender.com/api/staff" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-gray-200/80 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/98 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#0B2C4D] to-[#4FA3D1] bg-clip-text text-transparent">
              ARCKAE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 transition-colors ${
                        location.pathname === link.path || location.pathname === "/we-also-provide"
                          ? "text-[#F47B20] font-semibold"
                          : "text-[#0B2C4D] hover:text-[#F47B20]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {link.subLinks?.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          className="block px-4 py-3 text-[#0B2C4D] hover:bg-[#F47B20] hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`transition-colors ${
                      location.pathname === link.path
                        ? "text-[#F47B20] font-semibold"
                        : "text-[#0B2C4D] hover:text-[#F47B20]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:block bg-[#F47B20] text-white px-6 py-2.5 rounded-full hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Schedule Appointment
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#0B2C4D] hover:text-[#F47B20] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between py-2 transition-colors ${
                          location.pathname === link.path || location.pathname === "/we-also-provide"
                            ? "text-[#F47B20] font-semibold"
                            : "text-[#0B2C4D]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {link.subLinks?.map((subLink) => (
                              <Link
                                key={subLink.name}
                                to={subLink.path}
                                className="block py-2 text-[#0B2C4D] hover:text-[#F47B20]"
                              >
                                {subLink.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-2 transition-colors ${
                        location.pathname === link.path
                          ? "text-[#F47B20] font-semibold"
                          : "text-[#0B2C4D]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="block w-full bg-[#F47B20] text-white px-6 py-2.5 rounded-full hover:bg-[#d66a1a] transition-all text-center mt-4"
              >
                Schedule Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}