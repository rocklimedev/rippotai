const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Valid email required" },
          notEmpty: { msg: "Email is required" },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      lastLogin: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: true,

      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },

        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    },
  );

  // 🔐 Compare password
  User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // 🎯 Check role
  User.prototype.hasRole = function (roleName) {
    return this.role && this.role.name === roleName;
  };
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });
  };
  return User;
};
