import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const bookingText = {
  ar: {
    pageBadge: "طلب حجز",
    summaryTitle: "ملخص الحجز",
    selectedTrip: "الرحلة المختارة",
    totalPeople: "إجمالي الأشخاص",
    estimatedPrice: "السعر التقريبي",
    noPaymentNow: "لن يتم الدفع الآن، سيتواصل معك فريقنا لتأكيد التفاصيل.",
    formTitle: "بيانات المسافر",
    formText: "املأ البيانات التالية وسيتواصل معك فريقنا لتأكيد الحجز.",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    emailAddress: "البريد الإلكتروني اختياري",
    selectDestination: "اختر الرحلة أو التجربة",
    adultsCount: "عدد البالغين",
    childrenCount: "عدد الأطفال اختياري",
    tripDate: "تاريخ الرحلة",
    preferredContactMethod: "طريقة التواصل المفضلة",
    whatsapp: "واتساب",
    call: "اتصال",
    email: "إيميل",
    additionalNotes: "ملاحظات إضافية",
    confirmBooking: "تأكيد الحجز",
    sending: "جاري الإرسال...",
    required: "يرجى تعبئة الاسم، الهاتف، الرحلة، التاريخ، وعدد البالغين",
    successTitle: "تم إرسال طلبك بنجاح",
    successText: "وصلنا طلبك وسيتواصل معك فريقنا قريبًا لتأكيد التفاصيل.",
    newBooking: "إرسال حجز جديد",
    serverError: "تعذر الاتصال بالسيرفر. تأكد أن السيرفر يعمل.",
    category: "التصنيف",
    pricePerPerson: "السعر للشخص",
    datePlaceholder: "اختر تاريخ الرحلة",
  },
  en: {
    pageBadge: "Booking request",
    summaryTitle: "Booking Summary",
    selectedTrip: "Selected trip",
    totalPeople: "Total people",
    estimatedPrice: "Estimated price",
    noPaymentNow:
      "You will not pay now. Our team will contact you to confirm the details.",
    formTitle: "Traveler details",
    formText:
      "Fill in the details below and our team will contact you to confirm.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    emailAddress: "Email address optional",
    selectDestination: "Select a trip or experience",
    adultsCount: "Adults",
    childrenCount: "Children optional",
    tripDate: "Trip Date",
    preferredContactMethod: "Preferred contact method",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    additionalNotes: "Additional notes",
    confirmBooking: "Confirm Booking",
    sending: "Sending...",
    required: "Please fill in name, phone, trip, date, and adults count",
    successTitle: "Your request has been sent",
    successText: "We received your request and our team will contact you soon.",
    newBooking: "Send another booking",
    serverError: "Could not connect to the server. Make sure it is running.",
    category: "Category",
    pricePerPerson: "Price per person",
    datePlaceholder: "Choose trip date",
  },
  tr: {
    pageBadge: "Rezervasyon talebi",
    summaryTitle: "Rezervasyon Özeti",
    selectedTrip: "Seçilen tur",
    totalPeople: "Toplam kişi",
    estimatedPrice: "Tahmini fiyat",
    noPaymentNow:
      "Şimdi ödeme yapmayacaksınız. Ekibimiz detayları onaylamak için sizinle iletişime geçecektir.",
    formTitle: "Yolcu bilgileri",
    formText:
      "Bilgileri doldurun, ekibimiz onay için sizinle iletişime geçsin.",
    fullName: "Ad Soyad",
    phoneNumber: "Telefon Numarası",
    emailAddress: "E-posta isteğe bağlı",
    selectDestination: "Tur veya deneyim seçin",
    adultsCount: "Yetişkin",
    childrenCount: "Çocuk isteğe bağlı",
    tripDate: "Seyahat Tarihi",
    preferredContactMethod: "Tercih edilen iletişim yöntemi",
    whatsapp: "WhatsApp",
    call: "Arama",
    email: "E-posta",
    additionalNotes: "Ek notlar",
    confirmBooking: "Rezervasyonu Onayla",
    sending: "Gönderiliyor...",
    required: "Lütfen ad, telefon, tur, tarih ve yetişkin sayısını doldurun",
    successTitle: "Talebiniz gönderildi",
    successText:
      "Talebinizi aldık. Ekibimiz yakında sizinle iletişime geçecektir.",
    newBooking: "Yeni rezervasyon gönder",
    serverError: "Sunucuya bağlanılamadı. Sunucunun çalıştığından emin olun.",
    category: "Kategori",
    pricePerPerson: "Kişi başı fiyat",
    datePlaceholder: "Seyahat tarihini seçin",
  },
  fr: {
    pageBadge: "Demande de réservation",
    summaryTitle: "Résumé de réservation",
    selectedTrip: "Voyage sélectionné",
    totalPeople: "Nombre total",
    estimatedPrice: "Prix estimé",
    noPaymentNow:
      "Vous ne paierez pas maintenant. Notre équipe vous contactera pour confirmer les détails.",
    formTitle: "Informations du voyageur",
    formText:
      "Remplissez les informations et notre équipe vous contactera pour confirmer.",
    fullName: "Nom complet",
    phoneNumber: "Téléphone",
    emailAddress: "Adresse e-mail facultative",
    selectDestination: "Choisir un voyage ou une expérience",
    adultsCount: "Adultes",
    childrenCount: "Enfants facultatif",
    tripDate: "Date du voyage",
    preferredContactMethod: "Méthode de contact préférée",
    whatsapp: "WhatsApp",
    call: "Appel",
    email: "E-mail",
    additionalNotes: "Notes supplémentaires",
    confirmBooking: "Confirmer la réservation",
    sending: "Envoi...",
    required:
      "Veuillez remplir le nom, le téléphone, le voyage, la date et le nombre d’adultes",
    successTitle: "Votre demande a été envoyée",
    successText:
      "Nous avons reçu votre demande. Notre équipe vous contactera bientôt.",
    newBooking: "Envoyer une nouvelle réservation",
    serverError: "Impossible de se connecter au serveur.",
    category: "Catégorie",
    pricePerPerson: "Prix par personne",
    datePlaceholder: "Choisir la date du voyage",
  },
};

