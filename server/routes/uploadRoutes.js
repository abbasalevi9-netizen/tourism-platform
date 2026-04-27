const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

const cloudinaryCloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
const cloudinaryApiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
const cloudinaryApiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("يسمح برفع الصور فقط"));
    }

    cb(null, true);
  },
});

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Upload route hit");
      console.log("Cloudinary config:", {
        cloudName: cloudinaryCloudName,
        apiKeyLength: cloudinaryApiKey.length,
        apiSecretLength: cloudinaryApiSecret.length,
      });

      if (!req.file) {
        return res.status(400).json({
          message: "لم يتم اختيار صورة",
        });
      }

      if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
        return res.status(500).json({
          message: "بيانات Cloudinary ناقصة في ملف .env",
        });
      }

      const base64Image = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "tourism-platform",
        resource_type: "image",
      });

      res.json({
        message: "تم رفع الصورة بنجاح",
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      console.error("Upload error:", error);

      res.status(500).json({
        message: error.message || "فشل رفع الصورة",
      });
    }
  },
);

module.exports = router;
