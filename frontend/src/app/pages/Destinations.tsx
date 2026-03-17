import { motion } from "motion/react";
import { GraduationCap, Briefcase, Globe, TrendingUp, Users, Award, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router";
import React from "react";

export default function Destinations() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Study Destinations</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover world-class education opportunities in Australia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Australia Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
          >
            <div className="relative h-96 md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1686542603011-e7edc5e6c5f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXN0cmFsaWElMjBzeWRuZXklMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxNzQwMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Australia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D] via-[#0B2C4D]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center mb-4">
                  <span className="text-6xl mr-4">🇦🇺</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Australia</h2>
                </div>
                <p className="text-xl text-white/90 max-w-3xl">
                  Home to world-renowned universities, stunning landscapes, and incredible opportunities for international students
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Study in Australia */}
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
              Why Study in Australia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Australia offers exceptional education quality, vibrant student life, and excellent post-study opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "World-Class Universities",
                description: "7 Australian universities rank in the global top 100",
                color: "#F47B20",
              },
              {
                icon: Briefcase,
                title: "Work While Studying",
                description: "Work up to 48 hours per fortnight during studies",
                color: "#4FA3D1",
              },
              {
                icon: Users,
                title: "Multicultural Environment",
                description: "Students from over 140 countries call Australia home",
                color: "#F47B20",
              },
              {
                icon: TrendingUp,
                title: "Post-Study Work Rights",
                description: "Up to 4 years post-study work visa available",
                color: "#4FA3D1",
              },
              {
                icon: Globe,
                title: "English-Speaking",
                description: "Improve your English in a native-speaking environment",
                color: "#F47B20",
              },
              {
                icon: GraduationCap,
                title: "Quality Education",
                description: "Globally recognized qualifications and research excellence",
                color: "#4FA3D1",
              },
              {
                icon: MapPin,
                title: "Safe & Welcoming",
                description: "Known for safety, friendly locals, and quality of life",
                color: "#F47B20",
              },
              {
                icon: Calendar,
                title: "Flexible Intakes",
                description: "Multiple start dates throughout the year",
                color: "#4FA3D1",
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
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Study Areas */}
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
              Popular Fields of Study
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Australia excels in these academic disciplines
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Engineering & Technology", icon: "⚙️" },
              { name: "Business & Management", icon: "💼" },
              { name: "Health Sciences & Medicine", icon: "🏥" },
              { name: "Information Technology", icon: "💻" },
              { name: "Hospitality & Tourism", icon: "🏨" },
              { name: "Arts & Creative Industries", icon: "🎨" },
              { name: "Environmental Science", icon: "🌿" },
              { name: "Education & Teaching", icon: "📚" },
              { name: "Architecture & Design", icon: "🏛️" },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
              >
                <span className="text-4xl mr-4">{field.icon}</span>
                <span className="text-lg font-semibold">{field.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Highlights */}
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
              Popular Study Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Major Australian cities offering world-class education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                city: "Sydney",
                image: "https://images.unsplash.com/photo-1756805115188-d72c077932fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXN0cmFsaWElMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzE3NDAzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Australia's largest city with top-ranked universities",
              },
              {
                city: "Melbourne",
                image: "https://images.unsplash.com/photo-1547817651-7fb0cc360536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NzE3NDAzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Cultural capital and education hub",
              },
              {
                city: "Brisbane",
                image: "https://images.unsplash.com/photo-1717185358815-870a1f963465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaW50ZXJuYXRpb25hbCUyMHN0dWRlbnRzJTIwaGFwcHl8ZW58MXx8fHwxNzcxNzQwMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Sunshine state with excellent student lifestyle",
              },
            ].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <img src={city.image} alt={city.city} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{city.city}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-lg">{city.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Coming Soon */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#4FA3D1] to-[#0B2C4D] rounded-3xl p-10 md:p-16 text-white text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">More Destinations Coming Soon</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                We're expanding our services to include more study destinations. Stay tuned for updates on new countries and opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-5xl mb-8">
                <span>🇬🇧</span>
                <span>🇨🇦</span>
                <span>🇺🇸</span>
                <span>🇳🇿</span>
              </div>
              <p className="text-lg text-white/80">
                Currently specializing in: <span className="text-[#F47B20] font-bold text-2xl">Australia 🇦🇺</span>
              </p>
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
              Ready to Study in Australia?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book your free consultation to discuss Australian universities and courses perfect for you
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F47B20] text-white px-10 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Start Your Australian Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
