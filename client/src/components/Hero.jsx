import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="subtitle">{t.heroSubtitle}</p>

        <h1>{t.heroTitle}</h1>

        <p className="description">{t.heroDescription}</p>

        <div className="hero-buttons">
          <Link to="/destinations" className="primary-btn">
            {t.exploreDestinations}
          </Link>

          <Link to="/offers" className="secondary-btn">
            {t.viewOffers}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;