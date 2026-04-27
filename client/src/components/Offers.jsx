import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";
import ExperienceCard from "./ExperienceCard";

function Offers() {
  const { t } = useLanguage();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        setMessage("");

        const response = await fetch(`${API_URL}/api/experiences`);

        if (!response.ok) {
          throw new Error("Failed to load offers");
        }

        const data = await response.json();

        const featuredOffers = data.filter((item) => item.featured === true);

        setOffers(featuredOffers);
      } catch (error) {
        setMessage(t.experiencesError || "حدث خطأ أثناء تحميل العروض");
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, [t.experiencesError]);

  return (
    <section className="experiences-section offers-page-section">
      <div className="section-heading">
        <p>{t.offersSubtitle || "عروض خاصة"}</p>

        <h2>{t.offersTitle || "أفضل العروض لهذا الموسم"}</h2>
      </div>

      {loading && (
        <p className="content-message">
          {t.loadingExperiences || "جاري تحميل العروض..."}
        </p>
      )}

      {!loading && message && <p className="content-message">{message}</p>}

      {!loading && !message && offers.length === 0 && (
        <p className="content-message">
          {t.noOffers || "لا توجد عروض مميزة حاليًا"}
        </p>
      )}

      {!loading && !message && offers.length > 0 && (
        <div className="experiences-grid">
          {offers.map((offer) => (
            <ExperienceCard key={offer._id} experience={offer} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Offers;
