const mongoose = require("mongoose");
const slugify = require("slugify"); // npm install slugify
const { v4: uuidv4 } = require("uuid"); // npm install uuid

const projectSchema = new mongoose.Schema({
  // Public-facing big ID
  projectId: {
    type: String,
    unique: true,
    index: true,
    default: uuidv4,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  status: {
    type: String,
    enum: ["draft", "prunned", "working", "completed"],
    default: "draft",
    index: true,
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
  },
  location: {
    type: String,
    trim: true,
  },

  scope: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true, // Main image URL
  },

  images: [
    {
      type: String, // Gallery images
    },
  ],

  slug: {
    type: String,
    unique: true,
    index: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

/**
 * Generate unique slug from title
 */
projectSchema.pre("save", async function (next) {
  if (!this.isModified("title") && this.slug) return next();

  const baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
  });

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (
    await mongoose.models.Project.findOne({
      slug: uniqueSlug,
      _id: { $ne: this._id }, // prevents conflict on updates
    })
  ) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  this.slug = uniqueSlug;
  next();
});

// Compound & single-field indexes
projectSchema.index({ status: 1, createdAt: -1 });
projectSchema.index({ category: 1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ projectId: 1 });

module.exports = mongoose.model("Project", projectSchema);
