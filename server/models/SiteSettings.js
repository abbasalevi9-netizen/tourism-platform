const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    siteNameAr: {
      type: String,
      default: "رحّال",
      trim: true,
    },

    siteNameEn: {
      type: String,
      default: "Rahal",
      trim: true,
    },

    siteNameTr: {
      type: String,
      default: "Rahal",
      trim: true,
    },

    footerDescriptionAr: {
      type: String,
      default:
        "منصة سياحية تساعدك على اختيار أفضل الرحلات والأنشطة والمعالم حول العالم.",
    },

    footerDescriptionEn: {
      type: String,
      default:
        "A travel platform that helps you choose the best trips, activities, and attractions around the world.",
    },

    footerDescriptionTr: {
      type: String,
      default:
        "Dünyadaki en iyi turları, aktiviteleri ve gezilecek yerleri seçmenize yardımcı olan bir seyahat platformu.",
    },

    phone: {
      type: String,
      default: "+90 536 020 2965",
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "+90 536 020 2965",
      trim: true,
    },

    email: {
      type: String,
      default: "info@rahal.com",
      trim: true,
    },

    addressAr: {
      type: String,
      default: "إسطنبول، تركيا",
    },

    addressEn: {
      type: String,
      default: "Istanbul, Turkey",
    },

    addressTr: {
      type: String,
      default: "İstanbul, Türkiye",
    },

    workingHoursAr: {
      type: String,
      default: "يوميًا من 9 صباحًا حتى 8 مساءً",
    },

    workingHoursEn: {
      type: String,
      default: "Daily from 9 AM to 8 PM",
    },

    workingHoursTr: {
      type: String,
      default: "Her gün 09:00 - 20:00",
    },

    instagram: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    tiktok: {
      type: String,
      default: "",
    },

    heroImages: {
      type: [String],
      default: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
      ],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
