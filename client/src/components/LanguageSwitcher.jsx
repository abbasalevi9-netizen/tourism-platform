import { useLanguage } from "../context/LanguageContext";

function LanguageSwitcher() {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="language-switcher notranslate" translate="no">
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {supportedLanguages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
