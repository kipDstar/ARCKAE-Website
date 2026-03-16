import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import React from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    course: "",
    education: "",
    message: "",
    appointmentDate: "",
    mode: "virtual",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://arckae-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          intended_destination: formData.destination,
          preferred_course: formData.course,
          current_education_level: formData.education,
          message: formData.message,
          appointment_date: formData.appointmentDate || null,
          mode: formData.mode === "physical" ? "Physical" : "Virtual",
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        toast.success("Consultation scheduled successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          destination: "",
          course: "",
          education: "",
          message: "",
          appointmentDate: "",
          mode: "virtual",
        });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Consultation</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Take the first step towards your study abroad dreams
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-[#F47B20] rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C4D] text-center mb-4">
                Schedule Your Free Consultation
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-[#0B2C4D] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-[#0B2C4D] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[#0B2C4D] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Destination and Course */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="destination" className="block text-[#0B2C4D] mb-2">
                      Intended Destination *
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                    >
                      <option value="">Select a destination</option>
                      <option value="australia">Australia</option>
                      <option value="other">Other (Coming Soon)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-[#0B2C4D] mb-2">
                      Preferred Course/Field
                    </label>
                    <input
                      type="text"
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                      placeholder="e.g., Engineering, Business"
                    />
                  </div>
                </div>

                {/* Education Level */}
                <div>
                  <label htmlFor="education" className="block text-[#0B2C4D] mb-2">
                    Current Education Level *
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School / KCSE</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Appointment Date and Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="appointmentDate" className="block text-[#0B2C4D] mb-2">
                      Preferred Appointment Date *
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="mode" className="block text-[#0B2C4D] mb-2">
                      Consultation Mode *
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors"
                    >
                      <option value="virtual">Virtual (Video Call)</option>
                      <option value="physical">Physical (In-Office)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[#0B2C4D] mb-2">
                    Message / Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F47B20] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your study abroad goals..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#F47B20] text-white px-8 py-4 rounded-full text-lg hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Schedule My Consultation</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to receive communication from ARCKAE Study Abroad Agency
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-[#0B2C4D] mb-4">Success!</h3>
              <p className="text-lg text-gray-600 mb-2">
                Your consultation has been scheduled successfully.
              </p>
              <p className="text-gray-500">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#0B2C4D] mb-4">
              What to Expect from Your Consultation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive session designed to kickstart your study abroad journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Profile Assessment",
                description: "We evaluate your academic background and career goals",
                icon: "📋",
              },
              {
                title: "Course Guidance",
                description: "Personalized recommendations for courses and universities",
                icon: "🎓",
              },
              {
                title: "Process Overview",
                description: "Clear explanation of application and visa processes",
                icon: "📝",
              },
              {
                title: "Timeline & Costs",
                description: "Transparent breakdown of timelines and expenses",
                icon: "💰",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0B2C4D] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-[#0B2C4D] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Prefer to Reach Out Directly?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Feel free to contact us via email or visit our office
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:arckae.int@gmail.com"
                className="bg-[#F47B20] text-white px-8 py-4 rounded-full hover:bg-[#d66a1a] transition-all duration-300 hover:shadow-lg"
              >
                Email Us
              </a>
              <a
                href="/location"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0B2C4D] transition-all duration-300"
              >
                Visit Our Office
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
