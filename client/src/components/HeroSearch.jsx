import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";

const fallbackHeroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
];

const heroText = {
  ar: {
    badge: "منصة رحّال للسياحة",
    title: "احجز تجارب وأنشطة لا تُنسى",
    description:
      "اختر وجهتك المفضلة، واستمتع بتجربة سفر متكاملة تشمل الفنادق، الرحلات، والبرامج السياحية.",
    destination: "اختر وجهتك",
    destinationPlaceholder: "ابحث عن مدينة أو وجهة أو تجربة",
    dates: "تاريخ الوصول — تاريخ المغادرة",
    adults: "البالغون",
    children: "الأطفال",
    rooms: "الغرف",
    search: "بحث",
    popular: "اقتراحات سريعة",
    istanbul: "إسطنبول",
    dubai: "دبي",
    tours: "رحلات سياحية",
    activities: "أنشطة وتجارب",
    coastal: "رحلات ساحلية",
    culture: "سياحة وثقافة",
  },
  "ar-eg": {
    badge: "منصة رحّال للسياحة",
    title: "احجز تجارب وأنشطة ماتتنسيش",
    description:
      "اختار وجهتك واستمتع بتجربة سفر كاملة تشمل الفنادق والرحلات والبرامج السياحية.",
    destination: "اختار وجهتك",
    destinationPlaceholder: "دور على مدينة أو وجهة أو تجربة",
    dates: "تاريخ الوصول — تاريخ المغادرة",
    adults: "البالغين",
    children: "الأطفال",
    rooms: "الغرف",
    search: "بحث",
    popular: "اقتراحات سريعة",
    istanbul: "إسطنبول",
    dubai: "دبي",
    tours: "رحلات سياحية",
    activities: "أنشطة وتجارب",
    coastal: "رحلات ساحلية",
    culture: "سياحة وثقافة",
  },
  "ar-ma": {
    badge: "منصة رحّال للسياحة",
    title: "احجز تجارب وأنشطة ما تتفوتش",
    description:
      "اختار الوجهة ديالك واستمتع بتجربة سفر متكاملة تشمل الفنادق والرحلات.",
    destination: "اختار وجهتك",
    destinationPlaceholder: "قلب على مدينة أو وجهة أو تجربة",
    dates: "تاريخ الوصول — تاريخ المغادرة",
    adults: "البالغين",
    children: "الأطفال",
    rooms: "الغرف",
    search: "بحث",
    popular: "اقتراحات سريعة",
    istanbul: "إسطنبول",
    dubai: "دبي",
    tours: "رحلات سياحية",
    activities: "أنشطة وتجارب",
    coastal: "رحلات ساحلية",
    culture: "سياحة وثقافة",
  },
  "ar-dz": {
    badge: "منصة رحّال للسياحة",
    title: "احجز تجارب وأنشطة ما تتنساش",
    description:
      "اختار وجهتك واستمتع بتجربة سفر متكاملة تشمل الفنادق والرحلات والبرامج.",
    destination: "اختار وجهتك",
    destinationPlaceholder: "ابحث على مدينة أو وجهة أو تجربة",
    dates: "تاريخ الوصول — تاريخ المغادرة",
    adults: "البالغين",
    children: "الأطفال",
    rooms: "الغرف",
    search: "بحث",
    popular: "اقتراحات سريعة",
    istanbul: "إسطنبول",
    dubai: "دبي",
    tours: "رحلات سياحية",
    activities: "أنشطة وتجارب",
    coastal: "رحلات ساحلية",
    culture: "سياحة وثقافة",
  },
  en: {
    badge: "Rahal Travel Platform",
    title: "Book unforgettable trips and activities",
    description:
      "Choose your favorite destination and enjoy a complete travel experience with hotels, trips and programs.",
    destination: "Choose destination",
    destinationPlaceholder: "Search for a city, destination or experience",
    dates: "Check-in date — Check-out date",
    adults: "Adults",
    children: "Children",
    rooms: "Rooms",
    search: "Search",
    popular: "Quick suggestions",
    istanbul: "Istanbul",
    dubai: "Dubai",
    tours: "Tours",
    activities: "Activities",
    coastal: "Coastal trips",
    culture: "Culture trips",
  },
  tr: {
    badge: "Rahal Seyahat Platformu",
    title: "Unutulmaz turlar ve aktiviteler rezerve edin",
    description:
      "Favori destinasyonunuzu seçin; oteller, turlar ve programlarla eksiksiz bir seyahat deneyimi yaşayın.",
    destination: "Destinasyon seçin",
    destinationPlaceholder: "Şehir, destinasyon veya aktivite ara",
    dates: "Giriş tarihi — Çıkış tarihi",
    adults: "Yetişkin",
    children: "Çocuk",
    rooms: "Oda",
    search: "Ara",
    popular: "Hızlı öneriler",
    istanbul: "İstanbul",
    dubai: "Dubai",
    tours: "Turlar",
    activities: "Aktiviteler",
    coastal: "Sahil turları",
    culture: "Kültür turları",
  },
  fr: {
    badge: "Plateforme de voyage Rahal",
    title: "Réservez des expériences inoubliables",
    description:
      "Choisissez votre destination préférée et profitez d’un voyage complet avec hôtels, circuits et activités.",
    destination: "Choisir une destination",
    destinationPlaceholder: "Rechercher une ville, destination ou activité",
    dates: "Date d’arrivée — Date de départ",
    adults: "Adultes",
    children: "Enfants",
    rooms: "Chambres",
    search: "Rechercher",
    popular: "Suggestions rapides",
    istanbul: "Istanbul",
    dubai: "Dubaï",
    tours: "Circuits",
    activities: "Activités",
    coastal: "Voyages côtiers",
    culture: "Culture",
  },
  de: {
    badge: "Rahal Reiseplattform",
    title: "Buchen Sie unvergessliche Reisen und Aktivitäten",
    description:
      "Wählen Sie Ihr Lieblingsziel und genießen Sie ein komplettes Reiseerlebnis mit Hotels, Touren und Programmen.",
    destination: "Reiseziel wählen",
    destinationPlaceholder: "Stadt, Reiseziel oder Erlebnis suchen",
    dates: "Anreisedatum — Abreisedatum",
    adults: "Erwachsene",
    children: "Kinder",
    rooms: "Zimmer",
    search: "Suchen",
    popular: "Schnelle Vorschläge",
    istanbul: "Istanbul",
    dubai: "Dubai",
    tours: "Touren",
    activities: "Aktivitäten",
    coastal: "Küstenreisen",
    culture: "Kulturreisen",
  },

  es: {
    badge: "Plataforma de viajes Rahal",
    title: "Reserva experiencias y actividades inolvidables",
    description:
      "Elige tu destino favorito y disfruta de una experiencia completa con hoteles, tours y programas.",
    destination: "Elige tu destino",
    destinationPlaceholder: "Busca una ciudad, destino o experiencia",
    dates: "Fecha de llegada — Fecha de salida",
    adults: "Adultos",
    children: "Niños",
    rooms: "Habitaciones",
    search: "Buscar",
    popular: "Sugerencias rápidas",
    istanbul: "Estambul",
    dubai: "Dubái",
    tours: "Tours",
    activities: "Actividades",
    coastal: "Viajes costeros",
    culture: "Viajes culturales",
  },

  it: {
    badge: "Piattaforma di viaggio Rahal",
    title: "Prenota esperienze e attività indimenticabili",
    description:
      "Scegli la tua destinazione preferita e vivi un’esperienza completa con hotel, tour e programmi.",
    destination: "Scegli destinazione",
    destinationPlaceholder: "Cerca una città, destinazione o esperienza",
    dates: "Data di arrivo — Data di partenza",
    adults: "Adulti",
    children: "Bambini",
    rooms: "Camere",
    search: "Cerca",
    popular: "Suggerimenti rapidi",
    istanbul: "Istanbul",
    dubai: "Dubai",
    tours: "Tour",
    activities: "Attività",
    coastal: "Viaggi costieri",
    culture: "Viaggi culturali",
  },

  ru: {
    badge: "Туристическая платформа Rahal",
    title: "Бронируйте незабываемые поездки и активности",
    description:
      "Выберите любимое направление и наслаждайтесь полноценным путешествием с отелями, турами и программами.",
    destination: "Выберите направление",
    destinationPlaceholder: "Ищите город, направление или впечатление",
    dates: "Дата заезда — Дата выезда",
    adults: "Взрослые",
    children: "Дети",
    rooms: "Номера",
    search: "Поиск",
    popular: "Быстрые предложения",
    istanbul: "Стамбул",
    dubai: "Дубай",
    tours: "Туры",
    activities: "Активности",
    coastal: "Морские поездки",
    culture: "Культурные поездки",
  },
};

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function HeroSearch() {
  const { language, t } = useLanguage();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const text = heroText[language] || heroText.ar;

  const heroImages = useMemo(() => {
    return settings.heroImages && settings.heroImages.length > 0
      ? settings.heroImages
      : fallbackHeroImages;
  }, [settings.heroImages]);

  const [currentImage, setCurrentImage] = useState(0);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const today = getTodayDate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const guestsSummary = `${adults} ${text.adults} · ${children} ${text.children} · ${rooms} ${text.rooms}`;

  const quickItems = [
    { label: text.popular, icon: "☆", value: "" },
    { label: text.istanbul, icon: "🕌", value: text.istanbul },
    { label: text.dubai, icon: "🏙️", value: text.dubai },
    { label: text.tours, icon: "📷", value: text.tours },
    { label: text.coastal, icon: "🌊", value: text.coastal },
    { label: text.activities, icon: "🎈", value: text.activities },
    { label: text.culture, icon: "🏛️", value: text.culture },
  ];

  function handleSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (destination.trim()) params.append("search", destination.trim());
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);

    params.append("adults", adults);
    params.append("children", children);
    params.append("rooms", rooms);

    navigate(`/?${params.toString()}`);
  }

  function handleQuickSearch(value) {
    if (!value) return;

    setDestination(value);
    navigate(`/?search=${encodeURIComponent(value)}`);
  }

  function updateCounter(type, action) {
    if (type === "adults") {
      setAdults((prev) => Math.max(1, action === "plus" ? prev + 1 : prev - 1));
    }

    if (type === "children") {
      setChildren((prev) =>
        Math.max(0, action === "plus" ? prev + 1 : prev - 1),
      );
    }

    if (type === "rooms") {
      setRooms((prev) => Math.max(1, action === "plus" ? prev + 1 : prev - 1));
    }
  }

  return (
    <section
      className="hero-search hero-home-pro rahal-hero-pro"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04)), url(${heroImages[currentImage]})`,
      }}
    >
      <div className="hero-home-shell booking-style-shell rahal-hero-shell">
        <div className="hero-home-content booking-style-content rahal-hero-content">
          <span className="hero-home-badge rahal-hero-badge">{text.badge}</span>

          <h1>{t.heroSearchTitle || text.title}</h1>

          <p className="hero-home-description rahal-hero-description">
            {t.heroDescription || text.description}
          </p>

          <form
            className="booking-home-search rahal-search-panel"
            onSubmit={handleSearch}
          >
            <div className="booking-home-field destination-field rahal-search-field">
              <span className="booking-field-icon">📍</span>

              <div className="rahal-field-content">
                <small>{text.destination}</small>
                <input
                  type="text"
                  placeholder={text.destinationPlaceholder}
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                />
              </div>
            </div>

            <div className="booking-home-field dates-field rahal-search-field">
              <span className="booking-field-icon">📅</span>

              <div className="rahal-field-content">
                <small>{text.dates}</small>

                <div className="booking-date-inputs">
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    aria-label="Check in"
                    onChange={(event) => setCheckIn(event.target.value)}
                  />

                  <span>—</span>

                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    aria-label="Check out"
                    onChange={(event) => setCheckOut(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="booking-home-field guests-field rahal-search-field">
              <button
                type="button"
                className="guests-toggle"
                onClick={() => setGuestsOpen(!guestsOpen)}
              >
                <span className="booking-field-icon">👤</span>

                <span className="rahal-guests-text">
                  <small>
                    {text.adults} / {text.children} / {text.rooms}
                  </small>
                  <b>{guestsSummary}</b>
                </span>

                <em>⌄</em>
              </button>

              {guestsOpen && (
                <div className="guests-dropdown">
                  <div className="guest-row">
                    <span>{text.adults}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => updateCounter("adults", "minus")}
                      >
                        −
                      </button>
                      <strong>{adults}</strong>
                      <button
                        type="button"
                        onClick={() => updateCounter("adults", "plus")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guest-row">
                    <span>{text.children}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => updateCounter("children", "minus")}
                      >
                        −
                      </button>
                      <strong>{children}</strong>
                      <button
                        type="button"
                        onClick={() => updateCounter("children", "plus")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guest-row">
                    <span>{text.rooms}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => updateCounter("rooms", "minus")}
                      >
                        −
                      </button>
                      <strong>{rooms}</strong>
                      <button
                        type="button"
                        onClick={() => updateCounter("rooms", "plus")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="booking-home-submit rahal-search-submit"
            >
              <span>🔎</span>
              {text.search}
            </button>
          </form>

          <div className="hero-quick-searches rahal-quick-chips">
            {quickItems.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                className={index === 0 ? "featured-chip" : ""}
                onClick={() => handleQuickSearch(item.value)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-dots hero-dots-pro">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={currentImage === index ? "active-dot" : ""}
            onClick={() => setCurrentImage(index)}
            type="button"
            aria-label={`Hero image ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default HeroSearch;
