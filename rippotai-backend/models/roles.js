module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Role name must be unique",
        },
        validate: {
          notEmpty: { msg: "Role name is required" },
        },
      },

      description: {
        type: DataTypes.STRING,
        defaultValue: "",
      },

      permissions: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isValidPermissions(value) {
            const allowed = [
              "manage_users",
              "manage_roles",
              "manage_projects",
              "manage_queries",
              "manage_jobs",
              "view_dashboard",
            ];

            if (!Array.isArray(value)) return;

            const invalid = value.filter((p) => !allowed.includes(p));
            if (invalid.length) {
              throw new Error(`Invalid permissions: ${invalid.join(", ")}`);
            }
          },
        },
      },
    },
    {
      tableName: "roles",
      timestamps: true,
    },
  );
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users",
    });
  };
  return Role;
};
