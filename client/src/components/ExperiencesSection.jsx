import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";
import ExperienceCard from "./ExperienceCard";

const categories = [
  {
    key: "tour",
    labelAr: "رحلات سياحية",
    labelEn: "Tours",
    labelTr: "Turlar",
  },
  {
    key: "flight",
    labelAr: "رحلات طيران",
    labelEn: "Flights",
    labelTr: "Uçuşlar",
  },
  {
    key: "attraction",
    labelAr: "معالم سياحية",
    labelEn: "Attractions",
    labelTr: "Gezilecek Yerler",
  },
  {
    key: "activity",
    labelAr: "أنشطة وتجارب",
    labelEn: "Activities",
    labelTr: "Aktiviteler",
  },
];

function ExperiencesSection() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  function getCategoryLabel(category) {
    if (language === "en") return category.labelEn;
    if (language === "tr") return category.labelTr;
    return category.labelAr;
  }

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        setMessage("");

        const params = new URLSearchParams();

        if (activeCategory !== "all") {
          params.append("category", activeCategory);
        }

        if (searchFromUrl) {
          params.append("search", searchFromUrl);
        }

        const queryString = params.toString();
        const url = queryString
          ? `${API_URL}/api/experiences?${queryString}`
          : `${API_URL}/api/experiences`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load experiences");
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        setMessage(t.experiencesError || "Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, [activeCategory, searchFromUrl, t.experiencesError]);

  return (
    <section className="experiences-section">
      <div className="section-heading">
        <p>{t.experiencesSubtitle || "Explore travel ideas"}</p>

        <h2>{t.experiencesTitle || "Top travel experiences"}</h2>
      </div>

      <div className="category-tabs">
        <button
          className={activeCategory === "all" ? "active-category" : ""}
          onClick={() => setActiveCategory("all")}
        >
          {t.all || "All"}
        </button>

        {categories.map((category) => (
          <button
            key={category.key}
            className={activeCategory === category.key ? "active-category" : ""}
            onClick={() => setActiveCategory(category.key)}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {searchFromUrl && (
        <p className="search-result-label">
          {t.searchResultsFor || "Search results for"}: <b>{searchFromUrl}</b>
        </p>
      )}

      {loading && (
        <p className="content-message">
          {t.loadingExperiences || "Loading content..."}
        </p>
      )}

      {!loading && message && <p className="content-message">{message}</p>}

      {!loading && !message && experiences.length === 0 && (
        <p className="content-message">
          {t.noExperiences || "No content available right now"}
        </p>
      )}

      {!loading && !message && experiences.length > 0 && (
        <div className="experiences-grid">
          {experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ExperiencesSection;