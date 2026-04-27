const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["tour", "flight", "attraction", "activity"],
      required: true,
      default: "tour",
    },

    titleAr: {
      type: String,
      required: true,
      trim: true,
    },

    titleEn: {
      type: String,
      trim: true,
      default: "",
    },

    titleTr: {
      type: String,
      trim: true,
      default: "",
    },

    countryAr: {
      type: String,
      trim: true,
      default: "غير محدد",
    },

    countryEn: {
      type: String,
      trim: true,
      default: "",
    },

    countryTr: {
      type: String,
      trim: true,
      default: "",
    },

    cityAr: {
      type: String,
      trim: true,
      default: "",
    },

    cityEn: {
      type: String,
      trim: true,
      default: "",
    },

    cityTr: {
      type: String,
      trim: true,
      default: "",
    },

    descriptionAr: {
      type: String,
      default: "لا يوجد وصف حاليًا",
    },

    descriptionEn: {
      type: String,
      default: "",
    },

    descriptionTr: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    currency: {
      type: String,
      trim: true,
      default: "$",
    },

    duration: {
      type: String,
      trim: true,
      default: "غير محددة",
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    featured: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);