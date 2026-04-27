const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");

const authRoutes = require("../routes/authRoutes");
const destinationRoutes = require("../routes/destinationRoutes");
const bookingRoutes = require("../routes/bookingRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const experienceRoutes = require("../routes/experienceRoutes");
const settingsRoutes = require("../routes/settingsRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Tourism API is running on Vercel");
});

app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/settings", settingsRoutes);

module.exports = app;
