const express = require("express");
const Booking = require("../models/Booking");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      destination,
      experienceId,
      experienceTitle,
      category,
      priceAtBooking,
      currency,
      adults,
      children,
      people,
      date,
      contactMethod,
      notes,
    } = req.body;

    if (!name || !phone || !destination || !date) {
      return res.status(400).json({
        message: "يرجى تعبئة جميع بيانات الحجز المطلوبة",
      });
    }

    const finalAdults = Number(adults) || Number(people) || 1;
    const finalChildren = Number(children) || 0;
    const finalPeople = Number(people) || finalAdults + finalChildren;

    const booking = await Booking.create({
      name,
      phone,
      email: email || "",
      destination,

      experienceId: experienceId || null,
      experienceTitle: experienceTitle || destination,
      category: category || "",
      priceAtBooking: Number(priceAtBooking) || 0,
      currency: currency || "$",

      adults: finalAdults,
      children: finalChildren,
      people: finalPeople,

      date,
      contactMethod: contactMethod || "whatsapp",
      notes: notes || "",
    });

    res.status(201).json({
      message: "تم إرسال طلب الحجز بنجاح",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("experienceId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "الحجز غير موجود",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/payment", protect, adminOnly, async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "الحجز غير موجود",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "الحجز غير موجود",
      });
    }

    res.json({
      message: "تم حذف الحجز بنجاح",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;