const categoryLabels = {
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

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function Booking() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();

  const labels = {
    ...(bookingText[language] || bookingText.en),
    ...t,
  };

  const destinationFromUrl = searchParams.get("destination") || "";
  const experienceIdFromUrl = searchParams.get("experienceId") || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const priceFromUrl = searchParams.get("priceAtBooking") || "";
  const currencyFromUrl = searchParams.get("currency") || "$";

  const [experiences, setExperiences] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: destinationFromUrl,
    experienceId: experienceIdFromUrl,
    experienceTitle: destinationFromUrl,
    category: categoryFromUrl,
    priceAtBooking: priceFromUrl,
    currency: currencyFromUrl,
    adults: "1",
    children: "0",
    date: "",
    contactMethod: "whatsapp",
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const today = getTodayDate();

  const selectedExperience = useMemo(() => {
    return experiences.find((item) => item._id === bookingData.experienceId);
  }, [experiences, bookingData.experienceId]);

  const totalPeople =
    (Number(bookingData.adults) || 0) + (Number(bookingData.children) || 0);

  const estimatedTotal = useMemo(() => {
    const price = Number(bookingData.priceAtBooking) || 0;
    return price * Math.max(totalPeople, 1);
  }, [bookingData.priceAtBooking, totalPeople]);

  const categoryText =
    categoryLabels[language]?.[bookingData.category] ||
    categoryLabels.en[bookingData.category] ||
    bookingData.category ||
    "-";

  function getExperienceName(experience) {
    return (
      getLocalizedField(experience, "title", language) ||
      experience.titleAr ||
      experience.titleEn ||
      ""
    );
  }

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch(`${API_URL}/api/experiences`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setExperiences(data);
        }
      } catch (error) {
        console.log("Error loading experiences:", error);
      }
    }

    fetchExperiences();
  }, []);

  useEffect(() => {
    if (!experienceIdFromUrl || experiences.length === 0) {
      return;
    }

    const experience = experiences.find(
      (item) => item._id === experienceIdFromUrl,
    );

    if (!experience) {
      return;
    }

    const localizedTitle = getExperienceName(experience);

    setBookingData((prevData) => ({
      ...prevData,
      destination: localizedTitle || destinationFromUrl,
      experienceTitle: localizedTitle || destinationFromUrl,
      experienceId: experience._id,
      category: experience.category || categoryFromUrl,
      priceAtBooking: experience.price || priceFromUrl,
      currency: experience.currency || currencyFromUrl || "$",
    }));
  }, [
    experiences,
    experienceIdFromUrl,
    destinationFromUrl,
    categoryFromUrl,
    priceFromUrl,
    currencyFromUrl,
    language,
  ]);

  function handleBookingChange(event) {
    const { name, value } = event.target;

    setBookingData({
      ...bookingData,
      [name]: value,
    });

    setMessage("");
    setSuccess(false);
  }

  function handleExperienceSelect(event) {
    const selectedId = event.target.value;
    const experience = experiences.find((item) => item._id === selectedId);

    if (!experience) {
      setBookingData({
        ...bookingData,
        destination: "",
        experienceTitle: "",
        experienceId: "",
        category: "",
        priceAtBooking: "",
        currency: "$",
      });

      return;
    }

    const title = getExperienceName(experience);

    setBookingData({
      ...bookingData,
      destination: title,
      experienceTitle: title,
      experienceId: experience._id,
      category: experience.category,
      priceAtBooking: experience.price,
      currency: experience.currency || "$",
    });

    setMessage("");
    setSuccess(false);
  }

  function resetBookingForm() {
    setBookingData({
      name: "",
      phone: "",
      email: "",
      destination: destinationFromUrl,
      experienceId: experienceIdFromUrl,
      experienceTitle: destinationFromUrl,
      category: categoryFromUrl,
      priceAtBooking: priceFromUrl,
      currency: currencyFromUrl || "$",
      adults: "1",
      children: "0",
      date: "",
      contactMethod: "whatsapp",
      notes: "",
    });

    setSuccess(false);
    setMessage("");
  }

  async function handleBookingSubmit(event) {
    event.preventDefault();

    const adults = Number(bookingData.adults) || 0;
    const children = Number(bookingData.children) || 0;
    const people = adults + children;

    if (
      bookingData.name.trim() === "" ||
      bookingData.phone.trim() === "" ||
      bookingData.destination.trim() === "" ||
      adults < 1 ||
      bookingData.date.trim() === ""
    ) {
      setMessage(labels.required || labels.bookingRequiredMessage);
      return;
    }

    try {
      setIsSending(true);
      setMessage("");

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("authToken")
            ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            : {}),
        },
        body: JSON.stringify({
          name: bookingData.name.trim(),
          phone: bookingData.phone.trim(),
          email: bookingData.email.trim(),
          destination: bookingData.destination.trim(),

          experienceId: bookingData.experienceId || null,
          experienceTitle:
            bookingData.experienceTitle || bookingData.destination,
          category: bookingData.category,
          priceAtBooking: bookingData.priceAtBooking,
          currency: bookingData.currency,

          adults,
          children,
          people,

          date: bookingData.date,
          contactMethod: bookingData.contactMethod,
          notes: bookingData.notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || labels.bookingErrorMessage);
        return;
      }

      setSuccess(true);
      setMessage("");
    } catch (error) {
      setMessage(labels.serverError || labels.serverConnectionError);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="booking" className="booking-section booking-pro-section">
      <div className="booking-pro-heading">
        <span>{labels.pageBadge}</span>
        <h1>{labels.bookingTitle}</h1>
        <p>{labels.formText}</p>
      </div>

      <div className="booking-container improved-booking-container booking-pro-container">
        <aside className="booking-summary-card booking-pro-summary">
          <h3>{labels.summaryTitle || labels.bookingSummary}</h3>

          {selectedExperience?.image && (
            <img
              src={selectedExperience.image}
              alt={bookingData.destination}
              className="booking-summary-image"
            />
          )}

          <div className="summary-row">
            <span>{labels.selectedTrip}</span>
            <strong>
              {bookingData.destination || labels.selectDestination}
            </strong>
          </div>

          <div className="summary-row">
            <span>{labels.category}</span>
            <strong>{categoryText}</strong>
          </div>

          <div className="summary-row">
            <span>{labels.pricePerPerson}</span>
            <strong>
              {bookingData.priceAtBooking
                ? `${bookingData.priceAtBooking} ${bookingData.currency || "$"}`
                : "-"}
            </strong>
          </div>

          <div className="summary-row">
            <span>{labels.totalPeople}</span>
            <strong>{Math.max(totalPeople, 1)}</strong>
          </div>

          <div className="summary-row total-summary-row">
            <span>{labels.estimatedPrice}</span>
            <strong>
              {bookingData.priceAtBooking
                ? `${estimatedTotal} ${bookingData.currency || "$"}`
                : "-"}
            </strong>
          </div>

          <p className="summary-note">{labels.noPaymentNow}</p>
        </aside>

        <form
          className="booking-form booking-pro-form"
          onSubmit={handleBookingSubmit}
        >
          {success ? (
            <div className="booking-success-card">
              <div className="success-icon">✓</div>

              <h3>{labels.successTitle || labels.bookingSuccessTitle}</h3>

              <p>{labels.successText || labels.bookingSuccessText}</p>

              <button type="button" onClick={resetBookingForm}>
                {labels.newBooking}
              </button>
            </div>
          ) : (
            <>
              <div className="booking-form-title">
                <h3>{labels.formTitle}</h3>
                <p>{labels.formText}</p>
              </div>

              <input
                type="text"
                name="name"
                placeholder={labels.fullName}
                value={bookingData.name}
                onChange={handleBookingChange}
              />

              <input
                type="text"
                name="phone"
                placeholder={labels.phoneNumber}
                value={bookingData.phone}
                onChange={handleBookingChange}
              />

              <input
                type="email"
                name="email"
                placeholder={labels.emailAddress}
                value={bookingData.email}
                onChange={handleBookingChange}
              />

              <select
                name="experienceId"
                value={bookingData.experienceId}
                onChange={handleExperienceSelect}
              >
                <option value="">{labels.selectDestination}</option>

                {experiences.map((experience) => {
                  const experienceName = getExperienceName(experience);

                  return (
                    <option key={experience._id} value={experience._id}>
                      {experienceName}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                name="adults"
                placeholder={labels.adultsCount}
                min="1"
                value={bookingData.adults}
                onChange={handleBookingChange}
              />

              <input
                type="number"
                name="children"
                placeholder={labels.childrenCount}
                min="0"
                value={bookingData.children}
                onChange={handleBookingChange}
              />

              <div className="form-field">
                <label>{labels.tripDate}</label>

                <input
                  type="date"
                  name="date"
                  min={today}
                  aria-label={labels.datePlaceholder}
                  value={bookingData.date}
                  onChange={handleBookingChange}
                />
              </div>

              <div className="form-field">
                <label>{labels.preferredContactMethod}</label>

                <select
                  name="contactMethod"
                  value={bookingData.contactMethod}
                  onChange={handleBookingChange}
                >
                  <option value="whatsapp">{labels.whatsapp}</option>
                  <option value="call">{labels.call}</option>
                  <option value="email">{labels.email}</option>
                </select>
              </div>

              <textarea
                name="notes"
                placeholder={labels.additionalNotes}
                value={bookingData.notes}
                onChange={handleBookingChange}
              ></textarea>

              <button type="submit" disabled={isSending}>
                {isSending ? labels.sending : labels.confirmBooking}
              </button>

              {message && <p className="booking-message">{message}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Booking;
