import { Link } from "react-router-dom";
import HeroSearch from "../components/HeroSearch";
import ExperiencesSection from "../components/ExperiencesSection";
import { useLanguage } from "../context/LanguageContext";

const homeText = {
  ar: {
    highlightsTitle: "لماذا تختار رحّال؟",
    highlightsSubtitle: "كل ما تحتاجه لرحلة مريحة من مكان واحد",
    h1Title: "رحلات مختارة بعناية",
    h1Text: "نختار لك أفضل الرحلات والأنشطة والمعالم حسب الجودة والتجربة.",
    h2Title: "متابعة مباشرة",
    h2Text: "بعد إرسال الحجز، يتواصل معك فريقنا لتأكيد التفاصيل خطوة بخطوة.",
    h3Title: "لغات متعددة",
    h3Text: "الموقع يدعم لغات ولهجات متعددة لتسهيل تجربة المستخدم.",
    h4Title: "حجز بدون دفع فوري",
    h4Text: "ترسل الطلب أولًا، وبعدها يتم تأكيد التفاصيل وطريقة الدفع.",
    stepsTitle: "كيف يتم الحجز؟",
    stepsSubtitle: "ثلاث خطوات بسيطة للبدء برحلتك",
    step1Title: "اختر التجربة",
    step1Text: "تصفح الرحلات والأنشطة واختر ما يناسبك.",
    step2Title: "أرسل طلب الحجز",
    step2Text: "املأ بياناتك الأساسية بدون دفع مباشر.",
    step3Title: "نتواصل معك",
    step3Text: "فريقنا يؤكد التفاصيل والتوفر والسعر النهائي.",
    ctaTitle: "جاهز تبدأ رحلتك القادمة؟",
    ctaText: "استكشف أفضل الرحلات والأنشطة واحجز بسهولة.",
    ctaButton: "استكشف الرحلات",
  },
  en: {
    highlightsTitle: "Why choose Rahal?",
    highlightsSubtitle: "Everything you need for a smooth trip in one place",
    h1Title: "Carefully selected trips",
    h1Text: "We help you find quality tours, activities and attractions.",
    h2Title: "Direct follow-up",
    h2Text: "After your request, our team contacts you to confirm the details.",
    h3Title: "Multiple languages",
    h3Text: "The platform supports multiple languages for a better experience.",
    h4Title: "Book without instant payment",
    h4Text: "Send your request first, then confirm details and payment method.",
    stepsTitle: "How booking works",
    stepsSubtitle: "Three simple steps to start your trip",
    step1Title: "Choose an experience",
    step1Text: "Browse trips and activities and choose what suits you.",
    step2Title: "Send your request",
    step2Text: "Fill in your basic details without paying immediately.",
    step3Title: "We contact you",
    step3Text: "Our team confirms availability, details and final price.",
    ctaTitle: "Ready for your next trip?",
    ctaText: "Explore the best tours and activities and book easily.",
    ctaButton: "Explore trips",
  },
  tr: {
    highlightsTitle: "Neden Rahal?",
    highlightsSubtitle: "Rahat bir seyahat için ihtiyacınız olan her şey",
    h1Title: "Özenle seçilmiş turlar",
    h1Text: "Kaliteli turlar, aktiviteler ve gezilecek yerler sunuyoruz.",
    h2Title: "Doğrudan takip",
    h2Text:
      "Talebinizden sonra ekibimiz detayları onaylamak için iletişime geçer.",
    h3Title: "Çoklu dil",
    h3Text: "Platform daha iyi deneyim için birçok dili destekler.",
    h4Title: "Anında ödeme olmadan rezervasyon",
    h4Text:
      "Önce talebinizi gönderin, sonra detayları ve ödeme yöntemini onaylayın.",
    stepsTitle: "Rezervasyon nasıl yapılır?",
    stepsSubtitle: "Seyahatinize başlamak için üç kolay adım",
    step1Title: "Deneyim seçin",
    step1Text: "Turları ve aktiviteleri inceleyip size uygun olanı seçin.",
    step2Title: "Talebinizi gönderin",
    step2Text: "Temel bilgilerinizi doldurun, hemen ödeme yapmayın.",
    step3Title: "Sizinle iletişime geçelim",
    step3Text: "Ekibimiz uygunluğu, detayları ve son fiyatı onaylar.",
    ctaTitle: "Yeni seyahatinize hazır mısınız?",
    ctaText: "En iyi turları ve aktiviteleri keşfedin.",
    ctaButton: "Turları keşfet",
  },
  fr: {
    highlightsTitle: "Pourquoi choisir Rahal ?",
    highlightsSubtitle: "Tout ce dont vous avez besoin pour un voyage simple",
    h1Title: "Voyages soigneusement sélectionnés",
    h1Text:
      "Nous sélectionnons des circuits, activités et attractions de qualité.",
    h2Title: "Suivi direct",
    h2Text:
      "Après votre demande, notre équipe vous contacte pour confirmer les détails.",
    h3Title: "Plusieurs langues",
    h3Text: "La plateforme prend en charge plusieurs langues.",
    h4Title: "Réservation sans paiement immédiat",
    h4Text:
      "Envoyez d’abord votre demande, puis confirmez les détails et le paiement.",
    stepsTitle: "Comment réserver ?",
    stepsSubtitle: "Trois étapes simples pour commencer votre voyage",
    step1Title: "Choisissez une expérience",
    step1Text: "Parcourez les voyages et activités qui vous conviennent.",
    step2Title: "Envoyez votre demande",
    step2Text: "Remplissez vos informations sans paiement immédiat.",
    step3Title: "Nous vous contactons",
    step3Text:
      "Notre équipe confirme les détails, la disponibilité et le prix final.",
    ctaTitle: "Prêt pour votre prochain voyage ?",
    ctaText: "Découvrez les meilleurs voyages et activités.",
    ctaButton: "Explorer les voyages",
  },
};

function Home() {
  const { language } = useLanguage();
  const text = homeText[language] || homeText.en;

  const highlights = [
    { icon: "🌍", title: text.h1Title, description: text.h1Text },
    { icon: "🤝", title: text.h2Title, description: text.h2Text },
    { icon: "🗣️", title: text.h3Title, description: text.h3Text },
    { icon: "💳", title: text.h4Title, description: text.h4Text },
  ];

  const steps = [
    { number: "01", title: text.step1Title, description: text.step1Text },
    { number: "02", title: text.step2Title, description: text.step2Text },
    { number: "03", title: text.step3Title, description: text.step3Text },
  ];

  return (
    <main className="home-page">
      <HeroSearch />

      <section className="home-highlights-section">
        <div className="home-section-heading">
          <span>{text.highlightsSubtitle}</span>
          <h2>{text.highlightsTitle}</h2>
        </div>

        <div className="home-highlights-grid">
          {highlights.map((item) => (
            <article className="home-highlight-card" key={item.title}>
              <div className="home-highlight-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ExperiencesSection />

      <section className="home-steps-section">
        <div className="home-section-heading">
          <span>{text.stepsSubtitle}</span>
          <h2>{text.stepsTitle}</h2>
        </div>

        <div className="home-steps-grid">
          {steps.map((step) => (
            <article className="home-step-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta-section">
        <div>
          <h2>{text.ctaTitle}</h2>
          <p>{text.ctaText}</p>
        </div>

        <Link to="/?category=tour" className="home-cta-btn">
          {text.ctaButton}
        </Link>
      </section>
    </main>
  );
}

export default Home;
