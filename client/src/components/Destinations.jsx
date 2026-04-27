import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";
import ExperienceCard from "./ExperienceCard";

function Destinations() {
  const { t } = useLanguage();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        setMessage("");

        const response = await fetch(
          `${API_URL}/api/experiences?category=tour`,
        );

        if (!response.ok) {
          throw new Error("Failed to load tours");
        }

        const data = await response.json();
        setTours(data);
      } catch (error) {
        setMessage(t.experiencesError || "حدث خطأ أثناء تحميل الرحلات");
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, [t.experiencesError]);

  return (
    <section className="experiences-section destinations-page-section">
      <div className="section-heading">
        <p>{t.destinationsSubtitle || "وجهات مميزة"}</p>

        <h2>{t.destinationsTitle || "أشهر الرحلات السياحية"}</h2>
      </div>

      {loading && (
        <p className="content-message">
          {t.loadingExperiences || "جاري تحميل الرحلات..."}
        </p>
      )}

      {!loading && message && <p className="content-message">{message}</p>}

      {!loading && !message && tours.length === 0 && (
        <p className="content-message">
          {t.noExperiences || "لا توجد رحلات حاليًا"}
        </p>
      )}

      {!loading && !message && tours.length > 0 && (
        <div className="experiences-grid">
          {tours.map((tour) => (
            <ExperienceCard key={tour._id} experience={tour} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Destinations;
