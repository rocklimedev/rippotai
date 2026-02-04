const mongoose = require("mongoose");
const slugify = require("slugify"); // npm install slugify

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },

  status: {
    type: String,
    enum: ["draft", "prunned", "working", "completed"],
    default: "draft",
    index: true,
  },

  location: {
    type: String,
    required: false,
    trim: true,
  },

  scope: {
    type: String,
    required: false,
    trim: true,
  },

  description: { type: String, required: true },
  details: { type: String, required: true },

  image: { type: String, required: true }, // Main image URL
  images: [{ type: String }], // Gallery images

  slug: { type: String, unique: true, index: true },

  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to generate unique slug from title
projectSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let counter = 1;

    while (await mongoose.models.Project.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  next();
});
projectSchema.index({ status: 1, createdAt: -1 });
projectSchema.index({ category: 1 });
projectSchema.index({ slug: 1 });

module.exports = mongoose.model("Project", projectSchema);
