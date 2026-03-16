import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  HelpCircle,
  BookOpen,
  Plane,
  GraduationCap,
  FileText,
  LucideIcon,
} from "lucide-react";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import React from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  "Getting Started": HelpCircle,
  Admissions: FileText,
  IELTS: BookOpen,
  "Visa & Travel": Plane,
  "After Arrival": GraduationCap,
};

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const faqCategories = useMemo(() => {
    const byCategory = new Map<string, FAQItem[]>();
    for (const faq of faqs) {
      const list = byCategory.get(faq.category) ?? [];
      list.push(faq);
      byCategory.set(faq.category, list);
    }
    return Array.from(byCategory.entries()).map(([category, questions]) => ({
      category,
      icon: categoryIcons[category] ?? HelpCircle,
      questions: questions.map((q) => ({ question: q.question, answer: q.answer })),
    }));
  }, [faqs]);

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Loading FAQs...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTopOnMount />
      <div className="min-h-screen bg-gradient-to-b from-white to-[#4FA3D1]/5">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B2C4D] via-[#0B2C4D] to-[#4FA3D1]">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F47B20] rounded-full mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
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

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {faqCategories.length === 0 ? (
              <p className="text-center text-gray-600">No FAQs available yet.</p>
            ) : (
              <div className="space-y-12">
                {faqCategories.map((cat, categoryIndex) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-[#0B2C4D] to-[#4FA3D1] px-8 py-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F47B20] rounded-full flex items-center justify-center flex-shrink-0">
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{cat.category}</h2>
                    </div>
                    <div className="p-8">
                      <Accordion type="single" collapsible className="w-full">
                        {cat.questions.map((item, index) => (
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
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-gradient-to-br from-[#F47B20] to-[#d66a1a] rounded-2xl p-12 text-center shadow-xl"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Our team of expert consultants is here to help you with any questions or concerns
                you may have about studying abroad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-[#F47B20] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contact Us
                </a>
                <a
                  href="https://wa.me/254741001286"
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
