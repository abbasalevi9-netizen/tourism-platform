import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span>404</span>

        <h1>{t.notFoundTitle || "الصفحة غير موجودة"}</h1>

        <p>
          {t.notFoundText ||
            "الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله."}
        </p>

        <Link to="/">{t.backHome || "العودة للرئيسية"}</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
