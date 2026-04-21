import { Building2, Palette, Armchair, KeyRound } from "lucide-react";

export const heroImages = [
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/1.png",
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/4.png",
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/5.png",
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/3.jpeg",
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/7.png",
  "https://media.cmtradingco.com/rippotai_projects/rippotai_images/8.png",
];
/************************************
 * VALUES SLIDER
 ************************************/
export const values = [
  {
    title: "Precision",
    text: "Every detail is deliberate. From material selection to spatial proportions, we approach design with an architect's exactness.",
  },
  {
    title: "Integrity",
    text: "Transparency and honesty define our process. We build trust through clear communication and unwavering commitment to quality.",
  },
  {
    title: "Innovation",
    text: "We blend timeless design principles with forward-thinking techniques, ensuring our work stays relevant and inspiring.",
  },
  {
    title: "Collaboration",
    text: "Great spaces emerge from great partnerships. We listen, understand, and co-create with our clients every step of the way.",
  },
];
export const processImage = "/assets/process.png";
export const contactImage = "/assets/contact_banner.png";
export const aboutImage = "/assets/team.jpg";
export const careerImage = "/assets/careers_banner.png";
export const projectsImage = "/assets/projects_banner_main.jpg";
export const servicesImage = "/assets/services.png";
export const teamImage = "/assets/team.jpg";

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Achievements", href: "/achievements" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/rippotai/" },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/rippotaiarchitecture",
  },
  { label: "Facebook", href: "https://www.facebook.com/rippotaiarchitecture/" },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/rippotaiarchitecture/",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@rippotai",
  },
];

export const contactInfo = {
  address:
    "487/64, National Market, Peeragarhi, Paschim Vihar, New Delhi, Delhi 110087",
  email: "sagar@rippotai.in",
  phone: "+91 99110 80605",
};
export const googleMapsLink =
  "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIVCAEQLhhDGMcBGLEDGNEDGIAEGIoFMgYIAhBFGEAyBggDEEUYOTIGCAQQRRg7MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEHNzYwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KbHnzh2cBQ05MZlLNlNYBa34&daddr=487/64,+National+Market,+peeragarhi,+Paschim+Vihar,+New+Delhi,+Delhi,+110087";

export const processSteps = [
  {
    id: 1,
    title: "BRIEFING",
    description:
      "Understanding context, constraints, and client vision to define architectural direction.",
    icon: "/assets/process_briefing.png",
  },
  {
    id: 2,
    title: "DESIGN",
    description:
      "Translating vision into spatial concepts through rigorous design exploration and iteration.",
    icon: "/assets/process_design.png",
  },
  {
    id: 3,
    title: "EXECUTION",
    description:
      "Precise realization of design intent through meticulous material selection and construction oversight.",
    icon: "/assets/process_execution.png",
  },
  {
    id: 4,
    title: "HANDOVER",
    description:
      "Final delivery ensuring every detail meets the uncompromising standard of our practice.",
    icon: "/assets/process_handover.png",
  },
];

