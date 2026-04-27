const express = require("express");
const Experience = require("../models/Experience");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/*
  GET /api/experiences
  Public
  Query examples:
  /api/experiences
  /api/experiences?category=tour
  /api/experiences?search=istanbul
*/
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {
      isActive: true,
    };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { titleAr: { $regex: search, $options: "i" } },
        { titleEn: { $regex: search, $options: "i" } },
        { titleTr: { $regex: search, $options: "i" } },
        { countryAr: { $regex: search, $options: "i" } },
        { countryEn: { $regex: search, $options: "i" } },
        { countryTr: { $regex: search, $options: "i" } },
        { cityAr: { $regex: search, $options: "i" } },
        { cityEn: { $regex: search, $options: "i" } },
        { cityTr: { $regex: search, $options: "i" } },
      ];
    }

    const experiences = await Experience.find(filter).sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  GET /api/experiences/admin/all
  Admin only
  Shows active and inactive
*/
router.get("/admin/all", protect, adminOnly, async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  GET /api/experiences/:id
  Public
*/
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        message: "العنصر غير موجود",
      });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  POST /api/experiences
  Admin only
*/
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const {
      category,
      titleAr,
      titleEn,
      titleTr,
      countryAr,
      countryEn,
      countryTr,
      cityAr,
      cityEn,
      cityTr,
      descriptionAr,
      descriptionEn,
      descriptionTr,
      price,
      currency,
      duration,
      image,
      rating,
      featured,
      isActive,
    } = req.body;

    if (!titleAr || price === undefined || !image) {
      return res.status(400).json({
        message: "المطلوب: العنوان العربي، السعر، والصورة",
      });
    }

    const experience = await Experience.create({
      category: category || "tour",

      titleAr,
      titleEn: titleEn || "",
      titleTr: titleTr || "",

      countryAr: countryAr || "غير محدد",
      countryEn: countryEn || "",
      countryTr: countryTr || "",

      cityAr: cityAr || "",
      cityEn: cityEn || "",
      cityTr: cityTr || "",

      descriptionAr: descriptionAr || "لا يوجد وصف حاليًا",
      descriptionEn: descriptionEn || "",
      descriptionTr: descriptionTr || "",

      price: Number(price),
      currency: currency || "$",
      duration: duration || "غير محددة",
      image,

      rating: rating === undefined ? 5 : Number(rating),
      featured: featured === undefined ? true : featured,
      isActive: isActive === undefined ? true : isActive,
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  PUT /api/experiences/:id
  Admin only
*/
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!experience) {
      return res.status(404).json({
        message: "العنصر غير موجود",
      });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
  DELETE /api/experiences/:id
  Admin only
*/
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        message: "العنصر غير موجود",
      });
    }

    res.json({
      message: "تم حذف العنصر بنجاح",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;