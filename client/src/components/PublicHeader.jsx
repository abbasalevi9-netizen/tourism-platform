import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import LanguageSwitcher from "./LanguageSwitcher";

function PublicHeader() {
  const { t, language } = useLanguage();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function getSiteName() {
    if (language === "en") {
      return settings.siteNameEn || settings.siteNameAr || "Rahal";
    }

    if (language === "tr") {
      return settings.siteNameTr || settings.siteNameAr || "Rahal";
    }

    return settings.siteNameAr || "رحّال";
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = searchText.trim();

    if (query !== "") {
      navigate(`/?search=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="public-header">
      <div className="public-header-inner">
        <Link to="/" className="public-logo" onClick={closeMenu}>
          {getSiteName()}
        </Link>

        <form className="public-search desktop-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search"}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button type="submit">🔍</button>
        </form>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={menuOpen ? "public-menu open-menu" : "public-menu"}>
          <form className="public-search mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t.searchPlaceholder || "Search"}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <button type="submit">🔍</button>
          </form>

          <nav className="public-nav">
            <Link to="/" onClick={closeMenu}>
              {t.home}
            </Link>

            <Link to="/booking" onClick={closeMenu}>
              {t.booking}
            </Link>

            <Link to="/contact" onClick={closeMenu}>
              {t.contact}
            </Link>
          </nav>

          <div className="public-actions">
            <LanguageSwitcher />

            <Link to="/admin/login" className="login-btn" onClick={closeMenu}>
              {t.login || "Login"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
