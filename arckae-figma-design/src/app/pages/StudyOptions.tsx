import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, MapPin, GraduationCap, DollarSign, Award, BookOpen, Filter, X, ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

// Mock data representing scraped university information
const universities = [
  {
    id: 1,
    name: "University of Melbourne",
    location: { country: "Australia", state: "Victoria", city: "Melbourne" },
    ranking: "Global Top 50",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    courses: [
      {
        id: 101,
        name: "Master of Information Technology",
        level: "Postgraduate",
        duration: "2 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 48000, currency: "AUD", perYear: true },
        studyArea: "Information Technology",
        description: "Develop advanced technical skills in software development, artificial intelligence, distributed computing, and cybersecurity. This program is designed for IT professionals and graduates seeking to deepen their expertise.",
        admissionRequirements: [
          "Bachelor's degree with minimum 65% average",
          "IELTS 6.5 (no band less than 6.0) or equivalent",
          "Statement of purpose",
          "Two academic references",
          "Updated CV/Resume"
        ],
        scholarships: [
          { name: "Melbourne Graduate Scholarship", amount: "Up to 50% tuition fee waiver" },
          { name: "International Postgraduate Coursework Award", amount: "$10,000" }
        ],
        careerOutcomes: ["Software Engineer", "Data Scientist", "IT Consultant", "Systems Architect"],
        website: "https://study.unimelb.edu.au"
      },
      {
        id: 102,
        name: "Bachelor of Commerce",
        level: "Undergraduate",
        duration: "3 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 44000, currency: "AUD", perYear: true },
        studyArea: "Business & Management",
        description: "A comprehensive business program covering accounting, finance, marketing, and management. Choose from diverse specializations to tailor your degree to your career goals.",
        admissionRequirements: [
          "High school certificate with minimum 70% average",
          "IELTS 6.5 (no band less than 6.0) or equivalent",
          "Mathematics prerequisite",
          "Personal statement"
        ],
        scholarships: [
          { name: "Undergraduate International Scholarship", amount: "Up to $10,000 per year" }
        ],
        careerOutcomes: ["Financial Analyst", "Marketing Manager", "Business Consultant", "Accountant"],
        website: "https://study.unimelb.edu.au"
      },
      {
        id: 103,
        name: "Master of Public Health",
        level: "Postgraduate",
        duration: "2 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 42000, currency: "AUD", perYear: true },
        studyArea: "Health Sciences",
        description: "Gain expertise in epidemiology, health promotion, biostatistics, and health policy. Prepare for leadership roles in public health organizations and government agencies.",
        admissionRequirements: [
          "Bachelor's degree in health or related field with 60% average",
          "IELTS 7.0 (no band less than 6.5)",
          "Personal statement",
          "Two references",
          "Relevant work experience (preferred)"
        ],
        scholarships: [
          { name: "Public Health Excellence Scholarship", amount: "$15,000" }
        ],
        careerOutcomes: ["Public Health Officer", "Epidemiologist", "Health Policy Advisor", "Program Manager"],
        website: "https://study.unimelb.edu.au"
      }
    ]
  },
  {
    id: 2,
    name: "University of Sydney",
    location: { country: "Australia", state: "New South Wales", city: "Sydney" },
    ranking: "Global Top 50",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    courses: [
      {
        id: 201,
        name: "Master of Engineering (Civil)",
        level: "Postgraduate",
        duration: "1.5 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 50000, currency: "AUD", perYear: true },
        studyArea: "Engineering",
        description: "Specialize in structural, geotechnical, or water engineering. Develop practical skills through industry projects and prepare for professional engineering registration.",
        admissionRequirements: [
          "Bachelor of Engineering with minimum 65%",
          "IELTS 6.5 (no band less than 6.0)",
          "Academic transcripts",
          "Statement of purpose",
          "Professional experience (if applicable)"
        ],
        scholarships: [
          { name: "Engineering Excellence Scholarship", amount: "$20,000" },
          { name: "Vice-Chancellor's International Scholarship", amount: "Up to 50% tuition" }
        ],
        careerOutcomes: ["Civil Engineer", "Structural Engineer", "Project Manager", "Infrastructure Consultant"],
        website: "https://sydney.edu.au/study"
      },
      {
        id: 202,
        name: "Bachelor of Arts",
        level: "Undergraduate",
        duration: "3 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 38000, currency: "AUD", perYear: true },
        studyArea: "Arts & Humanities",
        description: "Explore diverse subjects from psychology to philosophy, languages to sociology. Build critical thinking and communication skills valued across industries.",
        admissionRequirements: [
          "High school certificate with minimum 65%",
          "IELTS 6.5 (no band less than 6.0)",
          "Personal statement"
        ],
        scholarships: [
          { name: "Arts International Scholarship", amount: "$5,000 per year" }
        ],
        careerOutcomes: ["Policy Advisor", "Communications Specialist", "Researcher", "Social Worker"],
        website: "https://sydney.edu.au/study"
      },
      {
        id: 203,
        name: "Master of Data Science",
        level: "Postgraduate",
        duration: "2 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 52000, currency: "AUD", perYear: true },
        studyArea: "Information Technology",
        description: "Master machine learning, big data analytics, and statistical modeling. Work on real-world projects with industry partners and build a strong portfolio.",
        admissionRequirements: [
          "Bachelor's degree with minimum 65%",
          "Mathematics/Statistics background",
          "IELTS 6.5 (no band less than 6.0)",
          "Resume and statement of purpose"
        ],
        scholarships: [
          { name: "Data Science Scholarship", amount: "$15,000" }
        ],
        careerOutcomes: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst", "AI Specialist"],
        website: "https://sydney.edu.au/study"
      }
    ]
  },
  {
    id: 3,
    name: "Monash University",
    location: { country: "Australia", state: "Victoria", city: "Melbourne" },
    ranking: "Global Top 60",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    courses: [
      {
        id: 301,
        name: "Bachelor of Nursing",
        level: "Undergraduate",
        duration: "3 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 36000, currency: "AUD", perYear: true },
        studyArea: "Health Sciences",
        description: "Become a registered nurse with extensive clinical placements in leading healthcare facilities. Learn patient care, health assessment, and evidence-based practice.",
        admissionRequirements: [
          "High school certificate with minimum 70%",
          "IELTS 7.0 (no band less than 7.0)",
          "Biology prerequisite",
          "National police check",
          "Working with Children Check"
        ],
        scholarships: [
          { name: "Nursing Excellence Scholarship", amount: "$8,000 per year" }
        ],
        careerOutcomes: ["Registered Nurse", "Clinical Nurse", "Community Health Nurse", "Nurse Educator"],
        website: "https://monash.edu/study"
      },
      {
        id: 302,
        name: "Master of Business Administration (MBA)",
        level: "Postgraduate",
        duration: "1 year",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 62000, currency: "AUD", perYear: false },
        studyArea: "Business & Management",
        description: "An intensive MBA program for experienced professionals. Develop strategic leadership skills, global business perspective, and executive decision-making capabilities.",
        admissionRequirements: [
          "Bachelor's degree with minimum 60%",
          "Minimum 3 years professional experience",
          "GMAT/GRE (recommended)",
          "IELTS 7.0 (no band less than 6.5)",
          "Resume and two references",
          "Personal interview"
        ],
        scholarships: [
          { name: "MBA Excellence Scholarship", amount: "$25,000" },
          { name: "Women in Leadership Scholarship", amount: "$15,000" }
        ],
        careerOutcomes: ["CEO/Managing Director", "Strategy Consultant", "Business Development Manager", "Entrepreneur"],
        website: "https://monash.edu/study"
      },
      {
        id: 303,
        name: "Bachelor of Education",
        level: "Undergraduate",
        duration: "4 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 32000, currency: "AUD", perYear: true },
        studyArea: "Education",
        description: "Become a qualified primary or secondary teacher with extensive teaching practicums. Learn innovative teaching methods and classroom management strategies.",
        admissionRequirements: [
          "High school certificate with minimum 65%",
          "IELTS 7.5 (Reading & Writing 7.0, Listening & Speaking 8.0)",
          "CASPer test",
          "Working with Children Check"
        ],
        scholarships: [
          { name: "Future Teachers Scholarship", amount: "$5,000 per year" }
        ],
        careerOutcomes: ["Primary Teacher", "Secondary Teacher", "Education Coordinator", "Curriculum Developer"],
        website: "https://monash.edu/study"
      }
    ]
  },
  {
    id: 4,
    name: "Australian National University",
    location: { country: "Australia", state: "Australian Capital Territory", city: "Canberra" },
    ranking: "Global Top 40",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    courses: [
      {
        id: 401,
        name: "Master of International Relations",
        level: "Postgraduate",
        duration: "2 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 45000, currency: "AUD", perYear: true },
        studyArea: "Social Sciences",
        description: "Study diplomacy, international security, and global governance in Australia's political capital. Benefit from proximity to government agencies and international organizations.",
        admissionRequirements: [
          "Bachelor's degree with minimum 65%",
          "IELTS 6.5 (no band less than 6.0)",
          "Statement of purpose",
          "Two academic references",
          "Writing sample"
        ],
        scholarships: [
          { name: "ANU Chancellor's Scholarship", amount: "Up to $25,000 per year" },
          { name: "International Relations Scholarship", amount: "$10,000" }
        ],
        careerOutcomes: ["Diplomat", "Policy Analyst", "International Development Officer", "Political Risk Consultant"],
        website: "https://anu.edu.au/study"
      },
      {
        id: 402,
        name: "Bachelor of Science (Computer Science)",
        level: "Undergraduate",
        duration: "3 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 46000, currency: "AUD", perYear: true },
        studyArea: "Information Technology",
        description: "Learn algorithms, programming, systems design, and artificial intelligence. Participate in research projects and industry internships.",
        admissionRequirements: [
          "High school certificate with minimum 75%",
          "Mathematics prerequisite (Advanced level)",
          "IELTS 6.5 (no band less than 6.0)",
          "Personal statement"
        ],
        scholarships: [
          { name: "Computer Science Excellence Award", amount: "$12,000 per year" }
        ],
        careerOutcomes: ["Software Developer", "Systems Analyst", "Research Scientist", "Technology Consultant"],
        website: "https://anu.edu.au/study"
      }
    ]
  },
  {
    id: 5,
    name: "University of Queensland",
    location: { country: "Australia", state: "Queensland", city: "Brisbane" },
    ranking: "Global Top 50",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    courses: [
      {
        id: 501,
        name: "Bachelor of Veterinary Science",
        level: "Undergraduate",
        duration: "5 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 68000, currency: "AUD", perYear: true },
        studyArea: "Veterinary Science",
        description: "Become a qualified veterinarian through comprehensive training in animal health, surgery, and practice management. Includes extensive clinical placements.",
        admissionRequirements: [
          "High school certificate with minimum 85%",
          "Chemistry and Biology prerequisites",
          "IELTS 7.0 (no band less than 7.0)",
          "Veterinary experience (highly recommended)",
          "Supplementary application form"
        ],
        scholarships: [
          { name: "Veterinary Science Scholarship", amount: "$10,000 per year" }
        ],
        careerOutcomes: ["Veterinarian", "Animal Health Officer", "Wildlife Veterinarian", "Veterinary Researcher"],
        website: "https://uq.edu.au/study"
      },
      {
        id: 502,
        name: "Master of Environmental Management",
        level: "Postgraduate",
        duration: "1.5 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 44000, currency: "AUD", perYear: true },
        studyArea: "Environmental Science",
        description: "Address environmental challenges through sustainable resource management, conservation biology, and environmental policy. Field trips to diverse ecosystems included.",
        admissionRequirements: [
          "Bachelor's degree with minimum 60%",
          "IELTS 6.5 (no band less than 6.0)",
          "Statement of purpose",
          "Two references"
        ],
        scholarships: [
          { name: "Sustainability Scholarship", amount: "$8,000" }
        ],
        careerOutcomes: ["Environmental Consultant", "Conservation Officer", "Sustainability Manager", "Environmental Policy Advisor"],
        website: "https://uq.edu.au/study"
      },
      {
        id: 503,
        name: "Bachelor of Laws (LLB)",
        level: "Undergraduate",
        duration: "4 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 42000, currency: "AUD", perYear: true },
        studyArea: "Law",
        description: "Study Australian and international law with opportunities for practical legal training. Prepare for admission to legal practice or diverse career paths.",
        admissionRequirements: [
          "High school certificate with minimum 80%",
          "IELTS 7.0 (Writing 7.0, other bands 6.5)",
          "Personal statement",
          "Strong analytical skills"
        ],
        scholarships: [
          { name: "Law Faculty Scholarship", amount: "$15,000 per year" }
        ],
        careerOutcomes: ["Lawyer/Solicitor", "Barrister", "Corporate Counsel", "Legal Advisor"],
        website: "https://uq.edu.au/study"
      }
    ]
  },
  {
    id: 6,
    name: "RMIT University",
    location: { country: "Australia", state: "Victoria", city: "Melbourne" },
    ranking: "Top 250 Global",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    courses: [
      {
        id: 601,
        name: "Bachelor of Design (Architecture)",
        level: "Undergraduate",
        duration: "3 years",
        mode: "Full-time",
        intakeMonths: ["February"],
        tuitionFee: { amount: 38000, currency: "AUD", perYear: true },
        studyArea: "Architecture & Design",
        description: "Develop design thinking and technical skills in architecture. Work on real projects and studio-based learning with industry professionals.",
        admissionRequirements: [
          "High school certificate with minimum 70%",
          "IELTS 6.5 (no band less than 6.0)",
          "Portfolio submission",
          "Design aptitude test"
        ],
        scholarships: [
          { name: "Design Excellence Scholarship", amount: "$10,000" }
        ],
        careerOutcomes: ["Architectural Designer", "Urban Designer", "Interior Architect", "Design Consultant"],
        website: "https://rmit.edu.au/study"
      },
      {
        id: 602,
        name: "Master of Cybersecurity",
        level: "Postgraduate",
        duration: "2 years",
        mode: "Full-time",
        intakeMonths: ["February", "July"],
        tuitionFee: { amount: 40000, currency: "AUD", perYear: true },
        studyArea: "Information Technology",
        description: "Specialize in network security, ethical hacking, digital forensics, and security management. Industry-connected program with practical labs.",
        admissionRequirements: [
          "Bachelor's degree in IT or related field with 60%",
          "IELTS 6.5 (no band less than 6.0)",
          "Resume",
          "Statement of purpose"
        ],
        scholarships: [
          { name: "Cybersecurity Scholarship", amount: "$12,000" }
        ],
        careerOutcomes: ["Cybersecurity Analyst", "Security Consultant", "Penetration Tester", "Security Architect"],
        website: "https://rmit.edu.au/study"
      }
    ]
  }
];

