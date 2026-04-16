const mongoose = require("mongoose");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

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

  // ✅ NEW: Priority (lower = higher priority)
  priority: {
    type: Number,
    default: 0, // 0 = lowest, 1+ = higher priority
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
    required: true,
  },

  banner: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String,
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
      _id: { $ne: this._id },
    })
  ) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  this.slug = uniqueSlug;
  next();
});

// ✅ Indexes (optimized for sorting by priority first)
projectSchema.index({ priority: -1, createdAt: -1 });
projectSchema.index({ status: 1, createdAt: -1 });
projectSchema.index({ category: 1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ projectId: 1 });

module.exports = mongoose.model("Project", projectSchema);
