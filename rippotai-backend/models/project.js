const mongoose = require("mongoose");
const slugify = require("slugify"); // Install slugify: npm install slugify

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  image: { type: String, required: true }, // Main image URL
  images: [{ type: String }], // Additional images for gallery
  slug: { type: String, unique: true, index: true }, // Add slug field
  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to generate slug from title
projectSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let counter = 1;

    // Ensure slug is unique by appending a number if necessary
    while (await mongoose.models.Project.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);