export const services = [
  {
    slug: "architecture",
    icon: Building2,
    title: "Architecture",
    description:
      "We create visually striking, functional spaces inspired by the simplicity and versatility of the cube.",

    banner: "/assets/process.png",

    intro: `
      Our architectural approach blends creativity with precision. We design
      spaces that are not only visually compelling but also deeply functional,
      sustainable, and future-ready.
    `,

    features: [
      "Concept design & spatial planning",
      "3D visualization & walkthroughs",
      "Sustainable & climate-responsive design",
      "Residential & commercial architecture",
    ],

    process: [
      "Understanding client vision & requirements",
      "Concept sketches & ideation",
      "Design development & approvals",
      "Execution support & site coordination",
    ],

    deliverables: [
      "Architectural drawings",
      "3D renders",
      "Material specifications",
      "Execution-ready plans",
    ],

    gallery: ["/assets/process.png", "/assets/process.png"],

    cta: "Start Your Architecture Project",
  },
  {
    slug: "turnkey-projects",
    icon: KeyRound,
    title: "Turnkey Projects",
    description: "End-to-end project delivery.",

    banner: "/assets/process.png",

    intro: `
      We provide complete turnkey solutions, managing everything from concept
      to completion. You get a fully finished, ready-to-use space without the stress.
    `,

    features: [
      "End-to-end project management",
      "Design + execution under one roof",
      "Vendor & material coordination",
      "Timeline & budget control",
    ],

    process: [
      "Consultation & planning",
      "Design & approvals",
      "Execution & supervision",
      "Final handover",
    ],

    deliverables: [
      "Fully completed space",
      "Quality assurance",
      "Project documentation",
    ],

    gallery: ["/assets/process.png", "/assets/process.png"],

    cta: "Start Turnkey Project",
  },
  {
    slug: "interiors",
    icon: Palette,
    title: "Interiors",
    description: "Our interior designs blend style and practicality.",

    banner: "/assets/process.png",

    intro: `
      We design interiors that reflect your personality while maximizing
      comfort and usability. Every detail is carefully curated to create
      a cohesive and elegant space.
    `,

    features: [
      "Space planning & layout optimization",
      "Color, material & lighting design",
      "Custom furniture integration",
      "Residential & commercial interiors",
    ],

    process: [
      "Mood board & concept creation",
      "Layout planning",
      "Material selection",
      "Execution & styling",
    ],

    deliverables: [
      "Interior layouts",
      "3D renders",
      "Furniture & decor plan",
      "Execution drawings",
    ],

    gallery: ["/assets/process.png", "/assets/process.png"],

    cta: "Design Your Interior Space",
  },

  {
    slug: "furniture",
    icon: Armchair,
    title: "Furniture",
    description: "Our niche furniture pieces are uniquely designed.",

    banner: "/assets/process.png",

    intro: `
      Our furniture pieces are crafted with precision and creativity,
      designed to complement your space while standing out as statement pieces.
    `,

    features: [
      "Custom furniture design",
      "Premium materials & finishes",
      "Ergonomic & functional design",
      "Unique statement pieces",
    ],

    process: [
      "Requirement discussion",
      "Concept sketches",
      "Material selection",
      "Fabrication & delivery",
    ],

    deliverables: [
      "Custom furniture pieces",
      "Material samples",
      "Design drawings",
    ],

    gallery: ["/assets/process.png", "/assets/process.png"],

    cta: "Create Custom Furniture",
  },
];
export const teamMembers = [
  {
    id: 1,
    name: "Sagar Chhabra",
    designation: "Founder & Principal Architect",
    image: "/assets/sagar_chhabra.png",
  },
  {
    id: 2,
    name: "Jayant",
    designation: "Architect",
    image: "/assets/Jayant.jpg",
  },
  {
    id: 3,
    name: "Sarthi",
    designation: "Architect",
    image: "/assets/saarthi.jpeg",
  },
  {
    id: 4,
    name: "Priyanka",
    designation: "Admin",
    image:
      "https://media.cmtradingco.com/rippotai_projects/rippotai_images/priyanka.jpeg",
  },
  {
    id: 5,
    name: "Megha Chhabra",
    designation: "Interior Decor and Styling Head",
    image: "/assets/megha.PNG",
  },
  {
    id: 6,
    name: "Bhav Lamba",
    designation: "Content Strategy & Creative Lead",
    image: "/assets/Bhav.jpg",
  },
  {
    id: 7,
    name: "Sajjan",
    designation: "Site Supervisor",
    image:
      "https://media.cmtradingco.com/rippotai_projects/rippotai_images/sajjan.jpeg",
  },
  {
    id: 8,
    name: "Chhavi",
    designation: "Collaborator",
    image: "/assets/CM.png",
    tag: "Collaborator",
  },

  {
    id: 9,
    name: "Aniket",
    designation: "Architect",
    image: "/assets/aniket.png",
    tag: "Alumni",
  },
  {
    id: 10,
    name: "Shivam",
    designation: "Architect",
    image: "/assets/shivam.png",
    tag: "Alumni",
  },
  {
    id: 11,
    name: "Shivani",
    designation: "Project Manager",
    image: "/assets/shivani.png",
    tag: "Alumni",
  },
];
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.rippotaiarchitecture.com/api"
    : "http://localhost:5000/api";

export const STATUS_LABELS = {
  all: "All Projects",
  draft: "Drafts",
  working: "In Progress",
  completed: "Completed",
  prunned: "Pruned / Archived",
};
