const mongoose = require("mongoose");

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

function createLocalizedStringFields(baseName) {
  const fields = {};

  languageSuffixes.forEach((suffix) => {
    fields[`${baseName}${suffix}`] = {
      type: String,
      trim: true,
      default: "",
    };
  });

  return fields;
}

const titleFields = createLocalizedStringFields("title");
titleFields.titleAr = {
  type: String,
  required: true,
  trim: true,
};

const countryFields = createLocalizedStringFields("country");
countryFields.countryAr = {
  type: String,
  trim: true,
  default: "غير محدد",
};

const cityFields = createLocalizedStringFields("city");

const descriptionFields = createLocalizedStringFields("description");
descriptionFields.descriptionAr = {
  type: String,
  trim: true,
  default: "لا يوجد وصف حاليًا",
};

const experienceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["tour", "flight", "attraction", "activity"],
      required: true,
      default: "tour",
    },

    ...titleFields,
    ...countryFields,
    ...cityFields,
    ...descriptionFields,

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
  },
);

module.exports = mongoose.model("Experience", experienceSchema);
