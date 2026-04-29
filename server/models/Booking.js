const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    experienceTitle: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: ["tour", "flight", "attraction", "activity", ""],
      default: "",
    },

    priceAtBooking: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "$",
      trim: true,
    },

    adults: {
      type: Number,
      default: 1,
    },

    children: {
      type: Number,
      default: 0,
    },

    people: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    contactMethod: {
      type: String,
      enum: ["whatsapp", "call", "email"],
      default: "whatsapp",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid"],
      default: "unpaid",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["new", "confirmed", "cancelled"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
