const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../config/db"); // From previous backend setup

// Import models (ensure paths match your structure)
const Query = require("../models/queries");
const Project = require("../models/project");
const Job = require("../models/job");
const Application = require("../models/application");

// Sample data
const sampleQueries = [
  {
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Interested in residential design services.",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Consultation Request",
    message: "Need advice on sustainable architecture.",
  },
];

const sampleProjects = [
  {
    title: "The Cube House",
    category: "Residential",
    description: "A modern residential masterpiece blending minimalist design.",
    details:
      "Located in Melbourne, completed in 2020 with sustainable materials.",
    image: "cube-house.jpg", // Assume uploaded to /uploads
    images: ["cube-1.jpg", "cube-2.jpg"],
  },
  {
    title: "TechCorp Headquarters",
    category: "Commercial",
    description: "Innovative office space for collaboration.",
    details: "Sydney-based, 2022 completion with smart tech.",
    image: "techcorp.jpg",
    images: ["tech-1.jpg", "tech-2.jpg"],
  },
  {
    title: "Serenity Interiors",
    category: "Interiors",
    description: "Bespoke luxury apartment interiors.",
    details: "Brisbane project, 2023, custom furniture included.",
    image: "serenity.jpg",
    images: ["serenity-1.jpg"],
  },
];

const sampleJobs = [
  {
    title: "Senior Architect",
    category: "Architecture",
    location: "Melbourne, VIC",
    description: "Lead residential and commercial projects.",
    details: "7+ years experience, Revit proficiency required.",
  },
  {
    title: "Interior Designer",
    category: "Interiors",
    location: "Sydney, NSW",
    description: "Design functional and aesthetic interiors.",
    details: "5+ years experience, strong portfolio needed.",
  },
  {
    title: "Furniture Designer",
    category: "Furniture",
    location: "Brisbane, QLD",
    description: "Craft bespoke furniture inspired by cube concept.",
    details: "3+ years experience in materials and CAD.",
  },
];

const sampleApplications = [
  {
    name: "Applicant One",
    email: "applicant1@example.com",
    position: "Senior Architect",
    resume: "resume1.pdf", // Assume uploaded
    coverLetter:
      "Excited to join Rippotai as Senior Architect. Experience in sustainable design.",
  },
  {
    name: "Applicant Two",
    email: "applicant2@example.com",
    position: "Interior Designer",
    resume: "resume2.pdf",
    coverLetter: "Passionate about innovative interiors. Portfolio attached.",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Query.deleteMany({});
    await Project.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    // Insert sample data
    await Query.insertMany(sampleQueries);
    await Project.insertMany(sampleProjects);
    await Job.insertMany(sampleJobs);
    await Application.insertMany(sampleApplications);

    console.log("✅ Database seeded successfully!");
    console.log(`- Queries: ${sampleQueries.length}`);
    console.log(`- Projects: ${sampleProjects.length}`);
    console.log(`- Jobs: ${sampleJobs.length}`);
    console.log(`- Applications: ${sampleApplications.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();
