const express = require("express");
const SiteSettings = require("../models/SiteSettings");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();

  if (!settings) {
    settings = await SiteSettings.create({});
  }

  return settings;
}

router.get("/", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/", protect, adminOnly, async (req, res) => {
  try {
    let settings = await getOrCreateSettings();

    settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
