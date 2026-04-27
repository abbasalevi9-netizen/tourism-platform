import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";

const categoryLabels = {
  ar: {
    tour: "رحلة سياحية",
    flight: "رحلة طيران",
    attraction: "معلم سياحي",
    activity: "نشاط وتجربة",
  },
  en: {
    tour: "Tour",
    flight: "Flight",
    attraction: "Attraction",
    activity: "Activity",
  },
  tr: {
    tour: "Tur",
    flight: "Uçuş",
    attraction: "Gezilecek Yer",
    activity: "Aktivite",
  },
};

function ExperienceDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  function getText(item) {
    if (language === "en") {
      return {
        title: item.titleEn || item.titleAr || "Untitled experience",
        country: item.countryEn || item.countryAr || "Not specified",
        city: item.cityEn || item.cityAr || "",
        description:
          item.descriptionEn ||
          item.descriptionAr ||
          "No description available yet.",
      };
    }

    if (language === "tr") {
      return {
        title: item.titleTr || item.titleAr || "İsimsiz deneyim",
        country: item.countryTr || item.countryAr || "Belirtilmemiş",
        city: item.cityTr || item.cityAr || "",
        description:
          item.descriptionTr ||
          item.descriptionAr ||
          "Henüz açıklama bulunmuyor.",
      };
    }

    return {
      title: item.titleAr || "تجربة بدون عنوان",
      country: item.countryAr || "غير محدد",
      city: item.cityAr || "",
      description: item.descriptionAr || "لا يوجد وصف حاليًا",
    };
  }

  function getCategoryLabel(category) {
    return categoryLabels[language]?.[category] || categoryLabels.ar[category];
  }

  useEffect(() => {
    async function fetchExperience() {
      try {
        const response = await fetch(`${API_URL}/api/experiences/${id}`);

        if (!response.ok) {
          throw new Error("Not found");
        }

        const data = await response.json();
        setExperience(data);
      } catch (error) {
        setMessage(t.destinationNotFound || "Content not found");
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [id, t.destinationNotFound]);

  if (loading) {
    return (
      <main className="experience-loading-page">
        <p>{t.loadingDestinationDetails || "Loading details..."}</p>
      </main>
    );
  }

  if (message || !experience) {
    return (
      <main className="experience-loading-page">
        <div className="experience-empty-card">
          <h2>{message}</h2>

          <Link to="/" className="details-btn">
            {t.backToDestinations || "Back"}
          </Link>
        </div>
      </main>
    );
  }

  const translated = getText(experience);
  const locationText = translated.city
    ? `${translated.city} - ${translated.country}`
    : translated.country;

  const bookingUrl = `/booking?experienceId=${
    experience._id
  }&destination=${encodeURIComponent(translated.title)}&category=${
    experience.category
  }&priceAtBooking=${experience.price}&currency=${encodeURIComponent(
    experience.currency || "$"
  )}`;

  return (
    <main className="experience-details-page">
      <section className="experience-details-hero">
        <img src={experience.image} alt={translated.title} />

        <div className="experience-details-overlay">
          <div className="experience-hero-badges">
            <span>{getCategoryLabel(experience.category)}</span>
            <span>⭐ {experience.rating || 5}</span>
          </div>

          <p>{locationText}</p>

          <h1>{translated.title}</h1>
        </div>
      </section>

      <section className="experience-details-body">
        <div className="experience-details-main">
          <div className="experience-info-grid">
            <div>
              <span>{t.price || "السعر"}</span>
              <strong>
                {experience.price} {experience.currency || "$"}
              </strong>
            </div>

            <div>
              <span>{t.duration || "المدة"}</span>
              <strong>{experience.duration || "—"}</strong>
            </div>

            <div>
              <span>
                {language === "en"
                  ? "Category"
                  : language === "tr"
                  ? "Kategori"
                  : "التصنيف"}
              </span>
              <strong>{getCategoryLabel(experience.category)}</strong>
            </div>

            <div>
              <span>
                {language === "en"
                  ? "Rating"
                  : language === "tr"
                  ? "Puan"
                  : "التقييم"}
              </span>
              <strong>⭐ {experience.rating || 5}</strong>
            </div>
          </div>

          <div className="experience-description-block">
            <p className="section-subtitle">
              {language === "en"
                ? "Overview"
                : language === "tr"
                ? "Genel Bakış"
                : "نظرة عامة"}
            </p>

            <h2>{translated.title}</h2>

            <p>{translated.description}</p>
          </div>

          <div className="experience-extra-blocks">
            <div className="experience-extra-card">
              <h3>
                {language === "en"
                  ? "Why choose this experience?"
                  : language === "tr"
                  ? "Neden bu deneyimi seçmelisiniz?"
                  : "لماذا تختار هذه التجربة؟"}
              </h3>

              <ul>
                <li>
                  {language === "en"
                    ? "Carefully selected travel experience"
                    : language === "tr"
                    ? "Özenle seçilmiş seyahat deneyimi"
                    : "تجربة سياحية مختارة بعناية"}
                </li>
                <li>
                  {language === "en"
                    ? "Flexible booking and follow-up"
                    : language === "tr"
                    ? "Esnek rezervasyon ve takip"
                    : "حجز مرن ومتابعة من الفريق"}
                </li>
                <li>
                  {language === "en"
                    ? "Clear price and travel details"
                    : language === "tr"
                    ? "Net fiyat ve seyahat detayları"
                    : "سعر وتفاصيل واضحة قبل التأكيد"}
                </li>
              </ul>
            </div>

            <div className="experience-extra-card">
              <h3>
                {language === "en"
                  ? "Before booking"
                  : language === "tr"
                  ? "Rezervasyondan önce"
                  : "قبل الحجز"}
              </h3>

              <p>
                {language === "en"
                  ? "Send your request and our team will contact you to confirm the final details, availability, and payment method."
                  : language === "tr"
                  ? "Talebinizi gönderin, ekibimiz son detayları, uygunluğu ve ödeme yöntemini onaylamak için sizinle iletişime geçecektir."
                  : "أرسل طلبك وسيقوم فريقنا بالتواصل معك لتأكيد التفاصيل النهائية والتوفر وطريقة الدفع."}
              </p>
            </div>
          </div>
        </div>

        <aside className="booking-side-card">
          <p className="booking-card-label">
            {t.startingFrom || "ابتداءً من"}
          </p>

          <h3>
            {experience.price} {experience.currency || "$"}
          </h3>

          <div className="booking-card-info">
            <p>
              <b>{t.duration || "المدة"}:</b> {experience.duration || "—"}
            </p>

            <p>
              <b>
                {language === "en"
                  ? "Location"
                  : language === "tr"
                  ? "Konum"
                  : "المكان"}
                :
              </b>{" "}
              {locationText}
            </p>

            <p>
              <b>
                {language === "en"
                  ? "Category"
                  : language === "tr"
                  ? "Kategori"
                  : "التصنيف"}
                :
              </b>{" "}
              {getCategoryLabel(experience.category)}
            </p>
          </div>

          <Link to={bookingUrl} className="details-btn booking-main-btn">
            {t.bookNow || "احجز الآن"}
          </Link>

          <p className="booking-note">
            {language === "en"
              ? "You will not pay now. Our team will contact you to confirm."
              : language === "tr"
              ? "Şimdi ödeme yapmayacaksınız. Ekibimiz onay için sizinle iletişime geçecektir."
              : "لن تدفع الآن. سيتواصل معك فريقنا لتأكيد الحجز."}
          </p>
        </aside>
      </section>
    </main>
  );
}

export default ExperienceDetails;