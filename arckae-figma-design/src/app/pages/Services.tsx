import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, BookOpen, Users, FileCheck, Globe, Plane, HeartHandshake } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    icon: GraduationCap,
    title: "End-to-End Study Abroad Support",
    shortDesc: "Complete guidance throughout your entire study abroad journey",
    fullDesc: "From initial consultation to your arrival and settlement, we provide comprehensive support at every stage. Our holistic approach ensures you're never alone in your journey to study abroad.",
    color: "#F47B20",
  },
  {
    icon: BookOpen,
    title: "IELTS Training & Preparation",
    shortDesc: "Expert coaching to achieve your target IELTS score",
    fullDesc: "Our experienced trainers provide personalized IELTS preparation with practice tests, speaking sessions, and writing feedback to help you achieve the scores required by your dream university.",
    color: "#4FA3D1",
  },
  {
    icon: Users,
    title: "Career Guidance & Course Selection",
    shortDesc: "Personalized counseling for the right career path",
    fullDesc: "We help you identify the perfect course and university based on your interests, career goals, and budget. Our expert counselors provide insights into job markets and career prospects.",
    color: "#F47B20",
  },
  {
    icon: FileCheck,
    title: "School Application Support",
    shortDesc: "Professional assistance with university applications",
    fullDesc: "Our team helps you prepare compelling applications, perfect your statement of purpose, organize documents, and submit error-free applications to maximize your chances of admission.",
    color: "#4FA3D1",
  },
  {
    icon: Globe,
    title: "Visa Application Support",
    shortDesc: "Seamless visa processing with high success rates",
    fullDesc: "Navigate complex visa requirements with confidence. We assist with documentation, form filling, interview preparation, and ensure your application meets all requirements for approval.",
    color: "#F47B20",
  },
  {
    icon: Plane,
    title: "Pre-Departure Support",
    shortDesc: "Comprehensive preparation before you fly",
    fullDesc: "Get ready for your new life abroad with our pre-departure orientation covering accommodation, banking, healthcare, culture, and essential tips for a smooth transition.",
    color: "#4FA3D1",
  },
  {
    icon: HeartHandshake,
    title: "Post-Departure Support",
    shortDesc: "Ongoing assistance after you arrive",
    fullDesc: "We continue supporting you after arrival with help in settling in, resolving issues, finding part-time work, and ensuring your academic journey stays on track.",
    color: "#F47B20",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-80 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-[#F47B20] transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
            style={{ backgroundColor: service.color }}
          >
            <service.icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{service.title}</h3>
          <p className="text-gray-600">{service.shortDesc}</p>
          <p className="text-sm text-[#F47B20] mt-4 font-medium">Click to learn more</p>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] rounded-2xl shadow-xl p-8 flex flex-col justify-between text-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-white/90 leading-relaxed">{service.fullDesc}</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#F47B20] text-white px-6 py-2.5 rounded-full hover:bg-[#d66a1a] transition-all duration-300 text-center mt-4"
          >
            Get Assistance
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive support for your study abroad journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hover over each card to discover how we can help you achieve your study abroad goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent journey to your dream university
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Free Consultation",
                description: "We discuss your goals, preferences, and budget to create a personalized plan.",
              },
              {
                step: "02",
                title: "Course & University Selection",
                description: "We help you choose the right course and universities based on your profile.",
              },
              {
                step: "03",
                title: "Application Preparation",
                description: "We guide you through document preparation and application submission.",
              },
              {
                step: "04",
                title: "Admission & Visa Support",
                description: "We assist with offer acceptance and visa application processes.",
              },
              {
                step: "05",
                title: "Pre & Post Departure",
                description: "We prepare you for departure and support you after arrival.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-[#F47B20] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                  {item.step}
                </div>
                <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#0B2C4D] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
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
              Let's Get Started
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book your free consultation today and take the first step towards your international education
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Schedule Your Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
