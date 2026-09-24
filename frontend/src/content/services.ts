import type { Service } from "./types";

/** The eight services — also drive the "WE DO" header rotator and the home accordion. */
export const services: Service[] = [
  {
    slug: "architectural-design",
    name: "Architectural Design",
    summary:
      "Buildings conceived from the cube outward — massing, planning and construction documentation resolved as one set of decisions.",
    tags: ["Site study", "Massing", "Working drawings"],
    peek: "/images/d10.webp",
    image: "/images/p_banga.webp",
    imageCaption: "Banga’s Residence",
  },
  {
    slug: "concept-development",
    name: "Concept Development",
    summary:
      "The idea before the drawing: site, brief and budget distilled into a clear spatial concept you can react to early.",
    tags: ["Brief", "Zoning", "Mood & material"],
    peek: "/images/d4.webp",
    image: "/images/L1.webp",
    imageCaption: "Moksh Dham",
  },
  {
    slug: "facade-design",
    name: "Façade Design",
    summary:
      "Skins that work as hard as they look — screens, fins, brick and stone detailed for light, heat and the street.",
    tags: ["Elevation studies", "Screens & fins", "Material detailing"],
    peek: "/images/d9.webp",
    image: "/images/L12.webp",
    imageCaption: "Banga’s Residence",
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    summary: "Rooms composed around how you live — material palettes, lighting and joinery drawn as a single language.",
    tags: ["Layouts", "Lighting", "Styling"],
    peek: "/images/d2.webp",
    image: "/images/p_tropical.webp",
    imageCaption: "Tropical Home",
  },
  {
    slug: "interior-architecture",
    name: "Interior Architecture",
    summary:
      "Where interiors meet structure: reworked plans, new volumes and built-in elements that change how a space performs.",
    tags: ["Re-planning", "Ceilings & niches", "Built-ins"],
    peek: "/images/d1.webp",
    image: "/images/L4.webp",
    imageCaption: "The Inner House",
  },
  {
    slug: "design-consultation",
    name: "Design Consultation",
    summary:
      "Focused expert time for owners, developers and fellow designers — reviews, feasibility and second opinions.",
    tags: ["Design reviews", "Feasibility", "Second opinions"],
    peek: "/images/d7.webp",
    image: "/images/p_khanna.webp",
    imageCaption: "Vinay Khanna Law Chambers",
  },
  {
    slug: "project-execution",
    name: "Project Execution",
    summary:
      "Drawings carried through to site — procurement, vendor coordination and supervision to a single point of accountability.",
    tags: ["Procurement", "Vendor coordination", "Site supervision"],
    peek: "/images/d8.webp",
    image: "/images/sagar.webp",
    imageCaption: "On site",
  },
  {
    slug: "bespoke-furniture-design",
    name: "Bespoke Furniture Design",
    summary:
      "Pieces made for the room they sit in — designed in-studio, prototyped and produced with trusted workshops.",
    tags: ["Concept sketches", "Prototyping", "Production"],
    peek: "/images/d5.webp",
    image: "/images/L9.webp",
    imageCaption: "Tropical Home",
  },
];
