import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../config/api";

const SiteSettingsContext = createContext();

const defaultSettings = {
  siteNameAr: "رحّال",
  siteNameEn: "Rahal",
  siteNameTr: "Rahal",

  footerDescriptionAr:
    "منصة سياحية تساعدك على اختيار أفضل الرحلات والأنشطة والمعالم حول العالم.",
  footerDescriptionEn:
    "A travel platform that helps you choose the best trips, activities, and attractions around the world.",
  footerDescriptionTr:
    "Dünyadaki en iyi turları, aktiviteleri ve gezilecek yerleri seçmenize yardımcı olan bir seyahat platformu.",

  phone: "+90 536 020 2965",
  whatsapp: "+90 536 020 2965",
  email: "info@rahal.com",

  addressAr: "إسطنبول، تركيا",
  addressEn: "Istanbul, Turkey",
  addressTr: "İstanbul, Türkiye",

  workingHoursAr: "يوميًا من 9 صباحًا حتى 8 مساءً",
  workingHoursEn: "Daily from 9 AM to 8 PM",
  workingHoursTr: "Her gün 09:00 - 20:00",

  instagram: "",
  facebook: "",
  tiktok: "",

  heroImages: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  ],
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [settingsLoading, setSettingsLoading] = useState(true);

  async function fetchSettings() {
    try {
      const response = await fetch(`${API_URL}/api/settings`);
      const data = await response.json();

      if (response.ok) {
        setSettings({
          ...defaultSettings,
          ...data,
        });
      }
    } catch (error) {
      console.log("Failed to load site settings:", error);
    } finally {
      setSettingsLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider
      value={{ settings, setSettings, settingsLoading, fetchSettings }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
