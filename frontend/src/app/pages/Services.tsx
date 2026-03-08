import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  Users,
  FileCheck,
  Globe,
  Plane,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { Link } from "react-router";

interface Service {
  id: string;
  name: string;
  category: string;
  icon_url: string | null;
  short_description: string;
  long_description: string;
}

const iconMap: Record<string, LucideIcon> = {
  "support.svg": GraduationCap,
  "ielts.svg": BookOpen,
  "career.svg": Users,
  "applications.svg": FileCheck,
  "visa.svg": Globe,
  "orientation.svg": Plane,
  "flight.svg": Plane,
  "accommodation.svg": HeartHandshake,
  "employment.svg": Users,
  "post-arrival.svg": HeartHandshake,
  "change.svg": FileCheck,
  "finance.svg": HeartHandshake,
};

const colors = ["#F47B20", "#4FA3D1"];

function getIcon(iconUrl: string | null): LucideIcon {
  if (!iconUrl) return GraduationCap;
  const filename = iconUrl.split("/").pop() || "";
  return iconMap[filename] ?? GraduationCap;
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = getIcon(service.icon_url);
  const color = colors[index % colors.length];

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
        <div
          className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-[#F47B20] transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
            style={{ backgroundColor: color }}
          >
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{service.name}</h3>
          <p className="text-gray-600">{service.short_description}</p>
          <p className="text-sm text-[#F47B20] mt-4 font-medium">Click to learn more</p>
        </div>

        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] rounded-2xl shadow-xl p-8 flex flex-col justify-between text-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <h3 className="text-xl font-bold mb-4">{service.name}</h3>
            <p className="text-white/90 leading-relaxed">{service.long_description}</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#F47B20] text-white px-6 py-2.5 rounded-full hover:bg-[#d66a1a] transition-all duration-300 text-center mt-4 inline-block"
          >
            Get Assistance
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
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
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

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
              { step: "01", title: "Free Consultation", description: "We discuss your goals, preferences, and budget to create a personalized plan." },
              { step: "02", title: "Course & University Selection", description: "We help you choose the right course and universities based on your profile." },
              { step: "03", title: "Application Preparation", description: "We guide you through document preparation and application submission." },
              { step: "04", title: "Admission & Visa Support", description: "We assist with offer acceptance and visa application processes." },
              { step: "05", title: "Pre & Post Departure", description: "We prepare you for departure and support you after arrival." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
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
