const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // Public ID
      projectId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        unique: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("draft", "prunned", "working", "completed"),
        defaultValue: "draft",
      },

      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      location: {
        type: DataTypes.STRING,
      },

      scope: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      banner: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      images: {
        type: DataTypes.JSON, // array replacement
        defaultValue: [],
      },

      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: "projects",
      timestamps: true,

      indexes: [
        { fields: ["priority", "createdAt"] },
        { fields: ["status", "createdAt"] },
        { fields: ["category"] },
        { fields: ["slug"] },
        { fields: ["projectId"] },
      ],

      hooks: {
        beforeValidate: async (project) => {
          if (!project.changed("title") && project.slug) return;

          const baseSlug = slugify(project.title, {
            lower: true,
            strict: true,
          });

          let uniqueSlug = baseSlug;
          let counter = 1;

          // ensure uniqueness
          while (true) {
            const existing = await sequelize.models.Project.findOne({
              where: {
                slug: uniqueSlug,
                id: { [sequelize.Sequelize.Op.ne]: project.id || null },
              },
            });

            if (!existing) break;

            uniqueSlug = `${baseSlug}-${counter++}`;
          }

          project.slug = uniqueSlug;
        },
      },
    },
  );

  return Project;
};
