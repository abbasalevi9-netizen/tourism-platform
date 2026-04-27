import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API_URL from "../config/api";

function DestinationDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function getTranslatedDestination(destinationData) {
    if (language === "en") {
      return {
        name: destinationData.nameEn || t.untitledDestination,
        country: destinationData.countryEn || t.notSpecified,
        description: destinationData.descriptionEn || t.noDescription,
        duration:
          destinationData.duration && destinationData.duration !== "غير محددة"
            ? destinationData.duration
            : t.notAvailable,
        program:
          destinationData.programEn && destinationData.programEn.length > 0
            ? destinationData.programEn
            : [],
      };
    }

    if (language === "tr") {
      return {
        name: destinationData.nameTr || t.untitledDestination,
        country: destinationData.countryTr || t.notSpecified,
        description: destinationData.descriptionTr || t.noDescription,
        duration:
          destinationData.duration && destinationData.duration !== "غير محددة"
            ? destinationData.duration
            : t.notAvailable,
        program:
          destinationData.programTr && destinationData.programTr.length > 0
            ? destinationData.programTr
            : [],
      };
    }

    return {
      name: destinationData.nameAr || destinationData.name || t.untitledDestination,
      country:
        destinationData.countryAr || destinationData.country || t.notSpecified,
      description:
        destinationData.descriptionAr ||
        destinationData.description ||
        t.noDescription,
      duration: destinationData.duration || t.notAvailable,
      program:
        destinationData.programAr && destinationData.programAr.length > 0
          ? destinationData.programAr
          : destinationData.program || [],
    };
  }

  useEffect(() => {
    async function fetchDestinationDetails() {
      try {
        const response = await fetch(`${API_URL}/api/destinations/${id}`);

        if (!response.ok) {
          throw new Error("Destination not found");
        }

        const data = await response.json();
        setDestination(data);
      } catch (error) {
        setErrorMessage(t.destinationNotFound);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinationDetails();
  }, [id, t.destinationNotFound]);

  if (loading) {
    return (
      <main className="page-content">
        <section className="details-section">
          <h2>{t.loadingDestinationDetails}</h2>
        </section>
      </main>
    );
  }

  if (errorMessage || !destination) {
    return (
      <main className="page-content">
        <section className="details-section">
          <div className="details-content">
            <h2>{errorMessage}</h2>

            <Link to="/destinations" className="details-btn">
              {t.backToDestinations}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const translated = getTranslatedDestination(destination);

  return (
    <main className="page-content">
      <section className="details-section">
        <div className="details-image">
          <img src={destination.image} alt={translated.name} />
        </div>

        <div className="details-content">
          <p className="section-subtitle">{translated.country}</p>

          <h1>{translated.name}</h1>

          <div className="details-info">
            <span dir={language === "ar" ? "rtl" : "ltr"}>
              {t.price}: {destination.price} {destination.currency || "$"}
            </span>

            <span dir={language === "ar" ? "rtl" : "ltr"}>
              {t.duration}: {translated.duration}
            </span>
          </div>

          <p className="details-description">{translated.description}</p>

          <h3>{t.tripProgram}</h3>

          <ul className="program-list">
            {translated.program && translated.program.length > 0 ? (
              translated.program.map((day, index) => <li key={index}>{day}</li>)
            ) : (
              <li>{t.noProgram}</li>
            )}
          </ul>

          <Link
            to={`/booking?destination=${translated.name}`}
            className="details-btn"
          >
            {t.bookNow}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DestinationDetails;