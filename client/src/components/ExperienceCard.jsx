import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function ExperienceCard({ experience }) {
  const { language, t } = useLanguage();

  function getText() {
    if (language === "en") {
      return {
        title: experience.titleEn || experience.titleAr,
        country: experience.countryEn || experience.countryAr,
        city: experience.cityEn || experience.cityAr,
        description: experience.descriptionEn || experience.descriptionAr,
      };
    }

    if (language === "tr") {
      return {
        title: experience.titleTr || experience.titleAr,
        country: experience.countryTr || experience.countryAr,
        city: experience.cityTr || experience.cityAr,
        description: experience.descriptionTr || experience.descriptionAr,
      };
    }

    return {
      title: experience.titleAr,
      country: experience.countryAr,
      city: experience.cityAr,
      description: experience.descriptionAr,
    };
  }

  const translated = getText();

  return (
    <article className="experience-card">
      <div className="experience-image">
        <img src={experience.image} alt={translated.title} />

        <span className="experience-rating">⭐ {experience.rating || 5}</span>
      </div>

      <div className="experience-content">
        <p className="experience-location">
          {translated.city || translated.country}
        </p>

        <h3>{translated.title}</h3>

        <p className="experience-description">{translated.description}</p>

        <div className="experience-footer">
          <span>
            {t.startingFrom || "Starting from"} {experience.price}{" "}
            {experience.currency || "$"}
          </span>

          <Link to={`/experiences/${experience._id}`}>
            {t.viewDetails || "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;