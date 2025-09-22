const mongoose = require("mongoose");
const User = require("../models/user"); // Adjust path as needed
// Import the connectDB function
const connectDB = require("../config/db"); // Update with the correct path to your connectDB file
const bcrypt = require("bcryptjs");
const resetPassword = async () => {
  try {
    await connectDB();
    const email = "ishmartshanker@gmail.com";
    const newPassword = "the@Nerdyguy2002";

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user
    const result = await User.updateOne(
      { email },
      { password: hashedPassword }
    );

    console.log("Password reset result:", result);
    console.log("New hash:", hashedPassword);

    // Test the new hash
    const isValid = await bcrypt.compare(newPassword, hashedPassword);
    console.log("Hash validation test:", isValid);
  } catch (error) {
    console.error("Password reset failed:", error);
  }
};

resetPassword();
