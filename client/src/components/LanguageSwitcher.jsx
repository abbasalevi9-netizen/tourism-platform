import { useLanguage } from "../context/LanguageContext";

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      className="language-switcher"
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
    >
      <option value="ar">العربية</option>
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </select>
  );
}

export default LanguageSwitcher;