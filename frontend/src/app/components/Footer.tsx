import { Link } from "react-router";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B2C4D] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#F47B20]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#4FA3D1] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm">Iten Town - Kalyet Center</p>
                  <p className="text-sm">2nd Floor, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#4FA3D1] flex-shrink-0" />
                <a href="mailto:winniecheruiyot1@gmail.com" className="text-sm hover:text-[#F47B20] transition-colors">
                  winniecheruiyot1@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#4FA3D1] flex-shrink-0" />
                <p className="text-sm">+254 XXX XXX XXX</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#4FA3D1] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p className="text-sm">Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#F47B20]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm hover:text-[#F47B20] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-[#F47B20] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/we-also-provide" className="text-sm hover:text-[#F47B20] transition-colors">
                  We Also Provide
                </Link>
              </li>
              <li>
                <Link to="/study-options" className="text-sm hover:text-[#F47B20] transition-colors">
                  Study Options
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm hover:text-[#F47B20] transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-[#F47B20] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-sm hover:text-[#F47B20] transition-colors">
                  Location
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#F47B20] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#F47B20]">Destinations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/destinations" className="text-sm hover:text-[#F47B20] transition-colors flex items-center">
                  <span className="mr-2">🇦🇺</span> Australia
                </Link>
              </li>
              <li className="text-sm text-gray-400">
                More destinations coming soon...
              </li>
            </ul>
          </div>

          {/* Column 4 - Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#F47B20]">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4FA3D1] rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4FA3D1] rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4FA3D1] rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4FA3D1] rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm mb-3">Connect with Winnie Jeptum Cheruiyot</p>
              <Link
                to="/contact"
                className="inline-block bg-[#F47B20] text-white px-5 py-2 rounded-full text-sm hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © 2026 ARCKAE Study Abroad Agency. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-sm text-gray-300 hover:text-[#F47B20] transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-[#F47B20] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}