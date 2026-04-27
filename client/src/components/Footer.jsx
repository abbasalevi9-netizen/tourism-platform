import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";

function Footer() {
  const { t, language } = useLanguage();
  const { settings } = useSiteSettings();

  function getSiteName() {
    if (language === "en") return settings.siteNameEn || settings.siteNameAr;
    if (language === "tr") return settings.siteNameTr || settings.siteNameAr;
    return settings.siteNameAr;
  }

  function getFooterDescription() {
    if (language === "en") {
      return settings.footerDescriptionEn || settings.footerDescriptionAr;
    }

    if (language === "tr") {
      return settings.footerDescriptionTr || settings.footerDescriptionAr;
    }

    return settings.footerDescriptionAr;
  }

  function getAddress() {
    if (language === "en") return settings.addressEn || settings.addressAr;
    if (language === "tr") return settings.addressTr || settings.addressAr;
    return settings.addressAr;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h2>{getSiteName()}</h2>
          <p>{getFooterDescription()}</p>
        </div>

        <div className="footer-box">
          <h3>{t.quickLinks}</h3>

          <Link to="/">{t.home}</Link>
          <Link to="/booking">{t.booking}</Link>
          <Link to="/contact">{t.contact}</Link>
        </div>

        <div className="footer-box">
          <h3>{t.contactInfo}</h3>

          <p>
            {t.contactPhone}: {settings.phone}
          </p>
          <p>
            {t.contactEmail}: {settings.email}
          </p>
          <p>
            {t.contactAddress}: {getAddress()}
          </p>
        </div>

        <div className="footer-box">
          <h3>{t.followUs}</h3>

          <div className="footer-social">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}

            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            )}

            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noreferrer">
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {getSiteName()}. {t.rightsReserved}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
