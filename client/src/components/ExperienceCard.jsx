import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const languageSuffixMap = {
  ar: "Ar",
  "ar-eg": "ArEg",
  "ar-ma": "ArMa",
  "ar-dz": "ArDz",
  en: "En",
  tr: "Tr",
  fr: "Fr",
  de: "De",
  es: "Es",
  it: "It",
  ru: "Ru",
};

const fallbackSuffixesMap = {
  Ar: ["Ar", "En"],
  ArEg: ["ArEg", "Ar", "En"],
  ArMa: ["ArMa", "Ar", "En"],
  ArDz: ["ArDz", "Ar", "En"],
  En: ["En", "Ar"],
  Tr: ["Tr", "Ar", "En"],
  Fr: ["Fr", "En", "Ar"],
  De: ["De", "En", "Ar"],
  Es: ["Es", "En", "Ar"],
  It: ["It", "En", "Ar"],
  Ru: ["Ru", "En", "Ar"],
};

const categoryText = {
  ar: {
    tour: "رحلات سياحية",
    flight: "رحلات طيران",
    attraction: "معالم سياحية",
    activity: "أنشطة وتجارب",
  },
  en: {
    tour: "Tours",
    flight: "Flights",
    attraction: "Attractions",
    activity: "Activities",
  },
  tr: {
    tour: "Turlar",
    flight: "Uçuşlar",
    attraction: "Gezilecek Yerler",
    activity: "Aktiviteler",
  },
  fr: {
    tour: "Circuits",
    flight: "Vols",
    attraction: "Attractions",
    activity: "Activités",
  },
  de: {
    tour: "Touren",
    flight: "Flüge",
    attraction: "Sehenswürdigkeiten",
    activity: "Aktivitäten",
  },
  es: {
    tour: "Tours",
    flight: "Vuelos",
    attraction: "Atracciones",
    activity: "Actividades",
  },
  it: {
    tour: "Tour",
    flight: "Voli",
    attraction: "Attrazioni",
    activity: "Attività",
  },
  ru: {
    tour: "Туры",
    flight: "Авиаперелеты",
    attraction: "Достопримечательности",
    activity: "Активности",
  },
};

function getLocalizedField(item, baseName, language) {
  const suffix = languageSuffixMap[language] || "Ar";
  const fallbackSuffixes = fallbackSuffixesMap[suffix] || ["Ar", "En"];

  for (const currentSuffix of fallbackSuffixes) {
    const value = item?.[`${baseName}${currentSuffix}`];

    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }

  return "";
}

function ExperienceCard({ experience }) {
  const { language, t } = useLanguage();

  const title =
    getLocalizedField(experience, "title", language) ||
    t.untitledDestination ||
    "Untitled";

  const country =
    getLocalizedField(experience, "country", language) ||
    t.notSpecified ||
    "Not specified";

  const city = getLocalizedField(experience, "city", language);

  const description =
    getLocalizedField(experience, "description", language) ||
    t.noDescription ||
    "No description available";

  const labelSet = categoryText[language] || categoryText.ar;
  const categoryLabel =
    labelSet[experience.category] || categoryText.en[experience.category] || "";

  return (
    <article className="experience-card rahal-experience-card">
      <Link
        to={`/experiences/${experience._id}`}
        className="rahal-card-image-link"
      >
        <div className="experience-image rahal-experience-image">
          <img src={experience.image} alt={title} />

          {categoryLabel && (
            <span className="rahal-card-category">{categoryLabel}</span>
          )}

          <span className="experience-rating rahal-card-rating">
            ⭐ {experience.rating || 5}
          </span>

          <div className="rahal-card-overlay">
            <p>{city || country}</p>
            <h3>{title}</h3>
          </div>
        </div>
      </Link>

      <div className="experience-content rahal-card-content">
        <p className="experience-location">{city || country}</p>

        <h3>{title}</h3>

        <p className="experience-description">{description}</p>

        <div className="experience-footer rahal-card-footer">
          <span>
            {t.startingFrom || "Starting from"} {experience.price}{" "}
            {experience.currency || "$"}
          </span>

          <Link
            to={`/experiences/${experience._id}`}
            className="rahal-card-btn"
          >
            {t.viewDetails || "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
