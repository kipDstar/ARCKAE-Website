import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, Users, FileCheck, Plane, Globe } from "lucide-react";
import React from "react";

const carouselSlides = [
  {
    icon: GraduationCap,
    title: "End-to-End Study Abroad Support",
    description: "Complete guidance from application to arrival in your dream destination.",
    color: "#F47B20",
  },
  {
    icon: BookOpen,
    title: "IELTS Training & Preparation",
    description: "Expert coaching to help you achieve your target IELTS score.",
    color: "#4FA3D1",
  },
  {
    icon: Users,
    title: "Career Guidance & Course Selection",
    description: "Personalized counseling to choose the right course for your future.",
    color: "#F47B20",
  },
  {
    icon: FileCheck,
    title: "School Application & Admission Support",
    description: "Professional assistance with applications to top universities.",
    color: "#4FA3D1",
  },
  {
    icon: Globe,
    title: "Visa Processing & Documentation",
    description: "Seamless visa application support with high success rates.",
    color: "#F47B20",
  },
  {
    icon: Plane,
    title: "Pre & Post Departure Support",
    description: "Comprehensive support before and after you arrive abroad.",
    color: "#4FA3D1",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B2C4D] via-[#1a4570] to-[#4FA3D1]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NzE3NDAzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Bridging Education to<br />
              <span className="text-[#F47B20]">Global Opportunity</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
            >
              Your trusted partner for studying in Australia and beyond
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contact"
                className="bg-[#F47B20] text-white px-8 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Book Free Consultation
              </Link>
              <Link
                to="/services"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full text-lg hover:bg-white hover:text-[#0B2C4D] transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </div>

          {/* Carousel Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              {/* Carousel Content */}
              <div className="relative h-64 md:h-72 flex items-center justify-center">
                {carouselSlides.map((slide, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      scale: currentSlide === index ? 1 : 0.8,
                      x: currentSlide === index ? 0 : index < currentSlide ? -100 : 100,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
                      currentSlide === index ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: slide.color }}
                    >
                      <slide.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-lg text-white/90 max-w-2xl mb-6">
                      {slide.description}
                    </p>
                    <Link
                      to="/services"
                      className="bg-[#F47B20] text-white px-6 py-2.5 rounded-full hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-[#F47B20] w-8"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] mb-4">
              Why Choose ARCKAE?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are committed to making your study abroad dreams a reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Australia Focused",
                description: "Specialized expertise in Australian education system",
                icon: "🇦🇺",
              },
              {
                title: "Student-Centered",
                description: "Personalized guidance tailored to your goals",
                icon: "🎓",
              },
              {
                title: "Transparent Process",
                description: "Clear communication at every step",
                icon: "✨",
              },
              {
                title: "End-to-End Support",
                description: "From application to arrival and beyond",
                icon: "🤝",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book a free consultation with our expert advisors today
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Schedule Your Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
