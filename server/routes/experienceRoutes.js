const express = require("express");
const Experience = require("../models/Experience");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

const languageSuffixes = [
  "Ar",
  "ArEg",
  "ArMa",
  "ArDz",
  "En",
  "Tr",
  "Fr",
  "De",
  "Es",
  "It",
  "Ru",
];

const localizedBaseFields = ["title", "country", "city", "description"];

const categoryValues = ["tour", "flight", "attraction", "activity"];

function cleanString(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function buildLocalizedPayload(body, isCreate = false) {
  const payload = {};

  localizedBaseFields.forEach((baseField) => {
    languageSuffixes.forEach((suffix) => {
      const fieldName = `${baseField}${suffix}`;

      if (isCreate || Object.prototype.hasOwnProperty.call(body, fieldName)) {
        payload[fieldName] = cleanString(body[fieldName]);
      }
    });
  });

  if (isCreate || Object.prototype.hasOwnProperty.call(payload, "countryAr")) {
    payload.countryAr = payload.countryAr || "غير محدد";
  }

  if (
    isCreate ||
    Object.prototype.hasOwnProperty.call(payload, "descriptionAr")
  ) {
    payload.descriptionAr = payload.descriptionAr || "لا يوجد وصف حاليًا";
  }

  return payload;
}

function buildExperiencePayload(body, isCreate = false) {
  const payload = {
    ...buildLocalizedPayload(body, isCreate),
  };

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "category")) {
    payload.category = categoryValues.includes(body.category)
      ? body.category
      : "tour";
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "price")) {
    payload.price = Number(body.price);
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "currency")) {
    payload.currency = cleanString(body.currency) || "$";
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "duration")) {
    payload.duration = cleanString(body.duration) || "غير محددة";
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "image")) {
    payload.image = cleanString(body.image);
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "rating")) {
    payload.rating = body.rating === undefined ? 5 : Number(body.rating) || 5;
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "featured")) {
    payload.featured = body.featured === undefined ? true : body.featured;
  }

  if (isCreate || Object.prototype.hasOwnProperty.call(body, "isActive")) {
    payload.isActive = body.isActive === undefined ? true : body.isActive;
  }

  return payload;
}

function getSearchFields() {
  return localizedBaseFields.flatMap((baseField) =>
    languageSuffixes.map((suffix) => `${baseField}${suffix}`),
  );
}

/*
  GET /api/experiences
  Public
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
      filter.$or = getSearchFields().map((fieldName) => ({
        [fieldName]: { $regex: search, $options: "i" },
      }));
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
    const experienceData = buildExperiencePayload(req.body, true);

    if (
      !experienceData.titleAr ||
      Number.isNaN(experienceData.price) ||
      !experienceData.image
    ) {
      return res.status(400).json({
        message: "المطلوب: العنوان العربي، السعر، والصورة",
      });
    }

    const experience = await Experience.create(experienceData);

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
    const experienceData = buildExperiencePayload(req.body, false);

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      experienceData,
      {
        new: true,
        runValidators: true,
      },
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
