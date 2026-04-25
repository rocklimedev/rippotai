module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      interestedIn: {
        type: DataTypes.ENUM(
          "Architecture",
          "Interior Design",
          "Furniture Design",
          "Project Management",
          "3D Visualization",
          "Other",
        ),
        allowNull: false,
      },

      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("Pending", "Reviewed", "Shortlisted", "Rejected"),
        defaultValue: "Pending",
      },
    },
    {
      tableName: "applications",
      timestamps: true, // handles createdAt automatically
    },
  );

  return Application;
};
