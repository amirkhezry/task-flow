import "./Header.css";
import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { language, setLanguage, t } = useLanguage();

  function toggleLanguage() {
    setLanguage((current) => (current === "fa" ? "en" : "fa"));
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="#dashboard" aria-label={t("appName")}>
          <span className="brand-mark">
            <i className="fa-solid fa-check-double" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>{t("appName")}</strong>
            <small>{t("appTagline")}</small>
          </span>
        </a>

        <nav className="main-nav" aria-label={t("mainNavigation")}>
          <a className="nav-link active" href="#dashboard">
            {t("navDashboard")}
          </a>
          <a className="nav-link" href="#tasks">
            {t("navTasks")}
          </a>
          <a className="nav-link" href="https://github.com/amirkhezry" target="_blank" rel="noreferrer">
            {t("navAbout")}
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="language-switch"
            type="button"
            onClick={toggleLanguage}
            aria-label={t("language")}
            title={t("language")}
          >
            <i className="fa-solid fa-globe" aria-hidden="true" />
            <span>{language === "fa" ? "EN" : "FA"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
