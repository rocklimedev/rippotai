import type { TeamMember, Value } from "./types";

const S = "/assets/team/";

export const team: TeamMember[] = [
  { name: "Sagar Chhabra", role: "Founder & Principal Architect", photo: S + "sagar_chhabra.png", group: "studio" },
  { name: "Sarthi", role: "Senior Architect", photo: S + "saarthi.jpeg", group: "studio" },
  { name: "Dhairya Soni", role: "Junior Interior Designer", photo: S + "dhairya.jpeg", group: "studio" },
  { name: "Megha Chhabra", role: "Interior Decor and Styling Head", photo: S + "megha.PNG", group: "studio" },
  { name: "Bhav Lamba", role: "Content Strategist & Creative Lead", photo: S + "Bhav.jpg", group: "studio" },
  { name: "Chhavi", role: "Interior Designer", photo: S + "CM.png", group: "collab" },
  { name: "Jayant Vijay Nath", role: "Senior Architect", photo: S + "Jayant.jpg", group: "alumni" },
  { name: "Aniket", role: "Architect", photo: S + "aniket.png", group: "alumni" },
  { name: "Shivam", role: "Architect", photo: S + "shivam.png", group: "alumni" },
  { name: "Shivani", role: "Project Manager", photo: S + "shivani.png", group: "alumni" },
];

export const values: Value[] = [
  {
    title: "Precision",
    body: "Every detail is deliberate. From material selection to spatial proportions, we approach design with an architect's exactness.",
    image: "/images/p_marble.webp",
  },
  {
    title: "Integrity",
    body: "Transparency and honesty define our process. We build trust through clear communication and unwavering commitment to quality.",
    image: "/images/p_inner.webp",
  },
  {
    title: "Innovation",
    body: "We blend timeless design principles with forward-thinking techniques, ensuring our work stays relevant and inspiring.",
    image: "/images/L1.webp",
  },
  {
    title: "Collaboration",
    body: "Great spaces emerge from great partnerships. We listen, understand, and co-create with our clients every step of the way.",
    image: "/images/L9.webp",
  },
];

export const departments = [
  "Architecture",
  "Interior Design",
  "Furniture Design",
  "Project Management",
  "3D Visualization",
  "Other",
];
