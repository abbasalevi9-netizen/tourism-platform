import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import LanguageSwitcher from "./LanguageSwitcher";

const headerExtraText = {
  ar: {
    adminDashboard: "لوحة الأدمن",
    logout: "خروج",
  },
  "ar-eg": {
    adminDashboard: "لوحة الأدمن",
    logout: "خروج",
  },
  "ar-ma": {
    adminDashboard: "لوحة الأدمن",
    logout: "خروج",
  },
  "ar-dz": {
    adminDashboard: "لوحة الأدمن",
    logout: "خروج",
  },
  en: {
    adminDashboard: "Admin Panel",
    logout: "Logout",
  },
  tr: {
    adminDashboard: "Admin Paneli",
    logout: "Çıkış",
  },
  fr: {
    adminDashboard: "Admin",
    logout: "Déconnexion",
  },
  de: {
    adminDashboard: "Adminbereich",
    logout: "Abmelden",
  },
  es: {
    adminDashboard: "Panel admin",
    logout: "Salir",
  },
  it: {
    adminDashboard: "Pannello admin",
    logout: "Esci",
  },
  ru: {
    adminDashboard: "Админ-панель",
    logout: "Выйти",
  },
};
const languageSuffixMap = {
  ar: "Ar",
  "ar-eg": "Ar",
  "ar-ma": "Ar",
  "ar-dz": "Ar",
  en: "En",
  tr: "Tr",
  fr: "Fr",
  de: "En",
  es: "En",
  it: "En",
  ru: "En",
};

function PublicHeader() {
  const { t, language } = useLanguage();
  const headerText = headerExtraText[language] || headerExtraText.en;

  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [authUser, setAuthUser] = useState(() => {
    return {
      token: localStorage.getItem("authToken"),
      name: localStorage.getItem("authName"),
      role: localStorage.getItem("authRole"),
    };
  });

  useEffect(() => {
    function syncAuth() {
      setAuthUser({
        token: localStorage.getItem("authToken"),
        name: localStorage.getItem("authName"),
        role: localStorage.getItem("authRole"),
      });
    }

    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChanged", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  function getSiteName() {
    const suffix = languageSuffixMap[language] || "Ar";

    return (
      settings[`siteName${suffix}`] ||
      settings.siteNameAr ||
      settings.siteNameEn ||
      "Rahal"
    );
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

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authName");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authRole");

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");

    window.dispatchEvent(new Event("authChanged"));

    closeMenu();
    navigate("/");
  }

  return (
    <header className="public-header">
      <div className="public-header-inner">
        <Link to="/" className="public-logo" onClick={closeMenu}>
          {settings.logoUrl && (
            <img
              src={settings.logoUrl}
              alt={getSiteName()}
              className="public-logo-img"
            />
          )}

          <span>{getSiteName()}</span>
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

            {authUser.role === "admin" && (
              <Link to="/admin/dashboard" onClick={closeMenu}>
                {headerExtraText[language]?.adminDashboard || "Admin Panel"}
              </Link>
            )}
          </nav>

          <div className="public-actions">
            <LanguageSwitcher />

            {authUser.token ? (
              <div className="header-user-box">
                <Link
                  to="/my-account"
                  onClick={closeMenu}
                  className="header-account-link"
                >
                  {authUser.name || "User"}
                </Link>

                <button type="button" onClick={handleLogout}>
                  {headerText.logout}
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="login-btn" onClick={closeMenu}>
                {t.login || "Login"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
