import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";
import ExperienceCard from "./ExperienceCard";

const categoryLabels = {
  ar: {
    all: "الكل",
    tour: "رحلات سياحية",
    flight: "رحلات طيران",
    attraction: "معالم سياحية",
    activity: "أنشطة وتجارب",
  },
  "ar-eg": {
    all: "الكل",
    tour: "رحلات سياحية",
    flight: "رحلات طيران",
    attraction: "معالم سياحية",
    activity: "أنشطة وتجارب",
  },
  "ar-ma": {
    all: "الكل",
    tour: "رحلات سياحية",
    flight: "رحلات طيران",
    attraction: "معالم سياحية",
    activity: "أنشطة وتجارب",
  },
  "ar-dz": {
    all: "الكل",
    tour: "رحلات سياحية",
    flight: "رحلات طيران",
    attraction: "معالم سياحية",
    activity: "أنشطة وتجارب",
  },
  en: {
    all: "All",
    tour: "Tours",
    flight: "Flights",
    attraction: "Attractions",
    activity: "Activities",
  },
  tr: {
    all: "Tümü",
    tour: "Turlar",
    flight: "Uçuşlar",
    attraction: "Gezilecek Yerler",
    activity: "Aktiviteler",
  },
  fr: {
    all: "Tout",
    tour: "Circuits",
    flight: "Vols",
    attraction: "Attractions",
    activity: "Activités",
  },
  de: {
    all: "Alle",
    tour: "Touren",
    flight: "Flüge",
    attraction: "Sehenswürdigkeiten",
    activity: "Aktivitäten",
  },
  es: {
    all: "Todo",
    tour: "Tours",
    flight: "Vuelos",
    attraction: "Atracciones",
    activity: "Actividades",
  },
  it: {
    all: "Tutto",
    tour: "Tour",
    flight: "Voli",
    attraction: "Attrazioni",
    activity: "Attività",
  },
  ru: {
    all: "Все",
    tour: "Туры",
    flight: "Авиаперелеты",
    attraction: "Достопримечательности",
    activity: "Активности",
  },
};

const sectionText = {
  ar: {
    subtitle: "تجارب لا تفوت",
    title: "اكتشف أفضل الرحلات والأنشطة",
    searchResultsFor: "نتائج البحث عن",
    loading: "جاري تحميل المحتوى...",
    error: "حدث خطأ أثناء تحميل المحتوى",
    empty: "لا يوجد محتوى حاليًا",
  },
  "ar-eg": {
    subtitle: "تجارب ما تتفوتش",
    title: "اكتشف أحلى الرحلات والأنشطة",
    searchResultsFor: "نتائج البحث عن",
    loading: "بنحمّل المحتوى...",
    error: "حصلت مشكلة أثناء تحميل المحتوى",
    empty: "مفيش محتوى دلوقتي",
  },
  "ar-ma": {
    subtitle: "تجارب ما تفوتش",
    title: "اكتشف أفضل الرحلات والأنشطة",
    searchResultsFor: "نتائج البحث عن",
    loading: "كنحمّلو المحتوى...",
    error: "وقع مشكل أثناء تحميل المحتوى",
    empty: "ما كاين حتى محتوى دابا",
  },
  "ar-dz": {
    subtitle: "تجارب ما تتفوتش",
    title: "اكتشف أفضل الرحلات والأنشطة",
    searchResultsFor: "نتائج البحث عن",
    loading: "رانا نحملو المحتوى...",
    error: "صار مشكل أثناء تحميل المحتوى",
    empty: "ما كاين حتى محتوى حاليا",
  },
  en: {
    subtitle: "Top experiences",
    title: "Discover the best trips and activities",
    searchResultsFor: "Search results for",
    loading: "Loading content...",
    error: "An error occurred while loading content",
    empty: "No content available right now",
  },
  tr: {
    subtitle: "Kaçırılmayacak deneyimler",
    title: "En iyi turları ve aktiviteleri keşfedin",
    searchResultsFor: "Arama sonuçları",
    loading: "İçerik yükleniyor...",
    error: "İçerik yüklenirken bir hata oluştu",
    empty: "Şu anda içerik bulunmuyor",
  },
  fr: {
    subtitle: "Expériences à ne pas manquer",
    title: "Découvrez les meilleurs voyages et activités",
    searchResultsFor: "Résultats de recherche pour",
    loading: "Chargement du contenu...",
    error: "Une erreur est survenue lors du chargement du contenu",
    empty: "Aucun contenu disponible pour le moment",
  },
  de: {
    subtitle: "Top-Erlebnisse",
    title: "Entdecken Sie die besten Reisen und Aktivitäten",
    searchResultsFor: "Suchergebnisse für",
    loading: "Inhalte werden geladen...",
    error: "Beim Laden der Inhalte ist ein Fehler aufgetreten",
    empty: "Derzeit sind keine Inhalte verfügbar",
  },
  es: {
    subtitle: "Experiencias destacadas",
    title: "Descubre los mejores viajes y actividades",
    searchResultsFor: "Resultados de búsqueda para",
    loading: "Cargando contenido...",
    error: "Ocurrió un error al cargar el contenido",
    empty: "No hay contenido disponible ahora",
  },
  it: {
    subtitle: "Esperienze imperdibili",
    title: "Scopri i migliori viaggi e attività",
    searchResultsFor: "Risultati di ricerca per",
    loading: "Caricamento contenuto...",
    error: "Si è verificato un errore durante il caricamento",
    empty: "Nessun contenuto disponibile al momento",
  },
  ru: {
    subtitle: "Лучшие впечатления",
    title: "Лучшие туры и активности",
    searchResultsFor: "Результаты поиска для",
    loading: "Загрузка контента...",
    error: "Произошла ошибка при загрузке контента",
    empty: "Сейчас нет доступного контента",
  },
};

const categories = ["tour", "flight", "attraction", "activity"];

function ExperiencesSection() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const currentCategoryLabels = categoryLabels[language] || categoryLabels.ar;
  const currentText = sectionText[language] || sectionText.ar;

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
        setMessage(currentText.error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, [activeCategory, searchFromUrl, currentText.error]);

  return (
    <section className="experiences-section">
      <div className="section-heading">
        <p>{currentText.subtitle}</p>

        <h2>{currentText.title}</h2>
      </div>

      <div className="category-tabs">
        <button
          className={activeCategory === "all" ? "active-category" : ""}
          onClick={() => setActiveCategory("all")}
        >
          {currentCategoryLabels.all}
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active-category" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {currentCategoryLabels[category]}
          </button>
        ))}
      </div>

      {searchFromUrl && (
        <p className="search-result-label">
          {currentText.searchResultsFor}: <b>{searchFromUrl}</b>
        </p>
      )}

      {loading && <p className="content-message">{currentText.loading}</p>}

      {!loading && message && <p className="content-message">{message}</p>}

      {!loading && !message && experiences.length === 0 && (
        <p className="content-message">{currentText.empty}</p>
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
