const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Role = require("../models/roles");

// Helper: generate access + refresh tokens
const generateTokens = (user) => {
  const payload = { id: user._id, email: user.email, roles: user.roles };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m", // short-lived token
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", // longer validity
  });

  return { accessToken, refreshToken };
};

// ------------------- AUTH CONTROLLERS -------------------

// Register new user (Admin only in dashboard)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, roles } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign roles (default to "Employee" if none provided)
    let assignedRoles = [];
    if (roles?.length) {
      // assign only existing roles
      const validRoles = await Role.find({ name: { $in: roles } });
      assignedRoles = validRoles.map((r) => r.name);
    } else {
      // fallback to Employee
      const employeeRole = await Role.findOne({ name: "Employee" });
      if (employeeRole) assignedRoles.push(employeeRole.name);
      else assignedRoles.push("Employee"); // fallback to string
    }
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: assignedRoles,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email });
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    console.log(
      "User found:",
      user ? { email: user.email, hasPassword: !!user.password } : null,
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.password) {
      return res.status(401).json({
        message: "User account lacks a password. Please reset your password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const tokens = generateTokens(user);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      ...tokens,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// Refresh access token
exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(401).json({ message: "Refresh token required." });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token." });

      const payload = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles,
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

// Get logged-in user's profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Logout (invalidate refresh token client-side)
exports.logout = async (req, res) => {
  try {
    // Ideally, store refresh tokens in DB/Redis to blacklist on logout
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
