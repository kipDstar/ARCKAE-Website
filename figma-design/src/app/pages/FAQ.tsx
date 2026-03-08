import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { MessageCircle, HelpCircle, BookOpen, Plane, GraduationCap, FileText } from "lucide-react";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const faqCategories = [
  {
    category: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        question: "What services does ARCKAE Study Abroad Agency provide?",
        answer: "ARCKAE offers comprehensive study abroad services including career guidance, university selection, application assistance, visa processing, IELTS preparation, accommodation support, and post-arrival services. We specialize in helping Kenyan students pursue their education in Australia."
      },
      {
        question: "How long does the entire process take?",
        answer: "The timeline varies depending on your chosen university and program. Generally, the process takes 3-6 months from initial consultation to departure. This includes application processing (4-8 weeks), visa processing (4-12 weeks), and pre-departure preparation. We recommend starting at least 6 months before your intended start date."
      },
      {
        question: "What are your service fees?",
        answer: "Our service fees vary depending on the package you choose. We offer flexible payment plans and some services are free when you enroll through us. Contact us for a detailed quote based on your specific needs. Many of our services are covered by partner universities."
      },
      {
        question: "Do I need to visit your office in person?",
        answer: "While we welcome office visits at our Nairobi location, it's not mandatory. We can conduct the entire process online through video consultations, email, and WhatsApp. However, an initial in-person consultation is recommended for a personalized experience."
      }
    ]
  },
  {
    category: "Application Process",
    icon: FileText,
    questions: [
      {
        question: "What documents do I need to apply?",
        answer: "Typical documents include: academic transcripts and certificates, passport copy, IELTS/TOEFL scores, CV/resume, statement of purpose, recommendation letters, financial documents, and any relevant work experience certificates. Specific requirements vary by institution and program."
      },
      {
        question: "Can you help if I don't have an IELTS score yet?",
        answer: "Absolutely! We provide IELTS preparation courses and can guide you through the entire testing process. We also help with conditional offers from universities while you prepare for your English proficiency test."
      },
      {
        question: "What is the minimum GPA required for Australian universities?",
        answer: "Requirements vary by institution and program. Generally, undergraduate programs require a minimum of 60-70% (C+ to B-), while postgraduate programs typically require 65-75% (B to B+). Some competitive programs may require higher grades. We can assess your specific situation during consultation."
      },
      {
        question: "Can I apply to multiple universities at once?",
        answer: "Yes, we recommend applying to 3-5 universities to maximize your chances of acceptance. We'll help you strategically select a mix of reach, match, and safety schools based on your profile and preferences."
      }
    ]
  },
  {
    category: "Studying in Australia",
    icon: BookOpen,
    questions: [
      {
        question: "Why choose Australia for higher education?",
        answer: "Australia offers world-class education with 7 universities in the global top 100, multicultural environment, post-study work opportunities (2-4 years), excellent quality of life, safe cities, and strong job market. Australian qualifications are globally recognized and valued."
      },
      {
        question: "Can I work while studying in Australia?",
        answer: "Yes! International students can work up to 48 hours per fortnight during semester and unlimited hours during breaks. This helps cover living expenses and gain valuable work experience. The minimum wage in Australia is approximately AUD $23/hour."
      },
      {
        question: "What are the living costs in Australia?",
        answer: "Average living costs range from AUD $20,000-$27,000 per year, depending on the city. Sydney and Melbourne are more expensive than cities like Brisbane, Adelaide, or Perth. This includes accommodation, food, transport, and personal expenses. We provide detailed budget planning during consultation."
      },
      {
        question: "Are there scholarships available for Kenyan students?",
        answer: "Yes! Many Australian universities offer scholarships ranging from 10-50% tuition fee waivers for international students. We also help you explore Australian Government scholarships, organization-sponsored scholarships, and merit-based awards. We'll identify suitable opportunities based on your profile."
      }
    ]
  },
  {
    category: "Visa & Travel",
    icon: Plane,
    questions: [
      {
        question: "What type of visa do I need to study in Australia?",
        answer: "You'll need a Student Visa (Subclass 500). We handle the entire visa application process, including documentation, GTE statement preparation, and interview coaching. The visa allows you to study, work part-time, and travel within Australia."
      },
      {
        question: "How long does visa processing take?",
        answer: "Student visa processing typically takes 4-12 weeks, though it can be faster or slower depending on individual circumstances. We recommend applying as soon as you receive your Confirmation of Enrollment (CoE) from the university."
      },
      {
        question: "What is a GTE statement?",
        answer: "GTE (Genuine Temporary Entrant) is a statement explaining your genuine intention to study in Australia and return to Kenya after studies. It's a crucial part of your visa application. We provide expert guidance and templates to help you craft a compelling GTE statement."
      },
      {
        question: "Can my family accompany me to Australia?",
        answer: "Yes, you can include dependent family members (spouse and children) in your student visa application. They'll receive dependent visas that allow them to live in Australia, and your partner may be eligible to work. We can guide you through the family visa process."
      }
    ]
  },
  {
    category: "Post-Arrival Support",
    icon: GraduationCap,
    questions: [
      {
        question: "Do you provide support after I arrive in Australia?",
        answer: "Yes! We offer post-arrival services including airport pickup coordination, accommodation assistance, bank account setup guidance, orientation support, and ongoing consultation throughout your studies. Our alumni network in Australia is also available to help you settle in."
      },
      {
        question: "How do I find accommodation in Australia?",
        answer: "We assist with various accommodation options including university dormitories, homestays, shared apartments, and private rentals. We provide guidance on safe neighborhoods, rental agreements, and connect you with reliable accommodation providers."
      },
      {
        question: "What happens after I complete my studies?",
        answer: "After graduation, you may be eligible for the Temporary Graduate Visa (Subclass 485) which allows you to work in Australia for 2-4 years depending on your qualification. We provide guidance on post-study work options, permanent residency pathways, and career opportunities."
      },
      {
        question: "Do you help with job placement in Australia?",
        answer: "While we don't directly place students in jobs, we provide CV writing assistance, interview preparation, networking guidance, and connect you with career services at your university. We also share job opportunities and internship programs with our students."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <>
      <ScrollToTopOnMount />
      <div className="min-h-screen bg-gradient-to-b from-white to-[#4FA3D1]/5">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B2C4D] via-[#0B2C4D] to-[#4FA3D1]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F47B20] rounded-full mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Find answers to common questions about studying abroad in Australia
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-[#0B2C4D] to-[#4FA3D1] px-8 py-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F47B20] rounded-full flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                  </div>

                  <div className="p-8">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`${categoryIndex}-${index}`}
                          className="border-b border-gray-200 last:border-0"
                        >
                          <AccordionTrigger className="text-left hover:text-[#F47B20] transition-colors py-5">
                            <span className="text-lg font-semibold text-[#0B2C4D] pr-4">
                              {item.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700 leading-relaxed pb-5">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-gradient-to-br from-[#F47B20] to-[#d66a1a] rounded-2xl p-12 text-center shadow-xl"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Our team of expert consultants is here to help you with any questions or concerns you may have about studying abroad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-[#F47B20] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contact Us
                </a>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#0B2C4D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0B2C4D]/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
