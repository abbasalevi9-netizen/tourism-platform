import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";

function ContactPage() {
  const { t, language } = useLanguage();
  const { settings } = useSiteSettings();

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sentMessage, setSentMessage] = useState("");

  function getAddress() {
    if (language === "en") return settings.addressEn || settings.addressAr;
    if (language === "tr") return settings.addressTr || settings.addressAr;
    return settings.addressAr;
  }

  function getWorkingHours() {
    if (language === "en") {
      return settings.workingHoursEn || settings.workingHoursAr;
    }

    if (language === "tr") {
      return settings.workingHoursTr || settings.workingHoursAr;
    }

    return settings.workingHoursAr;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setContactData({
      ...contactData,
      [name]: value,
    });

    setSentMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSentMessage(t.messageSent);

    setContactData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="section-subtitle">{t.contactSubtitle}</p>
        <h1>{t.contactTitle}</h1>
        <p>{t.contactDescription}</p>
      </section>

      <section className="contact-content">
        <div className="contact-info-card">
          <h2>{t.contactInfo}</h2>

          <div className="contact-info-item">
            <span>☎</span>
            <div>
              <h3>{t.contactPhone}</h3>
              <p>{settings.phone}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>💬</span>
            <div>
              <h3>WhatsApp</h3>
              <p>{settings.whatsapp}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>✉</span>
            <div>
              <h3>{t.contactEmail}</h3>
              <p>{settings.email}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>📍</span>
            <div>
              <h3>{t.contactAddress}</h3>
              <p>{getAddress()}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>⏰</span>
            <div>
              <h3>{t.workingHours}</h3>
              <p>{getWorkingHours()}</p>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t.messageName}
            value={contactData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t.messageEmail}
            value={contactData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder={t.messagePhone}
            value={contactData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder={t.messageText}
            value={contactData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">{t.sendMessage}</button>

          {sentMessage && <p className="contact-success">{sentMessage}</p>}
        </form>
      </section>
    </main>
  );
}

export default ContactPage;
