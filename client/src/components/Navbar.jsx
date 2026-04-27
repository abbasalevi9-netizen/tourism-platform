import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <h2 className="logo">{t.siteName}</h2>

      <div className="nav-links">
        <Link to="/">{t.home}</Link>
        <Link to="/destinations">{t.destinations}</Link>
        <Link to="/offers">{t.offers}</Link>
        <Link to="/booking">{t.booking}</Link>
        <Link to="/contact">{t.contact}</Link>
      </div>

      <div className="nav-actions">
        <LanguageSwitcher />

        <Link to="/booking" className="nav-btn">
          {t.bookNow}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;