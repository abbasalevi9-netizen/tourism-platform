import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";

const fallbackHeroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
];

function HeroSearch() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const heroImages =
    settings.heroImages && settings.heroImages.length > 0
      ? settings.heroImages
      : fallbackHeroImages;

  const [currentImage, setCurrentImage] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  function handleSearch(event) {
    event.preventDefault();

    const query = searchText.trim();

    if (query !== "") {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  }

  return (
    <section
      className="hero-search"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${heroImages[currentImage]})`,
      }}
    >
      <div className="hero-search-content">
        <h1>{t.heroSearchTitle || "Book unforgettable travel experiences"}</h1>

        <form className="hero-search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.heroSearchPlaceholder || "Search by destination"}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button type="submit">🔍</button>
        </form>

        <div className="hero-dots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={currentImage === index ? "active-dot" : ""}
              onClick={() => setCurrentImage(index)}
              type="button"
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
