import { useLanguage } from "../../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <span>{t("footerMade")} 💚 {t("footerBy")}</span>
      <a href="https://github.com/amirkhezry" target="_blank" rel="noreferrer">
        Amir Khezri
      </a>
      <span className="footer-dot">·</span>
      <span>TaskFlow © {new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
