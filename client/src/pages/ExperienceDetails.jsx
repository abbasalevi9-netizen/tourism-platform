import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";

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

const categoryLabels = {
  ar: {
    tour: "رحلة سياحية",
    flight: "رحلة طيران",
    attraction: "معلم سياحي",
    activity: "نشاط وتجربة",
  },
  "ar-eg": {
    tour: "رحلة سياحية",
    flight: "رحلة طيران",
    attraction: "معلم سياحي",
    activity: "نشاط وتجربة",
  },
  "ar-ma": {
    tour: "رحلة سياحية",
    flight: "رحلة طيران",
    attraction: "معلم سياحي",
    activity: "نشاط وتجربة",
  },
  "ar-dz": {
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
  fr: {
    tour: "Circuit",
    flight: "Vol",
    attraction: "Attraction",
    activity: "Activité",
  },
  de: {
    tour: "Tour",
    flight: "Flug",
    attraction: "Sehenswürdigkeit",
    activity: "Aktivität",
  },
  es: {
    tour: "Tour",
    flight: "Vuelo",
    attraction: "Atracción",
    activity: "Actividad",
  },
  it: {
    tour: "Tour",
    flight: "Volo",
    attraction: "Attrazione",
    activity: "Attività",
  },
  ru: {
    tour: "Тур",
    flight: "Авиаперелет",
    attraction: "Достопримечательность",
    activity: "Активность",
  },
};

const pageText = {
  ar: {
    category: "التصنيف",
    rating: "التقييم",
    overview: "نظرة عامة",
    whyChooseTitle: "لماذا تختار هذه التجربة؟",
    why1: "تجربة سياحية مختارة بعناية",
    why2: "حجز مرن ومتابعة من الفريق",
    why3: "سعر وتفاصيل واضحة قبل التأكيد",
    beforeBookingTitle: "قبل الحجز",
    beforeBookingText:
      "أرسل طلبك وسيقوم فريقنا بالتواصل معك لتأكيد التفاصيل النهائية والتوفر وطريقة الدفع.",
    location: "المكان",
    bookingNote: "لن تدفع الآن. سيتواصل معك فريقنا لتأكيد الحجز.",
    untitled: "تجربة بدون عنوان",
    notSpecified: "غير محدد",
    noDescription: "لا يوجد وصف حاليًا",
  },
  "ar-eg": {
    category: "التصنيف",
    rating: "التقييم",
    overview: "نظرة عامة",
    whyChooseTitle: "ليه تختار التجربة دي؟",
    why1: "تجربة سياحية مختارة بعناية",
    why2: "حجز مرن ومتابعة من الفريق",
    why3: "سعر وتفاصيل واضحة قبل التأكيد",
    beforeBookingTitle: "قبل الحجز",
    beforeBookingText:
      "ابعت طلبك وفريقنا هيتواصل معاك لتأكيد التفاصيل والتوفر وطريقة الدفع.",
    location: "المكان",
    bookingNote: "مش هتدفع دلوقتي. فريقنا هيتواصل معاك لتأكيد الحجز.",
    untitled: "تجربة بدون عنوان",
    notSpecified: "غير محدد",
    noDescription: "مفيش وصف دلوقتي",
  },
  "ar-ma": {
    category: "التصنيف",
    rating: "التقييم",
    overview: "نظرة عامة",
    whyChooseTitle: "علاش تختار هاد التجربة؟",
    why1: "تجربة سياحية مختارة بعناية",
    why2: "حجز مرن ومتابعة من الفريق",
    why3: "سعر وتفاصيل واضحة قبل التأكيد",
    beforeBookingTitle: "قبل الحجز",
    beforeBookingText:
      "رسل الطلب ديالك وغادي يتواصل معاك الفريق لتأكيد التفاصيل والتوفر وطريقة الدفع.",
    location: "المكان",
    bookingNote: "ما غاديش تخلص دابا. الفريق غادي يتواصل معاك لتأكيد الحجز.",
    untitled: "تجربة بدون عنوان",
    notSpecified: "غير محدد",
    noDescription: "ما كاينش وصف دابا",
  },
  "ar-dz": {
    category: "التصنيف",
    rating: "التقييم",
    overview: "نظرة عامة",
    whyChooseTitle: "علاش تختار هذي التجربة؟",
    why1: "تجربة سياحية مختارة بعناية",
    why2: "حجز مرن ومتابعة من الفريق",
    why3: "سعر وتفاصيل واضحة قبل التأكيد",
    beforeBookingTitle: "قبل الحجز",
    beforeBookingText:
      "أرسل طلبك والفريق راح يتواصل معاك لتأكيد التفاصيل والتوفر وطريقة الدفع.",
    location: "المكان",
    bookingNote: "ما راحش تدفع الآن. الفريق راح يتواصل معاك لتأكيد الحجز.",
    untitled: "تجربة بدون عنوان",
    notSpecified: "غير محدد",
    noDescription: "ما كاينش وصف حاليا",
  },
  en: {
    category: "Category",
    rating: "Rating",
    overview: "Overview",
    whyChooseTitle: "Why choose this experience?",
    why1: "Carefully selected travel experience",
    why2: "Flexible booking and follow-up",
    why3: "Clear price and travel details",
    beforeBookingTitle: "Before booking",
    beforeBookingText:
      "Send your request and our team will contact you to confirm the final details, availability, and payment method.",
    location: "Location",
    bookingNote: "You will not pay now. Our team will contact you to confirm.",
    untitled: "Untitled experience",
    notSpecified: "Not specified",
    noDescription: "No description available yet.",
  },
  tr: {
    category: "Kategori",
    rating: "Puan",
    overview: "Genel Bakış",
    whyChooseTitle: "Neden bu deneyimi seçmelisiniz?",
    why1: "Özenle seçilmiş seyahat deneyimi",
    why2: "Esnek rezervasyon ve takip",
    why3: "Net fiyat ve seyahat detayları",
    beforeBookingTitle: "Rezervasyondan önce",
    beforeBookingText:
      "Talebinizi gönderin, ekibimiz son detayları, uygunluğu ve ödeme yöntemini onaylamak için sizinle iletişime geçecektir.",
    location: "Konum",
    bookingNote:
      "Şimdi ödeme yapmayacaksınız. Ekibimiz onay için sizinle iletişime geçecektir.",
    untitled: "İsimsiz deneyim",
    notSpecified: "Belirtilmemiş",
    noDescription: "Henüz açıklama bulunmuyor.",
  },
  fr: {
    category: "Catégorie",
    rating: "Note",
    overview: "Aperçu",
    whyChooseTitle: "Pourquoi choisir cette expérience ?",
    why1: "Expérience de voyage soigneusement sélectionnée",
    why2: "Réservation flexible et suivi personnalisé",
    why3: "Prix et détails clairs avant confirmation",
    beforeBookingTitle: "Avant de réserver",
    beforeBookingText:
      "Envoyez votre demande et notre équipe vous contactera pour confirmer les détails, la disponibilité et le mode de paiement.",
    location: "Lieu",
    bookingNote:
      "Vous ne paierez pas maintenant. Notre équipe vous contactera pour confirmer.",
    untitled: "Expérience sans titre",
    notSpecified: "Non spécifié",
    noDescription: "Aucune description disponible pour le moment.",
  },
  de: {
    category: "Kategorie",
    rating: "Bewertung",
    overview: "Überblick",
    whyChooseTitle: "Warum diese Erfahrung wählen?",
    why1: "Sorgfältig ausgewähltes Reiseerlebnis",
    why2: "Flexible Buchung und Betreuung",
    why3: "Klare Preise und Reisedetails",
    beforeBookingTitle: "Vor der Buchung",
    beforeBookingText:
      "Senden Sie Ihre Anfrage und unser Team kontaktiert Sie, um Details, Verfügbarkeit und Zahlungsmethode zu bestätigen.",
    location: "Ort",
    bookingNote:
      "Sie zahlen jetzt nicht. Unser Team kontaktiert Sie zur Bestätigung.",
    untitled: "Unbenanntes Erlebnis",
    notSpecified: "Nicht angegeben",
    noDescription: "Noch keine Beschreibung verfügbar.",
  },
  es: {
    category: "Categoría",
    rating: "Valoración",
    overview: "Resumen",
    whyChooseTitle: "¿Por qué elegir esta experiencia?",
    why1: "Experiencia de viaje cuidadosamente seleccionada",
    why2: "Reserva flexible y seguimiento",
    why3: "Precio y detalles claros antes de confirmar",
    beforeBookingTitle: "Antes de reservar",
    beforeBookingText:
      "Envía tu solicitud y nuestro equipo te contactará para confirmar los detalles, disponibilidad y método de pago.",
    location: "Ubicación",
    bookingNote:
      "No pagarás ahora. Nuestro equipo te contactará para confirmar.",
    untitled: "Experiencia sin título",
    notSpecified: "No especificado",
    noDescription: "Aún no hay descripción disponible.",
  },
  it: {
    category: "Categoria",
    rating: "Valutazione",
    overview: "Panoramica",
    whyChooseTitle: "Perché scegliere questa esperienza?",
    why1: "Esperienza di viaggio selezionata con cura",
    why2: "Prenotazione flessibile e assistenza",
    why3: "Prezzo e dettagli chiari prima della conferma",
    beforeBookingTitle: "Prima della prenotazione",
    beforeBookingText:
      "Invia la tua richiesta e il nostro team ti contatterà per confermare dettagli, disponibilità e metodo di pagamento.",
    location: "Luogo",
    bookingNote:
      "Non pagherai ora. Il nostro team ti contatterà per confermare.",
    untitled: "Esperienza senza titolo",
    notSpecified: "Non specificato",
    noDescription: "Nessuna descrizione disponibile al momento.",
  },
  ru: {
    category: "Категория",
    rating: "Рейтинг",
    overview: "Обзор",
    whyChooseTitle: "Почему стоит выбрать это впечатление?",
    why1: "Тщательно подобранное туристическое впечатление",
    why2: "Гибкое бронирование и сопровождение",
    why3: "Понятная цена и детали поездки",
    beforeBookingTitle: "Перед бронированием",
    beforeBookingText:
      "Отправьте заявку, и наша команда свяжется с вами для подтверждения деталей, доступности и способа оплаты.",
    location: "Место",
    bookingNote:
      "Вы не платите сейчас. Наша команда свяжется с вами для подтверждения.",
    untitled: "Без названия",
    notSpecified: "Не указано",
    noDescription: "Описание пока недоступно.",
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

function ExperienceDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const labels = pageText[language] || pageText.ar;
  const currentCategoryLabels = categoryLabels[language] || categoryLabels.ar;

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

  const title =
    getLocalizedField(experience, "title", language) || labels.untitled;

  const country =
    getLocalizedField(experience, "country", language) || labels.notSpecified;

  const city = getLocalizedField(experience, "city", language);

  const description =
    getLocalizedField(experience, "description", language) ||
    labels.noDescription;

  const locationText = city ? `${city} - ${country}` : country;

  const bookingUrl = `/booking?experienceId=${
    experience._id
  }&destination=${encodeURIComponent(title)}&category=${
    experience.category
  }&priceAtBooking=${experience.price}&currency=${encodeURIComponent(
    experience.currency || "$",
  )}`;

  return (
    <main className="experience-details-page">
      <section className="experience-details-hero">
        <img src={experience.image} alt={title} />

        <div className="experience-details-overlay">
          <div className="experience-hero-badges">
            <span>
              {currentCategoryLabels[experience.category] ||
                currentCategoryLabels.tour}
            </span>
            <span>⭐ {experience.rating || 5}</span>
          </div>

          <p>{locationText}</p>

          <h1>{title}</h1>
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
              <span>{labels.category}</span>
              <strong>
                {currentCategoryLabels[experience.category] ||
                  currentCategoryLabels.tour}
              </strong>
            </div>

            <div>
              <span>{labels.rating}</span>
              <strong>⭐ {experience.rating || 5}</strong>
            </div>
          </div>

          <div className="experience-description-block">
            <p className="section-subtitle">{labels.overview}</p>

            <h2>{title}</h2>

            <p>{description}</p>
          </div>

          <div className="experience-extra-blocks">
            <div className="experience-extra-card">
              <h3>{labels.whyChooseTitle}</h3>

              <ul>
                <li>{labels.why1}</li>
                <li>{labels.why2}</li>
                <li>{labels.why3}</li>
              </ul>
            </div>

            <div className="experience-extra-card">
              <h3>{labels.beforeBookingTitle}</h3>

              <p>{labels.beforeBookingText}</p>
            </div>
          </div>
        </div>

        <aside className="booking-side-card">
          <p className="booking-card-label">{t.startingFrom || "ابتداءً من"}</p>

          <h3>
            {experience.price} {experience.currency || "$"}
          </h3>

          <div className="booking-card-info">
            <p>
              <b>{t.duration || "المدة"}:</b> {experience.duration || "—"}
            </p>

            <p>
              <b>{labels.location}:</b> {locationText}
            </p>

            <p>
              <b>{labels.category}:</b>{" "}
              {currentCategoryLabels[experience.category] ||
                currentCategoryLabels.tour}
            </p>
          </div>

          <Link to={bookingUrl} className="details-btn booking-main-btn">
            {t.bookNow || "احجز الآن"}
          </Link>

          <p className="booking-note">{labels.bookingNote}</p>
        </aside>
      </section>
    </main>
  );
}

export default ExperienceDetails;
