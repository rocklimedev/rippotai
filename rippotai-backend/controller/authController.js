const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User, Role, Sequelize } = require("../models");
const { Op } = Sequelize;

// ------------------- TOKEN HELPER -------------------
const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role?.name, // ✅ single role
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// ------------------- REGISTER -------------------
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    // ✅ Find role
    let roleData;

    if (role) {
      roleData = await Role.findOne({
        where: { name: role },
      });
    }

    // Default role = Employee
    if (!roleData) {
      roleData = await Role.findOne({
        where: { name: "Employee" },
      });
    }

    if (!roleData) {
      return res.status(400).json({
        message: "Default role not found. Seed roles first.",
      });
    }

    // ✅ Create user (password auto-hashed)
    const newUser = await User.create({
      name,
      email,
      password,
      roleId: roleData.id,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- LOGIN -------------------
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        as: "role",
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const tokens = generateTokens(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
      },
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- REFRESH TOKEN -------------------
exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        message: "Refresh token required.",
      });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token.",
        });
      }

      const payload = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- GET PROFILE -------------------
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ------------------- LOGOUT -------------------
exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
