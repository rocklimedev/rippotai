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
    title: "CONSULTATION",
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

    banner: "/assets/services_architecture.jpeg",

    intro: `
      Our architectural approach blends creativity with precision. We design
      spaces that are not only visually compelling but also deeply functional,
      sustainable, and future-ready.
    `,

    offerings: [
      {
        title: "Architectural Consultation",
        description:
          "Thoughtfully planned layouts that optimize space, movement, and usability from the ground up.",
      },
      {
        title: "Concept Design",
        description:
          "Strong design directions that define the form, feel, and identity of the project before moving into detail.",
      },
      {
        title: "3D Visualization",
        description:
          "Clear visual representation of spaces to understand scale, materials, and overall experience before execution.",
      },
      {
        title: "Working Drawings",
        description:
          "Detailed Good For Construction drawings ensuring seamless coordination on site and eliminating ambiguity.",
      },
      {
        title: "Material & Design Strategy",
        description:
          "Carefully curated material palettes aligned with the overall architectural intent.",
      },
      {
        title: "Renovation & Transformation",
        description:
          "Reimagining existing spaces with a refined approach, improving both function and aesthetics.",
      },
      {
        title: "Execution Support",
        description:
          "Continuous involvement during the build phase to maintain design integrity and ensure accurate implementation.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Requirement Understanding",
        description:
          "We begin by understanding your vision, site conditions, and functional needs to establish a clear direction.",
      },
      {
        step: "02",
        title: "Concept Development",
        description:
          "Initial design ideas are translated into spatial concepts, defining layout, form, and experience.",
      },
      {
        step: "03",
        title: "Design Refinement",
        description:
          "Concepts are developed into detailed plans with material considerations, proportions, and technical alignment.",
      },
      {
        step: "04",
        title: "Visualization & Approval",
        description:
          "3D views and design presentations help you fully visualize the space before moving forward.",
      },
      {
        step: "05",
        title: "Working Drawings",
        description:
          "We prepare precise, execution-ready drawings to guide contractors and ensure smooth on-site work.",
      },
      {
        step: "06",
        title: "Site Coordination",
        description:
          "We stay connected during execution, assisting with decisions and ensuring the design is implemented as intended.",
      },
    ],

    cta: "Start Your Architecture Project",
  },
  {
    slug: "turnkey-projects",
    icon: KeyRound,
    title: "Turnkey Projects",
    description: "End-to-end project delivery.",

    banner: "/assets/services_turnkey.jpeg",

    intro: `
      We provide complete turnkey solutions, managing everything from concept
      to completion. You get a fully finished, ready-to-use space without the stress.
    `,

    offerings: [
      {
        title: "End-to-End Project Execution",
        description:
          "A single point of responsibility managing design, coordination, and on-site execution from start to finish.",
      },
      {
        title: "Civil & Structural Work",
        description:
          "Execution of core construction with a focus on strength, accuracy, and long-term durability.",
      },
      {
        title: "Interior Fit-Outs",
        description:
          "Complete interior development including furniture, finishes, and detailing — delivered as a cohesive whole.",
      },
      {
        title: "MEP Services (Mechanical, Electrical, Plumbing)",
        description:
          "Integrated planning and execution of all technical systems to ensure efficiency and reliability.",
      },
      {
        title: "Material Procurement & Management",
        description:
          "Sourcing and managing quality materials with control over timelines, costs, and consistency.",
      },
      {
        title: "Vendor & Site Coordination",
        description:
          "Handling multiple vendors, timelines, and workflows to maintain smooth and organized execution.",
      },
      {
        title: "Quality Control & Supervision",
        description:
          "Continuous on-site monitoring to ensure every detail is built as designed.",
      },
    ],

    process: [
      {
        step: "01",
        title: "Project Understanding & Scope Definition",
        description:
          "We define the project scope, timelines, and execution strategy based on design intent and site conditions.",
      },
      {
        step: "02",
        title: "Budgeting & Planning",
        description:
          "Detailed cost planning and resource allocation to align expectations with execution realities.",
      },
      {
        step: "03",
        title: "Design Finalization & Detailing",
        description:
          "All drawings, materials, and specifications are locked before execution begins to avoid on-site changes.",
      },
      {
        step: "04",
        title: "Execution & Site Management",
        description:
          "End-to-end execution with dedicated supervision, ensuring work progresses as per plan.",
      },
      {
        step: "05",
        title: "Quality Checks & Coordination",
        description:
          "Regular inspections and coordination across teams to maintain consistency and workmanship standards.",
      },
      {
        step: "06",
        title: "Handover & Completion",
        description:
          "Final finishing, detailing, and project delivery — ready for immediate use.",
      },
    ],

    cta: "Start Turnkey Project",
  },
  {
    slug: "interiors",
    icon: Palette,
    title: "Interiors",
    description: "Our interior designs blend style and practicality.",

    banner: "/assets/services_interior.png",

    intro: `
      We design interiors that reflect your personality while maximizing
      comfort and usability. Every detail is carefully curated to create
      a cohesive and elegant space.
    `,

    offerings: [
      {
        title: "Space Planning",
        description:
          "Efficient layouts that optimize movement, usability, and spatial balance.",
      },
      {
        title: "Concept Design",
        description:
          "Defining the overall look, mood, and identity of the space with a clear design direction.",
      },
      {
        title: "3D Visualization",
        description:
          "Realistic previews that help you understand the space, materials, and atmosphere before execution.",
      },
      {
        title: "Material & Finish Selection",
        description:
          "Curated materials, textures, and finishes that align with the design intent and elevate the space.",
      },
      {
        title: "Furniture & Detailing Design",
        description:
          "Custom-designed elements that integrate seamlessly into the overall composition.",
      },
      {
        title: "Lighting Design",
        description:
          "Layered lighting strategies that enhance mood, functionality, and spatial depth.",
      },
      {
        title: "Working Drawings",
        description:
          "Detailed execution drawings ensuring clarity on-site and precise implementation.",
      },
    ],

    process: [
      {
        step: "01",
        title: "Understanding Requirements",
        description:
          "We study your lifestyle, functional needs, and spatial requirements to build a clear foundation.",
      },
      {
        step: "02",
        title: "Concept Development",
        description:
          "Design ideas are translated into layouts and visual directions defining the space.",
      },
      {
        step: "03",
        title: "Design Detailing",
        description:
          "Refinement of materials, furniture, lighting, and proportions to create a cohesive design.",
      },
      {
        step: "04",
        title: "Visualization & Approval",
        description:
          "3D views and presentations help finalize the design with complete clarity.",
      },
      {
        step: "05",
        title: "Working Drawings",
        description:
          "Preparation of detailed drawings for smooth and accurate execution on-site.",
      },
      {
        step: "06",
        title: "Execution Coordination",
        description:
          "Support during execution to ensure the design is built as intended.",
      },
    ],

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

    offerings: [
      {
        title: "Custom Furniture Design",
        description:
          "Tailor-made pieces designed specifically for your space, ensuring perfect proportion and integration.",
      },
      {
        title: "Built-In & Fixed Furniture",
        description:
          "Wardrobes, kitchens, storage systems, and paneling designed as part of the architecture.",
      },
      {
        title: "Loose Furniture Design",
        description:
          "Sofas, tables, beds, and chairs crafted to complement the overall design language.",
      },
      {
        title: "Material & Finish Selection",
        description:
          "Carefully chosen materials, textures, and finishes that balance aesthetics, durability, and usability.",
      },
      {
        title: "Ergonomic & Functional Design",
        description:
          "Furniture that is not just visually refined but also comfortable and practical in daily use.",
      },
      {
        title: "Detailing & Joinery Design",
        description:
          "Precision in joints, edges, finishes, and construction ensuring quality at every level.",
      },
      {
        title: "Execution & Vendor Coordination",
        description:
          "Working closely with craftsmen and vendors to ensure the design is built exactly as intended.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Requirement Understanding",
        description:
          "We study the space, usage, and specific needs to define the purpose of each furniture element.",
      },
      {
        step: "02",
        title: "Design Concept",
        description:
          "Initial ideas are developed, aligning furniture with the overall interior and architectural language.",
      },
      {
        step: "03",
        title: "Design Detailing",
        description:
          "Dimensions, materials, finishes, and joinery are finalized with precision.",
      },
      {
        step: "04",
        title: "Visualization & Approval",
        description:
          "3D views or detailed drawings help you clearly understand the final outcome.",
      },
      {
        step: "05",
        title: "Working Drawings",
        description:
          "Technical drawings are prepared for accurate fabrication and execution.",
      },
      {
        step: "06",
        title: "Production & Execution",
        description:
          "Coordination with vendors and on-site supervision to ensure quality and accuracy.",
      },
    ],

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
export const achievements = [
  {
    title: "GROHE Bath & Design Awards 2025",
    org: "Architectural Digest",
    year: "2025",
    link: "https://www.architecturaldigest.in/sponsored/story/a-confluence-of-quiet-luxury-and-intelligent-design-meet-the-winners-of-the-grohe-bath-and-design-awards-2025/",
    image1: "/assets/awards_1.png",
    image2: "/assets/awards_2.png",
  },
];