const studyAreas = [
  "All Areas",
  "Information Technology",
  "Business & Management",
  "Health Sciences",
  "Engineering",
  "Arts & Humanities",
  "Social Sciences",
  "Environmental Science",
  "Law",
  "Education",
  "Architecture & Design",
  "Veterinary Science"
];

const courseLevels = ["All Levels", "Undergraduate", "Postgraduate"];
const studyModes = ["All Modes", "Full-time", "Part-time", "Online"];
const countries = ["All Countries", "Australia"];
const states = [
  "All States",
  "Victoria",
  "New South Wales",
  "Queensland",
  "Australian Capital Territory"
];

export default function StudyOptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [showScholarshipsOnly, setShowScholarshipsOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const itemsPerPage = 6;

  // Filter courses based on all criteria
  const filteredCourses = useMemo(() => {
    let allCourses: any[] = [];
    
    universities.forEach(uni => {
      uni.courses.forEach(course => {
        allCourses.push({
          ...course,
          university: uni.name,
          location: uni.location,
          ranking: uni.ranking,
          universityImage: uni.image
        });
      });
    });

    return allCourses.filter(course => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          course.name.toLowerCase().includes(query) ||
          course.university.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.studyArea.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filters
      if (selectedCountry !== "All Countries" && course.location.country !== selectedCountry) return false;
      if (selectedState !== "All States" && course.location.state !== selectedState) return false;

      // Course level
      if (selectedLevel !== "All Levels" && course.level !== selectedLevel) return false;

      // Study mode
      if (selectedMode !== "All Modes" && course.mode !== selectedMode) return false;

      // Study area
      if (selectedArea !== "All Areas" && course.studyArea !== selectedArea) return false;

      // Fee range
      if (minFee && course.tuitionFee.amount < parseInt(minFee)) return false;
      if (maxFee && course.tuitionFee.amount > parseInt(maxFee)) return false;

      // Scholarships only
      if (showScholarshipsOnly && course.scholarships.length === 0) return false;

      return true;
    });
  }, [searchQuery, selectedCountry, selectedState, selectedLevel, selectedMode, selectedArea, minFee, maxFee, showScholarshipsOnly]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountry, selectedState, selectedLevel, selectedMode, selectedArea, minFee, maxFee, showScholarshipsOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("All Countries");
    setSelectedState("All States");
    setSelectedLevel("All Levels");
    setSelectedMode("All Modes");
    setSelectedArea("All Areas");
    setMinFee("");
    setMaxFee("");
    setShowScholarshipsOnly(false);
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCountry !== "All Countries",
    selectedState !== "All States",
    selectedLevel !== "All Levels",
    selectedMode !== "All Modes",
    selectedArea !== "All Areas",
    minFee,
    maxFee,
    showScholarshipsOnly
  ].filter(Boolean).length;

  return (
    <>
      <ScrollToTopOnMount />
      <div className="min-h-screen bg-gradient-to-b from-white to-[#4FA3D1]/5">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#0B2C4D] via-[#0B2C4D] to-[#4FA3D1]">
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
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Explore Study Options
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Find your perfect course from top Australian universities
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-white/90 text-sm">
                  <strong className="text-white">Note:</strong> Course information is sourced from university websites and updated regularly. 
                  Please verify specific details with the institution or contact us for personalized guidance.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-80 flex-shrink-0"
              >
                <div className="sticky top-24">
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#0B2C4D] to-[#4FA3D1] text-white rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Filter className="w-5 h-5" />
                          <CardTitle>Filters</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="text-white hover:bg-white/20 lg:hidden"
                        >
                          {showFilters ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                      </div>
                      {activeFiltersCount > 0 && (
                        <CardDescription className="text-white/80 mt-2">
                          {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className={`pt-6 space-y-6 ${showFilters ? '' : 'hidden lg:block'}`}>
                      {/* Search */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block">
                          Search
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Course or university..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Location
                        </label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={selectedState} onValueChange={setSelectedState} className="mt-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Course Level */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Course Level
                        </label>
                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {courseLevels.map(level => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Study Mode */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block">
                          Study Mode
                        </label>
                        <Select value={selectedMode} onValueChange={setSelectedMode}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {studyModes.map(mode => (
                              <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Study Area */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block">
                          Study Area
                        </label>
                        <Select value={selectedArea} onValueChange={setSelectedArea}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {studyAreas.map(area => (
                              <SelectItem key={area} value={area}>{area}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Fee Range */}
                      <div>
                        <label className="text-sm font-semibold text-[#0B2C4D] mb-2 block flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Annual Fee Range (AUD)
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minFee}
                            onChange={(e) => setMinFee(e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxFee}
                            onChange={(e) => setMaxFee(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Scholarships */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="scholarships"
                          checked={showScholarshipsOnly}
                          onChange={(e) => setShowScholarshipsOnly(e.target.checked)}
                          className="w-4 h-4 text-[#F47B20] border-gray-300 rounded focus:ring-[#F47B20]"
                        />
                        <label htmlFor="scholarships" className="text-sm font-medium text-[#0B2C4D] flex items-center cursor-pointer">
                          <Award className="w-4 h-4 mr-2" />
                          Scholarships Available
                        </label>
                      </div>

                      {/* Clear Filters */}
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          className="w-full border-[#F47B20] text-[#F47B20] hover:bg-[#F47B20] hover:text-white"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear All Filters
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Results */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Results Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0B2C4D]">
                        {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCourses.length)} of {filteredCourses.length}
                      </p>
                    </div>
                  </div>

                  {/* Course Cards */}
                  {paginatedCourses.length > 0 ? (
                    <div className="space-y-6">
                      {paginatedCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="md:flex">
                              {/* Image */}
                              <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                                <img
                                  src={course.universityImage}
                                  alt={course.university}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3">
                                  <Badge className="bg-[#F47B20] hover:bg-[#F47B20]">
                                    {course.ranking}
                                  </Badge>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <CardHeader>
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <CardTitle className="text-xl mb-2 text-[#0B2C4D] hover:text-[#F47B20] transition-colors">
                                        {course.name}
                                      </CardTitle>
                                      <CardDescription className="flex flex-wrap items-center gap-3 text-base">
                                        <span className="font-semibold text-[#0B2C4D]">{course.university}</span>
                                        <span className="flex items-center text-gray-600">
                                          <MapPin className="w-4 h-4 mr-1" />
                                          {course.location.city}, {course.location.state}
                                        </span>
                                      </CardDescription>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge variant="outline" className="border-[#4FA3D1] text-[#4FA3D1]">
                                      {course.level}
                                    </Badge>
                                    <Badge variant="outline" className="border-[#0B2C4D] text-[#0B2C4D]">
                                      {course.duration}
                                    </Badge>
                                    <Badge variant="outline" className="border-gray-400 text-gray-700">
                                      {course.mode}
                                    </Badge>
                                    <Badge variant="outline" className="border-[#F47B20] text-[#F47B20]">
                                      {course.studyArea}
                                    </Badge>
                                  </div>
                                </CardHeader>

                                <CardContent>
                                  <p className="text-gray-700 mb-4 line-clamp-2">
                                    {course.description}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="flex items-center text-[#0B2C4D]">
                                      <DollarSign className="w-5 h-5 mr-1 text-[#F47B20]" />
                                      <span className="font-semibold">
                                        {course.tuitionFee.currency} ${course.tuitionFee.amount.toLocaleString()}
                                        {course.tuitionFee.perYear ? '/year' : ' total'}
                                      </span>
                                    </div>
                                    {course.scholarships.length > 0 && (
                                      <div className="flex items-center text-[#F47B20]">
                                        <Award className="w-5 h-5 mr-1" />
                                        <span className="font-semibold">
                                          {course.scholarships.length} Scholarship{course.scholarships.length !== 1 ? 's' : ''}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                                      className="bg-[#0B2C4D] hover:bg-[#0B2C4D]/90"
                                    >
                                      {expandedCourse === course.id ? 'Show Less' : 'View Details'}
                                      {expandedCourse === course.id ? (
                                        <ChevronUp className="w-4 h-4 ml-2" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4 ml-2" />
                                      )}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-[#F47B20] text-[#F47B20] hover:bg-[#F47B20] hover:text-white"
                                      onClick={() => window.open(course.website, '_blank')}
                                    >
                                      Visit Website
                                      <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                  </div>

                                  {/* Expanded Details */}
                                  {expandedCourse === course.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-6 pt-6 border-t border-gray-200"
                                    >
                                      <div className="space-y-6">
                                        {/* Admission Requirements */}
                                        <div>
                                          <h4 className="font-semibold text-[#0B2C4D] mb-3 flex items-center">
                                            <FileText className="w-5 h-5 mr-2 text-[#F47B20]" />
                                            Admission Requirements
                                          </h4>
                                          <ul className="space-y-2">
                                            {course.admissionRequirements.map((req: string, idx: number) => (
                                              <li key={idx} className="flex items-start text-gray-700">
                                                <span className="w-1.5 h-1.5 bg-[#F47B20] rounded-full mt-2 mr-3 flex-shrink-0" />
                                                {req}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        {/* Scholarships */}
                                        {course.scholarships.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold text-[#0B2C4D] mb-3 flex items-center">
                                              <Award className="w-5 h-5 mr-2 text-[#F47B20]" />
                                              Available Scholarships
                                            </h4>
                                            <div className="space-y-3">
                                              {course.scholarships.map((scholarship: any, idx: number) => (
                                                <div key={idx} className="bg-[#4FA3D1]/10 rounded-lg p-3">
                                                  <div className="font-semibold text-[#0B2C4D]">{scholarship.name}</div>
                                                  <div className="text-[#F47B20] font-medium">{scholarship.amount}</div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Career Outcomes */}
                                        <div>
                                          <h4 className="font-semibold text-[#0B2C4D] mb-3 flex items-center">
                                            <GraduationCap className="w-5 h-5 mr-2 text-[#F47B20]" />
                                            Career Outcomes
                                          </h4>
                                          <div className="flex flex-wrap gap-2">
                                            {course.careerOutcomes.map((career: string, idx: number) => (
                                              <Badge key={idx} variant="secondary" className="bg-[#0B2C4D]/10 text-[#0B2C4D]">
                                                {career}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Intake Information */}
                                        <div>
                                          <h4 className="font-semibold text-[#0B2C4D] mb-3">Intake Months</h4>
                                          <div className="flex flex-wrap gap-2">
                                            {course.intakeMonths.map((month: string, idx: number) => (
                                              <Badge key={idx} className="bg-[#4FA3D1] hover:bg-[#4FA3D1]">
                                                {month}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="bg-gradient-to-r from-[#F47B20]/10 to-[#4FA3D1]/10 rounded-lg p-4">
                                          <p className="text-sm text-gray-700 mb-3">
                                            Interested in this program? Our expert consultants can help you with the application process.
                                          </p>
                                          <a
                                            href="/contact"
                                            className="inline-flex items-center justify-center bg-[#F47B20] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#d66a1a] transition-all duration-300 hover:scale-105"
                                          >
                                            Apply Now
                                          </a>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </CardContent>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center">
                      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-[#0B2C4D] mb-2">No courses found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                      <Button onClick={clearFilters} className="bg-[#F47B20] hover:bg-[#d66a1a]">
                        Clear Filters
                      </Button>
                    </Card>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-[#0B2C4D] text-[#0B2C4D]"
                      >
                        Previous
                      </Button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "bg-[#F47B20] hover:bg-[#d66a1a]" : "border-[#0B2C4D] text-[#0B2C4D]"}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="border-[#0B2C4D] text-[#0B2C4D]"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#0B2C4D] to-[#4FA3D1]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Help Choosing the Right Course?
              </h3>
              <p className="text-white/90 text-lg mb-8">
                Our expert consultants provide personalized guidance to help you select the perfect program based on your goals, qualifications, and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#F47B20] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#d66a1a] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Schedule Free Consultation
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center bg-white text-[#0B2C4D] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  View FAQs
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}