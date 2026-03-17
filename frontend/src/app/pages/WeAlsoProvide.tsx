import { motion } from "motion/react";
import { Home, Briefcase, MapPin, Building2, DollarSign, Phone } from "lucide-react";
import { Link } from "react-router";
import React from "react";

const auxiliaryServices = [
  {
    icon: Home,
    title: "Accommodation Booking Assistance",
    description: "We help you find safe, comfortable, and affordable accommodation near your university. From student housing to private rentals, we guide you through the entire process.",
  },
  {
    icon: Briefcase,
    title: "Employment & Part-Time Job Advisory",
    description: "Get expert advice on student work rights, finding part-time jobs, and professional preparation e.g. CV writing, LinkedIN profile optimization and networking guides.",
  },
  {
    icon: MapPin,
    title: "Post Arrival Orientation & Support",
    description: "Comprehensive orientation sessions covering local transport, banking, mobile connections, healthcare services, and cultural adaptation.",
  },
  {
    icon: Building2,
    title: "Change of Institution Support",
    description: "Need to transfer to another university? We assist with course credit transfers, new applications, and ensuring a smooth transition.",
  },
  {
    icon: DollarSign,
    title: "Financial Advisory Guidance",
    description: "Expert advice on budgeting, managing expenses, opening bank accounts, and accessing scholarships or financial aid.",
  },
];

export default function WeAlsoProvide() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">We Also Provide</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Additional services to ensure your complete success abroad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Auxiliary Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond the basics - comprehensive support for every aspect of your international journey
            </p>
          </motion.div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {auxiliaryServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start p-8">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 ${
                      index % 2 === 0 ? "bg-[#F47B20]" : "bg-[#4FA3D1]"
                    }`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[#0B2C4D] mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why These Services Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Moving to a new country is about more than just academics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Peace of Mind",
                description: "Know that you have support for every aspect of your international life",
                emoji: "🛡️",
              },
              {
                title: "Save Time & Money",
                description: "Avoid costly mistakes with our expert guidance on accommodation and finances",
                emoji: "💰",
              },
              {
                title: "Faster Adaptation",
                description: "Settle into your new life quickly with our comprehensive orientation",
                emoji: "⚡",
              },
              {
                title: "Career Success",
                description: "Build work experience while studying with our employment advisory",
                emoji: "📈",
              },
              {
                title: "Continuous Support",
                description: "We're with you throughout your entire journey, not just at the beginning",
                emoji: "🤝",
              },
              {
                title: "Emergency Ready",
                description: "24/7 support means you're never alone in facing challenges",
                emoji: "🆘",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] rounded-3xl p-10 md:p-16 text-white text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How to Access These Services</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                These auxiliary services are available to all our students. Simply let us know what you need, and we'll provide the support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                  <div className="text-6xl font-bold text-[#F47B20] mb-2">1</div>
                  <p className="text-lg">Book a consultation</p>
                </div>
                <div>
                  <div className="text-6xl font-bold text-[#F47B20] mb-2">2</div>
                  <p className="text-lg">Tell us your needs</p>
                </div>
                <div>
                  <div className="text-6xl font-bold text-[#F47B20] mb-2">3</div>
                  <p className="text-lg">Get expert support</p>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#F47B20]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Additional Support?
            </h2>
            <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto">
              Speak to our team today about any aspect of your study abroad journey
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#F47B20] px-10 py-4 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 font-semibold"
            >
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
