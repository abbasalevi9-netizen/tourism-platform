const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    // Old fields - kept for compatibility
    name: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    program: {
      type: [String],
      default: [],
    },

    // Arabic fields
    nameAr: {
      type: String,
      trim: true,
    },

    countryAr: {
      type: String,
      trim: true,
    },

    descriptionAr: {
      type: String,
    },

    programAr: {
      type: [String],
      default: [],
    },

    // English fields
    nameEn: {
      type: String,
      trim: true,
    },

    countryEn: {
      type: String,
      trim: true,
    },

    descriptionEn: {
      type: String,
    },

    programEn: {
      type: [String],
      default: [],
    },

    // Turkish fields
    nameTr: {
      type: String,
      trim: true,
    },

    countryTr: {
      type: String,
      trim: true,
    },

    descriptionTr: {
      type: String,
    },

    programTr: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "$",
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);