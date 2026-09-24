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
    slug: "interior-design",
    name: "Interior Design",
    summary: "Rooms composed around how you live — material palettes, lighting and joinery drawn as a single language.",
    tags: ["Layouts", "Lighting", "Styling"],
    peek: "/images/d2.webp",
    image: "/images/p_tropical.webp",
    imageCaption: "Tropical Home",
  },
  {
    slug: "bespoke-furniture-design",
    name: "Furniture",
    summary:
      "Pieces made for the room they sit in — designed in-studio, prototyped and produced with trusted workshops.",
    tags: ["Concept sketches", "Prototyping", "Production"],
    peek: "/images/d5.webp",
    image: "/images/L9.webp",
    imageCaption: "Tropical Home",
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
];
