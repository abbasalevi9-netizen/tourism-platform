const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

async function createAdmin() {
  try {
    await connectDB();

    const email = "admin@test.com";
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = await User.findOne({ email });

    if (admin) {
      admin.name = "Admin";
      admin.password = hashedPassword;
      admin.role = "admin";
      await admin.save();

      console.log("Admin updated successfully");
    } else {
      admin = await User.create({
        name: "Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin created successfully");
    }

    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
