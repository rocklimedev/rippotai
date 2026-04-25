module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define(
    "Query",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      branch: {
        type: DataTypes.ENUM("chhabra_marble", "rippotai"),
        allowNull: false,
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

      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("new", "in-progress", "resolved"),
        defaultValue: "new",
      },

      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },

      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      notes: {
        type: DataTypes.JSON, // replaces embedded subdocuments
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "queries",
      timestamps: true,
    },
  );

  // Associations
  Query.associate = (models) => {
    Query.belongsTo(models.User, {
      foreignKey: "assignedTo",
      as: "assignee",
    });
  };

  return Query;
};
