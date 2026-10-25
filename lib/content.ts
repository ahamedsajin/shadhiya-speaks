export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ielts-preparation", label: "IELTS Courses" },
  { href: "/spoken-english", label: "Spoken English" },
  { href: "/one-to-one-coaching", label: "1-to-1 Coaching" },
  { href: "/free-assessment", label: "Free Assessment" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/free-assessment", label: "Free Assessment" },
  { href: "/faq", label: "FAQ & Contact" },
];

export const SERVICE_LINKS = [
  { href: "/ielts-preparation", label: "Academic IELTS" },
  { href: "/ielts-preparation", label: "General IELTS" },
  { href: "/spoken-english", label: "Spoken English" },
  { href: "/one-to-one-coaching", label: "1-to-1 Coaching" },
  { href: "/ielts-preparation", label: "Computer-Based Practice" },
];

export const CREDENTIALS = [
  "TESOL UK Certified",
  "5+ Years UAE IELTS Exam Supervision",
  "8+ Years Academic Experience",
  "Band 8.0 Achievers",
  "Live 1-to-1 & Micro-Batch Classes",
  "Computer-Based Test Simulation",
  "Abu Dhabi University Supervision",
];

export type Testimonial = {
  name: string;
  course: string;
  challenge: string;
  outcome: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Fathima R.",
    course: "Academic IELTS",
    challenge: "Stuck at Band 6.0 in Writing",
    outcome: "Band 7.5 Overall",
    quote:
      "Shadhiya's essay corrections were surgical. She showed me exactly why my Task 2 was capped at 6.0 — three months later I walked out with a 7.5 overall.",
  },
  {
    name: "Ahmed K.",
    course: "General Training IELTS",
    challenge: "Needed CLB 9 for Canada PR",
    outcome: "L8.5 · R8.0 · W7.5 · S8.0",
    quote:
      "The computer-based simulation was identical to my real test day. Nothing surprised me. I hit every score my PR application needed on the first attempt.",
  },
  {
    name: "Sneha M.",
    course: "Spoken English",
    challenge: "Froze in office meetings",
    outcome: "Now leads client calls",
    quote:
      "I understood English perfectly but couldn't speak. The natural-thinking exercises stopped me translating in my head — I presented to our Dubai office last week.",
  },
  {
    name: "Jaseem P.",
    course: "1-to-1 Coaching",
    challenge: "Speaking stuck at 5.5",
    outcome: "Speaking 7.0 in 6 weeks",
    quote:
      "Every session attacked my exact weaknesses — fillers, pacing, topic development. The mock interviews felt harder than the real exam. Six weeks, 5.5 to 7.0.",
  },
  {
    name: "Mariam S.",
    course: "Academic IELTS",
    challenge: "6.5 overall, needed 7.5+ for university",
    outcome: "Band 8.0 Overall",
    quote:
      "Her reading strategies alone took me from 6.5 to 8.5. She supervised real IELTS exams in the UAE — she knows exactly what examiners look for.",
  },
  {
    name: "Deepak V.",
    course: "Spoken English",
    challenge: "Failed two job interviews",
    outcome: "Hired in Dubai",
    quote:
      "We rehearsed interview answers until they sounded natural, not memorised. I cleared my third interview and relocated to Dubai two months later.",
  },
];

export const FAQS = [
  {
    question: "Do you offer Academic and General IELTS preparation?",
    answer:
      "Yes, we provide structured preparation for both Academic and General Training modules — with separate strategies, materials, and mock tests for each track.",
  },
  {
    question: "Are classes conducted online or in person?",
    answer:
      "Currently, all classes are conducted live online, so you can join from anywhere. In-person classes in Al Ain are planned for the future.",
  },
  {
    question: "Do you offer individual 1-to-1 classes?",
    answer:
      "Yes, personalized 1-to-1 coaching is available for both IELTS and Spoken English — built entirely around your schedule, level, and target score.",
  },
  {
    question: "Do you provide Writing corrections and Speaking feedback?",
    answer:
      "Yes. Every student receives personalized evaluations: detailed written essay feedback with band descriptors, plus live speaking practice with real-time correction.",
  },
  {
    question: "Is computer-based IELTS practice included?",
    answer:
      "Yes. We include familiarization and timed practice tailored to the computer-based test layout — on-screen reading, digital listening navigation, and typing practice for Writing.",
  },
  {
    question: "How do I choose the right course?",
    answer:
      "Simply book a free assessment on our website. We will evaluate your current level, identify your gaps, and recommend the study path that reaches your goal fastest.",
  },
];
