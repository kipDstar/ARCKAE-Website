import { motion } from "motion/react";
import { MapPin, Mail, Phone, Clock, Navigation } from "lucide-react";
import { Link } from "react-router";

export default function Location() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Visit Our Office</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Come meet us in person and start your study abroad journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-96 md:h-[500px] relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.756!2d35.508!3d0.531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMC41MzHCsDAwLjMwOCcwJzAwLjAiTiAzNcKwMzAnMjguOCJF!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ARCKAE Office Location"
          ></iframe>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0B2C4D" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <a
              href="https://maps.app.goo.gl/15AmWCWNLPAggcbR7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0B2C4D] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#F47B20] transition-colors font-semibold"
            >
              <Navigation className="w-5 h-5" />
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-[#0B2C4D] mb-8">Get in Touch</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Visit our office or reach out to us through any of the channels below
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F47B20] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Office Address</h3>
                    <p className="text-gray-600">Iten Town - Kalyet Center</p>
                    <p className="text-gray-600">2nd Floor</p>
                    <p className="text-gray-600">Kenya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4FA3D1] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Email Us</h3>
                    <a 
                      href="mailto:arckae.int@gmail.com"
                      className="text-[#4FA3D1] hover:text-[#F47B20] transition-colors"
                    >
                      arckae.int@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F47B20] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Call Us</h3>
                    <a href="tel:+254741001286" className="text-gray-600 hover:text-[#F47B20] transition-colors">+254 741 001 286</a>
                    <p className="text-sm text-gray-500 mt-1">Available during office hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4FA3D1] rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Office Hours</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-500">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Person */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] rounded-3xl p-10 text-white h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Meet Our Director</h2>
                  <div className="mb-8">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 mx-auto">
                      <img
                        src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNjUzMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Winnie Jeptum Cheruiyot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Winnie Jeptum Cheruiyot</h3>
                      <p className="text-white/90 mb-4"> Director - Operations</p>
                      <p className="text-white/80 leading-relaxed">
                        With years of experience in education consulting, Winnie is dedicated to helping students achieve their dreams of studying abroad. Her personalized approach and deep knowledge of the Australian education system make her the perfect guide for your journey.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="block w-full bg-[#F47B20] text-white px-8 py-4 rounded-full text-center hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105 font-semibold text-lg"
                  >
                    Book a Consultation
                  </Link>
                  <a
                    href="mailto:arckae.int@gmail.com"
                    className="block w-full bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full text-center hover:bg-white hover:text-[#0B2C4D] transition-all duration-300 font-semibold text-lg"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-[#0B2C4D] mb-8 text-center">How to Find Us</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F47B20] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Locate Kalyet Center</h3>
                    <p className="text-gray-600">
                      The Kalyet Center is located in the heart of Iten Town, easily accessible by public transport or private vehicle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F47B20] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Go to the 2nd Floor</h3>
                    <p className="text-gray-600">
                      Take the stairs or elevator to the second floor of the building. You'll find clear signage directing you to our office.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F47B20] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">Look for ARCKAE Signage</h3>
                    <p className="text-gray-600">
                      Our office door has clear ARCKAE branding. Walk in and our friendly team will welcome you!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-[#FFF7F0] rounded-xl border-2 border-[#F47B20]">
                <p className="text-[#0B2C4D] font-semibold mb-2">💡 Pro Tip:</p>
                <p className="text-gray-700">
                  While walk-ins are welcome, we recommend booking an appointment in advance to ensure we can give you our full attention and have all the resources ready for your consultation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0B2C4D]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Schedule Your Visit Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book an appointment online or drop by during office hours. We're here to help you start your study abroad journey!
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Book Your Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
