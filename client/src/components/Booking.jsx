import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";

function Booking() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();

  const destinationFromUrl = searchParams.get("destination");
  const experienceIdFromUrl = searchParams.get("experienceId");
  const categoryFromUrl = searchParams.get("category");
  const priceFromUrl = searchParams.get("priceAtBooking");
  const currencyFromUrl = searchParams.get("currency");

  const [experiences, setExperiences] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: destinationFromUrl || "",
    experienceId: experienceIdFromUrl || "",
    experienceTitle: destinationFromUrl || "",
    category: categoryFromUrl || "",
    priceAtBooking: priceFromUrl || "",
    currency: currencyFromUrl || "$",
    adults: "1",
    children: "0",
    date: "",
    contactMethod: "whatsapp",
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const totalPeople =
    (Number(bookingData.adults) || 0) + (Number(bookingData.children) || 0);

  const estimatedTotal = useMemo(() => {
    const price = Number(bookingData.priceAtBooking) || 0;
    const adults = Number(bookingData.adults) || 0;
    const children = Number(bookingData.children) || 0;

    return price * (adults + children);
  }, [bookingData.priceAtBooking, bookingData.adults, bookingData.children]);

  function getExperienceName(experience) {
    if (language === "en") {
      return experience.titleEn || experience.titleAr;
    }

    if (language === "tr") {
      return experience.titleTr || experience.titleAr;
    }

    return experience.titleAr;
  }

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch(`${API_URL}/api/experiences`);
        const data = await response.json();

        setExperiences(data);
      } catch (error) {
        console.log("Error loading experiences:", error);
      }
    }

    fetchExperiences();
  }, []);

  useEffect(() => {
    if (destinationFromUrl) {
      setBookingData((prevData) => ({
        ...prevData,
        destination: destinationFromUrl,
        experienceTitle: destinationFromUrl,
        experienceId: experienceIdFromUrl || "",
        category: categoryFromUrl || "",
        priceAtBooking: priceFromUrl || "",
        currency: currencyFromUrl || "$",
      }));
    }
  }, [
    destinationFromUrl,
    experienceIdFromUrl,
    categoryFromUrl,
    priceFromUrl,
    currencyFromUrl,
  ]);

  function handleBookingChange(event) {
    const { name, value } = event.target;

    if (name === "destination") {
      const selectedExperience = experiences.find(
        (item) => getExperienceName(item) === value
      );

      if (selectedExperience) {
        setBookingData({
          ...bookingData,
          destination: value,
          experienceTitle: value,
          experienceId: selectedExperience._id,
          category: selectedExperience.category,
          priceAtBooking: selectedExperience.price,
          currency: selectedExperience.currency || "$",
        });

        setMessage("");
        setSuccess(false);
        return;
      }
    }

    setBookingData({
      ...bookingData,
      [name]: value,
    });

    setMessage("");
    setSuccess(false);
  }

  function resetBookingForm() {
    setBookingData({
      name: "",
      phone: "",
      email: "",
      destination: destinationFromUrl || "",
      experienceId: experienceIdFromUrl || "",
      experienceTitle: destinationFromUrl || "",
      category: categoryFromUrl || "",
      priceAtBooking: priceFromUrl || "",
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

    if (
      bookingData.name.trim() === "" ||
      bookingData.phone.trim() === "" ||
      bookingData.destination.trim() === "" ||
      bookingData.adults === "" ||
      bookingData.date.trim() === ""
    ) {
      setMessage(t.bookingRequiredMessage);
      return;
    }

    try {
      setIsSending(true);
      setMessage("");

      const people =
        (Number(bookingData.adults) || 0) +
        (Number(bookingData.children) || 0);

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookingData.name,
          phone: bookingData.phone,
          email: bookingData.email,
          destination: bookingData.destination,

          experienceId: bookingData.experienceId,
          experienceTitle: bookingData.experienceTitle,
          category: bookingData.category,
          priceAtBooking: bookingData.priceAtBooking,
          currency: bookingData.currency,

          adults: Number(bookingData.adults) || 1,
          children: Number(bookingData.children) || 0,
          people,

          date: bookingData.date,
          contactMethod: bookingData.contactMethod,
          notes: bookingData.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || t.bookingErrorMessage);
        return;
      }

      setSuccess(true);
      setMessage("");
    } catch (error) {
      setMessage(t.serverConnectionError);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="booking" className="booking-section">
      <p className="section-subtitle">{t.bookingSubtitle}</p>

      <h2>{t.bookingTitle}</h2>

      <div className="booking-container improved-booking-container">
        <div className="booking-summary-card">
          <h3>{t.bookingSummary}</h3>

          <div className="summary-row">
            <span>{t.selectedTrip}</span>
            <strong>{bookingData.destination || t.selectDestination}</strong>
          </div>

          <div className="summary-row">
            <span>{t.totalPeople}</span>
            <strong>{totalPeople || 1}</strong>
          </div>

          <div className="summary-row">
            <span>{t.estimatedPrice}</span>
            <strong>
              {bookingData.priceAtBooking
                ? `${estimatedTotal} ${bookingData.currency || "$"}`
                : "-"}
            </strong>
          </div>

          <p className="summary-note">{t.noPaymentNow}</p>
        </div>

        <form className="booking-form" onSubmit={handleBookingSubmit}>
          {success ? (
            <div className="booking-success-card">
              <div className="success-icon">✓</div>

              <h3>{t.bookingSuccessTitle}</h3>

              <p>{t.bookingSuccessText}</p>

              <button type="button" onClick={resetBookingForm}>
                {t.newBooking}
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder={t.fullName}
                value={bookingData.name}
                onChange={handleBookingChange}
              />

              <input
                type="text"
                name="phone"
                placeholder={t.phoneNumber}
                value={bookingData.phone}
                onChange={handleBookingChange}
              />

              <input
                type="email"
                name="email"
                placeholder={t.emailAddress}
                value={bookingData.email}
                onChange={handleBookingChange}
              />

              <select
                name="destination"
                value={bookingData.destination}
                onChange={handleBookingChange}
              >
                <option value="" disabled>
                  {t.selectDestination}
                </option>

                {experiences.map((experience) => {
                  const experienceName = getExperienceName(experience);

                  return (
                    <option key={experience._id} value={experienceName}>
                      {experienceName}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                name="adults"
                placeholder={t.adultsCount}
                min="1"
                value={bookingData.adults}
                onChange={handleBookingChange}
              />

              <input
                type="number"
                name="children"
                placeholder={t.childrenCount}
                min="0"
                value={bookingData.children}
                onChange={handleBookingChange}
              />

              <div className="form-field">
                <label>{t.tripDate}</label>

                <input
                  type="text"
                  name="date"
                  placeholder={t.tripDatePlaceholder}
                  value={bookingData.date}
                  onChange={handleBookingChange}
                />
              </div>

              <div className="form-field">
                <label>{t.preferredContactMethod}</label>

                <select
                  name="contactMethod"
                  value={bookingData.contactMethod}
                  onChange={handleBookingChange}
                >
                  <option value="whatsapp">{t.whatsapp}</option>
                  <option value="call">{t.call}</option>
                  <option value="email">{t.email}</option>
                </select>
              </div>

              <textarea
                name="notes"
                placeholder={t.additionalNotes}
                value={bookingData.notes}
                onChange={handleBookingChange}
              ></textarea>

              <button type="submit" disabled={isSending}>
                {isSending ? t.sending : t.confirmBooking}
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