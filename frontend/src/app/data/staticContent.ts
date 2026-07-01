export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  icon_url: string | null;
  short_description: string;
  long_description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const STATIC_SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    name: "End-to-End Study Abroad Support",
    category: "main",
    icon_url: "/icons/support.svg",
    short_description: "Complete guidance from application to post-arrival.",
    long_description:
      "We guide students through school selection, application, visa, pre-departure and post-arrival orientation.",
  },
  {
    id: "service-2",
    name: "IELTS Training",
    category: "main",
    icon_url: "/icons/ielts.svg",
    short_description: "Prepare for IELTS exams with expert guidance.",
    long_description:
      "Tailored IELTS coaching to help students achieve required scores for admission.",
  },
  {
    id: "service-3",
    name: "Career Guidance",
    category: "main",
    icon_url: "/icons/career.svg",
    short_description: "Expert advice on career paths and study choices.",
    long_description:
      "Personalized career counseling to help students choose the right courses and universities.",
  },
  {
    id: "service-4",
    name: "School Applications",
    category: "main",
    icon_url: "/icons/applications.svg",
    short_description: "Assistance with university and college applications.",
    long_description:
      "Complete application support including document preparation and submission.",
  },
  {
    id: "service-5",
    name: "Visa Application Support",
    category: "main",
    icon_url: "/icons/visa.svg",
    short_description: "Comprehensive visa application assistance.",
    long_description:
      "Expert guidance through the entire visa process for study abroad.",
  },
  {
    id: "service-6",
    name: "Pre/Post Departure Orientation",
    category: "main",
    icon_url: "/icons/orientation.svg",
    short_description: "Preparation and support before and after travel.",
    long_description:
      "Cultural orientation, travel arrangements, and ongoing support after arrival.",
  },
];

export const STATIC_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is the initial consultation free?",
    answer:
      "Yes, ARCKAE provides a free consultation to evaluate student goals and recommend study options.",
    category: "Getting Started",
  },
  {
    id: "faq-2",
    question: "Can you help with visa applications?",
    answer:
      "Yes, we guide students on all required documentation and application procedures to maximize approval chances.",
    category: "Visa & Travel",
  },
  {
    id: "faq-3",
    question: "What services do you offer?",
    answer:
      "We provide end-to-end study abroad support including university selection, application assistance, IELTS training, visa support, accommodation booking, and post-arrival services.",
    category: "Getting Started",
  },
  {
    id: "faq-4",
    question: "How long does the application process take?",
    answer:
      "The process typically takes 3-6 months depending on the university and program. We recommend starting at least 6 months before your intended study start date.",
    category: "Admissions",
  },
  {
    id: "faq-5",
    question: "Do you help with IELTS preparation?",
    answer:
      "Yes, we offer comprehensive IELTS training programs designed to help students achieve the required scores for their chosen universities.",
    category: "IELTS",
  },
  {
    id: "faq-6",
    question: "What are the costs involved?",
    answer:
      "Costs vary depending on the services required. We offer flexible payment plans and can provide detailed quotes during consultation.",
    category: "Getting Started",
  },
  {
    id: "faq-7",
    question: "Can I work while studying abroad?",
    answer:
      "Yes, international students can work part-time during their studies, typically up to 20 hours per week, and full-time during breaks.",
    category: "After Arrival",
  },
  {
    id: "faq-8",
    question: "Do you provide accommodation assistance?",
    answer:
      "Yes, we help students find suitable accommodation including university dormitories, homestays, and private rentals.",
    category: "After Arrival",
  },
];
