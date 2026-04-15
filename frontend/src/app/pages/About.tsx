import { motion } from "motion/react";
import { Target, Eye, Award, Users, Globe, Heart } from "lucide-react";
import { Link } from "react-router";
import React from "react";

export default function About() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About ARCKAE</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your Gateway to World-Class Education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNjUzMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Zena"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C4D] mb-6">
                Meet Zena,
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Founder and Director of ARCKAE Study Abroad Agency, Zena is a passionate education consultant dedicated to helping Kenyan students achieve their dreams of studying abroad.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                With extensive knowledge of the Australian education system and experience in student counseling, Zena provides personalized guidance to ensure you find the right path to success.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Her commitment to transparency, integrity, and student success has helped numerous students navigate the complex journey of studying abroad with confidence.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#F47B20] text-white px-8 py-3 rounded-full hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#F47B20] rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2C4D] mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower Kenyan students with access to quality international education by providing comprehensive, personalized support throughout their study abroad journey, making their dreams achievable and their transitions seamless.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#4FA3D1] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2C4D] mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be Kenya's most trusted study abroad agency, recognized for excellence in student counseling and support, bridging the gap between local talent and global educational opportunities, particularly in Australia and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose ARCKAE */}
      <section className="py-20">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond consultancy to become your partner in achieving academic excellence abroad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Guidance",
                description: "Specialized knowledge in Australian universities and education pathways with proven success rates.",
                color: "#F47B20",
              },
              {
                icon: Users,
                title: "Personalized Approach",
                description: "Every student is unique. We tailor our services to match your goals, budget, and aspirations.",
                color: "#4FA3D1",
              },
              {
                icon: Globe,
                title: "Comprehensive Support",
                description: "From IELTS preparation to post-arrival assistance, we're with you every step of the way.",
                color: "#F47B20",
              },
              {
                icon: Heart,
                title: "Student-First Philosophy",
                description: "Your success is our success. We prioritize your needs and work tirelessly to help you achieve your dreams.",
                color: "#4FA3D1",
              },
              {
                icon: Target,
                title: "High Success Rate",
                description: "Our meticulous approach and attention to detail result in high visa approval and admission rates.",
                color: "#F47B20",
              },
              {
                icon: Users,
                title: "Local Expertise",
                description: "Based in Iten, we understand the unique needs and challenges of Kenyan students pursuing international education.",
                color: "#4FA3D1",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-[#0B2C4D]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F47B20] mb-2">10+</div>
              <p className="text-lg">Students Guided</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F47B20] mb-2">90%</div>
              <p className="text-lg">Visa Success Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F47B20] mb-2">50+</div>
              <p className="text-lg"> Available Universities</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F47B20] mb-2">24/7</div>
              <p className="text-lg">Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Let's discuss your study abroad goals and create a personalized roadmap to success
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Book Your Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
