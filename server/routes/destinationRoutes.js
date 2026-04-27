const express = require("express");
const Destination = require("../models/Destination");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.json(destinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "الوجهة غير موجودة",
      });
    }

    res.json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!destination) {
      return res.status(404).json({
        message: "الوجهة غير موجودة",
      });
    }

    res.json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "الوجهة غير موجودة",
      });
    }

    res.json({
      message: "تم حذف الوجهة بنجاح",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;