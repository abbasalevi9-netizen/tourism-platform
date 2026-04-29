const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

function userResponse(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
}

/*
  POST /api/auth/register
  Public user registration
*/
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "يرجى إدخال الاسم والبريد وكلمة المرور",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        message: "هذا البريد مستخدم مسبقًا",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json(userResponse(user));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  POST /api/auth/register-admin
  Admin registration with secret code
*/
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password, secretCode } = req.body;

    if (!name || !email || !password || !secretCode) {
      return res.status(400).json({
        message: "يرجى إدخال جميع البيانات",
      });
    }

    if (secretCode !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        message: "كود إنشاء المدير غير صحيح",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        message: "هذا البريد مستخدم مسبقًا",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json(userResponse(admin));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  POST /api/auth/login
  Admin and user login
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "يرجى إدخال البريد وكلمة المرور",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "البريد أو كلمة المرور غير صحيحة",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "البريد أو كلمة المرور غير صحيحة",
      });
    }

    res.json(userResponse(user));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  GET /api/auth/me
*/
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

/*
  GET /api/auth/profile
  Keep old route working
*/
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
